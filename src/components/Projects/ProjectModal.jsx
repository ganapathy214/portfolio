import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
  FiCalendar,
  FiGlobe,
  FiUsers,
  FiCpu,
  FiX,
  FiLayout,
  FiCheck,
  FiCheckCircle,
  FiCode,
} from "react-icons/fi";
import { PROJECT_MODAL_TABS } from "../../constants";

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
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--card-bg, #121212) 0%, rgba(var(--card-bg-rgb, 18,18,18),0.6) 40%, transparent 100%)",
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
            style={{
              background: "rgba(0,0,0,0.75)",
              border: "1px solid rgba(var(--primary-rgb),0.3)",
            }}
          >
            <FiX className="text-[#ffffff] text-base" />
          </button>
          <div className="absolute bottom-4 left-5 right-16 text-left">
            <span className="tag-primary text-[9px] mb-2 inline-flex">{project.category}</span>
            <h2 className="text-lg sm:text-2xl font-black text-white leading-tight mt-1.5">
              {project.title}
            </h2>
            <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--primary)" }}>
              {project.role}
            </p>
          </div>
        </div>

        {/* Tab nav */}
        <div
          className="flex shrink-0 border-b"
          style={{ background: "var(--card-bg, #121212)", borderColor: "var(--border-color, rgba(255,255,255,0.06))" }}
        >
          {PROJECT_MODAL_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer relative"
              style={{
                color: activeTab === tab ? "var(--primary)" : "var(--text-muted, rgba(255,255,255,0.3))",
                background: "transparent",
              }}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="modal-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: "var(--primary)" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div
          className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 text-left"
          style={{ background: "var(--card-bg-darker, #0d0d0d)" }}
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
                    background: "rgba(var(--primary-rgb),0.03)",
                    border: "1px solid rgba(var(--primary-rgb),0.1)",
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
                        style={{ color: "var(--text-muted, rgba(255,255,255,0.3))" }}
                      >
                        <Icon style={{ color: "var(--primary)" }} /> {label}
                      </span>
                      <span className="text-xs text-white font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FiCpu className="text-xs" style={{ color: "var(--primary)" }} />
                    <span className="section-number">Project Synopsis</span>
                  </div>
                  <p
                    className="text-sm text-stone-300 leading-loose p-4 rounded-xl"
                    style={{
                      background: "rgba(var(--text-muted-rgb, 255,255,255), 0.02)",
                      border: "1px solid rgba(var(--text-muted-rgb, 255,255,255), 0.05)",
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
                  <FiCode className="text-xs" style={{ color: "var(--primary)" }} />
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
                        background: "rgba(var(--primary-rgb),0.07)",
                        border: "1px solid rgba(var(--primary-rgb),0.2)",
                        color: "var(--primary)",
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
                  <FiCheck className="text-xs" style={{ color: "var(--primary)" }} />
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
                          background: "rgba(var(--text-muted-rgb, 255,255,255), 0.02)",
                          border: "1px solid rgba(var(--text-muted-rgb, 255,255,255), 0.05)",
                        }}
                      >
                        <FiCheckCircle className="shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
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

export default React.memo(ProjectModal);
