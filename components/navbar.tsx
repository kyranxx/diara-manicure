"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useTheme } from "next-themes"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const { resolvedTheme } = useTheme()
    const logoSrc = resolvedTheme === "dark" ? "/logo_black.png" : "/logo.png"

    const toggleMenu = () => setIsOpen(!isOpen)

    const menuItems = [
        { href: "#cennik", label: "Cenník" },
        { href: "#recenzie", label: "Recenzie" },
        { href: "#galeria", label: "Galéria" },
        { href: "#visit", label: "Kontakt" },
    ]

    return (
        <nav className="w-full bg-beige z-50 border-b border-primary/5 relative">
            <div className="container mx-auto px-6 h-24 flex items-center justify-between">
                <Link href="/" className="flex-shrink-0">
                    <Image
                        src={logoSrc}
                        alt="DIARA"
                        width={160}
                        height={80}
                        className="h-16 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Menu */}
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
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <ThemeToggle />
                    <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-primary">
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-beige border-t border-primary/5 overflow-hidden"
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
