import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000/api";

export default function TrackOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("Please login to view your orders.");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        setOrders(data.orders);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  const cancelOrder = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      const res = await fetch(`${API_BASE}/orders/${id}/cancel`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Cancel failed");
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, orderStatus: "Cancelled" } : o))
      );
      alert("Order cancelled successfully");
    } catch (err) {
      alert(err.message || "Failed to cancel order");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (error)
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen font-semibold text-red-600">
          {error}
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-semibold text-center mb-6">Your Orders</h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <div key={order._id} className="border p-4 rounded shadow">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{order.items.map((i) => i.name).join(", ")}</p>
                  <p
                    className={`font-bold ${
                      order.orderStatus === "Delivered"
                        ? "text-green-600"
                        : order.orderStatus === "Cancelled"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.orderStatus}
                  </p>
                  <p className="font-semibold">₹{order.totalAmount}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                {order.orderStatus === "Pending" && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
