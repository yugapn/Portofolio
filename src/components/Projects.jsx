import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Sparkles,
  ArrowUpRight,
  FolderGit2,
  Unlock,
  Lock,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Rocket,
} from "lucide-react";
import SpaceBunker from "./SpaceBunker";
import SecurityPasswordModal from "./SecurityPasswordModal";

const Projects = ({ projects, onOpenSimulator }) => {
  const [filter, setFilter] = useState("ALL");
  const [overrideSignal, setOverrideSignal] = useState({ open: false, tick: 0 });
  const [masterAuthOpen, setMasterAuthOpen] = useState(false);
  const [cardImgIdx, setCardImgIdx] = useState({});
  const [lightbox, setLightbox] = useState(null); // { title, images, index }

  const categories = [
    "ALL",
    ...Array.from(new Set(projects.items.map((item) => item.category))),
  ];

  const filteredProjects =
    filter === "ALL"
      ? projects.items
      : projects.items.filter((item) => item.category === filter);

  const handleMasterToggle = () => {
    if (overrideSignal.open) {
      setOverrideSignal((prev) => ({ open: false, tick: prev.tick + 1 }));
    } else {
      setMasterAuthOpen(true);
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        if (lightbox) {
          setLightbox(null);
          return;
        }
      }
      if (!lightbox) return;
      if (e.key === "ArrowRight") {
        setLightbox((prev) => ({
          ...prev,
          index: (prev.index + 1) % prev.images.length,
        }));
      }
      if (e.key === "ArrowLeft") {
        setLightbox((prev) => ({
          ...prev,
          index: (prev.index - 1 + prev.images.length) % prev.images.length,
        }));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-28 px-5 sm:px-8 lg:px-12"
    >
      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="lumora-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.08em] text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            {projects.sectionTag}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-[42px] leading-[1.12] text-white mt-4 mb-4 text-over-video">
            {projects.title}
          </h2>
          <p className="text-[15.5px] sm:text-base text-slate-200 font-medium leading-relaxed text-over-video mb-6">
            {projects.subtitle}
          </p>

          <button
            type="button"
            onClick={handleMasterToggle}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A0E17]/85 border border-amber-300/35 text-xs font-mono font-semibold text-amber-200 hover:bg-amber-400/20 transition-all shadow-lg"
          >
            {overrideSignal.open ? (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>HANGAR CONTROL: TUTUP SEMUA PROYEK</span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5" />
                <span>HANGAR CONTROL: BUKA SEMUA PROYEK</span>
              </>
            )}
          </button>
        </motion.div>

        {/* =========================================================================
            FLAGSHIP COCKPIT BAY: dashboard explore the planet (3D Space Simulator)
           ========================================================================= */}
        <motion.div
          id="explore-planet"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-12 scroll-mt-28"
        >
          <SpaceBunker
            sectorCode="COCKPIT BAY 00 // 3D EXPLORATION"
            badge="GAME & 3D SIMULATOR"
            title="dashboard explore the planet"
            subtitle="Solar Odyssey — Simulator 3D Interaktif Tiga Dimensi Tata Surya & Orbit Realtime"
            icon={Rocket}
            overrideSignal={overrideSignal}
            className="border-amber-400/40 shadow-[0_20px_60px_rgba(245,158,11,0.12)]"
          >
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Stylized Holographic Cosmic Radar Bridge */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="relative w-full aspect-[4/3] sm:h-72 rounded-[22px] overflow-hidden border border-amber-300/35 bg-gradient-to-b from-[#0B101D] via-[#070A14] to-[#04060A] shadow-[0_16px_40px_rgba(0,0,0,0.7)] flex flex-col items-center justify-center p-6 text-center select-none group">
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.22)_0%,rgba(14,165,233,0.10)_45%,transparent_75%)] pointer-events-none" />

                    {/* Animated Concentric Cosmic Orbit Rings */}
                    <div className="absolute w-56 h-56 rounded-full border border-dashed border-amber-400/20 animate-[spin_40s_linear_infinite] pointer-events-none" />
                    <div className="absolute w-40 h-40 rounded-full border border-sky-400/25 animate-[spin_25s_linear_infinite_reverse] pointer-events-none" />
                    <div className="absolute w-28 h-28 rounded-full border border-amber-200/30 animate-[spin_15s_linear_infinite] pointer-events-none" />

                    {/* Glowing Sun Core */}
                    <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-200 via-amber-400 to-orange-600 shadow-[0_0_40px_rgba(245,158,11,0.85)] flex items-center justify-center animate-pulse">
                      <span className="w-8 h-8 rounded-full bg-white/40 blur-xs" />
                    </div>

                    {/* Orbiting Planet Dot */}
                    <div className="absolute w-44 h-44 animate-[spin_12s_linear_infinite] pointer-events-none">
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-sky-400 shadow-[0_0_12px_#38bdf8]" />
                    </div>
                    {/* Orbiting Saturn Dot with Ring */}
                    <div className="absolute w-60 h-60 animate-[spin_28s_linear_infinite_reverse] pointer-events-none">
                      <div className="absolute bottom-2 left-6 flex items-center justify-center">
                        <span className="w-5 h-5 rounded-full bg-amber-300 shadow-[0_0_10px_#fcd34d]" />
                        <span className="absolute w-8 h-2 rounded-full border border-amber-200/80 rotate-12" />
                      </div>
                    </div>

                    {/* Top Telemetry Tag */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#070A12]/85 border border-emerald-400/40 text-[10.5px] font-mono font-bold text-emerald-300 backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>SIMULATOR READY</span>
                    </div>

                    {/* Bottom Engine Telemetry */}
                    <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#090C15]/85 border border-white/10 text-[10px] font-mono text-slate-300 backdrop-blur-md">
                      <span>THREE.JS r128</span>
                      <span className="text-amber-300">WEB AUDIO SYNTH</span>
                      <span>ORBIT 360°</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Mission Briefing + Prominent MAINKAN SEKARANG button */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-300/30 text-xs font-mono font-bold text-amber-200">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>FLAGSHIP INTERACTIVE EXPERIENCE</span>
                    </div>

                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                      SOLAR ODYSSEY — JELAJAH TATA SURYA 3D
                    </h3>

                    <p className="text-sm sm:text-[15px] text-slate-200 leading-relaxed font-normal">
                      Simulator tata surya 3D interaktif Three.js yang mengajak pengunjung
                      menjelajahi keagungan kosmik: Matahari membara, 8 planet utama
                      dengan tekstur prosedural fotorealistik, cincin spektakuler Saturnus,
                      hingga Stasiun Luar Angkasa Internasional (ISS). Dilengkapi kontrol
                      orbit bebas 360°, kalkulasi kecepatan rotasi & revolusi ilmiah, audio
                      kosmik prosedural, dan mode tur antariksa otomatis.
                    </p>
                  </div>

                  {/* Quick Telemetry Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                      <span className="block font-mono text-[10px] text-slate-400">BENDA LANGIT</span>
                      <span className="font-mono text-xs font-bold text-amber-200">1 Surya + 8 Planet</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                      <span className="block font-mono text-[10px] text-slate-400">SATELIT AKTIF</span>
                      <span className="font-mono text-xs font-bold text-sky-200">ISS Tracker</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                      <span className="block font-mono text-[10px] text-slate-400">AUDIO KOSMIK</span>
                      <span className="font-mono text-xs font-bold text-emerald-300">Procedural Synth</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                      <span className="block font-mono text-[10px] text-slate-400">KONTROL KAMERA</span>
                      <span className="font-mono text-xs font-bold text-orange-200">Orbit 360° Zoom</span>
                    </div>
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                    {/* The Main Requested Button: MAINKAN SEKARANG */}
                    <button
                      type="button"
                      onClick={onOpenSimulator ? onOpenSimulator : () => window.open("/solar-odyssey/", "_self")}
                      className="relative group overflow-hidden px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-display font-black text-sm uppercase tracking-wider shadow-[0_10px_30px_rgba(245,158,11,0.45)] hover:shadow-[0_12px_40px_rgba(245,158,11,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                    >
                      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <Play className="w-4 h-4 fill-current shrink-0" />
                      <span>MAINKAN SEKARANG</span>
                      <Rocket className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </button>

                    {/* Secondary Button: Buka di Tab Baru ↗ */}
                    <a
                      href="/solar-odyssey/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3.5 rounded-2xl bg-[#090D18]/90 hover:bg-[#0E1526] border border-amber-300/30 hover:border-amber-300/60 text-xs font-mono font-semibold text-amber-200 hover:text-white transition-all flex items-center justify-center gap-2 shadow-md"
                      title="Buka simulator di tab baru peramban untuk mode layar penuh mandiri"
                    >
                      <span>Buka di Tab Baru</span>
                      <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                    </a>
                  </div>

                  <p className="text-[11.5px] font-mono text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>
                      Tip: Mainkan langsung di dalam layar web portofolio atau buka di tab baru peramban.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </SpaceBunker>
        </motion.div>

        {/* Interactive Sliding Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  active
                    ? "text-[#090B10] font-bold shadow-[0_8px_24px_rgba(245,158,11,0.35)]"
                    : "lumora-glass text-slate-300 hover:text-white hover:border-amber-200/30"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="project-cat-pill"
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 -z-10"
                  />
                )}
                {cat === "ALL" ? "Semua Karya" : cat}
              </button>
            );
          })}
        </div>

        {/* Hangar Bunker Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">
          {filteredProjects.map((project, index) => {
            const imgs =
              project.images && project.images.length > 0
                ? project.images
                : [project.image];
            const curImgIndex = (cardImgIdx[project.id] || 0) % imgs.length;
            const curImgSrc = imgs[curImgIndex];

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <SpaceBunker
                  sectorCode={`HANGAR BAY 0${index + 1} // ${project.year}`}
                  badge={project.category}
                  title={project.title}
                  subtitle={`Tech: ${project.techStack.slice(0, 4).join(" • ")}`}
                  icon={FolderGit2}
                  overrideSignal={overrideSignal}
                >
                  <div className="flex flex-col justify-between group">
                    <div>
                      {/* Cosmic Showcase Frame with Multi-Photo & Lightbox Trigger */}
                      <div
                        className={`relative h-56 sm:h-64 p-4 sm:p-5 bg-gradient-to-br ${
                          project.accentGradient ||
                          "from-amber-500/25 via-orange-500/10 to-slate-950/80"
                        } overflow-hidden`}
                      >
                        <div
                          onClick={() =>
                            setLightbox({
                              title: project.title,
                              images: imgs,
                              index: curImgIndex,
                            })
                          }
                          title="Klik untuk memperbesar foto proyek"
                          className="relative w-full h-full rounded-[18px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.5)] border border-white/15 cursor-zoom-in"
                        >
                          <img
                            src={curImgSrc}
                            alt={project.title}
                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          />

                          {/* Zoom Pill */}
                          <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#090B10]/85 border border-white/20 text-[11px] font-mono text-amber-200 inline-flex items-center gap-1 backdrop-blur-md">
                            <Maximize2 className="w-3 h-3" />
                            <span>Perbesar</span>
                          </span>

                          {/* Multi-photo counter & arrows */}
                          {imgs.length > 1 && (
                            <>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCardImgIdx((prev) => ({
                                    ...prev,
                                    [project.id]:
                                      (curImgIndex - 1 + imgs.length) %
                                      imgs.length,
                                  }));
                                }}
                                aria-label="Foto sebelumnya"
                                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#090B10]/80 hover:bg-amber-400 text-white hover:text-[#090B10] border border-white/20 flex items-center justify-center transition-colors"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCardImgIdx((prev) => ({
                                    ...prev,
                                    [project.id]:
                                      (curImgIndex + 1) % imgs.length,
                                  }));
                                }}
                                aria-label="Foto berikutnya"
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#090B10]/80 hover:bg-amber-400 text-white hover:text-[#090B10] border border-white/20 flex items-center justify-center transition-colors"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                              <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-[#090B10]/85 border border-white/15 font-mono text-[11px] text-white">
                                {curImgIndex + 1} / {imgs.length}
                              </span>
                            </>
                          )}
                        </div>

                        <div className="absolute top-7 left-7 right-7 flex items-center justify-between gap-2 pointer-events-none">
                          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-200 bg-[#090B10]/80 backdrop-blur-md border border-amber-200/25">
                            {project.category}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold text-white bg-[#090B10]/80 backdrop-blur-md border border-white/15">
                            {project.year}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 sm:p-7 space-y-4">
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                          {project.title}
                        </h3>

                        <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">
                          {project.summary}
                        </p>

                        {project.impact && (
                          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-2.5">
                            <Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                            <p className="text-xs sm:text-[13.5px] text-slate-300 leading-relaxed">
                              <strong className="text-amber-200 font-semibold">
                                Highlight:{" "}
                              </strong>
                              {project.impact}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-1">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.06] text-slate-200 border border-white/15"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Action Footer */}
                    <div className="px-6 sm:px-7 py-4 bg-black/35 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {project.demoUrl && project.demoUrl !== "#projects" && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-300 hover:text-amber-200 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                          </a>
                        )}

                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span>Source Code</span>
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setLightbox({
                            title: project.title,
                            images: imgs,
                            index: curImgIndex,
                          })
                        }
                        aria-label={`Perbesar foto ${project.title}`}
                        className="w-9 h-9 rounded-full bg-white/[0.07] border border-white/15 flex items-center justify-center text-slate-200 hover:text-amber-300 hover:border-amber-300/40 transition-all"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </SpaceBunker>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Project Photo Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-xl p-4 sm:p-8 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-[24px] overflow-hidden bg-[#090D16] border border-amber-200/25 shadow-[0_25px_80px_rgba(0,0,0,0.85)]"
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
                <div className="min-w-0">
                  <p className="font-display font-bold text-sm sm:text-base text-white truncate">
                    {lightbox.title}
                  </p>
                  <p className="text-xs font-mono text-amber-200/80">
                    Foto {lightbox.index + 1} / {lightbox.images.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-rose-500/25 text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative bg-black/60 flex items-center justify-center max-h-[75vh]">
                <img
                  src={lightbox.images[lightbox.index]}
                  alt={lightbox.title}
                  className="max-h-[75vh] w-auto object-contain"
                />

                {lightbox.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setLightbox((prev) => ({
                          ...prev,
                          index:
                            (prev.index - 1 + prev.images.length) %
                            prev.images.length,
                        }))
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#090B10]/85 hover:bg-amber-400 text-white hover:text-[#090B10] border border-white/20 flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setLightbox((prev) => ({
                          ...prev,
                          index: (prev.index + 1) % prev.images.length,
                        }))
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#090B10]/85 hover:bg-amber-400 text-white hover:text-[#090B10] border border-white/20 flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
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
        sectorCode="HANGAR CONTROL // ALL"
        title="Buka Seluruh Hangar Proyek"
      />
    </section>
  );
};

export default Projects;
