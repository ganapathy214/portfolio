import React from "react";
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";
import Template3 from "../templates/Template3";
import Template4 from "../templates/Template4";
import Template5 from "../templates/Template5";
import Template6 from "../templates/Template6";
import { usePortfolio } from "../context/PortfolioContext";
import Particles from "../components/common/Particles";
import { getLightShade } from "../utils/color";

export default function Portfolio() {
  const { selectedTemplate, particlesStyle, primaryColor, themeMode } = usePortfolio();

  const isDark = themeMode === "dark";
  const bgMain = isDark ? "#060b13" : "#f8fafc";
  
  // Calculate a light shade of the primary accent color
  const lightAccentColor = getLightShade(primaryColor || "#00D5D5", 0.65);

  const renderTemplate = () => {
    if (selectedTemplate === "template-2") return <Template2 />;
    if (selectedTemplate === "template-3") return <Template3 />;
    if (selectedTemplate === "template-4") return <Template4 />;
    if (selectedTemplate === "template-5") return <Template5 />;
    if (selectedTemplate === "template-6") return <Template6 />;
    return <Template1 />;
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{
        backgroundColor: bgMain,
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Global Background Particles layered at z-1 on top of parent background */}
      {particlesStyle !== "none" && (
        <div 
          className="fixed inset-0 w-full h-full z-1 pointer-events-none"
          style={{ opacity: themeMode === "light" ? 0.5 : 0.7 }}
        >
          <Particles
            key={particlesStyle + primaryColor}
            particleColors={[primaryColor || "#00D5D5", lightAccentColor]}
            particleCount={particlesStyle === "minimal" ? 25 : 65}
            particleSpread={particlesStyle === "minimal" ? 14 : 10}
            speed={particlesStyle === "minimal" ? 0.015 : 0.03}
            particleBaseSize={particlesStyle === "minimal" ? 45 : 65}
            alphaParticles={true}
            moveParticlesOnHover={particlesStyle === "interactive"}
            particleHoverFactor={particlesStyle === "interactive" ? 2.5 : 1}
            disableRotation={false}
          />
        </div>
      )}

      {/* Main Template Content layered at z-10 on top of particles */}
      <div className="relative z-10 w-full min-h-screen">
        {renderTemplate()}
      </div>
    </div>
  );
}
