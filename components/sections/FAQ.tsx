"use client"

export function FAQ() {
    return (
        <section id="faq" className="py-24 bg-white dark:bg-black">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white">
                        Časté otázky<br />o našom nechtovom štúdiu
                    </h2>
                    <div className="w-24 h-1 bg-primary/20 mx-auto mb-6 rounded-full" />
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {/* FAQ Item 1 */}
                    <div className="bg-beige dark:bg-card p-8 rounded-[2rem] hover:shadow-lg transition-all duration-300">
                        <h3 className="text-xl font-medium mb-3 text-black dark:text-white">
                            Kde nájdem vaše nechtové štúdio v Trnave?
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            Náš salón diara manicure. Trnava sa nachádza na Hospodárskej 53. Máme vlastné parkovanie zdarma priamo pred vchodom.
                        </p>
                    </div>

                    {/* FAQ Item 2 */}
                    <div className="bg-beige dark:bg-card p-8 rounded-[2rem] hover:shadow-lg transition-all duration-300">
                        <h3 className="text-xl font-medium mb-3 text-black dark:text-white">
                            Musím sa objednať telefonicky?
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            Nie, preferujeme online rezervácie. Kliknite na tlačidlo &quot;Pozrieť voľné termíny&quot; a vyberte si čas, ktorý vám vyhovuje. Objednanie na nechty trvá menej ako minútu.
                        </p>
                    </div>

                    {/* FAQ Item 3 */}
                    <div className="bg-beige dark:bg-card p-8 rounded-[2rem] hover:shadow-lg transition-all duration-300">
                        <h3 className="text-xl font-medium mb-3 text-black dark:text-white">
                            Robíte aj iné služby ako gélové nechty?
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            Áno, špecializujeme sa na gélové nechty, ale v ponuke je aj gél lak a klasická manikúra Trnava.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
