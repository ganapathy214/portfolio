import "./App.css";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUp } from "react-icons/hi2";
import Particles from "./common/Particles";
import Sidebar from "./components/Sidebar";
import { sidebarItems, PAGE_DESCRIPTIONS, PAGE_TITLES } from "./constants";
import About from "./sections/About";
import Services from "./sections/Services";
import Certification from "./sections/Certification";
import Contact from "./sections/Contact";
import Home from "./sections/Home";
import Journey from "./sections/Journey";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";

export default function App() {
  const [activeSection, setActiveSection] = useState("Home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mainRef = useRef(null);
  const beamFillRef = useRef(null);
  const activeSectionRef = useRef("Home");
  const isScrollingRef = useRef(false);
  const touchStartYRef = useRef(0);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    if (PAGE_TITLES[activeSection]) {
      document.title = PAGE_TITLES[activeSection];
    }
    
    if (PAGE_DESCRIPTIONS[activeSection]) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", PAGE_DESCRIPTIONS[activeSection]);
      }
    }
  }, [activeSection]);

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

    // Cache the section elements on mount to avoid document.getElementById queries on scroll
    const cachedSections = sidebarItems.map((item) => {
      const id = item.href.replace("#", "");
      const el = document.getElementById(id);
      return { name: item.name, href: item.href, el };
    }).filter(item => item.el);

    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
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

      if (cachedSections.length === 0) return;

      // 2. Find the active section using viewport-relative bounding rects (extremely robust for both window & container scroll)
      const sectionOffsets = cachedSections.map((sec) => {
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
        if (targetItem) {
          const targetId = hash.replace("#", "");
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            const isMobile = window.innerWidth < 768;
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
  }, []);

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
    <div className="relative min-h-screen flex flex-col md:flex-row bg-[#000000] overflow-hidden text-[#FFFFFF]">
      <div
        className="fixed inset-0 w-full h-full -z-10"
        style={{
          backgroundColor: "#000000",
        }}
      >
        <Particles
          particleColors={["#00D5D5", "#FFFFFF"]}
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

      {/* Tracking Beam - hidden on mobile */}
      <div
        className="hidden md:block fixed right-3 top-0 h-full w-1 bg-[#00D5D5]/20 z-30 rounded-full cursor-pointer"
        onClick={handleBeamClick}
      >
        <div
          ref={beamFillRef}
          className="absolute left-0 w-full bg-[#00D5D5] rounded-full transition-all duration-200"
          style={{
            top: 0,
            height: "5%",
          }}
        />
      </div>

      {/* Sidebar */}
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
        />
      </motion.div>

      {/* Scrollable content */}
      <main
        ref={mainRef}
        className="
          flex-1
          md:ml-20
          h-auto
          md:h-screen
          overflow-y-visible
          md:overflow-y-auto
          scroll-smooth
          relative
          z-10
          p-2
          sm:p-4
          md:p-6
          pb-6
        "
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Home />
          <About />
          <Services />
          <Skills />
          <Projects />
          <Certification />
          <Journey />
          <Contact />
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
              const isMobile = window.innerWidth < 768;
              if (isMobile) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else if (mainRef.current) {
                mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="fixed bottom-6 right-6 md:right-10 z-40 w-10 h-10 rounded-full bg-black/60 border border-[#00D5D5]/40 text-[#00D5D5] flex items-center justify-center cursor-pointer shadow-lg backdrop-blur-md transition-all hover:bg-[#00D5D5] hover:text-black hover:border-transparent hover:shadow-[0_0_15px_rgba(0,213,213,0.4)]"
            aria-label="Scroll to top"
          >
            <HiArrowUp className="text-lg" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
