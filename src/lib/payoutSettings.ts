// Shared payout settings - single source of truth for Settings and Payments pages

export interface BankDetails {
  bankName: string;
  accountHolderName: string;
  accountNumber: string; // Masked
  iban: string; // Masked
  swift?: string;
}

export interface PayoutSettings {
  schedule: 'daily' | 'weekly' | 'monthly';
  nextPayoutDate: string;
  method: string;
  bankDetails: BankDetails;
  status: 'verified' | 'needs_action';
  lastUpdated: string;
}

export const scheduleOptions = [
  { 
    value: 'daily', 
    label: 'Daily (Immediate)', 
    fee: 'KWD 1',
    description: 'Receive payouts daily on-demand'
  },
  { 
    value: 'weekly', 
    label: 'Weekly (Every Thursday)', 
    fee: 'Free',
    description: 'Receive payouts every Thursday'
  },
  { 
    value: 'monthly', 
    label: 'Monthly (Last working day)', 
    fee: 'Free',
    description: 'Receive payouts on the last working day of each month'
  },
] as const;

export const defaultPayoutSettings: PayoutSettings = {
  schedule: 'weekly',
  nextPayoutDate: 'Thursday, Jan 9, 2025',
  method: 'Bank Transfer',
  bankDetails: {
    bankName: 'Emirates NBD',
    accountHolderName: 'Hisham Abdoh',
    accountNumber: '****1234',
    iban: '****1234',
  },
  status: 'verified',
  lastUpdated: 'Dec 15, 2024',
};

// Comprehensive MENA banks list
export const menaBanks = [
  // Kuwait
  { value: 'nbk', label: 'National Bank of Kuwait (NBK)', country: 'Kuwait' },
  { value: 'kfh', label: 'Kuwait Finance House (KFH)', country: 'Kuwait' },
  { value: 'boubyan', label: 'Boubyan Bank', country: 'Kuwait' },
  { value: 'cbk', label: 'Commercial Bank of Kuwait', country: 'Kuwait' },
  { value: 'gbk', label: 'Gulf Bank', country: 'Kuwait' },
  { value: 'abk', label: 'Al Ahli Bank of Kuwait', country: 'Kuwait' },
  { value: 'burgan', label: 'Burgan Bank', country: 'Kuwait' },
  { value: 'warba', label: 'Warba Bank', country: 'Kuwait' },
  { value: 'kib', label: 'Kuwait International Bank (KIB)', country: 'Kuwait' },
  // UAE
  { value: 'enbd', label: 'Emirates NBD', country: 'UAE' },
  { value: 'adcb', label: 'Abu Dhabi Commercial Bank (ADCB)', country: 'UAE' },
  { value: 'fab', label: 'First Abu Dhabi Bank (FAB)', country: 'UAE' },
  { value: 'mashreq', label: 'Mashreq Bank', country: 'UAE' },
  { value: 'dib', label: 'Dubai Islamic Bank', country: 'UAE' },
  { value: 'adib', label: 'Abu Dhabi Islamic Bank (ADIB)', country: 'UAE' },
  { value: 'rakbank', label: 'RAKBANK', country: 'UAE' },
  { value: 'cbd', label: 'Commercial Bank of Dubai', country: 'UAE' },
  { value: 'nbd', label: 'National Bank of Dubai', country: 'UAE' },
  { value: 'ajmanbank', label: 'Ajman Bank', country: 'UAE' },
  { value: 'sharjahislamic', label: 'Sharjah Islamic Bank', country: 'UAE' },
  { value: 'almasraf', label: 'Al Masraf', country: 'UAE' },
  { value: 'nbf', label: 'National Bank of Fujairah', country: 'UAE' },
  { value: 'uab', label: 'United Arab Bank', country: 'UAE' },
  // Saudi Arabia
  { value: 'alrajhi', label: 'Al Rajhi Bank', country: 'Saudi Arabia' },
  { value: 'snb', label: 'Saudi National Bank (SNB)', country: 'Saudi Arabia' },
  { value: 'riyadbank', label: 'Riyad Bank', country: 'Saudi Arabia' },
  { value: 'sabb', label: 'SABB (Saudi British Bank)', country: 'Saudi Arabia' },
  { value: 'alinma', label: 'Alinma Bank', country: 'Saudi Arabia' },
  { value: 'albilad', label: 'Bank Albilad', country: 'Saudi Arabia' },
  { value: 'aljazira', label: 'Bank Aljazira', country: 'Saudi Arabia' },
  { value: 'anb', label: 'Arab National Bank (ANB)', country: 'Saudi Arabia' },
  { value: 'bsf', label: 'Banque Saudi Fransi', country: 'Saudi Arabia' },
  { value: 'gib', label: 'Gulf International Bank', country: 'Saudi Arabia' },
  // Egypt
  { value: 'cib', label: 'Commercial International Bank (CIB)', country: 'Egypt' },
  { value: 'nbe', label: 'National Bank of Egypt', country: 'Egypt' },
  { value: 'qnb_egypt', label: 'QNB Alahli', country: 'Egypt' },
  { value: 'banquemisr', label: 'Banque Misr', country: 'Egypt' },
  { value: 'alexbank', label: 'Bank of Alexandria (AlexBank)', country: 'Egypt' },
  { value: 'aaib', label: 'Arab African International Bank', country: 'Egypt' },
  { value: 'faisal', label: 'Faisal Islamic Bank of Egypt', country: 'Egypt' },
  { value: 'hsbc_egypt', label: 'HSBC Egypt', country: 'Egypt' },
  { value: 'attijariwafa_egypt', label: 'Attijariwafa Bank Egypt', country: 'Egypt' },
  // Qatar
  { value: 'qnb_qatar', label: 'Qatar National Bank (QNB)', country: 'Qatar' },
  { value: 'qib', label: 'Qatar Islamic Bank (QIB)', country: 'Qatar' },
  { value: 'cbq', label: 'Commercial Bank of Qatar', country: 'Qatar' },
  { value: 'dohabank', label: 'Doha Bank', country: 'Qatar' },
  { value: 'masraf', label: 'Masraf Al Rayan', country: 'Qatar' },
  { value: 'ahlibank_qatar', label: 'Ahli Bank (Qatar)', country: 'Qatar' },
  { value: 'dukhan', label: 'Dukhan Bank', country: 'Qatar' },
  // Bahrain
  { value: 'nbb', label: 'National Bank of Bahrain', country: 'Bahrain' },
  { value: 'bbk', label: 'Bank of Bahrain and Kuwait (BBK)', country: 'Bahrain' },
  { value: 'ahli_united', label: 'Ahli United Bank', country: 'Bahrain' },
  { value: 'ithmaar', label: 'Ithmaar Bank', country: 'Bahrain' },
  { value: 'albaraka', label: 'Al Baraka Islamic Bank', country: 'Bahrain' },
  { value: 'khaleeji', label: 'Khaleeji Commercial Bank', country: 'Bahrain' },
  // Oman
  { value: 'bankmuscat', label: 'Bank Muscat', country: 'Oman' },
  { value: 'nbo', label: 'National Bank of Oman', country: 'Oman' },
  { value: 'bankdhofar', label: 'Bank Dhofar', country: 'Oman' },
  { value: 'soharbank', label: 'Sohar International', country: 'Oman' },
  { value: 'ahlibank_oman', label: 'Ahli Bank (Oman)', country: 'Oman' },
  { value: 'alizz', label: 'Alizz Islamic Bank', country: 'Oman' },
  { value: 'meethaq', label: 'Meethaq (Bank Muscat Islamic)', country: 'Oman' },
  // Jordan
  { value: 'arabbank', label: 'Arab Bank', country: 'Jordan' },
  { value: 'housingbank', label: 'Housing Bank for Trade & Finance', country: 'Jordan' },
  { value: 'jordanbank', label: 'Bank of Jordan', country: 'Jordan' },
  { value: 'cairoamman', label: 'Cairo Amman Bank', country: 'Jordan' },
  { value: 'jordankuwait', label: 'Jordan Kuwait Bank', country: 'Jordan' },
  { value: 'jiib', label: 'Jordan Islamic Bank', country: 'Jordan' },
  { value: 'safwa', label: 'Safwa Islamic Bank', country: 'Jordan' },
  // Lebanon
  { value: 'blomleb', label: 'BLOM Bank', country: 'Lebanon' },
  { value: 'bankmed', label: 'Bankmed', country: 'Lebanon' },
  { value: 'byblos', label: 'Byblos Bank', country: 'Lebanon' },
  { value: 'creditlib', label: 'Credit Libanais', country: 'Lebanon' },
  { value: 'fransabank', label: 'Fransabank', country: 'Lebanon' },
  // Morocco
  { value: 'attijariwafa', label: 'Attijariwafa Bank', country: 'Morocco' },
  { value: 'bmce', label: 'Bank of Africa (BMCE)', country: 'Morocco' },
  { value: 'bcp', label: 'Banque Centrale Populaire', country: 'Morocco' },
  { value: 'cih', label: 'CIH Bank', country: 'Morocco' },
  { value: 'sgmb', label: 'Société Générale Maroc', country: 'Morocco' },
  { value: 'cdm', label: 'Crédit du Maroc', country: 'Morocco' },
  // Tunisia
  { value: 'biat', label: 'BIAT', country: 'Tunisia' },
  { value: 'stb', label: 'Société Tunisienne de Banque', country: 'Tunisia' },
  { value: 'attijari_tunisia', label: 'Attijari Bank Tunisia', country: 'Tunisia' },
  { value: 'amen', label: 'Amen Bank', country: 'Tunisia' },
  { value: 'bh', label: 'Banque de l\'Habitat', country: 'Tunisia' },
  // Algeria
  { value: 'bna_algeria', label: 'Banque Nationale d\'Algérie', country: 'Algeria' },
  { value: 'bea', label: 'Banque Extérieure d\'Algérie', country: 'Algeria' },
  { value: 'cpa', label: 'Crédit Populaire d\'Algérie', country: 'Algeria' },
  { value: 'bdl', label: 'Banque de Développement Local', country: 'Algeria' },
  { value: 'gulf_algeria', label: 'Gulf Bank Algeria', country: 'Algeria' },
  // Iraq
  { value: 'rasheed', label: 'Rasheed Bank', country: 'Iraq' },
  { value: 'rafidain', label: 'Rafidain Bank', country: 'Iraq' },
  { value: 'tbi', label: 'Trade Bank of Iraq', country: 'Iraq' },
  { value: 'ashur', label: 'Ashur International Bank', country: 'Iraq' },
  // Libya
  { value: 'nce', label: 'National Commercial Bank (Libya)', country: 'Libya' },
  { value: 'libyanforeign', label: 'Libyan Foreign Bank', country: 'Libya' },
  // Syria
  { value: 'cbs', label: 'Commercial Bank of Syria', country: 'Syria' },
  { value: 'byblos_syria', label: 'Byblos Bank Syria', country: 'Syria' },
  // Yemen
  { value: 'cay', label: 'Central Bank of Yemen', country: 'Yemen' },
  { value: 'yemenkuwait', label: 'Yemen Kuwait Bank', country: 'Yemen' },
  // Sudan
  { value: 'bankofkhartoum', label: 'Bank of Khartoum', country: 'Sudan' },
  { value: 'faisal_sudan', label: 'Faisal Islamic Bank Sudan', country: 'Sudan' },
  // Palestine
  { value: 'bop', label: 'Bank of Palestine', country: 'Palestine' },
  { value: 'quds', label: 'Quds Bank', country: 'Palestine' },
  { value: 'arabislamic', label: 'Arab Islamic Bank', country: 'Palestine' },
  // Other / Not listed
  { value: 'other', label: 'Other (Not listed)', country: 'Other' },
];

// All MENA currencies
export const menaCurrencies = [
  { value: 'kwd', label: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar' },
  { value: 'aed', label: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { value: 'sar', label: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
  { value: 'egp', label: 'EGP', symbol: 'ج.م', name: 'Egyptian Pound' },
  { value: 'qar', label: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal' },
  { value: 'bhd', label: 'BHD', symbol: 'د.ب', name: 'Bahraini Dinar' },
  { value: 'omr', label: 'OMR', symbol: 'ر.ع', name: 'Omani Rial' },
  { value: 'jod', label: 'JOD', symbol: 'د.أ', name: 'Jordanian Dinar' },
  { value: 'lbp', label: 'LBP', symbol: 'ل.ل', name: 'Lebanese Pound' },
  { value: 'mad', label: 'MAD', symbol: 'د.م', name: 'Moroccan Dirham' },
  { value: 'tnd', label: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar' },
  { value: 'dzd', label: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar' },
  { value: 'iqd', label: 'IQD', symbol: 'د.ع', name: 'Iraqi Dinar' },
  { value: 'lyd', label: 'LYD', symbol: 'د.ل', name: 'Libyan Dinar' },
  { value: 'syp', label: 'SYP', symbol: 'ل.س', name: 'Syrian Pound' },
  { value: 'yer', label: 'YER', symbol: 'ر.ي', name: 'Yemeni Rial' },
  { value: 'sdg', label: 'SDG', symbol: 'ج.س', name: 'Sudanese Pound' },
  { value: 'usd', label: 'USD', symbol: '$', name: 'US Dollar' },
];
