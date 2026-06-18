import React from "react";
import { TabCardWrapper } from "../SetitingsCommon";

const COLOR_SWATCHES = [
  { name: "Cyan Spark", value: "#00D5D5" },
  { name: "Purple Neon", value: "#a855f7" },
  { name: "Rose Glow", value: "#f43f5e" },
  { name: "Emerald Cyber", value: "#10b981" },
  { name: "Amber Fusion", value: "#f59e0b" },
];

export default function ThemeTab({
  pickedColor,
  handleColorChange,
  localThemeMode,
  handleThemeModeChange,
  localAbout,
  localSelectedTemplate,
  setLocalSelectedTemplate,
  onSelectDesign
}) {
  return (
    <div className="space-y-6 animate-fadeIn text-left">
      {/* Preset swatches row */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Preset Design Accents
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {COLOR_SWATCHES.map((swatch) => {
            const isSelected = pickedColor.toLowerCase() === swatch.value.toLowerCase();
            return (
              <button
                key={swatch.name}
                type="button"
                onClick={() => handleColorChange(swatch.value)}
                className="p-3 rounded-2xl bg-stone-950 border transition-all duration-300 flex flex-col items-center justify-center gap-2 text-center cursor-pointer group"
                style={{
                  borderColor: isSelected ? swatch.value : "rgba(255,255,255,0.05)",
                  boxShadow: isSelected ? `0 4px 16px ${swatch.value}30` : "none",
                }}
              >
                <span
                  className="w-5 h-5 rounded-full shadow-inner border border-white/10"
                  style={{ backgroundColor: swatch.value }}
                />
                <span className="text-[9px] font-extrabold tracking-wider uppercase text-stone-400 group-hover:text-white transition-colors">
                  {swatch.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Manual custom picker */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Custom Accent Hex
        </label>
        <div className="flex items-center gap-4 bg-stone-950 border border-stone-900 rounded-2xl p-4">
          <input
            type="color"
            value={pickedColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-14 h-14 rounded-xl border-0 cursor-pointer outline-none bg-transparent"
          />
          <div className="flex-1">
            <input
              type="text"
              value={pickedColor}
              onChange={(e) => handleColorChange(e.target.value)}
              placeholder="#00D5D5"
              maxLength={7}
              className="w-full bg-transparent border-b border-stone-850 focus:border-primary outline-none text-base font-mono tracking-wider py-1 uppercase text-white font-bold transition-colors"
              style={{ borderBottomColor: pickedColor }}
            />
            <span className="text-[9px] text-stone-500 font-semibold block mt-1.5 leading-normal">
              Choose any hex accent. Colors, halos, and animations will render unified in your portfolio.
            </span>
          </div>
        </div>
      </div>

      {/* Base Theme Mode Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Base Theme Mode
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleThemeModeChange("dark")}
            className={`flex items-center justify-center gap-3 p-4 rounded-2xl bg-stone-950 border transition-all duration-300 cursor-pointer group ${
              localThemeMode === "dark"
                ? "border-primary"
                : "border-stone-900 hover:border-stone-800"
            }`}
            style={localThemeMode === "dark" ? { borderColor: pickedColor, boxShadow: `0 4px 16px ${pickedColor}15` } : {}}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                localThemeMode === "dark" ? "bg-white border-white scale-110" : "bg-transparent border-stone-600 group-hover:border-stone-400"
              }`}
              style={localThemeMode === "dark" ? { backgroundColor: "#FFFFFF", borderColor: "#FFFFFF", boxShadow: `0 0 8px #FFFFFF` } : {}}
            />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 group-hover:text-white transition-colors">
              Dark Theme
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleThemeModeChange("light")}
            className={`flex items-center justify-center gap-3 p-4 rounded-2xl bg-stone-950 border transition-all duration-300 cursor-pointer group ${
              localThemeMode === "light"
                ? "border-primary"
                : "border-stone-900 hover:border-stone-800"
            }`}
            style={localThemeMode === "light" ? { borderColor: pickedColor, boxShadow: `0 4px 16px ${pickedColor}15` } : {}}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                localThemeMode === "light" ? "bg-white border-white scale-110" : "bg-transparent border-stone-600 group-hover:border-stone-400"
              }`}
              style={localThemeMode === "light" ? { backgroundColor: pickedColor, borderColor: pickedColor, boxShadow: `0 0 8px ${pickedColor}` } : {}}
            />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 group-hover:text-white transition-colors">
              Light Theme
            </span>
          </button>
        </div>
      </div>

      {/* Portfolio Layout Template Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Portfolio Layout Template
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Template 1 Card */}
          <button
            type="button"
            onClick={() => {
              setLocalSelectedTemplate("template-1");
              if (onSelectDesign) onSelectDesign();
            }}
            className={`relative flex flex-col p-5 rounded-2xl bg-stone-950 border text-left transition-all duration-300 cursor-pointer group ${
              localSelectedTemplate === "template-1"
                ? "border-primary"
                : "border-stone-900 hover:border-stone-800"
            }`}
            style={localSelectedTemplate === "template-1" ? { borderColor: pickedColor, boxShadow: `0 4px 16px ${pickedColor}15` } : {}}
          >
            {localSelectedTemplate === "template-1" && (
              <span 
                className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse"
                style={{ backgroundColor: `${pickedColor}20`, color: pickedColor }}
              >
                Active
              </span>
            )}
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-900/50 border border-stone-800 transition-colors"
                style={localSelectedTemplate === "template-1" ? { color: pickedColor, borderColor: `${pickedColor}35` } : {}}
              >
                {/* SVG representing Left Sidebar Layout */}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-300 group-hover:text-white transition-colors">
                  Template 1: Modern Sidebar
                </span>
                <span className="text-[9px] text-stone-500 font-semibold block mt-0.5 leading-normal">
                  Left-docked animated navigation bar
                </span>
              </div>
            </div>
            {/* Visual Mini Mockup of Sidebar Layout */}
            <div className="w-full h-20 rounded-xl bg-stone-900/40 border border-stone-850 p-2 flex gap-1.5 overflow-hidden">
              {/* Sidebar strip */}
              <div className="w-3 h-full rounded bg-stone-800/60 flex flex-col gap-1 p-0.5 items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-stone-700 transition-colors" style={localSelectedTemplate === "template-1" ? { backgroundColor: pickedColor } : {}} />
                <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />
                <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />
              </div>
              {/* Main area */}
              <div className="flex-1 flex flex-col gap-1.5 justify-center">
                <div className="w-3/4 h-2 rounded bg-stone-800" />
                <div className="w-full h-1.5 rounded bg-stone-800/40" />
                <div className="w-5/6 h-1.5 rounded bg-stone-800/40" />
              </div>
              {/* Right beam line */}
              <div className="w-0.5 h-full rounded bg-stone-800/20 relative shrink-0">
                <div className="absolute top-1/4 left-0 w-full h-1/2 rounded transition-colors" style={localSelectedTemplate === "template-1" ? { backgroundColor: pickedColor } : {}} />
              </div>
            </div>
          </button>

          {/* Template 2 Card */}
          <button
            type="button"
            onClick={() => {
              setLocalSelectedTemplate("template-2");
              if (onSelectDesign) onSelectDesign();
            }}
            className={`relative flex flex-col p-5 rounded-2xl bg-stone-950 border text-left transition-all duration-300 cursor-pointer group ${
              localSelectedTemplate === "template-2"
                ? "border-primary"
                : "border-stone-900 hover:border-stone-800"
            }`}
            style={localSelectedTemplate === "template-2" ? { borderColor: pickedColor, boxShadow: `0 4px 16px ${pickedColor}15` } : {}}
          >
            {localSelectedTemplate === "template-2" && (
              <span 
                className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse"
                style={{ backgroundColor: `${pickedColor}20`, color: pickedColor }}
              >
                Active
              </span>
            )}
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-900/50 border border-stone-800 transition-colors"
                style={localSelectedTemplate === "template-2" ? { color: pickedColor, borderColor: `${pickedColor}35` } : {}}
              >
                {/* SVG representing Left Sidebar Layout with details */}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-300 group-hover:text-white transition-colors">
                  Template 2: Classic Sidebar
                </span>
                <span className="text-[9px] text-stone-500 font-semibold block mt-0.5 leading-normal">
                  Elegant sidebar with avatar & detailed profile
                </span>
              </div>
            </div>
            {/* Visual Mini Mockup of Sidebar Layout with profile layout */}
            <div className="w-full h-20 rounded-xl bg-stone-900/40 border border-stone-850 p-2 flex gap-1.5 overflow-hidden">
              {/* Sidebar strip with avatar placeholder */}
              <div className="w-5 h-full rounded bg-stone-800/60 flex flex-col gap-1 p-0.5 items-center shrink-0">
                <div className="w-3.5 h-3.5 rounded-full bg-stone-700 transition-colors" style={localSelectedTemplate === "template-2" ? { backgroundColor: pickedColor } : {}} />
                <div className="w-3.5 h-1 rounded bg-stone-700" />
                <div className="w-3.5 h-1.5 rounded bg-stone-700/40" style={{ marginTop: "2px" }} />
                <div className="w-3.5 h-1.5 rounded bg-stone-700/40" />
              </div>
              {/* Main area */}
              <div className="flex-1 flex flex-col gap-1.5 justify-center">
                <div className="w-3/4 h-2 rounded bg-stone-800" />
                <div className="w-full h-1.5 rounded bg-stone-800/40" />
                <div className="w-5/6 h-1.5 rounded bg-stone-800/40" />
              </div>
            </div>
          </button>

          {/* Template 3 Card */}
          <button
            type="button"
            onClick={() => {
              setLocalSelectedTemplate("template-3");
              if (onSelectDesign) onSelectDesign();
            }}
            className={`relative flex flex-col p-5 rounded-2xl bg-stone-950 border text-left transition-all duration-300 cursor-pointer group ${
              localSelectedTemplate === "template-3"
                ? "border-primary"
                : "border-stone-900 hover:border-stone-800"
            }`}
            style={localSelectedTemplate === "template-3" ? { borderColor: pickedColor, boxShadow: `0 4px 16px ${pickedColor}15` } : {}}
          >
            {localSelectedTemplate === "template-3" && (
              <span 
                className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse"
                style={{ backgroundColor: `${pickedColor}20`, color: pickedColor }}
              >
                Active
              </span>
            )}
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-900/50 border border-stone-800 transition-colors"
                style={localSelectedTemplate === "template-3" ? { color: pickedColor, borderColor: `${pickedColor}35` } : {}}
              >
                {/* SVG representing top nav menu */}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-300 group-hover:text-white transition-colors">
                  Template 3: Modern Topnav
                </span>
                <span className="text-[9px] text-stone-500 font-semibold block mt-0.5 leading-normal">
                  Clean top navbar with multi-column card layouts
                </span>
              </div>
            </div>
            {/* Visual Mini Mockup of Top Navbar layout */}
            <div className="w-full h-20 rounded-xl bg-stone-900/40 border border-stone-850 p-2 flex flex-col gap-1.5 overflow-hidden">
              {/* Navbar strip */}
              <div className="w-full h-3 rounded bg-stone-800/60 flex items-center justify-between px-1.5 shrink-0">
                <div className="w-4 h-1 rounded bg-stone-700" style={localSelectedTemplate === "template-3" ? { backgroundColor: pickedColor } : {}} />
                <div className="flex gap-1">
                  <div className="w-2.5 h-1 rounded bg-stone-700" />
                  <div className="w-2.5 h-1 rounded bg-stone-700" />
                </div>
              </div>
              {/* Main content grid */}
              <div className="flex-1 flex flex-col gap-1 justify-center">
                <div className="w-1/2 h-2 rounded bg-stone-800 mx-auto" />
                <div className="grid grid-cols-3 gap-1 mt-1">
                  <div className="h-4 rounded bg-stone-800/40 border border-stone-800/20" />
                  <div className="h-4 rounded bg-stone-800/40 border border-stone-800/20" />
                  <div className="h-4 rounded bg-stone-800/40 border border-stone-800/20" />
                </div>
              </div>
            </div>
          </button>

          {/* Template 4 Card */}
          <button
            type="button"
            onClick={() => {
              setLocalSelectedTemplate("template-4");
              if (onSelectDesign) onSelectDesign();
            }}
            className={`relative flex flex-col p-5 rounded-2xl bg-stone-950 border text-left transition-all duration-300 cursor-pointer group ${
              localSelectedTemplate === "template-4"
                ? "border-primary"
                : "border-stone-900 hover:border-stone-800"
            }`}
            style={localSelectedTemplate === "template-4" ? { borderColor: pickedColor, boxShadow: `0 4px 16px ${pickedColor}15` } : {}}
          >
            {localSelectedTemplate === "template-4" && (
              <span 
                className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse"
                style={{ backgroundColor: `${pickedColor}20`, color: pickedColor }}
              >
                Active
              </span>
            )}
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-900/50 border border-stone-800 transition-colors"
                style={localSelectedTemplate === "template-4" ? { color: pickedColor, borderColor: `${pickedColor}35` } : {}}
              >
                {/* SVG representing Monospace key blocks */}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1v2.5M4 7l2-1-2-1v2.5M10 17l-2 1-2-1v2.5M20 17l-2 1-2-1v2.5" />
                </svg>
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-300 group-hover:text-white transition-colors">
                  Template 4: Dev Marquee
                </span>
                <span className="text-[9px] text-stone-500 font-semibold block mt-0.5 leading-normal">
                  Neon borders, code symbol, and marquee details
                </span>
              </div>
            </div>
            {/* Visual Mini Mockup of Marquee Layout */}
            <div className="w-full h-20 rounded-xl bg-stone-900/40 border border-stone-850 p-2 flex flex-col gap-1.5 overflow-hidden">
              <div className="flex-1 flex gap-2 items-center">
                {/* Left code square */}
                <div className="w-7 h-7 rounded border border-stone-800 flex items-center justify-center font-mono text-[7px]" style={localSelectedTemplate === "template-4" ? { color: pickedColor, borderColor: `${pickedColor}35` } : {}}>
                  &lt;&gt;
                </div>
                {/* Right text */}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="w-3/4 h-1.5 rounded bg-stone-800" />
                  <div className="w-1/2 h-1 rounded bg-stone-800/40" />
                </div>
              </div>
              {/* Marquee band */}
              <div className="w-full h-2.5 rounded bg-stone-950 flex items-center justify-center shrink-0 border border-stone-900">
                <div className="w-full h-0.5 rounded bg-stone-800/80 transition-colors" style={localSelectedTemplate === "template-4" ? { backgroundColor: pickedColor } : {}} />
              </div>
            </div>
          </button>

          {/* Template 5 Card */}
          <button
            type="button"
            onClick={() => {
              setLocalSelectedTemplate("template-5");
              if (onSelectDesign) onSelectDesign();
            }}
            className={`relative flex flex-col p-5 rounded-2xl bg-stone-950 border text-left transition-all duration-300 cursor-pointer group ${
              localSelectedTemplate === "template-5"
                ? "border-primary"
                : "border-stone-900 hover:border-stone-800"
            }`}
            style={localSelectedTemplate === "template-5" ? { borderColor: pickedColor, boxShadow: `0 4px 16px ${pickedColor}15` } : {}}
          >
            {localSelectedTemplate === "template-5" && (
              <span 
                className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse"
                style={{ backgroundColor: `${pickedColor}20`, color: pickedColor }}
              >
                Active
              </span>
            )}
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-900/50 border border-stone-800 transition-colors"
                style={localSelectedTemplate === "template-5" ? { color: pickedColor, borderColor: `${pickedColor}35` } : {}}
              >
                {/* SVG representing avatar profile */}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-300 group-hover:text-white transition-colors">
                  Template 5: John Doe
                </span>
                <span className="text-[9px] text-stone-500 font-semibold block mt-0.5 leading-normal">
                  Overlay metrics badges and circular accent portrait
                </span>
              </div>
            </div>
            {/* Visual Mini Mockup of Template 5 */}
            <div className="w-full h-20 rounded-xl bg-stone-900/40 border border-stone-850 p-2 flex gap-1.5 overflow-hidden justify-between items-center">
              {/* Left text */}
              <div className="flex-1 flex flex-col gap-1 justify-center">
                <div className="w-4/5 h-2 rounded bg-stone-800" />
                <div className="w-3/5 h-1.5 rounded bg-stone-800/40" />
              </div>
              {/* Right overlay profile circle */}
              <div className="w-12 h-12 rounded-full relative flex items-center justify-center shrink-0 border border-stone-800 bg-stone-950" style={localSelectedTemplate === "template-5" ? { borderColor: `${pickedColor}40` } : {}}>
                <div className="w-8 h-8 rounded-full bg-stone-800/80" />
                {/* Stats badge overlay */}
                <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded bg-stone-700/90 border border-stone-850 flex items-center justify-center" style={localSelectedTemplate === "template-5" ? { backgroundColor: pickedColor } : {}}>
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>
            </div>
          </button>

          {/* Template 6 Card */}
          <button
            type="button"
            onClick={() => {
              setLocalSelectedTemplate("template-6");
              if (onSelectDesign) onSelectDesign();
            }}
            className={`relative flex flex-col p-5 rounded-2xl bg-stone-950 border text-left transition-all duration-300 cursor-pointer group ${
              localSelectedTemplate === "template-6"
                ? "border-primary"
                : "border-stone-900 hover:border-stone-800"
            }`}
            style={localSelectedTemplate === "template-6" ? { borderColor: pickedColor, boxShadow: `0 4px 16px ${pickedColor}15` } : {}}
          >
            {localSelectedTemplate === "template-6" && (
              <span 
                className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse"
                style={{ backgroundColor: `${pickedColor}20`, color: pickedColor }}
              >
                Active
              </span>
            )}
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-stone-900/50 border border-stone-800 transition-colors"
                style={localSelectedTemplate === "template-6" ? { color: pickedColor, borderColor: `${pickedColor}35` } : {}}
              >
                {/* SVG representing active nodes connection */}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-300 group-hover:text-white transition-colors">
                  Template 6: Anurag Core
                </span>
                <span className="text-[9px] text-stone-500 font-semibold block mt-0.5 leading-normal">
                  Connecting skills nodes map and staggered cards
                </span>
              </div>
            </div>
            {/* Visual Mini Mockup of Template 6 */}
            <div className="w-full h-20 rounded-xl bg-stone-900/40 border border-stone-850 p-2 flex flex-col gap-1.5 overflow-hidden">
              <div className="flex-1 flex items-center justify-center relative">
                {/* Central dot */}
                <div className="w-2.5 h-2.5 rounded-full bg-stone-700" style={localSelectedTemplate === "template-6" ? { backgroundColor: pickedColor } : {}} />
                {/* Connecting lines */}
                <div className="absolute w-8 h-0.5 bg-stone-800" style={{ transform: "rotate(45deg) translate(3px, 3px)" }} />
                <div className="absolute w-8 h-0.5 bg-stone-800" style={{ transform: "rotate(-45deg) translate(-3px, 3px)" }} />
                {/* Outer dots */}
                <div className="absolute top-2 left-1/4 w-1.5 h-1.5 rounded-full bg-stone-700/60" />
                <div className="absolute top-2 right-1/4 w-1.5 h-1.5 rounded-full bg-stone-700/60" />
              </div>
              <div className="w-3/4 h-1.5 bg-stone-800 mx-auto rounded-full" />
            </div>
          </button>
        </div>
      </div>

      {/* Layout components preview */}
      <div className="flex flex-col gap-2 pt-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Element Rendering Preview
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-950 p-4 border border-stone-900 rounded-2xl">
          <div className="flex flex-col gap-2 items-center justify-center p-4 rounded-xl bg-stone-900/40 border border-stone-900/60 min-h-[90px]">
            <span className="text-[8px] text-stone-500 uppercase tracking-widest font-extrabold mb-1">
              Dynamic Button
            </span>
            <button
              type="button"
              onClick={(e) => e.preventDefault()}
              className="primary_button py-2.5 px-6 text-[9.5px] rounded-xl cursor-default w-full"
            >
              Primary Action
            </button>
          </div>

          <div className="flex flex-col gap-2 items-center justify-center p-4 rounded-xl bg-stone-900/40 border border-stone-900/60 min-h-[90px]">
            <span className="text-[8px] text-stone-500 uppercase tracking-widest font-extrabold mb-1">
              Accent Chips
            </span>
            <div className="flex items-center gap-2">
              <span className="tag-primary text-[9px] py-1 px-3.5">Primary tag</span>
              <span className="tag-outline text-[9px] py-1 px-3.5">Outline</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center justify-center p-4 rounded-xl bg-stone-900/40 border border-stone-900/60 min-h-[90px] col-span-1 sm:col-span-2">
            <span className="text-[8px] text-stone-500 uppercase tracking-widest font-extrabold mb-1">
              Typography Heading
            </span>
            <span className="neon-text text-base font-bold tracking-tight select-none uppercase">
              {localAbout?.name || "Developer Name"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
