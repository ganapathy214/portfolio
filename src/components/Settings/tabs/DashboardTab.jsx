import React from "react";
import { motion } from "framer-motion";
import {
  FiUser, FiFolder, FiCpu, FiCompass, FiAlertTriangle,
  FiDownload, FiUpload, FiChevronUp, FiChevronDown, FiEye, FiEyeOff,
} from "react-icons/fi";
import { TabCardWrapper } from "../SettingsCommon";

const isProd = !import.meta.env.DEV;

const ALL_SECTIONS = [
  "Home", "About", "Services", "Skills", "Projects",
  "Certification", "Testimonials", "Journey", "Blogs", "Faq", "Contact"
];

export default function DashboardTab({
  localAbout,
  localProjects,
  localCertifications,
  localSkills,
  localTimelineData,
  localSectionVisibility,
  setLocalSectionVisibility,
  localSectionOrder,
  moveSectionInOrder,
  pickedColor,
  localThemeMode,
  setActiveTab,
  selectedTemplate,
  onExportConfig,
  onImportConfig,
}) {
  const noJourneyTemplates = ["template-2", "template-3", "template-5", "template-6"];

  const visibleSectionOrder = (localSectionOrder || ALL_SECTIONS).filter(
    (s) => !(s === "Journey" && noJourneyTemplates.includes(selectedTemplate))
  );

  return (
    <div className="space-y-6 animate-fadeIn text-left">
      {/* Hero welcome card */}
      <div
        className="p-6 rounded-3xl border flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(var(--primary-rgb), 0.12), rgba(0,0,0,0.45))`,
          borderColor: `rgba(var(--primary-rgb), 0.2)`
        }}
      >
        <div className="relative w-20 h-20 border-2 rounded-full overflow-hidden bg-stone-950 shrink-0" style={{ borderColor: pickedColor }}>
          <img
            src={localAbout?.avatarUrl || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='24' height='24' fill='%231c1917'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2378716c' font-size='10'>DEV</text></svg>"}
            alt="Avatar Preview"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-center sm:text-left space-y-1">
          <span className="text-[9px] font-mono font-bold tracking-widest uppercase" style={{ color: pickedColor }}>Active Developer Session</span>
          <h4 className="text-xl sm:text-2xl font-bold text-white">Welcome back, {localAbout?.name || "Developer"}</h4>
          <p className="text-xs text-stone-400 font-medium">{localAbout?.title || "Full Stack Software Engineer"}</p>
        </div>

        {/* Export / Import Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            type="button"
            onClick={onExportConfig}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-800 bg-stone-950/60 text-stone-300 text-[10px] font-bold uppercase tracking-wider hover:bg-stone-900 hover:text-white transition-all cursor-pointer"
          >
            <FiDownload className="text-sm" /> Export Config
          </button>
          <button
            type="button"
            onClick={onImportConfig}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-800 bg-stone-950/60 text-stone-300 text-[10px] font-bold uppercase tracking-wider hover:bg-stone-900 hover:text-white transition-all cursor-pointer"
          >
            <FiUpload className="text-sm" /> Import Config
          </button>
        </div>
      </div>

      {/* Production Deployment Notice */}
      {isProd && (
        <div className="p-4 rounded-2xl border flex items-start gap-3"
          style={{ background: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.25)" }}>
          <FiAlertTriangle className="text-indigo-400 text-lg shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1 text-left">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Production Mode — Permanent Save Workflow</span>
            <span className="text-[10px] text-indigo-200/70 font-medium leading-relaxed">
              You are on the <strong className="text-indigo-200">live deployed site</strong>. Changes update your browser session only. To make changes permanent:
            </span>
            <ol className="text-[10px] text-indigo-200/70 font-medium leading-relaxed list-decimal pl-4 space-y-0.5 mt-1">
              <li>Edit your settings in any tab</li>
              <li>Click <strong className="text-indigo-200">Save Settings</strong> — a <code className="font-mono bg-white/10 px-1 rounded">db.json</code> downloads automatically</li>
              <li>Commit it to your repo as <code className="font-mono bg-white/10 px-1 rounded">public/db.json</code></li>
              <li>Redeploy — all visitors will see your updated portfolio</li>
            </ol>
          </div>
        </div>
      )}

      {/* Portfolio Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Projects", value: localProjects?.length || 0, sub: "Configured works" },
          { label: "Certifications", value: localCertifications?.length || 0, sub: "Verified credentials" },
          { label: "Skills", value: localSkills?.length || 0, sub: "Listed skills" },
          { label: "Experience Items", value: localTimelineData?.length || 0, sub: "Milestones & schools" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="p-4 bg-stone-950 border border-stone-900 rounded-2xl flex flex-col gap-1">
            <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">{label}</span>
            <span className="text-2xl font-bold text-white">{value}</span>
            <span className="text-[9px] text-stone-600 font-semibold">{sub}</span>
          </div>
        ))}
      </div>

      {/* ── Section Order & Visibility ─────────────────────────────── */}
      <TabCardWrapper
        title="Section Order & Visibility"
        subtitle="Drag sections up/down to reorder them in the portfolio. Toggle visibility per section."
      >
        <div className="flex flex-col gap-2">
          {visibleSectionOrder.map((sectionName, idx) => {
            const isVisible = localSectionVisibility?.[sectionName] !== false;
            const isFirst = idx === 0;
            const isLast = idx === visibleSectionOrder.length - 1;
            return (
              <motion.div
                key={sectionName}
                layout
                className="flex items-center gap-3 bg-stone-950/40 border border-stone-900 rounded-2xl px-4 py-3 transition-all"
                style={!isVisible ? { opacity: 0.5 } : {}}
              >
                {/* Drag handle / order number */}
                <span
                  className="text-[9px] font-mono font-extrabold w-6 text-center shrink-0"
                  style={{ color: isVisible ? pickedColor : "#57534e" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Section name */}
                <span className="flex-1 text-xs font-bold text-white">{sectionName}</span>

                {/* Visibility status badge */}
                <span
                  className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg border"
                  style={isVisible
                    ? { color: pickedColor, borderColor: `${pickedColor}30`, backgroundColor: `${pickedColor}10` }
                    : { color: "#f87171", borderColor: "rgba(239,68,68,0.25)", backgroundColor: "rgba(239,68,68,0.08)" }
                  }
                >
                  {isVisible ? "Visible" : "Hidden"}
                </span>

                {/* Visibility Toggle */}
                <button
                  type="button"
                  title={isVisible ? "Hide section" : "Show section"}
                  onClick={() => setLocalSectionVisibility(prev => ({ ...prev, [sectionName]: !isVisible }))}
                  className="p-1.5 rounded-lg border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-800 transition-colors cursor-pointer"
                >
                  {isVisible ? <FiEye className="text-xs" /> : <FiEyeOff className="text-xs" />}
                </button>

                {/* Move Up */}
                <button
                  type="button"
                  disabled={isFirst}
                  onClick={() => moveSectionInOrder(idx, -1)}
                  className="p-1.5 rounded-lg border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-800 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <FiChevronUp className="text-xs" />
                </button>

                {/* Move Down */}
                <button
                  type="button"
                  disabled={isLast}
                  onClick={() => moveSectionInOrder(idx, 1)}
                  className="p-1.5 rounded-lg border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-800 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <FiChevronDown className="text-xs" />
                </button>
              </motion.div>
            );
          })}
        </div>
        <p className="text-[9px] text-stone-600 font-semibold mt-1">
          💡 Changes to section order are applied immediately when you click Save Settings.
        </p>
      </TabCardWrapper>

      {/* Design System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TabCardWrapper title="Design System Stats">
          <div className="flex items-center gap-4 bg-stone-950 border border-stone-900 p-4 rounded-2xl">
            <div className="w-12 h-12 rounded-xl shadow-inner border border-stone-900 shrink-0" style={{ backgroundColor: pickedColor }} />
            <div className="flex-1">
              <div className="text-xs font-mono font-bold text-white uppercase">{pickedColor}</div>
              <div className="text-[9px] text-stone-500 font-semibold mt-1">Active accent theme color</div>
            </div>
            <div
              className="px-3 py-1.5 rounded-xl text-[9px] font-extrabold uppercase font-mono border"
              style={{ borderColor: `${pickedColor}40`, color: pickedColor, backgroundColor: `${pickedColor}10` }}
            >
              {localThemeMode === "light" ? "Light Mode" : "Dark Mode"}
            </div>
          </div>
        </TabCardWrapper>

        <TabCardWrapper title="Server Status">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-stone-950 border border-stone-900 rounded-xl">
              <div className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">Status</div>
              <div className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Operational
              </div>
            </div>
            <div className="p-3 bg-stone-950 border border-stone-900 rounded-xl">
              <div className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">Environment</div>
              <div className="text-xs font-bold text-white mt-1">{import.meta.env.DEV ? "Vite Dev Server" : "Static Build"}</div>
            </div>
          </div>
        </TabCardWrapper>
      </div>

      {/* Shortcuts */}
      <TabCardWrapper title="Quick Configuration Shortcuts">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: FiUser,    label: "Edit Profile",    tab: "about" },
            { icon: FiFolder,  label: "Manage Projects", tab: "projects" },
            { icon: FiCpu,     label: "Manage Skills",   tab: "skills" },
            { icon: FiCompass, label: "SEO Settings",    tab: "seo" },
          ].map(({ icon: Icon, label, tab }) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="p-3 bg-stone-950 border border-stone-900 rounded-2xl hover:border-primary/40 transition-colors text-center cursor-pointer group"
            >
              <Icon className="text-lg mx-auto mb-1 text-stone-400 group-hover:text-white transition-colors" />
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-stone-500 group-hover:text-white transition-colors">{label}</span>
            </button>
          ))}
        </div>
      </TabCardWrapper>
    </div>
  );
}
