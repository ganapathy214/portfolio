import React, { useState, useEffect, useRef, useDeferredValue, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiX, FiSave, FiMonitor, FiTablet, FiSmartphone, FiImage, 
  FiTrash2, FiPlus, FiCheck, FiSliders, FiArrowUp, FiArrowDown, FiChevronDown, FiChevronUp, FiPlusCircle, FiLink
} from "react-icons/fi";
import { 
  FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaYoutube,
  FaGlobe, FaDribbble, FaBehance, FaMedium, FaDev,
  FaStackOverflow, FaFigma, FaWhatsapp, FaTelegram,
} from "react-icons/fa";
import { getContrastColor } from "../../../utils/color";

// Import actual portfolio section components
import Home from "../../../sections/Home";
import About from "../../../sections/About";
import Services from "../../../sections/Services";
import Skills from "../../../sections/Skills";
import Projects from "../../../sections/Projects";
import Certification from "../../../sections/Certification";
import Testimonials from "../../../sections/Testimonials";
import Experience from "../../../sections/Experience";
import Education from "../../../sections/Education";
import Blogs from "../../../sections/Blogs";
import Faq from "../../../sections/Faq";
import Contact from "../../../sections/Contact";

const SOCIAL_ICON_OPTIONS = [
  { value: "FaLinkedinIn",     label: "LinkedIn",       Icon: FaLinkedinIn,     color: "#0077B5" },
  { value: "FaGithub",         label: "GitHub",         Icon: FaGithub,         color: "#EEEEEE" },
  { value: "FaTwitter",        label: "Twitter / X",    Icon: FaTwitter,        color: "#1DA1F2" },
  { value: "FaInstagram",      label: "Instagram",      Icon: FaInstagram,      color: "#E1306C" },
  { value: "FaYoutube",        label: "YouTube",        Icon: FaYoutube,        color: "#FF0000" },
  { value: "FaGlobe",          label: "Website",        Icon: FaGlobe,          color: "#00D5D5" },
  { value: "FaDribbble",       label: "Dribbble",       Icon: FaDribbble,       color: "#EA4C89" },
  { value: "FaBehance",        label: "Behance",        Icon: FaBehance,        color: "#1769FF" },
  { value: "FaMedium",         label: "Medium",         Icon: FaMedium,         color: "#00AB6C" },
  { value: "FaDev",            label: "Dev.to",         Icon: FaDev,            color: "#FFFFFF" },
  { value: "FaStackOverflow",  label: "Stack Overflow", Icon: FaStackOverflow,  color: "#F48024" },
  { value: "FaFigma",          label: "Figma",          Icon: FaFigma,          color: "#A259FF" },
  { value: "FaWhatsapp",       label: "WhatsApp",       Icon: FaWhatsapp,       color: "#25D366" },
  { value: "FaTelegram",       label: "Telegram",       Icon: FaTelegram,       color: "#2CA5E0" },
];

function ImageUploader({ label, value, onChange, pickedColor }) {
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2 text-left">
      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">{label}</span>
      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 rounded-2xl bg-stone-950 border border-stone-850 p-1 flex items-center justify-center overflow-hidden shrink-0">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover rounded-xl" />
          ) : (
            <FiImage className="text-stone-600 text-lg" />
          )}
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image URL or upload below"
            className="w-full bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-3 py-2 text-white font-medium"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="self-start text-[9px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg border border-stone-800 hover:border-stone-700 bg-stone-950/40 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            Upload File
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}

function ModalFormField({ label, type = "text", value, onChange, placeholder, pickedColor }) {
  return (
    <div className="flex flex-col gap-1.5 text-left">
      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">{label}</span>
      {type === "textarea" ? (
        <textarea
          rows={4}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-3.5 py-2.5 text-white leading-relaxed font-medium transition-colors"
        />
      ) : (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-3.5 py-2.5 text-white font-medium transition-colors"
        />
      )}
    </div>
  );
}

function SocialLinkEditor({ value, onChange, onRemove, pickedColor }) {
  return (
    <div className="p-4 rounded-2xl bg-stone-950/30 border border-stone-850 space-y-3 text-left">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className="text-[8px] font-bold text-stone-500 uppercase tracking-wide block mb-1">Platform</span>
          <select
            value={value.icon}
            onChange={(e) => {
              const opt = SOCIAL_ICON_OPTIONS.find(o => o.value === e.target.value);
              onChange({ ...value, icon: e.target.value, label: opt?.label || "Link" });
            }}
            className="w-full bg-stone-950 border border-stone-850 focus:border-primary outline-none text-[10px] rounded-xl px-2.5 py-2 text-white font-medium cursor-pointer"
          >
            {SOCIAL_ICON_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col justify-end">
          <button
            type="button"
            onClick={onRemove}
            className="py-2 px-3 rounded-xl bg-red-950/10 hover:bg-red-950/20 text-red-400 border border-red-900/20 text-[9px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-colors"
          >
            <FiTrash2 className="text-xs" />
            <span>Remove</span>
          </button>
        </div>
      </div>
      <div>
        <span className="text-[8px] font-bold text-stone-500 uppercase tracking-wide block mb-1">URL / Link Href</span>
        <input
          type="text"
          value={value.href || ""}
          onChange={(e) => onChange({ ...value, href: e.target.value })}
          placeholder="https://..."
          className="w-full bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-3 py-2 text-white font-medium"
        />
      </div>
    </div>
  );
}

export default function VisualCanvasModal({ 
  isOpen, 
  onClose, 
  sectionName, 
  portfolioData, 
  onSaveSection 
}) {
  const [viewportMode, setViewportMode] = useState("desktop"); // 'desktop' | 'tablet' | 'mobile'
  
  // Temporary State Holders for Editor Form
  const [tempAbout, setTempAbout] = useState({});
  const [tempRoles, setTempRoles] = useState([]);
  const [tempDescription, setTempDescription] = useState("");
  const [tempOrbitingStacks, setTempOrbitingStacks] = useState([]);
  const [tempSkills, setTempSkills] = useState([]);
  const [tempSkillCategories, setTempSkillCategories] = useState([]);
  const [tempTimelineData, setTempTimelineData] = useState([]);
  const [tempProjects, setTempProjects] = useState([]);
  const [tempTestimonials, setTempTestimonials] = useState([]);
  const [tempContactInfo, setTempContactInfo] = useState({});
  const [tempSectionTitles, setTempSectionTitles] = useState({});
  const [tempSectionVisibility, setTempSectionVisibility] = useState({});
  const [tempServicesSubtitle, setTempServicesSubtitle] = useState("");
  const [tempServicesData, setTempServicesData] = useState([]);
  const [tempCertifications, setTempCertifications] = useState([]);
  const [tempBlogs, setTempBlogs] = useState([]);
  const [tempFaqs, setTempFaqs] = useState([]);
  const [tempCenterSvg, setTempCenterSvg] = useState("");

  // Group all temporary variables for deferred preview rendering
  const previewData = useMemo(() => ({
    about: tempAbout,
    roles: tempRoles,
    description: tempDescription,
    centerSvg: tempCenterSvg,
    orbitingStacks: tempOrbitingStacks,
    skills: tempSkills,
    skillCategories: tempSkillCategories,
    timelineData: tempTimelineData,
    projects: tempProjects,
    testimonials: tempTestimonials,
    contactInfo: tempContactInfo,
    sectionTitles: tempSectionTitles,
    servicesSubtitle: tempServicesSubtitle,
    servicesData: tempServicesData,
    certifications: tempCertifications,
    blogs: tempBlogs,
    faqs: tempFaqs
  }), [
    tempAbout, tempRoles, tempDescription, tempCenterSvg, tempOrbitingStacks,
    tempSkills, tempSkillCategories, tempTimelineData, tempProjects, tempTestimonials,
    tempContactInfo, tempSectionTitles, tempServicesSubtitle, tempServicesData,
    tempCertifications, tempBlogs, tempFaqs
  ]);

  const deferredPreviewData = useDeferredValue(previewData);

  useEffect(() => {
    if (isOpen && portfolioData) {
      setTempAbout(portfolioData.about ? { ...portfolioData.about } : {});
      setTempRoles(portfolioData.roles ? [...portfolioData.roles] : []);
      setTempDescription(portfolioData.description || "");
      setTempOrbitingStacks(portfolioData.orbitingStacks ? [...portfolioData.orbitingStacks] : []);
      setTempSkills(portfolioData.skills ? [...portfolioData.skills] : []);
      setTempSkillCategories(portfolioData.skillCategories ? [...portfolioData.skillCategories] : []);
      setTempTimelineData(portfolioData.timelineData ? [...portfolioData.timelineData] : []);
      setTempProjects(portfolioData.projects ? [...portfolioData.projects] : []);
      setTempTestimonials(portfolioData.testimonials ? [...portfolioData.testimonials] : []);
      setTempContactInfo(portfolioData.contactInfo ? { ...portfolioData.contactInfo } : {});
      setTempSectionTitles(portfolioData.sectionTitles ? { ...portfolioData.sectionTitles } : {});
      setTempSectionVisibility(portfolioData.sectionVisibility ? { ...portfolioData.sectionVisibility } : {});
      setTempServicesSubtitle(portfolioData.servicesSubtitle || "");
      setTempServicesData(portfolioData.servicesData ? [...portfolioData.servicesData] : []);
      setTempCertifications(portfolioData.certifications ? [...portfolioData.certifications] : []);
      setTempBlogs(portfolioData.blogs ? [...portfolioData.blogs] : []);
      setTempFaqs(portfolioData.faqs ? [...portfolioData.faqs] : []);
      setTempCenterSvg(portfolioData.centerSvg || "");
    }
  }, [isOpen, portfolioData]);

  const pickedColor = portfolioData?.primaryColor || "#00D5D5";
  const sectionLayouts = portfolioData?.sectionLayouts || {};

  const viewportWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px"
  };

  // Merge back state copy and fire standard callback
  const handleApply = () => {
    // Construct a standard Canvas elements array so Settings.jsx doesn't throw a parsing error
    const elements = [];
    const sec = sectionName.toLowerCase();
    
    if (sec === "home" || sec === "hero") {
      elements.push(
        { id: "hero-title", content: tempAbout?.name || "" },
        { id: "hero-role", content: tempRoles?.[0] || "" },
        { id: "hero-bio", content: tempDescription || "" },
        { id: "hero-image", src: tempAbout?.avatarUrl || "" }
      );
    } else if (sec === "about") {
      elements.push(
        { id: "about-header", content: tempSectionTitles.About || "About Me" },
        { id: "about-bio", content: tempAbout?.bio || "" },
        { id: "about-image", src: tempAbout?.avatarUrl || "" }
      );
    } else {
      elements.push(
        { id: `${sec}-header`, content: tempSectionTitles[sectionName] || sectionName }
      );
    }

    onSaveSection({
      sectionName,
      elements,
      settings: {
        visibility: tempSectionVisibility[sectionName] !== false
      },
      // Pass the actual edited variables to Settings.jsx
      about: tempAbout,
      roles: tempRoles,
      description: tempDescription,
      orbitingStacks: tempOrbitingStacks,
      skills: tempSkills,
      skillCategories: tempSkillCategories,
      timelineData: tempTimelineData,
      projects: tempProjects,
      testimonials: tempTestimonials,
      contactInfo: tempContactInfo,
      servicesSubtitle: tempServicesSubtitle,
      servicesData: tempServicesData,
      certifications: tempCertifications,
      blogs: tempBlogs,
      faqs: tempFaqs,
      sectionTitles: tempSectionTitles,
      centerSvg: tempCenterSvg
    });

    onClose();
  };

  const renderVisibilityToggle = () => {
    const isVisible = tempSectionVisibility[sectionName] !== false;
    return (
      <div className="p-4 rounded-2xl border border-stone-850 bg-stone-950/20 flex items-center justify-between">
        <div className="text-left space-y-0.5">
          <span className="text-[10px] font-bold text-stone-300 uppercase tracking-wide">Section Status</span>
          <span className="text-[9px] text-stone-500 font-semibold block">
            {isVisible ? "Active & Visible in Sandbox Sandbox" : "Hidden from Sandbox Preview"}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setTempSectionVisibility(prev => ({ ...prev, [sectionName]: !isVisible }))}
          className={`px-3 py-1.5 rounded-xl border text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
            isVisible
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          {isVisible ? "Active" : "Hidden"}
        </button>
      </div>
    );
  };

  const renderFormFields = () => {
    const sec = sectionName.toLowerCase();
    const activeDesign = sectionLayouts[sectionName] || "design1";
    
    if (sec === "home" || sec === "hero") {
      const showSvgInput = activeDesign === "design1" || activeDesign === "design3" || activeDesign === "design5";
      const showStacksInput = activeDesign === "design1" || activeDesign === "design3";

      return (
        <div className="space-y-5">
          <ModalFormField
            label="Name / Title"
            value={tempAbout?.name}
            onChange={(val) => setTempAbout(prev => ({ ...prev, name: val }))}
            placeholder="Your name"
            pickedColor={pickedColor}
          />
          <ModalFormField
            label="Home Bio Description"
            type="textarea"
            value={tempDescription}
            onChange={(val) => setTempDescription(val)}
            placeholder="A short introduction..."
            pickedColor={pickedColor}
          />
          <ModalFormField
            label="Status Badge text"
            value={tempAbout?.statusBadgeText}
            onChange={(val) => setTempAbout(prev => ({ ...prev, statusBadgeText: val }))}
            placeholder="e.g. Open to Opportunities"
            pickedColor={pickedColor}
          />
          
          {/* Roles list */}
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Typewriter Roles</span>
            <div className="space-y-2">
              {tempRoles.map((role, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => {
                      const newRoles = [...tempRoles];
                      newRoles[idx] = e.target.value;
                      setTempRoles(newRoles);
                    }}
                    className="flex-1 bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-3 py-2 text-white font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setTempRoles(tempRoles.filter((_, i) => i !== idx))}
                    className="p-2 rounded-xl bg-red-950/10 hover:bg-red-950/20 text-red-400 border border-red-900/20 cursor-pointer"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setTempRoles([...tempRoles, ""])}
                className="w-full py-2 bg-stone-950 border border-stone-850 hover:border-stone-800 text-stone-300 text-[9px] font-bold uppercase tracking-wider rounded-xl cursor-pointer"
              >
                + Add Role Description
              </button>
            </div>
          </div>

          {/* Center SVG Code */}
          {showSvgInput && (
            <ModalFormField
              label="Center SVG (Inline HTML/SVG)"
              type="textarea"
              value={tempCenterSvg}
              onChange={(val) => setTempCenterSvg(val)}
              placeholder="<svg ...>...</svg>"
              pickedColor={pickedColor}
            />
          )}

          {/* Orbiting Stacks / Tech Stacks List Editor */}
          {showStacksInput && (
            <div className="space-y-2 text-left">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Orbiting Tech Stacks</span>
              <div className="space-y-2.5">
                {tempOrbitingStacks.map((stack, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-stone-950/20 border border-stone-850/50 p-2.5 rounded-xl">
                    <input
                      type="text"
                      placeholder="Stack Label (e.g. React.js)"
                      value={stack.label}
                      onChange={(e) => {
                        const copy = [...tempOrbitingStacks];
                        copy[idx] = { ...stack, label: e.target.value };
                        setTempOrbitingStacks(copy);
                      }}
                      className="flex-1 bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-2.5 py-1.5 text-white"
                    />
                    <select
                      value={stack.type || "primary"}
                      onChange={(e) => {
                        const copy = [...tempOrbitingStacks];
                        copy[idx] = { ...stack, type: e.target.value };
                        setTempOrbitingStacks(copy);
                      }}
                      className="bg-stone-950 border border-stone-850 focus:border-primary outline-none text-[10px] rounded-xl px-2 py-1.5 text-white font-medium cursor-pointer"
                    >
                      <option value="primary">Primary</option>
                      <option value="outline">Outline</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => setTempOrbitingStacks(tempOrbitingStacks.filter((_, i) => i !== idx))}
                      className="p-1.5 rounded-lg bg-red-950/10 hover:bg-red-950/20 text-red-400 border border-red-900/20 cursor-pointer"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setTempOrbitingStacks([...tempOrbitingStacks, { label: "New Tech", type: "primary" }])}
                  className="w-full py-2 bg-stone-950 border border-stone-850 hover:border-stone-800 text-stone-300 text-[9px] font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  + Add Tech Stack
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (sec === "about") {
      const showAvatarUploader = activeDesign === "design1" || activeDesign === "design3" || activeDesign === "design5";

      return (
        <div className="space-y-5">
          <ModalFormField
            label="Section Title"
            value={tempSectionTitles.About}
            onChange={(val) => setTempSectionTitles(prev => ({ ...prev, About: val }))}
            pickedColor={pickedColor}
          />
          <ModalFormField
            label="Bio Prefix"
            value={tempAbout?.bioPrefix}
            onChange={(val) => setTempAbout(prev => ({ ...prev, bioPrefix: val }))}
            pickedColor={pickedColor}
          />
          <ModalFormField
            label="Sub Label"
            value={tempAbout?.bioSubLabel}
            onChange={(val) => setTempAbout(prev => ({ ...prev, bioSubLabel: val }))}
            pickedColor={pickedColor}
          />
          <ModalFormField
            label="Biography Content"
            type="textarea"
            value={tempAbout?.bio}
            onChange={(val) => setTempAbout(prev => ({ ...prev, bio: val }))}
            pickedColor={pickedColor}
          />
          
          {showAvatarUploader && (
            <ImageUploader
              label="Profile Avatar"
              value={tempAbout?.avatarUrl}
              onChange={(val) => setTempAbout(prev => ({ ...prev, avatarUrl: val }))}
              pickedColor={pickedColor}
            />
          )}

          {/* Stats editor */}
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Metrics / Statistics</span>
            <div className="space-y-2.5">
              {(tempAbout.stats || []).map((stat, idx) => (
                <div key={idx} className="flex gap-2 items-center bg-stone-950/20 border border-stone-850/50 p-2.5 rounded-xl">
                  <input
                    type="text"
                    placeholder="Value (e.g. 5+)"
                    value={stat.value}
                    onChange={(e) => {
                      const copy = [...tempAbout.stats];
                      copy[idx] = { ...stat, value: e.target.value };
                      setTempAbout(prev => ({ ...prev, stats: copy }));
                    }}
                    className="w-20 bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-2 py-1.5 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Label (e.g. Years Exp)"
                    value={stat.label}
                    onChange={(e) => {
                      const copy = [...tempAbout.stats];
                      copy[idx] = { ...stat, label: e.target.value };
                      setTempAbout(prev => ({ ...prev, stats: copy }));
                    }}
                    className="flex-1 bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-2.5 py-1.5 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setTempAbout(prev => ({ ...prev, stats: prev.stats.filter((_, i) => i !== idx) }))}
                    className="p-1.5 rounded-lg bg-red-950/10 hover:bg-red-950/20 text-red-400 border border-red-900/20 cursor-pointer"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setTempAbout(prev => ({ ...prev, stats: [...(prev.stats || []), { value: "", label: "" }] }))}
                className="w-full py-2 bg-stone-950 border border-stone-850 hover:border-stone-800 text-stone-300 text-[9px] font-bold uppercase tracking-wider rounded-xl cursor-pointer"
              >
                + Add Metric Item
              </button>
            </div>
          </div>

          {/* Highlights editor */}
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Biography Highlights</span>
            <div className="space-y-2.5">
              {(tempAbout.highlights || []).map((hl, idx) => (
                <div key={idx} className="flex gap-2 items-center bg-stone-950/20 border border-stone-850/50 p-2.5 rounded-xl">
                  <input
                    type="text"
                    placeholder="Label (e.g. Location)"
                    value={hl.label}
                    onChange={(e) => {
                      const copy = [...tempAbout.highlights];
                      copy[idx] = { ...hl, label: e.target.value };
                      setTempAbout(prev => ({ ...prev, highlights: copy }));
                    }}
                    className="w-24 bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-2 py-1.5 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Detail value"
                    value={hl.value}
                    onChange={(e) => {
                      const copy = [...tempAbout.highlights];
                      copy[idx] = { ...hl, value: e.target.value };
                      setTempAbout(prev => ({ ...prev, highlights: copy }));
                    }}
                    className="flex-1 bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-2.5 py-1.5 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setTempAbout(prev => ({ ...prev, highlights: prev.highlights.filter((_, i) => i !== idx) }))}
                    className="p-1.5 rounded-lg bg-red-950/10 hover:bg-red-950/20 text-red-400 border border-red-900/20 cursor-pointer"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setTempAbout(prev => ({ ...prev, highlights: [...(prev.highlights || []), { label: "", value: "" }] }))}
                className="w-full py-2 bg-stone-950 border border-stone-850 hover:border-stone-800 text-stone-300 text-[9px] font-bold uppercase tracking-wider rounded-xl cursor-pointer"
              >
                + Add Highlight Row
              </button>
            </div>
          </div>

          {/* Social links editor */}
          <div className="space-y-2.5 text-left">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Social Networks</span>
            <div className="space-y-3">
              {(tempAbout.socialLinks || []).map((link, idx) => (
                <SocialLinkEditor
                  key={idx}
                  value={link}
                  onChange={(newVal) => {
                    const copy = [...tempAbout.socialLinks];
                    copy[idx] = newVal;
                    setTempAbout(prev => ({ ...prev, socialLinks: copy }));
                  }}
                  onRemove={() => setTempAbout(prev => ({ ...prev, socialLinks: prev.socialLinks.filter((_, i) => i !== idx) }))}
                  pickedColor={pickedColor}
                />
              ))}
              <button
                type="button"
                onClick={() => setTempAbout(prev => ({ ...prev, socialLinks: [...(prev.socialLinks || []), { icon: "FaGithub", href: "https://", label: "Github" }] }))}
                className="w-full py-2 bg-stone-950 border border-stone-850 hover:border-stone-800 text-stone-300 text-[9px] font-bold uppercase tracking-wider rounded-xl cursor-pointer"
              >
                + Add Link Option
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (sec === "skills") {
      return (
        <div className="space-y-5 text-left">
          <ModalFormField
            label="Section Title"
            value={tempSectionTitles.Skills}
            onChange={(val) => setTempSectionTitles(prev => ({ ...prev, Skills: val }))}
            pickedColor={pickedColor}
          />

          {/* Categories and Skill items */}
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Categories & Skill Lists</span>
            
            {tempSkillCategories.map((cat) => {
              const catSkills = tempSkills.filter(s => s.category === cat.id);
              return (
                <div key={cat.id} className="p-4 rounded-2xl border border-stone-850 bg-stone-950/20 space-y-3">
                  <div className="flex gap-2 items-center justify-between">
                    <input
                      type="text"
                      value={cat.name}
                      onChange={(e) => {
                        const copy = [...tempSkillCategories];
                        const c = copy.find(x => x.id === cat.id);
                        if (c) c.name = e.target.value;
                        setTempSkillCategories(copy);
                      }}
                      className="bg-transparent border-b border-stone-800 focus:border-primary outline-none font-bold text-white text-xs py-1"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setTempSkillCategories(tempSkillCategories.filter(x => x.id !== cat.id));
                        setTempSkills(tempSkills.filter(x => x.category !== cat.id));
                      }}
                      className="p-1 rounded bg-red-950/15 hover:bg-red-950/30 text-red-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <FiTrash2 className="text-xs" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {catSkills.map((s, sIdx) => (
                      <div key={sIdx} className="flex gap-3 items-center bg-stone-900/60 p-2 rounded-xl">
                        <input
                          type="text"
                          value={s.name}
                          onChange={(e) => {
                            const copy = [...tempSkills];
                            const idx = tempSkills.indexOf(s);
                            if (idx !== -1) copy[idx].name = e.target.value;
                            setTempSkills(copy);
                          }}
                          className="flex-1 bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-lg px-2 py-1 text-white"
                        />
                        <div className="flex items-center gap-1.5 w-24">
                          <input
                            type="range"
                            min="10"
                            max="100"
                            step="5"
                            value={s.level || 80}
                            onChange={(e) => {
                              const copy = [...tempSkills];
                              const idx = tempSkills.indexOf(s);
                              if (idx !== -1) copy[idx].level = parseInt(e.target.value);
                              setTempSkills(copy);
                            }}
                            className="w-16 accent-primary h-1 bg-stone-850 rounded"
                          />
                          <span className="text-[9px] font-bold text-stone-400 w-6 text-right">{s.level || 80}%</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setTempSkills(tempSkills.filter(x => x !== s))}
                          className="p-1 text-stone-500 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <FiX className="text-xs" />
                        </button>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={() => setTempSkills([...tempSkills, { name: "New Skill", level: 80, category: cat.id }])}
                      className="w-full py-1.5 bg-stone-950/60 border border-stone-900 hover:border-stone-850 text-stone-400 hover:text-stone-200 text-[8.5px] font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                    >
                      + Add Skill
                    </button>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={() => {
                const newId = `category_${Date.now()}`;
                setTempSkillCategories([...tempSkillCategories, { id: newId, name: "New Category" }]);
              }}
              className="w-full py-2 bg-stone-950 border border-stone-850 hover:border-stone-800 text-stone-300 text-[9px] font-bold uppercase tracking-wider rounded-xl cursor-pointer"
            >
              + Add Category Panel
            </button>
          </div>
        </div>
      );
    }

    if (sec === "experience") {
      const expItems = tempTimelineData.filter(
        item => !item.percent && 
        !item.title.toLowerCase().includes("school") && 
        !item.title.toLowerCase().includes("certificate")
      );

      return (
        <div className="space-y-5 text-left">
          <ModalFormField
            label="Section Title"
            value={tempSectionTitles.Experience}
            onChange={(val) => setTempSectionTitles(prev => ({ ...prev, Experience: val }))}
            pickedColor={pickedColor}
          />

          <div className="space-y-4">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Work History</span>
            
            {expItems.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-stone-850 bg-stone-950/20 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase text-primary" style={{ color: pickedColor }}>Job #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => setTempTimelineData(tempTimelineData.filter(x => x !== item))}
                    className="p-1 rounded bg-red-950/15 hover:bg-red-950/30 text-red-400 transition-colors cursor-pointer"
                  >
                    <FiTrash2 className="text-xs" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Role / Title"
                    value={item.title}
                    onChange={(e) => {
                      const copy = [...tempTimelineData];
                      const realIdx = tempTimelineData.indexOf(item);
                      if (realIdx !== -1) copy[realIdx].title = e.target.value;
                      setTempTimelineData(copy);
                    }}
                    className="w-full bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-2.5 py-2 text-white font-medium"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={item.org}
                    onChange={(e) => {
                      const copy = [...tempTimelineData];
                      const realIdx = tempTimelineData.indexOf(item);
                      if (realIdx !== -1) copy[realIdx].org = e.target.value;
                      setTempTimelineData(copy);
                    }}
                    className="w-full bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-2.5 py-2 text-white font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Time (e.g. 2021 - Present)"
                    value={item.time}
                    onChange={(e) => {
                      const copy = [...tempTimelineData];
                      const realIdx = tempTimelineData.indexOf(item);
                      if (realIdx !== -1) copy[realIdx].time = e.target.value;
                      setTempTimelineData(copy);
                    }}
                    className="w-full bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-2.5 py-2 text-white font-medium"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={item.location || ""}
                    onChange={(e) => {
                      const copy = [...tempTimelineData];
                      const realIdx = tempTimelineData.indexOf(item);
                      if (realIdx !== -1) copy[realIdx].location = e.target.value;
                      setTempTimelineData(copy);
                    }}
                    className="w-full bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-2.5 py-2 text-white font-medium"
                  />
                </div>

                <textarea
                  placeholder="Responsibilities..."
                  rows={3}
                  value={item.desc || ""}
                  onChange={(e) => {
                    const copy = [...tempTimelineData];
                    const realIdx = tempTimelineData.indexOf(item);
                    if (realIdx !== -1) copy[realIdx].desc = e.target.value;
                    setTempTimelineData(copy);
                  }}
                  className="w-full bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-2.5 py-2 text-white leading-relaxed"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                const newItem = {
                  title: "Software Engineer",
                  org: "Corporate Labs",
                  time: "2024 - Present",
                  location: "Remote",
                  desc: "Led development of scalable web products, optimized performance dashboards, and built APIs."
                };
                setTempTimelineData([...tempTimelineData, newItem]);
              }}
              className="w-full py-2 bg-stone-950 border border-stone-850 hover:border-stone-800 text-stone-300 text-[9px] font-bold uppercase tracking-wider rounded-xl cursor-pointer"
            >
              + Add Experience Row
            </button>
          </div>
        </div>
      );
    }

    if (sec === "education") {
      const eduItems = tempTimelineData.filter(
        item => item.percent || 
        item.title.toLowerCase().includes("school") || 
        item.title.toLowerCase().includes("certificate")
      );

      return (
        <div className="space-y-5 text-left">
          <ModalFormField
            label="Section Title"
            value={tempSectionTitles.Education}
            onChange={(val) => setTempSectionTitles(prev => ({ ...prev, Education: val }))}
            pickedColor={pickedColor}
          />

          <div className="space-y-4">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Academic Entries</span>
            
            {eduItems.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-stone-850 bg-stone-950/20 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase text-primary" style={{ color: pickedColor }}>Academic #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => setTempTimelineData(tempTimelineData.filter(x => x !== item))}
                    className="p-1 rounded bg-red-950/15 hover:bg-red-950/30 text-red-400 transition-colors cursor-pointer"
                  >
                    <FiTrash2 className="text-xs" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Degree / Certificate"
                    value={item.title}
                    onChange={(e) => {
                      const copy = [...tempTimelineData];
                      const realIdx = tempTimelineData.indexOf(item);
                      if (realIdx !== -1) copy[realIdx].title = e.target.value;
                      setTempTimelineData(copy);
                    }}
                    className="w-full bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-2.5 py-2 text-white font-medium"
                  />
                  <input
                    type="text"
                    placeholder="Institution"
                    value={item.org}
                    onChange={(e) => {
                      const copy = [...tempTimelineData];
                      const realIdx = tempTimelineData.indexOf(item);
                      if (realIdx !== -1) copy[realIdx].org = e.target.value;
                      setTempTimelineData(copy);
                    }}
                    className="w-full bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-2.5 py-2 text-white font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Duration (e.g. 2018 - 2022)"
                    value={item.time}
                    onChange={(e) => {
                      const copy = [...tempTimelineData];
                      const realIdx = tempTimelineData.indexOf(item);
                      if (realIdx !== -1) copy[realIdx].time = e.target.value;
                      setTempTimelineData(copy);
                    }}
                    className="w-full bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-2.5 py-2 text-white font-medium"
                  />
                  <input
                    type="text"
                    placeholder="GPA / Mark Percentage"
                    value={item.percent || ""}
                    onChange={(e) => {
                      const copy = [...tempTimelineData];
                      const realIdx = tempTimelineData.indexOf(item);
                      if (realIdx !== -1) copy[realIdx].percent = e.target.value;
                      setTempTimelineData(copy);
                    }}
                    className="w-full bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-2.5 py-2 text-white font-medium"
                  />
                </div>

                <textarea
                  placeholder="Honors or major course details..."
                  rows={2}
                  value={item.desc || ""}
                  onChange={(e) => {
                    const copy = [...tempTimelineData];
                    const realIdx = tempTimelineData.indexOf(item);
                    if (realIdx !== -1) copy[realIdx].desc = e.target.value;
                    setTempTimelineData(copy);
                  }}
                  className="w-full bg-stone-950 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-2.5 py-2 text-white leading-relaxed"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                const newItem = {
                  title: "Bachelor of Science",
                  org: "State University",
                  time: "2018 - 2022",
                  percent: "9.0 GPA",
                  desc: "Graduated with honors in Computer Science. Major in Systems."
                };
                setTempTimelineData([...tempTimelineData, newItem]);
              }}
              className="w-full py-2 bg-stone-950 border border-stone-850 hover:border-stone-800 text-stone-300 text-[9px] font-bold uppercase tracking-wider rounded-xl cursor-pointer"
            >
              + Add Education Row
            </button>
          </div>
        </div>
      );
    }

    if (sec === "projects") {
      return (
        <div className="space-y-6 text-left">
          <ModalFormField
            label="Section Title"
            value={tempSectionTitles.Projects}
            onChange={(val) => setTempSectionTitles(prev => ({ ...prev, Projects: val }))}
            pickedColor={pickedColor}
          />

          <div className="space-y-5">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Projects List</span>
            
            {tempProjects.map((p, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-stone-850 bg-stone-950/20 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase text-primary" style={{ color: pickedColor }}>Project #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => setTempProjects(tempProjects.filter(x => x !== p))}
                    className="p-1 rounded bg-red-950/15 hover:bg-red-950/30 text-red-400 transition-colors cursor-pointer"
                  >
                    <FiTrash2 className="text-xs" />
                  </button>
                </div>

                <ModalFormField
                  label="Title"
                  value={p.title}
                  onChange={(val) => {
                    const copy = [...tempProjects];
                    copy[idx].title = val;
                    setTempProjects(copy);
                  }}
                  pickedColor={pickedColor}
                />
                
                <ModalFormField
                  label="Description"
                  type="textarea"
                  value={p.desc}
                  onChange={(val) => {
                    const copy = [...tempProjects];
                    copy[idx].desc = val;
                    setTempProjects(copy);
                  }}
                  pickedColor={pickedColor}
                />

                <div className="grid grid-cols-2 gap-3">
                  <ModalFormField
                    label="Live Demo Link"
                    value={p.demoLink}
                    onChange={(val) => {
                      const copy = [...tempProjects];
                      copy[idx].demoLink = val;
                      setTempProjects(copy);
                    }}
                    pickedColor={pickedColor}
                  />
                  <ModalFormField
                    label="Github Link"
                    value={p.githubLink}
                    onChange={(val) => {
                      const copy = [...tempProjects];
                      copy[idx].githubLink = val;
                      setTempProjects(copy);
                    }}
                    pickedColor={pickedColor}
                  />
                </div>

                <ModalFormField
                  label="Technologies (comma separated)"
                  value={p.tags ? p.tags.join(", ") : ""}
                  onChange={(val) => {
                    const copy = [...tempProjects];
                    copy[idx].tags = val.split(",").map(t => t.trim()).filter(Boolean);
                    setTempProjects(copy);
                  }}
                  pickedColor={pickedColor}
                />

                <ImageUploader
                  label="Project Screenshot"
                  value={p.imageUrl}
                  onChange={(val) => {
                    const copy = [...tempProjects];
                    copy[idx].imageUrl = val;
                    setTempProjects(copy);
                  }}
                  pickedColor={pickedColor}
                />

                {/* Feature highlights / responsibilities list */}
                <div className="space-y-2">
                  <span className="text-[8px] font-bold text-stone-500 uppercase tracking-wide block">Feature Highlights / Tasks</span>
                  <div className="space-y-1.5">
                    {(p.responsibilities || []).map((resp, rIdx) => (
                      <div key={rIdx} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={resp}
                          onChange={(e) => {
                            const copy = [...tempProjects];
                            copy[idx].responsibilities[rIdx] = e.target.value;
                            setTempProjects(copy);
                          }}
                          className="flex-1 bg-stone-950 border border-stone-850 focus:border-primary outline-none text-[10px] rounded-lg px-2 py-1 text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const copy = [...tempProjects];
                            copy[idx].responsibilities = copy[idx].responsibilities.filter((_, i) => i !== rIdx);
                            setTempProjects(copy);
                          }}
                          className="text-stone-500 hover:text-red-400"
                        >
                          <FiX className="text-xs" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const copy = [...tempProjects];
                        copy[idx].responsibilities = [...(copy[idx].responsibilities || []), ""];
                        setTempProjects(copy);
                      }}
                      className="w-full py-1 bg-stone-950/60 border border-stone-900 hover:border-stone-850 text-stone-400 hover:text-stone-200 text-[8px] font-bold uppercase tracking-wider rounded-lg cursor-pointer"
                    >
                      + Add Highlight
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => {
                const newItem = {
                  title: "AI Automation Engine",
                  desc: "Developed an autonomous pipeline parsing structural databases and generating summaries.",
                  tags: ["React", "Python", "Vite"],
                  imageUrl: "",
                  demoLink: "https://",
                  githubLink: "https://",
                  responsibilities: ["Integrated ML endpoints", "Secured tokens and uploads"]
                };
                setTempProjects([...tempProjects, newItem]);
              }}
              className="w-full py-2 bg-stone-950 border border-stone-850 hover:border-stone-800 text-stone-300 text-[9px] font-bold uppercase tracking-wider rounded-xl cursor-pointer"
            >
              + Add Project Card
            </button>
          </div>
        </div>
      );
    }

    if (sec === "testimonials") {
      return (
        <div className="space-y-5 text-left">
          <ModalFormField
            label="Section Title"
            value={tempSectionTitles.Testimonials}
            onChange={(val) => setTempSectionTitles(prev => ({ ...prev, Testimonials: val }))}
            pickedColor={pickedColor}
          />

          <div className="space-y-4">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Client Testimonials</span>
            
            {tempTestimonials.map((t, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-stone-850 bg-stone-950/20 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase text-primary" style={{ color: pickedColor }}>Review #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => setTempTestimonials(tempTestimonials.filter(x => x !== t))}
                    className="p-1 rounded bg-red-950/15 hover:bg-red-950/30 text-red-400 transition-colors cursor-pointer"
                  >
                    <FiTrash2 className="text-xs" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ModalFormField
                    label="Client Name"
                    value={t.name}
                    onChange={(val) => {
                      const copy = [...tempTestimonials];
                      copy[idx].name = val;
                      setTempTestimonials(copy);
                    }}
                    pickedColor={pickedColor}
                  />
                  <ModalFormField
                    label="Client Title / Role"
                    value={t.role}
                    onChange={(val) => {
                      const copy = [...tempTestimonials];
                      copy[idx].role = val;
                      setTempTestimonials(copy);
                    }}
                    pickedColor={pickedColor}
                  />
                </div>

                <ModalFormField
                  label="Company Name"
                  value={t.company}
                  onChange={(val) => {
                    const copy = [...tempTestimonials];
                    copy[idx].company = val;
                    setTempTestimonials(copy);
                  }}
                  pickedColor={pickedColor}
                />

                <ModalFormField
                  label="Quote Content"
                  type="textarea"
                  value={t.quote}
                  onChange={(val) => {
                    const copy = [...tempTestimonials];
                    copy[idx].quote = val;
                    setTempTestimonials(copy);
                  }}
                  pickedColor={pickedColor}
                />

                <ImageUploader
                  label="Client Photo"
                  value={t.avatar}
                  onChange={(val) => {
                    const copy = [...tempTestimonials];
                    copy[idx].avatar = val;
                    setTempTestimonials(copy);
                  }}
                  pickedColor={pickedColor}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                const newItem = {
                  name: "Sarah Connors",
                  role: "Director of Product",
                  company: "Apex Tech Inc.",
                  quote: "Outstanding developer. Delivered the entire responsive mobile app ahead of schedule.",
                  avatar: ""
                };
                setTempTestimonials([...tempTestimonials, newItem]);
              }}
              className="w-full py-2 bg-stone-950 border border-stone-850 hover:border-stone-800 text-stone-300 text-[9px] font-bold uppercase tracking-wider rounded-xl cursor-pointer"
            >
              + Add Testimonial Card
            </button>
          </div>
        </div>
      );
    }

    if (sec === "contact") {
      return (
        <div className="space-y-5">
          <ModalFormField
            label="Section Title"
            value={tempSectionTitles.Contact}
            onChange={(val) => setTempSectionTitles(prev => ({ ...prev, Contact: val }))}
            pickedColor={pickedColor}
          />
          <ModalFormField
            label="Direct Email"
            value={tempContactInfo?.email}
            onChange={(val) => setTempContactInfo(prev => ({ ...prev, email: val }))}
            pickedColor={pickedColor}
          />
          <ModalFormField
            label="Phone Number"
            value={tempContactInfo?.phone}
            onChange={(val) => setTempContactInfo(prev => ({ ...prev, phone: val }))}
            pickedColor={pickedColor}
          />
          <ModalFormField
            label="Location / Timezone"
            value={tempContactInfo?.location}
            onChange={(val) => setTempContactInfo(prev => ({ ...prev, location: val }))}
            pickedColor={pickedColor}
          />
        </div>
      );
    }

    if (sec === "services") {
      return (
        <div className="space-y-5">
          <ModalFormField
            label="Section Title"
            value={tempSectionTitles.Services}
            onChange={(val) => setTempSectionTitles(prev => ({ ...prev, Services: val }))}
            pickedColor={pickedColor}
          />
          <ModalFormField
            label="Services Subtitle"
            type="textarea"
            value={tempServicesSubtitle}
            onChange={(val) => setTempServicesSubtitle(val)}
            placeholder="Describe your service offerings..."
            pickedColor={pickedColor}
          />
          <div className="p-3 rounded-xl border border-stone-800 bg-stone-950/30 text-stone-500 text-[10px]">
            ℹ️ Individual service cards can be edited in the main settings panel under <strong>Services</strong>.
          </div>
        </div>
      );
    }

    if (sec === "certification") {
      return (
        <div className="space-y-5">
          <ModalFormField
            label="Section Title"
            value={tempSectionTitles.Certification}
            onChange={(val) => setTempSectionTitles(prev => ({ ...prev, Certification: val }))}
            pickedColor={pickedColor}
          />
          <div className="p-3 rounded-xl border border-stone-800 bg-stone-950/30 text-stone-500 text-[10px]">
            ℹ️ {tempCertifications.length} certification(s) loaded. Edit individual certifications in the main settings panel.
          </div>
        </div>
      );
    }

    if (sec === "blogs") {
      return (
        <div className="space-y-5">
          <ModalFormField
            label="Section Title"
            value={tempSectionTitles.Blogs}
            onChange={(val) => setTempSectionTitles(prev => ({ ...prev, Blogs: val }))}
            pickedColor={pickedColor}
          />
          <div className="p-3 rounded-xl border border-stone-800 bg-stone-950/30 text-stone-500 text-[10px]">
            ℹ️ {tempBlogs.length} blog post(s) loaded. Edit individual posts in the main settings panel.
          </div>
        </div>
      );
    }

    if (sec === "faq") {
      return (
        <div className="space-y-5">
          <ModalFormField
            label="Section Title"
            value={tempSectionTitles.Faq}
            onChange={(val) => setTempSectionTitles(prev => ({ ...prev, Faq: val }))}
            pickedColor={pickedColor}
          />
          <div className="p-3 rounded-xl border border-stone-800 bg-stone-950/30 text-stone-500 text-[10px]">
            ℹ️ {tempFaqs.length} FAQ item(s) loaded. Edit individual questions in the main settings panel.
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-6 text-stone-500 text-xs">
        No custom fields defined for this section.
      </div>
    );
  };

  const renderLivePreview = () => {
    const sec = sectionName.toLowerCase();
    const activeDesign = sectionLayouts[sectionName] || "design1";
    
    // Provide a mocked section wrapper matching standard styles
    const renderContent = () => {
      switch (sec) {
        case "home":
        case "hero":
          return (
            <Home
              name={deferredPreviewData.about?.name}
              roles={deferredPreviewData.roles}
              description={deferredPreviewData.description}
              centerSvg={deferredPreviewData.centerSvg}
              orbitingStacks={deferredPreviewData.orbitingStacks}
              statusBadgeText={deferredPreviewData.about?.statusBadgeText}
              design={activeDesign}
            />
          );
        case "about":
          return (
            <About
              about={deferredPreviewData.about}
              title={deferredPreviewData.sectionTitles.About}
              design={activeDesign}
            />
          );
        case "skills":
          return (
            <Skills
              skills={deferredPreviewData.skills}
              skillCategories={deferredPreviewData.skillCategories}
              title={deferredPreviewData.sectionTitles.Skills}
              design={activeDesign}
            />
          );
        case "experience":
          return (
            <Experience
              timelineData={deferredPreviewData.timelineData}
              title={deferredPreviewData.sectionTitles.Experience}
              design={activeDesign}
            />
          );
        case "education":
          return (
            <Education
              timelineData={deferredPreviewData.timelineData}
              title={deferredPreviewData.sectionTitles.Education}
              design={activeDesign}
            />
          );
        case "projects":
          return (
            <Projects
              projects={deferredPreviewData.projects}
              title={deferredPreviewData.sectionTitles.Projects}
              design={activeDesign}
            />
          );
        case "testimonials":
          return (
            <Testimonials
              testimonials={deferredPreviewData.testimonials}
              title={deferredPreviewData.sectionTitles.Testimonials}
              design={activeDesign}
            />
          );
        case "services":
          return (
            <Services
              servicesSubtitle={deferredPreviewData.servicesSubtitle}
              servicesData={deferredPreviewData.servicesData}
              title={deferredPreviewData.sectionTitles.Services}
              design={activeDesign}
            />
          );
        case "certification":
          return (
            <Certification
              certifications={deferredPreviewData.certifications}
              title={deferredPreviewData.sectionTitles.Certification}
              design={activeDesign}
            />
          );
        case "blogs":
          return (
            <Blogs
              blogs={deferredPreviewData.blogs}
              title={deferredPreviewData.sectionTitles.Blogs}
              design={activeDesign}
            />
          );
        case "faq":
          return (
            <Faq
              faqs={deferredPreviewData.faqs}
              title={deferredPreviewData.sectionTitles.Faq}
              design={activeDesign}
            />
          );
        case "contact":
          return (
            <Contact
              contactInfo={deferredPreviewData.contactInfo}
              title={deferredPreviewData.sectionTitles.Contact}
              design={activeDesign}
            />
          );
        default:
          return <div className="text-stone-500 py-20 text-center">Preview not available.</div>;
      }
    };

    const isDark = portfolioData?.themeMode !== "light";
    const bg = isDark ? "#0b0f19" : "#f3f4f6";
    const color = isDark ? "#cbd5e1" : "#1f2937";

    return (
      <div
        className="w-full min-h-[500px] flex flex-col justify-start"
        style={{
          backgroundColor: bg,
          color: color,
        }}
      >
        {renderContent()}
      </div>
    );
  };

  const modalContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 15 }}
      transition={{ type: "spring", damping: 30, stiffness: 280 }}
      className="fixed inset-0 z-[200] bg-stone-950 text-white flex flex-col font-sans select-none"
    >
      {/* Top Header Bar */}
      <header className="settings-console-page h-16 shrink-0 border-b border-stone-850 px-6 flex items-center justify-between bg-stone-900">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0" style={{ backgroundColor: pickedColor }} />
          <h2 className="text-xs font-black uppercase tracking-widest text-left">
            Section Editor: <span className="text-stone-400">{sectionName}</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Viewport switch mode */}
          <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-850 mr-2 sm:mr-4">
            <button
              onClick={() => setViewportMode("desktop")}
              className={`p-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${viewportMode === "desktop" ? "bg-stone-900 text-white" : "text-stone-500 hover:text-white"}`}
            >
              <FiMonitor className="text-xs" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setViewportMode("tablet")}
              className={`p-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${viewportMode === "tablet" ? "bg-stone-900 text-white" : "text-stone-500 hover:text-white"}`}
            >
              <FiTablet className="text-xs" />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              onClick={() => setViewportMode("mobile")}
              className={`p-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${viewportMode === "mobile" ? "bg-stone-900 text-white" : "text-stone-500 hover:text-white"}`}
            >
              <FiSmartphone className="text-xs" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="py-2 px-4 rounded-xl border border-stone-800 text-stone-400 hover:text-white bg-stone-950/40 hover:bg-stone-950 text-[10px] font-black uppercase tracking-widest cursor-pointer transition-colors"
          >
            Cancel
          </motion.button>
          
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleApply}
            className="py-2 px-5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer hover:opacity-90 flex items-center gap-1.5"
            style={{
              backgroundColor: pickedColor,
              color: getContrastColor(pickedColor)
            }}
          >
            <FiCheck className="text-xs" />
            <span>Apply Changes</span>
          </motion.button>
        </div>
      </header>

      {/* Main Body container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left 40% scrollable editor */}
        <div className="settings-console-page w-[40%] min-w-[320px] max-w-[480px] bg-stone-900/90 border-r border-stone-850 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin">
            {/* Visibility Toggle banner */}
            {renderVisibilityToggle()}
            
            {/* Custom section fields */}
            {renderFormFields()}
          </div>
        </div>

        {/* Right 60% live section preview */}
        <div className="flex-1 bg-stone-950 flex flex-col overflow-hidden relative">
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
          
          {/* Scrollable Viewport Frame */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex justify-center items-start scrollbar-thin">
            <div
              className={`border border-stone-850 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 relative ${portfolioData?.themeMode || "dark"}`}
              style={{
                width: viewportWidths[viewportMode],
                minHeight: "500px",
                fontFamily: `var(--font-primary, '${portfolioData?.fontFamily || "Outfit"}', sans-serif)`,
              }}
            >
              {renderLivePreview()}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return isOpen ? createPortal(modalContent, document.body) : null;
}
