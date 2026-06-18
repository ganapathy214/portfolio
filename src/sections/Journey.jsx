import React, { useRef } from "react";
import ShinyText from "../components/common/ShinyText";
import CountUp from "../components/common/CountUp";
import { motion } from "framer-motion";
import { summaryStats, timelineData } from "../constants";
import SectionLayout from "../layouts/SectionLayout";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, type: "spring", stiffness: 80 },
  }),
};

const Journey = ({ timelineData: timelineDataProp, summaryStats: summaryStatsProp, title, sectionNum }) => {
  const journeyRef = useRef(null);

  const allTimelineData = timelineDataProp && timelineDataProp.length > 0 ? timelineDataProp : timelineData;
  const allSummaryStats = summaryStatsProp && summaryStatsProp.length > 0 ? summaryStatsProp : summaryStats;

  return (
    <SectionLayout
      id="journey"
      label={title || "What I've done ?"}
      headerRef={journeyRef}
      spotlightColor="rgba(var(--primary-rgb), 0.08)"
      textColorClass="text-primary"
      sectionNum={sectionNum}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start w-full py-4 text-left">
        {/* Left Side: Summary Counter Cards */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 select-none w-full">
          {allSummaryStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex-1 p-6 sm:p-7 flex flex-col items-center justify-center text-center corner-card"
              style={{ borderRadius: "16px" }}
            >
              <div className="inline-flex gap-1 items-baseline">
                <span
                  className="text-4xl sm:text-5xl font-black tracking-tight"
                  style={{
                    color: "var(--primary)",
                    textShadow: "0 0 20px rgba(var(--primary-rgb),0.4)",
                  }}
                >
                  <CountUp end={stat.value} duration={2.5} />
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--primary)" }}>
                  +
                </span>
              </div>
              <div className="mt-2 text-[10px] font-bold tracking-widest text-stone-500 uppercase">
                <ShinyText
                  text={stat.label}
                  disabled={false}
                  speed={5}
                  className="custom-class"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Timeline */}
        <div className="lg:col-span-8 relative pl-6 sm:pl-8 space-y-5 w-full">
          {/* Neon vertical line */}
          <div
            className="absolute left-0 top-2 bottom-2 pointer-events-none"
            style={{
              width: "1px",
              background: "linear-gradient(to bottom, var(--primary) 0%, rgba(var(--primary-rgb),0.3) 50%, transparent 100%)",
            }}
          />

          {allTimelineData.map((item, i) => (
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
                <div
                  className="rounded-full animate-pulse"
                  style={{ width: "5px", height: "5px", background: "var(--primary)" }}
                />
              </div>

              {/* Top glow on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "linear-gradient(to right, var(--primary), transparent)" }}
              />

              {/* Time badge & location */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 select-none">
                <span className="tag-primary">{item.time}</span>
                {item.location && (
                  <span className="text-[10px] text-stone-500 font-semibold">{item.location}</span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-primary transition-colors duration-300">
                <ShinyText text={item.title} disabled={false} speed={5} className="custom-class" />
              </h3>

              {/* Organization/Institution Name */}
              {item.org && (
                <div className="text-[11px] text-stone-400 font-bold uppercase tracking-wider mt-1 select-none">
                  {item.org}
                </div>
              )}

              {/* Score */}
              {item.percent && (
                <div className="mt-1.5 inline-block text-[10px] font-bold px-2 py-0.5 rounded select-none"
                  style={{
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    color: "rgb(52,211,153)",
                  }}
                >
                  Score: {item.percent}
                </div>
              )}

            </motion.div>
          ))}
        </div>
      </div>
    </SectionLayout>
  );
};

export default React.memo(Journey);
