"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export default function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
  delay,
  direction = "up",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const effectiveDelay = delay ?? delayMs ?? 0;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const getTransformClass = () => {
    if (isVisible) return "opacity-100 translate-x-0 translate-y-0 scale-100";

    switch (direction) {
      case "up":
        return "opacity-0 translate-y-8 scale-[0.98]";
      case "down":
        return "opacity-0 -translate-y-8 scale-[0.98]";
      case "left":
        return "opacity-0 translate-x-8";
      case "right":
        return "opacity-0 -translate-x-8";
      case "none":
      default:
        return "opacity-0 scale-[0.97]";
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${getTransformClass()} ${className}`}
      style={{
        transitionDelay: `${effectiveDelay}ms`,
      }}
    >
      {children}
    </div>
  );
}
