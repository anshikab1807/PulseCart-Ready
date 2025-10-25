import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const logoUrl = "https://i.postimg.cc/9fwVdFhc/PulseCart-logo.png"; // 🧡 Updated logo (light peach theme)

export default function ResetPasswordRequest() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/reset-password/request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMsg("✅ OTP sent to your registered email.");
        setTimeout(
          () =>
            navigate(`/reset-password/otp?email=${encodeURIComponent(email)}`),
          1000
        );
      } else {
        setMsg(data.msg || "❌ Something went wrong.");
      }
    } catch {
      setMsg("⚠️ Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff7f2]">
      <form
        className="space-y-5 bg-white shadow-lg p-8 rounded-2xl w-full max-w-md border border-[#FFD5B2]"
        onSubmit={handleSubmit}
      >
        <img src={logoUrl} className="mx-auto w-36 mb-4" alt="PulseCart" />

        <h2 className="font-bold text-2xl text-center text-[#FF8C42] mb-2">
          Reset Password
        </h2>

        <p className="text-gray-600 text-center text-sm mb-4">
          Enter your registered email to receive an OTP.
        </p>

        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF8C42] outline-none"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your registered email"
          required
        />

        <button
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#FF8C42] hover:bg-[#e6732d]"
          }`}
          type="submit"
          disabled={loading}
        >
        </button>

        {msg && (
          <div className="text-center mt-3 text-sm text-[#FF8C42] font-medium">
            {msg}
          </div>
        )}
      </form>
    </div>
  );
}
