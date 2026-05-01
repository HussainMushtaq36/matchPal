import React from "react";
import { useNavigate } from "react-router-dom";
import logoIcon from "../assets/logo-mark.svg";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-[#f9f9ff] px-3 py-5"
      style={{ maxWidth: "390px", margin: "0 auto", minHeight: "100vh" }}
    >
      <div className="mx-auto w-full max-w-[390px] overflow-hidden bg-[#f9f9ff] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
        <section className="bg-[#c9d3e1]/60 px-8 pb-11 pt-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-[#0070eb] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]">
            <img src={logoIcon} alt="MatchPal logo" className="h-8 w-8" style={{ width: "40px", height: "40px" }} />
          </div>
          <h1 className="mt-8 text-[58px] leading-[1.1] text-[#181c23]">MatchPal</h1>
          <p className="mt-3 text-[32px] leading-[1.2] text-[#717786]">Find your perfect living space</p>
        </section>

        <section className="px-8 pb-12 pt-5">
          <div className="space-y-10">
            <div>
              <label className="mb-2 block text-[24px] text-[#212934]" htmlFor="username">
                username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Type here..."
                className="h-12 w-full rounded-lg border border-[#d5dde5] bg-[#b6b1f4] px-3 text-[20px] text-[#d5dde5] outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-[24px] text-[#212934]" htmlFor="password">
                password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Type here..."
                className="h-12 w-full rounded-lg border border-[#4773a1] bg-[#a3a4f5] px-3 text-[20px] text-[#d5dde5] outline-none"
              />
            </div>
          </div>

          <div className="mt-10 space-y-7">
            <button
              type="button"
              onClick={() => navigate("/user-dashboard")}
              className="h-14 w-full rounded-lg bg-gradient-to-r from-[#0058bc] to-[#0070eb] text-3xl text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
            >
              User
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin-dashboard")}
              className="h-14 w-full rounded-lg bg-gradient-to-r from-[#0058bc] to-[#0070eb] text-3xl text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="h-14 w-full rounded-lg bg-[#e6e8f3] text-3xl text-[#0058bc]"
            >
              Back to Home
            </button>
          </div>

          <p className="mt-12 text-center text-[32px] text-[#414755]">
            New to the community?{" "}
            <button type="button" onClick={() => navigate("/register")} className="text-[#0058bc]">
              Register
            </button>
          </p>
        </section>
      </div>
    </div>
  );
}