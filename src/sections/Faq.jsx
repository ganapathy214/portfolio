import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
import SectionLayout from "../layouts/SectionLayout";

export default function Faq({ faqs = [], title, sectionNum }) {
  const headerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(null);

  const toggleAccordion = (idx) => {
    setActiveIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <SectionLayout
      id="faq"
      label={title || "Frequently Asked Questions"}
      headerRef={headerRef}
      spotlightColor="rgba(var(--primary-rgb), 0.05)"
      textColorClass="text-primary"
      sectionNum={sectionNum}
    >
      <div className="max-w-3xl mx-auto py-4 space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = activeIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border transition-all duration-300 overflow-hidden bg-stone-950/20"
              style={{
                borderColor: isOpen ? "rgba(var(--primary-rgb), 0.25)" : "var(--border-color)",
                boxShadow: isOpen ? "0 4px 20px rgba(var(--primary-rgb), 0.04)" : "none"
              }}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer select-none"
              >
                <div className="flex items-center gap-3 pr-4">
                  <FiHelpCircle 
                    className="text-base shrink-0 transition-colors duration-300"
                    style={{ color: isOpen ? "var(--primary)" : "var(--text-muted, rgba(255,255,255,0.4))" }}
                  />
                  <span className="text-xs sm:text-sm font-bold text-white leading-normal">
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-stone-550 shrink-0"
                  style={{ color: isOpen ? "var(--primary)" : "" }}
                >
                  <FiChevronDown className="text-base" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 border-t border-[var(--border-color)] pt-3 text-left">
                      <p className="text-xs text-stone-400 leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </SectionLayout>
  );
}
