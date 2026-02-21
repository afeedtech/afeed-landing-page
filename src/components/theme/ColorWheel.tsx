import { HslColorPicker } from "react-colorful";
import { HslColor } from "@/lib/colorUtils";

interface ColorWheelProps {
  color: HslColor;
  onChange: (color: HslColor) => void;
}

export function ColorWheel({ color, onChange }: ColorWheelProps) {
  return (
    <div className="color-wheel-container">
      <HslColorPicker
        color={color}
        onChange={onChange}
      />
      <style>{`
        .color-wheel-container .react-colorful {
          width: 180px;
          height: 180px;
        }
        .color-wheel-container .react-colorful__saturation {
          border-radius: 8px 8px 0 0;
        }
        .color-wheel-container .react-colorful__hue {
          height: 18px;
          border-radius: 0 0 8px 8px;
        }
        .color-wheel-container .react-colorful__pointer {
          width: 20px;
          height: 20px;
          border-width: 3px;
        }
      `}</style>
    </div>
  );
}
