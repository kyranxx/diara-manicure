"use client"

import * as React from "react"
import {
  defaultLanguage,
  getLanguageMeta,
  languageStorageKey,
  languages,
  translations,
  type Language,
  type TranslationMessages,
} from "@/lib/i18n"

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: TranslationMessages
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null)

function getSafeLanguage(value: string | null): Language {
  return languages.some((language) => language.code === value)
    ? (value as Language)
    : defaultLanguage
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<Language>(defaultLanguage)
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    setLanguageState(getSafeLanguage(window.localStorage.getItem(languageStorageKey)))
    setReady(true)
  }, [])

  React.useEffect(() => {
    if (!ready) return

    const languageMeta = getLanguageMeta(language)
    document.documentElement.lang = languageMeta.htmlLang
    window.localStorage.setItem(languageStorageKey, language)
  }, [language, ready])

  const setLanguage = React.useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage)
  }, [])

  const value = React.useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language, setLanguage]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useI18n() {
  const context = React.useContext(LanguageContext)

  if (!context) {
    throw new Error("useI18n must be used inside LanguageProvider")
  }

  return context
}
