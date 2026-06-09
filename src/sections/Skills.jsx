import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLayout from "../layout/SectionLayout";
import { serviceList, skillCategories } from "../const";

/* ─── Numbered Service Tile ────────────────────────────────── */
const SERVICE_ACCENTS = ["#38bdf8", "#a78bfa", "#34d399", "#fb7185"];

const ServiceTile = ({ title, description, icon: Icon, index }) => {
  const num = String(index + 1).padStart(2, "0");
  const accent = SERVICE_ACCENTS[index % SERVICE_ACCENTS.length];

  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover="hovered"
      className="relative flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm overflow-hidden cursor-default group"
    >
      {/* Background accent sweep on hover */}
      <motion.div
        className="absolute inset-0 opacity-0"
        variants={{ hovered: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
        style={{
          background: `radial-gradient(ellipse 80% 60% at 10% 20%, ${accent}18, transparent 70%)`,
        }}
      />

      {/* Top row: number + icon */}
      <div className="relative flex items-start justify-between mb-3">
        <span
          className="font-mono text-3xl sm:text-4xl font-black leading-none select-none"
          style={{ color: accent, opacity: 0.18 }}
        >
          {num}
        </span>
        <motion.div
          variants={{ hovered: { rotate: 12, scale: 1.15 } }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-2 rounded-lg"
          style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
        >
          <Icon style={{ color: accent }} className="text-xl" />
        </motion.div>
      </div>

      {/* Title */}
      <div className="relative">
        <h3
          className="font-bold text-sm sm:text-base text-white mb-1 leading-snug"
        >
          {title}
        </h3>
        <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Bottom accent bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-0"
        variants={{ hovered: { width: "100%" } }}
        transition={{ duration: 0.3 }}
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      />
    </motion.li>
  );
};

/* ─── Skill Tag (varying weight/size for cloud effect) ─────── */
const SIZE_CLASSES = [
  "text-[11px] px-2 py-1",
  "text-xs px-2.5 py-1",
  "text-xs px-3 py-1.5 font-semibold",
  "text-sm px-3 py-1.5 font-semibold",
];

const SkillTag = ({ skill, index, total }) => {
  const sizeIdx = Math.floor((index / total) * SIZE_CLASSES.length);
  const sizeClass = SIZE_CLASSES[Math.min(sizeIdx, SIZE_CLASSES.length - 1)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.03, duration: 0.25, ease: "easeOut" }}
      whileHover={{ scale: 1.08, y: -2 }}
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 text-white hover:border-sky-400/60 hover:bg-sky-500/10 hover:text-sky-300 transition-colors duration-200 cursor-default ${sizeClass}`}
    >
      <img
        src={skill.icon}
        alt={skill.name}
        className="w-3.5 h-3.5 shrink-0"
        loading="lazy"
        decoding="async"
      />
      {skill.name}
    </motion.div>
  );
};

/* ─── Category Chip ────────────────────────────────────────── */
const CategoryChip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 whitespace-nowrap ${active
      ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/25"
      : "bg-white/5 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white"
      }`}
  >
    {label}
  </button>
);

/* ─── Skills Section ───────────────────────────────────────── */
const Skills = () => {
  const headerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const current = skillCategories[activeIdx];

  return (
    <SectionLayout id="skills" label="What I Know ?" headerRef={headerRef}>
      <div className="flex flex-col xl:flex-row gap-5 w-full min-h-[78vh] ">

        {/* ── LEFT: Service Tiles 2×2 ── */}
        <div className="xl:w-[590px] shrink-0 flex flex-col gap-3">
          {/* <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-1">
            What I Build
          </p> */}
          <ul className="grid grid-cols-2 gap-3 flex-1">
            {serviceList.map((svc, i) => (
              <ServiceTile key={svc.id} index={i} {...svc} />
            ))}
          </ul>

          {/* Decorative stat strip */}
          {/* <div className="hidden xl:flex items-center justify-between rounded-xl border border-white/8 bg-black/30 px-4 py-3">
            {[
              { value: "6+", label: "Years" },
              { value: "30+", label: "Projects" },
              { value: "20+", label: "Tech Stack" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-xl font-bold text-sky-400">{value}</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div> */}
        </div>

        {/* ── RIGHT: Skill Explorer ── */}
        <div className="flex-1 flex flex-col rounded-2xl border border-white/8 bg-black/30 backdrop-blur-md overflow-hidden">

          {/* Header */}
          <div className="px-4 sm:px-6 pt-5 pb-4 border-b border-white/8">
            <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 font-semibold mb-3">
              Skill Categories
            </p>
            {/* Category chips — horizontal scroll */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
              {skillCategories.map((cat, i) => (
                <CategoryChip
                  key={cat.id}
                  label={cat.label}
                  active={activeIdx === i}
                  onClick={() => setActiveIdx(i)}
                />
              ))}
            </div>
          </div>

          {/* Content area */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute inset-0 px-4 sm:px-6 py-5 flex flex-col gap-5 overflow-y-auto"
              >
                {/* Active category label */}
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-sky-400" />
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {current.label}
                  </h3>
                  {current._skills?.length > 0 && (
                    <span className="ml-auto text-[11px] text-neutral-500 border border-white/10 rounded-full px-2 py-0.5">
                      {current._skills.length} technologies
                    </span>
                  )}
                </div>

                {/* Tag cloud */}
                {current._skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                      {current._skills.map((skill, i) => (
                        <SkillTag
                          key={skill.name}
                          skill={skill}
                          index={i}
                          total={current._skills.length}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {/* Divider */}
                {current._skills?.length > 0 && (
                  <div className="border-t border-white/8" />
                )}

                {/* Bullets as compact cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.bullets?.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                      className="flex gap-2.5 p-2.5 sm:p-3 rounded-lg bg-white/[0.03] border border-white/8 text-[11px] sm:text-xs text-neutral-300 leading-relaxed"
                    >
                      <span className="text-sky-400 shrink-0 mt-0.5 font-mono text-[10px] font-bold pt-[1px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: b }} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </SectionLayout>
  );
};

export default React.memo(Skills);
