import { useCallback, useEffect, useState } from 'react';

// Get CSS variable value from document
const getCSSVariable = (variable: string): string => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
};

// Convert CSS variable to HSL color string
export const cssVarToHsl = (variable: string): string => {
  const value = getCSSVariable(variable);
  if (!value) return 'hsl(0, 0%, 50%)';
  return `hsl(${value})`;
};

// Chart color palette using CSS variables
export interface ChartColors {
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  foreground: string;
  mutedForeground: string;
  border: string;
  background: string;
  brandPrimary: string;
  brandSecondary: string;
  brandAccent: string;
  success: string;
  warning: string;
  error: string;
}

// Hook to get theme-aware chart colors
export function useChartColors(): ChartColors {
  const [colors, setColors] = useState<ChartColors>(() => getColors());

  function getColors(): ChartColors {
    return {
      primary: cssVarToHsl('--primary'),
      secondary: cssVarToHsl('--secondary'),
      accent: cssVarToHsl('--accent'),
      muted: cssVarToHsl('--muted'),
      foreground: cssVarToHsl('--foreground'),
      mutedForeground: cssVarToHsl('--muted-foreground'),
      border: cssVarToHsl('--border'),
      background: cssVarToHsl('--background'),
      brandPrimary: cssVarToHsl('--brand-primary'),
      brandSecondary: cssVarToHsl('--brand-secondary'),
      brandAccent: cssVarToHsl('--brand-accent'),
      success: cssVarToHsl('--brand-accent'),
      warning: 'hsl(45, 93%, 47%)',
      error: 'hsl(0, 84%, 60%)',
    };
  }

  useEffect(() => {
    // Update colors when theme changes
    const observer = new MutationObserver(() => {
      setColors(getColors());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    // Also listen for storage events (theme changes)
    const handleStorage = () => setColors(getColors());
    window.addEventListener('storage', handleStorage);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return colors;
}

// Get a palette of colors for charts (multiple data series)
export function useChartPalette(count: number = 5): string[] {
  const colors = useChartColors();
  
  // Return a palette based on brand colors with variations
  return [
    colors.brandPrimary,
    colors.brandSecondary,
    colors.brandAccent,
    colors.accent,
    colors.muted,
  ].slice(0, count);
}

// Standard chart axis configuration
export const chartAxisConfig = {
  axisLine: false,
  tickLine: false,
  tick: { fill: 'hsl(var(--muted-foreground))' },
  style: {
    fontSize: 12,
    fontFamily: 'inherit',
  },
};

// Standard chart tooltip styles
export const chartTooltipStyles = {
  contentStyle: {
    backgroundColor: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  labelStyle: {
    color: 'hsl(var(--foreground))',
    fontWeight: 600,
  },
  itemStyle: {
    color: 'hsl(var(--muted-foreground))',
  },
};

// Gradient definitions for area charts
export function getGradientId(name: string): string {
  return `gradient-${name}`;
}

// Standard grid configuration
export const chartGridConfig = {
  strokeDasharray: '3 3',
  stroke: 'hsl(var(--border))',
  vertical: false,
};

// Format currency (KWD)
export function formatCurrency(value: number): string {
  return `${value.toLocaleString('en-US')} KWD`;
}

// Format percentage
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

// Format number with K/M suffix
export function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toLocaleString('en-US');
}

// Format duration (seconds to readable)
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 60) {
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}
