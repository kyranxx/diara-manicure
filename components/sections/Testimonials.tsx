"use client"

import Image from "next/image"
import { Star } from "lucide-react"

interface Testimonial {
    text: string
    author: string
    photo?: string | null
    rating?: number
}

interface TestimonialsProps {
    testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
    return (
        <section id="recenzie" className="content-auto-section pt-12 pb-24 overflow-hidden bg-white dark:bg-black">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white">Čo hovoria naše klientky</h2>
                    <div className="flex justify-center gap-1 text-primary mb-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-beige dark:bg-card p-6 rounded-[1.5rem] h-full flex flex-col justify-between hover:bg-beige dark:hover:bg-card/80 transition-colors duration-300">
                            <div>
                                {testimonial.rating && (
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-4 h-4 ${star <= (testimonial.rating ?? 0)
                                                        ? 'fill-primary text-primary'
                                                        : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {testimonial.photo && testimonial.photo.includes('googleusercontent') && (
                                                <div className="relative w-4 h-4 flex-shrink-0" title="Recenzia z Google Maps">
                                                    <Image
                                                        src="/Google_Favicon_2025.png"
                                                        alt="Google"
                                                        width={16}
                                                        height={16}
                                                        className="w-4 h-4 object-contain"
                                                    />
                                                </div>
                                            )}
                                            <span className="text-sm font-medium text-black dark:text-white">
                                                {testimonial.rating?.toFixed(1) ?? '0.0'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <p className="text-black/80 dark:text-white/80 italic text-base leading-relaxed mb-4 font-light">
                                    &quot;{testimonial.text}&quot;
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                {testimonial.photo ? (
                                    <Image
                                        src={testimonial.photo}
                                        alt={testimonial.author}
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-zinc-700 flex items-center justify-center text-black dark:text-white font-serif italic text-sm">
                                        {testimonial.author.charAt(0)}
                                    </div>
                                )}
                                <p className="font-medium text-xs tracking-wide uppercase text-muted-foreground">{testimonial.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
