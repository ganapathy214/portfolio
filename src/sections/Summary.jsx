import React, { useRef } from "react";
import SpotlightCard from "../common/SpotlightCard";
import VariableProximity from "../common/VariableProximity";
import { FaCodeBranch, FaLaptopCode } from "react-icons/fa";
import { TbSettingsAutomation } from "react-icons/tb";
import ShinyText from "../common/ShinyText";
import CountUp from "../common/CountUp";

// Service data
const serviceList = [
  {
    id: 1,
    title: "Web & Mobile Dev't",
    description: "Responsive and SEO-friendly full-stack apps.",
    icon: FaLaptopCode,
  },
  {
    id: 2,
    title: "API & DB Integration",
    description: "Secure APIs with seamless data handling.",
    icon: FaCodeBranch,
  },
  {
    id: 3,
    title: "Version Control & Deployment",
    description: "Streamlined code delivery with Git workflows.",
    icon: FaCodeBranch,
  },
  {
    id: 4,
    title: "Automation Testing",
    description: "Reliable, scalable test automation for projects.",
    icon: TbSettingsAutomation,
  },
];

// Stats data

export default function SummarySection() {
  const sectionTitleRef = useRef(null);

  return (
    <section id="summary" className="min-h-screen pt-6">
      <div
        ref={sectionTitleRef}
        className="text-5xl text-end mb-4 text-sky-400 border-b-4"
        style={{ position: "relative" }}
      >
        <VariableProximity
          label={"What I Do ?"}
          className={"variable-proximity-demo"}
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={sectionTitleRef}
          radius={100}
          falloff="linear"
        />
      </div>
      <SpotlightCard className="custom-spotlight-card  p-8">
        {/* Services */}
        <div className="">
          <div className="grid grid-cols-2 gap-4">
            {serviceList.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl p-6 border border-yellow-100 select-none hover:shadow-lg hover:shadow-sky-400 hover:scale-105 transition duration-300 backdrop-blur-xl"
                >
                  <div className="flex justify-center">
                    <Icon className="text-sky-400 rounded-full border-3 p-3 w-20 h-20 mb-4" />
                  </div>
                  <h3 className="text-2xl text-[#b5b5b5a4] bg-clip-text text-center mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed text-center">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
