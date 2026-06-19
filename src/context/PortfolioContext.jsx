import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  SERVICES_DATA,
  skills as defaultSkills,
  skillCategories as defaultSkillCategories,
  projects as defaultProjects,
  certifications as defaultCertifications,
  timelineData as defaultTimelineData,
  summaryStats as defaultSummaryStats,
  CONTACT_INFO as defaultContactInfo,
  PAGE_TITLES as defaultPageTitles,
  PAGE_DESCRIPTIONS as defaultPageDescriptions,
  DEFAULT_ABOUT,
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_ROLES,
  DEFAULT_DESCRIPTION,
  DEFAULT_ORBITING_STACKS,
  defaultTestimonials,
  defaultBlogs,
  defaultFaqs,
} from "../constants";
import { getContrastColor } from "../utils/color";
import { applyFont } from "../utils/font";


// ── CSS variable helpers ──────────────────────────────────────────────────────
export const applyThemeColor = (color) => {
  if (!color || !/^#[0-9A-F]{6}$/i.test(color)) return;
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

// Default section order
const DEFAULT_SECTION_ORDER = [
  "Home", "About", "Services", "Skills", "Projects",
  "Certification", "Testimonials", "Journey", "Blogs", "Faq", "Contact"
];

const DEFAULT_SECTION_VISIBILITY = {
  Home: true, About: true, Services: true, Skills: true, Projects: true,
  Certification: true, Testimonials: true, Journey: true, Blogs: true,
  Faq: true, Contact: true
};

// Default per-section layout selections
export const DEFAULT_SECTION_LAYOUTS = {
  Projects:      "card-row",   // card-row | masonry | table | featured
  Skills:        "icon-grid",  // icon-grid | progress-bars | tag-cloud | category-cards
  Services:      "icon-cards", // icon-cards | horizontal | minimal-list
  Certification: "carousel",   // carousel | grid | timeline
};

const DEFAULT_SECTION_TITLES = {
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
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const tryParse = (raw, fallback) => {
  if (!raw) return fallback;
  try { return JSON.parse(raw); } catch { return fallback; }
};

const LS_KEYS = [
  ["portfolio_theme_color",         null,                       "string"],
  ["portfolio_roles",               null,                       "json"],
  ["portfolio_description",         null,                       "string"],
  ["portfolio_center_svg",          null,                       "string"],
  ["portfolio_orbiting_stacks",     null,                       "json"],
  ["portfolio_about",               null,                       "json"],
  ["portfolio_services_subtitle",   null,                       "string"],
  ["portfolio_services_data",       null,                       "json"],
  ["portfolio_skills",              null,                       "json"],
  ["portfolio_skill_categories",    null,                       "json"],
  ["portfolio_projects",            null,                       "json"],
  ["portfolio_certifications",      null,                       "json"],
  ["portfolio_timeline_data",       null,                       "json"],
  ["portfolio_summary_stats",       null,                       "json"],
  ["portfolio_contact_info",        null,                       "json"],
  ["portfolio_theme_mode",          null,                       "string"],
  ["portfolio_selected_template",   null,                       "string"],
  ["portfolio_page_titles",         null,                       "json"],
  ["portfolio_page_descriptions",   null,                       "json"],
  ["portfolio_section_visibility",  null,                       "json"],
  ["portfolio_section_titles",      null,                       "json"],
  ["portfolio_testimonials",        null,                       "json"],
  ["portfolio_blogs",               null,                       "json"],
  ["portfolio_faqs",                null,                       "json"],
  ["portfolio_font_family",         null,                       "string"],
  ["portfolio_particles_style",     null,                       "string"],
  ["portfolio_section_order",       null,                       "json"],
  ["portfolio_section_layouts",     null,                       "json"],
];

export const buildPayload = (state) => ({
  primaryColor:       state.primaryColor,
  roles:              state.roles,
  description:        state.description,
  centerSvg:          state.centerSvg,
  orbitingStacks:     state.orbitingStacks,
  about:              state.about,
  servicesSubtitle:   state.servicesSubtitle,
  servicesData:       state.servicesData,
  skills:             state.skills,
  skillCategories:    state.skillCategories,
  projects:           state.projects,
  certifications:     state.certifications,
  timelineData:       state.timelineData,
  summaryStats:       state.summaryStats,
  contactInfo:        state.contactInfo,
  themeMode:          state.themeMode,
  selectedTemplate:   state.selectedTemplate,
  pageTitles:         state.pageTitles,
  pageDescriptions:   state.pageDescriptions,
  sectionVisibility:  state.sectionVisibility,
  sectionTitles:      state.sectionTitles,
  testimonials:       state.testimonials,
  blogs:              state.blogs,
  faqs:               state.faqs,
  fontFamily:         state.fontFamily,
  particlesStyle:     state.particlesStyle,
  sectionOrder:       state.sectionOrder,
  sectionLayouts:     state.sectionLayouts,
});

export const saveAllToLocalStorage = (payload) => {
  const pairs = [
    ["portfolio_theme_color",        payload.primaryColor],
    ["portfolio_roles",              JSON.stringify(payload.roles)],
    ["portfolio_description",        payload.description],
    ["portfolio_center_svg",         payload.centerSvg],
    ["portfolio_orbiting_stacks",    JSON.stringify(payload.orbitingStacks)],
    ["portfolio_about",              JSON.stringify(payload.about)],
    ["portfolio_services_subtitle",  payload.servicesSubtitle],
    ["portfolio_services_data",      JSON.stringify(payload.servicesData)],
    ["portfolio_skills",             JSON.stringify(payload.skills)],
    ["portfolio_skill_categories",   JSON.stringify(payload.skillCategories)],
    ["portfolio_projects",           JSON.stringify(payload.projects)],
    ["portfolio_certifications",     JSON.stringify(payload.certifications)],
    ["portfolio_timeline_data",      JSON.stringify(payload.timelineData)],
    ["portfolio_summary_stats",      JSON.stringify(payload.summaryStats)],
    ["portfolio_contact_info",       JSON.stringify(payload.contactInfo)],
    ["portfolio_theme_mode",         payload.themeMode],
    ["portfolio_selected_template",  payload.selectedTemplate],
    ["portfolio_page_titles",        JSON.stringify(payload.pageTitles)],
    ["portfolio_page_descriptions",  JSON.stringify(payload.pageDescriptions)],
    ["portfolio_section_visibility", JSON.stringify(payload.sectionVisibility)],
    ["portfolio_section_titles",     JSON.stringify(payload.sectionTitles)],
    ["portfolio_testimonials",       JSON.stringify(payload.testimonials)],
    ["portfolio_blogs",              JSON.stringify(payload.blogs)],
    ["portfolio_faqs",               JSON.stringify(payload.faqs)],
    ["portfolio_font_family",        payload.fontFamily || ""],
    ["portfolio_particles_style",    payload.particlesStyle || "minimal"],
    ["portfolio_section_order",      JSON.stringify(payload.sectionOrder)],
    ["portfolio_section_layouts",    JSON.stringify(payload.sectionLayouts || DEFAULT_SECTION_LAYOUTS)],
  ];
  pairs.forEach(([k, v]) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } });
};

// ── Context ───────────────────────────────────────────────────────────────────
const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  // ── Core theme state ──────────────────────────────────────────────────────
  const [primaryColor,      setPrimaryColor]      = useState(DEFAULT_PRIMARY_COLOR);
  const [themeMode,         setThemeMode]         = useState("dark");
  const [selectedTemplate,  setSelectedTemplate]  = useState("template-1");
  const [fontFamily,        setFontFamily]        = useState("Outfit");
  const [particlesStyle,    setParticlesStyle]    = useState("minimal");

  // ── Content state ─────────────────────────────────────────────────────────
  const [roles,             setRoles]             = useState(DEFAULT_ROLES);
  const [description,       setDescription]       = useState(DEFAULT_DESCRIPTION);
  const [centerSvg,         setCenterSvg]         = useState("");
  const [orbitingStacks,    setOrbitingStacks]    = useState(DEFAULT_ORBITING_STACKS);
  const [about,             setAbout]             = useState(DEFAULT_ABOUT);
  const [servicesSubtitle,  setServicesSubtitle]  = useState(
    "High-performance, scalable, and secure software development solutions tailored to meet business objectives and deliver outstanding user experiences."
  );
  const [servicesData,      setServicesData]      = useState(SERVICES_DATA);
  const [skills,            setSkills]            = useState(defaultSkills);
  const [skillCategories,   setSkillCategories]   = useState(defaultSkillCategories);
  const [projects,          setProjects]          = useState(defaultProjects);
  const [certifications,    setCertifications]    = useState(defaultCertifications);
  const [timelineData,      setTimelineData]      = useState(defaultTimelineData);
  const [summaryStats,      setSummaryStats]      = useState(defaultSummaryStats);
  const [contactInfo,       setContactInfo]       = useState(defaultContactInfo);
  const [testimonials,      setTestimonials]      = useState(defaultTestimonials);
  const [blogs,             setBlogs]             = useState(defaultBlogs);
  const [faqs,              setFaqs]              = useState(defaultFaqs);

  // ── Layout / visibility state ─────────────────────────────────────────────
  const [pageTitles,         setPageTitles]        = useState(defaultPageTitles);
  const [pageDescriptions,   setPageDescriptions]  = useState(defaultPageDescriptions);
  const [sectionVisibility,  setSectionVisibility] = useState(DEFAULT_SECTION_VISIBILITY);
  const [sectionTitles,      setSectionTitles]     = useState(DEFAULT_SECTION_TITLES);
  const [sectionOrder,       setSectionOrder]      = useState(DEFAULT_SECTION_ORDER);
  const [sectionLayouts,     setSectionLayouts]    = useState(DEFAULT_SECTION_LAYOUTS);

  // ── Apply side-effects ────────────────────────────────────────────────────
  useEffect(() => { applyThemeColor(primaryColor); }, [primaryColor]);

  useEffect(() => {
    if (themeMode === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [themeMode]);

  useEffect(() => { applyFont(fontFamily); }, [fontFamily]);

  // Dynamic favicon
  useEffect(() => {
    const firstInitial = (about?.name || "G").charAt(0).toUpperCase();
    const fillCol = primaryColor || "#00D5D5";
    const contrast = getContrastColor(fillCol);
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="${fillCol}" /><text x="16" y="22" font-family="'Google Sans', 'Segoe UI', Arial, sans-serif" font-size="16" font-weight="900" fill="${contrast}" text-anchor="middle">${firstInitial}</text></svg>`.trim();
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml";
      document.head.appendChild(link);
    }
    link.href = url;
    return () => URL.revokeObjectURL(url);
  }, [primaryColor, about?.name]);

  // ── Load from localStorage + API on mount ─────────────────────────────────
  useEffect(() => {
    const fetchTheme = async () => {
      // Preview mode shortcut
      const searchParams = new URLSearchParams(window.location.search);
      const isPreview = searchParams.get("preview") === "true";
      if (isPreview) {
        const previewDataRaw = localStorage.getItem("portfolio_preview_config");
        if (previewDataRaw) {
          try {
            const data = JSON.parse(previewDataRaw);
            applyFromData(data);
            return;
          } catch (e) { console.error("Failed to parse preview config:", e); }
        }
      }

      // 1. Instant load from localStorage
      loadFromLocalStorage();

      // 2. Fetch from API (may override localStorage)
      try {
        const res = await fetch("/api/theme");
        if (res.ok) {
          const data = await res.json();
          applyFromData(data);
          saveAllToLocalStorage({ ...getDefaultState(), ...data });
        }
      } catch (err) {
        console.warn("Theme DB fetch failed, using local fallback:", err);
      }
    };
    fetchTheme();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getDefaultState = () => ({
    primaryColor: DEFAULT_PRIMARY_COLOR,
    roles: DEFAULT_ROLES,
    description: DEFAULT_DESCRIPTION,
    centerSvg: "",
    orbitingStacks: DEFAULT_ORBITING_STACKS,
    about: DEFAULT_ABOUT,
    servicesSubtitle: "High-performance, scalable, and secure software development solutions tailored to meet business objectives and deliver outstanding user experiences.",
    servicesData: SERVICES_DATA,
    skills: defaultSkills,
    skillCategories: defaultSkillCategories,
    projects: defaultProjects,
    certifications: defaultCertifications,
    timelineData: defaultTimelineData,
    summaryStats: defaultSummaryStats,
    contactInfo: defaultContactInfo,
    themeMode: "dark",
    selectedTemplate: "template-1",
    pageTitles: defaultPageTitles,
    pageDescriptions: defaultPageDescriptions,
    sectionVisibility: DEFAULT_SECTION_VISIBILITY,
    sectionTitles: DEFAULT_SECTION_TITLES,
    testimonials: defaultTestimonials,
    blogs: defaultBlogs,
    faqs: defaultFaqs,
    fontFamily: "Outfit",
    particlesStyle: "minimal",
    sectionOrder: DEFAULT_SECTION_ORDER,
    sectionLayouts: DEFAULT_SECTION_LAYOUTS,
  });

  const applyFromData = useCallback((data) => {
    if (data.primaryColor)      { setPrimaryColor(data.primaryColor); applyThemeColor(data.primaryColor); }
    if (data.roles)             setRoles(data.roles);
    if (data.description)       setDescription(data.description);
    if (data.centerSvg)         setCenterSvg(data.centerSvg);
    if (data.orbitingStacks)    setOrbitingStacks(data.orbitingStacks);
    if (data.about)             setAbout({ ...DEFAULT_ABOUT, ...data.about });
    if (data.servicesSubtitle)  setServicesSubtitle(data.servicesSubtitle);
    if (data.servicesData)      setServicesData(data.servicesData);
    if (data.skills)            setSkills(data.skills);
    if (data.skillCategories)   setSkillCategories(data.skillCategories);
    if (data.projects)          setProjects(data.projects);
    if (data.certifications)    setCertifications(data.certifications);
    if (data.timelineData)      setTimelineData(data.timelineData);
    if (data.summaryStats)      setSummaryStats(data.summaryStats);
    if (data.contactInfo)       setContactInfo(data.contactInfo);
    if (data.themeMode)         setThemeMode(data.themeMode);
    if (data.selectedTemplate)  setSelectedTemplate(data.selectedTemplate);
    if (data.pageTitles)        setPageTitles(data.pageTitles);
    if (data.pageDescriptions)  setPageDescriptions(data.pageDescriptions);
    if (data.testimonials)      setTestimonials(data.testimonials);
    if (data.blogs)             setBlogs(data.blogs);
    if (data.faqs)              setFaqs(data.faqs);
    if (data.sectionVisibility) setSectionVisibility(data.sectionVisibility);
    if (data.sectionTitles)     setSectionTitles(data.sectionTitles);
    if (data.fontFamily)        setFontFamily(data.fontFamily);
    if (data.particlesStyle)    setParticlesStyle(data.particlesStyle);
    if (data.sectionOrder)      setSectionOrder(data.sectionOrder);
    if (data.sectionLayouts)    setSectionLayouts({ ...DEFAULT_SECTION_LAYOUTS, ...data.sectionLayouts });
  }, []);

  const loadFromLocalStorage = useCallback(() => {
    const lc = localStorage.getItem("portfolio_theme_color");
    if (lc) { setPrimaryColor(lc); applyThemeColor(lc); }

    const lr = tryParse(localStorage.getItem("portfolio_roles"), null);
    if (lr) setRoles(lr);

    const ld = localStorage.getItem("portfolio_description");
    if (ld) setDescription(ld);

    const ls = localStorage.getItem("portfolio_center_svg");
    if (ls) setCenterSvg(ls);

    const lo = tryParse(localStorage.getItem("portfolio_orbiting_stacks"), null);
    if (lo) setOrbitingStacks(lo);

    const la = tryParse(localStorage.getItem("portfolio_about"), null);
    if (la) setAbout({ ...DEFAULT_ABOUT, ...la });

    const lss = localStorage.getItem("portfolio_services_subtitle");
    if (lss) setServicesSubtitle(lss);

    const lsd = tryParse(localStorage.getItem("portfolio_services_data"), null);
    if (lsd) setServicesData(lsd);

    const lsk = tryParse(localStorage.getItem("portfolio_skills"), null);
    if (lsk) setSkills(lsk);

    const lskc = tryParse(localStorage.getItem("portfolio_skill_categories"), null);
    if (lskc) setSkillCategories(lskc);

    const lp = tryParse(localStorage.getItem("portfolio_projects"), null);
    if (lp) setProjects(lp);

    const lcert = tryParse(localStorage.getItem("portfolio_certifications"), null);
    if (lcert) setCertifications(lcert);

    const ltd = tryParse(localStorage.getItem("portfolio_timeline_data"), null);
    if (ltd) setTimelineData(ltd);

    const lsum = tryParse(localStorage.getItem("portfolio_summary_stats"), null);
    if (lsum) setSummaryStats(lsum);

    const lci = tryParse(localStorage.getItem("portfolio_contact_info"), null);
    if (lci) setContactInfo(lci);

    const ltm = localStorage.getItem("portfolio_theme_mode");
    if (ltm) setThemeMode(ltm);

    const lt = localStorage.getItem("portfolio_selected_template");
    if (lt) setSelectedTemplate(lt);

    const lpt = tryParse(localStorage.getItem("portfolio_page_titles"), null);
    if (lpt) setPageTitles(lpt);

    const lpd = tryParse(localStorage.getItem("portfolio_page_descriptions"), null);
    if (lpd) setPageDescriptions(lpd);

    const lv = tryParse(localStorage.getItem("portfolio_section_visibility"), null);
    if (lv) setSectionVisibility(lv);

    const lstl = tryParse(localStorage.getItem("portfolio_section_titles"), null);
    if (lstl) setSectionTitles(lstl);

    const ltest = tryParse(localStorage.getItem("portfolio_testimonials"), null);
    if (ltest) setTestimonials(ltest);

    const lblogs = tryParse(localStorage.getItem("portfolio_blogs"), null);
    if (lblogs) setBlogs(lblogs);

    const lfaqs = tryParse(localStorage.getItem("portfolio_faqs"), null);
    if (lfaqs) setFaqs(lfaqs);

    const lff = localStorage.getItem("portfolio_font_family");
    if (lff) setFontFamily(lff);

    const lps = localStorage.getItem("portfolio_particles_style");
    if (lps) setParticlesStyle(lps);

    const lso = tryParse(localStorage.getItem("portfolio_section_order"), null);
    if (lso) setSectionOrder(lso);

    const lsl = tryParse(localStorage.getItem("portfolio_section_layouts"), null);
    if (lsl) setSectionLayouts({ ...DEFAULT_SECTION_LAYOUTS, ...lsl });
  }, []);

  const value = {
    // State
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
    sectionLayouts, setSectionLayouts,
    // Helpers
    applyThemeColor,
    applyFromData,
    getDefaultState,
    DEFAULT_SECTION_ORDER,
    DEFAULT_SECTION_VISIBILITY,
    DEFAULT_SECTION_TITLES,
    DEFAULT_SECTION_LAYOUTS,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used inside PortfolioProvider");
  return ctx;
}
