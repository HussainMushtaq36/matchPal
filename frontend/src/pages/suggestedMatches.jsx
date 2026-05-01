import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MapPin } from "lucide-react";

const wrapperStyle = {
  maxWidth: "390px",
  margin: "0 auto",
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
};

export default function SuggestedMatches() {
  const navigate = useNavigate();

  return (
    <div style={wrapperStyle} className="px-4 pb-8 pt-5">
      <button type="button" onClick={() => navigate("/user-dashboard")} className="flex items-center justify-center gap-3 self-start text-[#0058bc]">
        <ArrowLeft size={20} style={{ minWidth: "20px" }} />
        <span className="font-semibold">Back</span>
      </button>

      <h1 className="mt-4 text-2xl font-bold text-[#111827]">Suggested Matches</h1>
      <p className="mt-1 text-sm text-[#6b7280]">Recommended for your preferences.</p>

      <div className="mt-5 space-y-4">
        {["Mina Rahman", "David Paul", "Anika Noor"].map((name, index) => (
          <div key={name} className="rounded-xl border border-[#e5e7eb] p-3">
            <div className="h-40 w-full rounded-lg bg-[#e5e7eb]">
              <img
                src={`https://i.pravatar.cc/400?img=${index + 21}`}
                alt={name}
                className="h-full w-full"
                style={{ objectFit: "cover", borderRadius: "8px" }}
                onError={(e) => {
                  e.currentTarget.style.opacity = "0";
                }}
              />
            </div>
            <div className="mt-3 flex items-start justify-between">
              <div>
                <p className="font-semibold text-[#111827]">{name}</p>
                <p className="text-sm text-[#6b7280]">Quiet, clean, student friendly</p>
              </div>
              <MapPin size={24} className="text-[#0058bc]" />
            </div>
            <button type="button" className="mt-3 w-full flex items-center justify-center gap-3 rounded-lg bg-[#0058bc] px-3 py-2 text-sm font-semibold text-white">
              <Heart size={20} style={{ minWidth: "20px" }} />
              Send Match Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
