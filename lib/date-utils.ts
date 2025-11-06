const LANGUAGE_LOCALES: Record<string, string> = {
  fr: "fr-SN",
  en: "en-US",
}

export function getLocaleForLanguage(language: string): string {
  return LANGUAGE_LOCALES[language] ?? LANGUAGE_LOCALES.en
}

export function formatDateForLanguage(
  value: string | number | Date,
  language: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const locale = getLocaleForLanguage(language)
  const date = value instanceof Date ? value : new Date(value)

  return new Intl.DateTimeFormat(locale, options ?? { dateStyle: "medium" }).format(date)
}
const LANGUAGE_LOCALE_MAP: Record<string, string> = {
  fr: "fr-SN",
  en: "en-US",
}

const DEFAULT_DATE_OPTIONS: Intl.DateTimeFormatOptions = { dateStyle: "medium" }

export function getLocaleForLanguage(language: string): string {
  return LANGUAGE_LOCALE_MAP[language] ?? LANGUAGE_LOCALE_MAP.en
}

export function formatDateForLanguage(
  date: Date | string,
  language: string,
  options: Intl.DateTimeFormatOptions = DEFAULT_DATE_OPTIONS,
): string {
  const value = typeof date === "string" ? new Date(date) : date
  if (Number.isNaN(value.getTime())) {
    return ""
  }

  const locale = getLocaleForLanguage(language)
  return new Intl.DateTimeFormat(locale, options).format(value)
}

