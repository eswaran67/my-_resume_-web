"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const auraPos = useRef({ x: -100, y: -100 });
  const ringRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(pointer: fine)");
    if (!media.matches) return;
    setIsPointerDevice(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check if target is clickable
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest(
          "button, a, input, textarea, select, [role='button'], .cursor-pointer, .glass-panel-hover"
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
      // Smooth lerp for ring (faster)
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.22;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.22;

      // Smooth lerp for ambient aura (slower, floating feeling)
      auraPos.current.x += (mousePos.current.x - auraPos.current.x) * 0.08;
      auraPos.current.y += (mousePos.current.y - auraPos.current.y) * 0.08;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${auraPos.current.x}px, ${auraPos.current.y}px, 0)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
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
      {/* 1. Large Ambient Spotlight Follower */}
      <div
        ref={auraRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[1] transition-opacity duration-500 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <div className="w-[320px] h-[320px] rounded-full bg-gradient-radial from-cyan-500/12 via-purple-500/6 to-transparent blur-3xl" />
      </div>

      {/* 2. Precision Interactive Neon Cursor Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full transition-all duration-200 ease-out flex items-center justify-center ${
            isClicking
              ? "w-6 h-6 border-2 border-cyan-400 bg-cyan-400/30 scale-90 shadow-[0_0_18px_#00f0ff]"
              : isHoveringClickable
              ? "w-11 h-11 border-2 border-cyan-400 bg-cyan-500/15 shadow-[0_0_22px_rgba(0,240,255,0.45)] scale-110"
              : "w-5 h-5 border border-cyan-400/70 bg-cyan-400/5 shadow-[0_0_10px_rgba(0,240,255,0.3)]"
          }`}
        >
          {/* Center core dot */}
          <span
            className={`rounded-full bg-cyan-300 transition-all duration-150 ${
              isClicking ? "w-2 h-2" : isHoveringClickable ? "w-1 h-1 opacity-0" : "w-1.5 h-1.5 opacity-90"
            }`}
          />
        </div>
      </div>
    </>
  );
}
