import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Hash, LogOut } from "lucide-react";
import { adminService } from "../db/AdminService";

export default function AdminViewProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (!userId) return;
      try {
        const row = await adminService.getUserById(userId);
        const pref = await adminService.getPreferencesByUserId(userId);
        setProfile(row);
        setPreferences(pref);
      } catch (error) {
        console.error(error);
      }
    };
    loadUser();
  }, [userId]);

  return (
    <div className="w-[390px] h-[844px] mx-auto overflow-x-hidden overflow-y-auto relative border border-gray-200 shadow-xl min-h-screen bg-[#f9f9ff] flex justify-center">
      <div className="w-full max-w-[390px] mx-auto min-h-screen px-6 pb-20 pt-14">
        <button type="button" onClick={() => navigate("/admin-dashboard")} className="mb-8 flex items-center gap-1 text-sm font-bold text-[#414755] active:opacity-70">
          <ChevronLeft size={22} strokeWidth={2.5} className="text-[#181c23]" />
          Back
        </button>

        <section className="flex flex-row flex-wrap items-start gap-6">
          <div className="h-40 w-40 overflow-hidden rounded-lg bg-[#e0e2ed]">
            <img src={profile?.avatar_url || "https://i.pravatar.cc/320?img=11"} alt="profile" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1 basis-[200px] space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[#0058bc]">Read-Only Audit View</p>
            <h1 className="text-[36px] leading-[40px] font-black tracking-tight text-[#181c23]">{profile?.full_name || "User"}</h1>
            <div className="flex items-center gap-2 text-base leading-6 text-[#414755]">
              <Hash size={18} className="shrink-0 opacity-70" />
              <span>{profile?.id}</span>
            </div>
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-6 rounded-lg bg-[#f1f3fe] p-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-[0.05em] text-[#414755]">Full name</span>
            <input readOnly value={profile?.full_name || ""} className="w-full rounded-lg px-4 py-3 text-base bg-white text-[#181c23]" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-[0.05em] text-[#414755]">Email address</span>
            <input readOnly value={profile?.email || ""} className="w-full rounded-lg px-4 py-3 text-base bg-white text-[#181c23]" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-[0.05em] text-[#414755]">Account status</span>
            <input readOnly value={profile?.status || "Active"} className="w-full rounded-lg px-4 py-3 text-base bg-white text-[#181c23]" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-[0.05em] text-[#414755]">Bio</span>
            <textarea readOnly rows={4} value={profile?.bio || ""} className="w-full resize-none rounded-lg bg-white px-4 py-3 text-base text-[#181c23]" />
          </div>
          <div className="flex flex-wrap gap-2">
            {(preferences?.tags || []).map((tag) => (
              <span key={tag} className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-[#a1befd] text-[#2d4c83]">{tag}</span>
            ))}
          </div>
        </div>

        <button type="button" onClick={() => navigate("/")} className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#0058bc] bg-white py-4 text-sm font-black text-[#0058bc]">
          <LogOut size={20} strokeWidth={2.25} />
          Log out
        </button>
      </div>
    </div>
  );
}
