/**
 * font.js — Dynamic Google Fonts loader + CSS variable applicator
 */

export const FONT_OPTIONS = [
  { name: "Elms Sans",      label: "Elms Sans",      category: "Modern",     description: "Clean, humanist sans-serif for reading" },
  { name: "Google Sans",    label: "Google Sans",    category: "Geometric",  description: "Modern, premium corporate typeface" },
  { name: "Roboto Condensed", label: "Roboto Condensed", category: "Condensed", description: "Slim, space-efficient structural styling" },
  { name: "Outfit",         label: "Outfit",         category: "Sans-serif", description: "Sleek, geometric styling for headers" },
  { name: "Inter",          label: "Inter",           category: "Sans-serif", description: "Highly readable, optimized for clean UI" },
  { name: "Space Grotesk",  label: "Space Grotesk",  category: "Sans-serif", description: "Tech-focused, quirky geometric details" },
  { name: "Poppins",        label: "Poppins",        category: "Rounded",    description: "Warm, friendly, circular modern shapes" },
  { name: "DM Sans",        label: "DM Sans",        category: "Humanist",   description: "Clean, neutral, highly professional layout" },
  { name: "Sora",           label: "Sora",           category: "Geometric",  description: "Futuristic, dynamic structure & aesthetics" },
  { name: "Raleway",        label: "Raleway",        category: "Elegant",    description: "Sophisticated, high-contrast headings" },
  { name: "IBM Plex Mono",  label: "IBM Plex Mono",  category: "Monospace",  description: "Industrial monospace, great for statistics & code" },
];

const loadedFonts = new Set();

/**
 * Dynamically inject Google Fonts link and apply CSS variable.
 * @param {string} fontName - Font name from FONT_OPTIONS
 */
export function applyFont(fontName) {
  if (!fontName) return;

  // Apply CSS variable
  document.documentElement.style.setProperty(
    "--font-primary",
    `"${fontName}", sans-serif`
  );

  // Avoid re-injecting already loaded fonts
  if (loadedFonts.has(fontName)) return;
  loadedFonts.add(fontName);

  const existingLink = document.querySelector(`link[data-font="${fontName}"]`);
  if (existingLink) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.dataset.font = fontName;
  // IBM Plex Mono needs different weight range
  const weights = fontName === "IBM Plex Mono" ? "400;600;700" : "400;500;600;700;800;900";
  const encodedName = encodeURIComponent(fontName);
  link.href = `https://fonts.googleapis.com/css2?family=${encodedName}:wght@${weights}&display=swap`;
  document.head.appendChild(link);
}
