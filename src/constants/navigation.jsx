import {
  HiBriefcase,
  HiCodeBracket,
  HiCog,
  HiEnvelope,
  HiIdentification,
  HiRocketLaunch,
  HiSquares2X2,
  HiChatBubbleLeftRight,
  HiBookOpen,
  HiQuestionMarkCircle,
  HiAcademicCap,
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
  { name: "Home",          href: "#home",          icon: HiSquares2X2 },
  { name: "About",         href: "#about",         icon: HiIdentification },
  { name: "Services",      href: "#services",      icon: HiBriefcase },
  { name: "Skills",        href: "#skills",        icon: HiCog },
  { name: "Projects",      href: "#projects",      icon: HiCodeBracket },
  { name: "Certification", href: "#certification", icon: GrCertificate },
  { name: "Testimonials",  href: "#testimonials",  icon: HiChatBubbleLeftRight },
  { name: "Experience",    href: "#experience",    icon: HiRocketLaunch },
  { name: "Education",     href: "#education",     icon: HiAcademicCap },
  { name: "Blogs",         href: "#blogs",         icon: HiBookOpen },
  { name: "Faq",           href: "#faq",           icon: HiQuestionMarkCircle },
  { name: "Contact",       href: "#contact",       icon: HiEnvelope },
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
  Home:          "Home | Developer Portfolio",
  About:         "About Me | Professional Background",
  Services:      "My Services | What I Offer",
  Skills:        "Skills & Expertise | Tech Stack",
  Projects:      "Featured Projects | Portfolio",
  Certification: "Certifications & Achievements",
  Testimonials:  "Testimonials & Client Feedback",
  Experience:    "Professional Experience | Career History",
  Education:     "Education & Academic Background",
  Blogs:         "Technical Publications & Blogs",
  Faq:           "Frequently Asked Questions",
  Contact:       "Contact & Collaboration",
};

export const PAGE_DESCRIPTIONS = {
  Home:          "Welcome to my professional portfolio.",
  About:         "Learn about my background and expertise.",
  Services:      "Explore the professional services I offer.",
  Skills:        "Discover my core technical competencies.",
  Projects:      "Explore my featured full-stack projects.",
  Certification: "View my professional credentials and certifications.",
  Testimonials:  "Read reviews from clients and collaborators.",
  Experience:    "Track my professional experience timeline and career milestones.",
  Education:     "View my academic background and qualifications.",
  Blogs:         "Read technical articles and tutorials.",
  Faq:           "Find answers to frequently asked questions.",
  Contact:       "Get in touch for contract development or consulting.",
};

export const SECTION_NUMBERS = {
  about:         "01",
  skills:        "02",
  services:      "03",
  projects:      "04",
  experience:    "05",
  education:     "06",
  certification: "07",
  contact:       "08",
};

export const HIGHLIGHTS = [
  { label: "Specialization", value: "React · Next.js · React Native" },
  { label: "Cloud", value: "AWS · Serverless · DevOps" },
  { label: "Location", value: "India · Remote Ready" },
];

export const INPUT_CLASS =
  "w-full border px-4 py-3 text-xs sm:text-sm text-white placeholder-stone-600 outline-none transition-all duration-300 font-medium"
  + " focus:border-primary focus:shadow-[0_0_0_1px_rgba(var(--primary-rgb),0.2)]";


