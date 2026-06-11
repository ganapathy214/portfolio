import { motion, AnimatePresence } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FiExternalLink,
  FiX,
  FiAward,
  FiCalendar,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { certifications } from "../const";
import SectionLayout from "../layout/SectionLayout";

/* ─── Issuer theme map ─── */
const ISSUER_THEMES = {
  IBM: { accent: "#0f62fe", badge: "bg-blue-950/30 border-blue-900/40 text-blue-400" },
  Cisco: { accent: "#00b4d8", badge: "bg-cyan-950/30 border-cyan-900/40 text-cyan-400" },
  Meta: { accent: "#0668e1", badge: "bg-blue-950/30 border-blue-900/40 text-blue-400" },
  Google: { accent: "#ea4335", badge: "bg-red-950/30 border-red-900/40 text-red-400" },
  Udemy: { accent: "#a435f0", badge: "bg-purple-950/30 border-purple-900/40 text-purple-400" },
};
const defaultTheme = { accent: "#00D5D5", badge: "bg-primary/5 border-primary/20 text-primary" };

const getTheme = (issuer = "") => {
  const l = issuer.toLowerCase();
  if (l.includes("ibm")) return ISSUER_THEMES.IBM;
  if (l.includes("cisco")) return ISSUER_THEMES.Cisco;
  if (l.includes("meta")) return ISSUER_THEMES.Meta;
  if (l.includes("google")) return ISSUER_THEMES.Google;
  if (l.includes("udemy")) return ISSUER_THEMES.Udemy;
  return defaultTheme;
};

/* ─── Coverflow computation ─── */
// Returns transform style for each card based on distance from active index
const getCardStyle = (index, active, total) => {
  const distance = index - active;
  const absDistance = Math.abs(distance);

  // Only render cards within range of ±3
  const maxVisible = 3;
  if (absDistance > maxVisible) return null;

  const direction = distance > 0 ? 1 : distance < 0 ? -1 : 0;

  // Position offsets (spread cards out)
  const translateX = distance * 220;
  // Cards fan out with perspective — push them back on Z axis
  const translateZ = absDistance === 0 ? 0 : -120 - absDistance * 60;
  // Slight Y drop for non-center cards
  const translateY = absDistance === 0 ? 0 : absDistance * 18;
  // Rotate inward
  const rotateY = distance * -22;
  // Scale down cards away from center
  const scale = absDistance === 0 ? 1 : Math.max(0.55, 1 - absDistance * 0.16);
  // Fade out distant cards
  const opacity = absDistance === 0 ? 1 : Math.max(0.15, 1 - absDistance * 0.28);
  // zIndex so center card is always on top
  const zIndex = maxVisible - absDistance;

  return {
    transform: `perspective(1200px) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex,
    pointerEvents: absDistance === 0 ? "auto" : "auto",
    filter: absDistance === 0 ? "none" : `brightness(${0.45 - absDistance * 0.05})`,
  };
};

/* ─── Lightbox Modal ─── */
const CertModal = ({ cert, onClose }) => {
  const theme = getTheme(cert.issuer);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleVerify = () => {
    if (!cert.pdfFile) return;
    const baseUrl = import.meta.env.BASE_URL || "/";
    const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    const url = `${cleanBase}files/certification/${encodeURIComponent(cert.pdfFile)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 cursor-zoom-out"
        style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(14px)" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", duration: 0.45, bounce: 0.1 }}
        className="relative w-full max-w-4xl flex flex-col md:flex-row overflow-hidden corner-card max-h-[90vh]"
        style={{ borderRadius: "20px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
          style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(0,213,213,0.3)" }}
        >
          <FiX className="text-white text-base" />
        </button>

        {/* Certificate image */}
        <div
          className="w-full md:w-[58%] shrink-0 flex items-center justify-center p-4"
          style={{ background: "#0d0d0d" }}
        >
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-auto object-contain rounded-xl max-h-[70vh]"
            style={{ boxShadow: `0 0 40px ${theme.accent}25` }}
          />
        </div>

        {/* Details panel */}
        <div
          className="w-full md:w-[42%] flex flex-col justify-between p-6 sm:p-8 text-left overflow-y-auto"
          style={{ background: "#121212" }}
        >
          <div className="space-y-5">
            <div>
              <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-lg border select-none inline-block ${theme.badge}`}>
                {cert.issuer}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white mt-3 leading-snug">
                {cert.title}
              </h2>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-stone-500 mt-2 font-semibold select-none">
                <span>Offered by: <span className="text-white">{cert.offeredBy}</span></span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <FiCalendar className="text-[11px]" /> {cert.lastUpdated}
                </span>
              </div>
            </div>

            <div
              className="pt-4 space-y-2 border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <h4
                className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 select-none"
                style={{ color: theme.accent }}
              >
                <FiAward className="text-xs shrink-0" /> Course Outline
              </h4>
              <p className="text-sm text-stone-300 leading-relaxed">{cert.description}</p>
            </div>

            <div
              className="pt-4 space-y-2 border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <h4
                className="text-[10px] font-bold uppercase tracking-widest select-none"
                style={{ color: theme.accent }}
              >
                Skills Verified
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {cert.description
                  .split(/[,;.-]/)
                  .map((t) => t.trim())
                  .filter((t) => t.length > 2 && t.length < 28)
                  .slice(0, 6)
                  .map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-lg text-[10px] font-semibold px-2.5 py-1 cursor-default"
                      style={{
                        background: `${theme.accent}12`,
                        border: `1px solid ${theme.accent}30`,
                        color: theme.accent,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {cert.pdfFile && (
            <button
              onClick={handleVerify}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 font-bold px-4 py-3 rounded-xl transition cursor-pointer text-xs uppercase tracking-wider text-black"
              style={{
                background: theme.accent,
                boxShadow: `0 0 18px ${theme.accent}40`,
              }}
            >
              <FiExternalLink className="text-sm" /> Verify Credential
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Main Certification Section ─── */
const Certification = () => {
  const headerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCert, setActiveCert] = useState(null);
  const total = certifications.length;

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

  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % total), [total]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (activeCert) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, activeCert]);

  // Drag / swipe support
  const dragStartX = useRef(null);
  const handleDragStart = (e) => {
    dragStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };
  const handleDragEnd = (e) => {
    if (dragStartX.current === null) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX.current - endX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    dragStartX.current = null;
  };

  const activeCertData = certifications[activeIndex];
  const theme = getTheme(activeCertData?.issuer);

  return (
    <SectionLayout
      id="certification"
      label="What I achieved?"
      headerRef={headerRef}
      spotlightColor="rgba(0, 213, 213, 0.06)"
      textColorClass="text-[#00D5D5]"
    >
      <div className="w-full flex flex-col items-center gap-8 py-4 select-none">

        {/* ── Coverflow Stage ── */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{ height: "340px" }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {certifications.map((cert, index) => {
            const style = getCardStyle(index, activeIndex, total);
            if (!style) return null;
            const isActive = index === activeIndex;
            const cardTheme = getTheme(cert.issuer);

            return (
              <div
                key={cert.id}
                className="absolute cursor-pointer"
                style={{
                  ...style,
                  width: "280px",
                  transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease, filter 0.45s ease",
                }}
                onClick={() => {
                  if (isActive) {
                    setActiveCert(cert);
                  } else {
                    setActiveIndex(index);
                  }
                }}
              >
                {/* Card */}
                <div
                  className="relative overflow-hidden flex flex-col"
                  style={{
                    borderRadius: "16px",
                    background: "#121212",
                    border: isActive
                      ? `1px solid ${cardTheme.accent}60`
                      : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: isActive
                      ? `0 20px 60px -10px ${cardTheme.accent}40, 0 0 0 1px ${cardTheme.accent}20`
                      : "0 8px 24px rgba(0,0,0,0.6)",
                    transform: "none",
                  }}
                >
                  {/* Active top glow */}
                  {isActive && (
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: cardTheme.accent, boxShadow: `0 0 12px ${cardTheme.accent}` }}
                    />
                  )}

                  {/* Certificate image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                      style={{ transform: isActive ? "scale(1.04)" : "scale(1)" }}
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(18,18,18,0.85) 0%, transparent 60%)",
                      }}
                    />
                    {/* Expand hint on active card */}
                    {isActive && (
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(0,0,0,0.4)" }}
                      >
                        <span
                          className="text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-black"
                          style={{ background: cardTheme.accent }}
                        >
                          Expand <FiExternalLink />
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${cardTheme.badge}`}
                      >
                        {cert.issuer}
                      </span>
                      <span className="text-[9px] text-stone-600 font-mono">{cert.lastUpdated}</span>
                    </div>
                    <h3
                      className="text-sm font-bold leading-snug line-clamp-2 transition-colors duration-300"
                      style={{ color: isActive ? cardTheme.accent : "rgba(255,255,255,0.75)" }}
                    >
                      {cert.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Active Cert Info Strip ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            className="text-center max-w-md px-4"
          >
            <span
              className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded border inline-block mb-2 ${theme.badge}`}
            >
              {activeCertData?.issuer}
            </span>
            <h3 className="text-base sm:text-lg font-black text-white mb-1 leading-snug">
              {activeCertData?.title}
            </h3>
            <p className="text-[11px] text-stone-500 flex items-center justify-center gap-2">
              <FiBriefcase style={{ color: "#00D5D5" }} />
              {activeCertData?.offeredBy}
              <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
              <FiCalendar style={{ color: "#00D5D5" }} />
              {activeCertData?.lastUpdated}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation Controls ── */}
        <div className="flex items-center gap-5">
          {/* Prev */}
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
            style={{
              background: "rgba(0,213,213,0.06)",
              border: "1px solid rgba(0,213,213,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,213,213,0.15)";
              e.currentTarget.style.boxShadow = "0 0 14px rgba(0,213,213,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,213,213,0.06)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <FiChevronLeft style={{ color: "#00D5D5" }} className="text-lg" />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5">
            {certifications.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="transition-all duration-300 cursor-pointer rounded-full"
                style={{
                  width: i === activeIndex ? "24px" : "6px",
                  height: "6px",
                  background: i === activeIndex ? "#00D5D5" : "rgba(255,255,255,0.15)",
                  boxShadow: i === activeIndex ? "0 0 8px rgba(0,213,213,0.7)" : "none",
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
            style={{
              background: "rgba(0,213,213,0.06)",
              border: "1px solid rgba(0,213,213,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,213,213,0.15)";
              e.currentTarget.style.boxShadow = "0 0 14px rgba(0,213,213,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,213,213,0.06)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <FiChevronRight style={{ color: "#00D5D5" }} className="text-lg" />
          </button>
        </div>

        {/* Counter */}
        <p
          className="text-[10px] font-bold font-mono tracking-widest"
          style={{ color: "rgba(0,213,213,0.4)" }}
        >
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {activeCert && (
          <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
        )}
      </AnimatePresence>
    </SectionLayout>
  );
};

export default React.memo(Certification);
