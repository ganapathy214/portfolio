import React from "react";
import { FiInfo, FiCode, FiLayers } from "react-icons/fi";
import { FormField, TabCardWrapper } from "../AdminCommon";
import { looksLikeSvg, injectPrimaryColor } from "../../../utils/svg";

export default function HomeTab({
  localAbout,
  updateAbout,
  localRoles,
  setLocalRoles,
  localDescription,
  setLocalDescription,
  localCenterSvg,
  setLocalCenterSvg,
  svgColorInjected,
  setSvgColorInjected,
  localOrbitingStacks,
  setLocalOrbitingStacks,
  pickedColor,
  renderSectionVisibilityBanner
}) {
  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {renderSectionVisibilityBanner("Home")}

      {/* Hero Identity Details */}
      <TabCardWrapper title="Hero Identity Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Hero Display Name (Main Title)"
            value={localAbout.name}
            onChange={(val) => updateAbout("name", val)}
            placeholder="Your Name (e.g. Ganapathy Natarajan)"
            colSpan="col-span-1"
          />
          <FormField
            label="Availability Status Badge Text"
            value={localAbout.statusBadgeText}
            onChange={(val) => updateAbout("statusBadgeText", val)}
            placeholder="e.g. Available for Work"
            colSpan="col-span-1"
          />
        </div>

        {/* Typewriter list */}
        <div className="flex flex-col gap-2">
          <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500">
            Typewriter Roles (Cycled in Hero Title)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {[0, 1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-stone-950 border border-stone-900 rounded-xl px-3 py-2"
              >
                <span className="font-mono text-[9px] font-extrabold text-stone-600">#{idx + 1}</span>
                <input
                  type="text"
                  value={localRoles[idx] || ""}
                  onChange={(e) => {
                    const copy = [...localRoles];
                    copy[idx] = e.target.value;
                    setLocalRoles(copy);
                  }}
                  placeholder={`Role Title #${idx + 1}`}
                  className="flex-1 bg-transparent border-0 outline-none text-[11px] text-white font-semibold"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tagline description */}
        <FormField
          label="Sub-Headline Tagline Description"
          type="textarea"
          value={localDescription}
          onChange={(val) => setLocalDescription(val.slice(0, 280))}
          placeholder="Input the introductory tagline text on your homepage."
          maxLength={280}
          charCount={true}
          rows={3}
          colSpan="col-span-1 sm:col-span-2"
        />
      </TabCardWrapper>

      {/* Laptop Graphic SVG Editor */}
      <TabCardWrapper title="Central Graphic SVG Editor">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: Input Textarea */}
          <div className="lg:col-span-7 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500">
                Raw SVG Markup Code
              </label>
              {svgColorInjected && (
                <span
                  className="text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg"
                  style={{ backgroundColor: `${pickedColor}20`, color: pickedColor }}
                >
                  ✓ Colors auto-themed
                </span>
              )}
            </div>
            <textarea
              value={localCenterSvg}
              onChange={(e) => {
                const raw = e.target.value;
                setLocalCenterSvg(raw);
                if (looksLikeSvg(raw)) {
                  const injected = injectPrimaryColor(raw);
                  setSvgColorInjected(injected !== raw);
                } else {
                  setSvgColorInjected(false);
                }
              }}
              onBlur={(e) => {
                const raw = e.target.value;
                if (looksLikeSvg(raw)) {
                  const injected = injectPrimaryColor(raw);
                  if (injected !== raw) {
                    setLocalCenterSvg(injected);
                    setSvgColorInjected(true);
                  }
                }
              }}
              rows={7}
              placeholder="Paste raw SVG string here (e.g. <svg>...</svg>)"
              className="w-full bg-stone-950 border border-stone-900 focus:border-primary outline-none text-xs font-mono rounded-xl px-4 py-3 text-stone-300 resize-none whitespace-pre transition-colors"
            />
            <div className="flex items-start gap-2 text-stone-500 leading-normal">
              <FiInfo className="text-xs mt-0.5 shrink-0" style={{ color: pickedColor }} />
              <span className="text-[8px] font-semibold">
                Paste any SVG — fill/stroke colors are <strong style={{ color: pickedColor }}>auto-replaced</strong> with accent variables.
              </span>
            </div>
          </div>

          {/* Right: Live Render Box */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500">
              SVG Live Render
            </label>
            <div className="w-full h-full min-h-[160px] bg-stone-950 border border-stone-900 rounded-2xl flex items-center justify-center relative p-6">
              {localCenterSvg ? (
                <div
                  className="w-[100px] h-[100px] object-contain flex items-center justify-center relative z-10"
                  style={{ filter: `drop-shadow(0 0 10px ${pickedColor}40)` }}
                  dangerouslySetInnerHTML={{ __html: localCenterSvg }}
                />
              ) : (
                <div className="text-center space-y-2 select-none pointer-events-none">
                  <FiCode className="text-2xl text-stone-600 mx-auto" />
                  <span className="text-[9px] text-stone-500 uppercase font-extrabold tracking-wider block">
                    Laptop Fallback Active
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </TabCardWrapper>

      {/* Orbiting Stacks */}
      <TabCardWrapper title="Outer Rotating Orbit Stacks">
        <div className="flex items-start gap-2.5 text-stone-500 leading-normal mb-1">
          <FiLayers className="text-xs mt-0.5 shrink-0" style={{ color: pickedColor }} />
          <span className="text-[9.5px] font-semibold">
            Configure the 6 circular orbital chips displayed on the main home landing screen layout.
          </span>
        </div>

        {/* Slots Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const stack = localOrbitingStacks[idx] || { label: "", type: "primary" };
            return (
              <div
                key={idx}
                className="p-4 bg-stone-950 border border-stone-900 rounded-2xl flex flex-col gap-3 relative group transition-all duration-300 hover:border-stone-800"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-extrabold font-mono text-stone-500">
                    ORBITAL SLOT #{idx + 1}
                  </span>
                  <span
                    className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded ${
                      stack.type === "outline" ? "bg-stone-900 text-stone-400" : "bg-primary/10 text-primary"
                    }`}
                    style={stack.type !== "outline" ? { color: pickedColor, backgroundColor: `${pickedColor}15` } : {}}
                  >
                    {stack.type === "outline" ? "Outline" : "Accent Glow"}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <input
                    type="text"
                    value={stack.label}
                    onChange={(e) => {
                      const copy = [...localOrbitingStacks];
                      if (!copy[idx]) copy[idx] = { label: "", type: "primary" };
                      copy[idx] = { ...copy[idx], label: e.target.value };
                      setLocalOrbitingStacks(copy);
                    }}
                    placeholder="Tech Label (e.g. React)"
                    className="w-full bg-stone-900/50 border border-stone-800 focus:border-primary outline-none text-xs rounded-xl px-3 py-2 text-white font-semibold transition-all focus:ring-1 focus:ring-primary/20"
                  />
                  <select
                    value={stack.type}
                    onChange={(e) => {
                      const copy = [...localOrbitingStacks];
                      if (!copy[idx]) copy[idx] = { label: "", type: "primary" };
                      copy[idx] = { ...copy[idx], type: e.target.value };
                      setLocalOrbitingStacks(copy);
                    }}
                    className="w-full bg-stone-900/50 border border-stone-800 focus:border-primary outline-none text-xs rounded-xl px-3.5 py-2 text-white font-semibold cursor-pointer transition-all"
                  >
                    <option value="primary">Accent Glow Color</option>
                    <option value="outline">Muted Border Outline</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </TabCardWrapper>
    </div>
  );
}
