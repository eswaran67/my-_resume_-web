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
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  color: string;
}

const COLORS = ["#00f0ff", "#38bdf8", "#a855f7", "#c084fc", "#34d399"];

export default function ClickEffects() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Only run on client with fine pointer or touch
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
        s.vy += 0.08; // subtle gravity
        s.alpha -= 0.025; // fade out

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
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
      // Don't trigger if right-click
      if (e.button !== 0 && e.button !== undefined && e.pointerType === "mouse") {
        if (e.button !== 0) return;
      }

      const x = e.clientX;
      const y = e.clientY;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      // 1. Create expanding neon ripple
      const rippleId = Date.now() + Math.random();
      setRipples((prev) => [...prev.slice(-8), { id: rippleId, x, y, color }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId));
      }, 700);

      // 2. Create burst of micro-sparks
      const sparkCount = 6;
      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.8;
        const speed = 2 + Math.random() * 3.5;
        sparksRef.current.push({
          id: Math.random(),
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.5 + Math.random() * 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 1,
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
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <>
      {/* Canvas for micro-sparks burst */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        aria-hidden="true"
      />

      {/* DOM Ripples */}
      <div className="fixed inset-0 pointer-events-none z-[9997] overflow-hidden" aria-hidden="true">
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full pointer-events-none animate-ripple-burst -translate-x-1/2 -translate-y-1/2"
            style={{
              left: r.x,
              top: r.y,
              borderColor: r.color,
              boxShadow: `0 0 20px ${r.color}, inset 0 0 15px ${r.color}`,
            }}
          />
        ))}
      </div>
    </>
  );
}
