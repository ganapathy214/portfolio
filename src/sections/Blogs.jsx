import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiBookOpen } from "react-icons/fi";
import SectionLayout from "../layouts/SectionLayout";

export default function Blogs({ blogs = [], title, sectionNum }) {
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
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 16 }
    }
  };

  return (
    <SectionLayout
      id="blogs"
      label={title || "My Publications & Blogs"}
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
        {blogs.map((blog, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="p-6 rounded-3xl border border-[var(--border-color)] bg-stone-950/40 relative flex flex-col justify-between overflow-hidden group hover:border-[rgba(var(--primary-rgb),0.3)] transition-all duration-300 min-h-[180px]"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {/* Ambient hover glow */}
            <div className="absolute -inset-px bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
            
            <div className="space-y-3 z-10 text-left">
              {/* Badge info row */}
              <div className="flex items-center justify-between">
                <span 
                  className="px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider rounded border"
                  style={{
                    backgroundColor: "rgba(var(--primary-rgb), 0.1)",
                    borderColor: "rgba(var(--primary-rgb), 0.25)",
                    color: "var(--primary)"
                  }}
                >
                  {blog.platform || "Publication"}
                </span>
                <span className="text-[9px] text-stone-500 font-mono font-bold uppercase tracking-wider">
                  {blog.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-black text-white leading-snug group-hover:text-primary transition-colors duration-250 line-clamp-2">
                {blog.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-stone-400 leading-relaxed font-medium line-clamp-3">
                {blog.description}
              </p>
            </div>

            {/* Bottom action Link */}
            {blog.link && (
              <a
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-stone-400 group-hover:text-primary transition-all duration-200 w-fit cursor-pointer z-10 self-start"
              >
                Read Article <FiExternalLink className="text-xs transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </a>
            )}
          </motion.div>
        ))}
      </motion.div>
    </SectionLayout>
  );
}
