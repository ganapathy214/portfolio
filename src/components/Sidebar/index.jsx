import { motion } from "framer-motion";
import React from "react";
import { sidebarItems } from "../../constants";
import DecryptedText from "../../common/DecryptedText";

const Sidebar = ({ activeSection, onItemClick, sectionVisibility }) => {
  const visibleItems = sidebarItems.filter(
    (item) => !sectionVisibility || sectionVisibility[item.name] !== false
  );

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
          className="w-20 h-screen fixed left-0 top-0 flex flex-col items-center justify-center z-30 gap-2"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.5))",
            borderRight: "1px solid rgba(var(--primary-rgb),0.08)",
          }}
        >
          {/* Top branding dot */}
          <div
            className="absolute top-6 flex flex-col items-center gap-1"
          >
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
                  {/* Active left indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r"
                      style={{ background: "var(--primary)", boxShadow: "0 0 8px rgba(var(--primary-rgb),0.6)" }}
                    />
                  )}

                  {/* Icon */}
                  <item.icon
                    className="w-5 h-5 mb-1 transition-all duration-200"
                    style={{
                      color: isActive ? "var(--primary)" : "rgba(255,255,255,0.45)",
                      filter: isActive ? "drop-shadow(0 0 6px rgba(var(--primary-rgb),0.6))" : "none",
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                    }}
                  />

                  {/* Label */}
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

          {/* Bottom accent line */}
          <div className="absolute bottom-6 flex flex-col items-center gap-1">
            <div className="w-px h-8" style={{ background: "rgba(var(--primary-rgb),0.2)" }} />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "rgba(var(--primary-rgb),0.3)" }}
            />
          </div>
        </nav>
      </motion.div>

    </>
  );
};

export default React.memo(Sidebar);
