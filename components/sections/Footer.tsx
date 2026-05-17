import Link from "next/link"
import { FacebookIcon, InstagramIcon } from "@/components/social-icons"
import { ThemeAwareLogo } from "@/components/theme-aware-logo"
import type { TranslationMessages } from "@/lib/i18n"
import { siteConfig } from "@/lib/site-config"

export function Footer({ t }: { t: TranslationMessages }) {
    return (
        <footer className="py-10 bg-beige dark:bg-[#050403]">
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
                        <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                            <Link href="/darcekove-poukazy" className="transition-colors hover:text-primary">
                                {t.footer.giftCards}
                            </Link>
                            <Link href="/blog" className="transition-colors hover:text-primary">
                                {t.footer.blog}
                            </Link>
                        </div>
                        <div className="mt-4 flex max-w-md flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                            <span className="font-medium text-foreground/70">{t.footer.serviceGuides}</span>
                            <Link href="/sluzby/gelove-nechty-trnava" className="transition-colors hover:text-primary">
                                {t.footer.gelNails}
                            </Link>
                            <Link href="/sluzby/gel-lak-trnava" className="transition-colors hover:text-primary">
                                {t.footer.gelPolish}
                            </Link>
                            <Link href="/sluzby/manikura-trnava" className="transition-colors hover:text-primary">
                                {t.footer.manicure}
                            </Link>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <a
                            href={siteConfig.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex size-9 items-center justify-center"
                            aria-label="Instagram Diara Manicure"
                        >
                            <InstagramIcon className="size-6" />
                        </a>
                        <a
                            href={siteConfig.facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex size-9 items-center justify-center"
                            aria-label="Facebook Diara Manicure"
                        >
                            <FacebookIcon className="size-6" />
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
