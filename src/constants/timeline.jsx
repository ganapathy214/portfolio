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
