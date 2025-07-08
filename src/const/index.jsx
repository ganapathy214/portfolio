// sidebar
import {
  HiBookOpen,
  HiCodeBracket,
  HiCog,
  HiEnvelope,
  HiIdentification,
  HiRocketLaunch,
  HiSquares2X2,
  HiUserCircle,
} from "react-icons/hi2";

import {
  FaCodeBranch,
  FaInstagram,
  FaLaptopCode,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

import { TbSettingsAutomation } from "react-icons/tb";

import BootstrapIcon from "../assets/stacks/basics/bootstrap.svg";
import CssIcon from "../assets/stacks/basics/css.svg";
import HtmlIcon from "../assets/stacks/basics/html.svg";
import JavascriptIcon from "../assets/stacks/basics/js.svg";
import ScssIcon from "../assets/stacks/basics/scss.svg";
import TypescriptIcon from "../assets/stacks/basics/ts.svg";

import NextIcon from "../assets/stacks/fe/nextjs.svg";
import ReactNativeIcon from "../assets/stacks/fe/react-native.svg";
import ReactNativeRouterIcon from "../assets/stacks/fe/react-navigation.svg";
import ReactRouterIcon from "../assets/stacks/fe/react-router.svg";
import ReactIcon from "../assets/stacks/fe/react.svg";
import ReduxIcon from "../assets/stacks/fe/redux.svg";
import ViteIcon from "../assets/stacks/fe/vite.svg";

import AntDesignIcon from "../assets/stacks/css_frameworks/antd.svg";
import ChakraIcon from "../assets/stacks/css_frameworks/chakra.svg";
import MaterialIcon from "../assets/stacks/css_frameworks/mui.svg";
import ReactBootstrapIcon from "../assets/stacks/css_frameworks/react-bootstarp.svg";
import ShadcnIcon from "../assets/stacks/css_frameworks/shadcn.svg";
import StyledComponentsIcon from "../assets/stacks/css_frameworks/styled-components.svg";
import TailwindIcon from "../assets/stacks/css_frameworks/tailwind.svg";

import ExpressIcon from "../assets/stacks/be/express.svg";
import MongodbIcon from "../assets/stacks/be/mongodb.svg";
import MysqlIcon from "../assets/stacks/be/mysql.svg";
import NodejsIcon from "../assets/stacks/be/nodejs.svg";
import PostgresqlIcon from "../assets/stacks/be/pgsql.svg";
import Sql from "../assets/stacks/be/sql.svg";

import AwsIcon from "../assets/stacks/cloud/aws.svg";
import FirebaseIcon from "../assets/stacks/cloud/firebase.svg";
import DigitaloceanIcon from "../assets/stacks/cloud/digitalocean.svg";

import AzureIcon from "../assets/stacks/version_control/azure.svg";
import BitbucketIcon from "../assets/stacks/version_control/bitbucket.svg";
import GitIcon from "../assets/stacks/version_control/git.svg";

import JestIcon from "../assets/stacks/testing/jest.svg";
import PlaywrightIcon from "../assets/stacks/testing/playwright.svg";

import bms from "../assets/project/bms.jpg";
import fms from "../assets/project/fms.jpg";
import lms from "../assets/project/lms.jpg";
import mms from "../assets/project/mms.jpg";
import network_security from "../assets/project/network_security.jpg";
import wlb from "../assets/project/wlb.png";
import wms from "../assets/project/wms.jpg";

import advancedreact from "../assets/certificate/advancedreact.png";
import aws_serverless from "../assets/certificate/aws_serverless.png";
import developing_back_end from "../assets/certificate/developing_back_end.png";
import google_project from "../assets/certificate/google_project.png";
import js_1 from "../assets/certificate/js_1.png";
import js_2 from "../assets/certificate/js_2.png";
import promt_engg from "../assets/certificate/promt_engg.png";
import react from "../assets/certificate/react.png";
import reactnative from "../assets/certificate/reactnative.png";
import version_control from "../assets/certificate/version_control.png";
import { GrCertificate } from "react-icons/gr";

export const framerVariants = [
  //aboout
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

// sidebar
export const sidebarItems = [
  { name: "Home", href: "#home", icon: HiSquares2X2 },
  { name: "About", href: "#about", icon: HiIdentification },
  // { name: "Summary", href: "#summary", icon: HiUserCircle },
  { name: "Skills", href: "#skills", icon: HiCog },
  { name: "Projects", href: "#projects", icon: HiCodeBracket },
  { name: "Certification", href: "#certification", icon: GrCertificate },
  // { name: "Testimonials", href: "#testimonials", icon: HiRocketLaunch },
  { name: "Journey", href: "#journey", icon: HiRocketLaunch },
  { name: "Contact", href: "#contact", icon: HiEnvelope },
];

// About
export const PROFESSIONAL_TITLES = [
  "Software Developer",
  "Fullstack JS Developer",
];

export const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/ganapathy-natarajan-300890248/",
    icon: "FaLinkedinIn",
    label: "LinkedIn",
  },
  // Add more if needed
];

//Skills

export const serviceList = [
  {
    id: 1,
    title: "Web & Mobile",
    description:
      "I build responsive, SEO-optimized web and mobile applications tailored for performance, accessibility, and user engagement.",
    icon: FaLaptopCode,
  },
  {
    id: 2,
    title: "API Integration",
    description:
      "Integrate secure, scalable APIs and databases to ensure seamless, reliable data flow and robust application connectivity.",
    icon: FaCodeBranch,
  },
  {
    id: 3,
    title: "Code Deployment",
    description:
      "Implement efficient Git workflows and automated deployment pipelines for faster, safer, and more reliable code delivery.",
    icon: FaCodeBranch,
  },
  {
    id: 4,
    title: "Test Automation",
    description:
      "Deliver robust, scalable automated testing solutions to ensure software reliability, reduce bugs, and accelerate development cycles.",
    icon: TbSettingsAutomation,
  },
];

export const skills = [
  { name: "HTML", icon: HtmlIcon },
  { name: "CSS", icon: CssIcon },
  { name: "JavaScript", icon: JavascriptIcon },
  { name: "TypeScript", icon: TypescriptIcon },
  { name: "Bootstrap", icon: BootstrapIcon },

  { name: "React", icon: ReactIcon },
  // { name: "React Router", icon: ReactRouterIcon },
  // { name: "Redux", icon: ReduxIcon },
  { name: "Next.js", icon: NextIcon },
  { name: "React Native", icon: ReactNativeIcon },
  // { name: "React Navigation", icon: ReactNativeRouterIcon },
  { name: "Vite", icon: ViteIcon },
  { name: "Ant Design", icon: AntDesignIcon },
  { name: "Chakra UI", icon: ChakraIcon },
  { name: "Material UI", icon: MaterialIcon },
  { name: "React Bootstrap", icon: ReactBootstrapIcon },
  { name: "SCSS", icon: ScssIcon },
  { name: "Styled Components", icon: StyledComponentsIcon },
  { name: "Shadcn", icon: ShadcnIcon },
  { name: "Tailwind", icon: TailwindIcon },
  { name: "Jest", icon: JestIcon },
  { name: "Playwright", icon: PlaywrightIcon },
  { name: "Node.js", icon: NodejsIcon },
  { name: "Express", icon: ExpressIcon },
  { name: "MongoDB", icon: MongodbIcon },
  { name: "MySQL", icon: MysqlIcon },
  { name: "PostgreSQL", icon: PostgresqlIcon },
  { name: "SQL", icon: Sql },
  { name: "Git", icon: GitIcon },
  { name: "Bitbucket", icon: BitbucketIcon },
  { name: "Azure", icon: AzureIcon },
  { name: "AWS", icon: AwsIcon },
  { name: "Digitalocean", icon: DigitaloceanIcon },
  { name: "Firebase", icon: FirebaseIcon },
];

export const skillCategories = [
  {
    id: "frontend",
    label: "Frontend Development",
    content: (
      <div className="h-75 w-full sm:w-[400px] md:w-[600px] lg:w-[700px] max-w-full transition">
        <div className="flex flex-wrap gap-2 mb-4">
          {skills
            .filter((s) =>
              [
                "HTML",
                "CSS",
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "React Native",
              ].includes(s.name)
            )
            .map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white rounded-full border border-sky-400"
              >
                <img src={skill.icon} alt={skill.name} className="w-4 h-4" />
                <span className="text-sm font-medium">{skill.name}</span>
              </div>
            ))}
        </div>
        <ul className="list-disc pl-6 space-y-2 text-white text-wrap">
          <li>
            <strong className="text-sky-400">Performance Optimization:</strong>{" "}
            Lighthouse audits, lazy loading, code splitting
          </li>
          <li>
            <strong className="text-sky-400">Scalable UI Systems:</strong>{" "}
            Component-driven architecture using design systems
          </li>
          <li>
            <strong className="text-sky-400">Accessibility (a11y):</strong>{" "}
            WCAG-compliant, screen-reader & keyboard support
          </li>
          <li>
            <strong className="text-sky-400">Responsive Design:</strong>{" "}
            Mobile-first, cross-device consistency
          </li>
          <li>
            <strong className="text-sky-400">State Management:</strong> Redux,
            Context API, Zustand
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "backend",
    label: "Backend Development",
    content: (
      <div className="h-75 w-full sm:w-[400px] md:w-[600px] lg:w-[700px] max-w-full transition">
        <div className="flex flex-wrap gap-2 mb-4">
          {skills
            .filter((s) =>
              [
                "Node.js",
                "TypeScript",
                "Express",
                "Next.js",
                "MongoDB",
                "MySQL",
                "PostgreSQL",
                "SQL",
              ].includes(s.name)
            )
            .map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white rounded-full border border-sky-400"
              >
                <img src={skill.icon} alt={skill.name} className="w-4 h-4" />
                <span className="text-sm font-medium">{skill.name}</span>
              </div>
            ))}
        </div>
        <ul className="list-disc pl-6 space-y-2 text-white text-base">
          <li>
            <strong className="text-sky-400">API Design:</strong> RESTful and
            GraphQL, versioned architecture
          </li>
          <li>
            <strong className="text-sky-400">Authentication:</strong> OAuth2,
            JWT, Google IAP, OpenID Connect
          </li>
          <li>
            <strong className="text-sky-400">Scalability:</strong>{" "}
            Microservices, load balancing, rate limiting
          </li>
          <li>
            <strong className="text-sky-400">Security:</strong> Input
            validation, token encryption, CORS
          </li>
          <li>
            <strong className="text-sky-400">Performance:</strong> Caching,
            profiling, optimized queries
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "database",
    label: "Database & Data Management",
    content: (
      <div className="h-75 w-full sm:w-[400px] md:w-[600px] lg:w-[700px] max-w-full transition">
        <div className="flex flex-wrap gap-2 mb-4">
          {skills
            .filter((s) =>
              ["MongoDB", "MySQL", "PostgreSQL", "SQL"].includes(s.name)
            )
            .map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white rounded-full border border-sky-400"
              >
                <img src={skill.icon} alt={skill.name} className="w-4 h-4" />
                <span className="text-sm font-medium">{skill.name}</span>
              </div>
            ))}
        </div>
        <ul className="list-disc pl-6 space-y-2 text-white text-base">
          <li>
            <strong className="text-sky-400">Schema Design:</strong>{" "}
            Normalization, relationships, indexing
          </li>
          <li>
            <strong className="text-sky-400">Query Optimization:</strong> Index
            tuning, explain plans
          </li>
          <li>
            <strong className="text-sky-400">ORM Tools:</strong> Prisma,
            Mongoose, Sequelize, Knex.js
          </li>
          <li>
            <strong className="text-sky-400">Backup & Recovery:</strong>{" "}
            Snapshots, replication, failover handling
          </li>
          <li>
            <strong className="text-sky-400">Monitoring:</strong> Slow query
            logs, profiling tools
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    content: (
      <div className="h-75 w-full sm:w-[400px] md:w-[600px] lg:w-[700px] max-w-full transition">
        <div className="flex flex-wrap gap-2 mb-4">
          {skills
            .filter((s) => ["AWS", "Firebase", "Digitalocean"].includes(s.name))
            .map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white rounded-full border border-sky-400"
              >
                <img src={skill.icon} alt={skill.name} className="w-4 h-4" />
                <span className="text-sm font-medium">{skill.name}</span>
              </div>
            ))}
        </div>
        <ul className="list-disc pl-6 space-y-2 text-white text-base">
          <li>
            <strong className="text-sky-400">AWS Services:</strong> EC2, Lambda,
            RDS, CloudWatch, S3
          </li>
          <li>
            <strong className="text-sky-400">Firebase Stack:</strong> Auth,
            Firestore, Cloud Functions, FCM
          </li>
          <li>
            <strong className="text-sky-400">Deployment:</strong> CI/CD
            pipelines with GitHub/Bitbucket
          </li>
          <li>
            <strong className="text-sky-400">Monitoring:</strong> CloudWatch,
            Crashlytics, uptime alerts
          </li>
          <li>
            <strong className="text-sky-400">IaC:</strong> Terraform, AWS CDK
            for reproducible infra
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "tools",
    label: "Version Control & Tooling",
    content: (
      <div className="h-75 w-full sm:w-[400px] md:w-[600px] lg:w-[700px] max-w-full transition">
        <div className="flex flex-wrap gap-2 mb-4">
          {skills
            .filter((s) => ["Git", "Bitbucket", "Azure"].includes(s.name))
            .map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white rounded-full border border-sky-400"
              >
                <img src={skill.icon} alt={skill.name} className="w-4 h-4" />
                <span className="text-sm font-medium">{skill.name}</span>
              </div>
            ))}
        </div>
        <ul className="list-disc pl-6 space-y-2 text-white text-base">
          <li>
            <strong className="text-sky-400">VCS:</strong> Git workflows, PR
            reviews, merge safety
          </li>
          <li>
            <strong className="text-sky-400">Dev Environments:</strong> VS Code,
            Cursor
          </li>
          <li>
            <strong className="text-sky-400">Tooling:</strong> ESLint, Prettier,
            Husky, Commitlint
          </li>
          <li>
            <strong className="text-sky-400">Package Managers:</strong> NPM,
            Yarn, PNPM
          </li>
          <li>
            <strong className="text-sky-400">Build Tools:</strong> Vite,
            Webpack, Babel
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "testing",
    label: "Automation Testing",
    content: (
      <div className="h-75 w-full sm:w-[400px] md:w-[600px] lg:w-[700px] max-w-full transition">
        <div className="flex flex-wrap gap-2 mb-4">
          {skills
            .filter((s) => ["Jest", "Playwright"].includes(s.name))
            .map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white rounded-full border border-sky-400"
              >
                <img src={skill.icon} alt={skill.name} className="w-4 h-4" />
                <span className="text-sm font-medium">{skill.name}</span>
              </div>
            ))}
        </div>
        <ul className="list-disc pl-6 space-y-2 text-white text-base">
          <li>
            <strong className="text-sky-400">Test Types:</strong> Unit, E2E,
            integration, regression
          </li>
          <li>
            <strong className="text-sky-400">Tools Used:</strong> Jest,
            Playwright, BrowserStack
          </li>
          <li>
            <strong className="text-sky-400">CI Testing:</strong> Coverage
            reports in pipelines
          </li>
          <li>
            <strong className="text-sky-400">Debugging:</strong> Chrome
            DevTools, Postman, Swagger UI
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "team-leadership",
    label: "Team Leadership",
    content: (
      <div className="h-75 w-full sm:w-[400px] md:w-[600px] lg:w-[700px] max-w-full transition">
        <ul className="list-disc pl-6 space-y-2 text-white text-base">
          <li>
            <strong className="text-sky-400">Leadership Roles:</strong> Tech
            lead, senior dev in product squads
          </li>
          <li>
            <strong className="text-sky-400">Team Coaching:</strong> 1:1
            mentoring, onboarding, skills development
          </li>
          <li>
            <strong className="text-sky-400">Code Quality:</strong> Review
            processes, codebase hygiene
          </li>
          <li>
            <strong className="text-sky-400">
              Cross-functional Alignment:
            </strong>{" "}
            Syncing frontend, backend, QA, design
          </li>
          <li>
            <strong className="text-sky-400">Stakeholder Comms:</strong>{" "}
            Updates, demos, release planning
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "agile-project-management",
    label: "Agile & Project Management",
    content: (
      <div className="h-75 w-full sm:w-[400px] md:w-[600px] lg:w-[700px] max-w-full transition">
        <ul className="list-disc pl-6 space-y-2 text-white text-base">
          <li>
            <strong className="text-sky-400">Agile Methods:</strong> Scrum,
            Kanban, hybrid sprints
          </li>
          <li>
            <strong className="text-sky-400">Planning:</strong> Epics, story
            points, ClickUp & Jira
          </li>
          <li>
            <strong className="text-sky-400">Backlog Management:</strong>{" "}
            Feature grooming, stakeholder sync
          </li>
          <li>
            <strong className="text-sky-400">Risk Handling:</strong> Blocker
            identification, timeline control
          </li>
          <li>
            <strong className="text-sky-400">Releases:</strong> Versioning, QA,
            deployment pipeline ownership
          </li>
        </ul>
      </div>
    ),
  },
];

// Projects
export const projects = [
  {
    title: "Maritime Vessels and Machinery Services",
    synopsis:
      "A web-based internal tool for managing the machinery lifecycle of maritime vessels, including servicing schedules, component tracking, and documentation. Designed to support ship management companies, the application enables efficient maintenance logging, spare part ordering, and operational reporting. I developed the frontend using React and Tailwind, introducing a clean tab-based UI and searchable tables. Worked closely with marine engineers to understand workflows and translated them into actionable UI components. Integrated PDF export, dynamic service timelines, and access-level management. This platform helped reduce machinery downtime and streamlined audits for vessel maintenance records.",
    image: mms,
    category: "Frontend (Web)",
    duration: "Mar 25 - Current",
    role: "Lead Frontend Developer",
    client: "England",
    teamSize: 2,
    stacks: ["React", "Material UI", "Swagger"],
    responsibilities: [
      "Built internal tools for asset and service management.",
      "Implemented reporting features for ship machinery.",
      "Worked closely with stakeholders to gather requirements.",
      "Maintained and updated the platform for new features.",
    ],
  },
  {
    title: "Health and Wellness Platform",
    synopsis:
      "A data-driven health dashboard that offers personalized tracking for users focusing on fitness, mental well-being, and lifestyle habits. The platform consolidates inputs from wearables, questionnaires, and user logs into intuitive charts and progress reports. I built the entire UI layer using React, integrated multiple third-party APIs, and implemented a modular component system for personalization. The platform includes reminders, trend analysis, and gamification elements. Through continuous collaboration with UX designers and stakeholders, we ensured maximum user engagement. This product significantly improved user adherence to health plans and received positive feedback from early adopters in beta trials.",
    image: wms,
    category: "Full Stack (Web) + Automation",
    duration: "Feb 25 - Current",
    role: "Team Lead",
    client: "India",
    teamSize: 3,
    stacks: ["React", "Next JS", "Node.js", "Express.js", "MongoDB"],
    responsibilities: [
      "Developed personalized dashboards for health tracking.",
      "Implemented monitoring features for user wellness data.",
      "Collaborated with designers to enhance user experience.",
      "Integrated third-party APIs for health data synchronization.",
    ],
  },
  {
    title: "Banking and Financial Services Platform",
    synopsis:
      "A secure financial services dashboard catering to banking institutions for managing customers, transactions, and compliance workflows. I developed user-centric dashboards for KYC, customer risk profiles, and automated alerts for suspicious transactions. My role focused on building reusable frontend modules with React, ensuring compliance with accessibility standards and integrating automation tools. I closely worked with backend teams to consume secure APIs and implemented role-based access throughout the system. The platform reduced manual data handling, improved audit readiness, and supported financial advisors in providing more personalized insights.",
    image: bms,
    category: "Frontend (Web) + Automation",
    duration: "Sep 24 - Feb 25",
    role: "Frontend Developer",
    client: "USA",
    teamSize: 4,
    stacks: ["React", "Material", "Jest"],
    responsibilities: [
      "Developed dashboards for customer and transaction management.",
      "Implemented automation tools to streamline financial operations.",
      "Collaborated with cross-functional teams for feature delivery.",
      "Ensured compliance with security and data privacy standards.",
    ],
  },
  {
    title: "AI-powered Cybersecurity Platform",
    synopsis:
      "A cutting-edge LLM-driven cybersecurity solution designed for real-time detection, log enrichment, and intelligent alerting of malicious threats. The frontend offers intuitive dashboards for SOC analysts to visualize anomalies, investigate incidents, and act on alerts. I built the UI with React, Tailwind, and TypeScript, incorporating advanced filtering, real-time stream views, and audit trails. Collaborated with DevSecOps and LLM teams to visualize enriched logs and ensure UI scalability under data-intensive workloads. Delivered critical modules for log analytics and integrated them with secure cloud storage. The platform enhanced threat triage speed and reduced alert fatigue for enterprise clients.",
    image: network_security,
    category: "Frontend (Web)",
    duration: "Jun 24 - Sep 24",
    role: "Frontend Developer",
    client: "India",
    teamSize: 5,
    stacks: ["Next.JS", "shadcn/ui"],
    responsibilities: [
      "Developed a responsive UI using React.js, Tailwind CSS, and TypeScript.",
      "Implemented log enrichment, filtering, and cloud storage.",
      "Integrated and trained LLM models to detect security threats.",
      "Optimized log processing and ensured scalable architecture.",
      "Mentored frontend team members and led feature delivery.",
    ],
  },
  {
    title: "GenAI-powered Insurance Automation Platform",
    synopsis:
      "An advanced AI-driven insurance platform focused on automating repetitive workflows such as policy data extraction, form recognition, and decision intelligence. Leveraging GenAI and NLP, it empowers insurers, brokers, and MGAs to streamline underwriting, claims, and reporting. I contributed to building a highly modular frontend architecture using React and Tailwind, integrating seamlessly with custom-built AI APIs. Features included visual policy viewers, approval workflows, and error reduction modules. Collaborated with AI/ML teams on UI feedback loops. This product accelerated claims processing by 50% and eliminated over 60% of manual form errors, improving both accuracy and operational efficiency.",
    image: fms,
    category: "Full Stack (Web)",
    duration: "Sep 23 - Oct 24",
    role: "Full Stack Developer",
    client: "London",
    teamSize: 6,
    stacks: ["React", "Bootstrap", "Material UI", "Node.js", "AWS"],
    responsibilities: [
      "Built components for automation of insurance workflows.",
      "Integrated AI-driven analysis tools for faster decisions.",
      "Managed reusable UI modules to scale across teams.",
      "Delegated and reviewed tasks for timely releases.",
      "Collaborated with product and data science teams.",
    ],
  },
  {
    title: "Fleet Management System (SAAS)",
    synopsis:
      "A full-stack fleet tracking SaaS platform built to support logistics and vehicle rental businesses in real-time operations. Key features included live GPS tracking, route optimization, vehicle maintenance alerts, and fleet performance dashboards. I implemented the frontend in React and Tailwind, ensuring high performance on both web and mobile devices. Collaborated with backend developers to integrate RESTful services and push notifications. I also built reusable components and introduced lazy loading to enhance performance. The platform helped reduce scheduling conflicts, enabled preventive maintenance alerts, and improved fleet uptime across partner operations.",
    image: fms,
    category: "Frontend (Web + Mobile)",
    duration: "Jun 23 - Aug 23",
    role: "Frontend Developer",
    client: "Australia",
    teamSize: 3,
    stacks: ["React", "React Native", "Ant Design"],
    responsibilities: [
      "Developed dashboards for real-time fleet tracking.",
      "Implemented scheduling and maintenance modules.",
      "Ensured cross-device compatibility.",
      "Optimized UI load performance and API sync.",
    ],
  },
  {
    title: "Learning Management System",
    synopsis:
      "A robust web-based LMS developed for an educational tech provider offering security training. The platform supports dynamic course management, multi-role access (admin, trainer, learner), and real-time assessment tracking. I led the frontend implementation using React and Tailwind, optimizing for responsiveness and accessibility. Features included interactive topologies, quiz modules, and role-specific dashboards. I collaborated with backend teams to integrate course APIs and deployed the system on AWS with CI/CD. My role also involved mentoring junior developers, overseeing UI consistency, and ensuring cross-browser compatibility. This solution streamlined e-learning for 500+ users and improved onboarding time for trainers by 30%.",
    image: lms,
    category: "Full Stack (Web)",
    duration: "Jan 23 - May 23",
    role: "Full Stack Developer",
    client: "India",
    teamSize: 5,
    stacks: ["React", "Ant Design", "Node.js", "PostgreSQL"],
    responsibilities: [
      "Led frontend module development and mentoring.",
      "Built course and exam components with validations.",
      "Deployed CI/CD pipelines on AWS.",
      "Handled cross-browser testing and bug fixes.",
    ],
  },
  {
    title: "Weight loss Social platform",
    synopsis:
      "A mobile-first social wellness platform tailored for individuals on a weight loss journey. The application enables users to log daily progress, share milestones, and engage with a supportive fitness community. It integrates real-time data tracking, interactive feed features, and user-friendly visualizations to enhance motivation and engagement. Designed with a clean UI and efficient navigation, it supports seamless integration with third-party APIs like fitness wearables. As the sole frontend engineer, I built responsive components in React Native, collaborated on REST API contracts, and implemented state management with Redux. The platform significantly boosted user retention and community participation in closed-group testing.",
    image: wlb,
    category: "Frontend (Mobile)",
    duration: "Nov 22 - Jan 23",
    role: "Frontend Developer",
    client: "Canada",
    teamSize: 2,
    stacks: ["React", "React Native", "Bootstrap"],
    responsibilities: [
      "Developed mobile-friendly UI using React and Tailwind.",
      "Integrated real-time community interaction features.",
      "Worked with backend teams to optimize endpoints.",
      "Ensured smooth performance on mid-tier mobile devices.",
    ],
  },
];

// Journey
const joiningDate = new Date(2022, 9); // October 2022
const now = new Date();
const yearsOfExperience = (now - joiningDate) / (1000 * 60 * 60 * 24 * 365.25);

export const summaryStats = [
  { value: 6, label: "Happy Clients" },
  {
    value: yearsOfExperience.toFixed(1),
    label: "Years of Experience",
    decimals: 1,
  },
  { value: 10, label: "Projects" },
];

export const serviceVarients = [
  {
    key: "testimonialSlide",
    value: {
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { delay: 0.4, type: "spring", stiffness: 60 },
      },
    },
  },
  {
    key: "summaryStats",
    value: {
      hidden: { opacity: 0, x: 100 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { delay: 0.5, type: "spring", stiffness: 60 },
      },
    },
  },
  {
    key: "serviceCards",
    value: {
      hidden: { opacity: 0, x: -100 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { delay: 0.7, type: "spring", stiffness: 60 },
      },
    },
  },
];

// Certifications
export const certifications = [
  {
    id: 10,
    title: "Prompt Engineering for Everyone",
    description:
      "LLM prompting, zero/few-shot, chain-of-thought, and IBM Watsonx tools.",
    image: promt_engg,
    lastUpdated: "Feb - 2025",
    issuer: "IBM",
    offeredBy: "WatsonX",
    pdfFile: "IBM_promt_Engg.pdf",
  },
  {
    id: 9,
    title: "JavaScript Essentials - 2",
    description:
      "Advanced JS: closures, prototypes, async/await, and error handling.",
    image: js_2,
    lastUpdated: "Feb - 2025",
    issuer: "Cisco Networking Academy",
    offeredBy: "Cisco",
    pdfFile: "JavaScript Essentials -2.pdf",
  },
  {
    id: 8,
    title: "JavaScript Essentials - 1",
    description:
      "Learn JS syntax, variables, operators, functions, and DOM basics.",
    image: js_1,
    lastUpdated: "Feb - 2025",
    issuer: "Cisco Networking Academy",
    offeredBy: "Cisco",
    pdfFile: "JavaScript Essentials -1.pdf",
  },
  {
    id: 7,
    title: "Mastering AWS Serverless",
    description:
      "Build event-driven serverless apps using AWS Lambda, DynamoDB, and S3.",
    image: aws_serverless,
    lastUpdated: "Jan - 2025",
    issuer: "Udemy",
    offeredBy: "AWS Labs",
    pdfFile: "Mastering AWS Serverless.pdf",
  },
  {
    id: 6,
    title: "Version Control",
    description: "Learn Git CLI commands and team collaboration workflows.",
    image: version_control,
    lastUpdated: "Feb - 2024",
    issuer: "Meta",
    offeredBy: "Coursera",
    pdfFile: "Version Control.pdf",
  },
  {
    id: 5,
    title: "Google Project Management",
    description:
      "Covers Agile project execution, planning, and team collaboration practices.",
    image: google_project,
    lastUpdated: "Jan - 2024",
    issuer: "Google",
    offeredBy: "Coursera",
    pdfFile: "Google Project.pdf",
  },
  {
    id: 4,
    title: "React Native",
    description:
      "Builds mobile apps with React Native components and device API integration.",
    image: reactnative,
    lastUpdated: "Jul - 2023",
    issuer: "Meta",
    offeredBy: "Coursera",
    pdfFile: "React naitve.pdf",
  },
  {
    id: 3,
    title: "Developing Back-End Apps with Node.js and Express",
    description:
      "Covers API creation, middleware, and MongoDB integration using Express.js.",
    image: developing_back_end,
    lastUpdated: "Mar - 2023",
    issuer: "IBM",
    offeredBy: "Coursera",
    pdfFile: "Developing Back End.pdf",
  },
  {
    id: 2,
    title: "Advanced React",
    description:
      "Includes hooks, context, optimization techniques, and modern React design patterns.",
    image: advancedreact,
    lastUpdated: "Feb - 2023",
    issuer: "Meta",
    offeredBy: "Coursera",
    pdfFile: "Advanced react.pdf",
  },
  {
    id: 1,
    title: "React Basics",
    description:
      "Covers React components, JSX, props, and state for interactive UI development.",
    image: react,
    lastUpdated: "Dec - 2022",
    issuer: "Meta",
    offeredBy: "Coursera",
    pdfFile: "React .pdf",
  },
];
