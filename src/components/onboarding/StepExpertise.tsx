import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BookOpen, Target, Dumbbell, Briefcase, Palette, Sparkles } from 'lucide-react';

interface StepExpertiseProps {
  selected: string[];
  onSelect: (expertise: string[]) => void;
  onContinue: () => void;
}

const expertiseOptions = [
  { id: 'education', icon: BookOpen },
  { id: 'coaching', icon: Target },
  { id: 'fitness', icon: Dumbbell },
  { id: 'business', icon: Briefcase },
  { id: 'creative', icon: Palette },
  { id: 'other', icon: Sparkles },
];

export function StepExpertise({ selected, onSelect, onContinue }: StepExpertiseProps) {
  const { t } = useTranslation();

  const toggleExpertise = (id: string) => {
    if (selected.includes(id)) {
      onSelect(selected.filter((s) => s !== id));
    } else {
      onSelect([...selected, id]);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto text-center animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
        {t('onboarding.step1.title')}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {expertiseOptions.map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => toggleExpertise(id)}
            className={cn(
              'p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02]',
              selected.includes(id)
                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                : 'border-border/60 bg-card hover:border-primary/50'
            )}
          >
            <Icon
              className={cn(
                'h-8 w-8 mx-auto mb-3 transition-colors',
                selected.includes(id) ? 'text-primary' : 'text-muted-foreground'
              )}
            />
            <span
              className={cn(
                'font-medium transition-colors',
                selected.includes(id) ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {t(`onboarding.step1.${id}`)}
            </span>
          </button>
        ))}
      </div>

      <Button
        onClick={onContinue}
        disabled={selected.length === 0}
        className="h-12 px-8 rounded-xl brand-gradient-primary text-white shadow-lg shadow-primary/25"
      >
        {t('onboarding.continue')}
      </Button>
    </div>
  );
}
