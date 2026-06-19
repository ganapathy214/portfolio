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

