import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaMedium } from "react-icons/fa";
import {
  FiCode, FiExternalLink, FiMail, FiPhone, FiMapPin, FiMenu, FiX, FiCheck
} from "react-icons/fi";
import { HiHome, HiBriefcase, HiOutlineUser, HiEnvelope } from "react-icons/hi2";
import { SERVICES_DATA, SERVICE_ICONS } from "../constants";
import avatar from "../assets/avatar.png";
import resumePdf from "../assets/resume.pdf";
import { downloadPdf } from "../utils/pdf";

const SOCIAL_ICONS = {
  FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaMedium
};

// Typewriter Effect Component
const Typewriter = ({ roles = [] }) => {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const speed = deleting ? 30 : 60;

  useEffect(() => {
    if (!roles.length) return;
    const current = roles[idx] || "";
    const timer = setTimeout(() => {
      if (!deleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(current.slice(0, displayed.length - 1));
        } else {
          setDeleting(false);
          setIdx((i) => (i + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, deleting, idx, speed, roles]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse" style={{ animationDuration: "0.8s" }}>|</span>
    </span>
  );
};

export default function Template3Page({
  primaryColor = "#00D5D5",
  roles = [],
  description = "",
  about = {},
  servicesData = [],
  skills = [],
  projects = [],
  testimonials = [],
  blogs = [],
  faqs = [],
  sectionVisibility = {},
  summaryStats = [],
  contactInfo = {},
  themeMode = "dark",
}) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pageContainerRef = useRef(null);

  const accent = primaryColor;
  const isDark = themeMode === "dark";

  // Dynamic Theme Colors
  const bgMain = isDark ? "#080b11" : "#f8fafc";
  const bgCard = isDark ? "#0e131f" : "#ffffff";
  const bgNavbar = isDark ? "rgba(8, 11, 17, 0.85)" : "rgba(248, 250, 252, 0.85)";
  const textColor = isDark ? "#94a3b8" : "#475569";
  const textTitle = isDark ? "#f8fafc" : "#0f172a";
  const textMuted = isDark ? "#4b5563" : "#94a3b8";
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  const services = servicesData && servicesData.length > 0 ? servicesData : SERVICES_DATA;
  const displayRoles = roles && roles.length > 0 ? roles : (about.professionalTitles || ["Developer"]);

  // Scroll section observer
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
    const sections = document.querySelectorAll("[data-t3-section]");
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
    { id: "services", label: "What I Do", visibilityKey: "Services" },
    { id: "projects", label: "Featured Projects", visibilityKey: "Projects" },
    { id: "about", label: "About Me", visibilityKey: "About" },
    { id: "contact", label: "Contact Me", visibilityKey: "Contact" },
  ].filter((item) => {
    if (!item.visibilityKey) return true;
    return sectionVisibility[item.visibilityKey] !== false;
  });

  return (
    <div
      ref={pageContainerRef}
      style={{
        backgroundColor: bgMain,
        color: textColor,
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Dynamic Favicon Accent Style */}
      <style>{`
        .t3-glow-hover:hover {
          box-shadow: 0 0 25px ${accent}25;
          border-color: ${accent}40 !important;
        }
        @keyframes t3-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes t3-counter-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .t3-orbit-ring {
          animation: t3-orbit 25s linear infinite;
        }
        .t3-orbit-item {
          animation: t3-counter-orbit 25s linear infinite;
        }
      `}</style>

      {/* HEADER / STICKY NAVBAR */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: bgNavbar,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${borderColor}`,
          transition: "background-color 0.3s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="text-xl font-black tracking-tighter text-left cursor-pointer"
            style={{ color: textTitle }}
          >
            Leloud<span style={{ color: accent }}>.</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                style={{
                  color: activeSection === item.id ? accent : textTitle,
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* View Resume Button (Desktop) */}
          <div className="hidden md:block">
            <button
              onClick={() => downloadPdf(about.resumeUrl || resumePdf, about.resumeFileName || "Resume.pdf")}
              className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border"
              style={{
                borderColor: accent,
                color: isDark ? "#ffffff" : textTitle,
                backgroundColor: `${accent}15`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = accent;
                e.currentTarget.style.color = "#000000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${accent}15`;
                e.currentTarget.style.color = isDark ? "#ffffff" : textTitle;
              }}
            >
              View Resume
            </button>
          </div>

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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden w-full absolute top-20 left-0 bg-stone-950 border-b border-stone-900 py-6 px-6 flex flex-col gap-4 text-left"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-sm font-bold uppercase tracking-wider text-left py-2"
                  style={{
                    color: activeSection === item.id ? accent : "#cbd5e1",
                  }}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  downloadPdf(about.resumeUrl || resumePdf, about.resumeFileName || "Resume.pdf");
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider mt-2 border"
                style={{
                  borderColor: accent,
                  color: "#ffffff",
                  backgroundColor: `${accent}15`,
                }}
              >
                View Resume
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section
        id="home"
        data-t3-section
        className="min-h-[85vh] flex items-center py-20 relative px-6"
      >
        <div className="max-w-4xl mx-auto w-full text-center flex flex-col items-center gap-6 z-10">
          {/* Availability Badge */}
          <div
            className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full border text-[10px] font-bold uppercase tracking-widest"
            style={{
              backgroundColor: `${accent}12`,
              borderColor: `${accent}30`,
              color: accent,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {about.statusBadgeText || "Available for work"}
          </div>

          {/* Name */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight"
            style={{ color: textTitle, lineHeight: 1.1 }}
          >
            Hi, I am <span style={{ color: accent }}>{about.name || "Daniel Ochi"}</span>
          </h1>

          {/* Typewriter role subtitles */}
          <div
            className="text-md sm:text-lg font-bold tracking-wide min-h-[28px]"
            style={{ color: textTitle }}
          >
            A seasoned <span style={{ color: accent }}><Typewriter roles={displayRoles} /></span>
          </div>

          {/* Description info */}
          <p
            className="text-sm sm:text-base leading-relaxed max-w-2xl mt-2"
            style={{ color: textColor }}
          >
            {description || about.bio || "Transforming complex requirements into simple, beautifully executed web architectures."}
          </p>

          {/* Social icons row */}
          <div className="flex items-center gap-3 mt-6">
            {(about.socialLinks || []).map((link, i) => {
              const Icon = SOCIAL_ICONS[link.icon] || FaGithub;
              return (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all t3-glow-hover"
                  style={{
                    borderColor: borderColor,
                    backgroundColor: "transparent",
                    color: textTitle,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = accent;
                    e.currentTarget.style.color = accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = borderColor;
                    e.currentTarget.style.color = textTitle;
                  }}
                >
                  <Icon className="text-sm" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Backdrop Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] select-none"
          style={{
            backgroundImage: `radial-gradient(${accent} 1px, transparent 1.5px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </section>

      {/* SERVICES (WHAT I DO) SECTION */}
      {(!sectionVisibility || sectionVisibility.Services !== false) && (
        <section
          id="services"
          data-t3-section
          className="py-24 border-t px-6"
          style={{ borderColor: borderColor }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-left mb-16">
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono" style={{ color: accent }}>
                Services
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1" style={{ color: textTitle }}>
                What I do<span style={{ color: accent }}>.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((svc, i) => {
                const Icon = SERVICE_ICONS[svc.icon] || FiCode;
                const paddedIndex = String(i + 1).padStart(2, "0");
                return (
                  <motion.div
                    key={i}
                    className="p-8 rounded-3xl border text-left flex flex-col justify-between min-h-[240px] relative transition-all t3-glow-hover"
                    style={{
                      backgroundColor: bgCard,
                      borderColor: borderColor,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    {/* Index tag */}
                    <span
                      className="absolute top-6 right-8 text-2xl font-black select-none opacity-25"
                      style={{ color: accent }}
                    >
                      {paddedIndex}
                    </span>

                    {/* Icon container */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8 border"
                      style={{
                        backgroundColor: `${accent}08`,
                        borderColor: `${accent}25`,
                        color: accent,
                      }}
                    >
                      <Icon className="text-lg" />
                    </div>

                    {/* Body */}
                    <div>
                      <h4 className="text-md font-bold mb-3" style={{ color: textTitle }}>
                        {svc.title}
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: textColor }}>
                        {svc.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED PROJECTS SECTION */}
      {(!sectionVisibility || sectionVisibility.Projects !== false) && (
        <section
          id="projects"
          data-t3-section
          className="py-24 border-t px-6"
          style={{ borderColor: borderColor }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-left mb-16">
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono" style={{ color: accent }}>
                Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1" style={{ color: textTitle }}>
                Featured projects<span style={{ color: accent }}>.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((proj, i) => {
                return (
                  <motion.div
                    key={i}
                    className="rounded-3xl border overflow-hidden text-left transition-all t3-glow-hover"
                    style={{
                      backgroundColor: bgCard,
                      borderColor: borderColor,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                  >
                    {/* Project Image */}
                    <div className="h-48 overflow-hidden bg-stone-900 border-b relative group" style={{ borderColor: borderColor }}>
                      {proj.image ? (
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-stone-600 font-bold uppercase bg-stone-950 font-mono">
                          NO PROJECT THUMBNAIL
                        </div>
                      )}
                      {/* Accent glow on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        {proj.liveLink && (
                          <a
                            href={proj.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg hover:scale-110 transition-transform"
                          >
                            <FiExternalLink className="text-sm" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="text-[9px] font-bold uppercase tracking-widest font-mono block mb-1" style={{ color: accent }}>
                        {proj.category || "Full-Stack Project"}
                      </span>
                      <h4 className="text-md font-bold mb-2 text-white hover:text-primary transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: textColor }}>
                        {proj.synopsis}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ABOUT ME SECTION */}
      {(!sectionVisibility || sectionVisibility.About !== false) && (
        <section
          id="about"
          data-t3-section
          className="py-24 border-t px-6"
          style={{ borderColor: borderColor }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-left mb-16">
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono" style={{ color: accent }}>
                Biography
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1" style={{ color: textTitle }}>
                About me<span style={{ color: accent }}>.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column: Rotating Tech stack Ring and Avatar */}
              <div className="flex justify-center items-center relative py-8">
                {/* Orbit path ring */}
                <div
                  className="absolute rounded-full border border-dashed pointer-events-none opacity-20"
                  style={{
                    width: "280px",
                    height: "280px",
                    borderColor: accent,
                  }}
                />

                {/* Avatar circle */}
                <div
                  className="relative w-48 h-48 rounded-full overflow-hidden border-4 shrink-0 shadow-xl"
                  style={{
                    borderColor: accent,
                    boxShadow: `0 20px 40px ${accent}15`,
                  }}
                >
                  <img
                    src={about.avatarUrl || avatar}
                    alt={about.name || "Developer Portrait"}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Orbiting Stacks Icons */}
                <div className="absolute w-[280px] h-[280px] pointer-events-none t3-orbit-ring">
                  {[
                    { text: "JS", left: "140px", top: "0px" },
                    { text: "React", left: "260px", top: "70px" },
                    { text: "CSS", left: "260px", top: "210px" },
                    { text: "HTML", left: "140px", top: "280px" },
                    { text: "Tailwind", left: "20px", top: "210px" },
                    { text: "Node", left: "20px", top: "70px" },
                  ].map((orb, index) => {
                    return (
                      <div
                        key={index}
                        className="absolute"
                        style={{
                          left: orb.left,
                          top: orb.top,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div
                          className="t3-orbit-item w-9 h-9 rounded-full bg-stone-900 border flex items-center justify-center text-[8.5px] font-extrabold uppercase font-mono shadow-md"
                          style={{
                            borderColor: borderColor,
                            color: accent,
                            boxShadow: `0 0 10px ${accent}10`,
                          }}
                        >
                          {orb.text}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Bio details and Capsule Skills */}
              <div className="text-left flex flex-col gap-6">
                <p className="text-sm leading-relaxed" style={{ color: textColor }}>
                  {about.bio || "Full stack developer with multiple years of industry experience. Creating optimized backend processes, premium visual designs, and dynamic micro-animations."}
                </p>

                {/* Core Skills pills */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                    Technical skills
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {skills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold py-1.5 px-4 rounded-full border transition-colors hover:bg-stone-900"
                        style={{
                          borderColor: borderColor,
                          color: textTitle,
                          backgroundColor: bgCard,
                        }}
                      >
                        {sk.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => downloadPdf(about.resumeUrl || resumePdf, about.resumeFileName || "Resume.pdf")}
                    className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border"
                    style={{
                      borderColor: accent,
                      color: isDark ? "#ffffff" : textTitle,
                      backgroundColor: `${accent}15`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = accent;
                      e.currentTarget.style.color = "#000000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${accent}15`;
                      e.currentTarget.style.color = isDark ? "#ffffff" : textTitle;
                    }}
                  >
                    View Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONTACT ME SECTION */}
      {(!sectionVisibility || sectionVisibility.Contact !== false) && (
        <section
          id="contact"
          data-t3-section
          className="py-24 border-t px-6"
          style={{ borderColor: borderColor }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-left mb-16">
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono" style={{ color: accent }}>
                Let's Connect
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1" style={{ color: textTitle }}>
                Contact me<span style={{ color: accent }}>.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left info column */}
              <div className="text-left flex flex-col justify-between">
                <div className="space-y-6">
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    Have an awesome project idea?<br />
                    <span style={{ color: accent }}>Let's Discuss.</span>
                  </h3>
                  <p className="text-xs leading-relaxed max-w-md" style={{ color: textColor }}>
                    I am currently open to full time, contract or part time opportunities in{" "}
                    {about.title || "Software Engineering"}. Feel free to contact me.
                  </p>
                </div>

                {/* Contact details */}
                <div className="space-y-4 mt-8 lg:mt-0">
                  {contactInfo.phone && (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border border-stone-800 bg-stone-900/40 flex items-center justify-center shrink-0">
                        <FiPhone className="text-sm" style={{ color: accent }} />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-stone-500 block">Phone</span>
                        <a href={`tel:${contactInfo.phone}`} className="text-xs font-bold text-white hover:text-primary transition-colors">
                          {contactInfo.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {contactInfo.email && (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border border-stone-800 bg-stone-900/40 flex items-center justify-center shrink-0">
                        <FiMail className="text-sm" style={{ color: accent }} />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-stone-500 block">Email Address</span>
                        <a href={`mailto:${contactInfo.email}`} className="text-xs font-bold text-white hover:text-primary transition-colors">
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {contactInfo.address && (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border border-stone-800 bg-stone-900/40 flex items-center justify-center shrink-0">
                        <FiMapPin className="text-sm" style={{ color: accent }} />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-stone-500 block">Location</span>
                        <span className="text-xs font-bold text-white block">
                          {contactInfo.address}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Form Column */}
              <div
                className="p-8 rounded-3xl border text-left"
                style={{
                  backgroundColor: bgCard,
                  borderColor: borderColor,
                }}
              >
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs outline-none text-white transition-colors focus:border-primary"
                      style={{ focusBorderColor: accent }}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs outline-none text-white transition-colors focus:border-primary"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Your message details..."
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs outline-none text-white resize-none transition-colors focus:border-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    style={{
                      backgroundColor: accent,
                      color: "#000000",
                      boxShadow: `0 4px 20px ${accent}25`,
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t py-12 px-6" style={{ borderColor: borderColor, backgroundColor: isDark ? "#06080d" : "#f1f5f9" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-sm font-black text-white">
            Leloud<span style={{ color: accent }}>.</span>
          </span>

          <nav className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider">
            &copy; 2026 {about.name || "Leloud"}. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
