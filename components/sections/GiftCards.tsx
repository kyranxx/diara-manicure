"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function GiftCards() {
    return (
        <section id="darcekove-poukazky" className="py-24 bg-gradient-to-br from-pink-50 via-white to-red-50 dark:from-pink-950/20 dark:via-black dark:to-red-950/20 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 text-4xl opacity-20 animate-bounce text-pink-400" style={{ animationDuration: '3s' }}>♥</div>
                <div className="absolute top-20 right-20 text-3xl opacity-20 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>✨</div>
                <div className="absolute bottom-20 left-1/4 text-5xl opacity-15 animate-bounce text-pink-400" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>♥</div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Content Column */}
                        <div className="text-center md:text-left order-2 md:order-1">
                            <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <span className="text-pink-500">♥</span>
                                <span>Valentín 2026 • Ideálny darček</span>
                                <span className="text-pink-500">♥</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight text-black dark:text-white">
                                Darčekové poukazy
                            </h2>
                            <div className="w-24 h-1 bg-primary/30 mx-auto md:mx-0 mb-6 rounded-full" />
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-light">
                                Hľadáte <span className="text-primary font-medium">praktický darček</span> pre vašich blízkych? Potešte mamu, sestru, priateľku či kolegyňu darčekovým poukazom na profesionálnu manikúru!
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-light">
                                Naše poukazy sú ideálnym <span className="text-pink-500 font-medium">valentínskym darčekom 2026</span>, ktorý poteší každú ženu.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Button
                                    asChild
                                    className="h-14 md:h-16 text-lg md:text-xl rounded-full px-8 md:px-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <a href="https://services.bookio.com/diaramanicure/gift-cards#/" target="_blank" rel="noopener noreferrer">
                                        <span className="mr-2">💅</span>
                                        Kúpiť poukaz online
                                    </a>
                                </Button>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Okamžité doručenie emailom</span>
                                </div>
                            </div>
                        </div>

                        {/* Premium CSS Gift Card Component Area */}
                        <div className="relative order-1 md:order-2 flex justify-center">
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: -2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative w-full max-w-[400px] aspect-[1.6/1] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                            >
                                {/* Card Background */}
                                <div className="absolute inset-0 bg-white dark:bg-zinc-900 border-[8px] border-beige dark:border-zinc-800" />

                                {/* Decorative Pattern Layer */}
                                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                                {/* Content Container */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/valentin_card.jpg"
                                            alt="Valentínsky darčekový poukaz Diara Manicure"
                                            fill
                                            className="object-contain"
                                            unoptimized
                                        />
                                    </div>
                                </div>
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

                                {/* Golden corner accents */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-pink-200/20 to-transparent pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-200/20 to-transparent pointer-events-none" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
