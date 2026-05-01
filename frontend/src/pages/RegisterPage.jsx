import React from "react";
import { useNavigate } from "react-router-dom";
import logoIcon from "../assets/logo-mark.svg";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-[#f9f9ff] px-3 py-5"
      style={{ maxWidth: "390px", margin: "0 auto", minHeight: "100vh" }}
    >
      <div className="mx-auto w-full max-w-[390px] rounded-3xl bg-white p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)]">
        <div className="mb-8 flex items-center gap-3">
          <img src={logoIcon} alt="MatchPal logo" className="h-5 w-5" style={{ width: "40px", height: "40px" }} />
          <span className="text-lg font-semibold text-[#181c23]">MatchPal</span>
        </div>

        <h1 className="text-3xl font-semibold text-[#181c23]">Create Account</h1>
        <p className="mt-2 text-sm text-[#596171]">Start finding your best match in minutes.</p>

        <form className="mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#181c23]">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              className="h-12 w-full rounded-xl border border-[#d9ddea] px-4 text-sm text-[#181c23] outline-none transition focus:border-[#0058bc] focus:ring-2 focus:ring-[#0058bc]/15"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#181c23]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="h-12 w-full rounded-xl border border-[#d9ddea] px-4 text-sm text-[#181c23] outline-none transition focus:border-[#0058bc] focus:ring-2 focus:ring-[#0058bc]/15"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#181c23]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              className="h-12 w-full rounded-xl border border-[#d9ddea] px-4 text-sm text-[#181c23] outline-none transition focus:border-[#0058bc] focus:ring-2 focus:ring-[#0058bc]/15"
            />
          </div>

          <div>
            <label htmlFor="userType" className="mb-2 block text-sm font-medium text-[#181c23]">
              User Type
            </label>
            <select
              id="userType"
              name="userType"
              defaultValue=""
              className="h-12 w-full rounded-xl border border-[#d9ddea] bg-white px-4 text-sm text-[#181c23] outline-none transition focus:border-[#0058bc] focus:ring-2 focus:ring-[#0058bc]/15"
            >
              <option value="" disabled>
                Select user type
              </option>
              <option value="student">Student</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-2 h-12 w-full rounded-xl bg-[#0058bc] text-base font-semibold text-white shadow-[0_10px_15px_-3px_rgba(0,88,188,0.15)]"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#596171]">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-semibold text-[#0058bc] underline-offset-2 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}