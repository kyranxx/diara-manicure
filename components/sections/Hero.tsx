import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeAwareLogo } from "@/components/theme-aware-logo"
import { MessengerIcon, WhatsAppIcon } from "@/components/social-icons"
import { MapPin, Phone } from "lucide-react"
import type { TranslationMessages } from "@/lib/i18n"
import { siteConfig } from "@/lib/site-config"

/* eslint-disable @next/next/no-img-element */

interface HeroProps {
    bookingUrl: string
    t: TranslationMessages
}

function InfoLine({ text, className = "" }: { text: string; className?: string }) {
    const [icon, ...words] = text.split(" ")

    return (
        <span className={`inline-flex items-center justify-center gap-2 leading-snug ${className}`}>
            <span className="inline-flex h-6 w-6 items-center justify-center leading-none">{icon}</span>
            <span>{words.join(" ")}</span>
        </span>
    )
}

function SlovakFlagIcon() {
    return (
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Slovakia.svg"
            alt="Slovenská vlajka"
            className="h-5 w-7 rounded-[3px] object-cover shadow-sm"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
        />
    )
}

export function Hero({ bookingUrl, t }: HeroProps) {
    return (
        <section className="relative min-h-[auto] md:min-h-[90vh] xl:min-h-[860px] flex flex-col justify-start pt-20 md:pt-20 pb-10 items-center text-center px-6 overflow-hidden bg-beige dark:bg-[#050403]">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-40 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] size-[50%] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
                <div className="absolute top-[40%] -right-[10%] size-[40%] rounded-full bg-gradient-to-bl from-primary/5 to-transparent blur-3xl" />
            </div>

            <div className="relative mx-auto mt-12 mb-24 w-[98vw] max-w-[470px] sm:max-w-[540px] md:mt-4 md:mb-12 md:max-w-[780px]">
                <ThemeAwareLogo
                    alt={t.hero.logoAlt}
                    width={1536}
                    height={600}
                    className="w-full h-auto"
                    priority
                    sizes="(max-width: 640px) 470px, (max-width: 768px) 540px, 780px"
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
                    {t.hero.titlePrefix}
                    {t.hero.titleBrand ? <> <span className="text-primary">{t.hero.titleBrand}</span></> : null}
                </h1>
                <div className="mb-10 space-y-2 text-base font-light text-muted-foreground md:text-lg">
                    {t.hero.subtitleMain ? <p>{t.hero.subtitleMain}</p> : null}
                    <p className="flex items-center justify-center gap-2 font-serif italic text-primary/80">
                        <SlovakFlagIcon />
                        {t.hero.subtitleHighlight}
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
                <div className="flex flex-col justify-center gap-4 w-full">
                    <div className="relative pt-3">
                        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -rotate-2 whitespace-nowrap rounded-full border border-white/70 bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md">
                            {t.hero.newClientsBadge}
                        </div>
                        <Button
                            asChild
                            className="h-auto py-3 text-xl md:py-4 md:text-3xl rounded-full px-12 md:px-20 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 w-full flex flex-col items-center gap-2"
                        >
                            <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                                <span>{t.hero.bookingCta}</span>
                                    <div className="bg-beige rounded-full px-4 py-1.5 mt-1">
                                        <div className="relative h-5 w-20 md:h-6 md:w-24">
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
                    </div>

                    {/* Micro-copy below booking button */}
                    <div className="-mt-1 mb-3 flex flex-col items-center gap-1.5 text-center text-lg text-foreground/80 md:text-xl dark:text-white/85">
                        <InfoLine text={t.hero.cardPayment} className="font-medium text-primary" />
                        <InfoLine text={t.hero.parkingCoffee} />
                        <InfoLine text={t.hero.hygieneStandards} />
                    </div>

                    {/* Phone Reservation - Anti-scam protected */}
                    <div className="flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-primary/10 shadow-sm">
                        <div className="flex items-center justify-center size-10 rounded-full bg-primary/10">
                            <Phone className="size-5 text-primary" />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-foreground/70 font-medium uppercase tracking-wider dark:text-white/75">{t.hero.phoneLabel}</p>
                            <a
                                href={siteConfig.phoneHref}
                                className="text-lg font-semibold text-foreground hover:text-primary transition-colors tracking-[0.15em]"
                            >
                                <span>+421 902 163 144</span>
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <a
                            href={siteConfig.messengerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex min-h-20 flex-col items-center justify-center gap-1 rounded-2xl border border-[#0084FF]/20 bg-[#0084FF]/10 px-3 py-3 text-center shadow-sm"
                        >
                            <MessengerIcon className="size-8" />
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-black/60 dark:text-white/70">
                                {t.hero.contactUsLabel}
                            </span>
                            <span className="text-[11px] font-semibold uppercase tracking-wide text-black dark:text-white">
                                {t.hero.messengerLabel}
                            </span>
                        </a>
                        <a
                            href={siteConfig.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex min-h-20 flex-col items-center justify-center gap-1 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/10 px-3 py-3 text-center shadow-sm"
                        >
                            <WhatsAppIcon className="size-8" />
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-black/60 dark:text-white/70">
                                {t.hero.contactUsLabel}
                            </span>
                            <span className="text-[11px] font-semibold uppercase tracking-wide text-black dark:text-white">
                                {t.hero.whatsappLabel}
                            </span>
                        </a>
                    </div>

                    <Button
                        variant="outline"
                        asChild
                        className="h-14 md:h-16 text-xl rounded-full px-10 md:px-12 border-primary/20 hover:bg-white/50 hover:text-foreground transition-all duration-300 w-full"
                    >
                        <a href="#visit">
                            <MapPin className="mr-2 size-5" aria-hidden="true" />
                            {t.hero.visitCta}
                        </a>
                    </Button>

                    <a
                        href="#darcekove-poukazky"
                        className="mb-8 w-full py-3 px-6 text-center rounded-full border-2 border-pink-400/50 hover:border-pink-500/80 bg-gradient-to-r from-pink-50 to-red-50 hover:from-pink-100 hover:to-red-100 dark:from-pink-950/30 dark:to-red-950/30 dark:hover:from-pink-900/40 dark:hover:to-red-900/40 transition-all duration-300 group flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:shadow-pink-200/50 dark:hover:shadow-pink-900/30"
                    >
                        <span className="text-lg animate-pulse">💝</span>
                        <span className="font-medium text-pink-700 dark:text-pink-300">{t.hero.giftCardsCta}</span>
                        <span className="text-lg animate-pulse">✨</span>
                    </a>

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
