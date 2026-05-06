"use client"

import Image from "next/image"
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react"
import { useI18n } from "@/components/language-provider"

interface GalleryImage {
    src: string
    alt: string
}

interface LightboxProps {
    isOpen: boolean
    onClose: () => void
    images: GalleryImage[]
    currentIndex: number
    onPrevious: () => void
    onNext: () => void
    isZoomed: boolean
    onToggleZoom: () => void
}

export function Lightbox({
    isOpen,
    onClose,
    images,
    currentIndex,
    onPrevious,
    onNext,
    isZoomed,
    onToggleZoom
}: LightboxProps) {
    const { t } = useI18n()

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={t.lightbox.dialogLabel}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-[101] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
                aria-label={t.lightbox.close}
            >
                <X className="w-6 h-6" />
            </button>

            {/* Zoom toggle button */}
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onToggleZoom()
                }}
                className="absolute top-4 right-20 z-[101] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
                aria-label={isZoomed ? t.lightbox.zoomOut : t.lightbox.zoomIn}
            >
                {isZoomed ? <ZoomOut className="w-6 h-6" /> : <ZoomIn className="w-6 h-6" />}
            </button>

            {/* Navigation arrows */}
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onPrevious()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[101] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
                aria-label={t.lightbox.previous}
            >
                <ChevronLeft className="w-8 h-8" />
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onNext()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[101] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
                aria-label={t.lightbox.next}
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
                    onToggleZoom()
                }}
            >
                <Image
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    fill
                    className={`transition-all duration-500 ${isZoomed ? 'object-contain scale-150' : 'object-contain'
                        }`}
                    sizes="100vw"
                    priority
                />
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/40 px-4 py-2 rounded-full">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Image description */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white text-lg font-light">
                {images[currentIndex].alt}
            </div>
        </div>
    )
}
