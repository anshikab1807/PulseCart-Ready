import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const BASE_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_API_URL}/api/users/login`, {
        email,
        password,
      });

      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userId', data.user.id);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-[#fff5f0]">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
          {/* Left Section */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#ff8c42]">
              Welcome Back
            </h2>
            {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

            {/* Email Login Form */}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 mb-4 border rounded border-[#ffcc99]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Your Password"
                className="w-full p-3 mb-4 border rounded border-[#ffcc99]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-center justify-between mb-4">
                <label className="text-sm text-gray-700">
                  <input type="checkbox" className="mr-2" />
                  Keep me logged in
                </label>
                <Link to="/reset-password" className="text-sm text-[#ff8c42] hover:underline">
                  Forgot password
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#ff8c42] text-white py-2 rounded hover:bg-[#ffcc99] transition-colors"
              >
                Log in
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don’t have an account?{' '}
              <Link to="/register" className="text-[#ff8c42] hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Right Section (Illustration) */}
          <div className="w-full md:w-1/2 bg-[#fff0e5] flex items-center justify-center p-6 relative">
            <img
              src="https://media.istockphoto.com/id/1045443496/photo/password.webp?a=1&b=1&s=612x612&w=0&k=20&c=0BwFoJb9DywBbGe__siCMVTERpb6pImOJkSRxYNbILI="
              alt="Illustration"
              className="max-w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
