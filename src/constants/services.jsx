import {
  FiCode,
  FiDatabase,
  FiCloud,
  FiLayout,
  FiCheckSquare,
  FiServer,
} from "react-icons/fi";

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

export const SERVICE_ICONS = {
  code: FiCode,
  database: FiDatabase,
  cloud: FiCloud,
  design: FiLayout,
  seo: FiCheckSquare,
  mobile: FiServer,
};

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
