import { useTheme } from "@/hooks/useTheme";
import { ThemeColorCard } from "./ThemeColorCard";
import { PRESET_THEMES, getThemeConfig } from "@/lib/themes";
import { ThemeColor } from "@/lib/themes";

interface ColorPresetsProps {
  onSelect: (theme: Exclude<ThemeColor, "custom">) => void;
  selectedTheme: ThemeColor;
}

export function ColorPresets({ onSelect, selectedTheme }: ColorPresetsProps) {
  return (
    <div className="flex items-center gap-2">
      {PRESET_THEMES.map((themeName) => (
        <ThemeColorCard
          key={themeName}
          config={getThemeConfig(themeName)}
          isSelected={selectedTheme === themeName}
          onClick={() => onSelect(themeName)}
        />
      ))}
    </div>
  );
}
