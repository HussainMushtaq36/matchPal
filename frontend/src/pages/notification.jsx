import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";

const wrapperStyle = {
  maxWidth: "390px",
  margin: "0 auto",
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
};

export default function Notification() {
  const navigate = useNavigate();

  return (
    <div style={wrapperStyle} className="px-4 pb-8 pt-5">
      <button type="button" onClick={() => navigate("/user-dashboard")} className="flex items-center justify-center gap-3 self-start text-[#0058bc]">
        <ArrowLeft size={20} style={{ minWidth: "20px" }} />
        <span className="font-semibold">Back</span>
      </button>
      <h1 className="mt-4 text-2xl font-bold text-[#111827]">Notifications</h1>
      <div className="mt-5 space-y-3">
        {["New match found", "Profile view alert", "Message received"].map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-xl border border-[#e5e7eb] p-3">
            <Bell size={24} className="text-[#0058bc]" />
            <div>
              <p className="font-semibold text-[#111827]">{item}</p>
              <p className="text-sm text-[#6b7280]">2 min ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
