import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LandingHeader, LandingFooter } from '@/components/landing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';

export default function ContactPage() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !subject.trim() || !message.trim()) return;
    setSending(true);
    // Simulate send
    setTimeout(() => {
      setSending(false);
      toast.success(t('contact.successMessage'));
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1000);
  };

  const whatsappNumber = '96566602497';
  const whatsappUrl = `https://wa.me/${encodeURIComponent(whatsappNumber)}`;

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        {/* Hero band */}
        <div className="bg-primary pt-32 pb-24" />

        {/* Form card overlapping hero */}
        <div className="max-w-2xl mx-auto px-4 -mt-16 pb-20">
          <div className="bg-card rounded-2xl shadow-xl p-8 sm:p-10">
            <h1 className="text-2xl font-bold text-primary text-center mb-2">
              {t('contact.title')}
            </h1>
            <p className="text-muted-foreground text-center mb-8 text-sm">
              {t('contact.subtitle')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">{t('contact.emailLabel')}</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  maxLength={255}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">{t('contact.subjectLabel')}</Label>
                <Input
                  id="subject"
                  required
                  maxLength={200}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t('contact.messageLabel')}</Label>
                <Textarea
                  id="message"
                  required
                  maxLength={2000}
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="w-full h-12 text-base font-semibold brand-gradient-primary text-white"
              >
                {sending ? '...' : t('contact.sendButton')}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground text-center mt-6">
              {t('contact.whatsappPrefix')}{' '}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                {whatsappNumber}
              </a>
            </p>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
