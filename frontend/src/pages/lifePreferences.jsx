import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, BookOpen, Trash2, Volume2, Compass, Heart, MessageSquare, User } from "lucide-react";
import { authService } from "../db/AuthService";
import { profileService } from "../db/ProfileService";

const SLEEP_OPTIONS = ["Early bird", "Night owl", "Flexible / Irregular"];
const STUDY_OPTIONS = ["Study in the library", "Study at home", "Late night study"];

export default function LifePreferences() {
  const navigate = useNavigate();
  const [cleanliness, setCleanliness] = useState("Neat freak");
  const [sleepSchedule, setSleepSchedule] = useState("Early bird");
  const [studyHabit, setStudyHabit] = useState(STUDY_OPTIONS[0]);
  const [tags, setTags] = useState(["Non-Smoker", "Night Owl"]);
  const [newTag, setNewTag] = useState("");
  const [saveState, setSaveState] = useState("idle");

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const user = await authService.getCurrentUser();
        const profile = await profileService.getProfile(user.id);
        const pref = profile?.preferences;
        if (!pref) return;
        setCleanliness(pref.cleanliness_level || "Neat freak");
        setSleepSchedule(pref.sleep_schedule || "Early bird");
        setStudyHabit(pref.study_habit || STUDY_OPTIONS[0]);
        setTags(pref.tags || []);
      } catch (error) {
        console.error(error);
      }
    };
    loadPreferences();
  }, []);

  const addTag = () => {
    const cleaned = newTag.trim();
    if (!cleaned || tags.includes(cleaned)) return;
    setTags((prev) => [...prev, cleaned]);
    setNewTag("");
  };

  const removeTag = (tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSave = async () => {
    if (saveState === "processing") return;
    setSaveState("processing");
    try {
      const user = await authService.getCurrentUser();
      await profileService.updatePreferences(user.id, {
        sleep_schedule: sleepSchedule,
        study_habit: studyHabit,
        cleanliness_level: cleanliness,
        tags,
      });
      setSaveState("success");
      setTimeout(() => setSaveState("idle"), 2000);
    } catch (error) {
      console.error(error);
      setSaveState("idle");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col items-center py-5 px-4">
      <div className="w-full max-w-[390px] bg-white rounded-[40px] shadow-xl overflow-hidden flex flex-col relative pb-20">
        
        {/* Header */}
        <div className="p-6 flex justify-between items-center">
          <button type="button" onClick={() => navigate(-1)} className="p-2 bg-[#f3f4f6] rounded-full text-[#181c23]">
            <ArrowLeft size={20} />
          </button>
          <span className="font-bold text-[#181c23]">Lifestyle</span>
          <button
            type="button"
            onClick={handleSave}
            disabled={saveState === "processing"}
            className="bg-[#0058bc] text-white px-5 py-2 rounded-xl text-xs font-bold disabled:opacity-50 min-w-[5rem]"
          >
            {saveState === "processing" ? "Saving..." : saveState === "success" ? "Saved ✓" : "Save"}
          </button>
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
                {SLEEP_OPTIONS.map((option) => (
                  <label key={option} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:border-[#0058bc] transition-all">
                    <input
                      type="radio"
                      name="sleep"
                      className="w-4 h-4 accent-[#0058bc]"
                      checked={sleepSchedule === option}
                      onChange={() => setSleepSchedule(option)}
                    />
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
              <select
                value={studyHabit}
                onChange={(e) => setStudyHabit(e.target.value)}
                className="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm font-bold text-[#181c23] outline-none shadow-sm"
              >
                {STUDY_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
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
                    type="button"
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

            {/* Tags */}
            <div className="bg-[#f9f9ff] p-5 rounded-3xl border border-gray-50">
              <div className="flex items-center gap-3 mb-4">
                <Volume2 className="text-[#0058bc]" size={20} />
                <h3 className="text-[10px] font-black text-[#596171] uppercase tracking-widest">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="bg-white text-[#0058bc] border border-[#bfd3f5] px-3 py-1.5 rounded-xl text-xs font-bold">
                    {tag}
                    <button type="button" className="ml-2 text-[#596171]" onClick={() => removeTag(tag)}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Add tag"
                  className="flex-1 bg-white border border-gray-100 rounded-xl px-3 py-2 text-xs font-semibold text-[#181c23] outline-none"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0058bc] text-white"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation (Fixed to screen bottom) */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-t border-gray-100 flex justify-around items-center px-4">
          <button type="button" className="flex flex-col items-center gap-1 text-[#b1b5c3]">
            <Compass size={22} />
            <span className="text-[8px] font-black uppercase tracking-tighter">Discover</span>
          </button>
          <button type="button" className="flex flex-col items-center gap-1 text-[#b1b5c3]">
            <Heart size={22} />
            <span className="text-[8px] font-black uppercase tracking-tighter">Matches</span>
          </button>
          <button type="button" className="flex flex-col items-center gap-1 text-[#b1b5c3]">
            <MessageSquare size={22} />
            <span className="text-[8px] font-black uppercase tracking-tighter">Chat</span>
          </button>
          <button type="button" className="flex flex-col items-center gap-1 text-[#0058bc]">
            <User size={22} />
            <span className="text-[8px] font-black uppercase tracking-tighter">Profile</span>
          </button>
        </div>

      </div>
    </div>
  );
}
