import { motion } from "framer-motion";
import React, { useRef } from "react";
import { FiCode, FiArrowRight } from "react-icons/fi";
import { SERVICES_DATA, SERVICE_ICONS } from "../constants";
import SectionLayout from "../layouts/SectionLayout";
import { usePortfolio } from "../context/PortfolioContext";

const Services = ({ servicesSubtitle, servicesData, title, sectionNum }) => {
  const headerRef = useRef(null);
  const { sectionLayouts } = usePortfolio();
  const layout = sectionLayouts?.Services || "icon-cards";

  const items = servicesData && servicesData.length > 0 ? servicesData : SERVICES_DATA;
  const subtitle = servicesSubtitle !== undefined
    ? servicesSubtitle
    : "High-performance, scalable, and secure software development solutions tailored to meet business objectives and deliver outstanding user experiences.";

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

        {/* ── Layout: Icon Cards (default grid) ── */}
        {layout === "icon-cards" && (
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
                  transition={{ delay: (index % 3) * 0.08, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ y: -6 }}
                  className="group relative flex flex-col overflow-hidden p-6 sm:p-7 transition-all duration-300 cursor-pointer text-left corner-card"
                  style={{ borderRadius: "16px" }}
                >
                  <span className="absolute top-4 right-5 font-black font-mono select-none pointer-events-none transition-colors duration-300"
                    style={{ fontSize: "4.5rem", lineHeight: 1, color: "rgba(var(--primary-rgb),0.05)" }}
                  >
                    {num}
                  </span>
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "linear-gradient(to right, transparent, var(--primary), transparent)" }} />
                  <div className="w-12 h-12 flex items-center justify-center mb-5 relative z-10 rounded-lg transition-all duration-300 group-hover:scale-110"
                    style={{ background: "rgba(var(--primary-rgb),0.08)", border: "1px solid rgba(var(--primary-rgb),0.15)" }}
                  >
                    <IconComponent className="w-5 h-5 transition-colors duration-300" style={{ color: "var(--primary)" }} />
                  </div>
                  <span className="section-number mb-2 relative z-10">Service {num}</span>
                  <h3 className="font-bold text-base sm:text-lg text-white mb-3 group-hover:text-primary transition-colors duration-300 relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-stone-500 text-xs sm:text-sm leading-relaxed relative z-10 flex-1 group-hover:text-stone-400 transition-colors duration-300">
                    {service.description}
                  </p>
                  <div className="mt-5 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 relative z-10"
                    style={{ background: "linear-gradient(to right, var(--primary), transparent)" }} />
                </motion.article>
              );
            })}
          </div>
        )}

        {/* ── Layout: Horizontal Strip ── */}
        {layout === "horizontal" && (
          <div className="flex flex-col gap-3">
            {items.map((service, index) => {
              const IconComponent = SERVICE_ICONS[service.icon] || FiCode;
              const num = String(index + 1).padStart(2, "0");
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07, duration: 0.4 }}
                  className="group flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.08)]"
                  style={{ borderColor: "var(--border-color, rgba(255,255,255,0.06))", background: "var(--card-bg, #121212)" }}
                >
                  {/* Number */}
                  <span className="text-2xl font-black font-mono shrink-0 w-10 text-center"
                    style={{ color: "rgba(var(--primary-rgb),0.2)" }}>
                    {num}
                  </span>
                  {/* Icon */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: "rgba(var(--primary-rgb),0.08)", border: "1px solid rgba(var(--primary-rgb),0.15)" }}
                  >
                    <IconComponent className="w-4 h-4" style={{ color: "var(--primary)" }} />
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-white mb-0.5 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-stone-500 text-xs leading-relaxed line-clamp-1 group-hover:text-stone-400 transition-colors">
                      {service.description}
                    </p>
                  </div>
                  {/* Arrow */}
                  <FiArrowRight className="shrink-0 text-stone-700 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1" />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ── Layout: Minimal List ── */}
        {layout === "minimal-list" && (
          <div className="max-w-2xl mx-auto w-full space-y-8">
            {items.map((service, index) => {
              const IconComponent = SERVICE_ICONS[service.icon] || FiCode;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.35 }}
                  className="flex items-start gap-5 group"
                >
                  {/* Left: icon + vertical line */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-9 h-9 flex items-center justify-center rounded-xl"
                      style={{ background: "rgba(var(--primary-rgb),0.08)", border: "1px solid rgba(var(--primary-rgb),0.2)" }}
                    >
                      <IconComponent className="w-4 h-4" style={{ color: "var(--primary)" }} />
                    </div>
                    {index < items.length - 1 && (
                      <div className="w-px flex-1 mt-2 min-h-[40px]"
                        style={{ background: "linear-gradient(to bottom, rgba(var(--primary-rgb),0.2), transparent)" }} />
                    )}
                  </div>
                  {/* Right: text */}
                  <div className="flex-1 pb-4">
                    <h3 className="font-bold text-sm text-white mb-1.5 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </SectionLayout>
  );
};

export default React.memo(Services);
