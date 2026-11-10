"use client";

import React, { useState } from "react";
import {
  FileText,
  FileDown,
  GraduationCap,
  Award,
  CheckCircle2,
  ExternalLink,
  Printer,
  Sparkles,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export default function ResumeSection() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    const resumeText = `======================================================================
${portfolioData.personal.name.toUpperCase()} - RESUME
${portfolioData.personal.title}
Email: ${portfolioData.personal.email}
GitHub: ${portfolioData.personal.github}
LinkedIn: ${portfolioData.personal.linkedin}
======================================================================

SUMMARY:
${portfolioData.personal.shortBio}

DOMAINS OF EXPERTISE:
${portfolioData.skillCategories
  .map(
    (c, i) => `${i + 1}. ${c.title}:
   - ${c.skills.map((s) => s.name).join(", ")}`
  )
  .join("\n")}

CAREER HISTORY:
${portfolioData.experiences
  .map(
    (e) => `
- ${e.role} at ${e.company} (${e.period})
  Location: ${e.location} | Type: ${e.type}
  Technologies: ${e.technologies.join(", ")}
  Key Impact:
${e.description.map((d) => `  * ${d}`).join("\n")}
`
  )
  .join("\n")}

FEATURED PROJECTS:
${portfolioData.projects
  .map(
    (p) => `
- ${p.title} (${p.category}): ${p.tagline}
  Stack: ${p.tags.join(", ")}
  Links: ${p.liveUrl} | ${p.githubUrl}
`
  )
  .join("\n")}

EDUCATION:
- Diploma in Computer Science & Engineering
  Government Polytechnic College • First Class
  Focus: Computer Hardware & Troubleshooting, Microprocessors, Networking Fundamentals, Digital Electronics, and System Maintenance.

CERTIFICATIONS & ACCREDITATIONS:
- All-Brand CCTV & NVR Surveillance Specialist
- Enterprise Structured Cabling & T568B RJ45 Standard
- Custom Workstation Engineering & Hardware Diagnostics
======================================================================
`;

    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume-section" className="relative py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-cyan-500/20 shadow-2xl relative overflow-hidden">
          {/* Subtle top neon stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
                <FileText className="w-3.5 h-3.5" />
                <span>Curriculum Vitae</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Resume &amp; <span className="text-gradient-cyan-purple">Credentials</span>
              </h2>
              <p className="text-slate-300 text-sm mt-1">
                Verified background in workstation hardware, surveillance infrastructure, and enterprise networking.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700/80 hover:text-white hover:border-slate-500 transition-all"
              >
                <Printer className="w-4 h-4 text-slate-400" />
                Print
              </button>

              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all transform hover:-translate-y-0.5"
              >
                <FileDown className="w-4 h-4" />
                Download Resume (TXT)
              </button>
            </div>
          </div>

          {/* Download Notification */}
          {downloadSuccess && (
            <div className="mt-4 p-3 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Resume downloaded successfully to your device!</span>
            </div>
          )}

          {/* Education & Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            {/* Education Box */}
            <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800/80">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Education</h4>
                  <p className="text-xs text-slate-400 font-mono">Academic Foundation</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-l-2 border-cyan-500/40 pl-3.5 space-y-2">
                  <div className="text-base font-bold text-white">
                    Diploma in Computer Science &amp; Engineering
                  </div>
                  <div className="text-xs text-cyan-400 font-mono flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-slate-200">Government Polytechnic College</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 font-semibold">
                      First Class
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    Coursework and practical lab training focused on Computer Hardware &amp; Troubleshooting, Microprocessors, Computer Networking Fundamentals, Digital Electronics, Operating Systems, and Peripheral Maintenance.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-800">
                      Computer Hardware &amp; Peripherals
                    </span>
                    <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-800">
                      Networking Fundamentals
                    </span>
                    <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-800">
                      Digital Electronics
                    </span>
                    <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-800">
                      System Maintenance &amp; Diagnostics Lab
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications Box */}
            <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800/80">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Certifications &amp; Accreditations</h4>
                  <p className="text-xs text-slate-400 font-mono">Professional Training</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">All-Brand CCTV &amp; NVR Surveillance Specialist</span>
                    <span className="block text-[11px] text-slate-400 font-mono">Commercial Security Deployment &amp; Video Storage Across All Brands</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Enterprise Structured Cabling &amp; T568B RJ45 Standard</span>
                    <span className="block text-[11px] text-slate-400 font-mono">Network Cabling, Patch Panels &amp; LAN Infrastructure</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Custom Workstation Engineering &amp; Hardware Diagnostics</span>
                    <span className="block text-[11px] text-slate-400 font-mono">Multimeter Testing, CMOS Setup &amp; Desktop Troubleshooting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
