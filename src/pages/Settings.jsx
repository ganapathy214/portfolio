import React, { useState, useEffect, useRef, Suspense, useCallback, useMemo } from "react";
import { Link, useBlocker } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { injectPrimaryColor, looksLikeSvg } from "../utils/svg";
import {
  FiArrowLeft, FiCheck, FiSave, FiRefreshCw, FiSliders, FiCompass,
  FiLayers, FiPlusCircle, FiChevronUp, FiChevronDown, FiDownload,
  FiChevronLeft, FiEye, FiEyeOff, FiX, FiMonitor, FiTablet, FiSmartphone,
  FiUpload, FiAlertTriangle,
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
import { usePortfolio, applyThemeColor, saveAllToLocalStorage, getTemplateDefaultLayouts } from "../context/PortfolioContext";
import TemplateSelectStep from "../components/Settings/wizard/TemplateSelectStep";
import BrandingStep from "../components/Settings/wizard/BrandingStep";
import VisualCanvasModal from "../components/Settings/editor/VisualCanvasModal";
import ThemeTab from "../components/Settings/tabs/ThemeTab";
const HomeTab = React.lazy(() => import("../components/Settings/tabs/HomeTab"));
const AboutTab = React.lazy(() => import("../components/Settings/tabs/AboutTab"));
const ServicesTab = React.lazy(() => import("../components/Settings/tabs/ServicesTab"));
const SkillsTab = React.lazy(() => import("../components/Settings/tabs/SkillsTab"));
const ProjectsTab = React.lazy(() => import("../components/Settings/tabs/ProjectsTab"));
const CertificationsTab = React.lazy(() => import("../components/Settings/tabs/CertificationsTab"));
const TestimonialsTab = React.lazy(() => import("../components/Settings/tabs/TestimonialsTab"));
const ExperienceTab = React.lazy(() => import("../components/Settings/tabs/ExperienceTab"));
const EducationTab = React.lazy(() => import("../components/Settings/tabs/EducationTab"));
const BlogsTab = React.lazy(() => import("../components/Settings/tabs/BlogsTab"));
const FaqTab = React.lazy(() => import("../components/Settings/tabs/FaqTab"));
const ContactTab = React.lazy(() => import("../components/Settings/tabs/ContactTab"));

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
    error: { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)", text: "#EF4444", icon: "✗" },
    warning: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", text: "#F59E0B", icon: "⚠" },
    info: { bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.35)", text: "#a5b4fc", icon: "i" },
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
              animate={{ opacity: 1, y: 0, scale: 1 }}
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

const DESIGN_INFOS = {
  Home: [
    { id: "design1", name: "Split Tech", desc: "Avatar right, profile info left with primary actions." },
    { id: "design2", name: "Centered Bold", desc: "Centered text, bold backdrop grids, no avatar." },
    { id: "design3", name: "Floating Orbit", desc: "Tech stacks orbit dynamically in a right-hand sphere." },
    { id: "design4", name: "Minimal Typographic", desc: "Large premium typography headlines." },
    { id: "design5", name: "Clean Card Banner", desc: "Structured container banner card layout." }
  ],
  About: [
    { id: "design1", name: "Classic Split", desc: "Paragraph description on left, profile details right." },
    { id: "design2", name: "Story & Stats Grid", desc: "Asymmetrical timeline layout with stats card list." },
    { id: "design3", name: "Interactive Tabs", desc: "Left photo, tabbed bio & highlights panel on right." },
    { id: "design4", name: "Text-Focused Bio", desc: "Focuses on text and highlight quotes." },
    { id: "design5", name: "Impact Layout", desc: "Stat badges on left, profile narrative on right." }
  ],
  Services: [
    { id: "design1", name: "Icon Card Grid", desc: "Interactive grid cards detailing key service offerings." },
    { id: "design2", name: "Horizontal Strips", desc: "List strips with compact title, description, and link action." },
    { id: "design3", name: "Minimal List Rows", desc: "Clean line-height lists displaying tech details." }
  ],
  Skills: [
    { id: "design1", name: "Icon Card Grid", desc: "Visual interactive cards grouping tools." },
    { id: "design2", name: "Progress Bars", desc: "Linear percentage trackers indicating expertise." },
    { id: "design3", name: "Badge Cloud", desc: "Dynamic flex cloud of interactive tags." },
    { id: "design4", name: "Category Cards", desc: "Large card divisions for different skill groups." },
    { id: "design5", name: "Checklist Columns", desc: "Minimal list rows displaying skill bullets." }
  ],
  Projects: [
    { id: "design1", name: "Grid Cards", desc: "Symmetrical card layout with hover image effects." },
    { id: "design2", name: "Alternating Splits", desc: "Side-by-side alternating rows with full context." },
    { id: "design3", name: "Interactive Carousel", desc: "Slider cards displaying portfolio works." },
    { id: "design4", name: "Minimalist List", desc: "Typographic layout of projects." },
    { id: "design5", name: "Masonry Tiles", desc: "Irregular tiling grid presenting dynamic thumbnails." }
  ],
  Certification: [
    { id: "design1", name: "Carousel Slider", desc: "Dynamic interactive slider card carousel with glows." },
    { id: "design2", name: "Responsive Card Grid", desc: "Clean, responsive grid containing certificate cards." },
    { id: "design3", name: "Minimal List Rows", desc: "Simple clean rows displaying credential details and links." }
  ],
  Testimonials: [
    { id: "design1", name: "Masonry Columns", desc: "Tiled quote block list of testimonials." },
    { id: "design2", name: "Carousel Slider", desc: "Single focused client review slide row." },
    { id: "design3", name: "Dual Grid", desc: "Two column cards showing clients feedback." },
    { id: "design4", name: "Text Quotes List", desc: "Clean checklist layout of reviews." },
    { id: "design5", name: "Accent Highlight", desc: "Focuses on one primary quote with minor sidebar ones." }
  ],
  Experience: [
    { id: "design1", name: "Neon Timeline", desc: "Vertical progress tracker line with timeline nodes." },
    { id: "design2", name: "Horizontal Track", desc: "Slider row representing companies and dates." },
    { id: "design3", name: "Split Grid", desc: "Dual grid columns displaying career details." },
    { id: "design4", name: "Classic CV List", desc: "Standard vertical CV list structure." },
    { id: "design5", name: "Compact Badges", desc: "Company cards showing skills used and accomplishments." }
  ],
  Education: [
    { id: "design1", name: "Academic Timeline", desc: "Vertical milestone nodes with scores." },
    { id: "design2", name: "Academic Cards", desc: "Symmetrical cards grouping diplomas." },
    { id: "design3", name: "Minimal List", desc: "Bullet list of degrees." },
    { id: "design4", name: "Split Layout", desc: "Focus layout separating degrees and institutions." },
    { id: "design5", name: "Clean Table", desc: "Standard structured table for scores, degrees, and years." }
  ],
  Blogs: [
    { id: "design1", name: "Responsive Grid Cards", desc: "Grid cards presenting platform badges and writeups." },
    { id: "design2", name: "Horizontal List Rows", desc: "Horizontal row listing of your publications." }
  ],
  Faq: [
    { id: "design1", name: "Classic Accordions", desc: "Collapsible lists showing dynamic animations on toggle." },
    { id: "design2", name: "Two-Column Grid List", desc: "Two column cards presenting all Q&As constantly." }
  ],
  Contact: [
    { id: "design1", name: "Classic Split Form", desc: "Contact form on left, direct details on right." },
    { id: "design2", name: "Centered Cards", desc: "Structured links block without form fields." },
    { id: "design3", name: "Interactive Console", desc: "Command prompt style message interface." },
    { id: "design4", name: "Clean Grid List", desc: "Horizontal row list of direct contact channels." },
    { id: "design5", name: "Accent Split Panel", desc: "Full-width split card layout." }
  ]
};

// Standalone memoized accordion item to prevent unnecessary re-renders when typing
const SectionAccordionItem = React.memo(function SectionAccordionItem({
  section,
  isExpanded,
  isSelected,
  isVisible,
  sectionTitle,
  pickedColor,
  sectionLayout,
  handleSectionClick,
  handleUpdateSectionLayout,
  handleToggleVisibility,
  setVisualEditorSection,
  setExpandedSection,
}) {
  const currentDesign = sectionLayout;

  return (
    <div
      className={`rounded-xl border transition-all ${isSelected ? "bg-stone-900" : "border-stone-850/60 bg-stone-900/40"
        }`}
      style={{
        borderColor: isSelected ? pickedColor : undefined,
        boxShadow: isSelected ? `0 0 12px ${pickedColor}20` : "none",
        borderLeft: isSelected ? `4px solid ${pickedColor}` : undefined,
      }}
    >
      <div
        onClick={() => handleSectionClick(section)}
        className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-stone-900/60 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span
            className={`text-xs font-bold uppercase tracking-wider ${isVisible ? "text-white" : "text-stone-500 line-through"
              }`}
          >
            {sectionTitle}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleVisibility(section, !isVisible);
            }}
            className="p-1.5 rounded text-stone-500 hover:text-white hover:bg-stone-950 cursor-pointer"
            title={isVisible ? "Hide Section" : "Show Section"}
          >
            {isVisible ? <FiEye className="text-xs" /> : <FiEyeOff className="text-xs" />}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setVisualEditorSection(section);
            }}
            className="p-1.5 rounded text-stone-500 hover:text-primary hover:bg-stone-950 cursor-pointer"
            title="Edit Content"
            style={{ "--primary": pickedColor }}
          >
            <FiSliders className="text-xs" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedSection((prev) => (prev === section ? null : section));
            }}
            className="p-1.5 rounded text-stone-500 hover:text-white hover:bg-stone-950 cursor-pointer"
          >
            {isExpanded ? <FiChevronUp className="text-xs" /> : <FiChevronDown className="text-xs" />}
          </button>
        </div>
      </div>

      {/* Expanded Tab Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden border-t border-stone-850/40 bg-stone-950/90 p-4 space-y-4"
          >
            {/* Layout Selection List */}
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1">
                Select Layout Variation
              </div>
              <div className="grid grid-cols-1 gap-2">
                {(DESIGN_INFOS[section] || [
                  { id: "design1", name: "Design 1", desc: "Standard layout variation 1." },
                  { id: "design2", name: "Design 2", desc: "Standard layout variation 2." },
                  { id: "design3", name: "Design 3", desc: "Standard layout variation 3." },
                  { id: "design4", name: "Design 4", desc: "Standard layout variation 4." },
                  { id: "design5", name: "Design 5", desc: "Standard layout variation 5." },
                ]).map((d) => {
                  const isDesignSelected = currentDesign === d.id;
                  return (
                    <motion.button
                      key={d.id}
                      type="button"
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleUpdateSectionLayout(section, d.id)}
                      className={`layout-card-btn w-full text-left p-3 rounded-xl border flex flex-col transition-all cursor-pointer ${isDesignSelected
                        ? "selected shadow-lg"
                        : ""
                        }`}
                      style={{
                        borderColor: isDesignSelected ? pickedColor : undefined,
                        boxShadow: isDesignSelected ? `0 0 10px ${pickedColor}20` : "none",
                      }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold">{d.name}</span>
                        {isDesignSelected && (
                          <FiCheck className="text-xs check-icon text-primary" style={{ color: "#003F47" }} />
                        )}
                      </div>
                      <span className="text-[10px] text-stone-400 mt-1 leading-relaxed">{d.desc}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Edit Content Button */}
            <div className="pt-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setVisualEditorSection(section)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiSliders className="text-xs" />
                <span>Edit Content</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

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
    faviconDataUrl, setFaviconDataUrl,
    copyright, setCopyright,
    sectionLayouts, setSectionLayouts,
    navPosition, setNavPosition,
  } = portfolio;

  const previewUrl = `${import.meta.env.BASE_URL || "/"}?preview=true`.replace(/\/+\?/g, "/?");
  const { toasts, addToast } = useToast();
  const isProd = !import.meta.env.DEV;

  // ── Local working copies ──────────────────────────────────────────────────
  const [localSelectedTemplate, setLocalSelectedTemplate] = useState(selectedTemplate || "template-1");
  const [pickedColor, setPickedColor] = useState(primaryColor || "#00D5D5");
  const [localThemeMode, setLocalThemeMode] = useState(themeMode || "dark");
  const [localCopyright, setLocalCopyright] = useState(copyright || "");
  const [localFontFamily, setLocalFontFamily] = useState(fontFamily || "Outfit");
  const [localParticlesStyle, setLocalParticlesStyle] = useState(particlesStyle || "minimal");
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
  const [localPageTitles, setLocalPageTitles] = useState(pageTitles || {});
  const [localPageDescriptions, setLocalPageDescriptions] = useState(pageDescriptions || {});
  const [localSectionVisibility, setLocalSectionVisibility] = useState(() => {
    const base = sectionVisibility || {};
    return {
      Home: true, About: true, Services: true, Skills: true, Projects: true, Experience: true, Education: true, Certification: true, Testimonials: true, Blogs: true, Faq: true, Contact: true,
      ...base
    };
  });
  const [localSectionTitles, setLocalSectionTitles] = useState(() => {
    const base = sectionTitles || {};
    return {
      About: "Who am I ?", Services: "What I Offer ?", Skills: "What I Know ?", Experience: "What I've done ?",
      Projects: "What I did ?", Testimonials: "What clients say?", Education: "My Education", Certification: "What I achieved?",
      Blogs: "My Publications & Blogs", Faq: "Frequently Asked Questions", Contact: "Where to find me ?",
      ...base
    };
  });
  const [localSectionOrder, setLocalSectionOrder] = useState(() => {
    const base = sectionOrder || DEFAULT_SECTION_ORDER;
    let clean = base.filter(sec => DEFAULT_SECTION_ORDER.includes(sec));
    DEFAULT_SECTION_ORDER.forEach(sec => {
      if (!clean.includes(sec)) {
        clean.push(sec);
      }
    });
    // If the order is a pure permutation of DEFAULT_SECTION_ORDER, use the canonical default
    const isJustPermutation = clean.length === DEFAULT_SECTION_ORDER.length &&
      clean.every(s => DEFAULT_SECTION_ORDER.includes(s)) &&
      DEFAULT_SECTION_ORDER.every(s => clean.includes(s));
    return isJustPermutation ? DEFAULT_SECTION_ORDER : clean;
  });
  const [localFaviconDataUrl, setLocalFaviconDataUrl] = useState(faviconDataUrl || "");
  const [localNavPosition, setLocalNavPosition] = useState(navPosition || "left");
  const [flowStep, setFlowStep] = useState("entry");
  const [selectedSection, setSelectedSection] = useState("Home");
  const [previewKey, setPreviewKey] = useState(0);
  const [visualEditorSection, setVisualEditorSection] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [newCustomSectionName, setNewCustomSectionName] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);
  const iframeRef = useRef(null);

  // ── UI state ──────────────────────────────────────────────────────────────
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewDeviceMode, setPreviewDeviceMode] = useState("desktop");
  const [svgColorInjected, setSvgColorInjected] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const importRef = useRef(null);

  // Automatically update layouts when switching templates
  const prevTemplateRef = useRef(localSelectedTemplate);
  useEffect(() => {
    if (localSelectedTemplate !== prevTemplateRef.current) {
      const defaultLayouts = getTemplateDefaultLayouts(localSelectedTemplate);
      setSectionLayouts(defaultLayouts);
      prevTemplateRef.current = localSelectedTemplate;
      setIsDirty(true);
    }
  }, [localSelectedTemplate, setSectionLayouts, setIsDirty]);




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
    if (sectionVisibility) {
      setLocalSectionVisibility(prev => ({
        Home: true, About: true, Services: true, Skills: true, Projects: true, Experience: true, Education: true, Certification: true, Testimonials: true, Blogs: true, Faq: true, Contact: true,
        ...sectionVisibility
      }));
    }
    if (sectionTitles) {
      setLocalSectionTitles(prev => ({
        About: "Who am I ?", Services: "What I Offer ?", Skills: "What I Know ?", Experience: "What I've done ?",
        Projects: "What I did ?", Testimonials: "What clients say?", Education: "My Education", Certification: "What I achieved?",
        Blogs: "My Publications & Blogs", Faq: "Frequently Asked Questions", Contact: "Where to find me ?",
        ...sectionTitles
      }));
    }
    if (testimonials) setLocalTestimonials(testimonials);
    if (blogs) setLocalBlogs(blogs);
    if (faqs) setLocalFaqs(faqs);
    if (fontFamily) setLocalFontFamily(fontFamily);
    if (particlesStyle) setLocalParticlesStyle(particlesStyle);
    if (sectionOrder) {
      let clean = sectionOrder.filter(sec => DEFAULT_SECTION_ORDER.includes(sec));
      DEFAULT_SECTION_ORDER.forEach(sec => {
        if (!clean.includes(sec)) {
          clean.push(sec);
        }
      });
      const isJustPermutation = clean.length === DEFAULT_SECTION_ORDER.length &&
        clean.every(s => DEFAULT_SECTION_ORDER.includes(s)) &&
        DEFAULT_SECTION_ORDER.every(s => clean.includes(s));
      setLocalSectionOrder(isJustPermutation ? DEFAULT_SECTION_ORDER : clean);
    }
    if (faviconDataUrl) setLocalFaviconDataUrl(faviconDataUrl);
    if (copyright) setLocalCopyright(copyright);
    if (navPosition) setLocalNavPosition(navPosition);
  }, [
    primaryColor, roles, description, centerSvg, orbitingStacks, about,
    servicesSubtitle, servicesData, skills, skillCategories, projects, certifications,
    timelineData, summaryStats, contactInfo, themeMode, selectedTemplate,
    pageTitles, pageDescriptions, sectionVisibility, sectionTitles,
    testimonials, blogs, faqs, fontFamily, particlesStyle, sectionOrder, faviconDataUrl, copyright, navPosition,
  ]);

  // ── Mark dirty on any local change ───────────────────────────────────────
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      setIsDirty(false);
      return;
    }
    setIsDirty(true);
  }, [
    pickedColor, localThemeMode, localFontFamily, localSelectedTemplate,
    localRoles, localDescription, localCenterSvg, localOrbitingStacks,
    localAbout, localServicesSubtitle, localServicesData, localSkills,
    localSkillCategories, localProjects, localCertifications, localTimelineData,
    localSummaryStats, localContactInfo, localTestimonials, localBlogs, localFaqs,
    localPageTitles, localPageDescriptions, localSectionVisibility, localSectionTitles,
    localParticlesStyle, localSectionOrder, localFaviconDataUrl, localCopyright, localNavPosition,
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

  // ── Intercept internal navigation when unsaved changes exist ─────────────
  const blocker = useBlocker(
    useCallback(
      ({ currentLocation, nextLocation }) =>
        isDirty && currentLocation.pathname !== nextLocation.pathname,
      [isDirty]
    )
  );

  // ── Restore theme on unmount ──────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (themeMode === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
      if (primaryColor) applyThemeColor(primaryColor, themeMode);
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
  const handleColorChange = useCallback((color) => {
    setPickedColor(color);
    applyThemeColor(color, localThemeMode);
  }, [localThemeMode]);

  const handleThemeModeChange = useCallback((mode) => {
    setLocalThemeMode(mode);
    if (mode === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    applyThemeColor(pickedColor, mode);
  }, [pickedColor]);

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
      faviconDataUrl: localFaviconDataUrl,
      copyright: localCopyright,
      navPosition: localNavPosition,
      sectionLayouts,
    };
  }, [
    pickedColor, localThemeMode, localFontFamily, localSelectedTemplate,
    localRoles, localDescription, localCenterSvg, localOrbitingStacks,
    localAbout, localServicesSubtitle, localServicesData, localSkills,
    localSkillCategories, localProjects, localCertifications, localTimelineData,
    localSummaryStats, localContactInfo, localTestimonials, localBlogs, localFaqs,
    localPageTitles, localPageDescriptions, localSectionVisibility, localSectionTitles,
    localParticlesStyle, localSectionOrder, localFaviconDataUrl, localCopyright, localNavPosition,
    sectionLayouts,
  ]);

  const getPayloadRef = useRef(getPayload);
  useEffect(() => {
    getPayloadRef.current = getPayload;
  }, [getPayload]);

  // Debounced timer ref for preview sync
  const previewSyncTimerRef = useRef(null);

  // Auto-save preview configuration to localStorage (debounced 600ms)
  useEffect(() => {
    if (previewSyncTimerRef.current) clearTimeout(previewSyncTimerRef.current);
    previewSyncTimerRef.current = setTimeout(() => {
      const payload = getPayload();
      localStorage.setItem("portfolio_preview_config", JSON.stringify(payload));
      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage(
          { type: "LIVE_PREVIEW_UPDATE", data: payload },
          "*"
        );
      }
    }, 600);
    return () => {
      if (previewSyncTimerRef.current) clearTimeout(previewSyncTimerRef.current);
    };
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
    if (payload.faviconDataUrl) setFaviconDataUrl(payload.faviconDataUrl);
    if (payload.copyright) setCopyright(payload.copyright);
    if (payload.sectionLayouts) setSectionLayouts(payload.sectionLayouts);
    if (payload.navPosition) setNavPosition(payload.navPosition);
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
        if (data.faviconDataUrl) setLocalFaviconDataUrl(data.faviconDataUrl);
        if (data.copyright) setLocalCopyright(data.copyright);
        addToast("Config imported! Click Save Settings to apply.", "success", 5000);
      } catch {
        addToast("Failed to parse config file. Make sure it's valid JSON.", "error");
      }
      if (importRef.current) importRef.current.value = "";
    };
    reader.readAsText(file);
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
    setLocalSectionVisibility({ Home: true, About: true, Services: true, Skills: true, Projects: true, Certification: true, Testimonials: true, Experience: true, Education: true, Blogs: true, Faq: true, Contact: true });
    setLocalSectionTitles({ About: "Who am I ?", Services: "What I Offer ?", Skills: "What I Know ?", Projects: "What I did ?", Certification: "What I achieved?", Testimonials: "What clients say?", Experience: "Professional Experience", Education: "Academic Background", Blogs: "My Publications & Blogs", Faq: "Frequently Asked Questions", Contact: "Where to find me ?" });
    setLocalSectionOrder(DEFAULT_SECTION_ORDER);
    setLocalFaviconDataUrl("");
    setLocalCopyright("© 2026. All rights reserved.");
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
    const copy = [...localServicesData];[copy[idx], copy[ni]] = [copy[ni], copy[idx]]; setLocalServicesData(copy);
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
    setLocalSkillCategories(prev => prev.map(c => { if (c.id !== catId) return c; const b = [...c.bullets];[b[bi], b[ni]] = [b[ni], b[bi]]; return { ...c, bullets: b }; }));
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
    const copy = [...localProjects];[copy[idx], copy[ni]] = [copy[ni], copy[idx]];
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
    const copy = [...localCertifications];[copy[idx], copy[ni]] = [copy[ni], copy[idx]];
    setLocalCertifications(copy); setActiveCertIdx(ni);
  };
  const updateActiveCertField = (field, value) => {
    if (!localCertifications.length) return;
    const copy = [...localCertifications]; copy[activeCertIdx] = { ...copy[activeCertIdx], [field]: value }; setLocalCertifications(copy);
  };

  // ── Experience / Education / Timeline helpers ──────────────────────────────
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
    const copy = [...localTimelineData];[copy[idx], copy[ni]] = [copy[ni], copy[idx]];
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
    const copy = [...localSectionOrder];[copy[idx], copy[ni]] = [copy[ni], copy[idx]]; setLocalSectionOrder(copy);
  };

  // ── Section visibility banner ─────────────────────────────────────────────
  const renderSectionVisibilityBanner = useCallback((sectionName) => {
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
  }, [localSectionVisibility, pickedColor]);



  const lightAccentColor = useMemo(() => getLightShade(pickedColor, 0.65), [pickedColor]);
  const previewUrlWithKey = useMemo(
    () => `${import.meta.env.BASE_URL || "/"}?preview=true&key=${previewKey}`.replace(/\/+\?/g, "/?"),
    [previewKey]
  );

  const handleIframeLoad = () => {
    const targetSection = selectedSection === "themeBranding" ? "Home" : selectedSection;
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        { type: "SET_ACTIVE_SECTION", section: targetSection },
        "*"
      );
      iframeRef.current.contentWindow?.postMessage(
        { type: "LIVE_PREVIEW_UPDATE", data: getPayload() },
        "*"
      );
    }
  };

  const handleCreateNewClick = () => {
    resetToDefault();
    setFlowStep("create-template");
  };

  const handleEditCurrentClick = () => {
    setFlowStep("editor");
  };

  // Drag and drop hierarchy logic
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const copy = [...localSectionOrder];
    const draggedItem = copy[draggedIndex];
    copy.splice(draggedIndex, 1);
    copy.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    setLocalSectionOrder(copy);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDuplicateSection = (sectionName) => {
    const newSectionName = `${sectionName} (Copy)`;
    if (localSectionOrder.includes(newSectionName)) {
      addToast(`Section copy already exists.`, "warning");
      return;
    }
    const idx = localSectionOrder.indexOf(sectionName);
    if (idx === -1) return;

    const copyOrder = [...localSectionOrder];
    copyOrder.splice(idx + 1, 0, newSectionName);
    setLocalSectionOrder(copyOrder);

    setLocalSectionVisibility(prev => ({
      ...prev,
      [newSectionName]: prev[sectionName] !== false
    }));

    setLocalSectionTitles(prev => ({
      ...prev,
      [newSectionName]: `${prev[sectionName] || sectionName} Copy`
    }));

    addToast(`Duplicated ${sectionName} section.`, "success");
  };

  const handleDeleteSection = (sectionName) => {
    setLocalSectionOrder(prev => prev.filter(s => s !== sectionName));
    setLocalSectionVisibility(prev => {
      const copy = { ...prev };
      delete copy[sectionName];
      return copy;
    });
    setLocalSectionTitles(prev => {
      const copy = { ...prev };
      delete copy[sectionName];
      return copy;
    });
    addToast(`Deleted ${sectionName} section.`, "info");
  };

  const handleAddCustomSection = () => {
    const trimmed = newCustomSectionName.trim();
    if (!trimmed) return;
    if (localSectionOrder.includes(trimmed)) {
      addToast("Section name already exists.", "warning");
      return;
    }
    setLocalSectionOrder(prev => [...prev, trimmed]);
    setLocalSectionVisibility(prev => ({ ...prev, [trimmed]: true }));
    setLocalSectionTitles(prev => ({ ...prev, [trimmed]: trimmed }));
    setNewCustomSectionName("");
    addToast(`Added custom section: ${trimmed}`, "success");
  };

  const handleSaveSectionFromCanvas = (outputData, isLive = false) => {
    const {
      sectionName: secName,
      elements,
      settings,
      about,
      roles,
      description,
      orbitingStacks,
      skills,
      skillCategories,
      timelineData,
      projects,
      testimonials,
      contactInfo,
      servicesSubtitle,
      servicesData,
      certifications,
      blogs,
      faqs,
      sectionTitles,
      centerSvg
    } = outputData;
    const sec = secName.toLowerCase();

    // Map sub-states if they are explicitly returned from canvas modal
    if (about) setLocalAbout(about);
    if (roles) setLocalRoles(roles);
    if (description !== undefined) setLocalDescription(description);
    if (orbitingStacks) setLocalOrbitingStacks(orbitingStacks);
    if (skills) setLocalSkills(skills);
    if (skillCategories) setLocalSkillCategories(skillCategories);
    if (projects) setLocalProjects(projects);
    if (testimonials) setLocalTestimonials(testimonials);
    if (contactInfo) setLocalContactInfo(contactInfo);
    if (servicesSubtitle !== undefined) setLocalServicesSubtitle(servicesSubtitle);
    if (servicesData) setLocalServicesData(servicesData);
    if (certifications) setLocalCertifications(certifications);
    if (blogs) setLocalBlogs(blogs);
    if (faqs) setLocalFaqs(faqs);
    if (sectionTitles) setLocalSectionTitles(sectionTitles);
    if (centerSvg !== undefined) setLocalCenterSvg(centerSvg);

    // Fallback/compatibility mapping for canvas elements
    if (sec === "home" || sec === "hero") {
      const titleEl = elements.find(el => el.id === "hero-title");
      if (titleEl && !about) setLocalAbout(prev => ({ ...prev, name: titleEl.content }));

      const roleEl = elements.find(el => el.id === "hero-role");
      if (roleEl && !roles) setLocalRoles(prev => [roleEl.content, ...prev.slice(1)]);

      const bioEl = elements.find(el => el.id === "hero-bio");
      if (bioEl && description === undefined) setLocalDescription(bioEl.content);

      const imgEl = elements.find(el => el.id === "hero-image");
      if (imgEl && !about) setLocalAbout(prev => ({ ...prev, avatarUrl: imgEl.src }));
    } else if (sec === "about") {
      const headerEl = elements.find(el => el.id === "about-header");
      if (headerEl && !sectionTitles) setLocalSectionTitles(prev => ({ ...prev, About: headerEl.content }));

      const bioEl = elements.find(el => el.id === "about-bio");
      if (bioEl && !about) setLocalAbout(prev => ({ ...prev, bio: bioEl.content }));

      const imgEl = elements.find(el => el.id === "about-image");
      if (imgEl && !about) setLocalAbout(prev => ({ ...prev, avatarUrl: imgEl.src }));
    } else {
      const headerEl = elements.find(el => el.id === `${secName.toLowerCase()}-header`);
      if (headerEl && !sectionTitles) setLocalSectionTitles(prev => ({ ...prev, [secName]: headerEl.content }));
    }

    setLocalSectionVisibility(prev => ({
      ...prev,
      [secName]: settings.visibility
    }));

    if (!isLive) {
      setPreviewKey(prev => prev + 1);
      addToast(`Applied changes to ${secName} section.`, "success");
    }
  };

  const handleSectionClick = useCallback((sectionName) => {
    setSelectedSection(sectionName);
    const targetSection = sectionName === "themeBranding" ? "Home" : sectionName;

    // Toggle the expansion of the clicked section accordion
    setExpandedSection(prev => prev === sectionName ? null : sectionName);

    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        { type: "SCROLL_TO_SECTION", section: targetSection },
        "*"
      );
      iframeRef.current.contentWindow?.postMessage(
        { type: "SET_ACTIVE_SECTION", section: targetSection },
        "*"
      );
    }
  }, []);

  const handleUpdateSectionLayout = useCallback((sectionName, designId) => {
    setSectionLayouts(prev => {
      const updated = { ...prev, [sectionName]: designId };
      try {
        localStorage.setItem("portfolio_section_layouts", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          {
            type: "LIVE_PREVIEW_UPDATE",
            data: { ...getPayloadRef.current(), sectionLayouts: updated }
          },
          "*"
        );
      }
      return updated;
    });
    setIsDirty(true);
  }, []);

  const handleToggleVisibility = useCallback((section, nextVisibility) => {
    setLocalSectionVisibility(prev => {
      const updated = { ...prev, [section]: nextVisibility };
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: "LIVE_PREVIEW_UPDATE",
          data: { ...getPayloadRef.current(), sectionVisibility: updated }
        }, "*");
      }
      return updated;
    });
  }, []);

  // Open Canvas Modal from postMessage from iframe SectionWrapper click
  useEffect(() => {
    const handleMessage = (event) => {
      const { type, sectionName: sName } = event.data || {};
      if (type === "OPEN_VISUAL_EDITOR" && sName) {
        setVisualEditorSection(sName);
        setSelectedSection(sName);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const renderInlineSectionEditor = (sectionName) => {
    const commonProps = {
      pickedColor,
      renderSectionVisibilityBanner,
      localSectionTitles,
      setLocalSectionTitles,
    };

    switch (sectionName) {
      case "Home":
        return (
          <HomeTab
            {...commonProps}
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
        );
      case "About":
        return (
          <AboutTab {...commonProps} localAbout={localAbout} updateAbout={updateAbout} updateAboutStat={updateAboutStat} updateAboutHighlight={updateAboutHighlight} updateAboutSocialLink={updateAboutSocialLink} updateAboutTitle={updateAboutTitle} />
        );
      case "Services":
        return (
          <ServicesTab {...commonProps} localServicesSubtitle={localServicesSubtitle} setLocalServicesSubtitle={setLocalServicesSubtitle} localServicesData={localServicesData} updateService={updateService} addService={addService} deleteService={deleteService} moveService={moveService} />
        );
      case "Skills":
        return (
          <SkillsTab {...commonProps} localSkills={localSkills} localSkillCategories={localSkillCategories} activeSkillCategoryTab={activeSkillCategoryTab} setActiveSkillCategoryTab={setActiveSkillCategoryTab} newSkillCategoryName={newSkillCategoryName} setNewSkillCategoryName={setNewSkillCategoryName} newSkillName={newSkillName} setNewSkillName={setNewSkillName} newSkillIcon={newSkillIcon} setNewSkillIcon={setNewSkillIcon} addSkillCategory={addSkillCategory} deleteSkillCategory={deleteSkillCategory} renameSkillCategory={renameSkillCategory} updateCategoryBullet={updateCategoryBullet} addCategoryBullet={addCategoryBullet} deleteCategoryBullet={deleteCategoryBullet} moveCategoryBullet={moveCategoryBullet} toggleSkillInCategory={toggleSkillInCategory} addCustomSkill={addCustomSkill} deleteCustomSkill={deleteCustomSkill} />
        );
      case "Projects":
        return (
          <ProjectsTab {...commonProps} localProjects={localProjects} activeProjectIdx={activeProjectIdx} setActiveProjectIdx={setActiveProjectIdx} newProjectStack={newProjectStack} setNewProjectStack={setNewProjectStack} newProjectResponsibility={newProjectResponsibility} setNewProjectResponsibility={setNewProjectResponsibility} addProject={addProject} deleteProject={deleteProject} moveProject={moveProject} updateActiveProjectField={updateActiveProjectField} addStackToActiveProject={addStackToActiveProject} deleteStackFromActiveProject={deleteStackFromActiveProject} addResponsibilityToActiveProject={addResponsibilityToActiveProject} updateResponsibilityInActiveProject={updateResponsibilityInActiveProject} deleteResponsibilityFromActiveProject={deleteResponsibilityFromActiveProject} moveResponsibilityInActiveProject={moveResponsibilityInActiveProject} />
        );
      case "Certification":
        return (
          <CertificationsTab {...commonProps} localCertifications={localCertifications} activeCertIdx={activeCertIdx} setActiveCertIdx={setActiveCertIdx} addCert={addCert} deleteCert={deleteCert} moveCert={moveCert} updateActiveCertField={updateActiveCertField} />
        );
      case "Testimonials":
        return (
          <TestimonialsTab {...commonProps} localTestimonials={localTestimonials} setLocalTestimonials={setLocalTestimonials} />
        );
      case "Experience":
        return (
          <Suspense fallback={<div className="text-[10px] text-stone-600">Loading module...</div>}>
            <ExperienceTab localTimelineData={localTimelineData} setLocalTimelineData={setLocalTimelineData} />
          </Suspense>
        );
      case "Education":
        return (
          <Suspense fallback={<div className="text-[10px] text-stone-600">Loading module...</div>}>
            <EducationTab localTimelineData={localTimelineData} setLocalTimelineData={setLocalTimelineData} />
          </Suspense>
        );
      case "Blogs":
        return (
          <BlogsTab {...commonProps} localBlogs={localBlogs} setLocalBlogs={setLocalBlogs} />
        );
      case "Faq":
        return (
          <FaqTab {...commonProps} localFaqs={localFaqs} setLocalFaqs={setLocalFaqs} />
        );
      case "Contact":
        return (
          <ContactTab {...commonProps} localContactInfo={localContactInfo} updateContactInfoField={updateContactInfoField} />
        );
      default:
        return (
          <div className="p-4 bg-stone-900/40 rounded-xl border border-stone-850 text-stone-400 text-xs leading-relaxed">
            Custom sections have layout configurations offloaded to the visual canvas editor. Drag and drop elements or change backgrounds there.
          </div>
        );
    }
  };

  // ── 1. Entry Screen Flow ──────────────────────────────────────────────────
  if (flowStep === "entry") {
    return (
      <div className="settings-console-page relative h-screen w-screen flex flex-col items-center justify-center text-white overflow-hidden font-sans p-6">
        {/* Background Particles */}
        {localParticlesStyle !== "none" && (
          <div
            className="fixed inset-0 w-full h-full z-1 pointer-events-none"
            style={{ opacity: localThemeMode === "light" ? 0.5 : 0.7 }}
          >
            <Particles
              key={localParticlesStyle}
              particleColors={[pickedColor, lightAccentColor]}
              particleSpread={15}
              particleCount={35}
              speed={0.015}
              alphaParticles={true}
            />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-3xl w-full text-center space-y-12"
        >
          {/* Logo / Brand */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-stone-800 bg-teal-100/40 backdrop-blur-xl">
              <FiCompass className="text-xl" style={{ color: pickedColor }} />
              <span className="font-mono text-xs uppercase font-extrabold tracking-[0.27em]">Dev Console</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-wider bg-clip-text text-black via-stone-300 to-stone-500">
              Portfolio Builder Studio
            </h1>
            <p className="text-stone-400 text-sm max-w-lg mx-auto font-medium">
              Create a custom portfolio or modify your active design templates inside a Canva-style visual console.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Create New Card */}
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCreateNewClick}
              className="group relative p-8 rounded-3xl border border-stone-800/80 bg-teal-900/40 backdrop-blur-xl hover:border-primary/50 hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.15)] transition-all duration-300 cursor-pointer flex flex-col justify-between items-center text-center space-y-6"
              style={{ "--primary-rgb": pickedColor }}
            >
              <div
                className="w-16 h-16 rounded-2xl border flex items-center justify-center text-2xl bg-stone-950/80 transition-transform group-hover:scale-110"
                style={{ borderColor: "rgba(255,255,255,0.06)", color: pickedColor }}
              >
                <FiPlusCircle />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black uppercase tracking-wider text-white">Create New</h3>
                <p className="text-xs text-stone-400 font-medium leading-relaxed">
                  Start from a template and build your portfolio from scratch.
                </p>
              </div>
              <button
                type="button"
                className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#ffffff"
                }}
              >
                Start Wizard
              </button>
            </motion.div>

            {/* Edit Existing Card */}
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEditCurrentClick}
              className="group relative p-8 rounded-3xl border border-stone-800/80 bg-teal-900/40 backdrop-blur-xl hover:border-primary/50 hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.15)] transition-all duration-300 cursor-pointer flex flex-col justify-between items-center text-center space-y-6"
              style={{ "--primary-rgb": pickedColor }}
            >
              <div
                className="w-16 h-16 rounded-2xl border flex items-center justify-center text-2xl bg-stone-950/80 transition-transform group-hover:scale-110"
                style={{ borderColor: "rgba(255,255,255,0.06)", color: pickedColor }}
              >
                <FiSliders />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black uppercase tracking-wider text-white">Edit Current</h3>
                <p className="text-xs text-stone-400 font-medium leading-relaxed">
                  Modify your existing portfolio design, sections, and details directly.
                </p>
              </div>
              <button
                type="button"
                className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                style={{
                  backgroundColor: pickedColor,
                  color: getContrastColor(pickedColor)
                }}
              >
                Open Workspace
              </button>
            </motion.div>
          </div>
        </motion.div>
        {/* Toast notifications */}
        <ToastContainer toasts={toasts} />
      </div>
    );
  }

  // ── 2. Create Template Wizard Step ─────────────────────────────────────────
  if (flowStep === "create-template") {
    return (
      <div className="settings-console-page relative min-h-screen w-screen flex flex-col text-white overflow-y-auto font-sans p-6 sm:p-12">
        {/* Background Particles */}
        {localParticlesStyle !== "none" && (
          <div className="fixed inset-0 w-full h-full z-1 pointer-events-none" style={{ opacity: localThemeMode === "light" ? 0.5 : 0.7 }}>
            <Particles key={localParticlesStyle} particleColors={[pickedColor, lightAccentColor]} particleSpread={15} particleCount={30} alphaParticles={true} />
          </div>
        )}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <div className="mb-6 max-w-5xl mx-auto w-full">
            <button
              onClick={() => setFlowStep("entry")}
              className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              ← Back to Main Menu
            </button>
          </div>
          <TemplateSelectStep
            selectedId={localSelectedTemplate}
            onSelect={setLocalSelectedTemplate}
            onNext={() => setFlowStep("create-branding")}
          />
        </div>
        {/* Toast notifications */}
        <ToastContainer toasts={toasts} />
      </div>
    );
  }

  // ── 3. Create Branding Wizard Step ─────────────────────────────────────────
  if (flowStep === "create-branding") {
    return (
      <div className="settings-console-page relative min-h-screen w-screen flex flex-col text-white overflow-y-auto font-sans p-6 sm:p-12">
        {/* Background Particles */}
        {localParticlesStyle !== "none" && (
          <div className="fixed inset-0 w-full h-full z-1 pointer-events-none" style={{ opacity: localThemeMode === "light" ? 0.5 : 0.7 }}>
            <Particles key={localParticlesStyle} particleColors={[pickedColor, lightAccentColor]} particleSpread={15} particleCount={30} alphaParticles={true} />
          </div>
        )}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <BrandingStep
            primaryColor={pickedColor}
            onColorChange={handleColorChange}
            themeMode={localThemeMode}
            onThemeModeChange={handleThemeModeChange}
            fontFamily={localFontFamily}
            onFontFamilyChange={setLocalFontFamily}
            appTitle={localPageTitles.Home || ""}
            onAppTitleChange={(newTitle) => {
              setLocalPageTitles(prev => ({ ...prev, Home: newTitle }));
            }}
            faviconDataUrl={localFaviconDataUrl}
            onFaviconChange={(url) => {
              setLocalFaviconDataUrl(url);
              setFaviconDataUrl(url);
            }}
            onBack={() => setFlowStep("create-template")}
            onNext={() => setFlowStep("editor")}
          />
        </div>
        {/* Toast notifications */}
        <ToastContainer toasts={toasts} />
      </div>
    );
  }

  // ── 4. Main Workspace Workspace Step ─────────────────────────────────────
  if (flowStep === "editor") {
    return (
      <div className="settings-console-page relative h-screen w-screen flex flex-col text-white overflow-hidden font-sans">
        {/* Background Particles — key only on style change, not color (to prevent remount on every color drag) */}
        {localParticlesStyle !== "none" && (
          <div
            className="fixed inset-0 w-full h-full z-1 pointer-events-none"
            style={{ opacity: localThemeMode === "light" ? 0.5 : 0.7 }}
          >
            <Particles
              key={localParticlesStyle}
              particleColors={[pickedColor, lightAccentColor]}
              particleSpread={15}
              particleCount={25}
              speed={0.015}
              alphaParticles={true}
            />
          </div>
        )}

        {/* Unsaved Changes Banner */}
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
              <span className="text-amber-300 font-black">Publish Live</span>
              <span className="text-amber-500 font-normal">to apply them to your portfolio.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Bar */}
        <header
          className="relative z-10 flex items-center justify-between border-b border-stone-900 bg-stone-950 px-6 py-4 shrink-0 transition-all duration-300"
          style={{ paddingTop: isDirty ? "50px" : "16px" }}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFlowStep("entry")}
              className="p-2 rounded-xl border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-800 transition-colors cursor-pointer"
              title="Back to main menu"
            >
              <FiChevronLeft className="text-sm" />
            </button>
            <div className="text-left">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary" style={{ color: pickedColor }}>Workspace Console</span>
              <h3 className="text-sm font-bold text-white leading-none mt-1">Canva-Style Visual Builder</h3>
            </div>
          </div>

          {/* Device Selection Bar */}
          <div className="flex items-center bg-[#fdf8f2] p-1 rounded-xl border border-stone-200 gap-2">
            {[{ id: "desktop", icon: FiMonitor }, { id: "tablet", icon: FiTablet }, { id: "mobile", icon: FiSmartphone }].map(({ id, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setPreviewDeviceMode(id)}
                className={`device-switch-btn ${previewDeviceMode === id ? "active" : ""} flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer`}
              >
                <Icon className="text-xs" />
                <span className="hidden sm:inline capitalize">{id}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Theme & Branding Header Trigger */}
            <button
              type="button"
              onClick={() => {
                setSelectedSection("themeBranding");
                setExpandedSection("themeBranding");
                if (iframeRef.current) {
                  iframeRef.current.contentWindow?.postMessage(
                    { type: "SCROLL_TO_SECTION", section: "Home" },
                    "*"
                  );
                  iframeRef.current.contentWindow?.postMessage(
                    { type: "SET_ACTIVE_SECTION", section: "Home" },
                    "*"
                  );
                }
                setIsSidebarOpen(true); // Open mobile drawer automatically
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-[10px] font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${selectedSection === "themeBranding"
                  ? "text-black border-transparent font-black shadow-md"
                  : "bg-stone-900 border-stone-850 text-stone-400 hover:text-white hover:border-stone-800"
                }`}
              style={selectedSection === "themeBranding" ? { backgroundColor: pickedColor } : {}}
            >
              <FiSliders className="text-xs" />
              <span>Theme & Branding</span>
            </button>
          </div>
        </header>

        {/* Split Panels */}
        <div className="relative z-10 flex-1 flex overflow-hidden">
          {/* ── Left Hierarchy Panel ─────────────────────────────────── */}
          {/* Desktop/Tablet: always-visible sidebar */}
          <aside className="hidden md:flex w-[260px] lg:w-[320px] xl:w-[360px] bg-stone-950/80 border-r border-stone-900 flex-col justify-between overflow-hidden shrink-0 transition-all duration-300">
            {selectedSection === "themeBranding" ? (
              <>
                {/* Branding Panel Header */}
                <div className="px-5 py-4 border-b border-stone-900 bg-stone-900/40 flex items-center justify-between shrink-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white">Theme & Branding</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSection("Home");
                      setExpandedSection("Home");
                      if (iframeRef.current) {
                        iframeRef.current.contentWindow?.postMessage(
                          { type: "SCROLL_TO_SECTION", section: "Home" },
                          "*"
                        );
                        iframeRef.current.contentWindow?.postMessage(
                          { type: "SET_ACTIVE_SECTION", section: "Home" },
                          "*"
                        );
                      }
                    }}
                    className="p-1 rounded text-stone-500 hover:text-white hover:bg-stone-900 cursor-pointer transition-colors"
                    title="Return to sections"
                  >
                    <FiX className="text-sm" />
                  </button>
                </div>

                {/* Branding Panel content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin select-none">
                  <ThemeTab
                    pickedColor={pickedColor}
                    handleColorChange={handleColorChange}
                    localThemeMode={localThemeMode}
                    handleThemeModeChange={handleThemeModeChange}
                    localAbout={localAbout}
                    localFontFamily={localFontFamily}
                    setLocalFontFamily={setLocalFontFamily}
                    localCopyright={localCopyright}
                    setLocalCopyright={setLocalCopyright}
                    localPageTitles={localPageTitles}
                    onAppTitleChange={(newTitle) => {
                      setLocalPageTitles(prev => ({ ...prev, Home: newTitle }));
                    }}
                    localFaviconDataUrl={localFaviconDataUrl}
                    onFaviconChange={(url) => {
                      setLocalFaviconDataUrl(url);
                      setFaviconDataUrl(url);
                    }}
                    localNavPosition={localNavPosition}
                    setLocalNavPosition={setLocalNavPosition}
                  />
                </div>
              </>
            ) : (
              <>
                {/* Header info */}
                <div className="px-5 py-4 border-b border-stone-900 bg-stone-900/40 flex items-center justify-between shrink-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white">Section Hierarchy</span>
                  <span className="text-[9px] text-white font-bold uppercase tracking-wider">Select to preview</span>
                </div>

                {/* Hierarchy Scroll List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin select-none">
                  {localSectionOrder.map((section) => (
                    <SectionAccordionItem
                      key={section}
                      section={section}
                      isExpanded={expandedSection === section}
                      isSelected={selectedSection === section}
                      isVisible={localSectionVisibility[section] !== false}
                      sectionTitle={localSectionTitles[section] || section}
                      pickedColor={pickedColor}
                      sectionLayout={sectionLayouts?.[section] || "design1"}
                      handleSectionClick={handleSectionClick}
                      handleUpdateSectionLayout={handleUpdateSectionLayout}
                      handleToggleVisibility={handleToggleVisibility}
                      setVisualEditorSection={setVisualEditorSection}
                      setExpandedSection={setExpandedSection}
                    />
                  ))}
                </div>
              </>
            )}
          </aside>

          {/* ── Mobile Drawer Overlay ─────────────────────────────────── */}
          <AnimatePresence>
            {isSidebarOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  key="sidebar-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                />
                {/* Drawer panel */}
                <motion.aside
                  key="sidebar-drawer"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 260 }}
                  className="settings-console-page fixed bottom-0 left-0 right-0 z-50 md:hidden bg-stone-950 border-t border-stone-800 flex flex-col rounded-t-3xl overflow-hidden"
                  style={{ maxHeight: "78vh" }}
                >
                  {/* Drawer handle */}
                  <div className="flex justify-center pt-3 pb-1 shrink-0">
                    <div className="w-10 h-1 bg-stone-700 rounded-full" />
                  </div>
                  {/* Drawer header */}
                  <div className="px-5 py-3 border-b border-stone-900 bg-stone-950 flex items-center justify-between shrink-0">
                    <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
                      {selectedSection === "themeBranding" ? "Theme & Branding" : "Section Hierarchy"}
                    </span>
                    <div className="flex items-center gap-2">
                      {selectedSection === "themeBranding" && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSection("Home");
                            setExpandedSection("Home");
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-900 text-stone-400 hover:text-white text-[9px] font-black uppercase tracking-widest cursor-pointer transition-colors"
                        >
                          ← Back
                        </button>
                      )}
                      <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-1.5 rounded-lg bg-stone-900 text-stone-400 hover:text-white cursor-pointer transition-colors"
                      >
                        <FiX className="text-sm" />
                      </button>
                    </div>
                  </div>
                  {/* Reuse the same section list or ThemeTab — scrollable */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none select-none">
                    {selectedSection === "themeBranding" ? (
                      <ThemeTab
                        pickedColor={pickedColor}
                        handleColorChange={handleColorChange}
                        localThemeMode={localThemeMode}
                        handleThemeModeChange={handleThemeModeChange}
                        localAbout={localAbout}
                        localFontFamily={localFontFamily}
                        setLocalFontFamily={setLocalFontFamily}
                        localCopyright={localCopyright}
                        setLocalCopyright={setLocalCopyright}
                        localPageTitles={localPageTitles}
                        onAppTitleChange={(newTitle) => {
                          setLocalPageTitles(prev => ({ ...prev, Home: newTitle }));
                        }}
                        localFaviconDataUrl={localFaviconDataUrl}
                        onFaviconChange={(url) => {
                          setLocalFaviconDataUrl(url);
                          setFaviconDataUrl(url);
                        }}
                        localNavPosition={localNavPosition}
                        setLocalNavPosition={setLocalNavPosition}
                      />
                    ) : (
                      <>
                        {/* Section list */}
                        {localSectionOrder.map((section) => {
                          const isVisible = localSectionVisibility[section] !== false;
                          return (
                            <div
                              key={section}
                              className={`rounded-xl border transition-all ${selectedSection === section ? "bg-stone-900" : "border-stone-850/60 bg-stone-900/40"
                                }`}
                              style={{
                                borderColor: selectedSection === section ? pickedColor : undefined,
                                boxShadow: selectedSection === section ? `0 0 12px ${pickedColor}20` : "none",
                                borderLeft: selectedSection === section ? `4px solid ${pickedColor}` : undefined,
                              }}
                            >
                              <div
                                onClick={() => { handleSectionClick(section); setIsSidebarOpen(false); }}
                                className="px-4 py-3.5 flex items-center gap-2.5 cursor-pointer hover:bg-stone-900/60 transition-colors"
                              >
                                <span className={`text-xs font-bold uppercase tracking-wider ${isVisible ? "text-white" : "text-stone-500 line-through"}`}>
                                  {localSectionTitles[section] || section}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* ── Mobile Sidebar Toggle FAB ────────────────────────────── */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(prev => !prev)}
            className="md:hidden fixed bottom-20 left-4 z-[60] w-11 h-11 rounded-2xl flex items-center justify-center shadow-xl cursor-pointer transition-all active:scale-95"
            style={{
              backgroundColor: pickedColor,
              color: getContrastColor(pickedColor),
              boxShadow: `0 6px 20px ${pickedColor}50`,
            }}
            title="Toggle Section Menu"
          >
            <FiLayers className="text-base" />
          </button>

          {/* ── Right Live Preview Panel ─────────────────────────────── */}
          <main className="flex-1 bg-stone-950/40 flex items-center justify-center p-6 relative overflow-hidden select-none">
            {previewDeviceMode === "desktop" && (
              <div className="w-full h-[82vh] rounded-3xl border-[12px] border-stone-800 bg-stone-900 shadow-2xl overflow-hidden flex flex-col">
                <iframe ref={iframeRef} src={previewUrlWithKey} onLoad={handleIframeLoad} title="Desktop Preview" className="w-full h-full border-none bg-stone-950" />
              </div>
            )}
            {previewDeviceMode === "tablet" && (
              <div className="w-[576px] h-[768px] max-h-[82vh] rounded-3xl border-[12px] border-stone-800 bg-stone-900 shadow-2xl relative overflow-hidden shrink-0">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-stone-950 rounded-full z-20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-stone-800 rounded-full" />
                </div>
                <iframe ref={iframeRef} src={previewUrlWithKey} onLoad={handleIframeLoad} title="Tablet Preview" className="w-full h-full border-none bg-stone-950" />
              </div>
            )}
            {previewDeviceMode === "mobile" && (
              <div className="w-[320px] h-[568px] max-h-[82vh] rounded-3xl border-[12px] border-stone-800 bg-stone-900 shadow-2xl relative overflow-hidden shrink-0">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-3 bg-stone-950 rounded-full z-20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-stone-800 rounded-full mr-2" />
                  <div className="w-8 h-1 bg-stone-850 rounded-full" />
                </div>
                <iframe ref={iframeRef} src={previewUrlWithKey} onLoad={handleIframeLoad} title="Mobile Preview" className="w-full h-full border-none bg-stone-950" />
              </div>
            )}
          </main>
        </div>

        {/* Sticky Action Footer */}
        <footer className="relative z-10 flex items-center justify-between px-6 py-4 bg-[#fdf8f2] border-t border-stone-200 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetToDefault}
              className="footer-circle-btn flex items-center justify-center p-2.5 rounded-xl border cursor-pointer transition-all shrink-0"
              title="Reset to Defaults"
            >
              <FiRefreshCw className="text-xs" />
            </button>
            <button
              type="button"
              onClick={handleExportConfig}
              className="footer-circle-btn flex items-center justify-center p-2.5 rounded-xl border cursor-pointer transition-all shrink-0"
              title="Export Config JSON"
            >
              <FiDownload className="text-xs" />
            </button>
            <button
              type="button"
              onClick={() => importRef.current?.click()}
              className="footer-circle-btn flex items-center justify-center p-2.5 rounded-xl border cursor-pointer transition-all shrink-0"
              title="Import Config JSON"
            >
              <FiUpload className="text-xs" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                const payload = getPayload();
                localStorage.setItem("portfolio_preview_config", JSON.stringify(payload));
                addToast("Draft configuration saved locally. ✓", "success");
              }}
              className="secondary_button py-2.5 px-5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="py-2.5 px-8 rounded-xl text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-60 cursor-pointer flex items-center gap-1.5"
            >
              {isSaving ? "Publishing..." : <><FiSave className="text-sm" /> Publish Live</>}
            </button>
          </div>
        </footer>

        {/* Visual Canvas Modal */}
        <AnimatePresence>
          {visualEditorSection !== null && (
            <VisualCanvasModal
              isOpen={visualEditorSection !== null}
              onClose={() => setVisualEditorSection(null)}
              sectionName={visualEditorSection || ""}
              portfolioData={getPayload()}
              onSaveSection={handleSaveSectionFromCanvas}
            />
          )}
        </AnimatePresence>

        {/* Hidden import input */}
        <input ref={importRef} type="file" accept=".json,application/json" className="hidden" onChange={handleImportConfig} />

        {/* Toast notifications */}
        <ToastContainer toasts={toasts} />

        {/* Retro iOS-Style Alert Blocker Modal */}
        <AnimatePresence>
          {blocker.state === "blocked" && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/85 backdrop-blur-sm"
                onClick={() => blocker.reset()}
              />

              {/* iOS Alert Dialog Box */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="relative w-full max-w-sm overflow-hidden bg-[#1e1e1e] border border-[#2b2b2b] rounded-2xl shadow-2xl z-10 flex flex-col font-sans select-none"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.75)"
                }}
              >
                {/* Red top border/bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-red-600 to-red-500 shrink-0" />

                {/* Content */}
                <div className="px-6 py-7 text-center space-y-3">
                  <h3 className="text-lg font-black text-white tracking-wide">
                    Unsaved Changes
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed font-medium">
                    You have unsaved changes that will be lost. Are you sure you want to leave?
                  </p>
                </div>

                {/* Buttons Bar (Nope / Yep grid) */}
                <div className="flex border-t border-[#111111] p-3 gap-3 bg-[#181818] shrink-0">
                  <button
                    type="button"
                    onClick={() => blocker.reset()}
                    className="flex-1 py-3 text-center rounded-xl text-white font-black text-xs uppercase tracking-wider cursor-pointer transition-all active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(to bottom, #444444, #262626)",
                      border: "1px solid #111111",
                      boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 2px 4px rgba(0,0,0,0.4)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = "brightness(1.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = "none";
                    }}
                  >
                    Nope
                  </button>
                  <button
                    type="button"
                    onClick={() => blocker.proceed()}
                    className="flex-1 py-3 text-center rounded-xl text-white font-black text-xs uppercase tracking-wider cursor-pointer transition-all active:scale-[0.98]"
                    style={{
                      background: `linear-gradient(to bottom, ${pickedColor}, ${getLightShade(pickedColor, 0.2)})`,
                      borderColor: "rgba(0,0,0,0.4)",
                      color: getContrastColor(pickedColor),
                      boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 4px rgba(0,0,0,0.4)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = "brightness(1.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = "none";
                    }}
                  >
                    Yep
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Fallback (should not be hit under normal circumstances)
  // Fallback (should not be hit under normal circumstances)
  return null;
}
