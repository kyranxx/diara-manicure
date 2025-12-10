"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Phone } from "lucide-react"



export function HeroSection() {
    const { resolvedTheme } = useTheme()
    const logoSrc = resolvedTheme === "dark" ? "/diara-manicure-logo-black-trnava-v2.png" : "/diara-manicure-logo-trnava.png"

    // Link to Bookio
    const bookingUrl = 'https://services.bookio.com/diaramanicure/widget?lang=sk'

    const scrollToVisit = () => {
        document.getElementById("visit")?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <>
            {/* Preload dark logo for instant switching */}
            <Image
                src="/diara-manicure-logo-black-trnava-v2.png"
                alt=""
                width={1536}
                height={600}
                className="hidden"
                priority
            />

            {/* Hero Section - Beige Background */}
            <section className="relative min-h-[auto] md:min-h-[90vh] flex flex-col justify-start pt-20 md:pt-20 pb-12 md:pb-0 items-center text-center px-6 overflow-hidden bg-beige dark:bg-black">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-40 pointer-events-none">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
                    <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-bl from-primary/5 to-transparent blur-3xl" />
                </div>

                <div className="mb-8 relative w-full md:max-w-[660px] mx-auto">
                    <Image
                        src={logoSrc}
                        alt="Diara Manicure - Nechty Trnava"
                        width={1536}
                        height={600}
                        className="w-full h-auto"
                        priority
                        fetchPriority="high"
                        sizes="(max-width: 768px) 100vw, 660px"
                    />
                </div>

                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-10 leading-tight">
                        Exkluzívna starostlivosť <br />
                        <span className="italic font-serif text-primary/80">o vaše ruky</span>
                    </h1>
                </div>

                <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
                    <div className="flex flex-col justify-center gap-4 w-full">
                        <Button
                            asChild
                            className="h-auto py-4 text-xl md:text-2xl rounded-full px-12 md:px-16 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 w-full flex flex-col items-center gap-2"
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
                                        />
                                    </div>
                                </div>
                            </a>
                        </Button>

                        {/* Phone Reservation - Anti-scam protected */}
                        <div className="flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-primary/10 shadow-sm">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                                <Phone className="w-5 h-5 text-primary" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Rezervácie telefonicky</p>
                                <a
                                    href="tel:+421902163144"
                                    className="text-lg font-semibold text-foreground hover:text-primary transition-colors tracking-[0.15em]"
                                    aria-label="Zavolať na rezerváciu"
                                >
                                    {/* Anti-scraping: using special spacing */}
                                    <span aria-hidden="true">+421{'\u2009'}902{'\u2009'}163{'\u2009'}144</span>
                                    <span className="sr-only">+421 902 163 144</span>
                                </a>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            onClick={scrollToVisit}
                            className="h-14 md:h-16 text-xl rounded-full px-10 md:px-12 border-primary/20 hover:bg-white/50 hover:text-foreground transition-all duration-300 w-full mb-8"
                        >
                            Kde nás nájdete
                        </Button>

                        {/* Floating Bubble - Desktop: Upper Left, Mobile: Above Arrow */}
                        <div className="relative mt-0 xl:absolute xl:left-8 xl:top-0 xl:mt-0 w-80 max-w-full mx-auto p-6 rounded-[2rem] bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/20 shadow-lg text-center hover:scale-105 transition-transform duration-300 hover:shadow-xl z-10">
                            <p className="text-lg font-light leading-relaxed text-black dark:text-white">
                                Našou prioritou sú <span className="italic font-serif text-primary">kvalitné európske gély</span> a precízne odvedená práca.
                                <br className="my-6 block" />
                                Ak hľadáte expresnú službu do 30 minút, <span className="italic font-serif text-primary">náš koncept je iný – my si na kvalite dávame záležať</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
