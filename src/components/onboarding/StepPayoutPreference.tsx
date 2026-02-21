import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarDays, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepPayoutPreferenceProps {
  selected: string;
  onSelect: (preference: string) => void;
  onComplete: () => void;
}

const payoutOptions = [
  { id: 'weekly', icon: Calendar },
  { id: 'monthly', icon: CalendarDays },
  { id: 'immediate', icon: Zap },
];

export function StepPayoutPreference({
  selected,
  onSelect,
  onComplete,
}: StepPayoutPreferenceProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-md mx-auto text-center animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
        {t('onboarding.step3.title')}
      </h2>

      <div className="space-y-3 mb-6">
        {payoutOptions.map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={cn(
              'w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 text-start',
              selected === id
                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                : 'border-border/60 bg-card hover:border-primary/50'
            )}
          >
            <div
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                selected === id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p
                className={cn(
                  'font-semibold transition-colors',
                  selected === id ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {t(`onboarding.step3.${id}`)}
              </p>
              <p className="text-sm text-muted-foreground">
                {t(`onboarding.step3.${id}Desc`)}
              </p>
            </div>
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-6">{t('onboarding.step3.helper')}</p>

      <Button
        onClick={onComplete}
        className="h-12 px-8 rounded-xl brand-gradient-primary text-white shadow-lg shadow-primary/25"
      >
        {t('onboarding.goToMyPage')}
      </Button>
    </div>
  );
}
