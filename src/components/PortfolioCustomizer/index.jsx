import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiLayout, FiGrid, FiChevronRight } from "react-icons/fi";
import { usePortfolio } from "../../context/PortfolioContext";

/* ─── Template Preview Images ─── */
const TEMPLATES = [
  { id: "template-1", badge: "Sidebar",    title: "Modern Sidebar",  desc: "Left-docked animated navigation.",          image: "/portfolio/templates/template1.png" },
  { id: "template-2", badge: "Sidebar",    title: "Classic Sidebar", desc: "Avatar + detailed profile sidebar.",         image: "/portfolio/templates/template2.png" },
  { id: "template-3", badge: "Top Nav",    title: "Modern Topnav",   desc: "Clean top navbar with card grids.",          image: "/portfolio/templates/template3.png" },
  { id: "template-4", badge: "Dev Style",  title: "Dev Marquee",     desc: "Neon borders and scrolling ticker.",         image: "/portfolio/templates/template4.png" },
  { id: "template-5", badge: "Portrait",   title: "John Doe",        desc: "Circular portrait with metric badges.",      image: "/portfolio/templates/template5.png" },
  { id: "template-6", badge: "Network",    title: "Anurag Core",     desc: "Skill nodes network + staggered cards.",     image: "/portfolio/templates/template6.png" },
];

/* ─── Section Layout Definitions ─── */
const SECTION_LAYOUTS = {
  Projects: [
    { id: "card-row",  label: "Card Row",      icon: "▬▬", desc: "Horizontal detailed cards (default)" },
    { id: "masonry",   label: "Masonry Grid",  icon: "⊞⊟", desc: "3-column image-first grid" },
    { id: "table",     label: "Table List",    icon: "☰",   desc: "Compact table with links" },
    { id: "featured",  label: "Featured",      icon: "◈",   desc: "Hero spotlight + thumbnail strip" },
  ],
  Skills: [
    { id: "icon-grid",       label: "Icon Grid",       icon: "⊞", desc: "Tech icons + category bullets (default)" },
    { id: "progress-bars",   label: "Progress Bars",   icon: "▰▰", desc: "Named skill bars with percentages" },
    { id: "tag-cloud",       label: "Tag Cloud",       icon: "○○", desc: "Pill tags grouped by category" },
    { id: "category-cards",  label: "Category Cards",  icon: "▣",  desc: "Cards per category with icons" },
  ],
  Services: [
    { id: "icon-cards",    label: "Icon Cards",   icon: "▦", desc: "Grid of icon cards (default)" },
    { id: "horizontal",    label: "Horizontal",   icon: "▬", desc: "Numbered horizontal strip" },
    { id: "minimal-list",  label: "Minimal List", icon: "≡", desc: "Timeline-style minimal list" },
  ],
  Certification: [
    { id: "carousel", label: "Carousel",     icon: "◁▷", desc: "Auto-play card carousel (default)" },
    { id: "grid",     label: "Grid Cards",   icon: "⊞",  desc: "Static 3-column flip cards" },
    { id: "timeline", label: "Timeline",     icon: "▏",  desc: "Vertical timeline view" },
  ],
};

/* ─── Mini layout wireframe thumbnails ─── */
const LayoutThumbnail = ({ layoutId, section }) => {
  const wireframes = {
    // Projects
    "card-row":  () => <div className="flex flex-col gap-0.5">{[0,1,2].map(i => <div key={i} className="h-2 rounded bg-stone-700 w-full" />)}</div>,
    "masonry":   () => <div className="grid grid-cols-3 gap-0.5">{[0,1,2,3,4,5].map(i => <div key={i} className="h-3 rounded bg-stone-700" />)}</div>,
    "table":     () => <div className="flex flex-col gap-0.5">{[0,1,2,3].map(i => <div key={i} className="flex gap-1"><div className="w-2 h-1 rounded bg-stone-700 shrink-0"/><div className="flex-1 h-1 rounded bg-stone-700"/></div>)}</div>,
    "featured":  () => <div className="flex flex-col gap-1"><div className="h-6 rounded bg-stone-700 w-full" /><div className="flex gap-0.5">{[0,1,2].map(i=><div key={i} className="flex-1 h-3 rounded bg-stone-800" />)}</div></div>,
    // Skills
    "icon-grid": () => <div className="grid grid-cols-3 gap-0.5">{[0,1,2,3,4,5].map(i => <div key={i} className="aspect-square rounded bg-stone-700" />)}</div>,
    "progress-bars": () => <div className="flex flex-col gap-1">{[80,65,90,55].map((w,i) => <div key={i} className="flex items-center gap-1"><div className="flex-1 h-1 rounded bg-stone-800"><div className="h-full rounded bg-stone-600" style={{width:`${w}%`}}/></div></div>)}</div>,
    "tag-cloud": () => <div className="flex flex-wrap gap-0.5">{[0,1,2,3,4,5,6].map(i => <div key={i} className="h-2 rounded-full bg-stone-700" style={{width:`${20+i*8}px`}} />)}</div>,
    "category-cards": () => <div className="grid grid-cols-2 gap-0.5">{[0,1,2,3].map(i => <div key={i} className="h-4 rounded bg-stone-700" />)}</div>,
    // Services
    "icon-cards": () => <div className="grid grid-cols-2 gap-0.5">{[0,1,2,3].map(i => <div key={i} className="h-5 rounded bg-stone-700" />)}</div>,
    "horizontal": () => <div className="flex flex-col gap-0.5">{[0,1,2].map(i => <div key={i} className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-stone-600 shrink-0"/><div className="flex-1 h-1.5 rounded bg-stone-700"/></div>)}</div>,
    "minimal-list": () => <div className="flex gap-1"><div className="flex flex-col items-center gap-0.5">{[0,1,2].map(i=><div key={i} className="w-2 h-2 rounded-full bg-stone-600"/>)}</div><div className="flex flex-col gap-2">{[0,1,2].map(i=><div key={i} className="h-1.5 w-14 rounded bg-stone-700"/>)}</div></div>,
    // Certifications
    "carousel":  () => <div className="flex items-center gap-1"><div className="w-1 h-4 bg-stone-700 rounded-full shrink-0"/><div className="flex-1 h-6 bg-stone-700 rounded"/><div className="w-1 h-4 bg-stone-700 rounded-full shrink-0"/></div>,
    "grid":      () => <div className="grid grid-cols-3 gap-0.5">{[0,1,2].map(i=><div key={i} className="h-5 rounded bg-stone-700"/>)}</div>,
    "timeline":  () => <div className="flex gap-1"><div className="w-0.5 bg-stone-600 rounded-full self-stretch shrink-0"/><div className="flex flex-col gap-1.5">{[0,1,2].map(i=><div key={i} className="h-2 w-14 rounded bg-stone-700"/>)}</div></div>,
  };
  const WF = wireframes[layoutId];
  return WF ? <WF /> : <div className="h-6 bg-stone-800 rounded w-full" />;
};

/* ─── Main Customizer Panel ─── */
export default function PortfolioCustomizer({ isOpen, onClose }) {
  const { primaryColor, selectedTemplate, setSelectedTemplate, sectionLayouts, setSectionLayouts, themeMode } = usePortfolio();
  const [activeTab, setActiveTab] = useState("templates"); // "templates" | "sections"
  const [activeSection, setActiveSection] = useState("Projects");

  const handleTemplateSelect = useCallback((id) => {
    setSelectedTemplate(id);
    try { localStorage.setItem("portfolio_selected_template", id); } catch {}
  }, [setSelectedTemplate]);

  const handleLayoutSelect = useCallback((section, layoutId) => {
    setSectionLayouts(prev => {
      const next = { ...prev, [section]: layoutId };
      try { localStorage.setItem("portfolio_section_layouts", JSON.stringify(next)); } catch {}
      return next;
    });
  }, [setSectionLayouts]);

  const isDark = themeMode === "dark";
  const panelBg = isDark ? "rgba(9,9,11,0.97)" : "rgba(250,250,252,0.97)";
  const borderC = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const textPrimary = isDark ? "#fff" : "#111113";
  const textMuted = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }}
          />

          {/* Slide-in Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed top-0 right-0 h-full z-50 flex flex-col overflow-hidden"
            style={{
              width: "min(400px, 95vw)",
              background: panelBg,
              borderLeft: `1px solid ${borderC}`,
              boxShadow: "-12px 0 48px rgba(0,0,0,0.4)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 shrink-0" style={{ borderBottom: `1px solid ${borderC}` }}>
              <div>
                <h2 className="text-sm font-black" style={{ color: textPrimary }}>Customize</h2>
                <p className="text-[10px] font-medium mt-0.5" style={{ color: textMuted }}>
                  Templates & Section Layouts
                </p>
              </div>
              <button onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer"
                style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", color: textMuted }}
              >
                <FiX className="text-sm" />
              </button>
            </div>

            {/* Tab Bar */}
            <div className="flex shrink-0" style={{ borderBottom: `1px solid ${borderC}` }}>
              {[
                { id: "templates", label: "Templates", icon: FiLayout },
                { id: "sections",  label: "Sections",  icon: FiGrid },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-[11px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer relative"
                  style={{
                    color: activeTab === id ? primaryColor : textMuted,
                    background: "transparent",
                  }}
                >
                  <Icon className="text-xs" />
                  {label}
                  {activeTab === id && (
                    <motion.div layoutId="customizerTabBar"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: primaryColor }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>

              {/* ── TEMPLATES TAB ── */}
              {activeTab === "templates" && (
                <div className="p-4 flex flex-col gap-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>
                    Portfolio Layout Template
                  </p>
                  {TEMPLATES.map((tpl) => {
                    const isActive = selectedTemplate === tpl.id;
                    return (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => handleTemplateSelect(tpl.id)}
                        className="group relative flex flex-col rounded-2xl overflow-hidden border text-left transition-all duration-300 cursor-pointer focus:outline-none w-full"
                        style={{
                          borderColor: isActive ? primaryColor : borderC,
                          background: isActive
                            ? `linear-gradient(160deg, ${primaryColor}10 0%, ${panelBg} 60%)`
                            : panelBg,
                          boxShadow: isActive ? `0 0 0 2px ${primaryColor}35, 0 6px 20px ${primaryColor}15` : "none",
                        }}
                      >
                        {/* Image */}
                        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/8" }}>
                          <img src={tpl.image} alt={tpl.title}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                          />
                          <div className="absolute inset-0 pointer-events-none"
                            style={{ background: `linear-gradient(to bottom, transparent 30%, ${panelBg} 100%)` }} />
                          {isActive && (
                            <span className="absolute top-2 right-2 text-[9px] font-black px-2 py-0.5 rounded-full"
                              style={{ background: primaryColor, color: "#fff" }}>
                              ✓ Active
                            </span>
                          )}
                        </div>
                        {/* Body */}
                        <div className="flex items-center justify-between px-3 pb-3 pt-1 gap-2">
                          <div className="flex-1 min-w-0">
                            <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full border inline-block mb-1"
                              style={{
                                color: isActive ? primaryColor : textMuted,
                                borderColor: isActive ? `${primaryColor}40` : borderC,
                                background: isActive ? `${primaryColor}10` : "transparent",
                              }}>
                              {tpl.badge}
                            </span>
                            <p className="text-xs font-black truncate" style={{ color: textPrimary }}>{tpl.title}</p>
                            <p className="text-[9px] font-medium leading-relaxed line-clamp-1" style={{ color: textMuted }}>{tpl.desc}</p>
                          </div>
                          {isActive ? (
                            <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
                              style={{ background: primaryColor, color: "#fff" }}>✓</div>
                          ) : (
                            <FiChevronRight className="shrink-0 text-sm" style={{ color: textMuted }} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* ── SECTIONS TAB ── */}
              {activeTab === "sections" && (
                <div className="flex flex-col">
                  {/* Section selector */}
                  <div className="flex overflow-x-auto px-4 pt-4 pb-3 gap-2 shrink-0" style={{ scrollbarWidth: "none" }}>
                    {Object.keys(SECTION_LAYOUTS).map((sec) => {
                      const isActive = activeSection === sec;
                      return (
                        <button
                          key={sec}
                          onClick={() => setActiveSection(sec)}
                          className="shrink-0 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer"
                          style={{
                            background: isActive ? primaryColor : (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"),
                            color: isActive ? "#fff" : textMuted,
                            boxShadow: isActive ? `0 0 12px ${primaryColor}40` : "none",
                          }}
                        >
                          {sec}
                        </button>
                      );
                    })}
                  </div>

                  {/* Layout options */}
                  <div className="px-4 pb-4 flex flex-col gap-2">
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: textMuted }}>
                      {activeSection} Layout
                    </p>
                    {(SECTION_LAYOUTS[activeSection] || []).map((opt) => {
                      const isActive = (sectionLayouts?.[activeSection] || "") === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleLayoutSelect(activeSection, opt.id)}
                          className="group flex items-center gap-3 p-3 rounded-2xl border transition-all duration-200 cursor-pointer text-left focus:outline-none"
                          style={{
                            borderColor: isActive ? primaryColor : borderC,
                            background: isActive
                              ? `${primaryColor}10`
                              : (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"),
                            boxShadow: isActive ? `0 0 0 2px ${primaryColor}30` : "none",
                          }}
                        >
                          {/* Mini wireframe */}
                          <div className="w-16 h-12 rounded-lg flex items-center justify-center p-2 shrink-0"
                            style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", border: `1px solid ${borderC}` }}>
                            <div className="w-full">
                              <LayoutThumbnail layoutId={opt.id} section={activeSection} />
                            </div>
                          </div>
                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-black" style={{ color: isActive ? primaryColor : textPrimary }}>
                              {opt.label}
                            </p>
                            <p className="text-[9px] font-medium leading-relaxed" style={{ color: textMuted }}>
                              {opt.desc}
                            </p>
                          </div>
                          {/* Active indicator */}
                          {isActive && (
                            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] shrink-0"
                              style={{ background: primaryColor, color: "#fff" }}>✓</div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="px-5 py-3 shrink-0 text-center" style={{ borderTop: `1px solid ${borderC}` }}>
              <p className="text-[9px] font-medium" style={{ color: textMuted }}>
                Changes apply instantly • Go to{" "}
                <a href="/portfolio/settings" className="underline" style={{ color: primaryColor }}>Settings</a>
                {" "}to edit content
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
