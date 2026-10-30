import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Unlock,
  Lock,
  X,
} from "lucide-react";
import SpaceBunker from "./SpaceBunker";
import SecurityPasswordModal from "./SecurityPasswordModal";

const Certificates = ({ certificates, identity }) => {
  const items = certificates.items || [];
  const [activeIdx, setActiveIdx] = useState(0);
  const [overrideSignal, setOverrideSignal] = useState({ open: false, tick: 0 });
  const [masterAuthOpen, setMasterAuthOpen] = useState(false);
  const [failedImgs, setFailedImgs] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const current = items[activeIdx] || items[0];

  const handleMasterToggle = () => {
    if (overrideSignal.open) {
      setOverrideSignal((prev) => ({ open: false, tick: prev.tick + 1 }));
    } else {
      setMasterAuthOpen(true);
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!modalOpen) return;
      if (e.key === "Escape") setModalOpen(false);
      if (items.length > 1 && e.key === "ArrowRight") {
        setActiveIdx((idx) => (idx + 1) % items.length);
      }
      if (items.length > 1 && e.key === "ArrowLeft") {
        setActiveIdx((idx) => (idx - 1 + items.length) % items.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, items.length]);

  if (!items.length) return null;

  const padNum = (n) => String(n).padStart(2, "0");

  return (
    <section
      id="sertifikat"
      className="relative py-24 sm:py-28 px-5 sm:px-8 lg:px-12"
    >
      <span id="sertificat" className="absolute top-0" />
      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="lumora-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.08em] text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            {certificates.sectionTag}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-[42px] leading-[1.12] text-white mt-4 mb-4 text-over-video">
            {certificates.title}
          </h2>
          <p className="text-[15.5px] sm:text-base text-slate-200 font-medium leading-relaxed text-over-video mb-6">
            {certificates.subtitle}
          </p>

          <button
            type="button"
            onClick={handleMasterToggle}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A0E17]/85 border border-amber-300/35 text-xs font-mono font-semibold text-amber-200 hover:bg-amber-400/20 transition-all shadow-lg"
          >
            {overrideSignal.open ? (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>VAULT CONTROL: TUTUP RUANG SERTIFIKAT</span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5" />
                <span>VAULT CONTROL: BUKA RUANG SERTIFIKAT</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Main Certificate Showcase Bunker */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <SpaceBunker
            sectorCode="CREDENTIAL VAULT // SERTIFIKAT"
            badge={`${items.length} SERTIFIKAT RESMI`}
            title="Galeri Sertifikat & Kompetensi"
            subtitle="Klik untuk memperbesar foto sertifikat"
            icon={Award}
            overrideSignal={overrideSignal}
          >
            <div className="p-6 sm:p-9 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Certificate Information & Action */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 14 }}
                      transition={{ duration: 0.28 }}
                      className="p-6 sm:p-7 rounded-[22px] bg-white/[0.04] border border-white/12 space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        {current.badge && (
                          <span className="px-3 py-1 rounded-full text-[10.5px] font-mono font-bold uppercase bg-amber-400/15 text-amber-200 border border-amber-300/30">
                            {current.badge}
                          </span>
                        )}
                        {current.date && (
                          <span className="font-mono text-xs text-slate-400">
                            {current.date}
                          </span>
                        )}
                      </div>

                      <div>
                        {current.issuer && (
                          <p className="text-xs font-semibold text-sky-300 mb-1">
                            {current.issuer}
                          </p>
                        )}
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-snug">
                          {current.title}
                        </h3>
                      </div>

                      {current.description && (
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {current.description}
                        </p>
                      )}

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setModalOpen(true)}
                          className="btn-lumora-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Detail Sertifikat</span>
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Carousel Navigation Bar (Hanya tampil jika ada lebih dari 1 sertifikat) */}
                  {items.length > 1 && (
                    <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-black/35 border border-white/10">
                      <span className="font-mono text-xs sm:text-sm font-bold text-amber-200">
                        Sertifikat {padNum(activeIdx + 1)} / {padNum(items.length)}
                      </span>

                      <div className="flex items-center gap-2">
                        {items.map((item, idx) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setActiveIdx(idx)}
                            aria-label={`Pilih sertifikat ${idx + 1}`}
                            className={`h-2.5 rounded-full transition-all ${
                              idx === activeIdx
                                ? "w-7 bg-amber-400"
                                : "w-2.5 bg-white/25 hover:bg-white/45"
                            }`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveIdx(
                              (prev) => (prev - 1 + items.length) % items.length
                            )
                          }
                          aria-label="Sertifikat sebelumnya"
                          className="w-9 h-9 rounded-full bg-white/[0.07] hover:bg-amber-400/25 border border-white/15 flex items-center justify-center text-white transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveIdx((prev) => (prev + 1) % items.length)
                          }
                          aria-label="Sertifikat berikutnya"
                          className="w-9 h-9 rounded-full bg-white/[0.07] hover:bg-amber-400/25 border border-white/15 flex items-center justify-center text-white transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Certificate Image Stage */}
                <div className="lg:col-span-7 space-y-4">
                  <div
                    onClick={() => setModalOpen(true)}
                    title="Klik untuk memperbesar foto sertifikat"
                    className="group relative rounded-[24px] overflow-hidden border border-amber-200/30 shadow-[0_20px_60px_rgba(0,0,0,0.7)] bg-[#070A12] cursor-zoom-in transition-transform duration-500 hover:-translate-y-1"
                  >
                    {current.image && !failedImgs[current.id] ? (
                      <div className="relative aspect-[16/11] w-full bg-[#0B0F19] flex items-center justify-center overflow-hidden p-2 sm:p-3">
                        <img
                          src={current.image}
                          alt={current.title}
                          onError={() =>
                            setFailedImgs((prev) => ({
                              ...prev,
                              [current.id]: true,
                            }))
                          }
                          className="w-full h-full object-contain rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-[16/11] flex flex-col items-center justify-center p-6 text-center bg-[#0B0F19] text-amber-200 font-mono text-sm">
                        <Award className="w-12 h-12 mb-3 text-amber-300" />
                        <span>{current.title}</span>
                      </div>
                    )}

                    {/* Floating Zoom Hint */}
                    <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#090B10]/85 border border-amber-300/35 text-[11px] font-mono font-semibold text-amber-200 inline-flex items-center gap-1.5 backdrop-blur-md">
                      <Maximize2 className="w-3 h-3" />
                      <span>Klik untuk Layar Penuh</span>
                    </span>
                  </div>

                  {/* Thumbnail Selector Strip (Hanya tampil jika ada lebih dari 1 sertifikat) */}
                  {items.length > 1 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {items.map((cert, idx) => {
                        const selected = idx === activeIdx;
                        return (
                          <button
                            key={cert.id}
                            type="button"
                            onClick={() => setActiveIdx(idx)}
                            className={`p-3 rounded-2xl text-left border transition-all ${
                              selected
                                ? "bg-amber-400/15 border-amber-300/50 shadow-md"
                                : "bg-white/[0.04] border-white/10 hover:bg-white/[0.08]"
                            }`}
                          >
                            <span className="block font-mono text-[10px] text-amber-300">
                              {padNum(idx + 1)} • {cert.date}
                            </span>
                            <span className="block font-display font-bold text-xs text-white truncate mt-0.5">
                              {cert.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SpaceBunker>
        </motion.div>
      </div>

      {/* Fullscreen Certificate Lightbox Modal */}
      <AnimatePresence>
        {modalOpen && current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-xl p-4 sm:p-8 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-[24px] overflow-hidden bg-[#090D16] border border-amber-200/30 shadow-[0_25px_80px_rgba(0,0,0,0.85)]"
            >
              <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-white/10">
                <div className="min-w-0">
                  <p className="font-display font-bold text-sm sm:text-base text-white truncate">
                    {current.title}
                  </p>
                  <p className="text-xs font-mono text-amber-200/80">
                    {current.issuer} {current.date ? `• ${current.date}` : ""}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  aria-label="Tutup pratinjau sertifikat"
                  className="p-2 rounded-full bg-white/10 hover:bg-rose-500/25 text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative p-4 sm:p-6 bg-black/65 flex items-center justify-center">
                {current.image && !failedImgs[current.id] ? (
                  <img
                    src={current.image}
                    alt={current.title}
                    className="max-h-[76vh] w-auto object-contain rounded-xl shadow-2xl"
                  />
                ) : (
                  <div className="p-8 text-center text-amber-200 font-mono">
                    {current.title}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SecurityPasswordModal
        isOpen={masterAuthOpen}
        onClose={() => setMasterAuthOpen(false)}
        onSuccess={() =>
          setOverrideSignal((prev) => ({ open: true, tick: prev.tick + 1 }))
        }
        sectorCode="VAULT CONTROL // ALL"
        title="Buka Seluruh Ruang Sertifikat"
      />
    </section>
  );
};

export default Certificates;
