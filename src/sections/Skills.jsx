import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLayout from "../layouts/SectionLayout";
import { skillCategories, skills } from "../constants";
import { FiCheckCircle } from "react-icons/fi";
import { usePortfolio } from "../context/PortfolioContext";

const Skills = ({ skills: propSkills, skillCategories: propSkillCategories, title, sectionNum }) => {
  const headerRef = useRef(null);
  const { sectionLayouts } = usePortfolio();
  const layout = sectionLayouts?.Skills || "icon-grid";

  const categories = propSkillCategories && propSkillCategories.length > 0 ? propSkillCategories : skillCategories;
  const allSkills = propSkills && propSkills.length > 0 ? propSkills : skills;

  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "frontend");
  const currentCategory = categories.find((cat) => cat.id === activeCategory) || categories[0];

  const filteredSkills = allSkills.filter((skill) => currentCategory?.skillNames?.includes(skill.name));

  // Default icon map
  const defaultIconMap = {};
  skills.forEach((s) => { if (s.name && s.icon) defaultIconMap[s.name.toLowerCase()] = s.icon; });
  const getIconSource = (skill) => {
    if (skill.icon && skill.icon.startsWith("data:")) return skill.icon;
    return defaultIconMap[skill.name.toLowerCase()] || skill.icon || "";
  };

  // ── Category nav shared across layouts ──
  const CategoryNav = () => (
    <div className="flex flex-wrap gap-2 select-none pb-4 relative">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`relative px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-none ${
              isActive
                ? "text-[var(--primary-contrast)] bg-primary"
                : "text-stone-500 bg-transparent border border-stone-800 hover:text-primary hover:border-primary/40"
            }`}
            style={isActive ? { boxShadow: "0 0 16px rgba(var(--primary-rgb),0.3)" } : {}}
          >
            {isActive && <span className="absolute inset-x-0 -top-px h-[2px] bg-black/20" />}
            {category.label}
          </button>
        );
      })}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, rgba(var(--primary-rgb),0.3), transparent)" }} />
    </div>
  );

  return (
    <SectionLayout
      id="skills"
      label={title || "What I Know ?"}
      headerRef={headerRef}
      spotlightColor="rgba(var(--primary-rgb), 0.06)"
      textColorClass="text-primary"
      sectionNum={sectionNum}
    >
      <div className="w-full min-h-[78vh] flex flex-col space-y-8 py-4">

        {/* ── Icon Grid (default) ── */}
        {layout === "icon-grid" && (
          <>
            <CategoryNav />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left — Expertise bullets */}
              <div className="lg:col-span-5 space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div key={activeCategory}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}
                    className="space-y-4 text-left"
                  >
                    <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-3 flex items-center gap-2 select-none">
                      <span className="w-4 h-[1px]" style={{ background: "var(--primary)", opacity: 0.6 }} />
                      Key Expertise
                    </h3>
                    <ul className="space-y-2.5">
                      {currentCategory?.bullets.map((bullet, idx) => (
                        <motion.li key={idx}
                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05, duration: 0.3 }}
                          className="flex items-start gap-3 text-xs sm:text-sm text-stone-300 leading-relaxed p-3.5 rounded-xl transition-all duration-200 corner-card"
                        >
                          <FiCheckCircle className="shrink-0 mt-0.5 text-sm sm:text-base" style={{ color: "var(--primary)" }} />
                          <span dangerouslySetInnerHTML={{ __html: bullet }} />
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Right — Skill Icon Grid */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div key={activeCategory}
                    initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}
                    className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-items-center"
                  >
                    {filteredSkills.map((skill, index) => (
                      <motion.div key={skill.name}
                        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04, duration: 0.35 }}
                        whileHover={{ scale: 1.08, y: -5 }}
                        className="flex flex-col items-center justify-center gap-2.5 group cursor-pointer w-full select-none"
                      >
                        <div className="aspect-square w-16 sm:w-20 flex items-center justify-center p-4 relative overflow-hidden transition-all duration-300 corner-card"
                          style={{ borderRadius: "12px", background: "#ffffff" }}
                        >
                          <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: "linear-gradient(to right, transparent, var(--primary), transparent)" }} />
                          <img src={getIconSource(skill)} alt={skill.name}
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                            loading="lazy" decoding="async" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-semibold text-stone-500 group-hover:text-primary transition-colors duration-300 text-center line-clamp-1 tracking-wide">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </>
        )}

        {/* ── Progress Bars ── */}
        {layout === "progress-bars" && (
          <>
            <CategoryNav />
            <AnimatePresence mode="wait">
              <motion.div key={activeCategory}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {filteredSkills.map((skill, idx) => {
                  const level = skill.level || 75 + Math.floor((idx * 7) % 20);
                  return (
                    <motion.div key={skill.name}
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-white p-1 flex items-center justify-center shrink-0">
                            <img src={getIconSource(skill)} alt={skill.name} className="w-full h-full object-contain" loading="lazy" />
                          </div>
                          <span className="text-xs font-bold text-white">{skill.name}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold" style={{ color: "var(--primary)" }}>
                          {level}%
                        </span>
                      </div>
                      {/* Track */}
                      <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${level}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.05, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(to right, var(--primary), rgba(var(--primary-rgb),0.5))" }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </>
        )}

        {/* ── Tag Cloud ── */}
        {layout === "tag-cloud" && (
          <div className="flex flex-col gap-8">
            {categories.map((cat) => {
              const catSkills = allSkills.filter(s => cat.skillNames?.includes(s.name));
              if (!catSkills.length) return null;
              return (
                <div key={cat.id}>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-3 flex items-center gap-2">
                    <span className="w-3 h-[1.5px] inline-block" style={{ background: "var(--primary)" }} />
                    {cat.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((skill, idx) => (
                      <motion.span
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.03 }}
                        whileHover={{ scale: 1.06, y: -2 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold cursor-default transition-all duration-200"
                        style={{
                          borderColor: "var(--border-color, rgba(255,255,255,0.08))",
                          background: "var(--card-bg, #121212)",
                          color: "var(--text-white-or-dark, #fff)",
                        }}
                      >
                        <div className="w-4 h-4 rounded bg-white flex items-center justify-center shrink-0">
                          <img src={getIconSource(skill)} alt={skill.name} className="w-3 h-3 object-contain" loading="lazy" />
                        </div>
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Category Cards ── */}
        {layout === "category-cards" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat, catIdx) => {
              const catSkills = allSkills.filter(s => cat.skillNames?.includes(s.name));
              if (!catSkills.length) return null;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIdx * 0.08, duration: 0.4 }}
                  className="rounded-2xl border p-5 flex flex-col gap-4 transition-all duration-300 hover:border-primary/30"
                  style={{ borderColor: "var(--border-color, rgba(255,255,255,0.06))", background: "var(--card-bg, #121212)" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: "var(--primary)" }} />
                    <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text-white-or-dark, #fff)" }}>
                      {cat.label}
                    </h3>
                  </div>
                  {/* Skill icons */}
                  <div className="flex flex-wrap gap-2">
                    {catSkills.slice(0, 8).map(skill => (
                      <div key={skill.name} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-stone-900 border border-stone-800">
                        <div className="w-4 h-4 rounded bg-white flex items-center justify-center shrink-0">
                          <img src={getIconSource(skill)} alt={skill.name} className="w-3 h-3 object-contain" loading="lazy" />
                        </div>
                        <span className="text-[9px] font-bold text-stone-400">{skill.name}</span>
                      </div>
                    ))}
                    {catSkills.length > 8 && (
                      <span className="text-[9px] text-stone-600 self-center">+{catSkills.length - 8} more</span>
                    )}
                  </div>
                  {/* Bullet points */}
                  {cat.bullets?.slice(0, 2).map((b, i) => (
                    <p key={i} className="text-[10px] text-stone-500 leading-relaxed flex items-start gap-2">
                      <FiCheckCircle className="shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
                      <span dangerouslySetInnerHTML={{ __html: b }} />
                    </p>
                  ))}
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </SectionLayout>
  );
};

export default React.memo(Skills);
