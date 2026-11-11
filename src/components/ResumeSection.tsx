"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  FileDown,
  GraduationCap,
  Award,
  CheckCircle2,
  ExternalLink,
  Printer,
  Sparkles,
  Upload,
  Lock,
  Pencil,
  X,
  Eye,
  EyeOff,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

const VALID_PINS = ["2026", "1234", "eswaran", "admin", "eswar"];

export default function ResumeSection() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showPinPrompt, setShowPinPrompt] = useState(false);

  // File upload state
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // PIN input state
  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [showPinInput, setShowPinInput] = useState(false);

  const resumeUrl = "/documents/eswaran-resume.pdf";

  // Check Owner status on mount and listen to custom event
  useEffect(() => {
    const checkOwner = () => {
      const savedPin =
        localStorage.getItem("eswaran_owner_pin") ||
        sessionStorage.getItem("eswaran_owner_pin");
      setIsOwner(!!(savedPin && VALID_PINS.includes(savedPin.toLowerCase())));
    };

    checkOwner();
    window.addEventListener("owner-mode-changed", checkOwner);
    return () => window.removeEventListener("owner-mode-changed", checkOwner);
  }, []);

  // Lock Owner Mode
  const handleLockOwnerMode = () => {
    localStorage.removeItem("eswaran_owner_pin");
    sessionStorage.removeItem("eswaran_owner_pin");
    setIsOwner(false);
    window.dispatchEvent(new Event("owner-mode-changed"));
  };

  // Download official Resume PDF
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = `${portfolioData.personal.name.replace(/\s+/g, "_")}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  // PIN Submit
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");

    const normalized = enteredPin.trim().toLowerCase();
    if (VALID_PINS.includes(normalized)) {
      const canonical = normalized === "1234" ? "1234" : "2026";
      setIsOwner(true);
      localStorage.setItem("eswaran_owner_pin", canonical);
      sessionStorage.setItem("eswaran_owner_pin", canonical);
      window.dispatchEvent(new Event("owner-mode-changed"));
      setShowPinPrompt(false);
      setEnteredPin("");
      setShowUploadModal(true);
    } else {
      setPinError("Invalid Security PIN. Access denied.");
    }
  };

  // Upload Resume PDF
  const handleResumeUpload = async (e: React.FormEvent, autoLock = false) => {
    e.preventDefault();
    if (!resumeFile) {
      setUploadError("Please select a PDF file to upload.");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    const pin =
      localStorage.getItem("eswaran_owner_pin") ||
      sessionStorage.getItem("eswaran_owner_pin") ||
      "2026";

    try {
      const formData = new FormData();
      formData.append("file", resumeFile);
      formData.append("pin", pin);

      const res = await fetch("/api/resume", {
        method: "POST",
        headers: {
          "x-admin-pin": pin,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload resume PDF.");
      }

      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setShowUploadModal(false);
        setResumeFile(null);
        if (autoLock) {
          handleLockOwnerMode();
        }
      }, 1200);
    } catch (err: any) {
      setUploadError(err.message || "An error occurred while uploading.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section id="resume-section" className="relative py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel rounded-3xl p-5 sm:p-8 md:p-12 border border-cyan-500/20 shadow-2xl relative overflow-hidden">
          {/* Subtle top neon stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <div
                onClick={() => {
                  if (!isOwner) setShowPinPrompt(true);
                }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3 cursor-pointer select-none"
                title={isOwner ? "Owner Mode Active" : "Click to authenticate as Owner"}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Curriculum Vitae</span>
                {isOwner && <Sparkles className="w-3 h-3 text-emerald-400" />}
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Resume &amp; <span className="text-gradient-cyan-purple">Credentials</span>
              </h2>
              <p className="text-slate-300 text-sm mt-1">
                Verified background in workstation hardware, surveillance infrastructure, and enterprise networking.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
              {/* Owner Upload & Lock Controls: ONLY VISIBLE WHEN OWNER MODE IS ACTIVE */}
              {isOwner && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-500/50 hover:bg-emerald-900/60 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    title="Upload / Replace your actual Resume PDF"
                  >
                    <Upload className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Upload Resume PDF</span>
                  </button>
                  <button
                    onClick={handleLockOwnerMode}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-xs font-mono text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:text-white transition-all"
                    title="Lock & Hide upload button from visitors"
                  >
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Lock</span>
                  </button>
                </div>
              )}

              {/* View / Preview PDF Modal Button */}
              <button
                onClick={() => setShowPreviewModal(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700/80 hover:text-cyan-300 hover:border-cyan-500/40 transition-all text-center"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>View PDF</span>
              </button>

              {/* Print Button (Desktop only) */}
              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700/80 hover:text-white hover:border-slate-500 transition-all"
              >
                <Printer className="w-4 h-4 text-slate-400" />
                <span>Print</span>
              </button>

              {/* Download Resume PDF Button */}
              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all transform hover:-translate-y-0.5 text-center font-mono"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </button>
            </div>
          </div>

          {/* Download Notification */}
          {downloadSuccess && (
            <div className="mt-4 p-3 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Official Resume PDF downloaded successfully!</span>
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

      {/* ============================================================ */}
      {/* OWNER UPLOAD RESUME PDF MODAL */}
      {/* ============================================================ */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-5 sm:p-8 border border-white/15 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowUploadModal(false);
                setUploadError("");
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Upload className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Upload Official Resume PDF</h3>
                <p className="text-xs text-slate-400 font-mono">Owner Portal • ESWARAN K</p>
              </div>
            </div>

            {uploadSuccess ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Resume PDF Updated Live!</h4>
                <p className="text-xs text-slate-300">
                  Your new resume is now linked to all download buttons across the website.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => handleResumeUpload(e, false)} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    Select Your Resume PDF File *
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    required
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setResumeFile(e.target.files[0]);
                      }
                    }}
                    className="w-full text-xs text-slate-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 file:cursor-pointer p-4 rounded-xl bg-slate-950/80 border border-dashed border-slate-700 focus:border-cyan-500"
                  />
                  {resumeFile && (
                    <div className="mt-2 p-2.5 rounded-lg bg-cyan-950/50 border border-cyan-800/60 text-xs font-mono text-cyan-300 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span>
                        {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                  )}
                </div>

                {uploadError && (
                  <div className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                <div className="pt-3 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs border border-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? "Uploading..." : "Upload PDF"}</span>
                  </button>
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={(e) => handleResumeUpload(e, true)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-50 flex items-center justify-center gap-1.5"
                    title="Upload resume and lock owner mode so the upload button is completely hidden from visitors"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Upload &amp; Lock</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* OWNER PIN UNLOCK MODAL */}
      {/* ============================================================ */}
      {showPinPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 sm:p-8 border border-white/15 shadow-2xl relative">
            <button
              onClick={() => {
                setShowPinPrompt(false);
                setPinError("");
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-cyan-400" />
            </div>

            <h3 className="text-xl font-bold text-white mb-1">Owner Verification</h3>
            <p className="text-xs text-slate-300 mb-6">
              Only <strong className="text-cyan-300">ESWARAN K</strong> can upload or update the official Resume PDF.
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Owner Security Key / PIN
                </label>
                <div className="relative">
                  <input
                    type={showPinInput ? "text" : "password"}
                    value={enteredPin}
                    onChange={(e) => setEnteredPin(e.target.value)}
                    placeholder="Enter Security PIN"
                    maxLength={20}
                    autoFocus
                    className="w-full pl-4 pr-11 py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white font-mono text-center tracking-widest text-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPinInput(!showPinInput)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 p-1 transition-colors"
                    title={showPinInput ? "Hide PIN" : "Show PIN"}
                  >
                    {showPinInput ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {pinError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{pinError}</span>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPinPrompt(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs border border-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                >
                  Unlock &amp; Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* IN-BROWSER RESUME PDF PREVIEW MODAL */}
      {/* ============================================================ */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="glass-panel w-full max-w-4xl max-h-[92vh] rounded-2xl border border-white/15 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800/90 flex items-center justify-between gap-4 bg-slate-950/80">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white truncate">
                    {portfolioData.personal.name} — Official Resume
                  </h3>
                  <p className="text-xs text-slate-400 font-mono truncate">
                    System Engineer • Verified Document
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">New Tab</span>
                </a>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </button>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Viewer Frame */}
            <div className="flex-1 bg-slate-900/60 p-2 sm:p-4 overflow-hidden flex items-center justify-center">
              <iframe
                src={`${resumeUrl}#view=FitH`}
                className="w-full h-[55vh] sm:h-[68vh] rounded-xl border border-slate-800 bg-white/5"
                title="Official Resume Preview"
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-3 sm:p-4 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="truncate">Official Curriculum Vitae of ESWARAN K</span>
              <span className="shrink-0 text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
