import { timelineData } from "../lib/index.js";

const joiningDate = new Date(2020, 0); // January 2020
const now = new Date();
const yearsOfExperience = (now - joiningDate) / (1000 * 60 * 60 * 24 * 365.25);

export const summaryStats = [
  { value: 7, label: "Happy Clients" },
  {
    value: parseFloat(yearsOfExperience.toFixed(1)),
    label: "Years of Experience",
    decimals: 1,
  },
  { value: 12, label: "Projects" },
];

export { timelineData };
