import { Star } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import type { TranslationMessages } from "@/lib/i18n"

export function GoogleReviewsSection({ t }: { t: TranslationMessages }) {
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""

    return (
        <section
            id="recenzie"
            data-google-reviews-root
            data-google-maps-key={googleMapsApiKey}
            data-place-query={`${siteConfig.name} ${siteConfig.addressLine1}, ${siteConfig.city}, Slovakia`}
            data-loading-label={t.reviews.loading}
            data-error-label={t.reviews.error}
            className="overflow-hidden bg-beige py-16 dark:bg-[#050403]"
        >
            <div className="container mx-auto px-6">
                <div className="mx-auto mb-10 max-w-3xl text-center">
                    <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                        {t.reviews.eyebrow}
                    </p>
                    <h2 className="mb-4 text-5xl font-light tracking-tight text-black md:text-7xl dark:text-white">
                        {t.reviews.heading}
                    </h2>
                    <div className="mx-auto mb-5 h-1 w-24 rounded-full bg-primary/20" />
                    <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                        {t.reviews.description}
                    </p>
                    <div className="mt-5 flex items-center justify-center gap-2 text-primary" aria-label="5 z 5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="size-5 fill-current" />
                        ))}
                    </div>
                    <p data-google-reviews-status className="mt-3 text-sm text-muted-foreground">
                        {t.reviews.loading}
                    </p>
                </div>

                <div data-google-reviews-list className="google-reviews-grid" aria-live="polite">
                    <div className="google-review-placeholder">
                        {t.reviews.loading}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <a
                        href={siteConfig.googleReviewsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center justify-center rounded-full border border-primary/15 bg-white/55 px-6 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground dark:bg-card"
                    >
                        {t.reviews.googleCta}
                    </a>
                </div>
            </div>
        </section>
    )
}
