//eslint-disable-next-line
import { motion } from "framer-motion";
import React from "react";
import { sidebarItems } from "../../const";

const Sidebar = ({ activeSection, onItemClick }) => {
  return (
    <>
      <motion.div
        className="hidden md:block"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <nav className="w-20 h-screen text-white fixed left-0 top-0 flex flex-col items-center justify-center z-30 gap-5 bg-gray-900 md:bg-transparent">
          {sidebarItems.map((item) => {
            const isActive = activeSection === item.name;
            const linkClasses = `flex flex-col items-center justify-center p-2 transition-all duration-200 ${
              isActive ? "scale-105" : "hover:text-sky-400 hover:scale-105"
            }`;
            const iconClasses = `w-5 h-5 mb-1 ${
              isActive ? "scale-110 text-sky-400" : "text-gray-400"
            }`;
            const textClasses = `text-xs ${
              isActive ? "text-sky-400" : "text-gray-400"
            }`;

            return (
              <div key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onItemClick(item);
                  }}
                  className={linkClasses}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon className={iconClasses} />
                  <span className={textClasses}>{item.name}</span>
                </a>
              </div>
            );
          })}
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;
