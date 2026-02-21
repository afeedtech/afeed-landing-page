import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Instagram } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';
import afeedLogoEn from '@/assets/afeed-logo-en.svg';
import afeedLogoAr from '@/assets/afeed-logo-ar.svg';

export function LandingFooter() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  const logo = language === 'ar' ? afeedLogoAr : afeedLogoEn;

  const productLinks = [
    { labelKey: 'footer.features', href: '#features' },
    { labelKey: 'footer.pricing', href: '#pricing' },
  ];

  const legalLinks = [
    { labelKey: 'footer.terms', href: '/terms' },
    { labelKey: 'footer.privacy', href: '/privacy' },
    { labelKey: 'footer.contact', href: '/contact' },
  ];

  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo & description */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src={logo} alt="Afeed" className="h-12 brightness-0 invert" />
            </Link>
            <p className="text-sidebar-foreground/70 text-sm leading-relaxed mb-6 max-w-xs">
              {t('footer.description')}
            </p>
            
            {/* Social - Instagram only */}
            <div className="flex items-center gap-3">
              <a 
                href="https://www.instagram.com/afeed.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-sidebar-accent flex items-center justify-center text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-sm text-sidebar-foreground mb-4">{t('footer.product')}</h4>
            <ul className="space-y-3">
              {productLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm text-sidebar-foreground mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-3">
              {legalLinks.map((link, i) => (
                <li key={i}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
                      {t(link.labelKey)}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
                      {t(link.labelKey)}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-sidebar-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-sidebar-foreground/60">
              {t('footer.copyright')}
            </p>
            <LanguageToggle variant="minimal" className="bg-sidebar-accent" />
          </div>
        </div>
      </div>
    </footer>
  );
}