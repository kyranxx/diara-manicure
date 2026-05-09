import type { TranslationMessages } from "@/lib/i18n"
import { galleryCategories, galleryImageAlt, galleryImageCaption, galleryImageSrc, gallerySectionImageIds } from "@/lib/gallery"
import { siteConfig } from "@/lib/site-config"
import { CalendarDays, Instagram, ZoomIn } from "lucide-react"
import Image from "next/image"
import { ServiceLinks } from "@/components/service-links"

export function GalleryShell({ t }: { t: TranslationMessages }) {
  const sectionTitles = {
    french: t.gallery.categories.french,
    singleColor: t.gallery.categories.singleColor,
    delicateArt: t.gallery.categories.delicateArt,
  }
  const subtleTilt = [-2.2, -1.2, -0.4, 0.4, 1.2, 2.2]
  const subtleLift = [-2, 1, -1, 2, 0, -1]

  return (
    <section
      id="galeria"
      data-gallery-root
      data-heading={t.gallery.heading}
      data-french={t.gallery.categories.french}
      data-single-color={t.gallery.categories.singleColor}
      data-delicate-art={t.gallery.categories.delicateArt}
      data-french-ids={gallerySectionImageIds.french.join(",")}
      data-single-color-ids={gallerySectionImageIds.singleColor.join(",")}
      data-delicate-art-ids={gallerySectionImageIds.delicateArt.join(",")}
      data-alt-prefix={t.gallery.imageAltPrefix}
      data-open-label={t.gallery.openImageAria}
      data-instagram={t.gallery.instagramCta}
      className="relative overflow-hidden bg-beige pt-10 pb-16 dark:bg-[#050403]"
    >
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-5xl font-light tracking-tight text-black md:text-7xl dark:text-white">
            {t.gallery.heading}
          </h2>
          <div className="mx-auto mb-5 h-1 w-24 rounded-full bg-primary/20" />
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.gallery.description}
          </p>
        </div>

        <div data-gallery-content className="mx-auto max-w-6xl space-y-12">
          {galleryCategories.map((category) => (
            <div key={category}>
              <h3 className="mb-6 text-center text-3xl font-light tracking-tight text-black md:text-4xl dark:text-white">
                {sectionTitles[category]}
              </h3>
              <div className="gallery-centered-grid">
                {gallerySectionImageIds[category].map((id, index) => {
                  const src = galleryImageSrc(id)
                  const alt = galleryImageAlt(id)
                  const caption = galleryImageCaption(id)
                  const tilt = subtleTilt[index % subtleTilt.length]
                  const lift = subtleLift[index % subtleLift.length]

                  return (
                    <figure key={id} className="gallery-centered-item">
                      <a
                        href={src}
                        data-gallery-trigger
                        data-gallery-src={src}
                        data-gallery-alt={alt}
                        className="group relative block aspect-[4/5] w-full overflow-hidden rounded-xl border border-black/10 bg-white/40 shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:z-20 hover:shadow-xl dark:border-white/15 dark:bg-white/5"
                        style={{
                          transform: `translateY(${lift}px) rotate(${tilt}deg)`,
                        }}
                        aria-label={`${t.gallery.openImageAria} ${alt}`}
                      >
                        <span className="absolute inset-0 z-10 bg-gradient-to-t from-black/25 via-transparent to-black/10 transition-colors group-hover:from-black/40" />
                        <span className="absolute inset-0 z-20 flex items-center justify-center">
                          <ZoomIn className="size-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:h-6 md:w-6" />
                        </span>
                        <Image
                          src={src}
                          alt={alt}
                          width={800}
                          height={1000}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </a>
                      <figcaption className="mt-2 min-h-8 text-center text-[0.68rem] font-medium leading-tight text-muted-foreground">
                        {caption}
                      </figcaption>
                    </figure>
                  )
                })}
              </div>
            </div>
          ))}

          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {t.gallery.servicesLabel}
            </p>
            <ServiceLinks />
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              <CalendarDays className="size-4" aria-hidden="true" />
              {t.gallery.bookingCta}
            </a>
            <a
              href="https://instagram.com/diaramanicure"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-16 items-center gap-2 rounded-2xl border border-input bg-background px-10 text-xl font-normal shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground md:h-20 md:px-12"
            >
              <span className="inline-flex h-7 w-8 items-center justify-center rounded-md bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fdf497_18%,#fd5949_45%,#d6249f_68%,#285AEB_100%)] shadow-sm">
                <Instagram className="size-4 text-white" />
              </span>
              {t.gallery.instagramCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
