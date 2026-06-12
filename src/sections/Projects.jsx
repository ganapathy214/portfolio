import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useMemo, useEffect } from "react";
import { projects, PROJECT_FILTERS } from "../constants";
import SectionLayout from "../layout/SectionLayout";
import ProjectCard from "../components/Projects/ProjectCard";
import ProjectModal from "../components/Projects/ProjectModal";

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
            {PROJECT_FILTERS.map((f) => {
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
