import React from "react";
import { motion } from "framer-motion";
import { FiCheck, FiLayout, FiGrid, FiCompass, FiAward, FiSliders, FiCpu } from "react-icons/fi";

const TEMPLATES = [
  { id: "template-1", name: "Modern", icon: FiSliders, badge: "Sidebar Nav", desc: "Left-docked animated navigation bar with glow accents.", image: "/portfolio/templates/template1.png" },
  { id: "template-2", name: "Professional", icon: FiAward, badge: "Classic Profile", desc: "Detailed left profile sidebar with layout grids.", image: "/portfolio/templates/template2.png" },
  { id: "template-3", name: "Minimal", icon: FiLayout, badge: "Clean Topnav", desc: "Clean top navbar with elegant dark/light sections.", image: "/portfolio/templates/template3.png" },
  { id: "template-4", name: "Dark", icon: FiCpu, badge: "Dev Style", desc: "Monospace font styles and glowing border tags.", image: "/portfolio/templates/template4.png" },
  { id: "template-5", name: "Agency", icon: FiCompass, badge: "Portrait Focus", desc: "Vibrant visual layout highlighting experience and skills.", image: "/portfolio/templates/template5.png" },
  { id: "template-6", name: "Creative", icon: FiGrid, badge: "Interactive Nodes", desc: "Skill nodes network and staggered timeline panels.", image: "/portfolio/templates/template6.png" },
];

export default function TemplateSelectStep({ selectedId, onSelect, onNext }) {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-white uppercase tracking-wider">Choose a Base Design Template</h2>
        <p className="text-xs text-stone-400 font-medium">
          Select the layout structure that fits your style. You can customize the branding and content later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((tpl) => {
          const isSelected = selectedId === tpl.id;
          const Icon = tpl.icon;
          return (
            <motion.div
              key={tpl.id}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(tpl.id)}
              className={`group relative rounded-2xl overflow-hidden border bg-stone-900/60 backdrop-blur-md cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]"
                  : "border-stone-800/80 hover:border-stone-700/80"
              }`}
              style={isSelected ? { borderColor: "var(--primary)" } : {}}
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                <img
                  src={tpl.image}
                  alt={tpl.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to a placeholder pattern if the image fails to load
                    e.currentTarget.style.display = "none";
                  }}
                />
                {/* Fallback pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-stone-950 to-stone-900 flex items-center justify-center -z-10">
                  <FiLayout className="text-4xl text-stone-800" />
                </div>
                {/* Badge Overlay */}
                <span className="absolute top-3 left-3 text-[8.5px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/60 border border-stone-800/80 text-stone-300">
                  {tpl.badge}
                </span>

                {/* Checked Overlay */}
                {isSelected && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] transition-all"
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-2xl"
                      style={{ backgroundColor: "var(--primary)", color: "var(--primary-contrast)" }}
                    >
                      <FiCheck className="text-xl stroke-[3]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Info Body */}
              <div className="p-5 space-y-2 relative">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-sm border"
                    style={{
                      backgroundColor: isSelected ? "rgba(var(--primary-rgb), 0.1)" : "rgba(255,255,255,0.03)",
                      borderColor: isSelected ? "rgba(var(--primary-rgb), 0.2)" : "rgba(255,255,255,0.08)",
                      color: isSelected ? "var(--primary)" : "#a8a29e"
                    }}
                  >
                    <Icon />
                  </div>
                  <span className="text-sm font-black text-white uppercase tracking-wider">{tpl.name}</span>
                </div>
                <p className="text-[10.5px] text-stone-400 font-medium leading-relaxed">
                  {tpl.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center pt-6">
        <button
          onClick={onNext}
          disabled={!selectedId}
          className="flex items-center justify-center gap-2 py-3 px-12 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xl disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          style={{
            backgroundColor: selectedId ? "var(--primary)" : "rgba(255,255,255,0.05)",
            color: selectedId ? "var(--primary-contrast)" : "#78716c",
            boxShadow: selectedId ? "0 4px 20px rgba(var(--primary-rgb), 0.25)" : "none"
          }}
        >
          Customize Theme & Branding →
        </button>
      </div>
    </div>
  );
}
