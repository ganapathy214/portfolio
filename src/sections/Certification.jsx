import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  FiCalendar,
  FiBriefcase,
  FiEye,
  FiRefreshCw,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { certifications as defaultCertifications, getTheme } from "../constants";
import SectionLayout from "../layouts/SectionLayout";
import CertModal from "../components/Certification/CertModal";
import { openPdf } from "../utils/pdf";

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

/* ─── Individual Certificate Card Component ─── */
const CertCard = React.memo(({ cert, onExpand, onVerify }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const theme = getTheme(cert.issuer);

  // Split description dynamically for skills preview
  const skillsList = useMemo(() => {
    if (!cert?.description) return [];
    return cert.description
      .split(/[,;.-]/)
      .map((t) => t.trim())
      .filter((t) => t.length > 2 && t.length < 28)
      .slice(0, 6);
  }, [cert?.description]);

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
    if (window.innerWidth >= 768) {
      setIsFlipped(false);
    }
  };

  return (
    <div
      className="w-full aspect-[16/16] cursor-pointer perspective select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => window.innerWidth >= 768 && setIsFlipped(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped((prev) => !prev)}
    >
      <motion.div
        animate={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="w-full h-full transform-style-preserve-3d relative rounded-2xl border bg-[var(--card-bg)]"
        style={{
          borderColor: "var(--border-color)",
          boxShadow: isFlipped
            ? `0 20px 40px -12px ${resolveAlphaColor(theme.accent, "25")}, 0 0 20px 1px ${resolveAlphaColor(theme.accent, "15")}`
            : "0 10px 30px rgba(0,0,0,0.6)",
        }}
      >
        {/* ── Front Face ── */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden flex flex-col bg-[var(--card-bg)]"
        >
          {/* Top brand header strip */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] z-10"
            style={{ background: theme.accent, boxShadow: `0 0 10px ${theme.accent}` }}
          />

          {/* Image */}
          <div className="relative w-full flex-1 overflow-hidden bg-[var(--card-bg-darker)] flex items-center justify-center">
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, var(--card-bg) 0%, transparent 60%)",
              }}
            />

            {/* Interactive indicators */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onExpand(cert);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 z-10 cursor-pointer text-white hover:text-white"
                style={{
                  background: "rgba(0,0,0,0.75)",
                  borderColor: "rgba(255,255,255,0.15)",
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
                className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 z-10 cursor-pointer text-white hover:text-white"
                style={{
                  background: "rgba(0,0,0,0.75)",
                  borderColor: "rgba(255,255,255,0.15)",
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
          <div className="p-4 sm:p-5 text-left border-t border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-2 select-none">
              <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${theme.badge}`}>
                {cert.issuer}
              </span>
              <span className="text-[9px] text-stone-500 font-mono flex items-center gap-1">
                <FiCalendar /> {cert.lastUpdated}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-white leading-snug line-clamp-1">
              {cert.title}
            </h3>
          </div>
        </div>

        {/* ── Back Face ── */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-[var(--card-bg)] p-5 sm:p-6 flex flex-col justify-between overflow-y-auto text-left"
          style={{ transform: "rotateY(180deg)", overscrollBehavior: "contain" }}
        >
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
              <div>
                <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border select-none ${theme.badge}`}>
                  {cert.issuer}
                </span>
                <h4 className="text-xs text-stone-400 font-semibold mt-1 flex items-center gap-1.5 select-none">
                  <FiBriefcase className="text-[10px]" style={{ color: theme.accent }} /> Offered: {cert.offeredBy}
                </h4>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="w-7 h-7 rounded-full flex items-center justify-center border border-[var(--border-color)] text-stone-400 transition-colors hover:text-[var(--text-white-or-dark)] cursor-pointer"
                style={{ background: "rgba(var(--text-muted-rgb), 0.03)" }}
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
                {cert.description}
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
          {cert.pdfFile && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onVerify(cert);
              }}
              className="w-full inline-flex items-center justify-center gap-2 font-bold px-3 py-2 rounded-xl transition cursor-pointer text-[10px] uppercase tracking-wider text-[var(--primary-contrast)]"
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
  );
});

CertCard.displayName = "CertCard";

/* ─── Main Certification Section ─── */
const Certification = ({ certifications: certificationsProp, title, sectionNum }) => {
  const headerRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [activeCert, setActiveCert] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  // Resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const allCertifications = certificationsProp && certificationsProp.length > 0 ? certificationsProp : defaultCertifications;

  const resolvedCertifications = useMemo(() => {
    return allCertifications.map(cert => {
      let resolvedImage = cert.image;
      if (!resolvedImage || typeof resolvedImage === "string" && !resolvedImage.startsWith("data:")) {
        const match = defaultCertifications.find(c => c.title.toLowerCase() === cert.title.toLowerCase() || c.id === cert.id);
        if (match) resolvedImage = match.image;
      }
      return { ...cert, image: resolvedImage };
    });
  }, [allCertifications]);

  const activeCertData = resolvedCertifications[activeIndex];
  const theme = getTheme(activeCertData?.issuer);

  const getVisibleCount = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const visibleCount = getVisibleCount();
  const maxIndex = Math.max(0, resolvedCertifications.length - visibleCount);

  // Autoplay effect
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, activeIndex, maxIndex]);

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

  const handleVerify = (cert) => {
    openPdf(cert?.pdfFile);
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setActiveIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      const limit = maxIndex;
      if (nextIndex < 0) {
        nextIndex = limit;
      } else if (nextIndex > limit) {
        nextIndex = 0;
      }
      return nextIndex;
    });
  };

  const handleDragEnd = (e, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      paginate(1);
    } else if (info.offset.x > swipeThreshold) {
      paginate(-1);
    }
  };

  const getTranslation = () => {
    if (visibleCount === 1) {
      return -activeIndex * 100;
    } else if (visibleCount === 2) {
      return -activeIndex * 50;
    } else {
      return -activeIndex * 33.333;
    }
  };

  return (
    <SectionLayout
      id="certification"
      label={title || "What I achieved?"}
      headerRef={headerRef}
      spotlightColor="rgba(var(--primary-rgb), 0.06)"
      textColorClass="text-primary"
      sectionNum={sectionNum}
    >
      <div
        className="w-full py-6 flex flex-col items-center justify-center relative"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* Dynamic ambient background glow aura matching issuer theme */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none filter blur-[80px] transition-all duration-700 rounded-full w-full max-w-2xl mx-auto"
          style={{
            background: `radial-gradient(circle, ${theme.accent} 0%, transparent 70%)`,
            transform: "scale(1.3)",
          }}
        />

        {/* Carousel Control Frame */}
        <div className="relative w-full flex items-center justify-center gap-4 select-none px-4 md:px-0">

          {/* Floating Left Navigation Button - Desktop only */}
          <button
            onClick={() => paginate(-1)}
            className="w-11 h-11 rounded-full border items-center justify-center transition-all duration-300 cursor-pointer text-white hover:text-white hidden md:flex shrink-0"
            style={{
              background: "rgba(var(--text-muted-rgb), 0.05)",
              borderColor: "var(--border-color)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.accent;
              e.currentTarget.style.boxShadow = `0 0 14px ${resolveAlphaColor(theme.accent, "25")}`;
              e.currentTarget.style.color = theme.accent;
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-color)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "scale(1)";
            }}
            aria-label="Previous Certificate"
          >
            <FiChevronLeft className="text-xl" />
          </button>

          {/* Active Card sliding window */}
          <div className="flex-1 overflow-hidden py-4 px-1 select-none">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              animate={{ x: `${getTranslation()}%` }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="flex cursor-grab active:cursor-grabbing"
            >
              {resolvedCertifications.map((cert) => (
                <div
                  key={cert.id}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-3"
                >
                  <CertCard
                    cert={cert}
                    onExpand={setActiveCert}
                    onVerify={handleVerify}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Floating Right Navigation Button - Desktop only */}
          <button
            onClick={() => paginate(1)}
            className="w-11 h-11 rounded-full border items-center justify-center transition-all duration-300 cursor-pointer text-white hover:text-white hidden md:flex shrink-0"
            style={{
              background: "rgba(var(--text-muted-rgb), 0.05)",
              borderColor: "var(--border-color)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.accent;
              e.currentTarget.style.boxShadow = `0 0 14px ${resolveAlphaColor(theme.accent, "25")}`;
              e.currentTarget.style.color = theme.accent;
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-color)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "scale(1)";
            }}
            aria-label="Next Certificate"
          >
            <FiChevronRight className="text-xl" />
          </button>
        </div>

        {/* Mobile Bottom Navigation Controls */}
        <div className="flex md:hidden items-center justify-center gap-6 mt-4 select-none z-10">
          <button
            onClick={() => paginate(-1)}
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer text-stone-300 hover:text-white"
            style={{
              background: "rgba(var(--text-muted-rgb), 0.03)",
              borderColor: "var(--border-color)",
            }}
            aria-label="Previous Certificate"
          >
            <FiChevronLeft className="text-lg" />
          </button>

          <span className="text-xs font-mono font-bold text-stone-500">
            {String(activeIndex + 1).padStart(2, "0")} / {String(maxIndex + 1).padStart(2, "0")}
          </span>

          <button
            onClick={() => paginate(1)}
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer text-stone-300 hover:text-white"
            style={{
              background: "rgba(var(--text-muted-rgb), 0.03)",
              borderColor: "var(--border-color)",
            }}
            aria-label="Next Certificate"
          >
            <FiChevronRight className="text-lg" />
          </button>
        </div>

        {/* Dots Pagination indicators */}
        <div className="flex justify-center items-center gap-2 mt-6 select-none z-10">
          {resolvedCertifications.slice(0, maxIndex + 1).map((cert, index) => {
            const isActive = index === activeIndex;
            const cardTheme = getTheme(cert.issuer);
            return (
              <button
                key={cert.id}
                onClick={() => setActiveIndex(index)}
                className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: isActive ? "24px" : "8px",
                  backgroundColor: isActive ? cardTheme.accent : "var(--border-color)",
                  opacity: isActive ? 1 : 0.4,
                  boxShadow: isActive ? `0 0 8px ${cardTheme.accent}` : "none",
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>

        {/* Desktop Progress Counter */}
        <div className="hidden md:flex justify-center items-center text-[10px] font-bold font-mono tracking-widest text-stone-500 mt-4 select-none z-10">
          <span>CREDENTIAL PAGE: &nbsp;</span>
          <span style={{ color: theme.accent }}>
            {String(activeIndex + 1).padStart(2, "0")} / {String(maxIndex + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Help Hint */}
        <p className="text-[9px] font-bold font-mono uppercase tracking-widest text-stone-500 select-none mt-6 text-center z-10">
          Swipe Track <span className="text-stone-700">|</span> Hover over card to Flip <span className="text-stone-700">|</span> Tap Card to toggle back <span className="text-stone-700">|</span> Click expand icon to zoom
        </p>
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
