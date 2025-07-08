// src/sections/Resume.jsx
import React, { useRef } from "react";
import ShinyText from "../common/ShinyText";
import SpotlightCard from "../common/SpotlightCard";
import VariableProximity from "../common/VariableProximity";
//eslint-disable-next-line
import { motion } from "framer-motion";
import { SectionHeader } from "../common/utils";
import { summaryStats } from "../const";
import CountUp from "../common/CountUp";

const timelineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, type: "spring" },
  }),
};

const timelineData = [
  {
    time: "Oct 2022 - Present",
    title: "Software Developer",
    org: "Mitrahsoft Solutions Private Limited",
    location: "Coimbatore, Tamil Nadu.",
  },
  {
    time: "June 2019 - Oct 2022",
    title: "Competitive Exam Preparation",
  },
  {
    time: "Aug 2015 - May 2019",
    title: "BE in Electronics and Communication Engineering",
    percent: "69.70%",
    org: "Velalar College of Engineering and Technology",
    location: "Erode, Tamil Nadu.",
  },
  {
    time: "June 2013 - May 2015",
    title: "Higher Secondary Certificate",
    percent: "80.83%",
    org: "Sengunthar Higher Secondary School",
    location: "Erode, Tamil Nadu.",
  },
  {
    time: "June 2012 - May 2013",
    title: "Secondary School Leaving Certificate",
    percent: "93.20%",
    org: "Sengunthar Higher Secondary School",
    location: "Erode, Tamil Nadu.",
  },
];

const Journey = () => {
  const journeyRef = useRef(null);

  return (
    <>
      <motion.section
        id="journey"
        className="min-h-screen h-screen flex flex-col py-6"
      >
        <div>
          <SectionHeader containerRef={journeyRef} label="What I've done ?" />
        </div>
        <div className="flex-1 flex min-h-0">
          <SpotlightCard className="custom-spotlight-card p-8 w-full h-full flex justify-center items-center gap-10">
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
            <div>
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
          </SpotlightCard>
        </div>
      </motion.section>
    </>
  );
};

export default Journey;
