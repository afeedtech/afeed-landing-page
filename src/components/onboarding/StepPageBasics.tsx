import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepPageBasicsProps {
  pageName: string;
  pageHandle: string;
  onPageNameChange: (name: string) => void;
  onPageHandleChange: (handle: string) => void;
  onContinue: () => void;
}

export function StepPageBasics({
  pageName,
  pageHandle,
  onPageNameChange,
  onPageHandleChange,
  onContinue,
}: StepPageBasicsProps) {
  const { t } = useTranslation();
  const [isCheckingHandle, setIsCheckingHandle] = useState(false);
  const [handleAvailable, setHandleAvailable] = useState<boolean | null>(null);

  // Auto-generate handle from name
  useEffect(() => {
    if (pageName && !pageHandle) {
      const generated = pageName
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9]/g, '');
      onPageHandleChange(generated);
    }
  }, [pageName, pageHandle, onPageHandleChange]);

  // Mock handle availability check
  useEffect(() => {
    if (!pageHandle) {
      setHandleAvailable(null);
      return;
    }

    setIsCheckingHandle(true);
    const timer = setTimeout(() => {
      // Mock: handles containing "taken" are unavailable
      setHandleAvailable(!pageHandle.toLowerCase().includes('taken'));
      setIsCheckingHandle(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pageHandle]);

  const isValid = pageName.length > 0 && pageHandle.length > 0 && handleAvailable === true;

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
        {t('onboarding.step2.title')}
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="pageName">{t('onboarding.step2.pageName')}</Label>
          <Input
            id="pageName"
            type="text"
            value={pageName}
            onChange={(e) => onPageNameChange(e.target.value)}
            placeholder="Sarah Smith"
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pageHandle">{t('onboarding.step2.pageHandle')}</Label>
          <div className="relative">
            <div className="flex items-center">
              <span className="h-12 px-4 flex items-center bg-muted/50 border border-e-0 border-input rounded-s-xl text-muted-foreground text-sm">
                afeed.co/
              </span>
              <Input
                id="pageHandle"
                type="text"
                value={pageHandle}
                onChange={(e) =>
                  onPageHandleChange(
                    e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '')
                  )
                }
                placeholder="sarahsmith"
                className="h-12 rounded-none rounded-e-xl border-s-0"
              />
            </div>
            {pageHandle && (
              <div className="absolute end-3 top-1/2 -translate-y-1/2">
                {isCheckingHandle ? (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                ) : handleAvailable ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-destructive" />
                )}
              </div>
            )}
          </div>
          {pageHandle && !isCheckingHandle && (
            <p
              className={cn(
                'text-sm',
                handleAvailable ? 'text-green-600 dark:text-green-400' : 'text-destructive'
              )}
            >
              {handleAvailable
                ? t('onboarding.step2.available')
                : t('onboarding.step2.taken')}
            </p>
          )}
        </div>

        <Button
          onClick={onContinue}
          disabled={!isValid}
          className="w-full h-12 rounded-xl brand-gradient-primary text-white shadow-lg shadow-primary/25"
        >
          {t('onboarding.continue')}
        </Button>
      </div>
    </div>
  );
}
