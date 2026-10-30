import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Scan, KeyRound } from "lucide-react";
import SecurityPasswordModal from "./SecurityPasswordModal";

/**
 * SpaceBunker — Interactive Spacecraft / Sci-Fi Lab Airlock Blast Door Component
 * Inspired by Among Us / Super Sus Lab Doors & Interstellar Spacecraft Airlocks.
 *
 * - Default state: Twin heavy metallic blast doors are SEALED shut.
 * - 1-Click / Unlock attempt: Prompts for authorization passcode ("BANDUNG").
 * - Password verified: Twin blast doors slide wide apart horizontally, revealing the chamber content.
 * - 1-Click to close: Re-seals the blast doors and arms the security lock.
 */
const SpaceBunker = ({
  sectorCode = "AIRLOCK // 01",
  title,
  subtitle,
  badge,
  icon: Icon,
  compact = false,
  defaultOpen = false,
  overrideSignal = null,
  className = "",
  children,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isHovered, setIsHovered] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (overrideSignal && overrideSignal.tick > 0) {
      setIsOpen(overrideSignal.open);
    }
  }, [overrideSignal]);

  const handleToggleDoor = () => {
    if (isOpen) {
      // Re-seal the blast doors
      setIsOpen(false);
    } else {
      // Require password "BANDUNG" before unlocking
      setShowAuthModal(true);
    }
  };

  const closedMinHeight = compact ? 176 : 216;

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative rounded-[24px] overflow-hidden border transition-colors duration-300 backdrop-blur-2xl ${
          isOpen
            ? "bg-[#090D16]/80 border-emerald-400/35 shadow-[0_20px_60px_rgba(0,0,0,0.72),0_0_28px_rgba(16,185,129,0.08)]"
            : isHovered
            ? "bg-[#0B101B]/85 border-amber-400/55 shadow-[0_20px_50px_rgba(0,0,0,0.75),0_0_30px_rgba(245,158,11,0.16)]"
            : "bg-[#0B0F19]/80 border-slate-600/45 shadow-[0_14px_40px_rgba(0,0,0,0.6)]"
        } ${className}`}
      >
        {/* 4 Industrial Spacecraft Corner Rivets */}
        <span className="pointer-events-none absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-slate-500/60 z-40" />
        <span className="pointer-events-none absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-slate-500/60 z-40" />
        <span className="pointer-events-none absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-slate-500/60 z-40" />
        <span className="pointer-events-none absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-slate-500/60 z-40" />

        {/* =====================================================================
            TOP BULKHEAD TELEMETRY HEADER BAR
           ===================================================================== */}
        <div
          onClick={handleToggleDoor}
          title={
            isOpen
              ? "Klik untuk menutup pintu bunker"
              : "Klik untuk membuka kunci pintu (membutuhkan password BANDUNG)"
          }
          className="relative z-40 flex items-center justify-between gap-2 px-4 sm:px-5 py-2.5 bg-[#070A11]/95 border-b border-slate-700/60 cursor-pointer select-none"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isOpen
                  ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                  : isHovered
                  ? "bg-amber-300 animate-ping"
                  : "bg-amber-400"
              }`}
            />
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-slate-300 truncate">
              {sectorCode}
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Mini Hazard Strip */}
            <div className="hidden sm:block w-10 h-2 rounded-sm bunker-hazard-strip opacity-75" />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleDoor();
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider border transition-all ${
                isOpen
                  ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/35 hover:bg-rose-500/20 hover:text-rose-200 hover:border-rose-400/40"
                  : "bg-amber-400/15 text-amber-200 border-amber-300/35 hover:bg-amber-400/25"
              }`}
            >
              {isOpen ? (
                <>
                  <Unlock className="w-3 h-3" />
                  <span>TUTUP PINTU</span>
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3" />
                  <span>TERKUNCI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* =====================================================================
            CHAMBER BODY + TWIN SLIDING BLAST DOORS
           ===================================================================== */}
        <div className="relative overflow-hidden">
          {/* LAYER 1: Interior Illuminated Spacecraft Lab Bay */}
          <motion.div
            initial={false}
            animate={{
              height: isOpen ? "auto" : closedMinHeight,
            }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden bunker-interior-grid"
          >
            {/* Top Interior Cabin Light Glow when Open */}
            <div
              className={`pointer-events-none absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-sky-400/10 to-transparent transition-opacity duration-500 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            />

            <div
              className={`transition-opacity duration-500 ${
                isOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none select-none"
              }`}
            >
              {children}
            </div>
          </motion.div>

          {/* LAYER 2: TWIN INTERLOCKING LAB BLAST DOORS (Slides Left & Right!) */}
          <div
            onClick={() => {
              if (!isOpen) setShowAuthModal(true);
            }}
            className={`absolute inset-0 z-30 flex items-center justify-center ${
              isOpen
                ? "pointer-events-none"
                : "pointer-events-auto cursor-pointer"
            }`}
          >
            {/* Center Photon Seam Light Leak on Hover */}
            <div
              className={`pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-r from-transparent via-amber-300/75 to-transparent blur-sm transition-opacity duration-300 ${
                !isOpen && isHovered ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* LEFT ARMORED BLAST DOOR */}
            <motion.div
              initial={false}
              animate={{
                x: isOpen ? "-104%" : isHovered ? "-5px" : "0%",
              }}
              transition={{
                duration: isOpen ? 0.68 : 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute top-0 bottom-0 left-0 w-1/2 bunker-metal-left border-r border-amber-400/40 flex flex-col justify-between overflow-hidden"
            >
              {/* Mechanical Hydraulic Clamp Teeth on Right Seam */}
              <div className="absolute right-0 top-1/4 w-2 h-8 bg-slate-700/80 border-l border-y border-slate-500/50 rounded-l" />
              <div className="absolute right-0 bottom-1/4 w-2 h-8 bg-slate-700/80 border-l border-y border-slate-500/50 rounded-l" />

              {/* Subtle Side Panel Stencil */}
              <div className="p-3 text-left opacity-30 font-mono text-[9px] tracking-widest text-slate-400">
                HATCH-L // SEAL
              </div>

              {/* Bottom Caution Strip */}
              <div className="h-1.5 w-full bunker-hazard-strip opacity-70" />
            </motion.div>

            {/* RIGHT ARMORED BLAST DOOR */}
            <motion.div
              initial={false}
              animate={{
                x: isOpen ? "104%" : isHovered ? "5px" : "0%",
              }}
              transition={{
                duration: isOpen ? 0.68 : 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute top-0 bottom-0 right-0 w-1/2 bunker-metal-right border-l border-amber-400/40 flex flex-col justify-between overflow-hidden"
            >
              {/* Mechanical Hydraulic Clamp Teeth on Left Seam */}
              <div className="absolute left-0 top-1/4 w-2 h-8 bg-slate-700/80 border-r border-y border-slate-500/50 rounded-r" />
              <div className="absolute left-0 bottom-1/4 w-2 h-8 bg-slate-700/80 border-r border-y border-slate-500/50 rounded-r" />

              {/* Subtle Side Panel Stencil */}
              <div className="p-3 text-right opacity-30 font-mono text-[9px] tracking-widest text-slate-400">
                SEAL // HATCH-R
              </div>

              {/* Bottom Caution Strip */}
              <div className="h-1.5 w-full bunker-hazard-strip opacity-70" />
            </motion.div>

            {/* CENTRAL MAGNETIC LOCK CORE & BUNKER FACEPLATE LABEL */}
            <motion.div
              initial={false}
              animate={{
                opacity: isOpen ? 0 : 1,
                scale: isOpen ? 0.82 : 1,
              }}
              transition={{ duration: 0.24 }}
              className="relative z-10 px-4 py-3 max-w-[92%] flex flex-col items-center text-center"
            >
              {/* Central Octagonal/Circular Sci-Fi Airlock Wheel */}
              <div
                className={`mb-2.5 flex items-center justify-center rounded-2xl border transition-all duration-500 ${
                  compact ? "w-9 h-9" : "w-11 h-11"
                } ${
                  isHovered
                    ? "rotate-45 bg-amber-400/20 border-amber-300 text-amber-200 shadow-[0_0_22px_rgba(251,191,36,0.45)]"
                    : "rotate-0 bg-[#0B0F19]/95 border-slate-500/60 text-amber-300 shadow-[0_6px_18px_rgba(0,0,0,0.8)]"
                }`}
              >
                <span
                  className={`transition-transform duration-500 ${
                    isHovered ? "-rotate-45" : "rotate-0"
                  }`}
                >
                  {Icon ? (
                    <Icon className={compact ? "w-4 h-4" : "w-5 h-5"} />
                  ) : (
                    <Scan className={compact ? "w-4 h-4" : "w-5 h-5"} />
                  )}
                </span>
              </div>

              {/* Faceplate Plaque */}
              <div className="px-4 py-2 rounded-xl bg-[#070A11]/90 border border-slate-600/60 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.75)]">
                {badge && (
                  <span className="inline-block font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-300 mb-0.5">
                    {badge}
                  </span>
                )}
                <h3
                  className={`font-display font-bold text-white leading-snug ${
                    compact ? "text-sm sm:text-base" : "text-base sm:text-lg"
                  }`}
                >
                  {title}
                </h3>
                {subtitle && !compact && (
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Interactive Keypad Prompt with Key Icon */}
              <span
                className={`mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  isHovered ? "text-amber-300 font-bold" : "text-slate-400"
                }`}
              >
                <KeyRound className="w-3 h-3 text-amber-300" />
                <span>
                  {isHovered ? "KLIK 1X — MASUKKAN SANDI" : "KLIK UNTUK BUKA KUNCI"}
                </span>
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Security Password Clearance Modal (Password: BANDUNG) */}
      <SecurityPasswordModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setIsOpen(true)}
        sectorCode={sectorCode}
        title={title}
      />
    </>
  );
};

export default SpaceBunker;
