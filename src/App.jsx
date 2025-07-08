import "./App.css";

import { useEffect, useRef, useState } from "react";
import CustomCursor from "./common/CustomCursor";
// import Particles from "./common/Particles";
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const mainRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const handleScroll = () => {
      const scrollTop = mainEl.scrollTop;
      const sectionOffsets = sidebarItems.map((item) => {
        const id = item.href.replace("#", "");
        const el = document.getElementById(id);
        if (!el) return { name: item.name, offset: Infinity };
        // Offset relative to the scroll container
        const offset = Math.abs(el.offsetTop - scrollTop);
        // Only consider sections above or near the top
        return { name: item.name, offset, el };
      });
      // Find the section with the smallest offset (closest to top)
      const closest = sectionOffsets.reduce((a, b) =>
        a.offset < b.offset ? a : b
      );
      setActiveSection(closest.name);
      // Update URL hash
      const item = sidebarItems.find((i) => i.name === closest.name);
      if (item) window.history.replaceState(null, "", item.href);

      // Calculate scroll progress
      const scrollHeight = mainEl.scrollHeight - mainEl.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(progress);
    };

    mainEl.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 10}px, ${
          e.clientY - 10
        }px, 0)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSidebarClick = (item) => {
    const id = item.href.replace("#", "");
    const el = document.getElementById(id);
    if (el && mainRef.current) {
      mainRef.current.scrollTo({
        top: el.offsetTop,
        behavior: "smooth",
      });
    }
    setActiveSection(item.name);
    window.history.replaceState(null, "", item.href);
  };

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
    <div className="relative min-h-screen flex flex-col md:flex-row bg-black">
      <CustomCursor ref={cursorRef} />
      {/* <div
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
      </div> */}

      {/* Tracking Beam */}
      <div
        className="fixed right-3 top-0 h-full w-1 bg-gray-700/30 z-30 rounded-full cursor-pointer"
        onClick={handleBeamClick}
      >
        <div
          className="absolute left-0 w-full bg-sky-500 rounded-full transition-all duration-200"
          style={{
            top: 0,
            height: `${Math.max(scrollProgress * 100, 5)}%`,
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
          md:ml-15
          h-screen
          overflow-y-auto
          scroll-smooth
          relative
          z-10
          p-2
          sm:p-4
          md:p-5
          space-y-16
          sm:space-y-20
          md:space-y-24
        "
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <section id="home">
            <Home />
          </section>
          <section id="about">
            <About />
          </section>
          {/* <section id="personal">
            <Summary />
          </section> */}
          <section id="skills">
            <Skills />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="certification">
            <Certification />
          </section>
          {/* <section id="testimonials">
            <Testimonials />
          </section> */}
          <section id="journey">
            <Journey />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </motion.div>
      </main>
    </div>
  );
}
