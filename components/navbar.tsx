import { Menu, Instagram, Facebook, Moon, Sun } from "lucide-react"
import { defaultLanguage, languages, translations, type Language, type TranslationMessages } from "@/lib/i18n"

type NavbarProps = {
    language?: Language
    t?: TranslationMessages
}

function languageHomeHref(language: Language) {
    return language === defaultLanguage ? "/" : `/${language}`
}

function sectionHref(language: Language, id: string) {
    return language === defaultLanguage ? `/#${id}` : `/${language}#${id}`
}

export function Navbar({ language = defaultLanguage, t = translations[defaultLanguage] }: NavbarProps) {
    const menuItems = [
        { href: sectionHref(language, "cennik"), label: t.nav.items.services },
        { href: sectionHref(language, "darcekove-poukazky"), label: t.nav.items.giftCards },
        { href: sectionHref(language, "galeria"), label: t.nav.items.gallery },
        { href: sectionHref(language, "faq"), label: t.nav.items.faq },
        { href: sectionHref(language, "visit"), label: t.nav.items.contact },
    ]
    const languageSwitcher = (
        <div
            className="flex items-center gap-0.5 rounded-full border border-primary/10 bg-white/45 p-0.5 text-[11px] font-semibold dark:bg-white/10"
            aria-label={t.languageSwitcher.label}
        >
            {languages.map((item) => {
                const active = item.code === language
                return (
                    <a
                        key={item.code}
                        href={languageHomeHref(item.code)}
                        hrefLang={item.htmlLang}
                        aria-current={active ? "page" : undefined}
                        className={
                            active
                                ? "rounded-full bg-primary px-2 py-1 text-primary-foreground"
                                : "rounded-full px-2 py-1 text-foreground/70 transition-colors hover:bg-white/70 hover:text-foreground dark:hover:bg-white/15"
                        }
                    >
                        {item.shortLabel}
                    </a>
                )
            })}
        </div>
    )

    return (
        <nav className="w-full bg-beige dark:bg-black z-50 relative">
            <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <a href={languageHomeHref(language)} className="flex-shrink-0 group">
                        <span className="text-lg sm:text-xl font-light tracking-tighter group-hover:text-primary transition-colors">
                            diara <span className="text-primary font-medium">manicure.</span>
                        </span>
                    </a>
                </div>

                <div className="flex items-center gap-2 xl:gap-6">
                    <div className="hidden xl:flex items-center gap-6">
                        {menuItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium tracking-wide hover:text-primary/60 transition-colors uppercase"
                            >
                                {item.label}
                            </a>
                        ))}
                        <div className="flex items-center gap-4 px-1">
                            <a href="https://instagram.com/diaramanicure" target="_blank" rel="noopener noreferrer" className="hover:text-primary/60 transition-colors" aria-label="Instagram Diara Manicure">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://facebook.com/diaramanicure" target="_blank" rel="noopener noreferrer" className="hover:text-primary/60 transition-colors" aria-label="Facebook Diara Manicure">
                                <Facebook className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                    {languageSwitcher}
                    <button
                        type="button"
                        data-theme-toggle
                        className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">{t.theme.toggle}</span>
                    </button>
                    <details className="relative xl:hidden">
                        <summary
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
                            aria-label={t.nav.openMenu}
                    >
                            <Menu className="h-6 w-6" />
                        </summary>
                        <div className="absolute right-0 top-full z-50 mt-3 w-72 rounded-xl border border-primary/10 bg-beige p-6 shadow-xl dark:bg-black">
                            <div className="flex flex-col gap-4">
                                {menuItems.map((item) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        className="text-lg font-medium py-2 border-b border-primary/5"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                                <div className="flex items-center gap-4 pt-2">
                                    <a href="https://instagram.com/diaramanicure" target="_blank" rel="noopener noreferrer" className="hover:text-primary/60 transition-colors" aria-label="Instagram Diara Manicure">
                                        <Instagram className="h-5 w-5" />
                                    </a>
                                    <a href="https://facebook.com/diaramanicure" target="_blank" rel="noopener noreferrer" className="hover:text-primary/60 transition-colors" aria-label="Facebook Diara Manicure">
                                        <Facebook className="h-5 w-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </details>
                </div>
            </div>
        </nav>
    )
}
