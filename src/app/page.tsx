import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSkills from "@/components/AboutSkills";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Projects from "@/components/Projects";
import ResumeSection from "@/components/ResumeSection";
import MyDocuments from "@/components/MyDocuments";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import ClickEffects from "@/components/ClickEffects";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#07090e] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Cyber Laser Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Interactive Cursor Spotlight & Click Physics */}
      <CursorGlow />
      <ClickEffects />

      {/* Background Decorative Mesh Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Right Neon Violet Orb */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px]" />
        {/* Center-Left Neon Cyan Orb */}
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]" />
        {/* Bottom-Right Deep Blue Orb */}
        <div className="absolute -bottom-40 right-10 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      {/* Main Page Elements */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <AboutSkills />
        <ExperienceTimeline />
        <Projects />
        <ResumeSection />
        <MyDocuments />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
