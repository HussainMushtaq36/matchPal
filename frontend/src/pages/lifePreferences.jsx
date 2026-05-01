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

export default function LifePreferences() {
  const navigate = useNavigate();

  return (
    <div style={wrapperStyle} className="px-4 pb-8 pt-5">
      <button type="button" onClick={() => navigate("/user-dashboard")} className="flex items-center justify-center gap-3 self-start text-[#0058bc]">
        <ArrowLeft size={20} style={{ minWidth: "20px" }} />
        <span className="font-semibold">Back</span>
      </button>
      <h1 className="mt-4 text-2xl font-bold text-[#111827]">Life Preferences</h1>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-[#374151]">Sleep Schedule</span>
          <select className="mt-1 w-full rounded-lg border border-[#d1d5db] px-3 py-2">
            <option>Early Sleeper</option>
            <option>Night Owl</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#374151]">Smoking</span>
          <select className="mt-1 w-full rounded-lg border border-[#d1d5db] px-3 py-2">
            <option>No</option>
            <option>Occasionally</option>
          </select>
        </label>
        <button type="button" className="w-full flex items-center justify-center gap-3 rounded-lg bg-[#0058bc] px-3 py-2 text-sm font-semibold text-white">
          <Save size={20} style={{ minWidth: "20px" }} />
          Save Preferences
        </button>
      </div>
    </div>
  );
}
