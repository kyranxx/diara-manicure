"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Instagram, Facebook } from "lucide-react"
import { useEffect } from "react"
import { ThemeAwareLogo } from "@/components/theme-aware-logo"

interface WindowWithGtag extends Window {
    gtag?: (command: string, action: string, params: Record<string, string>) => void
}

export default function ThankYouPage() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const win = window as WindowWithGtag
            if (win.gtag) {
                let userId = ""
                try {
                    userId = window.localStorage.getItem("ga-anon-user-id") ?? ""
                } catch { /* ignore */ }

                const params: Record<string, string> = {
                    'send_to': 'AW-17746151386/EYF2CN27xMMbENqPg45C'
                }
                if (userId) {
                    params.user_id = userId
                }
                win.gtag('event', 'conversion', params)
            }
        }
    }, [])

    return (
        <div className="min-h-screen bg-beige dark:bg-black flex flex-col">
            <header className="py-8">
                <div className="container mx-auto px-6 flex justify-center">
                    <Link href="/">
                        <ThemeAwareLogo
                            alt="diara manicure"
                            width={1536}
                            height={600}
                            className="w-72 md:w-80 h-auto"
                            priority
                        />
                    </Link>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center py-12">
                <div className="container mx-auto px-6 text-center max-w-3xl">
                    <div className="mb-12 flex justify-center">
                        <div className="rounded-full bg-primary/10 p-8 shadow-xl">
                            <CheckCircle2 className="w-20 h-20 text-primary" />
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extralight mb-8 text-black dark:text-white tracking-tight leading-[1.1]">
                        Ďakujeme za <br />
                        <span className="italic font-serif text-primary/70 font-light">rezerváciu</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-extralight leading-relaxed max-w-2xl mx-auto tracking-wide">
                        Vaša rezervácia bola úspešne prijatá. Tešíme sa na vašu návštevu v našom salóne.
                    </p>

                    <div className="bg-white/50 dark:bg-neutral-900/50 rounded-[2rem] p-8 mb-16 border border-primary/10 shadow-lg backdrop-blur-sm">
                        <p className="text-lg text-black dark:text-white font-light">
                            📧 Potvrdenie rezervácie s detailmi bolo zaslané na váš e-mail.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <Link href="/">
                            <Button className="h-16 text-lg font-light tracking-wide rounded-full px-12 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 bg-primary text-primary-foreground hover:scale-105 w-full sm:w-auto">
                                Späť na domovskú stránku
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="py-12 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center space-y-8">
                        <div className="text-center text-muted-foreground font-light text-lg">
                            <p className="mb-2">Hospodárska 53, 91701 Trnava</p>
                            <p className="mb-2">0902 163 144</p>
                            <p>andrea.heckova92@gmail.com</p>
                        </div>

                        <div className="flex gap-6">
                            <a
                                href="https://instagram.com/diaramanicure"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
                                aria-label="Instagram Diara Manicure"
                            >
                                <Instagram className="h-6 w-6 text-gray-600 hover:text-gray-400" />
                            </a>
                            <a
                                href="https://facebook.com/diaramanicure"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
                                aria-label="Facebook Diara Manicure"
                            >
                                <Facebook className="h-6 w-6 text-gray-600 hover:text-gray-400" />
                            </a>
                        </div>

                        <div className="text-center pt-4 border-t border-primary/10 w-full max-w-xs mx-auto">
                            <p className="text-sm text-muted-foreground font-light">© 2025 diara manicure</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
