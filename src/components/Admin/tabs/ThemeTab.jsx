import React from "react";
import { TabCardWrapper } from "../AdminCommon";

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
  localAbout
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
            <span className="neon-text text-base font-black tracking-tight select-none uppercase">
              {localAbout?.name || "Developer Name"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
