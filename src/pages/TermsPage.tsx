import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '@/components/landing/LanguageToggle';
import afeedLogoEn from '@/assets/afeed-logo-en.svg';
import afeedLogoAr from '@/assets/afeed-logo-ar.svg';

export default function TermsPage() {
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
        {language === 'ar' ? <TermsContentAr /> : <TermsContentEn />}
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

function TermsContentEn() {
  return (
    <article className="prose prose-lg max-w-none dark:prose-invert">
      <h1>Afeed - Terms and Conditions</h1>
      <p><strong>Effective Date:</strong> 09 August 2025</p>
      <p><strong>Legal Entity:</strong> Afeed Company for Website and Application Development W.L.L., Kuwait</p>
      <p><strong>Contact:</strong> info@afeed.co</p>

      <h2>1. Definitions</h2>
      <p>For the purposes of these Terms and Conditions and the associated Privacy Policy (collectively, the "Agreement"), the following definitions shall apply:</p>
      <ul>
        <li><strong>"Afeed"</strong> refers to Afeed Company for Website and Application Development W.L.L., a limited liability company organized and existing under the laws of the State of Kuwait, which owns and operates the Afeed platform, including all associated websites, web-based services, APIs, mobile applications, communication tools, and support channels.</li>
        <li><strong>"Platform"</strong> refers collectively to Afeed's software-as-a-service system, marketplace, hosting infrastructure, and associated tools which facilitate the publication, promotion, distribution, and monetization of digital content and live sessions by Content Creators.</li>
        <li><strong>"Content Creator"</strong> means any natural person, legal entity, or other business enterprise that registers for an account on the Afeed Platform for the primary purpose of uploading, selling, or distributing digital products or live sessions.</li>
        <li><strong>"User"</strong> refers to any natural person or legal entity that accesses the Platform for the purpose of consuming, purchasing, or interacting with digital content or services made available by Content Creators.</li>
        <li><strong>"Digital Products"</strong> include, but are not limited to: pre-recorded video courses, written materials, audio files, presentations, guides, e-books, and downloadable templates.</li>
        <li><strong>"Live Sessions"</strong> refer to real-time, scheduled virtual events including consultations, coaching, and group workshops conducted via the Platform.</li>
        <li><strong>"Subscription Plan"</strong> refers to the payment-based access model which governs the Content Creator's use of the Platform.</li>
        <li><strong>"UPayments"</strong> refers to the third-party licensed payment processor responsible for executing transactions between Users and Afeed.</li>
        <li><strong>"Kuwaiti Law"</strong> means all applicable legislation and regulatory requirements within the State of Kuwait.</li>
        <li><strong>"Force Majeure"</strong> includes all circumstances beyond reasonable control, including war, natural disasters, governmental restrictions, power outages, or system failures.</li>
      </ul>

      <h2>2. Acceptance of Terms</h2>
      <p>By registering for, accessing, or using the Platform, you accept and agree to be legally bound by this Agreement. If you do not accept these Terms in full, you must refrain from using the Platform.</p>
      <p>You affirm that:</p>
      <ul>
        <li>You are at least eighteen (18) years of age or the legal age of majority in your jurisdiction.</li>
        <li>You are legally capable of entering into binding agreements.</li>
        <li>If acting on behalf of an entity, you are duly authorized to bind such entity.</li>
      </ul>
      <p>Afeed may amend this Agreement at any time. Changes will be published on the Platform or communicated via email. Continued use of the Platform constitutes acceptance of the revised Terms.</p>
      <p>This Agreement supersedes all prior agreements, verbal or written, between the parties concerning the subject matter herein.</p>

      <h2>3. Platform Access, Subscription, and Service Scope</h2>
      <h3>3.1 For Content Creators</h3>
      <p>Creators are required to subscribe to one of Afeed's available plans: Basic, Growth, or Pro. Plans are available on monthly or annual billing cycles and renew automatically unless cancelled prior to the renewal date.</p>
      <p>Creators are solely responsible for:</p>
      <ul>
        <li>Setting product pricing and refund terms.</li>
        <li>Delivering purchased services to Users.</li>
        <li>Ensuring content complies with applicable laws and does not infringe third-party rights.</li>
      </ul>
      <p>Afeed reserves the right to modify pricing, feature availability, or service scope at its discretion, provided reasonable notice is given.</p>
      <h3>3.2 For Users</h3>
      <p>Users may access free or paid content. By purchasing, Users agree to the specific Creator's terms and pricing. Users must not reproduce or share purchased content outside the scope of personal use.</p>
      <p>Afeed is not liable for any inaccuracies, failures, or quality deficiencies in content published by independent Creators.</p>
      <h3>3.3 Service Modifications</h3>
      <p>Afeed may modify, suspend, or discontinue the Platform or its features at any time without liability.</p>

      <h2>4. Payment Processing, Settlement, and Dispute Resolution</h2>
      <p>All financial transactions executed by Users on the Afeed platform for the purchase of digital content, services, or live sessions offered by Content Creators shall be processed exclusively through UPayments, a third-party licensed payment service provider authorized to operate in the State of Kuwait.</p>
      <p>Funds collected from Users for such purchases are remitted by UPayments to Afeed, based on settlement cycles that are dependent on the specific payment method utilized by the User. These include, but are not limited to, debit card, credit card, and Apple Pay transactions. Such settlement cycles are typically carried out on a T+1 (transaction date plus one business day) or T+3 (transaction date plus three business days) basis, in accordance with UPayments' internal clearing policies and the requirements of local acquiring banks and payment networks.</p>
      <p>Upon successful receipt of cleared funds from UPayments, Afeed shall, in turn, initiate payment to the applicable Content Creator in accordance with a weekly settlement schedule. This schedule is determined solely by Afeed and may be revised from time to time at Afeed's discretion. It is the responsibility of each Content Creator to ensure that their designated bank account information is accurate, complete, and up to date to facilitate timely settlements. Afeed shall not be held liable for any failed disbursements due to outdated or incorrect banking credentials provided by the Content Creator.</p>
      <p>In the event of any discrepancies, delays, or disputes related to payment settlements - including, but not limited to, missing funds, underpayments, failed transfers, incorrect amounts, or chargeback-related issues - the affected Content Creator shall notify Afeed in writing by sending a formal inquiry to info@afeed.co. Such notices must include all relevant supporting documentation, such as transaction references, screenshots, or correspondence logs, to facilitate prompt review and resolution.</p>
      <p>Upon receiving such notification, Afeed shall assume the role of primary liaison in communicating with UPayments for the purpose of investigating and resolving the matter. While Afeed will undertake commercially reasonable efforts to engage with UPayments and provide updates to the Content Creator, Afeed disclaims any liability for delays, reversals, rejections, or settlements arising from UPayments' internal policies, banking partner delays, system outages, or force majeure events that may impact the processing of funds.</p>
      <p>Furthermore, Afeed reserves the right to withhold, defer, or offset part or all of any payment amount owed to a Content Creator in the following situations:</p>
      <ul>
        <li>Where Afeed has a reasonable and good-faith belief that such funds are connected to potentially fraudulent activity, violations of applicable law, or breaches of these Terms;</li>
        <li>Where chargebacks, refund claims, or User complaints have been initiated that involve the concerned funds;</li>
        <li>Where any investigation is pending with UPayments or a regulatory authority concerning those transactions.</li>
      </ul>
      <p>Such withholdings or offsets shall remain in effect until the matter is resolved, at Afeed's sole discretion, and subject to any overriding obligations under applicable Kuwaiti commercial or financial services law.</p>

      <h2>5. Refund Policy</h2>
      <h3>5.1 Refund Policy for Content Creators (Subscription Fees)</h3>
      <p>Content Creators subscribing to Afeed's services do so with the understanding that their subscription grants access to a suite of proprietary tools and resources provided as a software-as-a-service (SaaS) platform. Subscription fees, once paid, are deemed earned upon receipt and are generally non-refundable.</p>
      <p>However, in limited and exceptional circumstances, Afeed may, at its sole discretion, issue a refund of subscription fees to a Content Creator under the following conditions:</p>
      <ul>
        <li>A billing error resulting in duplicate or unauthorized charges initiated by Afeed or its payment processor;</li>
        <li>A verified and documented failure of the Platform to provide essential functionality for a continuous period of no less than five (5) business days;</li>
        <li>Misapplication of pricing tiers or the provision of incorrect services inconsistent with the selected subscription plan.</li>
      </ul>
      <p>To request a refund, Content Creators must submit a written request to info@afeed.co within fourteen (14) calendar days from the date of the original transaction. The request must include:</p>
      <ul>
        <li>A description of the issue or error;</li>
        <li>Transaction reference number(s);</li>
        <li>Any applicable screenshots or supporting documentation.</li>
      </ul>
      <p>Refunds, if granted, shall be issued to the original payment method and may take up to fourteen (14) business days to process. Afeed retains full discretion to accept or reject refund claims and such determinations shall be final and binding.</p>
      <p>Content Creators acknowledge that refunds will not be provided for:</p>
      <ul>
        <li>User dissatisfaction with services unrelated to a platform malfunction;</li>
        <li>Early cancellation or failure to use the full subscription period;</li>
        <li>Changes in pricing or feature sets occurring after payment.</li>
      </ul>

      <h3>5.2 Refund Policy for Users (Digital Products and Live Sessions)</h3>
      <p>Afeed acts as a hosting and facilitation platform only and does not own or control the digital content or live sessions sold by Content Creators. As such, Afeed disclaims all liability for the refund or reimbursement of payments made by Users to Content Creators.</p>
      <p>All refund requests from Users shall be governed by the individual Content Creator's refund policy, if any. It is the responsibility of the User to review and understand the applicable terms provided by the Creator at the time of purchase.</p>
      <p>If a User wishes to request a refund, such request must be made directly to the Creator through the contact method specified on the Creator's profile or product page. Afeed is not obligated to intervene in disputes between Users and Creators regarding refund claims unless:</p>
      <ul>
        <li>The transaction was never processed or confirmed by Afeed's payment processor;</li>
        <li>There is a credible claim of payment fraud directly tied to the Platform;</li>
        <li>A systemic platform failure prevented access to purchased content.</li>
      </ul>
      <p>In such cases, Afeed may, at its discretion, initiate a limited internal review and, where appropriate, facilitate communication between the parties involved. Afeed shall not, however, act as an arbitrator or bear financial liability for any loss or dissatisfaction arising from the conduct of Content Creators.</p>
      <p>Users are strongly encouraged to retain proof of purchase, correspondence with the Creator, and evidence of attempted resolution before escalating matters to Afeed.</p>

      <h2>6. Content Ownership & Intellectual Property Rights</h2>
      <h3>6.1 Ownership by Content Creators</h3>
      <p>Content Creators retain all legal rights, title, and interest in and to any original content they upload, publish, or otherwise make available through the Afeed Platform. This includes, but is not limited to:</p>
      <ul>
        <li>Course videos and recorded sessions;</li>
        <li>E-books, PDFs, and downloadable documents;</li>
        <li>Branding, logos, trademarks, and other creator-specific assets;</li>
        <li>Text-based materials including blogs, product descriptions, and FAQs;</li>
        <li>Visual assets such as thumbnails, banners, and illustrations.</li>
      </ul>
      <p>By uploading content to the Platform, the Content Creator represents and warrants that:</p>
      <ul>
        <li>They are the sole owner of the content, or possess all rights, licenses, and permissions necessary to distribute it;</li>
        <li>The content does not infringe upon or violate the rights of any third party, including copyright, trademark, trade secret, or contractual obligations;</li>
        <li>The content is not subject to any confidentiality agreement or restriction that would prohibit its public display or sale.</li>
      </ul>

      <h3>6.2 Grant of Limited License to Afeed</h3>
      <p>By uploading content, the Content Creator grants Afeed a non-exclusive, royalty-free, worldwide, revocable license to:</p>
      <ul>
        <li>Store, reproduce, display, and host the content on its servers;</li>
        <li>Make the content available to Users through the Creator's profile or storefront;</li>
        <li>Promote the content as part of Afeed's internal marketing, indexing, and search functionality.</li>
      </ul>
      <p>This license is granted solely for the purpose of enabling Afeed to operate the Platform and deliver services. Afeed shall not use Creator content for resale, commercial redistribution, or third-party partnerships without the Creator's express written consent.</p>
      <p>The license shall automatically terminate upon the deletion of the Creator's account or the specific removal of the content from the Platform, except to the extent necessary to:</p>
      <ul>
        <li>Comply with applicable legal, financial, or regulatory obligations (e.g., audits or data retention);</li>
        <li>Enforce refund policies or investigate violations of these Terms.</li>
      </ul>

      <h3>6.3 User Access to Content</h3>
      <p>Upon successful purchase or registration, Users are granted a non-exclusive, non-transferable, non-sublicensable, limited right to access and view the content via the Afeed Platform. This license is subject to the following limitations:</p>
      <ul>
        <li>Content may only be accessed for personal, non-commercial use;</li>
        <li>Users may not download, copy, reproduce, or distribute content unless expressly allowed by the Content Creator;</li>
        <li>Sharing of login credentials or account details for the purpose of content access by unauthorized parties is strictly prohibited.</li>
      </ul>
      <p>Violation of these terms may result in immediate account suspension or termination, and may expose the User to civil or criminal liability for copyright infringement.</p>

      <h3>6.4 Intellectual Property Infringement</h3>
      <p>If a User or third party believes that content published on the Afeed Platform infringes upon their intellectual property rights, they may submit a formal notice of infringement to info@afeed.co with the following details:</p>
      <ul>
        <li>Identification of the protected work;</li>
        <li>Description of the allegedly infringing material;</li>
        <li>Proof of ownership or licensing rights;</li>
        <li>A signed declaration attesting to the accuracy of the claim.</li>
      </ul>
      <p>Afeed will review such claims in good faith and take action in accordance with applicable law, which may include removing or disabling access to the infringing content, and suspending the account of the offending party.</p>

      <h2>7. Prohibited Content and Conduct</h2>
      <p>Afeed maintains a zero-tolerance policy toward unlawful, harmful, or abusive behavior on its Platform. All Users and Content Creators must adhere to the standards outlined below. Violations of this section may result in immediate suspension or permanent termination of account access, removal of content, and potential legal action.</p>
      <h3>7.1 Prohibited Content</h3>
      <p>The following types of content are strictly forbidden from being uploaded, published, or otherwise distributed via the Platform by any party:</p>
      <ul>
        <li><strong>Sexual and Adult Content:</strong> Pornography, sexually explicit material, lewd or suggestive imagery, or services promoting sexual acts.</li>
        <li><strong>Hate Speech and Discrimination:</strong> Content that promotes violence, hostility, or discrimination based on race, ethnicity, religion, gender, disability, nationality, age, sexual orientation, or any protected characteristic under Kuwaiti law or international standards.</li>
        <li><strong>Violent or Graphic Material:</strong> Content depicting or glorifying physical harm, abuse, cruelty, or threats against individuals or groups.</li>
        <li><strong>Fraudulent or Deceptive Services:</strong> Including false claims about content effectiveness, academic credentials, unverified testimonials, or misleading advertising.</li>
        <li><strong>Unlicensed or Unauthorized Services:</strong> Financial, legal, or medical advice offered by individuals or entities lacking required licenses, certifications, or regulatory approvals under Kuwaiti or international law.</li>
        <li><strong>Illegal or Restricted Activities:</strong> Promotion or sale of illicit substances, weapons, hacking tools, or services violating applicable laws and regulations.</li>
        <li><strong>Malware, Spam, or Phishing:</strong> Uploading malicious code, deceptive redirects, or attempts to collect user credentials or payment information through fraudulent means.</li>
        <li><strong>Intellectual Property Violations:</strong> Content that infringes upon the copyright, trademark, patent, or publicity rights of any third party.</li>
      </ul>

      <h3>7.2 Prohibited Conduct</h3>
      <p>Users and Creators are further prohibited from engaging in the following conduct on or off the Platform in connection with Afeed:</p>
      <ul>
        <li>Harassment, abuse, or threats toward other users, creators, or Afeed personnel.</li>
        <li>Impersonation of another person, business, or platform representative.</li>
        <li>Circumvention of platform security measures, including unauthorized API access, code manipulation, or scraping of platform data.</li>
        <li>Exploitation of platform bugs, pricing errors, or fraudulent chargebacks.</li>
        <li>Use of automated bots, fake engagement (e.g., views, reviews), or artificial traffic to inflate performance metrics.</li>
      </ul>

      <h3>7.3 Enforcement and Reporting</h3>
      <p>Afeed encourages Users and Creators to report violations of this policy by contacting info@afeed.co with supporting evidence.</p>
      <p>Upon verification of a prohibited act or content, Afeed will issue a notice to the Content Creator or User, requiring them to remove the offending content within one (1) hour. Failure to comply may result in:</p>
      <ul>
        <li>Immediate removal of the content;</li>
        <li>Temporary or permanent suspension of the account;</li>
        <li>Withholding of pending Creator payouts;</li>
        <li>Referral to relevant authorities in accordance with Kuwaiti legal obligations.</li>
      </ul>
      <p>Repeat offenders or egregious violations may be permanently banned without further notice or refund eligibility.</p>

      <h2>8. Non-Payment, Account Suspension, and Reactivation</h2>
      <p>Afeed relies on timely payment of subscription fees to sustain operational and infrastructure services offered to Content Creators. To this end, strict guidelines govern the consequences of non-payment and Creator account suspension.</p>
      <h3>8.1 Payment Obligation</h3>
      <p>Content Creators agree to maintain valid billing information for the duration of their subscription. Subscription fees must be paid in full, in advance, according to the billing cycle selected (monthly or annually).</p>
      <p>Failure to maintain payment obligations shall trigger an automated dunning sequence whereby Afeed will attempt to collect payment through the stored method up to four (4) times over a fourteen (14) day period.</p>

      <h3>8.2 Suspension Protocol</h3>
      <p>If all payment attempts fail, the Creator's account will enter a suspended state, effective immediately. During this period:</p>
      <ul>
        <li>Access to the dashboard, Creator tools, and analytics will be disabled.</li>
        <li>All published digital products and live sessions will be unpublished and rendered inaccessible to Users.</li>
        <li>Upcoming live sessions will be automatically cancelled without refund liability to Afeed or the User.</li>
        <li>No new content may be uploaded, and Creator support will be limited to reactivation assistance only.</li>
      </ul>
      <p>Afeed shall notify the Creator via the registered email on file and may issue one or more reminders before initiating long-term retention or deletion protocols.</p>

      <h3>8.3 Data Retention & Reactivation</h3>
      <p>During suspension, Afeed shall retain the Content Creator's data, including uploaded content, user access records, and store configurations, for a period of three hundred sixty-five (365) calendar days from the date of suspension.</p>
      <p>Within this retention period:</p>
      <ul>
        <li>The Creator may reactivate their account by completing payment of outstanding subscription fees.</li>
        <li>Upon successful reactivation, the Creator's content, settings, and page visibility will be restored in accordance with their selected subscription tier.</li>
      </ul>
      <p>Failure to settle payment within this 365-day window shall result in automatic and permanent deletion of:</p>
      <ul>
        <li>All digital products and uploaded files;</li>
        <li>Customer data and purchase histories;</li>
        <li>Profile branding and configuration settings.</li>
      </ul>
      <p>Afeed is not responsible for recovering or restoring deleted data beyond this retention window.</p>

      <h3>8.4 Impact on Users</h3>
      <p>In the event of a Creator's account suspension or termination, Users who previously purchased products or sessions from that Creator will immediately lose access to such content. Users shall be advised to contact the respective Creator for further assistance or refunds.</p>
      <p>Afeed assumes no responsibility or liability for:</p>
      <ul>
        <li>User dissatisfaction stemming from Creator absence or content unavailability;</li>
        <li>Refunds, support, or credit issuance for content associated with suspended accounts;</li>
        <li>Missed appointments or live sessions resulting from Creator non-payment.</li>
      </ul>

      <h2>9. Termination and Account Deletion</h2>
      <p>Afeed reserves the right to terminate access to the Platform, suspend account functionality, or permanently delete an account, either at its sole discretion or in response to specific violations of this Agreement. This clause applies to both Content Creators and Users, and may be enforced with or without prior notice, depending on the severity of the breach.</p>
      <h3>9.1 Termination by Afeed</h3>
      <p>Afeed may initiate account termination or deletion under the following circumstances:</p>
      <ul>
        <li>Material breach of these Terms, including repeated policy violations or engagement in illegal activity;</li>
        <li>Fraudulent behavior, including the use of false identities, intentional chargebacks, or manipulation of payout processes;</li>
        <li>Prohibited content or conduct as described under Section 7;</li>
        <li>Unresolved disputes or claims involving misuse of the Platform, abuse of refund policies, or disputes escalated through UPayments;</li>
        <li>Non-compliance with legal obligations, including court orders or directives from regulatory authorities within the State of Kuwait.</li>
      </ul>
      <p>Upon such termination:</p>
      <ul>
        <li>All access to Platform services will be revoked immediately;</li>
        <li>Digital content will be permanently unpublished;</li>
        <li>Outstanding payouts may be withheld pending investigation;</li>
        <li>No refunds for subscription fees or purchased services shall be issued.</li>
      </ul>
      <p>In the event Afeed believes there is an imminent risk to the safety, security, or data integrity of the Platform or its Users, it may suspend or delete an account without notice, subject to applicable legal recourse.</p>

      <h3>9.2 Termination by the Account Holder</h3>
      <p>Any User or Content Creator may request voluntary termination of their account by submitting a formal written request to info@afeed.co from their registered email address. Such requests must include:</p>
      <ul>
        <li>Full name and account ID;</li>
        <li>Reason for termination (optional);</li>
        <li>A declaration confirming that all associated activity will cease upon closure.</li>
      </ul>
      <p>Once the request is verified, Afeed will:</p>
      <ul>
        <li>Deactivate the account within ten (10) business days;</li>
        <li>Data handling and deletion shall be governed by Afeed's Privacy Policy;</li>
        <li>Revoke access to any creator tools, digital content, and user dashboards.</li>
      </ul>
      <p>Users acknowledge that voluntary termination is final and that all data, files, and purchased access may be permanently erased, subject to data retention regulations.</p>

      <h3>9.3 Post-Termination Obligations</h3>
      <p>The following obligations survive termination:</p>
      <ul>
        <li>Payment of outstanding balances or settlement of dues;</li>
      </ul>
      <p>Afeed retains the right to preserve records of terminated accounts to comply with anti-fraud, taxation, audit, and consumer protection requirements in Kuwait and internationally.</p>

      <h2>10. Limitation of Liability</h2>
      <p>To the fullest extent permitted under applicable laws of the State of Kuwait, Afeed Company for Website and Application Development W.L.L. ("Afeed") and its directors, officers, employees, agents, affiliates, partners, licensors, and service providers shall not be held liable for any direct, indirect, incidental, special, consequential, exemplary, or punitive damages arising out of or relating to:</p>
      <ul>
        <li>The use of, or inability to use, the Afeed Platform;</li>
        <li>The performance or non-performance of the Platform;</li>
        <li>The actions or omissions of any User or Content Creator;</li>
        <li>Reliance on any information or content made available by Content Creators;</li>
        <li>Delays or disruptions to the Platform, including third-party systems such as UPayments, AWS, or DigitalOcean;</li>
        <li>Unauthorized access, alteration, or deletion of User or Creator data;</li>
        <li>Inaccuracies, typographical errors, or omissions in any part of the Platform.</li>
      </ul>
      <p>This limitation of liability applies to all causes of action, whether based in contract, tort (including negligence), strict liability, or any other legal theory, even if Afeed has been advised of the possibility of such damages.</p>

      <h3>10.1 Platform Provided "As-Is"</h3>
      <p>The Platform is provided on an "as-is" and "as-available" basis. Afeed disclaims all warranties—express, implied, or statutory—including but not limited to merchantability, fitness for a particular purpose, non-infringement, and system integration.</p>
      <p>Afeed does not guarantee that:</p>
      <ul>
        <li>The Platform will be free of errors or interruptions;</li>
        <li>The results from the use of the Platform will be accurate or reliable;</li>
        <li>Any errors in the software will be corrected.</li>
      </ul>
      <p>You agree that your use of the Platform is entirely at your own risk and that you are solely responsible for compliance with all applicable laws.</p>

      <h3>10.2 Maximum Aggregate Liability</h3>
      <p>In no event shall Afeed's aggregate liability to any User or Content Creator exceed the total amount paid by that party to Afeed for the specific subscription services in question during the six (6) month period preceding the event giving rise to the claim.</p>
      <p>This limitation shall not apply to:</p>
      <ul>
        <li>Death or personal injury resulting from Afeed's gross negligence or willful misconduct;</li>
      </ul>

      <h2>11. Governing Law and Jurisdiction</h2>
      <p>This Agreement, and any contractual or non-contractual obligations arising from or related to it, shall be governed by and construed in accordance with the laws and regulations of the State of Kuwait.</p>
      <h3>11.1 Exclusive Jurisdiction</h3>
      <p>Any dispute, controversy, or claim arising out of or in connection with this Agreement, including its existence, validity, interpretation, performance, breach, or termination, shall be subject to the exclusive jurisdiction of the competent courts of Kuwait City, State of Kuwait.</p>
      <p>You agree to waive any objection to venue or jurisdiction and consent to personal jurisdiction in the courts of Kuwait for all legal proceedings relating to this Agreement.</p>
      <h3>11.2 Arbitration Exception</h3>
      <p>Notwithstanding the above, Afeed reserves the right to seek interim or injunctive relief in any jurisdiction in order to protect its rights or enforce intellectual property, data, or commercial confidentiality rights.</p>
      <h3>11.3 Language and Legal Validity</h3>
      <p>The governing language of this Agreement shall be English for the purposes of any legal interpretation or dispute resolution within the State of Kuwait. Translations into Arabic or other languages are provided for convenience only and shall not alter the legal meaning or enforceability of the original English version.</p>

      <h2>12. Changes to These Terms</h2>
      <h3>12.1 Reserved Right to Modify Terms</h3>
      <p>Afeed Company for Website and Application Development W.L.L. ("Afeed") expressly reserves the right, at its sole and absolute discretion, to amend, revise, update, replace, or restate any part of these Terms and Conditions or the associated Privacy Policy at any time, with or without prior notice, subject to applicable laws of the State of Kuwait.</p>
      <p>Such modifications may include but are not limited to:</p>
      <ul>
        <li>Changes to subscription pricing, billing cycles, or payment methods;</li>
        <li>Updates to refund procedures or data handling practices;</li>
        <li>Clarification of acceptable use and content policies;</li>
        <li>Expansion or reduction of Platform features and functionalities;</li>
        <li>Alterations in third-party partnerships that impact service delivery.</li>
      </ul>
      <p>Any such change shall become legally binding upon its Effective Date, which shall be clearly indicated at the top of the revised version.</p>

      <h3>12.2 Method of Notification</h3>
      <p>Where changes are deemed material, Afeed will make reasonable efforts to notify affected parties using one or more of the following methods:</p>
      <ul>
        <li>Email communication to the address provided by the User or Content Creator;</li>
        <li>In-platform alerts, banners, or system messages;</li>
        <li>Direct message via the Creator dashboard or support inbox;</li>
        <li>Updates to the "Terms" page located at www.afeed.co/en/terms</li>
      </ul>
      <p>Unless otherwise required by law, no physical mail or individual legal service shall be necessary to effectuate notification.</p>

      <h3>12.3 Acceptance of Revised Terms</h3>
      <p>Your continued access to or use of the Platform following the publication of revised terms constitutes your binding acceptance of the revised version. If you do not agree to the new terms, your sole remedy is to discontinue use of the Platform and request account termination.</p>
      <p>Failure to terminate your account within seven (7) calendar days of notice being issued will be deemed your full and irrevocable acceptance of the changes.</p>

      <h3>12.4 Version Control and Conflict Resolution</h3>
      <p>Each version of the Terms and Conditions shall carry a clear Effective Date. In the event of a dispute over which terms apply to a transaction or event, the version in effect at the time of the relevant transaction or action shall govern.</p>
      <p>In the case of translations or localized versions of these Terms, the original English language version shall control for purposes of interpretation and enforcement in any legal or regulatory forum within the State of Kuwait.</p>
    </article>
  );
}

function TermsContentAr() {
  return (
    <article className="prose prose-lg max-w-none dark:prose-invert" dir="rtl">
      <h1>أفيد - الشروط والأحكام</h1>
      <p><strong>تاريخ النفاذ:</strong> ٩ أغسطس ٢٠٢٥</p>
      <p><strong>الكيان القانوني:</strong> شركة أفيد لتطوير المواقع والتطبيقات ذ.م.م، الكويت</p>
      <p><strong>للتواصل:</strong> info@afeed.co</p>

      <h2>١. التعاريف</h2>
      <p>لأغراض هذه الشروط والأحكام وسياسة الخصوصية المصاحبة لها (مشارًا إليهما مجتمعين بـ "الاتفاقية")، تنطبق التعاريف التالية:</p>
      <ul>
        <li><strong>"أفيد"</strong> تشير إلى شركة أفيد لتطوير المواقع والتطبيقات ذ.م.م، شركة ذات مسؤولية محدودة منظمة وقائمة بموجب قوانين دولة الكويت، والتي تملك وتدير منصة أفيد، بما في ذلك جميع المواقع الإلكترونية والخدمات المستندة إلى الويب وواجهات برمجة التطبيقات (APIs) وتطبيقات الهواتف المحمولة وأدوات الاتصال وقنوات الدعم المرتبطة بها.</li>
        <li><strong>"المنصة"</strong> تشير إلى نظام أفيد الشامل المقدم كبرمجية كخدمة (SaaS)، والذي يشمل السوق والبنية التحتية للاستضافة والأدوات المرتبطة التي تسهل نشر وترويج وتوزيع وتحقيق الدخل من المحتوى الرقمي والجلسات المباشرة بواسطة صنّاع المحتوى.</li>
        <li><strong>"صانع المحتوى"</strong> يعني أي شخص طبيعي أو كيان قانوني أو أي مشروع تجاري يسجل للحصول على حساب على منصة أفيد لغرض أساسي يتمثل في رفع أو بيع أو توزيع منتجات رقمية أو جلسات مباشرة.</li>
        <li><strong>"المستخدم"</strong> يعين أي شخص طبيعي أو كيان قانوني يقوم بالدخول إلى المنصة بغرض استهلاك أو شراء أو التفاعل مع المحتوى الرقمي أو الخدمات التي يتيحها صنّاع المحتوى.</li>
        <li><strong>"المنتجات الرقمية"</strong> تشمل، على سبيل المثال لا الحصر: الدورات المسجلة مسبقًا، المواد المكتوبة، الملفات الصوتية، العروض التقديمية، الأدلة، الكتب الإلكترونية، والقوالب القابلة للتنزيل.</li>
        <li><strong>"الجلسات المباشرة"</strong> تشير إلى الفعاليات الافتراضية المجدولة التي تُعقد في الوقت الفعلي، بما في ذلك الاستشارات وجلسات التدريب وورش العمل الجماعية التي تُنفذ عبر المنصة.</li>
        <li><strong>"خطة الاشتراك"</strong> تشير إلى نموذج الوصول المدفوع الذي يحكم استخدام صانع المحتوى للمنصة.</li>
        <li><strong>"مقدم خدمات الدفع"</strong> يشير إلى الطرف الثالث المرخص والمسؤول عن تنفيذ المعاملات بين المستخدمين وأفيد.</li>
        <li><strong>"القانون الكويتي"</strong> يعني جميع التشريعات والمتطلبات التنظيمية المطبقة داخل دولة الكويت.</li>
        <li><strong>"القوة القاهرة"</strong> تشمل جميع الظروف الخارجة عن السيطرة المعقولة، بما في ذلك الحروب، الكوارث الطبيعية، القيود الحكومية، انقطاع التيار الكهربائي، أو أعطال الأنظمة.</li>
      </ul>

      <h2>٢. قبول الشروط</h2>
      <p>من خلال تسجيلك أو دخولك أو استخدامك للمنصة، فإنك تقر وتوافق على الالتزام القانوني بهذه الاتفاقية. إذا لم توافق على هذه الشروط بالكامل، فيجب عليك الامتناع عن استخدام المنصة.</p>
      <p>وتقر وتتعهد بما يلي:</p>
      <ul>
        <li>أنك تبلغ من العمر ثمانية عشر (١٨) عامًا على الأقل أو بلغت سن الرشد القانوني في ولايتك القضائية.</li>
        <li>أنك قادر قانونيًا على الدخول في اتفاقيات ملزمة.</li>
        <li>إذا كنت تتصرف نيابة عن كيان، فأنت مخول حسب الأصول لإلزام هذا الكيان.</li>
      </ul>
      <p>يجوز لأفيد تعديل هذه الاتفاقية في أي وقت. سيتم نشر التغييرات على المنصة أو إبلاغها عبر البريد الإلكتروني. يشكل استمرار استخدام المنصة قبولاً للشروط المعدلة.</p>

      <h2>٣. الوصول إلى المنصة والاشتراك ونطاق الخدمة</h2>
      <h3>٣.١ لصنّاع المحتوى</h3>
      <p>يُطلب من صنّاع المحتوى الاشتراك في إحدى خطط أفيد المتاحة: الأساسية أو النمو أو الاحترافية. تتوفر الخطط بدورات فوترة شهرية أو سنوية وتتجدد تلقائيًا ما لم يتم الإلغاء قبل تاريخ التجديد.</p>
      <p>يتحمل صنّاع المحتوى وحدهم مسؤولية:</p>
      <ul>
        <li>تحديد أسعار المنتجات وشروط الاسترداد.</li>
        <li>تقديم الخدمات المشتراة للمستخدمين.</li>
        <li>ضمان امتثال المحتوى للقوانين المعمول بها وعدم انتهاكه لحقوق الأطراف الثالثة.</li>
      </ul>

      <h3>٣.٢ للمستخدمين</h3>
      <p>يمكن للمستخدمين الوصول إلى المحتوى المجاني أو المدفوع. بالشراء، يوافق المستخدمون على شروط وأسعار صانع المحتوى المحددة.</p>

      <h3>٣.٣ تعديلات الخدمة</h3>
      <p>يجوز لأفيد تعديل أو تعليق أو إيقاف المنصة أو ميزاتها في أي وقت دون مسؤولية.</p>

      <h2>٤. خدمات الدفع والتسوية وحل النزاعات</h2>
      <p>تُنفَّذ جميع المعاملات المالية التي يجريها المستخدمون على منصة أفيد لشراء المحتوى الرقمي أو الخدمات أو الجلسات المباشرة التي يقدّمها صنّاع المحتوى حصريًا عبر مقدم خدمات الدفع UPayments، وهو مزوّد خدمة دفع مرخّص ومصرّح له بالعمل في دولة الكويت.</p>
      <p>تُحوَّل الأموال المحصّلة من المستخدمين مقابل هذه المشتريات بواسطة UPayments إلى أفيد، وذلك وفقًا لدورات تسوية تعتمد على طريقة الدفع المستخدمة من قبل المستخدم، وتشمل هذه الطرق - على سبيل المثال لا الحصر - المدفوعات عبر البطاقات البنكية أو بطاقات الائتمان أو خدمة Apple Pay. وتُجرى هذه التسويات عادةً على أساس T+1 (يوم العمل التالي لتاريخ العملية) أو T+3 (ثلاثة أيام عمل بعد تاريخ العملية)، وذلك وفقًا لسياسات التسوية الداخلية لدى UPayments ومتطلبات البنوك المحلية وشبكات الدفع.</p>
      <p>بعد استلام الأموال المحوّلة من UPayments بشكل كامل، تقوم أفيد بدورها بتحويل المبالغ المستحقة لصانع المحتوى وفق جدول تسوية أسبوعي تحدده أفيد حصريًا، ويجوز لها تعديله من وقت لآخر حسب تقديرها. ويتحمّل كل صانع محتوى مسؤولية التأكد من أن بيانات حسابه البنكي دقيقة وكاملة ومحدَّثة لضمان وصول التحويلات في الوقت المحدد. ولا تتحمل أفيد أي مسؤولية عن فشل التحويلات الناتج عن تقديم بيانات بنكية غير صحيحة أو قديمة.</p>
      <p>في حالة وجود أي تناقضات أو تأخيرات أو نزاعات تتعلق بتسويات المدفوعات - بما في ذلك، على سبيل المثال لا الحصر، فقدان مبالغ، أو نقص في المبلغ المحوَّل، أو فشل في التحويل، أو تحويل بمبالغ خاطئة، أو مشكلات متعلقة باسترجاع المدفوعات (Chargebacks) - يجب على صانع المحتوى إخطار أفيد كتابيًا بإرسال طلب رسمي إلى البريد الإلكتروني info@afeed.co مرفقًا بجميع المستندات ذات الصلة، مثل أرقام المعاملات، أو لقطات الشاشة، أو سجلات المراسلات، وذلك لتسهيل المراجعة والمعالجة السريعة للمشكلة.</p>
      <p>عند استلام هذا الإخطار، تتولى أفيد دور الوسيط الرئيسي في التواصل مع UPayments للتحقيق في الأمر وحلّه. وبينما ستبذل أفيد جهدًا معقولًا تجاريًا للتواصل مع UPayments وتزويد صانع المحتوى بالتحديثات، فإنها تخلي مسؤوليتها عن أي تأخير أو رفض أو إلغاء للتسويات ناتج عن سياسات UPayments الداخلية، أو تأخيرات شركائها البنكيين، أو أعطال في الأنظمة، أو أحداث قوة قاهرة تؤثر على معالجة الأموال.</p>
      <p>كما تحتفظ أفيد بالحق في حجز أو تأجيل أو خصم جزء أو كامل المبلغ المستحق لأي صانع محتوى في الحالات التالية:</p>
      <ul>
        <li>إذا كان لدى أفيد اعتقاد معقول وبحسن نية بأن هذه الأموال مرتبطة بأنشطة احتيالية أو بانتهاكات للقوانين المعمول بها أو مخالفة لهذه الشروط؛</li>
        <li>إذا تم تقديم طلبات استرجاع مبالغ مدفوعة أو شكاوى من المستخدمين بشأن هذه الأموال؛</li>
        <li>إذا كان هناك تحقيق جارٍ من قبل UPayments أو أي سلطة تنظيمية بخصوص هذه المعاملات.</li>
      </ul>
      <p>يستمر أي حجز أو خصم حتى يتم حل المسألة بشكل كامل، ويكون ذلك وفق تقدير أفيد المطلق، ومع مراعاة أي التزامات قانونية نافذة بموجب القوانين التجارية أو المالية المطبقة في دولة الكويت.</p>

      <h2>٥. سياسة الاسترداد</h2>
      <h3>٥.١ سياسة الاسترداد لصنّاع المحتوى (رسوم الاشتراك)</h3>
      <p>يُدرك صنّاع المحتوى المشتركين في خدمات أفيد أن اشتراكهم يمنحهم حق الوصول إلى مجموعة من الأدوات والموارد المملوكة لأفيد والمقدمة كخدمة برمجية سحابية (SaaS). وتُعتبر رسوم الاشتراك، بمجرد سدادها، مكتسبة ومستحقة بالكامل، وهي غير قابلة للاسترداد كقاعدة عامة.</p>
      <p>ومع ذلك، يجوز لأفيد، وفي حالات محدودة واستثنائية، وبحسب تقديرها المطلق، أن توافق على رد جزء أو كامل رسوم الاشتراك المدفوعة من قبل صانع المحتوى في الحالات التالية:</p>
      <ul>
        <li>حدوث خطأ في الفوترة ترتب عليه خصم مكرر أو خصم غير مصرح به من قبل أفيد أو مقدم خدمات الدفع؛</li>
        <li>تعطل موثّق ومؤكد في المنصة يحول دون توفير الوظائف الأساسية لمدة لا تقل عن خمسة (5) أيام عمل متواصلة؛</li>
        <li>تطبيق خاطئ لهيكل التسعير أو تقديم خدمات غير متوافقة مع خطة الاشتراك المختارة.</li>
      </ul>
      <p>للطلب استرداد رسوم الاشتراك، يجب على صانع المحتوى تقديم طلب كتابي إلى البريد الإلكتروني info@afeed.co خلال أربعة عشر (14) يومًا تقويميًا من تاريخ العملية الأصلية، على أن يتضمن الطلب: وصفًا للمشكلة أو الخطأ، ورقم/أرقام العملية، وأي لقطات شاشة أو مستندات داعمة ذات صلة.</p>
      <p>في حالة الموافقة على الاسترداد، يتم رد المبلغ إلى وسيلة الدفع الأصلية، وقد يستغرق ذلك ما يصل إلى أربعة عشر (14) يوم عمل لإتمام المعالجة. وتحتفظ أفيد بالحق المطلق في قبول أو رفض طلبات الاسترداد، ويُعتبر قرارها في هذا الشأن نهائيًا وملزمًا.</p>
      <p>كما يقرّ صنّاع المحتوى بأن الاسترداد لن يتم في الحالات التالية:</p>
      <ul>
        <li>عدم رضا المستخدم عن الخدمة لأسباب غير مرتبطة بخلل في المنصة؛</li>
        <li>الإلغاء المبكر أو عدم استخدام الخدمة طوال فترة الاشتراك؛</li>
        <li>حدوث تغييرات في الأسعار أو الميزات بعد سداد الرسوم.</li>
      </ul>

      <h3>٥.٢ سياسة الاسترداد للمستخدمين (المنتجات الرقمية والجلسات المباشرة)</h3>
      <p>تعمل أفيد كمنصة استضافة وتيسير فقط، ولا تمتلك أو تتحكم في المحتوى الرقمي أو الجلسات المباشرة المباعة من قبل صنّاع المحتوى. وبناءً عليه، تخلي أفيد مسؤوليتها بالكامل عن رد المبالغ أو تعويض المدفوعات التي قام بها المستخدمون لصالح صنّاع المحتوى.</p>
      <p>تخضع جميع طلبات الاسترداد من قبل المستخدمين لسياسة الاسترداد الخاصة بكل صانع محتوى، إن وُجدت. ويتحمل المستخدم مسؤولية مراجعة الشروط المعمول بها من قبل صانع المحتوى وفهمها عند الشراء.</p>
      <p>إذا رغب المستخدم في طلب استرداد المبلغ، يجب عليه تقديم الطلب مباشرةً إلى صانع المحتوى عبر وسيلة الاتصال المحددة في ملفه الشخصي أو صفحة المنتج. ولا تكون أفيد ملزمة بالتدخل في النزاعات بين المستخدمين وصنّاع المحتوى، إلا في الحالات التالية:</p>
      <ul>
        <li>إذا لم تُنفّذ المعاملة أو لم يتم تأكيدها من قبل مقدم خدمات الدفع لدى أفيد؛</li>
        <li>إذا وُجد ادعاء موثوق بحدوث احتيال في الدفع مرتبط مباشرة بالمنصة؛</li>
        <li>إذا حدث عطل نظامي حال دون الوصول إلى المحتوى المشتَرى.</li>
      </ul>
      <p>في هذه الحالات، يجوز لأفيد، وفق تقديرها، إجراء مراجعة داخلية محدودة، وقد تقوم - إذا لزم الأمر - بتسهيل التواصل بين الأطراف المعنية. ومع ذلك، فإن أفيد لا تقوم بدور المحكّم ولا تتحمل أي مسؤولية مالية عن أي خسائر أو حالات عدم رضا ناتجة عن سلوك صنّاع المحتوى.</p>

      <h2>٦. الملكية الفكرية وحقوق المحتوى</h2>
      <h3>٦.١ الملكية من قبل صانع المحتوى</h3>
      <p>يحتفظ صانع المحتوى بكافة الحقوق القانونية والملكية والمصالح في أي محتوى أصلي يقوم بتحميله أو نشره أو إتاحته بأي شكل آخر عبر منصة أفيد، ويشمل ذلك - على سبيل المثال لا الحصر:</p>
      <ul>
        <li>مقاطع الفيديو الخاصة بالدورات والجلسات المسجّلة؛</li>
        <li>الكتب الإلكترونية وملفات PDF والمستندات القابلة للتنزيل؛</li>
        <li>الشعارات والعلامات التجارية والعناصر البصرية الخاصة به؛</li>
        <li>النصوص بما في ذلك المدونات ووصف المنتجات وصفحات الأسئلة الشائعة؛</li>
        <li>المواد المرئية مثل الصور المصغّرة واللافتات والرسومات.</li>
      </ul>
      <p>عند تحميل المحتوى على المنصة، يصرّح صانع المحتوى ويضمن أنه:</p>
      <ul>
        <li>المالك الوحيد للمحتوى أو أنه يمتلك جميع الحقوق والتراخيص والأذونات اللازمة لتوزيعه؛</li>
        <li>وأن المحتوى لا ينتهك أو يعتدي على حقوق أي طرف ثالث، بما في ذلك حقوق النشر أو العلامات التجارية أو الأسرار التجارية أو الالتزامات التعاقدية؛</li>
        <li>وأن المحتوى غير خاضع لأي اتفاقية سرية أو قيود تمنع عرضه أو بيعه للجمهور.</li>
      </ul>

      <h3>٦.٢ منح ترخيص محدود لأفيد</h3>
      <p>عند تحميل المحتوى، يمنح صانع المحتوى أفيد ترخيصًا غير حصري وخاليًا من الرسوم وقابلًا للإلغاء وساريًا على مستوى العالم، يسمح لها بما يلي:</p>
      <ul>
        <li>تخزين المحتوى وإعادة إنتاجه وعرضه واستضافته على خوادمها؛</li>
        <li>إتاحة المحتوى للمستخدمين عبر الملف الشخصي لصانع المحتوى أو متجره؛</li>
        <li>الترويج للمحتوى كجزء من أنشطة التسويق الداخلية وأدوات البحث والفهرسة في المنصة.</li>
      </ul>
      <p>يُمنح هذا الترخيص حصريًا لغرض تمكين أفيد من تشغيل المنصة وتقديم خدماتها. ولا يجوز لأفيد استخدام محتوى صانع المحتوى لإعادة بيعه أو توزيعه تجاريًا أو إبرام شراكات مع أطراف ثالثة دون موافقة خطية صريحة من صانع المحتوى.</p>
      <p>وينتهي هذا الترخيص تلقائيًا عند حذف حساب صانع المحتوى أو إزالة المحتوى تحديدًا من المنصة، باستثناء المدى الذي يكون فيه الاحتفاظ بالمحتوى ضروريًا من أجل:</p>
      <ul>
        <li>الامتثال للالتزامات القانونية أو المالية أو التنظيمية المعمول بها (مثل متطلبات التدقيق أو الاحتفاظ بالبيانات)؛</li>
        <li>تطبيق سياسات الاسترداد أو التحقيق في انتهاكات هذه الشروط.</li>
      </ul>

      <h3>٦.٣ وصول المستخدمين إلى المحتوى</h3>
      <p>عند إتمام عملية الشراء أو التسجيل بنجاح، يُمنح المستخدم ترخيصًا محدودًا، غير حصري، وغير قابل للتحويل أو الترخيص من الباطن، للوصول إلى المحتوى ومشاهدته من خلال منصة أفيد. ويخضع هذا الترخيص للقيود التالية:</p>
      <ul>
        <li>لا يجوز للمستخدم الوصول إلى المحتوى إلا لأغراض الاستخدام الشخصي وغير التجاري؛</li>
        <li>لا يجوز للمستخدم تنزيل أو نسخ أو إعادة إنتاج أو توزيع المحتوى، ما لم يمنحه صانع المحتوى إذنًا صريحًا بذلك؛</li>
        <li>يُحظر مشاركة بيانات تسجيل الدخول أو تفاصيل الحساب بغرض تمكين أطراف غير مصرح لها من الوصول إلى المحتوى.</li>
      </ul>
      <p>يُعتبر أي خرق لهذه الشروط سببًا فوريًا لتعليق أو إنهاء حساب المستخدم، وقد يعرّضه للمسؤولية المدنية أو الجنائية نتيجة انتهاك حقوق النشر.</p>

      <h3>٦.٤ انتهاك حقوق الملكية الفكرية</h3>
      <p>إذا اعتقد أي مستخدم أو طرف ثالث أن المحتوى المنشور على منصة أفيد ينتهك حقوق الملكية الفكرية الخاصة به، يجوز له تقديم إشعار رسمي بانتهاك الحقوق عبر البريد الإلكتروني info@afeed.co على أن يتضمن الإشعار:</p>
      <ul>
        <li>تحديد العمل المحمي محل الادعاء؛</li>
        <li>وصفًا للمادة أو المحتوى المزعوم أنه ينتهك الحقوق؛</li>
        <li>إثبات ملكية أو حقوق الترخيص الخاصة بالعمل المحمي؛</li>
        <li>إقرارًا موقّعًا يؤكد صحة الادعاء.</li>
      </ul>
      <p>تقوم أفيد بمراجعة هذه الادعاءات بحسن نية واتخاذ الإجراءات وفقًا للقوانين المطبقة، والتي قد تشمل إزالة المحتوى أو تعطيل الوصول إليه، وتعليق حساب الطرف المخالف إذا ثبت الانتهاك.</p>

      <h2>٧. المحتوى والسلوك المحظور</h2>
      <p>تلتزم أفيد بسياسة عدم التسامح مطلقًا مع أي سلوك أو محتوى غير قانوني أو ضار أو مسيء على منصتها. ويجب على جميع المستخدمين وصنّاع المحتوى الالتزام بالمعايير المنصوص عليها أدناه. إن أي انتهاك لأحكام هذا القسم قد يؤدي إلى تعليق فوري أو إنهاء دائم للحساب، وإزالة المحتوى، واتخاذ الإجراءات القانونية اللازمة.</p>
      <h3>٧.١ المحتوى المحظور</h3>
      <p>يحظر بشكل صارم تحميل أو نشر أو توزيع أي من أنواع المحتوى التالية عبر المنصة من قبل أي طرف:</p>
      <ul>
        <li><strong>المحتوى الجنسي والمواد المخصصة للبالغين:</strong> ويشمل ذلك المواد الإباحية، أو المحتوى الجنسي الصريح، أو الصور الفاضحة أو الموحية جنسيًا، أو الخدمات التي تروّج للأفعال الجنسية.</li>
        <li><strong>خطاب الكراهية والتمييز:</strong> أي محتوى يروّج للعنف أو العداء أو التمييز على أساس العرق أو الإثنية أو الدين أو الجنس أو الإعاقة أو الجنسية أو العمر أو التوجه الجنسي أو أي صفة محمية بموجب القانون الكويتي أو المعايير الدولية.</li>
        <li><strong>المحتوى العنيف أو الدموي:</strong> أي محتوى يتضمن أو يمجد الأذى الجسدي أو الإساءة أو القسوة أو التهديدات ضد الأفراد أو المجموعات.</li>
        <li><strong>الخدمات الاحتيالية أو المضللة:</strong> بما في ذلك الادعاءات الكاذبة حول فعالية المحتوى، أو المؤهلات الأكاديمية، أو الشهادات، أو الشهادات المزيفة، أو الإعلانات المضللة.</li>
        <li><strong>الخدمات غير المرخّصة أو غير المصرح بها:</strong> مثل تقديم استشارات مالية أو قانونية أو طبية من قبل أفراد أو جهات لا تمتلك التراخيص أو الاعتمادات اللازمة وفقًا للقوانين الكويتية أو الدولية.</li>
        <li><strong>الأنشطة أو السلع غير القانونية أو المحظورة:</strong> مثل الترويج أو بيع المواد المخدرة أو الأسلحة أو أدوات القرصنة أو الخدمات التي تنتهك القوانين المطبقة.</li>
        <li><strong>البرمجيات الخبيثة أو الرسائل المزعجة أو محاولات التصيد:</strong> بما في ذلك تحميل شيفرات خبيثة، أو إعادة توجيه احتيالية، أو محاولات الحصول على بيانات اعتماد المستخدمين أو معلومات الدفع بطرق غير قانونية.</li>
        <li><strong>انتهاكات حقوق الملكية الفكرية:</strong> أي محتوى ينتهك حقوق النشر أو العلامات التجارية أو براءات الاختراع أو حقوق الدعاية الخاصة بأطراف ثالثة.</li>
      </ul>
      <p>تحتفظ أفيد بالحق المطلق في مراجعة أو تقييد أو إلغاء نشر أو إزالة أي محتوى تراه، وفق تقديرها المنفرد، مخالفًا لهذه المعايير، حتى إذا لم يتم الإبلاغ عنه بشكل رسمي.</p>

      <h3>٧.٢ السلوك المحظور</h3>
      <p>يحظر على المستخدمين وصنّاع المحتوى الانخراط في أي من الأفعال التالية على المنصة أو خارجها إذا كانت مرتبطة باستخدام أفيد:</p>
      <ul>
        <li>التحرش أو الإساءة أو التهديد تجاه مستخدمين آخرين أو صنّاع محتوى أو موظفي أفيد.</li>
        <li>انتحال شخصية أي شخص أو كيان أو ممثل للمنصة.</li>
        <li>تجاوز أو تعطيل التدابير الأمنية للمنصة، بما في ذلك الوصول غير المصرح به إلى واجهات برمجة التطبيقات أو تعديل الأكواد البرمجية أو استخراج بيانات المنصة (Scraping).</li>
        <li>استغلال أخطاء النظام أو أسعار المنتجات أو القيام باسترداد مدفوعات احتيالية.</li>
        <li>استخدام الروبوتات أو إنشاء تفاعل وهمي (مثل مشاهدات أو تقييمات مزيفة) أو توليد حركة مرور غير طبيعية بهدف تضليل المقاييس أو الإحصاءات.</li>
      </ul>

      <h3>٧.٣ الإنفاذ والإبلاغ</h3>
      <p>تشجع أفيد المستخدمين وصنّاع المحتوى على الإبلاغ عن أي انتهاكات لهذه السياسة من خلال مراسلة info@afeed.co مع تقديم الأدلة الداعمة.</p>
      <p>عند التحقق من ارتكاب فعل محظور أو نشر محتوى مخالف، تصدر أفيد إشعارًا إلى صانع المحتوى أو المستخدم المعني، تطلب فيه إزالة المحتوى المخالف خلال مدة لا تتجاوز ساعة واحدة. وفي حالة عدم الامتثال، يحق لأفيد:</p>
      <ul>
        <li>إزالة المحتوى فورًا؛</li>
        <li>تعليق الحساب مؤقتًا أو إلغاؤه نهائيًا؛</li>
        <li>حجز أي مدفوعات مستحقة لصانع المحتوى؛</li>
        <li>إحالة الأمر إلى الجهات المختصة وفقًا للالتزامات القانونية السارية في دولة الكويت.</li>
      </ul>
      <p>يجوز حظر المخالفين المتكررين أو من يرتكبون انتهاكات جسيمة نهائيًا ودون إشعار إضافي أو استحقاق لاسترداد أي رسوم.</p>

      <h2>٨. عدم السداد، وتعليق الحساب، وإعادة التفعيل</h2>
      <p>تعتمد أفيد على السداد في الوقت المحدد لرسوم الاشتراك لضمان استمرارية الخدمات التشغيلية والبنية التحتية المقدمة لصنّاع المحتوى. ولهذا الغرض، تحكم إرشادات صارمة العواقب المترتبة على عدم السداد وإجراءات تعليق حساب صانع المحتوى.</p>
      <h3>٨.١ التزامات الدفع</h3>
      <p>يعترف صانع المحتوى بأن استمرار تقديم أفيد لخدماتها يعتمد على السداد في الوقت المحدد لرسوم الاشتراك. ويتعهد صانع المحتوى بالحفاظ على معلومات فوترة صالحة طوال مدة اشتراكه، وأن تُسدد رسوم الاشتراك بالكامل مقدمًا وفقًا لدورة الفوترة المختارة (شهرية أو سنوية).</p>
      <p>في حال فشل الدفع، تبدأ أفيد تسلسل تحصيل تلقائي، حيث تحاول تحصيل المبلغ من وسيلة الدفع المخزنة حتى أربع (4) مرات خلال فترة أربعة عشر (14) يومًا.</p>
      <h3>٨.٢ بروتوكول التعليق</h3>
      <p>إذا فشلت جميع محاولات التحصيل، يُعلّق حساب صانع المحتوى فورًا، وخلال فترة التعليق:</p>
      <ul>
        <li>يتم تعطيل الوصول إلى لوحة التحكم وأدوات الصانع والتحليلات.</li>
        <li>يتم إلغاء نشر جميع المنتجات الرقمية والجلسات المباشرة وإخفاؤها عن المستخدمين.</li>
        <li>تُلغى أي جلسات مباشرة مجدولة تلقائيًا، دون التزام على أفيد أو المستخدم برد المبالغ.</li>
        <li>لا يمكن رفع محتوى جديد، ويقتصر الدعم على المساعدة في إعادة التفعيل.</li>
      </ul>
      <p>ترسل أفيد إشعارًا بالبريد الإلكتروني إلى صانع المحتوى المسجّل لديها، وقد تصدر تذكيرات قبل البدء بإجراءات الحذف أو الاحتفاظ طويلة المدى.</p>
      <h3>٨.٣ الاحتفاظ بالبيانات وإعادة التفعيل</h3>
      <p>تحتفظ أفيد ببيانات حساب صانع المحتوى، بما في ذلك المحتوى المرفوع وسجلات وصول المستخدم وإعدادات المتجر، لمدة ثلاثمائة وخمسة وستين (365) يومًا من تاريخ التعليق.</p>
      <p>خلال هذه الفترة:</p>
      <ul>
        <li>يمكن إعادة تفعيل الحساب عن طريق سداد كامل رسوم الاشتراك المستحقة.</li>
        <li>عند إعادة التفعيل، يُعاد نشر المحتوى والإعدادات وفقًا لخطة الاشتراك المختارة.</li>
      </ul>
      <p>إذا لم يتم السداد خلال فترة 365 يومًا، تُحذف بشكل نهائي:</p>
      <ul>
        <li>جميع المنتجات الرقمية والملفات المرفوعة؛</li>
        <li>وبيانات العملاء وسجلات الشراء؛</li>
        <li>والعلامة التجارية للحساب.</li>
      </ul>
      <p>لا تتحمّل أفيد أي مسؤولية عن استرجاع أو إعادة أي بيانات جرى حذفها بعد انقضاء فترة الاحتفاظ المحددة.</p>
      <h3>٨.٤ أثر التعليق على المستخدمين</h3>
      <p>في حالة تعليق أو إنهاء حساب صانع المحتوى، يفقد المستخدمون الذين اشتروا منتجات أو جلسات من ذلك الصانع إمكانية الوصول إلى هذه المحتويات فورًا. وينصح المستخدمون بالتواصل مع صانع المحتوى المعني للحصول على مزيد من المساعدة أو لاسترداد المبالغ.</p>
      <p>وتخلي أفيد مسؤوليتها عن:</p>
      <ul>
        <li>أي عدم رضا ناتج عن غياب صانع المحتوى أو توقف المحتوى؛</li>
        <li>أي استرداد أو دعم أو تعويض مالي عن محتوى مرتبط بحسابات معلقة؛</li>
        <li>أي مواعيد أو جلسات مباشرة فائتة نتيجة لعدم السداد.</li>
      </ul>

      <h2>٩. إلغاء الحساب وحذفه</h2>
      <p>تحتفظ أفيد بالحق في إلغاء الوصول إلى المنصة، أو تعليق وظائف الحساب، أو حذف الحساب بشكل دائم، سواء وفق تقديرها المنفرد أو استجابةً لانتهاكات محددة لهذه الاتفاقية. ويسري هذا البند على كل من صنّاع المحتوى والمستخدمين، ويمكن تنفيذه مع أو بدون إشعار مسبق، وذلك بحسب خطورة المخالفة.</p>
      <h3>٩.١ الإلغاء من قبل أفيد</h3>
      <p>يحق لأفيد الشروع في إلغاء الحساب أو حذفه في أيٍ من الحالات التالية:</p>
      <ul>
        <li>المخالفة الجسيمة لهذه الشروط، بما في ذلك تكرار انتهاك السياسات أو الانخراط في نشاط غير قانوني؛</li>
        <li>السلوك الاحتيالي، بما في ذلك استخدام هويات مزيفة، أو تنفيذ عمليات استرداد مبالغ مدفوعة عن قصد، أو التلاعب بعمليات الدفع؛</li>
        <li>نشر محتوى أو القيام بسلوك محظور كما هو مذكور في القسم 7؛</li>
        <li>النزاعات أو المطالبات غير المحسومة المتعلقة بسوء استخدام المنصة، أو إساءة استخدام سياسات الاسترداد، أو النزاعات التي وصلت إلى مقدم خدمات الدفع؛</li>
        <li>عدم الامتثال لالتزامات قانونية، بما في ذلك أوامر المحاكم أو التعليمات الصادرة عن السلطات التنظيمية داخل دولة الكويت.</li>
      </ul>
      <p>عند الإلغاء:</p>
      <ul>
        <li>يتم فورًا إلغاء أي وصول إلى خدمات المنصة؛</li>
        <li>يتم حذف جميع المحتويات الرقمية بشكل دائم؛</li>
        <li>قد يتم حجز المدفوعات المعلقة لحين انتهاء التحقيق؛</li>
        <li>لا يتم رد أي رسوم اشتراك أو مبالغ مدفوعة مقابل الخدمات.</li>
      </ul>
      <p>في الحالات التي ترى فيها أفيد وجود خطر وشيك على سلامة أو أمان أو نزاهة المنصة أو بياناتها أو بيانات المستخدمين، يجوز لها تعليق أو حذف الحساب دون إشعار مسبق، مع الاحتفاظ بالحق في اللجوء إلى أي وسائل قانونية.</p>
      <h3>٩.٢ الإلغاء من قبل صاحب الحساب</h3>
      <p>يجوز لأي مستخدم أو صانع محتوى طلب إلغاء حسابه طوعًا عن طريق تقديم طلب كتابي إلى info@afeed.co من عنوان بريده الإلكتروني المسجّل، على أن يتضمن الطلب:</p>
      <ul>
        <li>الاسم الكامل ورابط الحساب؛</li>
        <li>سبب الإلغاء (اختياري)؛</li>
        <li>إقرارًا بوقف جميع الأنشطة المرتبطة بالحساب فور إغلاقه.</li>
      </ul>
      <p>بعد التحقق من الطلب:</p>
      <ul>
        <li>يتم إغلاق الحساب خلال عشرة (10) أيام عمل؛</li>
        <li>تبدأ عملية حذف البيانات وفقًا لأحكام سياسة الخصوصية المعتمدة لدى أفيد؛</li>
        <li>يُلغى أي وصول إلى أدوات صانع المحتوى، أو المحتوى، أو لوحات التحكم.</li>
      </ul>
      <p>ويقرّ المستخدمون وصنّاع المحتوى بأن طلب الإلغاء الطوعي نهائي، وأن جميع البيانات والملفات وحقوق الوصول إلى المشتريات قد تُمحى بشكل دائم، مع مراعاة أي التزامات متعلقة بالاحتفاظ بالبيانات وفق القوانين واللوائح المعمول بها.</p>
      <h3>٩.٣ الالتزامات بعد الإلغاء</h3>
      <p>تظل الالتزامات التالية سارية حتى بعد إلغاء الحساب:</p>
      <ul>
        <li>سداد أي أرصدة أو مستحقات متبقية؛</li>
        <li>الالتزامات القانونية المتعلقة بالمحتوى الذي تم نشره سابقًا؛</li>
        <li>إنفاذ حقوق الملكية الفكرية أو معالجة أي انتهاكات لها؛</li>
        <li>التعاون في إجراءات تسوية النزاعات القائمة وقت الإلغاء.</li>
      </ul>
      <p>تحتفظ أفيد بالحق في الاحتفاظ بسجلات الحسابات التي تم إلغاؤها بهدف الامتثال لمتطلبات مكافحة الاحتيال، والضرائب، والتدقيق، وحماية المستهلك، سواء داخل الكويت أو على المستوى الدولي.</p>

      <h2>١٠. تحديد المسؤولية</h2>
      <p>إلى أقصى حد يسمح به القانون المعمول به في دولة الكويت، فإن شركة أفيد لتطوير المواقع والتطبيقات ذ.م.م ("أفيد") ومديريها ومسؤوليها وموظفيها ووكلائها وشركائها والمرخِّصين لها ومقدمي خدماتها لا يتحملون أي مسؤولية عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو خاصة أو تبعية أو نموذجية أو عقابية ناشئة عن أو متعلقة بما يلي:</p>
      <ul>
        <li>استخدام المنصة أو العجز عن استخدامها؛</li>
        <li>أداء المنصة أو عدم أدائها؛</li>
        <li>أفعال أو امتناعات أي مستخدم أو صانع محتوى؛</li>
        <li>الاعتماد على أي معلومات أو محتوى يتيحه صنّاع المحتوى؛</li>
        <li>التأخيرات أو الانقطاعات في المنصة بما في ذلك الأنظمة أو الخدمات التابعة لجهات خارجية مثل مقدم خدمات الدفع أو AWS أو DigitalOcean؛</li>
        <li>الوصول غير المصرّح به إلى بيانات المستخدم أو صانع المحتوى أو تعديلها أو حذفها؛</li>
        <li>الأخطاء المطبعية أو السهو أو أي عدم دقة في أي جزء من المنصة.</li>
      </ul>
      <p>وينطبق هذا التحديد للمسؤولية على جميع أسباب الدعوى ـ سواء تأسست على العقد أو المسؤولية التقصيرية (بما فيها الإهمال) أو المسؤولية الصارمة أو أي نظرية قانونية أخرى ـ حتى وإن تم إخطار أفيد بإمكانية وقوع مثل تلك الأضرار.</p>
      <h3>١٠.١ تقديم المنصة "كما هي"</h3>
      <p>تُقدَّم المنصة على أساس "كما هي" و"حسب التوافر". وتخلي أفيد جميع الضمانات، الصريحة والضمنية والقانونية، بما في ذلك ـ دون حصر ـ ضمانات القابلية للتسويق والملاءمة لغرض معين وعدم الانتهاك وتكامل النظام.</p>
      <p>ولا تضمن أفيد أن:</p>
      <ul>
        <li>تكون المنصة خالية من الأخطاء أو الانقطاعات؛</li>
        <li>تكون النتائج المتحصلة من استخدامها دقيقة أو موثوقة؛</li>
        <li>أنه سيتم تصحيح أي أخطاء برمجية.</li>
      </ul>
      <p>وتقر بأن استخدامك للمنصة يقع بالكامل على مسؤوليتك الخاصة، وأنك تتحمل وحدك مسؤولية الامتثال لجميع القوانين المعمول بها.</p>
      <h3>١٠.٢ الحد الأقصى للمسؤولية</h3>
      <p>في جميع الأحوال، لا تتجاوز المسؤولية الإجمالية لأفيد تجاه أي مستخدم أو صانع محتوى إجمالي المبالغ التي دفعها ذلك الطرف إلى أفيد مقابل خدمات الاشتراك خلال الأشهر الستة (6) السابقة للحدث المنشئ للمطالبة.</p>
      <p>ولا يسري هذا التحديد على:</p>
      <ul>
        <li>الوفاة أو الإصابة الجسدية الناتجة عن إهمال جسيم أو سوء سلوك متعمَّد من جانب أفيد؛</li>
        <li>أي مسؤولية لا يجوز استثناؤها بموجب القانون الكويتي المعمول به.</li>
      </ul>

      <h2>١١. القانون الحاكم والاختصاص القضائي</h2>
      <p>تخضع هذه الاتفاقية، وأي التزامات تعاقدية أو غير تعاقدية تنشأ عنها أو ترتبط بها، للقانون الحاكم في دولة الكويت وتُفسَّر وفقًا له.</p>
      <h3>١١.١ الاختصاص القضائي الحصري</h3>
      <p>تكون المحاكم المختصة في مدينة الكويت - دولة الكويت صاحبة الاختصاص الحصري في نظر أي نزاع أو خلاف أو مطالبة تنشأ عن هذه الاتفاقية أو ترتبط بها، بما في ذلك ما يتعلق بوجودها أو صحتها أو تفسيرها أو تنفيذها أو الإخلال بها أو إنهائها.</p>
      <p>ويقرّ الطرف بأنّه يتنازل عن أي اعتراض على مكان أو ولاية الاختصاص القضائي، ويوافق على الخضوع للاختصاص الشخصي لمحاكم الكويت في جميع الإجراءات القانونية المتعلقة بهذه الاتفاقية.</p>
      <h3>١١.٢ استثناء التحكيم</h3>
      <p>مع عدم الإخلال بما سبق، تحتفظ أفيد بالحق في طلب تدابير وقتية أو أمرية أمام أي جهة قضائية لحماية حقوقها أو لإنفاذ حقوق الملكية الفكرية أو البيانات أو السرية التجارية.</p>
      <h3>١١.٣ اللغة والصحة القانونية</h3>
      <p>تكون اللغة الحاكمة لهذه الاتفاقية هي اللغة الإنجليزية لأغراض التفسير القانوني أو تسوية المنازعات داخل دولة الكويت. وتُقدَّم الترجمات إلى العربية أو غيرها للتيسير فقط، ولا تُنشئ تعارضًا مع المعنى القانوني أو القوة التنفيذية للنص الإنجليزي الأصلي.</p>

      <h2>١٢. التعديلات على هذه الشروط</h2>
      <h3>١٢.١ الحق في تعديل الشروط</h3>
      <p>تحتفظ شركة أفيد لتطوير المواقع والتطبيقات ذ.م.م ("أفيد") صراحةً بالحق، وفق تقديرها المنفرد والمطلق، في تعديل أو مراجعة أو تحديث أو استبدال أو إعادة صياغة أي جزء من هذه الشروط والأحكام أو سياسة الخصوصية المرتبطة بها، في أي وقت، مع أو بدون إشعار مسبق، وذلك مع مراعاة أحكام القوانين المعمول بها في دولة الكويت.</p>
      <p>وقد تشمل هذه التعديلات، على سبيل المثال لا الحصر:</p>
      <ul>
        <li>تغييرات في أسعار الاشتراك أو دورات الفوترة أو طرق الدفع؛</li>
        <li>تحديثات في إجراءات الاسترداد أو ممارسات معالجة البيانات؛</li>
        <li>توضيحات في سياسات الاستخدام المقبول والمحتوى؛</li>
        <li>توسيع أو تقليص ميزات ووظائف المنصة؛</li>
        <li>تعديلات في شراكات الأطراف الثالثة التي تؤثر في تقديم الخدمة.</li>
      </ul>
      <p>ويصبح أي تعديل ملزمًا قانونًا اعتبارًا من تاريخ النفاذ الموضح أعلى النسخة المُعدَّلة.</p>
      <h3>١٢.٢ طريقة الإشعار</h3>
      <p>إذا اعتُبرت التغييرات جوهرية، فستبذل أفيد جهدًا معقولًا لإخطار الأطراف المتأثرة بإحدى الوسائل التالية:</p>
      <ul>
        <li>رسالة بريد إلكتروني إلى العنوان المُسجَّل للمستخدم أو صانع المحتوى؛</li>
        <li>تنبيهات داخل المنصة، أو لافتات، أو رسائل نظامية؛</li>
        <li>رسائل مباشرة عبر لوحة تحكم صانع المحتوى أو صندوق الدعم؛</li>
        <li>تحديثات على صفحة «الشروط» على موقع www.afeed.co/ar/terms.</li>
      </ul>
      <p>ما لم يقتضِ القانون خلاف ذلك، لا حاجة لإرسال مكاتبات ورقية أو تبليغ قانوني فردي لإتمام الإشعار.</p>
      <h3>١٢.٣ قبول الشروط المعدلة</h3>
      <p>يُعدّ استمرارك في الوصول إلى المنصة أو استخدامها بعد نشر النسخة المعدلة قبولًا مُلزِمًا لها. وإذا لم توافق على الشروط الجديدة، فإن الحل الوحيد هو التوقف عن استخدام المنصة وطلب إلغاء الحساب.</p>
      <p>ويُعد عدم طلب إلغاء الحساب خلال سبعة (7) أيام تقويمية من تاريخ الإشعار قبولًا كاملًا ولا رجعة فيه لهذه التغييرات.</p>
      <h3>١٢.٤ التحكم في الإصدارات وحل التعارض</h3>
      <p>تحمل كل نسخة من الشروط تاريخ نفاذ واضحًا. وعند نشوء نزاع حول معاملة أو واقعة معينة، تُطبق النسخة النافذة وقت تلك المعاملة أو الواقعة.</p>
      <p>وفي حالة الترجمات أو الإصدارات المحلية لهذه الشروط، تكون النسخة الإنجليزية الأصلية هي المرجع الحاكم لأغراض التفسير والتنفيذ داخل دولة الكويت.</p>
    </article>
  );
}
