"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Send,
  Copy,
  Check,
  MapPin,
  Clock,
  Sparkles,
  MessageSquare,
  AlertCircle,
  Phone,
  Pencil,
  Lock,
  X,
  Save,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, WhatsAppIcon } from "@/components/Icons";
import { portfolioData } from "@/data/portfolioData";

const VALID_PINS = ["2026", "1234", "eswaran", "admin", "eswar"];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Dynamic Contact & Profile Info
  const [contactInfo, setContactInfo] = useState({
    email: portfolioData.personal.email,
    location: portfolioData.personal.location,
    phone: portfolioData.personal.phone,
    whatsapp: portfolioData.personal.whatsapp,
    github: portfolioData.personal.github,
    linkedin: portfolioData.personal.linkedin,
    twitter: portfolioData.personal.twitter,
  });

  // Owner Mode State
  const [isOwner, setIsOwner] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [showPinInput, setShowPinInput] = useState(false);

  // Edit Form Fields
  const [editEmail, setEditEmail] = useState(portfolioData.personal.email);
  const [editLocation, setEditLocation] = useState(portfolioData.personal.location);
  const [editPhone, setEditPhone] = useState(portfolioData.personal.phone);
  const [editWhatsapp, setEditWhatsapp] = useState(portfolioData.personal.whatsapp);
  const [editLinkedin, setEditLinkedin] = useState(portfolioData.personal.linkedin);
  const [editGithub, setEditGithub] = useState(portfolioData.personal.github);
  const [editSaving, setEditSaving] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [editError, setEditError] = useState("");

  // Load latest profile data from API (auto-locks on tab/browser close)
  useEffect(() => {
    // Clear legacy permanent storage so closing the website always locks Owner Mode
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("eswaran_owner_pin");
      } catch (e) {}
    }

    const checkOwner = () => {
      const savedPin =
        typeof window !== "undefined"
          ? sessionStorage.getItem("eswaran_owner_pin")
          : null;
      setIsOwner(!!(savedPin && VALID_PINS.includes(savedPin.toLowerCase())));
    };

    checkOwner();
    window.addEventListener("owner-mode-changed", checkOwner);

    const loadProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (data.success && data.personal) {
          setContactInfo({
            email: data.personal.email || portfolioData.personal.email,
            location: data.personal.location || portfolioData.personal.location,
            phone: data.personal.phone || portfolioData.personal.phone,
            whatsapp: data.personal.whatsapp || portfolioData.personal.whatsapp,
            github: data.personal.github || portfolioData.personal.github,
            linkedin: data.personal.linkedin || portfolioData.personal.linkedin,
            twitter: data.personal.twitter || portfolioData.personal.twitter,
          });
          setEditEmail(data.personal.email || portfolioData.personal.email);
          setEditLocation(data.personal.location || portfolioData.personal.location);
          setEditPhone(data.personal.phone || portfolioData.personal.phone);
          setEditWhatsapp(data.personal.whatsapp || portfolioData.personal.whatsapp);
          setEditLinkedin(data.personal.linkedin || portfolioData.personal.linkedin);
          setEditGithub(data.personal.github || portfolioData.personal.github);
        }
      } catch (e) {
        // Fallback to default portfolioData
      }
    };

    loadProfile();
    return () => window.removeEventListener("owner-mode-changed", checkOwner);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 6000);
    }, 1200);
  };

  // Owner PIN Authentication for editing
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");

    const normalized = pinInput.trim().toLowerCase();
    if (VALID_PINS.includes(normalized)) {
      const canonical = normalized === "1234" ? "1234" : "2026";
      setIsOwner(true);
      // Use sessionStorage ONLY so closing website locks owner mode
      sessionStorage.setItem("eswaran_owner_pin", canonical);
      localStorage.removeItem("eswaran_owner_pin");
      window.dispatchEvent(new Event("owner-mode-changed"));
      setShowPinPrompt(false);
      setPinInput("");
      setShowEditModal(true);
    } else {
      setPinError("Invalid Security PIN. Access denied.");
    }
  };

  // Lock Owner Mode so all edit buttons disappear from view
  const handleLockOwnerMode = () => {
    sessionStorage.removeItem("eswaran_owner_pin");
    localStorage.removeItem("eswaran_owner_pin");
    setIsOwner(false);
    window.dispatchEvent(new Event("owner-mode-changed"));
  };

  // Save updated contact info to server API and client state (with optional auto-lock)
  const handleSaveContactInfo = async (e: React.FormEvent, autoLock = false) => {
    e.preventDefault();
    setEditSaving(true);
    setEditError("");

    const pin =
      (typeof window !== "undefined"
        ? sessionStorage.getItem("eswaran_owner_pin")
        : null) ||
      "2026";

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": pin,
        },
        body: JSON.stringify({
          pin,
          email: editEmail.trim(),
          location: editLocation.trim(),
          phone: editPhone.trim(),
          whatsapp: editWhatsapp.trim(),
          linkedin: editLinkedin.trim(),
          github: editGithub.trim(),
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to update contact info.");
      }

      setContactInfo({
        email: editEmail.trim(),
        location: editLocation.trim(),
        phone: editPhone.trim(),
        whatsapp: editWhatsapp.trim(),
        linkedin: editLinkedin.trim(),
        github: editGithub.trim(),
        twitter: contactInfo.twitter,
      });

      setEditSuccess(true);
      setTimeout(() => {
        setEditSuccess(false);
        setShowEditModal(false);
        if (autoLock) {
          handleLockOwnerMode();
        }
      }, 1000);
    } catch (err: any) {
      setEditError(err.message || "An error occurred while saving.");
    } finally {
      setEditSaving(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background glow meshes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Initiate Communication</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Get In <span className="text-gradient-cyan-purple">Touch</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Have an infrastructure challenge, surveillance deployment, custom workstation requirement, or an open engineering role? Let&apos;s build something exceptional together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Social Connections */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="glass-panel p-7 rounded-2xl border border-white/10 shadow-xl space-y-6 relative">
              <div className="flex items-center justify-between">
                <h3
                  onClick={() => {
                    if (!isOwner) setShowPinPrompt(true);
                  }}
                  className="text-xl font-bold text-white flex items-center gap-2 cursor-pointer select-none"
                  title={isOwner ? "Owner Mode Active" : "Click to authenticate as Owner"}
                >
                  <span>Contact Channels</span>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </h3>

                {/* Owner Controls: ONLY VISIBLE TO THE OWNER (ESWARAN K) */}
                {isOwner && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowEditModal(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono transition-colors shadow-sm"
                      title="Edit Email & Address"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Edit Info</span>
                    </button>
                    <button
                      onClick={handleLockOwnerMode}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs font-mono transition-colors"
                      title="Lock & Hide from Visitors"
                    >
                      <Lock className="w-3 h-3 text-cyan-400" />
                      <span>Lock</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Email One-Click Copy */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-xs sm:text-sm text-slate-200 hover:text-cyan-300 transition-colors truncate block font-mono font-medium"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all shrink-0 ml-2"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location & Availability Badges */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="font-medium text-slate-200">{contactInfo.location}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Response Time: Typically under 24 hours</span>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="pt-4 border-t border-slate-800">
                <span className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  Connect on Socials &amp; Repositories
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/80 text-slate-300 hover:text-white flex flex-col items-center gap-1.5 transition-all group"
                  >
                    <GithubIcon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-mono">GitHub</span>
                  </a>

                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-900/80 text-slate-300 hover:text-white flex flex-col items-center gap-1.5 transition-all group"
                  >
                    <LinkedinIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-mono">LinkedIn</span>
                  </a>

                  <a
                    href={contactInfo.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900/80 text-slate-300 hover:text-white flex flex-col items-center gap-1.5 transition-all group"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-mono">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Availability Box */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400">Engineering Availability</span>
                <p className="text-sm font-semibold text-emerald-400 flex items-center gap-2 mt-0.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available for On-Site &amp; Infrastructure Projects
                </p>
              </div>
              <Phone className="w-5 h-5 text-cyan-400 opacity-60" />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-white/10 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
              <p className="text-slate-300 text-sm mb-6">
                Fill in the details below and I will respond to your technical requirements promptly.
              </p>

              {/* Status Alert */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-mono flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Thank you! Your message has been received. I will be in touch shortly.</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-mono flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Please fill out all required fields (Name, Email, Message).</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono text-slate-300"
                    >
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono text-slate-300"
                    >
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono text-slate-300"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Project Inquiry / Job Opportunity / Collaboration"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono text-slate-300"
                  >
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your project scope, requirements, or timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 hover:from-cyan-300 hover:to-purple-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* OWNER EDIT CONTACT INFO MODAL */}
      {/* ============================================================ */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-5 sm:p-8 border border-white/15 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowEditModal(false);
                setEditError("");
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Pencil className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Edit Contact Details</h3>
                <p className="text-xs text-slate-400 font-mono">Owner Portal • ESWARAN K</p>
              </div>
            </div>

            {editSuccess ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Contact Info Updated!</h4>
                <p className="text-xs text-slate-300">
                  Your new email and address are saved and updated live on the website.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSaveContactInfo} className="space-y-4">
                {/* Email Address */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Direct Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="e.g. eswaran.techdev@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Physical Location / Address */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Location / Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="e.g. Madurai, Tamil Nadu, India"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      WhatsApp Link
                    </label>
                    <input
                      type="text"
                      value={editWhatsapp}
                      onChange={(e) => setEditWhatsapp(e.target.value)}
                      placeholder="https://wa.me/919876543210"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={editLinkedin}
                      onChange={(e) => setEditLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      GitHub URL
                    </label>
                    <input
                      type="text"
                      value={editGithub}
                      onChange={(e) => setEditGithub(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {editError && (
                  <div className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{editError}</span>
                  </div>
                )}

                <div className="pt-3 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs border border-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={editSaving}
                    onClick={(e) => handleSaveContactInfo(e, false)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                  <button
                    type="button"
                    disabled={editSaving}
                    onClick={(e) => handleSaveContactInfo(e, true)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-50 flex items-center justify-center gap-1.5"
                    title="Save changes and lock owner mode so the Edit button is completely hidden from visitors"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Save &amp; Lock</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* OWNER PIN UNLOCK MODAL (IF NOT LOGGED IN YET) */}
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

            <h3 className="text-xl font-bold text-white mb-1">Owner Security Verification</h3>
            <p className="text-xs text-slate-300 mb-6">
              Only <strong className="text-cyan-300">ESWARAN K</strong> can edit contact channels and address.
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Security PIN / Key
                </label>
                <div className="relative">
                  <input
                    type={showPinInput ? "text" : "password"}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
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
                  Unlock &amp; Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
