import { motion } from "framer-motion";
import React from "react";
import {
  FiCalendar,
  FiUsers,
  FiUser,
  FiArrowUpRight,
  FiLayers,
} from "react-icons/fi";

const ProjectCard = ({ project, index, onClick }) => (
  <motion.div
    layout
    key={project.title}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
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
        border: "1px solid rgba(var(--primary-rgb),0.35)",
        color: "var(--primary)",
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
        decoding="async"
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
        style={{ background: "var(--primary)", boxShadow: "0 0 12px rgba(var(--primary-rgb),0.8)" }}
      />
      {/* Neon top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--primary), transparent 60%)" }}
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
        <FiUser className="shrink-0" style={{ color: "var(--primary)" }} />
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
              background: "rgba(var(--primary-rgb),0.04)",
              border: "1px solid rgba(var(--primary-rgb),0.1)",
            }}
          >
            <Icon className="mb-1 text-xs" style={{ color: "var(--primary)" }} />
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
              background: "rgba(var(--primary-rgb),0.06)",
              border: "1px solid rgba(var(--primary-rgb),0.15)",
              color: "rgba(var(--primary-rgb),0.85)",
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
        style={{ color: "var(--primary)" }}
      >
        View Full Details <FiArrowUpRight className="text-sm" />
      </div>
    </div>
  </motion.div>
);

export default React.memo(ProjectCard);
