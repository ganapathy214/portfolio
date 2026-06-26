import React, { useCallback } from "react";
import { TabCardWrapper } from "../SettingsCommon";
import { FiPlus, FiTrash2, FiBriefcase } from "react-icons/fi";

export default function ExperienceTab({ localTimelineData, setLocalTimelineData }) {
  // Filter to experience items only (no percent, no school keywords)
  const expItems = (localTimelineData || []).filter(
    (item) => !item.percent && !item.title?.toLowerCase().includes("school") && !item.title?.toLowerCase().includes("certificate") && !item.title?.toLowerCase().includes("secondary") && !item.title?.toLowerCase().includes("b.e") && !item.title?.toLowerCase().includes("be in")
  );

  const updateItem = useCallback((idx, field, value) => {
    const globalIdx = (localTimelineData || []).findIndex((item, i) => {
      const isExp = !item.percent && !item.title?.toLowerCase().includes("school") && !item.title?.toLowerCase().includes("certificate") && !item.title?.toLowerCase().includes("secondary") && !item.title?.toLowerCase().includes("b.e") && !item.title?.toLowerCase().includes("be in");
      let count = -1;
      for (let j = 0; j <= i; j++) {
        const t = localTimelineData[j];
        const isE = !t.percent && !t.title?.toLowerCase().includes("school") && !t.title?.toLowerCase().includes("certificate") && !t.title?.toLowerCase().includes("secondary") && !t.title?.toLowerCase().includes("b.e") && !t.title?.toLowerCase().includes("be in");
        if (isE) count++;
      }
      return count === idx;
    });
    if (globalIdx === -1) return;
    setLocalTimelineData((prev) => {
      const next = [...prev];
      next[globalIdx] = { ...next[globalIdx], [field]: value };
      return next;
    });
  }, [localTimelineData, setLocalTimelineData]);

  const addItem = useCallback(() => {
    setLocalTimelineData((prev) => [
      { time: "2024 - Present", title: "Job Title", org: "Company Name", location: "City, Country" },
      ...(prev || []),
    ]);
  }, [setLocalTimelineData]);

  const removeItem = useCallback((idx) => {
    const globalIdx = (() => {
      let count = -1;
      for (let i = 0; i < (localTimelineData || []).length; i++) {
        const t = localTimelineData[i];
        const isExp = !t.percent && !t.title?.toLowerCase().includes("school") && !t.title?.toLowerCase().includes("certificate") && !t.title?.toLowerCase().includes("secondary") && !t.title?.toLowerCase().includes("b.e") && !t.title?.toLowerCase().includes("be in");
        if (isExp) { count++; if (count === idx) return i; }
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
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Experience Entries</h3>
            <p className="text-[9px] text-stone-500 font-semibold mt-0.5">Your professional work history</p>
          </div>
          <button
            onClick={addItem}
            className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-3 py-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all cursor-pointer"
          >
            <FiPlus className="w-3.5 h-3.5" /> Add Entry
          </button>
        </div>

        <div className="space-y-4">
          {expItems.length === 0 && (
            <div className="text-center py-8 text-stone-500 text-xs">
              <FiBriefcase className="w-8 h-8 mx-auto mb-2 opacity-30" />
              No experience entries yet. Click Add Entry to get started.
            </div>
          )}
          {expItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-stone-850 bg-stone-900/40 space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-primary flex items-center gap-1.5">
                  <FiBriefcase className="w-3 h-3" /> Entry {idx + 1}
                </span>
                <button
                  onClick={() => removeItem(idx)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-stone-600 transition-all cursor-pointer"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[8.5px] font-bold uppercase tracking-wider text-stone-500 block mb-1">Job Title</label>
                  <input
                    type="text"
                    value={item.title || ""}
                    onChange={(e) => updateItem(idx, "title", e.target.value)}
                    placeholder="Senior Frontend Developer"
                    className="w-full bg-stone-950 border border-stone-850 rounded-lg px-3 py-2 text-xs text-white font-semibold outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[8.5px] font-bold uppercase tracking-wider text-stone-500 block mb-1">Company / Org</label>
                  <input
                    type="text"
                    value={item.org || ""}
                    onChange={(e) => updateItem(idx, "org", e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full bg-stone-950 border border-stone-850 rounded-lg px-3 py-2 text-xs text-white font-semibold outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[8.5px] font-bold uppercase tracking-wider text-stone-500 block mb-1">Duration</label>
                  <input
                    type="text"
                    value={item.time || ""}
                    onChange={(e) => updateItem(idx, "time", e.target.value)}
                    placeholder="Jan 2020 - Present"
                    className="w-full bg-stone-950 border border-stone-850 rounded-lg px-3 py-2 text-xs text-white font-semibold outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[8.5px] font-bold uppercase tracking-wider text-stone-500 block mb-1">Location</label>
                  <input
                    type="text"
                    value={item.location || ""}
                    onChange={(e) => updateItem(idx, "location", e.target.value)}
                    placeholder="City, Country"
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
