import React, { useState } from "react";
import { FiInfo, FiCode, FiLayers, FiLock } from "react-icons/fi";
import { FormField, TabCardWrapper, FileUpload } from "../SettingsCommon";
import { looksLikeSvg, injectPrimaryColor } from "../../../utils/svg";

const TEMPLATES = [
  { id: "template-1", badge: "Sidebar",    title: "Modern Sidebar",  desc: "Left-docked animated navigation.",          image: "/portfolio/templates/template1.png" },
  { id: "template-2", badge: "Sidebar",    title: "Classic Sidebar", desc: "Avatar + detailed profile sidebar.",         image: "/portfolio/templates/template2.png" },
  { id: "template-3", badge: "Top Nav",    title: "Modern Topnav",   desc: "Clean top navbar with card grids.",          image: "/portfolio/templates/template3.png" },
  { id: "template-4", badge: "Dev Style",  title: "Dev Marquee",     desc: "Neon borders and scrolling ticker.",         image: "/portfolio/templates/template4.png" },
  { id: "template-5", badge: "Portrait",   title: "John Doe",        desc: "Circular portrait with metric badges.",      image: "/portfolio/templates/template5.png" },
  { id: "template-6", badge: "Network",    title: "Anurag Core",     desc: "Skill nodes network + staggered cards.",     image: "/portfolio/templates/template6.png" },
];

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
  renderSectionVisibilityBanner,
  selectedTemplate,
  setLocalSelectedTemplate,
  localThemeMode,
}) {
  const [isConfiguring, setIsConfiguring] = useState(false);
  const isTemplate4Or5 = selectedTemplate === "template-4" || selectedTemplate === "template-5";
  const hasTypewriterRoles = ["template-1", "template-2", "template-3", "template-4", "template-5"].includes(selectedTemplate);
  const hasAvailabilityBadge = ["template-1", "template-3"].includes(selectedTemplate);
  const hasAvatarUpload = ["template-2", "template-5"].includes(selectedTemplate);
  const isLight = localThemeMode === "light";

  // ── Render Simulated Visual Mockups for each Template ────────────────────
  const renderTemplate1Mock = () => {
    const orbitItems = (localOrbitingStacks || []).slice(0, 6);
    return (
      <div className="flex h-full w-full">
        {/* Sidebar */}
        <div className={`w-10 border-r flex flex-col items-center py-4 gap-3 shrink-0 h-full ${
          isLight ? "bg-stone-50 border-stone-200" : "bg-[#04080e] border-stone-900"
        }`}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pickedColor }} />
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-stone-200" : "bg-stone-800"}`} />
          ))}
        </div>
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-between px-6 py-4 gap-4 h-full relative">
          <div className="flex flex-col gap-1 max-w-[55%] text-left select-none pointer-events-none">
            {/* Status Badge */}
            <div 
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[6.5px] font-bold uppercase tracking-wider w-fit"
              style={{
                borderColor: `${pickedColor}25`,
                backgroundColor: `${pickedColor}10`,
                color: pickedColor
              }}
            >
              <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
              {localAbout.statusBadgeText || "Available for work"}
            </div>
            
            {/* Name */}
            <h1 className={`text-sm font-black tracking-tight mt-0.5 leading-none ${isLight ? "text-stone-900" : "text-white"}`}>
              {localAbout.name || "Ganapathy Natarajan"}
            </h1>
            
            {/* Role Typewriter */}
            <div className="text-[8px] font-mono font-black uppercase tracking-wider h-3.5" style={{ color: pickedColor }}>
              {(localRoles[0] || "DEVELOPER")}_
            </div>
            
            {/* Tagline */}
            <p className={`text-[7px] leading-relaxed line-clamp-3 mt-0.5 ${isLight ? "text-stone-500" : "text-stone-400"}`}>
              {localDescription || "Input your tagline text here."}
            </p>
            
            {/* Buttons */}
            <div className="flex gap-1.5 mt-2">
              <div 
                className="px-2.5 py-1 rounded text-[6.5px] font-extrabold uppercase tracking-wider"
                style={{ backgroundColor: pickedColor, color: isLight ? "#fff" : "#000" }}
              >
                View Projects
              </div>
              <div 
                className="px-2.5 py-1 rounded text-[6.5px] font-extrabold uppercase tracking-wider border"
                style={{ borderColor: `${pickedColor}40`, color: pickedColor }}
              >
                Contact Me
              </div>
            </div>
          </div>

          {/* Central Orbit Graphic */}
          <div className="w-28 h-28 relative flex items-center justify-center shrink-0">
            <div 
              className={`w-14 h-14 rounded-full border border-dashed flex items-center justify-center relative z-10 ${
                isLight ? "bg-white border-stone-300" : "bg-[#080d17]/85 border-stone-850"
              }`}
              style={{
                boxShadow: `0 0 16px ${pickedColor}15`
              }}
            >
              {localCenterSvg ? (
                <div 
                  className="w-8 h-8 flex items-center justify-center object-contain"
                  style={{ filter: `drop-shadow(0 0 4px ${pickedColor}40)` }}
                  dangerouslySetInnerHTML={{ __html: localCenterSvg }}
                />
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={pickedColor} strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              )}
            </div>

            {/* Orbiting Ring */}
            <div className={`absolute inset-0 border rounded-full animate-spin-slow ${isLight ? "border-stone-200" : "border-stone-800"}`} />
            <div className={`absolute inset-2 border border-dashed rounded-full animate-spin-slow ${isLight ? "border-stone-200" : "border-stone-800"}`} style={{ animationDirection: "reverse" }} />
            
            {/* Orbit Items */}
            <div className="absolute inset-0 animate-spin-slow select-none pointer-events-none">
              {orbitItems.map((item, i) => {
                const angle = i * (360 / orbitItems.length);
                const isOutline = item.type === "outline";
                return (
                  <div
                    key={i}
                    className="absolute w-fit"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translate(48px) rotate(${-angle}deg)`
                    }}
                  >
                    <div 
                      className="animate-spin-counter px-1.5 py-0.5 rounded text-[5px] font-black uppercase tracking-wider"
                      style={{
                        backgroundColor: isOutline ? (isLight ? "#fff" : "#0f172a") : `${pickedColor}15`,
                        borderColor: isOutline ? (isLight ? "#cbd5e1" : "#334155") : `${pickedColor}40`,
                        borderWidth: "1px",
                        color: isOutline ? (isLight ? "#64748b" : "#94a3b8") : pickedColor,
                        boxShadow: isOutline ? "none" : `0 0 6px ${pickedColor}20`
                      }}
                    >
                      {item.label || "TECH"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTemplate2Mock = () => {
    return (
      <div className="flex h-full w-full">
        {/* Sidebar */}
        <div className={`w-[85px] border-r flex flex-col items-center py-4 px-2 shrink-0 h-full text-center ${
          isLight ? "bg-stone-50 border-stone-200" : "bg-[#070b13] border-stone-900"
        }`}>
          {/* Avatar */}
          <div className={`w-8 h-8 rounded-full border overflow-hidden bg-stone-900 flex items-center justify-center shrink-0 ${
            isLight ? "border-stone-250" : "border-stone-800"
          }`}>
            {localAbout.avatarUrl ? (
              <img src={localAbout.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-[10px] font-black text-stone-500">{(localAbout.name || "G").charAt(0)}</span>
            )}
          </div>
          {/* Name */}
          <div className={`text-[7.5px] font-black truncate w-full mt-1.5 ${isLight ? "text-stone-900" : "text-white"}`}>
            {localAbout.name || "James John"}
          </div>
          {/* Menu */}
          <div className="flex flex-col gap-1 w-full mt-3 items-center">
            <div className="w-12 h-1 rounded-full" style={{ backgroundColor: pickedColor }} />
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`w-12 h-0.5 rounded-full ${isLight ? "bg-stone-200" : "bg-stone-800"}`} />
            ))}
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-6 py-4 gap-0.5 h-full text-left select-none pointer-events-none">
          <span className="text-[6.5px] font-bold uppercase tracking-widest text-stone-500">Welcome To My Portfolio</span>
          <h1 className={`text-md font-black tracking-tight leading-none mt-1 ${isLight ? "text-stone-900" : "text-white"}`}>
            {localAbout.name || "James John"}
          </h1>
          <div className="text-[8px] font-bold uppercase tracking-wide h-4" style={{ color: pickedColor }}>
            <span className="border-r border-current pr-0.5 animate-pulse">{(localRoles[0] || "DEVELOPER")}</span>
          </div>
          <p className={`text-[7px] leading-relaxed line-clamp-3 mt-0.5 ${isLight ? "text-stone-500" : "text-stone-400"}`}>
            {localDescription || "Input your tagline text here."}
          </p>
          <div className="flex gap-2 mt-2">
            <div 
              className="px-2.5 py-1 rounded text-[6.5px] font-extrabold uppercase tracking-wider"
              style={{ backgroundColor: pickedColor, color: isLight ? "#fff" : "#000" }}
            >
              Hire Me
            </div>
            <div 
              className="px-2.5 py-1 rounded text-[6.5px] font-extrabold uppercase tracking-wider border"
              style={{ borderColor: isLight ? "#e2e8f0" : "rgba(255,255,255,0.06)", color: isLight ? "#111" : "#fff" }}
            >
              Projects
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTemplate3Mock = () => {
    return (
      <div className="flex flex-col h-full w-full">
        {/* Top Navbar */}
        <div className={`h-7 border-b flex items-center justify-between px-6 shrink-0 ${
          isLight ? "bg-stone-50 border-stone-200" : "bg-[#04080e] border-stone-900"
        }`}>
          <div className="text-[8px] font-black uppercase tracking-wider" style={{ color: pickedColor }}>
            {(localAbout.name || "James").split(" ")[0]}<span className="text-stone-400">.</span>
          </div>
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`w-8 h-0.5 rounded-full ${isLight ? "bg-stone-200" : "bg-stone-850"}`} />
            ))}
          </div>
        </div>
        {/* Centered Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-10 py-4 text-center select-none pointer-events-none">
          {/* Badge */}
          {hasAvailabilityBadge && (
            <div 
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[6px] font-bold uppercase tracking-wider mb-1.5"
              style={{
                borderColor: `${pickedColor}25`,
                backgroundColor: `${pickedColor}10`,
                color: pickedColor
              }}
            >
              <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
              {localAbout.statusBadgeText || "Available for work"}
            </div>
          )}
          
          <h1 className={`text-md sm:text-lg font-extrabold tracking-tight mt-0.5 leading-none ${isLight ? "text-stone-900" : "text-white"}`}>
            Hi, I am <span style={{ color: pickedColor }}>{localAbout.name || "James John"}</span>
          </h1>
          <div className={`text-[8.5px] font-bold tracking-wide mt-1.5 ${isLight ? "text-stone-500" : "text-stone-300"}`}>
            A seasoned <span style={{ color: pickedColor }}>{(localRoles[0] || "DEVELOPER")}</span>
          </div>
          <p className={`text-[7px] leading-relaxed line-clamp-3 mt-1.5 max-w-xs ${isLight ? "text-stone-500" : "text-stone-400"}`}>
            {localDescription || "Input your tagline text here."}
          </p>
          <div className="flex gap-2 mt-3">
            <div 
              className="px-3 py-1 rounded text-[6.5px] font-black uppercase tracking-wider"
              style={{ backgroundColor: pickedColor, color: isLight ? "#fff" : "#000" }}
            >
              View Work
            </div>
            <div 
              className="px-3 py-1 rounded text-[6.5px] font-black uppercase tracking-wider border"
              style={{ borderColor: `${pickedColor}30`, color: pickedColor }}
            >
              Download CV
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTemplate4Mock = () => {
    return (
      <div className="grid grid-cols-12 h-full w-full items-center p-5 gap-4 select-none pointer-events-none">
        {/* Left Intro */}
        <div className="col-span-7 flex flex-col gap-1 text-left">
          <span className="text-[7px] font-mono uppercase tracking-widest" style={{ color: pickedColor }}>Hi, I'm</span>
          <h1 className={`text-md font-black tracking-tight leading-none ${isLight ? "text-stone-900" : "text-white"}`}>
            {localAbout.name || "James John"}
          </h1>
          <h2 className={`text-[8.5px] font-bold ${isLight ? "text-stone-600" : "text-stone-300"}`}>
            {localRoles[0] || "Frontend Architect"}
          </h2>
          <p className={`text-[7px] leading-relaxed line-clamp-3 mt-0.5 ${isLight ? "text-stone-500" : "text-stone-400"}`}>
            {localDescription || "Input your tagline text here."}
          </p>
          <div className="flex gap-1.5 mt-2">
            <div className={`px-2 py-0.5 rounded text-[6px] font-bold border ${isLight ? "bg-white border-stone-200 text-stone-600" : "bg-stone-900 border-stone-800 text-stone-300"}`}>GITHUB</div>
            <div className={`px-2 py-0.5 rounded text-[6px] font-bold border ${isLight ? "bg-white border-stone-200 text-stone-600" : "bg-stone-900 border-stone-800 text-stone-300"}`}>LINKEDIN</div>
          </div>
        </div>
        {/* Right Terminal */}
        <div className="col-span-5 flex justify-center items-center h-full">
          <div className={`w-full aspect-[4/3] rounded-xl border p-2 flex flex-col gap-1 text-left ${
            isLight ? "bg-[#f1f5f9] border-[#e2e8f0]" : "bg-[#0b0f19] border-stone-900"
          }`}
          style={{
            boxShadow: `0 6px 16px rgba(0,0,0,0.15)`
          }}>
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 font-mono text-[5px] flex flex-col gap-0.5 text-stone-500 leading-normal mt-0.5">
              <div style={{ color: pickedColor }}>~/workspace $ npm run dev</div>
              <div className="text-stone-400 font-bold">✓ Dev listening...</div>
              <div>• active template-4</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTemplate5Mock = () => {
    return (
      <div className="grid grid-cols-12 h-full w-full items-center p-5 gap-4 select-none pointer-events-none">
        {/* Left info */}
        <div className="col-span-7 flex flex-col gap-0.5 text-left">
          <span className="text-[6.5px] font-bold uppercase tracking-wider font-mono" style={{ color: pickedColor }}>Hello, I am</span>
          <h1 className={`text-md font-black tracking-tight leading-none mt-0.5 ${isLight ? "text-stone-900" : "text-white"}`}>
            {localAbout.name || "JOHN DOE"}
          </h1>
          <div className="bg-stone-800 text-white text-[7px] font-bold px-1.5 py-0.5 rounded w-fit mt-1 uppercase tracking-widest">
            {localRoles[0] || "DEVELOPER"}
          </div>
          <p className={`text-[7px] leading-relaxed line-clamp-3 mt-1.5 ${isLight ? "text-stone-500" : "text-stone-400"}`}>
            {localDescription || "Input your tagline text here."}
          </p>
          <div 
            className="px-3.5 py-1 rounded-full text-[6.5px] font-bold text-white w-fit mt-2.5"
            style={{ backgroundColor: pickedColor, boxShadow: `0 4px 10px ${pickedColor}25` }}
          >
            Contact
          </div>
        </div>
        {/* Right Portrait */}
        <div className="col-span-5 flex justify-center items-center h-full">
          <div 
            className="w-20 h-20 rounded-full relative flex items-center justify-center shrink-0 border animate-pulse"
            style={{
              backgroundColor: `${pickedColor}08`,
              borderColor: `${pickedColor}12`,
              boxShadow: `0 0 16px ${pickedColor}05`
            }}
          >
            <div className={`w-[85%] h-[85%] rounded-full overflow-hidden border bg-stone-900 shrink-0 ${
              isLight ? "border-white" : "border-stone-950"
            }`}>
              {localAbout.avatarUrl ? (
                <img src={localAbout.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg font-black text-stone-500 flex items-center justify-center h-full">{(localAbout.name || "G").charAt(0)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTemplate6Mock = () => {
    return (
      <div className="flex flex-col h-full w-full select-none pointer-events-none">
        {/* Mini Header */}
        <div className="h-5 flex items-center justify-between px-6 shrink-0 mt-1">
          <div className="text-[9px] font-black tracking-tighter" style={{ color: pickedColor }}>G<span className="text-stone-400">.</span></div>
          <div className={`w-10 h-0.5 rounded-full ${isLight ? "bg-stone-200" : "bg-stone-850"}`} />
        </div>
        {/* Main Content */}
        <div className="flex-1 grid grid-cols-12 items-center px-6 pb-4 gap-4">
          <div className="col-span-7 flex flex-col gap-0.5 text-left">
            <h1 className={`text-md font-black tracking-tight leading-none ${isLight ? "text-stone-900" : "text-white"}`}>
              I<span style={{ color: pickedColor }}>'</span>m {localAbout.name || "James John"}<span style={{ color: pickedColor }}>.</span>
            </h1>
            <p className={`text-[7px] leading-relaxed line-clamp-3 mt-1.5 ${isLight ? "text-stone-500" : "text-stone-400"}`}>
              {localDescription || "Input your tagline text here."}
            </p>
            <div 
              className="px-2.5 py-1 rounded text-[6px] font-bold border w-fit mt-2 uppercase tracking-wider"
              style={{ borderColor: pickedColor, color: pickedColor }}
            >
              Check out my work!
            </div>
          </div>
          {/* Mock Code Box */}
          <div className="col-span-5 flex justify-center items-center">
            <div className={`w-full aspect-[4/3] rounded-xl border p-2 flex flex-col gap-1 text-left ${
              isLight ? "bg-[#f8fafc] border-[#e2e8f0]" : "bg-[#0b0f19] border-stone-850"
            }`}
            style={{
              boxShadow: `0 6px 16px rgba(0,0,0,0.1)`
            }}>
              <div className="flex gap-0.5">
                <div className="w-1 h-1 rounded-full bg-red-500/60" />
                <div className="w-1 h-1 rounded-full bg-yellow-500/60" />
                <div className="w-1 h-1 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 font-mono text-[4.5px] flex flex-col gap-0.5 text-stone-500 mt-1 leading-tight">
                <div><span className="text-sky-400">const</span> developer = {"{"}</div>
                <div className="pl-2">name: <span style={{ color: pickedColor }}>"{localAbout.name || "James"}"</span>,</div>
                <div className="pl-2">skills: [<span className="text-yellow-300">"React"</span>, <span className="text-yellow-300">"Node"</span>],</div>
                <div>{"};"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMockupPreview = () => {
    const renderMock = () => {
      if (selectedTemplate === "template-2") return renderTemplate2Mock();
      if (selectedTemplate === "template-3") return renderTemplate3Mock();
      if (selectedTemplate === "template-4") return renderTemplate4Mock();
      if (selectedTemplate === "template-5") return renderTemplate5Mock();
      if (selectedTemplate === "template-6") return renderTemplate6Mock();
      return renderTemplate1Mock();
    };

    return (
      <div 
        className="flex flex-col rounded-3xl border overflow-hidden shadow-2xl transition-all w-full select-none"
        style={{
          borderColor: isLight ? "#e2e8f0" : "rgba(255, 255, 255, 0.05)",
          boxShadow: isLight
            ? `0 16px 36px -12px rgba(0,0,0,0.1), 0 0 16px -2px ${pickedColor}10`
            : `0 24px 60px -10px rgba(0,0,0,0.6), 0 0 20px -2px ${pickedColor}15`,
        }}
      >
        {/* Mock Browser Header Bar */}
        <div 
          className="h-7 border-b flex items-center justify-between px-4 select-none shrink-0"
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
            Live Template Preview: {selectedTemplate.toUpperCase()}
          </div>
          <div 
            className="text-[6.5px] font-extrabold uppercase px-2 py-0.5 rounded"
            style={{
              backgroundColor: isLight ? "#e2e8f0" : "rgba(255, 255, 255, 0.04)",
              color: isLight ? "#475569" : "#94a3b8"
            }}
          >
            {localThemeMode.toUpperCase()} MODE
          </div>
        </div>

        {/* Mock Browser Canvas */}
        <div 
          className="w-full relative overflow-hidden transition-all duration-300"
          style={{
            height: "220px",
            backgroundColor: isLight ? "#f8fafc" : "#060b13",
          }}
        >
          {renderMock()}
        </div>

        <style>{`
          @keyframes spinOrbit {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spinCounter {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
          .animate-spin-slow {
            animation: spinOrbit 40s linear infinite;
          }
          .animate-spin-counter {
            animation: spinCounter 40s linear infinite;
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {!isConfiguring ? (
        <>
          {renderSectionVisibilityBanner("Home")}

          {/* Portfolio Layout Template Selection Grid */}
          <TabCardWrapper title="Portfolio Layout Template" subtitle="Select a design layout template for your portfolio.">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {TEMPLATES.map((tpl) => {
                const isActive = selectedTemplate === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => {
                      setLocalSelectedTemplate(tpl.id);
                      setIsConfiguring(true);
                    }}
                    className="group relative flex flex-col rounded-2xl overflow-hidden border border-stone-900 bg-stone-950 hover:border-stone-800 text-left transition-all duration-300 cursor-pointer focus:outline-none w-full"
                    style={{
                      borderColor: isActive ? pickedColor : undefined,
                      backgroundColor: isActive
                        ? `${pickedColor}12`
                        : undefined,
                      boxShadow: isActive ? `0 0 14px ${pickedColor}30` : "none",
                    }}
                  >
                    {/* Image */}
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                      <img src={tpl.image} alt={tpl.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-stone-950/80 to-transparent" />
                      {isActive && (
                        <span className="absolute top-2 right-2 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider text-black"
                          style={{ backgroundColor: pickedColor }}>
                          Active
                        </span>
                      )}
                    </div>
                    {/* Body */}
                    <div className="p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[7px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded-full border inline-block"
                          style={{
                            color: isActive ? pickedColor : "rgba(255,255,255,0.4)",
                            borderColor: isActive ? `${pickedColor}30` : "rgba(255,255,255,0.06)",
                            backgroundColor: isActive ? `${pickedColor}08` : "transparent",
                          }}>
                          {tpl.badge}
                        </span>
                      </div>
                      <p className="text-xs font-black text-white truncate">{tpl.title}</p>
                      <p className="text-[9px] font-medium leading-relaxed text-stone-500 line-clamp-1 mt-0.5">{tpl.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </TabCardWrapper>
        </>
      ) : (
        <>
          {/* Configuration View Header and Back Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-900/60 pb-5 mb-6">
            <button
              type="button"
              onClick={() => setIsConfiguring(false)}
              className="flex items-center gap-2 text-stone-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-all bg-stone-900/50 border border-stone-850 hover:border-stone-700 px-4 py-2.5 rounded-xl cursor-pointer w-fit"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Templates</span>
            </button>
            <div className="text-left sm:text-right shrink-0">
              <span className="text-[9px] font-bold uppercase tracking-widest text-stone-500 block">Active Layout</span>
              <span className="text-xs font-black text-white block mt-0.5" style={{ color: pickedColor }}>
                {TEMPLATES.find(t => t.id === selectedTemplate)?.title || "Selected Template"}
              </span>
            </div>
          </div>

          {/* Dynamic Visual Mockup Preview */}
          {renderMockupPreview()}

          {/* Hero Identity Details */}
          <TabCardWrapper title="Hero Identity Details" subtitle="Main headline titles and taglines for the active layout">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Hero Display Name (Main Title)"
                value={localAbout.name}
                onChange={(val) => updateAbout("name", val)}
                placeholder="Your Name (e.g. Ganapathy Natarajan)"
                colSpan="col-span-1"
              />

              {hasAvailabilityBadge && (
                <FormField
                  label="Availability Status Badge Text"
                  value={localAbout.statusBadgeText}
                  onChange={(val) => updateAbout("statusBadgeText", val)}
                  placeholder="e.g. Available for Work"
                  colSpan="col-span-1"
                />
              )}

              {/* Profile Image (Avatar) - Templates 2 & 5 only */}
              {hasAvatarUpload && (
                <div className="col-span-1 sm:col-span-2 space-y-3 mt-2">
                  <FileUpload
                    accept="image/*"
                    onUpload={(result) => updateAbout("avatarUrl", result)}
                    fileName={localAbout.avatarUrl ? "Custom portrait uploaded" : ""}
                    buttonText="Profile Image (Avatar)"
                    colSpan="col-span-2"
                  />
                  {localAbout.avatarUrl && (
                    <div className="flex items-center gap-3 bg-stone-900/20 p-3 rounded-xl border border-stone-900">
                      <div className="relative w-10 h-10 border border-stone-800 rounded-full overflow-hidden bg-stone-900 shrink-0">
                        <img src={localAbout.avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[9px] text-stone-400 font-mono">Custom avatar active for home page display</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateAbout("avatarUrl", "")}
                        className="text-[9px] font-bold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                      >
                        Reset to Default
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Typewriter list */}
            {hasTypewriterRoles && (
              <div className="flex flex-col gap-2.5 mt-2">
                <div className="flex flex-col gap-0.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500">
                    Typewriter Roles (Cycled in Hero Title)
                  </label>
                  {isTemplate4Or5 && (
                    <p className="text-[8.5px] font-semibold text-amber-500">
                      💡 Note: This layout template only displays the 1st role in this list ({localRoles[0] || "None"}).
                    </p>
                  )}
                </div>
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
            )}

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
          {selectedTemplate === "template-1" && (
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
          )}

          {/* Orbiting Stacks */}
          {selectedTemplate === "template-1" && (
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
                          className="w-full bg-stone-900/50 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-3 py-2 text-white font-semibold transition-all focus:ring-1 focus:ring-primary/20"
                        />
                        <select
                          value={stack.type}
                          onChange={(e) => {
                            const copy = [...localOrbitingStacks];
                            if (!copy[idx]) copy[idx] = { label: "", type: "primary" };
                            copy[idx] = { ...copy[idx], type: e.target.value };
                            setLocalOrbitingStacks(copy);
                          }}
                          className="w-full bg-stone-900/50 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-3.5 py-2 text-white font-semibold cursor-pointer transition-all"
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
          )}
        </>
      )}
    </div>
  );
}
