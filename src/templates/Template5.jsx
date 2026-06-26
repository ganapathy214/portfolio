import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";
import { FiCode, FiArrowRight, FiCheckCircle, FiSmile, FiMenu, FiX, FiArrowUp } from "react-icons/fi";
import { HiHome, HiOutlineUser, HiBriefcase, HiEnvelope } from "react-icons/hi2";
import { SERVICES_DATA, SERVICE_ICONS } from "../constants";
import avatar from "../assets/avatar.png";
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
  FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaGlobe
};

export default function Template5() {
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
  const isDark = themeMode === "dark";

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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

  const transitionToSection = useCallback((item) => {
    const id = item.href.replace("#", "");
    scrollTo(id);
    setActiveSection(item.name);
  }, [scrollTo]);

  return (
    <div
      className={`relative z-0 min-h-screen flex ${navPosition === "left" ? "flex-col md:flex-row" : "flex-col"}`}
      style={{
        backgroundColor: "transparent",
        color: textColor,
        fontFamily: "'Outfit', 'Inter', sans-serif",
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
        .t5-hover-card:hover {
          transform: translateY(-5px);
          border-color: ${accent}35 !important;
          box-shadow: 0 10px 30px ${accent}0a;
        }
      `}</style>

      {/* NAVBAR */}
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
                  color: activeSection?.toLowerCase() === item.id?.toLowerCase() ? accent : textTitle
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
      )}

      <main className={`flex-1 ${navPosition === "left" ? "md:ml-20" : ""} pb-24 md:pb-6`}>
      {/* HERO SECTION */}
      <SectionWrapper sectionName="Home">
        <div id="home" data-t5-section>
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
              <div id={sectionName.toLowerCase()} data-t5-section>
                {renderer(sectionProps)}
              </div>
            </SectionWrapper>
          ) : null;
        })}
      </React.Suspense>

      {/* FOOTER */}
      <footer className="border-t py-12 px-6" style={{ borderColor: borderColor, backgroundColor: isDark ? "#08080a" : "#f1f1f3" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-4">
            {(about.socialLinks || []).map((link, i) => {
              if (!link) return null;
              const Icon = SOCIAL_ICONS[link.icon] || FaGlobe;
              return (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors"
                  style={{
                    border: `1px solid ${borderColor}`,
                    backgroundColor: isDark ? "#18181b" : "#f4f4f5",
                    color: isDark ? "#a1a1aa" : "#6b7280",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = accent; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = isDark ? "#a1a1aa" : "#6b7280"; }}
                >
                  <Icon />
                </a>
              );
            })}
          </div>

          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
            {copyright || `© ${new Date().getFullYear()} ${about.name || "JOHN DOE"}. All Rights Reserved.`}
          </span>
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
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
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
