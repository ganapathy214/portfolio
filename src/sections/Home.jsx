import React, { useEffect, useRef, useState } from "react";
import heroAvatar from "../assets/hero-avatar.png";
import { motion } from "framer-motion";

const ROLES = [
  "Senior Software Developer",
  "Full-Stack Engineer",
  "Cloud Architect",
  "Mobile App Developer",
  "System Designer",
];

const TypewriterRole = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const speed = deleting ? 40 : 80;

  useEffect(() => {
    const current = ROLES[roleIndex];
    const timer = setTimeout(() => {
      if (!deleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(current.slice(0, displayed.length - 1));
        } else {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, deleting, roleIndex, speed]);

  return (
    <span>
      {displayed}
      <span className="blinking-cursor">_</span>
    </span>
  );
};

const Home = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const mainEl = el.closest("main");
      if (mainEl) {
        const rect = el.getBoundingClientRect();
        const mainRect = mainEl.getBoundingClientRect();
        const targetTop = rect.top - mainRect.top + mainEl.scrollTop;
        mainEl.scrollTo({ top: targetTop, behavior: "smooth" });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="home"
      className="min-h-[98vh] flex items-center justify-center relative overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />

      {/* Radial glow behind avatar */}
      <div
        className="absolute right-0 top-0 w-[55%] h-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(0,213,213,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Left accent vertical line */}
      <div
        className="absolute left-0 top-0 h-full w-[3px] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #00D5D5 40%, #00D5D5 60%, transparent 100%)",
          opacity: 0.4,
        }}
      />

      {/* Top horizontal accent line */}
      <div
        className="absolute top-0 left-0 w-full h-[1px] pointer-events-none"
        style={{ background: "linear-gradient(to right, #00D5D5, transparent 60%)", opacity: 0.2 }}
      />

      {/* Main content */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10 relative py-16 md:py-0">

        {/* ── LEFT COLUMN ── */}
        <motion.div
          className="flex flex-col items-start text-left gap-5 md:gap-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="tag-primary"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Available for Work
          </motion.div>

          {/* Giant name — editorial style */}
          <div className="select-none leading-none">
            {/* Tiny label above */}
            {/* <p className="section-number mb-2">Portfolio — 2025</p> */}

            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-white glitch-text"
              data-text="GANAPATHY"
            >
              GANAPATHY
            </h1>
            {/* <div
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none select-none mt-1"
              style={{
                WebkitTextStroke: "1.5px #00D5D5",
                color: "transparent",
              }}
            >
              NATARAJAN
            </div> */}
          </div>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm sm:text-base md:text-lg font-mono font-bold text-primary tracking-widest uppercase"
          >
            <TypewriterRole />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="text-stone-400 text-sm md:text-base max-w-lg leading-relaxed"
          >
            Designing and engineering high-performance web systems, cross-platform mobile apps,
            and scalable serverless cloud architectures with{" "}
            <span className="text-white font-semibold">6+ years</span> of expertise.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="primary_button"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="secondary_button"
            >
              Hire Me
            </button>
          </motion.div>

          {/* Stats row — terminal card style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="w-full max-w-md mt-2"
          >
            <div
              className="corner-card rounded-lg p-4"
              style={{ background: "rgba(0,213,213,0.03)" }}
            >
              {/* Terminal header bar */}
              <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-stone-800">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 text-stone-600 text-[10px] font-mono">stats.sh</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "6+", label: "Years Exp" },
                  { value: "12+", label: "Projects" },
                  { value: "10+", label: "Credentials" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-black text-primary neon-text">{s.value}</div>
                    <div className="text-[9px] text-stone-500 font-bold uppercase tracking-widest mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — Portrait ── */}
        <motion.div
          className="flex justify-center items-center relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Outer rotating ring */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "380px",
              height: "380px",
              border: "1px solid rgba(0,213,213,0.15)",
              animation: "spin 20s linear infinite",
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "440px",
              height: "440px",
              border: "1px dashed rgba(0,213,213,0.08)",
              animation: "spin 35s linear infinite reverse",
            }}
          />

          {/* Hexagonal-ish portrait frame */}
          <div
            className="relative flex items-end justify-center overflow-hidden animate-float"
            style={{
              width: "300px",
              height: "360px",
              borderRadius: "60% 40% 50% 50% / 40% 40% 60% 60%",
              background: "linear-gradient(160deg, rgba(0,213,213,0.12) 0%, rgba(0,0,0,0.8) 60%)",
              border: "1.5px solid rgba(0,213,213,0.25)",
              boxShadow: "0 0 60px rgba(0,213,213,0.08), inset 0 0 40px rgba(0,213,213,0.04)",
            }}
          >
            {/* Inner glow overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(0,213,213,0.15) 0%, transparent 60%)",
                borderRadius: "inherit",
              }}
            />

            <motion.img
              src={heroAvatar}
              alt="Ganapathy N"
              className="w-[92%] h-[92%] object-contain select-none pointer-events-none relative z-10"
              style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.8))" }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            />
          </div>

          {/* Floating label chips around portrait */}
          <motion.div
            className="absolute top-4 -right-2 tag-primary text-[9px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            React Native
          </motion.div>
          <motion.div
            className="absolute bottom-8 -left-4 tag-primary text-[9px]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            AWS Cloud
          </motion.div>
          <motion.div
            className="absolute top-1/3 -right-6 tag-outline text-[9px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            Node.js
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-stone-600">Scroll</div>
        <div className="w-px h-8 bg-gradient-to-b from-stone-700 to-transparent" />
      </motion.div>

      {/* Spin keyframe injection */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default React.memo(Home);
