"use client";

import React, { useEffect, useRef, useState } from "react";

interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  color: string;
  secondaryColor: string;
}

const PALETTE = [
  { primary: "#00f0ff", secondary: "#a855f7" },
  { primary: "#38bdf8", secondary: "#c084fc" },
  { primary: "#22d3ee", secondary: "#818cf8" },
];

const SPARK_COLORS = [
  "#ffffff", // White-hot core
  "#00f0ff", // Electric cyan
  "#38bdf8", // Sky blue
  "#c084fc", // Purple neon
  "#a855f7", // Deep violet
];

export default function ClickEffects() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Animation loop for sparks
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const sparks = sparksRef.current;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.95; // air drag
        s.vy *= 0.95;
        s.vy += 0.09; // subtle gravity
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (s.alpha > 0.5 ? 1 : s.alpha * 2), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (sparks.length > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        animFrameRef.current = null;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Don't trigger on secondary click
      if (e.button !== 0 && e.button !== undefined && e.pointerType === "mouse") {
        if (e.button !== 0) return;
      }

      const x = e.clientX;
      const y = e.clientY;
      const chosen = PALETTE[Math.floor(Math.random() * PALETTE.length)];

      // 1. Dual Shockwave Rings
      const rippleId = Date.now() + Math.random();
      setRipples((prev) => [
        ...prev.slice(-6),
        { id: rippleId, x, y, color: chosen.primary, secondaryColor: chosen.secondary },
      ]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId));
      }, 750);

      // 2. High-Velocity Micro Sparks with White-Hot Core
      const sparkCount = 12;
      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.7;
        const speed = 2.5 + Math.random() * 4.5;
        sparksRef.current.push({
          id: Math.random(),
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2 + 1.2,
          color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
          alpha: 1,
          decay: 0.02 + Math.random() * 0.02,
        });
      }

      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerdown", handlePointerDown);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* HTML Expanding Dual Ripple Waves */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[9995] overflow-hidden select-none"
      >
        {ripples.map((ripple) => (
          <React.Fragment key={ripple.id}>
            {/* Primary Ring */}
            <span
              className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 animate-ripple-burst"
              style={{
                left: `${ripple.x}px`,
                top: `${ripple.y}px`,
                borderColor: ripple.color,
                boxShadow: `0 0 16px ${ripple.color}, inset 0 0 10px ${ripple.color}`,
              }}
            />
            {/* Secondary Harmonic Echo Ring */}
            <span
              className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 animate-ripple-echo"
              style={{
                left: `${ripple.x}px`,
                top: `${ripple.y}px`,
                borderColor: ripple.secondaryColor,
                boxShadow: `0 0 20px ${ripple.secondaryColor}`,
              }}
            />
          </React.Fragment>
        ))}
      </div>

      {/* Canvas for High-Performance Physics Sparks */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[9996]"
      />
    </>
  );
}
