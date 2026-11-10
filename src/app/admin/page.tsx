"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // If already logged in, redirect directly to documents
    const savedPin = localStorage.getItem("eswaran_owner_pin");
    if (savedPin === "2026" || savedPin === "1234") {
      router.push("/#documents");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (pin.trim() === "2026" || pin.trim() === "1234") {
      localStorage.setItem("eswaran_owner_pin", pin.trim());
      sessionStorage.setItem("eswaran_owner_pin", pin.trim());
      setSuccess(true);
      setTimeout(() => {
        router.push("/#documents");
      }, 800);
    } else {
      setError("Access Denied: Invalid Security Key.");
    }
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
          <Lock className="w-6 h-6 text-cyan-400" />
        </div>

        <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1">
          Owner Portal Access
        </h1>
        <p className="text-xs text-slate-400 font-mono mb-6">
          Authorized Management Gateway • ESWARAN K
        </p>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
            <p className="text-sm font-bold text-white">Access Granted</p>
            <p className="text-xs text-slate-400 font-mono">Redirecting to Documents Vault...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">
                Security PIN
              </label>
              <input
                type="password"
                required
                autoFocus
                maxLength={8}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN (e.g. 2026)"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white font-mono text-center tracking-widest text-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
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
              Unlock Vault
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
