import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '@/components/landing/LanguageToggle';
import {
  OnboardingProgress,
  StepLanguage,
  StepExpertise,
  StepPageBasics,
  StepPayoutPreference,
} from '@/components/onboarding';
import { useProfile } from '@/context/ProfileContext';
import { PageLanguageMode } from '@/components/profile/types';
import { useLanguage } from '@/context/LanguageContext';
import afeedLogoEn from '@/assets/afeed-logo-en.svg';
import afeedLogoAr from '@/assets/afeed-logo-ar.svg';

export default function OnboardingPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { setPageLanguage } = useProfile();
  const [currentStep, setCurrentStep] = useState(0);
  
  const logo = language === 'ar' ? afeedLogoAr : afeedLogoEn;

  // Step 0: Page Language
  const [pageLanguageSelection, setPageLanguageSelection] = useState<PageLanguageMode | null>(null);

  // Step 1: Expertise
  const [expertise, setExpertise] = useState<string[]>([]);

  // Step 2: Page basics
  const [pageName, setPageName] = useState('');
  const [pageHandle, setPageHandle] = useState('');

  // Step 3: Payout preference
  const [payoutPreference, setPayoutPreference] = useState('weekly');

  const handleSkip = () => {
    navigate('/app');
  };

  const handleComplete = () => {
    // Save page language to profile context
    if (pageLanguageSelection) {
      setPageLanguage(pageLanguageSelection);
    }
    // Mock save onboarding data
    console.log('Onboarding data:', { pageLanguage: pageLanguageSelection, expertise, pageName, pageHandle, payoutPreference });
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link to="/">
          <img src={logo} alt="Afeed" className="h-10 md:h-12" />
        </Link>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <button
            onClick={handleSkip}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('onboarding.skip')}
          </button>
        </div>
      </header>

      {/* Progress */}
      <div className="py-6">
        <OnboardingProgress currentStep={currentStep} totalSteps={4} />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 pb-12">
        {currentStep === 0 && (
          <div className="w-full max-w-2xl space-y-8">
            <StepLanguage
              selected={pageLanguageSelection}
              onSelect={(mode) => {
                setPageLanguageSelection(mode);
                setCurrentStep(1);
              }}
            />
          </div>
        )}

        {currentStep === 1 && (
          <StepExpertise
            selected={expertise}
            onSelect={setExpertise}
            onContinue={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <StepPageBasics
            pageName={pageName}
            pageHandle={pageHandle}
            onPageNameChange={setPageName}
            onPageHandleChange={setPageHandle}
            onContinue={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 3 && (
          <StepPayoutPreference
            selected={payoutPreference}
            onSelect={setPayoutPreference}
            onComplete={handleComplete}
          />
        )}
      </main>
    </div>
  );
}
