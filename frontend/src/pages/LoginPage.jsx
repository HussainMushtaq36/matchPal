import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoIcon from "../assets/logo-mark.svg";
import { authService } from "../db/AuthService";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (role) => {
    if (!email || !password) return alert("Please fill in all fields.");
    setLoading(true);
    try {
      const { user, error } = await authService.login(email, password);
      if (error) throw error;
      
      role === 'admin' ? navigate("/admin-dashboard") : navigate("/user-dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex items-center justify-center p-4">
      {/* iPhone 14 Width is roughly 390px */}
      <div className="w-full max-w-[390px] overflow-hidden rounded-3xl bg-white shadow-2xl">
        <section className="bg-[#c9d3e1]/60 px-8 pb-11 pt-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-[#0070eb] shadow-md">
            <img src={logoIcon} alt="MatchPal logo" className="h-10 w-10" />
          </div>
          <h1 className="mt-6 text-[48px] font-bold leading-tight text-[#181c23]">MatchPal</h1>
          <p className="mt-2 text-[20px] text-[#717786]">Find your perfect space</p>
        </section>

        <section className="px-8 pb-10 pt-5">
          <div className="space-y-6">
            <div>
              <label className="mb-1 block text-lg text-[#212934]">email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-lg border border-[#d5dde5] bg-[#f0efff] px-3 outline-none focus:border-[#0070eb]"
              />
            </div>
            <div>
              <label className="mb-1 block text-lg text-[#212934]">password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-lg border border-[#d5dde5] bg-[#f0efff] px-3 outline-none focus:border-[#0070eb]"
              />
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={() => handleLogin('user')}
              disabled={loading}
              className="h-14 w-full rounded-lg bg-[#0070eb] text-2xl text-white font-semibold disabled:opacity-50"
            >
              {loading ? "..." : "User Login"}
            </button>
            <button
              onClick={() => handleLogin('admin')}
              disabled={loading}
              className="h-14 w-full rounded-lg border-2 border-[#0070eb] text-2xl text-[#0070eb] font-semibold"
            >
              Admin Login
            </button>
          </div>

          <p className="mt-8 text-center text-lg text-[#414755]">
            New? <button onClick={() => navigate("/register")} className="text-[#0058bc] font-bold">Register</button>
          </p>
        </section>
      </div>
    </div>
  );
}