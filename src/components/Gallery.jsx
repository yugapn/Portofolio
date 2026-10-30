import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize2,
  Unlock,
  Lock,
  X,
} from "lucide-react";
import SpaceBunker from "./SpaceBunker";
import SecurityPasswordModal from "./SecurityPasswordModal";

const Gallery = ({ gallery }) => {
  const moments = gallery.moments || [];
  const [activeIdx, setActiveIdx] = useState(0);
  const [overrideSignal, setOverrideSignal] = useState({ open: false, tick: 0 });
  const [masterAuthOpen, setMasterAuthOpen] = useState(false);
  const [useFallback, setUseFallback] = useState({});
  const [zoomMoment, setZoomMoment] = useState(null);

  const current = moments[activeIdx] || moments[0];

  const getSrc = (item) =>
    useFallback[item.id] && item.fallbackImage ? item.fallbackImage : item.image;

  const handleMasterToggle = () => {
    if (overrideSignal.open) {
      setOverrideSignal((prev) => ({ open: false, tick: prev.tick + 1 }));
    } else {
      setMasterAuthOpen(true);
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setZoomMoment(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!moments.length) return null;

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-28 px-5 sm:px-8 lg:px-12"
    >
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
            {gallery.sectionTag}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-[42px] leading-[1.12] text-white mt-4 mb-4 text-over-video">
            {gallery.title}
          </h2>
          <p className="text-[15.5px] sm:text-base text-slate-200 font-medium leading-relaxed text-over-video mb-6">
            {gallery.subtitle}
          </p>

          <button
            type="button"
            onClick={handleMasterToggle}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A0E17]/85 border border-amber-300/35 text-xs font-mono font-semibold text-amber-200 hover:bg-amber-400/20 transition-all shadow-lg"
          >
            {overrideSignal.open ? (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>MEDIA CONTROL: TUTUP GALERI MOMEN</span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5" />
                <span>MEDIA CONTROL: BUKA GALERI MOMEN</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Cinematic Gallery Showcase Sealed Inside SpaceBunker */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <SpaceBunker
            sectorCode="MEDIA BAY // GALLERY & MOMENTS"
            badge={`${moments.length} DOKUMENTASI MOMEN`}
            title="Tangkapan Lensa & Cerita Momen"
            subtitle="Coding • Kolaborasi Tim • Eksplorasi Kreatif"
            icon={Camera}
            overrideSignal={overrideSignal}
          >
            <div className="p-5 sm:p-8 lg:p-9 space-y-6">
              {/* Main Widescreen Moment Viewport */}
              <div className="relative rounded-[24px] overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.75)] min-h-[360px] sm:min-h-[450px] flex flex-col justify-end">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.id}
                    src={getSrc(current)}
                    alt={current.title}
                    onError={() =>
                      setUseFallback((prev) => ({ ...prev, [current.id]: true }))
                    }
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </AnimatePresence>

                {/* Deep Space Gradient Shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080F] via-[#06080F]/65 to-transparent" />

                {/* Top Right Fullscreen Button */}
                <button
                  type="button"
                  onClick={() => setZoomMoment(current)}
                  className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-[#090B10]/80 hover:bg-amber-400/25 border border-white/20 text-xs font-mono font-semibold text-amber-200 inline-flex items-center gap-1.5 backdrop-blur-md transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Perbesar Foto</span>
                </button>

                {/* Moment Caption & Controls */}
                <div className="relative z-10 p-6 sm:p-9 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <div className="max-w-2xl space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/35 font-mono font-bold text-amber-200">
                        {current.code} • {current.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-slate-300 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-amber-300" />
                        {current.location} ({current.date})
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                      {current.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-slate-200 leading-relaxed">
                      {current.description}
                    </p>
                  </div>

                  {/* Prev / Next Controls */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIdx(
                          (prev) => (prev - 1 + moments.length) % moments.length
                        )
                      }
                      aria-label="Momen sebelumnya"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-400 hover:text-[#090B10] border border-white/20 flex items-center justify-center text-white transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="font-mono text-xs sm:text-sm font-bold text-amber-200 px-2">
                      0{activeIdx + 1} / 0{moments.length}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIdx((prev) => (prev + 1) % moments.length)
                      }
                      aria-label="Momen berikutnya"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-400 hover:text-[#090B10] border border-white/20 flex items-center justify-center text-white transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Progress Indicator Line */}
                <div className="relative z-10 w-full h-1 bg-white/10">
                  <div
                    style={{
                      width: `${((activeIdx + 1) / moments.length) * 100}%`,
                    }}
                    className="h-full bg-gradient-to-r from-amber-300 via-amber-400 to-sky-400 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Thumbnail Cards Selector Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                {moments.map((item, idx) => {
                  const active = idx === activeIdx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`group relative rounded-2xl overflow-hidden border text-left transition-all ${
                        active
                          ? "border-amber-300 shadow-[0_10px_28px_rgba(245,158,11,0.28)] scale-[1.01]"
                          : "border-white/12 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <div className="h-24 sm:h-28 w-full relative overflow-hidden">
                        <img
                          src={getSrc(item)}
                          alt={item.title}
                          onError={() =>
                            setUseFallback((prev) => ({
                              ...prev,
                              [item.id]: true,
                            }))
                          }
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/35 to-transparent" />
                        <span className="absolute bottom-2 left-2.5 right-2.5 font-display font-bold text-xs text-white truncate">
                          {item.code}: {item.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </SpaceBunker>
        </motion.div>
      </div>

      {/* Fullscreen Moment Lightbox Modal */}
      <AnimatePresence>
        {zoomMoment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomMoment(null)}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-xl p-4 sm:p-8 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-[24px] overflow-hidden bg-[#090D16] border border-amber-200/30 shadow-[0_25px_80px_rgba(0,0,0,0.85)]"
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
                <div className="min-w-0">
                  <p className="font-display font-bold text-sm sm:text-base text-white truncate">
                    {zoomMoment.title}
                  </p>
                  <p className="text-xs font-mono text-amber-200/80">
                    {zoomMoment.code} • {zoomMoment.location} ({zoomMoment.date})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setZoomMoment(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-rose-500/25 text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 bg-black/60 flex items-center justify-center">
                <img
                  src={getSrc(zoomMoment)}
                  alt={zoomMoment.title}
                  className="max-h-[75vh] w-auto object-contain rounded-xl"
                />
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
        sectorCode="MEDIA CONTROL // ALL"
        title="Buka Seluruh Galeri Momen"
      />
    </section>
  );
};

export default Gallery;

