"use client"

import { motion } from "framer-motion"

export function PricingSkeleton() {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
            <p className="text-lg text-muted-foreground font-light animate-pulse">
                Načítavam cenník...
            </p>
        </div>
    )
}
