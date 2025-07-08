//eslint-disable-next-line
import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

import { projects } from "../const";
import SectionLayout from "../layout/SectionLayout";
import { FiExternalLink } from "react-icons/fi";

export default function Projects() {
  const headerRef = useRef(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const selected = selectedIdx !== null ? projects[selectedIdx] : null;

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selected]);

  return (
    <SectionLayout id="projects" label="What I did ?" headerRef={headerRef}>
      <div className="min-h-[77vh] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            layout
            onClick={() => setSelectedIdx(idx)}
            whileHover={{ scale: 1.03 }}
            className="bg-white/10 p-6 rounded-xl cursor-pointer transition-all border border-white/10 hover:border-sky-500 hover:shadow-xl backdrop-blur"
          >
            <h3 className="text-lg font-semibold text-sky-400 mb-2">
              {project.title}
            </h3>
            <p className="text-xs text-white/70 mb-1">
              <strong className="text-white">Duration:</strong>{" "}
              {project.duration}
            </p>
            <p className="text-xs text-white/70">
              <strong className="text-white">Platform:</strong>{" "}
              {project.platform || "N/A"}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stacks.slice(0, 3).map((stack, i) => (
                <span
                  key={i}
                  className="bg-gray-800 text-sky-400 text-xs px-2 py-1 rounded-full border border-sky-500"
                >
                  {stack}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Drawer Detail View */}
      {selected && (
        <motion.div
          key={selectedIdx}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="fixed top-0 right-0 h-full w-full md:w-[450px] z-50 bg-black/90 text-white shadow-xl p-6 overflow-hidden backdrop-blur-lg border-l border-sky-500"
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-sky-400">{selected.title}</h2>
            <button
              className="text-white hover:text-sky-400 transition"
              onClick={() => setSelectedIdx(null)}
            >
              ✕
            </button>
          </div>
          <div className="mb-3">
            <strong className="text-sky-400">Role:</strong> {selected.role}
          </div>
          <div className="mb-3">
            <strong className="text-sky-400">Duration:</strong>{" "}
            {selected.duration}
          </div>
          <div className="mb-3">
            <strong className="text-sky-400">Responsibilities:</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              {selected.responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mb-3">
            <strong className="text-sky-400">Tech Stack:</strong>
            <div className="flex flex-wrap gap-2 mt-1">
              {selected.stacks.map((tech, i) => (
                <span
                  key={i}
                  className="bg-gray-800 text-sky-400 px-2 py-1 rounded-full text-xs border border-sky-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-y-auto max-h-[320px] pr-1">
            <strong className="text-sky-400">Synopsis:</strong>
            <p className="mt-1 text-white/80 leading-relaxed">
              {selected.synopsis}
            </p>
          </div>
        </motion.div>
      )}
    </SectionLayout>
  );
}
