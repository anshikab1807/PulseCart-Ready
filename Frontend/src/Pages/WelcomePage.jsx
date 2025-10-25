import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { User, Store } from 'lucide-react';
function WelcomePage() {
  const [active, setActive] = useState('user');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (type) => {
    setActive(type);
    if (type === 'seller') {
      navigate('/seller-onboarding');
    } else {
      navigate('/login');
    }
  };


  return (
    <>
      <Navbar />
      <div className="min-h-[20vh] bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 md:p-10 flex flex-col md:flex-row items-center justify-between border border-gray-200">
          
          {/* Left Side */}
          <div className="w-full text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[rgb(255,140,66)] mb-6 leading-snug">
              Welcome to <span className="text-[#070A52]">PulseCart</span>
            </h1>
            <p className="text-gray-700 text-lg mb-8 max-w-md mx-auto">
              Start your journey with us — whether you're a buyer looking for great deals or a seller ready to shine!
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <button
                onClick={() => handleClick('user')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 text-lg font-semibold transition duration-300 shadow-md ${
                  active === 'user'
                    ? 'bg-[rgb(255,140,66)] text-white border-[rgb(255,140,66)] hover:bg-[rgb(255,120,46)]'
                    : 'bg-white text-[rgb(255,140,66)] border-[rgb(255,140,66)] hover:bg-[rgb(255,240,230)]'
                }`}
              >
                <User className="w-5 h-5" />
                I'm a User
              </button>
              <button
                onClick={() => handleClick('seller')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 text-lg font-semibold transition duration-300 shadow-md ${
                  active === 'seller'
                    ? 'bg-[rgb(255,140,66)] text-white border-[rgb(255,140,66)] hover:bg-[rgb(255,120,46)]'
                    : 'bg-white text-[rgb(255,140,66)] border-[rgb(255,140,66)] hover:bg-[rgb(255,240,230)]'
                }`}
              >
                <Store className="w-5 h-5" />
                I'm a Seller
              </button>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default WelcomePage;
