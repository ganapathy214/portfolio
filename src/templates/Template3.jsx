import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaMedium } from "react-icons/fa";
import {
  FiCode, FiExternalLink, FiMail, FiPhone, FiMapPin, FiMenu, FiX, FiCheck
} from "react-icons/fi";
import { HiHome, HiBriefcase, HiOutlineUser, HiEnvelope } from "react-icons/hi2";
import { SERVICES_DATA, SERVICE_ICONS } from "../constants";

import resumePdf from "../assets/resume.pdf";
import { downloadPdf } from "../utils/pdf";
import { usePortfolio } from "../context/PortfolioContext";

const About         = React.lazy(() => import("../sections/About"));
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
  About:         (props) => <About         about={props.about}             title={props.sectionTitles?.About}         sectionNum={props.getSectionNum("About")} />,
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

export default function Template3() {
  const portfolio = usePortfolio();
  const {
    primaryColor, roles, description, about,
    servicesSubtitle, servicesData, skills, skillCategories,
    projects, certifications, timelineData, summaryStats,
    contactInfo, testimonials, blogs, faqs,
    themeMode, sectionVisibility, sectionTitles, sectionOrder,
  } = portfolio;

  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pageContainerRef = useRef(null);

  const accent = primaryColor || "#00D5D5";
  const isDark = themeMode === "dark";

  // Dynamic Theme Colors
  const bgNavbar = isDark ? "rgba(8, 11, 17, 0.85)" : "rgba(248, 250, 252, 0.85)";
  const textColor = isDark ? "#94a3b8" : "#475569";
  const textTitle = isDark ? "#f8fafc" : "#0f172a";
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  const displayRoles = roles && roles.length > 0 ? roles : (about?.professionalTitles || ["Developer"]);

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
  }, [orderedSections]);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of sticky header
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  }, []);

  const NAV_ITEMS = [
    { id: "home", label: "Home" },
    ...orderedSections.map(name => ({
      id: name.toLowerCase(),
      label: name === "Faq" ? "FAQ" : (name === "Certification" ? "Certifications" : name),
    }))
  ];

  return (
    <div
      ref={pageContainerRef}
      className="relative z-0"
      style={{
        backgroundColor: "transparent",
        color: textColor,
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
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
              className="md:hidden w-full absolute top-20 left-0 border-b py-6 px-6 flex flex-col gap-4 text-left shadow-lg"
              style={{
                backgroundColor: bgNavbar,
                borderColor: borderColor,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-sm font-bold uppercase tracking-wider text-left py-2"
                  style={{
                    color: activeSection === item.id ? accent : textColor,
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
                  color: textTitle,
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
          const renderer = SECTION_COMPONENTS[sectionName];
          return renderer ? (
            <div key={sectionName} id={sectionName.toLowerCase()} data-t3-section>
              {renderer(sectionProps)}
            </div>
          ) : null;
        })}
      </React.Suspense>

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
