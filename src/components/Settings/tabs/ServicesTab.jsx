import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import { FormField, TabCardWrapper, ControlButtons } from "../SettingsCommon";

export default function ServicesTab({
  localServicesSubtitle,
  setLocalServicesSubtitle,
  localServicesData,
  updateService,
  addService,
  deleteService,
  moveService,
  pickedColor,
  renderSectionVisibilityBanner,
  localSectionTitles,
  setLocalSectionTitles
}) {
  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {renderSectionVisibilityBanner("Services")}

      {/* Section Title */}
      <FormField
        label="Section Display Title Heading"
        value={localSectionTitles.Services}
        onChange={(val) => setLocalSectionTitles(prev => ({ ...prev, Services: val }))}
        placeholder="e.g. What I Offer ?"
      />

      {/* Services Section Subtitle */}
      <TabCardWrapper title="Services Section Subtitle">
        <FormField
          label="Introductory Subtitle Tagline"
          type="textarea"
          value={localServicesSubtitle}
          onChange={(val) => setLocalServicesSubtitle(val.slice(0, 280))}
          placeholder="Input the introductory tagline for your services section."
          maxLength={280}
          charCount={true}
          rows={3}
        />
      </TabCardWrapper>

      {/* Service Cards Manager */}
      <TabCardWrapper>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">
            Service Cards List
          </span>
          <button
            type="button"
            onClick={addService}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all cursor-pointer"
            style={{ color: pickedColor, backgroundColor: `${pickedColor}15` }}
          >
            <FiPlusCircle className="text-xs" /> Add Card
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {localServicesData.map((service, idx) => (
            <div
              key={idx}
              className="p-4 bg-stone-950 border border-stone-900 rounded-2xl flex flex-col gap-3 relative group transition-all duration-300 hover:border-stone-800"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-extrabold font-mono text-stone-500">
                  SERVICE SLOT #{idx + 1}
                </span>
                <ControlButtons
                  onMoveUp={idx > 0 ? () => moveService(idx, -1) : null}
                  onMoveDown={idx < localServicesData.length - 1 ? () => moveService(idx, 1) : null}
                  onDelete={() => deleteService(idx)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-8 flex flex-col gap-2">
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => updateService(idx, "title", e.target.value)}
                    placeholder="Service Title"
                    className="w-full bg-stone-950 border border-stone-900 focus:border-primary outline-none text-xs rounded-xl px-4 py-2.5 text-white font-semibold transition-all focus:ring-1 focus:ring-primary/20"
                  />
                  <textarea
                    value={service.description}
                    onChange={(e) => updateService(idx, "description", e.target.value)}
                    placeholder="Service Description"
                    rows={2}
                    className="w-full bg-stone-950 border border-stone-900 focus:border-primary outline-none text-xs rounded-xl px-4 py-3 text-stone-300 resize-none font-medium transition-all focus:ring-1 focus:ring-primary/20"
                  />
                </div>
                <div className="md:col-span-4 flex flex-col gap-1.5 text-left">
                  <label className="text-[8px] font-bold uppercase tracking-wider text-stone-500">
                    Service Icon Preset
                  </label>
                  <select
                    value={service.icon}
                    onChange={(e) => updateService(idx, "icon", e.target.value)}
                    className="w-full bg-stone-950 border border-stone-900 focus:border-primary outline-none text-xs rounded-xl px-4 py-2.5 text-white font-bold cursor-pointer transition-all focus:ring-1 focus:ring-primary/20"
                  >
                    <option value="code">Code (Terminal)</option>
                    <option value="database">Database (SQL/Server)</option>
                    <option value="cloud">Cloud (Deployment)</option>
                    <option value="design">Design (UI/UX)</option>
                    <option value="seo">SEO / Test (Automation)</option>
                    <option value="mobile">Mobile (Devices)</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </TabCardWrapper>
    </div>
  );
}
