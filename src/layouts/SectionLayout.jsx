import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import SpotlightCard from "../components/common/SpotlightCard";
import { SectionHeader } from "../components/common/utils";
import { framerVariants, SECTION_NUMBERS } from "../constants";
import { usePortfolio } from "../context/PortfolioContext";

const getVariant = (key) => framerVariants.find((v) => v.key === key)?.value;


export default function SectionLayout({
  id,
  label,
  containerVariantKey = "fadeUp",
  itemVariantKey = "fadeIn",
  headerRef,
  spotlightColor,
  textColorClass,
  sectionNum,
  children,
}) {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const hasAnimatedRef = useRef(false);

  const containerVariant = getVariant(containerVariantKey);
  const itemVariant = getVariant(itemVariantKey);
  const finalSectionNum = sectionNum || SECTION_NUMBERS[id] || "00";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          setIsInView(true);
          hasAnimatedRef.current = true;
        }
      },
      { threshold: 0.08 }
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => section && observer.unobserve(section);
  }, []);

  const { selectedTemplate } = usePortfolio() || {};
  const isTemplate6 = selectedTemplate === "template-6";

  if (isTemplate6) {
    return (
      <section
        id={id}
        ref={sectionRef}
        className="min-h-[60vh] flex flex-col py-16 px-6 relative w-full text-left max-w-[90%] mx-auto"
      >
        {/* Section header row matching template-6 design */}
        <div
          ref={headerRef}
          className="flex items-center gap-3 mb-12 relative z-10 w-full"
        >
          {/* Number Prefix (e.g., 02.) */}
          <span
            className="text-3xl font-extrabold font-mono select-none"
            style={{ color: "var(--primary)" }}
          >
            {finalSectionNum}.
          </span>

          {/* Section title */}
          <h2
            className="text-3xl font-extrabold tracking-tight text-[var(--text-white-or-dark)]"
          >
            {label}
          </h2>

          {/* Horizontal rule accent */}
          <div
            className="flex-1 h-px"
            style={{
              background: "linear-gradient(to left, transparent, rgba(var(--primary-rgb),0.15))",
            }}
          />
        </div>

        {/* Content - full width, borderless, cardless */}
        <div className="flex-1 flex min-h-0 relative z-10 w-full">
          <motion.div
            className="w-full h-full"
            variants={containerVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div className="w-full h-full" variants={itemVariant}>
              {children}
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={sectionRef}
      className="min-h-[78vh] flex flex-col py-6 relative overflow-hidden"
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      {/* Left edge accent */}
      <div
        className="absolute left-0 top-0 h-full pointer-events-none"
        style={{
          width: "2px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(var(--primary-rgb),0.3) 30%, rgba(var(--primary-rgb),0.3) 70%, transparent 100%)",
        }}
      />

      {/* Section header row */}
      <div
        ref={headerRef}
        className="flex items-center justify-between mb-4 px-3 sm:px-5 md:px-8 relative z-10"
      >
        {/* Number */}
        <span
          className="font-mono text-[10px] font-bold tracking-widest select-none"
          style={{ color: "rgba(var(--primary-rgb),0.4)" }}
        >
          /{finalSectionNum}
        </span>

        {/* Section title with VariableProximity */}
        <div
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl ${textColorClass} font-black tracking-tight`}
        >
          <SectionHeader
            containerRef={headerRef}
            label={label}
            textColorClass={textColorClass}
          />
        </div>

        {/* Horizontal rule accent */}
        <div
          className="flex-1 ml-4 h-px"
          style={{
            background: "linear-gradient(to left, transparent, rgba(var(--primary-rgb),0.2))",
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex min-h-0 relative z-10">
        <SpotlightCard
          className="custom-spotlight-card p-3 sm:p-5 md:p-8 w-full h-full"
          spotlightColor={spotlightColor}
        >
          <motion.div
            className="w-full h-full"
            variants={containerVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div className="w-full h-full" variants={itemVariant}>
              {children}
            </motion.div>
          </motion.div>
        </SpotlightCard>
      </div>
    </section>
  );
}
