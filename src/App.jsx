import "./App.css";

import { useEffect, useRef, useState } from "react";
import Particles from "./common/Particles";
import Sidebar from "./components/Sidebar";
import { sidebarItems } from "./const";
import About from "./sections/About";
import Certification from "./sections/Certification";
import Contact from "./sections/Contact";
import Home from "./sections/Home";
import Journey from "./sections/Journey";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function App() {
  const [activeSection, setActiveSection] = useState("Home");
  const mainRef = useRef(null);
  const beamFillRef = useRef(null);
  const activeSectionRef = useRef("Home");
  const isScrollingRef = useRef(false);
  const touchStartYRef = useRef(0);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const transitionToSection = (item) => {
    if (!mainRef.current) return;
    isScrollingRef.current = true;
    setActiveSection(item.name);
    window.history.replaceState(null, "", item.href);

    const id = item.href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      mainRef.current.scrollTo({
        top: el.offsetTop,
        behavior: "smooth",
      });
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
      const scrollTop = mainEl.scrollTop;

      // 1. Mutate tracking beam directly to bypass React render cycle
      const scrollHeight = mainEl.scrollHeight - mainEl.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      if (beamFillRef.current) {
        beamFillRef.current.style.height = `${Math.max(progress * 100, 5)}%`;
      }

      if (isScrollingRef.current) return;

      if (cachedSections.length === 0) return;

      // 2. Find the active section using cached offsets
      const sectionOffsets = cachedSections.map((sec) => {
        const offset = Math.abs(sec.el.offsetTop - scrollTop);
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

    const handleWheel = (e) => {
      if (document.querySelector('[role="dialog"]') || document.querySelector('.modal-open') || document.body.style.overflow === 'hidden') {
        return;
      }

      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const activeName = activeSectionRef.current;
      const activeItem = sidebarItems.find(item => item.name === activeName);
      if (!activeItem) return;

      const id = activeItem.href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;

      const scrollTop = mainEl.scrollTop;
      const clientHeight = mainEl.clientHeight;
      const sectionTop = el.offsetTop;
      const sectionHeight = el.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;

      const deltaY = e.deltaY;

      if (deltaY > 0) {
        const isAtBottom = scrollTop + clientHeight >= sectionBottom - 10;
        if (isAtBottom) {
          const currentIndex = sidebarItems.findIndex(item => item.name === activeName);
          if (currentIndex < sidebarItems.length - 1) {
            e.preventDefault();
            const nextItem = sidebarItems[currentIndex + 1];
            transitionToSection(nextItem);
          }
        }
      } else if (deltaY < 0) {
        const isAtTop = scrollTop <= sectionTop + 10;
        if (isAtTop) {
          const currentIndex = sidebarItems.findIndex(item => item.name === activeName);
          if (currentIndex > 0) {
            e.preventDefault();
            const prevItem = sidebarItems[currentIndex - 1];
            transitionToSection(prevItem);
          }
        }
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (document.querySelector('[role="dialog"]') || document.querySelector('.modal-open') || document.body.style.overflow === 'hidden') {
        return;
      }

      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      if (e.touches.length === 0) return;

      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchEndY;

      if (Math.abs(deltaY) < 30) return;

      const activeName = activeSectionRef.current;
      const activeItem = sidebarItems.find(item => item.name === activeName);
      if (!activeItem) return;

      const id = activeItem.href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;

      const scrollTop = mainEl.scrollTop;
      const clientHeight = mainEl.clientHeight;
      const sectionTop = el.offsetTop;
      const sectionHeight = el.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;

      if (deltaY > 0) {
        const isAtBottom = scrollTop + clientHeight >= sectionBottom - 10;
        if (isAtBottom) {
          const currentIndex = sidebarItems.findIndex(item => item.name === activeName);
          if (currentIndex < sidebarItems.length - 1) {
            if (e.cancelable) e.preventDefault();
            const nextItem = sidebarItems[currentIndex + 1];
            transitionToSection(nextItem);
          }
        }
      } else if (deltaY < 0) {
        const isAtTop = scrollTop <= sectionTop + 10;
        if (isAtTop) {
          const currentIndex = sidebarItems.findIndex(item => item.name === activeName);
          if (currentIndex > 0) {
            if (e.cancelable) e.preventDefault();
            const prevItem = sidebarItems[currentIndex - 1];
            transitionToSection(prevItem);
          }
        }
      }
    };

    mainEl.addEventListener("scroll", handleScroll, { passive: true });
    mainEl.addEventListener("wheel", handleWheel, { passive: false });
    mainEl.addEventListener("touchstart", handleTouchStart, { passive: true });
    mainEl.addEventListener("touchmove", handleTouchMove, { passive: false });
    
    const initTimeout = setTimeout(() => {
      handleScroll();

      const hash = window.location.hash;
      if (hash) {
        const targetItem = sidebarItems.find(item => item.href === hash);
        if (targetItem) {
          const targetId = hash.replace("#", "");
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            mainEl.scrollTo({
              top: targetEl.offsetTop,
              behavior: "auto",
            });
            setActiveSection(targetItem.name);
          }
        }
      }
    }, 200);

    return () => {
      mainEl.removeEventListener("scroll", handleScroll);
      mainEl.removeEventListener("wheel", handleWheel);
      mainEl.removeEventListener("touchstart", handleTouchStart);
      mainEl.removeEventListener("touchmove", handleTouchMove);
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
    <div className="relative min-h-screen flex flex-col md:flex-row bg-black overflow-hidden">
      <div
        className="fixed inset-0 w-full h-full -z-10"
        style={{
          backgroundColor: "black",
        }}
      >
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          particleHoverFactor={3}
          alphaParticles={false}
          disableRotation={false}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Tracking Beam - hidden on mobile */}
      <div
        className="hidden md:block fixed right-3 top-0 h-full w-1 bg-gray-700/30 z-30 rounded-full cursor-pointer"
        onClick={handleBeamClick}
      >
        <div
          ref={beamFillRef}
          className="absolute left-0 w-full bg-sky-500 rounded-full transition-all duration-200"
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
        className="z-20"
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
          h-screen
          overflow-y-auto
          scroll-smooth
          relative
          z-10
          p-2
          sm:p-4
          md:p-6
          pb-20
          md:pb-6
        "
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Home />
          <About />
          <Skills />
          <Projects />
          <Certification />
          <Journey />
          <Contact />
        </motion.div>
      </main>
    </div>
  );
}
