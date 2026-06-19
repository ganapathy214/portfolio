import React, { useState } from "react";
import { FormField, FileUpload, TabCardWrapper, ControlButtons } from "../SettingsCommon";
import {
  FaLinkedinIn, FaGithub, FaTwitter, FaInstagram, FaYoutube,
  FaGlobe, FaDribbble, FaBehance, FaMedium, FaDev,
  FaStackOverflow, FaFigma, FaWhatsapp, FaTelegram,
} from "react-icons/fa";
import { FiPlus, FiTrash2 } from "react-icons/fi";

// All supported social icons with display info
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

// Icon picker sub-component
function IconPicker({ value, onChange, pickedColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const current = SOCIAL_ICON_OPTIONS.find(o => o.value === value) || SOCIAL_ICON_OPTIONS[0];
  const CurrentIcon = current.Icon;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(p => !p)}
        className="flex items-center gap-2 w-full bg-stone-950 border border-stone-900 hover:border-stone-800 rounded-xl px-3 py-2 transition-all cursor-pointer"
        style={isOpen ? { borderColor: pickedColor } : {}}
      >
        <CurrentIcon className="text-sm shrink-0" style={{ color: current.color }} />
        <span className="text-[9px] font-bold uppercase tracking-wider text-stone-300 flex-1 text-left">{current.label}</span>
        <span className="text-[8px] text-stone-600 shrink-0">▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-1 w-full bg-stone-950 border border-stone-900 rounded-2xl shadow-2xl p-2 grid grid-cols-3 gap-1.5 min-w-[220px]">
          {SOCIAL_ICON_OPTIONS.map(opt => {
            const IsSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className="flex flex-col items-center gap-1 p-2 rounded-xl border transition-all cursor-pointer hover:bg-stone-900"
                style={{
                  borderColor: IsSelected ? pickedColor : "transparent",
                  backgroundColor: IsSelected ? `${pickedColor}12` : "transparent",
                }}
                title={opt.label}
              >
                <opt.Icon className="text-base" style={{ color: opt.color }} />
                <span className="text-[7px] font-bold uppercase text-stone-500 leading-none text-center">{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AboutTab({
  localAbout,
  updateAbout,
  updateAboutStat,
  updateAboutHighlight,
  updateAboutSocialLink,
  updateAboutTitle,
  pickedColor,
  renderSectionVisibilityBanner,
  localSectionTitles,
  setLocalSectionTitles
}) {
  const socialLinks = localAbout.socialLinks || [];

  const addSocialLink = () => {
    updateAbout("socialLinks", [...socialLinks, { icon: "FaGithub", label: "GitHub", href: "https://github.com/" }]);
  };

  const removeSocialLink = (idx) => {
    updateAbout("socialLinks", socialLinks.filter((_, i) => i !== idx));
  };

  const moveSocialLink = (idx, dir) => {
    const ni = idx + dir;
    if (ni < 0 || ni >= socialLinks.length) return;
    const copy = [...socialLinks];
    [copy[idx], copy[ni]] = [copy[ni], copy[idx]];
    updateAbout("socialLinks", copy);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {renderSectionVisibilityBanner("About")}

      {/* Section Title */}
      <FormField
        label="Section Display Title Heading"
        value={localSectionTitles.About}
        onChange={(val) => setLocalSectionTitles(prev => ({ ...prev, About: val }))}
        placeholder="e.g. Who am I ?"
      />

      {/* Profile Identity & CV */}
      <TabCardWrapper title="Profile Identity & CV">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Display Name"
            value={localAbout.name}
            onChange={(val) => updateAbout("name", val)}
            placeholder="Your Name"
          />
          <FormField
            label="Card Sub-Title"
            value={localAbout.title}
            onChange={(val) => updateAbout("title", val)}
            placeholder="Your Job Title"
          />
          <FormField
            label="Status Badge Text"
            value={localAbout.statusBadgeText || ""}
            onChange={(val) => updateAbout("statusBadgeText", val)}
            placeholder="e.g. Open to Work 🚀"
          />
          <FormField
            label="Location"
            value={localAbout.location || ""}
            onChange={(val) => updateAbout("location", val)}
            placeholder="e.g. India 🇮🇳"
          />

          <FileUpload
            accept="application/pdf"
            onUpload={(result, name) => {
              updateAbout("resumeUrl", result);
              updateAbout("resumeFileName", name);
            }}
            fileName={localAbout.resumeFileName}
            buttonText="Upload Resume PDF"
            colSpan="col-span-1 sm:col-span-2"
          />

          <FormField
            label="Downloaded Resume File Name"
            value={localAbout.resumeFileName}
            onChange={(val) => updateAbout("resumeFileName", val)}
            placeholder="Your_Name_Resume.pdf"
            colSpan="col-span-1 sm:col-span-2"
          />

          <FileUpload
            accept="image/*"
            onUpload={(result) => updateAbout("avatarUrl", result)}
            fileName={localAbout.avatarUrl ? "Custom portrait uploaded" : ""}
            buttonText="Profile Image (Avatar)"
            colSpan="col-span-1 sm:col-span-2"
          />

          {localAbout.avatarUrl && (
            <div className="flex items-center gap-3 bg-stone-950 p-3 rounded-xl col-span-1 sm:col-span-2 border border-stone-900">
              <div className="relative w-10 h-10 border border-stone-800 rounded-full overflow-hidden bg-stone-950 shrink-0">
                <img src={localAbout.avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <span className="text-[9px] text-stone-400 font-mono">Custom avatar active</span>
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
      </TabCardWrapper>

      {/* Typewriter Titles */}
      <TabCardWrapper title="Typewriter Titles" subtitle="Animated on About bio heading">
        <div className="flex flex-col gap-2">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="flex items-center gap-3 bg-stone-950 border border-stone-900 rounded-xl px-4 py-2">
              <span className="font-mono text-[9px] font-extrabold text-stone-600">#{idx + 1}</span>
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
      </TabCardWrapper>

      {/* Biography Paragraph */}
      <TabCardWrapper title="Biography Paragraph">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <FormField
            label="Biography Heading Prefix"
            value={localAbout.bioPrefix || ""}
            onChange={(val) => updateAbout("bioPrefix", val)}
            placeholder="e.g. A Passionate"
          />
          <FormField
            label="Biography Sub-label Name"
            value={localAbout.bioSubLabel || ""}
            onChange={(val) => updateAbout("bioSubLabel", val)}
            placeholder="e.g. Biography"
          />
        </div>

        <FormField
          label="Detailed Biography Info text"
          type="textarea"
          value={localAbout.bio}
          onChange={(val) => updateAbout("bio", val)}
          placeholder="Write your professional biography here..."
          rows={5}
          charCount={true}
          maxLength={1000}
        />
      </TabCardWrapper>

      {/* Achievement Stats */}
      <TabCardWrapper title="Achievement Stats" subtitle="3 metric cards on About">
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
                  className="bg-stone-950 border border-stone-900 focus:border-primary outline-none text-sm font-bold rounded-lg px-3 py-1.5 text-center transition-all focus:ring-1 focus:ring-primary/20"
                  style={{ color: pickedColor }}
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateAboutStat(idx, "label", e.target.value)}
                  placeholder="e.g. Years Exp"
                  className="bg-stone-950 border border-stone-900 focus:border-primary outline-none text-[9px] font-bold rounded-lg px-3 py-1.5 text-stone-400 uppercase tracking-wider text-center transition-all focus:ring-1 focus:ring-primary/20"
                />
              </div>
            );
          })}
        </div>
      </TabCardWrapper>

      {/* Highlight Specs */}
      <TabCardWrapper title="Highlight Specs" subtitle="Key-value rows on profile card">
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
                  className="w-32 bg-transparent border-0 border-r border-stone-900 outline-none text-[10px] text-stone-400 font-bold uppercase tracking-wider pr-3"
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
      </TabCardWrapper>

      {/* Social Links — with visual icon picker */}
      <TabCardWrapper
        title="Social Links"
        subtitle="Add, reorder, and configure social profile links with visual icon selection"
      >
        <div className="flex flex-col gap-3">
          {socialLinks.map((link, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-3 bg-stone-950/60 border border-stone-900 rounded-2xl p-4"
            >
              {/* Row header */}
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-extrabold font-mono text-stone-500">LINK #{idx + 1}</span>
                <div className="flex items-center gap-1">
                  <ControlButtons
                    onMoveUp={() => moveSocialLink(idx, -1)}
                    onMoveDown={() => moveSocialLink(idx, 1)}
                    onDelete={() => removeSocialLink(idx)}
                    isFirst={idx === 0}
                    isLast={idx === socialLinks.length - 1}
                  />
                </div>
              </div>

              {/* Icon Picker + Label */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500">Platform Icon</label>
                  <IconPicker
                    value={link.icon || "FaGithub"}
                    onChange={(val) => updateAboutSocialLink(idx, "icon", val)}
                    pickedColor={pickedColor}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500">Display Label</label>
                  <input
                    type="text"
                    value={link.label || ""}
                    onChange={(e) => updateAboutSocialLink(idx, "label", e.target.value)}
                    placeholder="e.g. LinkedIn"
                    className="w-full bg-stone-950 border border-stone-900 focus:border-primary outline-none text-xs rounded-xl px-4 py-2.5 text-white font-semibold transition-all focus:ring-1 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500">Profile URL</label>
                <input
                  type="url"
                  value={link.href || ""}
                  onChange={(e) => updateAboutSocialLink(idx, "href", e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-stone-950 border border-stone-900 focus:border-primary outline-none text-xs rounded-xl px-4 py-2.5 text-stone-300 font-mono transition-all focus:ring-1 focus:ring-primary/20"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add new link */}
        <button
          type="button"
          onClick={addSocialLink}
          className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest py-2.5 px-4 rounded-xl border border-dashed border-stone-800 hover:border-primary/40 text-stone-400 hover:text-white transition-all cursor-pointer w-full justify-center mt-1"
          style={{}}
        >
          <FiPlus className="text-sm" />
          Add Social Link
        </button>
      </TabCardWrapper>
    </div>
  );
}
