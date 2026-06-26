import React, { useCallback } from "react";
import { TabCardWrapper } from "../SettingsCommon";
import { FiPlus, FiTrash2, FiAward } from "react-icons/fi";

// Education items are identified by: has percent field OR contains academic keywords
const isEduItem = (item) =>
  item.percent ||
  item.title?.toLowerCase().includes("school") ||
  item.title?.toLowerCase().includes("certificate") ||
  item.title?.toLowerCase().includes("secondary") ||
  item.title?.toLowerCase().includes("b.e") ||
  item.title?.toLowerCase().includes("be in") ||
  item.title?.toLowerCase().includes("bachelor") ||
  item.title?.toLowerCase().includes("master") ||
  item.title?.toLowerCase().includes("diploma");

export default function EducationTab({ localTimelineData, setLocalTimelineData }) {
  const eduItems = (localTimelineData || []).filter(isEduItem);

  const getGlobalIdx = (eduIdx) => {
    let count = -1;
    for (let i = 0; i < (localTimelineData || []).length; i++) {
      if (isEduItem(localTimelineData[i])) {
        count++;
        if (count === eduIdx) return i;
      }
    }
    return -1;
  };

  const updateItem = useCallback((idx, field, value) => {
    const globalIdx = (() => {
      let count = -1;
      for (let i = 0; i < (localTimelineData || []).length; i++) {
        if (isEduItem(localTimelineData[i])) {
          count++;
          if (count === idx) return i;
        }
      }
      return -1;
    })();
    if (globalIdx === -1) return;
    setLocalTimelineData((prev) => {
      const next = [...prev];
      next[globalIdx] = { ...next[globalIdx], [field]: value };
      return next;
    });
  }, [localTimelineData, setLocalTimelineData]);

  const addItem = useCallback(() => {
    setLocalTimelineData((prev) => [
      ...(prev || []),
      { time: "2015 - 2019", title: "Bachelor of Engineering", org: "University Name", location: "City, Country", percent: "8.0 CGPA" },
    ]);
  }, [setLocalTimelineData]);

  const removeItem = useCallback((idx) => {
    const globalIdx = (() => {
      let count = -1;
      for (let i = 0; i < (localTimelineData || []).length; i++) {
        if (isEduItem(localTimelineData[i])) {
          count++;
          if (count === idx) return i;
        }
      }
      return -1;
    })();
    if (globalIdx === -1) return;
    setLocalTimelineData((prev) => prev.filter((_, i) => i !== globalIdx));
  }, [localTimelineData, setLocalTimelineData]);

  return (
    <div className="space-y-4 animate-fadeIn text-left">
      <TabCardWrapper>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Education Entries</h3>
            <p className="text-[9px] text-stone-500 font-semibold mt-0.5">Your academic background and qualifications</p>
          </div>
          <button
            onClick={addItem}
            className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-3 py-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all cursor-pointer"
          >
            <FiPlus className="w-3.5 h-3.5" /> Add Entry
          </button>
        </div>

        <div className="space-y-4">
          {eduItems.length === 0 && (
            <div className="text-center py-8 text-stone-500 text-xs">
              <FiAward className="w-8 h-8 mx-auto mb-2 opacity-30" />
              No education entries yet. Click Add Entry to get started.
            </div>
          )}
          {eduItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-stone-850 bg-stone-900/40 space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-primary flex items-center gap-1.5">
                  <FiAward className="w-3 h-3" /> Entry {idx + 1}
                </span>
                <button
                  onClick={() => removeItem(idx)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-stone-600 transition-all cursor-pointer"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[8.5px] font-bold uppercase tracking-wider text-stone-500 block mb-1">Degree / Qualification</label>
                  <input
                    type="text"
                    value={item.title || ""}
                    onChange={(e) => updateItem(idx, "title", e.target.value)}
                    placeholder="B.E in Computer Science"
                    className="w-full bg-stone-950 border border-stone-850 rounded-lg px-3 py-2 text-xs text-white font-semibold outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[8.5px] font-bold uppercase tracking-wider text-stone-500 block mb-1">Institution</label>
                  <input
                    type="text"
                    value={item.org || ""}
                    onChange={(e) => updateItem(idx, "org", e.target.value)}
                    placeholder="University Name"
                    className="w-full bg-stone-950 border border-stone-850 rounded-lg px-3 py-2 text-xs text-white font-semibold outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[8.5px] font-bold uppercase tracking-wider text-stone-500 block mb-1">Year / Duration</label>
                  <input
                    type="text"
                    value={item.time || ""}
                    onChange={(e) => updateItem(idx, "time", e.target.value)}
                    placeholder="2015 - 2019"
                    className="w-full bg-stone-950 border border-stone-850 rounded-lg px-3 py-2 text-xs text-white font-semibold outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[8.5px] font-bold uppercase tracking-wider text-stone-500 block mb-1">Location</label>
                  <input
                    type="text"
                    value={item.location || ""}
                    onChange={(e) => updateItem(idx, "location", e.target.value)}
                    placeholder="City, State"
                    className="w-full bg-stone-950 border border-stone-850 rounded-lg px-3 py-2 text-xs text-white font-semibold outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[8.5px] font-bold uppercase tracking-wider text-stone-500 block mb-1">Score / Grade</label>
                  <input
                    type="text"
                    value={item.percent || ""}
                    onChange={(e) => updateItem(idx, "percent", e.target.value)}
                    placeholder="8.5 CGPA / 85%"
                    className="w-full bg-stone-950 border border-stone-850 rounded-lg px-3 py-2 text-xs text-white font-semibold outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </TabCardWrapper>
    </div>
  );
}
