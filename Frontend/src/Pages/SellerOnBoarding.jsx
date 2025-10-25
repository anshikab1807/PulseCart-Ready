import React, { useEffect, useState } from "react";
import "../Styles/SellerOnBoarding.css";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { useNavigate } from "react-router-dom";

const SellerOnBoarding = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/sellerlogin");
  };
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex-1 px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="banner rounded-xl overflow-hidden mb-8 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1612831455544-2aab08a8a27f?auto=format&fit=crop&w=1380&q=80"
              alt="Seller Banner"
              className="w-full h-80 object-cover"
            />
          </div>

          <h2 className="text-2xl font-bold text-[#FF8C42] mb-8 text-center">
            🚀 How to become a PulseCart seller
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="step-card border rounded-lg shadow p-4 text-center">
              <h3 className="font-semibold text-lg mb-2">📝 Step 1: Register your account</h3>
              <img
                src="https://images.unsplash.com/photo-1612831455544-2aab08a8a27f?auto=format&fit=crop&w=400&q=80"
                alt="Register Account"
                className="mx-auto rounded-md h-40 object-cover"
              />
            </div>
            <div className="step-card border rounded-lg shadow p-4 text-center">
              <h3 className="font-semibold text-lg mb-2">📦 Step 2: Choose storage & shipping</h3>
              <img
                src="https://images.unsplash.com/photo-1605902711622-cfb43c4431b3?auto=format&fit=crop&w=400&q=80"
                alt="Storage and Shipping"
                className="mx-auto rounded-md h-40 object-cover"
              />
            </div>
            <div className="step-card border rounded-lg shadow p-4 text-center">
              <h3 className="font-semibold text-lg mb-2">🛍️ Step 3: List your products</h3>
              <img
                src="https://images.unsplash.com/photo-1605902711622-1f273e5c3d3c?auto=format&fit=crop&w=400&q=80"
                alt="List Products"
                className="mx-auto rounded-md h-40 object-cover"
              />
            </div>
            <div className="step-card border rounded-lg shadow p-4 text-center">
              <h3 className="font-semibold text-lg mb-2">💸 Step 4: Complete orders & get paid</h3>
              <img
                src="https://images.unsplash.com/photo-1612831455544-8c8a8a27f?auto=format&fit=crop&w=400&q=80"
                alt="Get Paid"
                className="mx-auto rounded-md h-40 object-cover"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleClick}
              className="bg-[#FF8C42] hover:bg-[#e6732d] text-white font-semibold py-3 px-6 rounded-full shadow-md transition"
            >
              🚀 Start Selling Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerOnBoarding;
