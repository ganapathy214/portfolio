import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SectionLayout from "../layouts/SectionLayout";
import { usePortfolio } from "../context/PortfolioContext";

/* ─── Design 2: Carousel ─── */
const TestimonialsCarousel = ({ testimonials }) => {
  const [index, setIndex] = useState(0);
  if (!testimonials || testimonials.length === 0) return null;
  const current = testimonials[index];

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-10 rounded-[2rem] border border-stone-850 bg-stone-950/40 relative flex flex-col justify-between text-center min-h-[260px] select-none" style={{ backdropFilter: "blur(12px)" }}>
      <div className="absolute top-4 left-6 text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider">
        Testimonial {index + 1} of {testimonials.length}
      </div>
      <div className="absolute top-4 right-6 text-primary/10 text-5xl font-serif pointer-events-none">“</div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="my-6 space-y-4"
        >
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed italic font-medium">
            "{current.text}"
          </p>
          <div className="flex flex-col items-center gap-3">
            {current.avatar ? (
              <img src={current.avatar} alt={current.name} className="w-11 h-11 rounded-full object-cover border border-stone-800" />
            ) : (
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-black bg-primary/10 border border-primary/20 text-primary">
                {current.name.charAt(0)}
              </div>
            )}
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">{current.name}</h4>
              <p className="text-[10px] text-stone-500 uppercase tracking-wider font-bold">
                {current.role} {current.company ? `· ${current.company}` : ""}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-2 mt-2">
        <button
          onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
          className="p-2 rounded-xl border border-stone-800 hover:border-primary/40 text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <FiChevronLeft className="text-lg" />
        </button>
        <button
          onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
          className="p-2 rounded-xl border border-stone-800 hover:border-primary/40 text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <FiChevronRight className="text-lg" />
        </button>
      </div>
    </div>
  );
};

/* ─── Design 3: Masonry Columns (3 Columns) ─── */
const TestimonialsMasonry = ({ testimonials }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
    {testimonials.map((t, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.05 }}
        className="p-5 rounded-2xl border border-stone-850 bg-stone-900/10 flex flex-col justify-between gap-4"
      >
        <p className="text-xs text-stone-400 leading-relaxed italic">"{t.text}"</p>
        <div className="flex items-center gap-3 pt-3 border-t border-stone-900">
          {t.avatar ? (
            <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover border border-stone-800" />
          ) : (
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black bg-primary/10 border border-primary/20 text-primary">
              {t.name.charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            <h4 className="text-[11px] font-bold text-white truncate">{t.name}</h4>
            <p className="text-[9px] text-stone-500 uppercase tracking-wider font-bold truncate">{t.role}</p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

/* ─── Design 4: Minimal Quote List ─── */
const TestimonialsMinimalList = ({ testimonials }) => (
  <div className="flex flex-col divide-y divide-stone-850 text-left">
    {testimonials.map((t, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-6 flex flex-col md:flex-row gap-4 items-start md:items-center"
      >
        <div className="flex items-center gap-3 shrink-0 w-60">
          {t.avatar ? (
            <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
          ) : (
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black bg-primary/5 border border-primary/20 text-primary">
              {t.name.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="text-xs font-bold text-white">{t.name}</h4>
            <p className="text-[9px] text-stone-500 uppercase font-black tracking-widest">{t.role}</p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-stone-300 italic flex-1 leading-relaxed">
          "{t.text}"
        </p>
      </motion.div>
    ))}
  </div>
);

/* ─── Design 5: Impact Cards Layout ─── */
const TestimonialsImpactCards = ({ testimonials }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
    {testimonials.map((t, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
        className="p-8 rounded-[2rem] border border-stone-850 bg-stone-900/30 relative flex flex-col justify-between overflow-hidden group transition-all duration-300"
      >
        <div className="absolute top-4 right-6 text-primary opacity-20 text-7xl font-serif select-none pointer-events-none group-hover:opacity-40 transition-opacity">“</div>
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-white leading-relaxed font-semibold italic relative z-10">
            "{t.text}"
          </p>
          <div className="flex items-center gap-3 pt-4 border-t border-stone-850/60">
            {t.avatar ? (
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-stone-800" />
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black bg-primary/10 border border-primary/20 text-primary">
                {t.name.charAt(0)}
              </div>
            )}
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">{t.name}</h4>
              <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">
                {t.role} {t.company ? `· ${t.company}` : ""}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default function Testimonials({ testimonials = [], title, sectionNum, design = "design1" }) {
  const headerRef = useRef(null);
  
  const { sectionLayouts } = usePortfolio();
  const activeDesign = design || sectionLayouts?.Testimonials || "design1";

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
      <div className="w-full py-4">
        {activeDesign === "design1" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
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
                <div className="absolute -inset-px bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                <div className="absolute top-4 right-4 text-stone-900 group-hover:text-primary/10 transition-colors duration-300 pointer-events-none">
                  <FiMessageSquare className="text-5xl" />
                </div>
                <div className="space-y-4 z-10">
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
        )}

        {activeDesign === "design2" && (
          <TestimonialsCarousel testimonials={testimonials} />
        )}

        {activeDesign === "design3" && (
          <TestimonialsMasonry testimonials={testimonials} />
        )}

        {activeDesign === "design4" && (
          <TestimonialsMinimalList testimonials={testimonials} />
        )}

        {activeDesign === "design5" && (
          <TestimonialsImpactCards testimonials={testimonials} />
        )}
      </div>
    </SectionLayout>
  );
}
