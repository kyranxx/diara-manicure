import Image from "next/image"

type GallerySeoImage = {
  id: string
  src: string
  alt: string
  caption: string
}

export function GallerySeoGrid({ images }: { images: GallerySeoImage[] }) {
  return (
    <div className="gallery-centered-grid">
      {images.map((image) => (
        <figure key={image.id} className="gallery-centered-item">
          <a
            href={image.src}
            className="group relative block aspect-[4/5] w-full overflow-hidden rounded-xl border border-black/10 bg-white/40 shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:z-20 hover:shadow-xl dark:border-white/15 dark:bg-white/5"
            aria-label={image.alt}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </a>
          <figcaption className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
            {image.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
