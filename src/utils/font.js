/**
 * font.js — Dynamic Google Fonts loader + CSS variable applicator
 */

export const FONT_OPTIONS = [
  { name: "Outfit",         label: "Outfit",         category: "Sans-serif" },
  { name: "Inter",          label: "Inter",           category: "Sans-serif" },
  { name: "Space Grotesk",  label: "Space Grotesk",  category: "Sans-serif" },
  { name: "Poppins",        label: "Poppins",        category: "Rounded" },
  { name: "DM Sans",        label: "DM Sans",        category: "Humanist" },
  { name: "Sora",           label: "Sora",           category: "Geometric" },
  { name: "Raleway",        label: "Raleway",        category: "Elegant" },
  { name: "IBM Plex Mono",  label: "IBM Plex Mono",  category: "Monospace" },
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
