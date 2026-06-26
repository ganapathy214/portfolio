import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUploadCloud, FiSmile, FiEye, FiSettings, FiSliders, FiSun, FiMoon, FiTv } from "react-icons/fi";
import { getContrastColor, getLightShade } from "../../../utils/color";

const COLOR_PRESETS = [
  "#00D5D5", // Teal
  "#14b8a6", // Emerald
  "#f43f5e", // Rose
  "#3b82f6", // Blue
  "#8b5cf6", // Violet
  "#f97316", // Orange
  "#eab308", // Yellow
];

const FONTS_CATEGORIES = {
  Modern: [
    { name: "Inter", desc: "Clean and highly readable geometric sans-serif." },
    { name: "Poppins", desc: "Friendly and round display font with sleek lines." },
    { name: "Manrope", desc: "Tech-focused, modern typeface with soft angles." }
  ],
  Professional: [
    { name: "Roboto", desc: "Corporate-standard grotesque sans-serif." },
    { name: "Open Sans", desc: "Neutral, simple, and warm reading experience." }
  ],
  Creative: [
    { name: "Montserrat", desc: "Classic urban architectural poster font style." },
    { name: "Outfit", desc: "Sophisticated, geometric, premium signature look." }
  ]
};

const FONT_PAIRINGS = {
  Inter: { heading: "Poppins", body: "Inter", comment: "Dynamic geometric tech feel." },
  Poppins: { heading: "Poppins", body: "Roboto", comment: "Modern display paired with soft reading body." },
  Manrope: { heading: "Manrope", body: "Inter", comment: "Super sleek modern tech look." },
  Roboto: { heading: "Roboto", body: "Open Sans", comment: "Standard corporate high-readability pairing." },
  "Open Sans": { heading: "Outfit", body: "Open Sans", comment: "Designer heading with warm friendly reading." },
  Montserrat: { heading: "Montserrat", body: "Inter", comment: "High contrast creative poster look." },
  Outfit: { heading: "Outfit", body: "Manrope", comment: "Ultra-premium minimalist agency aesthetic." }
};

export default function BrandingStep({
  primaryColor,
  onColorChange,
  themeMode,
  onThemeModeChange,
  fontFamily,
  onFontFamilyChange,
  appTitle,
  onAppTitleChange,
  faviconDataUrl,
  onFaviconChange,
  onBack,
  onNext
}) {
  const [hexInput, setHexInput] = useState(primaryColor);
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageSrc, setImageSrc] = useState(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const cropCanvasRef = useRef(null);

  // Sync hex color state when prop changes
  useEffect(() => {
    setHexInput(primaryColor);
  }, [primaryColor]);

  const handleHexSubmit = (val) => {
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      onColorChange(val);
    }
  };

  // Drag-and-drop crop handlers
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

  // Reposition logic
  const handleMouseDown = (e) => {
    if (!imageSrc) return;
    setDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e) => {
    if (!dragging || !imageSrc) return;
    const nextX = e.clientX - dragStart.current.x;
    const nextY = e.clientY - dragStart.current.y;

    // Apply bounding box constraints
    const maxOffset = 150 * (zoom - 1);
    const constrainedX = Math.max(-maxOffset, Math.min(maxOffset, nextX));
    const constrainedY = Math.max(-maxOffset, Math.min(maxOffset, nextY));

    setPosition({ x: constrainedX, y: constrainedY });
  };

  const handleMouseUp = () => {
    setDragging(false);
    triggerCrop();
  };

  // Redraw cropped favicon on canvas and set state
  const triggerCrop = () => {
    if (!imageSrc || !cropCanvasRef.current) return;
    const canvas = cropCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw inside a circle mask for favicon styling
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

  // Trigger crop when zoom changes
  useEffect(() => {
    if (imageSrc) {
      triggerCrop();
    }
  }, [zoom, imageSrc]);

  // Font Suggestion metadata
  const currentPairing = FONT_PAIRINGS[fontFamily] || { heading: fontFamily, body: fontFamily, comment: "Standard typography" };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-2 select-none text-left">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-white uppercase tracking-wider">Branding & Theme Settings</h2>
        <p className="text-xs text-stone-400 font-medium">
          Set up your color, layout mode, typography pairings, and custom favicon.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Panel: Accent & Theme & App Title */}
        <div className="space-y-6">
          {/* Accent Color Selection */}
          <div className="bg-stone-900/40 border border-stone-850 p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
              Accent Color
            </h3>
            
            <div className="flex flex-wrap gap-2.5">
              {COLOR_PRESETS.map((color) => {
                const isSelected = primaryColor === color;
                return (
                  <button
                    key={color}
                    onClick={() => {
                      onColorChange(color);
                      setHexInput(color);
                    }}
                    className="w-8 h-8 rounded-full border border-stone-950 shadow-md cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center color-swatch-btn"
                    style={{
                      "--swatch-color": color,
                      "--swatch-border-color": isSelected ? "#ffffff" : "transparent",
                      backgroundColor: color,
                      borderColor: isSelected ? "#ffffff" : "transparent",
                      boxShadow: isSelected ? `0 0 12px ${color}80` : "none"
                    }}
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => {
                  onColorChange(e.target.value);
                  setHexInput(e.target.value);
                }}
                className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer outline-none shrink-0"
              />
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => {
                    setHexInput(e.target.value);
                    handleHexSubmit(e.target.value);
                  }}
                  placeholder="#00D5D5"
                  className="flex-1 bg-stone-950/80 border border-stone-850 rounded-xl px-4 py-2 text-xs font-mono text-white outline-none focus:border-primary"
                  style={{ caretColor: primaryColor }}
                />
              </div>
            </div>
          </div>

          {/* Base Theme Selection */}
          <div className="bg-stone-900/40 border border-stone-850 p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider">Base Theme</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "light", label: "Light", icon: FiSun },
                { id: "dark", label: "Dark", icon: FiMoon },
                { id: "system", label: "System", icon: FiTv },
              ].map((theme) => {
                const isActive = themeMode === theme.id;
                const ThemeIcon = theme.icon;
                return (
                  <div
                    key={theme.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onThemeModeChange(theme.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        onThemeModeChange(theme.id);
                      }
                    }}
                    className={`flex flex-col items-center justify-center gap-2 py-3 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isActive 
                        ? "bg-[rgba(var(--primary-rgb),0.06)] border-[var(--primary)] text-[var(--primary)] font-black" 
                        : "bg-[rgba(0,63,71,0.02)] border-[rgba(0,63,71,0.1)] hover:bg-[rgba(0,63,71,0.05)] text-[#003F47]"
                    }`}
                  >
                    <ThemeIcon className="text-sm" />
                    {theme.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* App Title Preview */}
          <div className="bg-stone-900/40 border border-stone-850 p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider">App Title</h3>
            <input
              type="text"
              value={appTitle}
              onChange={(e) => onAppTitleChange(e.target.value)}
              placeholder="e.g. John Doe Portfolio"
              className="w-full bg-stone-950/80 border border-stone-850 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Right Panel: Favicon Crop & Font Selection */}
        <div className="space-y-6">
          {/* Favicon Setup with Crop/Zoom */}
          <div className="bg-stone-900/40 border border-stone-850 p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider">Favicon Crop & Zoom</h3>
            
            <div className="flex gap-4">
              {/* Drag-and-drop Box */}
              <div
                ref={containerRef}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="w-36 h-36 border border-dashed border-stone-800 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center bg-stone-950/80 select-none cursor-move shrink-0"
              >
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="Source"
                    className="absolute pointer-events-none select-none origin-center"
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                      maxWidth: "100%",
                      maxHeight: "100%"
                    }}
                  />
                ) : (
                  <div className="text-center p-3 space-y-2 pointer-events-none">
                    <FiUploadCloud className="text-xl text-stone-500 mx-auto" />
                    <p className="text-[8px] text-stone-400 font-bold uppercase tracking-wider">Drag & Drop Image</p>
                  </div>
                )}
                {/* Circular Crop Mask Overlay */}
                <div className="absolute inset-0 pointer-events-none border-[18px] border-stone-900/80 flex items-center justify-center">
                  <div className="w-[100px] h-[100px] rounded-full border border-stone-500/30 shadow-[0_0_0_9999px_rgba(23,23,23,0.5)]" />
                </div>
              </div>

              {/* Favicon Previews */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="space-y-2">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Favicon Preview</span>
                  <div className="flex items-end gap-3">
                    {/* Small 16x16 representation */}
                    <div className="w-6 h-6 rounded-full border border-stone-800 bg-stone-950 flex items-center justify-center p-0.5">
                      <img src={faviconDataUrl || imageSrc} alt="Small favicon" className="w-full h-full object-contain rounded-full" />
                    </div>
                    {/* Larger 64x64 representation */}
                    <div className="w-12 h-12 rounded-full border border-stone-800 bg-stone-950 flex items-center justify-center p-1">
                      <img src={faviconDataUrl || imageSrc} alt="Favicon" className="w-full h-full object-contain rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-1.5 px-3 rounded-lg border border-stone-800 bg-stone-900 hover:bg-stone-800 text-[9.5px] font-bold uppercase tracking-widest text-white transition-all text-center cursor-pointer"
                  >
                    Select File
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <p className="text-[8px] text-stone-500 font-medium leading-normal">
                    Recomm: 1080 × 1080 px image. Drag to center, use slider to zoom.
                  </p>
                </div>
              </div>
            </div>

            {/* Zoom Slider */}
            {imageSrc && (
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-bold text-stone-400 uppercase tracking-widest">
                  <span>Zoom Factor</span>
                  <span>{zoom.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1 bg-stone-800 rounded-lg cursor-pointer"
                />
              </div>
            )}
            
            {/* Hidden Cropper Canvas */}
            <canvas ref={cropCanvasRef} width={1080} height={1080} className="hidden" />
          </div>

          {/* Font Selection with suggestions */}
          <div className="bg-stone-900/40 border border-stone-850 p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider">Font Family Selection</h3>
            
            <div className="space-y-4">
              {Object.entries(FONTS_CATEGORIES).map(([category, fonts]) => (
                <div key={category} className="space-y-2">
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">{category} Style</span>
                  <div className="flex flex-col gap-1.5">
                    {fonts.map((f) => {
                      const isSelected = fontFamily === f.name;
                      return (
                        <div
                          key={f.name}
                          role="button"
                          tabIndex={0}
                          onClick={() => onFontFamilyChange(f.name)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              onFontFamilyChange(f.name);
                            }
                          }}
                          className={`flex items-center justify-between p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected 
                              ? "bg-[rgba(var(--primary-rgb),0.06)] border-[var(--primary)] text-[var(--primary)]" 
                              : "bg-[rgba(0,63,71,0.02)] border-[rgba(0,63,71,0.1)] hover:bg-[rgba(0,63,71,0.05)] text-[#003F47]"
                          }`}
                          style={{
                            fontFamily: f.name
                          }}
                        >
                          <div>
                            <span 
                              className="text-xs font-bold block"
                              style={{ 
                                color: isSelected ? "var(--primary)" : "inherit",
                              }}
                            >
                              {f.name}
                            </span>
                            <span className={`text-[9px] font-medium mt-0.5 block ${isSelected ? "text-[var(--primary)] opacity-80" : "text-stone-500"}`}>{f.desc}</span>
                          </div>
                          {isSelected && (
                            <span className="text-xs font-black" style={{ color: "var(--primary)" }}>✓</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Font Pairing Suggestions Card */}
              <div 
                className="p-4 rounded-xl border border-stone-850 bg-stone-950/60 space-y-2"
                style={{ borderLeftColor: primaryColor, borderLeftWidth: "3px" }}
              >
                <div className="flex items-center justify-between text-[9px] font-bold text-stone-400 uppercase tracking-wider">
                  <span>Pairing suggestion for {fontFamily}</span>
                  <span style={{ color: primaryColor }}>{currentPairing.comment}</span>
                </div>
                
                <div className="space-y-1.5 p-2 rounded-lg bg-stone-900/35">
                  <span 
                    className="text-sm font-extrabold block text-white"
                    style={{ fontFamily: currentPairing.heading }}
                  >
                    Heading Element ({currentPairing.heading})
                  </span>
                  <span 
                    className="text-[10px] text-stone-400 leading-relaxed block"
                    style={{ fontFamily: currentPairing.body }}
                  >
                    Body text block ({currentPairing.body}) - This demonstrates a balanced pairing.
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Navigation CTAs */}
      <div className="flex justify-between pt-6 border-t border-stone-900/60">
        <button
          onClick={onBack}
          className="py-3 px-8 rounded-xl text-xs font-bold uppercase tracking-wider border border-stone-850 hover:bg-stone-900 hover:text-white transition-all cursor-pointer text-stone-400"
        >
          ← Back to templates
        </button>

        <button
          onClick={onNext}
          className="py-3 px-12 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xl cursor-pointer"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-contrast)",
            boxShadow: `0 4px 20px rgba(var(--primary-rgb), 0.25)`
          }}
        >
          Enter Workspace Preview →
        </button>
      </div>
    </div>
  );
}
