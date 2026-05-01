import React from "react";
import { useNavigate } from "react-router-dom";
import logoIcon from "../assets/logo-mark.svg";

function AdminIcon({ color = "#0058bc" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "40px", height: "40px", color }}>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Tile({ title, onClick, primary = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-40 flex-col justify-between rounded-lg p-6 text-left ${primary ? "bg-[#0058bc] text-white" : "bg-[#e0e2ed] text-[#181c23]"}`}
    >
      <AdminIcon color={primary ? "#ffffff" : "#0058bc"} />
      <span className={`text-[20px] font-bold ${primary ? "text-white" : "text-[#181c23]"}`}>{title}</span>
    </button>
  );
}

function StatCard({ label, value, valueColor = "#181c23" }) {
  return (
    <div className="flex-1 rounded-lg bg-white p-4">
      <p className="text-[10px] font-bold uppercase text-[#414755]">{label}</p>
      <p className="mt-1 text-[28px] font-black" style={{ color: valueColor }}>
        {value}
      </p>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f9f9ff] px-3 py-5" style={{ maxWidth: "390px", margin: "0 auto", minHeight: "100vh" }}>
      <div className="relative mx-auto w-full max-w-[390px] overflow-hidden bg-[#f9f9ff] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between bg-[rgba(249,249,255,0.8)] px-6 backdrop-blur-[24px]">
          <div className="flex items-center gap-3">
            <img src={logoIcon} alt="MatchPal logo" className="h-5 w-5" style={{ width: "40px", height: "40px" }} />
            <span className="text-[18px] font-black text-[#181c23]">MatchPal</span>
          </div>
          <div className="h-8 w-8 rounded-xl bg-[#d9ddea]" style={{ width: "40px", height: "40px" }} />
        </header>

        <main className="space-y-8 px-6 pb-24 pt-4">
          <section className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#0058bc]">Administrator</p>
            <h1 className="text-[44px] font-bold leading-[1.1] text-[#181c23]">System Control</h1>
            <div className="rounded-lg bg-[#f1f3fe] px-4 py-4">
              <p className="text-[14px] leading-[22.75px] text-[#414755]">
                Manage student matches, monitor activity reports, and maintain platform integrity.
              </p>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4">
            <Tile title="Manage Students" onClick={() => navigate("/admin/user-management")} primary />
            <Tile title="Reports" onClick={() => navigate("/admin/reports")} />
            <Tile title="Moderation" onClick={() => navigate("/admin/moderation")} />
            <Tile title="Logout" onClick={() => navigate("/")} />
          </section>

          <section className="space-y-4">
            <p className="text-[12px] font-bold uppercase tracking-[1px] text-[#414755]">Active Monitoring</p>
            <div className="rounded-lg bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] text-[#414755]">Pending Matches</p>
                  <p className="text-[32px] font-black text-[#181c23]">124</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-[#a1befd]/20" style={{ width: "40px", height: "40px" }} />
              </div>
              <div className="mt-5 h-1 rounded-full bg-[#ecedf9]" />
            </div>
            <div className="flex gap-4">
              <StatCard label="Reported" value="08" valueColor="#9e3d00" />
              <StatCard label="New Registrations" value="+32" valueColor="#0058bc" />
            </div>
          </section>
        </main>

        <nav className="absolute bottom-0 left-0 flex h-[84px] w-full items-start justify-between rounded-t-3xl border-t border-[#e0e2ed] bg-[rgba(249,249,255,0.9)] px-4 py-4 backdrop-blur-[12px]">
          <button
            type="button"
            onClick={() => navigate("/admin-dashboard")}
            className="flex h-12 items-center justify-center rounded-2xl bg-[#f1f3fe] px-4 text-[10px] uppercase tracking-[1px] text-[#0058bc]"
          >
            <span className="mr-2">
              <AdminIcon />
            </span>
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/profile")}
            className="flex h-12 items-center justify-center px-4 text-[10px] uppercase tracking-[1px] text-[#181c23] opacity-40"
          >
            <span className="mr-2">
              <AdminIcon color="#181c23" />
            </span>
            Profile
          </button>
        </nav>
      </div>
    </div>
  );
}
