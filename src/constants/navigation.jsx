import {
  HiBriefcase,
  HiCodeBracket,
  HiCog,
  HiEnvelope,
  HiIdentification,
  HiRocketLaunch,
  HiSquares2X2,
} from "react-icons/hi2";
import { GrCertificate } from "react-icons/gr";

export const framerVariants = [
  //about
  {
    key: "containerVariant",
    value: {
      hidden: { opacity: 0, y: 80 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          ease: "easeOut",
          duration: 0.8,
          staggerChildren: 0.25,
        },
      },
    },
  },
  {
    key: "itemVariant",
    value: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          ease: "easeOut",
          duration: 0.6,
        },
      },
    },
  },
  //skills
  {
    key: "fadeUp",
    value: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
          staggerChildren: 0.25,
        },
      },
    },
  },
  {
    key: "fadeIn",
    value: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.8 },
      },
    },
  },
  //projects
  {
    key: "fadeRight",
    value: {
      hidden: { opacity: 0, x: 30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4 },
      },
    },
  },
];

export const sidebarItems = [
  { name: "Home", href: "#home", icon: HiSquares2X2 },
  { name: "About", href: "#about", icon: HiIdentification },
  { name: "Services", href: "#services", icon: HiBriefcase },
  { name: "Skills", href: "#skills", icon: HiCog },
  { name: "Projects", href: "#projects", icon: HiCodeBracket },
  { name: "Certification", href: "#certification", icon: GrCertificate },
  { name: "Journey", href: "#journey", icon: HiRocketLaunch },
  { name: "Contact", href: "#contact", icon: HiEnvelope },
];

export const PROFESSIONAL_TITLES = [
  "Senior Frontend Developer",
  "Senior Full Stack Developer",
  "React & Next.js Specialist",
];

export const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/gananata/",
    icon: "FaLinkedinIn",
    label: "LinkedIn",
    containerClass: "containerThree",
  },
  {
    href: "https://github.com/ganapathy214",
    icon: "FaGithub",
    label: "Github",
    containerClass: "containerFive",
  },
];

export const PAGE_TITLES = {
  Home: "Home | Ganapathy N | Senior Software Developer",
  About: "About Me | Ganapathy N | Senior Full Stack Developer",
  Services: "My Services | Ganapathy N | Senior Software Developer",
  Skills: "Skills & Expertise | Ganapathy N | Senior Frontend Developer",
  Projects: "Featured Portfolio Projects | Ganapathy N",
  Certification: "Verified Certifications & Achievements | Ganapathy N",
  Journey: "Professional Journey & Timeline | Ganapathy N",
  Contact: "Contact & Collaboration | Ganapathy N",
};

export const PAGE_DESCRIPTIONS = {
  Home: "Welcome to the professional portfolio of Ganapathy N, a Senior Frontend & Full Stack Developer with 6+ years of experience in React, Next.js, React Native, and AWS cloud architecture.",
  About: "Learn about Ganapathy N, a Senior Software Developer with 6+ years of experience building high-performance, accessible, and scalable web and mobile applications.",
  Services: "Explore the professional services offered by Ganapathy N, including web & mobile development, API integration, code deployment, UI/UX, test automation, and cloud architecture.",
  Skills: "Discover the core technical competencies, frameworks, testing automation tools, and cloud platforms utilized by Ganapathy N.",
  Projects: "Explore featured full-stack, frontend, and mobile projects delivered by Ganapathy N, including healthcare and maritime platforms.",
  Certification: "View professional credentials, cloud certifications, and technical program completions achieved by Ganapathy N from IBM, Meta, Google, and Cisco.",
  Journey: "Track the professional experience timeline, academic background, and milestones in the career of Ganapathy N.",
  Contact: "Get in touch with Ganapathy N for contract development, consulting, or job opportunities in web and mobile applications.",
};

export const SECTION_NUMBERS = {
  about: "01",
  skills: "02",
  services: "03",
  projects: "04",
  journey: "05",
  certification: "06",
  contact: "07",
};

export const HIGHLIGHTS = [
  { label: "Specialization", value: "React · Next.js · React Native" },
  { label: "Cloud", value: "AWS · Serverless · DevOps" },
  { label: "Location", value: "India · Remote Ready" },
];

export const INPUT_CLASS =
  "w-full border px-4 py-3 text-xs sm:text-sm text-white placeholder-stone-600 outline-none transition-all duration-300 font-medium"
  + " focus:border-primary focus:shadow-[0_0_0_1px_rgba(0,213,213,0.2)]";


