import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
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

export default function ChatScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const peerId = location.state?.profile_id || location.state?.peerId || "";
  const [currentUserId, setCurrentUserId] = useState("");
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let channel = null;

    const loadMessages = async () => {
      if (!peerId) return;
      try {
        const user = await authService.getCurrentUser();
        setCurrentUserId(user.id);
        const rows = await messageService.getMessagesBetweenUsers(user.id, peerId);
        setMessages(
          rows.map((m) => ({
            id: m.id,
            mine: m.sender_id === user.id,
            text: m.content,
          }))
        );
        channel = messageService.subscribeToConversation(user.id, peerId, (row) => {
          setMessages((prev) => {
            if (prev.some((item) => item.id === row.id)) return prev;
            return [...prev, { id: row.id, mine: row.sender_id === user.id, text: row.content }];
          });
        });
      } catch (error) {
        console.error(error);
        alert(error.message || "Unable to load conversation.");
      }
    };
    loadMessages();

    return () => {
      messageService.unsubscribe(channel);
    };
  }, [peerId]);

  const handleSend = async () => {
    const text = draft.trim();
    if (!text || sending || !peerId) return;
    setSending(true);
    try {
      const senderId = currentUserId || (await authService.getCurrentUser()).id;
      await messageService.sendMessage(senderId, peerId, text);
      setDraft("");
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to send message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={wrapperStyle} className="px-4 pb-4 pt-5">
      <button type="button" onClick={() => navigate("/user-dashboard")} className="flex items-center justify-center gap-3 self-start text-[#0058bc]">
        <ArrowLeft size={20} style={{ minWidth: "20px" }} />
        <span className="font-semibold">Back</span>
      </button>

      <h1 className="mt-4 text-2xl font-bold text-[#111827]">Chat</h1>

      <div className="mt-5 flex-1 space-y-3">
        {messages.map((m) =>
          m.mine ? (
            <div key={m.id} className="ml-auto max-w-[75%] rounded-xl bg-[#0058bc] p-3 text-sm text-white">
              {m.text}
            </div>
          ) : (
            <div key={m.id} className="max-w-[75%] rounded-xl bg-[#f3f4f6] p-3 text-sm text-[#111827]">
              {m.text}
            </div>
          )
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#d1d5db] p-2">
        <input
          placeholder="Type message..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 px-2 py-1 text-sm outline-none"
        />
        <button
          type="button"
          disabled={sending || !draft.trim()}
          onClick={handleSend}
          className="flex items-center justify-center gap-3 rounded-lg bg-[#0058bc] px-3 py-2 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} style={{ minWidth: "20px" }} />
          {sending ? "Processing..." : "Send"}
        </button>
      </div>
    </div>
  );
}
