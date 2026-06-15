import { motion } from "framer-motion";
import React, { useRef } from "react";
import { FiCode } from "react-icons/fi";
import { SERVICES_DATA, SERVICE_ICONS } from "../constants";
import SectionLayout from "../layout/SectionLayout";

const Services = ({ servicesSubtitle, servicesData, title, sectionNum }) => {
  const headerRef = useRef(null);
  
  const items = servicesData && servicesData.length > 0 ? servicesData : SERVICES_DATA;
  const subtitle = servicesSubtitle !== undefined ? servicesSubtitle : "High-performance, scalable, and secure software development solutions tailored to meet business objectives and deliver outstanding user experiences.";

  return (
    <SectionLayout
      id="services"
      label={title || "What I Offer ?"}
      headerRef={headerRef}
      spotlightColor="rgba(var(--primary-rgb), 0.06)"
      textColorClass="text-primary"
      sectionNum={sectionNum}
    >
      <div className="w-full min-h-[78vh] flex flex-col py-4 space-y-10">
        {/* Subtitle */}
        <p className="text-stone-500 text-center text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((service, index) => {
            const IconComponent = SERVICE_ICONS[service.icon] || FiCode;
            const num = String(index + 1).padStart(2, "0");
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  delay: (index % 3) * 0.08,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col overflow-hidden p-6 sm:p-7 transition-all duration-300 cursor-pointer text-left corner-card"
                style={{ borderRadius: "16px" }}
              >
                {/* Large background number */}
                <span
                  className="absolute top-4 right-5 font-black font-mono select-none pointer-events-none transition-colors duration-300"
                  style={{
                    fontSize: "4.5rem",
                    lineHeight: 1,
                    color: "rgba(var(--primary-rgb),0.05)",
                  }}
                >
                  {num}
                </span>

                {/* Top glow line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(to right, transparent, var(--primary), transparent)",
                  }}
                />

                {/* Icon container */}
                <div
                  className="w-12 h-12 flex items-center justify-center mb-5 relative z-10 rounded-lg transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(var(--primary-rgb),0.08)",
                    border: "1px solid rgba(var(--primary-rgb),0.15)",
                  }}
                >
                  <IconComponent
                    className="w-5 h-5 transition-colors duration-300"
                    style={{ color: "var(--primary)" }}
                  />
                </div>

                {/* Index label */}
                <span className="section-number mb-2 relative z-10">Service {num}</span>

                {/* Title */}
                <h3 className="font-bold text-base sm:text-lg text-white mb-3 group-hover:text-primary transition-colors duration-300 relative z-10">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed relative z-10 flex-1 group-hover:text-stone-400 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Bottom border accent line */}
                <div
                  className="mt-5 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 relative z-10"
                  style={{ background: "linear-gradient(to right, var(--primary), transparent)" }}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionLayout>
  );
};

export default React.memo(Services);
