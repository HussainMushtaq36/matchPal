import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";

const wrapperStyle = {
  maxWidth: "390px",
  margin: "0 auto",
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
};

export default function MatchRequest() {
  const navigate = useNavigate();

  return (
    <div style={wrapperStyle} className="px-4 pb-8 pt-5">
      <button type="button" onClick={() => navigate("/user-dashboard")} className="flex items-center justify-center gap-3 self-start text-[#0058bc]">
        <ArrowLeft size={20} style={{ minWidth: "20px" }} />
        <span className="font-semibold">Back</span>
      </button>

      <h1 className="mt-4 text-2xl font-bold text-[#111827]">Match Requests</h1>
      <div className="mt-5 space-y-3">
        {["Samina", "Rifat", "Mou"].map((name, idx) => (
          <div key={name} className="rounded-xl border border-[#e5e7eb] p-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-[#e5e7eb]">
                <img
                  src={`https://i.pravatar.cc/120?img=${idx + 32}`}
                  alt={name}
                  className="h-full w-full"
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  onError={(e) => {
                    e.currentTarget.style.opacity = "0";
                  }}
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#111827]">{name}</p>
                <p className="text-sm text-[#6b7280]">Wants to connect with you</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button type="button" className="flex items-center justify-center gap-3 rounded-lg bg-[#0058bc] px-3 py-2 text-sm font-semibold text-white">
                <Check size={20} style={{ minWidth: "20px" }} />
                Accept
              </button>
              <button type="button" className="flex items-center justify-center gap-3 rounded-lg border border-[#d1d5db] px-3 py-2 text-sm font-semibold text-[#374151]">
                <X size={20} style={{ minWidth: "20px" }} />
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
