"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function GiftCards() {
    return (
        <section id="darcekove-poukazky" className="content-auto-section py-24 bg-gradient-to-br from-primary/5 via-white to-primary/10 dark:from-primary/10 dark:via-black dark:to-primary/5 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-10 left-10 text-4xl opacity-20 animate-bounce text-pink-300" style={{ animationDuration: '3s' }}>✦</div>
                <div className="absolute top-20 right-20 text-3xl opacity-20 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>✨</div>
                <div className="absolute bottom-20 left-1/4 text-5xl opacity-15 animate-bounce text-pink-300" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>✦</div>
                <div className="absolute top-1/3 right-10 text-2xl opacity-20 animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.3s' }}>★</div>
                <div className="absolute bottom-10 right-1/3 text-3xl opacity-15 animate-bounce text-pink-300" style={{ animationDuration: '2.8s', animationDelay: '0.7s' }}>✦</div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Content Column */}
                        <div className="text-center md:text-left order-2 md:order-1">
                            <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <span className="text-pink-700 dark:text-pink-300" aria-hidden="true">✦</span>
                                <span>Darčekový poukaz • Ideálny darček</span>
                                <span className="text-pink-700 dark:text-pink-300" aria-hidden="true">✦</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight text-black dark:text-white">
                                Darčekové poukazy
                            </h2>
                            <div className="w-24 h-1 bg-primary/30 mx-auto md:mx-0 mb-6 rounded-full" />
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-light">
                                Hľadáte <span className="text-primary font-medium">praktický darček</span> pre vašich blízkych? Potešte mamu, sestru, priateľku či kolegyňu darčekovým poukazom na profesionálnu manikúru!
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-light">
                                Poukaz si môžete objednať online a doručiť ho ako elegantný darček pre každú ženu, ktorá si potrpí na pekné a upravené nechty.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Button
                                    asChild
                                    className="h-14 md:h-16 text-lg md:text-xl rounded-full px-8 md:px-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <a href="https://services.bookio.com/diaramanicure/gift-cards#/" target="_blank" rel="noopener noreferrer">
                                        <span className="mr-2">💅</span>
                                        Kúpiť poukaz online
                                    </a>
                                </Button>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-700 dark:text-green-400" aria-hidden="true">✓</span>
                                    <span>Okamžité doručenie emailom</span>
                                </div>
                            </div>
                        </div>

                        {/* Image Column */}
                        <div className="relative order-1 md:order-2">
                            <div className="relative aspect-square max-w-md mx-auto">
                                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-white to-primary/10 dark:from-primary/30 dark:via-black dark:to-primary/20 rounded-[2.5rem] -z-10" />
                                <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10 flex items-center justify-center">
                                        <Image
                                            src="/gift-card.jpg"
                                            alt="Darčekový poukaz Diara Manicure"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>
                                <div className="absolute -top-2 -right-2 bg-pink-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform rotate-12">
                                    Online poukaz
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
