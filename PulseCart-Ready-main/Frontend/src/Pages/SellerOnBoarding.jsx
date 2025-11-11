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
              src="https://t3.ftcdn.net/jpg/02/80/01/60/360_F_280016018_hwMSB40bfAJmrTa842dxVh4yzZy72Kva.jpg"
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
                src="https://tse1.mm.bing.net/th/id/OIP.ZUr_Eo3wfOLcFHa1YFgbDwHaHb?w=726&h=728&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Register Account"
                className="mx-auto rounded-md h-40 object-cover"
              />
            </div>
            <div className="step-card border rounded-lg shadow p-4 text-center">
              <h3 className="font-semibold text-lg mb-2">📦 Step 2: Choose storage & shipping</h3>
              <img
                src="https://tse2.mm.bing.net/th/id/OIP.m-3qOr3XmN3yL2S7fRa_jAHaE7?rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Storage and Shipping"
                className="mx-auto rounded-md h-40 object-cover"
              />
            </div>
            <div className="step-card border rounded-lg shadow p-4 text-center">
              <h3 className="font-semibold text-lg mb-2">🛍️ Step 3: List your products</h3>
              <img
                src="https://tse2.mm.bing.net/th/id/OIP.9PjLIyht4UBqbfVfCEuWGgAAAA?w=450&h=450&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="List Products"
                className="mx-auto rounded-md h-40 object-cover"
              />
            </div>
            <div className="step-card border rounded-lg shadow p-4 text-center">
              <h3 className="font-semibold text-lg mb-2">💸 Step 4: Complete orders & get paid</h3>
              <img
                src="https://static.vecteezy.com/system/resources/previews/042/679/203/large_2x/order-completed-package-order-via-mobile-app-service-successfully-received-concept-illustration-flat-design-simple-modern-graphic-element-for-landing-page-ui-infographic-icon-vector.jpg"
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
