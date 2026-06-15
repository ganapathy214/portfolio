import React from "react";
import { FormField, FileUpload, TabCardWrapper } from "../AdminCommon";

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
            onUpload={(result) => {
              updateAbout("avatarUrl", result);
            }}
            fileName={localAbout.avatarUrl ? "Custom portrait uploaded" : ""}
            buttonText="Profile Image (Avatar)"
            colSpan="col-span-1 sm:col-span-2"
          />

          {localAbout.avatarUrl && (
            <div className="flex items-center gap-3 bg-stone-900/20 p-3 rounded-xl col-span-1 sm:col-span-2 border border-stone-900">
              <div className="relative w-10 h-10 border border-stone-800 rounded-full overflow-hidden bg-stone-900 shrink-0">
                <img
                  src={localAbout.avatarUrl}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
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
                  className="bg-stone-900/50 border border-stone-850 focus:border-primary outline-none text-sm font-black rounded-lg px-3 py-1.5 text-center transition-all focus:ring-1 focus:ring-primary/20"
                  style={{ color: pickedColor }}
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateAboutStat(idx, "label", e.target.value)}
                  placeholder="e.g. Years Exp"
                  className="bg-stone-900/50 border border-stone-850 focus:border-primary outline-none text-[9px] font-bold rounded-lg px-3 py-1.5 text-stone-400 uppercase tracking-wider text-center transition-all focus:ring-1 focus:ring-primary/20"
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

      {/* Social Links */}
      <TabCardWrapper title="Social Links">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {(localAbout.socialLinks || []).map((link, idx) => (
            <div key={idx} className="flex flex-col gap-2 bg-stone-950 border border-stone-900 rounded-2xl p-3">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-extrabold font-mono text-stone-500">LINK #{idx + 1}</span>
                <select
                  value={link.icon || "FaLinkedinIn"}
                  onChange={(e) => updateAboutSocialLink(idx, "icon", e.target.value)}
                  className="bg-stone-900 border border-stone-850 outline-none text-[9px] rounded-lg px-2 py-1 text-stone-300 cursor-pointer font-bold transition-all focus:border-primary"
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
                className="bg-stone-900/50 border border-stone-850 focus:border-primary outline-none text-xs rounded-lg px-3 py-2 text-white font-semibold transition-all focus:ring-1 focus:ring-primary/20"
              />
              <input
                type="url"
                value={link.href || ""}
                onChange={(e) => updateAboutSocialLink(idx, "href", e.target.value)}
                placeholder="https://..."
                className="bg-stone-900/50 border border-stone-850 focus:border-primary outline-none text-xs rounded-lg px-3 py-2 text-stone-300 font-mono transition-all focus:ring-1 focus:ring-primary/20"
              />
            </div>
          ))}
        </div>
      </TabCardWrapper>
    </div>
  );
}
