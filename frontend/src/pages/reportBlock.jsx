import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Ban } from "lucide-react";

const wrapperStyle = {
  maxWidth: "390px",
  margin: "0 auto",
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
};

export default function ReportBlock() {
  const navigate = useNavigate();

  return (
    <div style={wrapperStyle} className="px-4 pb-8 pt-5">
      <button type="button" onClick={() => navigate("/user-dashboard")} className="flex items-center justify-center gap-3 self-start text-[#0058bc]">
        <ArrowLeft size={20} style={{ minWidth: "20px" }} />
        <span className="font-semibold">Back</span>
      </button>

      <h1 className="mt-4 text-2xl font-bold text-[#111827]">Report / Block</h1>
      <p className="mt-1 text-sm text-[#6b7280]">Take action on inappropriate behavior.</p>

      <div className="mt-5 space-y-3 rounded-xl border border-[#e5e7eb] p-4">
        <textarea placeholder="Describe the issue..." rows={4} className="w-full rounded-lg border border-[#d1d5db] px-3 py-2" />
        <button type="button" className="w-full flex items-center justify-center gap-3 rounded-lg bg-[#dc2626] px-3 py-2 text-sm font-semibold text-white">
          <AlertTriangle size={20} style={{ minWidth: "20px" }} />
          Submit Report
        </button>
        <button type="button" className="w-full flex items-center justify-center gap-3 rounded-lg border border-[#d1d5db] px-3 py-2 text-sm font-semibold text-[#374151]">
          <Ban size={20} style={{ minWidth: "20px" }} />
          Block User
        </button>
      </div>
    </div>
  );
}
