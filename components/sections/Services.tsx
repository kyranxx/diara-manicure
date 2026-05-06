import type { Service } from "@/lib/sheets"
import type { TranslationMessages } from "@/lib/i18n"

interface ServicesProps {
    services: Service[]
    bookingUrl: string
    t: TranslationMessages
}

export function Services({ services, bookingUrl, t }: ServicesProps) {
    return (
        <section id="cennik" className="py-16 bg-beige dark:bg-black">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white">{t.services.heading}</h2>
                    <div className="w-24 h-1 bg-primary/20 mx-auto mb-4 rounded-full" />
                    <p className="text-sm text-muted-foreground uppercase tracking-widest mb-6">{t.services.validFrom}</p>
                    <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
                        {t.services.intro}
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {services.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {services.map((service, index) => {
                                const hasDiscount = service.discountedPrice && service.discountedPrice.trim() !== '';
                                return (
                                    <a
                                        key={index}
                                        href={bookingUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex justify-between items-start p-8 bg-white/45 dark:bg-card rounded-[2rem] hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 border border-transparent hover:border-primary/10 h-full cursor-pointer hover:scale-[1.02]"
                                    >
                                        {hasDiscount && (
                                            <div className="absolute top-2 right-4 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                                                {t.services.mostRequested}
                                            </div>
                                        )}
                                        <div className="flex-grow pr-4">
                                            <h3 className="text-xl font-normal mb-2 group-hover:text-primary transition-colors text-black dark:text-white">{service.title}</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                                        </div>
                                        <div className="text-right whitespace-nowrap">
                                            {hasDiscount ? (
                                                <div className="flex flex-col items-end">
                                                    <span className="text-sm text-black line-through decoration-1">{service.price}</span>
                                                    <span className="text-xl font-medium text-primary">{service.discountedPrice}</span>
                                                </div>
                                            ) : (
                                                <span className="text-xl font-medium text-black dark:text-white">{service.price}</span>
                                            )}
                                        </div>
                                    </a>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground">{t.services.unavailable}</div>
                    )}
                </div>
            </div>
        </section>
    )
}
