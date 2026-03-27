"use client"

import { Button } from "@/components/ui/button"
import { ThemeAwareLogo } from "@/components/theme-aware-logo"
import Image from "next/image"
import { Phone, MessageCircle } from "lucide-react"

interface HeroProps {
    bookingUrl: string
    scrollToVisit: () => void
}

export function Hero({ bookingUrl, scrollToVisit }: HeroProps) {
    return (
        <section className="relative min-h-[auto] md:min-h-[90vh] flex flex-col justify-start pt-20 md:pt-20 pb-12 md:pb-0 items-center text-center px-6 overflow-hidden bg-beige dark:bg-black">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-40 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-bl from-primary/5 to-transparent blur-3xl" />
            </div>

            <div className="mb-8 relative w-full md:max-w-[660px] mx-auto">
                <ThemeAwareLogo
                    alt="Diara Manicure - Nechty Trnava - Veľká noc 2026"
                    width={1536}
                    height={600}
                    className="w-full h-auto"
                    priority
                    sizes="(max-width: 768px) 100vw, 660px"
                />
            </div>

            <div className="max-w-2xl mx-auto relative">
                {/* Price tag hidden for now */}
                {/*
            <div className="absolute -top-10 -right-2 md:-right-8 rotate-12 bg-white dark:bg-zinc-900 text-primary border border-primary/20 px-5 py-3 rounded-full shadow-xl z-10 animate-in fade-in zoom-in duration-500 delay-300 flex items-baseline gap-1 hover:scale-110 transition-transform cursor-default">
              <span className="font-serif italic text-base text-muted-foreground">od</span>
              <span className="text-2xl font-bold">25€</span>
            </div>
            */}
                <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6 leading-tight">
                    Gélové nechty Trnava | <span className="text-primary">diara manicure.</span>
                </h1>
                <h2 className="text-xl md:text-2xl font-light text-muted-foreground mb-10">
                    Profesionálne nechtové štúdio • nails & manikúra
                    <br className="my-2" />
                    <span className="italic font-serif text-primary/80">Kvalitné európske gély. Parkovanie zdarma.</span>
                </h2>
            </div>

            <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
                <div className="flex flex-col justify-center gap-4 w-full">
                    <Button
                        asChild
                        className="h-auto py-2 text-xl md:text-2xl rounded-full px-12 md:px-16 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 w-full flex flex-col items-center gap-2"
                    >
                        <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                            <span>Pozrieť voľné termíny</span>
                            <div className="bg-beige rounded-full px-4 py-1.5 mt-1">
                                <div className="relative h-4 w-16">
                                    <Image
                                        src="/bookio_logo.png"
                                        alt="Bookio"
                                        fill
                                        className="object-contain"
                                        sizes="64px"
                                    />
                                </div>
                            </div>
                        </a>
                    </Button>

                    {/* Micro-copy below booking button */}
                    <div className="text-base md:text-lg text-foreground/75 italic text-center -mt-2 mb-4 flex flex-col items-center gap-1 dark:text-white/80">
                        <span className="not-italic font-medium text-primary">💳 Platba možná aj kartou</span>
                        <span>Nezáväzná rezervácia</span>
                        <span>Parkovanie a káva zdarma</span>
                    </div>

                    <a
                        href="#darcekove-poukazky"
                        className="w-full py-3 px-6 text-center rounded-full border-2 border-pink-400/50 hover:border-pink-500/80 bg-gradient-to-r from-pink-50 to-red-50 hover:from-pink-100 hover:to-red-100 dark:from-pink-950/30 dark:to-red-950/30 dark:hover:from-pink-900/40 dark:hover:to-red-900/40 transition-all duration-300 group flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:shadow-pink-200/50 dark:hover:shadow-pink-900/30"
                    >
                        <span className="text-lg animate-pulse">💝</span>
                        <span className="font-medium text-foreground bg-gradient-to-r from-pink-600 to-red-500 bg-clip-text text-transparent dark:from-pink-400 dark:to-red-400">Darčekové poukazy</span>
                        <span className="text-lg animate-pulse">✨</span>
                    </a>

                    {/* Phone Reservation - Anti-scam protected */}
                    <div className="flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-primary/10 shadow-sm">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                            <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-foreground/70 font-medium uppercase tracking-wider dark:text-white/75">Rezervácie telefonicky</p>
                            <a
                                href="tel:+421902163144"
                                className="text-lg font-semibold text-foreground hover:text-primary transition-colors tracking-[0.15em]"
                            >
                                <span>+421 902 163 144</span>
                            </a>
                        </div>
                    </div>

                    {/* Facebook Messenger - Contact via chat */}
                    <a
                        href="https://m.me/diaramanicure"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-[#0084FF]/10 hover:bg-[#0084FF]/20 backdrop-blur-sm border border-[#0084FF]/20 shadow-sm transition-all duration-300 hover:scale-[1.02]"
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0084FF]/20">
                            <MessageCircle className="w-5 h-5 text-[#0084FF]" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-black font-semibold uppercase tracking-wider dark:text-white">Napíšte nám správu</p>
                            <span className="text-lg font-semibold text-foreground">Facebook Messenger</span>
                        </div>
                    </a>

                    <Button
                        variant="outline"
                        onClick={scrollToVisit}
                        className="h-14 md:h-16 text-xl rounded-full px-10 md:px-12 border-primary/20 hover:bg-white/50 hover:text-foreground transition-all duration-300 w-full mb-8"
                    >
                        Kde nás nájdete
                    </Button>

                    {/* Quality Message Bubble - Desktop: Upper Left, Mobile: Below buttons */}
                    <div className="relative mt-0 xl:absolute xl:left-8 xl:top-[370px] xl:mt-0 w-80 max-w-full mx-auto p-6 rounded-[2rem] bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/20 shadow-lg text-center hover:scale-105 transition-transform duration-300 hover:shadow-xl z-10">
                        <p className="text-lg font-light leading-relaxed text-black dark:text-white">
                            Našou prioritou sú <span className="italic font-serif text-primary">kvalitné európske gély</span> a precízne odvedená práca.
                            <br className="my-6 block" />
                            Ak hľadáte expresnú službu do 30 minút, <span className="italic font-serif text-primary">náš koncept je iný – my si na kvalite dávame záležať</span>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
