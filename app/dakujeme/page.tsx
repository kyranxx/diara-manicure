"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Instagram, Facebook } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Ďakujeme | Diara Manicure",
    robots: {
        index: false,
        follow: false,
    },
}

export default function ThankYouPage() {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const logoSrc = resolvedTheme === "dark" ? "/logo_black.png" : "/logo.png"

    return (
        <div className="min-h-screen bg-white dark:bg-black flex flex-col">
            {/* Header */}
            <header className="py-6">
                <div className="container mx-auto px-6 flex justify-center">
                    <Link href="/">
                        <Image
                            src={logoSrc}
                            alt="diara manicure"
                            width={200}
                            height={100}
                            className="w-40 h-auto"
                            priority
                        />
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center py-12">
                <div className="container mx-auto px-6 text-center max-w-2xl">
                    <div className="mb-8 flex justify-center">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-6">
                            <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400" />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-light mb-6 text-black dark:text-white tracking-wide">
                        Ďakujeme za rezerváciu
                    </h1>

                    <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-12 font-light leading-relaxed">
                        Vaša rezervácia bola úspešne prijatá. Tešíme sa na vašu návštevu v našom salóne.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/">
                            <Button className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 px-8 py-6 text-lg font-light w-full sm:w-auto">
                                Späť na domovskú stránku
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t py-12 bg-white dark:bg-black mt-auto">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center space-y-8">
                        {/* Address */}
                        <div className="text-center text-neutral-600 dark:text-white">
                            <p className="mb-2">Hospodárska 53, 91701 Trnava</p>
                            <p className="mb-2">0902 163 144</p>
                            <p>andrea.heckova92@gmail.com</p>
                        </div>

                        {/* Social Media */}
                        <div className="flex gap-6">
                            <a
                                href="https://instagram.com/diaramanicure"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-600 dark:text-white hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors"
                            >
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a
                                href="https://facebook.com/diaramanicure"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-600 dark:text-white hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors"
                            >
                                <Facebook className="h-6 w-6" />
                            </a>
                        </div>

                        {/* Copyright */}
                        <div className="text-center pt-4 border-t border-neutral-200 dark:border-neutral-700 w-full">
                            <p className="text-neutral-500 dark:text-white font-light">© 2025 diara manicure</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
