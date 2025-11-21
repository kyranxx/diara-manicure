"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { href: "#cennik", label: "Cenník" },
        { href: "#recenzie", label: "Recenzie" },
        { href: "#galeria", label: "Galéria" },
        { href: "#visit", label: "Kontakt" },
    ]

    return (
        <>
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 flex justify-between items-center",
                scrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent pt-6"
            )}>
                <div className="container mx-auto flex justify-between items-center">
                    <a href="#" className="text-2xl font-bold tracking-tighter text-foreground">
                        DIARA
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors uppercase tracking-widest"
                            >
                                {link.label}
                            </a>
                        ))}
                        <ThemeToggle />
                    </div>

                    {/* Mobile Nav Toggle */}
                    <div className="flex md:hidden items-center gap-4">
                        <ThemeToggle />
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in slide-in-from-top-10 duration-300">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-2xl font-light text-foreground hover:text-primary transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </>
    )
}
