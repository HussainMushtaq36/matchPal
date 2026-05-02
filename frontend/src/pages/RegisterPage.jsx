import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoIcon from "../assets/logo-mark.svg";
import { supabase } from "../db/supabaseClient";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", userType: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // All new accounts are standard app users (role: 'user'). Never pass an RBAC/admin role
      // or any role field to the auth backend from this screen — roles are assigned only via admin tooling / server policy.
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      alert("Registration successful! You can now login");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center gap-3">
          <img src={logoIcon} alt="MatchPal logo" className="h-10 w-10" />
          <span className="text-xl font-bold text-[#181c23]">MatchPal</span>
        </div>

        <h1 className="text-3xl font-semibold text-[#181c23]">Create Account</h1>
        <p className="mt-2 text-sm text-[#596171]">Find your best match in minutes.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <input
            required
            placeholder="Full Name"
            className="h-12 w-full rounded-xl border border-[#d9ddea] px-4 outline-none focus:border-[#0058bc]"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input
            required
            type="email"
            placeholder="you@example.com"
            className="h-12 w-full rounded-xl border border-[#d9ddea] px-4 outline-none focus:border-[#0058bc]"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input
            required
            type="password"
            placeholder="Password"
            className="h-12 w-full rounded-xl border border-[#d9ddea] px-4 outline-none focus:border-[#0058bc]"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <select
            required
            className="h-12 w-full rounded-xl border border-[#d9ddea] bg-white px-4 outline-none"
            onChange={(e) => setFormData({...formData, userType: e.target.value})}
          >
            <option value="">Select User Type</option>
            <option value="student">Student</option>
            <option value="professional">Professional</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-12 w-full rounded-xl bg-[#0058bc] font-bold text-white shadow-lg disabled:opacity-50"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#596171]">
          Have an account? <button type="button" onClick={() => navigate("/login")} className="font-bold text-[#0058bc]">Login</button>
        </p>
      </div>
    </div>
  );
}
