import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";
import { FiCode, FiArrowRight, FiCheckCircle, FiSmile } from "react-icons/fi";
import { HiHome, HiOutlineUser, HiBriefcase, HiEnvelope } from "react-icons/hi2";
import { SERVICES_DATA, SERVICE_ICONS } from "../constants";
import avatar from "../assets/avatar.png";

const SOCIAL_ICONS = {
  FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaGlobe
};

export default function Template5Page({
  primaryColor = "#10b981", // defaults to emerald/green accent
  roles = [],
  description = "",
  about = {},
  servicesData = [],
  skills = [],
  projects = [],
  testimonials = [],
  contactInfo = {},
  themeMode = "dark",
  sectionVisibility = {}
}) {
  const [activeSection, setActiveSection] = useState("home");
  const isDark = themeMode === "dark";
  const accent = primaryColor;

  // Dynamic Theme Colors
  const bgMain = isDark ? "#0f0f11" : "#fbfbfb";
  const bgCard = isDark ? "#17171e" : "#ffffff";
  const bgNavbar = isDark ? "rgba(15, 15, 17, 0.85)" : "rgba(251, 251, 251, 0.85)";
  const textColor = isDark ? "#a1a1aa" : "#4b5563";
  const textTitle = isDark ? "#ffffff" : "#18181b";
  const textSub = isDark ? "#71717a" : "#71717a";
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  const services = servicesData && servicesData.length > 0 ? servicesData : SERVICES_DATA;
  const displayRoles = roles && roles.length > 0 ? roles : (about.professionalTitles || ["Developer"]);

  // Scroll observer
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
    const sections = document.querySelectorAll("[data-t5-section]");
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const NAV_ITEMS = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Me", visibilityKey: "About" },
    { id: "services", label: "Services", visibilityKey: "Services" },
    { id: "projects", label: "Projects", visibilityKey: "Projects" },
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
        fontFamily: "'Outfit', 'Inter', sans-serif",
        overflowX: "hidden"
      }}
    >
      <style>{`
        .t5-hover-card:hover {
          transform: translateY(-5px);
          border-color: ${accent}35 !important;
          box-shadow: 0 10px 30px ${accent}0a;
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
            className="text-lg font-black tracking-tight text-white cursor-pointer"
          >
            {about.name || "JOHN DOE"}
          </button>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                style={{
                  color: activeSection === item.id ? accent : textTitle
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Contact Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollTo("contact")}
              className="px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer text-white"
              style={{
                backgroundColor: accent,
                boxShadow: `0 4px 14px ${accent}30`
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              Contact me
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        id="home"
        data-t5-section
        className="min-h-[85vh] flex items-center py-20 px-6 relative"
      >
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div className="text-left space-y-6">
            <span
              className="text-xs font-bold uppercase tracking-wider font-mono"
              style={{ color: accent }}
            >
              HELLO, I AM
            </span>
            <h1
              className="text-5xl sm:text-6xl font-extrabold tracking-tight"
              style={{ color: textTitle, lineHeight: 1.1 }}
            >
              {about.name || "JOHN DOE"}
            </h1>
            <div className="inline-flex py-1 px-3 rounded bg-zinc-800 text-[11px] font-bold text-white uppercase tracking-widest">
              {displayRoles[0] || "I AM WEB DEVELOPER"}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed max-w-lg">
              {description || about.bio || "Crafting robust interfaces and backend code."}
            </p>
            <div className="pt-2">
              <button
                onClick={() => scrollTo("contact")}
                className="px-8 py-3 rounded-full text-xs font-bold transition-all cursor-pointer text-white"
                style={{
                  backgroundColor: accent,
                  boxShadow: `0 6px 18px ${accent}35`
                }}
              >
                Contact
              </button>
            </div>
          </div>

          {/* Right Image with statistics overlapping badges */}
          <div className="flex justify-center items-center relative">
            {/* Glowing circle container backdrop */}
            <div
              className="w-80 h-80 rounded-full relative flex items-center justify-center overflow-visible"
              style={{
                backgroundColor: `${accent}10`,
                border: `1.5px solid ${accent}15`,
                boxShadow: `0 0 50px ${accent}08`
              }}
            >
              <div className="w-[85%] h-[85%] rounded-full overflow-hidden border-4 border-zinc-900 bg-zinc-850 z-10 shrink-0">
                <img
                  src={about.avatarUrl || avatar}
                  alt={about.name || "Developer Portrait"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Stats Badges */}
              <div
                className="absolute -bottom-4 -left-6 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow-xl z-20 text-left transition-transform hover:scale-105"
                style={{ borderColor: `${accent}25` }}
              >
                <div style={{ color: accent, fontSize: "16px", fontWeight: 800, lineHeight: 1 }}>
                  6 +
                </div>
                <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold mt-1">
                  Years of<br />Experience
                </div>
              </div>

              <div
                className="absolute top-8 -right-6 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow-xl z-20 text-left transition-transform hover:scale-105"
                style={{ borderColor: `${accent}25` }}
              >
                <div style={{ color: accent, fontSize: "16px", fontWeight: 800, lineHeight: 1 }}>
                  100 +
                </div>
                <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold mt-1">
                  Completed<br />Projects
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES (WHAT I DO) */}
      {(!sectionVisibility || sectionVisibility.Services !== false) && (
        <section
          id="services"
          data-t5-section
          className="py-24 px-6 bg-zinc-950/20 border-t"
          style={{ borderColor: borderColor }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight uppercase" style={{ color: textTitle }}>
                WHAT I DO
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider mt-1 block" style={{ color: accent }}>
                My Services
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.slice(0, 3).map((svc, i) => {
                const Icon = SERVICE_ICONS[svc.icon] || FiCode;
                return (
                  <motion.div
                    key={i}
                    className="p-8 rounded-3xl border text-left flex flex-col justify-between min-h-[220px] transition-all t5-hover-card"
                    style={{
                      backgroundColor: bgCard,
                      borderColor: borderColor
                    }}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    <div className="space-y-4">
                      <div className="text-2xl text-white">
                        <Icon style={{ color: accent }} />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                        {svc.title}
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: textColor }}>
                        {svc.description}
                      </p>
                    </div>

                    <button
                      onClick={() => scrollTo("contact")}
                      className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 mt-8 cursor-pointer hover:underline text-left self-start"
                      style={{ color: textTitle }}
                    >
                      <span>say hello</span>
                      <FiArrowRight style={{ color: accent }} />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* PORTFOLIO (CASES) */}
      {(!sectionVisibility || sectionVisibility.Projects !== false) && (
        <section
          id="projects"
          data-t5-section
          className="py-24 px-6 border-t"
          style={{ borderColor: borderColor }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight uppercase" style={{ color: textTitle }}>
                PORTFOLIO
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider mt-1 block" style={{ color: accent }}>
                My Cases
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((proj, i) => {
                return (
                  <motion.div
                    key={i}
                    className="rounded-3xl border overflow-hidden text-left transition-all t5-hover-card"
                    style={{
                      backgroundColor: bgCard,
                      borderColor: borderColor
                    }}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    {/* Image */}
                    <div className="h-44 bg-zinc-900 overflow-hidden relative">
                      {proj.image ? (
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-zinc-600 font-mono">
                          NO PROJECT THUMBNAIL
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <span className="text-[8px] font-bold uppercase tracking-widest font-mono block" style={{ color: accent }}>
                        {proj.category || "Full-Stack"}
                      </span>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                        {proj.title}
                      </h4>
                      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: textColor }}>
                        {proj.synopsis}
                      </p>

                      {proj.liveLink && (
                        <a
                          href={proj.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mt-4 hover:underline text-white"
                        >
                          <span>See Project</span>
                          <FiArrowRight style={{ color: accent }} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section
          className="py-24 px-6 bg-zinc-950/20 border-t"
          style={{ borderColor: borderColor }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight uppercase" style={{ color: textTitle }}>
                TESTIMONIALS
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider mt-1 block" style={{ color: accent }}>
                What my Clients are saying
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((t, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-3xl border text-left flex flex-col justify-between transition-all t5-hover-card"
                  style={{
                    backgroundColor: bgCard,
                    borderColor: borderColor
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <p className="text-xs leading-relaxed italic" style={{ color: textColor }}>
                    "{t.text}"
                  </p>

                  <div className="flex items-center gap-3 border-t border-zinc-800/40 pt-4 mt-6">
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 bg-zinc-900 border border-zinc-850" style={{ color: accent }}>
                        {t.name?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-bold text-white">{t.name}</div>
                      <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ABOUT ME BIOGRAPHY EXTRA STATS */}
      {(!sectionVisibility || sectionVisibility.About !== false) && (
        <section
          id="about"
          data-t5-section
          className="py-24 px-6 border-t"
          style={{ borderColor: borderColor }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white mb-6">
              Biography
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto mb-12">
              {about.bio || "Custom coding professional building efficient React apps, scalable APIs, and pixel perfect layouts."}
            </p>

            <div className="flex flex-wrap gap-2.5 justify-center">
              {skills.map((sk, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-bold py-1.5 px-4 rounded-full border bg-zinc-900/60"
                  style={{
                    borderColor: borderColor,
                    color: textTitle
                  }}
                >
                  {sk.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      {(!sectionVisibility || sectionVisibility.Contact !== false) && (
        <section
          id="contact"
          data-t5-section
          className="py-24 px-6 border-t"
          style={{ borderColor: borderColor }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight uppercase" style={{ color: textTitle }}>
                CONTACT
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider mt-1 block" style={{ color: accent }}>
                Are You Looking For Your Business Online Presence? I am here. 😊
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Name & Role */}
              <div
                className="p-8 rounded-3xl border text-center transition-all t5-hover-card"
                style={{
                  backgroundColor: bgCard,
                  borderColor: borderColor
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm mx-auto mb-4 bg-zinc-900 border border-zinc-800" style={{ color: accent }}>
                  <HiOutlineUser />
                </div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-2">
                  Developer
                </h4>
                <span className="text-sm font-black text-white block">
                  {about.name || "John Doe"}
                </span>
                <span className="text-[10px] text-zinc-500 font-bold block mt-1">
                  {displayRoles[0] || "Web Developer"}
                </span>
              </div>

              {/* Card 2: Availability */}
              <div
                className="p-8 rounded-3xl border text-center transition-all t5-hover-card"
                style={{
                  backgroundColor: bgCard,
                  borderColor: borderColor
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm mx-auto mb-4 bg-zinc-900 border border-zinc-800" style={{ color: accent }}>
                  <HiBriefcase />
                </div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-2">
                  Availability
                </h4>
                <span className="text-sm font-black text-white block">
                  Freelance
                </span>
                <span className="text-[10px] text-zinc-500 font-bold block mt-1">
                  {about.statusBadgeText || "Available Right Now"}
                </span>
              </div>

              {/* Card 3: Email */}
              <div
                className="p-8 rounded-3xl border text-center transition-all t5-hover-card"
                style={{
                  backgroundColor: bgCard,
                  borderColor: borderColor
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm mx-auto mb-4 bg-zinc-900 border border-zinc-800" style={{ color: accent }}>
                  <HiEnvelope />
                </div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-2">
                  Email
                </h4>
                <span className="text-sm font-black text-white block truncate">
                  {contactInfo.email || "john.doe@gmail.com"}
                </span>
                <span className="text-[10px] text-zinc-500 font-bold block mt-1">
                  Get in touch
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t py-12 px-6" style={{ borderColor: borderColor, backgroundColor: isDark ? "#08080a" : "#f1f1f3" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-4">
            {(about.socialLinks || []).map((link, i) => {
              const Icon = SOCIAL_ICONS[link.icon] || FaGlobe;
              return (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-zinc-850 bg-zinc-900/60 flex items-center justify-center text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  <Icon />
                </a>
              );
            })}
          </div>

          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
            &copy; 2026 {about.name || "JOHN DOE"}. All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
