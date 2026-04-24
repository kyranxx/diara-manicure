import Image from "next/image"

export function About() {
    return (
        <section className="py-12 bg-beige dark:bg-black overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
                    {/* Images Column */}
                    <div className="relative h-[420px] w-full max-w-xl mx-auto md:h-[520px] md:mx-0">
                        <Image
                            src="/diara_nails_nechty_trnava_hospodarska.jpg"
                            alt="Interiér salónu Diara Manicure"
                            fill
                            className="rounded-[2rem] border-4 border-white/60 object-cover shadow-2xl sepia-[.15]"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>

                    {/* Content Column */}
                    <div className="md:pl-8 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-tight text-black dark:text-white">
                            O nás
                        </h2>
                        <div className="w-24 h-1 bg-primary/20 mx-auto md:mx-0 mb-6 rounded-full" />
                        <h3 className="text-lg text-primary/80 font-serif italic mb-6">
                            Andrea Hečková & diara manicure.
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-4 font-light">
                            Vítame vás v našom salóne, kde sa staráme o krásu a zdravie vašich nechtov s láskou a profesionalitou.
                            Ako zakladateľka <strong>diara manicure.</strong> som si splnila sen o vytvorení miesta, kde sa každá klientka bude cítiť výnimočne.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-light">
                            Používame len tie najkvalitnejšie materiály a neustále sa vzdelávame v nových trendoch, aby sme vám priniesli tú najlepšiu starostlivosť a najkrajšie nails v Trnave.
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <div className="h-px w-12 bg-primary/30"></div>
                            <span className="text-xs uppercase tracking-widest text-primary/60">Zakladateľka</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
