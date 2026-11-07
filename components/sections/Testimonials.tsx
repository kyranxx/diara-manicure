import type { ReviewsData } from "@/lib/bookio-reviews"
import type { TranslationMessages } from "@/lib/i18n"
import { siteConfig } from "@/lib/site-config"

export function GoogleReviewsMarquee({ t, reviewsData }: { t: TranslationMessages; reviewsData: ReviewsData }) {
  return (
    <section
      id="recenzie"
      data-google-reviews-marquee-root
      data-google-maps-url={siteConfig.googleReviewsUrl}
      data-reviews-endpoint="/api/google-reviews"
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
      >
        {/* Server-rendered so search engines read every review; the runtime script turns it into the marquee. */}
        <div className="review-marquee-track flex w-max gap-3">
          {reviewsData.reviews.map((review) => (
            <article key={review.author + review.text.slice(0, 40)} className="google-review-card">
              <div className="google-review-topline">
                <div className="google-review-stars" aria-label={`${review.rating}/5`}>
                  {"★".repeat(review.rating)}
                </div>
              </div>
              <p className="google-review-text">{review.text}</p>
              <div className="google-review-author">
                <span>{review.author}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 px-6 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span data-google-reviews-status>{reviewsData.sourceLabel}</span>
        <a
          href={siteConfig.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 underline-offset-4 hover:underline"
        >
          {t.reviews.googleCta}
        </a>
        <a
          href={siteConfig.googleWriteReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 underline-offset-4 hover:underline"
        >
          {t.reviews.writeReviewCta}
        </a>
      </div>
    </section>
  )
}
