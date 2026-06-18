import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare, FaFigma } from "react-icons/fa";
import { FiCode, FiArrowRight, FiMail, FiPhone, FiMapPin, FiExternalLink, FiMenu, FiX } from "react-icons/fi";
import { SiTailwindcss, SiTypescript } from "react-icons/si";
import avatar from "../assets/avatar.png";

const SOCIAL_ICONS = {
  FaLinkedinIn, FaGithub, FaTwitter, FaInstagram
};

const TECH_ICONS = [
  { icon: FaReact, name: "React", left: 30, top: 40 },
  { icon: SiTailwindcss, name: "Tailwind", left: 110, top: 20 },
  { icon: FaJsSquare, name: "JavaScript", left: 190, top: 10 },
  { icon: SiTypescript, name: "TypeScript", left: 270, top: 10 },
  { icon: FaNodeJs, name: "Node.js", left: 350, top: 20 },
  { icon: FaFigma, name: "Figma", left: 430, top: 40 }
];

export default function Template6Page({
  primaryColor = "#a855f7", // defaults to purple neon accent
  roles = [],
  description = "",
  about = {},
  servicesData = [],
  skills = [],
  projects = [],
  contactInfo = {},
  themeMode = "dark",
  sectionVisibility = {}
}) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = themeMode === "dark";
  const accent = primaryColor;

  // Dynamic Theme Colors
  const bgMain = isDark ? "#0c041c" : "#faf5ff";
  const bgCard = isDark ? "#140e2d" : "#ffffff";
  const bgNavbar = isDark ? "rgba(12, 4, 28, 0.85)" : "rgba(250, 245, 255, 0.85)";
  const textColor = isDark ? "#cbd5e1" : "#4b5563";
  const textTitle = isDark ? "#ffffff" : "#1e1b4b";
  const textSub = isDark ? "#c084fc" : "#a855f7";
  const borderColor = isDark ? "rgba(192, 132, 252, 0.08)" : "rgba(0,0,0,0.06)";

  const firstRole = roles?.[0] || about.title || "Frontend Developer";

  // Section scroll tracker
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-10% 0px -50% 0px" }
    );
    const sections = document.querySelectorAll("[data-t6-section]");
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  }, []);

  const NAV_ITEMS = [
    { id: "home", label: "Home" },
    { id: "about", label: "About", visibilityKey: "About" },
    { id: "projects", label: "Work", visibilityKey: "Projects" },
    { id: "contact", label: "Contact", visibilityKey: "Contact" }
  ].filter((item) => {
    if (!item.visibilityKey) return true;
    return sectionVisibility[item.visibilityKey] !== false;
  });

  return (
    <div
      style={{
        backgroundColor: bgMain,
        color: textColor,
        minHeight: "100vh",
        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
        overflowX: "hidden",
        position: "relative"
      }}
    >
      {/* Blurred background glow circles */}
      <div
        className="absolute w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{
          backgroundColor: accent,
          top: "10%",
          right: "5%"
        }}
      />
      <div
        className="absolute w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-[0.15]"
        style={{
          backgroundColor: "#3b82f6",
          bottom: "15%",
          left: "-10%"
        }}
      />

      <style>{`
        .t6-glow-btn:hover {
          box-shadow: 0 0 20px ${accent}60;
          opacity: 0.95;
        }
        .t6-project-card:hover {
          border-color: ${accent}40 !important;
          box-shadow: 0 15px 35px rgba(0,0,0,0.4);
        }
      `}</style>

      {/* NAVBAR */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: bgNavbar,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${borderColor}`
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="text-lg font-black tracking-widest text-white cursor-pointer"
          >
            {(about.name || "Anurag").split(" ")[0]}
          </button>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{
                  color: activeSection === item.id ? accent : textTitle
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-xl cursor-pointer"
            style={{ color: textTitle }}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden w-full absolute top-20 left-0 bg-stone-950 border-b border-stone-900 py-6 px-6 flex flex-col gap-4 text-left"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-xs font-semibold uppercase tracking-wider text-left py-2"
                  style={{
                    color: activeSection === item.id ? accent : "#cbd5e1"
                  }}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section
        id="home"
        data-t6-section
        className="min-h-[85vh] flex items-center py-20 px-6 relative"
      >
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Hero Text */}
          <div className="text-left space-y-6">
            <h1
              className="text-5xl sm:text-6xl font-extrabold tracking-tight"
              style={{ color: textTitle, lineHeight: 1.1 }}
            >
              Hi, I'm <span style={{ textShadow: `0 0 30px ${accent}25` }}>{about.name || "Anurag"}</span>
            </h1>
            <h2
              className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(to right, ${accent}, #ec4899)` }}
            >
              {firstRole}
            </h2>
            <p className="text-sm leading-relaxed max-w-lg">
              {description || about.bio || "Crafting robust frontend applications."}
            </p>
            <div className="pt-2">
              <button
                onClick={() => scrollTo("projects")}
                className="t6-glow-btn px-8 py-3.5 rounded-full text-xs font-bold transition-all cursor-pointer text-black"
                style={{
                  backgroundColor: accent
                }}
              >
                My Work
              </button>
            </div>
          </div>

          {/* Right Image Circle with Gradient Glow Background */}
          <div className="flex justify-center items-center relative">
            <div
              className="w-72 h-72 rounded-full relative flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${accent}20, #ec489920)`,
                border: `1.5px solid ${accent}30`
              }}
            >
              {/* Spinning glow ring */}
              <div
                className="absolute inset-2 rounded-full border border-dashed animate-spin"
                style={{
                  borderColor: `${accent}40`,
                  animationDuration: "35s"
                }}
              />
              <div className="w-[84%] h-[84%] rounded-full overflow-hidden border-2 border-purple-500/20 bg-stone-900 z-10 shrink-0">
                <img
                  src={about.avatarUrl || avatar}
                  alt={about.name || "Developer Portrait"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT & FLOATING SKILLS CONNECT CORE */}
      {(!sectionVisibility || sectionVisibility.About !== false) && (
        <section
          id="about"
          data-t6-section
          className="py-24 px-6 border-t"
          style={{ borderColor: borderColor }}
        >
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <div className="space-y-4">
              <h2 className="text-3xl font-extrabold tracking-tight uppercase" style={{ color: textTitle }}>
                About
              </h2>
              <p className="text-sm leading-relaxed max-w-2xl mx-auto">
                {about.bio || "Experienced engineer designing performant web layouts, responsive UI designs, and beautiful interactive modules."}
              </p>
            </div>

            {/* Central connect emblem skills diagram */}
            <div className="flex justify-center py-6">
              <div className="relative w-[500px] h-[260px] overflow-visible select-none hidden md:block">
                {/* Connecting SVG Path Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {TECH_ICONS.map((node, i) => {
                    const startX = 250;
                    const startY = 200;
                    const endX = node.left + 22; // offset for node circle half
                    const endY = node.top + 22;
                    return (
                      <g key={i}>
                        <path
                          d={`M ${startX},${startY} Q ${(startX + endX) / 2},${(startY + endY) / 2 + 30} ${endX},${endY}`}
                          stroke={accent}
                          strokeWidth="1.5"
                          fill="none"
                          opacity="0.25"
                          strokeDasharray="4 4"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Skill nodes */}
                {TECH_ICONS.map((node, i) => {
                  const Icon = node.icon;
                  return (
                    <div
                      key={i}
                      className="absolute p-3 rounded-full bg-stone-900 border flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                      style={{
                        left: node.left,
                        top: node.top,
                        borderColor: borderColor,
                        color: accent,
                        boxShadow: `0 0 15px ${accent}08`
                      }}
                      title={node.name}
                    >
                      <Icon className="text-lg" />
                    </div>
                  );
                })}

                {/* Central active core logo/emblem */}
                <div
                  className="absolute left-[225px] top-[175px] w-12 h-12 rounded-full bg-stone-900 border-2 flex items-center justify-center shadow-2xl z-10 cursor-default"
                  style={{
                    borderColor: accent,
                    color: accent,
                    boxShadow: `0 0 20px ${accent}30`
                  }}
                >
                  <span className="text-md font-black">Σ</span>
                </div>
              </div>

              {/* Mobile fallback skills capsules */}
              <div className="flex flex-wrap gap-2 justify-center md:hidden">
                {skills.map((sk, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-bold py-1.5 px-4 rounded-full border bg-stone-900/40"
                    style={{ borderColor: borderColor, color: textTitle }}
                  >
                    {sk.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RECENT WORK STAGGERED LAYOUT */}
      {(!sectionVisibility || sectionVisibility.Projects !== false) && (
        <section
          id="projects"
          data-t6-section
          className="py-24 px-6 border-t"
          style={{ borderColor: borderColor }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-20 text-left">
              <h2 className="text-3xl font-extrabold tracking-tight uppercase" style={{ color: textTitle }}>
                Recent Work
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider block mt-1" style={{ color: textSub }}>
                A selection of recent projects
              </span>
            </div>

            <div className="space-y-20">
              {projects.slice(0, 4).map((proj, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center text-left"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                  >
                    {/* Project image */}
                    <div
                      className={`md:col-span-6 overflow-hidden rounded-3xl border bg-stone-900 relative group h-64 ${
                        isEven ? "md:order-1" : "md:order-2"
                      }`}
                      style={{ borderColor: borderColor }}
                    >
                      {proj.image ? (
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-stone-600 font-bold uppercase font-mono">
                          NO PROJECT THUMBNAIL
                        </div>
                      )}
                    </div>

                    {/* Project details */}
                    <div
                      className={`md:col-span-6 space-y-4 ${
                        isEven ? "md:order-2" : "md:order-1"
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest font-mono" style={{ color: textSub }}>
                        {proj.category || "Full-Stack Project"}
                      </span>
                      <h4 className="text-2xl font-bold text-white">
                        {proj.title}
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: textColor }}>
                        {proj.synopsis}
                      </p>

                      <div className="flex flex-wrap gap-2.5 pt-2">
                        {(proj.stacks || []).map((st, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-mono font-bold tracking-widest uppercase text-stone-500 border border-stone-850 px-2 py-0.5 rounded"
                          >
                            {st}
                          </span>
                        ))}
                      </div>

                      {proj.liveLink && (
                        <div className="pt-4">
                          <a
                            href={proj.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:underline"
                          >
                            <span>Launch live link</span>
                            <FiExternalLink style={{ color: accent }} />
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      {(!sectionVisibility || sectionVisibility.Contact !== false) && (
        <section
          id="contact"
          data-t6-section
          className="py-24 px-6 border-t"
          style={{ borderColor: borderColor }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-extrabold uppercase tracking-tight text-white">
                  Contact
                </h2>
                <h3 className="text-lg font-bold text-zinc-400">
                  Drop me a message
                </h3>
                <p className="text-xs leading-relaxed max-w-sm">
                  Whether you have an inquiry, project proposals, or just want to connect, feel free to submit the contact form.
                </p>
              </div>

              {/* Details list */}
              <div className="space-y-4">
                {contactInfo.phone && (
                  <div className="flex items-center gap-3.5">
                    <FiPhone className="text-lg" style={{ color: accent }} />
                    <span className="text-xs font-semibold text-white">{contactInfo.phone}</span>
                  </div>
                )}
                {contactInfo.email && (
                  <div className="flex items-center gap-3.5">
                    <FiMail className="text-lg" style={{ color: accent }} />
                    <span className="text-xs font-semibold text-white">{contactInfo.email}</span>
                  </div>
                )}
                {contactInfo.address && (
                  <div className="flex items-center gap-3.5">
                    <FiMapPin className="text-lg" style={{ color: accent }} />
                    <span className="text-xs font-semibold text-white">{contactInfo.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="p-8 rounded-3xl border text-left space-y-5"
                style={{
                  backgroundColor: bgCard,
                  borderColor: borderColor
                }}
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full bg-stone-900 border border-stone-850 rounded-2xl px-4 py-3.5 text-xs outline-none text-white transition-colors focus:border-purple-500/40"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-stone-900 border border-stone-850 rounded-2xl px-4 py-3.5 text-xs outline-none text-white transition-colors focus:border-purple-500/40"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Message description details..."
                    className="w-full bg-stone-900 border border-stone-850 rounded-2xl px-4 py-3.5 text-xs outline-none text-white resize-none transition-colors focus:border-purple-500/40"
                  />
                </div>

                <button
                  type="submit"
                  className="t6-glow-btn w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-black transition-all cursor-pointer"
                  style={{
                    backgroundColor: accent
                  }}
                >
                  Send message
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t py-12 px-6" style={{ borderColor: borderColor, backgroundColor: isDark ? "#06020e" : "#faf5ff" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider">
            &copy; 2026 {about.name || "Anurag"}. All rights reserved.
          </span>

          <div className="flex gap-4">
            {(about.socialLinks || []).map((link, i) => {
              const Icon = SOCIAL_ICONS[link.icon] || FaGithub;
              return (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-zinc-800 bg-stone-900 flex items-center justify-center text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
