//eslint-disable-next-line
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { certifications } from "../const";
import SectionLayout from "../layout/SectionLayout";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 12 },
  },
};

export default function Certification() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsInView(true),
      { threshold: 0.3 }
    );
    const section = sectionRef.current;
    if (section) observer.observe(section);
    return () => section && observer.unobserve(section);
  }, []);

  return (
    <SectionLayout
      id="certification"
      label="What I achieved?"
      headerRef={headerRef}
    >
      <div ref={sectionRef} className="w-full">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="relative">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="object-cover w-full h-48 sm:h-56 md:h-64 transition-transform duration-300 group-hover:scale-105"
                />
                {cert.pdfFile && (
                  <button
                    onClick={() =>
                      window.open(
                        `/src/assets/files/certification/${cert.pdfFile}`,
                        "_blank"
                      )
                    }
                    className="absolute bottom-3 right-3 inline-flex items-center gap-2 text-sm text-sky-400 font-semibold border border-sky-400 px-3 py-1.5 rounded-full hover:bg-sky-400 hover:text-black transition backdrop-blur"
                  >
                    <FiExternalLink className="text-base" />
                    View
                  </button>
                )}
              </div>
              <div className="p-4 space-y-1">
                <h3 className="text-base font-semibold text-sky-400">
                  {cert.title}
                </h3>
                <p className="text-sm text-white/80">{cert.issuer}</p>
                <p className="text-xs text-white/50">
                  Offered by: {cert.offeredBy}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionLayout>
  );
}
