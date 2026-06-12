import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLayout from "../layout/SectionLayout";
import { skillCategories, skills } from "../constants";
import { FiCheckCircle } from "react-icons/fi";

const Skills = () => {
  const headerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(skillCategories[0]?.id || "frontend");

  const currentCategory = skillCategories.find((cat) => cat.id === activeCategory);

  // Filter skills that belong to the active category
  const filteredSkills = skills.filter((skill) =>
    currentCategory?.skillNames.includes(skill.name)
  );

  return (
    <SectionLayout
      id="skills"
      label="What I Know ?"
      headerRef={headerRef}
      spotlightColor="rgba(var(--primary-rgb), 0.06)"
      textColorClass="text-primary"
    >
      <div className="w-full min-h-[78vh] flex flex-col space-y-8 py-4">

        {/* Category Navigation — horizontal scrollable pills */}
        <div className="flex flex-wrap gap-2 select-none pb-4 relative">
          {skillCategories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-none ${isActive
                    ? "text-black bg-primary"
                    : "text-stone-500 bg-transparent border border-stone-800 hover:text-primary hover:border-primary/40"
                  }`}
                style={isActive ? { boxShadow: "0 0 16px rgba(var(--primary-rgb),0.3)" } : {}}
              >
                {/* Active indicator top bar */}
                {isActive && (
                  <span className="absolute inset-x-0 -top-px h-[2px] bg-black/20" />
                )}
                {category.label}
              </button>
            );
          })}
          {/* Bottom separator */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(to right, rgba(var(--primary-rgb),0.3), transparent)" }}
          />
        </div>

        {/* Content: Bullets + Skill Icons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left — Expertise bullets */}
          <div className="lg:col-span-5 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 text-left"
              >
                {/* Section label */}
                <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-3 flex items-center gap-2 select-none">
                  <span
                    className="w-4 h-[1px]"
                    style={{ background: "var(--primary)", opacity: 0.6 }}
                  />
                  Key Expertise
                </h3>

                <ul className="space-y-2.5">
                  {currentCategory?.bullets.map((bullet, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                      className="flex items-start gap-3 text-xs sm:text-sm text-stone-300 leading-relaxed p-3.5 rounded-xl transition-all duration-200 corner-card"
                    >
                      <FiCheckCircle
                        className="shrink-0 mt-0.5 text-sm sm:text-base"
                        style={{ color: "var(--primary)" }}
                      />
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
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-items-center"
              >
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.35 }}
                    whileHover={{ scale: 1.08, y: -5 }}
                    className="flex flex-col items-center justify-center gap-2.5 group cursor-pointer w-full select-none"
                  >
                    {/* Icon container with corner accents */}
                    <div
                      className="aspect-square w-16 sm:w-20 flex items-center justify-center p-4 relative overflow-hidden transition-all duration-300 corner-card"
                      style={{
                        borderRadius: "12px",
                        background: "#ffffff",
                      }}
                    >
                      {/* Top glow line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "linear-gradient(to right, transparent, var(--primary), transparent)" }}
                      />
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Skill name */}
                    <span className="text-[10px] sm:text-xs font-semibold text-stone-500 group-hover:text-primary transition-colors duration-300 text-center line-clamp-1 tracking-wide">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

export default React.memo(Skills);
