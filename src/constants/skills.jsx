import { skills } from "../lib/index.js";

export const skillCategories = [
  {
    id: "frontend",
    label: "Frontend Development",
    skillNames: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "React Native",
      "Redux",
      "Vite",
      "Tailwind",
      "Shadcn",
      "Material UI",
      "Ant Design",
      "Chakra UI",
      "React Bootstrap",
      "Bootstrap",
      "SCSS",
      "Styled Components"
    ],
    bullets: [
      "<strong class='text-primary'>Performance Optimization:</strong> Lazy loading, dynamic imports, memoization, virtualization, bundle optimization, SSR/SSG/ISR.",
      "<strong class='text-primary'>Modern Frontend &amp; Mobile:</strong> React.js, Next.js App Router, React Native, Expo, Micro Frontend Architecture.",
      "<strong class='text-primary'>Scalable UI Systems:</strong> Storybook, Tailwind CSS, Material UI, Ant Design, Styled Components, Shadcn UI.",
      "<strong class='text-primary'>State Management:</strong> Redux Toolkit, Redux-Saga, Zustand, TanStack Query.",
      "<strong class='text-primary'>Best Practices:</strong> Component-driven design, accessibility (WCAG), unit/E2E testing (Jest), Agile/Scrum.",
    ],
  },
  {
    id: "backend",
    label: "Backend Development",
    skillNames: ["Node.js", "TypeScript", "Express", "Next.js", "MongoDB", "MySQL", "PostgreSQL", "SQL"],
    bullets: [
      "<strong class='text-primary'>Runtime &amp; Frameworks:</strong> Node.js, Express.js for scalable backend services.",
      "<strong class='text-primary'>API Design &amp; Security:</strong> RESTful APIs, protected routing, Role-Based Access Control (RBAC).",
      "<strong class='text-primary'>Database Integration:</strong> PostgreSQL, MongoDB, schema design, and query optimization.",
      "<strong class='text-primary'>Third-Party Services:</strong> Payment gateways, SMS/email notifications, Webhooks, Generative AI APIs.",
      "<strong class='text-primary'>Cloud &amp; DevOps:</strong> AWS (EC2, S3, Lambda), Firebase, CI/CD pipelines (GitHub Actions).",
    ],
  },
  {
    id: "database",
    label: "Database & Data",
    skillNames: ["MongoDB", "MySQL", "PostgreSQL", "SQL"],
    bullets: [
      "<strong class='text-primary'>Schema Design:</strong> Normalization, relationships, indexing strategies.",
      "<strong class='text-primary'>Query Optimization:</strong> Index tuning, explain plans, partitioning.",
      "<strong class='text-primary'>ORM Tools:</strong> Prisma, Mongoose, Sequelize, Knex.js.",
      "<strong class='text-primary'>Backup &amp; Recovery:</strong> Snapshots, replication, failover handling.",
      "<strong class='text-primary'>Monitoring:</strong> Slow query logs, profiling tools.",
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    skillNames: ["AWS", "Firebase", "Digitalocean"],
    bullets: [
      "<strong class='text-primary'>AWS Services:</strong> EC2, Lambda, RDS, CloudWatch, S3.",
      "<strong class='text-primary'>Firebase Stack:</strong> Auth, Firestore, Cloud Functions, FCM.",
      "<strong class='text-primary'>Deployment:</strong> CI/CD pipelines with GitHub Actions &amp; Bitbucket Pipelines.",
      "<strong class='text-primary'>Monitoring:</strong> CloudWatch, Crashlytics, uptime alerts.",
      "<strong class='text-primary'>IaC:</strong> Terraform, AWS CDK for reproducible infrastructure.",
    ],
  },
  {
    id: "tools",
    label: "Tooling & VCS",
    skillNames: ["Git", "Bitbucket", "Azure"],
    bullets: [
      "<strong class='text-primary'>VCS:</strong> Git workflows, PR reviews, merge safety, branching strategies.",
      "<strong class='text-primary'>Dev Environments:</strong> VS Code, Cursor, WSL.",
      "<strong class='text-primary'>Tooling:</strong> ESLint, Prettier, Husky, Commitlint.",
      "<strong class='text-primary'>Package Managers:</strong> NPM, Yarn, PNPM.",
      "<strong class='text-primary'>Build Tools:</strong> Vite, Webpack, Babel.",
    ],
  },
  {
    id: "testing",
    label: "Automation Testing",
    skillNames: ["Jest", "Playwright"],
    bullets: [
      "<strong class='text-primary'>Test Types:</strong> Unit, E2E, integration, regression.",
      "<strong class='text-primary'>Tools Used:</strong> Jest, Playwright, BrowserStack.",
      "<strong class='text-primary'>CI Testing:</strong> Coverage reports in pipelines.",
      "<strong class='text-primary'>Debugging:</strong> Chrome DevTools, Postman, Swagger UI.",
    ],
  }
].map((cat) => ({
  ...cat,
  _skills: skills.filter((s) => cat.skillNames.includes(s.name)),
}));

export { skills };

