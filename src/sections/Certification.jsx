//eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FiExternalLink, FiX } from "react-icons/fi";
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

const Certification = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [activeCert, setActiveCert] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsInView(true),
      { threshold: 0.3 }
    );
    const section = sectionRef.current;
    if (section) observer.observe(section);
    return () => section && observer.unobserve(section);
  }, []);

  useEffect(() => {
    if (activeCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeCert]);

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
              onClick={() => setActiveCert(cert)}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="relative">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="object-cover w-full h-48 sm:h-56 md:h-64 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-sky-500 hover:bg-sky-400 text-white font-medium text-sm px-4 py-2 rounded-full transition shadow-md flex items-center gap-1.5">
                    View Certificate
                    <FiExternalLink className="text-sm" />
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="text-base font-semibold text-sky-400 group-hover:text-sky-300 transition-colors">
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

      {/* Certificate Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-7xl bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-sky-400 hover:scale-110 transition p-2 bg-white/5 rounded-full z-10"
                aria-label="Close modal"
              >
                <FiX className="text-xl sm:text-2xl" />
              </button>

              {/* Certificate Image View */}
              <div className="w-full md:w-2/3 flex items-center justify-center rounded-lg overflow-hidden border border-white/5 bg-black/40">
                <img
                  src={activeCert.image}
                  alt={activeCert.title}
                  className="w-full h-auto object-contain max-h-[70vh]"
                />
              </div>

              {/* Certificate Details */}
              <div className="w-full md:w-1/3 flex flex-col justify-between py-2">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                      Certification
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">
                      {activeCert.title}
                    </h2>
                  </div>

                  <div className="space-y-2 text-sm text-gray-300">
                    <p>
                      <strong className="text-sky-400">Issuer:</strong>{" "}
                      {activeCert.issuer}
                    </p>
                    <p>
                      <strong className="text-sky-400">Offered By:</strong>{" "}
                      {activeCert.offeredBy}
                    </p>
                    {activeCert.lastUpdated && (
                      <p>
                        <strong className="text-sky-400">Date:</strong>{" "}
                        {activeCert.lastUpdated}
                      </p>
                    )}
                    {activeCert.description && (
                      <div className="pt-2">
                        <strong className="text-sky-400 block mb-1">
                          Description:
                        </strong>
                        <p className="text-white/80 leading-relaxed">
                          {activeCert.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* {activeCert.pdfFile && (
                  <div className="pt-6 md:pt-0">
                    <button
                      onClick={() =>
                        window.open(
                          `${import.meta.env.BASE_URL}files/certification/${activeCert.pdfFile}`,
                          "_blank"
                        )
                      }
                      className="w-full inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-sky-500/20"
                    >
                      <FiExternalLink className="text-lg" />
                      View Official PDF
                    </button>
                  </div>
                )} */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionLayout>
  );
};

export default React.memo(Certification);
