"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Gallery } from "@/components/sections/Gallery"
import { Lightbox } from "@/components/sections/Lightbox"
import { useI18n } from "@/components/language-provider"

export function GalleryClient() {
  const { t } = useI18n()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const gallerySections = useMemo(() => {
    const makeImage = (id: string) => ({
      src: `/gelove-nechty-trnava-gallery-${id}.${id === "5" ? "jpg" : "jpeg"}`,
      alt: `${t.gallery.imageAltPrefix} ${id}`,
    })

    return [
      {
        title: t.gallery.categories.french,
        images: ["49", "47", "44", "41", "40", "34", "25", "24", "21", "17", "12", "9"].map(makeImage),
      },
      {
        title: t.gallery.categories.singleColor,
        images: [
          "50",
          "46",
          "42",
          "39",
          "37",
          "33",
          "32",
          "30",
          "29",
          "28",
          "27",
          "26",
          "23",
          "20",
          "19",
          "16",
          "15",
          "14",
          "13",
          "11",
          "10",
          "6",
          "5",
          "4",
          "3",
          "2",
          "1",
        ].map(makeImage),
      },
      {
        title: t.gallery.categories.delicateArt,
        images: ["48", "45", "43", "38", "36", "35", "31", "22", "18", "8", "7"].map(makeImage),
      },
    ]
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
