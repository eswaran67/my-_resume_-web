"use client";

import React, { useState } from "react";
import {
  Cpu,
  Camera,
  Network,
  Code2,
  Server,
  Wrench,
  ShieldCheck,
  Cable,
  CheckCircle2,
  Terminal,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutSkills() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="w-6 h-6 text-cyan-400" />;
      case "Camera":
        return <Camera className="w-6 h-6 text-blue-400" />;
      case "Network":
        return <Network className="w-6 h-6 text-violet-400" />;
      case "Code2":
        return <Code2 className="w-6 h-6 text-pink-400" />;
      case "Server":
        return <Server className="w-6 h-6 text-pink-400" />;
      default:
        return <Wrench className="w-6 h-6 text-cyan-400" />;
    }
  };

  const currentCategory = portfolioData.skillCategories[selectedCategory];

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <Activity className="w-3.5 h-3.5" />
              <span>Technical Capabilities &amp; Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Skills &amp; <span className="text-gradient-cyan-purple">Engineering Expertise</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Hands-on hardware engineering, enterprise surveillance deployments, structured network cabling (T568B), and on-site technical support.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Core Pillars Overview Cards */}
        <ScrollReveal direction="up" delayMs={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {portfolioData.skillCategories.map((cat, index) => {
              const isSelected = selectedCategory === index;
              return (
                <button
                  key={cat.title}
                  onClick={() => setSelectedCategory(index)}
                  className={`btn-click card-shine text-left p-6 rounded-2xl transition-all duration-300 relative group flex flex-col justify-between ${
                    isSelected
                      ? "glass-panel border-cyan-400/60 shadow-[0_0_30px_-5px_rgba(0,240,255,0.25)] bg-slate-900/90 scale-[1.02]"
                      : "glass-panel border-white/5 hover:border-cyan-500/30 hover:bg-slate-900/70"
                  }`}
                >
                {/* Active indicator dot */}
                {isSelected && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider">
                      ACTIVE
                    </span>
                  </div>
                )}

                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
                    {getIcon(cat.icon)}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-cyan-400">
                  <span>{cat.skills.length} core proficiencies</span>
                  <span>&rarr;</span>
                </div>
              </button>
            );
          })}
          </div>
        </ScrollReveal>

        {/* Detailed Interactive Inspector Panel for Selected Category */}
        <ScrollReveal direction="up" delay={150}>
          <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden card-shine">
          {/* Subtle neon gradient bar across the top of card */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Category summary and highlight list */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  {getIcon(currentCategory.icon)}
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    Selected Specialization
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {currentCategory.title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentCategory.description}
              </p>

              {/* Specialization highlights */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span>Precision hardware troubleshooting, component-level testing &amp; custom PC builds</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <span>All-brand CCTV &amp; IP cameras, NVR/DVR multi-channel setup &amp; biometric attendance devices</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>Structured cabling (T568B RJ45), LAN/WAN routing &amp; rapid on-site resolution</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Skill Meters & Badges */}
            <div className="lg:col-span-7 bg-slate-950/60 rounded-2xl p-6 sm:p-8 border border-slate-800/80 shadow-inner">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  Key Skills &amp; Proficiencies
                </span>
                <span className="text-xs font-mono text-cyan-400">
                  Evaluated / 100%
                </span>
              </div>

              <div className="space-y-5">
                {currentCategory.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-medium text-slate-200 flex items-center gap-2">
                        {skill.name}
                        {skill.highlight && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                            Key Focus
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-slate-400">{skill.level}%</span>
                    </div>

                    {/* Progress track */}
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-[0_0_10px_rgba(0,240,255,0.4)] transition-all duration-700 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
