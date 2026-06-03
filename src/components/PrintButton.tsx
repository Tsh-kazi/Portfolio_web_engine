"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-mono uppercase tracking-widest hover:bg-zinc-700 transition-colors duration-200 mt-2"
    >
      Print Card
    </button>
  );
}
