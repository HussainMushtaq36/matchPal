import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Search, SlidersHorizontal } from "lucide-react";

const wrapperStyle = {
  maxWidth: "390px",
  margin: "0 auto",
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
};

export default function SearchRoomMates() {
  const navigate = useNavigate();

  return (
    <div style={wrapperStyle} className="px-4 pb-8 pt-5">
      <button type="button" onClick={() => navigate("/user-dashboard")} className="flex items-center justify-center gap-3 self-start text-[#0058bc]">
        <ArrowLeft size={20} style={{ minWidth: "20px" }} />
        <span className="font-semibold">Back</span>
      </button>

      <h1 className="mt-4 text-2xl font-bold text-[#111827]">Search Roommates</h1>
      <p className="mt-1 text-sm text-[#6b7280]">Find by city, budget, and lifestyle.</p>

      <div className="mt-5 rounded-xl border border-[#e5e7eb] p-3">
        <div className="flex items-center gap-2 rounded-lg bg-[#f3f4f6] px-3 py-2">
          <Search size={24} className="text-[#6b7280]" />
          <input placeholder="Search by location or name" className="w-full bg-transparent text-sm outline-none" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button type="button" className="flex items-center justify-center gap-3 rounded-lg bg-[#0058bc] px-3 py-2 text-sm font-semibold text-white">
            <MapPin size={20} style={{ minWidth: "20px" }} />
            Nearby
          </button>
          <button type="button" className="flex items-center justify-center gap-3 rounded-lg border border-[#d1d5db] px-3 py-2 text-sm font-semibold text-[#374151]">
            <SlidersHorizontal size={20} style={{ minWidth: "20px" }} />
            Filters
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {["Alex Rivers", "Sara Lee", "John Khan"].map((name, index) => (
          <div key={name} className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] p-3">
            <div className="h-14 w-14 rounded-lg bg-[#e5e7eb]">
              <img
                src={`https://i.pravatar.cc/120?img=${index + 11}`}
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
              <p className="text-sm text-[#6b7280]">Dhaka • BDT 8k-12k</p>
            </div>
            <button type="button" className="flex items-center justify-center gap-3 rounded-lg bg-[#0058bc] px-3 py-2 text-xs font-semibold text-white">
              <Search size={20} style={{ minWidth: "20px" }} />
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
