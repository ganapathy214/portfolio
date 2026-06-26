import { motion } from "framer-motion";
import React, { useRef } from "react";
import {
  FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaYoutube,
  FaGlobe, FaDribbble, FaBehance, FaMedium, FaDev,
  FaStackOverflow, FaFigma, FaWhatsapp, FaTelegram,
} from "react-icons/fa";
import avatar from "../assets/avatar.png";
import resumePdf from "../assets/resume.pdf";
import { downloadPdf } from "../utils/pdf";

import ProfileCard from "../components/common/ProfileCard";
import { useTypewriter } from "../components/common/utils/hooks/useTypewriter";
import SectionLayout from "../layouts/SectionLayout";
import { DEFAULT_ABOUT } from "../constants";

const ICONS = {
  FaLinkedinIn,  FaGithub,       FaTwitter,     FaInstagram,
  FaYoutube,     FaGlobe,        FaDribbble,    FaBehance,
  FaMedium,      FaDev,          FaStackOverflow, FaFigma,
  FaWhatsapp,    FaTelegram,
};

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

const About = ({ about, title, sectionNum, design = "design1" }) => {
  const headerRef = useRef(null);
  const data = { ...DEFAULT_ABOUT, ...about };

  const typewriterText = useTypewriter(
    data.professionalTitles && data.professionalTitles.length > 0
      ? data.professionalTitles
      : DEFAULT_ABOUT.professionalTitles
  );

  // --- RENDERING DESIGNS ---

  if (design === "design2") {
    // DESIGN 2: Story Layout (Centered Bio & highlights below)
    return (
      <SectionLayout id="about" label={title || "Who am I ?"} headerRef={headerRef} spotlightColor="rgba(var(--primary-rgb), 0.04)" textColorClass="text-primary" sectionNum={sectionNum}>
        <div className="w-full min-h-[78vh] flex flex-col justify-center items-center gap-8 py-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-primary">{data.bioSubLabel || "Biography"}</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">{data.bioPrefix || "A Passionate"} {typewriterText}</h2>
            <p className="text-stone-400 text-sm leading-relaxed pt-2">{data.bio}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mt-4">
            {data.stats.map((s, i) => (
              <div key={i} className="bg-stone-900/40 border border-stone-850 p-6 rounded-2xl">
                <div className="text-3xl font-black text-primary">{s.value}</div>
                <div className="text-[9px] text-stone-500 font-bold uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-4 w-full max-w-sm">
            <button onClick={() => downloadPdf(data.resumeUrl || resumePdf, data.resumeFileName || "Resume.pdf")} className="primary_button flex-1">Download CV</button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="secondary_button flex-1">Contact Me</button>
          </div>
          <SocialLinks links={data.socialLinks} />
        </div>
      </SectionLayout>
    );
  }

  if (design === "design3") {
    // DESIGN 3: Left Image Tab, Right details grid
    return (
      <SectionLayout id="about" label={title || "Who am I ?"} headerRef={headerRef} spotlightColor="rgba(var(--primary-rgb), 0.05)" textColorClass="text-primary" sectionNum={sectionNum}>
        <div className="w-full min-h-[78vh] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-4">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-6 bg-stone-900 border border-stone-800 rounded-3xl shrink-0">
              <img src={data.avatarUrl || avatar} alt="Profile" className="w-64 h-64 object-cover rounded-2xl filter grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="tag-primary">{data.bioSubLabel || "About Me"}</div>
            <h2 className="text-4xl font-extrabold text-white">{data.bioPrefix || "I'm"} {data.name}</h2>
            <p className="text-stone-400 text-sm leading-relaxed">{data.bio}</p>
            <div className="grid grid-cols-2 gap-4 border-t border-stone-900 pt-6">
              {data.highlights.map((h) => (
                <div key={h.label} className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">{h.label}</span>
                  <span className="text-xs text-stone-200 font-semibold mt-0.5">{h.value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => downloadPdf(data.resumeUrl || resumePdf, data.resumeFileName || "Resume.pdf")} className="primary_button">CV</button>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="secondary_button">Hire</button>
            </div>
          </div>
        </div>
      </SectionLayout>
    );
  }

  if (design === "design4") {
    // DESIGN 4: Typographic Minimalist (Text Focused)
    return (
      <SectionLayout id="about" label={title || "Who am I ?"} headerRef={headerRef} spotlightColor="rgba(var(--primary-rgb), 0.02)" textColorClass="text-primary" sectionNum={sectionNum}>
        <div className="w-full min-h-[78vh] flex flex-col md:flex-row gap-10 py-6 text-left">
          <div className="md:w-8/12 space-y-6">
            <h3 className="text-5xl font-black text-white leading-tight">
              A developer dedicated to building <span className="text-primary">impactful products</span>.
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">{data.bio}</p>
            <SocialLinks links={data.socialLinks} />
          </div>
          <div className="md:w-4/12 border-l border-stone-850 pl-6 space-y-6 shrink-0">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Fast Highlights</h4>
              <div className="mt-4 space-y-4">
                {data.highlights.slice(0, 3).map((h) => (
                  <div key={h.label} className="border-b border-stone-900 pb-2">
                    <span className="text-[9px] uppercase text-stone-500 font-bold block">{h.label}</span>
                    <span className="text-sm font-black text-white">{h.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => downloadPdf(data.resumeUrl || resumePdf, data.resumeFileName || "Resume.pdf")} className="w-full primary_button">Download Resume</button>
          </div>
        </div>
      </SectionLayout>
    );
  }

  if (design === "design5") {
    // DESIGN 5: Impact Grid Layout
    return (
      <SectionLayout id="about" label={title || "Who am I ?"} headerRef={headerRef} spotlightColor="rgba(var(--primary-rgb), 0.06)" textColorClass="text-primary" sectionNum={sectionNum}>
        <div className="w-full min-h-[78vh] grid grid-cols-1 md:grid-cols-12 gap-8 py-4 text-left">
          <div className="md:col-span-4 space-y-4">
            <div className="rounded-3xl border border-stone-850 p-2 overflow-hidden bg-stone-900/40">
              <img src={data.avatarUrl || avatar} alt="Profile" className="w-full h-auto object-cover rounded-2xl" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {data.stats.slice(0, 2).map((s, i) => (
                <div key={i} className="bg-stone-900/60 p-3 rounded-xl text-center border border-stone-900">
                  <div className="text-xl font-bold text-primary">{s.value}</div>
                  <div className="text-[8px] uppercase tracking-wider text-stone-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-8 flex flex-col justify-between py-2 space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono text-primary font-black uppercase tracking-widest">// BIO OVERVIEW</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">Creating experiences with clean, modern stack code.</h2>
              <p className="text-stone-400 text-sm leading-relaxed">{data.bio}</p>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {data.highlights.map((h) => (
                  <span key={h.label} className="text-[8.5px] uppercase tracking-wider bg-stone-900 border border-stone-800 text-stone-300 font-bold px-3 py-1.5 rounded-lg">
                    {h.label}: {h.value}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => downloadPdf(data.resumeUrl || resumePdf, data.resumeFileName || "Resume.pdf")} className="primary_button">CV</button>
                <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="secondary_button">Contact</button>
              </div>
            </div>
          </div>
        </div>
      </SectionLayout>
    );
  }

  // DEFAULT: DESIGN 1 (Original Split Biography with Profile Card)
  return (
    <SectionLayout id="about" label={title || "Who am I ?"} headerRef={headerRef} spotlightColor="rgba(var(--primary-rgb), 0.06)" textColorClass="text-primary" sectionNum={sectionNum}>
      <div className="w-full min-h-[78vh] flex flex-col lg:flex-row justify-center items-start gap-10 lg:gap-16 py-4">

        {/* ── RIGHT SIDE — Profile Card ── */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col items-center order-1 lg:order-2 w-full lg:w-auto shrink-0">
          <div className="relative p-1 rounded-[2.5rem]" style={{ background: "linear-gradient(135deg, rgba(var(--primary-rgb),0.2), transparent, rgba(var(--primary-rgb),0.1))", boxShadow: "0 0 40px rgba(var(--primary-rgb),0.08)" }}>
            <ProfileCard name={data.name} title={data.title} avatarUrl={data.avatarUrl || avatar} enableTilt={true} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-sm">
            <button onClick={() => downloadPdf(data.resumeUrl || resumePdf, data.resumeFileName || "Resume.pdf")} className="primary_button flex-1 cursor-pointer">Download CV</button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="secondary_button flex-1 cursor-pointer">Hire Me</button>
          </div>

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
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full lg:w-7/12 order-2 lg:order-1 text-left">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[1px]" style={{ background: "var(--primary)", opacity: 0.4 }} />
            <span className="section-number">{data.bioSubLabel || "Biography"}</span>
          </div>

          <div className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6 text-white">
            {data.bioPrefix || "A Passionate"} <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #ffffff, var(--primary))" }}>
              {typewriterText}
              <span className="blinking-cursor select-none">|</span>
            </span>
          </div>

          <p className="text-stone-400 text-sm md:text-base leading-loose mb-8">{data.bio}</p>

          <div className="grid grid-cols-3 gap-3 mb-6 select-none">
            {data.stats.map((s, i) => (
              <div key={i} className="corner-card rounded-xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-black" style={{ color: "var(--primary)", textShadow: "0 0 12px rgba(var(--primary-rgb),0.4)" }}>{s.value}</div>
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
