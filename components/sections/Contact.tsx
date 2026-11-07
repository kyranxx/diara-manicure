import { Clock, MapPin, Phone } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { Button } from "@/components/ui/button"
import Map from "@/components/ui/custom-map"
import type { TranslationMessages } from "@/lib/i18n"

interface ContactProps {
    bookingUrl: string
    t: TranslationMessages
}

export function Contact({ bookingUrl, t }: ContactProps) {
    return (
        <section id="visit" className="pt-16 pb-10 bg-beige dark:bg-[#050403]">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                    <div>
                        <div>
                            <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white text-center lg:text-left">{t.contact.heading}</h2>
                            <div className="w-24 h-1 bg-primary/20 mx-auto lg:mx-0 mb-8 rounded-full" />
                            <div className="space-y-8">
                                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 text-center lg:text-left">
                                    <div className="p-3 rounded-full bg-white dark:bg-white text-primary dark:text-black shadow-sm">
                                        <MapPin className="size-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-1 text-black dark:text-white">{t.contact.addressLabel}</h3>
                                        <p className="text-muted-foreground text-lg">Hospodárska 53<br />91701 Trnava</p>
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 text-center lg:text-left">
                                    <div className="p-3 rounded-full bg-white dark:bg-white text-primary dark:text-black shadow-sm">
                                        <Phone className="size-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-1 text-black dark:text-white">{t.contact.phoneLabel}</h3>
                                        <a
                                            href="tel:+421902163144"
                                            className="text-muted-foreground text-lg hover:text-primary transition-colors inline-flex items-center gap-1"
                                        >
                                            <span>+421 902 163 144</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 text-center lg:text-left">
                                    <div className="p-3 rounded-full bg-white dark:bg-white text-primary dark:text-black shadow-sm">
                                        <Clock className="size-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-1 text-black dark:text-white">{t.contact.hoursLabel}</h3>
                                        <p className="text-muted-foreground text-lg">
                                            {t.contact.hoursDays} {siteConfig.opens.replace(/^0/, "")} – {siteConfig.closes}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex flex-col items-center lg:items-start gap-4">
                                <Button
                                    asChild
                                    className="h-16 md:h-20 text-xl rounded-full w-full max-w-sm px-8 bg-primary text-primary-foreground hover:bg-primary/90"
                                >
                                    <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                                        {t.contact.bookingCta}
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                        <Map />
                    </div>
                </div>
            </div>
        </section>
    )
}
