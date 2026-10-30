import React, { useEffect, useRef } from "react";

/**
 * 3D Fibonacci Particle Sphere + 3 Concentric Counter-Rotating Orbiting Rings
 * Tuned for Interstellar Gargantua Deep-Space Cosmic Palette
 */
const OrbitGlobe = ({ orbitRings }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 220;
    let h = 220;
    let radius = 90;
    let animId;

    const N = 220;
    const points = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      points.push({
        x0: Math.cos(theta) * r,
        y0: y,
        z0: Math.sin(theta) * r,
      });
    }

    const resize = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width || 200;
      h = rect.height || 200;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = Math.min(w, h) * 0.43;
    };

    resize();
    window.addEventListener("resize", resize);

    let angle = 0;
    const draw = () => {
      angle += 0.0045;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const projected = points
        .map((p) => {
          const x = p.x0 * cosA - p.z0 * sinA;
          const z = p.x0 * sinA + p.z0 * cosA;
          const y = p.y0;
          const scale = (z + 2) / 3;
          return {
            x: cx + x * radius,
            y: cy + y * radius,
            z,
            scale,
          };
        })
        .sort((a, b) => a.z - b.z);

      projected.forEach((p, idx) => {
        const size = Math.max(0.7, 2.2 * p.scale);
        const alpha = (0.3 + p.scale * 0.65).toFixed(2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        // Photon Gold & Starlight Ice particles
        ctx.fillStyle =
          idx % 3 === 0
            ? `rgba(56, 189, 248, ${alpha})`
            : `rgba(251, 191, 36, ${alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const buildRingNodes = (items = [], totalSlots = 6) => {
    if (!items.length) return [];
    const result = [];
    for (let i = 0; i < totalSlots; i++) {
      const item = items[i % items.length];
      const angle = (360 / totalSlots) * i;
      result.push({ ...item, angle });
    }
    return result;
  };

  const ring1Nodes = buildRingNodes(orbitRings?.ring1, 6);
  const ring2Nodes = buildRingNodes(orbitRings?.ring2, 6);
  const ring3Nodes = buildRingNodes(orbitRings?.ring3, 8);

  return (
    <div className="relative w-full h-[240px] sm:h-[360px] mb-16 flex items-end justify-center overflow-hidden border-b border-amber-200/20 rounded-b-3xl">
      {/* Subtle Photon Horizon Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-tr from-amber-500/25 via-orange-400/20 to-sky-400/20 blur-3xl" />

      {/* Center Rotating 3D Fibonacci Particle Sphere */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[140px] h-[140px] sm:w-[210px] sm:h-[210px] z-[2] pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Ring 1 (Inner — Clockwise 18s) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[180px] h-[180px] sm:w-[270px] sm:h-[270px] rounded-full border border-amber-100/20">
        {ring1Nodes.map((node, i) => (
          <div
            key={`r1-${i}`}
            className="orbit-arm-cw"
            style={{ "--start-angle": `${node.angle}deg`, "--dur": "18s" }}
          >
            <div
              title={node.name}
              style={{ "--start-angle": `${node.angle}deg`, "--dur": "18s" }}
              className="orbit-bubble-cw absolute top-0 left-1/2 -translate-x-1/2 -mt-[18px] sm:-mt-[24px] w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 backdrop-blur-xl border border-amber-200/30 flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
            >
              <img
                src={node.icon}
                alt={node.name}
                className="w-4 h-4 sm:w-[22px] sm:h-[22px] object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Ring 2 (Middle — Counter-Clockwise 24s) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[250px] h-[250px] sm:w-[380px] sm:h-[380px] rounded-full border border-white/15">
        {ring2Nodes.map((node, i) => (
          <div
            key={`r2-${i}`}
            className="orbit-arm-ccw"
            style={{ "--start-angle": `${node.angle}deg`, "--dur": "24s" }}
          >
            <div
              title={node.name}
              style={{ "--start-angle": `${node.angle}deg`, "--dur": "24s" }}
              className="orbit-bubble-ccw absolute top-0 left-1/2 -translate-x-1/2 -mt-[18px] sm:-mt-[24px] w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/25 flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
            >
              <img
                src={node.icon}
                alt={node.name}
                className="w-4 h-4 sm:w-[22px] sm:h-[22px] object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Ring 3 (Outer — Clockwise 32s) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[320px] h-[320px] sm:w-[490px] sm:h-[490px] rounded-full border border-white/15">
        {ring3Nodes.map((node, i) => (
          <div
            key={`r3-${i}`}
            className="orbit-arm-cw"
            style={{ "--start-angle": `${node.angle}deg`, "--dur": "32s" }}
          >
            <div
              title={node.name}
              style={{ "--start-angle": `${node.angle}deg`, "--dur": "32s" }}
              className="orbit-bubble-cw absolute top-0 left-1/2 -translate-x-1/2 -mt-[18px] sm:-mt-[24px] w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/25 flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
            >
              <img
                src={node.icon}
                alt={node.name}
                className="w-4 h-4 sm:w-[22px] sm:h-[22px] object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrbitGlobe;