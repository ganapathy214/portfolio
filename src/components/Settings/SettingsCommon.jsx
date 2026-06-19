import React from "react";
import { FiChevronUp, FiChevronDown, FiTrash2, FiUploadCloud } from "react-icons/fi";

// A reusable Form Field container that automatically handles labeling, spacing, character counts, and types.
export const FormField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  maxLength,
  rows = 3,
  colSpan = "col-span-1",
  options = [],
  disabled = false,
  charCount = false,
  className = ""
}) => {
  const isTextarea = type === "textarea";
  const isSelect = type === "select";

  const renderInput = () => {
    const commonProps = {
      value: value || "",
      onChange: (e) => onChange(e.target.value),
      placeholder,
      maxLength,
      disabled,
      className: "w-full bg-stone-950 border border-stone-900 focus:border-primary outline-none text-xs rounded-xl px-4 py-2.5 text-white font-semibold transition-all focus:ring-1 focus:ring-primary/20",
    };

    if (isTextarea) {
      return (
        <textarea
          {...commonProps}
          rows={rows}
          className={`${commonProps.className} resize-none py-3 leading-relaxed`}
        />
      );
    }

    if (isSelect) {
      return (
        <select
          {...commonProps}
          className={`${commonProps.className} py-2.5 pr-8 appearance-none cursor-pointer`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        {...commonProps}
      />
    );
  };

  return (
    <div className={`flex flex-col gap-1.5 ${colSpan} ${className}`}>
      <div className="flex items-center justify-between">
        {label && (
          <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500 block">
            {label}
          </label>
        )}
        {charCount && maxLength && (
          <span className="text-[8px] font-mono font-bold text-stone-600">
            {String(value || "").length} / {maxLength}
          </span>
        )}
      </div>
      <div className="relative">
        {renderInput()}
      </div>
    </div>
  );
};

// Reusable custom file upload component supporting Base64 serialization
export const FileUpload = ({
  accept,
  onUpload,
  fileName,
  buttonText = "Upload File",
  icon: Icon = FiUploadCloud,
  colSpan = "col-span-1"
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (accept === "application/pdf" && file.type !== "application/pdf") {
        alert("Please upload a PDF file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        onUpload(reader.result, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 ${colSpan}`}>
      <label className="text-[9px] font-bold uppercase tracking-wider text-stone-500">
        {buttonText}
      </label>
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-stone-950 border border-stone-900 rounded-xl p-3 w-full">
        <label className="flex items-center gap-2 py-1.5 px-3 rounded-xl border-0 text-[10px] font-bold uppercase bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer transition-colors shrink-0">
          <Icon className="text-xs" />
          <span>Choose File</span>
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {fileName ? (
          <span className="text-[10px] text-stone-400 font-mono truncate max-w-xs sm:max-w-md">
            Current: {fileName}
          </span>
        ) : (
          <span className="text-[10px] text-stone-600 font-mono italic">
            No file uploaded
          </span>
        )}
      </div>
    </div>
  );
};

// Layout card container for settings sections
export const TabCardWrapper = ({ title, subtitle, children, className = "" }) => {
  return (
    <div className={`p-5 bg-stone-950 border border-stone-900 rounded-3xl flex flex-col gap-4 ${className}`}>
      {(title || subtitle) && (
        <div className="text-left flex flex-col gap-1">
          {title && (
            <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider block">
              {title}
            </span>
          )}
          {subtitle && (
            <span className="text-[9px] text-stone-500 font-semibold uppercase block leading-tight">
              {subtitle}
            </span>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

// Item control controls: moves elements up, down, or deletes them.
export const ControlButtons = ({
  onMoveUp,
  onMoveDown,
  onDelete,
  isFirst = false,
  isLast = false
}) => {
  return (
    <div className="flex items-center gap-1 shrink-0">
      {onMoveUp && (
        <button
          type="button"
          onClick={onMoveUp}
          disabled={isFirst}
          className="p-1.5 rounded-lg border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-800 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          <FiChevronUp className="text-xs" />
        </button>
      )}
      {onMoveDown && (
        <button
          type="button"
          onClick={onMoveDown}
          disabled={isLast}
          className="p-1.5 rounded-lg border border-stone-900 bg-stone-950 text-stone-400 hover:text-white hover:border-stone-800 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          <FiChevronDown className="text-xs" />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="p-1.5 rounded-lg border border-red-500/10 bg-stone-950 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all cursor-pointer"
        >
          <FiTrash2 className="text-xs" />
        </button>
      )}
    </div>
  );
};
