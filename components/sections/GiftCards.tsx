import Image from "next/image"
import Link from "next/link"
import { Check, ShoppingBasket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GiftCardTrackedLink } from "@/components/gift-card-tracked-link"

export function GiftCards() {
    return (
        <section id="darcekove-poukazky" className="py-16 bg-beige dark:bg-black">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div className="text-center md:text-left order-2 md:order-1">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/45 px-4 py-2 text-sm font-medium text-muted-foreground dark:bg-card">
                                <ShoppingBasket className="h-4 w-4" aria-hidden="true" />
                                <span>Darčekové poukazy</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-light mb-5 mt-5 tracking-tight text-black dark:text-white">
                                Poukaz na manikúru v Trnave
                            </h2>
                            <div className="w-20 h-1 bg-primary/20 mx-auto md:mx-0 mb-6 rounded-full" />

                            <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-light">
                                Hľadáte praktický darček pre mamu, sestru, priateľku či kolegyňu?
                                Poukaz sa dá kúpiť online a doručiť emailom.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Button asChild className="h-12 rounded-full px-7">
                                    <GiftCardTrackedLink source="homepage_gift_card_section">
                                        <ShoppingBasket className="h-4 w-4" />
                                        Kúpiť poukaz
                                    </GiftCardTrackedLink>
                                </Button>
                                <Button asChild variant="outline" className="h-12 rounded-full px-7">
                                    <Link href="/darcekove-poukazy">Viac informácií</Link>
                                </Button>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-700 dark:text-green-400" aria-hidden="true" />
                                    <span>Doručenie emailom</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative order-1 md:order-2">
                            <div className="relative aspect-square max-w-md mx-auto">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg border border-primary/10 bg-white dark:bg-card">
                                    <Image
                                        src="/gift-card.jpg"
                                        alt="Darčekový poukaz Diara Manicure"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
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
