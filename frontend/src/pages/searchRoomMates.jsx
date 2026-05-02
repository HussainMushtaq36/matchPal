import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MapPin, SlidersHorizontal, Heart } from "lucide-react";

export default function SearchRoomMates() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col items-center py-5 px-4">
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
          <button className="bg-[#0058bc] text-white px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap">Pet Friendly</button>
          <button className="bg-blue-100 text-[#0058bc] px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap">Non-Smoker</button>
          <button className="bg-blue-100 text-[#0058bc] px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap">Remote Work</button>
        </div>

        {/* Results List */}
        <div className="mt-8 flex justify-between items-center mb-4">
          <h3 className="text-lg font-black text-[#181c23]">Top Matches</h3>
          <button className="text-[10px] font-black uppercase text-[#0058bc] tracking-widest">View All</button>
        </div>

        <div className="space-y-4 pb-8">
          {[
            { name: "Alex Rivers", score: "94%", loc: "1.2 miles away", img: 11 },
            { name: "Marcus Chen", score: "92%", loc: "0.8 miles away", img: 15 }
          ].map((person) => (
            <div key={person.name} className="bg-white border border-gray-100 shadow-sm p-3 rounded-3xl flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={`https://i.pravatar.cc/150?img=${person.img}`} 
                  className="w-20 h-20 rounded-2xl object-cover" 
                  alt={person.name} 
                />
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                  {person.score}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#181c23]">{person.name}</h4>
                <div className="flex items-center gap-1 text-[#596171] text-[10px] mt-1 font-bold">
                  <MapPin size={10} /> {person.loc}
                </div>
                <div className="flex mt-2 gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0058bc]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-300"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-100"></div>
                </div>
              </div>
              <button className="bg-[#f0f7ff] p-3 rounded-2xl text-[#0058bc] hover:bg-[#0058bc] hover:text-white transition-colors">
                <Heart size={20} />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}