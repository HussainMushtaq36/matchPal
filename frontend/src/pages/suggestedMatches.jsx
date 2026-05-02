import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MapPin } from "lucide-react";
import { authService } from "../db/AuthService";
import { matchService } from "../db/MatchService";
import { supabase } from "../db/supabaseClient";

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

  useEffect(() => {
    const load = async () => {
      try {
        const user = await authService.getCurrentUser();
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .neq("id", user.id)
          .neq("role", "admin");
        if (error) throw error;
        setUsers(data || []);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => (a.full_name || "").localeCompare(b.full_name || ""));
  }, [users]);

  const handleSendRequest = async (row) => {
    if (requestSentFor[row.id]) return;
    setRequestSentFor((prev) => ({ ...prev, [row.id]: "processing" }));
    try {
      const user = await authService.getCurrentUser();
      const exists = await matchService.hasInteraction(user.id, row.id, "like");
      if (!exists) {
        await matchService.recordInteraction(user.id, row.id, "like");
        const { error: notifError } = await supabase.from("notifications").insert({
          user_id: row.id,
          message: "You have a new match request!",
          is_read: false,
        });
        if (notifError) {
          alert(notifError.message);
          setRequestSentFor((prev) => ({ ...prev, [row.id]: "" }));
          return;
        }
        alert("Match request sent successfully!");
      }
      setRequestSentFor((prev) => ({ ...prev, [row.id]: "success" }));
      setTimeout(() => setRequestSentFor((prev) => ({ ...prev, [row.id]: "" })), 2000);
    } catch (error) {
      console.error(error);
      setRequestSentFor((prev) => ({ ...prev, [row.id]: "" }));
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
        {sortedUsers.map((row, index) => {
          const sent = requestSentFor[row.id] === "success";
          const processing = requestSentFor[row.id] === "processing";
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
              <button
                type="button"
                disabled={sent || processing}
                onClick={() => handleSendRequest(row)}
                className="mt-3 w-full flex items-center justify-center gap-3 rounded-lg bg-[#0058bc] px-3 py-2 text-sm font-semibold text-white disabled:bg-[#94a3b8] disabled:cursor-not-allowed"
              >
                <Heart size={20} style={{ minWidth: "20px" }} />
                {processing ? "Processing..." : sent ? "Request Sent ✓" : "Send Match Request"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
