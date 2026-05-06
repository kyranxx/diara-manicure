"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  getStoredConsent,
  saveConsent,
  getAllGranted,
  getAnalyticsOnly,
} from "@/lib/analytics"
import { useI18n } from "@/components/language-provider"

export function CookieConsent() {
  const { t } = useI18n()
  const [visible, setVisible] = React.useState(false)
  const [showDetails, setShowDetails] = React.useState(false)
  const [animating, setAnimating] = React.useState(false)

  React.useEffect(() => {
    const stored = getStoredConsent()
    if (!stored) {
      const timer = setTimeout(() => {
        setVisible(true)
        setTimeout(() => setAnimating(true), 50)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [])

  if (!visible) return null

  function handleAcceptAll() {
    saveConsent(getAllGranted())
    dismiss()
  }

  function handleAcceptEssential() {
    saveConsent(getAnalyticsOnly())
    dismiss()
  }

  function handleRejectAll() {
    saveConsent({
      adStorage: "denied",
      analyticsStorage: "denied",
      adUserData: "denied",
      adPersonalization: "denied",
    })
    dismiss()
  }

  function dismiss() {
    setAnimating(false)
    setTimeout(() => setVisible(false), 300)
  }

  if (!visible) return null

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[9999] transition-all duration-300 ease-out",
        animating ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-modal="false"
    >
      <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-primary/10 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <div className="container mx-auto px-6 py-5 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1 min-w-0">
              <h2
                id="cookie-consent-title"
                className="text-sm font-medium text-black dark:text-white mb-1.5"
              >
                {t.cookie.title}
              </h2>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {t.cookie.descriptionStart}{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-primary transition-colors"
                >
                  {t.cookie.privacyLink}
                </a>
                .
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
              <button
                onClick={handleRejectAll}
                className="h-9 px-4 rounded-full border border-input text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                {t.cookie.reject}
              </button>
              <button
                onClick={handleAcceptEssential}
                className="h-9 px-4 rounded-full border border-primary/20 text-xs font-medium text-primary dark:text-white hover:bg-accent transition-all duration-300"
              >
                {t.cookie.essentialOnly}
              </button>
              <button
                onClick={handleAcceptAll}
                className="h-9 px-5 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-all duration-300 shadow-sm"
              >
                {t.cookie.acceptAll}
              </button>
            </div>
          </div>

          {showDetails && (
            <div className="mt-4 pt-4 border-t border-primary/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.cookie.details.map((detail) => (
                <div key={detail.title} className="space-y-1">
                  <p className="text-xs font-medium text-black dark:text-white">{detail.title}</p>
                  <p className="text-xs text-muted-foreground font-light">{detail.description}</p>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowDetails((v) => !v)}
            className="mt-3 text-xs text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors font-light"
          >
            {showDetails ? t.cookie.hideDetails : t.cookie.showDetails}
          </button>
        </div>
      </div>
    </div>
  )
}
