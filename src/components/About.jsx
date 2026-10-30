import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Code2,
  Unlock,
  Lock,
  User,
  RefreshCw,
  Download,
  ChevronLeft,
  ChevronRight,
  MessageSquareQuote,
  Cpu,
  Shield,
  ArrowRight,
} from "lucide-react";
import SpaceBunker from "./SpaceBunker";
import OrbitGlobe from "./OrbitGlobe";
import SecurityPasswordModal from "./SecurityPasswordModal";

const About = ({ about, identity }) => {
  const [overrideSignal, setOverrideSignal] = useState({ open: false, tick: 0 });
  const [masterAuthOpen, setMasterAuthOpen] = useState(false);
  const [showRealPhoto, setShowRealPhoto] = useState(true);
  const [storyIdx, setStoryIdx] = useState(0);

  const dialogues = about.storyDialogues || [];

  const handleMasterToggle = () => {
    if (overrideSignal.open) {
      setOverrideSignal((prev) => ({ open: false, tick: prev.tick + 1 }));
    } else {
      setMasterAuthOpen(true);
    }
  };

  return (
    <section
      id="about"
      className="relative py-24 sm:py-28 px-5 sm:px-8 lg:px-12"
    >
      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Centered Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="lumora-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.08em] text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            {about.sectionTag}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-[42px] leading-[1.12] text-white mt-4 mb-4 text-over-video">
            {about.title}
          </h2>
          <p className="text-[15.5px] sm:text-base text-slate-200 font-medium leading-relaxed text-over-video mb-6">
            {about.subtitle}
          </p>

          {/* Master Airlock Override Console Button */}
          <button
            type="button"
            onClick={handleMasterToggle}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A0E17]/85 border border-amber-300/35 text-xs font-mono font-semibold text-amber-200 hover:bg-amber-400/20 transition-all shadow-lg"
          >
            {overrideSignal.open ? (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>MASTER CONSOLE: TUTUP SEMUA PINTU PROFIL</span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5" />
                <span>MASTER CONSOLE: BUKA SEMUA PINTU PROFIL</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Top Row: Portrait + Story/Bio Bunker (Left) & Character Status/Personality Bunker (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-start mb-8">
          {/* Left (7 cols): Interactive Portrait Flip + Story Dialogue + Bio */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-7"
          >
            <SpaceBunker
              sectorCode="LAB BAY 01-A // BIO & STORY"
              badge="TENTANG AKU"
              title="Potret Karakter, Cerita & Latar Belakang"
              subtitle="Klik untuk mengenal cerita perjalanan & profil lengkapku"
              icon={User}
              overrideSignal={overrideSignal}
            >
              <div className="p-6 sm:p-8 space-y-6">
                {/* Portrait Flip Card + Interactive Dialogue Row */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  {/* Flippable Avatar <-> Real Portrait Card */}
                  <div className="sm:col-span-5 flex flex-col items-center">
                    <div
                      onClick={() => setShowRealPhoto((prev) => !prev)}
                      title="Klik untuk menukar Avatar & Foto Asli"
                      className="group relative w-48 h-52 sm:w-full sm:max-w-[215px] sm:h-60 rounded-[22px] overflow-hidden border border-amber-300/35 bg-gradient-to-b from-slate-800/80 via-[#0B101D] to-[#070A12] shadow-[0_14px_34px_rgba(0,0,0,0.65)] cursor-pointer select-none"
                    >
                      {showRealPhoto ? (
                        <div className="w-full h-full relative">
                          <img
                            src={about.portrait.realPhotoUrl}
                            onError={(e) => {
                              if (
                                about.portrait.fallbackPhotoUrl &&
                                e.currentTarget.src !==
                                  about.portrait.fallbackPhotoUrl
                              ) {
                                e.currentTarget.src =
                                  about.portrait.fallbackPhotoUrl;
                              }
                            }}
                            alt={about.portrait.caption}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#070A12]/85 via-transparent to-transparent" />
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/35 backdrop-blur-md">
                            REAL PORTRAIT
                          </span>
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 relative">
                          {/* Stylized Cyber-Astronaut Developer Crest Avatar */}
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.16),transparent_70%)]" />
                          <svg
                            viewBox="0 0 120 120"
                            className="w-28 h-28 drop-shadow-[0_8px_18px_rgba(245,158,11,0.35)] transition-transform duration-500 group-hover:scale-105"
                          >
                            <circle
                              cx="60"
                              cy="60"
                              r="52"
                              fill="#0F172A"
                              stroke="#FBBF24"
                              strokeWidth="2"
                              strokeDasharray="6 4"
                            />
                            {/* Helmet */}
                            <rect
                              x="32"
                              y="24"
                              width="56"
                              height="48"
                              rx="22"
                              fill="#1E293B"
                              stroke="#94A3B8"
                              strokeWidth="2.5"
                            />
                            {/* Glowing Visor */}
                            <rect
                              x="38"
                              y="34"
                              width="44"
                              height="26"
                              rx="11"
                              fill="#090D16"
                              stroke="#38BDF8"
                              strokeWidth="2"
                            />
                            {/* Cyber Eyes */}
                            <rect
                              x="46"
                              y="44"
                              width="8"
                              height="5"
                              rx="2"
                              fill="#FBBF24"
                            />
                            <rect
                              x="66"
                              y="44"
                              width="8"
                              height="5"
                              rx="2"
                              fill="#FBBF24"
                            />
                            {/* Visor Glint */}
                            <path
                              d="M43 39 H54"
                              stroke="#BAE6FD"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            {/* Space Suit Shoulders */}
                            <path
                              d="M26 98 C26 78, 94 78, 94 98"
                              fill="#1E293B"
                              stroke="#FBBF24"
                              strokeWidth="2.2"
                            />
                            <circle cx="60" cy="88" r="5" fill="#38BDF8" />
                          </svg>
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-400/15 text-amber-200 border border-amber-300/35">
                            SPACE AVATAR
                          </span>
                        </div>
                      )}

                      {/* Flip Button Badge */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowRealPhoto((prev) => !prev);
                        }}
                        className="absolute bottom-2.5 inset-x-2.5 py-1.5 px-2.5 rounded-xl bg-[#090B10]/85 border border-white/15 hover:border-amber-300/50 text-[11px] font-mono font-semibold text-amber-200 flex items-center justify-center gap-1.5 backdrop-blur-md transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>
                          {showRealPhoto ? "Lihat Avatar" : "Lihat Foto Asli"}
                        </span>
                      </button>
                    </div>

                    <div className="text-center mt-2.5">
                      <p className="font-display font-bold text-sm text-white">
                        {about.portrait.caption}
                      </p>
                      <p className="text-[11px] font-mono text-amber-200/80">
                        {about.portrait.subCaption}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Dialogue Box (Story Mode like Friend's Portfolio) */}
                  <div className="sm:col-span-7 flex flex-col justify-between p-5 rounded-[20px] bg-white/[0.04] border border-amber-200/20">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-300/25 text-[11px] font-mono font-bold text-amber-200">
                          <MessageSquareQuote className="w-3.5 h-3.5" />
                          DIALOG CERITA
                        </span>
                        <span className="font-mono text-xs text-slate-400">
                          0{storyIdx + 1} / 0{dialogues.length}
                        </span>
                      </div>

                      <p className="text-sm sm:text-[14.5px] text-slate-200 leading-relaxed min-h-[96px]">
                        “{dialogues[storyIdx]}”
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() =>
                          setStoryIdx(
                            (prev) =>
                              (prev - 1 + dialogues.length) % dialogues.length
                          )
                        }
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-semibold text-slate-200 transition-colors"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Sebelumnya</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStoryIdx(0)}
                        title="Ulangi dari awal"
                        className="text-[11px] font-mono text-slate-400 hover:text-amber-200 transition-colors"
                      >
                        ↺ Ulang
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setStoryIdx((prev) => (prev + 1) % dialogues.length)
                        }
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/35 text-xs font-semibold text-amber-200 transition-colors"
                      >
                        <span>Lanjut</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Full Bio Paragraphs */}
                <div className="space-y-3.5 pt-2 border-t border-white/10">
                  <span className="inline-block px-3 py-1 rounded-full bg-sky-400/10 border border-sky-300/25 text-[11px] font-mono font-semibold text-sky-200 uppercase tracking-wider">
                    {about.portrait.roleLabel}
                  </span>
                  <div className="space-y-3.5 text-sm sm:text-[15px] text-slate-200 leading-relaxed">
                    {about.bioParagraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Action Footer inside Bio Bunker */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {identity?.cvUrl && (
                    <a
                      href={identity.cvUrl}
                      download
                      className="btn-lumora-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh CV Lengkap</span>
                    </a>
                  )}
                  <a
                    href="#education"
                    className="btn-lumora-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold"
                  >
                    <span>Lihat Riwayat Pendidikan</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </a>
                  <a
                    href="#explore-planet"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/35 text-xs sm:text-sm font-semibold text-amber-200 transition-colors"
                  >
                    <span>🪐 Jelajah Planet 3D</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </a>
                </div>
              </div>
            </SpaceBunker>
          </motion.div>

          {/* Right (5 cols): Character Status Window & Personality Loadout */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <SpaceBunker
              sectorCode="LAB BAY 01-B // STATUS WINDOW"
              badge={about.statusWindow.rank}
              title="Status Karakter & Kepribadian"
              subtitle="Atribut kemampuan, kebiasaan kerja, & hobi personal"
              icon={Shield}
              overrideSignal={overrideSignal}
            >
              <div className="p-6 sm:p-7 space-y-5">
                {/* Status Window Header Banner */}
                <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-sky-500/10 to-amber-500/15 border border-amber-300/25">
                  <span className="font-mono text-xs font-bold tracking-wider text-amber-200">
                    ❖ {about.statusWindow.windowTitle}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-emerald-300">
                    {about.statusWindow.level}
                  </span>
                </div>

                {/* Identity Metadata Rows */}
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="block font-mono text-[10px] text-slate-400">
                      NAME
                    </span>
                    <span className="font-display font-bold text-white">
                      {identity?.fullName || "Yuga Putra Nugraha"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="block font-mono text-[10px] text-slate-400">
                      CLASS / ROLE
                    </span>
                    <span className="font-display font-bold text-amber-200">
                      {about.statusWindow.classRole}
                    </span>
                  </div>
                  <div className="col-span-2 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="block font-mono text-[10px] text-slate-400">
                      ACADEMY / FOCUS
                    </span>
                    <span className="font-display font-semibold text-slate-100">
                      {about.statusWindow.academy}
                    </span>
                  </div>
                </div>

                {/* Attribute Progress Bars */}
                <div className="space-y-3">
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Core Attributes
                  </span>
                  {about.statusWindow.attributes.map((attr) => (
                    <div
                      key={attr.code}
                      title={attr.desc}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/10"
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-slate-100">
                          <strong className="font-mono text-amber-300 mr-1.5">
                            [{attr.code}]
                          </strong>
                          {attr.label}
                        </span>
                        <span className="font-mono font-bold text-amber-200">
                          {attr.value}%
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${attr.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-sky-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Personal Loadout, Buffs & Personality */}
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Loadout & Kepribadian
                  </span>
                  {about.statusWindow.loadout.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-white/10"
                    >
                      <span className="px-2 py-0.5 rounded-md bg-amber-400/15 border border-amber-300/25 font-mono text-[10px] font-bold text-amber-200 shrink-0 mt-0.5">
                        {item.tag}
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </SpaceBunker>
          </motion.div>
        </div>

        {/* Bottom Full-Width Bunker: Tech Stack Chips & 3D Orbiting Ecosystem */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <SpaceBunker
            sectorCode="LAB BAY 01-C // TECH ARSENAL"
            badge={`${about.skillChips?.length || 15}+ TEKNOLOGI`}
            title="Tech Stack, Bahasa Pemrograman & Tools Andalan"
            subtitle="Klik untuk membuka orbit instrumen teknologi yang kupelajari & gunakan"
            icon={Code2}
            overrideSignal={overrideSignal}
          >
            <div className="p-6 sm:p-8">
              {/* 3D Orbiting Tech Rings */}
              {about.orbitRings && <OrbitGlobe orbitRings={about.orbitRings} />}

              {/* Skill Chips Cloud (Matching Friend's Portfolio Tag List) */}
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/15 text-xs font-mono text-amber-200 mb-4">
                  <Cpu className="w-3.5 h-3.5 text-amber-300" />
                  <span>ARSENAL PEMROGRAMAN & DESAIN</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {about.skillChips?.map((chip) => (
                    <span
                      key={chip}
                      className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white/[0.06] hover:bg-amber-400/15 text-slate-100 hover:text-amber-200 border border-white/15 hover:border-amber-300/40 transition-all cursor-default shadow-sm"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
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
        sectorCode="MASTER CONSOLE // PROFIL"
        title="Buka Seluruh Pintu Profil"
      />
    </section>
  );
};

export default About;
