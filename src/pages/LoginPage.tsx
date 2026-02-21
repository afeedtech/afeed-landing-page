import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LanguageToggle } from '@/components/landing/LanguageToggle';
import { SocialLoginButtons, ForgotPasswordModal } from '@/components/auth';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import afeedLogoEn from '@/assets/afeed-logo-en.svg';
import afeedLogoAr from '@/assets/afeed-logo-ar.svg';

export default function LoginPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'apple' | null>(null);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const logo = language === 'ar' ? afeedLogoAr : afeedLogoEn;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(t('auth.fillAllFields'));
      return;
    }

    if (!email.includes('@')) {
      setError(t('auth.invalidEmail'));
      return;
    }

    // Mock invalid credentials for demo
    if (email.includes('invalid')) {
      setError(t('auth.invalidCredentials'));
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigate('/app');
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setLoadingProvider(provider);
    setError('');
    // Simulate social login
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoadingProvider(null);
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link to="/">
          <img src={logo} alt="Afeed" className="h-10 md:h-12" />
        </Link>
        <LanguageToggle />
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-3xl border border-border/50 shadow-xl p-8 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {t('login.title')}
              </h1>
              <p className="text-muted-foreground mt-2">
                {t('login.helperText')}
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="mb-6">
              <SocialLoginButtons
                onGoogleClick={() => handleSocialLogin('google')}
                onAppleClick={() => handleSocialLogin('apple')}
                isLoading={loadingProvider !== null}
                loadingProvider={loadingProvider}
              />
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-muted-foreground">
                  {t('auth.or')}
                </span>
              </div>
            </div>

            {/* Email Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">{t('login.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-12 rounded-xl"
                  disabled={isLoading || loadingProvider !== null}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('login.password')}</Label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-primary hover:underline"
                  >
                    {t('login.forgotPassword')}
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 rounded-xl"
                  disabled={isLoading || loadingProvider !== null}
                />
              </div>

              {error && (
                <p className="text-sm text-destructive text-center animate-in fade-in">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full h-12 rounded-xl brand-gradient-primary text-white shadow-lg shadow-primary/25"
                disabled={isLoading || loadingProvider !== null}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  t('login.submit')
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {t('login.noAccount')}{' '}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                {t('login.signUp')}
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        open={showForgotPassword}
        onOpenChange={setShowForgotPassword}
      />
    </div>
  );
}
