import React from "react";
import { FiPlusCircle, FiChevronUp, FiChevronDown, FiTrash2 } from "react-icons/fi";
import { FormField, FileUpload, TabCardWrapper } from "../SettingsCommon";

export default function ProjectsTab({
  localProjects,
  activeProjectIdx,
  setActiveProjectIdx,
  newProjectStack,
  setNewProjectStack,
  newProjectResponsibility,
  setNewProjectResponsibility,
  addProject,
  deleteProject,
  moveProject,
  updateActiveProjectField,
  addStackToActiveProject,
  deleteStackFromActiveProject,
  addResponsibilityToActiveProject,
  updateResponsibilityInActiveProject,
  deleteResponsibilityFromActiveProject,
  moveResponsibilityInActiveProject,
  pickedColor,
  renderSectionVisibilityBanner,
  localSectionTitles,
  setLocalSectionTitles
}) {
  const p = localProjects[activeProjectIdx];

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {renderSectionVisibilityBanner("Projects")}

      {/* Section Title */}
      <FormField
        label="Section Display Title Heading"
        value={localSectionTitles.Projects}
        onChange={(val) => setLocalSectionTitles(prev => ({ ...prev, Projects: val }))}
        placeholder="e.g. What I did ?"
      />

      {/* Projects Manager Container */}
      <TabCardWrapper>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">
            Projects Registry List
          </span>
          <button
            type="button"
            onClick={addProject}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all cursor-pointer"
            style={{ color: pickedColor, backgroundColor: `${pickedColor}15` }}
          >
            <FiPlusCircle className="text-xs" /> Add Project
          </button>
        </div>

        {localProjects.length === 0 ? (
          <div className="p-8 text-center bg-stone-950 border border-stone-900 rounded-3xl select-none">
            <span className="text-stone-500 text-xs font-bold uppercase tracking-wider">
              No projects registered. Click "Add Project" to begin.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left sidebar: Projects selector list */}
            <div className="lg:col-span-4 flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1.5 scrollbar-thin select-none">
              {localProjects.map((project, idx) => {
                const isActive = activeProjectIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-primary/10 border-primary text-white"
                        : "bg-stone-950 border-stone-900 text-stone-400 hover:bg-stone-900 hover:text-white"
                    }`}
                    style={isActive ? { borderColor: pickedColor, backgroundColor: `${pickedColor}15` } : {}}
                    onClick={() => setActiveProjectIdx(idx)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{project.title || "Untitled Project"}</div>
                      <div className="text-[9px] text-stone-500 font-bold uppercase tracking-wider mt-0.5 truncate">
                        {project.category}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveProject(idx, -1);
                        }}
                        disabled={idx === 0}
                        className="p-1 rounded-lg border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-850 transition-colors disabled:opacity-35 cursor-pointer"
                      >
                        <FiChevronUp className="text-[10px]" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveProject(idx, 1);
                        }}
                        disabled={idx === localProjects.length - 1}
                        className="p-1 rounded-lg border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-850 transition-colors disabled:opacity-35 cursor-pointer"
                      >
                        <FiChevronDown className="text-[10px]" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(idx);
                        }}
                        className="p-1 rounded-lg border border-red-500/10 bg-stone-950 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all cursor-pointer"
                      >
                        <FiTrash2 className="text-[10px]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Selected Project Form Fields */}
            {p && (
              <div className="lg:col-span-8 bg-stone-950 border border-stone-900 p-5 rounded-3xl space-y-6">
                <div className="space-y-6 animate-fadeIn">
                  {/* Row 1: Title & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      label="Project Title"
                      value={p.title}
                      onChange={(val) => updateActiveProjectField("title", val)}
                      placeholder="e.g. Learning Management System"
                    />
                    <FormField
                      label="Category Tag (e.g. Full Stack / Frontend)"
                      value={p.category}
                      onChange={(val) => updateActiveProjectField("category", val)}
                      placeholder="e.g. Full Stack (Web + Mobile)"
                    />
                  </div>

                  {/* Row 2: Client, Platform, Duration, Role, Team Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField
                      label="Platform"
                      value={p.platform}
                      onChange={(val) => updateActiveProjectField("platform", val)}
                      placeholder="e.g. Web & Mobile"
                    />
                    <FormField
                      label="Duration"
                      value={p.duration}
                      onChange={(val) => updateActiveProjectField("duration", val)}
                      placeholder="e.g. Jan 2026 - Present"
                    />
                    <FormField
                      label="Role"
                      value={p.role}
                      onChange={(val) => updateActiveProjectField("role", val)}
                      placeholder="e.g. Lead Full Stack Developer"
                    />
                    <FormField
                      label="Client / Target"
                      value={p.client}
                      onChange={(val) => updateActiveProjectField("client", val)}
                      placeholder="e.g. UK / US / India"
                    />
                    <FormField
                      label="Team Size"
                      type="number"
                      value={p.teamSize}
                      onChange={(val) => updateActiveProjectField("teamSize", parseInt(val) || 0)}
                      placeholder="e.g. 5"
                    />
                  </div>

                  {/* Textarea: Synopsis */}
                  <FormField
                    label="Project Synopsis / Description"
                    type="textarea"
                    value={p.synopsis}
                    onChange={(val) => updateActiveProjectField("synopsis", val)}
                    placeholder="Enter a brief high-level overview of the project."
                    rows={3}
                  />

                  {/* Image Uploader block */}
                  <FileUpload
                    accept="image/*"
                    onUpload={(result) => {
                      updateActiveProjectField("image", result);
                    }}
                    fileName={p.image ? "Cover image loaded" : ""}
                    buttonText="Project Cover Image"
                  />

                  {p.image && (
                    <div className="flex items-center gap-3 bg-stone-950 p-3 rounded-xl border border-stone-900">
                      <div className="relative w-16 h-10 border border-stone-800 rounded-lg overflow-hidden bg-stone-900 shrink-0">
                        <img
                          src={p.image.startsWith("data:") || p.image.startsWith("/") || p.image.startsWith("http") ? p.image : `/src/assets/project/${p.image}`}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => updateActiveProjectField("image", "")}
                        className="text-[9px] font-bold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                      >
                        Reset to Default
                      </button>
                    </div>
                  )}

                  {/* Tech Stacks Tag Editor */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-stone-900/50 pb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-white">Tech Stacks Tags</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto pr-1 select-none">
                      {(p.stacks || []).map((stackName) => (
                        <span
                          key={stackName}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[9px] font-bold uppercase tracking-wider border transition-all duration-200"
                          style={{
                            borderColor: `${pickedColor}25`,
                            backgroundColor: `${pickedColor}05`,
                            color: pickedColor
                          }}
                        >
                          {stackName}
                          <button
                            type="button"
                            onClick={() => deleteStackFromActiveProject(stackName)}
                            className="text-stone-550 hover:text-white cursor-pointer font-bold text-[10px] leading-none"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 max-w-sm">
                      <input
                        type="text"
                        value={newProjectStack}
                        onChange={(e) => setNewProjectStack(e.target.value)}
                        placeholder="Add tag (e.g. Docker)..."
                        className="flex-1 bg-stone-950 border border-stone-900 focus:border-primary outline-none text-xs rounded-xl px-4 py-2.5 text-white font-semibold transition-all focus:ring-1 focus:ring-primary/20"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addStackToActiveProject();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={addStackToActiveProject}
                        className="py-2.5 px-4 rounded-xl text-black text-[10px] font-bold uppercase tracking-wider cursor-pointer font-sans transition-transform active:scale-95"
                        style={{ backgroundColor: pickedColor }}
                      >
                        Add Tag
                      </button>
                    </div>
                  </div>

                  {/* Responsibilities Bullet List Editor */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-stone-900/50 pb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-white">
                        Responsibilities & Achievements Bullets
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
                      {(p.responsibilities || []).map((bullet, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-stone-950 border border-stone-900 rounded-xl px-3 py-2">
                          <span className="font-mono text-[8px] font-extrabold text-stone-600 shrink-0">#{idx + 1}</span>
                          <input
                            type="text"
                            value={bullet}
                            onChange={(e) => updateResponsibilityInActiveProject(idx, e.target.value)}
                            placeholder="Enter responsibility details..."
                            className="flex-1 bg-transparent border-0 outline-none text-xs text-stone-300 font-medium"
                          />
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => moveResponsibilityInActiveProject(idx, -1)}
                              disabled={idx === 0}
                              className="p-1 rounded-lg border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-850 transition-colors disabled:opacity-30 cursor-pointer"
                            >
                              <FiChevronUp className="text-[10px]" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveResponsibilityInActiveProject(idx, 1)}
                              disabled={idx === (p.responsibilities || []).length - 1}
                              className="p-1 rounded-lg border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-850 transition-colors disabled:opacity-30 cursor-pointer"
                            >
                              <FiChevronDown className="text-[10px]" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteResponsibilityFromActiveProject(idx)}
                              className="p-1 rounded-lg border border-red-500/10 bg-stone-950 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all cursor-pointer ml-0.5"
                            >
                              <FiTrash2 className="text-[10px]" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newProjectResponsibility}
                        onChange={(e) => setNewProjectResponsibility(e.target.value)}
                        placeholder="Add responsibility bullet..."
                        className="flex-1 bg-stone-950 border border-stone-900 focus:border-primary outline-none text-xs rounded-xl px-4 py-2.5 text-white font-semibold transition-all focus:ring-1 focus:ring-primary/20"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addResponsibilityToActiveProject();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={addResponsibilityToActiveProject}
                        className="py-2.5 px-4 rounded-xl text-black text-[10px] font-bold uppercase tracking-wider cursor-pointer font-sans shrink-0 active:scale-95 transition-transform"
                        style={{ backgroundColor: pickedColor }}
                      >
                        Add Bullet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </TabCardWrapper>
    </div>
  );
}
