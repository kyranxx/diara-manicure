"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { useState, useEffect } from "react"

interface Testimonial {
    text: string
    author: string
    photo?: string | null
    rating?: number
}

export function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([
        {
            text: "Nechty vyzerajú super a hlavne vydržia bez jedinej chyby celé 3 týždne. Precízna práca, chválim detailnú úpravu.",
            author: "Mária Konečná",
            photo: null,
            rating: 5
        },
        {
            text: "Manikúra za dobrú cenu, Andrea je šikovná. Nechty robí krásne tenké a prirodzené, žiadne hrubé vrstvy. Určite sa vrátim.",
            author: "Janka Poláková",
            photo: null,
            rating: 5
        },
        {
            text: "Maximálna spokojnosť. Mamikérka je ústretová, poradila mi s tvarom a vždy sa snaží urobiť presne to, čo chcem. Nechty mi vydržia dlho lesklé.",
            author: "Lucia Miklošová",
            photo: null,
            rating: 5
        },
        {
            text: "Dobré rozhodnutie prísť sem. Gélové nechty som mala krásne, žiadne odchlipy a vydržali mi perfektne v kuse až do ďalšej dorábky.",
            author: "Petra Sýkorová",
            photo: null,
            rating: 5
        },
        {
            text: "Veľmi pekná a detailná práca s kožtičkou. Naozaj som spokojná s nechtami. Sú na pohľad prirodzené, ale zároveň veľmi pevné a vydržia.",
            author: "Katka Remišová",
            photo: null,
            rating: 5
        },
        {
            text: "Som veľmi spokojná, nechty mi vydržali celé týždne do ďalšieho termínu bez zlomenia. Vidno, že pani manikérka používa kvalitný materiál, ktorý neničí nechty.",
            author: "Peťa Sedláková",
            photo: null,
            rating: 5
        }
    ])

    useEffect(() => {
        const fetchGoogleReviews = () => {
            if (!window.google || !window.google.maps || !window.google.maps.places) return;

            const mapDiv = document.createElement('div');
            const service = new window.google.maps.places.PlacesService(mapDiv);

            const request = {
                query: 'Diara Manicure Trnava',
                fields: ['name', 'place_id'],
            };

            service.findPlaceFromQuery(request, (results: any, status: any) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
                    const placeId = results[0].place_id;
                    if (!placeId) return;

                    service.getDetails({
                        placeId: placeId,
                        fields: ['reviews']
                    }, (place: any, detailStatus: any) => {
                        if (detailStatus === window.google.maps.places.PlacesServiceStatus.OK && place && place.reviews) {
                            const googleReviews: Testimonial[] = place.reviews
                                .filter((review: any) => review.rating && review.rating >= 4)
                                .slice(0, 5)
                                .map((review: any) => ({
                                    text: review.text || '',
                                    author: review.author_name,
                                    photo: review.authorAttribution?.photoURI || review.profile_photo_url || null,
                                    rating: review.rating
                                }));

                            setTestimonials(prev => {
                                // Avoid duplicates based on author name
                                const newReviews = googleReviews.filter(gr => !prev.some(pr => pr.author === gr.author));
                                return [...newReviews, ...prev];
                            });
                        }
                    });
                }
            });
        };

        if ((window as any).google && (window as any).google.maps) {
            fetchGoogleReviews();
        } else {
            const interval = setInterval(() => {
                if ((window as any).google && (window as any).google.maps) {
                    fetchGoogleReviews();
                    clearInterval(interval);
                }
            }, 100);
            return () => clearInterval(interval);
        }
    }, []);

    return (
        <section id="recenzie" className="pt-12 pb-24 overflow-hidden bg-white dark:bg-black">
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
                    {testimonials.map((testimonial: Testimonial, index) => (
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
                                        <span className="text-sm font-medium text-black dark:text-white">
                                            {testimonial.rating?.toFixed(1) ?? '0.0'}
                                        </span>
                                        {testimonial.photo && testimonial.photo.includes('googleusercontent') && (
                                            <div className="ml-1 flex-shrink-0" title="Recenzia z Google Maps">
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <p className="text-black/80 dark:text-white/80 italic text-base leading-relaxed mb-4 font-light">
                                    "{testimonial.text}"
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
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif italic text-sm">
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
