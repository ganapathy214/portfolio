import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import {
  FiCode, FiDatabase, FiCloud, FiLayout, FiCheckSquare, FiServer,
  FiExternalLink, FiChevronRight, FiMail, FiPhone, FiMapPin, FiArrowUp,
  FiMessageSquare,
} from "react-icons/fi";
import {
  HiOutlineUser, HiBriefcase, HiCodeBracket, HiEnvelope,
  HiOutlineCog, HiChatBubbleLeftRight, HiBookOpen, HiHome,
  HiQuestionMarkCircle, HiRocketLaunch,
} from "react-icons/hi2";
import { GrCertificate } from "react-icons/gr";
import { SERVICES_DATA, SERVICE_ICONS } from "../constants";
import { DEFAULT_ABOUT } from "../constants";
import avatar from "../assets/avatar.png";
import resumePdf from "../assets/resume.pdf";
import { downloadPdf } from "../utils/pdf";

/* ─── Social icon map ─────────────────────────── */
const SOCIAL_ICONS = {
  FaLinkedinIn, FaGithub, FaTwitter, FaInstagram,
};

/* ─── Nav items ───────────────────────────────── */
const NAV_ITEMS = [
  { id: "home",          label: "Home",           icon: HiHome },
  { id: "about",         label: "About Me",        icon: HiOutlineUser },
  { id: "t2-services",   label: "Services",        icon: HiBriefcase },
  { id: "t2-skills",     label: "Skills",          icon: HiOutlineCog },
  { id: "t2-projects",   label: "Portfolio",       icon: HiCodeBracket },
  { id: "t2-certs",      label: "Certifications",  icon: GrCertificate },
  { id: "t2-testimonials",label: "Testimonials",   icon: HiChatBubbleLeftRight },
  { id: "t2-blogs",      label: "Blog",            icon: HiBookOpen },
  { id: "t2-faq",        label: "FAQ",             icon: HiQuestionMarkCircle },
  { id: "contact",       label: "Contact",         icon: HiEnvelope },
];

/* ─── Section header component ────────────────── */
const SectionHeading = ({ title, accent, isDark }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
    <h2 className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: isDark ? "#ffffff" : "#1f2937" }}>{title}</h2>
  </div>
);

/* ─── Typewriter for hero ─────────────────────── */
const Typewriter = ({ roles = [] }) => {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const speed = deleting ? 35 : 70;

  useEffect(() => {
    if (!roles.length) return;
    const current = roles[idx] || "";
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
          setIdx((i) => (i + 1) % roles.length);
        }
      }
    }, speed);
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
export default function Template2Page({
  primaryColor,
  roles,
  description,
  about,
  servicesData,
  skills,
  projects,
  certifications,
  testimonials,
  blogs,
  faqs,
  sectionVisibility,
  summaryStats,
  contactInfo,
  centerSvg,
  themeMode,
}) {
  const [activeSection, setActiveSection] = useState("home");
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
  const bgTag = isDark ? "rgba(255,255,255,0.04)" : "#f3f4f6";

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
  }, []);

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
  const services = (servicesData && servicesData.length > 0) ? servicesData : SERVICES_DATA;
  const allProjects = (projects && projects.length > 0) ? projects : [];
  const featuredProjects = allProjects.slice(0, 4);
  const allBlogs = (blogs && blogs.length > 0) ? blogs : [];
  const featuredBlogs = allBlogs.slice(0, 3);
  const allTestimonials = (testimonials && testimonials.length > 0) ? testimonials : [];
  const allFaqs = (faqs && faqs.length > 0) ? faqs : [];
  const displayRoles = roles && roles.length > 0 ? roles : (data.professionalTitles || ["Developer"]);

  /* ── visible nav items ── */
  const visibleNav = NAV_ITEMS.filter((item) => {
    const sectionKey = item.id.replace("t2-", "");
    const capitalized = sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1);
    if (!sectionVisibility) return true;
    return sectionVisibility[capitalized] !== false;
  });

  return (
    <div
      className="t2-root"
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Inter', 'Google Sans', sans-serif",
        backgroundColor: bgMain,
        color: textColor,
        position: "relative",
      }}
    >
      {/* ══════ MOBILE OVERLAY ══════ */}
      <AnimatePresence>
        {sidebarOpen && (
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
        className="t2-sidebar"
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
        <nav style={{ flex: 1, padding: "12px 0" }}>
          {visibleNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
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

      {/* ══════ MOBILE TOP BAR ══════ */}
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

      {/* ══════ MAIN CONTENT ══════ */}
      <main
        ref={contentRef}
        style={{
          marginLeft: "240px",
          flex: 1,
          height: "100vh",
          overflowY: "auto",
          scrollBehavior: "smooth",
          backgroundColor: bgMain,
        }}
        className="t2-main"
      >
        {/* ─── HERO ─── */}
        <section
          id="home"
          data-t2-section
          style={{
            backgroundColor: bgCard,
            padding: "56px 48px 48px",
            borderBottom: `1px solid ${borderColor}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background subtle pattern */}
          <div
            style={{
              position: "absolute", inset: 0, opacity: isDark ? 0.05 : 0.025,
              backgroundImage: `radial-gradient(${accent} 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
              pointerEvents: "none",
            }}
          />

          <div style={{ display: "flex", alignItems: "flex-start", gap: "40px", position: "relative", zIndex: 1 }} className="t2-hero-inner">
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{ flex: 1 }}
            >
              {/* Availability badge */}
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "4px 12px", borderRadius: "20px",
                  backgroundColor: `${accent}18`, border: `1px solid ${accent}35`,
                  color: accent, fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    backgroundColor: accent, animation: "t2-blink 1.5s ease-in-out infinite",
                  }}
                />
                {data.statusBadgeText || "Available for Work"}
              </div>

              {/* Name */}
              <h1
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 900,
                  color: textTitle,
                  lineHeight: 1.1,
                  marginBottom: "10px",
                  letterSpacing: "-0.03em",
                }}
              >
                {data.name}
              </h1>

              {/* Typewriter role */}
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: accent,
                  marginBottom: "18px",
                  letterSpacing: "0.02em",
                  minHeight: "24px",
                }}
              >
                <Typewriter roles={displayRoles} />
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "14px",
                  color: textSub,
                  lineHeight: 1.8,
                  maxWidth: "520px",
                  marginBottom: "28px",
                }}
              >
                {description || data.bio}
              </p>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button
                  onClick={() => scrollTo("t2-projects")}
                  style={{
                    padding: "11px 28px", borderRadius: "10px",
                    backgroundColor: accent, color: "#fff",
                    fontWeight: 700, fontSize: "12px",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    border: "none", cursor: "pointer",
                    boxShadow: `0 4px 14px ${accent}45`,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 20px ${accent}55`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 14px ${accent}45`; }}
                >
                  View Portfolio
                </button>
                <button
                  onClick={() => downloadPdf(data.resumeUrl || resumePdf, data.resumeFileName || "Resume.pdf")}
                  style={{
                    padding: "11px 28px", borderRadius: "10px",
                    backgroundColor: "transparent", color: isDark ? "#cbd5e1" : "#374151",
                    fontWeight: 700, fontSize: "12px",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    border: `1.5px solid ${isDark ? "#475569" : "#d1d5db"}`, cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = isDark ? "#475569" : "#d1d5db"; e.currentTarget.style.color = isDark ? "#cbd5e1" : "#374151"; }}
                >
                  View Resume
                </button>
              </div>

              {/* Stats */}
              {data.stats && data.stats.length > 0 && (
                <div style={{ display: "flex", gap: "32px", marginTop: "36px", flexWrap: "wrap" }}>
                  {data.stats.map((s, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "22px", fontWeight: 900, color: accent, lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontSize: "10px", color: textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "3px" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right: avatar photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                flexShrink: 0,
                width: "180px", height: "200px",
                borderRadius: "20px",
                overflow: "hidden",
                border: `2px solid ${accent}30`,
                boxShadow: isDark ? `0 20px 50px ${accent}15, 0 8px 24px rgba(0,0,0,0.4)` : `0 20px 50px ${accent}20, 0 8px 24px rgba(0,0,0,0.1)`,
              }}
              className="t2-hero-photo"
            >
              <img
                src={data.avatarUrl || avatar}
                alt={data.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            </motion.div>
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        {(!sectionVisibility || sectionVisibility.About !== false) && (
          <ContentSection id="about" accent={accent} isDark={isDark}>
            <SectionHeading title="About Me" accent={accent} isDark={isDark} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }} className="t2-hero-inner">
              <div>
                <p style={{ fontSize: "14px", color: textColor, lineHeight: 1.9, marginBottom: "20px" }}>{data.bio}</p>
                {data.highlights && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {data.highlights.map((h, i) => (
                      <div key={i} style={{ display: "flex", gap: "8px", fontSize: "13px" }}>
                        <span style={{ color: textSub, fontWeight: 600, minWidth: "120px" }}>{h.label}:</span>
                        <span style={{ color: textTitle, fontWeight: 600 }}>{h.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {(data.stats || []).map((s, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "14px 20px",
                      borderRadius: "12px",
                      backgroundColor: isDark ? "rgba(255,255,255,0.02)" : `${accent}0a`,
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : `${accent}20`}`,
                      display: "flex", alignItems: "center", gap: "14px",
                    }}
                  >
                    <div style={{ fontSize: "28px", fontWeight: 900, color: accent, lineHeight: 1, minWidth: "52px" }}>{s.value}</div>
                    <div style={{ fontSize: "12px", color: textSub, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: "8px", marginTop: "4px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => downloadPdf(data.resumeUrl || resumePdf, data.resumeFileName || "Resume.pdf")}
                    style={{
                      padding: "9px 22px", borderRadius: "9px",
                      backgroundColor: accent, color: "#fff",
                      fontWeight: 700, fontSize: "11px",
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      border: "none", cursor: "pointer",
                      boxShadow: `0 4px 12px ${accent}40`,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                  >
                    Download CV
                  </button>
                  <button
                    onClick={() => scrollTo("contact")}
                    style={{
                      padding: "9px 22px", borderRadius: "9px",
                      backgroundColor: "transparent", color: isDark ? "#cbd5e1" : "#374151",
                      fontWeight: 700, fontSize: "11px",
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      border: `1.5px solid ${isDark ? "#475569" : "#d1d5db"}`, cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = isDark ? "#475569" : "#d1d5db"; e.currentTarget.style.color = isDark ? "#cbd5e1" : "#374151"; }}
                  >
                    Hire Me
                  </button>
                </div>
              </div>
            </div>
          </ContentSection>
        )}

        {/* ─── WHAT I DO / SERVICES ─── */}
        {(!sectionVisibility || sectionVisibility.Services !== false) && (
          <ContentSection id="t2-services" accent={accent} gray isDark={isDark}>
            <SectionHeading title="What I Do" accent={accent} isDark={isDark} />
            <p style={{ fontSize: "13px", color: textSub, marginBottom: "28px", maxWidth: "600px", lineHeight: 1.7 }}>
              High-performance, scalable, and secure software development solutions tailored to meet business objectives.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "16px",
              }}
            >
              {services.map((service, i) => {
                const Icon = SERVICE_ICONS[service.icon] || FiCode;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    style={{
                      backgroundColor: bgCard,
                      borderRadius: "14px",
                      padding: "22px 20px",
                      border: `1px solid ${borderColor}`,
                      transition: "all 0.25s ease",
                      cursor: "default",
                    }}
                    whileHover={{ y: -4, boxShadow: isDark ? `0 12px 28px rgba(0,0,0,0.4)` : `0 12px 28px ${accent}18` }}
                  >
                    <div
                      style={{
                        width: "42px", height: "42px",
                        borderRadius: "10px",
                        backgroundColor: `${accent}15`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: "14px",
                        color: accent, fontSize: "18px",
                      }}
                    >
                      <Icon />
                    </div>
                    <h4 style={{ fontSize: "14px", fontWeight: 700, color: textTitle, marginBottom: "8px" }}>
                      {service.title}
                    </h4>
                    <p style={{ fontSize: "12px", color: textSub, lineHeight: 1.7 }}>
                      {service.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
            {/* Services button */}
            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <button
                onClick={() => scrollTo("contact")}
                style={{
                  padding: "10px 28px", borderRadius: "10px",
                  backgroundColor: "transparent", color: accent,
                  fontWeight: 700, fontSize: "11px",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  border: `1.5px solid ${accent}`, cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = accent; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = accent; }}
              >
                Services &amp; Pricing →
              </button>
            </div>
          </ContentSection>
        )}

        {/* ─── TESTIMONIALS ─── */}
        {(!sectionVisibility || sectionVisibility.Testimonials !== false) && allTestimonials.length > 0 && (
          <ContentSection id="t2-testimonials" accent={accent} isDark={isDark}>
            <SectionHeading title="Testimonials" accent={accent} isDark={isDark} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "16px",
              }}
            >
              {allTestimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  style={{
                    backgroundColor: bgCard,
                    borderRadius: "14px",
                    padding: "22px",
                    border: `1px solid ${borderColor}`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Big quote mark */}
                  <div style={{
                    position: "absolute", top: "10px", right: "16px",
                    fontSize: "56px", fontWeight: 900,
                    color: `${accent}12`, lineHeight: 1, userSelect: "none",
                    fontFamily: "Georgia, serif",
                  }}>
                    &ldquo;
                  </div>
                  <p style={{ fontSize: "13px", color: textColor, lineHeight: 1.8, marginBottom: "16px", fontStyle: "italic" }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", borderTop: `1px solid ${borderLight}`, paddingTop: "14px" }}>
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                    ) : (
                      <div style={{
                        width: "36px", height: "36px", borderRadius: "50%",
                        backgroundColor: `${accent}20`, color: accent,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 800, fontSize: "14px", flexShrink: 0,
                        border: `1.5px solid ${accent}35`,
                      }}>
                        {t.name?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: textTitle }}>{t.name}</div>
                      <div style={{ fontSize: "10px", color: textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        {t.role}{t.company ? ` · ${t.company}` : ""}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ContentSection>
        )}

        {/* ─── FEATURED PROJECTS ─── */}
        {(!sectionVisibility || sectionVisibility.Projects !== false) && featuredProjects.length > 0 && (
          <ContentSection id="t2-projects" accent={accent} gray isDark={isDark}>
            <SectionHeading title="Featured Projects" accent={accent} isDark={isDark} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {featuredProjects.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  style={{
                    backgroundColor: bgCard,
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: `1px solid ${borderColor}`,
                    transition: "all 0.25s ease",
                  }}
                  whileHover={{ y: -4, boxShadow: isDark ? `0 12px 30px rgba(0,0,0,0.4)` : `0 12px 30px ${accent}15` }}
                >
                  {/* Project image */}
                  {project.image && (
                    <div style={{ height: "150px", overflow: "hidden", backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#f9fafb" }}>
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                      />
                    </div>
                  )}
                  <div style={{ padding: "18px" }}>
                    {/* Category tag */}
                    {project.category && (
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 9px",
                          borderRadius: "5px",
                          fontSize: "9px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          backgroundColor: `${accent}15`,
                          color: accent,
                          marginBottom: "8px",
                        }}
                      >
                        {project.category}
                      </span>
                    )}
                    <h4 style={{ fontSize: "15px", fontWeight: 800, color: textTitle, marginBottom: "6px", lineHeight: 1.3 }}>
                      {project.title}
                    </h4>
                    <p style={{ fontSize: "12px", color: textSub, lineHeight: 1.7, marginBottom: "12px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {project.synopsis}
                    </p>
                    {/* Stacks */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
                      {(project.stacks || []).slice(0, 4).map((s, j) => (
                        <span
                          key={j}
                          style={{
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "9px",
                            fontWeight: 600,
                            backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "#f3f4f6",
                            color: textSub,
                            border: `1px solid ${borderColor}`,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                      {(project.stacks || []).length > 4 && (
                        <span style={{ fontSize: "9px", color: textMuted, alignSelf: "center" }}>+{project.stacks.length - 4}</span>
                      )}
                    </div>
                    {/* Duration */}
                    <div style={{ fontSize: "10px", color: textMuted, fontWeight: 600 }}>{project.duration}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            {allProjects.length > 4 && (
              <div style={{ textAlign: "center", marginTop: "28px" }}>
                <button
                  style={{
                    padding: "10px 28px", borderRadius: "10px",
                    backgroundColor: "transparent", color: accent,
                    fontWeight: 700, fontSize: "11px",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    border: `1.5px solid ${accent}`, cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = accent; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = accent; }}
                >
                  View Portfolio →
                </button>
              </div>
            )}
          </ContentSection>
        )}

        {/* ─── SKILLS ─── */}
        {(!sectionVisibility || sectionVisibility.Skills !== false) && skills && skills.length > 0 && (
          <ContentSection id="t2-skills" accent={accent} isDark={isDark}>
            <SectionHeading title="Skills &amp; Expertise" accent={accent} isDark={isDark} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {skills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02, duration: 0.3 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "7px",
                    padding: "7px 14px",
                    borderRadius: "8px",
                    backgroundColor: bgCard,
                    border: `1px solid ${borderColor}`,
                    fontSize: "12px",
                    fontWeight: 600,
                    color: textColor,
                    cursor: "default",
                    transition: "all 0.2s ease",
                  }}
                  whileHover={{ borderColor: accent, color: accent, y: -2 }}
                >
                  {skill.icon && (
                    <img src={skill.icon} alt={skill.name} style={{ width: "16px", height: "16px", objectFit: "contain" }} />
                  )}
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </ContentSection>
        )}

        {/* ─── CERTIFICATIONS ─── */}
        {(!sectionVisibility || sectionVisibility.Certification !== false) && certifications && certifications.length > 0 && (
          <ContentSection id="t2-certs" accent={accent} gray isDark={isDark}>
            <SectionHeading title="Certifications" accent={accent} isDark={isDark} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
              {certifications.slice(0, 6).map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  style={{
                    backgroundColor: bgCard,
                    borderRadius: "12px",
                    padding: "16px",
                    border: `1px solid ${borderColor}`,
                    display: "flex", flexDirection: "column", gap: "8px",
                  }}
                  whileHover={{ y: -3, boxShadow: isDark ? `0 8px 20px rgba(0,0,0,0.4)` : `0 8px 20px ${accent}15` }}
                >
                  {cert.image && (
                    <img src={cert.image} alt={cert.title} style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "8px", marginBottom: "4px" }} />
                  )}
                  <div style={{ fontSize: "12px", fontWeight: 700, color: textTitle, lineHeight: 1.3 }}>{cert.title}</div>
                  <div style={{ fontSize: "10px", color: textMuted, fontWeight: 600 }}>{cert.issuer} · {cert.lastUpdated}</div>
                </motion.div>
              ))}
            </div>
          </ContentSection>
        )}

        {/* ─── LATEST BLOG POSTS ─── */}
        {(!sectionVisibility || sectionVisibility.Blogs !== false) && featuredBlogs.length > 0 && (
          <ContentSection id="t2-blogs" accent={accent} isDark={isDark}>
            <SectionHeading title="Latest Blog Posts" accent={accent} isDark={isDark} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "18px",
              }}
            >
              {featuredBlogs.map((blog, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09, duration: 0.5 }}
                  style={{
                    backgroundColor: bgCard,
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: `1px solid ${borderColor}`,
                    display: "flex", flexDirection: "column",
                    transition: "all 0.25s ease",
                  }}
                  whileHover={{ y: -4, boxShadow: isDark ? `0 10px 28px rgba(0,0,0,0.4)` : `0 10px 28px ${accent}15` }}
                >
                  {blog.image && (
                    <div style={{ height: "130px", overflow: "hidden", backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#f9fafb" }}>
                      <img src={blog.image} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                  <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                    {blog.platform && (
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 8px", borderRadius: "4px",
                          fontSize: "9px", fontWeight: 700,
                          textTransform: "uppercase", letterSpacing: "0.08em",
                          backgroundColor: `${accent}15`, color: accent,
                          marginBottom: "8px", width: "fit-content",
                        }}
                      >
                        {blog.platform}
                      </span>
                    )}
                    <h4 style={{ fontSize: "14px", fontWeight: 800, color: textTitle, marginBottom: "8px", lineHeight: 1.4 }}>
                      {blog.title}
                    </h4>
                    <p style={{ fontSize: "12px", color: textSub, lineHeight: 1.7, marginBottom: "12px", flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {blog.description}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justify: "space-between", marginTop: "auto" }}>
                      {blog.link && (
                        <a
                          href={blog.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "11px", fontWeight: 700,
                            color: accent, textDecoration: "none",
                            display: "flex", alignItems: "center", gap: "4px",
                            letterSpacing: "0.05em", textTransform: "uppercase",
                            transition: "gap 0.2s ease",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.gap = "8px"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.gap = "4px"; }}
                        >
                          Read more <FiExternalLink style={{ fontSize: "11px" }} />
                        </a>
                      )}
                      {blog.date && (
                        <span style={{ fontSize: "10px", color: textMuted, fontWeight: 600 }}>{blog.date}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {allBlogs.length > 3 && (
              <div style={{ textAlign: "center", marginTop: "28px" }}>
                <button
                  style={{
                    padding: "10px 28px", borderRadius: "10px",
                    backgroundColor: "transparent", color: accent,
                    fontWeight: 700, fontSize: "11px",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    border: `1.5px solid ${accent}`, cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = accent; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = accent; }}
                >
                  View Blog →
                </button>
              </div>
            )}
          </ContentSection>
        )}

        {/* ─── FAQ ─── */}
        {(!sectionVisibility || sectionVisibility.Faq !== false) && allFaqs.length > 0 && (
          <ContentSection id="t2-faq" accent={accent} gray isDark={isDark}>
            <SectionHeading title="FAQ" accent={accent} isDark={isDark} />
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "700px" }}>
              {allFaqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} accent={accent} isDark={isDark} />
              ))}
            </div>
          </ContentSection>
        )}

        {/* ─── CONTACT ─── */}
        {(!sectionVisibility || sectionVisibility.Contact !== false) && (
          <ContentSection id="contact" accent={accent} isDark={isDark}>
            <SectionHeading title="Get In Touch" accent={accent} isDark={isDark} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }} className="t2-hero-inner">
              <div>
                <p style={{ fontSize: "14px", color: textSub, lineHeight: 1.8, marginBottom: "24px" }}>
                  Have a project in mind or want to work together? Feel free to reach out — I&apos;m always open to discussing new opportunities.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {contactInfo?.email && (
                    <ContactRow icon={FiMail} label="Email" value={contactInfo.email} href={`mailto:${contactInfo.email}`} accent={accent} isDark={isDark} />
                  )}
                  {contactInfo?.phone && (
                    <ContactRow icon={FiPhone} label="Phone" value={contactInfo.phone} href={`tel:${contactInfo.phone}`} accent={accent} isDark={isDark} />
                  )}
                  {contactInfo?.location && (
                    <ContactRow icon={FiMapPin} label="Location" value={contactInfo.location} accent={accent} isDark={isDark} />
                  )}
                </div>
              </div>
              {/* Simple contact card */}
              <div
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.02)" : `${accent}08`,
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : `${accent}25`}`,
                  borderRadius: "16px",
                  padding: "28px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "64px", height: "64px",
                    borderRadius: "50%",
                    backgroundColor: `${accent}20`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px",
                    fontSize: "26px", color: accent,
                  }}
                >
                  <FiMessageSquare />
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: 800, color: textTitle, marginBottom: "8px" }}>Let&apos;s Work Together</h4>
                <p style={{ fontSize: "12px", color: textSub, lineHeight: 1.7, marginBottom: "20px" }}>
                  Ready to take your digital presence to the next level?
                </p>
                <button
                  style={{
                    padding: "11px 28px", borderRadius: "10px",
                    backgroundColor: accent, color: "#fff",
                    fontWeight: 700, fontSize: "12px",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    border: "none", cursor: "pointer",
                    boxShadow: `0 4px 14px ${accent}40`,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                  onClick={() => {
                    if (contactInfo?.email) window.location.href = `mailto:${contactInfo.email}`;
                  }}
                >
                  Send Message
                </button>
              </div>
            </div>
          </ContentSection>
        )}

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
          &copy; {new Date().getFullYear()} {data.name} · All rights reserved
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
function ContentSection({ id, children, accent, gray = false, isDark }) {
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
