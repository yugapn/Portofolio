import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Sparkles,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Unlock,
  Lock,
} from "lucide-react";
import SpaceBunker from "./SpaceBunker";
import SecurityPasswordModal from "./SecurityPasswordModal";

const Education = ({ education }) => {
  const [overrideSignal, setOverrideSignal] = useState({ open: false, tick: 0 });
  const [masterAuthOpen, setMasterAuthOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(education.levels.length - 1);
  const [failedImages, setFailedImages] = useState({});

  const levels = education.levels || [];
  const current = levels[activeIdx] || levels[0];

  const handleMasterToggle = () => {
    if (overrideSignal.open) {
      setOverrideSignal((prev) => ({ open: false, tick: prev.tick + 1 }));
    } else {
      setMasterAuthOpen(true);
    }
  };

  return (
    <section
      id="education"
      className="relative py-24 sm:py-28 px-5 sm:px-8 lg:px-12"
    >
      <span id="pendidikan" className="absolute top-0" />
      <div className="max-w-[1140px] mx-auto relative z-10">
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
            {education.sectionTag}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-[42px] leading-[1.12] text-white mt-4 mb-4 text-over-video">
            {education.title}
          </h2>
          <p className="text-[15.5px] sm:text-base text-slate-200 font-medium leading-relaxed text-over-video mb-6">
            {education.subtitle}
          </p>

          <button
            type="button"
            onClick={handleMasterToggle}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A0E17]/85 border border-amber-300/35 text-xs font-mono font-semibold text-amber-200 hover:bg-amber-400/20 transition-all shadow-lg"
          >
            {overrideSignal.open ? (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>ARCHIVE CONTROL: TUTUP ARSIP PENDIDIKAN</span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5" />
                <span>ARCHIVE CONTROL: BUKA ARSIP PENDIDIKAN</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Interactive Dual-Page Space Chronicle Bunker */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <SpaceBunker
            sectorCode="ACADEMIC ARCHIVE // CHRONICLE TOME"
            badge={`${levels.length} JENJANG PENDIDIKAN`}
            title="Lembaran Riwayat Pendidikan"
            subtitle="SD • SMP / MTs • SMK (Rekayasa Perangkat Lunak)"
            icon={GraduationCap}
            overrideSignal={overrideSignal}
          >
            <div className="p-6 sm:p-9 lg:p-10">
              {/* Chapter Selector Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
                {levels.map((lvl, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border ${
                        isActive
                          ? "bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 text-[#090B10] font-bold border-amber-200 shadow-[0_8px_24px_rgba(245,158,11,0.35)]"
                          : "bg-white/[0.05] text-slate-300 border-white/15 hover:text-white hover:border-amber-300/35"
                      }`}
                    >
                      {lvl.chapter} • {lvl.period}
                    </button>
                  );
                })}
              </div>

              {/* Dual-Page Book Spread Layout */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.32 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
                >
                  {/* Left Page: School Emblem / Badge + Inspirational Quote */}
                  <div className="lg:col-span-5 p-7 rounded-[22px] bg-gradient-to-b from-amber-500/10 via-white/[0.03] to-sky-500/10 border border-amber-200/20 flex flex-col items-center justify-between text-center">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-amber-300">
                      {current.chapter}
                    </span>

                    {/* School Logo / Crest Slot */}
                    <div className="my-6 w-32 h-32 rounded-3xl bg-[#090D16]/90 border border-amber-300/35 shadow-[0_12px_32px_rgba(0,0,0,0.55)] flex items-center justify-center p-4 overflow-hidden">
                      {current.badgeImage && !failedImages[current.id] ? (
                        <img
                          src={current.badgeImage}
                          alt={current.institution}
                          onError={() =>
                            setFailedImages((prev) => ({
                              ...prev,
                              [current.id]: true,
                            }))
                          }
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-amber-300">
                          <BookOpen className="w-12 h-12 mb-1.5 drop-shadow-[0_0_12px_rgba(251,191,36,0.45)]" />
                          <span className="font-mono text-[10px] text-slate-400">
                            ACADEMY SEAL
                          </span>
                        </div>
                      )}
                    </div>

                    <blockquote className="text-sm sm:text-[15px] italic text-amber-100/90 leading-relaxed max-w-xs">
                      {current.quote}
                    </blockquote>
                  </div>

                  {/* Right Page: Academic Details & Milestones */}
                  <div className="lg:col-span-7 p-7 sm:p-8 rounded-[22px] bg-white/[0.04] border border-white/12 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-400/15 text-amber-200 border border-amber-300/30">
                          <Calendar className="w-3.5 h-3.5 text-amber-300" />
                          {current.period}
                        </span>
                        <span className="font-mono text-xs text-slate-400">
                          Halaman 0{activeIdx + 1} / 0{levels.length}
                        </span>
                      </div>

                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                        {current.institution}
                      </h3>
                      <p className="text-sm sm:text-base font-semibold text-sky-300 mt-1 mb-4">
                        {current.level}
                      </p>

                      <p className="text-sm sm:text-[15px] text-slate-200 leading-relaxed mb-5">
                        {current.description}
                      </p>

                      <ul className="space-y-2.5">
                        {current.highlights.map((bullet, i) => (
                          <li
                            key={i}
                            className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-2.5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-[13.5px] text-slate-200 leading-relaxed">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Page Flip Navigation Footer */}
                    <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveIdx(
                            (prev) => (prev - 1 + levels.length) % levels.length
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs sm:text-sm font-semibold text-slate-200 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Sebelumnya</span>
                      </button>

                      <div className="flex items-center gap-2">
                        {levels.map((lvl, idx) => (
                          <button
                            key={lvl.id}
                            type="button"
                            onClick={() => setActiveIdx(idx)}
                            aria-label={`Pilih ${lvl.institution}`}
                            className={`h-2.5 rounded-full transition-all ${
                              idx === activeIdx
                                ? "w-7 bg-amber-400"
                                : "w-2.5 bg-white/25 hover:bg-white/45"
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setActiveIdx((prev) => (prev + 1) % levels.length)
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/35 text-xs sm:text-sm font-semibold text-amber-200 transition-colors"
                      >
                        <span>Selanjutnya</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </SpaceBunker>
        </motion.div>
      </div>

      <SecurityPasswordModal
        isOpen={masterAuthOpen}
        onClose={() => setMasterAuthOpen(false)}
        onSuccess={() =>
          setOverrideSignal((prev) => ({ open: true, tick: prev.tick + 1 }))
        }
        sectorCode="MASTER CONSOLE // ARSIP"
        title="Buka Seluruh Arsip Pendidikan"
      />
    </section>
  );
};

export default Education;

