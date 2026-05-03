import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MapPin, Heart, MessageCircle } from "lucide-react";
import { authService } from "../db/AuthService";
import { profileService } from "../db/ProfileService";
import { matchService } from "../db/MatchService";

export default function SearchRoomMates() {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [preferencesByUserId, setPreferencesByUserId] = useState({});
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [requestState, setRequestState] = useState({});
  const [acceptedStatusById, setAcceptedStatusById] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const user = await authService.getCurrentUser();
        const users = await matchService.getBrowsableProfiles(user.id);
        const prefs = await profileService.getPreferencesByUserIds(users.map((u) => u.id));
        const statusMap = await matchService.getInteractionStatusMap(
          user.id,
          users.map((u) => u.id)
        );
        const mappedPrefs = prefs.reduce((acc, pref) => {
          acc[pref.user_id] = pref;
          return acc;
        }, {});
        setAllUsers(users);
        setPreferencesByUserId(mappedPrefs);
        setAcceptedStatusById(statusMap);
      } catch (error) {
        console.error(error);
        alert(error.message || "Unable to load roommates.");
      }
    };
    load();
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return allUsers.filter((user) => {
      const nameMatch = !normalizedQuery || (user.full_name || "").toLowerCase().includes(normalizedQuery);
      if (!nameMatch) return false;
      if (!activeTag) return true;
      const tags = preferencesByUserId[user.id]?.tags || [];
      return tags.includes(activeTag);
    });
  }, [allUsers, query, activeTag, preferencesByUserId]);

  const tags = useMemo(() => {
    const bucket = new Set();
    Object.values(preferencesByUserId).forEach((pref) => {
      (pref.tags || []).forEach((tag) => bucket.add(tag));
    });
    return Array.from(bucket);
  }, [preferencesByUserId]);

  const handleSendRequest = async (targetUserId) => {
    if (requestState[targetUserId]) return;
    if (acceptedStatusById[targetUserId] === "pending") {
      alert("Request already sent.");
      return;
    }
    setRequestState((prev) => ({ ...prev, [targetUserId]: "processing" }));
    try {
      const user = await authService.getCurrentUser();
      const exists = await matchService.hasInteraction(user.id, targetUserId, "match");
      if (!exists) {
        await matchService.recordInteraction(user.id, targetUserId, "match");
        alert("Match request sent successfully!");
      } else {
        alert("An interaction already exists with this user.");
      }
      setRequestState((prev) => ({ ...prev, [targetUserId]: "success" }));
      setTimeout(() => {
        setRequestState((prev) => ({ ...prev, [targetUserId]: "" }));
      }, 2000);
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to send match request.");
      setRequestState((prev) => ({ ...prev, [targetUserId]: "" }));
    }
  };

  return (
    <div className="w-[390px] h-[844px] mx-auto overflow-x-hidden overflow-y-auto relative border border-gray-200 shadow-xl min-h-screen bg-[#f9f9ff] flex flex-col items-center py-5 px-4">
      <div className="w-full max-w-[390px] bg-white rounded-[40px] shadow-xl overflow-hidden flex flex-col p-6">
        
        {/* Navigation */}
        <button onClick={() => navigate(-1)} className="p-2 bg-[#f3f4f6] rounded-full w-10 text-[#181c23] mb-6">
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-3xl font-black text-[#181c23]">Who's your <span className="text-[#0058bc] italic">next</span> match?</h1>
        <p className="mt-2 text-[#596171] text-sm font-medium">Personalized results based on your living habits.</p>

        {/* Search Bar Area */}
        <div className="mt-8 space-y-4">
          <div className="bg-[#f0efff] p-4 rounded-2xl flex items-center gap-3 border border-[#d9ddea]">
            <Search size={20} className="text-[#596171]" />
            <input 
              placeholder="Search by name..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-semibold w-full"
            />
          </div>

          <div className="bg-[#f3f4f6] p-4 rounded-2xl flex items-center gap-3 border border-transparent focus-within:border-[#0058bc]">
            <MapPin size={20} className="text-[#0058bc]" />
            <input 
              placeholder="Brooklyn, New York" 
              className="bg-transparent border-none outline-none text-sm font-semibold w-full"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag((prev) => (prev === tag ? "" : tag))}
              className={`${activeTag === tag ? "bg-[#0058bc] text-white" : "bg-blue-100 text-[#0058bc]"} px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="mt-8 flex justify-between items-center mb-4">
          <h3 className="text-lg font-black text-[#181c23]">Top Matches</h3>
          <button className="text-[10px] font-black uppercase text-[#0058bc] tracking-widest">View All</button>
        </div>

        <div className="space-y-4 pb-8">
          {filteredUsers.map((person, idx) => (
            <div key={person.id} className="bg-white border border-gray-100 shadow-sm p-3 rounded-3xl flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={person.avatar_url || `https://i.pravatar.cc/150?img=${(idx % 40) + 10}`} 
                  className="w-20 h-20 rounded-2xl object-cover" 
                  alt={person.full_name} 
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#181c23]">{person.full_name}</h4>
                <div className="flex items-center gap-1 text-[#596171] text-[10px] mt-1 font-bold">
                  <MapPin size={10} /> {person.city || "Unknown city"}
                </div>
                <div className="flex mt-2 gap-1 flex-wrap">
                  {(preferencesByUserId[person.id]?.tags || []).slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[9px] px-2 py-0.5 rounded-md bg-blue-100 text-[#0058bc]">{tag}</span>
                  ))}
                </div>
              </div>
              {acceptedStatusById[person.id] === "accepted" ? (
                <button
                  type="button"
                  onClick={() => navigate("/chat-screen", { state: { profile_id: person.id } })}
                  className="bg-[#ecfdf5] p-3 rounded-2xl text-[#047857] hover:bg-[#047857] hover:text-white transition-colors"
                >
                  <MessageCircle size={20} />
                </button>
              ) : acceptedStatusById[person.id] === "pending" ? (
                <button
                  type="button"
                  disabled
                  className="bg-[#f3f4f6] p-3 rounded-2xl text-[#6b7280] cursor-not-allowed"
                >
                  Pending
                </button>
              ) : (
                <button
                  type="button"
                  disabled={requestState[person.id] === "processing" || requestState[person.id] === "success"}
                  onClick={() => handleSendRequest(person.id)}
                  className="bg-[#f0f7ff] p-3 rounded-2xl text-[#0058bc] hover:bg-[#0058bc] hover:text-white transition-colors disabled:opacity-60"
                >
                  <Heart size={20} />
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}