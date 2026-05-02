import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { authService } from "../db/AuthService";
import { chatService } from "../db/ChatService";
import { profileService } from "../db/ProfileService";

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
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [threads, setThreads] = useState([]);
  const [selectedThreadId, setSelectedThreadId] = useState("");

  useEffect(() => {
    const loadThreads = async () => {
      try {
        const user = await authService.getCurrentUser();
        const rows = await chatService.getConversationPeers(user.id);
        const peerIds = Array.from(
          new Set(
            rows.map((row) => (row.sender_id === user.id ? row.receiver_id : row.sender_id))
          )
        );
        const allProfiles = await profileService.getAllProfiles();
        const byId = allProfiles.reduce((acc, profile) => {
          acc[profile.id] = profile;
          return acc;
        }, {});
        const deduped = peerIds.map((peerId) => {
          const row = rows.find((entry) => entry.sender_id === peerId || entry.receiver_id === peerId);
          return {
            id: peerId,
            dbId: peerId,
            name: byId[peerId]?.full_name || "Student",
            preview: row?.content || "",
            avatar: byId[peerId]?.avatar_url || "",
          };
        });
        setThreads(deduped);
        if (deduped[0]) setSelectedThreadId(deduped[0].id);
      } catch (error) {
        console.error(error);
      }
    };
    loadThreads();
  }, []);

  const sendMessage = async () => {
    const text = draft.trim();
    if (!text || sending) return;
    const selected = threads.find((t) => t.id === selectedThreadId);
    if (!selected) return;

    setThreads((prev) =>
      prev.map((t) => (t.id === selectedThreadId ? { ...t, preview: text } : t))
    );
    setDraft("");
    setSending(true);
    try {
      const user = await authService.getCurrentUser();
      await chatService.sendMessage(user.id, selected.dbId, text);
    } catch (error) {
      console.error(error);
      setDraft(text);
    } finally {
      setSending(false);
    }
  };

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
              setSelectedThreadId(thread.id);
              navigate("/chat-screen", { state: { peerId: thread.dbId } });
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
                <p className="text-sm text-[#6b7280]">{thread.preview}</p>
              </div>
              <MessageCircle size={24} className="text-[#0058bc]" />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#d1d5db] p-2">
        <input
          placeholder="Quick message preview..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
          className="flex-1 px-2 py-1 text-sm outline-none"
        />
        <button
          type="button"
          disabled={sending || !draft.trim()}
          onClick={sendMessage}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#0058bc] px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          <Send size={18} />
          {sending ? "Processing..." : "Send"}
        </button>
      </div>
    </div>
  );
}
