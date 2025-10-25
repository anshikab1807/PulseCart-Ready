import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

const deliveryCharge = 50;

export default function SecureCheckout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [userInfo, setUserInfo] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
  });
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [upiId, setUpiId] = useState("");
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load cart and saved address
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetch("http://localhost:3000/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setSubtotal(data.subtotal || 0);
        setCartItemCount(data.items?.length || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const saved = JSON.parse(localStorage.getItem("checkoutUserInfo"));
    if (saved) setUserInfo(saved);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("checkoutUserInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  const isAddressComplete =
    userInfo.name &&
    userInfo.mobile &&
    userInfo.address &&
    userInfo.city &&
    userInfo.pincode &&
    userInfo.state;

  const discountedTotal = subtotal + deliveryCharge;

  const isPayButtonEnabled =
    selectedPayment &&
    (selectedPayment !== "upi" || (upiId.trim() && isUpiVerified)) &&
    isAddressComplete &&
    !isEditingAddress;

  // Save order
  const saveOrderAndNavigate = async (paymentStatus) => {
    if (cartItemCount === 0) {
      alert("Cart is empty! Add products before checkout.");
      return;
    }

    const orderPayload = {
      name: userInfo.name,
      mobile: userInfo.mobile,
      address: `${userInfo.address}, ${userInfo.city}, ${userInfo.state} - ${userInfo.pincode}`,
      instructions,
      paymentMethod: selectedPayment,
      paymentStatus,
      totalAmount: discountedTotal.toFixed(2),
    };

    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });
      if (!res.ok) throw new Error("Failed to save order");

      await fetch("http://localhost:3000/api/cart/clear", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      // Save order locally and navigate
      localStorage.setItem(
        "lastPlacedOrder",
        JSON.stringify({ ...orderPayload, orderId: `ORD-${Date.now()}`, orderDate: new Date().toLocaleString() })
      );
      navigate("/orderconfirmed");
    } catch (err) {
      alert(err.message || "Error placing order");
    }
  };

  // Handle Razorpay payment
  const handleRazorpayPayment = async () => {
    if (!isAddressComplete) {
      alert("Please complete your address first!");
      setIsEditingAddress(true);
      return;
    }

    if (selectedPayment === "cod") {
      alert("✅ Cash on Delivery selected!");
      saveOrderAndNavigate("Pending");
      return;
    }

    try {
      const amountInPaise = Math.round(discountedTotal * 100);
      const res = await fetch("http://localhost:3000/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInPaise }),
      });
      const orderData = await res.json();

      const options = {
        key: "rzp_test_QMG1XV6hszJZlA",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "PulseCart",
        description: "Order Payment",
        order_id: orderData.id,
        handler: async () => {
          alert("✅ Payment successful!");
          saveOrderAndNavigate("Successful");
        },
        prefill: {
          name: userInfo.name,
          email: "customer@example.com",
          contact: userInfo.mobile,
        },
        theme: { color: "#FF8C42" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch {
      alert("Payment failed! Try again.");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-200 flex flex-col justify-between">
        <div className="flex-grow">
          <header className="bg-white flex justify-between items-center px-6 py-4 shadow">
            <div className="text-xl font-bold text-[#FF8C42]">Checkout</div>
            <div className="text-2xl">🛒</div>
          </header>

          <main className="max-w-6xl mx-auto p-4 grid md:grid-cols-3 gap-4 mt-4">
            {/* Address & Payment Section */}
            <section className="md:col-span-2 space-y-4">
              {/* Address */}
              <div className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    <h2 className="font-semibold text-[#FF8C42] mb-2">Delivering to you</h2>
                    {isEditingAddress ? (
                      <div className="space-y-2 text-sm">
                        {[
                          ["Full Name", "name"],
                          ["Mobile Number", "mobile"],
                          ["Address", "address"],
                          ["City", "city"],
                          ["Pincode", "pincode"],
                          ["State", "state"],
                        ].map(([label, field]) => (
                          <input
                            key={field}
                            type="text"
                            placeholder={label}
                            className="w-full border border-gray-300 p-2 rounded focus:ring-[#FF8C42] focus:border-[#FF8C42] mb-2"
                            value={userInfo[field]}
                            onChange={(e) => setUserInfo({ ...userInfo, [field]: e.target.value })}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm leading-relaxed">
                        {isAddressComplete ? (
                          <>
                            <p>
                              <strong>{userInfo.name}</strong> ({userInfo.mobile})
                            </p>
                            <p>{userInfo.address}</p>
                            <p>
                              {userInfo.city}, {userInfo.state} - {userInfo.pincode}
                            </p>
                          </>
                        ) : (
                          <p className="text-red-500">Please add your delivery address details.</p>
                        )}
                      </div>
                    )}
                    <textarea
                      className="w-full mt-2 border border-gray-300 rounded p-2 text-sm focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                      placeholder="Delivery instructions"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      rows="2"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (isEditingAddress) {
                        if (isAddressComplete) setIsEditingAddress(false);
                        else alert("Fill in all fields before saving.");
                      } else setIsEditingAddress(true);
                    }}
                    className="text-sm font-semibold text-[#FF8C42] hover:underline ml-4 whitespace-nowrap"
                  >
                    {isEditingAddress ? "Save Address" : "Edit Address"}
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-4 rounded shadow">
                <h2 className="font-semibold text-[#FF8C42] mb-2">Payment Method</h2>
                <div className="flex gap-4">
                  <button
                    className={`px-4 py-2 rounded border ${
                      selectedPayment === "cod" ? "bg-[#FF8C42] text-white" : "bg-gray-100"
                    }`}
                    onClick={() => setSelectedPayment("cod")}
                  >
                    Cash on Delivery
                  </button>
                  <button
                    className={`px-4 py-2 rounded border ${
                      selectedPayment === "upi" ? "bg-[#FF8C42] text-white" : "bg-gray-100"
                    }`}
                    onClick={() => setSelectedPayment("upi")}
                  >
                    UPI
                  </button>
                </div>
                {selectedPayment === "upi" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter UPI ID"
                      className="w-full border border-gray-300 p-2 rounded focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    <button
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                      onClick={() => setIsUpiVerified(true)}
                    >
                      Verify UPI
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Order Summary */}
            <aside className="bg-white p-4 rounded shadow h-fit sticky top-4">
              <button
                className={`w-full py-2 rounded text-base mb-4 transition-all duration-200 ${
                  isPayButtonEnabled
                    ? "bg-[#FF8C42] hover:bg-[#e6732d] text-white font-semibold cursor-pointer"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
                disabled={!isPayButtonEnabled}
                onClick={handleRazorpayPayment}
              >
                Pay ₹{discountedTotal.toFixed(2)}
              </button>

              <h3 className="font-semibold text-[#FF8C42] mb-3 border-b pb-2">Order Summary</h3>
              <ul className="text-sm space-y-2">
                <li className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Delivery Charges:</span>
                  <span>₹{deliveryCharge.toFixed(2)}</span>
                </li>
                <hr className="my-2 border-gray-300" />
                <li className="flex justify-between font-bold text-lg mt-2">
                  <span>Order Total:</span>
                  <span>₹{discountedTotal.toFixed(2)}</span>
                </li>
              </ul>
            </aside>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
