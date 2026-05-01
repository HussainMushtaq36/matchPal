import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle } from "lucide-react";

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

  return (
    <div style={wrapperStyle} className="px-4 pb-8 pt-5">
      <button type="button" onClick={() => navigate("/user-dashboard")} className="flex items-center justify-center gap-3 self-start text-[#0058bc]">
        <ArrowLeft size={20} style={{ minWidth: "20px" }} />
        <span className="font-semibold">Back</span>
      </button>

      <h1 className="mt-4 text-2xl font-bold text-[#111827]">Messages</h1>

      <div className="mt-5 space-y-3">
        {["Mina Rahman", "Samir", "John Doe"].map((name, idx) => (
          <button
            key={name}
            type="button"
            onClick={() => navigate("/chat-screen")}
            className="w-full rounded-xl border border-[#e5e7eb] p-3 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-[#e5e7eb]">
                <img
                  src={`https://i.pravatar.cc/120?img=${idx + 45}`}
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
                <p className="text-sm text-[#6b7280]">Last message preview...</p>
              </div>
              <MessageCircle size={24} className="text-[#0058bc]" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
