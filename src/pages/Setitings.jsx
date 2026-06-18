import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { injectPrimaryColor, looksLikeSvg } from "../utils/svg";
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
  FiBriefcase,
  FiCpu,
  FiChevronUp,
  FiChevronDown,
  FiFolder,
  FiAward,
  FiActivity,
  FiMail,
  FiDownload,
  FiChevronLeft,
  FiMenu,
  FiEye,
  FiX,
  FiMonitor,
  FiTablet,
  FiSmartphone,
  FiMessageSquare,
  FiBookOpen,
  FiHelpCircle,
  FiLock,
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
  defaultFaqs as DEFAULT_FAQS
} from "../constants";
import Particles from "../components/common/Particles";
import DecryptedText from "../components/common/DecryptedText";
import { getContrastColor } from "../utils/color";
const DashboardTab = React.lazy(() => import("../components/Setitings/tabs/DashboardTab"));
const ThemeTab = React.lazy(() => import("../components/Setitings/tabs/ThemeTab"));
const HomeTab = React.lazy(() => import("../components/Setitings/tabs/HomeTab"));
const AboutTab = React.lazy(() => import("../components/Setitings/tabs/AboutTab"));
const ServicesTab = React.lazy(() => import("../components/Setitings/tabs/ServicesTab"));
const SkillsTab = React.lazy(() => import("../components/Setitings/tabs/SkillsTab"));
const ProjectsTab = React.lazy(() => import("../components/Setitings/tabs/ProjectsTab"));
const CertificationsTab = React.lazy(() => import("../components/Setitings/tabs/CertificationsTab"));
const TestimonialsTab = React.lazy(() => import("../components/Setitings/tabs/TestimonialsTab"));
const JourneyTab = React.lazy(() => import("../components/Setitings/tabs/JourneyTab"));
const BlogsTab = React.lazy(() => import("../components/Setitings/tabs/BlogsTab"));
const FaqTab = React.lazy(() => import("../components/Setitings/tabs/FaqTab"));
const ContactTab = React.lazy(() => import("../components/Setitings/tabs/ContactTab"));
const SeoTab = React.lazy(() => import("../components/Setitings/tabs/SeoTab"));





const COLOR_SWATCHES = [
  { name: "Cyan Spark", value: "#00D5D5" },
  { name: "Purple Neon", value: "#a855f7" },
  { name: "Rose Glow", value: "#f43f5e" },
  { name: "Emerald Cyber", value: "#10b981" },
  { name: "Amber Fusion", value: "#f59e0b" },
];





export default function Setitings({
  selectedTemplate,
  setSelectedTemplate,
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
  servicesSubtitle,
  setServicesSubtitle,
  servicesData,
  setServicesData,
  skills,
  setSkills,
  skillCategories,
  setSkillCategories,
  projects,
  setProjects,
  certifications,
  setCertifications,
  timelineData,
  setTimelineData,
  summaryStats,
  setSummaryStats,
  contactInfo,
  setContactInfo,
  themeMode,
  setThemeMode,
  pageTitles,
  setPageTitles,
  pageDescriptions,
  setPageDescriptions,
  sectionVisibility,
  setSectionVisibility,
  sectionTitles,
  setSectionTitles,
  testimonials,
  setTestimonials,
  blogs,
  setBlogs,
  faqs,
  setFaqs,
}) {
  const previewUrl = `${import.meta.env.BASE_URL || "/"}?preview=true`.replace(/\/+\?/g, "/?");
  const [localSelectedTemplate, setLocalSelectedTemplate] = useState(selectedTemplate || "template-1");
  const [pickedColor, setPickedColor] = useState(primaryColor || "#00D5D5");
  const [localRoles, setLocalRoles] = useState(roles || []);
  const [localDescription, setLocalDescription] = useState(description || "");
  const [localCenterSvg, setLocalCenterSvg] = useState(centerSvg || "");
  const [localOrbitingStacks, setLocalOrbitingStacks] = useState(orbitingStacks || []);
  const [localAbout, setLocalAbout] = useState({ ...DEFAULT_ABOUT, ...(about || {}) });
  const [localServicesSubtitle, setLocalServicesSubtitle] = useState(servicesSubtitle || "");
  const [localServicesData, setLocalServicesData] = useState(servicesData || []);
  const [localSkills, setLocalSkills] = useState(skills || []);
  const [localSkillCategories, setLocalSkillCategories] = useState(skillCategories || []);
  const [activeSkillCategoryTab, setActiveSkillCategoryTab] = useState(skillCategories?.[0]?.id || "frontend");
  const [newSkillCategoryName, setNewSkillCategoryName] = useState("");
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillIcon, setNewSkillIcon] = useState("");

  const [localProjects, setLocalProjects] = useState(projects || []);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [newProjectStack, setNewProjectStack] = useState("");
  const [newProjectResponsibility, setNewProjectResponsibility] = useState("");

  const [localCertifications, setLocalCertifications] = useState(certifications || []);
  const [activeCertIdx, setActiveCertIdx] = useState(0);

  const [localTimelineData, setLocalTimelineData] = useState(timelineData || []);
  const [localSummaryStats, setLocalSummaryStats] = useState(summaryStats || []);
  const [localContactInfo, setLocalContactInfo] = useState(contactInfo || {});
  const [localTestimonials, setLocalTestimonials] = useState(testimonials || []);
  const [localBlogs, setLocalBlogs] = useState(blogs || []);
  const [localFaqs, setLocalFaqs] = useState(faqs || []);
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(0);
  const [localThemeMode, setLocalThemeMode] = useState(themeMode || "dark");
  const [localPageTitles, setLocalPageTitles] = useState(pageTitles || {});
  const [localPageDescriptions, setLocalPageDescriptions] = useState(pageDescriptions || {});
  const [localSectionVisibility, setLocalSectionVisibility] = useState(
    sectionVisibility || {
      Home: true,
      About: true,
      Services: true,
      Skills: true,
      Projects: true,
      Certification: true,
      Testimonials: true,
      Journey: true,
      Blogs: true,
      Faq: true,
      Contact: true
    }
  );
  const [localSectionTitles, setLocalSectionTitles] = useState(
    sectionTitles || {
      About: "Who am I ?",
      Services: "What I Offer ?",
      Skills: "What I Know ?",
      Projects: "What I did ?",
      Certification: "What I achieved?",
      Testimonials: "What clients say?",
      Journey: "What I've done ?",
      Blogs: "My Publications & Blogs",
      Faq: "Frequently Asked Questions",
      Contact: "Where to find me ?"
    }
  );

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDesignClicked, setIsDesignClicked] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error' | 'prod'
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewDeviceMode, setPreviewDeviceMode] = useState("desktop");

  const [svgColorInjected, setSvgColorInjected] = useState(false);
  const isProd = !import.meta.env.DEV;

  // In production, trigger a db.json download so the user can commit + redeploy
  const downloadDbJson = (payload) => {
    const jsonStr = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "db.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
    if (skillCategories) {
      setLocalSkillCategories(skillCategories);
    }
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
  }, [
    primaryColor,
    roles,
    description,
    centerSvg,
    orbitingStacks,
    about,
    servicesSubtitle,
    servicesData,
    skills,
    skillCategories,
    projects,
    certifications,
    timelineData,
    summaryStats,
    contactInfo,
    themeMode,
    selectedTemplate,
    pageTitles,
    pageDescriptions,
    sectionVisibility,
    sectionTitles,
    testimonials,
    blogs,
    faqs,
  ]);

  // Handle active skill category tab fallback separately so it doesn't trigger mass resets on other forms
  useEffect(() => {
    if (localSkillCategories && localSkillCategories.length > 0 && !activeSkillCategoryTab) {
      setActiveSkillCategoryTab(localSkillCategories[0].id);
    }
  }, [localSkillCategories, activeSkillCategoryTab]);

  // Redirect away from Journey tab if active template doesn't support it
  useEffect(() => {
    const noJourneyTemplates = ["template-2", "template-3", "template-5", "template-6"];
    if (noJourneyTemplates.includes(localSelectedTemplate) && activeTab === "journey") {
      setActiveTab("theme");
    }
  }, [localSelectedTemplate, activeTab]);

  // Restore preview changes on unmount
  useEffect(() => {
    return () => {
      if (themeMode === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
      if (primaryColor) {
        document.documentElement.style.setProperty("--primary", primaryColor);
        const r = parseInt(primaryColor.slice(1, 3), 16);
        const g = parseInt(primaryColor.slice(3, 5), 16);
        const b = parseInt(primaryColor.slice(5, 7), 16);
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
          document.documentElement.style.setProperty("--primary-rgb", `${r}, ${g}, ${b}`);
        }
        const contrast = getContrastColor(primaryColor);
        document.documentElement.style.setProperty("--primary-contrast", contrast);
      }
    };
  }, [themeMode, primaryColor]);

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
    const contrast = getContrastColor(color);
    document.documentElement.style.setProperty("--primary-contrast", contrast);
  };

  const handleThemeModeChange = (mode) => {
    setLocalThemeMode(mode);
    if (mode === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
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

  // Helper: Services Data
  const updateService = (idx, field, value) => {
    const copy = [...localServicesData];
    copy[idx] = { ...copy[idx], [field]: value };
    setLocalServicesData(copy);
  };
  const addService = () => {
    const copy = [...localServicesData];
    copy.push({ title: "New Service", description: "Service description text", icon: "code" });
    setLocalServicesData(copy);
  };
  const deleteService = (idx) => {
    const copy = localServicesData.filter((_, i) => i !== idx);
    setLocalServicesData(copy);
  };
  const moveService = (idx, direction) => {
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= localServicesData.length) return;
    const copy = [...localServicesData];
    const temp = copy[idx];
    copy[idx] = copy[newIdx];
    copy[newIdx] = temp;
    setLocalServicesData(copy);
  };

  // Helper: Skill Categories & Skills
  const addSkillCategory = () => {
    if (!newSkillCategoryName.trim()) return;
    const id = newSkillCategoryName.toLowerCase().replace(/\s+/g, "-");
    if (localSkillCategories.some(cat => cat.id === id)) {
      alert("A category with this name already exists.");
      return;
    }
    const newCat = {
      id,
      label: newSkillCategoryName.trim(),
      skillNames: [],
      bullets: []
    };
    const copy = [...localSkillCategories, newCat];
    setLocalSkillCategories(copy);
    setActiveSkillCategoryTab(id);
    setNewSkillCategoryName("");
  };

  const deleteSkillCategory = (id) => {
    const copy = localSkillCategories.filter(cat => cat.id !== id);
    setLocalSkillCategories(copy);
    if (activeSkillCategoryTab === id) {
      setActiveSkillCategoryTab(copy[0]?.id || "");
    }
  };

  const renameSkillCategory = (id, newLabel) => {
    const copy = localSkillCategories.map(cat => {
      if (cat.id === id) {
        return { ...cat, label: newLabel };
      }
      return cat;
    });
    setLocalSkillCategories(copy);
  };

  const updateCategoryBullet = (categoryId, bulletIdx, value) => {
    const copy = localSkillCategories.map(cat => {
      if (cat.id === categoryId) {
        const bullets = [...cat.bullets];
        bullets[bulletIdx] = value;
        return { ...cat, bullets };
      }
      return cat;
    });
    setLocalSkillCategories(copy);
  };

  const addCategoryBullet = (categoryId) => {
    const copy = localSkillCategories.map(cat => {
      if (cat.id === categoryId) {
        const bullets = [...cat.bullets, "New key expertise point"];
        return { ...cat, bullets };
      }
      return cat;
    });
    setLocalSkillCategories(copy);
  };

  const deleteCategoryBullet = (categoryId, bulletIdx) => {
    const copy = localSkillCategories.map(cat => {
      if (cat.id === categoryId) {
        const bullets = cat.bullets.filter((_, i) => i !== bulletIdx);
        return { ...cat, bullets };
      }
      return cat;
    });
    setLocalSkillCategories(copy);
  };

  const moveCategoryBullet = (categoryId, bulletIdx, direction) => {
    const newIdx = bulletIdx + direction;
    const cat = localSkillCategories.find(c => c.id === categoryId);
    if (!cat || newIdx < 0 || newIdx >= cat.bullets.length) return;
    
    const copy = localSkillCategories.map(c => {
      if (c.id === categoryId) {
        const bullets = [...c.bullets];
        const temp = bullets[bulletIdx];
        bullets[bulletIdx] = bullets[newIdx];
        bullets[newIdx] = temp;
        return { ...c, bullets };
      }
      return c;
    });
    setLocalSkillCategories(copy);
  };

  const toggleSkillInCategory = (categoryId, skillName) => {
    const copy = localSkillCategories.map(cat => {
      if (cat.id === categoryId) {
        const skillNames = [...(cat.skillNames || [])];
        const idx = skillNames.indexOf(skillName);
        if (idx > -1) {
          skillNames.splice(idx, 1);
        } else {
          skillNames.push(skillName);
        }
        return { ...cat, skillNames };
      }
      return cat;
    });
    setLocalSkillCategories(copy);
  };

  const addCustomSkill = () => {
    if (!newSkillName.trim()) return;
    if (localSkills.some(s => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) {
      alert("A skill with this name already exists.");
      return;
    }
    const newSkill = {
      name: newSkillName.trim(),
      icon: newSkillIcon || ""
    };
    setLocalSkills([...localSkills, newSkill]);
    setNewSkillName("");
    setNewSkillIcon("");
  };

  const deleteCustomSkill = (name) => {
    const copySkills = localSkills.filter(s => s.name !== name);
    setLocalSkills(copySkills);
    
    const copyCategories = localSkillCategories.map(cat => {
      const skillNames = (cat.skillNames || []).filter(s => s !== name);
      return { ...cat, skillNames };
    });
    setLocalSkillCategories(copyCategories);
  };

  const addProject = () => {
    const copy = [...localProjects];
    copy.push({
      title: "New Project",
      synopsis: "Project synopsis...",
      category: "Full Stack (Web)",
      platform: "Web",
      duration: "Jan 2026 - Present",
      role: "Lead Developer",
      client: "Client Name",
      teamSize: 1,
      stacks: ["React.js", "TypeScript"],
      responsibilities: ["Developed core modules", "Integrated APIs"],
      image: ""
    });
    setLocalProjects(copy);
    setActiveProjectIdx(copy.length - 1);
  };

  const deleteProject = (idx) => {
    const copy = localProjects.filter((_, i) => i !== idx);
    setLocalProjects(copy);
    if (activeProjectIdx >= copy.length) {
      setActiveProjectIdx(Math.max(0, copy.length - 1));
    }
  };

  const moveProject = (idx, direction) => {
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= localProjects.length) return;
    const copy = [...localProjects];
    const temp = copy[idx];
    copy[idx] = copy[newIdx];
    copy[newIdx] = temp;
    setLocalProjects(copy);
    setActiveProjectIdx(newIdx);
  };

  const updateActiveProjectField = (field, value) => {
    if (localProjects.length === 0) return;
    const copy = [...localProjects];
    copy[activeProjectIdx] = { ...copy[activeProjectIdx], [field]: value };
    setLocalProjects(copy);
  };

  const addStackToActiveProject = () => {
    if (!newProjectStack.trim() || localProjects.length === 0) return;
    const currentProject = localProjects[activeProjectIdx];
    const stacks = [...(currentProject.stacks || [])];
    if (stacks.includes(newProjectStack.trim())) {
      alert("Stack already exists.");
      return;
    }
    stacks.push(newProjectStack.trim());
    updateActiveProjectField("stacks", stacks);
    setNewProjectStack("");
  };

  const deleteStackFromActiveProject = (stackName) => {
    if (localProjects.length === 0) return;
    const currentProject = localProjects[activeProjectIdx];
    const stacks = (currentProject.stacks || []).filter(s => s !== stackName);
    updateActiveProjectField("stacks", stacks);
  };

  const addResponsibilityToActiveProject = () => {
    if (!newProjectResponsibility.trim() || localProjects.length === 0) return;
    const currentProject = localProjects[activeProjectIdx];
    const responsibilities = [...(currentProject.responsibilities || []), newProjectResponsibility.trim()];
    updateActiveProjectField("responsibilities", responsibilities);
    setNewProjectResponsibility("");
  };

  const updateResponsibilityInActiveProject = (idx, value) => {
    if (localProjects.length === 0) return;
    const currentProject = localProjects[activeProjectIdx];
    const responsibilities = [...(currentProject.responsibilities || [])];
    responsibilities[idx] = value;
    updateActiveProjectField("responsibilities", responsibilities);
  };

  const deleteResponsibilityFromActiveProject = (idx) => {
    if (localProjects.length === 0) return;
    const currentProject = localProjects[activeProjectIdx];
    const responsibilities = (currentProject.responsibilities || []).filter((_, i) => i !== idx);
    updateActiveProjectField("responsibilities", responsibilities);
  };

  const moveResponsibilityInActiveProject = (idx, direction) => {
    if (localProjects.length === 0) return;
    const currentProject = localProjects[activeProjectIdx];
    const responsibilities = [...(currentProject.responsibilities || [])];
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= responsibilities.length) return;
    const temp = responsibilities[idx];
    responsibilities[idx] = responsibilities[newIdx];
    responsibilities[newIdx] = temp;
    updateActiveProjectField("responsibilities", responsibilities);
  };

  const addCert = () => {
    const copy = [...localCertifications];
    const newId = copy.length > 0 ? Math.max(...copy.map(c => c.id || 0)) + 1 : 1;
    copy.push({
      id: newId,
      title: "New Certification",
      description: "Description outline...",
      image: "",
      lastUpdated: "Feb - 2026",
      issuer: "Issuer Name",
      offeredBy: "Offered By",
      pdfFile: ""
    });
    setLocalCertifications(copy);
    setActiveCertIdx(copy.length - 1);
  };

  const deleteCert = (idx) => {
    const copy = localCertifications.filter((_, i) => i !== idx);
    setLocalCertifications(copy);
    if (activeCertIdx >= copy.length) {
      setActiveCertIdx(Math.max(0, copy.length - 1));
    }
  };

  const moveCert = (idx, direction) => {
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= localCertifications.length) return;
    const copy = [...localCertifications];
    const temp = copy[idx];
    copy[idx] = copy[newIdx];
    copy[newIdx] = temp;
    setLocalCertifications(copy);
    setActiveCertIdx(newIdx);
  };

  const updateActiveCertField = (field, value) => {
    if (localCertifications.length === 0) return;
    const copy = [...localCertifications];
    copy[activeCertIdx] = { ...copy[activeCertIdx], [field]: value };
    setLocalCertifications(copy);
  };

  // Helper: Journey/Timeline & Summary Stats
  const addTimelineItem = () => {
    const copy = [...localTimelineData];
    copy.push({
      time: "New Duration",
      title: "New Title",
      org: "Organization Name",
      location: "Location",
      percent: ""
    });
    setLocalTimelineData(copy);
    setActiveTimelineIdx(copy.length - 1);
  };

  const deleteTimelineItem = (idx) => {
    const copy = localTimelineData.filter((_, i) => i !== idx);
    setLocalTimelineData(copy);
    if (activeTimelineIdx >= copy.length) {
      setActiveTimelineIdx(Math.max(0, copy.length - 1));
    }
  };

  const moveTimelineItem = (idx, direction) => {
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= localTimelineData.length) return;
    const copy = [...localTimelineData];
    const temp = copy[idx];
    copy[idx] = copy[newIdx];
    copy[newIdx] = temp;
    setLocalTimelineData(copy);
    setActiveTimelineIdx(newIdx);
  };

  const updateActiveTimelineField = (field, value) => {
    if (localTimelineData.length === 0) return;
    const copy = [...localTimelineData];
    copy[activeTimelineIdx] = { ...copy[activeTimelineIdx], [field]: value };
    setLocalTimelineData(copy);
  };

  const updateSummaryStat = (idx, key, value) => {
    const copy = [...localSummaryStats];
    if (key === "value") {
      const numVal = parseFloat(value);
      copy[idx] = { ...copy[idx], [key]: isNaN(numVal) ? 0 : numVal };
    } else {
      copy[idx] = { ...copy[idx], [key]: value };
    }
    setLocalSummaryStats(copy);
  };

  const updateContactInfoField = (field, value) => {
    setLocalContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpenPreview = () => {
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
    };

    localStorage.setItem("portfolio_preview_config", JSON.stringify(payload));
    setIsPreviewOpen(true);
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
    };

    try {
      const isDev = import.meta.env.DEV;
      const apiUrl = "/api/theme";
      let responseSuccess = false;

      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const resData = await res.json();
          if (resData.success) {
            responseSuccess = true;
          }
        }
      } catch (apiErr) {
        console.warn("Failed to POST to API, fallback might be used:", apiErr);
      }

      // Always save to localStorage (works in both dev and prod)
      const lsKeys = [
        ["portfolio_theme_color", pickedColor],
        ["portfolio_roles", JSON.stringify(localRoles)],
        ["portfolio_description", localDescription],
        ["portfolio_center_svg", processedSvg],
        ["portfolio_orbiting_stacks", JSON.stringify(localOrbitingStacks)],
        ["portfolio_about", JSON.stringify(localAbout)],
        ["portfolio_services_subtitle", localServicesSubtitle],
        ["portfolio_services_data", JSON.stringify(localServicesData)],
        ["portfolio_skills", JSON.stringify(localSkills)],
        ["portfolio_skill_categories", JSON.stringify(localSkillCategories)],
        ["portfolio_projects", JSON.stringify(localProjects)],
        ["portfolio_certifications", JSON.stringify(localCertifications)],
        ["portfolio_timeline_data", JSON.stringify(localTimelineData)],
        ["portfolio_summary_stats", JSON.stringify(localSummaryStats)],
        ["portfolio_contact_info", JSON.stringify(localContactInfo)],
        ["portfolio_theme_mode", localThemeMode],
        ["portfolio_selected_template", localSelectedTemplate],
        ["portfolio_page_titles", JSON.stringify(localPageTitles)],
        ["portfolio_page_descriptions", JSON.stringify(localPageDescriptions)],
        ["portfolio_section_visibility", JSON.stringify(localSectionVisibility)],
        ["portfolio_section_titles", JSON.stringify(localSectionTitles)],
        ["portfolio_testimonials", JSON.stringify(localTestimonials)],
        ["portfolio_blogs", JSON.stringify(localBlogs)],
        ["portfolio_faqs", JSON.stringify(localFaqs)],
      ];
      lsKeys.forEach(([k, v]) => localStorage.setItem(k, v));

      // Update global states
      setPrimaryColor(pickedColor);
      setRoles(localRoles);
      setDescription(localDescription);
      setCenterSvg(processedSvg);
      setLocalCenterSvg(processedSvg);
      setOrbitingStacks(localOrbitingStacks);
      setAbout(localAbout);
      setServicesSubtitle(localServicesSubtitle);
      setServicesData(localServicesData);
      setSkills(localSkills);
      setSkillCategories(localSkillCategories);
      setProjects(localProjects);
      setCertifications(localCertifications);
      setTimelineData(localTimelineData);
      setSummaryStats(localSummaryStats);
      setContactInfo(localContactInfo);
      setThemeMode(localThemeMode);
      setSelectedTemplate(localSelectedTemplate);
      setPageTitles(localPageTitles);
      setPageDescriptions(localPageDescriptions);
      setSectionVisibility(localSectionVisibility);
      setSectionTitles(localSectionTitles);
      setTestimonials(localTestimonials);
      setBlogs(localBlogs);
      setFaqs(localFaqs);

      if (responseSuccess) {
        setSaveStatus("success");
      } else {
        if (!isDev) {
          // Fallback to downloading db.json in production if DB API fails
          downloadDbJson(payload);
          setSaveStatus("prod");
        } else {
          setSaveStatus("error");
        }
      }
    } catch (err) {
      console.error("Failed to save theme settings:", err);
      // On any error, still attempt localStorage + download fallback
      try {
        const lsKeys = [
          ["portfolio_theme_color", pickedColor],
          ["portfolio_roles", JSON.stringify(localRoles)],
          ["portfolio_description", localDescription],
          ["portfolio_center_svg", processedSvg],
          ["portfolio_orbiting_stacks", JSON.stringify(localOrbitingStacks)],
          ["portfolio_about", JSON.stringify(localAbout)],
          ["portfolio_services_subtitle", localServicesSubtitle],
          ["portfolio_services_data", JSON.stringify(localServicesData)],
          ["portfolio_skills", JSON.stringify(localSkills)],
          ["portfolio_skill_categories", JSON.stringify(localSkillCategories)],
          ["portfolio_projects", JSON.stringify(localProjects)],
          ["portfolio_certifications", JSON.stringify(localCertifications)],
          ["portfolio_timeline_data", JSON.stringify(localTimelineData)],
          ["portfolio_summary_stats", JSON.stringify(localSummaryStats)],
          ["portfolio_contact_info", JSON.stringify(localContactInfo)],
          ["portfolio_theme_mode", localThemeMode],
          ["portfolio_selected_template", localSelectedTemplate],
          ["portfolio_page_titles", JSON.stringify(localPageTitles)],
          ["portfolio_page_descriptions", JSON.stringify(localPageDescriptions)],
          ["portfolio_section_visibility", JSON.stringify(localSectionVisibility)],
          ["portfolio_section_titles", JSON.stringify(localSectionTitles)],
          ["portfolio_testimonials", JSON.stringify(localTestimonials)],
          ["portfolio_blogs", JSON.stringify(localBlogs)],
          ["portfolio_faqs", JSON.stringify(localFaqs)],
        ];
        lsKeys.forEach(([k, v]) => localStorage.setItem(k, v));
      } catch {/* ignore */}
      setPrimaryColor(pickedColor);
      setRoles(localRoles);
      setDescription(localDescription);
      setCenterSvg(processedSvg);
      setLocalCenterSvg(processedSvg);
      setOrbitingStacks(localOrbitingStacks);
      setAbout(localAbout);
      setServicesSubtitle(localServicesSubtitle);
      setServicesData(localServicesData);
      setSkills(localSkills);
      setSkillCategories(localSkillCategories);
      setProjects(localProjects);
      setCertifications(localCertifications);
      setTimelineData(localTimelineData);
      setSummaryStats(localSummaryStats);
      setContactInfo(localContactInfo);
      setThemeMode(localThemeMode);
      setSelectedTemplate(localSelectedTemplate);
      setPageTitles(localPageTitles);
      setPageDescriptions(localPageDescriptions);
      setSectionVisibility(localSectionVisibility);
      setSectionTitles(localSectionTitles);
      setTestimonials(localTestimonials);
      setBlogs(localBlogs);
      setFaqs(localFaqs);
      if (isProd) {
        downloadDbJson(payload);
        setSaveStatus("prod");
      } else {
        setSaveStatus("success");
      }
    } finally {
      setIsSaving(false);
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }
  };

  const resetToDefault = () => {
    handleColorChange("#00D5D5");
    setLocalThemeMode("dark");
    setLocalSelectedTemplate("template-1");
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
    setLocalServicesSubtitle("High-performance, scalable, and secure software development solutions tailored to meet business objectives and deliver outstanding user experiences.");
    setLocalServicesData(DEFAULT_SERVICES_DATA);
    setLocalSkills(DEFAULT_SKILLS);
    setLocalSkillCategories(DEFAULT_SKILL_CATEGORIES);
    setLocalProjects(DEFAULT_PROJECTS || []);
    setActiveProjectIdx(0);
    setLocalCertifications(DEFAULT_CERTIFICATIONS || []);
    setActiveCertIdx(0);
    setLocalTimelineData(DEFAULT_TIMELINE_DATA || []);
    setActiveTimelineIdx(0);
    setLocalSummaryStats(DEFAULT_SUMMARY_STATS || []);
    setLocalContactInfo(DEFAULT_CONTACT_INFO || {});
    setLocalTestimonials(DEFAULT_TESTIMONIALS || []);
    setLocalBlogs(DEFAULT_BLOGS || []);
    setLocalFaqs(DEFAULT_FAQS || []);
    setLocalPageTitles(defaultPageTitles);
    setLocalPageDescriptions(defaultPageDescriptions);
    setLocalSectionVisibility({
      Home: true,
      About: true,
      Services: true,
      Skills: true,
      Projects: true,
      Certification: true,
      Testimonials: true,
      Journey: true,
      Blogs: true,
      Faq: true,
      Contact: true
    });
    setLocalSectionTitles({
      About: "Who am I ?",
      Services: "What I Offer ?",
      Skills: "What I Know ?",
      Projects: "What I did ?",
      Certification: "What I achieved?",
      Testimonials: "What clients say?",
      Journey: "What I've done ?",
      Blogs: "My Publications & Blogs",
      Faq: "Frequently Asked Questions",
      Contact: "Where to find me ?"
    });
  };

  // Nav tabs definition
  const tabs = [
    { id: "dashboard", label: "Console Dashboard", icon: FiGrid },
    { id: "theme", label: "Theme & Colors", icon: FiSliders },
    { id: "home", label: "Home Section", icon: FiType },
    { id: "about", label: "About Section", icon: FiUser },
    { id: "services", label: "Services Section", icon: FiBriefcase },
    { id: "skills", label: "Skills Section", icon: FiCpu },
    { id: "projects", label: "Projects Section", icon: FiFolder },
    { id: "certifications", label: "Certifications Section", icon: FiAward },
    { id: "testimonials", label: "Testimonials Section", icon: FiMessageSquare },
    { id: "journey", label: "Journey Section", icon: FiActivity },
    { id: "blogs", label: "Blogs Section", icon: FiBookOpen },
    { id: "faq", label: "FAQ Section", icon: FiHelpCircle },
    { id: "contact", label: "Contact Section", icon: FiMail },
    { id: "seo", label: "SEO & Metadata", icon: FiCompass }
  ];

  const filteredTabs = tabs.filter(t => {
    const noJourneyTemplates = ["template-2", "template-3", "template-5", "template-6"];
    if (t.id === "journey" && noJourneyTemplates.includes(localSelectedTemplate)) {
      return false;
    }
    return true;
  });

  const renderTabButton = (tab) => {
    const isLocked = !isDesignClicked && !["dashboard", "theme"].includes(tab.id);
    const IconComponent = isLocked ? FiLock : tab.icon;
    const isActive = activeTab === tab.id;
    
    const getSectionNameByTabId = (tabId) => {
      if (tabId === "certifications") return "Certification";
      return tabId.charAt(0).toUpperCase() + tabId.slice(1);
    };
    
    const sectionName = getSectionNameByTabId(tab.id);
    const isHidden = ["home", "about", "services", "skills", "projects", "certifications", "journey", "contact"].includes(tab.id) && localSectionVisibility[sectionName] === false;

    return (
      <button
        key={tab.id}
        type="button"
        title={isLocked ? "Please click/select a design layout under 'Theme & Colors' tab first" : (isSidebarCollapsed ? tab.label.replace(" Section", "") : undefined)}
        onClick={() => {
          if (isLocked) {
            alert("Please select/click a layout design card in the 'Theme & Colors' tab first to unlock this section.");
            setActiveTab("theme");
          } else {
            setActiveTab(tab.id);
          }
        }}
        className={`flex items-center ${
          isSidebarCollapsed ? "md:justify-center md:px-0 md:h-10 md:w-10 md:mx-auto" : "gap-3 px-4 py-2.5"
        } text-[10.5px] font-bold uppercase tracking-wider rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer text-left w-full border-l-2 ${
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
              {isLocked && (
                <span className="text-[8px] text-stone-500 font-extrabold uppercase font-mono tracking-tighter">
                  (locked)
                </span>
              )}
            </span>
            {isHidden && !isLocked && (
              <span className="text-[8px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20 font-bold font-mono">
                HIDDEN
              </span>
            )}
          </span>
        )}
      </button>
    );
  };

  const renderSectionVisibilityBanner = (sectionName) => {
    const isVisible = localSectionVisibility[sectionName] !== false;
    return (
      <div
        className="p-4 rounded-2xl border flex items-center justify-between mb-6"
        style={{
          background: isVisible ? `${pickedColor}08` : "rgba(239, 68, 68, 0.05)",
          borderColor: isVisible ? `${pickedColor}20` : "rgba(239, 68, 68, 0.15)",
        }}
      >
        <div className="text-left">
          <span className="text-xs font-bold text-white block">Section Active Status</span>
          <span className="text-[9.5px] text-stone-400 font-medium leading-normal block mt-0.5">
            {isVisible 
              ? `The ${sectionName} section is active and visible in the main portfolio scrolling view and the sidebar.` 
              : `The ${sectionName} section is currently hidden from both the portfolio scrolling view and the sidebar.`}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setLocalSectionVisibility(prev => ({ ...prev, [sectionName]: !isVisible }))}
          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-xl cursor-pointer transition-all border shrink-0"
          style={{
            color: isVisible ? pickedColor : "#f87171",
            borderColor: isVisible ? `${pickedColor}30` : "rgba(239, 68, 68, 0.3)",
            backgroundColor: isVisible ? `${pickedColor}10` : "rgba(239, 68, 68, 0.1)",
          }}
        >
          {isVisible ? "Hide Section" : "Show Section"}
        </button>
      </div>
    );
  };


  return (
    <div className="setitings-console-page relative z-0 h-screen w-screen flex flex-col md:flex-row bg-[var(--bg-main)] text-[var(--text-white-or-dark)] overflow-hidden font-sans">
      {/* Background Particles */}
      <div className="fixed inset-0 w-full h-full -z-10 bg-transparent">
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full glass-panel relative z-10 flex flex-col md:flex-row overflow-hidden border-none"
        style={{
          background: "rgba(10, 10, 10, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* SIDEBAR NAVIGATION PANEL */}
        <div className={`w-full ${isSidebarCollapsed ? "md:w-[80px] md:p-4" : "md:w-[280px] md:p-6"} bg-stone-950 border-b md:border-b-0 md:border-r border-stone-900/80 p-4 flex flex-col justify-between shrink-0 select-none h-full transition-all duration-300`}>
          <div className="flex flex-col gap-6">
            {/* Logo/Brand Header */}
            <div className={`flex ${isSidebarCollapsed ? "md:flex-col md:items-center md:gap-3" : "items-center justify-between"}`}>
              <div className={`flex items-center gap-2 ${isSidebarCollapsed ? "md:hidden" : ""}`}>
                <FiCompass className="text-xl" style={{ color: pickedColor }} />
                <span className="font-mono text-xs uppercase font-extrabold tracking-[0.2em] text-white">
                  Dev Console
                </span>
              </div>
              {isSidebarCollapsed && (
                <FiCompass className="hidden md:block text-xl" style={{ color: pickedColor }} />
              )}
              <button
                type="button"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden md:flex items-center justify-center p-2 rounded-xl border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-800 cursor-pointer transition-colors"
                title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {isSidebarCollapsed ? <FiMenu /> : <FiChevronLeft />}
              </button>
            </div>

            {/* Mobile Navigation Dropdown Select */}
            <div className="md:hidden w-full">
              <select
                value={activeTab}
                onChange={(e) => {
                  const isLocked = !isDesignClicked && !["dashboard", "theme"].includes(e.target.value);
                  if (isLocked) {
                    alert("Please select/click a layout design card in the 'Theme & Colors' tab first to unlock this section.");
                    setActiveTab("theme");
                  } else {
                    setActiveTab(e.target.value);
                  }
                }}
                className="w-full bg-stone-900 border border-stone-850 outline-none text-xs rounded-xl px-4 py-2.5 text-white font-bold cursor-pointer transition-all focus:border-primary"
              >
                {filteredTabs.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label.replace(" Section", "")}
                  </option>
                ))}
              </select>
            </div>

            {/* Nav Tabs categorized by sections (Desktop only) */}
            <div className="hidden md:flex md:flex-col gap-5 overflow-y-auto max-h-[70vh] pr-1.5 scrollbar-thin select-none">
              <div>
                {!isSidebarCollapsed && (
                  <span className="text-[8px] font-bold tracking-[0.2em] text-stone-500 uppercase block mb-1.5 px-3 select-none">
                    Overview
                  </span>
                )}
                <nav className="flex md:flex-col gap-0.5">
                  {filteredTabs.filter(t => t.id === "dashboard").map(renderTabButton)}
                </nav>
              </div>

              <div>
                {!isSidebarCollapsed && (
                  <span className="text-[8px] font-bold tracking-[0.2em] text-stone-500 uppercase block mb-1.5 px-3 select-none">
                    Design Accent
                  </span>
                )}
                <nav className="flex md:flex-col gap-0.5">
                  {filteredTabs.filter(t => t.id === "theme").map(renderTabButton)}
                </nav>
              </div>

              <div>
                {!isSidebarCollapsed && (
                  <span className="text-[8px] font-bold tracking-[0.2em] text-stone-500 uppercase block mb-1.5 px-3 select-none">
                    About & Services
                  </span>
                )}
                <nav className="flex md:flex-col gap-0.5">
                  {filteredTabs.filter(t => ["home", "about", "services", "testimonials"].includes(t.id)).map(renderTabButton)}
                </nav>
              </div>

              <div>
                {!isSidebarCollapsed && (
                  <span className="text-[8px] font-bold tracking-[0.2em] text-stone-500 uppercase block mb-1.5 px-3 select-none">
                    Skills & Works
                  </span>
                )}
                <nav className="flex md:flex-col gap-0.5">
                  {filteredTabs.filter(t => ["skills", "projects", "certifications", "journey", "blogs"].includes(t.id)).map(renderTabButton)}
                </nav>
              </div>

              <div>
                {!isSidebarCollapsed && (
                  <span className="text-[8px] font-bold tracking-[0.2em] text-stone-500 uppercase block mb-1.5 px-3 select-none">
                    Connect
                  </span>
                )}
                <nav className="flex md:flex-col gap-0.5">
                  {filteredTabs.filter(t => ["contact", "faq"].includes(t.id)).map(renderTabButton)}
                </nav>
              </div>

              <div>
                {!isSidebarCollapsed && (
                  <span className="text-[8px] font-bold tracking-[0.2em] text-stone-500 uppercase block mb-1.5 px-3 select-none">
                    SEO Config
                  </span>
                )}
                <nav className="flex md:flex-col gap-0.5">
                  {filteredTabs.filter(t => t.id === "seo").map(renderTabButton)}
                </nav>
              </div>
            </div>
          </div>

          {/* User Profile or Branding Footer */}
          <div className="hidden md:flex items-center gap-3 border-t border-stone-900 pt-5 mt-5">
            <Link
              to="/"
              className={`inline-flex items-center justify-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-stone-400 hover:text-white transition-all duration-200 w-full py-2 bg-stone-900/50 border border-stone-800 rounded-xl hover:border-primary/20 ${
                isSidebarCollapsed ? "px-0" : "px-4"
              }`}
              title={isSidebarCollapsed ? "Back to App" : undefined}
            >
              <FiArrowLeft className="text-xs" /> 
              {!isSidebarCollapsed && <span>Back to App</span>}
            </Link>
          </div>
        </div>

        {/* SETTINGS CONTENT CONTAINER PANEL */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <form onSubmit={handleSave} className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header info bar */}
            <div className="flex items-center justify-between border-b border-stone-900/60 px-6 sm:px-8 py-5 select-none shrink-0 bg-stone-950/10">
              <div className="text-left">
                <span className="text-[9px] font-bold uppercase tracking-widest text-primary font-mono">
                  Module Configuration
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
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
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 sm:px-8 py-6 text-left space-y-6 scrollbar-thin">
              <Suspense fallback={
                <div className="flex items-center justify-center p-12 text-stone-500 font-bold uppercase tracking-wider text-[10px] select-none">
                  Loading Config Module...
                </div>
              }>
                {activeTab === "dashboard" && (
                  <DashboardTab
                    localProjects={localProjects}
                    localCertifications={localCertifications}
                    localSkills={localSkills}
                    localTimelineData={localTimelineData}
                    localAbout={localAbout}
                    localSectionVisibility={localSectionVisibility}
                    setLocalSectionVisibility={setLocalSectionVisibility}
                    pickedColor={pickedColor}
                    localThemeMode={localThemeMode}
                    tabs={tabs}
                    setActiveTab={setActiveTab}
                    selectedTemplate={localSelectedTemplate}
                  />
                )}
                {activeTab === "theme" && (
                  <ThemeTab
                    pickedColor={pickedColor}
                    handleColorChange={handleColorChange}
                    localThemeMode={localThemeMode}
                    handleThemeModeChange={handleThemeModeChange}
                    localAbout={localAbout}
                    localSelectedTemplate={localSelectedTemplate}
                    setLocalSelectedTemplate={setLocalSelectedTemplate}
                    onSelectDesign={() => setIsDesignClicked(true)}
                  />
                )}
                {activeTab === "seo" && (
                  <SeoTab
                    pickedColor={pickedColor}
                    tabs={tabs}
                    localPageTitles={localPageTitles}
                    setLocalPageTitles={setLocalPageTitles}
                    localPageDescriptions={localPageDescriptions}
                    setLocalPageDescriptions={setLocalPageDescriptions}
                  />
                )}
                {activeTab === "home" && (
                  <HomeTab
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
                    pickedColor={pickedColor}
                    renderSectionVisibilityBanner={renderSectionVisibilityBanner}
                    localSectionTitles={localSectionTitles}
                    setLocalSectionTitles={setLocalSectionTitles}
                    selectedTemplate={localSelectedTemplate}
                  />
                )}

                {activeTab === "about" && (
                  <AboutTab
                    localAbout={localAbout}
                    updateAbout={updateAbout}
                    updateAboutStat={updateAboutStat}
                    updateAboutHighlight={updateAboutHighlight}
                    updateAboutSocialLink={updateAboutSocialLink}
                    updateAboutTitle={updateAboutTitle}
                    pickedColor={pickedColor}
                    renderSectionVisibilityBanner={renderSectionVisibilityBanner}
                    localSectionTitles={localSectionTitles}
                    setLocalSectionTitles={setLocalSectionTitles}
                  />
                )}

                {activeTab === "services" && (
                  <ServicesTab
                    localServicesSubtitle={localServicesSubtitle}
                    setLocalServicesSubtitle={setLocalServicesSubtitle}
                    localServicesData={localServicesData}
                    updateService={updateService}
                    addService={addService}
                    deleteService={deleteService}
                    moveService={moveService}
                    pickedColor={pickedColor}
                    renderSectionVisibilityBanner={renderSectionVisibilityBanner}
                    localSectionTitles={localSectionTitles}
                    setLocalSectionTitles={setLocalSectionTitles}
                  />
                )}

                {activeTab === "skills" && (
                  <SkillsTab
                    localSkills={localSkills}
                    localSkillCategories={localSkillCategories}
                    activeSkillCategoryTab={activeSkillCategoryTab}
                    setActiveSkillCategoryTab={setActiveSkillCategoryTab}
                    newSkillCategoryName={newSkillCategoryName}
                    setNewSkillCategoryName={setNewSkillCategoryName}
                    newSkillName={newSkillName}
                    setNewSkillName={setNewSkillName}
                    newSkillIcon={newSkillIcon}
                    setNewSkillIcon={setNewSkillIcon}
                    addSkillCategory={addSkillCategory}
                    deleteSkillCategory={deleteSkillCategory}
                    renameSkillCategory={renameSkillCategory}
                    updateCategoryBullet={updateCategoryBullet}
                    addCategoryBullet={addCategoryBullet}
                    deleteCategoryBullet={deleteCategoryBullet}
                    moveCategoryBullet={moveCategoryBullet}
                    toggleSkillInCategory={toggleSkillInCategory}
                    addCustomSkill={addCustomSkill}
                    deleteCustomSkill={deleteCustomSkill}
                    pickedColor={pickedColor}
                    renderSectionVisibilityBanner={renderSectionVisibilityBanner}
                    localSectionTitles={localSectionTitles}
                    setLocalSectionTitles={setLocalSectionTitles}
                  />
                )}

                {activeTab === "projects" && (
                  <ProjectsTab
                    localProjects={localProjects}
                    activeProjectIdx={activeProjectIdx}
                    setActiveProjectIdx={setActiveProjectIdx}
                    newProjectStack={newProjectStack}
                    setNewProjectStack={setNewProjectStack}
                    newProjectResponsibility={newProjectResponsibility}
                    setNewProjectResponsibility={setNewProjectResponsibility}
                    addProject={addProject}
                    deleteProject={deleteProject}
                    moveProject={moveProject}
                    updateActiveProjectField={updateActiveProjectField}
                    addStackToActiveProject={addStackToActiveProject}
                    deleteStackFromActiveProject={deleteStackFromActiveProject}
                    addResponsibilityToActiveProject={addResponsibilityToActiveProject}
                    updateResponsibilityInActiveProject={updateResponsibilityInActiveProject}
                    deleteResponsibilityFromActiveProject={deleteResponsibilityFromActiveProject}
                    moveResponsibilityInActiveProject={moveResponsibilityInActiveProject}
                    pickedColor={pickedColor}
                    renderSectionVisibilityBanner={renderSectionVisibilityBanner}
                    localSectionTitles={localSectionTitles}
                    setLocalSectionTitles={setLocalSectionTitles}
                  />
                )}

                {activeTab === "certifications" && (
                  <CertificationsTab
                    localCertifications={localCertifications}
                    activeCertIdx={activeCertIdx}
                    setActiveCertIdx={setActiveCertIdx}
                    addCert={addCert}
                    deleteCert={deleteCert}
                    moveCert={moveCert}
                    updateActiveCertField={updateActiveCertField}
                    pickedColor={pickedColor}
                    renderSectionVisibilityBanner={renderSectionVisibilityBanner}
                    localSectionTitles={localSectionTitles}
                    setLocalSectionTitles={setLocalSectionTitles}
                  />
                )}

                {activeTab === "testimonials" && (
                  <TestimonialsTab
                    localTestimonials={localTestimonials}
                    setLocalTestimonials={setLocalTestimonials}
                    pickedColor={pickedColor}
                    renderSectionVisibilityBanner={renderSectionVisibilityBanner}
                    localSectionTitles={localSectionTitles}
                    setLocalSectionTitles={setLocalSectionTitles}
                  />
                )}

                {activeTab === "journey" && (
                  <JourneyTab
                    pickedColor={pickedColor}
                    renderSectionVisibilityBanner={renderSectionVisibilityBanner}
                    localSectionTitles={localSectionTitles}
                    setLocalSectionTitles={setLocalSectionTitles}
                    localSummaryStats={localSummaryStats}
                    updateSummaryStat={updateSummaryStat}
                    localTimelineData={localTimelineData}
                    activeTimelineIdx={activeTimelineIdx}
                    setActiveTimelineIdx={setActiveTimelineIdx}
                    addTimelineItem={addTimelineItem}
                    deleteTimelineItem={deleteTimelineItem}
                    moveTimelineItem={moveTimelineItem}
                    updateActiveTimelineField={updateActiveTimelineField}
                  />
                )}

                {activeTab === "blogs" && (
                  <BlogsTab
                    localBlogs={localBlogs}
                    setLocalBlogs={setLocalBlogs}
                    pickedColor={pickedColor}
                    renderSectionVisibilityBanner={renderSectionVisibilityBanner}
                    localSectionTitles={localSectionTitles}
                    setLocalSectionTitles={setLocalSectionTitles}
                  />
                )}

                {activeTab === "faq" && (
                  <FaqTab
                    localFaqs={localFaqs}
                    setLocalFaqs={setLocalFaqs}
                    pickedColor={pickedColor}
                    renderSectionVisibilityBanner={renderSectionVisibilityBanner}
                    localSectionTitles={localSectionTitles}
                    setLocalSectionTitles={setLocalSectionTitles}
                  />
                )}

                {activeTab === "contact" && (
                  <ContactTab
                    pickedColor={pickedColor}
                    renderSectionVisibilityBanner={renderSectionVisibilityBanner}
                    localSectionTitles={localSectionTitles}
                    setLocalSectionTitles={setLocalSectionTitles}
                    localContactInfo={localContactInfo}
                    updateContactInfoField={updateContactInfoField}
                  />
                )}
              </Suspense>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center gap-3 border-t border-stone-900/60 px-6 sm:px-8 py-5 select-none bg-stone-950/20 shrink-0">
              <button
                type="button"
                onClick={resetToDefault}
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl border border-stone-800 bg-transparent text-stone-300 text-xs font-bold transition-all hover:bg-stone-900 hover:text-white cursor-pointer"
              >
                <FiRefreshCw /> Reset
              </button>

              <button
                type="button"
                onClick={handleOpenPreview}
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl border border-stone-800 bg-transparent text-stone-300 text-xs font-bold transition-all hover:bg-stone-900 hover:text-white cursor-pointer"
              >
                <FiEye className="text-sm" /> Live Preview
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
            className="fixed bottom-6 right-6 p-4 rounded-2xl border flex items-center gap-2.5 text-xs font-bold shadow-2xl backdrop-blur-md z-50 select-none"
            style={{
              backgroundColor:
                saveStatus === "success" ? "rgba(16, 185, 129, 0.1)"
                : saveStatus === "prod" ? "rgba(99, 102, 241, 0.12)"
                : "rgba(239, 68, 68, 0.1)",
              borderColor:
                saveStatus === "success" ? "rgba(16, 185, 129, 0.3)"
                : saveStatus === "prod" ? "rgba(99, 102, 241, 0.35)"
                : "rgba(239, 68, 68, 0.3)",
              color:
                saveStatus === "success" ? "#10B981"
                : saveStatus === "prod" ? "#a5b4fc"
                : "#EF4444",
              maxWidth: "360px",
            }}
          >
            {saveStatus === "success" && (
              <>
                <FiCheck className="text-base shrink-0" />
                <span>Configuration saved successfully!</span>
              </>
            )}
            {saveStatus === "prod" && (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <FiDownload className="text-base shrink-0" />
                  <span className="font-bold">db.json downloaded!</span>
                </div>
                <span className="text-[10px] leading-normal font-medium opacity-80">
                  UI updated. To make changes permanent for all visitors, commit the downloaded
                  <strong className="font-bold"> db.json</strong> to your repo root{" "}
                  <code className="font-mono bg-white/10 px-1 py-0.5 rounded">public/db.json</code>{" "}
                  and redeploy.
                </span>
              </div>
            )}
            {saveStatus === "error" && (
              <>
                <span className="text-base shrink-0">!</span>
                <span>Failed to save configurations. Please verify inputs.</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Live Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-stone-950 flex flex-col select-none overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-stone-950 border-b border-stone-900 shrink-0">
              <div className="text-left">
                <span className="text-[9px] font-bold uppercase tracking-widest font-mono" style={{ color: pickedColor }}>
                  Live Preview Mode
                </span>
                <h3 className="text-sm font-bold text-white leading-none mt-1">
                  Cross-Device Responsive View
                </h3>
              </div>

              {/* Device Selector Switcher */}
              <div className="flex items-center bg-stone-900/60 p-1 rounded-xl border border-stone-850">
                {[
                  { id: "desktop", label: "Desktop", icon: FiMonitor },
                  { id: "tablet", label: "Tablet", icon: FiTablet },
                  { id: "mobile", label: "Mobile", icon: FiSmartphone },
                ].map((device) => {
                  const Icon = device.icon;
                  const isActive = previewDeviceMode === device.id;
                  return (
                    <button
                      key={device.id}
                      type="button"
                      onClick={() => setPreviewDeviceMode(device.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "text-black font-black"
                          : "text-stone-400 hover:text-white"
                      }`}
                      style={isActive ? { backgroundColor: pickedColor } : {}}
                    >
                      <Icon className="text-xs" />
                      <span className="hidden sm:inline">{device.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="flex items-center justify-center p-2 rounded-xl border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-800 transition-all cursor-pointer"
                title="Close Preview"
              >
                <FiX className="text-sm" />
              </button>
            </div>

            {/* Modal Content - Device Viewports */}
            <div className="flex-1 overflow-auto bg-stone-950/40 flex items-center justify-center p-4">
              {previewDeviceMode === "desktop" && (
                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                  <div className="w-full max-w-6xl h-[80vh] rounded-2xl border-[12px] border-stone-800 bg-stone-900 shadow-2xl relative overflow-hidden flex flex-col">
                    <iframe
                      src={previewUrl}
                      title="Desktop Preview Widescreen"
                      className="w-full h-full border-none bg-stone-950"
                    />
                  </div>
                </div>
              )}

              {previewDeviceMode === "tablet" && (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <div className="w-[576px] h-[768px] max-h-full rounded-2xl border-[12px] border-stone-800 bg-stone-900 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-stone-950 rounded-full z-20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-stone-800 rounded-full" />
                    </div>
                    <iframe
                      src={previewUrl}
                      title="Tablet Preview Standard"
                      className="w-full h-full border-none bg-stone-950"
                    />
                  </div>
                </div>
              )}

              {previewDeviceMode === "mobile" && (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <div className="w-[320px] h-[568px] max-h-full rounded-2xl border-[12px] border-stone-800 bg-stone-900 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-3 bg-stone-950 rounded-full z-20 flex items-center justify-center">
                      <div className="w-1 h-1 bg-stone-800 rounded-full mr-2" />
                      <div className="w-8 h-1 bg-stone-850 rounded-full" />
                    </div>
                    <iframe
                      src={previewUrl}
                      title="Mobile Preview Standard"
                      className="w-full h-full border-none bg-stone-950"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
