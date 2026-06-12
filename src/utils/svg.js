/**
 * SVG Color Injection Utility
 * Replaces hardcoded fill/stroke color values in SVG strings with var(--primary)
 * so that pasted SVGs automatically respect the dynamic theme color.
 */

// Common patterns we want to replace with var(--primary):
// - fill="#xxxxxx"       any hex fill attribute
// - stroke="#xxxxxx"     any hex stroke attribute
// - fill="black" / fill="white" etc. (named colors that look like user-intent color)
// - style="fill:#xxxxxx" or style="fill:rgb(...)" inside style attributes
// - currentColor is left as-is (it already inherits)
// - fill="none" and stroke="none" are left as-is (transparent, intentional)

const HEX_COLOR_RE = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const RGB_COLOR_RE = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*[\d.]+)?\s*\)/g;

// Named CSS colors that we consider "intentional foreground" — replace them too.
const NAMED_FILL_COLORS = new Set([
  "black", "white", "red", "green", "blue", "yellow", "orange", "purple",
  "cyan", "magenta", "teal", "navy", "maroon", "olive", "lime", "aqua",
  "fuchsia", "silver", "gray", "grey"
]);

/**
 * Injects `var(--primary)` into the SVG string by:
 *  1. Replacing hex colors in fill/stroke attributes.
 *  2. Replacing named colors in fill/stroke attributes.
 *  3. Replacing hex/rgb values inside inline style strings.
 *
 * Does NOT touch:
 *  - fill="none" / stroke="none"
 *  - fill="currentColor" / stroke="currentColor"
 *  - Colours used in other attributes (e.g., stop-color for gradients — kept intentional)
 *
 * @param {string} svgString - Raw SVG markup
 * @returns {string} - SVG markup with colors replaced
 */
export function injectPrimaryColor(svgString) {
  if (!svgString || typeof svgString !== "string") return svgString;

  let result = svgString;

  // ── 1. Replace hex colors in fill / stroke attributes ──────────────────
  // Matches: fill="#abc123" | stroke="#abc123"
  result = result.replace(
    /((?:fill|stroke)\s*=\s*["'])([^"']+)(["'])/gi,
    (match, prefix, value, suffix) => {
      const trimmed = value.trim().toLowerCase();
      if (trimmed === "none" || trimmed === "currentcolor") return match;

      // Replace if hex color
      if (/^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(trimmed)) {
        return `${prefix}var(--primary)${suffix}`;
      }

      // Replace if rgb/rgba
      if (/^rgba?\(/.test(trimmed)) {
        return `${prefix}var(--primary)${suffix}`;
      }

      // Replace named colors
      if (NAMED_FILL_COLORS.has(trimmed)) {
        return `${prefix}var(--primary)${suffix}`;
      }

      return match;
    }
  );

  // ── 2. Replace hex/rgb colors inside style attributes ──────────────────
  // Matches: style="... fill:#abc; stroke:rgb(...)..."
  result = result.replace(
    /(style\s*=\s*["'])([^"']*)(["'])/gi,
    (match, prefix, styleContent, suffix) => {
      let newStyle = styleContent;

      // Replace fill: <color> in style
      newStyle = newStyle.replace(
        /(fill\s*:\s*)(#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|rgba?\([^)]+\)|(?:black|white|red|green|blue|yellow|orange|purple|cyan|magenta|teal|navy|maroon|olive|lime|aqua|fuchsia|silver|gr[ae]y))/gi,
        (m, prop, color) => {
          if (color.toLowerCase() === "none" || color.toLowerCase() === "currentcolor") return m;
          return `${prop}var(--primary)`;
        }
      );

      // Replace stroke: <color> in style
      newStyle = newStyle.replace(
        /(stroke\s*:\s*)(#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|rgba?\([^)]+\)|(?:black|white|red|green|blue|yellow|orange|purple|cyan|magenta|teal|navy|maroon|olive|lime|aqua|fuchsia|silver|gr[ae]y))/gi,
        (m, prop, color) => {
          if (color.toLowerCase() === "none" || color.toLowerCase() === "currentcolor") return m;
          return `${prop}var(--primary)`;
        }
      );

      return `${prefix}${newStyle}${suffix}`;
    }
  );

  // ── 3. Replace stop-color hex/rgb (gradient stops) ─────────────────────
  result = result.replace(
    /(stop-color\s*[=:]\s*["']?)(#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|rgba?\([^)]+\))(["']?)/gi,
    (match, prefix, color, suffix) => {
      if (color.toLowerCase() === "none") return match;
      return `${prefix}var(--primary)${suffix}`;
    }
  );

  return result;
}

/**
 * Check if a string looks like it contains an SVG element.
 * @param {string} str
 * @returns {boolean}
 */
export function looksLikeSvg(str) {
  if (!str) return false;
  const trimmed = str.trim();
  return trimmed.startsWith("<svg") || trimmed.includes("<svg ");
}
