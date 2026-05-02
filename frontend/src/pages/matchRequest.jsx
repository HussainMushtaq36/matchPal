import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import { authService } from "../db/AuthService";
import { matchService } from "../db/MatchService";
import { profileService } from "../db/ProfileService";

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
  const [requests, setRequests] = useState([]);
  const [actionStateById, setActionStateById] = useState({});
  const [currentUserName, setCurrentUserName] = useState("A user");

  useEffect(() => {
    const load = async () => {
      try {
        const user = await authService.getCurrentUser();
        const me = await profileService.getProfile(user.id);
        setCurrentUserName(me?.full_name || "A user");
        const incomingRequests = await matchService.getIncomingRequests(user.id);
        const senderIds = incomingRequests.map((row) => row.sender_id);
        const senderProfiles = await profileService.getProfilesByIds(senderIds);
        const senderMap = senderProfiles.reduce((acc, profile) => {
          acc[profile.id] = profile;
          return acc;
        }, {});
        setRequests(
          incomingRequests.map((row) => ({
            ...row,
            sender: senderMap[row.sender_id],
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  const handleRespond = async (row, decision) => {
    if (actionStateById[row.id] === "processing") return;
    setActionStateById((prev) => ({ ...prev, [row.id]: "processing" }));
    try {
      const user = await authService.getCurrentUser();
      await matchService.respondToRequest(row.id, row.sender_id, user.id, decision, currentUserName);
      if (decision === "accept") {
        alert("Match Accepted! Visit Messages to start chatting.");
      } else {
        alert("Match request rejected.");
      }
      setActionStateById((prev) => ({
        ...prev,
        [row.id]: decision === "accept" ? "accepted" : "rejected",
      }));
      setRequests((prev) => prev.filter((item) => item.id !== row.id));
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to update match request.");
      setActionStateById((prev) => ({ ...prev, [row.id]: "idle" }));
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
        {requests.map((row, index) => {
          const actionState = actionStateById[row.id] || "idle";
          const busy = actionState === "processing";
          const sender = row.sender || {};
          return (
            <div key={row.id} className="rounded-xl border border-[#e5e7eb] p-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-[#e5e7eb]">
                  <img
                    src={sender.avatar_url || `https://i.pravatar.cc/120?img=${(index % 40) + 10}`}
                    alt={sender.full_name || "Requester"}
                    className="h-full w-full"
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                    onError={(e) => {
                      e.currentTarget.style.opacity = "0";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#111827]">{sender.full_name || "Student"}</p>
                  <p className="text-sm text-[#6b7280]">Wants to connect with you</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => handleRespond(row, "accept")}
                  className="flex items-center justify-center gap-3 rounded-lg bg-[#0058bc] px-3 py-2 text-sm font-semibold text-white disabled:bg-[#94a3b8] disabled:cursor-not-allowed"
                >
                  <Check size={20} style={{ minWidth: "20px" }} />
                  {actionState === "processing" ? "Accepting..." : actionState === "accepted" ? "Accepted ✓" : "Accept"}
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => handleRespond(row, "reject")}
                  className="flex items-center justify-center gap-3 rounded-lg border border-[#d1d5db] px-3 py-2 text-sm font-semibold text-[#374151] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X size={20} style={{ minWidth: "20px" }} />
                  {actionState === "processing" ? "Rejecting..." : actionState === "rejected" ? "Rejected ✓" : "Reject"}
                </button>
              </div>
            </div>
          );
        })}
        {requests.length === 0 ? <p className="text-sm text-[#6b7280]">No pending requests.</p> : null}
      </div>
    </div>
  );
}
