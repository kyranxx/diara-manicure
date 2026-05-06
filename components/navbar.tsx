"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useI18n } from "@/components/language-provider"

export function Navbar() {
    const { t } = useI18n()
    const [isOpen, setIsOpen] = React.useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)

    const menuItems = [
        { href: "/#cennik", label: t.nav.items.services },
        { href: "/#darcekove-poukazky", label: t.nav.items.giftCards },
        { href: "/#galeria", label: t.nav.items.gallery },
        { href: "/#faq", label: t.nav.items.faq },
        { href: "/#visit", label: t.nav.items.contact },
    ]

    return (
        <nav className="w-full bg-beige dark:bg-black z-50 relative">
            <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex-shrink-0 group">
                        <span className="text-lg sm:text-xl font-light tracking-tighter group-hover:text-primary transition-colors">
                            diara <span className="text-primary font-medium">manicure.</span>
                        </span>
                    </Link>
                </div>

                <div className="hidden xl:flex items-center gap-6">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium tracking-wide hover:text-primary/60 transition-colors uppercase"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="flex items-center gap-4 px-1">
                        <a href="https://instagram.com/diaramanicure" target="_blank" rel="noopener noreferrer" className="hover:text-primary/60 transition-colors" aria-label="Instagram Diara Manicure">
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a href="https://facebook.com/diaramanicure" target="_blank" rel="noopener noreferrer" className="hover:text-primary/60 transition-colors" aria-label="Facebook Diara Manicure">
                            <Facebook className="h-5 w-5" />
                        </a>
                    </div>
                    <LanguageSwitcher />
                    <ThemeToggle />
                </div>

                <div className="xl:hidden flex items-center gap-2">
                    <LanguageSwitcher variant="compact" />
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMenu}
                        className="text-primary"
                        aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {isOpen && (
                <div className="xl:hidden bg-beige dark:bg-black border-t border-primary/5">
                    <div className="flex flex-col p-6 gap-4">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium py-2 border-b border-primary/5"
                            >
                                {item.label}
                            </Link>
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
            )}
        </nav>
    )
}
