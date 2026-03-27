"use client"

import * as React from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

interface ThemeAwareLogoProps {
  alt: string
  className?: string
  height: number
  priority?: boolean
  sizes?: string
  width: number
}

export function ThemeAwareLogo({
  alt,
  className,
  height,
  priority = false,
  sizes,
  width,
}: ThemeAwareLogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const src =
    mounted && resolvedTheme === "dark"
      ? "/logo_easter_night.png"
      : "/logo_easter_day.png"

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  )
}
