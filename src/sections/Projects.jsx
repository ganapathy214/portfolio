//eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState } from "react";

import { projects } from "../const";
import SectionLayout from "../layout/SectionLayout";

const Projects = () => {
  const headerRef = useRef(null);
  const [expandedIdx, setExpandedIdx] = useState(null);

  const toggleProject = (idx) => {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <SectionLayout id="projects" label="What I did ?" headerRef={headerRef}>
      <div className="min-h-[77vh] w-full overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <table className="w-full border-collapse text-left text-sm text-white">
          <thead className="bg-white/10 text-sky-400 uppercase tracking-wider text-xs font-semibold">
            <tr>
              <th scope="col" className="py-4 px-6">Project Name</th>
              <th scope="col" className="py-4 px-6">Role</th>
              <th scope="col" className="py-4 px-6">Client</th>
              <th scope="col" className="py-4 px-6">Duration</th>
              <th scope="col" className="py-4 px-6">Platform</th>
              <th scope="col" className="py-4 px-6">Key Technologies</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {projects.map((project, idx) => {
              const isExpanded = expandedIdx === idx;
              return (
                <React.Fragment key={idx}>
                  <tr
                    onClick={() => toggleProject(idx)}
                    className="hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                  >
                    <td className="py-4 px-6 font-semibold text-sky-300 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="text-[10px] text-sky-400 transition-transform duration-200"
                          style={{
                            display: "inline-block",
                            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                          }}
                        >
                          ▶
                        </span>
                        {project.title}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white/80 whitespace-nowrap">{project.role}</td>
                    <td className="py-4 px-6 text-white/80">{project.client}</td>
                    <td className="py-4 px-6 text-white/60 text-xs whitespace-nowrap">{project.duration}</td>
                    <td className="py-4 px-6 text-white/80 whitespace-nowrap">{project.platform || "N/A"}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1.5 max-w-xs md:max-w-md">
                        {project.stacks.slice(0, 3).map((stack, i) => (
                          <span
                            key={i}
                            className="bg-gray-800/80 text-sky-400 text-[10px] px-2 py-0.5 rounded-full border border-sky-500/30 whitespace-nowrap"
                          >
                            {stack}
                          </span>
                        ))}
                        {project.stacks.length > 3 && (
                          <span className="text-[10px] text-white/50 self-center whitespace-nowrap">
                            +{project.stacks.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <tr className="bg-white/[0.02] border-b border-white/10">
                        <td colSpan={6} className="p-0">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="py-6 px-8 space-y-6 text-sm text-gray-300">
                              <div>
                                <h4 className="text-sky-400 font-semibold mb-2 text-base">Synopsis</h4>
                                <p className="text-white/85 leading-relaxed bg-black/20 p-4 rounded-lg border border-white/5">
                                  {project.synopsis}
                                </p>
                              </div>

                              {project.responsibilities && project.responsibilities.length > 0 && (
                                <div>
                                  <h4 className="text-sky-400 font-semibold mb-2 text-base">Key Responsibilities</h4>
                                  <ul className="list-disc pl-5 space-y-1.5 text-white/85 bg-black/20 p-4 rounded-lg border border-white/5">
                                    {project.responsibilities.map((resp, i) => (
                                      <li key={i}>{resp}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              <div>
                                <h4 className="text-sky-400 font-semibold mb-2 text-base">Full Tech Stack</h4>
                                <div className="flex flex-wrap gap-2 bg-black/20 p-4 rounded-lg border border-white/5">
                                  {project.stacks.map((tech, i) => (
                                    <span
                                      key={i}
                                      className="bg-gray-800/90 text-sky-400 px-2.5 py-1 rounded-full text-xs border border-sky-500/20"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </SectionLayout>
  );
};

export default React.memo(Projects);
