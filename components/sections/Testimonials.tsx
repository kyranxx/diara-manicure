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
    const mixedTestimonials = testimonials.map((_, index) => testimonials[(index * 3 + 2) % testimonials.length])
    const marqueeTestimonials = [...testimonials, ...testimonials]
    const secondMarqueeTestimonials = [...mixedTestimonials, ...mixedTestimonials]

    const renderCard = (testimonial: Testimonial, index: number, keyPrefix: string) => (
        <div key={`${keyPrefix}-${testimonial.author}-${index}`} className="w-[240px] shrink-0 bg-white/45 dark:bg-card p-4 rounded-[1rem] h-[190px] flex flex-col justify-between shadow-sm backdrop-blur-sm transition-colors duration-300 md:w-[300px]">
            <div>
                {testimonial.rating && (
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-3.5 h-3.5 ${star <= (testimonial.rating ?? 0)
                                        ? 'fill-primary text-primary'
                                        : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                                        }`}
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-1">
                            {testimonial.photo && testimonial.photo.includes('googleusercontent') && (
                                <div className="relative w-3.5 h-3.5 flex-shrink-0" title="Recenzia z Google Maps">
                                    <Image
                                        src="/Google_Favicon_2025.png"
                                        alt="Google"
                                        width={14}
                                        height={14}
                                        className="w-3.5 h-3.5 object-contain"
                                    />
                                </div>
                            )}
                            <span className="text-xs font-medium text-black dark:text-white">
                                {testimonial.rating?.toFixed(1) ?? '0.0'}
                            </span>
                        </div>
                    </div>
                )}
                <p className="review-card-text text-black/80 dark:text-white/80 italic text-xs leading-relaxed mb-3 font-light md:text-sm">
                    &quot;{testimonial.text}&quot;
                </p>
            </div>
            <div className="flex items-center gap-2">
                {testimonial.photo ? (
                    <Image
                        src={testimonial.photo}
                        alt={testimonial.author}
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-7 h-7 rounded-full bg-stone-200 dark:bg-zinc-700 flex items-center justify-center text-black dark:text-white font-serif italic text-xs">
                        {testimonial.author.charAt(0)}
                    </div>
                )}
                <p className="font-medium text-[0.68rem] tracking-wide uppercase text-muted-foreground">{testimonial.author}</p>
            </div>
        </div>
    )

    return (
        <section id="recenzie" className="pt-8 pb-16 overflow-hidden bg-beige dark:bg-black">
            <div className="mx-auto">
                <div className="text-center mb-8 px-6">
                    <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white">Čo hovoria naše klientky</h2>
                    <div className="flex justify-center gap-1 text-primary mb-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                    </div>
                </div>

                <div className="mx-auto w-full overflow-hidden">
                    <div className="review-marquee-track flex w-max gap-3">
                        {marqueeTestimonials.map((testimonial, index) => (
                            renderCard(testimonial, index, "first")
                        ))}
                    </div>
                    <div className="review-marquee-track review-marquee-track-reverse mt-3 flex w-max gap-3">
                        {secondMarqueeTestimonials.map((testimonial, index) => (
                            renderCard(testimonial, index, "second")
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
