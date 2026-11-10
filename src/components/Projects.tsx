"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  Sparkles,
  FolderGit2,
  X,
  Info,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { portfolioData, ProjectItem } from "@/data/portfolioData";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ["All", "Systems & Cloud", "Web Apps", "Mobile", "Security"];

  const filteredProjects =
    activeFilter === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Work &amp; Architectures</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Projects <span className="text-gradient-cyan-purple">Showcase</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Real-world systems, cloud orchestration tools, reactive web platforms, and mobile apps built with scalability and resilience in mind.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                    : "glass-panel text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.2)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                {/* Header: Category Badge & Metrics */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-cyan-950/70 text-cyan-400 border border-cyan-800/60 font-semibold">
                    {project.category}
                  </span>
                  {project.metrics && (
                    <span className="text-[11px] font-mono text-purple-300 bg-purple-950/50 border border-purple-800/40 px-2 py-0.5 rounded flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      {project.metrics}
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                  {project.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs font-mono text-slate-400 mb-3 line-clamp-1 text-cyan-400/80">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 line-clamp-4">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-900/90 text-slate-300 border border-slate-800 group-hover:border-slate-700 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Action Links */}
                <div className="flex items-center justify-between gap-2 pt-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 transition-all flex-1 justify-center"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-slate-300" />
                    <span>Source</span>
                  </a>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-white px-3 py-2 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/60 hover:border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all flex-1 justify-center"
                  >
                    <span>Demo</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-500/50 text-slate-400 hover:text-purple-300 transition-all"
                    title="View Architectural Breakdown"
                    aria-label="View Project Architecture"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/40 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Neon Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-400 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800">
                  {selectedProject.category}
                </span>
                {selectedProject.metrics && (
                  <span className="text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-800 px-2 py-0.5 rounded">
                    {selectedProject.metrics}
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">
                {selectedProject.title}
              </h3>
              <p className="text-xs font-mono text-cyan-400 mb-4">
                {selectedProject.tagline}
              </p>

              <div className="space-y-4 text-slate-300 text-sm leading-relaxed mb-6">
                <p>{selectedProject.description}</p>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <h4 className="text-xs font-mono uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    Engineering &amp; Architecture Notes
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                      <span>Decoupled service architecture with minimal overhead &amp; zero single-point-of-failure.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                      <span>Automated container health probes &amp; low-latency reactive state synchronization.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>Full CI/CD integration with automated regression testing on every push.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <span className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Stack &amp; Frameworks
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-slate-900 text-cyan-300 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700 hover:text-white hover:border-slate-500 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
