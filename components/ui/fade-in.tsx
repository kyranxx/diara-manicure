"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function FadeIn({
    children,
    delay = 0,
    className,
    direction = "up"
}: {
    children: React.ReactNode,
    delay?: number,
    className?: string,
    direction?: "up" | "down" | "left" | "right"
}) {
    const directionOffset = {
        up: { y: 20, x: 0 },
        down: { y: -20, x: 0 },
        left: { x: 20, y: 0 },
        right: { x: -20, y: 0 }
    }

    return (
        <motion.div
            initial={{ opacity: 0, ...directionOffset[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    )
}
