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
  FiArrowUpRight,
  FiCheckCircle,
  FiCode,
  FiLayers,
} from "react-icons/fi";

import { projects } from "../const";
import SectionLayout from "../layout/SectionLayout";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
];

const MODAL_TABS = ["Overview", "Tech Stack", "Responsibilities"];

/* ─── Project Card — Horizontal split (same for all) ─── */
const ProjectCard = ({ project, index, onClick }) => (
  <motion.div
    layout
    key={project.title}
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 14 }}
    transition={{ duration: 0.4, delay: index * 0.06 }}
    whileHover={{ y: -6 }}
    onClick={() => onClick(project)}
    className="group relative flex flex-col lg:flex-row overflow-hidden cursor-pointer corner-card"
    style={{ borderRadius: "16px" }}
  >
    {/* Index badge */}
    <span
      className="absolute top-4 left-4 z-20 font-mono font-black text-[10px] px-2 py-0.5 rounded"
      style={{
        background: "rgba(0,0,0,0.75)",
        border: "1px solid rgba(0,213,213,0.35)",
        color: "#00D5D5",
      }}
    >
      {String(index + 1).padStart(2, "0")}
    </span>

    {/* Platform badge */}
    <div className="absolute top-4 right-4 z-20 tag-outline text-[9px]">
      {project.platform}
    </div>

    {/* Image — left half */}
    <div className="relative w-full lg:w-[42%] aspect-video lg:aspect-auto overflow-hidden shrink-0">
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
        loading="lazy"
      />
      {/* Gradient fade right into content area */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, transparent 55%, #121212 100%), linear-gradient(to top, rgba(0,0,0,0.55), transparent 60%)",
        }}
      />
      {/* Neon left-edge glow on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: "#00D5D5", boxShadow: "0 0 12px rgba(0,213,213,0.8)" }}
      />
      {/* Neon top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: "linear-gradient(to right, #00D5D5, transparent 60%)" }}
      />
    </div>

    {/* Content — right half */}
    <div
      className="flex flex-col justify-center p-6 sm:p-8 text-left flex-1"
      style={{ background: "#121212" }}
    >
      <span className="section-number mb-3">
        {String(index + 1).padStart(2, "0")} — {project.category}
      </span>

      <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-primary transition-colors duration-300 mb-2 leading-tight">
        {project.title}
      </h3>

      <p className="text-[11px] text-stone-500 flex items-center gap-2 mb-4 select-none font-semibold uppercase tracking-wider">
        <FiUser className="shrink-0" style={{ color: "#00D5D5" }} />
        {project.role} · {project.client}
      </p>

      <p className="text-sm text-stone-400 leading-relaxed line-clamp-3 mb-5">
        {project.synopsis}
      </p>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-2 mb-5 select-none">
        {[
          { icon: FiCalendar, label: "Duration", value: project.duration },
          { icon: FiUsers, label: "Team", value: `${project.teamSize} devs` },
          { icon: FiLayers, label: "Stacks", value: `${project.stacks.length}+ techs` },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex flex-col p-2.5 rounded-lg"
            style={{
              background: "rgba(0,213,213,0.04)",
              border: "1px solid rgba(0,213,213,0.1)",
            }}
          >
            <Icon className="mb-1 text-xs" style={{ color: "#00D5D5" }} />
            <span
              className="text-[8px] uppercase tracking-widest font-bold"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {label}
            </span>
            <span className="text-[11px] text-white font-bold mt-0.5">{value}</span>
          </div>
        ))}
      </div>

      {/* Stack pills */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.stacks.slice(0, 6).map((s, i) => (
          <span
            key={i}
            className="text-[9px] font-semibold px-2 py-0.5 rounded"
            style={{
              background: "rgba(0,213,213,0.06)",
              border: "1px solid rgba(0,213,213,0.15)",
              color: "rgba(0,213,213,0.85)",
            }}
          >
            {s}
          </span>
        ))}
        {project.stacks.length > 6 && (
          <span className="text-[9px] text-stone-600 font-mono self-center">
            +{project.stacks.length - 6}
          </span>
        )}
      </div>

      {/* CTA */}
      <div
        className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 group-hover:gap-3 self-start"
        style={{ color: "#00D5D5" }}
      >
        View Full Details <FiArrowUpRight className="text-sm" />
      </div>
    </div>
  </motion.div>
);

/* ─── Detail Modal ─── */
const ProjectModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 cursor-zoom-out"
        style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)" }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 30 }}
        transition={{ type: "spring", duration: 0.45, bounce: 0.1 }}
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden corner-card"
        style={{ borderRadius: "20px" }}
      >
        {/* Hero image */}
        <div className="relative h-44 sm:h-56 w-full overflow-hidden shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #121212 0%, rgba(18,18,18,0.6) 40%, transparent 100%)",
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
            style={{
              background: "rgba(0,0,0,0.75)",
              border: "1px solid rgba(0,213,213,0.3)",
            }}
          >
            <FiX className="text-white text-base" />
          </button>
          <div className="absolute bottom-4 left-5 right-16 text-left">
            <span className="tag-primary text-[9px] mb-2 inline-flex">{project.category}</span>
            <h2 className="text-lg sm:text-2xl font-black text-white leading-tight mt-1.5">
              {project.title}
            </h2>
            <p className="text-xs font-semibold mt-0.5" style={{ color: "#00D5D5" }}>
              {project.role}
            </p>
          </div>
        </div>

        {/* Tab nav */}
        <div
          className="flex shrink-0 border-b"
          style={{ background: "#121212", borderColor: "rgba(255,255,255,0.06)" }}
        >
          {MODAL_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer relative"
              style={{
                color: activeTab === tab ? "#00D5D5" : "rgba(255,255,255,0.3)",
                background: "transparent",
              }}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="modal-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: "#00D5D5" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div
          className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 text-left"
          style={{ background: "#0d0d0d" }}
        >
          <AnimatePresence mode="wait">
            {activeTab === "Overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="space-y-5"
              >
                <div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl"
                  style={{
                    background: "rgba(0,213,213,0.03)",
                    border: "1px solid rgba(0,213,213,0.1)",
                  }}
                >
                  {[
                    { icon: FiCalendar, label: "Duration", value: project.duration },
                    { icon: FiGlobe, label: "Client", value: project.client },
                    { icon: FiLayout, label: "Platform", value: project.platform },
                    { icon: FiUsers, label: "Team Size", value: `${project.teamSize} members` },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex flex-col gap-1">
                      <span
                        className="text-[9px] uppercase tracking-widest font-bold flex items-center gap-1.5"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        <Icon style={{ color: "#00D5D5" }} /> {label}
                      </span>
                      <span className="text-xs text-white font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FiCpu className="text-xs" style={{ color: "#00D5D5" }} />
                    <span className="section-number">Project Synopsis</span>
                  </div>
                  <p
                    className="text-sm text-stone-300 leading-loose p-4 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    {project.synopsis}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "Tech Stack" && (
              <motion.div
                key="techstack"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <FiCode className="text-xs" style={{ color: "#00D5D5" }} />
                  <span className="section-number">Full Technology Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stacks.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03, duration: 0.2 }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-default transition-all duration-200 hover:scale-105"
                      style={{
                        background: "rgba(0,213,213,0.07)",
                        border: "1px solid rgba(0,213,213,0.2)",
                        color: "#00D5D5",
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <p className="text-[11px] text-stone-600 font-semibold">
                  {project.stacks.length} technologies used across this project
                </p>
              </motion.div>
            )}

            {activeTab === "Responsibilities" && (
              <motion.div
                key="responsibilities"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <FiCheck className="text-xs" style={{ color: "#00D5D5" }} />
                  <span className="section-number">Key Responsibilities</span>
                </div>
                {project.responsibilities && project.responsibilities.length > 0 ? (
                  <ul className="space-y-3">
                    {project.responsibilities.map((resp, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.3 }}
                        className="flex items-start gap-3 text-sm text-stone-300 leading-relaxed p-4 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <FiCheckCircle className="shrink-0 mt-0.5" style={{ color: "#00D5D5" }} />
                        <span>{resp}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-stone-500 text-sm italic">No responsibilities listed.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Main Projects Section ─── */
const Projects = () => {
  const headerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    if (activeFilter === "fullstack")
      return projects.filter((p) => p.category.toLowerCase().includes("full stack"));
    if (activeFilter === "frontend")
      return projects.filter((p) => p.category.toLowerCase().includes("frontend"));
    return projects;
  }, [activeFilter]);

  useEffect(() => {
    const main = document.querySelector("main");
    if (selectedProject) {
      if (main) main.style.overflowY = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      if (main) main.style.overflowY = "auto";
      document.body.style.overflow = "";
    }
    return () => {
      if (main) main.style.overflowY = "auto";
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <SectionLayout
      id="projects"
      label="What I did ?"
      headerRef={headerRef}
      spotlightColor="rgba(0, 213, 213, 0.06)"
      textColorClass="text-[#00D5D5]"
    >
      <div className="w-full space-y-6 py-2">

        {/* ── Filters ── */}
        <div className="flex items-center justify-between flex-wrap gap-3 select-none">
          <div className="flex gap-1">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className="relative px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-250 cursor-pointer"
                  style={{
                    background: isActive ? "#00D5D5" : "transparent",
                    color: isActive ? "#000" : "rgba(255,255,255,0.4)",
                    border: "1px solid",
                    borderColor: isActive ? "#00D5D5" : "rgba(255,255,255,0.1)",
                    boxShadow: isActive ? "0 0 14px rgba(0,213,213,0.35)" : "none",
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <span
            className="text-[10px] font-bold font-mono tracking-widest"
            style={{ color: "rgba(0,213,213,0.5)" }}
          >
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── All cards — same horizontal layout ── */}
        <motion.div layout className="flex flex-col gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                onClick={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </SectionLayout>
  );
};

export default React.memo(Projects);
