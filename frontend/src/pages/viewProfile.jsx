import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit3, ShieldCheck, Clock, Music, CigaretteOff, Users } from "lucide-react";

export default function ViewProfile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col items-center py-5 px-4">
      <div className="w-full max-w-[390px] bg-white rounded-[40px] shadow-xl overflow-hidden flex flex-col">
        {/* Header Section */}
        <div className="px-6 pt-6 pb-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <button onClick={() => navigate(-1)} className="p-2 bg-[#f3f4f6] rounded-full text-[#181c23]">
            <ArrowLeft size={20} />
          </button>
          <span className="font-bold text-[#181c23] text-lg">MatchPal</span>
          <button onClick={() => navigate("/edit-profile")} className="bg-[#0058bc] text-white px-4 py-2 rounded-full text-sm font-bold flex gap-2 items-center">
            <Edit3 size={16} /> Edit
          </button>
        </div>

        {/* Profile Image & Match Score */}
        <div className="relative px-6">
          <div className="aspect-square rounded-[32px] overflow-hidden bg-gray-200 shadow-inner">
            <img 
              src="https://i.pravatar.cc/400?img=12" 
              alt="Alex Rivers" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-4 right-10 bg-[#0058bc] text-white px-5 py-2 rounded-2xl shadow-lg flex items-center gap-2">
            <span className="text-xs uppercase font-black tracking-widest opacity-80">Match Score</span>
            <span className="text-xl font-bold">94%</span>
          </div>
        </div>

        {/* Bio Section */}
        <div className="px-6 mt-6">
          <div className="flex items-baseline gap-2">
            <h1 className="text-3xl font-black text-[#181c23]">Alex Rivers</h1>
            <span className="text-xl text-[#596171] font-medium">28</span>
          </div>
          <p className="mt-3 text-[#596171] text-sm leading-relaxed font-medium">
            Architectural designer by day, amateur jazz pianist by night. Looking for a flatmate who appreciates a clean kitchen and quiet mornings.
          </p>
        </div>

        {/* Preference Grid */}
        <div className="px-6 mt-8 space-y-4 pb-10">
          <h3 className="text-xs font-black text-[#181c23] uppercase tracking-[0.2em] mb-4">Preferences</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#f0f7ff] p-4 rounded-2xl border border-[#0058bc]/10">
              <ShieldCheck className="text-[#0058bc] mb-2" size={24} />
              <p className="text-[10px] uppercase font-bold text-[#596171] tracking-wider">Cleanliness</p>
              <p className="text-sm font-bold text-[#181c23]">Minimalist & Tidy</p>
            </div>
            <div className="bg-[#fdf8f0] p-4 rounded-2xl border border-orange-200/30">
              <Clock className="text-orange-500 mb-2" size={24} />
              <p className="text-[10px] uppercase font-bold text-[#596171] tracking-wider">Schedule</p>
              <p className="text-sm font-bold text-[#181c23]">Early Riser</p>
            </div>
          </div>

          <div className="bg-[#f9f9ff] p-5 rounded-3xl border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Music className="text-[#0058bc]" size={18} />
              <h4 className="text-xs font-black text-[#181c23] uppercase tracking-widest">Lifestyle & Social</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-blue-100/50 text-[#0058bc] rounded-full text-[10px] font-bold border border-blue-200">Non-Smoker</span>
              <span className="px-3 py-1.5 bg-blue-100/50 text-[#0058bc] rounded-full text-[10px] font-bold border border-blue-200">Quiet Evenings</span>
              <span className="px-3 py-1.5 bg-blue-100/50 text-[#0058bc] rounded-full text-[10px] font-bold border border-blue-200">No Pets</span>
              <span className="px-3 py-1.5 bg-blue-100/50 text-[#0058bc] rounded-full text-[10px] font-bold border border-blue-200">Guest Friendly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}