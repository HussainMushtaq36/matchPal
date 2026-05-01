import React from "react";
import { useNavigate } from "react-router-dom";

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="text-[#0058bc]" style={{ width: "40px", height: "40px" }}>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="text-[#0058bc]" style={{ width: "40px", height: "40px" }}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M5 20c1.5-3 4-5 7-5s5.5 2 7 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="text-[#717786]" style={{ width: "40px", height: "40px" }}>
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="text-[#4b5565]" style={{ width: "40px", height: "40px" }}>
      <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="text-[#0058bc]" style={{ width: "40px", height: "40px" }}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="text-[#4b5565]" style={{ width: "40px", height: "40px" }}>
      <path d="M4 5h16v10H8l-4 4V5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="text-[#4b5565]" style={{ width: "40px", height: "40px" }}>
      <path d="M12 4a5 5 0 0 0-5 5v3.5L5 15h14l-2-2.5V9a5 5 0 0 0-5-5Z" stroke="currentColor" strokeWidth="2" />
      <path d="M10 18a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="text-[#4b5565]" style={{ width: "40px", height: "40px" }}>
      <path d="M12 3 5 6v6c0 5 3.5 8 7 9 3.5-1 7-4 7-9V6l-7-3Z" stroke="currentColor" strokeWidth="2" />
      <path d="m9.5 11.5 1.5 1.5 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="text-[#4b5565]" style={{ width: "40px", height: "40px" }}>
      <path d="M10 4H5v16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m14 8 5 4-5 4M19 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function NavIcon({ active = false }) {
  return (
    <div
      className={`h-[18px] w-[18px] rounded-sm border ${active ? "border-[#0058bc] bg-[#0058bc]/10" : "border-[#9aa0ac]"}`}
      style={{ width: "40px", height: "40px" }}
    />
  );
}

function NavRow({ icon, label, to, onClick, active = false, highlight = false, badge = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-14 w-full items-center justify-between rounded px-4 ${active ? "bg-white" : ""}`}
      aria-label={to}
    >
      <div className="flex items-center gap-3">
        <span className="h-5 w-5">{icon}</span>
        <span className={`${highlight ? "font-semibold text-[#181c23]" : "text-[#414755]"} text-[16px]`}>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge ? <span className="rounded-xl bg-[#9e3d00] px-2 py-0.5 text-[10px] font-bold text-white">{badge}</span> : null}
        <span className="h-3 w-2">{<ChevronIcon />}</span>
      </div>
    </button>
  );
}

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f9f9ff] px-3 py-5" style={{ maxWidth: "390px", margin: "0 auto", minHeight: "100vh" }}>
      <div className="relative mx-auto w-full max-w-[390px] overflow-hidden bg-[#f9f9ff] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between bg-[rgba(249,249,255,0.8)] px-6 backdrop-blur-[12px]">
          <div className="flex items-center gap-3">
            <MenuIcon />
            <span className="text-[18px] font-semibold text-[#181c23]">MatchPal</span>
          </div>
          <img
            src="https://www.figma.com/api/mcp/asset/a8dcd5ca-c056-45fe-980d-0dcfb5ef8974"
            alt="User avatar"
            className="h-10 w-10 rounded-xl object-cover"
            style={{ width: "40px", height: "40px" }}
          />
        </header>

        <main className="space-y-6 px-6 pb-24 pt-6">
          <section>
            <p className="text-[14px] font-bold uppercase tracking-[1.4px] text-[#0058bc]">Dashboard</p>
            <h1 className="mt-1 text-[44px] font-black leading-[1.1] text-[#181c23]">
              Hello,
              <br />
              Alex Rivers
            </h1>
          </section>

          <section className="space-y-1 rounded-lg bg-[#f1f3fe] p-2">
            <NavRow icon={<ProfileIcon />} label="View Profile" to="/view-profile" onClick={() => navigate("/view-profile")} active highlight />
            <NavRow icon={<ListIcon />} label="Edit Profile" to="/edit-profile" onClick={() => navigate("/edit-profile")} />
            <NavRow icon={<ListIcon />} label="Preferences" to="/preferences" onClick={() => navigate("/preferences")} />
          </section>

          <section className="space-y-1 rounded-lg bg-[#f1f3fe] p-2">
            <NavRow
              icon={<SearchIcon />}
              label="Search Roommates"
              to="/search-roommates"
              onClick={() => navigate("/search-roommates")}
              active
              highlight
            />
            <NavRow
              icon={<SearchIcon />}
              label="Suggested Matches"
              to="/suggested-matches"
              onClick={() => navigate("/suggested-matches")}
              badge="NEW"
            />
            <NavRow icon={<SearchIcon />} label="Match Requests" to="/match-requests" onClick={() => navigate("/match-requests")} />
          </section>

          <section className="space-y-1 rounded-lg bg-[#f1f3fe] p-2">
            <NavRow icon={<MessageIcon />} label="Messages" to="/messages" onClick={() => navigate("/messages")} />
            <NavRow icon={<BellIcon />} label="Notifications" to="/notifications" onClick={() => navigate("/notifications")} />
          </section>

          <section className="space-y-1 rounded-lg bg-[#f1f3fe] p-2">
            <NavRow icon={<ShieldIcon />} label="Report/Block" to="/report-block" onClick={() => navigate("/report-block")} />
            <NavRow icon={<LogoutIcon />} label="Logout" to="/" onClick={() => navigate("/")} />
          </section>
        </main>

        <nav className="absolute bottom-0 left-0 flex h-14 w-full items-start justify-between rounded-t-3xl border-t border-[#e0e2ed] bg-[rgba(249,249,255,0.9)] px-2 py-1 backdrop-blur-[6px]">
          <button type="button" onClick={() => navigate("/user-dashboard")} className="flex h-[52px] w-[90px] flex-col items-center rounded-2xl bg-[#f1f3fe] pt-1">
            <NavIcon active />
            <span className="text-[10px] uppercase tracking-[1px] text-[#0058bc]">Discover</span>
          </button>
          <button type="button" onClick={() => navigate("/suggested-matches")} className="flex h-[52px] w-[90px] flex-col items-center pt-1 opacity-40">
            <NavIcon />
            <span className="text-[10px] uppercase tracking-[1px] text-[#181c23]">Matches</span>
          </button>
          <button type="button" onClick={() => navigate("/messages")} className="flex h-[52px] w-[90px] flex-col items-center pt-1 opacity-40">
            <NavIcon />
            <span className="text-[10px] uppercase tracking-[1px] text-[#181c23]">Chat</span>
          </button>
          <button type="button" onClick={() => navigate("/view-profile")} className="flex h-[52px] w-[90px] flex-col items-center pt-1 opacity-40">
            <NavIcon />
            <span className="text-[10px] uppercase tracking-[1px] text-[#181c23]">Profile</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
