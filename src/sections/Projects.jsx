import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useMemo, useEffect } from "react";
import { projects as defaultProjects } from "../constants";
import SectionLayout from "../layouts/SectionLayout";
import ProjectCard from "../components/Projects/ProjectCard";
import ProjectModal from "../components/Projects/ProjectModal";

/* ─── Main Projects Section ─── */
const Projects = ({ projects: propProjects, title, sectionNum }) => {
  const headerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const allProjects = propProjects && propProjects.length > 0 ? propProjects : defaultProjects;

  // Dynamically compute the categories list from the active projects list
  const projectFilters = useMemo(() => {
    const cats = new Set();
    allProjects.forEach((p) => {
      if (p.category) {
        cats.add(p.category.trim());
      }
    });
    return [
      { id: "all", label: "All" },
      ...Array.from(cats).map((c) => ({
        id: c.toLowerCase().replace(/\s+/g, ""),
        label: c,
        original: c
      }))
    ];
  }, [allProjects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return allProjects;
    const activeFilterObj = projectFilters.find((f) => f.id === activeFilter);
    if (!activeFilterObj) return allProjects;
    return allProjects.filter(
      (p) => p.category && p.category.trim().toLowerCase() === activeFilterObj.original.toLowerCase()
    );
  }, [activeFilter, allProjects, projectFilters]);

  const resolvedFilteredProjects = useMemo(() => {
    return filteredProjects.map(project => {
      let resolvedImage = project.image;
      if (!resolvedImage || !resolvedImage.startsWith("data:")) {
        const match = defaultProjects.find(p => p.title.toLowerCase() === project.title.toLowerCase());
        if (match) resolvedImage = match.image;
      }
      return { ...project, image: resolvedImage };
    });
  }, [filteredProjects]);

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
      label={title || "What I did ?"}
      headerRef={headerRef}
      spotlightColor="rgba(var(--primary-rgb), 0.06)"
      textColorClass="text-primary"
      sectionNum={sectionNum}
    >
      <div className="w-full space-y-6 py-2">

        {/* ── Filters ── */}
        <div className="flex items-center justify-between flex-wrap gap-3 select-none">
          <div className="flex flex-wrap gap-1.5">
            {projectFilters.map((f) => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className="relative px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-250 cursor-pointer"
                  style={{
                    background: isActive ? "var(--primary)" : "transparent",
                    color: isActive ? "var(--primary-contrast, #000)" : "var(--text-muted, rgba(255,255,255,0.4))",
                    border: "1px solid",
                    borderColor: isActive ? "var(--primary)" : "var(--border-color, rgba(255,255,255,0.1))",
                    boxShadow: isActive ? "0 0 14px rgba(var(--primary-rgb),0.35)" : "none",
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <span
            className="text-[10px] font-bold font-mono tracking-widest"
            style={{ color: "rgba(var(--primary-rgb),0.5)" }}
          >
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── All cards — same horizontal layout ── */}
        <motion.div layout className="flex flex-col gap-5">
          <AnimatePresence mode="popLayout">
            {resolvedFilteredProjects.map((project, i) => (
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
