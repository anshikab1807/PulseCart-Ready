import React from "react";
import { useNavigate } from "react-router-dom";
import orderConfirmedGif from "../assets/order-confirmed.gif"; // Ensure this path is correct
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const OrderConfirmed = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center p-5 bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full border border-[#FF8C42]/30">
          {/* Heading */}
          <h1 className="text-3xl font-bold text-[#FF8C42] mb-6">
            Order Confirmed!
          </h1>

          {/* GIF */}
          <img
            src={orderConfirmedGif}
            alt="Order Confirmed"
            className="mx-auto w-64 h-64 object-contain mb-6"
          />

          {/* Continue Shopping Button */}
          <button
            onClick={() => navigate("/")}
            className="bg-[#FF8C42] text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-[#e67b38] transition duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmed;
