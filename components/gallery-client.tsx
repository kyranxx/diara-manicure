"use client"

import { useCallback, useEffect, useState } from "react"
import { Gallery } from "@/components/sections/Gallery"
import { Lightbox } from "@/components/sections/Lightbox"

const makeImage = (id: string) => ({
  src: `/gelove-nechty-trnava-gallery-${id}.${id === "5" ? "jpg" : "jpeg"}`,
  alt: `Gélové nechty Trnava - ukážka práce ${id}`,
})

const gallerySections = [
  {
    title: "Francúzska manikúra",
    images: ["9", "12", "17", "21", "24", "25", "34", "40", "41", "44"].map(makeImage),
  },
  {
    title: "Jednofarebné",
    images: [
      "01",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "10",
      "11",
      "13",
      "14",
      "15",
      "16",
      "19",
      "20",
      "23",
      "26",
      "27",
      "28",
      "29",
      "30",
      "32",
      "33",
      "37",
      "39",
      "42",
    ].map(makeImage),
  },
  {
    title: "Jemné zdobenie",
    images: ["7", "8", "18", "22", "31", "35", "36", "38", "43", "45"].map(makeImage),
  },
]

const galleryImages = gallerySections.flatMap((section) => section.images)

export function GalleryClient() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

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
  }, [])

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
    setIsZoomed(false)
  }, [])

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
