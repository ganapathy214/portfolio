import React, { useRef } from "react";
import { motion } from "framer-motion";
import SectionLayout from "../layouts/SectionLayout";
import { timelineData } from "../constants";
import { FiAward, FiBookOpen } from "react-icons/fi";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, type: "spring", stiffness: 80 },
  }),
};

const Education = ({ timelineData: timelineDataProp, title, sectionNum, design = "design1" }) => {
  const headerRef = useRef(null);

  // Filter items that have 'percent' or keywords related to school/education
  const rawTimeline = timelineDataProp && timelineDataProp.length > 0 ? timelineDataProp : timelineData;
  const eduData = rawTimeline.filter(item => item.percent || item.title.toLowerCase().includes("school") || item.title.toLowerCase().includes("certificate"));

  // --- RENDERING DESIGNS ---

  if (design === "design2") {
    // DESIGN 2: Academic Cards (Grid of school/college cards with CGPA/marks badges)
    return (
      <SectionLayout id="education" label={title || "Academic Background"} headerRef={headerRef} spotlightColor="rgba(var(--primary-rgb), 0.04)" textColorClass="text-primary" sectionNum={sectionNum}>
        <div className="w-full min-h-[78vh] grid grid-cols-1 md:grid-cols-2 gap-6 py-4 text-left">
          {eduData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-stone-900 border border-stone-850 hover:border-primary/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[10px] font-mono text-stone-500 font-bold">{item.time}</span>
                  {item.percent && (
                    <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-lg shrink-0">
                      Score: {item.percent}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-extrabold text-white leading-tight">{item.title}</h3>
                <p className="text-[11px] text-stone-400 font-bold uppercase tracking-wider">{item.org}</p>
              </div>
              <div className="text-[10px] text-stone-500 mt-4 pt-2 border-t border-stone-900">
                <span>Location: {item.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionLayout>
    );
  }

  if (design === "design3") {
    // DESIGN 3: Minimalist List
    return (
      <SectionLayout id="education" label={title || "Academic Background"} headerRef={headerRef} spotlightColor="rgba(var(--primary-rgb), 0.05)" textColorClass="text-primary" sectionNum={sectionNum}>
        <div className="w-full min-h-[78vh] flex flex-col space-y-6 py-4 text-left max-w-3xl mx-auto">
          {eduData.map((item, idx) => (
            <div key={idx} className="flex gap-4 border-l-2 border-stone-800 pl-4 py-1">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-primary font-bold">{item.time}</span>
                <h3 className="text-sm font-bold text-white leading-tight">{item.title}</h3>
                <p className="text-[10px] text-stone-400 font-medium">
                  {item.org} • {item.location} {item.percent ? `(Score: ${item.percent})` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionLayout>
    );
  }

  if (design === "design4") {
    // DESIGN 4: Split Layout (Graduation Icon Left, details right)
    return (
      <SectionLayout id="education" label={title || "Academic Background"} headerRef={headerRef} spotlightColor="rgba(var(--primary-rgb), 0.02)" textColorClass="text-primary" sectionNum={sectionNum}>
        <div className="w-full min-h-[78vh] flex flex-col md:flex-row gap-10 py-6 text-left items-start">
          <div className="md:w-4/12 flex flex-col items-center text-center gap-3 shrink-0 py-4 bg-stone-900/30 border border-stone-850 rounded-3xl w-full">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary text-2xl">
              <FiBookOpen />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Academics</h3>
              <p className="text-[10px] text-stone-500 font-bold uppercase mt-1">Qualifications Overview</p>
            </div>
          </div>
          <div className="md:w-8/12 space-y-6 w-full">
            {eduData.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-stone-900 bg-stone-950 flex justify-between items-center gap-4">
                <div className="space-y-1">
                  <span className="text-[8.5px] uppercase font-bold text-stone-500">{item.time}</span>
                  <h4 className="text-sm font-bold text-white leading-tight">{item.title}</h4>
                  <p className="text-[10px] text-stone-400">{item.org} • {item.location}</p>
                </div>
                {item.percent && (
                  <div className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold px-2.5 py-1 rounded-lg shrink-0">
                    {item.percent}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SectionLayout>
    );
  }

  if (design === "design5") {
    // DESIGN 5: Clean Table
    return (
      <SectionLayout id="education" label={title || "Academic Background"} headerRef={headerRef} spotlightColor="rgba(var(--primary-rgb), 0.06)" textColorClass="text-primary" sectionNum={sectionNum}>
        <div className="w-full min-h-[78vh] py-4 text-left overflow-x-auto">
          <table className="w-full text-xs font-semibold text-stone-400 border-collapse border-b border-stone-900 min-w-[500px]">
            <thead>
              <tr className="border-b border-stone-850 text-stone-500 uppercase tracking-widest text-[9px] text-left">
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Degree / Certification</th>
                <th className="py-3 px-4">Institution</th>
                <th className="py-3 px-4 text-right">Result</th>
              </tr>
            </thead>
            <tbody>
              {eduData.map((item, idx) => (
                <tr key={idx} className="border-b border-stone-900 hover:bg-stone-900/10 transition-colors">
                  <td className="py-4 px-4 font-mono text-primary font-bold">{item.time.split(" - ").pop()}</td>
                  <td className="py-4 px-4 text-white font-bold">{item.title}</td>
                  <td className="py-4 px-4">{item.org}</td>
                  <td className="py-4 px-4 text-right text-emerald-400 font-mono font-bold">{item.percent || "Pass"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionLayout>
    );
  }

  // DEFAULT: DESIGN 1 (Vertical Timeline node)
  return (
    <SectionLayout id="education" label={title || "Academic Background"} headerRef={headerRef} spotlightColor="rgba(var(--primary-rgb), 0.08)" textColorClass="text-primary" sectionNum={sectionNum}>
      <div className="relative pl-6 sm:pl-8 space-y-5 w-full text-left py-4">
        {/* Neon vertical line */}
        <div
          className="absolute left-0 top-2 bottom-2 pointer-events-none"
          style={{
            width: "1px",
            background: "linear-gradient(to bottom, var(--primary) 0%, rgba(var(--primary-rgb),0.3) 50%, transparent 100%)",
          }}
        />

        {eduData.map((item, i) => (
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

            <div className="flex justify-between items-center mt-1">
              <div className="text-[11px] text-stone-400 font-bold uppercase tracking-wider select-none">
                {item.org}
              </div>
              {item.percent && (
                <div className="text-[9px] font-bold px-2 py-0.5 rounded select-none"
                  style={{
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    color: "rgb(52,211,153)",
                  }}
                >
                  Score: {item.percent}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionLayout>
  );
};

export default React.memo(Education);
