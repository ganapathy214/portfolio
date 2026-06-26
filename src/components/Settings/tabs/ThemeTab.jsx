import React from "react";
import { TabCardWrapper } from "../SettingsCommon";
import { FONT_OPTIONS, applyFont } from "../../../utils/font";
import { FiUploadCloud } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const COLOR_SWATCHES = [
  { name: "Cyan Spark", value: "#00D5D5", subtitle: "Cyberpunk Glow" },
  { name: "Purple Neon", value: "#a855f7", subtitle: "Midnight Synth" },
  { name: "Rose Glow", value: "#f43f5e", subtitle: "Vibrant Cherry" },
  { name: "Emerald Cyber", value: "#10b981", subtitle: "Matrix Green" },
  { name: "Amber Fusion", value: "#f59e0b", subtitle: "Sunset Gold" },
  { name: "Ocean Blue", value: "#3b82f6", subtitle: "Deep Marine" },
  { name: "Coral Flame", value: "#ff6b6b", subtitle: "Playful Warmth" },
  { name: "Lime Volt", value: "#a3e635", subtitle: "High Voltage" },
  { name: "Indigo Dream", value: "#6366f1", subtitle: "Cosmic Indigo" },
  { name: "Pink Candy", value: "#ec4899", subtitle: "Sweet Bubble" },
  { name: "Teal Mist", value: "#14b8a6", subtitle: "Soothing Aqua" },
  { name: "Gold Rush", value: "#d97706", subtitle: "Earthy Bronze" },
];

const ThemeTab = React.memo(function ThemeTab({
  pickedColor,
  handleColorChange,
  localThemeMode,
  handleThemeModeChange,
  localAbout,
  localFontFamily,
  setLocalFontFamily,
  localCopyright,
  setLocalCopyright,
  localPageTitles,
  onAppTitleChange,
  localFaviconDataUrl,
  onFaviconChange,
  localNavPosition,
  setLocalNavPosition,
}) {
  const handleFontChange = (fontName) => {
    setLocalFontFamily(fontName);
    applyFont(fontName);
  };

  const isLight = localThemeMode === "light";

  // Favicon Crop and Zoom states & callbacks
  const [zoom, setZoom] = React.useState(1);
  const [isFontDropdownOpen, setIsFontDropdownOpen] = React.useState(false);
  const [fontSearch, setFontSearch] = React.useState("");
  const [hoveredFont, setHoveredFont] = React.useState(null);
  const [dragging, setDragging] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [imageSrc, setImageSrc] = React.useState(null);
  const dragStart = React.useRef({ x: 0, y: 0 });
  const containerRef = React.useRef(null);
  const fileInputRef = React.useRef(null);
  const cropCanvasRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
        setPosition({ x: 0, y: 0 });
        setZoom(1);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
        setPosition({ x: 0, y: 0 });
        setZoom(1);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e) => {
    if (!imageSrc) return;
    e.preventDefault();
    setDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e) => {
    if (!dragging || !imageSrc) return;
    const nextX = e.clientX - dragStart.current.x;
    const nextY = e.clientY - dragStart.current.y;

    const maxOffset = Math.max(200, Math.abs(200 * (zoom - 1)));
    const constrainedX = Math.max(-maxOffset, Math.min(maxOffset, nextX));
    const constrainedY = Math.max(-maxOffset, Math.min(maxOffset, nextY));

    setPosition({ x: constrainedX, y: constrainedY });
  };

  const handleMouseUp = () => {
    setDragging(false);
    triggerCrop();
  };

  const triggerCrop = () => {
    if (!imageSrc || !cropCanvasRef.current) return;
    const canvas = cropCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
      ctx.clip();

      const size = Math.min(img.width, img.height);
      const drawSize = size / zoom;
      const sx = (img.width - drawSize) / 2 - (position.x * (size / 150) / zoom);
      const sy = (img.height - drawSize) / 2 - (position.y * (size / 150) / zoom);

      ctx.drawImage(img, sx, sy, drawSize, drawSize, 0, 0, canvas.width, canvas.height);
      ctx.restore();

      const croppedUrl = canvas.toDataURL("image/png");
      onFaviconChange(croppedUrl);
    };
    img.src = imageSrc;
  };

  React.useEffect(() => {
    if (imageSrc) {
      triggerCrop();
    }
  }, [zoom, imageSrc]);

  return (
    <div className="space-y-6 animate-fadeIn text-left">
      {/* Dynamic App Title */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          App Name / Title
        </label>
        <div className="bg-stone-950 border border-stone-900 rounded-2xl p-4">
          <input
            type="text"
            value={localPageTitles?.Home || ""}
            onChange={(e) => onAppTitleChange(e.target.value)}
            placeholder="e.g. John Doe Portfolio"
            className="w-full bg-transparent border-b border-stone-850 focus:border-primary outline-none text-sm py-1 text-white font-bold transition-colors"
            style={{ borderBottomColor: pickedColor }}
          />
          <span className="text-[9px] text-stone-500 font-semibold block mt-1.5 leading-normal">
            This title will automatically update the browser tab title of your portfolio.
          </span>
        </div>
      </div>

      {/* Favicon Setup with Crop/Zoom */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Favicon Setup
        </label>
        <div className="bg-stone-950 border border-stone-900 rounded-2xl p-6 space-y-6 text-center">
          <h3 className="text-sm font-bold text-white tracking-wide">
            Upload Your Favicon
          </h3>

          {/* Drag & Drop/Cropper Container */}
          <div className="flex flex-col items-center justify-center">
            <div
              ref={containerRef}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onClick={() => {
                if (!imageSrc) fileInputRef.current?.click();
              }}
              className="w-full max-w-sm h-40 border-2 border-dashed rounded-2xl relative overflow-hidden flex flex-col items-center justify-center bg-stone-900/20 select-none cursor-pointer transition-all duration-300"
              style={{
                borderColor: pickedColor ? `${pickedColor}40` : "#2e2a24",
                backgroundColor: pickedColor ? `${pickedColor}05` : undefined,
              }}
              onMouseEnter={(e) => {
                if (!imageSrc) e.currentTarget.style.borderColor = pickedColor;
              }}
              onMouseLeave={(e) => {
                handleMouseUp();
                if (!imageSrc) e.currentTarget.style.borderColor = pickedColor ? `${pickedColor}40` : "#2e2a24";
              }}
            >
              {imageSrc ? (
                <>
                  <img
                    src={imageSrc}
                    alt="Source"
                    className="absolute pointer-events-none select-none origin-center cursor-move"
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                      maxWidth: "100%",
                      maxHeight: "100%"
                    }}
                  />
                  {/* Circular Crop Mask Overlay */}
                  <div className="absolute inset-0 pointer-events-none border-[20px] border-stone-950/80 flex items-center justify-center">
                    <div className="w-[100px] h-[100px] rounded-full border border-stone-500/20 shadow-[0_0_0_9999px_rgba(12,12,12,0.45)]" />
                  </div>
                  {/* Clear Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageSrc(null);
                      onFaviconChange('');
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-stone-950/80 hover:bg-stone-900 border border-stone-850 text-[8px] font-bold uppercase tracking-wider text-stone-400 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                </>
              ) : (
                <div className="text-center p-4 space-y-2 pointer-events-none">
                  {/* Styled Image Folder Icon matching theme */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto border border-stone-850 bg-stone-900/60"
                    style={{ color: pickedColor }}
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
                    </svg>
                  </div>
                  <p className="text-[10px] text-stone-300 font-bold uppercase tracking-wider">
                    Drag and Drop Image Here
                  </p>
                  <p className="text-[8px] text-stone-500 font-semibold">
                    or click to browse from device
                  </p>
                </div>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <p className="text-[9px] text-stone-500 font-semibold leading-normal">
            Images should be PNG, JPG, or SVG
          </p>

          {/* Zoom Slider */}
          {imageSrc && (
            <div className="space-y-1.5 max-w-sm mx-auto">
              <div className="flex justify-between text-[8px] font-bold text-stone-400 uppercase tracking-widest">
                <span>Crop Zoom</span>
                <span>{zoom.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-primary h-1.5 bg-stone-900 rounded-lg cursor-pointer appearance-none"
                style={{
                  backgroundImage: `linear-gradient(to right, ${pickedColor} 0%, ${pickedColor} ${((zoom - 0.3) / 2.7) * 100}%, #1c1917 ${((zoom - 0.3) / 2.7) * 100}%, #1c1917 100%)`
                }}
              />
            </div>
          )}

          {/* Uploaded Files Section */}
          <div className="border-t border-stone-900 pt-5 text-left space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Uploaded Images
            </h4>

            {(localFaviconDataUrl || imageSrc) ? (
              <div className="bg-stone-900/40 border border-stone-850 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Mini Image Preview instead of Document File Icon */}
                  <div className="w-8 h-8 rounded-lg bg-stone-950 border border-stone-850 p-1 flex items-center justify-center shrink-0">
                    <img
                      src={localFaviconDataUrl || imageSrc}
                      alt="Favicon Thumbnail"
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-stone-200 block truncate max-w-[200px]">
                      favicon.png
                    </span>
                    <span className="text-[7.5px] text-stone-500 font-semibold block">
                      Cropped to 1080p × 1080p
                    </span>
                  </div>
                </div>

                {/* Green checkmark indicator */}
                <div className="text-emerald-500 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="bg-stone-900/20 border border-stone-900 border-dashed rounded-xl p-4 text-center">
                <span className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">
                  No Favicon Configured
                </span>
              </div>
            )}
          </div>

          {/* Hidden Cropper Canvas */}
          <canvas ref={cropCanvasRef} width={1080} height={1080} className="hidden" />
        </div>
      </div>

      {/* Preset Swatches Row */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Preset Accent Colors
        </label>
        <div className="bg-stone-950 border border-stone-900 rounded-2xl p-4 flex flex-wrap gap-3">
          {COLOR_SWATCHES.map((swatch) => {
            const isSelected = pickedColor.toLowerCase() === swatch.value.toLowerCase();
            return (
              <motion.button
                key={swatch.name}
                type="button"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleColorChange(swatch.value)}
                className="w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer flex items-center justify-center relative shrink-0 color-swatch-btn"
                style={{
                  "--swatch-color": swatch.value,
                  "--swatch-border-color": isSelected ? "#ffffff" : "rgba(255,255,255,0.1)",
                  backgroundColor: swatch.value,
                  borderColor: isSelected ? "#ffffff" : "rgba(255,255,255,0.1)",
                  boxShadow: isSelected ? `0 0 12px ${swatch.value}` : "none",
                }}
                title={swatch.name}
              >
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_4px_rgba(0,0,0,0.5)]" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Manual custom picker */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Custom Accent Hex Code
        </label>
        <div className="flex items-center gap-4 bg-stone-950 border border-stone-900 rounded-2xl p-4">
          <input
            type="color"
            value={pickedColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-12 h-12 rounded-xl border-0 cursor-pointer outline-none bg-transparent"
          />
          <div className="flex-1">
            <input
              type="text"
              value={pickedColor}
              onChange={(e) => handleColorChange(e.target.value)}
              placeholder="#00D5D5"
              maxLength={7}
              className="w-full bg-transparent border-b border-stone-850 focus:border-primary outline-none text-base font-mono tracking-wider py-1 uppercase text-white font-bold transition-colors"
              style={{ borderBottomColor: pickedColor }}
            />
            <span className="text-[9px] text-stone-500 font-semibold block mt-1.5 leading-normal">
              Choose any hex accent. Colors, halos, and animations will render unified in your portfolio.
            </span>
          </div>
        </div>
      </div>

      {/* Base Theme Mode Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Base Theme Mode
        </label>
        <div className="flex items-center gap-4 bg-stone-950 border border-stone-900 rounded-2xl p-4 w-full justify-between sm:justify-start">
          <span className={`text-xs font-bold transition-colors ${!isLight ? "text-white" : "text-stone-500"}`}>
            Dark
          </span>
          <div className="checkbox-wrapper-54 flex items-center justify-center shrink-0">
            <label className="switch">
              <input
                type="checkbox"
                checked={!isLight}
                onChange={() => handleThemeModeChange(isLight ? "dark" : "light")}
              />
              <span className="slider"></span>
            </label>
          </div>
          <span className={`text-xs font-bold transition-colors ${isLight ? "text-white" : "text-stone-500"}`}>
            Light
          </span>
        </div>
      </div>

      {/* Typography / Font Family Picker */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Font Family Selection
        </label>
        <div className="bg-stone-950 border border-stone-900 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center">
          <div className="w-full sm:w-64 relative inline-flex" style={{ zIndex: isFontDropdownOpen ? 50 : 1 }}>
            <div
              id="hs-dropdown-default"
              role="button"
              tabIndex={0}
              onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setIsFontDropdownOpen(!isFontDropdownOpen);
                }
              }}
              className="font-dropdown-trigger flex items-center justify-between"
              style={{
                fontFamily: `"${localFontFamily}", sans-serif`,
              }}
              aria-haspopup="menu"
              aria-expanded={isFontDropdownOpen}
              aria-label="Dropdown"
            >
              <div className="flex items-center gap-2.5">
                <div 
                  className="font-preview-box"
                  style={{ fontFamily: `"${localFontFamily}", sans-serif` }}
                >
                  Aa
                </div>
                <div className="text-left font-sans">
                  <span className="block text-xs font-bold text-[#FFF6E9]" style={{ fontFamily: `"${localFontFamily}", sans-serif` }}>
                    {localFontFamily}
                  </span>
                  <span className="block text-[8.5px] uppercase tracking-wider font-extrabold opacity-60 text-[#FFF6E9]">
                    {FONT_OPTIONS.find(f => f.name === localFontFamily)?.category || "Sans-serif"}
                  </span>
                </div>
              </div>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isFontDropdownOpen ? "rotate-180" : ""}`} 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
            
            <AnimatePresence>
              {isFontDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => {
                      setIsFontDropdownOpen(false);
                      setFontSearch("");
                    }} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="font-dropdown-menu"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="hs-dropdown-default"
                  >
                    {/* Search Bar inside popover */}
                    <div className="p-1 border-b border-stone-100 pb-2">
                      <input
                        type="text"
                        value={fontSearch}
                        onChange={(e) => setFontSearch(e.target.value)}
                        placeholder="Search typography..."
                        className="font-dropdown-search"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>

                    <div className="max-h-64 overflow-y-auto scrollbar-thin p-1 space-y-0.5">
                      <div className="font-dropdown-header">Typography Options</div>
                      {FONT_OPTIONS.filter((font) =>
                        font.label.toLowerCase().includes(fontSearch.toLowerCase()) ||
                        font.category.toLowerCase().includes(fontSearch.toLowerCase())
                      ).map((font) => {
                        const isFontSelected = localFontFamily === font.name;
                        return (
                          <div
                            key={font.name}
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                              handleFontChange(font.name);
                              setIsFontDropdownOpen(false);
                              setFontSearch("");
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                handleFontChange(font.name);
                                setIsFontDropdownOpen(false);
                                setFontSearch("");
                              }
                            }}
                            onMouseEnter={() => {
                              setHoveredFont(font.name);
                              applyFont(font.name);
                            }}
                            onMouseLeave={() => {
                              setHoveredFont(null);
                            }}
                            className={`font-dropdown-item ${isFontSelected ? "active" : ""}`}
                          >
                            <div className="flex items-center gap-2.5 flex-1 min-w-0">
                              <div 
                                className="font-preview-box"
                                style={{ fontFamily: `"${font.name}", sans-serif` }}
                              >
                                Aa
                              </div>
                              <div className="text-left font-sans flex-1 min-w-0">
                                <span className="block text-xs font-bold text-stone-900 truncate" style={{ fontFamily: `"${font.name}", sans-serif` }}>
                                  {font.label}
                                </span>
                                <span className="block text-[8.5px] text-stone-500 font-medium truncate">
                                  {font.description || "Typography styling"}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="font-badge">{font.category}</span>
                              {isFontSelected && <span className="text-[10px] text-teal-700 font-black">✓</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Font Preview */}
          <div className="flex-1 w-full bg-stone-900/40 border border-stone-850 rounded-xl px-4 py-3 flex items-center justify-between min-h-[44px]">
            <div className="min-w-0 flex-1">
              <span className="text-[8px] text-stone-500 font-bold uppercase tracking-widest block mb-0.5">Live Font Preview</span>
              <p
                className="text-sm font-extrabold text-white truncate"
                style={{ fontFamily: hoveredFont ? `"${hoveredFont}", sans-serif` : `"${localFontFamily}", sans-serif` }}
              >
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
            <span className="text-[7.5px] uppercase tracking-widest font-extrabold px-1.5 py-0.5 rounded bg-stone-950 border border-stone-800 text-stone-500 shrink-0 select-none ml-2">
              {FONT_OPTIONS.find(f => f.name === (hoveredFont || localFontFamily))?.category || "Sans-serif"}
            </span>
          </div>
        </div>
      </div>

      {/* Nav Position Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Sidebar / Nav Position
        </label>
        <div className="bg-stone-950 border border-stone-900 rounded-2xl p-4 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                value: "left",
                label: "Left",
                desc: "Vertical sidebar",
                icon: (
                  <svg viewBox="0 0 40 28" className="w-10 h-7 fill-current">
                    <rect x="0" y="0" width="8" height="28" rx="1" opacity="0.9" />
                    <rect x="10" y="0" width="30" height="28" rx="1" opacity="0.15" />
                    <rect x="12" y="4" width="16" height="2" rx="1" opacity="0.4" />
                    <rect x="12" y="9" width="12" height="2" rx="1" opacity="0.4" />
                    <rect x="12" y="14" width="14" height="2" rx="1" opacity="0.4" />
                  </svg>
                ),
              },
              {
                value: "top",
                label: "Top",
                desc: "Top navbar",
                icon: (
                  <svg viewBox="0 0 40 28" className="w-10 h-7 fill-current">
                    <rect x="0" y="0" width="40" height="7" rx="1" opacity="0.9" />
                    <rect x="0" y="9" width="40" height="19" rx="1" opacity="0.15" />
                    <rect x="4" y="14" width="16" height="2" rx="1" opacity="0.4" />
                    <rect x="4" y="19" width="12" height="2" rx="1" opacity="0.4" />
                  </svg>
                ),
              },
              {
                value: "bottom",
                label: "Bottom",
                desc: "Bottom bar",
                icon: (
                  <svg viewBox="0 0 40 28" className="w-10 h-7 fill-current">
                    <rect x="0" y="0" width="40" height="19" rx="1" opacity="0.15" />
                    <rect x="4" y="4" width="16" height="2" rx="1" opacity="0.4" />
                    <rect x="4" y="9" width="12" height="2" rx="1" opacity="0.4" />
                    <rect x="0" y="21" width="40" height="7" rx="1" opacity="0.9" />
                  </svg>
                ),
              },
            ].map((pos) => {
              const isActive = (localNavPosition || "left") === pos.value;
              return (
                <motion.div
                  key={pos.value}
                  role="button"
                  tabIndex={0}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setLocalNavPosition(pos.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setLocalNavPosition(pos.value);
                    }
                  }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer"
                  style={{
                    borderColor: isActive ? pickedColor : "rgba(0, 63, 71, 0.12)",
                    backgroundColor: isActive ? `${pickedColor}15` : "rgba(255, 255, 255, 0.6)",
                    color: isActive ? pickedColor : "#003F47",
                  }}
                >
                  {pos.icon}
                  <span className="text-[9px] font-extrabold uppercase tracking-widest">{pos.label}</span>
                  <span className="text-[8px] font-semibold opacity-60">{pos.desc}</span>
                </motion.div>
              );
            })}
          </div>
          <p className="text-[8.5px] text-stone-500 font-semibold leading-normal">
            Choose where the navigation menu appears. "Left" shows a vertical icon sidebar. "Top" shows a horizontal top bar. "Bottom" pins the nav to the bottom of the screen.
          </p>
        </div>
      </div>

      {/* Global Copyright Settings */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Global Footer Copyright
        </label>
        <div className="bg-stone-950 border border-stone-900 rounded-2xl p-4 space-y-2">
          <input
            type="text"
            value={localCopyright || ""}
            onChange={(e) => setLocalCopyright(e.target.value)}
            placeholder="© 2026. All rights reserved."
            className="w-full bg-transparent border-b border-stone-850 focus:border-primary outline-none text-sm py-1 text-white font-bold transition-colors"
            style={{ borderBottomColor: pickedColor }}
          />
          <span className="text-[9px] text-stone-500 font-semibold block leading-normal">
            This copyright text will automatically appear in the footer of all templates.
          </span>
        </div>
      </div>
    </div>
  );
});

export default ThemeTab;
