import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, BookOpen, Trash2, Volume2, Compass, Heart, MessageSquare, User } from "lucide-react";

export default function LifePreferences() {
  const navigate = useNavigate();
  const [cleanliness, setCleanliness] = useState("Neat freak");

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col items-center py-5 px-4">
      <div className="w-full max-w-[390px] bg-white rounded-[40px] shadow-xl overflow-hidden flex flex-col relative pb-20">
        
        {/* Header */}
        <div className="p-6 flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="p-2 bg-[#f3f4f6] rounded-full text-[#181c23]">
            <ArrowLeft size={20} />
          </button>
          <span className="font-bold text-[#181c23]">Lifestyle</span>
          <button className="bg-[#0058bc] text-white px-5 py-2 rounded-xl text-xs font-bold">Save</button>
        </div>

        <div className="px-6">
          <p className="text-[10px] font-black text-[#0058bc] uppercase tracking-[0.2em]">Personal Preferences</p>
          <h1 className="text-3xl font-black text-[#181c23] mt-2">Your Daily Rhythm</h1>
          <div className="w-10 h-1 bg-[#0058bc] mt-2 rounded-full"></div>

          {/* Preferences Scroll Area */}
          <div className="mt-8 space-y-8 overflow-y-auto max-h-[500px] no-scrollbar">
            
            {/* Sleep Schedules */}
            <div className="bg-[#f9f9ff] p-5 rounded-3xl border border-gray-50">
              <div className="flex items-center gap-3 mb-4">
                <Moon className="text-[#0058bc]" size={20} />
                <h3 className="text-[10px] font-black text-[#596171] uppercase tracking-widest">Sleep Schedules</h3>
              </div>
              <div className="space-y-3">
                {["Early bird", "Night owl", "Flexible / Irregular"].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:border-[#0058bc] transition-all">
                    <input type="radio" name="sleep" className="w-4 h-4 accent-[#0058bc]" defaultChecked={option === "Early bird"} />
                    <span className="text-sm font-bold text-[#181c23]">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Study Habits */}
            <div className="bg-[#f9f9ff] p-5 rounded-3xl border border-gray-50">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-[#0058bc]" size={20} />
                <h3 className="text-[10px] font-black text-[#596171] uppercase tracking-widest">Study Habits</h3>
              </div>
              <select className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm font-bold text-[#181c23] outline-none shadow-sm">
                <option>Study in the library</option>
                <option>Study at home</option>
                <option>Late night study</option>
              </select>
            </div>

            {/* Cleanliness */}
            <div className="bg-[#f9f9ff] p-5 rounded-3xl border border-gray-50">
              <div className="flex items-center gap-3 mb-4">
                <Trash2 className="text-[#0058bc]" size={20} />
                <h3 className="text-[10px] font-black text-[#596171] uppercase tracking-widest">Cleanliness</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Neat freak", "Moderately clean", "Relaxed"].map((tag) => (
                  <button 
                    key={tag}
                    onClick={() => setCleanliness(tag)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      cleanliness === tag ? 'bg-[#0058bc] text-white' : 'bg-gray-200 text-[#596171]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation (Fixed to screen bottom) */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-t border-gray-100 flex justify-around items-center px-4">
          <button className="flex flex-col items-center gap-1 text-[#b1b5c3]">
            <Compass size={22} />
            <span className="text-[8px] font-black uppercase tracking-tighter">Discover</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#b1b5c3]">
            <Heart size={22} />
            <span className="text-[8px] font-black uppercase tracking-tighter">Matches</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#b1b5c3]">
            <MessageSquare size={22} />
            <span className="text-[8px] font-black uppercase tracking-tighter">Chat</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#0058bc]">
            <User size={22} />
            <span className="text-[8px] font-black uppercase tracking-tighter">Profile</span>
          </button>
        </div>

      </div>
    </div>
  );
}