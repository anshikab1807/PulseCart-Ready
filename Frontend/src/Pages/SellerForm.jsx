import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const SellerForm = () => {
  const [formData, setFormData] = useState({
    shopName: "",
    category: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
    country: "",
    shipping: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [allFilled, setAllFilled] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    setAllFilled(Object.values(updatedForm).every((val) => val.trim() !== ""));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/sellers/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      alert("✅ Seller registered successfully");
      window.location.href = "/productdetails";
    } catch {
      alert("❌ Error submitting form");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/2 space-y-4"
            autoComplete="off"
          >
            <h2 className="text-2xl font-semibold text-[#FF8C42] mb-4">
              Tell us about your PulseCart shop
            </h2>

            {[
              { name: "shopName", label: "Set a name for your shop" },
              { name: "category", label: "Select product category" },
              { name: "pincode", label: "Pin code" },
              { name: "address", label: "Enter your business address" },
              { name: "city", label: "City" },
              { name: "state", label: "State" },
              { name: "country", label: "Country" },
              {
                name: "shipping",
                label: "Shipping option (Self shipping or partner shipping)",
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-gray-50 focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={!allFilled}
              className={`w-full py-2 rounded-lg text-white font-semibold ${
                allFilled
                  ? "bg-[#FF8C42] hover:bg-[#e6732d]"
                  : "bg-[#FFb380] cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </form>

          {/* Image Upload */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <button
              type="button"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="mb-4 px-6 py-2 bg-[#FF8C42]/20 text-[#FF8C42] font-medium rounded-lg hover:bg-[#FF8C42]/40"
            >
              Upload Shop Image
            </button>
            <input
              type="file"
              id="shopImage"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <div className="w-full max-w-md bg-white border border-[#FF8C42]/40 shadow rounded-lg flex flex-col items-center justify-center p-4">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="PulseCart Shop Preview"
                    className="max-h-80 object-contain rounded-lg"
                  />
                  <p className="text-sm mt-2 text-[#FF8C42] font-medium">Preview</p>
                </>
              ) : (
                <p className="text-gray-500 font-medium">No image selected</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerForm;
