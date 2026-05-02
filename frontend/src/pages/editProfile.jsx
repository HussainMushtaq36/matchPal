import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Plus, X } from "lucide-react";
import { authService } from "../db/AuthService";
import { profileService } from "../db/ProfileService";

export default function EditProfile() {
  const navigate = useNavigate();
  const [tags, setTags] = useState(["Cleanliness", "Non-Smoker", "Pet Friendly"]);
  const [fullName, setFullName] = useState("Alex Rivers");
  const [bio, setBio] = useState(
    "I am a quiet professional working in tech. I enjoy weekend hikes, clean kitchens, and roommate board game nights. Looking for a respectful roommate."
  );
  const [saveLabel, setSaveLabel] = useState("Save");

  const handleSave = async () => {
    setSaveLabel("Saving...");
    try {
      const user = await authService.getCurrentUser();
      await profileService.updateProfile(user.id, {
        full_name: fullName,
        bio,
      });
      setSaveLabel("Updated ✓");
      setTimeout(() => setSaveLabel("Save"), 2000);
    } catch (error) {
      console.error(error);
      setSaveLabel("Save");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col items-center py-5 px-4">
      <div className="w-full max-w-[390px] bg-white rounded-[40px] shadow-xl overflow-hidden flex flex-col p-6 pb-10">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button type="button" onClick={() => navigate(-1)} className="p-2 bg-[#f3f4f6] rounded-full text-[#181c23]">
            <ArrowLeft size={20} />
          </button>
          <span className="font-bold text-[#181c23]">Edit Profile</span>
          <button 
            type="button"
            onClick={handleSave}
            disabled={saveLabel === "Saving..."}
            className="text-[#0058bc] font-bold text-sm disabled:opacity-50 min-w-[4.5rem] text-right"
          >
            {saveLabel}
          </button>
        </div>

        {/* Profile Image with Camera Badge */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-3xl overflow-hidden bg-gray-200 border-4 border-white shadow-md">
              <img 
                src="https://i.pravatar.cc/220?img=12" 
                className="w-full h-full object-cover" 
                alt="Profile" 
              />
            </div>
            <button type="button" className="absolute -bottom-2 -right-2 bg-[#0058bc] text-white p-2 rounded-xl shadow-lg border-2 border-white">
              <Camera size={18} />
            </button>
          </div>
          <p className="mt-4 text-[10px] font-black text-[#0058bc] uppercase tracking-widest">Premium Member</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-[#596171] uppercase tracking-widest mb-2 block ml-1">Full Name</label>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#f9f9ff] border border-gray-100 rounded-2xl p-4 text-sm font-bold text-[#181c23] outline-none focus:border-[#0058bc] transition-all shadow-sm"
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-[#596171] uppercase tracking-widest mb-2 block ml-1">Bio</label>
            <textarea 
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-[#f9f9ff] border border-gray-100 rounded-2xl p-4 text-sm font-bold text-[#181c23] outline-none focus:border-[#0058bc] transition-all shadow-sm resize-none"
            />
            <div className="text-right mt-1 text-[10px] font-bold text-gray-400">{bio.length} / 200</div>
          </div>

          {/* Lifestyle Tags */}
          <div>
            <label className="text-[10px] font-black text-[#596171] uppercase tracking-widest mb-3 block ml-1">Lifestyle Tags</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div key={tag} className="bg-blue-100/50 text-[#0058bc] px-3 py-2 rounded-xl text-xs font-bold border border-blue-200 flex items-center gap-2">
                  {tag}
                  <X size={14} className="cursor-pointer" onClick={() => setTags(tags.filter(t => t !== tag))} />
                </div>
              ))}
              <button type="button" className="bg-gray-100 text-[#596171] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-dashed border-gray-300">
                <Plus size={14} /> Add Tag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
