import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Flag } from "lucide-react";
import { authService } from "../db/AuthService";
import { profileService } from "../db/ProfileService";
import { moderationService } from "../db/ModerationService";

export default function ReportBlock() {
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [targetId, setTargetId] = useState("");
  const [reportState, setReportState] = useState("idle");
  const [blockState, setBlockState] = useState("idle");

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const user = await authService.getCurrentUser();
        const rows = await profileService.getAllProfiles(user.id);
        setProfiles(rows);
      } catch (error) {
        console.error(error);
      }
    };
    loadProfiles();
  }, []);

  const markSuccess = (setState) => {
    setState("success");
    setTimeout(() => {
      setState("idle");
    }, 2000);
  };

  const handleReport = async () => {
    if (reportState !== "idle" || !targetId) return;
    setReportState("processing");
    try {
      const user = await authService.getCurrentUser();
      await moderationService.reportUser({
        reporterId: user.id,
        targetId,
        reason,
        details,
      });
      markSuccess(setReportState);
    } catch (error) {
      console.error(error);
      setReportState("idle");
    }
  };

  const handleBlock = async () => {
    if (blockState !== "idle" || !targetId) return;
    setBlockState("processing");
    try {
      const user = await authService.getCurrentUser();
      await moderationService.blockUser({
        reporterId: user.id,
        targetId,
      });
      markSuccess(setBlockState);
    } catch (error) {
      console.error(error);
      setBlockState("idle");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col items-center py-5 px-4">
      <div className="w-full max-w-[390px] bg-white rounded-[40px] shadow-xl overflow-hidden flex flex-col p-6">
        
        {/* Header */}
        <button type="button" onClick={() => navigate(-1)} className="p-2 bg-[#f3f4f6] rounded-full w-10 text-[#181c23] mb-6">
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-3xl font-black text-[#181c23]">Safety <span className="text-[#0058bc]">First.</span></h1>
        <p className="mt-3 text-[#596171] text-sm font-medium leading-relaxed">
          We take your safety seriously. Tell us why you'd like to report or block this user. Your report is anonymous.
        </p>

        <div className="mt-8 bg-[#f9f9ff] border border-gray-100 rounded-3xl p-4 relative">
          <p className="text-[10px] font-bold text-[#596171] uppercase tracking-wider mb-2">Select user</p>
          <select
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            className="w-full bg-white border border-[#d9ddea] rounded-xl p-3 text-sm font-semibold text-[#181c23]"
          >
            <option value="">Choose user...</option>
            {profiles.map((profile) => (
              <option key={profile.id} value={profile.id}>{profile.full_name}</option>
            ))}
          </select>
        </div>

        {/* Form Fields */}
        <div className="mt-8 space-y-6">
          <div>
            <label className="text-xs font-black text-[#181c23] uppercase tracking-widest mb-2 block">Reason for Report</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-[#f0efff] border border-[#d9ddea] rounded-2xl p-4 text-sm font-semibold text-[#181c23] outline-none appearance-none"
            >
              <option value="">Select a reason...</option>
              <option value="Inappropriate Behavior">Inappropriate Behavior</option>
              <option value="Spam">Spam</option>
              <option value="Fake Profile">Fake Profile</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-black text-[#181c23] uppercase tracking-widest mb-2 block">Additional Details (Optional)</label>
            <textarea 
              placeholder="Help us understand the situation better..." 
              rows={4} 
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full bg-[#f0efff] border border-[#d9ddea] rounded-3xl p-4 text-sm font-semibold text-[#181c23] outline-none resize-none"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={!targetId || reportState === "processing" || blockState === "processing"}
            onClick={handleReport}
            className="w-full bg-[#0058bc] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Flag size={18} />
            {reportState === "processing"
              ? "Reporting..."
              : reportState === "success"
              ? "Reported ✓"
              : "Report User"}
          </button>
          <button
            type="button"
            disabled={!targetId || reportState === "processing" || blockState === "processing"}
            onClick={handleBlock}
            className="w-full bg-[#e6e8f3] text-[#0058bc] py-4 rounded-2xl font-bold disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {blockState === "processing"
              ? "Blocking..."
              : blockState === "success"
              ? "Blocked ✓"
              : "Block User"}
          </button>
        </div>

        <p className="mt-6 text-center text-[10px] font-bold text-[#b1b5c3] uppercase tracking-widest">
          Our moderation team reviews reports within 24 hours.
        </p>
      </div>
    </div>
  );
}
