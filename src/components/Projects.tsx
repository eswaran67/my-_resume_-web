"use client";

import React, { useState } from "react";
import {
  Sparkles,
  FolderGit2,
  X,
  Info,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Server,
  Network,
  ArrowRight,
} from "lucide-react";
import { portfolioData, ProjectItem } from "@/data/portfolioData";
import ScrollReveal from "@/components/ScrollReveal";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ["All", "CCTV & Surveillance", "Hardware & Systems", "Networking & IT"];

  const filteredProjects =
    activeFilter === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeFilter);

  const getProjectIcon = (category: string) => {
    switch (category) {
      case "CCTV & Surveillance":
        return <ShieldCheck className="w-5 h-5 text-blue-400" />;
      case "Hardware & Systems":
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case "Networking & IT":
        return <Network className="w-5 h-5 text-purple-400" />;
      default:
        return <Server className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getProjectNotes = (id: string) => {
    switch (id) {
      case "enterprise-cctv-nvr-surveillance":
        return [
          "Configured multi-channel IP security cameras, NVR network video recorders, and CMOS system setups for live office monitoring.",
          "High-definition motion detection zones, video loss alarms, and automated alert triggering across service zones.",
          "PoE switch power budget optimization, Cat6 wiring runs, and reliable video storage retention policies.",
        ];
      case "high-performance-custom-pc-builds":
        return [
          "Precision workstation and server assembly tailored for high-compute workloads with optimal thermal airflow.",
          "Rigorous digital multimeter testing for SMPS voltage rail stability (+12V, +5V, +3.3V) and component diagnostics.",
          "Tailored BIOS/CMOS configuration, memory profile tuning, and preventative maintenance protocols.",
        ];
      case "structured-cabling-enterprise-networking":
        return [
          "100% compliant T568B RJ45 wiring standard crimping and terminations across patch panels and keystone jacks.",
          "Enterprise LAN/WAN routing, managed switch deployment, and low-latency network segmentation.",
          "Biometric fingerprint punch attendance terminal integration and automated attendance database synchronization.",
        ];
      default:
        return [
          "Component-level testing and system hardening.",
          "Full compliance with enterprise hardware and networking standards.",
          "Rapid on-site installation, verification, and preventative maintenance.",
        ];
    }
  };

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <Server className="w-3.5 h-3.5" />
              <span>Infrastructure &amp; Engineering Deployments</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Featured <span className="text-gradient-cyan-purple">Projects</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Commercial CCTV &amp; NVR surveillance deployments, high-performance custom PC workstation builds, and certified T568B structured network cabling.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Pills */}
        <ScrollReveal direction="up" delayMs={100}>
          <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`btn-click px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.25)] scale-[1.03]"
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
                className="glass-panel card-shine rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.25)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2"
              >
              <div>
                {/* Header: Category Badge & Metrics */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-cyan-950/70 text-cyan-400 border border-cyan-800/60 font-semibold">
                    {getProjectIcon(project.category)}
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

                {/* Card Action Link */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="btn-click w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/60 hover:border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all group/btn cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:scale-110 transition-transform" />
                    <span>View Technical Specifications &amp; Setup</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </ScrollReveal>

        {/* Architectural / Technical Specifications Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/40 shadow-2xl"
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
                <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800">
                  {getProjectIcon(selectedProject.category)}
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
                    Engineering &amp; Implementation Details
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {getProjectNotes(selectedProject.id).map((note, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies / Components */}
              <div className="mb-6">
                <span className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Hardware Components &amp; Tools Used
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
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700 hover:text-white hover:border-slate-500 transition-all"
                >
                  <span>Close Specification</span>
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
                >
                  <span>Inquire for Similar Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
