import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex items-center justify-center p-4">
      <div className="glass-panel p-8 rounded-2xl border border-white/10 text-center max-w-md">
        <h2 className="text-4xl font-extrabold text-cyan-400 mb-2">404</h2>
        <p className="text-slate-300 text-sm mb-6">The requested resource could not be found.</p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
