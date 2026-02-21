import { useTheme } from "@/hooks/useTheme";
import { ColorWheel } from "./ColorWheel";
import { ColorPresets } from "./ColorPresets";
import { HexInput } from "./HexInput";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ThemeColor } from "@/lib/themes";
import { DEFAULT_CUSTOM_COLOR } from "@/lib/themes";

export function ThemeSelector() {
  const { theme, customColor, highlightColor, setTheme, setCustomColor, setHighlightColor } = useTheme();

  const handlePresetSelect = (presetTheme: Exclude<ThemeColor, "custom">) => {
    setTheme(presetTheme);
  };

  const isHighlightEnabled = highlightColor !== null;

  const handleHighlightToggle = (enabled: boolean) => {
    if (enabled) {
      // Default highlight: shift hue by 30° from primary
      const defaultHighlight = {
        h: (customColor.h + 30) % 360,
        s: customColor.s,
        l: Math.min(100, customColor.l + 10),
      };
      setHighlightColor(defaultHighlight);
    } else {
      setHighlightColor(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Quick Presets */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Quick Select</Label>
        <ColorPresets onSelect={handlePresetSelect} selectedTheme={theme} />
      </div>

      {/* Primary Color Picker */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Primary Color</Label>
        <div className="flex gap-4 items-start">
          <ColorWheel color={customColor} onChange={setCustomColor} />
          <div className="space-y-3 pt-1">
            <HexInput color={customColor} onChange={setCustomColor} />
            <p className="text-xs text-muted-foreground">
              Pick any color or enter a hex code
            </p>
          </div>
        </div>
      </div>

      {/* Secondary/Highlight Color Toggle */}
      <div className="space-y-3 pt-2 border-t border-border">
        <div className="flex items-center justify-between pt-3">
          <div>
            <Label className="text-sm font-medium">Secondary Color</Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Used for gradients and Featured badges
            </p>
          </div>
          <Switch 
            checked={isHighlightEnabled} 
            onCheckedChange={handleHighlightToggle}
          />
        </div>

        {/* Secondary Color Picker (shown when enabled) */}
        {isHighlightEnabled && highlightColor && (
          <div className="flex gap-4 items-start pt-2">
            <ColorWheel color={highlightColor} onChange={setHighlightColor} />
            <div className="space-y-3 pt-1">
              <HexInput color={highlightColor} onChange={setHighlightColor} />
              <p className="text-xs text-muted-foreground">
                Choose a complementary color
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Live Preview */}
      <div className="space-y-2 pt-2 border-t border-border">
        <Label className="text-xs text-muted-foreground pt-3 block">Preview</Label>
        <div className="flex items-center gap-3">
          <div 
            className="h-10 flex-1 rounded-lg"
            style={{ background: 'var(--brand-gradient-primary)' }}
          />
          <div 
            className="h-10 w-20 rounded-lg flex items-center justify-center text-xs font-medium"
            style={{ 
              backgroundColor: `hsl(var(--brand-highlight))`,
              color: `hsl(var(--brand-highlight-foreground))`
            }}
          >
            Featured
          </div>
        </div>
      </div>
    </div>
  );
}