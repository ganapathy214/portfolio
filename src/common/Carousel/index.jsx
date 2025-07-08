import React, { useEffect, useRef, useState } from "react";
//eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";

export default function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef();

  // Calculate the number of pages (each page shows 1 slide)
  const pageCount = slides.length;

  // Auto-advance slides every 10s, but only if not hovered
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % pageCount);
      }, 10000);
    }
    return () => clearTimeout(timerRef.current);
  }, [current, pageCount, isHovered]);

  const goTo = (idx) => setCurrent(idx);

  // Get the slide for the current page
  const currentSlides = slides.slice(current, current + 1);

  // Animation variants for slide transitions
  const variants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div
      className="relative w-full max-w-full h-100 sm:h-80 md:h-96 flex flex-col items-center justify-center rounded-2xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-full flex items-center justify-center transition-all duration-700 gap-4 px-2 sm:px-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="flex w-full h-full gap-4"
            style={{ minHeight: 0, minWidth: 0 }}
          >
            {currentSlides.map((slide, idx) =>
              typeof slide === "function" ? (
                <React.Fragment key={current + idx}>{slide()}</React.Fragment>
              ) : (
                <React.Fragment key={current + idx}>{slide}</React.Fragment>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Slide Indicators */}
      <div className="flex gap-2 mt-2">
        {Array.from({ length: pageCount }).map((_, idx) => (
          <span
            key={idx}
            className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full ${
              current === idx ? "bg-sky-400" : "bg-gray-400"
            } transition inline-block`}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide page ${idx + 1}`}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
    </div>
  );
}
