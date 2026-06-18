import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SERVICES_DATA, skills as defaultSkills, skillCategories as defaultSkillCategories, projects as defaultProjects, certifications as defaultCertifications, timelineData as defaultTimelineData, summaryStats as defaultSummaryStats, CONTACT_INFO as defaultContactInfo, PAGE_TITLES as defaultPageTitles, PAGE_DESCRIPTIONS as defaultPageDescriptions, DEFAULT_ABOUT, DEFAULT_PRIMARY_COLOR, DEFAULT_ROLES, DEFAULT_DESCRIPTION, DEFAULT_ORBITING_STACKS, defaultTestimonials, defaultBlogs, defaultFaqs } from "./constants";
import { getContrastColor } from "./utils/color";
import PageLoader from "./components/common/PageLoader";

const Portfolio = React.lazy(() => import("./pages/Portfolio"));
const Setitings = React.lazy(() => import("./pages/Setitings"));

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
  
  // Apply dynamic button contrast color
  const contrast = getContrastColor(color);
  document.documentElement.style.setProperty("--primary-contrast", contrast);
};

export default function App() {
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_PRIMARY_COLOR);
  const [roles, setRoles] = useState(DEFAULT_ROLES);
  const [description, setDescription] = useState(DEFAULT_DESCRIPTION);
  const [centerSvg, setCenterSvg] = useState("");
  const [orbitingStacks, setOrbitingStacks] = useState(DEFAULT_ORBITING_STACKS);
  const [about, setAbout] = useState(DEFAULT_ABOUT);
  const [servicesSubtitle, setServicesSubtitle] = useState(
    "High-performance, scalable, and secure software development solutions tailored to meet business objectives and deliver outstanding user experiences."
  );
  const [servicesData, setServicesData] = useState(SERVICES_DATA);
  const [skills, setSkills] = useState(defaultSkills);
  const [skillCategories, setSkillCategories] = useState(defaultSkillCategories);
  const [projects, setProjects] = useState(defaultProjects);
  const [certifications, setCertifications] = useState(defaultCertifications);
  const [timelineData, setTimelineData] = useState(defaultTimelineData);
  const [summaryStats, setSummaryStats] = useState(defaultSummaryStats);
  const [contactInfo, setContactInfo] = useState(defaultContactInfo);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [blogs, setBlogs] = useState(defaultBlogs);
  const [faqs, setFaqs] = useState(defaultFaqs);
  const [themeMode, setThemeMode] = useState("dark");
  const [selectedTemplate, setSelectedTemplate] = useState("template-1");
  const [pageTitles, setPageTitles] = useState(defaultPageTitles);
  const [pageDescriptions, setPageDescriptions] = useState(defaultPageDescriptions);
  const [sectionVisibility, setSectionVisibility] = useState({
    Home: true,
    About: true,
    Services: true,
    Skills: true,
    Projects: true,
    Certification: true,
    Testimonials: true,
    Journey: true,
    Blogs: true,
    Faq: true,
    Contact: true
  });
  const [sectionTitles, setSectionTitles] = useState({
    About: "Who am I ?",
    Services: "What I Offer ?",
    Skills: "What I Know ?",
    Projects: "What I did ?",
    Certification: "What I achieved?",
    Testimonials: "What clients say?",
    Journey: "What I've done ?",
    Blogs: "My Publications & Blogs",
    Faq: "Frequently Asked Questions",
    Contact: "Where to find me ?"
  });
  
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

  useEffect(() => {
    const fetchTheme = async () => {
      // Check if preview mode is active in the URL
      const searchParams = new URLSearchParams(window.location.search);
      const isPreview = searchParams.get("preview") === "true";
      if (isPreview) {
        const previewDataRaw = localStorage.getItem("portfolio_preview_config");
        if (previewDataRaw) {
          try {
            const data = JSON.parse(previewDataRaw);
            if (data.primaryColor) {
              setPrimaryColor(data.primaryColor);
              applyThemeColor(data.primaryColor);
            }
            if (data.roles) setRoles(data.roles);
            if (data.description) setDescription(data.description);
            if (data.centerSvg) setCenterSvg(data.centerSvg);
            if (data.orbitingStacks) setOrbitingStacks(data.orbitingStacks);
            if (data.about) setAbout(data.about);
            if (data.servicesSubtitle) setServicesSubtitle(data.servicesSubtitle);
            if (data.servicesData) setServicesData(data.servicesData);
            if (data.skills) setSkills(data.skills);
            if (data.skillCategories) setSkillCategories(data.skillCategories);
            if (data.projects) setProjects(data.projects);
            if (data.certifications) setCertifications(data.certifications);
            if (data.timelineData) setTimelineData(data.timelineData);
            if (data.summaryStats) setSummaryStats(data.summaryStats);
            if (data.contactInfo) setContactInfo(data.contactInfo);
            if (data.themeMode) setThemeMode(data.themeMode);
            if (data.selectedTemplate) setSelectedTemplate(data.selectedTemplate);
            if (data.pageTitles) setPageTitles(data.pageTitles);
            if (data.pageDescriptions) setPageDescriptions(data.pageDescriptions);
            if (data.testimonials) setTestimonials(data.testimonials);
            if (data.blogs) setBlogs(data.blogs);
            if (data.faqs) setFaqs(data.faqs);
            if (data.sectionVisibility) setSectionVisibility(data.sectionVisibility);
            if (data.sectionTitles) setSectionTitles(data.sectionTitles);
            return; // Exit fetchTheme early in preview mode
          } catch (e) {
            console.error("Failed to parse preview configuration:", e);
          }
        }
      }

      // 1. Check local storage fallback first (instant load)
      const localColor = localStorage.getItem("portfolio_theme_color");
      if (localColor) {
        setPrimaryColor(localColor);
        applyThemeColor(localColor);
      }
      const localTestimonials = localStorage.getItem("portfolio_testimonials");
      if (localTestimonials) {
        try {
          setTestimonials(JSON.parse(localTestimonials));
        } catch (e) {
          console.warn("Failed to parse localTestimonials:", e);
        }
      }
      const localBlogs = localStorage.getItem("portfolio_blogs");
      if (localBlogs) {
        try {
          setBlogs(JSON.parse(localBlogs));
        } catch (e) {
          console.warn("Failed to parse localBlogs:", e);
        }
      }
      const localFaqs = localStorage.getItem("portfolio_faqs");
      if (localFaqs) {
        try {
          setFaqs(JSON.parse(localFaqs));
        } catch (e) {
          console.warn("Failed to parse localFaqs:", e);
        }
      }
      const localRoles = localStorage.getItem("portfolio_roles");
      if (localRoles) {
        try {
          setRoles(JSON.parse(localRoles));
        } catch (e) {
          console.warn("Failed to parse localRoles:", e);
        }
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
        try {
          setOrbitingStacks(JSON.parse(localStacks));
        } catch (e) {
          console.warn("Failed to parse localStacks:", e);
        }
      }
      const localAbout = localStorage.getItem("portfolio_about");
      if (localAbout) {
        try {
          setAbout(JSON.parse(localAbout));
        } catch (e) {
          console.warn("Failed to parse localAbout:", e);
        }
      }
      const localServicesSubtitle = localStorage.getItem("portfolio_services_subtitle");
      if (localServicesSubtitle) {
        setServicesSubtitle(localServicesSubtitle);
      }
      const localServicesData = localStorage.getItem("portfolio_services_data");
      if (localServicesData) {
        try {
          setServicesData(JSON.parse(localServicesData));
        } catch (e) {
          console.warn("Failed to parse localServicesData:", e);
        }
      }
      const localSkills = localStorage.getItem("portfolio_skills");
      if (localSkills) {
        try {
          setSkills(JSON.parse(localSkills));
        } catch (e) {
          console.warn("Failed to parse localSkills:", e);
        }
      }
      const localSkillCategories = localStorage.getItem("portfolio_skill_categories");
      if (localSkillCategories) {
        try {
          setSkillCategories(JSON.parse(localSkillCategories));
        } catch (e) {
          console.warn("Failed to parse localSkillCategories:", e);
        }
      }
      const localProjects = localStorage.getItem("portfolio_projects");
      if (localProjects) {
        try {
          setProjects(JSON.parse(localProjects));
        } catch (e) {
          console.warn("Failed to parse localProjects:", e);
        }
      }
      const localCertifications = localStorage.getItem("portfolio_certifications");
      if (localCertifications) {
        try {
          setCertifications(JSON.parse(localCertifications));
        } catch (e) {
          console.warn("Failed to parse localCertifications:", e);
        }
      }
      const localTimelineData = localStorage.getItem("portfolio_timeline_data");
      if (localTimelineData) {
        try {
          setTimelineData(JSON.parse(localTimelineData));
        } catch (e) {
          console.warn("Failed to parse localTimelineData:", e);
        }
      }
      const localSummaryStats = localStorage.getItem("portfolio_summary_stats");
      if (localSummaryStats) {
        try {
          setSummaryStats(JSON.parse(localSummaryStats));
        } catch (e) {
          console.warn("Failed to parse localSummaryStats:", e);
        }
      }
      const localContactInfo = localStorage.getItem("portfolio_contact_info");
      if (localContactInfo) {
        try {
          setContactInfo(JSON.parse(localContactInfo));
        } catch (e) {
          console.warn("Failed to parse localContactInfo:", e);
        }
      }
      const localThemeMode = localStorage.getItem("portfolio_theme_mode");
      if (localThemeMode) {
        setThemeMode(localThemeMode);
      }
      const localTemplate = localStorage.getItem("portfolio_selected_template");
      if (localTemplate) {
        setSelectedTemplate(localTemplate);
      }
      const localPageTitles = localStorage.getItem("portfolio_page_titles");
      if (localPageTitles) {
        try {
          setPageTitles(JSON.parse(localPageTitles));
        } catch (e) {
          console.warn("Failed to parse localPageTitles:", e);
        }
      }
      const localPageDescriptions = localStorage.getItem("portfolio_page_descriptions");
      if (localPageDescriptions) {
        try {
          setPageDescriptions(JSON.parse(localPageDescriptions));
        } catch (e) {
          console.warn("Failed to parse localPageDescriptions:", e);
        }
      }
      const localVisibility = localStorage.getItem("portfolio_section_visibility");
      if (localVisibility) {
        try {
          setSectionVisibility(JSON.parse(localVisibility));
        } catch (e) {
          console.warn("Failed to parse localVisibility:", e);
        }
      }
      const localTitles = localStorage.getItem("portfolio_section_titles");
      if (localTitles) {
        try {
          setSectionTitles(JSON.parse(localTitles));
        } catch (e) {
          console.warn("Failed to parse localTitles:", e);
        }
      }

      // 2. Fetch from DB
      try {
        const themeUrl = "/api/theme";
        
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
          if (data.servicesSubtitle) {
            setServicesSubtitle(data.servicesSubtitle);
            localStorage.setItem("portfolio_services_subtitle", data.servicesSubtitle);
          }
          if (data.servicesData) {
            setServicesData(data.servicesData);
            localStorage.setItem("portfolio_services_data", JSON.stringify(data.servicesData));
          }
          if (data.skills) {
            setSkills(data.skills);
            localStorage.setItem("portfolio_skills", JSON.stringify(data.skills));
          }
          if (data.skillCategories) {
            setSkillCategories(data.skillCategories);
            localStorage.setItem("portfolio_skill_categories", JSON.stringify(data.skillCategories));
          }
          if (data.projects) {
            setProjects(data.projects);
            localStorage.setItem("portfolio_projects", JSON.stringify(data.projects));
          }
           if (data.certifications) {
            setCertifications(data.certifications);
            localStorage.setItem("portfolio_certifications", JSON.stringify(data.certifications));
          }
          if (data.timelineData) {
            setTimelineData(data.timelineData);
            localStorage.setItem("portfolio_timeline_data", JSON.stringify(data.timelineData));
          }
          if (data.summaryStats) {
            setSummaryStats(data.summaryStats);
            localStorage.setItem("portfolio_summary_stats", JSON.stringify(data.summaryStats));
          }
          if (data.contactInfo) {
            setContactInfo(data.contactInfo);
            localStorage.setItem("portfolio_contact_info", JSON.stringify(data.contactInfo));
          }
          if (data.themeMode) {
            setThemeMode(data.themeMode);
            localStorage.setItem("portfolio_theme_mode", data.themeMode);
          }
          if (data.selectedTemplate) {
            setSelectedTemplate(data.selectedTemplate);
            localStorage.setItem("portfolio_selected_template", data.selectedTemplate);
          }
          if (data.pageTitles) {
            setPageTitles(data.pageTitles);
            localStorage.setItem("portfolio_page_titles", JSON.stringify(data.pageTitles));
          }
          if (data.pageDescriptions) {
            setPageDescriptions(data.pageDescriptions);
            localStorage.setItem("portfolio_page_descriptions", JSON.stringify(data.pageDescriptions));
          }
          if (data.testimonials) {
            setTestimonials(data.testimonials);
            localStorage.setItem("portfolio_testimonials", JSON.stringify(data.testimonials));
          }
          if (data.blogs) {
            setBlogs(data.blogs);
            localStorage.setItem("portfolio_blogs", JSON.stringify(data.blogs));
          }
          if (data.faqs) {
            setFaqs(data.faqs);
            localStorage.setItem("portfolio_faqs", JSON.stringify(data.faqs));
          }
          if (data.sectionVisibility) {
            setSectionVisibility(data.sectionVisibility);
            localStorage.setItem("portfolio_section_visibility", JSON.stringify(data.sectionVisibility));
          }
          if (data.sectionTitles) {
            setSectionTitles(data.sectionTitles);
            localStorage.setItem("portfolio_section_titles", JSON.stringify(data.sectionTitles));
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

  // Generate dynamic favicon matching primary color and developer's first initial
  useEffect(() => {
    const firstInitial = (about?.name || "G").charAt(0).toUpperCase();
    const fillCol = primaryColor || "#00D5D5";
    const contrast = getContrastColor(fillCol);
    
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" fill="${fillCol}" />
        <text x="16" y="22" font-family="'Google Sans', 'Segoe UI', Arial, sans-serif" font-size="16" font-weight="900" fill="${contrast}" text-anchor="middle">${firstInitial}</text>
      </svg>
    `.trim();
    
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml";
      document.head.appendChild(link);
    }
    link.href = url;
    
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [primaryColor, about?.name]);

  useEffect(() => {
    if (themeMode === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [themeMode]);

  return (
    <BrowserRouter basename={basename}>
      <React.Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={
              <Portfolio
                selectedTemplate={selectedTemplate}
                primaryColor={primaryColor}
                roles={roles}
                description={description}
                centerSvg={centerSvg}
                orbitingStacks={orbitingStacks}
                about={about}
                servicesSubtitle={servicesSubtitle}
                servicesData={servicesData}
                skills={skills}
                skillCategories={skillCategories}
                projects={projects}
                certifications={certifications}
                timelineData={timelineData}
                summaryStats={summaryStats}
                contactInfo={contactInfo}
                themeMode={themeMode}
                pageTitles={pageTitles}
                pageDescriptions={pageDescriptions}
                sectionVisibility={sectionVisibility}
                sectionTitles={sectionTitles}
                testimonials={testimonials}
                blogs={blogs}
                faqs={faqs}
              />
            }
          />
          <Route
            path="/setitings"
            element={
              <Setitings
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
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
                servicesSubtitle={servicesSubtitle}
                setServicesSubtitle={setServicesSubtitle}
                servicesData={servicesData}
                setServicesData={setServicesData}
                skills={skills}
                setSkills={setSkills}
                skillCategories={skillCategories}
                setSkillCategories={setSkillCategories}
                projects={projects}
                setProjects={setProjects}
                certifications={certifications}
                setCertifications={setCertifications}
                timelineData={timelineData}
                setTimelineData={setTimelineData}
                summaryStats={summaryStats}
                setSummaryStats={setSummaryStats}
                contactInfo={contactInfo}
                setContactInfo={setContactInfo}
                themeMode={themeMode}
                setThemeMode={setThemeMode}
                pageTitles={pageTitles}
                setPageTitles={setPageTitles}
                pageDescriptions={pageDescriptions}
                setPageDescriptions={setPageDescriptions}
                sectionVisibility={sectionVisibility}
                setSectionVisibility={setSectionVisibility}
                sectionTitles={sectionTitles}
                setSectionTitles={setSectionTitles}
                testimonials={testimonials}
                setTestimonials={setTestimonials}
                blogs={blogs}
                setBlogs={setBlogs}
                faqs={faqs}
                setFaqs={setFaqs}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Setitings
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
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
                servicesSubtitle={servicesSubtitle}
                setServicesSubtitle={setServicesSubtitle}
                servicesData={servicesData}
                setServicesData={setServicesData}
                skills={skills}
                setSkills={setSkills}
                skillCategories={skillCategories}
                setSkillCategories={setSkillCategories}
                projects={projects}
                setProjects={setProjects}
                certifications={certifications}
                setCertifications={setCertifications}
                timelineData={timelineData}
                setTimelineData={setTimelineData}
                summaryStats={summaryStats}
                setSummaryStats={setSummaryStats}
                contactInfo={contactInfo}
                setContactInfo={setContactInfo}
                themeMode={themeMode}
                setThemeMode={setThemeMode}
                pageTitles={pageTitles}
                setPageTitles={setPageTitles}
                pageDescriptions={pageDescriptions}
                setPageDescriptions={setPageDescriptions}
                sectionVisibility={sectionVisibility}
                setSectionVisibility={setSectionVisibility}
                sectionTitles={sectionTitles}
                setSectionTitles={setSectionTitles}
                testimonials={testimonials}
                setTestimonials={setTestimonials}
                blogs={blogs}
                setBlogs={setBlogs}
                faqs={faqs}
                setFaqs={setFaqs}
              />
            }
          />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}
