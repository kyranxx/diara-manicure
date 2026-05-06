import { Instagram, Facebook } from "lucide-react"
import { ThemeAwareLogo } from "@/components/theme-aware-logo"
import type { TranslationMessages } from "@/lib/i18n"

export function Footer({ t }: { t: TranslationMessages }) {
    return (
        <footer className="py-10 bg-beige dark:bg-black">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center gap-3">
                        <ThemeAwareLogo
                            alt={t.footer.logoAlt}
                            width={1536}
                            height={600}
                            className="h-24 md:h-28 w-auto object-contain"
                            sizes="(max-width: 768px) 192px, 224px"
                        />
                        <p className="text-sm font-medium text-black dark:text-white tracking-wide">{t.footer.tagline}</p>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-foreground/80">{t.footer.rights}</p>
                        <a
                            href="/darcekove-poukazy"
                            className="mt-2 inline-block text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                            {t.footer.giftCards}
                        </a>
                    </div>

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
                        {t.footer.keywords}
                    </p>
                </div>
            </div>
        </footer>
    )
}
