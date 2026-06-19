import React, { useState } from "react";
import { FiPlusCircle, FiChevronUp, FiChevronDown, FiTrash2 } from "react-icons/fi";
import { FormField, TabCardWrapper } from "../SettingsCommon";

export default function BlogsTab({
  localBlogs = [],
  setLocalBlogs,
  pickedColor,
  renderSectionVisibilityBanner,
  localSectionTitles,
  setLocalSectionTitles
}) {
  const [activeIdx, setActiveIdx] = useState(0);

  const addBlog = () => {
    const copy = [...localBlogs];
    copy.push({
      title: "New Article Title",
      description: "Brief abstract or summary of the article contents.",
      link: "https://...",
      date: "Jun 2026",
      platform: "Medium / Dev.to"
    });
    setLocalBlogs(copy);
    setActiveIdx(copy.length - 1);
  };

  const deleteBlog = (idx) => {
    const copy = localBlogs.filter((_, i) => i !== idx);
    setLocalBlogs(copy);
    if (activeIdx >= copy.length) {
      setActiveIdx(Math.max(0, copy.length - 1));
    }
  };

  const moveBlog = (idx, direction) => {
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= localBlogs.length) return;
    const copy = [...localBlogs];
    const temp = copy[idx];
    copy[idx] = copy[newIdx];
    copy[newIdx] = temp;
    setLocalBlogs(copy);
    setActiveIdx(newIdx);
  };

  const updateField = (field, value) => {
    if (localBlogs.length === 0) return;
    const copy = [...localBlogs];
    copy[activeIdx] = { ...copy[activeIdx], [field]: value };
    setLocalBlogs(copy);
  };

  const b = localBlogs[activeIdx];

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {renderSectionVisibilityBanner("Blogs")}

      {/* Section Title */}
      <FormField
        label="Section Display Title Heading"
        value={localSectionTitles.Blogs || "My Publications & Blogs"}
        onChange={(val) => setLocalSectionTitles(prev => ({ ...prev, Blogs: val }))}
        placeholder="e.g. My Publications & Blogs"
      />

      {/* Blogs manager list */}
      <TabCardWrapper>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">
            Blogs Registry List
          </span>
          <button
            type="button"
            onClick={addBlog}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all cursor-pointer"
            style={{ color: pickedColor, backgroundColor: `${pickedColor}15` }}
          >
            <FiPlusCircle className="text-xs" /> Add Article
          </button>
        </div>

        {localBlogs.length === 0 ? (
          <div className="p-8 text-center bg-stone-950 border border-stone-900 rounded-3xl select-none">
            <span className="text-stone-500 text-xs font-bold uppercase tracking-wider">
              No articles registered. Click "Add Article" to begin.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left selector */}
            <div className="lg:col-span-4 flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1.5 scrollbar-thin select-none">
              {localBlogs.map((item, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-primary/10 border-primary text-white"
                        : "bg-stone-950 border-stone-900 text-stone-400 hover:bg-stone-900 hover:text-white"
                    }`}
                    style={isActive ? { borderColor: pickedColor, backgroundColor: `${pickedColor}15` } : {}}
                    onClick={() => setActiveIdx(idx)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{item.title || "Untitled Article"}</div>
                      <div className="text-[9px] text-stone-500 font-bold uppercase tracking-wider mt-0.5 truncate">
                        {item.platform} · {item.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveBlog(idx, -1);
                        }}
                        disabled={idx === 0}
                        className="p-1 rounded-lg border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-850 transition-colors disabled:opacity-35 cursor-pointer"
                      >
                        <FiChevronUp className="text-[10px]" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveBlog(idx, 1);
                        }}
                        disabled={idx === localBlogs.length - 1}
                        className="p-1 rounded-lg border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-850 transition-colors disabled:opacity-35 cursor-pointer"
                      >
                        <FiChevronDown className="text-[10px]" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteBlog(idx);
                        }}
                        className="p-1 rounded-lg border border-red-500/10 bg-stone-950 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all cursor-pointer"
                      >
                        <FiTrash2 className="text-[10px]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right form fields */}
            {b && (
              <div className="lg:col-span-8 bg-stone-950 border border-stone-900 p-5 rounded-3xl space-y-6">
                <div className="space-y-6 animate-fadeIn">
                  {/* Title */}
                  <FormField
                    label="Article / Blog Title"
                    value={b.title}
                    onChange={(val) => updateField("title", val)}
                    placeholder="e.g. Mastering Performance Optimization in Next.js"
                  />

                  {/* Platform, Date, and Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField
                      label="Platform (e.g. Medium / Dev.to)"
                      value={b.platform}
                      onChange={(val) => updateField("platform", val)}
                      placeholder="e.g. Dev.to"
                    />
                    <FormField
                      label="Date Published"
                      value={b.date}
                      onChange={(val) => updateField("date", val)}
                      placeholder="e.g. May 2026"
                    />
                    <FormField
                      label="Article External Link"
                      type="url"
                      value={b.link}
                      onChange={(val) => updateField("link", val)}
                      placeholder="https://..."
                    />
                  </div>

                  {/* Synopsis Description */}
                  <FormField
                    label="Article Synopsis Description"
                    type="textarea"
                    value={b.description}
                    onChange={(val) => updateField("description", val)}
                    placeholder="Provide a brief summary of what the article covers..."
                    rows={4}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </TabCardWrapper>
    </div>
  );
}
