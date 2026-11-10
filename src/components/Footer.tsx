"use client";

import React from "react";
import Image from "next/image";
import { Terminal, ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { portfolioData } from "@/data/portfolioData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#05070a] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-900">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-cyan-500/40 p-0.5 bg-gradient-to-tr from-cyan-500/30 to-purple-600/30">
                <Image
                  src="/profile.jpg"
                  alt={portfolioData.personal.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover object-top rounded-[6px]"
                />
              </div>
              <span className="text-lg font-bold text-white tracking-wider">
                {portfolioData.personal.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              {portfolioData.personal.title} — IT Solutions Private Limited, Coimbatore. Hardware Engineering, Surveillance &amp; T568B Networking.
            </p>
          </div>

          {/* Quick Anchor Links */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400">
            <a href="#about" className="hover:text-cyan-300 transition-colors">
              About &amp; Skills
            </a>
            <a href="#experience" className="hover:text-cyan-300 transition-colors">
              Experience
            </a>
            <a href="#projects" className="hover:text-cyan-300 transition-colors">
              Projects
            </a>
            <a href="#resume-section" className="hover:text-cyan-300 transition-colors">
              Resume
            </a>
            <a href="#contact" className="hover:text-cyan-300 transition-colors">
              Contact
            </a>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-blue-500/40 transition-all"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-purple-500/40 transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-900/60 hover:text-white transition-all shadow-[0_0_12px_rgba(0,240,255,0.2)]"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-4 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Engineered with Next.js 15, Tailwind CSS &amp; Glassmorphism</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
