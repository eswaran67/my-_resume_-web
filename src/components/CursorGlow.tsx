"use client";

import React, { useEffect, useState, useRef } from "react";

interface StarParticle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  color: string;
}

const TRAIL_COLORS = ["#00f0ff", "#38bdf8", "#c084fc", "#a855f7"];

export default function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mousePos = useRef({ x: -200, y: -200 });
  const prevMousePos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const dotPos = useRef({ x: -200, y: -200 });
  const auraPos = useRef({ x: -200, y: -200 });

  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<StarParticle[]>([]);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(pointer: fine)");
    if (!media.matches) return;
    setIsPointerDevice(true);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check distance moved to spawn stardust
      const dx = mousePos.current.x - prevMousePos.current.x;
      const dy = mousePos.current.y - prevMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 8 && particlesRef.current.length < 35) {
        particlesRef.current.push({
          x: mousePos.current.x + (Math.random() - 0.5) * 4,
          y: mousePos.current.y + (Math.random() - 0.5) * 4,
          size: Math.random() * 2 + 1,
          alpha: 0.8,
          color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)],
        });
        prevMousePos.current.x = mousePos.current.x;
        prevMousePos.current.y = mousePos.current.y;
      }

      // Check if target is clickable
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest(
          "button, a, input, textarea, select, [role='button'], .cursor-pointer, .glass-panel-hover, .card-shine, .btn-click"
        );
        setIsHoveringClickable(isClickable);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let frameId: number;
    const animate = () => {
      // 1. Fast smooth lerp for center laser dot
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.45;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.45;

      // 2. Spring-damped smooth lerp for outer reticle ring
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      // 3. Floating ambient spotlight
      auraPos.current.x += (mousePos.current.x - auraPos.current.x) * 0.08;
      auraPos.current.y += (mousePos.current.y - auraPos.current.y) * 0.08;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${auraPos.current.x}px, ${auraPos.current.y}px, 0)`;
      }

      // 4. Render stardust particles
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const particles = particlesRef.current;
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.alpha -= 0.035;
          p.size *= 0.96;

          if (p.alpha <= 0 || p.size <= 0.2) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(frameId);
    };
  }, [isVisible]);

  if (!mounted || !isPointerDevice) return null;

  return (
    <>
      {/* Canvas for Smooth Micro-Stardust Trail */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[9990]"
      />

      {/* 1. Large Ambient Cyber Spotlight Follower */}
      <div
        ref={auraRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[1] transition-opacity duration-700 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <div className="w-[420px] h-[420px] rounded-full bg-gradient-radial from-cyan-500/14 via-purple-500/8 to-transparent blur-[80px]" />
      </div>

      {/* 2. Precision Outer Cyber HUD Reticle */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full transition-all duration-300 ease-out flex items-center justify-center relative ${
            isClicking
              ? "w-7 h-7 border-2 border-cyan-400 bg-cyan-400/25 scale-90 shadow-[0_0_20px_#00f0ff]"
              : isHoveringClickable
              ? "w-12 h-12 border border-cyan-400/80 bg-cyan-500/15 backdrop-blur-[2px] shadow-[0_0_28px_rgba(0,240,255,0.5),inset_0_0_12px_rgba(0,240,255,0.25)] scale-110"
              : "w-6 h-6 border border-cyan-400/60 bg-cyan-400/5 shadow-[0_0_12px_rgba(0,240,255,0.25)]"
          }`}
        >
          {/* Subtle spinning orbital ticks when hovering */}
          {isHoveringClickable && (
            <div className="absolute inset-0 rounded-full border border-dashed border-cyan-300/40 animate-spin" style={{ animationDuration: "8s" }} />
          )}
        </div>
      </div>

      {/* 3. Center Precision Laser Core Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <span
          className={`block rounded-full bg-cyan-300 shadow-[0_0_8px_#00f0ff] transition-all duration-150 ${
            isClicking ? "w-2.5 h-2.5 bg-white" : isHoveringClickable ? "w-1 h-1 opacity-40" : "w-1.5 h-1.5 opacity-90"
          }`}
        />
      </div>
    </>
  );
}
