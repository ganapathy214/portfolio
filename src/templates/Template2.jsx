import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import {
  FiChevronRight, FiArrowUp,
} from "react-icons/fi";
import {
  HiOutlineUser, HiBriefcase, HiCodeBracket, HiEnvelope,
  HiOutlineCog, HiChatBubbleLeftRight, HiBookOpen, HiHome,
  HiQuestionMarkCircle, HiRocketLaunch,
} from "react-icons/hi2";
import { GrCertificate } from "react-icons/gr";
import { SERVICES_DATA } from "../constants";
import { DEFAULT_ABOUT } from "../constants";
import avatar from "../assets/avatar.png";
import resumePdf from "../assets/resume.pdf";
import { downloadPdf } from "../utils/pdf";
import { usePortfolio } from "../context/PortfolioContext";
import SectionWrapper from "../components/common/SectionWrapper";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

import Home from "../sections/Home";

const About         = React.lazy(() => import("../sections/About"));
const Services      = React.lazy(() => import("../sections/Services"));
const Skills        = React.lazy(() => import("../sections/Skills"));
const Projects      = React.lazy(() => import("../sections/Projects"));
const Certification = React.lazy(() => import("../sections/Certification"));
const Testimonials  = React.lazy(() => import("../sections/Testimonials"));
const Experience    = React.lazy(() => import("../sections/Experience"));
const Education     = React.lazy(() => import("../sections/Education"));
const Blogs         = React.lazy(() => import("../sections/Blogs"));
const Faq           = React.lazy(() => import("../sections/Faq"));
const Contact       = React.lazy(() => import("../sections/Contact"));

const SECTION_COMPONENTS = {
  About:         (props) => <About         about={props.about}             title={props.sectionTitles?.About}         sectionNum={props.getSectionNum("About")}         design={props.sectionLayouts?.About} />,
  Services:      (props) => <Services      servicesSubtitle={props.servicesSubtitle} servicesData={props.servicesData} title={props.sectionTitles?.Services}      sectionNum={props.getSectionNum("Services")}      design={props.sectionLayouts?.Services} />,
  Skills:        (props) => <Skills        skills={props.skills}           skillCategories={props.skillCategories}    title={props.sectionTitles?.Skills}         sectionNum={props.getSectionNum("Skills")}        design={props.sectionLayouts?.Skills} />,
  Projects:      (props) => <Projects      projects={props.projects}                                                  title={props.sectionTitles?.Projects}       sectionNum={props.getSectionNum("Projects")}      design={props.sectionLayouts?.Projects} />,
  Certification: (props) => <Certification certifications={props.certifications}                                       title={props.sectionTitles?.Certification}  sectionNum={props.getSectionNum("Certification")} design={props.sectionLayouts?.Certification} />,
  Testimonials:  (props) => <Testimonials  testimonials={props.testimonials}                                           title={props.sectionTitles?.Testimonials}   sectionNum={props.getSectionNum("Testimonials")}  design={props.sectionLayouts?.Testimonials} />,
  Experience:    (props) => <Experience    timelineData={props.timelineData}                                           title={props.sectionTitles?.Experience}   sectionNum={props.getSectionNum("Experience")}  design={props.sectionLayouts?.Experience} />,
  Education:     (props) => <Education     timelineData={props.timelineData}                                           title={props.sectionTitles?.Education}    sectionNum={props.getSectionNum("Education")}   design={props.sectionLayouts?.Education} />,
  Blogs:         (props) => <Blogs         blogs={props.blogs}                                                        title={props.sectionTitles?.Blogs}          sectionNum={props.getSectionNum("Blogs")}         design={props.sectionLayouts?.Blogs} />,
  Faq:           (props) => <Faq           faqs={props.faqs}                                                          title={props.sectionTitles?.Faq}            sectionNum={props.getSectionNum("Faq")}          design={props.sectionLayouts?.Faq} />,
  Contact:       (props) => <Contact       contactInfo={props.contactInfo}                                             title={props.sectionTitles?.Contact}        sectionNum={props.getSectionNum("Contact")}       design={props.sectionLayouts?.Contact} />,
};

/* ─── Social icon map ─────────────────────────── */
const SOCIAL_ICONS = {
  FaLinkedinIn, FaGithub, FaTwitter, FaInstagram,
};

/* ─── Typewriter for hero ─────── */
const Typewriter = ({ roles = [] }) => {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const speed = deleting ? 35 : 70;

  useEffect(() => {
    let timer;
    const currentText = roles[idx % roles.length] || "";

    if (deleting) {
      timer = setTimeout(() => {
        setDisplayed(currentText.slice(0, displayed.length - 1));
      }, speed);
    } else {
      timer = setTimeout(() => {
        setDisplayed(currentText.slice(0, displayed.length + 1));
      }, speed);
    }

    if (!deleting && displayed === currentText) {
      timer = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && displayed === "") {
      setDeleting(false);
      setIdx(idx + 1);
    }

    return () => clearTimeout(timer);
  }, [displayed, deleting, idx, speed, roles]);

  return (
    <span>
      {displayed}
      <span style={{ opacity: 1, animation: "t2-blink 1s step-end infinite" }}>|</span>
    </span>
  );
};

/* ═══════════════════════════════════════════════
   MAIN TEMPLATE 2 PAGE
   ═══════════════════════════════════════════════ */
export default function Template2() {
  const portfolio = usePortfolio();
  const {
    primaryColor, roles, description, about,
    servicesSubtitle, servicesData, skills, skillCategories,
    projects, certifications, timelineData, summaryStats,
    contactInfo, testimonials, blogs, faqs,
    themeMode, sectionVisibility, sectionTitles, sectionOrder, copyright,
    centerSvg, orbitingStacks, sectionLayouts, navPosition,
  } = portfolio;

  const [activeSection, setActiveSection] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef(null);
  const accent = primaryColor || "#5cb85c";

  const isDark = themeMode === "dark";
  const bgMain = isDark ? "#0b0f19" : "#f3f4f6";
  const bgCard = isDark ? "#121b2d" : "#ffffff";
  const bgSidebar = isDark ? "#0f172a" : "#ffffff";
  const textColor = isDark ? "#cbd5e1" : "#1f2937";
  const textTitle = isDark ? "#ffffff" : "#111827";
  const textSub = isDark ? "#94a3b8" : "#6b7280";
  const textMuted = isDark ? "#64748b" : "#9ca3af";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb";
  const borderLight = isDark ? "rgba(255,255,255,0.05)" : "#f0f0f0";

  // Build ordered visible section list
  const orderedSections = (sectionOrder || [
    "About","Services","Skills","Projects","Certification",
    "Testimonials","Experience","Education","Blogs","Faq","Contact"
  ]).filter(id => id !== "Home" && (!sectionVisibility || sectionVisibility[id] !== false));

  const getSectionNum = (id) => {
    const idx = orderedSections.indexOf(id);
    return idx !== -1 ? String(idx + 1).padStart(2, "0") : "";
  };

  const sectionProps = {
    about, servicesSubtitle, servicesData, skills, skillCategories,
    projects, certifications, timelineData, summaryStats,
    contactInfo, testimonials, blogs, faqs,
    sectionTitles, getSectionNum, sectionLayouts,
  };

  /* ── active section tracker ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: "-10% 0px -55% 0px" }
    );
    const sections = document.querySelectorAll("[data-t2-section]");
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, [orderedSections]);

  /* ── scroll-to-top visibility ── */
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const onScroll = () => setShowScrollTop(el.scrollTop > 300);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    const container = contentRef.current;
    if (el && container) {
      const rect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      container.scrollTo({ top: rect.top - containerRect.top + container.scrollTop - 24, behavior: "smooth" });
    }
    setSidebarOpen(false);
  }, []);

  /* ── merged data ── */
  const data = { ...DEFAULT_ABOUT, ...about };
  const displayRoles = roles && roles.length > 0 ? roles : (data.professionalTitles || ["Developer"]);

  /* ── dynamic navigation items ── */
  const navItems = [
    { id: "home", label: "Home", icon: HiHome },
    ...orderedSections.map(name => {
      const icons = {
        About: HiOutlineUser,
        Services: HiBriefcase,
        Skills: HiOutlineCog,
        Projects: HiCodeBracket,
        Certification: GrCertificate,
        Testimonials: HiChatBubbleLeftRight,
        Experience: HiRocketLaunch,
        Education: HiBookOpen,
        Blogs: HiBookOpen,
        Faq: HiQuestionMarkCircle,
        Contact: HiEnvelope
      };
      return {
        id: name.toLowerCase(),
        label: name === "Faq" ? "FAQ" : (name === "Certification" ? "Certifications" : name),
        icon: icons[name] || HiOutlineUser
      };
    })
  ];

  const transitionToSection = useCallback((item) => {
    const id = item.href.replace("#", "");
    scrollTo(id);
    setActiveSection(item.name);
  }, [scrollTo]);

  return (
    <div
      className={`t2-root relative z-0 ${navPosition === "left" ? "" : "flex-col"}`}
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Inter', 'Google Sans', sans-serif",
        backgroundColor: "transparent",
        color: textColor,
      }}
    >
      <TopNavbar
        activeSection={activeSection}
        onItemClick={transitionToSection}
        sectionVisibility={sectionVisibility}
        about={about}
        primaryColor={primaryColor}
        navPosition={navPosition}
      />
      <Sidebar
        activeSection={activeSection}
        onItemClick={transitionToSection}
        sectionVisibility={sectionVisibility}
        navPosition={navPosition}
      />

      {/* ══════ MOBILE OVERLAY ══════ */}
      <AnimatePresence>
        {navPosition === "left" && sidebarOpen && (
          <motion.div
            className="t2-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              backgroundColor: isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* ══════ LEFT SIDEBAR ══════ */}
      {navPosition === "left" && (
        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen ? 0 : undefined }}
        style={{
          width: "240px",
          minWidth: "240px",
          backgroundColor: bgSidebar,
          borderRight: `1px solid ${borderColor}`,
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 50,
          overflowY: "auto",
          scrollbarWidth: "none",
          boxShadow: isDark ? "2px 0 20px rgba(0,0,0,0.3)" : "2px 0 20px rgba(0,0,0,0.06)",
        }}
        className={`t2-sidebar ${sidebarOpen ? "open" : ""}`}
      >
        {/* Profile block */}
        <div
          className="t2-profile-block"
          style={{
            padding: "32px 20px 20px",
            borderBottom: `1px solid ${borderLight}`,
            textAlign: "center",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "88px", height: "88px",
              borderRadius: "50%",
              margin: "0 auto 14px",
              overflow: "hidden",
              border: `3px solid ${accent}`,
              boxShadow: `0 0 0 4px ${accent}22`,
              flexShrink: 0,
            }}
          >
            <img
              src={data.avatarUrl || avatar}
              alt={data.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Name */}
          <h3 style={{ fontSize: "16px", fontWeight: 800, color: textTitle, marginBottom: "4px", lineHeight: 1.2 }}>
            {data.name}
          </h3>
          {/* Title */}
          <p style={{ fontSize: "11px", color: textSub, fontWeight: 600, letterSpacing: "0.04em", marginBottom: "12px" }}>
            {data.title}
          </p>

          {/* Social links */}
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
            {(data.socialLinks || []).map((link, i) => {
              if (!link) return null;
              const Icon = SOCIAL_ICONS[link.icon];
              return (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.label}
                  style={{
                    width: "30px", height: "30px",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    backgroundColor: `${accent}15`,
                    color: accent,
                    transition: "all 0.2s ease",
                    fontSize: "13px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = accent;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${accent}15`;
                    e.currentTarget.style.color = accent;
                  }}
                >
                  {Icon && <Icon />}
                </a>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav" style={{ flex: 1, padding: "12px 0" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection?.toLowerCase() === item.id?.toLowerCase();
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "11px",
                  padding: "10px 20px",
                  fontSize: "13px",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? accent : (isDark ? "#cbd5e1" : "#4b5563"),
                  backgroundColor: isActive ? `${accent}12` : "transparent",
                  border: "none",
                  borderLeft: isActive ? `3px solid ${accent}` : "3px solid transparent",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.01em",
                  textTransform: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.04)" : "#f9fafb";
                    e.currentTarget.style.color = textTitle;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = isDark ? "#cbd5e1" : "#4b5563";
                  }
                }}
              >
                <Icon style={{ fontSize: "16px", flexShrink: 0, opacity: isActive ? 1 : 0.65 }} />
                <span>{item.label}</span>
                {isActive && (
                  <FiChevronRight style={{ marginLeft: "auto", fontSize: "13px", opacity: 0.7 }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Hire Me button */}
        <div style={{ padding: "16px 20px 24px", borderTop: `1px solid ${borderLight}` }}>
          <button
            onClick={() => scrollTo("contact")}
            style={{
              width: "100%",
              padding: "10px 0",
              borderRadius: "10px",
              backgroundColor: accent,
              color: "#fff",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              boxShadow: `0 4px 14px ${accent}40`,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Hire Me
          </button>
        </div>
      </motion.aside>
      )}

      {/* ══════ MOBILE TOP BAR ══════ */}
      {navPosition === "left" && (
        <div
          className="t2-mobile-bar"
          style={{
            display: "none",
            position: "fixed",
            top: 0, left: 0, right: 0,
            height: "56px",
            backgroundColor: bgSidebar,
            borderBottom: `1px solid ${borderColor}`,
            zIndex: 45,
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ fontWeight: 800, fontSize: "15px", color: textTitle }}>{data.name?.split(" ")[0]}</div>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            style={{
              border: "none", background: "transparent",
              cursor: "pointer", fontSize: "20px",
              color: textColor, padding: "4px",
            }}
          >
            ☰
          </button>
        </div>
      )}

      {/* ══════ MAIN CONTENT ══════ */}
      <main
        ref={contentRef}
        style={{
          marginLeft: navPosition === "left" ? "240px" : "0px",
          flex: 1,
          height: "100vh",
          overflowY: "auto",
          scrollBehavior: "smooth",
          backgroundColor: "transparent",
        }}
        className="t2-main"
      >
        {/* ─── HERO ─── */}
        <SectionWrapper sectionName="Home">
          <div id="home" data-t2-section>
            <Home
              name={about?.name}
              roles={roles}
              description={description}
              centerSvg={centerSvg}
              orbitingStacks={orbitingStacks}
              statusBadgeText={about?.statusBadgeText || data.statusBadgeText}
              design={sectionLayouts?.Home}
            />
          </div>
        </SectionWrapper>

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
              <SectionWrapper key={sectionName} sectionName={sectionName}>
                <div id={sectionName.toLowerCase()} data-t2-section>
                  {renderer(sectionProps)}
                </div>
              </SectionWrapper>
            ) : null;
          })}
        </React.Suspense>

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            padding: "24px 48px",
            borderTop: `1px solid ${borderColor}`,
            fontSize: "11px",
            color: textMuted,
            fontWeight: 600,
            backgroundColor: bgCard,
          }}
        >
          {copyright || `© 2026 ${data.name}. All rights reserved.`}
        </footer>
      </main>

      {/* ══════ SCROLL TO TOP ══════ */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => contentRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              position: "fixed",
              bottom: "28px", right: "28px",
              width: "42px", height: "42px",
              borderRadius: "50%",
              backgroundColor: accent,
              color: "#fff",
              border: "none",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 4px 16px ${accent}50`,
              zIndex: 60,
              fontSize: "18px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1) translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1) translateY(0)"; }}
          >
            <FiArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ══════ KEYFRAMES ══════ */}
      <style>{`
        @keyframes t2-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .t2-sidebar {
            transform: translateX(-100%) !important;
            transition: transform 0.3s ease !important;
          }
          .t2-sidebar.open {
            transform: translateX(0) !important;
          }
          .t2-mobile-bar {
            display: flex !important;
          }
          .t2-main {
            margin-left: 0 !important;
            padding-top: 56px;
          }
          .t2-hero-inner {
            flex-direction: column !important;
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .t2-hero-photo {
            display: none !important;
          }
          section[data-t2-section],
          .t2-content-section {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
        .t2-sidebar::-webkit-scrollbar { display: none; }
        .t2-main::-webkit-scrollbar { width: 5px; }
        .t2-main::-webkit-scrollbar-track { background: ${bgMain}; }
        .t2-main::-webkit-scrollbar-thumb { background: ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}; border-radius: 10px; }
      `}</style>
    </div>
  );
}

/* ─── Helper: Content Section wrapper ──────────── */
function ContentSection({ id, children, gray = false, isDark }) {
  const bg = gray 
    ? (isDark ? "#0b0f19" : "#f3f4f6") 
    : (isDark ? "#080c14" : "#ffffff");
  return (
    <section
      id={id}
      data-t2-section
      className="t2-content-section"
      style={{
        padding: "52px 48px",
        backgroundColor: bg,
        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb"}`,
      }}
    >
      {children}
    </section>
  );
}

/* ─── Helper: Contact row ──────────────────────── */
function ContactRow({ icon: Icon, label, value, href, accent, isDark }) {
  const textColor = isDark ? "#cbd5e1" : "#374151";
  const textMuted = isDark ? "#64748b" : "#9ca3af";
  const content = (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div
        style={{
          width: "36px", height: "36px",
          borderRadius: "9px",
          backgroundColor: `${accent}15`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: accent, fontSize: "16px", flexShrink: 0,
        }}
      >
        <Icon />
      </div>
      <div>
        <div style={{ fontSize: "10px", color: textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
        <div style={{ fontSize: "13px", color: textColor, fontWeight: 600 }}>{value}</div>
      </div>
    </div>
  );

  return href ? (
    <a href={href} style={{ textDecoration: "none" }}>{content}</a>
  ) : content;
}

/* ─── Helper: FAQ accordion item ──────────────── */
function FaqItem({ faq, accent, isDark }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        backgroundColor: isDark ? "#121b2d" : "#fff",
        borderRadius: "12px",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb"}`,
        overflow: "hidden",
        transition: "all 0.2s ease",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          padding: "16px 20px",
          display: "flex", alignItems: "center", justify: "space-between",
          fontSize: "13px", fontWeight: 700, color: isDark ? "#ffffff" : "#111827",
          backgroundColor: "transparent", border: "none",
          cursor: "pointer", textAlign: "left",
          textTransform: "none", letterSpacing: "normal",
          gap: "12px",
        }}
      >
        <span>{faq.question}</span>
        <FiChevronRight
          style={{
            flexShrink: 0, fontSize: "16px",
            color: accent,
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                padding: "0 20px 16px",
                fontSize: "13px",
                color: isDark ? "#cbd5e1" : "#6b7280",
                lineHeight: 1.7,
                borderTop: `1px solid ${accent}20`,
                paddingTop: "12px",
                marginTop: 0,
              }}
            >
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
