import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, AlertCircle, LogOut, Activity, BarChart3, LayoutDashboard, UserCircle } from "lucide-react";
import { adminService } from "../db/AdminService";
import { authService } from "../db/AuthService";
import { profileService } from "../db/ProfileService";

// Simplified Tile for high-fidelity feel
function Tile({ title, onClick, icon: Icon, primary = false }) {
  return (
    <button
      onClick={onClick}
      className={`flex h-36 flex-col justify-between rounded-[24px] p-5 text-left transition-transform active:scale-95 ${
        primary ? "bg-[#0058bc] text-white shadow-lg shadow-blue-200" : "bg-[#f0f2f8] text-[#181c23]"
      }`}
    >
      <div className={`p-2 rounded-xl w-fit ${primary ? "bg-white/20" : "bg-white"}`}>
        <Icon size={24} color={primary ? "#ffffff" : "#0058bc"} />
      </div>
      <span className="text-sm font-black leading-tight">{title}</span>
    </button>
  );
}

function StatCard({ label, value, valueColor = "#181c23" }) {
  return (
    <div className="flex-1 rounded-[24px] bg-white p-4 shadow-sm border border-gray-50">
      <p className="text-[8px] font-black uppercase tracking-widest text-[#596171]">{label}</p>
      <p className="mt-1 text-2xl font-black" style={{ color: valueColor }}>
        {value}
      </p>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [pendingMatches, setPendingMatches] = useState(0);
  const [reportedUsers, setReportedUsers] = useState(0);
  const [newSignups, setNewSignups] = useState(0);
  const [adminProfile, setAdminProfile] = useState(null);

  useEffect(() => {
    const loadPendingMatches = async () => {
      try {
        const count = await adminService.getPendingMatchesCount();
        const reports = await adminService.getAllReports();
        const users = await adminService.getAllUsers();
        const current = await authService.getCurrentUser();
        const profile = await profileService.getProfile(current.id);
        setPendingMatches(count);
        setReportedUsers(reports.filter((r) => r.status === "Pending").length);
        setNewSignups(users.length);
        setAdminProfile(profile);
      } catch (error) {
        console.error(error);
      }
    };
    loadPendingMatches();
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col items-center py-5 px-4">
      <div className="w-full max-w-[390px] bg-[#f9f9ff] rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative min-h-[800px]">
        
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between px-6 bg-[#f9f9ff]/80 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="bg-[#0058bc] p-1.5 rounded-lg">
              <Activity size={18} color="white" />
            </div>
            <span className="text-lg font-black tracking-tight text-[#181c23]">MatchPal</span>
          </div>
          <button type="button" onClick={() => navigate(`/admin/view-profile/${adminProfile?.id || ""}`)}
            className="h-10 w-10 shrink-0 rounded-2xl bg-gray-200 overflow-hidden border-2 border-white shadow-sm ring-offset-2 focus:outline-none focus:ring-2 focus:ring-[#0058bc]"
            aria-label="Profile"
          >
            <img src={adminProfile?.avatar_url || "https://i.pravatar.cc/100?img=3"} alt="" className="h-full w-full object-cover" />
          </button>
        </header>

        <main className="px-6 pb-32">
          {/* Welcome Section */}
          <section className="mt-4">
            <p className="text-[10px] font-black text-[#0058bc] uppercase tracking-[0.2em]">Administrator</p>
            <h1 className="text-4xl font-black text-[#181c23] leading-none mt-2">System Control</h1>
            <div className="mt-5 bg-white/60 rounded-3xl p-5 border border-white">
              <p className="text-xs font-bold leading-relaxed text-[#596171]">
                Manage student profiles, monitor activity reports, and ensure platform integrity.
              </p>
            </div>
          </section>

          {/* Core Actions Grid (Moderation Removed) */}
          <section className="mt-8 grid grid-cols-2 gap-4">
            <Tile title="Manage Students" icon={Users} onClick={() => navigate("/admin/user-management")} primary />
            <Tile title="Reports" icon={AlertCircle} onClick={() => navigate("/admin/reports")} />
            <Tile title="System Logout" icon={LogOut} onClick={() => navigate("/")} />
          </section>

          {/* Stats Section */}
          <section className="mt-8 space-y-4">
            <div className="flex justify-between items-center">
               <p className="text-[10px] font-black text-[#596171] uppercase tracking-widest ml-1">Live Analytics</p>
               <BarChart3 size={14} className="text-gray-400" />
            </div>
            
            <div className="rounded-[32px] bg-white p-6 shadow-sm border border-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-[#596171] uppercase tracking-widest">Pending Matches</p>
                  <p className="text-4xl font-black text-[#181c23] mt-1">{pendingMatches}</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-[#0058bc]/5 flex items-center justify-center">
                  <Activity size={24} className="text-[#0058bc]" />
                </div>
              </div>
              <div className="mt-6 h-1.5 rounded-full bg-[#f0f2f8] overflow-hidden">
                <div className="h-full bg-[#0058bc] w-3/4 rounded-full" />
              </div>
            </div>

            <div className="flex gap-4">
              <StatCard label="Reported Users" value={String(reportedUsers)} valueColor="#9e3d00" />
              <StatCard label="New Signups" value={String(newSignups)} valueColor="#0058bc" />
            </div>
          </section>
        </main>

        {/* Bottom Nav */}
        <nav className="absolute bottom-0 left-0 w-full h-24 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-8 flex justify-between items-center pb-4">
          <button className="flex flex-col items-center gap-1.5 text-[#0058bc]">
            <LayoutDashboard size={22} />
            <span className="text-[8px] font-black uppercase tracking-widest">Control</span>
          </button>
          <button onClick={() => navigate(`/admin/view-profile/${adminProfile?.id || ""}`)} className="flex flex-col items-center gap-1.5 text-gray-400">
            <UserCircle size={22} />
            <span className="text-[8px] font-black uppercase tracking-widest">Settings</span>
          </button>
        </nav>
      </div>
    </div>
  );
}