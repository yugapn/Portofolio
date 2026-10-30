import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Compass,
  UserCheck,
  FileTerminal,
  Database,
  Download,
} from "lucide-react";
import SpaceBunker from "./SpaceBunker";

const Hero = ({ identity, hero }) => {
  const roles = identity.typingRoles?.length
    ? identity.typingRoles
    : [identity.role];
  const [roleIdx, setRoleIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Smooth Typewriter Effect (matching friends' portfolio dynamic role subtitle)
  useEffect(() => {
    const currentWord = roles[roleIdx % roles.length];
    let timer;

    if (!isDeleting && typedText.length < currentWord.length) {
      timer = setTimeout(() => {
        setTypedText(currentWord.slice(0, typedText.length + 1));
      }, 75);
    } else if (!isDeleting && typedText.length === currentWord.length) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && typedText.length > 0) {
      timer = setTimeout(() => {
        setTypedText(currentWord.slice(0, typedText.length - 1));
      }, 40);
    } else {
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIdx, roles]);

  return (
    <section
      id="home"
      className="relative min-h-screen z-10 flex flex-col justify-between"
    >
      {/* Main Hero Grid Content (Floats over Gargantua Black Hole) */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 pb-16 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
        {/* Left Column: Badge, Single-Line Eclipse Headline, Typing Role, Bunker Briefing & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Smoked Glass Eyebrow Badge */}
          <span className="lumora-glass-strong inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-amber-200 mb-5">
            <span>{hero.badge}</span>
          </span>

          {/* Dynamic Typing Role Tag */}
          <p className="text-xs sm:text-sm font-semibold text-slate-200 mb-2 tracking-wide text-over-video">
            {identity.location} •{" "}
            <span className="text-amber-300 font-mono">
              {typedText}
              <span className="inline-block w-[2px] h-3.5 bg-amber-300 ml-0.5 align-middle animate-pulse" />
            </span>
          </p>

          {/* Unified White + Black Eclipse Animated Headline (Strictly Single Line) */}
          <h1 className="font-display font-extrabold text-[clamp(1.7rem,3.8vw,3.4rem)] leading-[1.1] tracking-tight mb-6 headline-black-aura">
            {hero.headlineLines?.map((line, i) => (
              <span
                key={i}
                className="block whitespace-nowrap text-eclipse-lumora"
              >
                {line}
              </span>
            ))}
            {hero.headlineHighlight && (
              <span className="block whitespace-nowrap text-eclipse-lumora mt-1">
                {hero.headlineHighlight}
              </span>
            )}
          </h1>

          {/* Hero Bio / Briefing Sealed Inside Compact Spacecraft Bunker */}
          <div className="w-full max-w-lg mb-8">
            <SpaceBunker
              sectorCode="BRIEFING // CREW-LOG"
              badge="PERKENALAN SINGKAT"
              title="Buka Sapaan & Profil Singkatku"
              icon={FileTerminal}
              compact
            >
              <div className="p-5 sm:p-6 text-left">
                <p className="text-sm sm:text-[15.5px] text-slate-200 leading-relaxed">
                  {hero.subHeadline}
                </p>
              </div>
            </SpaceBunker>
          </div>

          {/* Pill CTA Buttons (Explore Projects + Download CV + Contact Me) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <a
              href={hero.primaryCTA.href}
              className="btn-lumora-primary inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-sm sm:text-[15px] font-bold"
            >
              <span>{hero.primaryCTA.label}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {hero.cvCTA && (
              <a
                href={hero.cvCTA.href}
                download
                className="btn-lumora-secondary inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-full text-sm sm:text-[15px] font-semibold"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>{hero.cvCTA.label}</span>
              </a>
            )}

            <a
              href={hero.secondaryCTA.href}
              className="btn-lumora-secondary inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-full text-sm sm:text-[15px] font-semibold"
            >
              <Compass className="w-4 h-4 text-amber-300" />
              <span>{hero.secondaryCTA.label}</span>
            </a>
          </div>
        </motion.div>

        {/* Center Spacer so Gargantua's Event Horizon shines right in the center! */}
        <div className="hidden lg:block lg:col-span-1 pointer-events-none" />

        {/* Right Column: Floating Spacecraft Bunker Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex flex-col items-center lg:items-end gap-5 lg:mt-2 w-full"
        >
          {/* Floating Bobbing Airlock Bunker 1 (Profile & Character Bio) */}
          <div className="w-full max-w-[340px] animate-float-card">
            <SpaceBunker
              sectorCode="CREW BAY // ID-01"
              badge={identity.shortName}
              title={hero.floatingCard.title}
              subtitle="Kartu Identitas & Fokus Utama"
              icon={UserCheck}
            >
              <div className="p-6 text-left">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-amber-200/40 shadow-md shrink-0 bg-slate-900">
                    <img
                      src={hero.floatingCard.avatarUrl}
                      onError={(e) => {
                        if (
                          hero.floatingCard.fallbackAvatarUrl &&
                          e.currentTarget.src !== hero.floatingCard.fallbackAvatarUrl
                        ) {
                          e.currentTarget.src = hero.floatingCard.fallbackAvatarUrl;
                        }
                      }}
                      alt={identity.fullName}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-400/25 px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Creator
                    </span>
                    <h4 className="font-display font-bold text-[15px] text-white mt-0.5">
                      {identity.shortName}
                    </h4>
                  </div>
                </div>

                <h3 className="font-display font-bold text-[17px] text-white mb-1.5">
                  {hero.floatingCard.title}
                </h3>
                <p className="text-[13.5px] text-slate-300 leading-relaxed mb-4">
                  {hero.floatingCard.description}
                </p>
                <a
                  href={hero.floatingCard.linkHref}
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-amber-300 hover:text-amber-200 transition-colors"
                >
                  <span>{hero.floatingCard.linkLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </SpaceBunker>
          </div>

          {/* Floating Staggered Mini Pill */}
          <div className="lumora-glass-strong rounded-full px-4 py-2.5 inline-flex items-center gap-2.5 animate-float-delayed">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center text-[#090B10] shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-slate-100 pr-1">
              {hero.floatingCard.secondaryPill}
            </span>
          </div>
        </motion.div>

        {/* Bottom-Left Floating Stat Bunker */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 self-end mx-auto lg:mx-0 mt-2 lg:mt-4 w-full max-w-[420px]"
        >
          <SpaceBunker
            sectorCode="TELEMETRY // STATS"
            badge="REKAM JEJAK"
            title={hero.statHighlight.number}
            icon={Database}
            compact
          >
            <div className="p-5 flex items-center gap-4">
              <div className="shrink-0">
                <div className="font-display font-extrabold text-2xl text-white whitespace-nowrap">
                  {hero.statHighlight.number}
                </div>
                <div className="flex items-center mt-2">
                  {hero.statHighlight.badges.map((badge, idx) => (
                    <span
                      key={badge}
                      style={{ marginLeft: idx === 0 ? 0 : "-6px" }}
                      className="w-6 h-6 rounded-full border border-[#0A0D14] bg-gradient-to-br from-amber-200 via-amber-400 to-orange-500 flex items-center justify-center text-[8px] font-extrabold text-[#090B10] shadow-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed text-left">
                {hero.statHighlight.description}
              </p>
            </div>
          </SpaceBunker>
        </motion.div>
      </div>

      {/* Animated Mouse Scroll Cue */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 w-[26px] h-[42px] rounded-[14px] border-[1.5px] border-white/35 bg-black/30 backdrop-blur-sm z-10 hover:border-amber-300 transition-colors"
      >
        <span className="absolute left-1/2 -translate-x-1/2 w-1 h-2 rounded-full bg-amber-200 animate-scroll-cue" />
      </a>
    </section>
  );
};

export default Hero;
