"use client"

import { useState, useEffect } from "react"
import { PricingSkeleton } from "@/components/pricing-skeleton"

interface Service {
    title: string
    description: string
    price: string
    discountedPrice?: string
}

export function ServicesSection() {
    const [services, setServices] = useState<Service[]>([])
    const [loadingServices, setLoadingServices] = useState(true)

    useEffect(() => {
        const controller = new AbortController()

        fetch('/api/services', { signal: controller.signal })
            .then(async res => {
                if (!res.ok) {
                    const error = await res.json()
                    throw new Error(error.error || 'Failed to fetch services')
                }
                return res.json()
            })
            .then(setServices)
            .catch(error => {
                if (error.name === 'AbortError') return
                setServices([])
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setLoadingServices(false)
                }
            })

        return () => controller.abort()
    }, [])

    return (
        <section id="cennik" className="py-24 bg-white dark:bg-black">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white">Cenník služieb</h2>
                    <div className="w-24 h-1 bg-primary/20 mx-auto mb-6 rounded-full" />
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        <span className="text-primary font-medium mt-2 block">
                            Otváracia akcia nového salónu! <br />
                            <span className="underline underline-offset-4">Promo ceny platné do 31.12.2025</span>
                        </span>
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {loadingServices ? (
                        <PricingSkeleton />
                    ) : services.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {services.map((service, index) => {
                                const hasDiscount = service.discountedPrice && service.discountedPrice.trim() !== '';
                                return (
                                    <div key={index} className="group flex justify-between items-start p-8 bg-beige dark:bg-card rounded-[2rem] hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 border border-transparent hover:border-primary/10 h-full">
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
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground">Žiadne služby nie sú momentálne dostupné.</div>
                    )}
                </div>
            </div>
        </section>
    )
}
