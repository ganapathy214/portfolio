import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import {
  FiCode, FiExternalLink, FiMail, FiPhone, FiMapPin, FiMenu, FiX,
  FiMic, FiMicOff, FiVideo, FiVideoOff, FiPhoneOff, FiPhoneCall
} from "react-icons/fi";
import avatar from "../assets/avatar.png";
import { usePortfolio } from "../context/PortfolioContext";

const Services      = React.lazy(() => import("../sections/Services"));
const Skills        = React.lazy(() => import("../sections/Skills"));
const Projects      = React.lazy(() => import("../sections/Projects"));
const Certification = React.lazy(() => import("../sections/Certification"));
const Testimonials  = React.lazy(() => import("../sections/Testimonials"));
const Journey       = React.lazy(() => import("../sections/Journey"));
const Blogs         = React.lazy(() => import("../sections/Blogs"));
const Faq           = React.lazy(() => import("../sections/Faq"));
const Contact       = React.lazy(() => import("../sections/Contact"));

const SECTION_COMPONENTS = {
  Services:      (props) => <Services      servicesSubtitle={props.servicesSubtitle} servicesData={props.servicesData} title={props.sectionTitles?.Services}      sectionNum={props.getSectionNum("Services")} />,
  Skills:        (props) => <Skills        skills={props.skills}           skillCategories={props.skillCategories}    title={props.sectionTitles?.Skills}         sectionNum={props.getSectionNum("Skills")} />,
  Projects:      (props) => <Projects      projects={props.projects}                                                  title={props.sectionTitles?.Projects}       sectionNum={props.getSectionNum("Projects")} />,
  Certification: (props) => <Certification certifications={props.certifications}                                       title={props.sectionTitles?.Certification}  sectionNum={props.getSectionNum("Certification")} />,
  Testimonials:  (props) => <Testimonials  testimonials={props.testimonials}                                           title={props.sectionTitles?.Testimonials}   sectionNum={props.getSectionNum("Testimonials")} />,
  Journey:       (props) => <Journey       timelineData={props.timelineData} summaryStats={props.summaryStats}        title={props.sectionTitles?.Journey}        sectionNum={props.getSectionNum("Journey")} />,
  Blogs:         (props) => <Blogs         blogs={props.blogs}                                                        title={props.sectionTitles?.Blogs}          sectionNum={props.getSectionNum("Blogs")} />,
  Faq:           (props) => <Faq           faqs={props.faqs}                                                          title={props.sectionTitles?.Faq}            sectionNum={props.getSectionNum("Faq")} />,
  Contact:       (props) => <Contact       contactInfo={props.contactInfo}                                             title={props.sectionTitles?.Contact}        sectionNum={props.getSectionNum("Contact")} />,
};

const SOCIAL_ICONS = {
  FaLinkedinIn, FaGithub, FaTwitter, FaInstagram
};

// ── Helper CodeEditor component ──────────────────────────────────────────────
const CodeEditor = ({ skills, accent, isDark }) => {
  const topSkills = (skills && skills.length > 0)
    ? skills.slice(0, 4).map(s => s.name)
    : ["JavaScript", "React", "Node.js", "TypeScript"];

  return (
    <div
      className="w-full max-w-md border rounded-2xl p-6 font-mono text-xs select-none shadow-2xl relative"
      style={{
        backgroundColor: isDark ? "#050a12" : "#ffffff",
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        color: isDark ? "#cbd5e1" : "#475569"
      }}
    >
      {/* Window Title Bar */}
      <div className="flex items-center gap-1.5 mb-6 absolute top-4 left-4">
        <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
      </div>

      {/* Code Area */}
      <div className="flex gap-4 pt-4">
        {/* Line numbers */}
        <div className="text-stone-500 font-bold select-none text-right w-4 space-y-1">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </div>
        {/* Code Content */}
        <div className="space-y-1 text-left">
          <div style={{ color: isDark ? "#64748b" : "#94a3b8" }}>
            &lt;<span style={{ color: isDark ? "#94a3b8" : "#475569" }}>stack</span>&gt;
          </div>
          {topSkills.map((skill, index) => (
            <div key={index} className="pl-4">
              &lt;<span style={{ color: accent }}>{skill}</span>&gt;
            </div>
          ))}
          <div style={{ color: isDark ? "#64748b" : "#94a3b8" }}>
            &lt;<span style={{ color: isDark ? "#94a3b8" : "#475569" }}>and more...</span>&gt;
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Helper VideoCallMock component ───────────────────────────────────────────
const VideoCallMock = ({ avatarUrl, accent, isDark, name }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);

  return (
    <div
      className="w-full max-w-md border rounded-2xl overflow-hidden relative shadow-2xl transition-all duration-300"
      style={{
        aspectRatio: "4/3",
        backgroundColor: isDark ? "#050a12" : "#ffffff",
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
      }}
    >
      {/* Title Bar */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
      </div>

      <AnimatePresence mode="wait">
        {isCallEnded ? (
          <motion.div
            key="call-ended"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 z-10 p-6 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#f43f5e]/10 text-[#f43f5e] flex items-center justify-center mb-3">
              <FiPhoneCall className="text-xl animate-pulse" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-white">Call Ended</p>
            <p className="text-[10px] text-stone-400 mt-1 mb-4">You are now offline</p>
            <button
              type="button"
              onClick={() => {
                setIsCallEnded(false);
                setIsMuted(false);
                setIsCameraOff(false);
              }}
              className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-black transition-colors cursor-pointer"
              style={{ backgroundColor: accent }}
            >
              Reconnect
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="call-active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Call Feed */}
            {isCameraOff ? (
              <div className="absolute inset-0 bg-[#0c1524] flex flex-col items-center justify-center z-0 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#f8fafc]/5 border border-white/5 flex items-center justify-center mb-2">
                  <span className="text-xl font-bold text-stone-500 font-mono">
                    {name ? name.split(" ").map(w => w.charAt(0)).join("").toUpperCase() : "DEV"}
                  </span>
                </div>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">Camera Off</p>
              </div>
            ) : (
              <img
                src={avatarUrl || avatar}
                alt={name || "Developer"}
                className="absolute inset-0 w-full h-full object-contain bg-[#050a12] z-0 filter contrast-[1.02]"
              />
            )}

            {/* Muted indicator */}
            {isMuted && (
              <div className="absolute top-4 right-4 z-10 p-1.5 rounded-lg bg-black/60 border border-white/10 text-[#f43f5e]">
                <FiMicOff className="text-sm" />
              </div>
            )}

            {/* Control Bar Overlay */}
            <div className="absolute bottom-4 left-0 w-full z-10 flex justify-center gap-3">
              {/* Mic Toggler */}
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer border ${
                  isMuted
                    ? "bg-[#f43f5e] border-[#f43f5e] text-white hover:bg-[#e11d48]"
                    : "bg-black/60 border-white/10 text-white hover:bg-black/80"
                }`}
              >
                {isMuted ? <FiMicOff className="text-sm" /> : <FiMic className="text-sm" />}
              </button>

              {/* Video Toggler */}
              <button
                type="button"
                onClick={() => setIsCameraOff(!isCameraOff)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer border ${
                  isCameraOff
                    ? "bg-[#f43f5e] border-[#f43f5e] text-white hover:bg-[#e11d48]"
                    : "bg-black/60 border-white/10 text-white hover:bg-black/80"
                }`}
              >
                {isCameraOff ? <FiVideoOff className="text-sm" /> : <FiVideo className="text-sm" />}
              </button>

              {/* Hangup Button */}
              <button
                type="button"
                onClick={() => setIsCallEnded(true)}
                className="w-9 h-9 rounded-full bg-[#f43f5e] border border-[#f43f5e] text-white flex items-center justify-center hover:bg-[#e11d48] transition-colors cursor-pointer"
              >
                <FiPhoneOff className="text-sm" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Main Layout Template component ───────────────────────────────────────────
export default function Template6() {
  const portfolio = usePortfolio();
  const {
    primaryColor, description, about,
    servicesSubtitle, servicesData, skills, skillCategories,
    projects, certifications, timelineData, summaryStats,
    contactInfo, testimonials, blogs, faqs,
    themeMode, sectionVisibility, sectionTitles, sectionOrder,
  } = portfolio;

  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = themeMode === "dark";
  
  // Custom design accent is pink by default, falling back nicely, otherwise dynamic
  const accent = primaryColor || "#f43f5e";

  // Dynamic Theme Colors matching Brittany Chiang's layout in dark/light mode
  const bgNavbar = isDark ? "rgba(6, 11, 19, 0.85)" : "rgba(248, 250, 252, 0.85)";
  const textColor = isDark ? "#8892b0" : "#475569";
  const textTitle = isDark ? "#f8fafc" : "#0f172a";
  const borderColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)";

  // Build ordered visible section list
  const orderedSections = (sectionOrder || [
    "About","Services","Skills","Projects","Certification",
    "Testimonials","Journey","Blogs","Faq","Contact"
  ]).filter(id => id !== "Home" && (!sectionVisibility || sectionVisibility[id] !== false));

  const getSectionNum = (id) => {
    const idx = orderedSections.indexOf(id);
    return idx !== -1 ? String(idx + 1).padStart(2, "0") : "";
  };

  const sectionProps = {
    about, servicesSubtitle, servicesData, skills, skillCategories,
    projects, certifications, timelineData, summaryStats,
    contactInfo, testimonials, blogs, faqs,
    sectionTitles, getSectionNum,
  };

  // Section scroll tracker
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
            if (window.location.hash !== `#${sectionId}`) {
              window.history.replaceState(null, "", `#${sectionId}`);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "-10% 0px -50% 0px" }
    );
    const sections = document.querySelectorAll("[data-t6-section]");
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, [orderedSections]);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      if (window.location.hash !== `#${id}`) {
        window.history.replaceState(null, "", `#${id}`);
      }
    }
    setMobileMenuOpen(false);
  }, []);

  // Scroll to initial hash on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.replace("#", "");
      const timer = setTimeout(() => {
        scrollTo(sectionId);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [scrollTo]);

  // Format nav labels to be lowercase dynamic mappings
  const NAV_ITEMS = orderedSections.map(name => ({
    id: name.toLowerCase(),
    label: name === "About" ? "about me" : (name === "Journey" ? "experience" : name === "Projects" ? "work" : name === "Blogs" ? "blog" : name === "Contact" ? "contact me" : name.toLowerCase())
  }));

  const logoName = (about?.name || "James John").toLowerCase().replace(/\s+/g, ".");
  const displayBio = about?.bio || "I'm a fullstack software engineer specializing in building exceptional software. Currently, I am focused on building products.";
  const bioParagraphs = displayBio.split("\n\n").filter(p => p.trim().length > 0);

  return (
    <div
      className="relative z-0"
      style={{
        backgroundColor: "transparent",
        color: textColor,
        minHeight: "100vh",
        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
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
        className="absolute w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-[0.12]"
        style={{
          backgroundColor: accent,
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
        <div className="w-full max-w-[90%] mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo - lowercase separated by dots */}
          <button
            onClick={() => scrollTo("home")}
            className="text-base font-black tracking-widest cursor-pointer font-mono"
            style={{ color: textTitle }}
          >
            {logoName}
          </button>

          {/* Links - formatted with numbering prefix */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs font-semibold tracking-wider transition-colors cursor-pointer normal-case font-mono"
                style={{
                  color: activeSection === item.id ? textTitle : textColor
                }}
              >
                <span style={{ color: accent, marginRight: "4px" }}>0{idx + 1}.</span>
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
              className="md:hidden w-full absolute top-20 left-0 border-b py-6 px-6 flex flex-col gap-4 text-left shadow-lg"
              style={{
                backgroundColor: bgNavbar,
                borderColor: borderColor,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              {NAV_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-xs font-semibold tracking-wider text-left py-2 font-mono"
                  style={{
                    color: activeSection === item.id ? textTitle : textColor
                  }}
                >
                  <span style={{ color: accent, marginRight: "6px" }}>0{idx + 1}.</span>
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
        className="min-h-[85vh] flex items-center py-20 px-6 relative w-full max-w-[90%] mx-auto"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          {/* Left Hero Text */}
          <div className="md:col-span-7 text-left space-y-6">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
              style={{ color: textTitle, lineHeight: 1.1 }}
            >
              I<span style={{ color: accent }}>'</span>m {about?.name || "James John"}<span style={{ color: accent }}>.</span>
            </h1>
            <p className="text-sm md:text-base leading-relaxed max-w-lg" style={{ color: textColor }}>
              {description || about.bio || "I'm a fullstack software engineer specializing in building exceptional software. Currently, I am focused on building products."}
            </p>
            <p className="text-xs md:text-sm font-semibold tracking-wide" style={{ color: textColor }}>
              The world is better with my code in it.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => scrollTo("about")}
                className="px-6 py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer border font-mono tracking-widest"
                style={{
                  borderColor: accent,
                  color: accent,
                  backgroundColor: "transparent"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${accent}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Check out my work!
              </button>
            </div>
          </div>

          {/* Right Code Editor Card */}
          <div className="md:col-span-5 flex justify-center items-center relative">
            <CodeEditor
              skills={skills}
              accent={accent}
              isDark={isDark}
            />
          </div>
        </div>
      </section>

      <React.Suspense fallback={
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
          <div
            className="animate-spin"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "3px solid transparent",
              borderTopColor: accent,
              borderRightColor: accent,
            }}
          />
        </div>
      }>
        {orderedSections.map((sectionName) => {
          // Custom render the About section to perfectly fit the mockup design
          if (sectionName === "About") {
            return (
              <section
                key={sectionName}
                id="about"
                data-t6-section
                className="min-h-[80vh] flex flex-col py-16 px-6 relative overflow-hidden w-full max-w-[90%] mx-auto"
              >
                <div className="flex items-center gap-3 mb-12">
                  <span className="text-3xl font-extrabold" style={{ color: accent }}>01.</span>
                  <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: textTitle }}>
                    {sectionTitles?.About || "About Me"}
                  </h2>
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${accent}30)` }} />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Biography text */}
                  <div className="lg:col-span-7 text-left space-y-4">
                    {bioParagraphs.map((p, idx) => (
                      <p key={idx} className="text-sm md:text-base leading-relaxed" style={{ color: textColor }}>
                        {p}
                      </p>
                    ))}
                  </div>
                  
                  {/* Photo / Video call mock */}
                  <div className="lg:col-span-5 flex justify-center">
                    <VideoCallMock
                      avatarUrl={about.avatarUrl}
                      accent={accent}
                      isDark={isDark}
                      name={about.name}
                    />
                  </div>
                </div>
              </section>
            );
          }

          const renderer = SECTION_COMPONENTS[sectionName];
          return renderer ? (
            <div key={sectionName} id={sectionName.toLowerCase()} data-t6-section>
              {renderer(sectionProps)}
            </div>
          ) : null;
        })}
      </React.Suspense>

      {/* FOOTER */}
      <footer className="border-t py-12 px-6" style={{ borderColor: borderColor, backgroundColor: isDark ? "#030712" : "#f8fafc" }}>
        <div className="w-full max-w-[90%] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider">
            &copy; 2026 {about.name || "James John"}. All rights reserved.
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
