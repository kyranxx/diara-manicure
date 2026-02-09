"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Instagram, ZoomIn } from "lucide-react"

interface GalleryImage {
    src: string
    alt: string
}

interface GalleryProps {
    galleryImages: GalleryImage[]
    openLightbox: (index: number) => void
}

export function Gallery({ galleryImages, openLightbox }: GalleryProps) {
    return (
        <section id="galeria" className="pt-12 pb-24 bg-white dark:bg-black overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white">Nechty našich klientiek</h2>
                    <div className="w-24 h-1 bg-primary/20 mx-auto mb-6 rounded-full" />
                </div>

                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-5xl mx-auto">
                    {galleryImages.map((image, index) => (
                        <button
                            key={image.src}
                            onClick={() => openLightbox(index)}
                            className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            aria-label={`Otvoriť obrázok: ${image.alt}`}
                        >
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors z-10 flex items-center justify-center">
                                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="(max-width: 768px) 33vw, 16vw"
                            />
                        </button>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button
                        variant="outline"
                        className="rounded-full h-16 md:h-20 px-10 md:px-12 text-xl font-normal"
                        asChild
                    >
                        <a
                            href="https://instagram.com/diaramanicure"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                        >
                            <Instagram className="w-6 h-6" />
                            Sledujte nás na Instagrame
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    )
}
