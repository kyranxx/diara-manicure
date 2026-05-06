import type { TranslationMessages } from "@/lib/i18n"

export function FAQ({ t }: { t: TranslationMessages }) {
    return (
        <section id="faq" className="py-16 bg-beige dark:bg-black">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white">
                        {t.faq.titleLine1}<br />{t.faq.titleLine2}
                    </h2>
                    <div className="w-24 h-1 bg-primary/20 mx-auto mb-6 rounded-full" />
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {t.faq.items.map((item) => (
                        <div key={item.question} className="bg-white/45 dark:bg-card p-8 rounded-[2rem] hover:shadow-lg transition-all duration-300">
                            <h3 className="text-xl font-medium mb-3 text-black dark:text-white">
                                {item.question}
                            </h3>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                {item.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
