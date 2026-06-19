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

export const ISSUER_THEMES = {
  IBM: { accent: "#0f62fe", badge: "bg-blue-950/30 border-blue-900/40 text-blue-400" },
  Cisco: { accent: "#00b4d8", badge: "bg-cyan-950/30 border-cyan-900/40 text-cyan-400" },
  Meta: { accent: "#0668e1", badge: "bg-blue-950/30 border-blue-900/40 text-blue-400" },
  Google: { accent: "#ea4335", badge: "bg-red-950/30 border-red-900/40 text-red-400" },
  Udemy: { accent: "#a435f0", badge: "bg-purple-950/30 border-purple-900/40 text-purple-400" },
};

export const defaultTheme = { accent: "var(--primary)", badge: "bg-primary/5 border-primary/20 text-primary" };

export const getTheme = (issuer = "") => {
  const l = issuer.toLowerCase();
  if (l.includes("ibm")) return ISSUER_THEMES.IBM;
  if (l.includes("cisco")) return ISSUER_THEMES.Cisco;
  if (l.includes("meta")) return ISSUER_THEMES.Meta;
  if (l.includes("google")) return ISSUER_THEMES.Google;
  if (l.includes("udemy")) return ISSUER_THEMES.Udemy;
  return defaultTheme;
};
