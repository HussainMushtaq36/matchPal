import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
import { authService } from "../db/AuthService";
import { notificationService } from "../db/NotificationService";

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
    let activeChannel = null;

    const loadNotifications = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        const data = await notificationService.getNotificationsByUserId(currentUser.id);
        setItems(data);
        activeChannel = notificationService.subscribeToUserNotifications(currentUser.id, async () => {
          const latest = await notificationService.getNotificationsByUserId(currentUser.id);
          setItems(latest);
        });
      } catch (error) {
        console.error(error);
        alert(error.message || "Unable to load notifications.");
      }
    };
    loadNotifications();

    return () => {
      notificationService.unsubscribe(activeChannel);
    };
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
              <p className="font-semibold text-[#111827]">{item.type || "Notification"}</p>
              <p className="text-sm text-[#6b7280]">{item.content || "Tap to open"}</p>
            </div>
          </button>
        ))}
        {items.length === 0 ? <p className="text-sm text-[#6b7280]">No notifications yet.</p> : null}
      </div>
    </div>
  );
}
