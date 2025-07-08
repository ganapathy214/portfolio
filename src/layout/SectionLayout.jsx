//eslint-disable-next-line
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import SpotlightCard from "../common/SpotlightCard";
import { SectionHeader } from "../common/utils";
import { framerVariants } from "../const";

const getVariant = (key) => framerVariants.find((v) => v.key === key)?.value;

export default function SectionLayout({
  id,
  label,
  containerVariantKey = "fadeUp",
  itemVariantKey = "fadeIn",
  headerRef,
  children,
}) {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const hasAnimatedRef = useRef(false);

  const containerVariant = getVariant(containerVariantKey);
  const itemVariant = getVariant(itemVariantKey);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          setIsInView(true);
          hasAnimatedRef.current = true;
        }
      },
      { threshold: 0.4 }
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => section && observer.unobserve(section);
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="min-h-screen flex flex-col py-6"
    >
      <SectionHeader containerRef={headerRef} label={label} />

      <div className="flex-1 flex min-h-0">
        <SpotlightCard className="custom-spotlight-card p-8 w-full h-full">
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
