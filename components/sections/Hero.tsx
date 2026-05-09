import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeAwareLogo } from "@/components/theme-aware-logo"
import { Phone, MessageCircle } from "lucide-react"
import type { TranslationMessages } from "@/lib/i18n"

interface HeroProps {
    bookingUrl: string
    t: TranslationMessages
}

export function Hero({ bookingUrl, t }: HeroProps) {
    return (
        <section className="relative min-h-[auto] md:min-h-[90vh] xl:min-h-[860px] flex flex-col justify-start pt-20 md:pt-20 pb-10 items-center text-center px-6 overflow-hidden bg-beige dark:bg-[#050403]">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-40 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] size-[50%] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
                <div className="absolute top-[40%] -right-[10%] size-[40%] rounded-full bg-gradient-to-bl from-primary/5 to-transparent blur-3xl" />
            </div>

            <div className="mb-8 relative w-full max-w-[260px] md:max-w-[780px] mx-auto">
                <ThemeAwareLogo
                    alt={t.hero.logoAlt}
                    width={1536}
                    height={600}
                    className="w-full h-auto"
                    priority
                    sizes="(max-width: 768px) 260px, 780px"
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
                    {t.hero.titlePrefix} <span className="text-primary">{t.hero.titleBrand}</span>
                </h1>
                <div className="mb-10 space-y-2 text-xl font-light text-muted-foreground md:text-2xl">
                    <p>{t.hero.subtitleMain}</p>
                    <p className="font-serif italic text-primary/80">{t.hero.subtitleHighlight}</p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
                <div className="flex flex-col justify-center gap-4 w-full">
                    <Button
                        asChild
                        className="h-auto py-2 text-xl md:text-2xl rounded-full px-12 md:px-16 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 w-full flex flex-col items-center gap-2"
                    >
                        <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                            <span>{t.hero.bookingCta}</span>
                                <div className="bg-beige rounded-full px-4 py-1.5 mt-1">
                                    <div className="relative h-4 w-16">
                                        <Image
                                            src="/bookio_logo-128.webp"
                                            alt="Bookio"
                                            width={128}
                                            height={28}
                                            loading="lazy"
                                            decoding="async"
                                            className="size-full object-contain"
                                        />
                                    </div>
                                </div>
                            </a>
                    </Button>

                    {/* Micro-copy below booking button */}
                    <div className="text-base md:text-lg text-foreground/75 italic text-center -mt-2 mb-4 flex flex-col items-center gap-1 dark:text-white/80">
                        <span className="not-italic font-medium text-primary">{t.hero.cardPayment}</span>
                        <span>{t.hero.softReservation}</span>
                        <span>{t.hero.parkingCoffee}</span>
                    </div>

                    <a
                        href="#darcekove-poukazky"
                        className="w-full py-3 px-6 text-center rounded-full border-2 border-pink-400/50 hover:border-pink-500/80 bg-gradient-to-r from-pink-50 to-red-50 hover:from-pink-100 hover:to-red-100 dark:from-pink-950/30 dark:to-red-950/30 dark:hover:from-pink-900/40 dark:hover:to-red-900/40 transition-all duration-300 group flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:shadow-pink-200/50 dark:hover:shadow-pink-900/30"
                    >
                        <span className="text-lg animate-pulse">💝</span>
                        <span className="font-medium text-pink-700 dark:text-pink-300">{t.hero.giftCardsCta}</span>
                        <span className="text-lg animate-pulse">✨</span>
                    </a>

                    {/* Phone Reservation - Anti-scam protected */}
                    <div className="flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-primary/10 shadow-sm">
                        <div className="flex items-center justify-center size-10 rounded-full bg-primary/10">
                            <Phone className="size-5 text-primary" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-foreground/70 font-medium uppercase tracking-wider dark:text-white/75">{t.hero.phoneLabel}</p>
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
                        <div className="flex items-center justify-center size-10 rounded-full bg-[#0084FF]/20">
                            <MessageCircle className="size-5 text-[#0084FF]" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-black font-semibold uppercase tracking-wider dark:text-white">{t.hero.messengerLabel}</p>
                            <span className="text-lg font-semibold text-foreground">Facebook Messenger</span>
                        </div>
                    </a>

                    <Button
                        variant="outline"
                        asChild
                        className="h-14 md:h-16 text-xl rounded-full px-10 md:px-12 border-primary/20 hover:bg-white/50 hover:text-foreground transition-all duration-300 w-full mb-8"
                    >
                        <a href="#visit">{t.hero.visitCta}</a>
                    </Button>

                    {/* Quality Message Bubble - Desktop: Upper Left, Mobile: Below buttons */}
                    <div className="relative mt-0 flex w-full max-w-[420px] flex-col items-center gap-4 mx-auto xl:absolute xl:left-20 xl:top-[620px] xl:mt-0 xl:block xl:h-[430px]">
                        <div className="relative z-10 h-80 w-60 overflow-hidden rounded-[2rem] border-4 border-white/60 shadow-xl xl:absolute xl:left-0 xl:top-0">
                            <Image
                                src="/andrea-480.webp"
                                alt={t.hero.founderImageAlt}
                                fill
                                decoding="async"
                                className="object-cover object-top sepia-[.15]"
                                sizes="(max-width: 1279px) 232px, 240px"
                            />
                        </div>
                        <div className="relative z-20 w-full p-5 rounded-[2rem] bg-white/55 dark:bg-black/55 backdrop-blur-md border border-white/30 shadow-lg text-center hover:scale-105 transition-transform duration-300 hover:shadow-xl md:w-[min(20rem,80%)] md:p-6 xl:absolute xl:left-[7.5rem] xl:top-[18.25rem] xl:-translate-x-1/2">
                            <p className="text-base md:text-lg font-light leading-relaxed text-black dark:text-white">
                                {t.hero.qualityStart} <span className="italic font-serif text-primary">{t.hero.qualityHighlight}</span> {t.hero.qualityEnd}
                                <br className="my-5 block" />
                                {t.hero.conceptStart} <span className="italic font-serif text-primary">{t.hero.conceptHighlight}</span>.
                            </p>
                            <p className="signature-font mt-3 text-right text-3xl leading-none text-black/75 dark:text-white/80">
                                {t.hero.founderName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
