import { SERVICES_DATA } from "../lib/index.js";

import {
  FiCode,
  FiDatabase,
  FiCloud,
  FiLayout,
  FiCheckSquare,
  FiServer,
} from "react-icons/fi";

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

export { SERVICES_DATA };
