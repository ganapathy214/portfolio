import React from "react";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg-main,#000000)] text-[var(--text-white-or-dark,#ffffff)] select-none">
      <div className="relative w-16 h-16">
        {/* Neon outer glow spinner */}
        <div
          className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent animate-spin"
          style={{
            borderColor: "var(--primary) transparent var(--primary) transparent",
            filter: "drop-shadow(0 0 10px var(--primary))",
          }}
        />
        {/* Core pulse glow */}
        <div
          className="absolute inset-3 rounded-full bg-[rgba(var(--primary-rgb),0.2)] animate-pulse border border-[rgba(var(--primary-rgb),0.4)]"
        />
      </div>
      <span
        className="mt-6 text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted,rgba(255,255,255,0.4))] animate-pulse"
      >
        Loading Experience...
      </span>
    </div>
  );
}
