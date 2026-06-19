import React from "react";
import { FiPlusCircle, FiChevronUp, FiChevronDown, FiTrash2 } from "react-icons/fi";
import { FormField, FileUpload, TabCardWrapper } from "../SettingsCommon";

export default function CertificationsTab({
  localCertifications,
  activeCertIdx,
  setActiveCertIdx,
  addCert,
  deleteCert,
  moveCert,
  updateActiveCertField,
  pickedColor,
  renderSectionVisibilityBanner,
  localSectionTitles,
  setLocalSectionTitles
}) {
  const c = localCertifications[activeCertIdx];

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {renderSectionVisibilityBanner("Certification")}

      {/* Section Title */}
      <FormField
        label="Section Display Title Heading"
        value={localSectionTitles.Certification}
        onChange={(val) => setLocalSectionTitles(prev => ({ ...prev, Certification: val }))}
        placeholder="e.g. What I achieved?"
      />

      {/* Certifications Manager Container */}
      <TabCardWrapper>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">
            Certifications Registry List
          </span>
          <button
            type="button"
            onClick={addCert}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all cursor-pointer"
            style={{ color: pickedColor, backgroundColor: `${pickedColor}15` }}
          >
            <FiPlusCircle className="text-xs" /> Add Certification
          </button>
        </div>

        {localCertifications.length === 0 ? (
          <div className="p-8 text-center bg-stone-950 border border-stone-900 rounded-3xl select-none">
            <span className="text-stone-500 text-xs font-bold uppercase tracking-wider">
              No certifications registered. Click "Add Certification" to begin.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left sidebar: Certs selector list */}
            <div className="lg:col-span-4 flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1.5 scrollbar-thin select-none">
              {localCertifications.map((cert, idx) => {
                const isActive = activeCertIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-primary/10 border-primary text-white"
                        : "bg-stone-950 border-stone-900 text-stone-400 hover:bg-stone-900 hover:text-white"
                    }`}
                    style={isActive ? { borderColor: pickedColor, backgroundColor: `${pickedColor}15` } : {}}
                    onClick={() => setActiveCertIdx(idx)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{cert.title || "Untitled Certification"}</div>
                      <div className="text-[9px] text-stone-500 font-bold uppercase tracking-wider mt-0.5 truncate">
                        {cert.issuer}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveCert(idx, -1);
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
                          moveCert(idx, 1);
                        }}
                        disabled={idx === localCertifications.length - 1}
                        className="p-1 rounded-lg border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-850 transition-colors disabled:opacity-35 cursor-pointer"
                      >
                        <FiChevronDown className="text-[10px]" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCert(idx);
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

            {/* Right: Selected Cert Form Fields */}
            {c && (
              <div className="lg:col-span-8 bg-stone-950 border border-stone-900 p-5 rounded-3xl space-y-6">
                <div className="space-y-6 animate-fadeIn">
                  {/* Row 1: Title & Issuer */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      label="Certification Title"
                      value={c.title}
                      onChange={(val) => updateActiveCertField("title", val)}
                      placeholder="e.g. Prompt Engineering for Everyone"
                    />
                    <FormField
                      label="Issuer (e.g. IBM / Cisco / Google / Meta / Udemy)"
                      value={c.issuer}
                      onChange={(val) => updateActiveCertField("issuer", val)}
                      placeholder="e.g. IBM"
                    />
                  </div>

                  {/* Row 2: Offered By & Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      label="Offered By"
                      value={c.offeredBy}
                      onChange={(val) => updateActiveCertField("offeredBy", val)}
                      placeholder="e.g. WatsonX"
                    />
                    <FormField
                      label="Date Issued"
                      value={c.lastUpdated}
                      onChange={(val) => updateActiveCertField("lastUpdated", val)}
                      placeholder="e.g. Feb - 2025"
                    />
                  </div>

                  {/* Textarea: Outline / Description */}
                  <FormField
                    label="Course Outline / Description"
                    type="textarea"
                    value={c.description}
                    onChange={(val) => updateActiveCertField("description", val)}
                    placeholder="Enter a brief description of the skills or course contents."
                    rows={3}
                  />

                  {/* Cover Image Uploader */}
                  <FileUpload
                    accept="image/*"
                    onUpload={(result) => {
                      updateActiveCertField("image", result);
                    }}
                    fileName={c.image ? "Badge image loaded" : ""}
                    buttonText="Certificate Image Preview"
                  />

                  {c.image && (
                    <div className="flex items-center gap-3 bg-stone-950 p-3 rounded-xl border border-stone-900">
                      <div className="relative w-16 h-10 border border-stone-800 rounded-lg overflow-hidden bg-stone-900 shrink-0">
                        <img
                          src={c.image.startsWith("data:") || c.image.startsWith("/") || c.image.startsWith("http") ? c.image : `/src/assets/certificate/${c.image}`}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => updateActiveCertField("image", "")}
                        className="text-[9px] font-bold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                      >
                        Reset to Default
                      </button>
                    </div>
                  )}

                  {/* PDF Credential Uploader */}
                  <FileUpload
                    accept="application/pdf"
                    onUpload={(result) => {
                      updateActiveCertField("pdfFile", result);
                    }}
                    fileName={c.pdfFile ? "Verification PDF loaded" : ""}
                    buttonText="Upload Credentials PDF (Optional)"
                  />

                  {c.pdfFile && (
                    <div className="flex items-center gap-3 bg-stone-950 p-3 rounded-xl border border-stone-900">
                      <span className="text-[10px] text-stone-400 font-mono">
                        Credential PDF Verification File exists
                      </span>
                      <button
                        type="button"
                        onClick={() => updateActiveCertField("pdfFile", "")}
                        className="text-[9px] font-bold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                      >
                        Delete PDF
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
