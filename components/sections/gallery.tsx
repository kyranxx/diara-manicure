"use client"

import Image from "next/image"

export function GallerySection() {
    return (
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
                    <div className="col-span-2 row-span-2 relative aspect-square rounded-[2rem] overflow-hidden group">
                        <Image
                            src="/gallery/IMG_5744.jpeg"
                            alt="Detailná manikúra"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Grid images */}
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden group">
                        <Image
                            src="/gallery/IMG_5745.jpeg"
                            alt="Interiér salónu"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="relative aspect-square rounded-[2rem] overflow-hidden group">
                        <Image
                            src="/gallery/IMG_5746.jpeg"
                            alt="Manikúra ukážka"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="relative aspect-square rounded-[2rem] overflow-hidden group">
                        <Image
                            src="/gallery/IMG_5747.jpeg"
                            alt="Detail nechtov"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="relative aspect-square rounded-[2rem] overflow-hidden group">
                        <Image
                            src="/gallery/IMG_5748.jpeg"
                            alt="Salón Diara"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>
            </div>
        </section>
    )
}
