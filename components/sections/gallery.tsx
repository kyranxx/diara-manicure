"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"

// Gallery images with their alt text
const galleryImages = [
    { src: "/gelove-nechty-trnava-gallery-1.jpeg", alt: "Gélové nechty Trnava" },
    { src: "/gelove-nechty-trnava-gallery-2.jpeg", alt: "Manikúra ukážka" },
    { src: "/gelove-nechty-trnava-gallery-3.jpeg", alt: "Detailná manikúra" },
    { src: "/gelove-nechty-trnava-gallery-4.jpeg", alt: "Interiér salónu" },
    { src: "/gelove-nechty-trnava-gallery-5.jpeg", alt: "Nail art Trnava" },
    { src: "/gelove-nechty-trnava-gallery-7.jpeg", alt: "Profesionálna manikúra" },
    { src: "/gelove-nechty-trnava-gallery-9.jpeg", alt: "Luxusné nechty" },
    { src: "/gelove-nechty-trnava-gallery-10.jpeg", alt: "Diara Manicure práca" },
]

export function GallerySection() {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isZoomed, setIsZoomed] = useState(false)

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index)
        setLightboxOpen(true)
        setIsZoomed(false)
        document.body.style.overflow = 'hidden'
    }

    const closeLightbox = useCallback(() => {
        setLightboxOpen(false)
        setIsZoomed(false)
        document.body.style.overflow = 'unset'
    }, [])

    const goToPrevious = useCallback(() => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? galleryImages.length - 1 : prev - 1
        )
        setIsZoomed(false)
    }, [])

    const goToNext = useCallback(() => {
        setCurrentImageIndex((prev) =>
            prev === galleryImages.length - 1 ? 0 : prev + 1
        )
        setIsZoomed(false)
    }, [])

    const toggleZoom = () => {
        setIsZoomed((prev) => !prev)
    }

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!lightboxOpen) return

            switch (e.key) {
                case 'Escape':
                    closeLightbox()
                    break
                case 'ArrowLeft':
                    goToPrevious()
                    break
                case 'ArrowRight':
                    goToNext()
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [lightboxOpen, closeLightbox, goToPrevious, goToNext])

    return (
        <>
            <section id="galeria" className="py-24 bg-beige dark:bg-black">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white">Galéria</h2>
                        <div className="w-24 h-1 bg-primary/20 mx-auto mb-6 rounded-full" />
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Ukážky našej práce a priestorov salónu
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                        {/* Large featured image */}
                        <button
                            onClick={() => openLightbox(0)}
                            className="col-span-2 row-span-2 relative aspect-square rounded-[2rem] overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            aria-label={`Otvoriť obrázok: ${galleryImages[0].alt}`}
                        >
                            <Image
                                src={galleryImages[0].src}
                                alt={galleryImages[0].alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <ZoomIn className="w-10 h-10 text-white/90" />
                            </div>
                        </button>

                        {/* Grid images */}
                        {galleryImages.slice(1).map((image, index) => (
                            <button
                                key={image.src}
                                onClick={() => openLightbox(index + 1)}
                                className="relative aspect-square rounded-[2rem] overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                aria-label={`Otvoriť obrázok: ${image.alt}`}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <ZoomIn className="w-8 h-8 text-white/90" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Prehliadač galérie"
                >
                    {/* Close button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 z-[101] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
                        aria-label="Zavrieť"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Zoom toggle button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            toggleZoom()
                        }}
                        className="absolute top-4 right-20 z-[101] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
                        aria-label={isZoomed ? "Oddialiť" : "Priblížiť"}
                    >
                        {isZoomed ? <ZoomOut className="w-6 h-6" /> : <ZoomIn className="w-6 h-6" />}
                    </button>

                    {/* Navigation arrows */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            goToPrevious()
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-[101] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
                        aria-label="Predchádzajúci obrázok"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            goToNext()
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-[101] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
                        aria-label="Nasledujúci obrázok"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Image container */}
                    <div
                        className={`relative transition-all duration-500 ease-out ${isZoomed
                            ? 'w-[95vw] h-[95vh] cursor-zoom-out overflow-auto'
                            : 'w-[90vw] h-[85vh] max-w-5xl cursor-zoom-in'
                            }`}
                        onClick={(e) => {
                            e.stopPropagation()
                            toggleZoom()
                        }}
                    >
                        <Image
                            src={galleryImages[currentImageIndex].src}
                            alt={galleryImages[currentImageIndex].alt}
                            fill
                            className={`transition-all duration-500 ${isZoomed ? 'object-contain scale-150' : 'object-contain'
                                }`}
                            sizes="100vw"
                            priority
                        />
                    </div>

                    {/* Image counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/40 px-4 py-2 rounded-full">
                        {currentImageIndex + 1} / {galleryImages.length}
                    </div>

                    {/* Image description */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white text-lg font-light">
                        {galleryImages[currentImageIndex].alt}
                    </div>
                </div>
            )}
        </>
    )
}
