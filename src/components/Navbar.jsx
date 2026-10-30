import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const Navbar = ({ identity }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const sections = identity.navigation.map((item) =>
        item.href.replace("#", "")
      );
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 190) {
            setActiveSection(`#${sections[i]}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [identity.navigation]);

  return (
    <header className="fixed top-4 sm:top-5 left-0 right-0 z-50 px-4 flex flex-col items-center pointer-events-none">
      <div
        className={`pointer-events-auto w-full max-w-[1260px] flex items-center justify-between gap-2 rounded-[24px] backdrop-blur-2xl border transition-all duration-300 ${
          isScrolled
            ? "py-2.5 px-4 sm:px-5 bg-[#0A0D14]/80 border-amber-100/20 shadow-[0_16px_50px_rgba(0,0,0,0.65)]"
            : "py-3 px-4 sm:px-5 bg-[#0A0D14]/55 border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        }`}
      >
        {/* Brand Logo with Animated Photon Sparkle Star */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 font-display font-bold text-sm sm:text-base text-white shrink-0"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-amber-200 via-amber-400 to-orange-500 flex items-center justify-center shadow-[0_6px_20px_rgba(245,158,11,0.40)] group-hover:scale-105 transition-transform">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 text-[#090B10] transition-transform duration-500 group-hover:rotate-90"
            >
              <path
                d="M12 2L14.2 9.2L21 12L14.2 14.8L12 22L9.8 14.8L3 12L9.8 9.2L12 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="tracking-tight text-white whitespace-nowrap">
              {identity.shortName}
            </span>
            <span className="text-[10px] font-mono font-medium text-amber-200/75 uppercase tracking-wider">
              {identity.monogram} • PORTFOLIO
            </span>
          </div>
        </a>

        {/* Desktop Links (8 Menu Items: Home, About, Education, Projects, Sertifikat, Gallery, Comments, Contact) */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {identity.navigation.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-2.5 xl:px-3.5 py-2 rounded-2xl text-xs xl:text-[13.5px] font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-amber-200 font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="lumora-nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-2xl bg-white/10 border border-amber-200/25 shadow-sm -z-10"
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Status Indicator + CTA */}
        <div className="hidden xl:flex items-center gap-2.5 shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-[11px] font-medium text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="whitespace-nowrap">{identity.statusBadge}</span>
          </div>

          <a
            href="#contact"
            className="btn-lumora-primary inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap"
          >
            <span>Hire / Chat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Tablet & Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
          className="lg:hidden p-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile / Tablet Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-auto lg:hidden mt-2.5 w-full max-w-[1260px] p-4 rounded-[24px] lumora-glass-strong"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{identity.statusBadge}</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {identity.location}
              </span>
            </div>

            <nav className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {identity.navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-2xl text-sm font-medium text-center transition-colors ${
                    activeSection === item.href
                      ? "bg-white/15 text-amber-200 font-semibold border border-amber-200/20"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 pt-3 border-t border-white/10">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-lumora-primary w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full text-sm font-bold"
              >
                <span>Hubungi Saya</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
