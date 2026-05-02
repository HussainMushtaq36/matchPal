import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
import { authService } from "../db/AuthService";
import { supabase } from "../db/supabaseClient";

const wrapperStyle = {
  maxWidth: "390px",
  margin: "0 auto",
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
};

export default function Notification() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const user = await authService.getCurrentUser();
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        if (error) throw error;
        setItems(data || []);
      } catch (error) {
        console.error(error);
      }
    };
    loadNotifications();
  }, []);

  return (
    <div style={wrapperStyle} className="px-4 pb-8 pt-5">
      <button type="button" onClick={() => navigate("/user-dashboard")} className="flex items-center justify-center gap-3 self-start text-[#0058bc]">
        <ArrowLeft size={20} style={{ minWidth: "20px" }} />
        <span className="font-semibold">Back</span>
      </button>
      <h1 className="mt-4 text-2xl font-bold text-[#111827]">Notifications</h1>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => navigate(item.target_route || "/user-dashboard")}
            className="w-full flex items-start gap-3 rounded-xl border border-[#e5e7eb] p-3 text-left"
          >
            <Bell size={24} className="text-[#0058bc]" />
            <div>
              <p className="font-semibold text-[#111827]">{item.title || item.message}</p>
              <p className="text-sm text-[#6b7280]">{item.message || "Tap to open"}</p>
            </div>
          </button>
        ))}
        {items.length === 0 ? <p className="text-sm text-[#6b7280]">No notifications yet.</p> : null}
      </div>
    </div>
  );
}
