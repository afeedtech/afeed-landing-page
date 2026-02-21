import { useTranslation } from "react-i18next";
import { Globe, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageLanguageMode } from "@/components/profile/types";

interface StepLanguageProps {
  selected: PageLanguageMode | null;
  onSelect: (mode: PageLanguageMode) => void;
}

const languageOptions: { 
  value: PageLanguageMode; 
  labelKey: string; 
  descKey: string;
  icon: "globe" | "languages";
}[] = [
  { value: "en", labelKey: "onboarding.stepLanguage.optionEn", descKey: "onboarding.stepLanguage.optionEnDesc", icon: "globe" },
  { value: "ar", labelKey: "onboarding.stepLanguage.optionAr", descKey: "onboarding.stepLanguage.optionArDesc", icon: "globe" },
  { value: "bilingual", labelKey: "onboarding.stepLanguage.optionBoth", descKey: "onboarding.stepLanguage.optionBothDesc", icon: "languages" },
];

export function StepLanguage({ selected, onSelect }: StepLanguageProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          {t("onboarding.stepLanguage.title")}
        </h2>
        <p className="text-muted-foreground">
          {t("onboarding.stepLanguage.subtitle")}
        </p>
      </div>

      <div className="grid gap-4 max-w-md mx-auto">
        {languageOptions.map((option) => {
          const isSelected = selected === option.value;
          const Icon = option.icon === "languages" ? Languages : Globe;
          
          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-start",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50",
                isRTL && "flex-row-reverse text-end"
              )}
            >
              <div
                className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                )}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{t(option.labelKey)}</p>
                <p className="text-sm text-muted-foreground">
                  {t(option.descKey)}
                </p>
              </div>
              {isSelected && (
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
