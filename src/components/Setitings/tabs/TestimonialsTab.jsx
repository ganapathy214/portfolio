import React, { useState } from "react";
import { FiPlusCircle, FiChevronUp, FiChevronDown, FiTrash2 } from "react-icons/fi";
import { FormField, FileUpload, TabCardWrapper } from "../SetitingsCommon";

export default function TestimonialsTab({
  localTestimonials = [],
  setLocalTestimonials,
  pickedColor,
  renderSectionVisibilityBanner,
  localSectionTitles,
  setLocalSectionTitles
}) {
  const [activeIdx, setActiveIdx] = useState(0);

  const addTestimonial = () => {
    const copy = [...localTestimonials];
    copy.push({
      name: "New Client Name",
      role: "Client Job Title",
      company: "Company Name",
      text: "Write the client's testimonial feedback here...",
      avatar: ""
    });
    setLocalTestimonials(copy);
    setActiveIdx(copy.length - 1);
  };

  const deleteTestimonial = (idx) => {
    const copy = localTestimonials.filter((_, i) => i !== idx);
    setLocalTestimonials(copy);
    if (activeIdx >= copy.length) {
      setActiveIdx(Math.max(0, copy.length - 1));
    }
  };

  const moveTestimonial = (idx, direction) => {
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= localTestimonials.length) return;
    const copy = [...localTestimonials];
    const temp = copy[idx];
    copy[idx] = copy[newIdx];
    copy[newIdx] = temp;
    setLocalTestimonials(copy);
    setActiveIdx(newIdx);
  };

  const updateField = (field, value) => {
    if (localTestimonials.length === 0) return;
    const copy = [...localTestimonials];
    copy[activeIdx] = { ...copy[activeIdx], [field]: value };
    setLocalTestimonials(copy);
  };

  const t = localTestimonials[activeIdx];

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {renderSectionVisibilityBanner("Testimonials")}

      {/* Section Title */}
      <FormField
        label="Section Display Title Heading"
        value={localSectionTitles.Testimonials || "What clients say?"}
        onChange={(val) => setLocalSectionTitles(prev => ({ ...prev, Testimonials: val }))}
        placeholder="e.g. What clients say?"
      />

      {/* Testimonials registry wrapper */}
      <TabCardWrapper>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">
            Testimonials Registry List
          </span>
          <button
            type="button"
            onClick={addTestimonial}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all cursor-pointer"
            style={{ color: pickedColor, backgroundColor: `${pickedColor}15` }}
          >
            <FiPlusCircle className="text-xs" /> Add Testimonial
          </button>
        </div>

        {localTestimonials.length === 0 ? (
          <div className="p-8 text-center bg-stone-950/40 border border-stone-900 rounded-3xl select-none">
            <span className="text-stone-500 text-xs font-bold uppercase tracking-wider">
              No testimonials registered. Click "Add Testimonial" to begin.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left selector */}
            <div className="lg:col-span-4 flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1.5 scrollbar-thin select-none">
              {localTestimonials.map((item, idx) => {
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
                      <div className="text-xs font-bold truncate">{item.name || "Untitled Client"}</div>
                      <div className="text-[9px] text-stone-500 font-bold uppercase tracking-wider mt-0.5 truncate">
                        {item.role} {item.company ? `at ${item.company}` : ""}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveTestimonial(idx, -1);
                        }}
                        disabled={idx === 0}
                        className="p-1 rounded bg-stone-900/50 text-stone-450 hover:text-white disabled:opacity-35 cursor-pointer"
                      >
                        <FiChevronUp className="text-[10px]" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveTestimonial(idx, 1);
                        }}
                        disabled={idx === localTestimonials.length - 1}
                        className="p-1 rounded bg-stone-900/50 text-stone-450 hover:text-white disabled:opacity-35 cursor-pointer"
                      >
                        <FiChevronDown className="text-[10px]" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTestimonial(idx);
                        }}
                        className="p-1 rounded bg-red-950/40 text-red-400 hover:bg-red-900/50 hover:text-red-300 transition-colors cursor-pointer"
                      >
                        <FiTrash2 className="text-[10px]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right form fields */}
            {t && (
              <div className="lg:col-span-8 bg-stone-950/40 border border-stone-900/60 p-5 rounded-3xl space-y-6">
                <div className="space-y-6 animate-fadeIn">
                  {/* Name, Role & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField
                      label="Client Name"
                      value={t.name}
                      onChange={(val) => updateField("name", val)}
                      placeholder="e.g. Sarah Jenkins"
                    />
                    <FormField
                      label="Client Designation / Role"
                      value={t.role}
                      onChange={(val) => updateField("role", val)}
                      placeholder="e.g. Director of Engineering"
                    />
                    <FormField
                      label="Company Name"
                      value={t.company}
                      onChange={(val) => updateField("company", val)}
                      placeholder="e.g. HealthTech Solutions"
                    />
                  </div>

                  {/* Feedback text */}
                  <FormField
                    label="Testimonial Feedback / Review Text"
                    type="textarea"
                    value={t.text}
                    onChange={(val) => updateField("text", val)}
                    placeholder="Write the recommendation here..."
                    rows={4}
                  />

                  {/* Avatar Upload */}
                  <FileUpload
                    accept="image/*"
                    onUpload={(result) => {
                      updateField("avatar", result);
                    }}
                    fileName={t.avatar ? "Custom client portrait loaded" : ""}
                    buttonText="Client Photo / Avatar (Optional)"
                  />

                  {t.avatar && (
                    <div className="flex items-center gap-3 bg-stone-900/20 p-3 rounded-xl border border-stone-900">
                      <div className="relative w-10 h-10 border border-stone-800 rounded-full overflow-hidden bg-stone-900 shrink-0">
                        <img
                          src={t.avatar}
                          alt="Avatar Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => updateField("avatar", "")}
                        className="text-[9px] font-bold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                      >
                        Reset / Clear Photo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </TabCardWrapper>
    </div>
  );
}
