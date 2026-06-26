import "../styles/App.css";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUp } from "react-icons/hi2";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import { sidebarItems } from "../constants";
import Home from "../sections/Home";
import { usePortfolio } from "../context/PortfolioContext";
import SectionWrapper from "../components/common/SectionWrapper";

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

export default function Template1() {
  const {
    roles, description, centerSvg, orbitingStacks,
    about, servicesSubtitle, servicesData, skills, skillCategories,
    projects, certifications, timelineData, summaryStats,
    contactInfo, testimonials, blogs, faqs,
    pageTitles, pageDescriptions, sectionVisibility, sectionTitles, sectionOrder,
    selectedTemplate, copyright, sectionLayouts,
    navPosition, primaryColor,
  } = usePortfolio();

  const [activeSection,    setActiveSection]    = useState("Home");
  const [showScrollTop,    setShowScrollTop]    = useState(false);
  const [isScrollHovered,  setIsScrollHovered]  = useState(false);
  const mainRef            = useRef(null);
  const beamFillRef        = useRef(null);
  const isScrollingRef     = useRef(false);
  const cachedElementsRef  = useRef({});

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
  useEffect(() => {
    const titles = pageTitles || {};
    const descriptions = pageDescriptions || {};
    if (titles[activeSection])       document.title = titles[activeSection];
    if (descriptions[activeSection]) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", descriptions[activeSection]);
    }
  }, [activeSection, pageTitles, pageDescriptions]);

  const transitionToSection = (item) => {
    if (!mainRef.current) return;
    isScrollingRef.current = true;
    setActiveSection(item.name);
    window.history.replaceState(null, "", item.href);
    const id = item.href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        const rect = el.getBoundingClientRect();
        window.scrollTo({ top: rect.top + (window.scrollY || document.documentElement.scrollTop), behavior: "smooth" });
      } else {
        const mainEl = mainRef.current;
        const rect = el.getBoundingClientRect();
        const mainRect = mainEl.getBoundingClientRect();
        mainEl.scrollTo({ top: rect.top - mainRect.top + mainEl.scrollTop, behavior: "smooth" });
      }
    }
    setTimeout(() => { isScrollingRef.current = false; }, 1000);
  };

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      const scrollTop = isMobile ? (window.scrollY || document.documentElement.scrollTop) : mainEl.scrollTop;

      setShowScrollTop(scrollTop > 400);

      if (!isMobile && beamFillRef.current) {
        const scrollHeight = mainEl.scrollHeight - mainEl.clientHeight;
        const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
        beamFillRef.current.style.height = `${Math.max(progress * 100, 5)}%`;
      }

      if (isScrollingRef.current) return;

      const activeSections = sidebarItems
        .filter(item => !sectionVisibility || sectionVisibility[item.name] !== false)
        .map((item) => {
          const id = item.href.replace("#", "");
          if (!cachedElementsRef.current[id]) {
            cachedElementsRef.current[id] = document.getElementById(id);
          }
          return { name: item.name, href: item.href, el: cachedElementsRef.current[id] };
        })
        .filter(item => item.el);

      if (activeSections.length === 0) return;

      const sectionOffsets = activeSections.map((sec) => ({
        name: sec.name, href: sec.href,
        offset: Math.abs(sec.el.getBoundingClientRect().top),
      }));

      const closest = sectionOffsets.reduce((a, b) => a.offset < b.offset ? a : b);

      setActiveSection((prev) => {
        if (prev !== closest.name) {
          window.history.replaceState(null, "", closest.href);
          return closest.name;
        }
        return prev;
      });
    };

    mainEl.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    const initTimeout = setTimeout(() => {
      handleScroll();
      const hash = window.location.hash;
      if (hash) {
        const targetItem = sidebarItems.find(item => item.href === hash);
        if (targetItem && (!sectionVisibility || sectionVisibility[targetItem.name] !== false)) {
          const targetEl = document.getElementById(hash.replace("#", ""));
          if (targetEl) {
            const isMobile = window.innerWidth < 768;
            if (isMobile) {
              window.scrollTo({ top: targetEl.getBoundingClientRect().top + window.scrollY, behavior: "auto" });
            } else {
              const rect = targetEl.getBoundingClientRect();
              const mainRect = mainEl.getBoundingClientRect();
              mainEl.scrollTo({ top: rect.top - mainRect.top + mainEl.scrollTop, behavior: "auto" });
            }
            setActiveSection(targetItem.name);
          }
        }
      }
    }, 200);

    return () => {
      mainEl.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(initTimeout);
    };
  }, [sectionVisibility]);

  const handleBeamClick = (e) => {
    const beam = e.currentTarget;
    const rect = beam.getBoundingClientRect();
    const percent = (e.clientY - rect.top) / rect.height;
    if (mainRef.current) {
      const mainEl = mainRef.current;
      mainEl.scrollTo({ top: percent * (mainEl.scrollHeight - mainEl.clientHeight), behavior: "smooth" });
    }
  };

  return (
    <div className={`relative z-0 min-h-screen flex ${navPosition === "left" ? "flex-col md:flex-row" : "flex-col"} bg-transparent overflow-hidden text-[var(--text-white-or-dark)]`}>

      {/* Top Navbar (only renders when navPosition === 'top') */}
      <TopNavbar
        activeSection={activeSection}
        onItemClick={transitionToSection}
        sectionVisibility={sectionVisibility}
        about={about}
        primaryColor={primaryColor}
        navPosition={navPosition}
      />

      {/* Tracking Beam */}
      <div
        className="hidden md:block fixed right-3 top-0 h-full w-1 z-30 rounded-full cursor-pointer"
        style={{ backgroundColor: "rgba(var(--primary-rgb), 0.2)" }}
        onClick={handleBeamClick}
      >
        <div
          ref={beamFillRef}
          className="absolute left-0 w-full rounded-full transition-all duration-200"
          style={{ top: 0, height: "5%", backgroundColor: "var(--primary)" }}
        />
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 15, duration: 0.7 }}
        className="relative z-20"
      >
        <Sidebar
          activeSection={activeSection}
          onItemClick={transitionToSection}
          sectionVisibility={sectionVisibility}
          navPosition={navPosition}
        />
      </motion.div>

      {/* Scrollable content */}
      <main
        ref={mainRef}
        className={`flex-1 ${navPosition === "left" ? "md:ml-20" : ""} md:h-screen md:overflow-y-auto h-auto overflow-y-visible scroll-smooth relative z-10 p-2 sm:p-4 md:p-6 pb-24 md:pb-6`}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          {(!sectionVisibility || sectionVisibility.Home !== false) && (            <SectionWrapper sectionName="Home">
              <Home
                name={about?.name}
                roles={roles}
                description={description}
                centerSvg={centerSvg}
                orbitingStacks={orbitingStacks}
                statusBadgeText={about?.statusBadgeText}
                selectedTemplate={selectedTemplate}
                summaryStats={summaryStats}
                design={sectionLayouts?.Home}
              />
            </SectionWrapper>)}
          <React.Suspense fallback={
            <div className="w-full h-[50vh] flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
                style={{ borderColor: "var(--primary) transparent var(--primary) transparent", filter: "drop-shadow(0 0 6px var(--primary))" }}
              />
            </div>
          }>
            {orderedSections.map((sectionName) => {
              const renderer = SECTION_COMPONENTS[sectionName];
              if (!renderer) return null;
              return (
                <SectionWrapper key={sectionName} sectionName={sectionName}>
                  {renderer(sectionProps)}
                </SectionWrapper>
              );
            })}
          </React.Suspense>

          {/* Footer */}
          <footer className="border-t py-12 px-6 mt-12 text-center animate-fadeIn" style={{ borderColor: "rgba(255, 255, 255, 0.08)", backgroundColor: "transparent" }}>
            <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider block">
              {copyright || `© 2026 ${about?.name || "Developer"}. All rights reserved.`}
            </span>
          </footer>
        </motion.div>
      </main>

      {/* Scroll to Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => {
              if (window.innerWidth < 768) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else if (mainRef.current) {
                mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="fixed bottom-6 right-6 md:right-10 z-40 w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer shadow-lg backdrop-blur-md transition-all"
            style={{
              borderColor: isScrollHovered ? "transparent" : "rgba(var(--primary-rgb), 0.4)",
              color: isScrollHovered ? "var(--primary-contrast, #000000)" : "var(--primary)",
              backgroundColor: isScrollHovered ? "var(--primary)" : "var(--card-bg, rgba(0,0,0,0.6))",
              boxShadow: isScrollHovered ? "0 0 15px rgba(var(--primary-rgb), 0.4)" : "none",
            }}
            onMouseEnter={() => setIsScrollHovered(true)}
            onMouseLeave={() => setIsScrollHovered(false)}
            aria-label="Scroll to top"
          >
            <HiArrowUp className="text-lg" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
