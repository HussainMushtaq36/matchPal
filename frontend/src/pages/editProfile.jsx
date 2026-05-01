import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

const wrapperStyle = {
  maxWidth: "390px",
  margin: "0 auto",
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
};

export default function EditProfile() {
  const navigate = useNavigate();

  return (
    <div style={wrapperStyle} className="px-4 pb-8 pt-5">
      <button type="button" onClick={() => navigate("/user-dashboard")} className="flex items-center justify-center gap-3 self-start text-[#0058bc]">
        <ArrowLeft size={20} style={{ minWidth: "20px" }} />
        <span className="font-semibold">Back</span>
      </button>
      <h1 className="mt-4 text-2xl font-bold text-[#111827]">Edit Profile</h1>

      <div className="mt-5 rounded-xl border border-[#e5e7eb] p-4">
        <div className="h-28 w-28 rounded-lg bg-[#e5e7eb]">
          <img
            src="https://i.pravatar.cc/220?img=12"
            alt="Profile"
            className="h-full w-full"
            style={{ objectFit: "cover", borderRadius: "8px" }}
            onError={(e) => {
              e.currentTarget.style.opacity = "0";
            }}
          />
        </div>
        <div className="mt-4 space-y-3">
          <input className="w-full rounded-lg border border-[#d1d5db] px-3 py-2" defaultValue="Alex Rivers" />
          <input className="w-full rounded-lg border border-[#d1d5db] px-3 py-2" defaultValue="alex@matchpal.com" />
          <textarea className="w-full rounded-lg border border-[#d1d5db] px-3 py-2" rows={3} defaultValue="Clean and respectful roommate." />
        </div>
        <button type="button" className="mt-3 w-full flex items-center justify-center gap-3 rounded-lg bg-[#0058bc] px-3 py-2 text-sm font-semibold text-white">
          <Save size={20} style={{ minWidth: "20px" }} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
