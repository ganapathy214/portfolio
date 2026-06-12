import { certifications } from "../lib/index.js";

export const ISSUER_THEMES = {
  IBM: { accent: "#0f62fe", badge: "bg-blue-950/30 border-blue-900/40 text-blue-400" },
  Cisco: { accent: "#00b4d8", badge: "bg-cyan-950/30 border-cyan-900/40 text-cyan-400" },
  Meta: { accent: "#0668e1", badge: "bg-blue-950/30 border-blue-900/40 text-blue-400" },
  Google: { accent: "#ea4335", badge: "bg-red-950/30 border-red-900/40 text-red-400" },
  Udemy: { accent: "#a435f0", badge: "bg-purple-950/30 border-purple-900/40 text-purple-400" },
};

export const defaultTheme = { accent: "#00D5D5", badge: "bg-primary/5 border-primary/20 text-primary" };

export const getTheme = (issuer = "") => {
  const l = issuer.toLowerCase();
  if (l.includes("ibm")) return ISSUER_THEMES.IBM;
  if (l.includes("cisco")) return ISSUER_THEMES.Cisco;
  if (l.includes("meta")) return ISSUER_THEMES.Meta;
  if (l.includes("google")) return ISSUER_THEMES.Google;
  if (l.includes("udemy")) return ISSUER_THEMES.Udemy;
  return defaultTheme;
};

export { certifications };
