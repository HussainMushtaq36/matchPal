import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

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

  return (
    <div style={wrapperStyle} className="px-4 pb-4 pt-5">
      <button type="button" onClick={() => navigate("/user-dashboard")} className="flex items-center justify-center gap-3 self-start text-[#0058bc]">
        <ArrowLeft size={20} style={{ minWidth: "20px" }} />
        <span className="font-semibold">Back</span>
      </button>

      <h1 className="mt-4 text-2xl font-bold text-[#111827]">Chat</h1>

      <div className="mt-5 flex-1 space-y-3">
        <div className="max-w-[75%] rounded-xl bg-[#f3f4f6] p-3 text-sm text-[#111827]">Hi! Is the room still available?</div>
        <div className="ml-auto max-w-[75%] rounded-xl bg-[#0058bc] p-3 text-sm text-white">Yes, it is available from next week.</div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#d1d5db] p-2">
        <input placeholder="Type message..." className="flex-1 px-2 py-1 text-sm outline-none" />
        <button type="button" className="flex items-center justify-center gap-3 rounded-lg bg-[#0058bc] px-3 py-2 text-sm font-semibold text-white">
          <Send size={20} style={{ minWidth: "20px" }} />
          Send
        </button>
      </div>
    </div>
  );
}
