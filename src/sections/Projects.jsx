import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useMemo, useEffect } from "react";
import { projects as defaultProjects } from "../constants";
import SectionLayout from "../layouts/SectionLayout";
import ProjectCard from "../components/Projects/ProjectCard";
import ProjectModal from "../components/Projects/ProjectModal";
import { usePortfolio } from "../context/PortfolioContext";
import { FiGithub, FiExternalLink, FiCode } from "react-icons/fi";

/* ─── Table Row Layout ─── */
const ProjectTableRow = ({ project, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.04, duration: 0.3 }}
    onClick={() => onClick(project)}
    className="group flex items-center gap-4 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 hover:border-primary/40"
    style={{ borderColor: "var(--border-color, rgba(255,255,255,0.06))", background: "var(--card-bg, #121212)" }}
  >
    {/* Index */}
    <span className="text-[10px] font-mono font-bold text-stone-600 w-5 shrink-0">
      {String(index + 1).padStart(2, "0")}
    </span>
    {/* Title */}
    <span className="flex-1 text-sm font-bold text-white group-hover:text-primary transition-colors truncate">
      {project.title}
    </span>
    {/* Category */}
    <span
      className="hidden sm:inline-flex text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0"
      style={{ color: "var(--primary)", borderColor: "rgba(var(--primary-rgb),0.25)", background: "rgba(var(--primary-rgb),0.08)" }}
    >
      {project.category || "Project"}
    </span>
    {/* Tech stack pills */}
    <div className="hidden md:flex items-center gap-1.5 shrink-0">
      {(project.tech || []).slice(0, 3).map((t) => (
        <span key={t} className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">
          {t}
        </span>
      ))}
      {(project.tech || []).length > 3 && (
        <span className="text-[8px] text-stone-600">+{(project.tech || []).length - 3}</span>
      )}
    </div>
    {/* Links */}
    <div className="flex items-center gap-2 shrink-0">
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
          className="text-stone-500 hover:text-white transition-colors p-1">
          <FiGithub className="w-3.5 h-3.5" />
        </a>
      )}
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
          className="text-stone-500 hover:text-primary transition-colors p-1">
          <FiExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  </motion.div>
);

/* ─── Featured Hero Layout ─── */
const ProjectFeatured = ({ projects, onClick }) => {
  const [heroIdx, setHeroIdx] = useState(0);
  const hero = projects[heroIdx];
  return (
    <div className="flex flex-col gap-5">
      {/* Hero card */}
      {hero && (
        <motion.div
          key={heroIdx}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          onClick={() => onClick(hero)}
          className="group relative w-full rounded-2xl overflow-hidden cursor-pointer border hover:border-primary/40 transition-all duration-300"
          style={{ borderColor: "var(--border-color)", minHeight: 260 }}
        >
          {/* Background image */}
          {hero.image && (
            <img src={hero.image} alt={hero.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-45 transition-opacity duration-500" />
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--card-bg,#121212) 30%, transparent 100%)" }} />
          {/* Content */}
          <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end h-full min-h-[260px]">
            <span
              className="inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border mb-3 w-fit"
              style={{ color: "var(--primary)", borderColor: "rgba(var(--primary-rgb),0.3)", background: "rgba(var(--primary-rgb),0.1)" }}
            >
              Featured — {hero.category || "Project"}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-tight">{hero.title}</h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-xl line-clamp-2">{hero.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {(hero.tech || []).slice(0, 5).map(t => (
                <span key={t} className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-stone-900/80 text-stone-300 border border-stone-700">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      {/* Thumbnail strip */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {projects.map((p, i) => (
          <button
            key={p.title}
            onClick={() => setHeroIdx(i)}
            className={`shrink-0 w-28 rounded-xl border overflow-hidden text-left transition-all duration-200 cursor-pointer ${i === heroIdx ? "border-primary shadow-[0_0_12px_rgba(var(--primary-rgb),0.25)]" : "border-stone-800 opacity-60 hover:opacity-100"}`}
          >
            {p.image
              ? <img src={p.image} alt={p.title} className="w-full h-16 object-cover" />
              : <div className="w-full h-16 bg-stone-900 flex items-center justify-center"><FiCode className="text-stone-600" /></div>
            }
            <div className="p-1.5">
              <span className="text-[9px] font-bold text-stone-300 line-clamp-1 block">{p.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─── Design 5: Modern Glass cards list ─── */
const ProjectsDesign5 = ({ projects, onClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
    {projects.map((project, idx) => (
      <motion.div
        key={project.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.05 }}
        onClick={() => onClick(project)}
        className="group p-6 rounded-2xl border border-stone-850 bg-stone-900/20 hover:bg-stone-900/40 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between cursor-pointer"
      >
        <div>
          <div className="flex justify-between items-center mb-3">
            <span
              className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0"
              style={{ color: "var(--primary)", borderColor: "rgba(var(--primary-rgb),0.25)", background: "rgba(var(--primary-rgb),0.08)" }}
            >
              {project.category || "Project"}
            </span>
            <span className="text-[10px] text-stone-500 font-bold">{project.duration}</span>
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-stone-400 text-xs leading-relaxed line-clamp-3 mb-4">
            {project.synopsis || project.description}
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-stone-850/60 pt-3 mt-2">
          <div className="flex gap-1.5 flex-wrap">
            {(project.stacks || []).slice(0, 3).map((t) => (
              <span key={t} className="text-[8px] text-stone-500 font-semibold uppercase tracking-wider">
                #{t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                 className="text-stone-500 hover:text-white transition-colors p-1">
                <FiGithub className="w-3.5 h-3.5" />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                 className="text-stone-500 hover:text-primary transition-colors p-1">
                <FiExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

/* ─── Main Projects Section ─── */
const Projects = ({ projects: propProjects, title, sectionNum, design = "design1" }) => {
  const headerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const { sectionLayouts } = usePortfolio();
  const activeDesign = design || sectionLayouts?.Projects || "design1";
  
  // Map activeDesign to the legacy layouts
  const layout = useMemo(() => {
    if (activeDesign === "design1") return "card-row";
    if (activeDesign === "design2") return "masonry";
    if (activeDesign === "design3") return "table";
    if (activeDesign === "design4") return "featured";
    return "design5";
  }, [activeDesign]);

  const allProjects = propProjects && propProjects.length > 0 ? propProjects : defaultProjects;

  const projectFilters = useMemo(() => {
    const cats = new Set();
    allProjects.forEach((p) => { if (p.category) cats.add(p.category.trim()); });
    return [
      { id: "all", label: "All" },
      ...Array.from(cats).map((c) => ({ id: c.toLowerCase().replace(/\s+/g, ""), label: c, original: c }))
    ];
  }, [allProjects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return allProjects;
    const f = projectFilters.find((x) => x.id === activeFilter);
    if (!f) return allProjects;
    return allProjects.filter((p) => p.category && p.category.trim().toLowerCase() === f.original.toLowerCase());
  }, [activeFilter, allProjects, projectFilters]);

  const resolvedFilteredProjects = useMemo(() => {
    return filteredProjects.map(project => {
      let resolvedImage = project.image;
      if (!resolvedImage || !resolvedImage.startsWith("data:")) {
        const match = defaultProjects.find(p => p.title.toLowerCase() === project.title.toLowerCase());
        if (match) resolvedImage = match.image;
      }
      const stacks = project.stacks || project.tech || [];
      const tech = project.tech || project.stacks || [];
      const synopsis = project.synopsis || project.description || "";
      const description = project.description || project.synopsis || "";
      return { ...project, image: resolvedImage, stacks, tech, synopsis, description };
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

        {/* ── Filters (not shown for featured layout) ── */}
        {layout !== "featured" && (
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
            <span className="text-[10px] font-bold font-mono tracking-widest" style={{ color: "rgba(var(--primary-rgb),0.5)" }}>
              {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}

        {/* ── Layout: Card Row (default) ── */}
        {layout === "card-row" && (
          <motion.div layout className="flex flex-col gap-5">
            <AnimatePresence mode="popLayout">
              {resolvedFilteredProjects.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} onClick={setSelectedProject} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Layout: Masonry Grid ── */}
        {layout === "masonry" && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {resolvedFilteredProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.12)]"
                  style={{ borderColor: "var(--border-color)", background: "var(--card-bg, #121212)" }}
                >
                  {/* Image */}
                  {project.image && (
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                      <img src={project.image} alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--card-bg,#121212) 0%, transparent 60%)" }} />
                    </div>
                  )}
                  {/* Card body */}
                  <div className="p-4">
                    <span
                      className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border inline-block mb-2"
                      style={{ color: "var(--primary)", borderColor: "rgba(var(--primary-rgb),0.25)", background: "rgba(var(--primary-rgb),0.08)" }}
                    >
                      {project.category || "Project"}
                    </span>
                    <h3 className="text-sm font-black text-white mb-1.5 group-hover:text-primary transition-colors leading-tight">{project.title}</h3>
                    <p className="text-stone-500 text-[10px] leading-relaxed line-clamp-2 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {(project.tech || []).slice(0, 4).map(t => (
                        <span key={t} className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Layout: Table List ── */}
        {layout === "table" && (
          <div className="flex flex-col gap-1.5">
            {/* Header */}
            <div className="flex items-center gap-4 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-stone-600 border-b border-stone-800/60 mb-1">
              <span className="w-5 shrink-0">#</span>
              <span className="flex-1">Project</span>
              <span className="hidden sm:block w-20 text-center">Category</span>
              <span className="hidden md:block w-32">Tech Stack</span>
              <span className="w-12 text-center">Links</span>
            </div>
            <AnimatePresence mode="popLayout">
              {resolvedFilteredProjects.map((project, i) => (
                <ProjectTableRow key={project.title} project={project} index={i} onClick={setSelectedProject} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* ── Layout: Featured Hero ── */}
        {layout === "featured" && (
          <ProjectFeatured projects={resolvedFilteredProjects} onClick={setSelectedProject} />
        )}

        {/* ── Layout: Modern Glass Cards Grid (Design 5) ── */}
        {layout === "design5" && (
          <ProjectsDesign5 projects={resolvedFilteredProjects} onClick={setSelectedProject} />
        )}
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </SectionLayout>
  );
};

export default React.memo(Projects);
