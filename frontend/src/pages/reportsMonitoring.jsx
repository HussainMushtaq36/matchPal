import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ShieldCheck, ClipboardCheck, X } from "lucide-react";
import { adminService } from "../db/AdminService";

const CARD_SHADOW = "shadow-[0_10px_25px_-10px_rgba(0,0,0,0.1)]";

export default function ReportsMonitoring() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [dismissLabelById, setDismissLabelById] = useState({});
  const [reviewLabelById, setReviewLabelById] = useState({});

  useEffect(() => {
    const loadReports = async () => {
      try {
        const rows = await adminService.getAllReports();
        setReports(rows.map((r) => ({ ...r, dimmed: r.status === "Dismissed" })));
      } catch (error) {
        console.error(error);
      }
    };
    loadReports();
  }, []);

  const activeCount = useMemo(() => reports.filter((r) => !r.dimmed).length, [reports]);
  const flaggedCount = useMemo(() => reports.filter((r) => r.status === "Pending").length, [reports]);

  const handleDismiss = async (id) => {
    setDismissLabelById((prev) => ({ ...prev, [id]: "Dismissing..." }));
    try {
      await adminService.updateReportStatus(id, "Dismissed");
      setDismissLabelById((prev) => ({ ...prev, [id]: "Dismissed ✓" }));
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, dimmed: true } : r))
      );
    } catch (error) {
      console.error(error);
      setDismissLabelById((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const handleReview = async (id) => {
    setReviewLabelById((prev) => ({ ...prev, [id]: "Reviewing..." }));
    try {
      await adminService.updateReportStatus(id, "Reviewed");
      setReviewLabelById((prev) => ({ ...prev, [id]: "Under Review ✓" }));
    } catch (error) {
      console.error(error);
      setReviewLabelById((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex justify-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
      <div className="w-full max-w-[390px] mx-auto min-h-screen px-5 pb-28 pt-14">
        <button
          type="button"
          onClick={() => navigate("/admin-dashboard")}
          className="mb-6 flex items-center gap-1 text-sm font-bold text-[#414755] active:opacity-70"
        >
          <ChevronLeft size={22} strokeWidth={2.5} className="text-[#181c23]" />
          Back
        </button>

        <div className="rounded-2xl border border-[#e8eaf4] bg-[#f1f3fe]/80 px-4 py-3 flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-[#0058bc] p-2 text-white">
            <ShieldCheck size={20} strokeWidth={2.25} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[#0058bc]">
              Safety first
            </p>
            <p className="text-xs font-bold leading-snug text-[#414755] mt-1">
              Review reports promptly. Dismiss when resolved or no action is
              needed.
            </p>
          </div>
        </div>

        <header className="mt-8 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[#0058bc] leading-[15px]">
            Moderation queue
          </p>
          <h1 className="text-2xl leading-[30px] font-black tracking-tight text-[#181c23]">
            User Reports
          </h1>
        </header>

        <div className="mt-3 flex flex-row gap-2 pt-3">
          <span className="rounded-xl bg-[#0058bc] px-3 py-1 text-[10px] font-black uppercase tracking-[0.05em] text-white">
            Active: {activeCount}
          </span>
          <span className="rounded-xl bg-[#e0e2ed] px-3 py-1 text-[10px] font-black uppercase tracking-[0.05em] text-[#414755]">
            Flagged: {flaggedCount}
          </span>
        </div>

        <section className="mt-8 flex flex-col gap-6">
          {reports.map((r) => (
            <article
              key={r.id}
              className={`relative overflow-hidden rounded-lg bg-white p-5 ${CARD_SHADOW} ${
                r.dimmed ? "opacity-60" : ""
              }`}
            >
              <div
                className="absolute top-0 right-0 z-10 rounded-bl-lg px-4 py-1"
                style={{
                  backgroundColor: r.categoryBg,
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
              >
                <span
                  className="text-[10px] font-black uppercase tracking-tight leading-[15px]"
                  style={{ color: "#351000" }}
                >
                  {r.reason || "REPORT"}
                </span>
              </div>

              <div className="flex flex-row gap-4 pr-24">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#e0e2ed]">
                  <img src={"https://i.pravatar.cc/112?img=12"} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1 flex flex-col gap-1 pt-0.5">
                  <h3 className="text-base font-black leading-6 text-[#181c23]">
                    {r.target_id}
                  </h3>
                  <p className="text-xs leading-4 text-[#414755]">
                    Reporter: {r.reporter_id}
                  </p>
                  <p
                    className="pt-1 text-[10px] font-bold uppercase tracking-[0.1em]"
                    style={{ color: "#0058bc" }}
                  >
                    {r.status || "Pending"}
                  </p>
                </div>
              </div>

              {Boolean(r.details) && (
                <div className="mt-4 rounded bg-[#f1f3fe] p-3">
                  <p className="text-xs italic leading-[19.5px] text-[#414755]">
                    {r.details}
                  </p>
                </div>
              )}

              <div className="relative mt-4 flex flex-row flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  disabled={r.dimmed || Boolean(reviewLabelById[r.id])}
                  onClick={() => handleReview(r.id)}
                  className={`inline-flex flex-1 min-w-[120px] items-center justify-center gap-2 rounded px-6 py-3 text-xs font-black text-[#0058bc] bg-[#e6e8f3] ${
                    r.dimmed || reviewLabelById[r.id] ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <ClipboardCheck size={14} strokeWidth={2.5} />
                  {reviewLabelById[r.id] || "Review"}
                </button>
                <button
                  type="button"
                  disabled={r.dimmed || dismissLabelById[r.id]}
                  onClick={() => handleDismiss(r.id)}
                  className={`relative inline-flex flex-1 min-w-[120px] items-center justify-center gap-2 overflow-hidden rounded bg-[#0058bc] px-6 py-3 text-xs font-black text-white shadow-[0px_4px_6px_-4px_rgba(0,88,188,0.1),0px_10px_15px_-3px_rgba(0,88,188,0.1)] ${
                    r.dimmed ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <X size={14} strokeWidth={2.5} />
                  {dismissLabelById[r.id] || "Dismiss"}
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
