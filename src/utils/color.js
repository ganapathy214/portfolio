/**
 * Calculate the HSP (Luminance) of a hex color and return #000000 (black) or #ffffff (white)
 * to ensure high accessibility contrast.
 * @param {string} hexColor
 * @returns {string} - '#000000' or '#ffffff'
 */
export function getContrastColor(hexColor) {
  if (!hexColor || typeof hexColor !== "string") return "#000000";
  // Strip # if present
  const color = hexColor.startsWith("#") ? hexColor.slice(1) : hexColor;
  
  // Standardize 3-character hex to 6-character
  let r, g, b;
  if (color.length === 3) {
    r = parseInt(color[0] + color[0], 16);
    g = parseInt(color[1] + color[1], 16);
    b = parseInt(color[2] + color[2], 16);
  } else if (color.length === 6) {
    r = parseInt(color.slice(0, 2), 16);
    g = parseInt(color.slice(2, 4), 16);
    b = parseInt(color.slice(4, 6), 16);
  } else {
    return "#000000";
  }

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return "#000000";
  }

  // HSP equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );

  // HSP value ranges from 0 to 255. 160 is a solid mid-light threshold.
  return hsp > 160 ? "#000000" : "#ffffff";
}

/**
 * Blend a hex color with white to create a lighter, pastel shade of the same hue.
 * @param {string} hexColor
 * @param {number} factor - Blend factor between 0 (original color) and 1 (pure white)
 * @returns {string} - Lightened hex color
 */
export function getLightShade(hexColor, factor = 0.6) {
  if (!hexColor || typeof hexColor !== "string") return "#ffffff";
  const color = hexColor.startsWith("#") ? hexColor.slice(1) : hexColor;
  let r, g, b;
  if (color.length === 3) {
    r = parseInt(color[0] + color[0], 16);
    g = parseInt(color[1] + color[1], 16);
    b = parseInt(color[2] + color[2], 16);
  } else if (color.length === 6) {
    r = parseInt(color.slice(0, 2), 16);
    g = parseInt(color.slice(2, 4), 16);
    b = parseInt(color.slice(4, 6), 16);
  } else {
    return "#ffffff";
  }
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return "#ffffff";
  }

  const nr = Math.min(255, Math.round(r + (255 - r) * factor));
  const ng = Math.min(255, Math.round(g + (255 - g) * factor));
  const nb = Math.min(255, Math.round(b + (255 - b) * factor));

  const hexR = nr.toString(16).padStart(2, "0");
  const hexG = ng.toString(16).padStart(2, "0");
  const hexB = nb.toString(16).padStart(2, "0");

  return `#${hexR}${hexG}${hexB}`;
}
