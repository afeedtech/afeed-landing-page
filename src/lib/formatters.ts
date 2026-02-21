/**
 * Locale-aware formatting utilities for numbers, currencies, and percentages.
 * Ensures Arabic-Indic digits are used in Arabic locale.
 */

export function getLocale(language: string): string {
  return language === 'ar' ? 'ar-KW' : 'en-US';
}

/**
 * Format a number with locale-aware digit rendering
 */
export function formatNumber(value: number, language: string, options?: Intl.NumberFormatOptions): string {
  const locale = getLocale(language);
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Format a number in compact notation (e.g., 10K, 600K)
 */
export function formatCompact(value: number, language: string): string {
  const locale = getLocale(language);
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Format a currency value with locale-aware rendering
 * @param value - The numeric value
 * @param language - 'ar' or 'en'
 * @param currency - Currency code (default: 'KWD')
 * @param showSymbol - Whether to show currency symbol/name
 */
export function formatCurrency(
  value: number, 
  language: string, 
  currency: string = 'KWD',
  showSymbol: boolean = true
): string {
  const locale = getLocale(language);
  
  if (showSymbol) {
    // For Arabic, use custom format to show د.ك
    if (language === 'ar') {
      const formatted = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
      return `${formatted} د.ك`;
    }
    
    // For English, show "X KWD"
    const formatted = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
    return `${formatted} ${currency}`;
  }
  
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a percentage value
 */
export function formatPercent(value: number, language: string, decimals: number = 1): string {
  const locale = getLocale(language);
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}

/**
 * Format a rating (e.g., 4.9★)
 */
export function formatRating(value: number, language: string): string {
  const locale = getLocale(language);
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
  return `${formatted}★`;
}

/**
 * Format currency with per-month suffix
 */
export function formatCurrencyPerMonth(value: number, language: string, currency: string = 'KWD'): string {
  const locale = getLocale(language);
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
  
  if (language === 'ar') {
    return `${formatted} د.ك/شهر`;
  }
  return `${formatted} ${currency}/mo`;
}
