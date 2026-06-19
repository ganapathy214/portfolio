import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";
import { FiCode, FiArrowRight, FiCheckCircle, FiSmile, FiMenu, FiX } from "react-icons/fi";
import { HiHome, HiOutlineUser, HiBriefcase, HiEnvelope } from "react-icons/hi2";
import { SERVICES_DATA, SERVICE_ICONS } from "../constants";
import avatar from "../assets/avatar.png";
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
  FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaGlobe
};

export default function Template5() {
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
  const isDark = themeMode === "dark";
  const accent = primaryColor || "#10b981";

  // Dynamic Theme Colors
  const bgNavbar = isDark ? "rgba(15, 15, 17, 0.85)" : "rgba(251, 251, 251, 0.85)";
  const textColor = isDark ? "#a1a1aa" : "#4b5563";
  const textTitle = isDark ? "#ffffff" : "#18181b";
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
      className="relative z-0"
      style={{
        backgroundColor: "transparent",
        color: textColor,
        minHeight: "100vh",
        fontFamily: "'Outfit', 'Inter', sans-serif",
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
            className="text-lg font-black tracking-tight cursor-pointer"
            style={{ color: textTitle }}
          >
            {about?.name || "JOHN DOE"}
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
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-xs font-semibold uppercase tracking-wider text-left py-2"
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
              {about?.name || "JOHN DOE"}
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
            <div key={sectionName} id={sectionName.toLowerCase()} data-t5-section>
              {renderer(sectionProps)}
            </div>
          ) : null;
        })}
      </React.Suspense>

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
