import type { TranslationMessages } from "@/lib/i18n"

export function GalleryShell({ t }: { t: TranslationMessages }) {
  return (
    <section
      id="galeria"
      data-gallery-root
      data-heading={t.gallery.heading}
      data-french={t.gallery.categories.french}
      data-single-color={t.gallery.categories.singleColor}
      data-delicate-art={t.gallery.categories.delicateArt}
      data-alt-prefix={t.gallery.imageAltPrefix}
      data-open-label={t.gallery.openImageAria}
      data-instagram={t.gallery.instagramCta}
      className="relative overflow-hidden bg-beige pt-10 pb-16 dark:bg-black"
    >
      <div className="container mx-auto px-6">
        <div className="mb-0 text-center">
          <h2 className="mb-4 text-5xl font-light tracking-tight text-black md:text-7xl dark:text-white">
            {t.gallery.heading}
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-primary/20" />
        </div>
        <div data-gallery-content />
      </div>
    </section>
  )
}
