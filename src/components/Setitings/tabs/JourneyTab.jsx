import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import { FormField, TabCardWrapper, ControlButtons } from "../SetitingsCommon";

export default function JourneyTab({
  pickedColor,
  renderSectionVisibilityBanner,
  localSectionTitles,
  setLocalSectionTitles,
  localSummaryStats,
  updateSummaryStat,
  localTimelineData,
  activeTimelineIdx,
  setActiveTimelineIdx,
  addTimelineItem,
  deleteTimelineItem,
  moveTimelineItem,
  updateActiveTimelineField
}) {
  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {renderSectionVisibilityBanner("Journey")}

      <FormField
        label="Section Display Title Heading"
        value={localSectionTitles.Journey || ""}
        onChange={(val) => setLocalSectionTitles(prev => ({ ...prev, Journey: val }))}
        placeholder="e.g. What I've done ?"
      />

      {/* Summary Statistics Counters */}
      <TabCardWrapper title="Summary Statistics Counters" subtitle="Configure counter cards that appear on the Journey section page.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {localSummaryStats.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-3 p-4 bg-stone-950 border border-stone-900 rounded-2xl relative">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-3.5 rounded-full" style={{ backgroundColor: pickedColor }} />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-300">Counter {idx + 1}</span>
              </div>
              <FormField
                label="Label"
                value={stat.label || ""}
                onChange={(val) => updateSummaryStat(idx, "label", val)}
                placeholder="e.g. Years Experience"
              />
              <FormField
                label="Value (Numeric)"
                type="number"
                value={stat.value === undefined ? "" : stat.value}
                onChange={(val) => updateSummaryStat(idx, "value", val)}
                placeholder="e.g. 5"
              />
            </div>
          ))}
        </div>
      </TabCardWrapper>

      {/* Timeline Entry Manager */}
      <TabCardWrapper title="Timeline Entry Manager">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 rounded-full" style={{ backgroundColor: pickedColor }} />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">Timeline Entries</span>
          </div>
          <button
            type="button"
            onClick={addTimelineItem}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all cursor-pointer"
            style={{ color: pickedColor, backgroundColor: `${pickedColor}15` }}
          >
            <FiPlusCircle className="text-xs" /> Add Entry
          </button>
        </div>

        {localTimelineData.length === 0 ? (
          <div className="p-8 text-center bg-stone-950 border border-stone-900 rounded-2xl select-none">
            <span className="text-stone-500 text-xs font-bold uppercase tracking-wider">No timeline entries. Click "Add Entry" to begin.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Selector List */}
            <div className="lg:col-span-4 flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1.5 scrollbar-thin select-none">
              {localTimelineData.map((item, idx) => {
                const isActive = activeTimelineIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-primary/10 border-primary text-white"
                        : "bg-stone-950 border-stone-900 text-stone-400 hover:bg-stone-900 hover:text-white"
                    }`}
                    style={isActive ? { borderColor: pickedColor, backgroundColor: `${pickedColor}15` } : {}}
                    onClick={() => setActiveTimelineIdx(idx)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{item.title || "Untitled Entry"}</div>
                      <div className="text-[9px] text-stone-500 font-bold uppercase tracking-wider mt-0.5 truncate">{item.org}</div>
                      <div className="text-[8px] text-stone-600 font-semibold mt-0.5">{item.time}</div>
                    </div>
                    <ControlButtons
                      onMoveUp={() => moveTimelineItem(idx, -1)}
                      onMoveDown={() => moveTimelineItem(idx, 1)}
                      onDelete={() => deleteTimelineItem(idx)}
                      isFirst={idx === 0}
                      isLast={idx === localTimelineData.length - 1}
                    />
                  </div>
                );
              })}
            </div>

            {/* Right Form */}
            <div className="lg:col-span-8 bg-stone-950/40 border border-stone-900/60 p-5 rounded-3xl space-y-6">
              {(() => {
                const item = localTimelineData[activeTimelineIdx];
                if (!item) return null;
                return (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        label="Timeline Title (e.g. Job Role / Degree)"
                        value={item.title || ""}
                        onChange={(val) => updateActiveTimelineField("title", val)}
                        placeholder="e.g. BE in Electronics and Communication"
                      />
                      <FormField
                        label="Organization (e.g. Company / University)"
                        value={item.org || ""}
                        onChange={(val) => updateActiveTimelineField("org", val)}
                        placeholder="e.g. Anna University"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        label="Duration Timeframe"
                        value={item.time || ""}
                        onChange={(val) => updateActiveTimelineField("time", val)}
                        placeholder="e.g. Jan 2020 - Oct 2022"
                      />
                      <FormField
                        label="Location (City, State, Country)"
                        value={item.location || ""}
                        onChange={(val) => updateActiveTimelineField("location", val)}
                        placeholder="e.g. Coimbatore, Tamil Nadu."
                      />
                    </div>

                    <FormField
                      label="Grade / Score / Percentage (Optional)"
                      value={item.percent || ""}
                      onChange={(val) => updateActiveTimelineField("percent", val)}
                      placeholder="e.g. 6.9 CGPA or 90%"
                    />
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </TabCardWrapper>
    </div>
  );
}
