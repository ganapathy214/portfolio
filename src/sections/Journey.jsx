import React, { useRef } from "react";
import ShinyText from "../common/ShinyText";
import CountUp from "../common/CountUp";
import VariableProximity from "../common/VariableProximity";
//eslint-disable-next-line
import { motion } from "framer-motion";
import { summaryStats, timelineData } from "../const";
import SectionLayout from "../layout/SectionLayout";

const timelineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, type: "spring" },
  }),
};

const Journey = () => {
  const journeyRef = useRef(null);

  return (
    <SectionLayout id="journey" label="What I've done ?" headerRef={journeyRef}>
      <div className="flex flex-col xl:flex-row justify-center items-center gap-10 w-full h-full">
        {/* Stats */}
        <div className="flex flex-col justify-center items-center">
          <div className="flex sm:flex-col justify-center mt-4 sm:mt-0 sm:gap-8 gap-2 bg-gray-700/60 sm:bg-transparent p-4 rounded-lg z-10">
            {summaryStats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:items-end items-center"
              >
                <div className="inline-flex gap-1 items-center">
                  <div className="xl:text-8xl md:text-6xl sm:text-4xl text-3xl font-semibold">
                    <CountUp end={stat.value} duration={2} />
                  </div>
                  <h2 className="text-sky-400 text-8xl font-extrabold">
                    +
                  </h2>
                </div>
                <div>
                  <ShinyText
                    text={stat.label}
                    disabled={false}
                    speed={5}
                    className="custom-class"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          {timelineData.map((item, i) => (
            <motion.div
              className="flex gap-x-3"
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={timelineVariants}
            >
              {/* Left Content */}
              <div className="min-w-14 text-end w-40">
                <time className="text-xs text-sky-400">{item.time}</time>
              </div>
              {/* Icon */}
              <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-neutral-700">
                <div className="relative z-10 size-7 flex justify-center items-center">
                  <div className="size-2 rounded-full bg-sky-400"></div>
                </div>
              </div>
              {/* Right Content */}
              <div className="grow pt-0.5 pb-8">
                <ShinyText
                  text={item.title}
                  disabled={false}
                  speed={5}
                  className="custom-class"
                />
                {item.percent && (
                  <h2 className="my-1 text-white">{item.percent}</h2>
                )}
                {item.org && (
                  <h3 className="flex my-1 font-semibold text-sky-400">
                    <VariableProximity
                      label={item.org}
                      className="variable-proximity-demo"
                      fromFontVariationSettings="'wght' 400, 'opsz' 9"
                      toFontVariationSettings="'wght' 1000, 'opsz' 40"
                      containerRef={journeyRef}
                      radius={100}
                      falloff="linear"
                    />
                  </h3>
                )}
                {item.location && (
                  <p className="my-1 text-sm text-neutral-400">
                    {item.location}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionLayout>
  );
};

export default React.memo(Journey);
