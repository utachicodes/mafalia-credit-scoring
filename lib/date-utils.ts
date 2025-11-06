const LANGUAGE_LOCALES: Record<string, string> = {
  fr: "fr-SN",
  en: "en-US",
}

const DEFAULT_DATE_OPTIONS: Intl.DateTimeFormatOptions = { dateStyle: "medium" }

export function getLocaleForLanguage(language: string): string {
  return LANGUAGE_LOCALES[language] ?? LANGUAGE_LOCALES.en
}

export function formatDateForLanguage(
  value: Date | string | number,
  language: string,
  options: Intl.DateTimeFormatOptions = DEFAULT_DATE_OPTIONS,
): string {
  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ""
  }

  const locale = getLocaleForLanguage(language)
  return new Intl.DateTimeFormat(locale, options).format(date)
}

