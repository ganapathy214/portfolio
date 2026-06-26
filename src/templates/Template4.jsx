import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiExternalLink, FiMail, FiChevronRight, FiMenu, FiX, FiInfo, FiCode, FiAward, FiArrowUp } from "react-icons/fi";
import { HiOutlineUser, HiBriefcase, HiEnvelope, HiAcademicCap } from "react-icons/hi2";

import { downloadPdf } from "../utils/pdf";
import resumePdf from "../assets/resume.pdf";
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

const SOCIAL_ICONS = {
  FaLinkedinIn, FaGithub, FaInstagram, FaTwitter
};

export default function Template4() {
  const portfolio = usePortfolio();
  const {
    primaryColor, roles, description, about,
    servicesSubtitle, servicesData, skills, skillCategories,
    projects, certifications, timelineData, summaryStats,
    contactInfo, testimonials, blogs, faqs,
    themeMode, sectionVisibility, sectionTitles, sectionOrder, copyright,
    centerSvg, orbitingStacks, sectionLayouts, navPosition,
  } = portfolio;

  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const accent = primaryColor || "#00D5D5";
  const isDark = themeMode === "dark";

  // Dynamic Theme Colors
  const bgCard = isDark ? "#0f1626" : "#ffffff";
  const bgNavbar = isDark ? "rgba(9, 13, 22, 0.9)" : "rgba(241, 245, 249, 0.9)";
  const textColor = isDark ? "#94a3b8" : "#475569";
  const textTitle = isDark ? "#ffffff" : "#0f172a";
  const textSub = isDark ? "#64748b" : "#64748b";
  const borderColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";

  const firstRole = roles?.[0] || about?.title || "Frontend Developer";

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

  // Section observer
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
    const sections = document.querySelectorAll("[data-t4-section]");
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

  const navIcons = {
    About: HiOutlineUser,
    Services: HiBriefcase,
    Skills: FiCode,
    Projects: FiCode,
    Certification: HiAcademicCap,
    Testimonials: FiInfo,
    Experience: HiBriefcase,
    Education: HiAcademicCap,
    Blogs: FiInfo,
    Faq: FiInfo,
    Contact: HiEnvelope,
  };

  const visibleNav = [
    { id: "home", label: "Home", icon: HiOutlineUser },
    ...orderedSections.map(name => ({
      id: name.toLowerCase(),
      label: name === "Faq" ? "FAQ" : (name === "Certification" ? "Certifications" : name),
      icon: navIcons[name] || HiOutlineUser
    }))
  ];

  const transitionToSection = useCallback((item) => {
    const id = item.href.replace("#", "");
    scrollTo(id);
    setActiveSection(item.name);
  }, [scrollTo]);

  return (
    <div
      ref={contentRef}
      className={`relative z-0 min-h-screen flex ${navPosition === "left" ? "flex-col md:flex-row" : "flex-col"}`}
      style={{
        backgroundColor: "transparent",
        color: textColor,
        fontFamily: "'Courier New', Courier, monospace, sans-serif",
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

      <style>{`
        .t4-border-glow:hover {
          border-color: ${accent}80 !important;
          box-shadow: 0 0 15px ${accent}15;
        }
        .marquee-container {
          display: flex;
          overflow: hidden;
          white-space: nowrap;
          user-select: none;
        }
        .marquee-content {
          display: inline-flex;
          animation: loop-scroll 25s linear infinite;
        }
        @keyframes loop-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* TOP NAVBAR */}
      {navPosition === "top" && (
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
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="text-lg font-black tracking-widest text-left cursor-pointer"
            style={{ color: textTitle }}
          >
            {(about?.name || "Dev").split(" ")[0]} <span style={{ color: accent }}>/</span>
          </button>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-8">
            {visibleNav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                style={{
                  color: activeSection?.toLowerCase() === item.id?.toLowerCase() ? accent : textTitle
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

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden w-full absolute top-20 left-0 border-b py-5 px-6 flex flex-col gap-4 text-left shadow-lg"
              style={{
                backgroundColor: bgNavbar,
                borderColor: borderColor,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              {visibleNav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-xs font-bold uppercase tracking-widest text-left py-2"
                  style={{
                    color: activeSection === item.id ? accent : textColor
                  }}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      )}

      <main className={`flex-1 ${navPosition === "left" ? "md:ml-20" : ""} pb-24 md:pb-6`}>
      {/* HERO SECTION */}
      <SectionWrapper sectionName="Home">
        <div id="home" data-t4-section>
          <Home
            name={about?.name}
            roles={roles}
            description={description}
            centerSvg={centerSvg}
            orbitingStacks={orbitingStacks}
            statusBadgeText={about?.statusBadgeText}
            design={sectionLayouts?.Home}
          />
        </div>
      </SectionWrapper>

      {/* MARQUEE BANNER ROW */}
      <div
        className="w-full py-5 border-y overflow-hidden select-none bg-stone-950/20"
        style={{ borderColor: borderColor }}
      >
        <div className="marquee-container text-xs font-mono font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
          <div className="marquee-content gap-16 pr-16">
            {Array(8).fill(
              skills.slice(0, 6).map(s => s.name).join(" / ") || "WEB / PROGRAMMING / DEVELOPMENT / JAVASCRIPT / CSS"
            ).map((txt, idx) => (
              <span key={idx}>{txt} /</span>
            ))}
          </div>
          <div className="marquee-content gap-16 pr-16" aria-hidden="true">
            {Array(8).fill(
              skills.slice(0, 6).map(s => s.name).join(" / ") || "WEB / PROGRAMMING / DEVELOPMENT / JAVASCRIPT / CSS"
            ).map((txt, idx) => (
              <span key={idx}>{txt} /</span>
            ))}
          </div>
        </div>
      </div>

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
              <div id={sectionName.toLowerCase()} data-t4-section>
                {renderer(sectionProps)}
              </div>
            </SectionWrapper>
          ) : null;
        })}
      </React.Suspense>

      {/* FOOTER */}
      <footer className="border-t py-12 px-6" style={{ borderColor: borderColor, backgroundColor: isDark ? "#060a10" : "#f8fafc" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <span style={{ color: textSub }}>
            {copyright || `© 2026 ${about.name || "Dev"}. All rights reserved.`}
          </span>
          <button
            onClick={() => downloadPdf(about.resumeUrl || resumePdf, about.resumeFileName || "Resume.pdf")}
            className="flex items-center gap-1.5 border px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider t4-border-glow transition-all"
            style={{ borderColor: borderColor, color: textTitle, backgroundColor: bgCard }}
          >
            <span>resume.pdf</span>
          </button>
        </div>
      </footer>
      </main>

      {/* Floating Move to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all"
            style={{
              backgroundColor: accent,
              color: "#ffffff",
              border: "none",
              boxShadow: `0 4px 16px ${accent}50`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1) translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1) translateY(0)"; }}
            aria-label="Scroll to top"
          >
            <FiArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
