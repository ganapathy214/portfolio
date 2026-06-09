//eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useMemo, useEffect } from "react";
import {
  FiCalendar,
  FiGlobe,
  FiUsers,
  FiCpu,
  FiX,
  FiUser,
  FiLayout,
  FiCheck,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

import { projects } from "../const";
import SectionLayout from "../layout/SectionLayout";

const FILTER_CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "fullstack", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
];

const Projects = () => {
  const headerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter projects based on category string
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    if (activeFilter === "fullstack") {
      return projects.filter((p) =>
        p.category.toLowerCase().includes("full stack")
      );
    }
    if (activeFilter === "frontend") {
      return projects.filter((p) =>
        p.category.toLowerCase().includes("frontend")
      );
    }
    return projects;
  }, [activeFilter]);

  // Lock body scroll when modal is open
  useEffect(() => {
    const scrollableMain = document.querySelector("main");
    if (selectedProject) {
      if (scrollableMain) scrollableMain.style.overflowY = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      if (scrollableMain) scrollableMain.style.overflowY = "auto";
      document.body.style.overflow = "";
    }
    return () => {
      if (scrollableMain) scrollableMain.style.overflowY = "auto";
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <SectionLayout id="projects" label="What I did ?" headerRef={headerRef}>
      <div className="w-full space-y-6">
        {/* Category Filters */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-white/10 bg-neutral-900/50 p-1.5 backdrop-blur-sm">
            {FILTER_CATEGORIES.map((category) => {
              const isActive = activeFilter === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`relative rounded-full px-4 sm:px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${isActive ? "text-black" : "text-neutral-400 hover:text-white"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 rounded-full bg-sky-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelectedProject(project)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/8 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-sky-500/40 hover:shadow-lg hover:shadow-sky-500/5 cursor-pointer"
              >
                {/* Top Image Cover */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-sky-500/10 border border-sky-500/30 px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-sky-400 uppercase">
                    {project.platform}
                  </span>
                </div>

                {/* Card Info */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Category & Client */}
                  <div className="flex items-center justify-between text-[10px] font-bold text-sky-400/80 uppercase tracking-wider mb-2">
                    <span>{project.category}</span>
                    <span className="text-white/40 font-medium">{project.client}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1 mb-2">
                    {project.title}
                  </h3>

                  {/* Role */}
                  <p className="text-xs text-white/75 font-medium mb-3 flex items-center gap-1.5">
                    <FiUser className="text-sky-400 shrink-0" /> {project.role}
                  </p>

                  {/* Synopsis snippet */}
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4 flex-1">
                    {project.synopsis}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-white/5 my-3" />

                  {/* Tags & Action */}
                  <div className="flex items-center justify-between mt-auto pt-1">
                    <div className="flex flex-wrap gap-1">
                      {project.stacks.slice(0, 3).map((stack, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-white/5 border border-white/10 text-[9px] text-white/70 px-2 py-0.5"
                        >
                          {stack}
                        </span>
                      ))}
                      {project.stacks.length > 3 && (
                        <span className="text-[9px] text-white/40 self-center pl-1 font-mono">
                          +{project.stacks.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center text-xs font-semibold text-sky-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2">
                      Details <FiArrowRight className="ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-zoom-out"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950 text-white shadow-2xl scrollbar-thin scrollbar-thumb-sky-500/20 scrollbar-track-transparent"
              >
                {/* Hero Header Cover */}
                <div className="relative h-48 sm:h-64 w-full overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

                  {/* Close button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-10 rounded-full border border-white/20 bg-black/50 p-2 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    <FiX className="text-base sm:text-lg" />
                  </button>

                  {/* Hero Text Overlay */}
                  <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-8 sm:right-8">
                    <span className="rounded bg-sky-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-lg sm:text-2xl font-black text-white mt-2 drop-shadow-md">
                      {selectedProject.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-sky-300 drop-shadow-md font-medium mt-0.5">
                      {selectedProject.role}
                    </p>
                  </div>
                </div>

                {/* Modal Info Details */}
                <div className="p-5 sm:p-8 space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider flex items-center gap-1.5">
                        <FiCalendar className="text-sky-400 shrink-0" /> Duration
                      </span>
                      <span className="text-xs text-white/90 mt-1 font-semibold">
                        {selectedProject.duration}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider flex items-center gap-1.5">
                        <FiGlobe className="text-sky-400 shrink-0" /> Client
                      </span>
                      <span className="text-xs text-white/90 mt-1 font-semibold">
                        {selectedProject.client}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider flex items-center gap-1.5">
                        <FiLayout className="text-sky-400 shrink-0" /> Platform
                      </span>
                      <span className="text-xs text-white/90 mt-1 font-semibold">
                        {selectedProject.platform}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider flex items-center gap-1.5">
                        <FiUsers className="text-sky-400 shrink-0" /> Team Size
                      </span>
                      <span className="text-xs text-white/90 mt-1 font-semibold">
                        {selectedProject.teamSize} members
                      </span>
                    </div>
                  </div>

                  {/* Synopsis */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
                      <FiCpu className="text-xs shrink-0" /> Synopsis
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                      {selectedProject.synopsis}
                    </p>
                  </div>

                  {/* Key Responsibilities */}
                  {selectedProject.responsibilities &&
                    selectedProject.responsibilities.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
                          <FiCheck className="text-xs shrink-0" /> Key Responsibilities
                        </h3>
                        <ul className="grid grid-cols-1 gap-2.5">
                          {selectedProject.responsibilities.map((resp, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 leading-relaxed bg-white/[0.01] border border-white/5 p-3 rounded-lg hover:border-sky-500/20 transition-colors duration-200"
                            >
                              <FiCheckCircle className="text-sky-400 shrink-0 mt-0.5 text-sm sm:text-base" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* Full Tech Stack */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
                      <FiLayout className="text-xs shrink-0" /> Full Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-1.5 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                      {selectedProject.stacks.map((tech, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-sky-500/5 border border-sky-500/20 text-sky-300 hover:border-sky-500/50 hover:bg-sky-500/10 transition-colors duration-200 px-2.5 py-1 text-[11px] font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </SectionLayout>
  );
};

export default React.memo(Projects);
