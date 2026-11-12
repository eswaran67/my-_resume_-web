"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, AlertCircle, ArrowLeft, CheckCircle2, ShieldCheck, KeyRound, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const VALID_PINS = ["2026", "1234", "eswaran", "admin", "eswar"];

export default function AdminLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);

  useEffect(() => {
    // Clear legacy permanent storage so closing the website always locks Owner Mode
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("eswaran_owner_pin");
      } catch (e) {}
    }

    const savedPin =
      typeof window !== "undefined"
        ? sessionStorage.getItem("eswaran_owner_pin")
        : null;
    if (savedPin && VALID_PINS.includes(savedPin.toLowerCase())) {
      setAlreadyLoggedIn(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const normalized = pin.trim().toLowerCase();
    if (VALID_PINS.includes(normalized)) {
      const canonicalPin = normalized === "1234" ? "1234" : normalized === "admin" ? "admin" : "2026";
      // Use sessionStorage ONLY so closing website locks owner mode
      sessionStorage.setItem("eswaran_owner_pin", canonicalPin);
      localStorage.removeItem("eswaran_owner_pin");
      setSuccess(true);
      setTimeout(() => {
        router.push("/#contact");
      }, 700);
    } else {
      setError("Access Denied: Invalid Security Key.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("eswaran_owner_pin");
    localStorage.removeItem("eswaran_owner_pin");
    setAlreadyLoggedIn(false);
  };

  return (
    <main className="min-h-screen bg-[#07090e] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4">
          <KeyRound className="w-6 h-6 text-cyan-400" />
        </div>

        <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1">
          Owner Portal Access
        </h1>
        <p className="text-xs text-slate-400 font-mono mb-6">
          Authorized Management Gateway • ESWARAN K
        </p>

        {alreadyLoggedIn && !success ? (
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>You are currently authenticated as Owner (ESWARAN K)</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/#contact")}
                className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Go to Website
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs border border-slate-800 transition-colors"
              >
                Lock / Logout
              </button>
            </div>
          </div>
        ) : success ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
            <p className="text-sm font-bold text-white">Owner Access Granted!</p>
            <p className="text-xs text-slate-400 font-mono">Redirecting to Portfolio...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">
                Security Key / PIN
              </label>
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  required
                  autoFocus
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter Security PIN"
                  className="w-full pl-4 pr-11 py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white font-mono text-center tracking-widest text-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 p-1 transition-colors"
                  title={showPin ? "Hide PIN" : "Show PIN"}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] mt-2"
            >
              Unlock Owner Mode
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
