"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useI18n } from "@/components/language-provider"
import { galleryImageAlt, galleryImageSrc, gallerySectionImageIds, type GalleryCategory } from "@/lib/gallery"

const Gallery = dynamic(() => import("@/components/sections/Gallery").then((mod) => mod.Gallery), {
  ssr: false,
})

const Lightbox = dynamic(() => import("@/components/sections/Lightbox").then((mod) => mod.Lightbox), {
  ssr: false,
})

export function GalleryClient() {
  const { t } = useI18n()
  const [shouldRenderGallery, setShouldRenderGallery] = useState(false)
  const galleryShellRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (shouldRenderGallery) return
    const node = galleryShellRef.current
    if (!node) return

    if (!("IntersectionObserver" in window)) {
      setShouldRenderGallery(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRenderGallery(true)
          observer.disconnect()
        }
      },
      { rootMargin: "1200px 0px" }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [shouldRenderGallery])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const gallerySections = useMemo(() => {
    const makeImage = (id: string) => ({
      src: galleryImageSrc(id),
      alt: galleryImageAlt(id),
    })

    const sections: Array<{ category: GalleryCategory; title: string }> = [
      { category: "french", title: t.gallery.categories.french },
      { category: "singleColor", title: t.gallery.categories.singleColor },
      { category: "delicateArt", title: t.gallery.categories.delicateArt },
    ]

    return sections.map((section) => ({
      title: section.title,
      images: gallerySectionImageIds[section.category].map(makeImage),
    }))
  }, [t])

  const galleryImages = useMemo(
    () => gallerySections.flatMap((section) => section.images),
    [gallerySections]
  )

  const openLightbox = (src: string) => {
    const index = galleryImages.findIndex((image) => image.src === src)

    if (index === -1) return

    setCurrentImageIndex(index)
    setLightboxOpen(true)
    setIsZoomed(false)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    setIsZoomed(false)
    document.body.style.overflow = "unset"
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
    setIsZoomed(false)
  }, [galleryImages.length])

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
    setIsZoomed(false)
  }, [galleryImages.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext])

  if (!shouldRenderGallery) {
    return (
      <section
        id="galeria"
        ref={galleryShellRef}
        className="relative overflow-hidden bg-beige pt-10 pb-16 dark:bg-black"
      >
        <div className="container mx-auto px-6">
          <div className="mb-0 text-center">
            <h2 className="mb-4 text-5xl font-light tracking-tight text-black md:text-7xl dark:text-white">
              {t.gallery.heading}
            </h2>
            <div className="mx-auto h-1 w-24 rounded-full bg-primary/20" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <Gallery
        gallerySections={gallerySections}
        openLightbox={openLightbox}
      />
      <Lightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={galleryImages}
        currentIndex={currentImageIndex}
        onPrevious={goToPrevious}
        onNext={goToNext}
        isZoomed={isZoomed}
        onToggleZoom={() => setIsZoomed((prev) => !prev)}
      />
    </>
  )
}
