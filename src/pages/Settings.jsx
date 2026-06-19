import React, { useState, useEffect, useRef, Suspense, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { injectPrimaryColor, looksLikeSvg } from "../utils/svg";
import {
  FiArrowLeft, FiCheck, FiSave, FiRefreshCw, FiSliders, FiType, FiCode,
  FiGrid, FiCompass, FiInfo, FiLayers, FiUser, FiLink, FiPlusCircle,
  FiTrash2, FiBarChart2, FiBriefcase, FiCpu, FiChevronUp, FiChevronDown,
  FiFolder, FiAward, FiActivity, FiMail, FiDownload, FiChevronLeft, FiMenu,
  FiEye, FiX, FiMonitor, FiTablet, FiSmartphone, FiMessageSquare,
  FiBookOpen, FiHelpCircle, FiLock, FiUpload, FiAlertTriangle,
} from "react-icons/fi";
import {
  SERVICES_DATA as DEFAULT_SERVICES_DATA,
  skills as DEFAULT_SKILLS,
  skillCategories as DEFAULT_SKILL_CATEGORIES,
  projects as DEFAULT_PROJECTS,
  certifications as DEFAULT_CERTIFICATIONS,
  timelineData as DEFAULT_TIMELINE_DATA,
  summaryStats as DEFAULT_SUMMARY_STATS,
  CONTACT_INFO as DEFAULT_CONTACT_INFO,
  PAGE_TITLES as defaultPageTitles,
  PAGE_DESCRIPTIONS as defaultPageDescriptions,
  DEFAULT_ABOUT,
  defaultTestimonials as DEFAULT_TESTIMONIALS,
  defaultBlogs as DEFAULT_BLOGS,
  defaultFaqs as DEFAULT_FAQS,
} from "../constants";
import Particles from "../components/common/Particles";
import { getContrastColor, getLightShade } from "../utils/color";
import { usePortfolio, applyThemeColor, saveAllToLocalStorage } from "../context/PortfolioContext";



const ThemeTab         = React.lazy(() => import("../components/Settings/tabs/ThemeTab"));
const HomeTab          = React.lazy(() => import("../components/Settings/tabs/HomeTab"));
const AboutTab         = React.lazy(() => import("../components/Settings/tabs/AboutTab"));
const ServicesTab      = React.lazy(() => import("../components/Settings/tabs/ServicesTab"));
const SkillsTab        = React.lazy(() => import("../components/Settings/tabs/SkillsTab"));
const ProjectsTab      = React.lazy(() => import("../components/Settings/tabs/ProjectsTab"));
const CertificationsTab = React.lazy(() => import("../components/Settings/tabs/CertificationsTab"));
const TestimonialsTab  = React.lazy(() => import("../components/Settings/tabs/TestimonialsTab"));
const JourneyTab       = React.lazy(() => import("../components/Settings/tabs/JourneyTab"));
const BlogsTab         = React.lazy(() => import("../components/Settings/tabs/BlogsTab"));
const FaqTab           = React.lazy(() => import("../components/Settings/tabs/FaqTab"));
const ContactTab       = React.lazy(() => import("../components/Settings/tabs/ContactTab"));

// ── Toast system ──────────────────────────────────────────────────────────────
function useToast() {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = "info", duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  }, []);
  return { toasts, addToast };
}

function ToastContainer({ toasts }) {
  const colorMap = {
    success: { bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)", text: "#10B981", icon: "✓" },
    error:   { bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.3)",  text: "#EF4444", icon: "✗" },
    warning: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", text: "#F59E0B", icon: "⚠" },
    info:    { bg: "rgba(99,102,241,0.12)",border: "rgba(99,102,241,0.35)",text: "#a5b4fc", icon: "i" },
  };
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => {
          const c = colorMap[t.type] || colorMap.info;
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="p-4 rounded-2xl border flex items-center gap-2.5 text-xs font-bold shadow-2xl backdrop-blur-md"
              style={{ backgroundColor: c.bg, borderColor: c.border, color: c.text, maxWidth: "380px" }}
            >
              <span className="text-base shrink-0">{c.icon}</span>
              <span>{t.message}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// ── Main Settings component ──────────────────────────────────────────────────
export default function Settings() {
  const portfolio = usePortfolio();
  const {
    primaryColor, setPrimaryColor,
    themeMode, setThemeMode,
    selectedTemplate, setSelectedTemplate,
    fontFamily, setFontFamily,
    particlesStyle, setParticlesStyle,
    roles, setRoles,
    description, setDescription,
    centerSvg, setCenterSvg,
    orbitingStacks, setOrbitingStacks,
    about, setAbout,
    servicesSubtitle, setServicesSubtitle,
    servicesData, setServicesData,
    skills, setSkills,
    skillCategories, setSkillCategories,
    projects, setProjects,
    certifications, setCertifications,
    timelineData, setTimelineData,
    summaryStats, setSummaryStats,
    contactInfo, setContactInfo,
    testimonials, setTestimonials,
    blogs, setBlogs,
    faqs, setFaqs,
    pageTitles, setPageTitles,
    pageDescriptions, setPageDescriptions,
    sectionVisibility, setSectionVisibility,
    sectionTitles, setSectionTitles,
    sectionOrder, setSectionOrder,
    DEFAULT_SECTION_ORDER,
  } = portfolio;

  const previewUrl = `${import.meta.env.BASE_URL || "/"}?preview=true`.replace(/\/+\?/g, "/?");
  const { toasts, addToast } = useToast();
  const isProd = !import.meta.env.DEV;

  // ── Local working copies ──────────────────────────────────────────────────
  const [localSelectedTemplate, setLocalSelectedTemplate] = useState(selectedTemplate || "template-1");
  const [pickedColor,           setPickedColor]           = useState(primaryColor || "#00D5D5");
  const [localThemeMode,        setLocalThemeMode]        = useState(themeMode || "dark");
  const [localFontFamily,       setLocalFontFamily]       = useState(fontFamily || "Outfit");
  const [localParticlesStyle,   setLocalParticlesStyle]   = useState(particlesStyle || "minimal");
  const [localRoles,            setLocalRoles]            = useState(roles || []);
  const [localDescription,      setLocalDescription]      = useState(description || "");
  const [localCenterSvg,        setLocalCenterSvg]        = useState(centerSvg || "");
  const [localOrbitingStacks,   setLocalOrbitingStacks]   = useState(orbitingStacks || []);
  const [localAbout,            setLocalAbout]            = useState({ ...DEFAULT_ABOUT, ...(about || {}) });
  const [localServicesSubtitle, setLocalServicesSubtitle] = useState(servicesSubtitle || "");
  const [localServicesData,     setLocalServicesData]     = useState(servicesData || []);
  const [localSkills,           setLocalSkills]           = useState(skills || []);
  const [localSkillCategories,  setLocalSkillCategories]  = useState(skillCategories || []);
  const [activeSkillCategoryTab, setActiveSkillCategoryTab] = useState(skillCategories?.[0]?.id || "frontend");
  const [newSkillCategoryName,  setNewSkillCategoryName]  = useState("");
  const [newSkillName,          setNewSkillName]          = useState("");
  const [newSkillIcon,          setNewSkillIcon]          = useState("");

  const [localProjects,         setLocalProjects]         = useState(projects || []);
  const [activeProjectIdx,      setActiveProjectIdx]      = useState(0);
  const [newProjectStack,       setNewProjectStack]       = useState("");
  const [newProjectResponsibility, setNewProjectResponsibility] = useState("");

  const [localCertifications,   setLocalCertifications]   = useState(certifications || []);
  const [activeCertIdx,         setActiveCertIdx]         = useState(0);

  const [localTimelineData,     setLocalTimelineData]     = useState(timelineData || []);
  const [localSummaryStats,     setLocalSummaryStats]     = useState(summaryStats || []);
  const [localContactInfo,      setLocalContactInfo]      = useState(contactInfo || {});
  const [localTestimonials,     setLocalTestimonials]     = useState(testimonials || []);
  const [localBlogs,            setLocalBlogs]            = useState(blogs || []);
  const [localFaqs,             setLocalFaqs]             = useState(faqs || []);
  const [activeTimelineIdx,     setActiveTimelineIdx]     = useState(0);
  const [localPageTitles,       setLocalPageTitles]       = useState(pageTitles || {});
  const [localPageDescriptions, setLocalPageDescriptions] = useState(pageDescriptions || {});
  const [localSectionVisibility, setLocalSectionVisibility] = useState(sectionVisibility || {
    Home: true, About: true, Services: true, Skills: true, Projects: true,
    Certification: true, Testimonials: true, Journey: true, Blogs: true, Faq: true, Contact: true
  });
  const [localSectionTitles,    setLocalSectionTitles]    = useState(sectionTitles || {
    About: "Who am I ?", Services: "What I Offer ?", Skills: "What I Know ?",
    Projects: "What I did ?", Certification: "What I achieved?",
    Testimonials: "What clients say?", Journey: "What I've done ?",
    Blogs: "My Publications & Blogs", Faq: "Frequently Asked Questions",
    Contact: "Where to find me ?"
  });
  const [localSectionOrder, setLocalSectionOrder] = useState(sectionOrder || DEFAULT_SECTION_ORDER);

  // ── UI state ──────────────────────────────────────────────────────────────
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab,          setActiveTab]          = useState("theme");
  const [isDesignClicked,    setIsDesignClicked]    = useState(false);
  const [isSaving,           setIsSaving]           = useState(false);
  const [isPreviewOpen,      setIsPreviewOpen]      = useState(false);
  const [previewDeviceMode,  setPreviewDeviceMode]  = useState("desktop");
  const [svgColorInjected,   setSvgColorInjected]   = useState(false);
  const [isDirty,            setIsDirty]            = useState(false);
  const [showOnboarding,     setShowOnboarding]     = useState(
    () => !localStorage.getItem("portfolio_onboarding_seen")
  );
  const importRef = useRef(null);

  const dismissOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem("portfolio_onboarding_seen", "1");
  };

  // Automatically unlock sections if a template design has already been loaded
  useEffect(() => {
    if (selectedTemplate) {
      setIsDesignClicked(true);
    }
  }, [selectedTemplate]);


  // ── Sync from context when props change ───────────────────────────────────
  useEffect(() => {
    if (primaryColor) setPickedColor(primaryColor);
    if (roles) setLocalRoles(roles);
    if (description) setLocalDescription(description);
    if (centerSvg) setLocalCenterSvg(centerSvg);
    if (orbitingStacks) setLocalOrbitingStacks(orbitingStacks);
    if (about) setLocalAbout({ ...DEFAULT_ABOUT, ...about });
    if (servicesSubtitle) setLocalServicesSubtitle(servicesSubtitle);
    if (servicesData) setLocalServicesData(servicesData);
    if (skills) setLocalSkills(skills);
    if (skillCategories) setLocalSkillCategories(skillCategories);
    if (projects) setLocalProjects(projects);
    if (certifications) setLocalCertifications(certifications);
    if (timelineData) setLocalTimelineData(timelineData);
    if (summaryStats) setLocalSummaryStats(summaryStats);
    if (contactInfo) setLocalContactInfo(contactInfo);
    if (themeMode) setLocalThemeMode(themeMode);
    if (selectedTemplate) setLocalSelectedTemplate(selectedTemplate);
    if (pageTitles) setLocalPageTitles(pageTitles);
    if (pageDescriptions) setLocalPageDescriptions(pageDescriptions);
    if (sectionVisibility) setLocalSectionVisibility(sectionVisibility);
    if (sectionTitles) setLocalSectionTitles(sectionTitles);
    if (testimonials) setLocalTestimonials(testimonials);
    if (blogs) setLocalBlogs(blogs);
    if (faqs) setLocalFaqs(faqs);
    if (fontFamily) setLocalFontFamily(fontFamily);
    if (particlesStyle) setLocalParticlesStyle(particlesStyle);
    if (sectionOrder) setLocalSectionOrder(sectionOrder);
  }, [
    primaryColor, roles, description, centerSvg, orbitingStacks, about,
    servicesSubtitle, servicesData, skills, skillCategories, projects, certifications,
    timelineData, summaryStats, contactInfo, themeMode, selectedTemplate,
    pageTitles, pageDescriptions, sectionVisibility, sectionTitles,
    testimonials, blogs, faqs, fontFamily, particlesStyle, sectionOrder,
  ]);

  // ── Mark dirty on any local change ───────────────────────────────────────
  useEffect(() => { setIsDirty(true); }, [
    pickedColor, localThemeMode, localFontFamily, localSelectedTemplate,
    localRoles, localDescription, localCenterSvg, localOrbitingStacks,
    localAbout, localServicesSubtitle, localServicesData, localSkills,
    localSkillCategories, localProjects, localCertifications, localTimelineData,
    localSummaryStats, localContactInfo, localTestimonials, localBlogs, localFaqs,
    localPageTitles, localPageDescriptions, localSectionVisibility, localSectionTitles,
    localParticlesStyle, localSectionOrder,
  ]);

  // ── Unsaved changes browser warning ──────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  // ── Redirect away from Journey tab if template doesn't support it ─────────
  useEffect(() => {
    const noJourneyTemplates = ["template-2", "template-3", "template-5", "template-6"];
    if (noJourneyTemplates.includes(localSelectedTemplate) && activeTab === "journey") {
      setActiveTab("theme");
    }
  }, [localSelectedTemplate, activeTab]);

  // ── Restore theme on unmount ──────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (themeMode === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
      if (primaryColor) applyThemeColor(primaryColor);
    };
  }, [themeMode, primaryColor]);

  useEffect(() => {
    if (localSkillCategories?.length > 0 && !activeSkillCategoryTab) {
      setActiveSkillCategoryTab(localSkillCategories[0].id);
    }
  }, [localSkillCategories, activeSkillCategoryTab]);

  // ── Production db.json download ───────────────────────────────────────────
  const downloadDbJson = (payload) => {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "db.json";
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  // ── Color / theme handlers ────────────────────────────────────────────────
  const handleColorChange = (color) => {
    setPickedColor(color);
    applyThemeColor(color);
  };

  const handleThemeModeChange = (mode) => {
    setLocalThemeMode(mode);
    if (mode === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  // ── Build payload ─────────────────────────────────────────────────────────
  const getPayload = useCallback(() => {
    const processedSvg = looksLikeSvg(localCenterSvg) ? injectPrimaryColor(localCenterSvg) : localCenterSvg;
    return {
      primaryColor: pickedColor,
      roles: localRoles,
      description: localDescription,
      centerSvg: processedSvg,
      orbitingStacks: localOrbitingStacks,
      about: localAbout,
      servicesSubtitle: localServicesSubtitle,
      servicesData: localServicesData,
      skills: localSkills,
      skillCategories: localSkillCategories,
      projects: localProjects,
      certifications: localCertifications,
      timelineData: localTimelineData,
      summaryStats: localSummaryStats,
      contactInfo: localContactInfo,
      themeMode: localThemeMode,
      selectedTemplate: localSelectedTemplate,
      pageTitles: localPageTitles,
      pageDescriptions: localPageDescriptions,
      sectionVisibility: localSectionVisibility,
      sectionTitles: localSectionTitles,
      testimonials: localTestimonials,
      blogs: localBlogs,
      faqs: localFaqs,
      fontFamily: localFontFamily,
      particlesStyle: localParticlesStyle,
      sectionOrder: localSectionOrder,
    };
  }, [
    pickedColor, localThemeMode, localFontFamily, localSelectedTemplate,
    localRoles, localDescription, localCenterSvg, localOrbitingStacks,
    localAbout, localServicesSubtitle, localServicesData, localSkills,
    localSkillCategories, localProjects, localCertifications, localTimelineData,
    localSummaryStats, localContactInfo, localTestimonials, localBlogs, localFaqs,
    localPageTitles, localPageDescriptions, localSectionVisibility, localSectionTitles,
    localParticlesStyle, localSectionOrder,
  ]);

  // Auto-save preview configuration to localStorage
  useEffect(() => {
    const payload = getPayload();
    localStorage.setItem("portfolio_preview_config", JSON.stringify(payload));
  }, [getPayload]);

  // ── Apply payload to global context ──────────────────────────────────────
  const applyPayloadToContext = (payload) => {
    setPrimaryColor(payload.primaryColor);
    setRoles(payload.roles);
    setDescription(payload.description);
    setCenterSvg(payload.centerSvg);
    setOrbitingStacks(payload.orbitingStacks);
    setAbout(payload.about);
    setServicesSubtitle(payload.servicesSubtitle);
    setServicesData(payload.servicesData);
    setSkills(payload.skills);
    setSkillCategories(payload.skillCategories);
    setProjects(payload.projects);
    setCertifications(payload.certifications);
    setTimelineData(payload.timelineData);
    setSummaryStats(payload.summaryStats);
    setContactInfo(payload.contactInfo);
    setThemeMode(payload.themeMode);
    setSelectedTemplate(payload.selectedTemplate);
    setPageTitles(payload.pageTitles);
    setPageDescriptions(payload.pageDescriptions);
    setSectionVisibility(payload.sectionVisibility);
    setSectionTitles(payload.sectionTitles);
    setTestimonials(payload.testimonials);
    setBlogs(payload.blogs);
    setFaqs(payload.faqs);
    if (payload.fontFamily) setFontFamily(payload.fontFamily);
    if (payload.particlesStyle) setParticlesStyle(payload.particlesStyle);
    if (payload.sectionOrder) setSectionOrder(payload.sectionOrder);
  };

  // ── Save handler ──────────────────────────────────────────────────────────
  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);

    if (!/^#[0-9A-F]{6}$/i.test(pickedColor)) {
      addToast("Invalid hex color format. Please enter a valid #RRGGBB value.", "error");
      setIsSaving(false);
      return;
    }

    const payload = getPayload();

    try {
      let responseSuccess = false;
      try {
        const res = await fetch("/api/theme", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const resData = await res.json();
          if (resData.success) responseSuccess = true;
        }
      } catch (apiErr) {
        console.warn("Failed to POST to API:", apiErr);
      }

      saveAllToLocalStorage(payload);
      applyPayloadToContext(payload);
      setIsDirty(false);

      if (responseSuccess) {
        addToast("Configuration saved successfully! ✓", "success");
      } else if (!import.meta.env.DEV) {
        downloadDbJson(payload);
        addToast("db.json downloaded! Commit it to public/db.json and redeploy.", "info", 6000);
      } else {
        addToast("Saved to localStorage (dev mode — API not reachable).", "warning");
      }
    } catch (err) {
      console.error("Failed to save:", err);
      try { saveAllToLocalStorage(payload); } catch { /* ignore */ }
      applyPayloadToContext(payload);
      if (isProd) {
        downloadDbJson(payload);
        addToast("db.json downloaded!", "info", 5000);
      } else {
        addToast("Saved locally. API error: " + err.message, "warning");
      }
      setIsDirty(false);
    } finally {
      setIsSaving(false);
    }
  };

  // ── Export config ─────────────────────────────────────────────────────────
  const handleExportConfig = () => {
    const payload = getPayload();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-config-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
    addToast("Config exported successfully!", "success");
  };

  // ── Import config ─────────────────────────────────────────────────────────
  const handleImportConfig = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        // Basic validation
        const requiredKeys = ["primaryColor", "roles", "about", "skills", "projects"];
        const missing = requiredKeys.filter(k => !(k in data));
        if (missing.length > 0) {
          addToast(`Invalid config file. Missing keys: ${missing.join(", ")}`, "error");
          return;
        }
        // Apply to local state
        if (data.primaryColor) { setPickedColor(data.primaryColor); handleColorChange(data.primaryColor); }
        if (data.roles) setLocalRoles(data.roles);
        if (data.description) setLocalDescription(data.description);
        if (data.centerSvg) setLocalCenterSvg(data.centerSvg);
        if (data.orbitingStacks) setLocalOrbitingStacks(data.orbitingStacks);
        if (data.about) setLocalAbout({ ...DEFAULT_ABOUT, ...data.about });
        if (data.servicesSubtitle) setLocalServicesSubtitle(data.servicesSubtitle);
        if (data.servicesData) setLocalServicesData(data.servicesData);
        if (data.skills) setLocalSkills(data.skills);
        if (data.skillCategories) setLocalSkillCategories(data.skillCategories);
        if (data.projects) setLocalProjects(data.projects);
        if (data.certifications) setLocalCertifications(data.certifications);
        if (data.timelineData) setLocalTimelineData(data.timelineData);
        if (data.summaryStats) setLocalSummaryStats(data.summaryStats);
        if (data.contactInfo) setLocalContactInfo(data.contactInfo);
        if (data.themeMode) { setLocalThemeMode(data.themeMode); handleThemeModeChange(data.themeMode); }
        if (data.selectedTemplate) setLocalSelectedTemplate(data.selectedTemplate);
        if (data.pageTitles) setLocalPageTitles(data.pageTitles);
        if (data.pageDescriptions) setLocalPageDescriptions(data.pageDescriptions);
        if (data.sectionVisibility) setLocalSectionVisibility(data.sectionVisibility);
        if (data.sectionTitles) setLocalSectionTitles(data.sectionTitles);
        if (data.testimonials) setLocalTestimonials(data.testimonials);
        if (data.blogs) setLocalBlogs(data.blogs);
        if (data.faqs) setLocalFaqs(data.faqs);
        if (data.fontFamily) setLocalFontFamily(data.fontFamily);
        if (data.sectionOrder) setLocalSectionOrder(data.sectionOrder);
        addToast("Config imported! Click Save Settings to apply.", "success", 5000);
      } catch {
        addToast("Failed to parse config file. Make sure it's valid JSON.", "error");
      }
      if (importRef.current) importRef.current.value = "";
    };
    reader.readAsText(file);
  };

  // ── Preview ───────────────────────────────────────────────────────────────
  const handleOpenPreview = () => {
    const payload = getPayload();
    localStorage.setItem("portfolio_preview_config", JSON.stringify(payload));
    setIsPreviewOpen(true);
  };

  // ── Reset to default ──────────────────────────────────────────────────────
  const resetToDefault = () => {
    handleColorChange("#00D5D5");
    handleThemeModeChange("dark");
    setLocalSelectedTemplate("template-1");
    setLocalFontFamily("Outfit");
    setLocalRoles(["Senior Software Developer", "Full-Stack Engineer", "Cloud Architect", "Mobile App Developer", "System Designer"]);
    setLocalDescription("Designing and engineering high-performance web systems, cross-platform mobile apps, and scalable serverless cloud architectures with 6+ years of expertise.");
    setLocalCenterSvg("");
    setLocalOrbitingStacks([
      { label: "React Native", type: "primary" }, { label: "React.js", type: "primary" },
      { label: "Node.js", type: "outline" }, { label: "Next.js", type: "primary" },
      { label: "AWS Cloud", type: "primary" }, { label: "TypeScript", type: "outline" }
    ]);
    setLocalAbout(DEFAULT_ABOUT);
    setLocalServicesSubtitle("High-performance, scalable, and secure software development solutions tailored to meet business objectives and deliver outstanding user experiences.");
    setLocalServicesData(DEFAULT_SERVICES_DATA);
    setLocalSkills(DEFAULT_SKILLS);
    setLocalSkillCategories(DEFAULT_SKILL_CATEGORIES);
    setLocalProjects(DEFAULT_PROJECTS || []); setActiveProjectIdx(0);
    setLocalCertifications(DEFAULT_CERTIFICATIONS || []); setActiveCertIdx(0);
    setLocalTimelineData(DEFAULT_TIMELINE_DATA || []); setActiveTimelineIdx(0);
    setLocalSummaryStats(DEFAULT_SUMMARY_STATS || []);
    setLocalContactInfo(DEFAULT_CONTACT_INFO || {});
    setLocalTestimonials(DEFAULT_TESTIMONIALS || []);
    setLocalBlogs(DEFAULT_BLOGS || []);
    setLocalFaqs(DEFAULT_FAQS || []);
    setLocalPageTitles(defaultPageTitles);
    setLocalPageDescriptions(defaultPageDescriptions);
    setLocalSectionVisibility({ Home: true, About: true, Services: true, Skills: true, Projects: true, Certification: true, Testimonials: true, Journey: true, Blogs: true, Faq: true, Contact: true });
    setLocalSectionTitles({ About: "Who am I ?", Services: "What I Offer ?", Skills: "What I Know ?", Projects: "What I did ?", Certification: "What I achieved?", Testimonials: "What clients say?", Journey: "What I've done ?", Blogs: "My Publications & Blogs", Faq: "Frequently Asked Questions", Contact: "Where to find me ?" });
    setLocalSectionOrder(DEFAULT_SECTION_ORDER);
    addToast("All settings reset to defaults.", "info");
  };

  // ── About helpers ─────────────────────────────────────────────────────────
  const updateAbout = (field, value) => setLocalAbout(prev => ({ ...prev, [field]: value }));
  const updateAboutStat = (idx, key, value) => { const copy = [...localAbout.stats]; copy[idx] = { ...copy[idx], [key]: value }; updateAbout("stats", copy); };
  const updateAboutHighlight = (idx, key, value) => { const copy = [...localAbout.highlights]; copy[idx] = { ...copy[idx], [key]: value }; updateAbout("highlights", copy); };
  const updateAboutSocialLink = (idx, key, value) => { const copy = [...localAbout.socialLinks]; copy[idx] = { ...copy[idx], [key]: value }; updateAbout("socialLinks", copy); };
  const updateAboutTitle = (idx, value) => { const copy = [...localAbout.professionalTitles]; copy[idx] = value; updateAbout("professionalTitles", copy); };

  // ── Services helpers ──────────────────────────────────────────────────────
  const updateService = (idx, field, value) => { const copy = [...localServicesData]; copy[idx] = { ...copy[idx], [field]: value }; setLocalServicesData(copy); };
  const addService = () => setLocalServicesData(prev => [...prev, { title: "New Service", description: "Service description text", icon: "code" }]);
  const deleteService = (idx) => setLocalServicesData(prev => prev.filter((_, i) => i !== idx));
  const moveService = (idx, dir) => {
    const ni = idx + dir;
    if (ni < 0 || ni >= localServicesData.length) return;
    const copy = [...localServicesData]; [copy[idx], copy[ni]] = [copy[ni], copy[idx]]; setLocalServicesData(copy);
  };

  // ── Skills helpers ────────────────────────────────────────────────────────
  const addSkillCategory = () => {
    if (!newSkillCategoryName.trim()) return;
    const id = newSkillCategoryName.toLowerCase().replace(/\s+/g, "-");
    if (localSkillCategories.some(c => c.id === id)) { addToast("A category with this name already exists.", "error"); return; }
    const copy = [...localSkillCategories, { id, label: newSkillCategoryName.trim(), skillNames: [], bullets: [] }];
    setLocalSkillCategories(copy); setActiveSkillCategoryTab(id); setNewSkillCategoryName("");
  };
  const deleteSkillCategory = (id) => {
    const copy = localSkillCategories.filter(c => c.id !== id);
    setLocalSkillCategories(copy);
    if (activeSkillCategoryTab === id) setActiveSkillCategoryTab(copy[0]?.id || "");
  };
  const renameSkillCategory = (id, newLabel) => setLocalSkillCategories(prev => prev.map(c => c.id === id ? { ...c, label: newLabel } : c));
  const updateCategoryBullet = (catId, bi, val) => setLocalSkillCategories(prev => prev.map(c => { if (c.id !== catId) return c; const b = [...c.bullets]; b[bi] = val; return { ...c, bullets: b }; }));
  const addCategoryBullet = (catId) => setLocalSkillCategories(prev => prev.map(c => c.id === catId ? { ...c, bullets: [...c.bullets, "New key expertise point"] } : c));
  const deleteCategoryBullet = (catId, bi) => setLocalSkillCategories(prev => prev.map(c => c.id === catId ? { ...c, bullets: c.bullets.filter((_, i) => i !== bi) } : c));
  const moveCategoryBullet = (catId, bi, dir) => {
    const ni = bi + dir;
    const cat = localSkillCategories.find(c => c.id === catId);
    if (!cat || ni < 0 || ni >= cat.bullets.length) return;
    setLocalSkillCategories(prev => prev.map(c => { if (c.id !== catId) return c; const b = [...c.bullets]; [b[bi], b[ni]] = [b[ni], b[bi]]; return { ...c, bullets: b }; }));
  };
  const toggleSkillInCategory = (catId, skillName) => setLocalSkillCategories(prev => prev.map(c => { if (c.id !== catId) return c; const sn = [...(c.skillNames || [])]; const i = sn.indexOf(skillName); if (i > -1) sn.splice(i, 1); else sn.push(skillName); return { ...c, skillNames: sn }; }));
  const addCustomSkill = () => {
    if (!newSkillName.trim()) return;
    if (localSkills.some(s => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) { addToast("A skill with this name already exists.", "error"); return; }
    setLocalSkills(prev => [...prev, { name: newSkillName.trim(), icon: newSkillIcon || "" }]);
    setNewSkillName(""); setNewSkillIcon("");
  };
  const deleteCustomSkill = (name) => {
    setLocalSkills(prev => prev.filter(s => s.name !== name));
    setLocalSkillCategories(prev => prev.map(c => ({ ...c, skillNames: (c.skillNames || []).filter(s => s !== name) })));
  };

  // ── Projects helpers ──────────────────────────────────────────────────────
  const addProject = () => {
    const copy = [...localProjects, { title: "New Project", synopsis: "Project synopsis...", category: "Full Stack (Web)", platform: "Web", duration: "Jan 2026 - Present", role: "Lead Developer", client: "Client Name", teamSize: 1, stacks: ["React.js", "TypeScript"], responsibilities: ["Developed core modules", "Integrated APIs"], image: "" }];
    setLocalProjects(copy); setActiveProjectIdx(copy.length - 1);
  };
  const deleteProject = (idx) => {
    const copy = localProjects.filter((_, i) => i !== idx);
    setLocalProjects(copy);
    if (activeProjectIdx >= copy.length) setActiveProjectIdx(Math.max(0, copy.length - 1));
  };
  const moveProject = (idx, dir) => {
    const ni = idx + dir;
    if (ni < 0 || ni >= localProjects.length) return;
    const copy = [...localProjects]; [copy[idx], copy[ni]] = [copy[ni], copy[idx]];
    setLocalProjects(copy); setActiveProjectIdx(ni);
  };
  const updateActiveProjectField = (field, value) => {
    if (!localProjects.length) return;
    const copy = [...localProjects]; copy[activeProjectIdx] = { ...copy[activeProjectIdx], [field]: value }; setLocalProjects(copy);
  };
  const addStackToActiveProject = () => {
    if (!newProjectStack.trim() || !localProjects.length) return;
    const stacks = [...(localProjects[activeProjectIdx].stacks || [])];
    if (stacks.includes(newProjectStack.trim())) { addToast("Stack already exists.", "warning"); return; }
    stacks.push(newProjectStack.trim()); updateActiveProjectField("stacks", stacks); setNewProjectStack("");
  };
  const deleteStackFromActiveProject = (name) => {
    if (!localProjects.length) return;
    updateActiveProjectField("stacks", (localProjects[activeProjectIdx].stacks || []).filter(s => s !== name));
  };
  const addResponsibilityToActiveProject = () => {
    if (!newProjectResponsibility.trim() || !localProjects.length) return;
    updateActiveProjectField("responsibilities", [...(localProjects[activeProjectIdx].responsibilities || []), newProjectResponsibility.trim()]);
    setNewProjectResponsibility("");
  };
  const updateResponsibilityInActiveProject = (idx, val) => {
    if (!localProjects.length) return;
    const r = [...(localProjects[activeProjectIdx].responsibilities || [])]; r[idx] = val; updateActiveProjectField("responsibilities", r);
  };
  const deleteResponsibilityFromActiveProject = (idx) => {
    if (!localProjects.length) return;
    updateActiveProjectField("responsibilities", (localProjects[activeProjectIdx].responsibilities || []).filter((_, i) => i !== idx));
  };
  const moveResponsibilityInActiveProject = (idx, dir) => {
    if (!localProjects.length) return;
    const r = [...(localProjects[activeProjectIdx].responsibilities || [])];
    const ni = idx + dir;
    if (ni < 0 || ni >= r.length) return;
    [r[idx], r[ni]] = [r[ni], r[idx]]; updateActiveProjectField("responsibilities", r);
  };

  // ── Certifications helpers ────────────────────────────────────────────────
  const addCert = () => {
    const newId = localCertifications.length > 0 ? Math.max(...localCertifications.map(c => c.id || 0)) + 1 : 1;
    const copy = [...localCertifications, { id: newId, title: "New Certification", description: "Description outline...", image: "", lastUpdated: "Feb - 2026", issuer: "Issuer Name", offeredBy: "Offered By", pdfFile: "" }];
    setLocalCertifications(copy); setActiveCertIdx(copy.length - 1);
  };
  const deleteCert = (idx) => {
    const copy = localCertifications.filter((_, i) => i !== idx);
    setLocalCertifications(copy);
    if (activeCertIdx >= copy.length) setActiveCertIdx(Math.max(0, copy.length - 1));
  };
  const moveCert = (idx, dir) => {
    const ni = idx + dir;
    if (ni < 0 || ni >= localCertifications.length) return;
    const copy = [...localCertifications]; [copy[idx], copy[ni]] = [copy[ni], copy[idx]];
    setLocalCertifications(copy); setActiveCertIdx(ni);
  };
  const updateActiveCertField = (field, value) => {
    if (!localCertifications.length) return;
    const copy = [...localCertifications]; copy[activeCertIdx] = { ...copy[activeCertIdx], [field]: value }; setLocalCertifications(copy);
  };

  // ── Journey / Timeline helpers ────────────────────────────────────────────
  const addTimelineItem = () => {
    const copy = [...localTimelineData, { time: "New Duration", title: "New Title", org: "Organization Name", location: "Location", percent: "" }];
    setLocalTimelineData(copy); setActiveTimelineIdx(copy.length - 1);
  };
  const deleteTimelineItem = (idx) => {
    const copy = localTimelineData.filter((_, i) => i !== idx);
    setLocalTimelineData(copy);
    if (activeTimelineIdx >= copy.length) setActiveTimelineIdx(Math.max(0, copy.length - 1));
  };
  const moveTimelineItem = (idx, dir) => {
    const ni = idx + dir;
    if (ni < 0 || ni >= localTimelineData.length) return;
    const copy = [...localTimelineData]; [copy[idx], copy[ni]] = [copy[ni], copy[idx]];
    setLocalTimelineData(copy); setActiveTimelineIdx(ni);
  };
  const updateActiveTimelineField = (field, value) => {
    if (!localTimelineData.length) return;
    const copy = [...localTimelineData]; copy[activeTimelineIdx] = { ...copy[activeTimelineIdx], [field]: value }; setLocalTimelineData(copy);
  };
  const updateSummaryStat = (idx, key, value) => {
    const copy = [...localSummaryStats];
    if (key === "value") { const n = parseFloat(value); copy[idx] = { ...copy[idx], [key]: isNaN(n) ? 0 : n }; }
    else { copy[idx] = { ...copy[idx], [key]: value }; }
    setLocalSummaryStats(copy);
  };
  const updateContactInfoField = (field, value) => setLocalContactInfo(prev => ({ ...prev, [field]: value }));

  // ── Section reorder helpers ───────────────────────────────────────────────
  const moveSectionInOrder = (idx, dir) => {
    const ni = idx + dir;
    if (ni < 0 || ni >= localSectionOrder.length) return;
    const copy = [...localSectionOrder]; [copy[idx], copy[ni]] = [copy[ni], copy[idx]]; setLocalSectionOrder(copy);
  };

  // ── Section visibility banner ─────────────────────────────────────────────
  const renderSectionVisibilityBanner = (sectionName) => {
    const isVisible = localSectionVisibility[sectionName] !== false;
    return (
      <div className="p-4 rounded-2xl border flex items-center justify-between mb-6"
        style={{ background: isVisible ? `${pickedColor}08` : "rgba(239,68,68,0.05)", borderColor: isVisible ? `${pickedColor}20` : "rgba(239,68,68,0.15)" }}>
        <div className="text-left">
          <span className="text-xs font-bold text-white block">Section Active Status</span>
          <span className="text-[9.5px] text-stone-400 font-medium leading-normal block mt-0.5">
            {isVisible
              ? `The ${sectionName} section is active and visible in the portfolio.`
              : `The ${sectionName} section is currently hidden from the portfolio.`}
          </span>
        </div>
        <button type="button"
          onClick={() => setLocalSectionVisibility(prev => ({ ...prev, [sectionName]: !isVisible }))}
          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-xl cursor-pointer transition-all border shrink-0"
          style={{ color: isVisible ? pickedColor : "#f87171", borderColor: isVisible ? `${pickedColor}30` : "rgba(239,68,68,0.3)", backgroundColor: isVisible ? `${pickedColor}10` : "rgba(239,68,68,0.1)" }}>
          {isVisible ? "Hide Section" : "Show Section"}
        </button>
      </div>
    );
  };

  // ── Tab definitions ───────────────────────────────────────────────────────
  const tabs = [
    { id: "theme",          label: "Theme & Layout",         icon: FiSliders },
    { id: "home",           label: "Home Section",           icon: FiType },
    { id: "about",          label: "About Section",          icon: FiUser },
    { id: "services",       label: "Services Section",       icon: FiBriefcase },
    { id: "skills",         label: "Skills Section",         icon: FiCpu },
    { id: "projects",       label: "Projects Section",       icon: FiFolder },
    { id: "certifications", label: "Certifications Section", icon: FiAward },
    { id: "testimonials",   label: "Testimonials Section",   icon: FiMessageSquare },
    { id: "journey",        label: "Journey Section",        icon: FiActivity },
    { id: "blogs",          label: "Blogs Section",          icon: FiBookOpen },
    { id: "faq",            label: "FAQ Section",            icon: FiHelpCircle },
    { id: "contact",        label: "Contact Section",        icon: FiMail },
  ];

  const noJourneyTemplates = ["template-2", "template-3", "template-5", "template-6"];
  const filteredTabs = tabs.filter(t => !(t.id === "journey" && noJourneyTemplates.includes(localSelectedTemplate)));

  const renderTabButton = (tab) => {
    const isLocked = !isDesignClicked && tab.id !== "theme";
    const IconComponent = isLocked ? FiLock : tab.icon;
    const isActive = activeTab === tab.id;
    const getSectionNameByTabId = (id) => id === "certifications" ? "Certification" : id.charAt(0).toUpperCase() + id.slice(1);
    const sectionName = getSectionNameByTabId(tab.id);
    const isHidden = ["home","about","services","skills","projects","certifications","journey","contact"].includes(tab.id) && localSectionVisibility[sectionName] === false;

    return (
      <button
        key={tab.id}
        type="button"
        title={isLocked ? "Select a design layout first" : (isSidebarCollapsed ? tab.label.replace(" Section", "") : undefined)}
        onClick={() => {
          if (isLocked) {
            addToast("Please select/click a layout design card in 'Theme & Colors' first.", "warning");
            setActiveTab("theme");
          } else {
            setActiveTab(tab.id);
          }
        }}
        className={`flex items-center ${isSidebarCollapsed ? "md:justify-center md:px-0 md:h-10 md:w-10 md:mx-auto" : "gap-3 px-4 py-2.5"} text-[10.5px] font-bold uppercase tracking-wider rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer text-left w-full border-l-2 ${
          isLocked
            ? "opacity-50 cursor-not-allowed border-transparent text-stone-600 bg-transparent"
            : isActive
              ? "text-white bg-white/5"
              : "text-stone-400 bg-transparent border-transparent hover:bg-stone-900/35 hover:text-white"
        }`}
        style={(!isLocked && isActive) ? { borderLeftColor: pickedColor } : {}}
      >
        <IconComponent className="text-sm shrink-0" style={(!isLocked && isActive) ? { color: pickedColor } : {}} />
        {!isSidebarCollapsed && (
          <span className="flex items-center justify-between w-full">
            <span className="flex items-center gap-1.5">
              <span>{tab.label.replace(" Section", "")}</span>
              {isLocked && <span className="text-[8px] text-stone-500 font-extrabold uppercase font-mono tracking-tighter">(locked)</span>}
            </span>
            {isHidden && !isLocked && (
              <span className="text-[8px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20 font-bold font-mono">HIDDEN</span>
            )}
          </span>
        )}
      </button>
    );
  };

  // ── Shared props passed to all tab components ─────────────────────────────
  const tabCommonProps = {
    pickedColor,
    renderSectionVisibilityBanner,
    localSectionTitles,
    setLocalSectionTitles,
  };

  const lightAccentColor = getLightShade(pickedColor, 0.65);

  return (
    <div className="settings-console-page relative h-screen w-screen flex flex-col md:flex-row text-[var(--text-white-or-dark)] overflow-hidden font-sans">
      {/* Background Particles layered at z-1 on top of parent background */}
      {localParticlesStyle !== "none" && (
        <div 
          className="fixed inset-0 w-full h-full z-1 pointer-events-none"
          style={{ opacity: localThemeMode === "light" ? 0.5 : 0.7 }}
        >
          <Particles
            key={localParticlesStyle + pickedColor}
            particleColors={[pickedColor, lightAccentColor]}
            particleCount={localParticlesStyle === "minimal" ? 25 : 65}
            particleSpread={localParticlesStyle === "minimal" ? 14 : 10}
            speed={localParticlesStyle === "minimal" ? 0.015 : 0.03}
            particleBaseSize={localParticlesStyle === "minimal" ? 45 : 65}
            alphaParticles={true}
            moveParticlesOnHover={localParticlesStyle === "interactive"}
            particleHoverFactor={localParticlesStyle === "interactive" ? 2.5 : 1}
            disableRotation={false}
          />
        </div>
      )}

      {/* ── Unsaved Changes Banner ─────────────────────────────────────── */}
      <AnimatePresence>
        {isDirty && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-0 left-0 right-0 z-[150] flex items-center justify-center gap-3 px-6 py-2.5 text-[11px] font-bold select-none"
            style={{
              background: "linear-gradient(90deg, rgba(245,158,11,0.15), rgba(245,158,11,0.08))",
              borderBottom: "1px solid rgba(245,158,11,0.3)",
              backdropFilter: "blur(12px)",
            }}
          >
            <FiAlertTriangle className="text-amber-400 shrink-0" />
            <span className="text-amber-300">You have unsaved changes</span>
            <span className="text-amber-500 font-normal">— click</span>
            <span className="text-amber-300 font-black">Save Settings</span>
            <span className="text-amber-500 font-normal">to apply them to your portfolio.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── First Visit Onboarding Banner ────────────────────────────── */}
      <AnimatePresence>
        {showOnboarding && !isDirty && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-0 left-0 right-0 z-[150] flex items-center justify-between gap-3 px-6 py-2.5 text-[11px] font-bold select-none"
            style={{
              background: `linear-gradient(90deg, rgba(var(--primary-rgb), 0.15), rgba(var(--primary-rgb), 0.08))`,
              borderBottom: `1px solid rgba(var(--primary-rgb), 0.25)`,
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-primary text-base">👋</span>
              <span className="text-white">Welcome! Start by choosing a</span>
              <button
                type="button"
                onClick={() => { setActiveTab("theme"); dismissOnboarding(); }}
                className="underline underline-offset-2 cursor-pointer"
                style={{ color: pickedColor }}
              >
                Theme & Layout
              </button>
              <span className="text-stone-300 font-normal">then customize each section. Click</span>
              <span className="font-black text-white">Save Settings</span>
              <span className="text-stone-300 font-normal">when done.</span>
            </div>
            <button
              type="button"
              onClick={dismissOnboarding}
              className="shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-stone-400 hover:text-white"
              title="Dismiss"
            >
              <FiX className="text-sm" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main glass dashboard container ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
        className="w-full h-full glass-panel relative z-10 flex flex-col md:flex-row overflow-hidden border-none"
        style={{ background: "rgba(10,10,10,0.75)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", paddingTop: (isDirty || showOnboarding) ? "40px" : "0", transition: "padding-top 0.3s ease" }}

      >
        {/* ── Sidebar Nav ─────────────────────────────────────────────── */}
        <div className={`w-full ${isSidebarCollapsed ? "md:w-[80px] md:p-4" : "md:w-[280px] md:p-6"} bg-stone-950 border-b md:border-b-0 md:border-r border-stone-900/80 p-4 flex flex-col justify-between shrink-0 select-none h-auto md:h-full transition-all duration-300`}>
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div className={`flex ${isSidebarCollapsed ? "md:flex-col md:items-center md:gap-3" : "items-center justify-between"}`}>
              <div className={`flex items-center gap-2 ${isSidebarCollapsed ? "md:hidden" : ""}`}>
                <FiCompass className="text-xl" style={{ color: pickedColor }} />
                <span className="font-mono text-xs uppercase font-extrabold tracking-[0.2em] text-white">Dev Console</span>
              </div>
              {isSidebarCollapsed && <FiCompass className="hidden md:block text-xl" style={{ color: pickedColor }} />}
              <button type="button"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden md:flex items-center justify-center p-2 rounded-xl border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-800 cursor-pointer transition-colors"
                title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {isSidebarCollapsed ? <FiMenu /> : <FiChevronLeft />}
              </button>
            </div>

            {/* Mobile select dropdown */}
            <div className="md:hidden w-full">
              <select value={activeTab}
                onChange={(e) => {
                  const isLocked = !isDesignClicked && e.target.value !== "theme";
                  if (isLocked) { addToast("Please select/click a layout design card in 'Theme & Layout' first.", "warning"); setActiveTab("theme"); }
                  else setActiveTab(e.target.value);
                }}
                className="w-full bg-stone-950 border border-stone-900 outline-none text-xs rounded-xl px-4 py-2.5 text-white font-bold cursor-pointer transition-all focus:border-primary"
              >
                {filteredTabs.map(t => <option key={t.id} value={t.id}>{t.label.replace(" Section","")}</option>)}
              </select>
            </div>

            {/* Desktop nav list (flat, no subheadings) */}
            <div className="hidden md:flex md:flex-col gap-1 overflow-y-auto max-h-[70vh] pr-1.5 scrollbar-thin select-none">
              <nav className="flex md:flex-col gap-0.5">
                {filteredTabs.map(renderTabButton)}
              </nav>
            </div>
          </div>

          {/* Back to App */}
          <div className="hidden md:flex items-center gap-3 border-t border-stone-900 pt-5 mt-5">
            <Link to="/"
              className={`inline-flex items-center justify-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-stone-400 hover:text-white transition-all duration-200 w-full py-2 bg-stone-950 border border-stone-900 rounded-xl hover:border-primary/20 ${isSidebarCollapsed ? "px-0" : "px-4"}`}
              title={isSidebarCollapsed ? "Back to App" : undefined}
            >
              <FiArrowLeft className="text-xs" />
              {!isSidebarCollapsed && <span>Back to App</span>}
            </Link>
          </div>
        </div>

        {/* ── Content Panel ───────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <form onSubmit={handleSave} className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-stone-900/60 px-6 sm:px-8 py-5 select-none shrink-0 bg-stone-950/10">
              <div className="text-left">
                <span className="text-[9px] font-bold uppercase tracking-widest text-primary font-mono">Module Configuration</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleOpenPreview}
                  className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-800 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <FiEye className="text-xs" />
                  <span>Show Preview</span>
                </button>
                <div className="md:hidden">
                  <Link to="/" className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-stone-400 hover:text-white transition-colors">
                    <FiArrowLeft /> Back
                  </Link>
                </div>
              </div>
            </div>

            {/* Scrollable tab content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 sm:px-8 pt-6 pb-28 text-left space-y-6 scrollbar-thin">
              <Suspense fallback={
                <div className="flex items-center justify-center p-12 text-stone-500 font-bold uppercase tracking-wider text-[10px] select-none">
                  Loading Config Module...
                </div>
              }>
                {activeTab === "theme" && (
                  <ThemeTab
                    pickedColor={pickedColor}
                    handleColorChange={handleColorChange}
                    localThemeMode={localThemeMode}
                    handleThemeModeChange={handleThemeModeChange}
                    localAbout={localAbout}
                    localSelectedTemplate={localSelectedTemplate}
                    setLocalSelectedTemplate={setLocalSelectedTemplate}
                    onSelectDesign={() => {
                      setIsDesignClicked(true);
                      setActiveTab("home");
                    }}
                    localFontFamily={localFontFamily}
                    setLocalFontFamily={setLocalFontFamily}
                    localParticlesStyle={localParticlesStyle}
                    setLocalParticlesStyle={setLocalParticlesStyle}
                    localSectionVisibility={localSectionVisibility}
                    setLocalSectionVisibility={setLocalSectionVisibility}
                    localSectionOrder={localSectionOrder}
                    moveSectionInOrder={moveSectionInOrder}
                  />
                )}
                {activeTab === "home" && (
                  <HomeTab 
                    {...tabCommonProps} 
                    localAbout={localAbout} 
                    updateAbout={updateAbout} 
                    localRoles={localRoles} 
                    setLocalRoles={setLocalRoles} 
                    localDescription={localDescription} 
                    setLocalDescription={setLocalDescription} 
                    localCenterSvg={localCenterSvg} 
                    setLocalCenterSvg={setLocalCenterSvg} 
                    svgColorInjected={svgColorInjected} 
                    setSvgColorInjected={setSvgColorInjected} 
                    localOrbitingStacks={localOrbitingStacks} 
                    setLocalOrbitingStacks={setLocalOrbitingStacks} 
                    selectedTemplate={localSelectedTemplate} 
                    setLocalSelectedTemplate={setLocalSelectedTemplate}
                    localThemeMode={localThemeMode}
                  />
                )}
                {activeTab === "about" && (
                  <AboutTab {...tabCommonProps} localAbout={localAbout} updateAbout={updateAbout} updateAboutStat={updateAboutStat} updateAboutHighlight={updateAboutHighlight} updateAboutSocialLink={updateAboutSocialLink} updateAboutTitle={updateAboutTitle} />
                )}
                {activeTab === "services" && (
                  <ServicesTab {...tabCommonProps} localServicesSubtitle={localServicesSubtitle} setLocalServicesSubtitle={setLocalServicesSubtitle} localServicesData={localServicesData} updateService={updateService} addService={addService} deleteService={deleteService} moveService={moveService} />
                )}
                {activeTab === "skills" && (
                  <SkillsTab {...tabCommonProps} localSkills={localSkills} localSkillCategories={localSkillCategories} activeSkillCategoryTab={activeSkillCategoryTab} setActiveSkillCategoryTab={setActiveSkillCategoryTab} newSkillCategoryName={newSkillCategoryName} setNewSkillCategoryName={setNewSkillCategoryName} newSkillName={newSkillName} setNewSkillName={setNewSkillName} newSkillIcon={newSkillIcon} setNewSkillIcon={setNewSkillIcon} addSkillCategory={addSkillCategory} deleteSkillCategory={deleteSkillCategory} renameSkillCategory={renameSkillCategory} updateCategoryBullet={updateCategoryBullet} addCategoryBullet={addCategoryBullet} deleteCategoryBullet={deleteCategoryBullet} moveCategoryBullet={moveCategoryBullet} toggleSkillInCategory={toggleSkillInCategory} addCustomSkill={addCustomSkill} deleteCustomSkill={deleteCustomSkill} />
                )}
                {activeTab === "projects" && (
                  <ProjectsTab {...tabCommonProps} localProjects={localProjects} activeProjectIdx={activeProjectIdx} setActiveProjectIdx={setActiveProjectIdx} newProjectStack={newProjectStack} setNewProjectStack={setNewProjectStack} newProjectResponsibility={newProjectResponsibility} setNewProjectResponsibility={setNewProjectResponsibility} addProject={addProject} deleteProject={deleteProject} moveProject={moveProject} updateActiveProjectField={updateActiveProjectField} addStackToActiveProject={addStackToActiveProject} deleteStackFromActiveProject={deleteStackFromActiveProject} addResponsibilityToActiveProject={addResponsibilityToActiveProject} updateResponsibilityInActiveProject={updateResponsibilityInActiveProject} deleteResponsibilityFromActiveProject={deleteResponsibilityFromActiveProject} moveResponsibilityInActiveProject={moveResponsibilityInActiveProject} />
                )}
                {activeTab === "certifications" && (
                  <CertificationsTab {...tabCommonProps} localCertifications={localCertifications} activeCertIdx={activeCertIdx} setActiveCertIdx={setActiveCertIdx} addCert={addCert} deleteCert={deleteCert} moveCert={moveCert} updateActiveCertField={updateActiveCertField} />
                )}
                {activeTab === "testimonials" && (
                  <TestimonialsTab {...tabCommonProps} localTestimonials={localTestimonials} setLocalTestimonials={setLocalTestimonials} />
                )}
                {activeTab === "journey" && (
                  <JourneyTab {...tabCommonProps} localSummaryStats={localSummaryStats} updateSummaryStat={updateSummaryStat} localTimelineData={localTimelineData} activeTimelineIdx={activeTimelineIdx} setActiveTimelineIdx={setActiveTimelineIdx} addTimelineItem={addTimelineItem} deleteTimelineItem={deleteTimelineItem} moveTimelineItem={moveTimelineItem} updateActiveTimelineField={updateActiveTimelineField} />
                )}
                {activeTab === "blogs" && (
                  <BlogsTab {...tabCommonProps} localBlogs={localBlogs} setLocalBlogs={setLocalBlogs} />
                )}
                {activeTab === "faq" && (
                  <FaqTab {...tabCommonProps} localFaqs={localFaqs} setLocalFaqs={setLocalFaqs} />
                )}
                {activeTab === "contact" && (
                  <ContactTab {...tabCommonProps} localContactInfo={localContactInfo} updateContactInfoField={updateContactInfoField} />
                )}
              </Suspense>
            </div>

            {/* Floating Actions Dock */}
            <div 
              className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2.5 rounded-2xl border border-stone-900 bg-stone-950/90 backdrop-blur-xl shadow-2xl z-40 select-none w-[90%] max-w-lg transition-all"
              style={{
                boxShadow: `0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 20px -5px ${pickedColor}15`,
              }}
            >
              <button 
                type="button" 
                onClick={resetToDefault}
                className="flex items-center justify-center p-3 rounded-xl border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-800 hover:bg-stone-900 cursor-pointer transition-all shrink-0"
                title="Reset to defaults"
              >
                <FiRefreshCw className="text-sm" />
              </button>

              <button 
                type="button" 
                onClick={handleOpenPreview}
                className="flex items-center justify-center p-3 rounded-xl border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-800 hover:bg-stone-900 cursor-pointer transition-all shrink-0"
                title="Toggle preview panel / Open preview modal"
              >
                <FiEye className="text-sm" />
              </button>

              <button 
                type="button" 
                onClick={handleExportConfig}
                className="hidden sm:flex items-center justify-center p-3 rounded-xl border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-800 hover:bg-stone-900 cursor-pointer transition-all shrink-0"
                title="Export config JSON"
              >
                <FiDownload className="text-sm" />
              </button>

              <button 
                type="button" 
                onClick={() => importRef.current?.click()}
                className="hidden sm:flex items-center justify-center p-3 rounded-xl border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-800 hover:bg-stone-900 cursor-pointer transition-all shrink-0"
                title="Import config JSON"
              >
                <FiUpload className="text-sm" />
              </button>

              <button 
                type="submit" 
                disabled={isSaving}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-bold transition-all disabled:opacity-60 cursor-pointer"
                style={{ 
                  backgroundColor: pickedColor, 
                  color: getContrastColor(pickedColor), 
                  boxShadow: `0 4px 15px ${pickedColor}30`,
                }}
              >
                {isSaving ? "Saving..." : <><FiSave className="text-sm" /> Save Settings</>}
              </button>
            </div>
          </form>
        </div>

      </motion.div>

      {/* Hidden import input */}
      <input ref={importRef} type="file" accept=".json,application/json" className="hidden" onChange={handleImportConfig} />

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} />

      {/* Full Screen Live Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-stone-950 flex flex-col select-none overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 bg-stone-950 border-b border-stone-900 shrink-0">
              <div className="text-left">
                <span className="text-[9px] font-bold uppercase tracking-widest font-mono" style={{ color: pickedColor }}>Live Preview Mode</span>
                <h3 className="text-sm font-bold text-white leading-none mt-1">Cross-Device Responsive View</h3>
              </div>
              <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-900">
                {[{ id: "desktop", icon: FiMonitor }, { id: "tablet", icon: FiTablet }, { id: "mobile", icon: FiSmartphone }].map(({ id, icon: Icon }) => (
                  <button key={id} type="button" onClick={() => setPreviewDeviceMode(id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${previewDeviceMode === id ? "text-black font-black" : "text-stone-400 hover:text-white"}`}
                    style={previewDeviceMode === id ? { backgroundColor: pickedColor } : {}}>
                    <Icon className="text-xs" />
                    <span className="hidden sm:inline capitalize">{id}</span>
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => setIsPreviewOpen(false)}
                className="flex items-center justify-center p-2 rounded-xl border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-800 transition-all cursor-pointer">
                <FiX className="text-sm" />
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-stone-950/40 flex items-center justify-center p-4">
              {previewDeviceMode === "desktop" && (
                <div className="w-full max-w-6xl h-[80vh] rounded-2xl border-[12px] border-stone-800 bg-stone-900 shadow-2xl overflow-hidden flex flex-col">
                  <iframe src={previewUrl} title="Desktop Preview" className="w-full h-full border-none bg-stone-950" />
                </div>
              )}
              {previewDeviceMode === "tablet" && (
                <div className="w-[576px] h-[768px] max-h-full rounded-2xl border-[12px] border-stone-800 bg-stone-900 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-stone-950 rounded-full z-20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-stone-800 rounded-full" />
                  </div>
                  <iframe src={previewUrl} title="Tablet Preview" className="w-full h-full border-none bg-stone-950" />
                </div>
              )}
              {previewDeviceMode === "mobile" && (
                <div className="w-[320px] h-[568px] max-h-full rounded-2xl border-[12px] border-stone-800 bg-stone-900 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-3 bg-stone-950 rounded-full z-20 flex items-center justify-center">
                    <div className="w-1 h-1 bg-stone-800 rounded-full mr-2" />
                    <div className="w-8 h-1 bg-stone-850 rounded-full" />
                  </div>
                  <iframe src={previewUrl} title="Mobile Preview" className="w-full h-full border-none bg-stone-950" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
