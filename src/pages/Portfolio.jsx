import "../styles/App.css";

import { useEffect, useRef, useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUp } from "react-icons/hi2";
import Particles from "../components/common/Particles";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import { sidebarItems } from "../constants";
import Home from "../sections/Home";
import Template2Page from "./Template2Page";
import Template3Page from "./Template3Page";
import Template4Page from "./Template4Page";
import Template5Page from "./Template5Page";
import Template6Page from "./Template6Page";

const About = React.lazy(() => import("../sections/About"));
const Services = React.lazy(() => import("../sections/Services"));
const Skills = React.lazy(() => import("../sections/Skills"));
const Projects = React.lazy(() => import("../sections/Projects"));
const Certification = React.lazy(() => import("../sections/Certification"));
const Testimonials = React.lazy(() => import("../sections/Testimonials"));
const Journey = React.lazy(() => import("../sections/Journey"));
const Blogs = React.lazy(() => import("../sections/Blogs"));
const Faq = React.lazy(() => import("../sections/Faq"));
const Contact = React.lazy(() => import("../sections/Contact"));

export default function Portfolio({ selectedTemplate = "template-1", primaryColor, roles, description, centerSvg, orbitingStacks, about, servicesSubtitle, servicesData, skills, skillCategories, projects, certifications, timelineData, summaryStats, contactInfo, pageTitles, pageDescriptions, sectionVisibility, sectionTitles, testimonials, blogs, faqs, themeMode }) {
  /* ── Template page delegates ── */
  if (selectedTemplate === "template-2") {
    return (
      <Template2Page
        primaryColor={primaryColor}
        roles={roles}
        description={description}
        about={about}
        servicesData={servicesData}
        skills={skills}
        projects={projects}
        certifications={certifications}
        testimonials={testimonials}
        blogs={blogs}
        faqs={faqs}
        sectionVisibility={sectionVisibility}
        summaryStats={summaryStats}
        contactInfo={contactInfo}
        centerSvg={centerSvg}
        themeMode={themeMode}
      />
    );
  }
  if (selectedTemplate === "template-3") {
    return (
      <Template3Page
        primaryColor={primaryColor}
        roles={roles}
        description={description}
        about={about}
        servicesData={servicesData}
        skills={skills}
        projects={projects}
        testimonials={testimonials}
        blogs={blogs}
        faqs={faqs}
        sectionVisibility={sectionVisibility}
        summaryStats={summaryStats}
        contactInfo={contactInfo}
        themeMode={themeMode}
      />
    );
  }
  if (selectedTemplate === "template-4") {
    return (
      <Template4Page
        primaryColor={primaryColor}
        roles={roles}
        description={description}
        about={about}
        skills={skills}
        projects={projects}
        certifications={certifications}
        timelineData={timelineData}
        contactInfo={contactInfo}
        themeMode={themeMode}
        sectionVisibility={sectionVisibility}
      />
    );
  }
  if (selectedTemplate === "template-5") {
    return (
      <Template5Page
        primaryColor={primaryColor}
        roles={roles}
        description={description}
        about={about}
        servicesData={servicesData}
        skills={skills}
        projects={projects}
        testimonials={testimonials}
        contactInfo={contactInfo}
        themeMode={themeMode}
        sectionVisibility={sectionVisibility}
      />
    );
  }
  if (selectedTemplate === "template-6") {
    return (
      <Template6Page
        primaryColor={primaryColor}
        roles={roles}
        description={description}
        about={about}
        servicesData={servicesData}
        skills={skills}
        projects={projects}
        contactInfo={contactInfo}
        themeMode={themeMode}
        sectionVisibility={sectionVisibility}
      />
    );
  }

  const [activeSection, setActiveSection] = useState("Home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrollHovered, setIsScrollHovered] = useState(false);
  const mainRef = useRef(null);
  const beamFillRef = useRef(null);
  const activeSectionRef = useRef("Home");
  const isScrollingRef = useRef(false);
  const cachedElementsRef = useRef({});

  const sectionsList = ["About", "Services", "Skills", "Projects", "Certification", "Testimonials", "Journey", "Blogs", "Faq", "Contact"];
  const visibleSections = sectionsList.filter(id => !sectionVisibility || sectionVisibility[id] !== false);
  const getSectionNum = (id) => {
    const idx = visibleSections.indexOf(id);
    return idx !== -1 ? String(idx + 1).padStart(2, "0") : "";
  };

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const titles = pageTitles || {};
    const descriptions = pageDescriptions || {};
    if (titles[activeSection]) {
      document.title = titles[activeSection];
    }
    
    if (descriptions[activeSection]) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", descriptions[activeSection]);
      }
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
        const targetTop = rect.top + (window.scrollY || document.documentElement.scrollTop);
        window.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });
      } else {
        const mainEl = mainRef.current;
        const rect = el.getBoundingClientRect();
        const mainRect = mainEl.getBoundingClientRect();
        const targetTop = rect.top - mainRect.top + mainEl.scrollTop;
        mainEl.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });
      }
    }

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  const handleSidebarClick = (item) => {
    transitionToSection(item);
  };

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const handleScroll = () => {
      const isMobile = window.innerWidth < 768 || selectedTemplate === "template-2";
      const scrollTop = isMobile
        ? (window.scrollY || document.documentElement.scrollTop)
        : mainEl.scrollTop;

      // Show/hide scroll to top button
      if (scrollTop > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // 1. Mutate tracking beam directly to bypass React render cycle (only needed/visible on desktop)
      if (!isMobile && beamFillRef.current) {
        const scrollHeight = mainEl.scrollHeight - mainEl.clientHeight;
        const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
        beamFillRef.current.style.height = `${Math.max(progress * 100, 5)}%`;
      }

      if (isScrollingRef.current) return;

      // Dynamically resolve section elements (lazy loading safe)
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

      // 2. Find the active section using viewport-relative bounding rects (extremely robust for both window & container scroll)
      const sectionOffsets = activeSections.map((sec) => {
        const rect = sec.el.getBoundingClientRect();
        // Since rect.top is relative to the viewport, the section closest to viewport top is active
        const offset = Math.abs(rect.top);
        return { name: sec.name, href: sec.href, offset };
      });

      const closest = sectionOffsets.reduce((a, b) =>
        a.offset < b.offset ? a : b
      );

      // 3. Only update state when section transitions occur
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
          const targetId = hash.replace("#", "");
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            const isMobile = window.innerWidth < 768 || selectedTemplate === "template-2";
            if (isMobile) {
              const rect = targetEl.getBoundingClientRect();
              const targetTop = rect.top + (window.scrollY || document.documentElement.scrollTop);
              window.scrollTo({
                top: targetTop,
                behavior: "auto",
              });
            } else {
              const rect = targetEl.getBoundingClientRect();
              const mainRect = mainEl.getBoundingClientRect();
              const targetTop = rect.top - mainRect.top + mainEl.scrollTop;
              mainEl.scrollTo({
                top: targetTop,
                behavior: "auto",
              });
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
    const clickY = e.clientY - rect.top;
    const percent = clickY / rect.height;

    if (mainRef.current) {
      const mainEl = mainRef.current;
      const scrollHeight = mainEl.scrollHeight - mainEl.clientHeight;
      mainEl.scrollTo({
        top: percent * scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`relative z-0 min-h-screen flex flex-col ${selectedTemplate === "template-1" ? "md:flex-row" : ""} bg-[var(--bg-main)] overflow-hidden text-[var(--text-white-or-dark)]`}>
      <div
        className="fixed inset-0 w-full h-full -z-10 bg-transparent"
      >
        <Particles
          particleColors={[primaryColor || "#00D5D5", "#FFFFFF"]}
          particleCount={80}
          particleSpread={12}
          speed={0.05}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          particleHoverFactor={2.5}
          alphaParticles={true}
          disableRotation={false}
          style={{ width: "100%", height: "100%", opacity: 0.18 }}
        />
      </div>

      {/* Tracking Beam - hidden on mobile or template 2 */}
      {selectedTemplate === "template-1" && (
        <div
          className="hidden md:block fixed right-3 top-0 h-full w-1 z-30 rounded-full cursor-pointer"
          style={{ backgroundColor: "rgba(var(--primary-rgb), 0.2)" }}
          onClick={handleBeamClick}
        >
          <div
            ref={beamFillRef}
            className="absolute left-0 w-full rounded-full transition-all duration-200"
            style={{
              top: 0,
              height: "5%",
              backgroundColor: "var(--primary)",
            }}
          />
        </div>
      )}

      {/* Sidebar - Template 1 only */}
      {selectedTemplate === "template-1" && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            duration: 0.7,
          }}
          className="relative z-20"
        >
          <Sidebar
            activeSection={activeSection}
            onItemClick={handleSidebarClick}
            sectionVisibility={sectionVisibility}
          />
        </motion.div>
      )}

      {/* TopNavbar - Template 2 only */}
      {selectedTemplate === "template-2" && (
        <TopNavbar
          activeSection={activeSection}
          onItemClick={handleSidebarClick}
          sectionVisibility={sectionVisibility}
          about={about}
          primaryColor={primaryColor}
        />
      )}

      {/* Scrollable content */}
      <main
        ref={mainRef}
        className={`
          flex-1
          ${selectedTemplate === "template-1" ? "md:ml-20 md:h-screen md:overflow-y-auto" : "md:ml-0 md:h-auto md:overflow-y-visible"}
          h-auto
          overflow-y-visible
          scroll-smooth
          relative
          z-10
          p-2
          sm:p-4
          md:p-6
          pb-24
          md:pb-6
        `}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {(!sectionVisibility || sectionVisibility.Home !== false) && (
            <Home
              name={about?.name}
              roles={roles}
              description={description}
              centerSvg={centerSvg}
              orbitingStacks={orbitingStacks}
              statusBadgeText={about?.statusBadgeText}
              selectedTemplate={selectedTemplate}
              summaryStats={summaryStats}
            />
          )}
          <div className={selectedTemplate === "template-2" ? "max-w-5xl mx-auto w-full" : ""}>
          <React.Suspense fallback={
            <div className="w-full h-[50vh] flex items-center justify-center">
              <div
                className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
                style={{
                  borderColor: "var(--primary) transparent var(--primary) transparent",
                  filter: "drop-shadow(0 0 6px var(--primary))"
                }}
              />
            </div>
          }>
            {(!sectionVisibility || sectionVisibility.About !== false) && <About about={about} title={sectionTitles?.About} sectionNum={getSectionNum("About")} />}
            {(!sectionVisibility || sectionVisibility.Services !== false) && (
              <Services servicesSubtitle={servicesSubtitle} servicesData={servicesData} title={sectionTitles?.Services} sectionNum={getSectionNum("Services")} />
            )}
            {(!sectionVisibility || sectionVisibility.Skills !== false) && (
              <Skills skills={skills} skillCategories={skillCategories} title={sectionTitles?.Skills} sectionNum={getSectionNum("Skills")} />
            )}
            {(!sectionVisibility || sectionVisibility.Projects !== false) && <Projects projects={projects} title={sectionTitles?.Projects} sectionNum={getSectionNum("Projects")} />}
            {(!sectionVisibility || sectionVisibility.Certification !== false) && (
              <Certification certifications={certifications} title={sectionTitles?.Certification} sectionNum={getSectionNum("Certification")} />
            )}
            {(!sectionVisibility || sectionVisibility.Testimonials !== false) && (
              <Testimonials testimonials={testimonials} title={sectionTitles?.Testimonials} sectionNum={getSectionNum("Testimonials")} />
            )}
            {(!sectionVisibility || sectionVisibility.Journey !== false) && (
              <Journey timelineData={timelineData} summaryStats={summaryStats} title={sectionTitles?.Journey} sectionNum={getSectionNum("Journey")} />
            )}
            {(!sectionVisibility || sectionVisibility.Blogs !== false) && (
              <Blogs blogs={blogs} title={sectionTitles?.Blogs} sectionNum={getSectionNum("Blogs")} />
            )}
            {(!sectionVisibility || sectionVisibility.Faq !== false) && (
              <Faq faqs={faqs} title={sectionTitles?.Faq} sectionNum={getSectionNum("Faq")} />
            )}
            {(!sectionVisibility || sectionVisibility.Contact !== false) && <Contact contactInfo={contactInfo} title={sectionTitles?.Contact} sectionNum={getSectionNum("Contact")} />}
          </React.Suspense>
          </div>
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
              const isMobile = window.innerWidth < 768 || selectedTemplate === "template-2";
              if (isMobile) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else if (mainRef.current) {
                mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="fixed bottom-6 right-6 md:right-10 z-40 w-10 h-10 rounded-full bg-black/60 border flex items-center justify-center cursor-pointer shadow-lg backdrop-blur-md transition-all"
            style={{
              borderColor: isScrollHovered ? "transparent" : "rgba(var(--primary-rgb), 0.4)",
              color: isScrollHovered ? "#000000" : "var(--primary)",
              backgroundColor: isScrollHovered ? "var(--primary)" : "rgba(0, 0, 0, 0.6)",
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
