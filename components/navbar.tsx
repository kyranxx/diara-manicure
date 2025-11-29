"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const { resolvedTheme } = useTheme()

    const toggleMenu = () => setIsOpen(!isOpen)

    const menuItems = [
        { href: "#cennik", label: "Cenník" },
        { href: "#recenzie", label: "Recenzie" },
        { href: "#galeria", label: "Galéria" },
        { href: "#faq", label: "FAQ" },
        { href: "#visit", label: "Kontakt" },
    ]

    return (
        <nav className="w-full bg-beige dark:bg-black z-50 relative">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <a
                        href="https://m.me/diaramanicure"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative z-50"
                        aria-label="Napíšte nám na Messenger"
                    >
                        {/* Messenger Button */}
                        <div className="relative">
                            {/* Pulse animation ring */}
                            <div className="absolute inset-0 rounded-full bg-[#d4b5a0] opacity-75 animate-ping" />

                            {/* Main button */}
                            <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#d4b5a0] to-[#c19a7a] shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
                                {/* Facebook Messenger Icon - using SVG for exact look */}
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-7 h-7 text-white"
                                    fill="currentColor"
                                >
                                    <path d="M12 2C6.477 2 2 6.145 2 11.256c0 2.91 1.445 5.502 3.707 7.206V22l3.39-1.858c.905.25 1.857.385 2.842.385 5.523 0 10-4.145 10-9.256C22 6.145 17.523 2 12 2zm.995 12.463l-2.557-2.73-4.992 2.73 5.49-5.828 2.618 2.73 4.932-2.73-5.491 5.828z" />
                                </svg>
                            </div>

                            {/* Tooltip */}
                            <div className="absolute top-full left-0 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-max">
                                <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-xl relative">
                                    Napíšte nám na Messenger
                                    <div className="absolute bottom-full left-6 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-900" />
                                </div>
                            </div>
                        </div>
                    </a>
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
