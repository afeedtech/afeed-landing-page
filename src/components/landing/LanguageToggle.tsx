import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export function LanguageToggle({ variant = 'default', className }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={cn(
      'flex items-center gap-1 rounded-full p-1',
      variant === 'default' && 'bg-muted/50',
      className
    )}>
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          'px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200',
          language === 'en'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={cn(
          'px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200',
          language === 'ar'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        العربية
      </button>
    </div>
  );
}
