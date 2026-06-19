import React, { useState } from "react";
import { FiPlusCircle, FiChevronUp, FiChevronDown, FiTrash2 } from "react-icons/fi";
import { FormField, TabCardWrapper } from "../SettingsCommon";

export default function FaqTab({
  localFaqs = [],
  setLocalFaqs,
  pickedColor,
  renderSectionVisibilityBanner,
  localSectionTitles,
  setLocalSectionTitles
}) {
  const [activeIdx, setActiveIdx] = useState(0);

  const addFaq = () => {
    const copy = [...localFaqs];
    copy.push({
      question: "New Frequently Asked Question?",
      answer: "Provide a detailed and helpful response to the question here."
    });
    setLocalFaqs(copy);
    setActiveIdx(copy.length - 1);
  };

  const deleteFaq = (idx) => {
    const copy = localFaqs.filter((_, i) => i !== idx);
    setLocalFaqs(copy);
    if (activeIdx >= copy.length) {
      setActiveIdx(Math.max(0, copy.length - 1));
    }
  };

  const moveFaq = (idx, direction) => {
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= localFaqs.length) return;
    const copy = [...localFaqs];
    const temp = copy[idx];
    copy[idx] = copy[newIdx];
    copy[newIdx] = temp;
    setLocalFaqs(copy);
    setActiveIdx(newIdx);
  };

  const updateField = (field, value) => {
    if (localFaqs.length === 0) return;
    const copy = [...localFaqs];
    copy[activeIdx] = { ...copy[activeIdx], [field]: value };
    setLocalFaqs(copy);
  };

  const f = localFaqs[activeIdx];

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {renderSectionVisibilityBanner("Faq")}

      {/* Section Title */}
      <FormField
        label="Section Display Title Heading"
        value={localSectionTitles.Faq || "Frequently Asked Questions"}
        onChange={(val) => setLocalSectionTitles(prev => ({ ...prev, Faq: val }))}
        placeholder="e.g. Frequently Asked Questions"
      />

      {/* FAQs registry wrapper */}
      <TabCardWrapper>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">
            FAQs Registry List
          </span>
          <button
            type="button"
            onClick={addFaq}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all cursor-pointer"
            style={{ color: pickedColor, backgroundColor: `${pickedColor}15` }}
          >
            <FiPlusCircle className="text-xs" /> Add Question
          </button>
        </div>

        {localFaqs.length === 0 ? (
          <div className="p-8 text-center bg-stone-950 border border-stone-900 rounded-3xl select-none">
            <span className="text-stone-500 text-xs font-bold uppercase tracking-wider">
              No questions registered. Click "Add Question" to begin.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left selector */}
            <div className="lg:col-span-4 flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1.5 scrollbar-thin select-none">
              {localFaqs.map((item, idx) => {
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
                      <div className="text-xs font-bold truncate">{item.question || "Untitled Question"}</div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveFaq(idx, -1);
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
                          moveFaq(idx, 1);
                        }}
                        disabled={idx === localFaqs.length - 1}
                        className="p-1 rounded-lg border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-850 transition-colors disabled:opacity-35 cursor-pointer"
                      >
                        <FiChevronDown className="text-[10px]" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFaq(idx);
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
            {f && (
              <div className="lg:col-span-8 bg-stone-950 border border-stone-900 p-5 rounded-3xl space-y-6">
                <div className="space-y-6 animate-fadeIn">
                  {/* Question */}
                  <FormField
                    label="Question Text"
                    value={f.question}
                    onChange={(val) => updateField("question", val)}
                    placeholder="e.g. What is your technology specialization?"
                  />

                  {/* Answer */}
                  <FormField
                    label="Answer Text"
                    type="textarea"
                    value={f.answer}
                    onChange={(val) => updateField("answer", val)}
                    placeholder="Provide a detailed and helpful response to the question..."
                    rows={6}
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
