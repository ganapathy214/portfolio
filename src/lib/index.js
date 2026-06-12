// Asset imports for Skills
import BootstrapIcon from "../assets/stacks/basics/bootstrap.svg";
import CssIcon from "../assets/stacks/basics/css.svg";
import HtmlIcon from "../assets/stacks/basics/html.svg";
import JavascriptIcon from "../assets/stacks/basics/js.svg";
import ScssIcon from "../assets/stacks/basics/scss.svg";
import TypescriptIcon from "../assets/stacks/basics/ts.svg";

import NextIcon from "../assets/stacks/fe/nextjs.svg";
import ReactNativeIcon from "../assets/stacks/fe/react-native.svg";
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

// Asset imports for Projects
import fms from "../assets/project/fms.jpg";
import lms from "../assets/project/lms.jpg";
import mms from "../assets/project/mms.jpg";
import network_security from "../assets/project/network_security.jpg";
import wlb from "../assets/project/wlb.png";
import wms from "../assets/project/wms.jpg";

// Asset imports for Certifications
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


// 1. SKILLS
export const skills = [
  { name: "HTML", icon: HtmlIcon },
  { name: "CSS", icon: CssIcon },
  { name: "JavaScript", icon: JavascriptIcon },
  { name: "TypeScript", icon: TypescriptIcon },
  { name: "Bootstrap", icon: BootstrapIcon },

  { name: "React", icon: ReactIcon },
  { name: "Next.js", icon: NextIcon },
  { name: "React Native", icon: ReactNativeIcon },
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
  { name: "Redux", icon: ReduxIcon },
];


// 2. PROJECTS
export const projects = [
  {
    title: "Health Care Application",
    synopsis:
      "An Integrated Health-Tech Platform designed to connect patients, doctors, and pharmacies through scalable web and mobile applications supporting online medicine ordering, virtual consultations, appointment scheduling, and home healthcare services with secure and responsive user experiences.",
    image: wms,
    category: "Full Stack (Web + Mobile)",
    platform: "Web & Mobile",
    duration: "Feb 2025 - May 2026",
    role: "Full Stack Team Lead",
    client: "India",
    teamSize: 5,
    stacks: [
      "React.js",
      "Next.js",
      "React Native",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Query",
      "Micro Frontend Architecture",
      "Storybook",
      "REST APIs",
      "AWS (EC2, S3)",
      "DigitalOcean",
      "Git",
      "GitHub Actions",
      "CI/CD",
      "Generative AI",
      "LLM Integration",
    ],
    responsibilities: [
      "Developed scalable and high-performance web and mobile applications using React.js, Next.js, React Native, TypeScript, and Tailwind CSS with reusable component architecture and Micro Frontend implementation.",
      "Built responsive healthcare modules including appointment scheduling, virtual consultations, medicine ordering, patient dashboards, and real-time healthcare workflows across web and mobile platforms.",
      "Designed reusable UI systems and scalable component libraries using Storybook, improving frontend consistency, maintainability, and development efficiency across applications.",
      "Optimized frontend and mobile application performance using lazy loading, memoization, dynamic imports, code splitting, SSR, and rendering optimization with Redux Toolkit and React Query.",
      "Integrated Generative AI / LLM-powered features to enhance healthcare assistance, intelligent workflows, and personalized user experiences.",
      "Collaborated with UI/UX teams and Agile/Scrum teams while managing frontend deployment workflows using GitHub Actions, AWS, DigitalOcean, and CI/CD automation.",
    ],
  },
  {
    title: "Maritime Asset & Vessel Management Platform",
    synopsis:
      "An enterprise-grade maritime management platform developed to streamline fleet operations, vessel tracking, cargo workflows, and secure document management through scalable web and mobile applications with real-time monitoring and responsive user experiences.",
    image: mms,
    category: "Frontend (Web + Mobile)",
    platform: "Web & Mobile",
    duration: "Dec 2024 - Jan 2025",
    role: "Frontend Team Lead",
    client: "UK",
    teamSize: 4,
    stacks: [
      "React.js",
      "Next.js",
      "React Native",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "REST APIs",
      "Storybook",
      "MongoDB",
      "Git",
      "GitHub",
      "Github actions",
      "CI/CD",
      "Agile Scrum",
      "RBAC",
      "Cloud Architecture",
    ],
    responsibilities: [
      "Developed scalable and responsive web and mobile applications using React.js, Next.js, React Native, and TypeScript for vessel operations, cargo workflows, fleet monitoring, and enterprise asset management systems.",
      "Built dynamic frontend modules for fleet tracking, cargo management, machinery monitoring, document workflows, and operational dashboards with optimized user experiences across web and mobile platforms.",
      "Designed reusable UI components and scalable frontend architecture using Storybook, modular component patterns, and responsive design systems to improve maintainability and development consistency.",
      "Implemented secure frontend integrations with REST APIs, authentication systems, protected workflows, and Role-Based Access Control (RBAC) for enterprise-level operational security.",
      "Developed advanced document management interfaces supporting document creation, versioning, audit tracking, publishing workflows, access restrictions, and controlled document lifecycle operations.",
      "Optimized frontend performance using lazy loading, memoization, dynamic imports, SSR, rendering optimization, and efficient state management techniques for large-scale enterprise workflows.",
      "Collaborated with cross-functional teams in Agile/Scrum environments while managing frontend deployment workflows using AWS Pipelines, GitHub, cloud-native CI/CD automation, and continuous delivery practices.",
    ],
  },
  {
    title: "Learning Management System",
    synopsis:
      "A cybersecurity-focused Learning Management System (LMS) developed to deliver interactive e-learning experiences, hands-on security training, assessments, and simulation-based learning through scalable web and mobile applications with secure user access and centralized learning management.",
    image: lms,
    category: "Full Stack (Web + Mobile)",
    platform: "Web & Mobile",
    duration: "Apr 2024 - Oct 2024",
    role: "Senior Frontend Developer",
    client: "India",
    teamSize: 6,
    stacks: [
      "React.js",
      "Next.js",
      "React Native",
      "TypeScript",
      "JavaScript",
      "Bootstrap",
      "Ant Design",
      "React Query",
      "REST APIs",
      "PostgreSQL",
      "Git",
      "GitHub",
      "RBAC",
      "AWS",
      "Jest",
      "Agile Scrum",
    ],
    responsibilities: [
      "Developed scalable and responsive web and mobile applications using React.js, Next.js, React Native, TypeScript, Bootstrap, and Ant Design, delivering interactive learning experiences and cybersecurity training workflows.",
      "Built dynamic LMS modules including course management, progress tracking, assessment systems, subscription workflows, and simulation-based learning dashboards with responsive and user-friendly interfaces.",
      "Implemented efficient frontend state management, API integration, and data synchronization using React Query, improving caching strategies, application responsiveness, and real-time user experiences across LMS modules.",
      "Designed reusable and modular UI components following scalable frontend architecture and component-driven development practices to improve maintainability, consistency, and development efficiency.",
      "Integrated secure frontend workflows with REST APIs, authentication systems, protected routing, and Role-Based Access Control (RBAC) for secure learner and administrator access management.",
      "Optimized frontend performance using lazy loading, component optimization, reusable architecture patterns, and efficient rendering techniques for scalable learning platforms.",
      "Collaborated with frontend designers and Agile/Scrum teams through sprint planning, code reviews, debugging, testing, and feature delivery while contributing to frontend quality and continuous application improvements.",
      "Supported frontend deployment workflows and release management using AWS, GitHub, CI/CD pipelines, version control best practices, and automated deployment processes for reliable application delivery.",
    ],
  },
  {
    title: "Lead Distribution System (SaaS)",
    synopsis:
      "A scalable Real Estate Lead Management Platform developed to automate and optimize verified seller lead distribution through mobile-first web and mobile applications with onboarding workflows, real-time communication integrations, and secure API-driven systems.",
    image: fms,
    category: "Full Stack (Web + Mobile)",
    platform: "Web & Mobile",
    duration: "Nov 2023 - Apr 2024",
    role: "Senior Frontend Developer",
    client: "Australia",
    teamSize: 4,
    stacks: [
      "React Native",
      "React.js",
      "Next.js",
      "TypeScript",
      "Styled Components",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "REST APIs",
      "Git",
      "GitHub",
      "SMS Integration",
      "Email Services",
      "Webhooks",
      "Agile Scrum",
    ],
    responsibilities: [
      "Developed scalable mobile-first web and mobile applications using React Native, React.js, Next.js, TypeScript, and Styled Components for lead management and onboarding workflows.",
      "Built core SaaS modules including lead lifecycle management, sales territory allocation, onboarding workflows, scheduling systems, and investor management dashboards.",
      "Integrated real-time communication systems using SMS services, email notifications, and webhook integrations to ensure instant lead delivery and workflow synchronization.",
      "Designed responsive UI components and reusable frontend architecture patterns to improve scalability, maintainability, and user experience consistency across platforms.",
      "Implemented secure frontend integrations with REST APIs, authentication workflows, protected routing, and role-based operational access controls.",
      "Optimized application performance using lazy loading, reusable architecture patterns, rendering optimization, and efficient API handling for scalable SaaS workflows.",
      "Collaborated in Agile/Scrum environments through sprint planning, debugging, testing, feature delivery, and continuous frontend improvements to enhance platform scalability and operational efficiency.",
    ],
  },
  {
    title: "WeightLossBuddy",
    synopsis:
      "WeightLossBuddy - caters to those individuals who want to lose weight and need help. Help in the way of support from others on a similar journey. This app gives you access to a large weight loss community that is ready to give you support, effective weight loss tips, and help you in any way possible to reach your weight loss goal.",
    image: wlb,
    category: "Frontend (Web + Mobile)",
    platform: "Web & Mobile",
    duration: "Apr 2023 - Sep 2023",
    role: "Frontend Developer",
    client: "USA",
    teamSize: 2,
    stacks: ["React Native", "React.js", "Redux", "JavaScript", "REST APIs", "Git", "GitHub"],
    responsibilities: [
      "Developed cross-platform mobile and web interfaces using React Native and React.",
      "Integrated Redux state management to enable real-time updates and seamless user interaction across screens.",
      "Collaborated on designing screens, navigation flows, and reusable UI components for support groups and activity tracking.",
      "Optimized application assets and API synchronization to enhance performance on mid-tier mobile devices.",
    ],
  },
  {
    title: "Cyber Security SaaS Application",
    synopsis:
      "This is an LLM platform for networking side usage. It's a product used to find out the cause quickly. In an organization, if some process ran more than a time in a short interval then that was a malicious thing. So we get all the logs from the organization, from the logs we enrich the logs, filter the logs and save it in the cloud so that LLM can use that and return a solution for that particular malicious thing. In future the LLM needs some more prompt then we train them with the details we have as enriched logs.",
    image: network_security,
    category: "Full Stack (Web + Mobile)",
    platform: "Web & Mobile",
    duration: "Jun 2022 - Apr 2023",
    role: "Senior Frontend & Mobile Developer",
    client: "India",
    teamSize: 5,
    stacks: ["React Native", "React.js", "TypeScript", "Tailwind CSS", "AWS", "REST APIs", "Git", "GitHub Actions", "CI/CD", "LLM Integration", "Log Processing"],
    responsibilities: [
      "Developed cross-platform mobile and web interfaces using React Native and React.",
      "Implemented secure log enrichment, filtering, and cloud storage workflows.",
      "Integrated LLM-based analysis for detecting malicious activities.",
      "Optimized performance for large-scale log processing.",
      "Led and mentored developers, ensuring on-time delivery.",
    ],
  },
  {
    title: "Insurance Management System",
    synopsis:
      "This platform specializes in insurance software, offering automation for manual tasks like data extraction, AI-driven data analysis to aid decision-making, and improved accuracy. With streamlined workflows, it enhances efficiency for insurers, brokers, and MGAs. Their suite is designed to optimize operations and profitability in the insurance sector. This tech stack provides robust scalability and performance to support the dynamic needs of the insurance industry.",
    image: fms,
    category: "Full Stack (Web + Mobile)",
    platform: "Web & Mobile",
    duration: "Aug 2021 - May 2022",
    role: "Tech Lead / Full Stack Developer",
    client: "India",
    teamSize: 4,
    stacks: ["React Native", "React.js", "TypeScript", "MySQL", "NestJS", "REST APIs", "Git", "GitHub", "AI Data Analysis", "Workflow Automation"],
    responsibilities: [
      "Built React Native mobile features for insurers and brokers.",
      "Shared business logic between mobile and web platforms.",
      "Automated data extraction and AI-assisted analysis workflows.",
      "Led team execution and enforced clean architecture.",
    ],
  },
];


// 3. TIMELINE
export const timelineData = [
  {
    time: "Oct 2022 - Present",
    title: "Senior Frontend & Full Stack Developer",
    org: "Freelance & Consulting Lead",
    location: "Coimbatore, Tamil Nadu.",
  },
  {
    time: "Jan 2020 - Oct 2022",
    title: "Frontend & Full Stack Developer",
    org: "Software Solutions Ltd.",
    location: "Coimbatore, Tamil Nadu.",
  },
  {
    time: "Aug 2015 - May 2019",
    title: "BE in Electronics and Communication Engineering",
    percent: "6.9 CGPA",
    org: "Anna University",
    location: "Erode, Tamil Nadu.",
  },
  {
    time: "June 2013 - May 2015",
    title: "Higher Secondary Certificate",
    percent: "80.83%",
    org: "State Board School",
    location: "Erode, Tamil Nadu.",
  },
  {
    time: "June 2012 - May 2013",
    title: "Secondary School Leaving Certificate",
    percent: "93.2%",
    org: "State Board School",
    location: "Erode, Tamil Nadu.",
  },
];


// 4. SERVICES
export const SERVICES_DATA = [
  {
    title: "Web & Mobile Development",
    description:
      "Building responsive, SEO-optimized web and mobile applications tailored for performance, accessibility, and user engagement using React, Next.js, and React Native.",
    icon: "code",
  },
  {
    title: "API Integration",
    description:
      "Integrating secure, scalable APIs and databases to ensure seamless, reliable data flow and robust application connectivity.",
    icon: "database",
  },
  {
    title: "Code Deployment",
    description:
      "Implementing efficient Git workflows and automated deployment pipelines for faster, safer, and more reliable code delivery via CI/CD.",
    icon: "cloud",
  },
  {
    title: "UI/UX Implementation",
    description:
      "Creating intuitive and visually stunning user interfaces with Storybook, Tailwind CSS, Material UI, Ant Design, and other modern UI systems.",
    icon: "design",
  },
  {
    title: "Test Automation",
    description:
      "Delivering robust, scalable automated testing solutions using Jest and Playwright to ensure software reliability and reduce bugs.",
    icon: "seo",
  },
  {
    title: "Cloud Architecture",
    description:
      "Deploying and managing applications on AWS (EC2, S3, Lambda), Firebase, and DigitalOcean with CloudWatch monitoring and IaC.",
    icon: "mobile",
  },
];


// 5. CERTIFICATIONS
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
