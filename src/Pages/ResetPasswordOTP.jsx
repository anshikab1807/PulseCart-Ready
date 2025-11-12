import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
export default function ResetPasswordOTP() {
  const [otp, setOTP] = useState("");
  const [msg, setMsg] = useState("");
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const params = new URLSearchParams(useLocation().search);
  const email = params.get("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/reset-password/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMsg("✅ OTP verified! Redirecting...");
        setTimeout(
          () =>
            navigate(
              `/reset-password/confirm?email=${encodeURIComponent(
                email
              )}&otp=${otp}`
            ),
          1200
        );
      } else setMsg(data.msg || "❌ Invalid or expired OTP.");
    } catch {
      setMsg("⚠️ Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setMsg("");
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
        setMsg("🔁 OTP resent to your email.");
        setTimer(60);
      } else setMsg(data.msg || "Failed to resend OTP.");
    } catch {
      setMsg("⚠️ Server error. Try again.");
    } finally {
      setResending(false);
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
          Enter the OTP sent to your email
        </h2>
        <input
          maxLength={6}
          className="w-full border py-3 rounded px-3 text-center tracking-widest text-lg border-[#FF8C42]/40 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]/60"
          autoFocus
          value={otp}
          onChange={(e) => setOTP(e.target.value.replace(/\D/, ""))}
          placeholder="6-digit OTP"
          required
        />
        <button
          className="w-full py-3 bg-[#FF8C42] text-white rounded-xl hover:bg-[#ffa867] mt-2 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
        </button>
        <div className="text-center mt-2">
          {timer > 0 ? (
            <span className="text-gray-500 text-sm">
              Resend OTP in {timer}s
            </span>
          ) : (
            <button
              type="button"
              className="text-sm text-[#FF8C42] hover:underline"
              onClick={handleResend}
              disabled={resending}
            >
              {resending ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>
        {msg && <div className="text-center mt-2 text-[#FF8C42]">{msg}</div>}
      </form>
    </div>
  );
}
