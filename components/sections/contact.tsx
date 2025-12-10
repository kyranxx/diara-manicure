"use client"

import { useEffect, useRef } from "react"
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function ContactSection() {
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const initMap = () => {
            if (!mapRef.current || !(window as any).google?.maps) return

            const mapOptions = {
                center: { lat: 48.3709, lng: 17.5833 }, // Trnava coordinates
                zoom: 15,
                mapId: '6f3b06914d771662', // Use a valid Map ID or remove if not using vector maps
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
            }

            const map = new (window as any).google.maps.Map(mapRef.current, mapOptions)

            new (window as any).google.maps.Marker({
                position: { lat: 48.3709, lng: 17.5833 },
                map: map,
                title: "Diara Manicure",
            })
        }

        // Check for Google Maps API availability
        if ((window as any).google?.maps) {
            initMap()
        } else {
            const interval = setInterval(() => {
                if ((window as any).google?.maps) {
                    initMap()
                    clearInterval(interval)
                }
            }, 100)
            return () => clearInterval(interval)
        }
    }, [])

    return (
        <footer id="kontakt" className="bg-black text-white pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-tight">Kontakt</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium mb-1">Adresa</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Hospodárska 3604/53<br />
                                        917 01 Trnava<br />
                                        (Budova oproti OMV pumpe, vedľa LIDL)
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                                    <Phone className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium mb-1">Telefón</h3>
                                    <a href="tel:+421902163144" className="text-gray-400 hover:text-primary transition-colors">
                                        +421 902 163 144
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium mb-1">Email</h3>
                                    <a href="mailto:info@diaramanicure.sk" className="text-gray-400 hover:text-primary transition-colors">
                                        info@diaramanicure.sk
                                    </a>
                                </div>
                            </div>

                            <div className="pt-8">
                                <h3 className="text-lg font-medium mb-4">Sledujte nás</h3>
                                <div className="flex gap-4">
                                    <Link
                                        href="https://instagram.com"
                                        target="_blank"
                                        className="p-3 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all duration-300"
                                        aria-label="Instagram"
                                    >
                                        <Instagram className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href="https://facebook.com"
                                        target="_blank"
                                        className="p-3 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-all duration-300"
                                        aria-label="Facebook"
                                    >
                                        <Facebook className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-[400px] w-full rounded-[2rem] overflow-hidden relative bg-white/5">
                        <div ref={mapRef} className="w-full h-full" />
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Diara Manicure. Všetky práva vyhradené.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <Link href="/ochrana-osobnych-udajov" className="hover:text-white transition-colors">
                            Ochrana osobných údajov
                        </Link>
                        <Link href="/obchodne-podmienky" className="hover:text-white transition-colors">
                            Obchodné podmienky
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
