import React from "react";
import { motion } from "framer-motion";
import DecryptedText from "../common/DecryptedText";
import { usePortfolio } from "../../context/PortfolioContext";

const ALL_NAV_ITEMS = [
  { name: "Home",          href: "#home" },
  { name: "About",         href: "#about" },
  { name: "Services",      href: "#services" },
  { name: "Skills",        href: "#skills" },
  { name: "Projects",      href: "#projects" },
  { name: "Certification", href: "#certification" },
  { name: "Testimonials",  href: "#testimonials" },
  { name: "Experience",    href: "#experience" },
  { name: "Education",     href: "#education" },
  { name: "Blogs",         href: "#blogs" },
  { name: "Faq",           href: "#faq" },
  { name: "Contact",       href: "#contact" },
];

const TopNavbar = ({ activeSection, onItemClick, sectionVisibility, about, primaryColor, navPosition = "top" }) => {
  const { selectedTemplate } = usePortfolio();
  // Only render when navPosition is "top"
  if (navPosition !== "top") return null;
  if (["template-3", "template-4", "template-5", "template-6"].includes(selectedTemplate)) return null;

  const firstInitial = (about?.name || "G").charAt(0).toUpperCase();
  const visibleItems = ALL_NAV_ITEMS.filter(
    (item) => !sectionVisibility || sectionVisibility[item.name] !== false
  );

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="sticky top-0 left-0 w-full z-50 backdrop-blur-md bg-stone-950/80 border-b border-stone-900/60 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Branding Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onItemClick({ name: "Home", href: "#home" });
          }}
          className="flex items-center gap-2 group cursor-pointer shrink-0"
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-sm transition-all duration-300 shadow-lg"
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

        {/* Navigation links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 overflow-x-auto scrollbar-none">
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
                className="relative px-2.5 py-2 text-[10px] font-extrabold uppercase tracking-wider transition-all duration-200 group whitespace-nowrap"
                style={{ color: isActive ? (primaryColor || "var(--primary)") : "rgba(255,255,255,0.45)" }}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-200">
                  {item.name}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="top-navbar-underline"
                    className="absolute bottom-1 left-2.5 right-2.5 h-0.5 rounded-full z-0"
                    style={{ backgroundColor: primaryColor || "var(--primary)", boxShadow: `0 0 8px ${primaryColor || "var(--primary)"}` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile active section badge */}
        <div className="lg:hidden flex items-center">
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
