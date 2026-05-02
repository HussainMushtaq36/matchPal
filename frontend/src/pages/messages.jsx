import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { authService } from "../db/AuthService";
import { messageService } from "../db/MessageService";

const wrapperStyle = {
  maxWidth: "390px",
  margin: "0 auto",
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
};

export default function Messages() {
  const navigate = useNavigate();
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const loadThreads = async () => {
      try {
        const user = await authService.getCurrentUser();
        const acceptedProfiles = await messageService.getAcceptedProfiles(user.id);
        setThreads(
          acceptedProfiles.map((profile) => ({
            id: profile.id,
            name: profile.full_name || "Student",
            avatar: profile.avatar_url || "",
            city: profile.city || "Unknown city",
          }))
        );
      } catch (error) {
        console.error(error);
        alert(error.message || "Unable to load accepted matches.");
      }
    };
    loadThreads();
  }, []);

  return (
    <div style={wrapperStyle} className="px-4 pb-8 pt-5">
      <button type="button" onClick={() => navigate("/user-dashboard")} className="flex items-center justify-center gap-3 self-start text-[#0058bc]">
        <ArrowLeft size={20} style={{ minWidth: "20px" }} />
        <span className="font-semibold">Back</span>
      </button>

      <h1 className="mt-4 text-2xl font-bold text-[#111827]">Messages</h1>

      <div className="mt-5 space-y-3">
        {threads.map((thread) => (
          <button
            key={thread.id}
            type="button"
            onClick={() => {
              navigate("/chat-screen", { state: { profile_id: thread.id } });
            }}
            className="w-full rounded-xl border border-[#e5e7eb] p-3 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-[#e5e7eb]">
                <img
                  src={thread.avatar || "https://i.pravatar.cc/120?img=10"}
                  alt={thread.name}
                  className="h-full w-full"
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  onError={(e) => {
                    e.currentTarget.style.opacity = "0";
                  }}
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#111827]">{thread.name}</p>
                <p className="text-sm text-[#6b7280]">{thread.city}</p>
              </div>
              <MessageCircle size={24} className="text-[#0058bc]" />
            </div>
          </button>
        ))}
        {threads.length === 0 ? <p className="text-sm text-[#6b7280]">No accepted matches yet.</p> : null}
      </div>
    </div>
  );
}
