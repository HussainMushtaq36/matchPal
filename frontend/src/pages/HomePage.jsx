import React from "react";
import { useNavigate } from "react-router-dom";
import logoIcon from "../assets/logo-mark.svg";
import badgeHeartIcon from "../assets/badge-heart.svg";
import registerArrowIcon from "../assets/arrow-right.svg";

export default function HomePage() {
  const navigate = useNavigate();
  const heroImage =
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80";

  return (
    <div
      className="w-[390px] h-[844px] mx-auto overflow-x-hidden overflow-y-auto relative border border-gray-200 shadow-xl min-h-screen bg-[#f9f9ff] px-3 py-5"
      style={{ maxWidth: "390px", margin: "0 auto", minHeight: "100vh" }}
    >
      <div className="mx-auto w-full max-w-[390px] overflow-hidden rounded-3xl bg-[#f9f9ff] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
        <header className="sticky top-0 z-20 h-16 bg-[rgba(249,249,255,0.8)] backdrop-blur-[12px]">
          <div className="flex h-full items-center px-6">
            <img src={logoIcon} alt="MatchPal logo" className="h-5 w-5" style={{ width: "40px", height: "40px" }} />
            <span className="ml-3 text-[18px] font-semibold leading-7 text-[#181c23]">MatchPal</span>
          </div>
        </header>

        <section className="px-8 pt-8">
          <div className="relative h-full w-full">
            <div className="absolute -inset-2 rotate-3 rounded-[40px] bg-[rgba(0,112,235,0.05)]" />
            <div className="absolute -inset-2 -rotate-3 rounded-[40px] bg-[rgba(0,88,188,0.05)]" />
            <div className="relative h-80 overflow-hidden rounded-[40px] bg-white">
              <img src={heroImage} alt="MatchPal lifestyle" className="h-full w-full object-contain" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#f9f9ff] via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-6 -right-2 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_12px_24px_-4px_rgba(24,28,35,0.08)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a1befd]">
                <img src={badgeHeartIcon} alt="" className="h-5 w-5" style={{ width: "40px", height: "40px" }} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[1px] text-[#717786]">Match Quality</p>
                <p className="text-sm font-semibold text-[#0058bc]">98.4% Accuracy</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-8 pb-10 pt-8">
          <h1 className="text-[58px] leading-[1.1] text-[#181c23]">
            <span className="block">Find your</span>
            <span className="block">
              <span className="text-[#0058bc]">next</span> story.
            </span>
          </h1>

          <p className="mt-[14px] max-w-[280px] text-sm leading-[22.75px] text-[#414755]">
            The editorial approach to roommate matching. Experience curated connections tailored to your
            lifestyle.
          </p>

          <div className="mt-4 flex flex-col gap-4">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#0058bc] text-base font-semibold text-white shadow-[0_10px_15px_-3px_rgba(0,88,188,0.10),0_4px_6px_-4px_rgba(0,88,188,0.10)]"
            >
              <span>Register</span>
              <img src={registerArrowIcon} alt="" className="h-5 w-5" style={{ width: "40px", height: "40px" }} />
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="h-14 w-full rounded-lg bg-[#e6e8f3] text-base font-semibold text-[#0058bc]"
            >
              Login
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 pb-4 pt-4">
            <div className="h-px flex-1 bg-[#e0e2ed]" />
            <p className="text-[10px] uppercase tracking-[2px] text-[#717786]">Social Access</p>
            <div className="h-px flex-1 bg-[#e0e2ed]" />
          </div>
        </section>
      </div>
    </div>
  );
}