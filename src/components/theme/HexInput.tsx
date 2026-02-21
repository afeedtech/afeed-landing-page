import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { HslColor, hexToHsl, hslToHex, isValidHex } from "@/lib/colorUtils";

interface HexInputProps {
  color: HslColor;
  onChange: (color: HslColor) => void;
}

export function HexInput({ color, onChange }: HexInputProps) {
  const [inputValue, setInputValue] = useState(() => hslToHex(color));
  const [isEditing, setIsEditing] = useState(false);

  // Update input when color changes externally (not while editing)
  useEffect(() => {
    if (!isEditing) {
      setInputValue(hslToHex(color));
    }
  }, [color, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase();
    
    // Ensure # prefix
    if (!value.startsWith("#")) {
      value = "#" + value.replace(/#/g, "");
    }
    
    // Limit to 7 characters (#XXXXXX)
    value = value.slice(0, 7);
    
    setInputValue(value);
    
    // Only update color if valid hex
    const hexWithoutHash = value.slice(1);
    if (isValidHex(hexWithoutHash) && (hexWithoutHash.length === 3 || hexWithoutHash.length === 6)) {
      onChange(hexToHsl(value));
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    // Reset to valid color on blur if invalid
    if (!isValidHex(inputValue.slice(1))) {
      setInputValue(hslToHex(color));
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-8 rounded-md border border-border shadow-sm shrink-0"
        style={{ backgroundColor: hslToHex(color) }}
      />
      <Input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsEditing(true)}
        onBlur={handleBlur}
        className="font-mono text-sm w-24"
        placeholder="#000000"
      />
    </div>
  );
}
