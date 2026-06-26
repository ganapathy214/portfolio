import React, { useRef } from "react";
import { motion } from "framer-motion";
import SectionLayout from "../layouts/SectionLayout";
import { timelineData } from "../constants";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, type: "spring", stiffness: 80 },
  }),
};

const Experience = ({ timelineData: timelineDataProp, title, sectionNum, design = "design1" }) => {
  const headerRef = useRef(null);

  // Filter out items that have 'percent' or represent school/academic info
  const rawTimeline = timelineDataProp && timelineDataProp.length > 0 ? timelineDataProp : timelineData;
  const expData = rawTimeline.filter(item => !item.percent && !item.title.toLowerCase().includes("school") && !item.title.toLowerCase().includes("certificate"));

  // --- RENDERING DESIGNS ---

  if (design === "design2") {
    // DESIGN 2: Horizontal Card Track
    return (
      <SectionLayout id="experience" label={title || "Professional Experience"} headerRef={headerRef} spotlightColor="rgba(var(--primary-rgb), 0.04)" textColorClass="text-primary" sectionNum={sectionNum}>
        <div className="w-full min-h-[78vh] flex flex-col justify-center py-4 text-left">
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory">
            {expData.map((item, idx) => (
              <motion.div
                key={idx}
                className="snap-start shrink-0 w-80 p-6 rounded-2xl bg-stone-900 border border-stone-850 hover:border-primary/40 transition-all space-y-4"
                whileHover={{ y: -6 }}
              >
                <div className="flex justify-between items-center">
                  <span className="tag-primary text-[8px]">{item.time}</span>
                  <span className="text-[9px] text-stone-500 font-bold uppercase">{item.location}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">{item.title}</h3>
                  <p className="text-[10px] text-primary uppercase font-bold tracking-wider mt-1">{item.org}</p>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed font-medium">
                  Led core feature builds, oversaw agile releases, and adapted modular design layers to fit visual performance parameters.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionLayout>
    );
  }

  if (design === "design3") {
    // DESIGN 3: Split Grid columns
    return (
      <SectionLayout id="experience" label={title || "Professional Experience"} headerRef={headerRef} spotlightColor="rgba(var(--primary-rgb), 0.05)" textColorClass="text-primary" sectionNum={sectionNum}>
        <div className="w-full min-h-[78vh] grid grid-cols-1 md:grid-cols-2 gap-6 py-4 text-left">
          {expData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="p-6 rounded-3xl bg-stone-900/40 border border-stone-850 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-primary font-bold">{item.time}</span>
                <h3 className="text-lg font-black text-white">{item.title}</h3>
                <span className="text-xs font-bold text-stone-400">{item.org}</span>
              </div>
              <div className="border-t border-stone-900 mt-4 pt-4 text-xs text-stone-500 flex justify-between">
                <span>{item.location}</span>
                <span className="text-primary font-bold">Full Time</span>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionLayout>
    );
  }

  if (design === "design4") {
    // DESIGN 4: Classic Resume (Clean horizontal list)
    return (
      <SectionLayout id="experience" label={title || "Professional Experience"} headerRef={headerRef} spotlightColor="rgba(var(--primary-rgb), 0.02)" textColorClass="text-primary" sectionNum={sectionNum}>
        <div className="w-full min-h-[78vh] flex flex-col space-y-8 py-6 text-left">
          {expData.map((item, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-4 border-b border-stone-900 pb-6 items-start">
              <div className="md:w-3/12 shrink-0">
                <span className="text-xs font-mono font-bold text-primary">{item.time}</span>
                <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-1">{item.location}</p>
              </div>
              <div className="md:w-9/12 space-y-2">
                <h3 className="text-lg font-bold text-white leading-tight">{item.title}</h3>
                <span className="text-xs font-black text-stone-400 uppercase tracking-widest">{item.org}</span>
                <p className="text-stone-400 text-xs leading-relaxed max-w-2xl">
                  Collaborated with designers and engineering stakeholders to design layout elements, inject performance variables, and implement fluid animations.
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionLayout>
    );
  }

  if (design === "design5") {
    // DESIGN 5: Compact Company Badges
    return (
      <SectionLayout id="experience" label={title || "Professional Experience"} headerRef={headerRef} spotlightColor="rgba(var(--primary-rgb), 0.06)" textColorClass="text-primary" sectionNum={sectionNum}>
        <div className="w-full min-h-[78vh] grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 text-left">
          {expData.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl border border-stone-900 bg-stone-950 hover:border-stone-850 transition-all flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="text-[8.5px] uppercase font-bold tracking-widest text-stone-500">{item.time}</span>
                <h3 className="text-sm font-bold text-white mt-1 leading-tight">{item.title}</h3>
              </div>
              <div className="mt-3">
                <span className="text-[10px] font-bold text-primary">{item.org}</span>
                <span className="text-[9px] text-stone-600 block mt-0.5">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionLayout>
    );
  }

  // DEFAULT: DESIGN 1 (Neon Vertical Timeline)
  return (
    <SectionLayout id="experience" label={title || "Professional Experience"} headerRef={headerRef} spotlightColor="rgba(var(--primary-rgb), 0.08)" textColorClass="text-primary" sectionNum={sectionNum}>
      <div className="relative pl-6 sm:pl-8 space-y-5 w-full text-left py-4">
        {/* Neon vertical line */}
        <div
          className="absolute left-0 top-2 bottom-2 pointer-events-none"
          style={{
            width: "1px",
            background: "linear-gradient(to bottom, var(--primary) 0%, rgba(var(--primary-rgb),0.3) 50%, transparent 100%)",
          }}
        />

        {expData.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            whileHover={{ x: 5 }}
            className="relative group p-5 sm:p-6 transition-all duration-300 corner-card"
            style={{ borderRadius: "14px" }}
          >
            {/* Dot node */}
            <div
              className="absolute top-7 flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-125"
              style={{
                left: "-37px",
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: "#000",
                border: "2px solid var(--primary)",
                boxShadow: "0 0 8px rgba(var(--primary-rgb),0.5)",
              }}
            >
              <div className="rounded-full animate-pulse" style={{ width: "5px", height: "5px", background: "var(--primary)" }} />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 select-none">
              <span className="tag-primary text-[8.5px]">{item.time}</span>
              {item.location && <span className="text-[10px] text-stone-500 font-semibold">{item.location}</span>}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-primary transition-colors duration-300">
              {item.title}
            </h3>

            {item.org && (
              <div className="text-[11px] text-stone-400 font-bold uppercase tracking-wider mt-1 select-none">
                {item.org}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </SectionLayout>
  );
};

export default React.memo(Experience);
