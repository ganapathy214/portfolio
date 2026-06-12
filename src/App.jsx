import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./Portfolio";
import Admin from "./Admin";

// Apply dynamic theme color to documentElement style variables
const applyThemeColor = (color) => {
  if (!color || !/^#[0-9A-F]{6}$/i.test(color)) return;
  document.documentElement.style.setProperty("--primary", color);
  
  // Parse HEX to RGB for opacity custom classes
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
    document.documentElement.style.setProperty("--primary-rgb", `${r}, ${g}, ${b}`);
  }
};

const DEFAULT_ABOUT = {
  name: "Ganapathy N",
  title: "Senior Frontend & Full Stack Developer",
  bio: "Senior Frontend & Full Stack Developer with 6+ years of experience specializing in React.js, Next.js, React Native, TypeScript, and modern JavaScript ecosystems. I design and build high-performance, accessible, and scalable enterprise web and mobile applications.",
  professionalTitles: [
    "Senior Frontend Developer",
    "Senior Full Stack Developer",
    "React & Next.js Specialist",
  ],
  stats: [
    { value: "6+", label: "Years Exp" },
    { value: "10+", label: "Certificates" },
    { value: "12+", label: "Projects" },
  ],
  highlights: [
    { label: "Specialization", value: "React · Next.js · React Native" },
    { label: "Cloud", value: "AWS · Serverless · DevOps" },
    { label: "Location", value: "India · Remote Ready" },
  ],
  socialLinks: [
    { href: "https://www.linkedin.com/in/gananata/", icon: "FaLinkedinIn", label: "LinkedIn" },
    { href: "https://github.com/ganapathy214", icon: "FaGithub", label: "Github" },
  ],
  resumeFileName: "Ganapathy_N_Resume.pdf",
};

export default function App() {
  const [primaryColor, setPrimaryColor] = useState("#00D5D5");
  const [roles, setRoles] = useState([
    "Senior Software Developer",
    "Full-Stack Engineer",
    "Cloud Architect",
    "Mobile App Developer",
    "System Designer"
  ]);
  const [description, setDescription] = useState(
    "Designing and engineering high-performance web systems, cross-platform mobile apps, and scalable serverless cloud architectures with 6+ years of expertise."
  );
  const [centerSvg, setCenterSvg] = useState("");
  const [orbitingStacks, setOrbitingStacks] = useState([
    { label: "React Native", type: "primary" },
    { label: "React.js", type: "primary" },
    { label: "Node.js", type: "outline" },
    { label: "Next.js", type: "primary" },
    { label: "AWS Cloud", type: "primary" },
    { label: "TypeScript", type: "outline" }
  ]);
  const [about, setAbout] = useState(DEFAULT_ABOUT);
  
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

  useEffect(() => {
    const fetchTheme = async () => {
      // 1. Check local storage fallback first (instant load)
      const localColor = localStorage.getItem("portfolio_theme_color");
      if (localColor) {
        setPrimaryColor(localColor);
        applyThemeColor(localColor);
      }
      const localRoles = localStorage.getItem("portfolio_roles");
      if (localRoles) {
        try { setRoles(JSON.parse(localRoles)); } catch (e) {}
      }
      const localDescription = localStorage.getItem("portfolio_description");
      if (localDescription) {
        setDescription(localDescription);
      }
      const localSvg = localStorage.getItem("portfolio_center_svg");
      if (localSvg) {
        setCenterSvg(localSvg);
      }
      const localStacks = localStorage.getItem("portfolio_orbiting_stacks");
      if (localStacks) {
        try { setOrbitingStacks(JSON.parse(localStacks)); } catch (e) {}
      }
      const localAbout = localStorage.getItem("portfolio_about");
      if (localAbout) {
        try { setAbout(JSON.parse(localAbout)); } catch (e) {}
      }

      // 2. Fetch from DB
      try {
        const isDev = import.meta.env.DEV;
        const themeUrl = isDev ? "/api/theme" : `${import.meta.env.BASE_URL}db.json`;
        
        const res = await fetch(themeUrl);
        if (res.ok) {
          const data = await res.json();
          if (data.primaryColor) {
            setPrimaryColor(data.primaryColor);
            applyThemeColor(data.primaryColor);
            localStorage.setItem("portfolio_theme_color", data.primaryColor);
          }
          if (data.roles) {
            setRoles(data.roles);
            localStorage.setItem("portfolio_roles", JSON.stringify(data.roles));
          }
          if (data.description) {
            setDescription(data.description);
            localStorage.setItem("portfolio_description", data.description);
          }
          if (data.centerSvg) {
            setCenterSvg(data.centerSvg);
            localStorage.setItem("portfolio_center_svg", data.centerSvg);
          }
          if (data.orbitingStacks) {
            setOrbitingStacks(data.orbitingStacks);
            localStorage.setItem("portfolio_orbiting_stacks", JSON.stringify(data.orbitingStacks));
          }
          if (data.about) {
            setAbout({ ...DEFAULT_ABOUT, ...data.about });
            localStorage.setItem("portfolio_about", JSON.stringify(data.about));
          }
        }
      } catch (err) {
        console.warn("Theme DB fetch failed, using local fallback:", err);
      }
    };

    fetchTheme();
  }, []);

  // Update DOM when state updates
  useEffect(() => {
    applyThemeColor(primaryColor);
  }, [primaryColor]);

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route
          path="/"
          element={
            <Portfolio
              primaryColor={primaryColor}
              roles={roles}
              description={description}
              centerSvg={centerSvg}
              orbitingStacks={orbitingStacks}
              about={about}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <Admin
              primaryColor={primaryColor}
              setPrimaryColor={setPrimaryColor}
              roles={roles}
              setRoles={setRoles}
              description={description}
              setDescription={setDescription}
              centerSvg={centerSvg}
              setCenterSvg={setCenterSvg}
              orbitingStacks={orbitingStacks}
              setOrbitingStacks={setOrbitingStacks}
              about={about}
              setAbout={setAbout}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
