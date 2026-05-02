import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search } from "lucide-react";
import { adminService } from "../db/AdminService";

const CARD_SHADOW = "shadow-[0_10px_25px_-10px_rgba(0,0,0,0.1)]";

const STUDENTS = [
  {
    id: "1",
    name: "Alex Rivers",
    major: "Architecture Major",
    avatar: "https://i.pravatar.cc/96?img=12",
    badge: { label: "98% MATCH", bg: "#A1BEFD", color: "#2D4C83" },
  },
  {
    id: "2",
    name: "Jordan Chen",
    major: "Computer Science",
    avatar: "https://i.pravatar.cc/96?img=33",
    badge: { label: "82% MATCH", bg: "#E6E8F3", color: "#414755" },
  },
  {
    id: "3",
    name: "Maya Lopez",
    major: "Digital Media",
    avatar: "https://i.pravatar.cc/96?img=45",
    badge: { label: "NEW USER", bg: "#FFDBCC", color: "#351000" },
  },
  {
    id: "4",
    name: "Sam Taylor",
    major: "Biotechnology",
    avatar: "https://i.pravatar.cc/96?img=52",
    badge: { label: "VERIFIED", bg: "#E6E8F3", color: "#414755" },
  },
];

const initialRows = () =>
  STUDENTS.map((s) => ({ ...s, accountStatus: "Active" }));

export default function ManageStudents() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState(initialRows);
  const [updatingId, setUpdatingId] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.major.toLowerCase().includes(q)
    );
  }, [query, rows]);

  const toggleStatus = async (studentId, currentStatus) => {
    const next = currentStatus === "Active" ? "Suspended" : "Active";
    setUpdatingId(studentId);
    try {
      await adminService.updateUserStatus(studentId, next);
      setRows((prev) =>
        prev.map((r) => (r.id === studentId ? { ...r, accountStatus: next } : r))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex justify-center">
      <div className="w-full max-w-[390px] mx-auto min-h-screen px-6 pb-28 pt-14">
        <button
          type="button"
          onClick={() => navigate("/admin-dashboard")}
          className="mb-6 flex items-center gap-1 text-sm font-bold text-[#414755] active:opacity-70"
        >
          <ChevronLeft size={22} strokeWidth={2.5} className="text-[#181c23]" />
          Back
        </button>

        <header className="space-y-2">
          <h1 className="text-[30px] leading-[37.5px] font-black tracking-tight text-[#181c23]">
            Manage Students
          </h1>
          <p className="text-sm leading-5 text-[#414755] opacity-80">
            Oversee and edit registered student profiles within the community.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-2 gap-0 rounded-lg overflow-hidden border border-transparent">
          <div className="bg-[#f1f3fe] p-4 min-h-[88px] flex flex-col justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[#0058bc] leading-[15px]">
              Active Users
            </p>
            <p className="text-2xl leading-8 font-black text-[#181c23]">1,284</p>
          </div>
          <div className="bg-[#0058bc] p-4 min-h-[88px] flex flex-col justify-between text-white">
            <p className="text-[10px] font-black uppercase tracking-[0.1em] text-white/80 leading-[15px]">
              Pending Matches
            </p>
            <p className="text-2xl leading-8 font-black">42</p>
          </div>
        </div>

        <div className="mt-8 relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#717786]"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students..."
            className="w-full rounded-lg border border-[#e0e2ed] bg-white py-3.5 pl-11 pr-4 text-sm text-[#181c23] placeholder:text-[#717786] outline-none ring-[#0058bc] focus:ring-2"
            aria-label="Search students"
          />
        </div>

        <section className="mt-8 flex flex-col gap-6">
          {filtered.map((s) => {
            const active = s.accountStatus === "Active";
            const busy = updatingId === s.id;
            return (
            <article
              key={s.id}
              className={`rounded-lg bg-white p-5 ${CARD_SHADOW}`}
            >
              <div className="flex flex-row justify-between gap-3">
                <div className="flex flex-row gap-4 min-w-0">
                  <img
                    src={s.avatar}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex min-w-0 flex-col justify-center">
                    <h3 className="text-base font-black leading-6 text-[#181c23] truncate">
                      {s.name}
                    </h3>
                    <p className="text-xs leading-4 text-[#414755] truncate">
                      {s.major}
                    </p>
                  </div>
                </div>
                <div
                  className="shrink-0 self-start rounded-xl px-3 py-1"
                  style={{ backgroundColor: s.badge.bg }}
                >
                  <span
                    className="text-[10px] font-black uppercase tracking-[0.05em] leading-[15px]"
                    style={{ color: s.badge.color }}
                  >
                    {s.badge.label}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex flex-row flex-wrap items-center gap-2">
                <span
                  className="rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-[0.05em]"
                  style={{
                    backgroundColor: active ? "#dcfce7" : "#fee2e2",
                    color: active ? "#166534" : "#991b1b",
                  }}
                >
                  {s.accountStatus}
                </span>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => toggleStatus(s.id, s.accountStatus)}
                  className="rounded-md border border-[#e0e2ed] bg-white px-3 py-1.5 text-[11px] font-bold text-[#0058bc] disabled:opacity-50"
                >
                  {busy ? "Updating..." : active ? "Suspend" : "Activate"}
                </button>
              </div>

              <div className="mt-4 flex flex-row gap-2 pt-2">
                <button
                  type="button"
                  className="flex-1 rounded-md bg-[#e6e8f3] py-3 text-center text-sm font-bold text-[#0058bc]"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-md border border-transparent bg-white py-3 text-center text-sm font-bold text-[#ba1a1a] ring-1 ring-black/5"
                >
                  Delete
                </button>
              </div>
            </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}
