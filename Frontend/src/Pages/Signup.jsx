import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const BASE_API_URL =
  import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${BASE_API_URL}/api/users/signup`, formData);
      alert("Signup successful! Please sign in.");
      navigate("/login");
    } catch (err) {
      if (err.response)
        setError(err.response.data.message || "Something went wrong");
      else if (err.request)
        setError("Server did not respond. Please try again.");
      else setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-[#fff5f0] p-4">
        <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden border border-[#FFD5B2]">
          {/* Left - Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold mb-2 text-[#FF8C42]">
              Join PulseCart
            </h2>
            <p className="text-sm text-gray-700 mb-6">
              Already have an account?{" "}
              <Link to="/login" className="text-[#FF8C42] underline">
                Sign In
              </Link>
            </p>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border border-[#FFCC99] rounded focus:ring-2 focus:ring-[#FF8C42] outline-none transition"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-[#FFCC99] rounded focus:ring-2 focus:ring-[#FF8C42] outline-none transition"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-[#FFCC99] rounded focus:ring-2 focus:ring-[#FF8C42] outline-none transition"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-[#FFCC99] rounded focus:ring-2 focus:ring-[#FF8C42] outline-none transition"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border border-[#FFCC99] rounded focus:ring-2 focus:ring-[#FF8C42] outline-none transition"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded text-white font-semibold transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#FF8C42] hover:bg-[#FFCC99] hover:text-[#FF8C42]"
                }`}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          </div>

          {/* Right - Illustration */}
          <div className="w-full md:w-1/2 bg-[#FFE8D8] flex items-center justify-center p-4">
            <img
              src="https://t3.ftcdn.net/jpg/02/80/01/60/360_F_280016018_hwMSB40bfAJmrTa842dxVh4yzZy72Kva.jpg"
              alt="PulseCart Signup Illustration"
              className="w-full h-full object-cover rounded-r-lg shadow-md"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
