import React from "react";
import { FiCompass } from "react-icons/fi";
import { FormField } from "../SettingsCommon";

export default function SeoTab({
  pickedColor,
  tabs,
  localPageTitles,
  setLocalPageTitles,
  localPageDescriptions,
  setLocalPageDescriptions
}) {
  return (
    <div className="space-y-8 animate-fadeIn text-left">
      <div className="flex items-start gap-2.5 text-stone-500 leading-normal mb-1">
        <FiCompass className="text-xs mt-0.5 shrink-0" style={{ color: pickedColor }} />
        <span className="text-[9.5px] font-semibold">
          Configure custom browser page titles and meta descriptions for each section to make your site 100% search-engine optimized.
        </span>
      </div>

      <div className="space-y-6">
        {tabs.filter(t => t.id !== "theme" && t.id !== "seo" && t.id !== "dashboard").map((tab) => {
          const sectionName = tab.id.charAt(0).toUpperCase() + tab.id.slice(1);
          // Custom mapping for naming differences like journey -> Journey and certifications -> Certification
          let displayName = sectionName;
          if (tab.id === "certifications") displayName = "Certification";
          
          return (
            <div
              key={tab.id}
              className="p-5 bg-stone-950 border border-stone-900 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:border-stone-800"
            >
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 rounded-full" style={{ backgroundColor: pickedColor }} />
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">
                  {displayName} Section SEO
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Browser Tab Title"
                  value={localPageTitles[displayName] || ""}
                  onChange={(val) => {
                    setLocalPageTitles((prev) => ({
                      ...prev,
                      [displayName]: val,
                    }));
                  }}
                  placeholder={`Title for ${displayName}`}
                />

                <FormField
                  label="Meta Description Tag"
                  type="textarea"
                  value={localPageDescriptions[displayName] || ""}
                  onChange={(val) => {
                    setLocalPageDescriptions((prev) => ({
                      ...prev,
                      [displayName]: val,
                    }));
                  }}
                  placeholder={`Meta description for ${displayName}`}
                  rows={2}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
