import React from "react";
import { FiPlusCircle, FiTrash2, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { FormField, TabCardWrapper } from "../AdminCommon";

export default function SkillsTab({
  localSkills,
  localSkillCategories,
  activeSkillCategoryTab,
  setActiveSkillCategoryTab,
  newSkillCategoryName,
  setNewSkillCategoryName,
  newSkillName,
  setNewSkillName,
  newSkillIcon,
  setNewSkillIcon,
  addSkillCategory,
  deleteSkillCategory,
  renameSkillCategory,
  updateCategoryBullet,
  addCategoryBullet,
  deleteCategoryBullet,
  moveCategoryBullet,
  toggleSkillInCategory,
  addCustomSkill,
  deleteCustomSkill,
  pickedColor,
  renderSectionVisibilityBanner,
  localSectionTitles,
  setLocalSectionTitles
}) {
  const currentCat = localSkillCategories.find(c => c.id === activeSkillCategoryTab);

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {renderSectionVisibilityBanner("Skills")}

      {/* Section Title */}
      <FormField
        label="Section Display Title Heading"
        value={localSectionTitles.Skills}
        onChange={(val) => setLocalSectionTitles(prev => ({ ...prev, Skills: val }))}
        placeholder="e.g. What I Know ?"
      />

      {/* Skills Categories Manager */}
      <TabCardWrapper title="Skills Categories Manager">
        {/* Category Tabs Pills */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-stone-900 select-none">
          {localSkillCategories.map((cat) => {
            const isActive = activeSkillCategoryTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveSkillCategoryTab(cat.id)}
                className={`px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? "text-[var(--primary-contrast)] bg-primary border-transparent"
                    : "text-stone-400 bg-transparent border-stone-800 hover:text-white"
                }`}
                style={isActive ? { backgroundColor: pickedColor, boxShadow: `0 2px 10px rgba(var(--primary-rgb), 0.2)` } : {}}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Active Category Editor Section */}
        {activeSkillCategoryTab && currentCat ? (
          <div className="space-y-6 bg-stone-950/40 p-5 border border-stone-900/60 rounded-3xl animate-fadeIn">
            {/* Rename & Delete Category row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-[8px] font-bold uppercase tracking-wider text-stone-500">Category Name</label>
                <input
                  type="text"
                  value={currentCat.label}
                  onChange={(e) => renameSkillCategory(currentCat.id, e.target.value)}
                  placeholder="Category Name"
                  className="bg-stone-900 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-4 py-2 text-white font-semibold max-w-sm transition-all"
                />
              </div>
              <button
                type="button"
                onClick={() => deleteSkillCategory(currentCat.id)}
                className="flex items-center justify-center gap-1.5 self-end py-2 px-4 rounded-xl border border-red-900/30 bg-red-950/10 text-red-400 hover:bg-red-900/30 hover:text-red-300 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <FiTrash2 className="text-xs" /> Delete Category
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-stone-900/50" />

            {/* Category Key Expertise Bullets */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-white">Bullet Point Highlights</span>
                <button
                  type="button"
                  onClick={() => addCategoryBullet(currentCat.id)}
                  className="flex items-center gap-1 text-[8.5px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 transition-colors cursor-pointer border border-stone-800"
                >
                  <FiPlusCircle className="text-xs" /> Add Bullet
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {(currentCat.bullets || []).map((bullet, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-stone-950 border border-stone-900 rounded-xl px-3 py-2">
                    <span className="font-mono text-[8px] font-extrabold text-stone-600">#{idx + 1}</span>
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => updateCategoryBullet(currentCat.id, idx, e.target.value)}
                      placeholder="Bullet text (HTML supported, e.g. <strong class='text-primary'>...</strong>)"
                      className="flex-1 bg-transparent border-0 outline-none text-xs text-stone-300 font-medium"
                    />
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveCategoryBullet(currentCat.id, idx, -1)}
                        disabled={idx === 0}
                        className="p-0.5 rounded bg-stone-900 text-stone-500 hover:text-white disabled:opacity-30 cursor-pointer"
                      >
                        <FiChevronUp className="text-[10px]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveCategoryBullet(currentCat.id, idx, 1)}
                        disabled={idx === currentCat.bullets.length - 1}
                        className="p-0.5 rounded bg-stone-900 text-stone-500 hover:text-white disabled:opacity-30 cursor-pointer"
                      >
                        <FiChevronDown className="text-[10px]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCategoryBullet(currentCat.id, idx)}
                        className="p-0.5 rounded text-red-500 hover:bg-red-900/20 cursor-pointer ml-0.5"
                      >
                        <FiTrash2 className="text-[10px]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-stone-900/50" />

            {/* Category Skills Assignment Checkboxes */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-white">Assigned Skills Selection</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-[180px] overflow-y-auto pr-1.5 scrollbar-thin">
                {localSkills.map((skill) => {
                  const isAssigned = (currentCat.skillNames || []).includes(skill.name);
                  return (
                    <label
                      key={skill.name}
                      className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer select-none transition-all duration-200 ${
                        isAssigned
                          ? "bg-primary/5 border-primary/20 text-white font-semibold"
                          : "bg-stone-950 border-stone-900 text-stone-500"
                      }`}
                      style={isAssigned ? { borderColor: `${pickedColor}25`, backgroundColor: `${pickedColor}05` } : {}}
                    >
                      <input
                        type="checkbox"
                        checked={isAssigned}
                        onChange={() => toggleSkillInCategory(currentCat.id, skill.name)}
                        className="accent-primary w-3.5 h-3.5 rounded border-stone-800"
                        style={{ accentColor: pickedColor }}
                      />
                      <span className="text-[10px]">{skill.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center bg-stone-950/40 border border-stone-900/60 rounded-3xl select-none">
            <span className="text-stone-500 text-xs font-bold uppercase tracking-wider">Create a category to begin.</span>
          </div>
        )}

        {/* Add Category Section */}
        <div className="flex items-center gap-2 bg-stone-950/30 p-4 border border-stone-900 rounded-2xl max-w-md">
          <input
            type="text"
            value={newSkillCategoryName}
            onChange={(e) => setNewSkillCategoryName(e.target.value)}
            placeholder="Create New Category..."
            className="flex-1 bg-stone-900 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-4 py-2.5 text-white font-semibold transition-all focus:ring-1 focus:ring-primary/20"
          />
          <button
            type="button"
            onClick={addSkillCategory}
            className="py-2.5 px-4 rounded-xl text-[var(--primary-contrast)] text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-transform active:scale-95 shrink-0"
            style={{ backgroundColor: pickedColor }}
          >
            Add Category
          </button>
        </div>
      </TabCardWrapper>

      {/* Global Skills Registry */}
      <TabCardWrapper title="Global Skills Registry">
        {/* Skill Cards grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {localSkills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center justify-between gap-1 p-2 bg-stone-950 border border-stone-900 rounded-2xl relative group hover:border-stone-800 transition-colors min-h-[72px]"
            >
              <button
                type="button"
                onClick={() => deleteCustomSkill(skill.name)}
                className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-red-950/20 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-red-500/10 hover:bg-red-900/50"
              >
                <FiTrash2 className="text-[9px]" />
              </button>
              <span className="text-[9px] font-bold text-white text-center mt-2.5 line-clamp-1">{skill.name}</span>
              <span className="text-[7.5px] font-mono text-stone-600 mb-1">
                {skill.icon && skill.icon.startsWith("data:") ? "custom upload" : "static library"}
              </span>
            </div>
          ))}
        </div>

        {/* Add Custom Skill Form */}
        <div className="bg-stone-950 border border-stone-900 rounded-2xl p-4 flex flex-col gap-3 max-w-md">
          <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-stone-400">Register Custom Skill & Icon</span>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Skill Name (e.g. Docker)"
              className="w-full bg-stone-900 border border-stone-850 focus:border-primary outline-none text-xs rounded-xl px-3.5 py-2 text-white font-semibold transition-all focus:ring-1 focus:ring-primary/20"
            />
            <div className="flex flex-col sm:flex-row items-center gap-2 bg-stone-900/50 border border-stone-800 rounded-xl p-2 w-full justify-between">
              <input
                type="file"
                accept="image/svg+xml,image/png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setNewSkillIcon(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="text-[10px] text-stone-400 file:mr-2.5 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[8.5px] file:font-bold file:uppercase file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer"
              />
              {newSkillIcon && (
                <span className="text-[8px] text-green-400 font-mono tracking-wider">
                  ✓ Image loaded
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={addCustomSkill}
              className="w-full py-2.5 rounded-xl text-black text-[10px] font-bold uppercase tracking-wider cursor-pointer mt-1 active:scale-95 transition-transform"
              style={{ backgroundColor: pickedColor }}
            >
              Register Skill
            </button>
          </div>
        </div>
      </TabCardWrapper>
    </div>
  );
}
