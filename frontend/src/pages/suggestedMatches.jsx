import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MapPin } from "lucide-react";
import { authService } from "../db/AuthService";
import { matchService } from "../db/MatchService";

const wrapperStyle = {
  maxWidth: "390px",
  margin: "0 auto",
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
};

const SUGGESTED = [
  { id: "potential-match-1", name: "Mina Rahman", imgIndex: 21 },
  { id: "potential-match-2", name: "David Paul", imgIndex: 22 },
  { id: "potential-match-3", name: "Anika Noor", imgIndex: 23 },
];

export default function SuggestedMatches() {
  const navigate = useNavigate();
  const [requestSentFor, setRequestSentFor] = useState({});

  const handleSendRequest = async (receiverId) => {
    try {
      const user = await authService.getCurrentUser();
      await matchService.recordInteraction(user.id, receiverId, "like");
      setRequestSentFor((prev) => ({ ...prev, [receiverId]: true }));
    } catch (error) {
      console.error(error);
      setRequestSentFor((prev) => ({ ...prev, [receiverId]: false }));
    }
  };

  return (
    <div style={wrapperStyle} className="px-4 pb-8 pt-5">
      <button type="button" onClick={() => navigate("/user-dashboard")} className="flex items-center justify-center gap-3 self-start text-[#0058bc]">
        <ArrowLeft size={20} style={{ minWidth: "20px" }} />
        <span className="font-semibold">Back</span>
      </button>

      <h1 className="mt-4 text-2xl font-bold text-[#111827]">Suggested Matches</h1>
      <p className="mt-1 text-sm text-[#6b7280]">Recommended for your preferences.</p>

      <div className="mt-5 space-y-4">
        {SUGGESTED.map((row) => {
          const sent = requestSentFor[row.id];
          return (
            <div key={row.id} className="rounded-xl border border-[#e5e7eb] p-3">
              <div className="h-40 w-full rounded-lg bg-[#e5e7eb]">
                <img
                  src={`https://i.pravatar.cc/400?img=${row.imgIndex}`}
                  alt={row.name}
                  className="h-full w-full"
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  onError={(e) => {
                    e.currentTarget.style.opacity = "0";
                  }}
                />
              </div>
              <div className="mt-3 flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#111827]">{row.name}</p>
                  <p className="text-sm text-[#6b7280]">Quiet, clean, student friendly</p>
                </div>
                <MapPin size={24} className="text-[#0058bc]" />
              </div>
              <button
                type="button"
                disabled={sent}
                onClick={() => handleSendRequest(row.id)}
                className="mt-3 w-full flex items-center justify-center gap-3 rounded-lg bg-[#0058bc] px-3 py-2 text-sm font-semibold text-white disabled:bg-[#94a3b8] disabled:cursor-not-allowed"
              >
                <Heart size={20} style={{ minWidth: "20px" }} />
                {sent ? "Request Sent" : "Send Match Request"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
