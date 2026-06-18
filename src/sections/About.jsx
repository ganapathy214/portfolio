import { motion } from "framer-motion";
import React, { useRef } from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import avatar from "../assets/avatar.png";
import resumePdf from "../assets/resume.pdf";
import { downloadPdf } from "../utils/pdf";

import ProfileCard from "../components/common/ProfileCard";
import { useTypewriter } from "../components/common/utils/hooks/useTypewriter";
import SectionLayout from "../layouts/SectionLayout";

const ICONS = {
  FaLinkedinIn,
  FaGithub,
};

import { DEFAULT_ABOUT } from "../constants";

const SocialLinks = ({ links = [] }) => (
  <div className="flex gap-3 mt-6 flex-wrap select-none">
    {links.map(({ href, icon, label }) => {
      const IconComponent = ICONS[icon];
      return (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-lg transition-all duration-300 cursor-pointer neon-border"
          style={{ background: "rgba(var(--primary-rgb),0.03)" }}
        >
          {IconComponent && (
            <IconComponent className="text-lg text-stone-400 group-hover:text-primary transition-colors duration-300" />
          )}
          <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 group-hover:text-primary transition-colors duration-300">
            {label}
          </span>
        </a>
      );
    })}
  </div>
);

const About = ({ about, title, sectionNum }) => {
  const headerRef = useRef(null);

  // Merge with defaults so missing fields never break the UI
  const data = { ...DEFAULT_ABOUT, ...about };

  const typewriterText = useTypewriter(
    data.professionalTitles && data.professionalTitles.length > 0
      ? data.professionalTitles
      : DEFAULT_ABOUT.professionalTitles
  );

  return (
    <SectionLayout
      id="about"
      label={title || "Who am I ?"}
      headerRef={headerRef}
      spotlightColor="rgba(var(--primary-rgb), 0.06)"
      textColorClass="text-primary"
      sectionNum={sectionNum}
    >
      <div className="w-full min-h-[78vh] flex flex-col lg:flex-row justify-center items-start gap-10 lg:gap-16 py-4">

        {/* ── RIGHT SIDE — Profile Card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center order-1 lg:order-2 w-full lg:w-auto shrink-0"
        >
          {/* Profile Card with neon glow wrapper */}
          <div
            className="relative p-1 rounded-[2.5rem]"
            style={{
              background: "linear-gradient(135deg, rgba(var(--primary-rgb),0.2), transparent, rgba(var(--primary-rgb),0.1))",
              boxShadow: "0 0 40px rgba(var(--primary-rgb),0.08)",
            }}
          >
            <ProfileCard
              name={data.name}
              title={data.title}
              avatarUrl={data.avatarUrl || avatar}
              enableTilt={true}
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-sm">
            <button
              onClick={() => downloadPdf(data.resumeUrl || resumePdf, data.resumeFileName || "Resume.pdf")}
              className="primary_button flex-1 cursor-pointer"
            >
              Download CV
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="secondary_button flex-1 cursor-pointer"
            >
              Hire Me
            </button>
          </div>

          {/* Spec table */}
          <div className="mt-6 w-full max-w-sm corner-card rounded-xl p-4 space-y-2">
            {data.highlights.map((h) => (
              <div key={h.label} className="flex justify-between items-center text-[11px]">
                <span className="text-stone-600 font-bold uppercase tracking-wider">{h.label}</span>
                <span className="text-stone-300 font-semibold">{h.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── LEFT SIDE — Biography ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full lg:w-7/12 order-2 lg:order-1 text-left"
        >
          {/* Section mini-label */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[1px]" style={{ background: "var(--primary)", opacity: 0.4 }} />
            <span className="section-number">{data.bioSubLabel || "Biography"}</span>
          </div>

          {/* Dynamic headline */}
          <div className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6 text-white">
            {data.bioPrefix || "A Passionate"} <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #ffffff, var(--primary))",
              }}
            >
              {typewriterText}
              <span className="blinking-cursor select-none">|</span>
            </span>
          </div>

          {/* Bio paragraph */}
          <p className="text-stone-400 text-sm md:text-base leading-loose mb-8">
            {data.bio}
          </p>

          {/* Metrics row — corner-card style */}
          <div className="grid grid-cols-3 gap-3 mb-6 select-none">
            {data.stats.map((s, i) => (
              <div key={i} className="corner-card rounded-xl p-4 text-center">
                <div
                  className="text-2xl sm:text-3xl font-black"
                  style={{ color: "var(--primary)", textShadow: "0 0 12px rgba(var(--primary-rgb),0.4)" }}
                >
                  {s.value}
                </div>
                <div className="text-[9px] text-stone-500 font-bold uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <SocialLinks links={data.socialLinks} />
        </motion.div>
      </div>
    </SectionLayout>
  );
};

export default React.memo(About);
