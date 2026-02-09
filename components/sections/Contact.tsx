"use client"

import { MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Map from "@/components/ui/custom-map"

interface ContactProps {
    bookingUrl: string
}

export function Contact({ bookingUrl }: ContactProps) {
    return (
        <section id="visit" className="pt-24 pb-12 bg-beige dark:bg-black">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                    <div>
                        <div>
                            <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white text-center lg:text-left">Kde nás nájdete</h2>
                            <div className="w-24 h-1 bg-primary/20 mx-auto lg:mx-0 mb-8 rounded-full" />
                            <div className="space-y-8">
                                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 text-center lg:text-left">
                                    <div className="p-3 rounded-full bg-white dark:bg-white text-primary dark:text-black shadow-sm">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-1 text-black dark:text-white">Adresa</h3>
                                        <p className="text-muted-foreground text-lg">Hospodárska 53<br />91701 Trnava</p>
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 text-center lg:text-left">
                                    <div className="p-3 rounded-full bg-white dark:bg-white text-primary dark:text-black shadow-sm">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-1 text-black dark:text-white">Telefón</h3>
                                        <a
                                            href="tel:+421902163144"
                                            className="text-muted-foreground text-lg hover:text-primary transition-colors inline-flex items-center gap-1"
                                            aria-label="Zavolať na číslo +421 902 163 144"
                                        >
                                            <span aria-hidden="true" className="select-none">
                                                <span>0</span>
                                                <span className="hidden">bot-trap</span>
                                                <span>9</span>
                                                <span>0</span>
                                                <span className="hidden">fake</span>
                                                <span>2</span>
                                                <span>{'\u2009'}</span>
                                                <span>1</span>
                                                <span>6</span>
                                                <span className="hidden">null</span>
                                                <span>3</span>
                                                <span>{'\u2009'}</span>
                                                <span>1</span>
                                                <span className="hidden">spam</span>
                                                <span>4</span>
                                                <span>4</span>
                                            </span>
                                            <span className="sr-only">+421 902 163 144</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex flex-col items-center lg:items-start gap-4">
                                <Button
                                    asChild
                                    className="h-16 md:h-20 text-xl rounded-full px-16 md:px-20 bg-primary text-primary-foreground hover:bg-primary/90 min-w-[250px]"
                                >
                                    <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                                        Pozrieť voľné termíny
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
