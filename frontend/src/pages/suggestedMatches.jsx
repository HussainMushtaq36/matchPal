import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MapPin, MessageCircle } from "lucide-react";
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

export default function SuggestedMatches() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [requestSentFor, setRequestSentFor] = useState({});
  const [acceptedStatusById, setAcceptedStatusById] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const user = await authService.getCurrentUser();
        const profiles = await matchService.getBrowsableProfiles(user.id);
        setUsers(profiles);
        const statusMap = await matchService.getInteractionStatusMap(
          user.id,
          profiles.map((profile) => profile.id)
        );
        setAcceptedStatusById(statusMap);
      } catch (error) {
        console.error(error);
        alert(error.message || "Unable to load suggested matches.");
      }
    };
    load();
  }, []);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => (a.full_name || "").localeCompare(b.full_name || ""));
  }, [users]);

  const handleSendRequest = async (row) => {
    if (requestSentFor[row.id]) return;
    if (acceptedStatusById[row.id] === "pending") return;
    setRequestSentFor((prev) => ({ ...prev, [row.id]: "processing" }));
    try {
      const user = await authService.getCurrentUser();
      const exists = await matchService.hasInteraction(user.id, row.id, "match");
      if (!exists) {
        await matchService.recordInteraction(user.id, row.id, "match");
        alert("Match request sent successfully!");
      } else {
        alert("An interaction already exists with this user.");
      }
      setRequestSentFor((prev) => ({ ...prev, [row.id]: "success" }));
      setTimeout(() => setRequestSentFor((prev) => ({ ...prev, [row.id]: "" })), 2000);
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to send match request.");
      setRequestSentFor((prev) => ({ ...prev, [row.id]: "" }));
    }
  };

  return (
    <div style={wrapperStyle} className="w-[390px] h-[844px] mx-auto overflow-x-hidden overflow-y-auto relative border border-gray-200 shadow-xl px-4 pb-8 pt-5">
      <button type="button" onClick={() => navigate("/user-dashboard")} className="flex items-center justify-center gap-3 self-start text-[#0058bc]">
        <ArrowLeft size={20} style={{ minWidth: "20px" }} />
        <span className="font-semibold">Back</span>
      </button>

      <h1 className="mt-4 text-2xl font-bold text-[#111827]">Suggested Matches</h1>
      <p className="mt-1 text-sm text-[#6b7280]">Recommended for your preferences.</p>

      <div className="mt-5 space-y-4">
        {sortedUsers.map((row, index) => {
          const sent = requestSentFor[row.id] === "success";
          const processing = requestSentFor[row.id] === "processing";
          const isAccepted = acceptedStatusById[row.id] === "accepted";
          const isPending = acceptedStatusById[row.id] === "pending";
          return (
            <div key={row.id} className="rounded-xl border border-[#e5e7eb] p-3">
              <div className="h-40 w-full rounded-lg bg-[#e5e7eb]">
                <img
                  src={row.avatar_url || `https://i.pravatar.cc/400?img=${(index % 50) + 10}`}
                  alt={row.full_name}
                  className="h-full w-full"
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  onError={(e) => {
                    e.currentTarget.style.opacity = "0";
                  }}
                />
              </div>
              <div className="mt-3 flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#111827]">{row.full_name}</p>
                  <p className="text-sm text-[#6b7280]">{row.city || "Student profile"}</p>
                </div>
                <MapPin size={24} className="text-[#0058bc]" />
              </div>
              {isAccepted ? (
                <button
                  type="button"
                  onClick={() => navigate("/chat-screen", { state: { profile_id: row.id } })}
                  className="mt-3 w-full flex items-center justify-center gap-3 rounded-lg bg-[#047857] px-3 py-2 text-sm font-semibold text-white"
                >
                  <MessageCircle size={20} style={{ minWidth: "20px" }} />
                  Message
                </button>
              ) : isPending ? (
                <button
                  type="button"
                  disabled
                  className="mt-3 w-full flex items-center justify-center gap-3 rounded-lg bg-[#e5e7eb] px-3 py-2 text-sm font-semibold text-[#6b7280] cursor-not-allowed"
                >
                  Pending
                </button>
              ) : (
                <button
                  type="button"
                  disabled={sent || processing}
                  onClick={() => handleSendRequest(row)}
                  className="mt-3 w-full flex items-center justify-center gap-3 rounded-lg bg-[#0058bc] px-3 py-2 text-sm font-semibold text-white disabled:bg-[#94a3b8] disabled:cursor-not-allowed"
                >
                  <Heart size={20} style={{ minWidth: "20px" }} />
                  {processing ? "Processing..." : sent ? "Request Sent ✓" : "Send Match Request"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
