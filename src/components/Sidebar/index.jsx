import { motion } from "framer-motion";
import React from "react";
import { sidebarItems } from "../../constants";
import DecryptedText from "../common/DecryptedText";
import { usePortfolio } from "../../context/PortfolioContext";

const Sidebar = ({ activeSection, onItemClick, sectionVisibility, navPosition = "left" }) => {
  const { selectedTemplate } = usePortfolio();
  const visibleItems = sidebarItems.filter(
    (item) => !sectionVisibility || sectionVisibility[item.name] !== false
  );

  // Suppress global sidebar for Template 2 in left mode (as it renders its own native sidebar)
  if (navPosition === "left" && selectedTemplate === "template-2") return null;

  // "top" = TopNavbar handles navigation  Sidebar renders nothing
  if (navPosition === "top") return null;

  // "bottom" = fixed bottom bar always visible (desktop + mobile)
  if (navPosition === "bottom") {
    return (
      <motion.nav
        className="sidebar-nav fixed bottom-0 left-0 w-full flex justify-around px-2 py-3 z-50 border-t overflow-x-auto scrollbar-none"
        style={{
          background: "rgba(10, 10, 10, 0.97)",
          borderTopColor: "rgba(var(--primary-rgb), 0.18)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
      >
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
              className="flex flex-col items-center gap-1 relative px-2 py-1 select-none shrink-0 min-w-[48px]"
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-bar-indicator"
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "var(--primary)",
                    boxShadow: "0 0 10px rgba(var(--primary-rgb), 0.8)",
                  }}
                />
              )}
              <item.icon
                className="w-5 h-5 transition-all duration-200"
                style={{
                  color: isActive ? "var(--primary)" : "rgba(255,255,255,0.45)",
                  filter: isActive ? "drop-shadow(0 0 6px rgba(var(--primary-rgb), 0.6))" : "none",
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                }}
              />
              <span
                className="text-[8px] font-bold uppercase tracking-wider transition-colors duration-200 hidden min-[340px]:block"
                style={{ color: isActive ? "var(--primary)" : "rgba(255,255,255,0.35)" }}
              >
                {item.name}
              </span>
            </a>
          );
        })}
      </motion.nav>
    );
  }

  // Default "left" vertical sidebar
  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        className="hidden md:block"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 28, delay: 0.2 }}
      >
        <nav
          className="sidebar-nav w-20 h-screen fixed left-0 top-0 flex flex-col items-center justify-center z-30 gap-2"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.5))",
            borderRight: "1px solid rgba(var(--primary-rgb),0.08)",
          }}
        >
          {/* Top branding dot */}
          <div className="absolute top-6 flex flex-col items-center gap-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--primary)", boxShadow: "0 0 8px rgba(var(--primary-rgb),0.8)" }}
            />
            <div className="w-px h-8" style={{ background: "rgba(var(--primary-rgb),0.2)" }} />
          </div>

          {/* Nav items */}
          {visibleItems.map((item, i) => {
            const isActive = activeSection === item.name;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onItemClick(item);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className="flex flex-col items-center justify-center px-2 py-3 relative group transition-all duration-200"
                  style={{ minWidth: "64px" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r"
                      style={{ background: "var(--primary)", boxShadow: "0 0 8px rgba(var(--primary-rgb),0.6)" }}
                    />
                  )}
                  <item.icon
                    className="w-5 h-5 mb-1 transition-all duration-200"
                    style={{
                      color: isActive ? "var(--primary)" : "rgba(255,255,255,0.45)",
                      filter: isActive ? "drop-shadow(0 0 6px rgba(var(--primary-rgb),0.6))" : "none",
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                  <DecryptedText
                    text={item.name}
                    className={`text-[9px] font-bold tracking-wider uppercase transition-colors duration-200 ${
                      isActive ? "text-primary" : "text-stone-600 group-hover:text-stone-300"
                    }`}
                    parentClassName="flex items-center justify-center"
                    animateOn="hover"
                    speed={40}
                    maxIterations={5}
                    sequential={true}
                  />
                </a>
              </motion.div>
            );
          })}

          {/* Bottom accent */}
          <div className="absolute bottom-6 flex flex-col items-center gap-1">
            <div className="w-px h-8" style={{ background: "rgba(var(--primary-rgb),0.2)" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(var(--primary-rgb),0.3)" }} />
          </div>
        </nav>
      </motion.div>

      {/* Mobile Bottom Bar */}
      <motion.nav
        className="sidebar-nav md:hidden fixed bottom-0 left-0 w-full flex justify-around px-2 py-3 z-50 border-t overflow-x-auto scrollbar-none"
        style={{
          background: "rgba(10, 10, 10, 0.95)",
          borderTopColor: "rgba(var(--primary-rgb), 0.15)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
      >
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
              className="flex flex-col items-center gap-1 relative px-2 py-1 select-none shrink-0"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-indicator"
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "var(--primary)",
                    boxShadow: "0 0 10px rgba(var(--primary-rgb), 0.8)",
                  }}
                />
              )}
              <item.icon
                className="w-5 h-5 transition-all duration-200"
                style={{
                  color: isActive ? "var(--primary)" : "rgba(255,255,255,0.45)",
                  filter: isActive ? "drop-shadow(0 0 6px rgba(var(--primary-rgb), 0.6))" : "none",
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                }}
              />
              <span
                className="text-[8px] font-bold uppercase tracking-wider transition-colors duration-200 hidden min-[420px]:block"
                style={{ color: isActive ? "var(--primary)" : "rgba(255,255,255,0.35)" }}
              >
                {item.name}
              </span>
            </a>
          );
        })}
      </motion.nav>
    </>
  );
};

export default React.memo(Sidebar);
