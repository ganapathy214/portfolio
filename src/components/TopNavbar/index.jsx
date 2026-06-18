import React from "react";
import { motion } from "framer-motion";
import DecryptedText from "../common/DecryptedText";

const TopNavbar = ({ activeSection, onItemClick, sectionVisibility, about, primaryColor }) => {
  const firstInitial = (about?.name || "G").charAt(0).toUpperCase();
  const visibleItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Certification", href: "#certification" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Journey", href: "#journey" },
    { name: "Blogs", href: "#blogs" },
    { name: "Faq", href: "#faq" },
    { name: "Contact", href: "#contact" }
  ].filter(item => !sectionVisibility || sectionVisibility[item.name] !== false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="sticky top-0 left-0 w-full z-50 backdrop-blur-md bg-stone-950/80 border-b border-stone-900/60 select-none"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Branding Logo on Left */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onItemClick({ name: "Home", href: "#home" });
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-mono font-black text-sm transition-all duration-300 shadow-lg"
            style={{
              backgroundColor: primaryColor || "#00D5D5",
              color: "#000000",
              boxShadow: `0 4px 14px ${(primaryColor || "#00D5D5")}35`
            }}
          >
            {firstInitial}
          </div>
          <span className="font-mono text-xs uppercase font-extrabold tracking-[0.2em] text-white group-hover:text-primary transition-colors hidden sm:inline-block">
            {about?.name?.split(" ")[0] || "Developer"}
          </span>
        </a>

        {/* Navigation links centered/right aligned (Desktop only) */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5">
          {visibleItems.map((item) => {
            const isActive = activeSection === item.name;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onItemClick(item);
                }}
                className="relative px-3 py-2 text-[10.5px] font-extrabold uppercase tracking-wider transition-all duration-200 group"
                style={{ color: isActive ? (primaryColor || "var(--primary)") : "rgba(255,255,255,0.45)" }}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-200">
                  {item.name}
                </span>
                
                {/* Active slider highlight */}
                {isActive && (
                  <motion.span
                    layoutId="top-navbar-underline"
                    className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full z-0"
                    style={{ backgroundColor: primaryColor || "var(--primary)", boxShadow: `0 0 8px ${primaryColor || "var(--primary)"}` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Mini Branding Indicator (hidden on Desktop) */}
        <div className="md:hidden flex items-center">
          <span
            className="text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border bg-stone-900/60 border-stone-850"
            style={{ color: primaryColor || "var(--primary)", borderColor: `${(primaryColor || "var(--primary)")}25` }}
          >
            {activeSection}
          </span>
        </div>
      </div>
    </motion.header>
  );
};

export default React.memo(TopNavbar);
