"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseAlpha: number;
  isForeground: boolean;
}

const FG_COLORS = [
  "rgba(0, 240, 255, ",
  "rgba(56, 189, 248, ",
  "rgba(168, 85, 247, ",
  "rgba(192, 132, 252, ",
];

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const mouse = { x: -1000, y: -1000, radius: 170 };
    let animationFrameId: number;
    let isVisible = true;

    // Responsive resize handler
    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);

    // Pause canvas when out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible && !animationFrameId) {
          loop();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Particle pool with 3D Depth layers
    let particles: Particle[] = [];
    const initParticles = () => {
      const count = Math.min(Math.floor((width * height) / 14000), 65);
      particles = [];
      for (let i = 0; i < count; i++) {
        const isFg = i % 2 === 0;
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * (isFg ? 0.7 : 0.35),
          vy: (Math.random() - 0.5) * (isFg ? 0.7 : 0.35),
          radius: isFg ? Math.random() * 1.8 + 1.2 : Math.random() * 0.9 + 0.6,
          color: FG_COLORS[Math.floor(Math.random() * FG_COLORS.length)],
          baseAlpha: isFg ? Math.random() * 0.4 + 0.45 : Math.random() * 0.25 + 0.15,
          isForeground: isFg,
        });
      }
    };

    initParticles();

    // Render loop
    const loop = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      // 1. Inter-particle Constellation Connections
      const maxConnectDist = 115;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (!p1.isForeground) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (!p2.isForeground) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.22;
            ctx.save();
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // 2. Update and draw individual particles + mouse magnetic lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Mouse interaction (Smooth magnetic push/pull)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && p.isForeground) {
          const force = (1 - dist / mouse.radius) * 2.2;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;

          // Connect laser line to mouse
          const lineAlpha = (1 - dist / mouse.radius) * 0.45;
          ctx.save();
          ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
          ctx.shadowColor = "#00f0ff";
          ctx.shadowBlur = 8;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.restore();
        }

        // Draw particle dot with glow
        ctx.save();
        ctx.fillStyle = `${p.color}${p.baseAlpha})`;
        if (p.isForeground) {
          ctx.shadowColor = "#00f0ff";
          ctx.shadowBlur = 8;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-auto overflow-hidden z-0"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
