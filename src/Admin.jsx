import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { injectPrimaryColor, looksLikeSvg } from "./utils/svg";
import {
  FiArrowLeft,
  FiCheck,
  FiSave,
  FiRefreshCw,
  FiSliders,
  FiType,
  FiCode,
  FiGrid,
  FiCompass,
  FiInfo,
  FiLayers,
  FiUser,
  FiLink,
  FiPlusCircle,
  FiTrash2,
  FiBarChart2,
} from "react-icons/fi";
import Particles from "./common/Particles";
import DecryptedText from "./common/DecryptedText";

const COLOR_SWATCHES = [
  { name: "Cyan Spark", value: "#00D5D5" },
  { name: "Purple Neon", value: "#a855f7" },
  { name: "Rose Glow", value: "#f43f5e" },
  { name: "Emerald Cyber", value: "#10b981" },
  { name: "Amber Fusion", value: "#f59e0b" },
];

const DEFAULT_ABOUT = {
  name: "Ganapathy N",
  title: "Senior Frontend & Full Stack Developer",
  bio: "Senior Frontend & Full Stack Developer with 6+ years of experience specializing in React.js, Next.js, React Native, TypeScript, and modern JavaScript ecosystems.",
  professionalTitles: [
    "Senior Frontend Developer",
    "Senior Full Stack Developer",
    "React & Next.js Specialist",
  ],
  stats: [
    { value: "6+", label: "Years Exp" },
    { value: "10+", label: "Certificates" },
    { value: "12+", label: "Projects" },
  ],
  highlights: [
    { label: "Specialization", value: "React · Next.js · React Native" },
    { label: "Cloud", value: "AWS · Serverless · DevOps" },
    { label: "Location", value: "India · Remote Ready" },
  ],
  socialLinks: [
    { href: "https://www.linkedin.com/in/gananata/", icon: "FaLinkedinIn", label: "LinkedIn" },
    { href: "https://github.com/ganapathy214", icon: "FaGithub", label: "Github" },
  ],
  resumeFileName: "Ganapathy_N_Resume.pdf",
};

export default function Admin({
  primaryColor,
  setPrimaryColor,
  roles,
  setRoles,
  description,
  setDescription,
  centerSvg,
  setCenterSvg,
  orbitingStacks,
  setOrbitingStacks,
  about,
  setAbout,
}) {
  const [pickedColor, setPickedColor] = useState(primaryColor || "#00D5D5");
  const [localRoles, setLocalRoles] = useState(roles || []);
  const [localDescription, setLocalDescription] = useState(description || "");
  const [localCenterSvg, setLocalCenterSvg] = useState(centerSvg || "");
  const [localOrbitingStacks, setLocalOrbitingStacks] = useState(orbitingStacks || []);
  const [localAbout, setLocalAbout] = useState({ ...DEFAULT_ABOUT, ...(about || {}) });

  const [activeTab, setActiveTab] = useState("theme");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error'
  const [svgColorInjected, setSvgColorInjected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (primaryColor) setPickedColor(primaryColor);
    if (roles) setLocalRoles(roles);
    if (description) setLocalDescription(description);
    if (centerSvg) setLocalCenterSvg(centerSvg);
    if (orbitingStacks) setLocalOrbitingStacks(orbitingStacks);
    if (about) setLocalAbout({ ...DEFAULT_ABOUT, ...about });
  }, [primaryColor, roles, description, centerSvg, orbitingStacks, about]);

  // Handle local preview
  const handleColorChange = (color) => {
    setPickedColor(color);
    // Apply immediately to the DOM for live preview
    document.documentElement.style.setProperty("--primary", color);
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      document.documentElement.style.setProperty("--primary-rgb", `${r}, ${g}, ${b}`);
    }
  };

  // Helper: update a nested about field
  const updateAbout = (field, value) => {
    setLocalAbout((prev) => ({ ...prev, [field]: value }));
  };
  const updateAboutStat = (idx, key, value) => {
    const copy = [...localAbout.stats];
    copy[idx] = { ...copy[idx], [key]: value };
    updateAbout("stats", copy);
  };
  const updateAboutHighlight = (idx, key, value) => {
    const copy = [...localAbout.highlights];
    copy[idx] = { ...copy[idx], [key]: value };
    updateAbout("highlights", copy);
  };
  const updateAboutSocialLink = (idx, key, value) => {
    const copy = [...localAbout.socialLinks];
    copy[idx] = { ...copy[idx], [key]: value };
    updateAbout("socialLinks", copy);
  };
  const updateAboutTitle = (idx, value) => {
    const copy = [...localAbout.professionalTitles];
    copy[idx] = value;
    updateAbout("professionalTitles", copy);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setSaveStatus(null);

    // Validate hex format
    if (!/^#[0-9A-F]{6}$/i.test(pickedColor)) {
      setSaveStatus("error");
      setIsSaving(false);
      return;
    }

    // Inject primary color into SVG before saving
    const processedSvg = looksLikeSvg(localCenterSvg)
      ? injectPrimaryColor(localCenterSvg)
      : localCenterSvg;

    const payload = {
      primaryColor: pickedColor,
      roles: localRoles,
      description: localDescription,
      centerSvg: processedSvg,
      orbitingStacks: localOrbitingStacks,
      about: localAbout,
    };

    try {
      const isDev = import.meta.env.DEV;
      const apiUrl = isDev ? "/api/theme" : `${import.meta.env.BASE_URL}api/theme`;

      let responseSuccess = false;

      if (isDev) {
        // Try calling the Vite development API middleware
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          responseSuccess = true;
        }
      }

      // Save to local storage fallbacks
      localStorage.setItem("portfolio_theme_color", pickedColor);
      localStorage.setItem("portfolio_roles", JSON.stringify(localRoles));
      localStorage.setItem("portfolio_description", localDescription);
      localStorage.setItem("portfolio_center_svg", processedSvg);
      localStorage.setItem("portfolio_orbiting_stacks", JSON.stringify(localOrbitingStacks));
      localStorage.setItem("portfolio_about", JSON.stringify(localAbout));

      // Update global states
      setPrimaryColor(pickedColor);
      setRoles(localRoles);
      setDescription(localDescription);
      setCenterSvg(processedSvg);
      setLocalCenterSvg(processedSvg); // reflect injection in textarea
      setOrbitingStacks(localOrbitingStacks);
      setAbout(localAbout);

      // If we are in dev, check the API result
      if (!isDev || responseSuccess) {
        setSaveStatus("success");
      } else {
        setSaveStatus("error");
      }
    } catch (err) {
      console.error("Failed to save theme settings:", err);
      // Fallback local storage save on network error
      localStorage.setItem("portfolio_theme_color", pickedColor);
      localStorage.setItem("portfolio_roles", JSON.stringify(localRoles));
      localStorage.setItem("portfolio_description", localDescription);
      localStorage.setItem("portfolio_center_svg", processedSvg);
      localStorage.setItem("portfolio_orbiting_stacks", JSON.stringify(localOrbitingStacks));
      localStorage.setItem("portfolio_about", JSON.stringify(localAbout));

      setPrimaryColor(pickedColor);
      setRoles(localRoles);
      setDescription(localDescription);
      setCenterSvg(processedSvg);
      setLocalCenterSvg(processedSvg);
      setOrbitingStacks(localOrbitingStacks);
      setAbout(localAbout);
      setSaveStatus("success");
    } finally {
      setIsSaving(false);
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }
  };

  const resetToDefault = () => {
    handleColorChange("#00D5D5");
    setLocalRoles([
      "Senior Software Developer",
      "Full-Stack Engineer",
      "Cloud Architect",
      "Mobile App Developer",
      "System Designer"
    ]);
    setLocalDescription(
      "Designing and engineering high-performance web systems, cross-platform mobile apps, and scalable serverless cloud architectures with 6+ years of expertise."
    );
    setLocalCenterSvg("");
    setLocalOrbitingStacks([
      { label: "React Native", type: "primary" },
      { label: "React.js", type: "primary" },
      { label: "Node.js", type: "outline" },
      { label: "Next.js", type: "primary" },
      { label: "AWS Cloud", type: "primary" },
      { label: "TypeScript", type: "outline" }
    ]);
    setLocalAbout(DEFAULT_ABOUT);
  };

  // Nav tabs definition
  const tabs = [
    { id: "theme", label: "Theme & Colors", icon: FiSliders },
    { id: "home", label: "Home Section", icon: FiType },
    { id: "about", label: "About Section", icon: FiUser },
    { id: "svg", label: "Graphic SVG Editor", icon: FiCode },
    { id: "orbit", label: "Orbiting Stacks", icon: FiGrid },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#000000] text-[#FFFFFF] px-4 py-8 overflow-hidden font-sans">
      {/* Background Particles */}
      <div className="fixed inset-0 w-full h-full -z-10" style={{ backgroundColor: "#000000" }}>
        <Particles
          particleColors={[pickedColor, "#FFFFFF"]}
          particleCount={60}
          particleSpread={10}
          speed={0.03}
          particleBaseSize={60}
          alphaParticles={true}
          style={{ width: "100%", height: "100%", opacity: 0.15 }}
        />
      </div>

      {/* Main Glass Dashboard Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl glass-panel rounded-3xl relative z-10 border border-primary/10 shadow-2xl flex flex-col md:flex-row overflow-hidden"
        style={{
          borderColor: `rgba(var(--primary-rgb), 0.15)`,
          boxShadow: `0 30px 70px -20px rgba(var(--primary-rgb), 0.18)`,
        }}
      >
        {/* SIDEBAR NAVIGATION PANEL */}
        <div className="w-full md:w-[280px] bg-stone-950/90 border-b md:border-b-0 md:border-r border-stone-900/60 p-6 flex flex-col justify-between shrink-0 select-none">
          <div className="flex flex-col gap-6">
            {/* Logo/Brand Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiCompass className="text-xl" style={{ color: pickedColor }} />
                <span className="font-mono text-xs uppercase font-extrabold tracking-[0.2em] text-white">
                  Developer Console
                </span>
              </div>
              <span className="text-[9px] text-stone-500 font-bold uppercase tracking-widest block font-mono">
                System Version 1.2.0
              </span>
            </div>

            {/* Nav Tabs */}
            <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible gap-1 pb-3 md:pb-0 scrollbar-none">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer text-left w-full border ${
                      isActive
                        ? "text-black bg-primary border-transparent"
                        : "text-stone-400 bg-transparent border-transparent hover:bg-stone-900 hover:text-white"
                    }`}
                    style={isActive ? { boxShadow: `0 4px 16px rgba(var(--primary-rgb), 0.3)` } : {}}
                  >
                    <IconComponent className="text-base shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User Profile or Branding Footer */}
          <div className="hidden md:flex items-center gap-3 border-t border-stone-900 pt-5 mt-5">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-stone-400 hover:text-white transition-colors duration-200 w-full py-2 bg-stone-900/50 border border-stone-800 rounded-xl hover:border-primary/20"
            >
              <FiArrowLeft className="text-xs" /> Back to App
            </Link>
          </div>
        </div>

        {/* SETTINGS CONTENT CONTAINER PANEL */}
        <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 md:p-10 relative">
          <form onSubmit={handleSave} className="flex-1 flex flex-col justify-between gap-6">
            {/* Header info bar */}
            <div className="flex items-center justify-between border-b border-stone-900 pb-4 select-none">
              <div className="text-left">
                <span className="text-[9px] font-bold uppercase tracking-widest text-primary font-mono">
                  Module Configuration
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {tabs.find((t) => t.id === activeTab)?.label}
                </h3>
              </div>
              <div className="md:hidden">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-stone-400 hover:text-white transition-colors"
                >
                  <FiArrowLeft /> Back
                </Link>
              </div>
            </div>

            {/* Scrollable Form Settings Fields */}
            <div className="flex-1 overflow-y-auto max-h-[55vh] pr-2 scrollbar-thin text-left mt-2 space-y-6">

              {/* ══════════════════ TAB 1: THEME ══════════════════ */}
              {activeTab === "theme" && (
                <div className="space-y-6 animate-fadeIn">
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
                          className="w-full bg-transparent border-b border-stone-800 focus:border-primary outline-none text-base font-mono tracking-wider py-1 uppercase text-white font-bold"
                          style={{ borderBottomColor: pickedColor }}
                        />
                        <span className="text-[9px] text-stone-500 font-semibold block mt-1.5 leading-normal">
                          Choose any hex accent. Colors, halos, and animations will render unified in your portfolio.
                        </span>
                      </div>
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
                          Ganapathy Natarajan
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ══════════════════ TAB 2: HOME SECTION ══════════════════ */}
              {activeTab === "home" && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Typewriter list */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-4 rounded-full" style={{ backgroundColor: pickedColor }} />
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">Typewriter Roles</span>
                      <span className="text-[9px] text-stone-500 font-mono ml-auto">Homepage titles cycled in the hero</span>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {[0, 1, 2, 3, 4].map((idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-stone-950 border border-stone-900 rounded-xl px-4 py-2">
                          <span className="font-mono text-[9px] font-extrabold text-stone-500">#{idx + 1}</span>
                          <input
                            type="text"
                            value={localRoles[idx] || ""}
                            onChange={(e) => {
                              const copy = [...localRoles];
                              copy[idx] = e.target.value;
                              setLocalRoles(copy);
                            }}
                            placeholder={`Role Title #${idx + 1}`}
                            className="flex-1 bg-transparent border-0 outline-none text-xs text-white font-semibold"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subheadline description */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1 h-4 rounded-full" style={{ backgroundColor: pickedColor }} />
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">Sub-Headline Description</span>
                      <span className="text-[9px] font-mono font-bold text-stone-500 ml-auto">
                        {localDescription.length} / 280
                      </span>
                    </div>
                    <textarea
                      value={localDescription}
                      onChange={(e) => setLocalDescription(e.target.value.slice(0, 280))}
                      rows={3}
                      placeholder="Input the introductory tagline text on your homepage."
                      className="w-full bg-stone-950 border border-stone-900 focus:border-primary outline-none text-xs rounded-xl px-4 py-3 text-white font-medium leading-relaxed resize-none"
                    />
                  </div>
                </div>
              )}

              {/* ══════════════════ TAB 3: ABOUT SECTION ══════════════════ */}
              {activeTab === "about" && (
                <div className="space-y-8 animate-fadeIn">

                  {/* ── Sub-section: Profile Identity ── */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-4 rounded-full" style={{ backgroundColor: pickedColor }} />
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">Profile Identity</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500">Display Name</label>
                        <input
                          type="text"
                          value={localAbout.name || ""}
                          onChange={(e) => updateAbout("name", e.target.value)}
                          placeholder="Your Name"
                          className="bg-stone-950 border border-stone-900 focus:border-primary outline-none text-xs rounded-xl px-4 py-2.5 text-white font-semibold"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500">Card Sub-Title</label>
                        <input
                          type="text"
                          value={localAbout.title || ""}
                          onChange={(e) => updateAbout("title", e.target.value)}
                          placeholder="Your Job Title"
                          className="bg-stone-950 border border-stone-900 focus:border-primary outline-none text-xs rounded-xl px-4 py-2.5 text-white font-semibold"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500">Resume File Name</label>
                      <input
                        type="text"
                        value={localAbout.resumeFileName || ""}
                        onChange={(e) => updateAbout("resumeFileName", e.target.value)}
                        placeholder="Your_Name_Resume.pdf"
                        className="bg-stone-950 border border-stone-900 focus:border-primary outline-none text-xs rounded-xl px-4 py-2.5 text-white font-semibold"
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-stone-900" />

                  {/* ── Sub-section: Typewriter Titles ── */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-4 rounded-full" style={{ backgroundColor: pickedColor }} />
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">Typewriter Titles</span>
                      <span className="text-[9px] text-stone-500 font-mono ml-auto">Animated on About bio heading</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {[0, 1, 2].map((idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-stone-950 border border-stone-900 rounded-xl px-4 py-2">
                          <span className="font-mono text-[9px] font-extrabold text-stone-500">#{idx + 1}</span>
                          <input
                            type="text"
                            value={(localAbout.professionalTitles || [])[idx] || ""}
                            onChange={(e) => updateAboutTitle(idx, e.target.value)}
                            placeholder={`Title #${idx + 1}`}
                            className="flex-1 bg-transparent border-0 outline-none text-xs text-white font-semibold"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-stone-900" />

                  {/* ── Sub-section: Biography ── */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-4 rounded-full" style={{ backgroundColor: pickedColor }} />
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">Biography Paragraph</span>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-stone-500">
                        {(localAbout.bio || "").length} chars
                      </span>
                    </div>
                    <textarea
                      value={localAbout.bio || ""}
                      onChange={(e) => updateAbout("bio", e.target.value)}
                      rows={4}
                      placeholder="Write your professional biography here..."
                      className="w-full bg-stone-950 border border-stone-900 focus:border-primary outline-none text-xs rounded-xl px-4 py-3 text-white font-medium leading-relaxed resize-none"
                    />
                  </div>

                  {/* Divider */}
                  <div className="border-t border-stone-900" />

                  {/* ── Sub-section: Stat Cards ── */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-4 rounded-full" style={{ backgroundColor: pickedColor }} />
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">Achievement Stats</span>
                      <span className="text-[9px] text-stone-500 font-mono ml-auto">3 metric cards on About</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[0, 1, 2].map((idx) => {
                        const stat = (localAbout.stats || [])[idx] || { value: "", label: "" };
                        return (
                          <div key={idx} className="flex flex-col gap-2 bg-stone-950 border border-stone-900 rounded-2xl p-3">
                            <span className="text-[8px] font-extrabold font-mono text-stone-500">STAT #{idx + 1}</span>
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => updateAboutStat(idx, "value", e.target.value)}
                              placeholder="e.g. 6+"
                              className="bg-stone-900/50 border border-stone-800 focus:border-primary outline-none text-sm font-black rounded-lg px-3 py-1.5 text-white text-center"
                              style={{ color: pickedColor }}
                            />
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => updateAboutStat(idx, "label", e.target.value)}
                              placeholder="e.g. Years Exp"
                              className="bg-stone-900/50 border border-stone-800 focus:border-primary outline-none text-[9px] font-bold rounded-lg px-3 py-1.5 text-stone-400 uppercase tracking-wider text-center"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-stone-900" />

                  {/* ── Sub-section: Spec / Highlights Table ── */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-4 rounded-full" style={{ backgroundColor: pickedColor }} />
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">Highlight Specs</span>
                      <span className="text-[9px] text-stone-500 font-mono ml-auto">Key-value rows on profile card</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {[0, 1, 2].map((idx) => {
                        const h = (localAbout.highlights || [])[idx] || { label: "", value: "" };
                        return (
                          <div key={idx} className="flex items-center gap-3 bg-stone-950 border border-stone-900 rounded-xl px-3 py-2">
                            <span className="font-mono text-[8px] font-extrabold text-stone-600">#{idx + 1}</span>
                            <input
                              type="text"
                              value={h.label}
                              onChange={(e) => updateAboutHighlight(idx, "label", e.target.value)}
                              placeholder="Label (e.g. Cloud)"
                              className="w-32 bg-transparent border-0 border-r border-stone-800 outline-none text-[10px] text-stone-400 font-bold uppercase tracking-wider pr-3"
                            />
                            <input
                              type="text"
                              value={h.value}
                              onChange={(e) => updateAboutHighlight(idx, "value", e.target.value)}
                              placeholder="Value (e.g. AWS · Serverless)"
                              className="flex-1 bg-transparent border-0 outline-none text-xs text-white font-semibold"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-stone-900" />

                  {/* ── Sub-section: Social Links ── */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-4 rounded-full" style={{ backgroundColor: pickedColor }} />
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">Social Links</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      {(localAbout.socialLinks || []).map((link, idx) => (
                        <div key={idx} className="flex flex-col gap-2 bg-stone-950 border border-stone-900 rounded-2xl p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] font-extrabold font-mono text-stone-500">LINK #{idx + 1}</span>
                            <select
                              value={link.icon || "FaLinkedinIn"}
                              onChange={(e) => updateAboutSocialLink(idx, "icon", e.target.value)}
                              className="bg-stone-900 border border-stone-800 outline-none text-[9px] rounded-lg px-2 py-1 text-stone-300 cursor-pointer"
                            >
                              <option value="FaLinkedinIn">LinkedIn</option>
                              <option value="FaGithub">GitHub</option>
                            </select>
                          </div>
                          <input
                            type="text"
                            value={link.label || ""}
                            onChange={(e) => updateAboutSocialLink(idx, "label", e.target.value)}
                            placeholder="Label (e.g. LinkedIn)"
                            className="bg-stone-900/50 border border-stone-800 focus:border-primary outline-none text-xs rounded-lg px-3 py-2 text-white font-semibold"
                          />
                          <input
                            type="url"
                            value={link.href || ""}
                            onChange={(e) => updateAboutSocialLink(idx, "href", e.target.value)}
                            placeholder="https://..."
                            className="bg-stone-900/50 border border-stone-800 focus:border-primary outline-none text-xs rounded-lg px-3 py-2 text-stone-300 font-mono"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ══════════════════ TAB 4: SVG EDITOR ══════════════════ */}
              {activeTab === "svg" && (
                <div className="space-y-6 animate-fadeIn">
                  {/* SVG Codearea */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        Raw SVG Code String
                      </label>
                      {svgColorInjected && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg"
                          style={{ backgroundColor: `${pickedColor}20`, color: pickedColor }}
                        >
                          ✓ Colors auto-themed
                        </motion.span>
                      )}
                    </div>
                    <textarea
                      value={localCenterSvg}
                      onChange={(e) => {
                        const raw = e.target.value;
                        setLocalCenterSvg(raw);
                        // Auto-inject on change if it looks like SVG
                        if (looksLikeSvg(raw)) {
                          const injected = injectPrimaryColor(raw);
                          if (injected !== raw) {
                            setSvgColorInjected(true);
                          } else {
                            setSvgColorInjected(false);
                          }
                        } else {
                          setSvgColorInjected(false);
                        }
                      }}
                      onBlur={(e) => {
                        // On blur, actually apply the injection to the textarea content
                        const raw = e.target.value;
                        if (looksLikeSvg(raw)) {
                          const injected = injectPrimaryColor(raw);
                          if (injected !== raw) {
                            setLocalCenterSvg(injected);
                            setSvgColorInjected(true);
                          }
                        }
                      }}
                      rows={6}
                      placeholder="Paste raw SVG string here (e.g. <svg>...</svg>)"
                      className="w-full bg-stone-950 border border-stone-900 focus:border-primary outline-none text-xs font-mono rounded-xl px-4 py-3 text-stone-300 resize-none whitespace-pre"
                    />
                    <div className="flex items-start gap-2 text-stone-500 leading-normal">
                      <FiInfo className="text-xs mt-0.5 shrink-0" style={{ color: pickedColor }} />
                      <span className="text-[8px] font-semibold">
                        Paste any SVG — fill and stroke colors will be <strong style={{ color: pickedColor }}>automatically replaced</strong> with your accent color when you click away or save.
                      </span>
                    </div>
                  </div>

                  {/* SVG Live Preview */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Code Validation Live Preview
                    </label>
                    <div className="w-full min-h-[140px] bg-stone-950 border border-stone-900 rounded-2xl flex items-center justify-center relative p-6">
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
              )}

              {/* ══════════════════ TAB 5: ORBITING STACKS ══════════════════ */}
              {activeTab === "orbit" && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-start gap-2.5 text-stone-500 leading-normal mb-1">
                    <FiLayers className="text-xs mt-0.5 shrink-0" style={{ color: pickedColor }} />
                    <span className="text-[9.5px] font-semibold">
                      Configure the 6 circular orbital chips displayed on the main home landing screen layout.
                    </span>
                  </div>

                  {/* Slots Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                              className="w-full bg-stone-900/50 border border-stone-800 focus:border-primary outline-none text-xs rounded-xl px-3 py-2 text-white font-semibold"
                            />
                            <select
                              value={stack.type}
                              onChange={(e) => {
                                const copy = [...localOrbitingStacks];
                                if (!copy[idx]) copy[idx] = { label: "", type: "primary" };
                                copy[idx] = { ...copy[idx], type: e.target.value };
                                setLocalOrbitingStacks(copy);
                              }}
                              className="w-full bg-stone-900/50 border border-stone-800 focus:border-primary outline-none text-xs rounded-xl px-3.5 py-2 text-white font-semibold cursor-pointer"
                            >
                              <option value="primary">Accent Glow Color</option>
                              <option value="outline">Muted Border Outline</option>
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center gap-3 border-t border-stone-900 pt-5 mt-3 select-none">
              <button
                type="button"
                onClick={resetToDefault}
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl border border-stone-800 bg-transparent text-stone-300 text-xs font-bold transition-all hover:bg-stone-900 hover:text-white cursor-pointer"
              >
                <FiRefreshCw /> Reset
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-black text-xs font-bold transition-all disabled:opacity-60 cursor-pointer"
                style={{
                  backgroundColor: pickedColor,
                  boxShadow: `0 4px 20px rgba(var(--primary-rgb), 0.35)`,
                }}
              >
                {isSaving ? (
                  <>Saving settings...</>
                ) : (
                  <>
                    <FiSave className="text-sm" /> Save Settings
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Floating Save Status Notifications */}
      <AnimatePresence>
        {saveStatus && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 right-6 p-4 rounded-2xl border flex items-center gap-2.5 text-xs font-bold shadow-2xl backdrop-blur-md z-50 select-none max-w-sm"
            style={{
              backgroundColor: saveStatus === "success" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
              borderColor: saveStatus === "success" ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)",
              color: saveStatus === "success" ? "#10B981" : "#EF4444",
            }}
          >
            {saveStatus === "success" ? (
              <>
                <FiCheck className="text-base shrink-0" />
                <span>Configuration saved successfully to db.json!</span>
              </>
            ) : (
              <>
                <span className="text-base shrink-0">!</span>
                <span>Failed to save configurations. Please verify inputs.</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
