import React, { useState, useEffect, useRef } from "react";
import { FiEdit } from "react-icons/fi";

const ALL_SECTIONS = [
  "home", "about", "services", "skills", "projects",
  "certification", "testimonials", "experience", "education", "blogs", "faq", "contact"
];

export default function SectionWrapper({ sectionName, children }) {
  const [isPreview, setIsPreview] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActivePulse, setIsActivePulse] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const containerRef = useRef(null);

  useEffect(() => {
    // Check if the URL has ?preview=true
    const searchParams = new URLSearchParams(window.location.search);
    setIsPreview(searchParams.get("preview") === "true");

    const urlActive = searchParams.get("activeSection");
    if (urlActive) {
      setActiveSection(urlActive);
    }

    // Scroll and highlight listener
    const handleMessage = (event) => {
      const { type, section } = event.data || {};
      if (type === "SCROLL_TO_SECTION" && section) {
        setActiveSection(section);
        if (section.toLowerCase() === sectionName.toLowerCase()) {
          containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          setIsActivePulse(true);
          setTimeout(() => setIsActivePulse(false), 2000); // Pulse highlight for 2s
        }
      }
      if (type === "SET_ACTIVE_SECTION" && section) {
        setActiveSection(section);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [sectionName]);

  if (!isPreview) {
    return <div id={sectionName.toLowerCase()} style={{ minHeight: "78vh" }}>{children}</div>;
  }

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Post message to parent editor window
    window.parent.postMessage({ type: "OPEN_VISUAL_EDITOR", sectionName }, "*");
  };

  const isCurrentlyActive = activeSection.toLowerCase() === sectionName.toLowerCase();

  return (
    <div
      ref={containerRef}
      id={sectionName.toLowerCase()}
      className="relative transition-all duration-300 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        minHeight: "78vh",
        outline: isCurrentlyActive
          ? "3px solid var(--primary, #f43f5e)"
          : isHovered 
            ? "2px dashed var(--primary, #f43f5e)" 
            : isActivePulse
              ? "3px dashed var(--primary, #f43f5e)"
              : "none",
        outlineOffset: "-3px",
        boxShadow: isCurrentlyActive
          ? "0 0 30px rgba(244, 63, 94, 0.2)"
          : isActivePulse
            ? "0 0 30px rgba(244, 63, 94, 0.3)"
            : "none",
      }}
    >
      {isCurrentlyActive && (
        <div 
          className="absolute top-4 left-4 z-[9998] px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider select-none bg-stone-900 border text-white"
          style={{
            borderColor: "var(--primary, #f43f5e)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
          }}
        >
          <span className="w-2 h-2 rounded-full inline-block mr-1.5 align-middle bg-emerald-500 animate-pulse" />
          Active: {sectionName}
        </div>
      )}
      {children}
      {isHovered && (
        <button
          onClick={handleEditClick}
          className="absolute top-4 right-4 z-[9999] flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-950 border text-white font-bold text-xs shadow-2xl hover:bg-stone-900 cursor-pointer select-none transition-all duration-200"
          style={{ borderColor: "var(--primary, #f43f5e)" }}
        >
          <FiEdit style={{ color: "var(--primary, #f43f5e)" }} />
          <span>Edit Content</span>
        </button>
      )}
    </div>
  );
}
