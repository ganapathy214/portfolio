import React from "react";
import { motion } from "framer-motion";
import { FiChevronUp, FiChevronDown, FiEye, FiEyeOff } from "react-icons/fi";
import { TabCardWrapper } from "../SettingsCommon";
import { FONT_OPTIONS, applyFont } from "../../../utils/font";

const ALL_SECTIONS = [
  "Home", "About", "Services", "Skills", "Projects",
  "Certification", "Testimonials", "Journey", "Blogs", "Faq", "Contact"
];

const COLOR_SWATCHES = [
  { name: "Cyan Spark",      value: "#00D5D5", subtitle: "Cyberpunk Glow" },
  { name: "Purple Neon",     value: "#a855f7", subtitle: "Midnight Synth" },
  { name: "Rose Glow",       value: "#f43f5e", subtitle: "Vibrant Cherry" },
  { name: "Emerald Cyber",   value: "#10b981", subtitle: "Matrix Green" },
  { name: "Amber Fusion",    value: "#f59e0b", subtitle: "Sunset Gold" },
  { name: "Ocean Blue",      value: "#3b82f6", subtitle: "Deep Marine" },
  { name: "Coral Flame",     value: "#ff6b6b", subtitle: "Playful Warmth" },
  { name: "Lime Volt",       value: "#a3e635", subtitle: "High Voltage" },
  { name: "Indigo Dream",    value: "#6366f1", subtitle: "Cosmic Indigo" },
  { name: "Pink Candy",      value: "#ec4899", subtitle: "Sweet Bubble" },
  { name: "Teal Mist",       value: "#14b8a6", subtitle: "Soothing Aqua" },
  { name: "Gold Rush",       value: "#d97706", subtitle: "Earthy Bronze" },
];

export default function ThemeTab({
  pickedColor,
  handleColorChange,
  localThemeMode,
  handleThemeModeChange,
  localAbout,
  localSelectedTemplate,
  setLocalSelectedTemplate,
  onSelectDesign,
  localFontFamily,
  setLocalFontFamily,
  localParticlesStyle,
  setLocalParticlesStyle,
  localSectionVisibility,
  setLocalSectionVisibility,
  localSectionOrder,
  moveSectionInOrder,
}) {
  const handleFontChange = (fontName) => {
    setLocalFontFamily(fontName);
    applyFont(fontName);
  };

  const noJourneyTemplates = ["template-2", "template-3", "template-5", "template-6"];
  const visibleSectionOrder = (localSectionOrder || ALL_SECTIONS).filter(
    (s) => !(s === "Journey" && noJourneyTemplates.includes(localSelectedTemplate))
  );

  const isLight = localThemeMode === "light";

  // ── Render Dynamic Theme Sandbox Preview ───────────────────────────────
  const renderThemeSandbox = () => {
    const fontStack = `"${localFontFamily}", sans-serif`;
    
    // Simulate active particles in sandbox
    const renderSandboxParticles = () => {
      if (localParticlesStyle === "none") return null;
      const count = localParticlesStyle === "minimal" ? 8 : 14;
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          {[...Array(count)].map((_, i) => {
            const size = (i % 3) * 2 + 2;
            const top = (i * 19) % 100;
            const left = (i * 29) % 100;
            return (
              <div
                key={i}
                className="absolute rounded-full transition-all duration-700 animate-pulse bg-current"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                  color: pickedColor,
                }}
              />
            );
          })}
          {localParticlesStyle === "interactive" && (
            <svg className="absolute inset-0 w-full h-full" stroke={`${pickedColor}25`} strokeWidth={0.5}>
              <line x1="15%" y1="25%" x2="45%" y2="55%" />
              <line x1="45%" y1="55%" x2="75%" y2="25%" />
              <line x1="25%" y1="75%" x2="65%" y2="85%" />
            </svg>
          )}
        </div>
      );
    };

    return (
      <div 
        className="flex flex-col rounded-3xl border overflow-hidden shadow-2xl transition-all duration-300 w-full select-none"
        style={{
          borderColor: isLight ? "#e2e8f0" : "rgba(255, 255, 255, 0.05)",
          boxShadow: isLight
            ? `0 16px 36px -12px rgba(0,0,0,0.08), 0 0 16px -2px ${pickedColor}08`
            : `0 24px 60px -10px rgba(0,0,0,0.5), 0 0 20px -2px ${pickedColor}10`,
        }}
      >
        {/* Mock Browser Header Bar */}
        <div 
          className="h-8 border-b flex items-center justify-between px-4 select-none shrink-0 transition-colors"
          style={{
            backgroundColor: isLight ? "#f1f5f9" : "rgba(12, 12, 12, 0.95)",
            borderColor: isLight ? "#cbd5e1" : "rgba(255, 255, 255, 0.05)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-[7.5px] font-mono font-bold tracking-widest text-stone-500 uppercase">
            Theme Sandbox Preview
          </div>
          <div 
            className="text-[6.5px] font-mono font-extrabold uppercase px-2 py-0.5 rounded transition-all"
            style={{
              backgroundColor: isLight ? "#cbd5e1" : "rgba(255, 255, 255, 0.04)",
              color: isLight ? "#334155" : "#94a3b8"
            }}
          >
            {localThemeMode.toUpperCase()} Mode
          </div>
        </div>

        {/* Sandbox Content Canvas */}
        <div 
          className="w-full relative overflow-hidden transition-all duration-300 p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            height: "150px",
            backgroundColor: isLight ? "#f8fafc" : "#060b13",
            fontFamily: fontStack,
          }}
        >
          {renderSandboxParticles()}

          {/* Left Block: Text Profile */}
          <div className="flex flex-col gap-1 text-left max-w-[60%] z-10">
            <div 
              className="px-2 py-0.5 rounded-full border text-[6px] font-extrabold uppercase tracking-widest w-fit"
              style={{
                borderColor: `${pickedColor}30`,
                backgroundColor: `${pickedColor}10`,
                color: pickedColor
              }}
            >
              Creative Sandbox
            </div>
            <h2 
              className={`text-xs sm:text-sm font-black tracking-tight leading-none transition-colors ${
                isLight ? "text-stone-900" : "text-white"
              }`}
            >
              {localAbout?.name || "Ganapathy Natarajan"}
            </h2>
            <p 
              className="text-[7.5px] font-mono font-bold uppercase tracking-widest leading-none"
              style={{ color: pickedColor }}
            >
              Customizable Typography & Theme
            </p>
            <p 
              className={`text-[6px] leading-relaxed line-clamp-2 mt-0.5 ${
                isLight ? "text-stone-500" : "text-stone-400"
              }`}
            >
              This live sandbox reflects your active font choices, accent colors, particles styles, and light/dark theme modes in real-time.
            </p>
          </div>

          {/* Right Block: Dynamic Accent Widgets */}
          <div className="flex flex-col gap-2 shrink-0 items-center justify-center z-10">
            <button
              type="button"
              className="py-2 px-5 text-[8.5px] font-extrabold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md hover:scale-105"
              style={{
                backgroundColor: pickedColor,
                color: isLight ? "#ffffff" : "#000000",
                boxShadow: `0 4px 14px ${pickedColor}35`,
              }}
            >
              Accent Button
            </button>
            <div className="flex gap-1.5">
              <span 
                className="text-[6.5px] font-black uppercase tracking-widest px-2 py-0.5 rounded border"
                style={{
                  color: pickedColor,
                  borderColor: `${pickedColor}30`,
                  backgroundColor: `${pickedColor}08`
                }}
              >
                Accent Tag
              </span>
              <span 
                className="text-[6.5px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-stone-850"
                style={{
                  color: isLight ? "#64748b" : "#94a3b8",
                  backgroundColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.02)"
                }}
              >
                Outline Tag
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn text-left">
      {/* Sandbox Live View Card */}
      {renderThemeSandbox()}

      {/* Preset Swatches Row */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Preset Accent Colors
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {COLOR_SWATCHES.map((swatch) => {
            const isSelected = pickedColor.toLowerCase() === swatch.value.toLowerCase();
            return (
              <button
                key={swatch.name}
                type="button"
                onClick={() => handleColorChange(swatch.value)}
                className="flex items-center gap-3 p-3 rounded-2xl border border-stone-900 bg-stone-950 hover:border-stone-800 transition-all duration-300 cursor-pointer group hover:scale-[1.02] text-left"
                style={{
                  borderColor: isSelected ? swatch.value : undefined,
                  backgroundColor: isSelected ? `${swatch.value}10` : undefined,
                  boxShadow: isSelected ? `0 0 14px ${swatch.value}25` : "none",
                }}
                title={swatch.name}
              >
                <span
                  className="w-5 h-5 rounded-full border-2 transition-transform duration-200 group-hover:scale-110 shrink-0"
                  style={{
                    backgroundColor: swatch.value,
                    borderColor: isSelected ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.08)",
                    boxShadow: isSelected ? `0 0 8px ${swatch.value}` : "none",
                  }}
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-[9.5px] font-black tracking-wide uppercase text-white leading-tight">
                    {swatch.name}
                  </span>
                  <span className="text-[7.5px] font-semibold text-stone-500 group-hover:text-stone-450 transition-colors leading-tight uppercase tracking-wider mt-0.5 truncate">
                    {swatch.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Manual custom picker */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Custom Accent Hex Code
        </label>
        <div className="flex items-center gap-4 bg-stone-950 border border-stone-900 rounded-2xl p-4">
          <input
            type="color"
            value={pickedColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-12 h-12 rounded-xl border-0 cursor-pointer outline-none bg-transparent"
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
            className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-stone-950 border border-stone-900 hover:border-stone-800 transition-all duration-300 cursor-pointer group"
            style={!isLight ? { borderColor: pickedColor, boxShadow: `0 4px 16px ${pickedColor}15` } : {}}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                !isLight ? "bg-white border-white scale-110" : "bg-transparent border-stone-600 group-hover:border-stone-400"
              }`}
              style={!isLight ? { backgroundColor: "#FFFFFF", borderColor: "#FFFFFF", boxShadow: `0 0 8px #FFFFFF` } : {}}
            />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 group-hover:text-white transition-colors">
              Dark Theme Mode
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleThemeModeChange("light")}
            className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-stone-950 border border-stone-900 hover:border-stone-800 transition-all duration-300 cursor-pointer group"
            style={isLight ? { borderColor: pickedColor, boxShadow: `0 4px 16px ${pickedColor}15` } : {}}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                isLight ? "bg-white border-white scale-110" : "bg-transparent border-stone-600 group-hover:border-stone-400"
              }`}
              style={isLight ? { backgroundColor: pickedColor, borderColor: pickedColor, boxShadow: `0 0 8px ${pickedColor}` } : {}}
            />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 group-hover:text-white transition-colors">
              Light Theme Mode
            </span>
          </button>
        </div>
      </div>

      {/* Background Particles Style Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Background Particles Style
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* None */}
          <button
            type="button"
            onClick={() => setLocalParticlesStyle("none")}
            className="flex items-start gap-3 p-4 rounded-2xl border border-stone-900 bg-stone-950 hover:border-stone-800 transition-all duration-300 cursor-pointer group text-left relative overflow-hidden"
            style={{
              borderColor: localParticlesStyle === "none" ? pickedColor : undefined,
              backgroundColor: localParticlesStyle === "none" ? `${pickedColor}12` : undefined,
              boxShadow: localParticlesStyle === "none" ? `0 4px 16px ${pickedColor}20` : "none",
            }}
          >
            <span
              className="w-3 h-3 rounded-full border-2 transition-all mt-0.5 shrink-0 animate-none"
              style={{
                backgroundColor: localParticlesStyle === "none" ? pickedColor : "transparent",
                borderColor: localParticlesStyle === "none" ? pickedColor : "#57534e",
                boxShadow: localParticlesStyle === "none" ? `0 0 8px ${pickedColor}` : "none",
              }}
            />
            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-white">
                Disabled
              </span>
              <span className="text-[7.5px] text-stone-500 font-semibold tracking-normal uppercase leading-tight mt-0.5">
                Flat background design layout.
              </span>
            </div>
          </button>

          {/* Minimal */}
          <button
            type="button"
            onClick={() => setLocalParticlesStyle("minimal")}
            className="flex items-start gap-3 p-4 rounded-2xl border border-stone-900 bg-stone-950 hover:border-stone-800 transition-all duration-300 cursor-pointer group text-left relative overflow-hidden"
            style={{
              borderColor: localParticlesStyle === "minimal" ? pickedColor : undefined,
              backgroundColor: localParticlesStyle === "minimal" ? `${pickedColor}12` : undefined,
              boxShadow: localParticlesStyle === "minimal" ? `0 4px 16px ${pickedColor}20` : "none",
            }}
          >
            <span
              className="w-3 h-3 rounded-full border-2 transition-all mt-0.5 shrink-0"
              style={{
                backgroundColor: localParticlesStyle === "minimal" ? pickedColor : "transparent",
                borderColor: localParticlesStyle === "minimal" ? pickedColor : "#57534e",
                boxShadow: localParticlesStyle === "minimal" ? `0 0 8px ${pickedColor}` : "none",
              }}
            />
            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-white">
                Minimal Floating
              </span>
              <span className="text-[7.5px] text-stone-500 font-semibold tracking-normal uppercase leading-tight mt-0.5">
                Slow floating particles effect.
              </span>
            </div>
          </button>

          {/* Interactive */}
          <button
            type="button"
            onClick={() => setLocalParticlesStyle("interactive")}
            className="flex items-start gap-3 p-4 rounded-2xl border border-stone-900 bg-stone-950 hover:border-stone-800 transition-all duration-300 cursor-pointer group text-left relative overflow-hidden"
            style={{
              borderColor: localParticlesStyle === "interactive" ? pickedColor : undefined,
              backgroundColor: localParticlesStyle === "interactive" ? `${pickedColor}12` : undefined,
              boxShadow: localParticlesStyle === "interactive" ? `0 4px 16px ${pickedColor}20` : "none",
            }}
          >
            <span
              className="w-3 h-3 rounded-full border-2 transition-all mt-0.5 shrink-0"
              style={{
                backgroundColor: localParticlesStyle === "interactive" ? pickedColor : "transparent",
                borderColor: localParticlesStyle === "interactive" ? pickedColor : "#57534e",
                boxShadow: localParticlesStyle === "interactive" ? `0 0 8px ${pickedColor}` : "none",
              }}
            />
            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-white">
                Interactive Lines
              </span>
              <span className="text-[7.5px] text-stone-500 font-semibold tracking-normal uppercase leading-tight mt-0.5">
                Connecting lines tracking cursor.
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Typography / Font Family Picker */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Typography — Font Family
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FONT_OPTIONS.map((font) => {
            const isSelected = localFontFamily === font.name;
            return (
              <button
                key={font.name}
                type="button"
                onClick={() => handleFontChange(font.name)}
                className="p-4 rounded-2xl bg-stone-950 border border-stone-900 hover:border-stone-800 transition-all duration-300 flex flex-col items-start gap-2 text-left cursor-pointer group hover:scale-[1.02]"
                style={{
                  borderColor: isSelected ? pickedColor : undefined,
                  boxShadow: isSelected ? `0 4px 16px ${pickedColor}25` : "none",
                  fontFamily: `"${font.name}", sans-serif`,
                }}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-[7px] uppercase tracking-widest font-extrabold px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-500">
                    {font.category}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pickedColor, boxShadow: `0 0 6px ${pickedColor}` }} />
                  )}
                </div>
                <div className="flex flex-col mt-1">
                  <span className="text-xl font-black text-white leading-none tracking-tight">
                    Aa Gg
                  </span>
                  <span className="text-[8px] font-medium text-stone-500 mt-1 truncate">
                    "The creative coding platform"
                  </span>
                </div>
                <span className="text-[10px] font-black text-white mt-1 border-t border-stone-900/50 pt-1.5 w-full block">
                  {font.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Redirect template layouts banner */}
      <div
        className="flex items-center gap-4 p-4 rounded-2xl border"
        style={{
          borderColor: `${pickedColor}20`,
          background: `${pickedColor}05`,
        }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${pickedColor}10`, border: `1px solid ${pickedColor}20` }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={pickedColor} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-black text-white">
            Template &amp; Section Layouts
          </p>
          <p className="text-[10px] font-medium mt-0.5 text-stone-400">
            Select layouts and customize dynamic landing components in the{" "}
            <span className="font-black" style={{ color: pickedColor }}>Home Section</span>
            {" "}settings console tab directly.
          </p>
        </div>
        <button
          type="button"
          onClick={onSelectDesign}
          className="shrink-0 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer"
          style={{
            background: pickedColor,
            color: isLight ? "#ffffff" : "#000000",
            boxShadow: `0 4px 10px ${pickedColor}35`,
          }}
        >
          Configure Layouts →
        </button>
      </div>

      {/* ── Section Order & Visibility ─────────────────────────────── */}
      <TabCardWrapper
        title="Section Order & Visibility"
        subtitle="Manage the sequencing and visibility of each section. Pulse badges display status instantly."
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
                className="flex items-center gap-3 bg-stone-950 border border-stone-900 rounded-2xl px-4 py-3 transition-all duration-300 hover:bg-stone-900"
                style={{
                  opacity: isVisible ? 1 : 0.6,
                  borderColor: isVisible ? pickedColor : "rgba(28, 25, 23, 1)",
                  boxShadow: isVisible ? `0 0 10px ${pickedColor}15` : "none",
                }}
              >
                {/* Drag handle / order number */}
                <span
                  className="text-[9.5px] font-mono font-extrabold w-6 text-center shrink-0"
                  style={{ color: isVisible ? pickedColor : "#57534e" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Section name */}
                <span className={`flex-1 text-[11px] font-black transition-colors ${isVisible ? "text-white" : "text-stone-500"}`}>
                  {sectionName} Section
                </span>

                {/* Visibility status badge */}
                <span
                  className="text-[7.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg border transition-all duration-300"
                  style={isVisible
                    ? { color: pickedColor, borderColor: `${pickedColor}20`, backgroundColor: `${pickedColor}10` }
                    : { color: "#ef4444", borderColor: "rgba(239,68,68,0.2)", backgroundColor: "rgba(239,68,68,0.08)" }
                  }
                >
                  {isVisible ? "✓ Active & Visible" : "✗ Muted"}
                </span>

                {/* Actions Container */}
                <div className="flex items-center gap-1.5">
                  {/* Visibility Toggle */}
                  <button
                    type="button"
                    title={isVisible ? "Hide section" : "Show section"}
                    onClick={() => setLocalSectionVisibility(prev => ({ ...prev, [sectionName]: !isVisible }))}
                    className="p-2 rounded-xl border transition-all duration-200 cursor-pointer"
                    style={{
                      backgroundColor: "rgba(10,10,10,0.8)",
                      borderColor: isVisible ? `${pickedColor}20` : "rgba(255,255,255,0.04)",
                      color: isVisible ? pickedColor : "#ef4444",
                    }}
                  >
                    {isVisible ? <FiEye className="text-xs" /> : <FiEyeOff className="text-xs" />}
                  </button>

                  {/* Move Up */}
                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={() => moveSectionInOrder(idx, -1)}
                    className="p-2 rounded-xl border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-800 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
                  >
                    <FiChevronUp className="text-xs" />
                  </button>

                  {/* Move Down */}
                  <button
                    type="button"
                    disabled={isLast}
                    onClick={() => moveSectionInOrder(idx, 1)}
                    className="p-2 rounded-xl border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-800 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
                  >
                    <FiChevronDown className="text-xs" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
        <p className="text-[9px] text-stone-600 font-semibold mt-1">
          💡 Changes to section order are applied immediately when you click Save Settings.
        </p>
      </TabCardWrapper>

      {/* Layout components preview */}
      <div className="flex flex-col gap-2 pt-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Dynamic Element Playground
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-950 p-4 border border-stone-900 rounded-2xl relative overflow-hidden">
          <div className="flex flex-col gap-2 items-center justify-center p-4 rounded-xl bg-stone-950 border border-stone-900 min-h-[90px]">
            <span className="text-[7px] text-stone-500 uppercase tracking-widest font-extrabold mb-1">
              Dynamic Button Accent
            </span>
            <button
              type="button"
              className="py-2.5 px-6 text-[9px] font-extrabold uppercase tracking-widest rounded-xl transition-all duration-300 w-full"
              style={{
                backgroundColor: pickedColor,
                color: isLight ? "#ffffff" : "#000000",
                boxShadow: `0 4px 12px ${pickedColor}25`
              }}
            >
              Primary Button
            </button>
          </div>

          <div className="flex flex-col gap-2 items-center justify-center p-4 rounded-xl bg-stone-950 border border-stone-900 min-h-[90px]">
            <span className="text-[7px] text-stone-500 uppercase tracking-widest font-extrabold mb-1">
              Accent Chip Preview
            </span>
            <div className="flex items-center gap-2">
              <span 
                className="text-[8.5px] font-black uppercase tracking-widest py-1.5 px-4 rounded border transition-colors"
                style={{
                  color: pickedColor,
                  borderColor: pickedColor,
                  backgroundColor: `${pickedColor}10`
                }}
              >
                Filled Accent
              </span>
              <span 
                className="text-[8.5px] font-black uppercase tracking-widest py-1.5 px-4 rounded border border-stone-900"
                style={{
                  color: isLight ? "#475569" : "#94a3b8",
                  backgroundColor: "rgba(255,255,255,0.01)"
                }}
              >
                Muted Outline
              </span>
            </div>
          </div>

          <div 
            className="flex flex-col gap-2 items-center justify-center p-4 rounded-xl bg-stone-950 border border-stone-900 min-h-[90px] col-span-1 sm:col-span-2"
            style={{ fontFamily: `"${localFontFamily}", sans-serif` }}
          >
            <span className="text-[7px] text-stone-500 uppercase tracking-widest font-extrabold mb-1">
              Typography Font Showcase
            </span>
            <span 
              className="text-md font-black tracking-tight select-none uppercase transition-colors"
              style={{ color: pickedColor }}
            >
              {localAbout?.name || "Ganapathy Natarajan"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
