import React from "react";
import { Sparkles } from "lucide-react";

const KineticMarquee = ({ items = [] }) => {
  if (!items.length) return null;

  const doubled = [...items, ...items, ...items];

  return (
    <div className="px-5 sm:px-8 lg:px-12 py-4">
      <div className="max-w-[1280px] mx-auto overflow-hidden py-3.5 rounded-full lumora-glass">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {doubled.map((text, idx) => (
            <div
              key={idx}
              className="flex items-center gap-6 px-6 text-xs sm:text-sm font-display font-semibold text-slate-200 tracking-wide whitespace-nowrap"
            >
              <span>{text}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KineticMarquee;
