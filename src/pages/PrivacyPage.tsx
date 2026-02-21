import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '@/components/landing/LanguageToggle';
import afeedLogoEn from '@/assets/afeed-logo-en.svg';
import afeedLogoAr from '@/assets/afeed-logo-ar.svg';

export default function PrivacyPage() {
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation();
  const logo = language === 'ar' ? afeedLogoAr : afeedLogoEn;

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="Afeed" className="h-8 sm:h-10" />
          </Link>
          <LanguageToggle variant="minimal" />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {language === 'ar' ? <PrivacyContentAr /> : <PrivacyContentEn />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{t('footer.copyright')}</p>
          <div className="flex gap-4">
            <Link to="/terms" className="hover:text-foreground transition-colors">{t('footer.terms')}</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">{t('footer.privacy')}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PrivacyContentEn() {
  return (
    <article className="prose prose-lg max-w-none dark:prose-invert">
      <h1>Afeed – Privacy Policy</h1>
      <p><strong>Effective Date:</strong> 09 August 2025</p>
      <p><strong>Legal Entity:</strong> Afeed Company for Website and Application Development W.L.L., Kuwait</p>
      <p><strong>Contact:</strong> info@afeed.co</p>

      <h2>1. Introduction & Legal Compliance</h2>
      <p>Afeed is committed to safeguarding the personal data of all Users and Content Creators. This Privacy Policy sets forth the principles, scope, and obligations under which Afeed collects, stores, uses, and discloses information.</p>
      <p>This section is intended to comply with the Kuwait Personal Data Protection Law (Law No. 20 of 2021) and relevant international best practices.</p>

      <h2>2. Data Collected</h2>
      <p>Afeed may collect the following categories of personal and system data:</p>
      <ul>
        <li><strong>Identification Data:</strong> Name, email address, phone number, country of residence, and, where applicable, civil ID (Kuwait nationals and residents);</li>
        <li><strong>Billing & Transaction Data:</strong> Credit card information, payment confirmation logs, refund records, and payout summaries;</li>
        <li><strong>Usage Data:</strong> Pages accessed, time spent on content, device/browser information, IP address, and login history;</li>
        <li><strong>Communication Data:</strong> Emails, inquiries, support tickets, and any internal correspondence within the Platform.</li>
      </ul>
      <p>Data is collected through:</p>
      <ul>
        <li>Account creation and subscription forms;</li>
        <li>Payment gateway integrations;</li>
        <li>Session tracking and cookie usage;</li>
        <li>Voluntary interactions with Afeed's support team.</li>
      </ul>

      <h2>3. Purpose of Collection</h2>
      <p>Collected data is used for the following lawful purposes:</p>
      <ul>
        <li>Enabling secure access to Platform services;</li>
        <li>Processing payments and disbursing Creator earnings;</li>
        <li>Personalizing the user experience and improving performance;</li>
        <li>Complying with anti-fraud, tax, and financial services regulations;</li>
        <li>Responding to customer service inquiries and enforcing this Agreement.</li>
      </ul>
      <p>Afeed does not use personal data for profiling, automated decision-making, or advertising without explicit consent.</p>

      <h2>4. Data Storage & Security</h2>
      <p>All personal data is securely stored using Amazon Web Services (AWS) and DigitalOcean infrastructure with end-to-end encryption and restricted access protocols. Afeed is evaluating final regional hosting locations in compliance with data residency requirements in Kuwait.</p>
      <p>Afeed applies reasonable administrative, physical, and technical safeguards to prevent data loss, unauthorized access, and misuse.</p>
      <p>In the event of a data breach affecting User or Creator data, Afeed will notify affected parties in accordance with the applicable breach notification timelines under Kuwaiti law.</p>

      <h2>5. Data Retention & Deletion</h2>
      <p>User and Creator data is retained only for as long as necessary to fulfill the purposes outlined above. Upon voluntary account deletion, data will be purged within thirty (30) business days, unless subject to:</p>
      <ul>
        <li>Outstanding disputes;</li>
        <li>Legal obligations under banking or AML regulations;</li>
        <li>Historical audit trail requirements.</li>
      </ul>
      <p>Users may submit requests to:</p>
      <ul>
        <li>Access their data;</li>
        <li>Correct inaccuracies;</li>
        <li>Permanently delete their information (where feasible);</li>
        <li>Object to specific uses of their data.</li>
      </ul>
      <p>All such requests must be directed to info@afeed.co and will be reviewed in accordance with applicable legal guidelines.</p>

      <h2>6. Third-Party Data Access</h2>
      <p>Afeed does not sell, rent, or share personal data for marketing purposes.</p>
      <p>Data may be shared with third-party processors (e.g., UPayments) solely for:</p>
      <ul>
        <li>Payment processing;</li>
        <li>Fraud prevention;</li>
        <li>Service delivery as part of the Platform's technical infrastructure.</li>
      </ul>
      <p>All third-party processors are contractually bound to uphold equivalent data protection and confidentiality standards.</p>
    </article>
  );
}

function PrivacyContentAr() {
  return (
    <article className="prose prose-lg max-w-none dark:prose-invert" dir="rtl">
      <h1>أفيد – سياسة الخصوصية</h1>
      <p><strong>تاريخ النفاذ:</strong> ٩ أغسطس ٢٠٢٥</p>
      <p><strong>الكيان القانوني:</strong> شركة أفيد لتطوير المواقع والتطبيقات ذ.م.م، الكويت</p>
      <p><strong>للتواصل:</strong> info@afeed.co</p>

      <h2>١. المقدمة والالتزام القانوني</h2>
      <p>تلتزم أفيد بحماية البيانات الشخصية لجميع المستخدمين وصنّاع المحتوى. تحدد سياسة الخصوصية هذه المبادئ والنطاق والالتزامات التي تحكم جمع البيانات وتخزينها واستخدامها والكشف عنها.</p>
      <p>تهدف هذه السياسة إلى الامتثال لقانون حماية البيانات الشخصية الكويتي (قانون رقم ٢٠ لسنة ٢٠٢١) وأفضل الممارسات الدولية ذات الصلة.</p>

      <h2>٢. البيانات التي يتم جمعها</h2>
      <p>يجوز لأفيد جمع الفئات التالية من البيانات الشخصية وبيانات الأنظمة:</p>
      <ul>
        <li><strong>بيانات التعريف:</strong> الاسم، عنوان البريد الإلكتروني، رقم الهاتف، دولة الإقامة، وعند الاقتضاء، الرقم المدني (للكويتيين والمقيمين).</li>
        <li><strong>بيانات الفوترة والمعاملات:</strong> معلومات البطاقة، سجلات تأكيد الدفع، سجلات الاسترداد، وملخصات التحويلات.</li>
        <li><strong>بيانات الاستخدام:</strong> الصفحات التي تم الوصول إليها، زمن مشاهدة المحتوى، معلومات الجهاز/المتصفح، عنوان بروتوكول الإنترنت (IP)، وسجلات تسجيل الدخول.</li>
        <li><strong>بيانات التواصل:</strong> الرسائل الإلكترونية، الاستفسارات، تذاكر الدعم، وأي مراسلات داخل المنصة.</li>
      </ul>
      <p>يتم جمع البيانات من خلال:</p>
      <ul>
        <li>نماذج إنشاء الحساب والاشتراك؛</li>
        <li>تكاملات بوابة الدفع؛</li>
        <li>تتبع الجلسات واستخدام ملفات تعريف الارتباط؛</li>
        <li>التفاعلات الطوعية مع فريق دعم أفيد.</li>
      </ul>

      <h2>٣. الغرض من الجمع</h2>
      <p>تُستخدم البيانات المجمعة للأغراض المشروعة التالية:</p>
      <ul>
        <li>تمكين الوصول الآمن إلى خدمات المنصة؛</li>
        <li>معالجة المدفوعات وتحويل أرباح صنّاع المحتوى؛</li>
        <li>تخصيص تجربة المستخدم وتحسين الأداء؛</li>
        <li>الامتثال لمتطلبات مكافحة الاحتيال والضرائب واللوائح المالية؛</li>
        <li>الاستجابة لاستفسارات خدمة العملاء وإنفاذ هذه الاتفاقية.</li>
      </ul>
      <p>لا تستخدم أفيد البيانات الشخصية لأغراض التحليل الشخصي (Profiling) أو اتخاذ القرارات المؤتمتة أو الإعلانات دون موافقة صريحة من صاحب البيانات.</p>

      <h2>٤. تخزين وأمن البيانات</h2>
      <p>تُخزَّن البيانات الشخصية باستخدام بنية تحتية لدى Amazon Web Services (AWS) و DigitalOcean مع تطبيق تشفير شامل وبروتوكولات وصول مقيدة. وتقوم أفيد بتقييم مواقع الاستضافة الإقليمية النهائية بما يتوافق مع متطلبات إقامة البيانات في دولة الكويت.</p>
      <p>تطبّق أفيد تدابير إدارية وفيزيائية وتقنية معقولة لمنع فقدان البيانات أو الوصول غير المصرح به أو إساءة استخدامها.</p>
      <p>في حال حدوث اختراق أمني يؤثر على بيانات المستخدمين أو صنّاع المحتوى، ستقوم أفيد بإخطار الأطراف المتأثرة وفق الجداول الزمنية المنصوص عليها في القوانين الكويتية السارية.</p>

      <h2>٥. الاحتفاظ بالبيانات وحذفها</h2>
      <p>تُحتفظ بالبيانات فقط للمدة اللازمة لتحقيق الأغراض الموضحة أعلاه. عند الإلغاء الطوعي للحساب، يتم حذف البيانات خلال ثلاثين (٣٠) يوم عمل، ما لم يكن هناك:</p>
      <ul>
        <li>نزاعات أو مطالبات قائمة؛</li>
        <li>التزامات قانونية بموجب قوانين البنوك أو مكافحة غسل الأموال؛</li>
        <li>متطلبات حفظ السجلات لأغراض التدقيق أو الأرشفة.</li>
      </ul>
      <p>يمكن للمستخدمين تقديم طلبات:</p>
      <ul>
        <li>الوصول إلى بياناتهم؛</li>
        <li>تصحيح الأخطاء؛</li>
        <li>حذف بياناتهم بشكل دائم (إذا كان ذلك ممكنًا قانونًا)؛</li>
        <li>الاعتراض على استخدامات محددة لبياناتهم.</li>
      </ul>
      <p>يجب إرسال جميع الطلبات إلى info@afeed.co وستتم مراجعتها وفقًا للإرشادات القانونية المعمول بها.</p>

      <h2>٦. وصول الأطراف الثالثة إلى البيانات</h2>
      <p>لا تقوم أفيد ببيع أو تأجير أو مشاركة البيانات الشخصية لأغراض تسويقية.</p>
      <p>وقد تُشارك البيانات مع معالجي بيانات خارجيين (مثل مقدم خدمات الدفع) حصريًا من أجل:</p>
      <ul>
        <li>معالجة المدفوعات؛</li>
        <li>منع الاحتيال؛</li>
        <li>تقديم الخدمات بصفتها جزءًا من البنية التقنية للمنصة.</li>
      </ul>
      <p>وجميع معالجي البيانات الخارجيين لدى أفيد مرتبطون تعاقديًا بالالتزام بمعايير حماية البيانات والسرية المكافئة لتلك المطبقة.</p>
    </article>
  );
}
