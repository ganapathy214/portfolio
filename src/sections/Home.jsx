import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TypewriterRole = ({ roles = [] }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const speed = deleting ? 40 : 80;

  useEffect(() => {
    if (!roles || roles.length === 0) return;
    const current = roles[roleIndex] || "";
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
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, deleting, roleIndex, speed, roles]);

  return (
    <span>
      {displayed}
      <span className="blinking-cursor">_</span>
    </span>
  );
};

const Home = ({ name, roles, description, centerSvg, orbitingStacks, statusBadgeText }) => {
  const displayName = name || "Ganapathy Natarajan";

  const ORBIT_POSITIONS = [
    { left: "182.5px", top: "0px" },
    { left: "340.5px", top: "91.25px" },
    { left: "340.5px", top: "273.75px" },
    { left: "182.5px", top: "365px" },
    { left: "24.5px", top: "273.75px" },
    { left: "24.5px", top: "91.25px" },
  ];

  const defaultOrbitingStacks = [
    { label: "React Native", type: "primary" },
    { label: "React.js", type: "primary" },
    { label: "Node.js", type: "outline" },
    { label: "Next.js", type: "primary" },
    { label: "AWS Cloud", type: "primary" },
    { label: "TypeScript", type: "outline" },
  ];

  const activeStacks = orbitingStacks && orbitingStacks.length > 0 ? orbitingStacks : defaultOrbitingStacks;

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
    <section id="home" className="min-h-[98vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />
      <div
        className="absolute right-0 top-0 w-[55%] h-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(var(--primary-rgb),0.06) 0%, transparent 70%)" }}
      />
      <div
        className="absolute left-0 top-0 h-full w-[3px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 0%, var(--primary) 40%, var(--primary) 60%, transparent 100%)", opacity: 0.4 }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10 relative py-16 md:py-0">
        <motion.div className="flex flex-col items-start text-left gap-5 md:gap-6" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="tag-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {statusBadgeText || "Available for Work"}
          </motion.div>
          <div className="select-none leading-none">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-white">{displayName}</h1>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="text-sm sm:text-base md:text-lg font-mono font-bold text-primary tracking-widest uppercase">
            <TypewriterRole roles={roles} />
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.8 }} className="text-stone-400 text-sm md:text-base max-w-lg leading-relaxed">
            {description}
          </motion.p>
          <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}>
            <button onClick={() => scrollToSection("projects")} className="primary_button">View Projects</button>
            <button onClick={() => scrollToSection("contact")} className="secondary_button">Hire Me</button>
          </motion.div>
        </motion.div>

        <motion.div className="flex justify-center items-center relative" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
          <div className="absolute rounded-full pointer-events-none" style={{ width: "380px", height: "380px", border: "1px solid rgba(var(--primary-rgb),0.15)", animation: "spin 20s linear infinite" }} />
          <div className="absolute rounded-full pointer-events-none" style={{ width: "440px", height: "440px", border: "1px dashed rgba(var(--primary-rgb),0.08)", animation: "spin 35s linear infinite reverse" }} />
          <div
            className="relative flex items-center justify-center overflow-hidden animate-float"
            style={{ width: "300px", height: "360px", borderRadius: "60% 40% 50% 50% / 40% 40% 60% 60%", background: "linear-gradient(160deg, rgba(var(--primary-rgb),0.12) 0%, rgba(0,0,0,0.8) 60%)", border: "1.5px solid rgba(var(--primary-rgb),0.25)", boxShadow: "0 0 60px rgba(var(--primary-rgb),0.08)" }}
          >
            {centerSvg ? (
              <div className="w-[70%] h-[70%] flex items-center justify-center" style={{ filter: "drop-shadow(0 0 15px rgba(var(--primary-rgb), 0.45))" }} dangerouslySetInnerHTML={{ __html: centerSvg }} />
            ) : (
              <svg fill="var(--primary)" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 491.52 491.52" className="w-[70%] h-[70%]" style={{ filter: "drop-shadow(0 0 15px rgba(var(--primary-rgb), 0.45))" }}>
                <g><g><rect x="71.68" y="102.4" width="92.16" height="20.48" /></g></g>
                <g><g><rect x="184.32" y="102.4" width="51.2" height="20.48" /></g></g>
                <g><g><rect x="71.68" y="256" width="92.16" height="20.48" /></g></g>
                <g><g><rect x="184.32" y="256" width="51.2" height="20.48" /></g></g>
                <g><g><rect x="71.68" y="204.8" width="61.44" height="20.48" /></g></g>
                <g><g><rect x="296.96" y="204.8" width="30.72" height="20.48" /></g></g>
                <g><g><rect x="153.6" y="204.8" width="122.88" height="20.48" /></g></g>
                <g><g><rect x="204.8" y="153.6" width="40.96" height="20.48" /></g></g>
                <g><g><rect x="71.68" y="153.6" width="112.64" height="20.48" /></g></g>
                <g><g><rect x="266.24" y="153.6" width="153.6" height="20.48" /></g></g>
                <g><g><rect x="71.68" y="307.2" width="153.6" height="20.48" /></g></g>
                <g><g><polygon points="391.24,243.64 376.76,258.12 405.36,286.72 376.76,315.32 391.24,329.8 434.32,286.72" /></g></g>
                <g><g><polygon points="309.32,258.12 294.84,243.64 251.76,286.72 294.84,329.8 309.32,315.32 280.72,286.72" /></g></g>
                <g><g><rect x="287.878" y="276.562" transform="matrix(0.3711 -0.9286 0.9286 0.3711 -50.5861 498.917)" width="110.284" height="20.48" /></g></g>
                <g><g><path d="M471.04,358.4V51.2H20.48v307.2H0v44.06l25.24,37.86h441.04l25.24-37.86V358.4H471.04z M40.96,71.68h409.6V358.4H40.96V71.68z M471.04,396.26l-15.72,23.58H36.2l-15.72-23.58v-17.38h450.56V396.26z" /></g></g>
                <g><g><rect x="276.48" y="389.12" width="20.48" height="20.48" /></g></g>
                <g><g><rect x="235.52" y="389.12" width="20.48" height="20.48" /></g></g>
                <g><g><rect x="194.56" y="389.12" width="20.48" height="20.48" /></g></g>
              </svg>
            )}
          </div>
          <div className="absolute w-[365px] h-[365px] pointer-events-none z-20" style={{ animation: "orbit-clockwise 25s linear infinite" }}>
            {activeStacks.map((stack, index) => {
              const pos = ORBIT_POSITIONS[index];
              if (!pos) return null;
              const tagClass = stack.type === "outline" ? "tag-outline" : "tag-primary";
              return (
                <div key={index} className="absolute" style={{ left: pos.left, top: pos.top, transform: "translate(-50%, -50%)" }}>
                  <div style={{ animation: "orbit-counter-clockwise 25s linear infinite" }}>
                    <motion.div className={tagClass + " text-[9px] whitespace-nowrap"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}>
                      {stack.label}
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}>
        <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-stone-600">Scroll</div>
        <div className="w-px h-8 bg-gradient-to-b from-stone-700 to-transparent" />
      </motion.div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-clockwise { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-counter-clockwise { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>
    </section>
  );
};

export default React.memo(Home);