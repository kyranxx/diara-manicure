import type { TranslationMessages } from "@/lib/i18n"
import { siteConfig } from "@/lib/site-config"

export function GoogleReviewsMarquee({ t }: { t: TranslationMessages }) {
  return (
    <section
      id="recenzie"
      data-google-reviews-marquee-root
      data-google-maps-url={siteConfig.googleReviewsUrl}
      data-reviews-endpoint="/api/google-reviews"
      data-loading-label={t.reviews.loading}
      data-error-label={t.reviews.error}
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-black/10 bg-[#ece9e5] py-14 dark:border-white/10 dark:bg-[#050403] md:py-20"
    >
      <div className="mx-auto mb-8 max-w-6xl px-6 text-center md:mb-10">
        <h2 className="mb-4 text-4xl font-light tracking-normal text-black md:text-6xl dark:text-white">
          {t.reviews.heading}
        </h2>
        <div className="mx-auto h-px w-28 bg-black/20 dark:bg-white/25" />
      </div>

      <div
        data-google-reviews-marquee-content
        className="w-screen max-w-none overflow-hidden"
        aria-live="polite"
      >
        <div className="google-review-marquee-placeholder mx-auto">
          {t.reviews.loading}
        </div>
      </div>

      <div className="mt-6 px-6 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span data-google-reviews-status>Google Maps</span>
        <a
          href={siteConfig.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 underline-offset-4 hover:underline"
        >
          {t.reviews.googleCta}
        </a>
      </div>
    </section>
  )
}
