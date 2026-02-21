import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from './LanguageToggle';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import afeedLogoEn from '@/assets/afeed-logo-en.svg';
import afeedLogoAr from '@/assets/afeed-logo-ar.svg';
import afeedIcon from '@/assets/afeed-logo-icon.svg';

export function LandingHeader() {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const logo = language === 'ar' ? afeedLogoAr : afeedLogoEn;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();

  const navItems = [
    { label: t('nav.features'), href: '#why-afeed' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.faq'), href: '#faq' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-sm" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo - Much larger */}
          <button onClick={() => handleNavClick('#hero')} className="flex items-center gap-2 group">
            <img 
              src={logo} 
              alt="Afeed" 
              className="h-12 md:h-14 transition-transform group-hover:scale-105" 
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            <Link to="/login">
              <Button variant="ghost" size="sm" className="font-medium">
                {t('nav.login')}
              </Button>
            </Link>
            <Link to="/signup">
              <Button 
                size="sm" 
                className="brand-gradient-primary text-white font-semibold px-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all group"
              >
                {t('nav.startFree')}
                <img src={afeedIcon} alt="" className={cn(
                  "ms-2 h-5 w-5 brightness-0 invert transition-transform",
                  isRTL ? "rotate-[205deg] group-hover:-translate-x-1" : "rotate-[25deg] group-hover:translate-x-1"
                )} />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground rounded-xl hover:bg-muted transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        'lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border transition-all duration-300',
        mobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
      )}>
        <div className="px-4 py-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="block w-full text-start text-base font-medium text-foreground py-3 px-4 rounded-xl hover:bg-muted transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-border space-y-3">
            <LanguageToggle className="justify-center" />
            <Link to="/login" className="block">
              <Button variant="outline" className="w-full h-12 text-base font-medium">
                {t('nav.login')}
              </Button>
            </Link>
            <Link to="/signup" className="block">
              <Button className="w-full h-12 text-base font-semibold brand-gradient-primary text-white group">
                {t('nav.startFree')}
                <img src={afeedIcon} alt="" className={cn(
                  "ms-2 h-5 w-5 brightness-0 invert transition-transform",
                  isRTL ? "rotate-[205deg] group-hover:-translate-x-1" : "rotate-[25deg] group-hover:translate-x-1"
                )} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
