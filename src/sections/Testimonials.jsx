import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FiMessageSquare } from "react-icons/fi";
import SectionLayout from "../layouts/SectionLayout";

export default function Testimonials({ testimonials = [], title, sectionNum }) {
  const headerRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <SectionLayout
      id="testimonials"
      label={title || "What clients say?"}
      headerRef={headerRef}
      spotlightColor="rgba(var(--primary-rgb), 0.05)"
      textColorClass="text-primary"
      sectionNum={sectionNum}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4"
      >
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="p-6 rounded-3xl border border-[var(--border-color)] bg-stone-950/40 relative flex flex-col justify-between overflow-hidden group hover:border-[rgba(var(--primary-rgb),0.3)] transition-all duration-300"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {/* Ambient hover glow */}
            <div className="absolute -inset-px bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
            
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 text-stone-900 group-hover:text-primary/10 transition-colors duration-300 pointer-events-none">
              <FiMessageSquare className="text-5xl" />
            </div>

            <div className="space-y-4 z-10 text-left">
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic font-medium">
                "{t.text}"
              </p>
              
              <div className="flex items-center gap-3 border-t border-[var(--border-color)] pt-4">
                {t.avatar ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--border-color)] bg-stone-900 shrink-0">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black uppercase shrink-0 border"
                    style={{
                      backgroundColor: "rgba(var(--primary-rgb), 0.1)",
                      borderColor: "rgba(var(--primary-rgb), 0.3)",
                      color: "var(--primary)"
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">{t.name}</h4>
                  <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider truncate">
                    {t.role} {t.company ? `· ${t.company}` : ""}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionLayout>
  );
}
