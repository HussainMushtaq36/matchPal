import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Camera,
  Hash,
  Plus,
  X,
  Shield,
  KeyRound,
  LogOut,
  Trash2,
} from "lucide-react";

const CARD_SHADOW = "shadow-[0_10px_25px_-10px_rgba(0,0,0,0.1)]";

const INITIAL_TAGS = [
  { id: "1", label: "Night Owl", variant: "blue" },
  { id: "2", label: "Non-Smoker", variant: "blue" },
  { id: "3", label: "Vegetarian", variant: "blue" },
  { id: "4", label: "Pet-Friendly", variant: "blue" },
  { id: "5", label: "Quiet Study", variant: "muted" },
];

export default function AdminViewProfile() {
  const navigate = useNavigate();
  const [tags, setTags] = useState(INITIAL_TAGS);
  const [twoFactor, setTwoFactor] = useState(true);

  const removeTag = (id) =>
    setTags((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex justify-center">
      <div className="w-full max-w-[390px] mx-auto min-h-screen px-6 pb-32 pt-14">
        <button
          type="button"
          onClick={() => navigate("/admin-dashboard")}
          className="mb-8 flex items-center gap-1 text-sm font-bold text-[#414755] active:opacity-70"
        >
          <ChevronLeft size={22} strokeWidth={2.5} className="text-[#181c23]" />
          Back
        </button>

        <section className="flex flex-row flex-wrap items-start gap-8">
          <div className="relative shrink-0">
            <div
              className="h-40 w-40 overflow-hidden rounded-lg bg-[#e0e2ed] shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.1),0px_20px_25px_-5px_rgba(0,0,0,0.1)]"
            >
              <img
                src="https://i.pravatar.cc/320?img=11"
                alt="Admin profile"
                className="h-full w-full object-cover"
              />
            </div>
            <button
              type="button"
              className="absolute bottom-1 right-1 flex items-center justify-center rounded-lg bg-[#0058bc] p-3 text-white shadow-md active:scale-95"
              aria-label="Change photo"
            >
              <Camera size={20} strokeWidth={2} />
            </button>
          </div>

          <div className="min-w-0 flex-1 basis-[200px] space-y-2">
            <h1 className="text-[36px] leading-[40px] font-black tracking-tight text-[#181c23] sm:text-[44px] sm:leading-[44px]">
              Julian Vance
            </h1>
            <div className="flex items-center gap-2 text-base leading-6 text-[#414755]">
              <Hash size={18} className="shrink-0 opacity-70" />
              <span>Student ID: #MP-99283</span>
            </div>
          </div>
        </section>

        <section className={`mt-10 rounded-lg bg-[#f1f3fe] p-6 ${CARD_SHADOW}`}>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#0058bc] p-2.5 text-white">
              <Shield size={22} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.05em] text-[#181c23]">
                Admin security
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-[#414755]">
                Protect moderator access and sensitive student data on this
                device.
              </p>
            </div>
          </div>

          <label className="mt-5 flex cursor-pointer items-center justify-between gap-4 rounded-lg bg-white px-4 py-3">
            <span className="text-sm font-bold text-[#181c23]">
              Require 2FA for admin login
            </span>
            <input
              type="checkbox"
              checked={twoFactor}
              onChange={(e) => setTwoFactor(e.target.checked)}
              className="h-5 w-5 accent-[#0058bc]"
            />
          </label>

          <p className="mt-3 text-[11px] leading-relaxed text-[#717786]">
            Session expires after 24h of inactivity. Always log out on shared
            computers.
          </p>
        </section>

        <div className="mt-10 flex flex-col gap-6">
          <div className="flex flex-col gap-6 rounded-lg bg-[#f1f3fe] p-6">
            {[
              {
                label: "Full name",
                defaultValue: "Julian Vance",
                muted: false,
              },
              {
                label: "Username",
                defaultValue: "jvance_arch",
                muted: true,
                italic: true,
              },
              {
                label: "Email address",
                defaultValue: "julian.v@university.edu",
                muted: false,
              },
            ].map((field) => (
              <div key={field.label} className="flex flex-col gap-2">
                <span className="text-xs font-black uppercase tracking-[0.05em] text-[#414755]">
                  {field.label}
                </span>
                <input
                  readOnly
                  defaultValue={field.defaultValue}
                  className={`w-full rounded-lg px-4 py-3 text-base leading-6 outline-none ring-[#0058bc] focus:ring-2 ${
                    field.muted
                      ? "bg-[#e0e2ed]/50 italic text-[#414755]"
                      : "bg-white text-[#181c23]"
                  }`}
                />
              </div>
            ))}

            <div className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-[0.05em] text-[#414755]">
                Account status
              </span>
              <div className="relative flex items-center rounded-lg bg-white px-4 py-3">
                <span className="text-base text-[#181c23]">Active</span>
                <span className="pointer-events-none absolute right-4 text-[#6b7280]">
                  ▾
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-[0.05em] text-[#414755]">
                Bio
              </span>
              <textarea
                readOnly
                rows={5}
                defaultValue={
                  "Architecture major at state univ. Looking for a quiet place to study. Minimalist by nature, night owl by necessity."
                }
                className="w-full resize-none rounded-lg bg-white px-4 py-3 text-base leading-[26px] text-[#181c23] outline-none ring-[#0058bc] focus:ring-2"
              />
            </div>
          </div>

          <div className="rounded-lg bg-[#f1f3fe] p-8">
            <div className="flex flex-row items-center justify-between gap-3">
              <span className="text-xs font-black uppercase tracking-[0.05em] text-[#414755]">
                Lifestyle tags
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-black text-[#0058bc]"
              >
                <Plus size={14} strokeWidth={3} />
                Add Tag
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t.id}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium ${
                    t.variant === "muted"
                      ? "bg-[#e0e2ed] text-[#414755]"
                      : "bg-[#a1befd] text-[#2d4c83]"
                  }`}
                >
                  {t.label}
                  <button
                    type="button"
                    onClick={() => removeTag(t.id)}
                    className="rounded p-0.5 hover:bg-black/5"
                    aria-label={`Remove ${t.label}`}
                  >
                    <X size={14} strokeWidth={2.5} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 pt-2">
          <button
            type="button"
            className="w-full rounded-lg bg-[#0058bc] py-4 text-center text-lg font-black text-white shadow-[0px_12px_24px_-4px_rgba(0,88,188,0.2)] active:scale-[0.99]"
          >
            Save Changes
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#e6e8f3] py-4 text-sm font-black text-[#0058bc]"
            >
              <KeyRound size={18} strokeWidth={2} />
              Reset Password
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg bg-[rgba(255,218,214,0.3)] py-4 text-sm font-black text-[#ba1a1a]"
            >
              <Trash2 size={18} strokeWidth={2} />
              Delete Account
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#0058bc] bg-white py-4 text-sm font-black text-[#0058bc] active:bg-[#f1f3fe]"
          >
            <LogOut size={20} strokeWidth={2.25} />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
