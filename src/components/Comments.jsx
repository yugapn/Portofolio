import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquarePlus,
  Sparkles,
  ScrollText,
  ChevronLeft,
  ChevronRight,
  Pin,
  Check,
  Unlock,
  Lock,
  X,
  UserCircle2,
} from "lucide-react";
import SpaceBunker from "./SpaceBunker";
import SecurityPasswordModal from "./SecurityPasswordModal";

const STORAGE_KEY = "ypn_portfolio_comments_v1";
const PER_PAGE = 6;

function formatRelativeTime(ts) {
  if (!ts) return "Baru saja";
  const diffSec = Math.floor(Math.max(0, Date.now() - ts) / 1000);
  if (diffSec < 45) return "Baru saja";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} menit lalu`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} jam lalu`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} hari lalu`;
}

const Comments = ({ comments, identity }) => {
  const [overrideSignal, setOverrideSignal] = useState({ open: false, tick: 0 });
  const [masterAuthOpen, setMasterAuthOpen] = useState(false);
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return comments.seedComments || [];
  });

  const [page, setPage] = useState(0);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Form states
  const [author, setAuthor] = useState("");
  const [isAnon, setIsAnon] = useState(false);
  const [role, setRole] = useState(comments.callsignRoles?.[0] || "Visitor");
  const [message, setMessage] = useState("");
  const [agreedRules, setAgreedRules] = useState(false);

  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const currentSlice = items.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage quota errors
    }
  }, [items]);

  const handleMasterToggle = () => {
    if (overrideSignal.open) {
      setOverrideSignal((prev) => ({ open: false, tick: prev.tick + 1 }));
    } else {
      setMasterAuthOpen(true);
    }
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreedRules || !message.trim()) return;

    const finalAuthor = isAnon
      ? "Anonymous Guest"
      : author.trim() || "Anonymous Guest";

    const newEntry = {
      id: `msg-${Date.now()}`,
      author: finalAuthor,
      role,
      message: message.trim(),
      createdAt: Date.now(),
    };

    setItems((prev) => [newEntry, ...prev]);
    setPage(0);
    setMessage("");
    setAuthor("");
    setIsAnon(false);
    setFormModalOpen(false);
    showToast(`✨ Pesan dari ${finalAuthor} berhasil dipasang di Papan Komentar!`);
  };

  return (
    <section
      id="comments"
      className="relative py-24 sm:py-28 px-5 sm:px-8 lg:px-12"
    >
      <div className="max-w-[1180px] mx-auto relative z-10">
        {/* Centered Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="lumora-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.08em] text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            {comments.sectionTag}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-[42px] leading-[1.12] text-white mt-4 mb-4 text-over-video">
            {comments.boardTitle}
          </h2>
          <p className="text-[15.5px] sm:text-base text-slate-200 font-medium leading-relaxed text-over-video mb-6">
            {comments.boardSubtitle}
          </p>

          <button
            type="button"
            onClick={handleMasterToggle}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A0E17]/85 border border-amber-300/35 text-xs font-mono font-semibold text-amber-200 hover:bg-amber-400/20 transition-all shadow-lg"
          >
            {overrideSignal.open ? (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>BOARD CONTROL: TUTUP PAPAN PESAN</span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5" />
                <span>BOARD CONTROL: BUKA PAPAN PESAN</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Visitor Notice Board Sealed Inside SpaceBunker */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <SpaceBunker
            sectorCode="COMM BOARD // VISITOR MESSAGES"
            badge={`${items.length} PESAN TERSIMPAN`}
            title="Papan Komentar & Kesan Pengunjung"
            subtitle="Baca pesan pengunjung atau tinggalkan jejakmu di sini"
            icon={MessageSquarePlus}
            overrideSignal={overrideSignal}
          >
            <div className="p-6 sm:p-8 lg:p-10 space-y-7">
              {/* Top Notice Board Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 text-[#090B10] font-display font-extrabold text-sm flex items-center justify-center shadow-md">
                    {identity?.monogram || "YPN"}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {comments.boardTitle}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Menampilkan halaman {page + 1} dari {totalPages} ({items.length} pesan)
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setRulesModalOpen(true)}
                    className="btn-lumora-secondary inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold"
                  >
                    <ScrollText className="w-3.5 h-3.5 text-amber-300" />
                    <span>Peraturan Komentar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormModalOpen(true)}
                    className="btn-lumora-primary inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold"
                  >
                    <Pin className="w-3.5 h-3.5" />
                    <span>+ Leave a Message</span>
                  </button>
                </div>
              </div>

              {/* Paginated 6-Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {currentSlice.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-[22px] bg-white/[0.04] hover:bg-white/[0.07] border border-white/12 hover:border-amber-300/30 transition-all flex flex-col justify-between gap-4 shadow-md"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-300/30 flex items-center justify-center text-amber-200 shrink-0">
                            <UserCircle2 className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-display font-bold text-sm text-white truncate">
                              {item.author}
                            </h4>
                            <span className="inline-block text-[10px] font-mono text-amber-300/90">
                              {item.role || "Visitor"}
                            </span>
                          </div>
                        </div>

                        <Pin className="w-3.5 h-3.5 text-amber-300/60 shrink-0" />
                      </div>

                      <p className="text-xs sm:text-[13.5px] text-slate-200 leading-relaxed break-words">
                        “{item.message}”
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>{formatRelativeTime(item.createdAt)}</span>
                      <span className="text-emerald-300/80">● Verified Log</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    disabled={page === 0}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white/[0.06] disabled:opacity-40 hover:bg-white/[0.12] border border-white/15 text-xs font-semibold text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Sebelumnya</span>
                  </button>

                  <span className="font-mono text-xs text-amber-200 px-2">
                    {page + 1} / {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={page >= totalPages - 1}
                    onClick={() =>
                      setPage((p) => Math.min(totalPages - 1, p + 1))
                    }
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white/[0.06] disabled:opacity-40 hover:bg-white/[0.12] border border-white/15 text-xs font-semibold text-white transition-colors"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </SpaceBunker>
        </motion.div>
      </div>

      {/* =====================================================================
          MODAL 1: POST A VISITOR MESSAGE
         ===================================================================== */}
      <AnimatePresence>
        {formModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFormModalOpen(false)}
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-xl p-4 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-[26px] bg-[#0B0F19] border border-amber-200/30 p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.85)]"
            >
              <button
                type="button"
                onClick={() => setFormModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-rose-500/25 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-300/30 font-mono text-[11px] font-bold text-amber-200 mb-2">
                  <Pin className="w-3 h-3" />
                  POST A NOTICE
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                  Tinggalkan Pesan & Sapaan
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Tulis kesan, dukungan, atau sapaanmu di papan komentar ini.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Pesan Kamu *
                  </label>
                  <textarea
                    rows={3}
                    required
                    maxLength={280}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan pesan atau kesanmu di sini..."
                    className="w-full rounded-2xl bg-white/[0.05] border border-white/15 focus:border-amber-300/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                      Nama / Callsign
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsAnon((prev) => !prev)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border transition-all ${
                        isAnon
                          ? "bg-amber-400/20 text-amber-200 border-amber-300/50"
                          : "bg-white/[0.05] text-slate-400 border-white/15 hover:text-white"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isAnon ? "bg-amber-300" : "bg-slate-500"
                        }`}
                      />
                      <span>Anonymous Guest</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    maxLength={28}
                    disabled={isAnon}
                    value={isAnon ? "Anonymous Guest" : author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Masukkan namamu..."
                    className="w-full rounded-2xl bg-white/[0.05] disabled:opacity-50 border border-white/15 focus:border-amber-300/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                  />
                </div>

                {/* Callsign Role Selector */}
                <div>
                  <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Kategori Pengunjung
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {(comments.callsignRoles || ["Visitor"]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                          role === r
                            ? "bg-amber-400 text-[#090B10] font-bold border-amber-300"
                            : "bg-white/[0.05] text-slate-300 border-white/15 hover:text-white"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rules Agreement Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={agreedRules}
                      onChange={(e) => setAgreedRules(e.target.checked)}
                      className="mt-0.5 accent-amber-400 w-4 h-4 rounded"
                    />
                    <span>
                      Saya telah membaca dan menyetujui{" "}
                      <button
                        type="button"
                        onClick={() => setRulesModalOpen(true)}
                        className="text-amber-300 underline hover:text-amber-200 font-semibold"
                      >
                        peraturan
                      </button>{" "}
                      sebelum berkomentar.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!agreedRules || !message.trim()}
                  className="btn-lumora-primary disabled:opacity-40 disabled:pointer-events-none w-full py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2"
                >
                  <Pin className="w-4 h-4" />
                  <span>Pasang Pesan ke Papan Komentar</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          MODAL 2: 7 PERATURAN SEBELUM BERKOMENTAR
         ===================================================================== */}
      <AnimatePresence>
        {rulesModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRulesModalOpen(false)}
            className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-xl p-4 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-[26px] bg-[#0B0F19] border border-amber-200/30 p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9)]"
            >
              <button
                type="button"
                onClick={() => setRulesModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-rose-500/25 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-5">
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                  {comments.rulesTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  {comments.rulesSubtitle}
                </p>
              </div>

              <div className="space-y-3">
                {comments.rules?.map((rule) => (
                  <div
                    key={rule.num}
                    className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3"
                  >
                    <span className="px-2.5 py-1 rounded-xl bg-amber-400/15 border border-amber-300/30 font-mono text-xs font-bold text-amber-200 shrink-0">
                      {rule.num}
                    </span>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">
                        {rule.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        {rule.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setAgreedRules(true);
                    setRulesModalOpen(false);
                  }}
                  className="btn-lumora-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold"
                >
                  <Check className="w-4 h-4" />
                  <span>Mengerti & Setuju</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-6 right-6 z-[95] px-5 py-3.5 rounded-2xl lumora-glass-strong border border-emerald-400/35 text-xs sm:text-sm font-semibold text-emerald-200 shadow-2xl"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <SecurityPasswordModal
        isOpen={masterAuthOpen}
        onClose={() => setMasterAuthOpen(false)}
        onSuccess={() =>
          setOverrideSignal((prev) => ({ open: true, tick: prev.tick + 1 }))
        }
        sectorCode="BOARD CONTROL // ALL"
        title="Buka Seluruh Papan Komentar"
      />
    </section>
  );
};

export default Comments;

