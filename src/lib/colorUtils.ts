export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface ThemeConfigFromHsl {
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  ring: string;
  primaryHover: string;
  primaryActive: string;
  lightAccent: string;
  gradient: string;
  shadowGlow: string;
  highlight: string;
  highlightForeground: string;
}

/**
 * Convert HSL object to CSS HSL string format (e.g., "213 87% 52%")
 */
export function hslToString(hsl: HslColor): string {
  return `${Math.round(hsl.h)} ${Math.round(hsl.s)}% ${Math.round(hsl.l)}%`;
}

/**
 * Parse CSS HSL string to HslColor object
 */
export function parseHslString(hslString: string): HslColor {
  const parts = hslString.split(" ");
  return {
    h: parseFloat(parts[0]),
    s: parseFloat(parts[1]),
    l: parseFloat(parts[2]),
  };
}

/**
 * Determine if text should be white or dark based on background luminance
 */
export function getContrastForeground(hsl: HslColor): string {
  // Use relative luminance to determine contrast
  // Light colors (L > 55%) need dark text, dark colors need white text
  if (hsl.l > 55) {
    return "0 0% 10%"; // Dark text
  }
  return "0 0% 100%"; // White text
}

/**
 * Generate a complete theme configuration from a single HSL color
 * Optionally accepts a highlight color for custom gradients and featured badges
 */
export function generateThemeFromHsl(hsl: HslColor, highlightHsl?: HslColor): ThemeConfigFromHsl {
  const h = hsl.h;
  const s = Math.min(100, Math.max(0, hsl.s));
  const l = Math.min(100, Math.max(0, hsl.l));

  // Primary color
  const primary = hslToString({ h, s, l });
  
  // Primary foreground (contrast text)
  const primaryForeground = getContrastForeground({ h, s, l });
  
  // Hover state: decrease lightness by 7%
  const primaryHover = hslToString({ h, s, l: Math.max(0, l - 7) });
  
  // Active state: decrease lightness by 14%
  const primaryActive = hslToString({ h, s, l: Math.max(0, l - 14) });
  
  // Accent: shift hue by +15°, slight saturation adjustment
  const accentH = (h + 15) % 360;
  const accentS = Math.max(0, s - 5);
  const accent = hslToString({ h: accentH, s: accentS, l });
  
  // Accent foreground
  const accentForeground = hslToString({ h, s, l: 15 });
  
  // Light accent: same hue, reduced saturation, very light
  const lightAccent = hslToString({ h, s: s * 0.3, l: 95 });
  
  // Ring color (same as primary)
  const ring = primary;
  
  // Highlight color (use provided or default to accent)
  const highlightH = highlightHsl?.h ?? accentH;
  const highlightS = highlightHsl?.s ?? accentS;
  const highlightL = highlightHsl?.l ?? Math.min(100, l + 8);
  const highlight = hslToString({ h: highlightH, s: highlightS, l: highlightL });
  const highlightForeground = getContrastForeground({ h: highlightH, s: highlightS, l: highlightL });
  
  // Gradient: primary -> highlight (or softened same-color if no highlight)
  let gradient: string;
  if (highlightHsl) {
    // Use primary to highlight gradient
    gradient = `linear-gradient(135deg, hsl(${h}, ${s}%, ${l}%) 0%, hsl(${highlightH}, ${highlightS}%, ${highlightL}%) 100%)`;
  } else {
    // Softened single-color gradient (proportional deltas)
    const lightDelta = Math.max(4, Math.min(10, (100 - l) * 0.18));
    const darkDelta = Math.max(2, Math.min(8, l * 0.12));
    const gradientLightL = Math.min(96, l + lightDelta);
    const gradientDarkL = l < 18 ? l : Math.max(18, l - darkDelta);
    gradient = `linear-gradient(135deg, hsl(${h}, ${s}%, ${gradientLightL}%) 0%, hsl(${h}, ${s}%, ${l}%) 58%, hsl(${h}, ${s}%, ${gradientDarkL}%) 115%)`;
  }
  
  // Shadow glow
  const shadowGlow = `0 0 40px hsla(${h}, ${s}%, ${l}%, 0.3)`;

  return {
    primary,
    primaryForeground,
    accent,
    accentForeground,
    ring,
    primaryHover,
    primaryActive,
    lightAccent,
    gradient,
    shadowGlow,
    highlight,
    highlightForeground,
  };
}

/**
 * Convert hex color to HSL
 */
export function hexToHsl(hex: string): HslColor {
  // Remove # if present
  hex = hex.replace(/^#/, "");
  
  // Handle 3-digit hex
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to hex color
 */
export function hslToHex(hsl: HslColor): string {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  const hueToRgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Validate hex color string
 */
export function isValidHex(hex: string): boolean {
  return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}
