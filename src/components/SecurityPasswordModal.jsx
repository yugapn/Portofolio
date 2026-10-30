import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Unlock,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
} from "lucide-react";

/**
 * SecurityPasswordModal — Futuristic Deep-Space Security Clearance Keypad Modal
 * Inspired by Spacecraft Airlocks & Lab Bulkhead Terminals.
 * Password: "BANDUNG" (case-insensitive).
 */
const SecurityPasswordModal = ({
  isOpen,
  onClose,
  onSuccess,
  sectorCode = "AIRLOCK // 01",
  title = "Pintu Bunker",
}) => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setPasscode("");
      setError(false);
      setSuccess(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (success) return;

    const cleaned = passcode.trim().toUpperCase();
    if (cleaned === "BANDUNG") {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        onSuccess?.();
        onClose?.();
      }, 550);
    } else {
      setError(true);
      setSuccess(false);
      // Auto-clear input on error
      setTimeout(() => {
        setPasscode("");
        inputRef.current?.focus();
      }, 800);
    }
  };

  const fillHint = () => {
    setPasscode("BANDUNG");
    setError(false);
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              x: error ? [-10, 10, -8, 8, -4, 4, 0] : 0,
            }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{
              duration: 0.28,
              x: { duration: 0.4 },
            }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-md rounded-[26px] bg-[#0A0E18]/95 p-6 sm:p-7 shadow-[0_25px_80px_rgba(0,0,0,0.9)] border transition-colors duration-300 ${
              success
                ? "border-emerald-400/80 shadow-[0_0_50px_rgba(16,185,129,0.35)]"
                : error
                ? "border-rose-500/80 shadow-[0_0_50px_rgba(244,63,94,0.35)]"
                : "border-amber-300/40 shadow-[0_0_40px_rgba(245,158,11,0.18)]"
            }`}
          >
            {/* 4 Industrial Spacecraft Corner Rivets */}
            <span className="pointer-events-none absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-slate-500/70" />
            <span className="pointer-events-none absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-slate-500/70" />
            <span className="pointer-events-none absolute bottom-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-slate-500/70" />
            <span className="pointer-events-none absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-slate-500/70" />

            {/* Top Bulkhead Caution Strip */}
            <div className="h-1.5 w-full bunker-hazard-strip rounded-full mb-4 opacity-80" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup Otorisasi"
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-rose-500/25 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Terminal Security Icon */}
            <div className="flex flex-col items-center text-center mb-5">
              <div
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 mb-3 shadow-lg ${
                  success
                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                    : error
                    ? "bg-rose-500/20 border-rose-400 text-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.5)]"
                    : "bg-amber-400/15 border-amber-300/50 text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.25)]"
                }`}
              >
                {success ? (
                  <Unlock className="w-7 h-7" />
                ) : (
                  <Lock className="w-7 h-7 animate-pulse" />
                )}
              </div>

              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-amber-300/90">
                {sectorCode}
              </span>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mt-1">
                OTORISASI AKSES PINTU LAB
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-sm leading-relaxed">
                Masukkan kode sandi otorisasi untuk membuka pintu bunker{" "}
                <span className="text-amber-200 font-semibold">"{title}"</span>.
              </p>
            </div>

            {/* Passcode Entry Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <div
                  className={`flex items-center rounded-2xl bg-black/60 border px-3.5 py-2.5 transition-all ${
                    success
                      ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                      : error
                      ? "border-rose-400 bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                      : "border-amber-300/40 focus-within:border-amber-300 focus-within:shadow-[0_0_22px_rgba(251,191,36,0.3)]"
                  }`}
                >
                  <KeyRound className="w-5 h-5 text-amber-300 shrink-0 mr-2" />
                  <input
                    ref={inputRef}
                    type="text"
                    required
                    maxLength={16}
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setError(false);
                    }}
                    placeholder="MASUKKAN KODE..."
                    className="w-full font-mono font-bold tracking-[0.25em] text-center text-lg text-white uppercase placeholder:text-slate-600 placeholder:tracking-normal placeholder:font-sans bg-transparent outline-none"
                  />
                </div>

                {/* Status Feedback Messages */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-rose-300 pt-1"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>AKSES DITOLAK: KODE SANDI SALAH!</span>
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-emerald-300 pt-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>AKSES DITERIMA // MEMBUKA PINTU...</span>
                  </motion.div>
                )}
              </div>

              {/* Password Hint / Shortcut Pill */}
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-slate-400 font-mono">
                  Petunjuk: Nama Kota Domisili
                </span>
                <button
                  type="button"
                  onClick={fillHint}
                  className="px-2.5 py-0.5 rounded-full bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/35 text-amber-200 font-mono font-bold transition-colors inline-flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>KODE: BANDUNG</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-lumora-secondary w-full py-3 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={!passcode.trim() || success}
                  className="btn-lumora-primary disabled:opacity-40 w-full py-3 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-lg"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Buka Pintu</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SecurityPasswordModal;

