"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, WhatsAppIcon } from "@/components/Icons";
import { portfolioData } from "@/data/portfolioData";

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
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

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 6000);
    }, 1200);
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
            <div className="glass-panel p-7 rounded-2xl border border-white/10 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Contact Channels</span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </h3>

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
                      href={`mailto:${portfolioData.personal.email}`}
                      className="text-xs sm:text-sm text-slate-200 hover:text-cyan-300 transition-colors truncate block font-mono"
                    >
                      {portfolioData.personal.email}
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
                  <span>{portfolioData.personal.location}</span>
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
                    href={portfolioData.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/80 text-slate-300 hover:text-white flex flex-col items-center gap-1.5 transition-all group"
                  >
                    <GithubIcon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-mono">GitHub</span>
                  </a>

                  <a
                    href={portfolioData.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-900/80 text-slate-300 hover:text-white flex flex-col items-center gap-1.5 transition-all group"
                  >
                    <LinkedinIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-mono">LinkedIn</span>
                  </a>

                  <a
                    href={portfolioData.personal.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-900/80 text-slate-300 hover:text-white flex flex-col items-center gap-1.5 transition-all group"
                  >
                    <TwitterIcon className="w-5 h-5 text-slate-400 group-hover:text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-mono">Twitter/X</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-7 sm:p-9 rounded-2xl border border-white/10 shadow-2xl relative">
              <h3 className="text-xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill in the form below and I will respond to your inquiry promptly.
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
                      Your Email <span className="text-cyan-400">*</span>
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
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
