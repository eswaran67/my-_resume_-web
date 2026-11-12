"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrolled = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrolled)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none bg-transparent"
    >
      {/* Background track subtle glow */}
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 origin-left transition-transform duration-75 ease-out shadow-[0_0_12px_rgba(0,240,255,0.8),0_0_24px_rgba(168,85,247,0.5)] relative"
        style={{
          transform: `scaleX(${scrollProgress / 100})`,
        }}
      >
        {/* Leading edge laser head */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-300 blur-[2px] shadow-[0_0_15px_#00f0ff]" />
      </div>
    </div>
  );
}
