import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ThemeColor, ThemeConfig, DEFAULT_THEME, DEFAULT_CUSTOM_COLOR, getThemeConfig, isPresetTheme } from "@/lib/themes";
import { HslColor } from "@/lib/colorUtils";

const STORAGE_KEY = "afeed-theme";
const CUSTOM_COLOR_KEY = "afeed-custom-color";
const HIGHLIGHT_COLOR_KEY = "afeed-highlight-color";

interface ThemeContextValue {
  theme: ThemeColor;
  customColor: HslColor;
  highlightColor: HslColor | null;
  setTheme: (theme: ThemeColor) => void;
  setCustomColor: (color: HslColor) => void;
  setHighlightColor: (color: HslColor | null) => void;
  themeConfig: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyTheme(config: ThemeConfig) {
  const root = document.documentElement;
  
  // Primary colors
  root.style.setProperty("--primary", config.primary);
  root.style.setProperty("--primary-foreground", config.primaryForeground);
  
  // Accent colors
  root.style.setProperty("--accent", config.accent);
  root.style.setProperty("--accent-foreground", config.accentForeground);
  
  // Ring
  root.style.setProperty("--ring", config.ring);
  
  // Sidebar
  root.style.setProperty("--sidebar-primary", config.primary);
  root.style.setProperty("--sidebar-ring", config.ring);
  
  // Brand colors
  root.style.setProperty("--brand-primary", config.primary);
  root.style.setProperty("--brand-primary-hover", config.primaryHover);
  root.style.setProperty("--brand-primary-active", config.primaryActive);
  root.style.setProperty("--brand-light-accent", config.lightAccent);
  root.style.setProperty("--brand-gradient-primary", config.gradient);
  
  // Highlight color
  root.style.setProperty("--brand-highlight", config.highlight);
  root.style.setProperty("--brand-highlight-foreground", config.highlightForeground);
  
  // Shadows
  root.style.setProperty("--shadow-glow", config.shadowGlow);
  root.style.setProperty("--shadow-glow-primary", config.shadowGlow);
  
  // Chart colors
  root.style.setProperty("--chart-1", config.primary);
}

interface ThemeProviderProps {
  children: ReactNode;
}

function loadStoredTheme(): ThemeColor {
  if (typeof window === "undefined") return DEFAULT_THEME;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "custom") return "custom";
  if (stored && isPresetTheme(stored)) return stored;
  return DEFAULT_THEME;
}

function loadStoredCustomColor(): HslColor {
  if (typeof window === "undefined") return DEFAULT_CUSTOM_COLOR;
  
  try {
    const stored = localStorage.getItem(CUSTOM_COLOR_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (typeof parsed.h === "number" && typeof parsed.s === "number" && typeof parsed.l === "number") {
        return parsed;
      }
    }
  } catch {
    // Ignore parse errors
  }
  return DEFAULT_CUSTOM_COLOR;
}

function loadStoredHighlightColor(): HslColor | null {
  if (typeof window === "undefined") return null;
  
  try {
    const stored = localStorage.getItem(HIGHLIGHT_COLOR_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (typeof parsed.h === "number" && typeof parsed.s === "number" && typeof parsed.l === "number") {
        return parsed;
      }
    }
  } catch {
    // Ignore parse errors
  }
  return null;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeColor>(loadStoredTheme);
  const [customColor, setCustomColorState] = useState<HslColor>(loadStoredCustomColor);
  const [highlightColor, setHighlightColorState] = useState<HslColor | null>(loadStoredHighlightColor);

  const themeConfig = getThemeConfig(theme, customColor, highlightColor ?? undefined);

  useEffect(() => {
    applyTheme(themeConfig);
  }, [themeConfig]);

  const setTheme = (newTheme: ThemeColor) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    saveThemeToDatabase(newTheme, customColor, highlightColor);
  };

  const setCustomColor = (color: HslColor) => {
    setCustomColorState(color);
    setThemeState("custom");
    localStorage.setItem(STORAGE_KEY, "custom");
    localStorage.setItem(CUSTOM_COLOR_KEY, JSON.stringify(color));
    saveThemeToDatabase("custom", color, highlightColor);
  };

  const setHighlightColor = (color: HslColor | null) => {
    setHighlightColorState(color);
    if (color) {
      localStorage.setItem(HIGHLIGHT_COLOR_KEY, JSON.stringify(color));
    } else {
      localStorage.removeItem(HIGHLIGHT_COLOR_KEY);
    }
    // If setting a highlight, ensure we're in custom mode
    if (color && theme !== "custom") {
      setThemeState("custom");
      localStorage.setItem(STORAGE_KEY, "custom");
    }
    saveThemeToDatabase(theme, customColor, color);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      customColor, 
      highlightColor, 
      setTheme, 
      setCustomColor, 
      setHighlightColor,
      themeConfig 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Placeholder for future Supabase integration
async function saveThemeToDatabase(theme: ThemeColor, customColor: HslColor, highlightColor: HslColor | null): Promise<void> {
  // TODO: When Supabase is connected:
  // await supabase.from('user_preferences').upsert({ theme, custom_color: customColor, highlight_color: highlightColor })
  console.log("Theme preference ready for database:", { theme, customColor, highlightColor });
}