"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)

    const menuItems = [
        { href: "#cennik", label: "Cenník" },
        { href: "#darcekove-poukazky", label: "Poukazy" },
        { href: "#recenzie", label: "Recenzie" },
        { href: "#galeria", label: "Galéria" },
        { href: "#faq", label: "FAQ" },
        { href: "#visit", label: "Kontakt" },
    ]

    return (
        <nav className="w-full bg-beige dark:bg-black z-50 relative">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex-shrink-0" aria-label="Domov">
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium tracking-wide hover:text-primary/60 transition-colors uppercase"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="flex items-center gap-4 px-2">
                        <a href="https://instagram.com/diaramanicure" target="_blank" rel="noopener noreferrer" className="hover:text-primary/60 transition-colors" aria-label="Instagram Diara Manicure">
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a href="https://facebook.com/diaramanicure" target="_blank" rel="noopener noreferrer" className="hover:text-primary/60 transition-colors" aria-label="Facebook Diara Manicure">
                            <Facebook className="h-5 w-5" />
                        </a>
                    </div>
                    <ThemeToggle />
                </div>

                <div className="md:hidden flex items-center gap-4">
                    <div className="flex items-center gap-4 px-2">
                        <a href="https://instagram.com/diaramanicure" target="_blank" rel="noopener noreferrer" className="hover:text-primary/60 transition-colors" aria-label="Instagram Diara Manicure">
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a href="https://facebook.com/diaramanicure" target="_blank" rel="noopener noreferrer" className="hover:text-primary/60 transition-colors" aria-label="Facebook Diara Manicure">
                            <Facebook className="h-5 w-5" />
                        </a>
                    </div>
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMenu}
                        className="text-primary"
                        aria-label={isOpen ? "Zavrieť menu" : "Otvoriť menu"}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-beige dark:bg-black border-t border-primary/5 overflow-hidden"
                    >
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
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
