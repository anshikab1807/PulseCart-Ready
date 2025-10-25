import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const SellerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: ""
  });
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimer = setTimeout(() => setLoading(false), 3000);
    const urlParams = new URLSearchParams(window.location.search);
    setIsSignup(urlParams.get("mode") === "signup");
    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (isSignup && formData.fullName) {
      const firstName = formData.fullName.split(" ")[0].toLowerCase();
      const randomNumber = Math.floor(10000 + Math.random() * 90000);
      setFormData((prev) => ({
        ...prev,
        username: `${firstName}${randomNumber}`
      }));
    } else if (!isSignup) {
      setFormData((prev) => ({ ...prev, username: "" }));
    }
  }, [formData.fullName, isSignup]);

  const toggleMode = () => {
    setError("");
    setFormData({
      fullName: "",
      username: "",
      email: "",
      phone: "",
      password: ""
    });
    const newIsSignup = !isSignup;
    setIsSignup(newIsSignup);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("mode", newIsSignup ? "signup" : "signin");
    window.history.pushState({ path: newUrl.href }, "", newUrl.href);
  };

  const handleChange = (e) => {
    if (e.target.name === "username" && isSignup) return;
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const url = isSignup
      ? "http://localhost:3000/api/sellers/signup"
      : "http://localhost:3000/api/sellers/login";

    try {
      const { data } = await axios.post(url, formData);
      alert(`${isSignup ? "Signup" : "Login"} successful! Welcome to PulseCart.`);
      localStorage.setItem("isSellerLoggedIn", true);
      localStorage.setItem("sellerToken", data.token);
      localStorage.setItem("sellerUser", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong"
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] bg-[#fff7f2] px-4 py-8">
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full">
          {/* Left Side (Banner) */}
          <div className="hidden md:flex flex-col justify-center items-center w-full md:w-1/2 bg-[rgb(255,140,66)] text-white p-10">
            <img
              src="https://images.unsplash.com/photo-1581090467395-22d7dcbd3f38?auto=format&fit=crop&w=800&q=80"
              alt="Seller Banner"
              className="w-full h-auto mb-6 rounded-lg"
            />
            <h2 className="text-2xl font-bold text-white text-center">
              Sell on PulseCart
            </h2>
            <p className="mt-2 text-white text-center">
              Connect with millions of buyers and grow your business.
            </p>
          </div>

          {/* Right Side (Form) */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-1 text-center text-[rgb(255,140,66)]">
              {isSignup ? "Create Your Seller Account" : "Seller Login"}
            </h2>
            <p className="text-sm text-gray-600 mb-2 text-center">
              Join PulseCart and start selling your products with ease.
            </p>

            <p className="text-sm mb-4 text-center">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={toggleMode}
                className="text-[rgb(247,158,102)] font-semibold hover:underline"
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </button>
            </p>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    readOnly
                    className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </>
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <button
                type="submit"
                className="w-full bg-[rgb(255,140,66)] hover:bg-[rgb(255,120,46)] text-white p-3 rounded-lg font-semibold"
              >
                {isSignup ? "Sign Up" : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerLogin;
