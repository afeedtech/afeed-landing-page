import { HslColor, generateThemeFromHsl, hslToString } from "./colorUtils";

export type ThemeColor = 
  | "blue" 
  | "black" 
  | "green" 
  | "purple" 
  | "orange" 
  | "red"
  | "custom";

export interface ThemeConfig {
  name: ThemeColor;
  label: string;
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

export const THEME_CONFIGS: Record<Exclude<ThemeColor, "custom">, ThemeConfig> = {
  blue: {
    name: "blue",
    label: "Blue",
    primary: "213 87% 52%",
    primaryForeground: "0 0% 100%",
    accent: "199 89% 70%",
    accentForeground: "213 87% 20%",
    ring: "213 87% 52%",
    primaryHover: "213 87% 45%",
    primaryActive: "213 87% 38%",
    lightAccent: "213 87% 95%",
    gradient: "linear-gradient(135deg, hsl(213, 87%, 62%) 0%, hsl(213, 87%, 52%) 58%, hsl(213, 87%, 42%) 115%)",
    shadowGlow: "0 0 40px hsla(213, 87%, 52%, 0.3)",
    highlight: "199 89% 60%",
    highlightForeground: "0 0% 100%",
  },
  black: {
    name: "black",
    label: "Black",
    primary: "0 0% 10%",
    primaryForeground: "0 0% 100%",
    accent: "30 8% 48%",
    accentForeground: "0 0% 100%",
    ring: "0 0% 10%",
    primaryHover: "0 0% 20%",
    primaryActive: "0 0% 5%",
    lightAccent: "0 0% 96%",
    gradient: "linear-gradient(135deg, hsl(0, 0%, 24%) 0%, hsl(0, 0%, 10%) 58%, hsl(0, 0%, 18%) 115%)",
    shadowGlow: "0 0 40px hsla(0, 0%, 10%, 0.3)",
    highlight: "30 8% 48%",
    highlightForeground: "0 0% 100%",
  },
  green: {
    name: "green",
    label: "Green",
    primary: "160 84% 39%",
    primaryForeground: "0 0% 100%",
    accent: "174 72% 40%",
    accentForeground: "160 84% 15%",
    ring: "160 84% 39%",
    primaryHover: "160 84% 34%",
    primaryActive: "160 84% 28%",
    lightAccent: "160 84% 95%",
    gradient: "linear-gradient(135deg, hsl(160, 84%, 50%) 0%, hsl(160, 84%, 39%) 58%, hsl(160, 84%, 32%) 115%)",
    shadowGlow: "0 0 40px hsla(160, 84%, 39%, 0.3)",
    highlight: "174 72% 50%",
    highlightForeground: "0 0% 100%",
  },
  purple: {
    name: "purple",
    label: "Purple",
    primary: "271 76% 53%",
    primaryForeground: "0 0% 100%",
    accent: "239 84% 67%",
    accentForeground: "271 76% 15%",
    ring: "271 76% 53%",
    primaryHover: "271 76% 46%",
    primaryActive: "271 76% 39%",
    lightAccent: "271 76% 96%",
    gradient: "linear-gradient(135deg, hsl(271, 76%, 65%) 0%, hsl(271, 76%, 53%) 58%, hsl(271, 76%, 46%) 115%)",
    shadowGlow: "0 0 40px hsla(271, 76%, 53%, 0.3)",
    highlight: "239 84% 67%",
    highlightForeground: "0 0% 100%",
  },
  orange: {
    name: "orange",
    label: "Orange",
    primary: "25 95% 53%",
    primaryForeground: "0 0% 100%",
    accent: "38 92% 50%",
    accentForeground: "25 95% 15%",
    ring: "25 95% 53%",
    primaryHover: "25 95% 46%",
    primaryActive: "25 95% 39%",
    lightAccent: "25 95% 95%",
    gradient: "linear-gradient(135deg, hsl(25, 95%, 62%) 0%, hsl(25, 95%, 53%) 58%, hsl(25, 95%, 46%) 115%)",
    shadowGlow: "0 0 40px hsla(25, 95%, 53%, 0.3)",
    highlight: "38 92% 55%",
    highlightForeground: "0 0% 10%",
  },
  red: {
    name: "red",
    label: "Red",
    primary: "0 72% 51%",
    primaryForeground: "0 0% 100%",
    accent: "10 65% 55%",
    accentForeground: "0 72% 15%",
    ring: "0 72% 51%",
    primaryHover: "0 72% 44%",
    primaryActive: "0 72% 37%",
    lightAccent: "0 72% 96%",
    gradient: "linear-gradient(135deg, hsl(0, 72%, 60%) 0%, hsl(0, 72%, 51%) 58%, hsl(0, 72%, 44%) 115%)",
    shadowGlow: "0 0 40px hsla(0, 72%, 51%, 0.3)",
    highlight: "10 65% 55%",
    highlightForeground: "0 0% 100%",
  },
};

// Quick presets for the selector (6 colors)
export const PRESET_THEMES: Exclude<ThemeColor, "custom">[] = [
  "blue",
  "black",
  "purple",
  "orange",
  "green",
  "red",
];

export const DEFAULT_THEME: ThemeColor = "blue";

export const DEFAULT_CUSTOM_COLOR: HslColor = { h: 213, s: 87, l: 52 };

export function isPresetTheme(theme: string): theme is Exclude<ThemeColor, "custom"> {
  return theme in THEME_CONFIGS;
}

export function getThemeConfig(theme: ThemeColor, customColor?: HslColor, highlightColor?: HslColor): ThemeConfig {
  if (theme === "custom" && customColor) {
    const generated = generateThemeFromHsl(customColor, highlightColor);
    return {
      name: "custom",
      label: "Custom",
      ...generated,
    };
  }
  
  if (isPresetTheme(theme)) {
    return THEME_CONFIGS[theme];
  }
  
  // Fallback to blue
  return THEME_CONFIGS.blue;
}
