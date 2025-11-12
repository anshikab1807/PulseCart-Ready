import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
export default function ResetPasswordConfirm() {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const params = new URLSearchParams(useLocation().search);
  const email = params.get("email");
  const otp = params.get("otp");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== cpassword) return setMsg("⚠️ Passwords do not match");
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/reset-password/confirm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp, newPassword: password }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMsg("✅ Password reset successfully! Redirecting...");
        setTimeout(() => navigate("/login"), 1500);
      } else setMsg(data.msg || "❌ Reset failed.");
    } catch {
      setMsg("⚠️ Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5EE]">
      <form
        className="space-y-5 bg-white shadow-lg p-7 rounded-2xl w-full max-w-md border border-[#FF8C42]/30"
        onSubmit={handleSubmit}
      >
        <img src={logoUrl} className="mx-auto w-36 mb-3" alt="PulseCart" />
        <h2 className="font-bold text-lg mb-3 text-[#FF8C42] text-center">
          Set New Password
        </h2>

        <input
          type="password"
          className="w-full border py-3 rounded px-3 border-[#FF8C42]/40 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]/60"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          minLength={6}
          required
        />

        <input
          type="password"
          className="w-full border py-3 rounded px-3 border-[#FF8C42]/40 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]/60"
          value={cpassword}
          onChange={(e) => setCPassword(e.target.value)}
          placeholder="Confirm password"
          minLength={6}
          required
        />

        <button
          className="w-full py-3 bg-[#FF8C42] text-white rounded-xl hover:bg-[#ffa867] mt-2 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
        </button>

        {msg && <div className="text-center mt-2 text-[#FF8C42]">{msg}</div>}
      </form>
    </div>
  );
}
