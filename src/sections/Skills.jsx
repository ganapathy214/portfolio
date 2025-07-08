import React, { useRef } from "react";
//eslint-disable-next-line
import { motion } from "framer-motion";

import Carousel from "../common/Carousel";
import VariableProximity from "../common/VariableProximity";
import SectionLayout from "../layout/SectionLayout";

import { serviceList, skillCategories } from "../const";

const ServiceCard = ({ title, description }) => (
  <li className="flex flex-col gap-5 -m-0.5 p-4 sm:p-8">
    <div className="flex items-end gap-x-2 text-3xl justify-center font-bold text-sky-400">
      {title}
    </div>
    <p className="text-sm sm:text-base text-gray-600 dark:text-neutral-400 text-center">
      {description}
    </p>
  </li>
);

export default function Skills() {
  const headerRef = useRef(null);
  const proximityRef = useRef(null);

  const skillSlides = skillCategories.map((category) => (
    <div className="h-full w-full flex items-center" key={category.id}>
      <div>
        <div
          ref={proximityRef}
          className="text-2xl mb-4 text-sky-400 border-b-4"
          style={{ position: "relative" }}
        >
          <VariableProximity
            label={category.label}
            className="variable-proximity-demo"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={proximityRef}
            radius={100}
            falloff="linear"
          />
        </div>
        {category.content}
      </div>
    </div>
  ));

  return (
    <SectionLayout id="skills" label="What I Know ?" headerRef={headerRef}>
      <div className="max-w-[85rem] h-auto min-h-[78vh] m-auto flex flex-col md:flex-row gap-6 md:gap-10 justify-center items-center">
        <ul className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 divide-y-2 sm:divide-x-2 overflow-hidden divide-neutral-700 mb-4 md:mb-0">
          {serviceList.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </ul>

        <div className="w-full md:w-1/2 my-2 min-h-[200px]">
          <Carousel slides={skillSlides} />
        </div>
      </div>
    </SectionLayout>
  );
}
