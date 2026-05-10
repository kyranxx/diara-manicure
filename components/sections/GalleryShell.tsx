import type { TranslationMessages } from "@/lib/i18n"
import { galleryCategories, galleryImageAlt, galleryImageSrc, gallerySectionImageIds } from "@/lib/gallery"
import { InstagramIcon } from "@/components/social-icons"
import { ZoomIn } from "lucide-react"
import Image from "next/image"

export function GalleryShell({ t }: { t: TranslationMessages }) {
  const sectionTitles = {
    french: t.gallery.categories.french,
    singleColor: t.gallery.categories.singleColor,
    delicateArt: t.gallery.categories.delicateArt,
  }
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
        </div>

        <div data-gallery-content className="mx-auto max-w-6xl space-y-12">
          {galleryCategories.map((category) => (
            <div key={category}>
              <h3 className="mb-6 text-center text-3xl font-light tracking-tight text-black md:text-4xl dark:text-white">
                {sectionTitles[category]}
              </h3>
              <div className="gallery-centered-grid">
                {gallerySectionImageIds[category].map((id) => {
                  const src = galleryImageSrc(id)
                  const alt = galleryImageAlt(id)

                  return (
                    <figure key={id} className="gallery-centered-item">
                      <a
                        href={src}
                        data-gallery-trigger
                        data-gallery-src={src}
                        data-gallery-alt={alt}
                        className="group relative block aspect-[4/5] w-full overflow-hidden rounded-xl border border-black/10 bg-white/40 shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:z-20 hover:shadow-xl dark:border-white/15 dark:bg-white/5"
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
                    </figure>
                  )
                })}
              </div>
            </div>
          ))}

          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <a
              href="https://instagram.com/diaramanicure"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-gradient-border inline-flex h-16 items-center gap-2 rounded-2xl px-10 text-xl font-normal shadow-sm md:h-20 md:px-12"
            >
              <InstagramIcon className="size-7" />
              {t.gallery.instagramCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
