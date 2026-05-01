import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone } from "lucide-react";

const wrapperStyle = {
  maxWidth: "390px",
  margin: "0 auto",
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
};

export default function ViewProfile() {
  const navigate = useNavigate();

  return (
    <div style={wrapperStyle} className="px-4 pb-8 pt-5">
      <button type="button" onClick={() => navigate("/user-dashboard")} className="flex items-center justify-center gap-3 self-start text-[#0058bc]">
        <ArrowLeft size={20} style={{ minWidth: "20px" }} />
        <span className="font-semibold">Back</span>
      </button>

      <h1 className="mt-4 text-2xl font-bold text-[#111827]">View Profile</h1>
      <div className="mt-5 rounded-xl border border-[#e5e7eb] p-4">
        <div className="mx-auto h-24 w-24 rounded-lg bg-[#e5e7eb]">
          <img
            src="https://i.pravatar.cc/200?img=12"
            alt="Profile"
            className="h-full w-full"
            style={{ objectFit: "cover", borderRadius: "8px" }}
            onError={(e) => {
              e.currentTarget.style.opacity = "0";
            }}
          />
        </div>
        <h2 className="mt-3 text-center text-xl font-semibold text-[#111827]">Alex Rivers</h2>
        <p className="text-center text-sm text-[#6b7280]">Software Engineer • Dhaka</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 rounded-lg bg-[#f3f4f6] p-2">
            <Mail size={24} className="text-[#0058bc]" />
            <span className="text-sm text-[#374151]">alex@matchpal.com</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-[#f3f4f6] p-2">
            <Phone size={24} className="text-[#0058bc]" />
            <span className="text-sm text-[#374151]">+880 1712 000000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
