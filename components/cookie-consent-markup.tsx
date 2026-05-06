import type { TranslationMessages } from "@/lib/i18n"

export function CookieConsentMarkup({ t }: { t: TranslationMessages["cookie"] }) {
  return (
    <div
      id="cookie-consent"
      hidden
      className="fixed bottom-3 left-3 right-3 z-[9999] sm:left-auto sm:w-[min(34rem,calc(100vw-2rem))]"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-modal="false"
    >
      <div className="rounded-xl border border-primary/10 bg-white/95 p-2.5 shadow-lg backdrop-blur-md dark:bg-neutral-900/95 sm:flex sm:items-center sm:gap-3">
        <div className="min-w-0 flex-1">
          <h2 id="cookie-consent-title" className="sr-only">
            {t.title}
          </h2>
          <p className="text-xs font-light leading-snug text-muted-foreground">
            <span className="font-medium text-black dark:text-white">Cookies.</span>{" "}
            {t.summary}{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-primary"
            >
              {t.privacyLink}
            </a>
            .
          </p>
        </div>
        <div className="mt-2 flex shrink-0 items-center justify-end gap-2 sm:mt-0">
          <button
            type="button"
            data-cookie-action="essential"
            className="h-8 rounded-full border border-input px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {t.essentialOnly}
          </button>
          <button
            type="button"
            data-cookie-action="accept"
            className="h-8 rounded-full bg-primary px-4 text-xs font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            {t.acceptAll}
          </button>
        </div>
      </div>
    </div>
  )
}
