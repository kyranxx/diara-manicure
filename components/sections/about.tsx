"use client"

import Image from "next/image"
import { Check } from "lucide-react"

export function AboutSection() {
    return (
        <section id="o-nas" className="py-24 bg-white dark:bg-black">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    <div className="relative">
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden">
                            <Image
                                src="/gallery/IMG_5745.jpeg"
                                alt="Interiér salónu Diara Manicure"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-beige dark:bg-card rounded-full -z-10 blur-2xl opacity-50" />
                    </div>

                    <div>
                        <h2 className="text-5xl md:text-7xl font-light mb-8 tracking-tight text-black dark:text-white">O nás</h2>
                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                V Diara Manicure veríme, že krása spočíva v detailoch. Náš salón vznikol s víziou poskytovať nielen profesionálnu starostlivosť o nechty, ale aj miesto pre dokonalý relax.
                            </p>
                            <p>
                                Špecializujeme sa na <span className="text-primary font-medium">prístrojovú manikúru</span> a modeláciu gélových nechtov s dôrazom na zdravie a prirodzený vzhľad. Používame výhradne prémiové materiály od overených európskych značiek.
                            </p>

                            <div className="pt-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    <span className="text-black dark:text-white font-medium">Certifikované manikérky s praxou</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    <span className="text-black dark:text-white font-medium">Prísne hygienické štandardy</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    <span className="text-black dark:text-white font-medium">Individuálny prístup ku každej klientke</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
