import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Linkedin,
  Github,
  Instagram,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  ArrowUp,
  Download,
  Sparkles,
  Radio,
} from "lucide-react";
import SpaceBunker from "./SpaceBunker";

const Contact = ({ identity, contact }) => {
  const whatsappUrl = `https://wa.me/${
    contact.directChannels.whatsappNumber
  }?text=${encodeURIComponent(contact.directChannels.whatsappDefaultMessage)}`;

  const channels = [
    {
      label: "WhatsApp Instant Chat",
      value: contact.directChannels.whatsappDisplay,
      href: whatsappUrl,
      external: true,
      icon: MessageSquare,
      accent: "#34D399",
      bgTint: "from-emerald-500/20 to-teal-500/10",
    },
    {
      label: "Electronic Mail",
      value: contact.directChannels.email,
      href: `mailto:${contact.directChannels.email}`,
      external: false,
      icon: Mail,
      accent: "#FBBF24",
      bgTint: "from-amber-400/20 to-orange-500/10",
    },
    {
      label: "Instagram",
      value: contact.directChannels.instagramHandle || "@yugaputranugraha",
      href: contact.directChannels.instagramUrl || "#contact",
      external: true,
      icon: Instagram,
      accent: "#F472B6",
      bgTint: "from-pink-500/20 to-rose-500/10",
    },
    {
      label: "LinkedIn Network",
      value: contact.directChannels.linkedinHandle,
      href: contact.directChannels.linkedinUrl,
      external: true,
      icon: Linkedin,
      accent: "#38BDF8",
      bgTint: "from-sky-400/20 to-blue-500/10",
    },
    {
      label: "GitHub Repositories",
      value: contact.directChannels.githubHandle,
      href: contact.directChannels.githubUrl,
      external: true,
      icon: Github,
      accent: "#F8FAFC",
      bgTint: "from-slate-400/20 to-slate-600/10",
    },
    {
      label: "Headquarters / Lokasi",
      value: contact.directChannels.location || identity?.location || "Bandung, Indonesia",
      href: "#contact",
      external: false,
      icon: MapPin,
      accent: "#FBBF24",
      bgTint: "from-amber-400/20 to-sky-500/10",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative pt-24 pb-12 px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Ambient Photon Horizon Glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.18),rgba(56,189,248,0.10)_45%,transparent_75%)] blur-[65px] animate-blob-drift" />

      <div className="max-w-[1140px] mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="lumora-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-amber-200 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            {contact.sectionTag} • {contact.responseSLA}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-[42px] leading-[1.1] text-white mb-4 text-over-video">
            {contact.title}
          </h2>
          <p className="text-[15.5px] sm:text-base text-slate-200 font-medium leading-relaxed text-over-video">
            {contact.subtitle}
          </p>
        </motion.div>

        {/* Communications Airlock Bunker */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SpaceBunker
            sectorCode="COMM-AIRLOCK // HEADQUARTERS"
            badge="TRANSMISI LANGSUNG"
            title="Buka Terminal Kontak & Sosial Media"
            subtitle="WhatsApp • Email • Instagram • LinkedIn • GitHub"
            icon={Radio}
          >
            <div className="p-7 sm:p-10 lg:p-12 text-center">
              {/* Direct Channels 3x2 Interactive Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 text-left max-w-5xl mx-auto mb-9">
                {channels.map((ch, idx) => {
                  const Icon = ch.icon;
                  return (
                    <a
                      key={idx}
                      href={ch.href}
                      target={ch.external ? "_blank" : undefined}
                      rel={ch.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between p-4 sm:p-5 rounded-[22px] bg-white/[0.05] hover:bg-white/[0.10] border border-white/12 hover:border-amber-300/35 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${ch.bgTint} border border-white/15 flex items-center justify-center shrink-0`}
                        >
                          <Icon
                            className="w-5 h-5"
                            style={{ color: ch.accent }}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-400">
                            {ch.label}
                          </p>
                          <p className="font-display font-bold text-sm text-white truncate mt-0.5 group-hover:text-amber-200 transition-colors">
                            {ch.value}
                          </p>
                        </div>
                      </div>

                      {ch.href !== "#contact" && (
                        <div className="w-8 h-8 rounded-full bg-white/[0.07] border border-white/15 flex items-center justify-center text-slate-300 group-hover:translate-x-0.5 group-hover:text-amber-300 group-hover:border-amber-300/40 transition-all shrink-0 ml-2">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      )}
                    </a>
                  );
                })}
              </div>

              {/* Primary Instant Action Pills */}
              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lumora-primary inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-sm sm:text-base font-bold"
                >
                  <span>Mulai Diskusi via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {identity?.cvUrl && (
                  <a
                    href={identity.cvUrl}
                    download
                    className="btn-lumora-secondary inline-flex items-center gap-2 px-6 py-4 rounded-full text-sm sm:text-base font-semibold"
                  >
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>Unduh CV</span>
                  </a>
                )}
              </div>
            </div>
          </SpaceBunker>
        </motion.div>

        {/* Closing Personal Brand Block & Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-white/15 space-y-6">
          {contact.footer.closingQuote && (
            <div className="max-w-xl mx-auto text-center space-y-1.5">
              <p className="font-display font-bold text-base text-white">
                {contact.footer.copyrightName}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {contact.footer.closingQuote}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] text-slate-300">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="font-display font-bold text-white">
                © {new Date().getFullYear()} {contact.footer.copyrightName}.
              </span>
              <span className="text-slate-400">Semua hak dilindungi.</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-amber-200/80">
                END OF CHAPTER
              </span>

              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full lumora-glass hover:border-amber-300/40 text-xs font-semibold text-amber-200 transition-all"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Ke Atas</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
