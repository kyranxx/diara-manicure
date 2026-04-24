"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Instagram, ZoomIn } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
}

interface GallerySection {
  title: string
  images: GalleryImage[]
}

interface GalleryProps {
  gallerySections: GallerySection[]
  openLightbox: (src: string) => void
}

export function Gallery({ gallerySections, openLightbox }: GalleryProps) {
  const subtleTilt = [-2.2, -1.2, -0.4, 0.4, 1.2, 2.2]
  const subtleLift = [-2, 1, -1, 2, 0, -1]

  return (
    <section
      id="galeria"
      className="relative overflow-hidden bg-beige pt-10 pb-16 dark:bg-black"
    >
      <div className="pointer-events-none absolute left-[-10rem] top-10 h-80 w-80 rounded-full bg-black/5 blur-3xl dark:bg-white/10" />
      <div className="pointer-events-none absolute right-[-8rem] bottom-8 h-72 w-72 rounded-full bg-[#bca48a]/25 blur-3xl dark:bg-[#8e6e4e]/20" />

      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-5xl font-light tracking-tight text-black md:text-7xl dark:text-white">
            Nechty našich klientiek
          </h2>
          <div className="mx-auto mb-5 h-1 w-24 rounded-full bg-primary/20" />
        </div>

        <div className="mx-auto max-w-6xl space-y-12">
          {gallerySections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-6 text-center text-3xl font-light tracking-tight text-black md:text-4xl dark:text-white">
                {section.title}
              </h3>
              <div className="gallery-centered-grid">
                {section.images.map((image, index) => {
                  const tilt = subtleTilt[index % subtleTilt.length]
                  const lift = subtleLift[index % subtleLift.length]

                  return (
                    <div key={image.src} className="gallery-centered-item">
                      <button
                        onClick={() => openLightbox(image.src)}
                        className="group relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-black/10 bg-white/40 shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:z-20 hover:shadow-xl dark:border-white/15 dark:bg-white/5"
                        style={{
                          transform: `translateY(${lift}px) rotate(${tilt}deg)`,
                        }}
                        aria-label={`Otvoriť obrázok: ${image.alt}`}
                      >
                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/25 via-transparent to-black/10 transition-colors group-hover:from-black/40" />
                        <div className="absolute inset-0 z-20 flex items-center justify-center">
                          <ZoomIn className="h-5 w-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:h-6 md:w-6" />
                        </div>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 31vw, (max-width: 1024px) 16vw, 12vw"
                        />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <Button
            variant="outline"
            className="h-16 rounded-2xl px-10 text-xl font-normal md:h-20 md:px-12"
            asChild
          >
            <a
              href="https://instagram.com/diaramanicure"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <span className="inline-flex h-7 w-8 items-center justify-center rounded-md bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fdf497_18%,#fd5949_45%,#d6249f_68%,#285AEB_100%)] shadow-sm">
                <Instagram className="h-4 w-4 text-white" />
              </span>
              Sledujte nás na Instagrame
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
