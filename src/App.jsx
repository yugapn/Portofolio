import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import portfolioData from "./data/portfolioData";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import KineticMarquee from "./components/KineticMarquee";
import About from "./components/About";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Gallery from "./components/Gallery";
import Comments from "./components/Comments";
import Contact from "./components/Contact";

function App() {
  const {
    identity,
    hero,
    about,
    education,
    projects,
    certificates,
    gallery,
    comments,
    contact,
  } = portfolioData;

  const [isSolarSimulatorOpen, setIsSolarSimulatorOpen] = useState(false);

  // Keyboard shortcut ESC to exit simulator
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isSolarSimulatorOpen) {
        setIsSolarSimulatorOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSolarSimulatorOpen]);

  // Lock body scroll when playing simulator
  useEffect(() => {
    if (isSolarSimulatorOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSolarSimulatorOpen]);

  // Listen for message from simulator iframe
  useEffect(() => {
    const handleSimulatorMessage = (event) => {
      if (
        event.data?.type === "CLOSE_SOLAR_SIMULATOR" ||
        event.data === "CLOSE_SOLAR_SIMULATOR"
      ) {
        setIsSolarSimulatorOpen(false);
        const target = event.data?.target || "#projects";
        setTimeout(() => {
          const el = document.querySelector(target);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
      }
    };
    window.addEventListener("message", handleSimulatorMessage);
    return () => window.removeEventListener("message", handleSimulatorMessage);
  }, []);

  return (
    <div className="min-h-screen relative text-slate-100">
      {/* ===================================================================
          GLOBAL FULLSCREEN GARGANTUA BLACK HOLE LIVE VIDEO BACKGROUND
          Stays fixed & vivid behind all translucent glass & bunker sections!
         =================================================================== */}
      <video
        key={hero.videoUrl}
        className="fixed inset-0 w-screen h-screen object-cover object-center -z-20 pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={hero.videoUrl} type="video/mp4" />
      </video>

      {/* Subtle Cosmic Vignette so Gargantua shines bright while text stays sharp */}
      <div className="fixed inset-0 -z-10 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(5,6,10,0.12)_0%,rgba(5,6,10,0.52)_100%)]" />

      {/* Floating Smoked-Glass Navbar (Home | About | Education | Projects | Sertifikat | Gallery | Comments | Contact)
          DISEMBUNYIKAN SECARA TOTAL KETIKA SIMULATOR SEDANG DIMAINKAN */}
      {!isSolarSimulatorOpen && <Navbar identity={identity} />}

      {/* 1. Home / Hero Section */}
      <Hero identity={identity} hero={hero} />

      {/* Transparent Content Flow Over Gargantua */}
      <div className="relative z-10 bg-transparent">
        <KineticMarquee items={hero.marqueeItems} />

        <main className="relative z-10">
          {/* 2. About Me (Bio, Story Dialogue, Portrait Flip, Status Window & Tech Stack) */}
          <About about={about} identity={identity} />

          {/* 3. Education (Riwayat Pendidikan SD -> SMP -> SMK) */}
          <Education education={education} />

          {/* 4. Projects (Multi-Foto Showcase & Lightbox) */}
          <Projects
            projects={projects}
            onOpenSimulator={() => setIsSolarSimulatorOpen(true)}
          />

          {/* 5. Sertifikat (Interactive Certificate Vault & Lightbox) */}
          <Certificates certificates={certificates} identity={identity} />

          {/* 6. Gallery & Moments (Cinematic Photo Moments & Lightbox) */}
          <Gallery gallery={gallery} />

          {/* 7. Comments (Visitor Notice Board + 7 Rules Modal) */}
          <Comments comments={comments} identity={identity} />
        </main>

        {/* 8. Contact & Footer */}
        <Contact identity={identity} contact={contact} />
      </div>

      {/* =========================================================================
          FULLSCREEN 3D SIMULATOR: ZERO CLUTTER — HANYA TOMBOL KEMBALI KE DASHBOARD
          Tidak ada navbar portofolio, tidak ada tombol dropdown tambahan.
         ========================================================================= */}
      <AnimatePresence>
        {isSolarSimulatorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 w-screen h-screen z-[99999] bg-[#02040A] overflow-hidden select-none"
          >
            {/* SATU-SATUNYA TAMPILAN KONTROL: TOMBOL KEMBALI KE DASHBOARD */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 pointer-events-auto">
              <button
                type="button"
                onClick={() => setIsSolarSimulatorOpen(false)}
                className="group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-[#080D1A]/90 hover:bg-amber-400 border border-amber-400/70 hover:border-amber-300 text-amber-200 hover:text-slate-950 font-display font-black text-xs sm:text-sm tracking-wider shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_12px_45px_rgba(245,158,11,0.7)] backdrop-blur-2xl transition-all cursor-pointer"
                title="Kembali ke Dashboard Portofolio (ESC)"
              >
                <ArrowLeft className="w-4 h-4 text-amber-300 group-hover:text-slate-950 transition-colors shrink-0 stroke-[2.5]" />
                <span className="whitespace-nowrap uppercase">Kembali ke Dashboard</span>
              </button>
            </div>

            {/* FULLSCREEN GAME 3D (100% LAYAR PENUH BEBAS DISTRAKSI) */}
            <iframe
              src="/solar-odyssey/index.html"
              title="Solar Odyssey — Simulator 3D Interaktif Tata Surya"
              className="w-full h-full border-0 block"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
