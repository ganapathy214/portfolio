//eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FiExternalLink, FiX, FiAward, FiCalendar, FiBriefcase } from "react-icons/fi";
import { certifications } from "../const";
import SectionLayout from "../layout/SectionLayout";

const ISSUER_THEMES = {
  IBM: {
    accent: "#0f62fe", // IBM blue
    glow: "rgba(15, 98, 254, 0.25)",
    text: "text-blue-400",
    border: "group-hover:border-blue-500/40",
  },
  Cisco: {
    accent: "#00b4d8", // Cisco teal
    glow: "rgba(0, 180, 216, 0.25)",
    text: "text-cyan-400",
    border: "group-hover:border-cyan-500/40",
  },
  Meta: {
    accent: "#0668e1", // Meta blue
    glow: "rgba(6, 104, 225, 0.25)",
    text: "text-blue-400",
    border: "group-hover:border-blue-500/40",
  },
  Google: {
    accent: "#ea4335", // Google red
    glow: "rgba(234, 67, 53, 0.25)",
    text: "text-red-400",
    border: "group-hover:border-red-500/40",
  },
  Udemy: {
    accent: "#a435f0", // Udemy purple
    glow: "rgba(164, 53, 240, 0.25)",
    text: "text-purple-400",
    border: "group-hover:border-purple-500/40",
  },
};

const defaultTheme = {
  accent: "#38bdf8", // Sky blue fallback
  glow: "rgba(56, 189, 248, 0.25)",
  text: "text-sky-400",
  border: "group-hover:border-sky-500/40",
};

const getTheme = (issuer) => {
  const issuerLower = issuer.toLowerCase();
  if (issuerLower.includes("ibm")) return ISSUER_THEMES.IBM;
  if (issuerLower.includes("cisco")) return ISSUER_THEMES.Cisco;
  if (issuerLower.includes("meta")) return ISSUER_THEMES.Meta;
  if (issuerLower.includes("google")) return ISSUER_THEMES.Google;
  if (issuerLower.includes("udemy")) return ISSUER_THEMES.Udemy;
  return defaultTheme;
};

const Certification = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [activeCert, setActiveCert] = useState(null);

  // Lock scroll when modal is open
  useEffect(() => {
    const scrollableMain = document.querySelector("main");
    if (activeCert) {
      if (scrollableMain) scrollableMain.style.overflowY = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      if (scrollableMain) scrollableMain.style.overflowY = "auto";
      document.body.style.overflow = "";
    }
    return () => {
      if (scrollableMain) scrollableMain.style.overflowY = "auto";
      document.body.style.overflow = "";
    };
  }, [activeCert]);

  const handleVerify = (cert) => {
    if (!cert.pdfFile) return;
    const baseUrl = import.meta.env.BASE_URL || "/";
    const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    const url = `${cleanBase}files/certification/${encodeURIComponent(cert.pdfFile)}`;
    window.open(url, "_blank");
  };

  return (
    <SectionLayout
      id="certification"
      label="What I achieved?"
      headerRef={headerRef}
    >
      <div ref={sectionRef} className="w-full">
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {certifications.map((cert, index) => {
            const theme = getTheme(cert.issuer);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 60, damping: 12, delay: index * 0.05 }}
                whileHover={{
                  boxShadow: `0 10px 30px -10px ${theme.glow}`,
                  y: -5,
                }}
                onClick={() => setActiveCert(cert)}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/8 bg-black/40 backdrop-blur-md transition-all duration-300 cursor-pointer ${theme.border}`}
              >
                {/* Aspect cover photo */}
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/5 bg-black/20">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                  {/* Hover Button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                      className="text-white font-semibold text-xs px-4 py-2 rounded-full transition shadow-md flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 duration-300"
                      style={{ backgroundColor: theme.accent }}
                    >
                      Expand View <FiExternalLink className="text-xs" />
                    </span>
                  </div>
                </div>

                {/* Card Content Info */}
                <div className="p-5 flex flex-col justify-between flex-1 min-w-0">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${theme.text}`}
                      >
                        {cert.issuer}
                      </span>
                      <span className="text-[10px] text-white/40 font-mono font-medium">
                        {cert.lastUpdated}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-white/50 flex items-center gap-1">
                      <FiBriefcase className="text-sky-400 shrink-0 text-[10px]" /> Offered by:{" "}
                      <span className="text-white/80 font-medium">{cert.offeredBy}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Lightbox details modal */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-zoom-out"
            />

            {/* Modal Container */}
            {(() => {
              const theme = getTheme(activeCert.issuer);
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="relative w-full max-w-6xl bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-5 sm:p-6 flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-sky-500/25"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setActiveCert(null)}
                    className="absolute top-4 right-4 text-white/70 hover:text-white hover:scale-110 transition p-2 bg-white/5 hover:bg-white/10 rounded-full z-10 cursor-pointer"
                    aria-label="Close modal"
                  >
                    <FiX className="text-base sm:text-lg" />
                  </button>

                  {/* Left Certificate Image mockup frame */}
                  <div className="w-full md:w-[62%] flex items-center justify-center rounded-xl overflow-hidden border border-white/5 bg-black/60 p-2 shadow-inner min-h-[200px] md:min-h-0">
                    <img
                      src={activeCert.image}
                      alt={activeCert.title}
                      className="w-full h-auto object-contain max-h-[72vh] rounded-lg shadow-md"
                    />
                  </div>

                  {/* Right Details Panel */}
                  <div className="w-full md:w-[38%] flex flex-col justify-between py-1 min-w-0 space-y-6 md:space-y-0">
                    <div className="space-y-5">
                      <div>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider ${theme.text}`}
                        >
                          {activeCert.issuer}
                        </span>
                        <h2 className="text-lg sm:text-xl font-extrabold text-white mt-1 leading-snug">
                          {activeCert.title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/40 mt-2 font-medium">
                          <span>Offered by: {activeCert.offeredBy}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <FiCalendar className="text-[10px]" /> {activeCert.lastUpdated}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-4 space-y-1.5">
                        <h4 className="text-[10px] font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1">
                          <FiAward className="text-[10px]" /> Course Outline
                        </h4>
                        <p className="text-xs text-neutral-300 leading-relaxed max-h-[24vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                          {activeCert.description}
                        </p>
                      </div>

                      {/* Skills tags extraction */}
                      <div className="border-t border-white/5 pt-4 space-y-2">
                        <h4 className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">
                          Skills Verified
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {activeCert.description
                            .split(/[,;.-]/)
                            .map((t) => t.trim())
                            .filter((t) => t.length > 2 && t.length < 24)
                            .slice(0, 5)
                            .map((skill, i) => (
                              <span
                                key={i}
                                className="rounded-full bg-white/5 border border-white/10 text-[10px] text-white/80 px-2.5 py-1 transition-colors hover:border-sky-500/30 hover:bg-sky-500/5 hover:text-sky-300 cursor-default"
                              >
                                {skill}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* PDF Verification Action */}
                    {activeCert.pdfFile && (
                      <div className="pt-4 md:pt-6">
                        <button
                          onClick={() => handleVerify(activeCert)}
                          className="w-full inline-flex items-center justify-center gap-2 text-black font-bold px-4 py-2.5 rounded-xl transition shadow-lg hover:brightness-110 cursor-pointer text-xs uppercase tracking-wider"
                          style={{ backgroundColor: theme.accent }}
                        >
                          <FiExternalLink className="text-sm" />
                          Verify Credential
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })()}
          </div>
        )}
      </AnimatePresence>
    </SectionLayout>
  );
};

export default React.memo(Certification);
