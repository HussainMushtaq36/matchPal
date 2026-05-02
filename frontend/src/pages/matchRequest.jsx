import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
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

const REQUESTS = [
  { id: "incoming-match-a", name: "Samina", imgIndex: 32 },
  { id: "incoming-match-b", name: "Rifat", imgIndex: 33 },
  { id: "incoming-match-c", name: "Mou", imgIndex: 34 },
];

export default function MatchRequest() {
  const navigate = useNavigate();
  const [interactionDone, setInteractionDone] = useState({});

  const handleAccept = async (senderId) => {
    try {
      const user = await authService.getCurrentUser();
      await matchService.recordInteraction(user.id, senderId, "accept");
      setInteractionDone((prev) => ({ ...prev, [senderId]: "accept" }));
    } catch (error) {
      console.error(error);
      setInteractionDone((prev) => ({ ...prev, [senderId]: false }));
    }
  };

  const handleDecline = async (senderId) => {
    try {
      const user = await authService.getCurrentUser();
      await matchService.recordInteraction(user.id, senderId, "decline");
      setInteractionDone((prev) => ({ ...prev, [senderId]: "decline" }));
    } catch (error) {
      console.error(error);
      setInteractionDone((prev) => ({ ...prev, [senderId]: false }));
    }
  };

  return (
    <div style={wrapperStyle} className="px-4 pb-8 pt-5">
      <button type="button" onClick={() => navigate("/user-dashboard")} className="flex items-center justify-center gap-3 self-start text-[#0058bc]">
        <ArrowLeft size={20} style={{ minWidth: "20px" }} />
        <span className="font-semibold">Back</span>
      </button>

      <h1 className="mt-4 text-2xl font-bold text-[#111827]">Match Requests</h1>
      <div className="mt-5 space-y-3">
        {REQUESTS.map((row) => {
          const done = interactionDone[row.id];
          const acceptSent = done === "accept";
          const declineSent = done === "decline";
          return (
            <div key={row.id} className="rounded-xl border border-[#e5e7eb] p-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-[#e5e7eb]">
                  <img
                    src={`https://i.pravatar.cc/120?img=${row.imgIndex}`}
                    alt={row.name}
                    className="h-full w-full"
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                    onError={(e) => {
                      e.currentTarget.style.opacity = "0";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#111827]">{row.name}</p>
                  <p className="text-sm text-[#6b7280]">Wants to connect with you</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={acceptSent || declineSent}
                  onClick={() => handleAccept(row.id)}
                  className="flex items-center justify-center gap-3 rounded-lg bg-[#0058bc] px-3 py-2 text-sm font-semibold text-white disabled:bg-[#94a3b8] disabled:cursor-not-allowed"
                >
                  <Check size={20} style={{ minWidth: "20px" }} />
                  {acceptSent ? "Request Sent" : "Accept"}
                </button>
                <button
                  type="button"
                  disabled={acceptSent || declineSent}
                  onClick={() => handleDecline(row.id)}
                  className="flex items-center justify-center gap-3 rounded-lg border border-[#d1d5db] px-3 py-2 text-sm font-semibold text-[#374151] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X size={20} style={{ minWidth: "20px" }} />
                  {declineSent ? "Declined" : "Decline"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
