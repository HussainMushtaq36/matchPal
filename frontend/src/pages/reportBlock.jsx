import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Flag } from "lucide-react";
import { supabase } from "../db/supabaseClient";
import { authService } from "../db/AuthService";

const REPORTED_PROFILE_ID = "reported-profile-mock-789";

export default function ReportBlock() {
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [submitLabel, setSubmitLabel] = useState("Submit Report");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (submitted) return;
    setSubmitLabel("Submitting...");
    try {
      const user = await authService.getCurrentUser();
      // Simulated moderation pipeline: persist like a real reports row (schema may vary by project).
      const { error } = await supabase.from("user_reports").insert([
        {
          reporter_id: user.id,
          reported_id: REPORTED_PROFILE_ID,
          reason: reason || "unspecified",
          details: details || null,
          status: "Pending",
        },
      ]);
      if (error) throw error;
      setSubmitLabel("Report Submitted ✓");
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setSubmitLabel("Submit Report");
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

        {/* User Card */}
        <div className="mt-8 bg-[#f9f9ff] border border-gray-100 rounded-3xl p-4 flex items-center gap-4 relative">
          <span className="absolute -top-2 right-4 bg-orange-700 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md">Private</span>
          <img 
            src="https://i.pravatar.cc/150?img=12" 
            className="w-14 h-14 rounded-xl object-cover shadow-sm" 
            alt="Alex Rivers" 
          />
          <div>
            <p className="text-[10px] font-bold text-[#596171] uppercase tracking-wider">Reporting</p>
            <h4 className="font-bold text-[#181c23] text-lg">Alex Rivers</h4>
          </div>
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

        {/* Action Button */}
        <button
          type="button"
          disabled={submitted}
          onClick={handleSubmit}
          className="mt-8 w-full bg-[#0058bc] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Flag size={18} />
          {submitLabel}
        </button>

        <p className="mt-6 text-center text-[10px] font-bold text-[#b1b5c3] uppercase tracking-widest">
          Our moderation team reviews reports within 24 hours.
        </p>
      </div>
    </div>
  );
}
