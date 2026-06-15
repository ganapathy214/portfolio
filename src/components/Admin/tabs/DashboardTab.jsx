import React from "react";
import { motion } from "framer-motion";
import { FiUser, FiFolder, FiCpu, FiCompass, FiInfo, FiDownload, FiAlertTriangle } from "react-icons/fi";
import { TabCardWrapper } from "../AdminCommon";

const isProd = !import.meta.env.DEV;

export default function DashboardTab({
  localAbout,
  localProjects,
  localCertifications,
  localSkills,
  localTimelineData,
  localSectionVisibility,
  setLocalSectionVisibility,
  pickedColor,
  localThemeMode,
  setActiveTab,
}) {
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
        <div
          className="relative w-20 h-20 border-2 rounded-full overflow-hidden bg-stone-900 shrink-0"
          style={{ borderColor: pickedColor }}
        >
          <img
            src={localAbout?.avatarUrl || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='24' height='24' fill='%231c1917'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2378716c' font-size='10'>DEV</text></svg>"}
            alt="Avatar Preview"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-center sm:text-left space-y-1">
          <span
            className="text-[9px] font-mono font-bold tracking-widest uppercase"
            style={{ color: pickedColor }}
          >
            Active Developer Session
          </span>
          <h4 className="text-xl sm:text-2xl font-black text-white">
            Welcome back, {localAbout?.name || "Developer"}
          </h4>
          <p className="text-xs text-stone-400 font-medium">
            {localAbout?.title || "Full Stack Software Engineer"}
          </p>
        </div>
      </div>

      {/* Production Deployment Notice */}
      {isProd && (
        <div
          className="p-4 rounded-2xl border flex items-start gap-3"
          style={{
            background: "rgba(99,102,241,0.08)",
            borderColor: "rgba(99,102,241,0.25)",
          }}
        >
          <FiAlertTriangle className="text-indigo-400 text-lg shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1 text-left">
            <span className="text-xs font-black text-indigo-300 uppercase tracking-wider">
              Production Mode — Permanent Save Workflow
            </span>
            <span className="text-[10px] text-indigo-200/70 font-medium leading-relaxed">
              You are on the <strong className="text-indigo-200">live deployed site</strong>. Changes made here update
              your browser session only (via localStorage). To make changes permanent for <strong className="text-indigo-200">all visitors</strong>:
            </span>
            <ol className="text-[10px] text-indigo-200/70 font-medium leading-relaxed list-decimal pl-4 space-y-0.5 mt-1">
              <li>Edit your settings in any tab</li>
              <li>Click <strong className="text-indigo-200">Save Settings</strong> — a <code className="font-mono bg-white/10 px-1 rounded">db.json</code> file will download automatically</li>
              <li>Commit it to your repo as <code className="font-mono bg-white/10 px-1 rounded">public/db.json</code></li>
              <li>Redeploy — all visitors will see your updated portfolio</li>
            </ol>
          </div>
        </div>
      )}

      {/* Portfolio Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-stone-950 border border-stone-900 rounded-2xl flex flex-col gap-1">
          <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Projects</span>
          <span className="text-2xl font-black text-white">{localProjects?.length || 0}</span>
          <span className="text-[9px] text-stone-600 font-semibold">Configured works</span>
        </div>
        <div className="p-4 bg-stone-950 border border-stone-900 rounded-2xl flex flex-col gap-1">
          <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Certifications</span>
          <span className="text-2xl font-black text-white">{localCertifications?.length || 0}</span>
          <span className="text-[9px] text-stone-600 font-semibold">Verified credentials</span>
        </div>
        <div className="p-4 bg-stone-950 border border-stone-900 rounded-2xl flex flex-col gap-1">
          <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Skills</span>
          <span className="text-2xl font-black text-white">{localSkills?.length || 0}</span>
          <span className="text-[9px] text-stone-600 font-semibold">Listed skills</span>
        </div>
        <div className="p-4 bg-stone-950 border border-stone-900 rounded-2xl flex flex-col gap-1">
          <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Experience Items</span>
          <span className="text-2xl font-black text-white">{localTimelineData?.length || 0}</span>
          <span className="text-[9px] text-stone-600 font-semibold">Milestones & schools</span>
        </div>
      </div>

      {/* Section Visibility Controls (SaaS Feature) */}
      <TabCardWrapper title="Portfolio Section Visibility (SaaS Section Toggles)">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {["Home", "About", "Services", "Skills", "Projects", "Certification", "Journey", "Contact"].map((sectionName) => {
            const isVisible = localSectionVisibility?.[sectionName] !== false;
            return (
              <div
                key={sectionName}
                className="p-4 bg-stone-950/40 border border-stone-900 rounded-2xl flex items-center justify-between transition-all"
                style={!isVisible ? { opacity: 0.6 } : {}}
              >
                <div className="text-left">
                  <span className="text-xs font-black text-white block">
                    {sectionName}
                  </span>
                  <span className="text-[9px] text-stone-500 font-semibold uppercase">
                    {isVisible ? "Visible in Sidebar" : "Hidden in Sidebar"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setLocalSectionVisibility((prev) => ({
                      ...prev,
                      [sectionName]: !isVisible
                    }));
                  }}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer outline-none relative flex items-center ${
                    isVisible ? "bg-primary" : "bg-stone-850"
                  }`}
                  style={isVisible ? { backgroundColor: pickedColor } : {}}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                      isVisible ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </TabCardWrapper>

      {/* Settings status & system details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Accent Color & Theme status */}
        <TabCardWrapper title="Design System Stats">
          <div className="flex items-center gap-4 bg-stone-900/35 border border-stone-900/60 p-4 rounded-2xl">
            <div
              className="w-12 h-12 rounded-xl shadow-inner border border-white/10 shrink-0"
              style={{ backgroundColor: pickedColor }}
            />
            <div className="flex-1">
              <div className="text-xs font-mono font-bold text-white uppercase">{pickedColor}</div>
              <div className="text-[9px] text-stone-500 font-semibold mt-1">Accent theme color</div>
            </div>
            <div
              className="px-3 py-1.5 rounded-xl text-[9px] font-extrabold uppercase font-mono border"
              style={{
                borderColor: `${pickedColor}40`,
                color: pickedColor,
                backgroundColor: `${pickedColor}10`
              }}
            >
              {localThemeMode === "light" ? "Light Mode" : "Dark Mode"}
            </div>
          </div>
        </TabCardWrapper>

        {/* Environment status */}
        <TabCardWrapper title="Server Status">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-stone-900/30 border border-stone-900/60 rounded-xl">
              <div className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">Status</div>
              <div className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Operational
              </div>
            </div>
            <div className="p-3 bg-stone-900/30 border border-stone-900/60 rounded-xl">
              <div className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">Environment</div>
              <div className="text-xs font-bold text-white mt-1">
                {import.meta.env.DEV ? "Vite Dev Server" : "Static Build"}
              </div>
            </div>
          </div>
        </TabCardWrapper>
      </div>

      {/* Shortcuts quick links */}
      <TabCardWrapper title="Quick Configurations Shortcuts">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("about")}
            className="p-3 bg-stone-900/30 border border-stone-900/60 rounded-2xl hover:border-primary/40 transition-colors text-center cursor-pointer group"
          >
            <FiUser className="text-lg mx-auto mb-1 text-stone-400 group-hover:text-white transition-colors" />
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-stone-500 group-hover:text-white transition-colors">
              Edit Profile
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("projects")}
            className="p-3 bg-stone-900/30 border border-stone-900/60 rounded-2xl hover:border-primary/40 transition-colors text-center cursor-pointer group"
          >
            <FiFolder className="text-lg mx-auto mb-1 text-stone-400 group-hover:text-white transition-colors" />
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-stone-500 group-hover:text-white transition-colors">
              Manage Projects
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("skills")}
            className="p-3 bg-stone-900/30 border border-stone-900/60 rounded-2xl hover:border-primary/40 transition-colors text-center cursor-pointer group"
          >
            <FiCpu className="text-lg mx-auto mb-1 text-stone-400 group-hover:text-white transition-colors" />
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-stone-500 group-hover:text-white transition-colors">
              Manage Skills
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("seo")}
            className="p-3 bg-stone-900/30 border border-stone-900/60 rounded-2xl hover:border-primary/40 transition-colors text-center cursor-pointer group"
          >
            <FiCompass className="text-lg mx-auto mb-1 text-stone-400 group-hover:text-white transition-colors" />
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-stone-500 group-hover:text-white transition-colors">
              SEO Settings
            </span>
          </button>
        </div>
      </TabCardWrapper>
    </div>
  );
}
