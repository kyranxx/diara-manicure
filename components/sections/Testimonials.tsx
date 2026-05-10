import type { TranslationMessages } from "@/lib/i18n"
import { siteConfig } from "@/lib/site-config"

export function GoogleReviewsMarquee({ t }: { t: TranslationMessages }) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""
  const placeQuery = `${siteConfig.name} ${siteConfig.addressLine1}, ${siteConfig.city}, Slovakia`

  return (
    <section
      id="recenzie"
      data-google-reviews-marquee-root
      data-google-maps-key={googleMapsApiKey}
      data-place-query={placeQuery}
      data-google-maps-url={siteConfig.googleReviewsUrl}
      data-reviews-endpoint="/api/google-reviews"
      data-loading-label={t.reviews.loading}
      data-error-label={t.reviews.error}
      className="overflow-hidden bg-beige pt-8 pb-16 dark:bg-[#050403]"
    >
      <div className="mb-8 px-6 text-center">
        <h2 className="mb-4 text-5xl font-light tracking-tight text-black md:text-7xl dark:text-white">
          {t.reviews.heading}
        </h2>
        <div className="mx-auto h-1 w-24 rounded-full bg-primary/20" />
      </div>

      <div
        data-google-reviews-marquee-content
        className="w-screen overflow-hidden"
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
