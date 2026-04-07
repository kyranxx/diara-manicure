"use client"

import { Instagram, Facebook } from "lucide-react"
import { ThemeAwareLogo } from "@/components/theme-aware-logo"

export function Footer() {
    return (
        <footer className="py-12 bg-beige dark:bg-black">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center gap-3">
                        <ThemeAwareLogo
                            alt="DIARA - Jarné logo"
                            width={1536}
                            height={600}
                            className="h-20 w-auto object-contain"
                            sizes="320px"
                        />
                        <p className="text-sm font-medium text-black dark:text-white tracking-wide">Professional Nails & Manicure in Trnava</p>
                    </div>

                    <p className="text-sm text-foreground/80 text-center">© 2025 diara manicure. Všetky práva vyhradené.</p>

                    <div className="flex gap-6">
                        <a
                            href="https://instagram.com/diaramanicure"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-white hover:bg-primary text-black hover:text-primary-foreground transition-all duration-300 shadow-sm"
                            aria-label="Instagram Diara Manicure"
                        >
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a
                            href="https://facebook.com/diaramanicure"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-white hover:bg-primary text-black hover:text-primary-foreground transition-all duration-300 shadow-sm"
                            aria-label="Facebook Diara Manicure"
                        >
                            <Facebook className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                {/* SEO Keywords Line */}
                <div className="mt-8 pt-6 border-t border-primary/10 text-center">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Populárne vyhľadávania: Nechty Trnava | Gélové nechty Trnava | Manikúra Trnava | Nails Trnava | Nechtové štúdio Trnava | Modelácia nechtov | Gél lak Trnava | Nechty Cenník | Voľné termíny na nechty | Darčekové poukazy nechty Trnava | Voucher manikúra
                    </p>
                </div>
            </div>
        </footer>
    )
}
