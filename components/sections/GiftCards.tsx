import Image from "next/image"
import Link from "next/link"
import { Check, ShoppingBasket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"
import type { TranslationMessages } from "@/lib/i18n"

export function GiftCards({ t }: { t: TranslationMessages }) {
    return (
        <section id="darcekove-poukazky" className="py-20 bg-gradient-to-b from-beige via-white to-beige dark:from-[#050403] dark:via-[#120d0d] dark:to-[#050403]">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto rounded-[2rem] border border-primary/15 bg-white/70 p-6 shadow-2xl shadow-black/5 ring-1 ring-white/60 backdrop-blur-sm dark:bg-card/70 dark:ring-white/10 md:p-10">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div className="text-center md:text-left order-2 md:order-1">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:bg-primary/15">
                                <ShoppingBasket className="size-4" aria-hidden="true" />
                                <span>{t.giftCards.label}</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-light mb-5 mt-5 tracking-tight text-black dark:text-white">
                                {t.giftCards.heading}
                            </h2>
                            <div className="w-20 h-1 bg-primary/20 mx-auto md:mx-0 mb-6 rounded-full" />

                            <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-light">
                                {t.giftCards.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Button asChild className="h-14 rounded-full px-8 text-base">
                                    <a href={siteConfig.giftCardUrl} target="_blank" rel="noopener noreferrer">
                                        <ShoppingBasket className="size-4" />
                                        {t.giftCards.buyCta}
                                    </a>
                                </Button>
                                <Button asChild variant="outline" className="h-14 rounded-full px-8 text-base bg-white/50">
                                    <Link href="/darcekove-poukazy">{t.giftCards.moreInfoCta}</Link>
                                </Button>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Check className="size-4 text-green-700 dark:text-green-400" aria-hidden="true" />
                                    <span>{t.giftCards.delivery}</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative order-1 md:order-2">
                            <div className="relative aspect-square max-w-md mx-auto">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-primary/15 bg-white shadow-2xl shadow-primary/10 ring-1 ring-white dark:bg-card dark:ring-white/10">
                                    <Image
                                        src="/gift-card-520.webp"
                                        alt={t.giftCards.imageAlt}
                                        width={520}
                                        height={521}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
