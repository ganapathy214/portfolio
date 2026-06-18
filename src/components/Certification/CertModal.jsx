import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { FiExternalLink, FiX, FiAward, FiCalendar } from "react-icons/fi";
import { getTheme } from "../../constants";
import { openPdf } from "../../utils/pdf";

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

const CertModal = ({ cert, onClose }) => {
  const theme = getTheme(cert.issuer);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleVerify = () => {
    openPdf(cert.pdfFile);
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
          style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(var(--primary-rgb),0.3)" }}
        >
          <FiX className="text-[#ffffff] text-base" />
        </button>

        {/* Certificate image pane with glowing aura */}
        <div
          className="w-full md:w-[58%] shrink-0 flex items-center justify-center p-6 relative"
          style={{ background: "var(--card-bg-darker, #080808)" }}
        >
          <div
            className="absolute inset-0 opacity-15 pointer-events-none filter blur-3xl"
            style={{
              background: `radial-gradient(circle, ${theme.accent} 0%, transparent 65%)`,
            }}
          />
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-auto object-contain rounded-xl max-h-[50vh] md:max-h-[70vh] shadow-2xl relative z-10"
            style={{ boxShadow: `0 10px 40px ${resolveAlphaColor(theme.accent, "20")}` }}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Details panel */}
        <div
          className="w-full md:w-[42%] flex flex-col justify-between p-6 sm:p-8 text-left overflow-y-auto"
          style={{ background: "var(--card-bg, #121212)" }}
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
                <span>Offered by: <span className="text-[var(--text-white-or-dark,#ffffff)]">{cert.offeredBy}</span></span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <FiCalendar className="text-[11px]" /> {cert.lastUpdated}
                </span>
              </div>
            </div>

            <div
              className="pt-4 space-y-2 border-t"
              style={{ borderColor: "var(--border-color, rgba(255,255,255,0.06))" }}
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
              style={{ borderColor: "var(--border-color, rgba(255,255,255,0.06))" }}
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

          {cert.pdfFile && (
            <button
              onClick={handleVerify}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 font-bold px-4 py-3 rounded-xl transition cursor-pointer text-xs uppercase tracking-wider text-[var(--primary-contrast)]"
              style={{
                background: theme.accent,
                boxShadow: `0 0 18px ${resolveAlphaColor(theme.accent, "40")}`,
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

export default React.memo(CertModal);
