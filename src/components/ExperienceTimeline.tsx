"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, Building2, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-purple-500/30 text-purple-400 text-xs font-mono mb-4 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Professional <span className="text-gradient-cyan-purple">Experience</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A chronological timeline of roles, engineering impact, and systems leadership across high-growth environments.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Glowing Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent shadow-[0_0_10px_rgba(0,240,255,0.5)]" />

          <div className="space-y-12">
            {portfolioData.experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={`${exp.company}-${index}`}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  } gap-8 group`}
                >
                  {/* Glowing Node Dot in Center */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-6 z-20 flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full bg-[#07090e] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.6)] group-hover:border-purple-400 group-hover:scale-125 transition-all">
                      <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500" />
                    </div>
                  </div>

                  {/* Card Content - spans half width on desktop */}
                  <div className="w-full sm:w-[calc(50%-2.5rem)] pl-12 sm:pl-0">
                    <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-cyan-500/40 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.25)] transition-all duration-300 relative group-hover:-translate-y-1">
                      {/* Period Pill & Employment Type */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-500/30">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/60">
                          {exp.type}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 mb-4 flex-wrap">
                        <span className="flex items-center gap-1 font-medium text-slate-300">
                          <Building2 className="w-3.5 h-3.5 text-purple-400" />
                          {exp.company}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Accomplishments Bullet Points */}
                      <ul className="space-y-2 mb-5">
                        {exp.description.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed"
                          >
                            <CheckCircle2 className="w-4 h-4 text-cyan-400/80 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Chips */}
                      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
