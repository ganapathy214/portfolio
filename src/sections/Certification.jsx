import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  FiCalendar,
  FiBriefcase,
  FiEye,
  FiRefreshCw,
  FiExternalLink,
} from "react-icons/fi";
import { certifications, getTheme } from "../constants";
import SectionLayout from "../layout/SectionLayout";
import CertModal from "../components/Certification/CertModal";

const resolveAlphaColor = (color, hexOpacity) => {
  if (color && color.startsWith("var(")) {
    const opacityMap = {
      "12": 0.07,
      "15": 0.08,
      "20": 0.125,
      "25": 0.15,
      "30": 0.18,
      "40": 0.25,
    };
    const decimal = opacityMap[hexOpacity] || 0.2;
    return `rgba(var(--primary-rgb), ${decimal})`;
  }
  return `${color}${hexOpacity}`;
};

/* ─── Main Certification Section ─── */
const Certification = () => {
  const headerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const cardBackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCert, setActiveCert] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // Parallax mouse tilt coordinates
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const activeCertData = certifications[activeIndex];
  const theme = getTheme(activeCertData?.issuer);

  // Split description dynamically for skills preview
  const skillsList = useMemo(() => {
    if (!activeCertData?.description) return [];
    return activeCertData.description
      .split(/[,;.-]/)
      .map((t) => t.trim())
      .filter((t) => t.length > 2 && t.length < 28)
      .slice(0, 6);
  }, [activeCertData?.description]);

  // Lock scroll when modal open
  useEffect(() => {
    const main = document.querySelector("main");
    if (activeCert) {
      if (main) main.style.overflowY = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      if (main) main.style.overflowY = "auto";
      document.body.style.overflow = "";
    }
    return () => {
      if (main) main.style.overflowY = "auto";
      document.body.style.overflow = "";
    };
  }, [activeCert]);
  // Reset flip state when card selection changes
  useEffect(() => {
    setIsFlipped(false);
    setRotateX(0);
    setRotateY(0);
  }, [activeIndex]);

  const handleMouseMove = (e) => {
    if (isFlipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // max 12 deg tilt
    setRotateX(((y - centerY) / centerY) * -12);
    setRotateY(((x - centerX) / centerX) * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleVerify = () => {
    if (!activeCertData?.pdfFile) return;
    const baseUrl = import.meta.env.BASE_URL || "/";
    const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    const url = `${cleanBase}files/certification/${encodeURIComponent(activeCertData.pdfFile)}`;
    window.open(url, "_blank");
  };

  return (
    <SectionLayout
      id="certification"
      label="What I achieved?"
      headerRef={headerRef}
      spotlightColor="rgba(var(--primary-rgb), 0.06)"
      textColorClass="text-primary"
    >
      <div className="w-full py-2">
        <div className="w-full min-h-[78vh] flex flex-col md:flex-row gap-8 items-stretch justify-center">

          {/* ── Left Pane: Active 3D Parallax Tilt & Flip Card ── */}
          <div className="w-full md:w-[55%] flex flex-col items-center justify-center gap-4">
            {/* 3D Frame Wrapper */}
            <div
              className="relative  aspect-[4/3] max-w-md cursor-pointer perspective"
              style={{ minHeight: "100%", minWidth: "100%" }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => window.innerWidth >= 768 && setIsFlipped(true)}
              onMouseLeave={() => {
                handleMouseLeave();
                if (window.innerWidth >= 768) {
                  setIsFlipped(false);
                }
              }}
              onClick={() => setIsFlipped((prev) => !prev)}
            >
              {/* Inner card containing Front & Back faces */}
              <motion.div
                animate={{
                  rotateX: isFlipped ? 0 : rotateX,
                  rotateY: isFlipped ? 180 : rotateY,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="w-full h-full transform-style-preserve-3d relative rounded-2xl border"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                  boxShadow: isFlipped
                    ? `0 20px 40px -12px ${resolveAlphaColor(theme.accent, "25")}, 0 0 20px 1px ${resolveAlphaColor(theme.accent, "15")}`
                    : "0 10px 30px rgba(0,0,0,0.6)",
                }}
              >
                {/* ── Front Face ── */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden flex flex-col bg-[#121212]"
                >
                  {/* Top brand header strip */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] z-10"
                    style={{ background: theme.accent, boxShadow: `0 0 10px ${theme.accent}` }}
                  />

                  {/* Image */}
                  <div className="relative w-full flex-1 overflow-hidden bg-[#080808] flex items-center justify-center">
                    <img
                      src={activeCertData?.image}
                      alt={activeCertData?.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(18,18,18,0.92) 0%, transparent 60%)",
                      }}
                    />

                    {/* Interactive indicators */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCert(activeCertData);
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 z-10"
                        style={{
                          background: "rgba(0,0,0,0.75)",
                          borderColor: "rgba(255,255,255,0.15)",
                          color: "#FFF",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = theme.accent;
                          e.currentTarget.style.color = theme.accent;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                          e.currentTarget.style.color = "#FFF";
                        }}
                      >
                        <FiEye className="text-sm" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsFlipped(true);
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 z-10"
                        style={{
                          background: "rgba(0,0,0,0.75)",
                          borderColor: "rgba(255,255,255,0.15)",
                          color: "#FFF",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = theme.accent;
                          e.currentTarget.style.color = theme.accent;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                          e.currentTarget.style.color = "#FFF";
                        }}
                      >
                        <FiRefreshCw className="text-sm" />
                      </button>
                    </div>
                  </div>

                  {/* Metadata bottom bar */}
                  <div className="p-4 sm:p-5 text-left border-t border-white/5">
                    <div className="flex items-center justify-between mb-2 select-none">
                      <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${theme.badge}`}>
                        {activeCertData?.issuer}
                      </span>
                      <span className="text-[9px] text-stone-500 font-mono flex items-center gap-1">
                        <FiCalendar /> {activeCertData?.lastUpdated}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-white leading-snug line-clamp-1">
                      {activeCertData?.title}
                    </h3>
                  </div>
                </div>

                {/* ── Back Face ── */}
                <div
                  ref={cardBackRef}
                  className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-[#121212] p-5 sm:p-6 flex flex-col justify-between overflow-y-auto text-left"
                  style={{ transform: "rotateY(180deg)", overscrollBehavior: "contain" }}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div>
                        <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border select-none ${theme.badge}`}>
                          {activeCertData?.issuer}
                        </span>
                        <h4 className="text-xs text-stone-400 font-semibold mt-1 flex items-center gap-1.5 select-none">
                          <FiBriefcase className="text-[10px]" style={{ color: theme.accent }} /> Offered: {activeCertData?.offeredBy}
                        </h4>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsFlipped(false);
                        }}
                        className="w-7 h-7 rounded-full flex items-center justify-center border border-white/5 text-stone-400 transition-colors hover:text-white"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                      >
                        <FiRefreshCw className="text-[11px]" />
                      </button>
                    </div>

                    {/* Course Outline */}
                    <div className="space-y-1">
                      <span className="text-[8px] font-bold uppercase tracking-widest block font-mono" style={{ color: theme.accent }}>
                        Outline / Description
                      </span>
                      <p className="text-xs text-stone-300 leading-relaxed font-medium">
                        {activeCertData?.description}
                      </p>
                    </div>

                    {/* Verified Skills */}
                    <div className="space-y-1.5">
                      <span className="text-[8px] font-bold uppercase tracking-widest block font-mono" style={{ color: theme.accent }}>
                        Verified Skills
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {skillsList.map((skill, i) => (
                          <span
                            key={i}
                            className="rounded-lg text-[9px] font-bold px-2 py-0.5 cursor-default"
                            style={{
                              background: resolveAlphaColor(theme.accent, "12"),
                              border: `1px solid ${resolveAlphaColor(theme.accent, "30")}`,
                              color: theme.accent,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Verification link */}
                  {activeCertData?.pdfFile && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVerify();
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 font-bold px-3 py-2 rounded-xl transition cursor-pointer text-[10px] uppercase tracking-wider text-black"
                      style={{
                        background: theme.accent,
                        boxShadow: `0 0 14px ${resolveAlphaColor(theme.accent, "30")}`,
                      }}
                    >
                      <FiExternalLink className="text-xs" /> Verify Credential
                    </button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Interaction Help Hint */}
            <p className="text-[9px] font-bold font-mono uppercase tracking-widest text-stone-500 select-none">
              Hover to Flip <span className="text-stone-700">|</span> Tap Card to toggle back <span className="text-stone-700">|</span> Click expand icon to zoom
            </p>
          </div>

          {/* ── Right Pane: Scrolling Selector Sidebar/Belt ── */}
          <div className="w-full md:w-[45%] flex flex-col relative">
            {/* Top and Bottom Scroll Indicator Fades (Only visible on desktop) */}
            <div className="hidden md:block absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
            <div className="hidden md:block absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

            {/* Dial Selector List container (horizontal scrolling on mobile, vertical scrolling on desktop) */}
            <div
              ref={scrollContainerRef}
              className="flex md:flex-col overflow-x-auto md:overflow-y-auto gap-3.5 w-full pr-2 pb-4 md:pb-6 scrollbar-thin max-h-none md:max-h-[500px] lg:max-h-[720px] pt-1"
              style={{ overscrollBehavior: "contain" }}
            >
              {certifications.map((cert, index) => {
                const isActive = index === activeIndex;
                const cardTheme = getTheme(cert.issuer);

                return (
                  <button
                    key={cert.id}
                    onClick={() => setActiveIndex(index)}
                    className={`flex-shrink-0 w-[260px] md:w-full flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${isActive
                      ? "bg-white/5 shadow-2xl scale-[1.01]"
                      : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.03]"
                      }`}
                    style={{
                      borderColor: isActive ? cardTheme.accent : "rgba(255,255,255,0.06)",
                      boxShadow: isActive ? `0 0 18px ${resolveAlphaColor(cardTheme.accent, "15")}` : "none",
                    }}
                  >
                    {/* Tiny thumbnail */}
                    <div className="w-12 h-9 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-white/10 relative">
                      <img
                        src={cert.image}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {isActive && (
                        <div
                          className="absolute inset-0"
                          style={{ background: resolveAlphaColor(cardTheme.accent, "20") }}
                        />
                      )}
                    </div>

                    {/* Metadata summary */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`text-[7.5px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border inline-block leading-none ${cardTheme.badge}`}>
                          {cert.issuer}
                        </span>
                        <span className="text-[8px] text-stone-600 font-mono font-bold leading-none">{cert.lastUpdated}</span>
                      </div>
                      <h4
                        className={`text-xs font-black truncate transition-colors duration-300 ${isActive ? "" : "text-stone-300"
                          }`}
                        style={{ color: isActive ? cardTheme.accent : "" }}
                      >
                        {cert.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Total Counter Indicator */}
            <div className="hidden md:flex justify-between items-center text-[10px] font-bold font-mono tracking-widest text-stone-500 pt-2 border-t border-white/5 mt-1">
              <span>ACTIVE CREDENTIAL:</span>
              <span style={{ color: theme.accent }}>
                {String(activeIndex + 1).padStart(2, "0")} / {String(certifications.length).padStart(2, "0")}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Detail Lightbox Modal ── */}
      <AnimatePresence>
        {activeCert && (
          <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
        )}
      </AnimatePresence>
    </SectionLayout>
  );
};

export default React.memo(Certification);


