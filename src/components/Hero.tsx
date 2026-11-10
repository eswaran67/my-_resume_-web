"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  FileDown,
  Mail,
  Terminal as TerminalIcon,
  Server,
  Layers,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  Sparkles,
  Play,
  RotateCcw,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export default function Hero() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeCommand, setActiveCommand] = useState<string>("neofetch");
  const [customInput, setCustomInput] = useState<string>("");

  const handleDownloadResume = () => {
    const resumeContent = `=====================================================
${portfolioData.personal.name.toUpperCase()} - RESUME
${portfolioData.personal.title}
Email: ${portfolioData.personal.email}
GitHub: ${portfolioData.personal.github}
LinkedIn: ${portfolioData.personal.linkedin}
=====================================================

PROFESSIONAL SUMMARY:
${portfolioData.personal.shortBio}

CORE DOMAINS & SKILLS:
${portfolioData.skillCategories
  .map(
    (c, i) => `${i + 1}. ${c.title}:
   - ${c.skills.map((s) => s.name).join(", ")}`
  )
  .join("\n")}

PROFESSIONAL EXPERIENCE:
${portfolioData.experiences
  .map(
    (exp) => `
* ${exp.role} | ${exp.company} (${exp.period})
  Location: ${exp.location} | Type: ${exp.type}
  Technologies: ${exp.technologies.join(", ")}
  Key Responsibilities:
${exp.description.map((d) => `    - ${d}`).join("\n")}
`
  )
  .join("\n")}

FEATURED PROJECTS:
${portfolioData.projects
  .map(
    (p) => `
* ${p.title} [${p.category}]
  Tagline: ${p.tagline}
  Tech Stack: ${p.tags.join(", ")}
  Live: ${p.liveUrl} | GitHub: ${p.githubUrl}
`
  )
  .join("\n")}

EDUCATION:
${portfolioData.education
  .map(
    (edu) => `
* ${edu.degree}
  ${edu.institution} | ${edu.grade}
  Key Focus: ${edu.coursework.join(", ")}
  Overview: ${edu.description}
`
  )
  .join("\n")}

CERTIFICATIONS & ACCREDITATIONS:
${portfolioData.certifications
  .map(
    (c) => `
* ${c.name} (${c.issuer})
  Specialization: ${c.focus}
`
  )
  .join("\n")}

=====================================================
Generated from ${portfolioData.personal.name}'s Portfolio Website
=====================================================
`;

    const blob = new Blob([resumeContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${portfolioData.personal.name}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const cmd = customInput.trim().toLowerCase();
    setActiveCommand(cmd);
    setCustomInput("");
  };

  const renderTerminalOutput = () => {
    switch (activeCommand) {
      case "whoami":
        return (
          <div className="space-y-1.5 text-xs">
            <div className="text-cyan-300 font-semibold">
              &gt; eswaran [UID: 1000, GID: 1000]
            </div>
            <div className="text-slate-300">
              Role: System Engineer at IT Solutions Private Limited, Coimbatore
            </div>
            <div className="text-slate-400">
              Specialties: Hardware Assembly, All-Brand CCTV &amp; NVR/DVR, T568B Cabling, Hardware Diagnostics
            </div>
            <div className="text-emerald-400 flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Status: Active &amp; Ready for Enterprise Engagements</span>
            </div>
          </div>
        );

      case "cctv status":
        return (
          <div className="space-y-1 text-[11px] font-mono overflow-x-auto text-slate-300">
            <div className="text-slate-500 pb-1 border-b border-slate-800">
              CHANNEL &nbsp; DEVICE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PROTOCOL &nbsp;&nbsp; STATUS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; RESOLUTION
            </div>
            <div className="text-cyan-300">
              CH-01 &nbsp;&nbsp;&nbsp; 4MP IP Camera &nbsp;&nbsp;&nbsp; ONVIF/PoE &nbsp; RECORDING &nbsp;&nbsp;&nbsp; 2560x1440@30fps
            </div>
            <div className="text-purple-300">
              CH-02 &nbsp;&nbsp;&nbsp; Dome 2MP Camera &nbsp;&nbsp; ONVIF/PoE &nbsp; RECORDING &nbsp;&nbsp;&nbsp; 1920x1080@30fps
            </div>
            <div className="text-emerald-300">
              NVR-01 &nbsp;&nbsp; 16-Channel NVR/DVR &nbsp; H.265+ &nbsp;&nbsp;&nbsp;&nbsp; 8TB RAID-1 &nbsp;&nbsp;&nbsp; 100% HEALTHY
            </div>
          </div>
        );

      case "ping gateway":
        return (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <div className="text-slate-400">PING 192.168.1.1 (gateway-t568b) 56(84) bytes of data.</div>
            <div className="text-cyan-300">64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.28 ms</div>
            <div className="text-cyan-300">64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.31 ms</div>
            <div className="text-cyan-300">64 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=0.29 ms</div>
            <div className="text-emerald-400 pt-1">
              --- 192.168.1.1 ping statistics: 0% packet loss, rtt avg = 0.293 ms [T568B Certified Link]
            </div>
          </div>
        );

      case "cat specs.txt":
      case "cat stack.txt":
        return (
          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
            <div>
              <span className="text-cyan-400">HARDWARE:</span> Custom PC Workstations, Multimeter Testing
            </div>
            <div>
              <span className="text-purple-400">SECURITY:</span> All-Brand CCTV, NVR/DVR Setup, Biometric Punch
            </div>
            <div>
              <span className="text-pink-400">NETWORK:</span> Structured Cabling (T568B), LAN/WAN
            </div>
            <div>
              <span className="text-emerald-400">SOFTWARE:</span> Next.js, Tailwind, Kotlin, Compose
            </div>
          </div>
        );

      case "uptime":
        return (
          <div className="space-y-1 text-xs font-mono">
            <div className="text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>System &amp; Workstations: 100% Operational | 0 Unresolved Tickets</span>
            </div>
            <div className="text-slate-400 text-[11px]">
              Surveillance Uptime: 99.98% | Biometric Logs: Synced &amp; Verified
            </div>
          </div>
        );

      case "neofetch":
      default:
        return (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-cyan-300 font-semibold">
              eswaran@it-solutions-coimbatore
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-300 pt-1 border-t border-slate-800">
              <div>
                <span className="text-slate-500">Company:</span> IT Solutions Pvt Ltd
              </div>
              <div>
                <span className="text-slate-500">Location:</span> Coimbatore, Tamil Nadu
              </div>
              <div>
                <span className="text-slate-500">Role:</span> System Engineer
              </div>
              <div>
                <span className="text-slate-500">Hardware:</span> Custom PC Builds, SMPS
              </div>
              <div>
                <span className="text-slate-500">Surveillance:</span> All-Brand CCTV &amp; NVR
              </div>
              <div>
                <span className="text-slate-500">Cabling:</span> T568B RJ45 Standard
              </div>
              <div>
                <span className="text-slate-500">Biometrics:</span> Punch Attendance Setup
              </div>
              <div>
                <span className="text-slate-500">Tech Stack:</span> Next.js, Tailwind, Android
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Ambient Neon Glow Orbs in Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-[450px] h-[450px] bg-gradient-to-br from-purple-600/20 via-violet-700/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-400/15 via-indigo-600/10 to-transparent rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Greeting, Headline, Bio, Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Profile Avatar & Status Pill Badge */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_25px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transition-all">
                  <div className="w-full h-full rounded-[13px] overflow-hidden bg-slate-950">
                    <Image
                      src="/profile.jpg"
                      alt={portfolioData.personal.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover object-top"
                      priority
                    />
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#07090e] shadow-[0_0_8px_#34d399]" title="Available for projects" />
              </div>

              <div className="flex flex-col items-start gap-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-[0_0_15px_rgba(0,240,255,0.15)] animate-pulse-slow">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  <span>Available for Engineering</span>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 ml-0.5" />
                </div>
                <div className="text-[11px] font-mono text-slate-400 pl-1">
                  IT Solutions Pvt Ltd • Coimbatore
                </div>
              </div>
            </div>

            {/* Greeting */}
            <p className="text-sm sm:text-base font-mono uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
              <span className="text-cyan-400">&gt;</span> Hello world, my name is
            </p>

            {/* Hero Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4">
              <span className="text-gradient-silver">{portfolioData.personal.name}</span>
            </h1>

            {/* Engaging Subheading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-6">
              <span className="text-gradient-cyan-purple">
                {portfolioData.personal.title}
              </span>
            </h2>

            {/* Short Bio */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-light">
              {portfolioData.personal.shortBio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              {/* View Projects CTA */}
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all transform hover:-translate-y-0.5 text-center"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Download Resume Button */}
              <button
                onClick={handleDownloadResume}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/70 border border-slate-700/80 hover:text-white hover:border-purple-500/60 hover:bg-slate-800/80 shadow-lg shadow-black/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all transform hover:-translate-y-0.5 text-center"
              >
                <FileDown className="w-4 h-4 text-purple-400" />
                <span>Download Resume</span>
              </button>

              {/* Contact Me CTA */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-300 bg-transparent border border-slate-800 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-slate-900/40 transition-all text-center"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Download Notification Banner */}
            {downloadSuccess && (
              <div className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono animate-in fade-in duration-200 w-full sm:w-auto">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Resume downloaded successfully! You can also view details below.</span>
              </div>
            )}

            {/* Quick Metrics / Stats Strip */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-8 sm:pt-10 mt-8 sm:mt-10 border-t border-slate-800/60 w-full max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">
                  4+
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-purple-400">
                  100%
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">
                  SLA Reliability
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
                  50+
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">
                  Deployments
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Glass Terminal & Tech Stack Matrix */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Glass Console Card */}
            <div className="relative rounded-2xl glass-panel p-4 sm:p-6 shadow-2xl shadow-cyan-950/30 border border-white/10 hover:border-cyan-500/30 transition-all">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-800/80 gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block shrink-0" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block shrink-0" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block shrink-0" />
                  <span className="text-[11px] sm:text-xs font-mono text-slate-400 ml-1.5 truncate">
                    eswaran@it-solutions:~
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 shrink-0">
                  INTERACTIVE
                </span>
              </div>

              {/* Quick Command Selector Pills */}
              <div className="flex flex-wrap gap-1.5 mb-4 pb-3 border-b border-slate-800/60">
                {["neofetch", "whoami", "cctv status", "ping gateway", "cat specs.txt", "uptime"].map(
                  (cmd) => (
                    <button
                      key={cmd}
                      type="button"
                      onClick={() => setActiveCommand(cmd)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
                        activeCommand === cmd
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                          : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                      }`}
                    >
                      ${cmd}
                    </button>
                  )
                )}
              </div>

              {/* Terminal Content Stream */}
              <div className="min-h-[160px] bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 font-mono">
                <div className="text-slate-400 text-xs flex items-center gap-2 mb-2 pb-2 border-b border-slate-900">
                  <span className="text-cyan-400">$</span>
                  <span className="text-white font-semibold">{activeCommand}</span>
                </div>
                {renderTerminalOutput()}
              </div>

              {/* Command Input Form */}
              <form onSubmit={handleCommandSubmit} className="mt-4 flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono focus-within:border-cyan-400">
                  <span className="text-cyan-400">&gt;</span>
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Try 'whoami', 'docker ps', 'uptime'..."
                    className="w-full bg-transparent text-slate-200 placeholder:text-slate-600 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 hover:bg-cyan-900/60 transition-colors"
                  title="Run command"
                  aria-label="Run command"
                >
                  <Play className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Floating Pill Badges around Terminal */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  <Cpu className="w-3 h-3" /> Custom PC Builds
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-blue-500/10 text-blue-300 border border-blue-500/30">
                  <Layers className="w-3 h-3" /> All-Brand CCTV &amp; NVR
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  <Server className="w-3 h-3" /> T568B RJ45 Cabling
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-pink-500/10 text-pink-300 border border-pink-500/30">
                  <TerminalIcon className="w-3 h-3" /> Hardware Diagnostics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
