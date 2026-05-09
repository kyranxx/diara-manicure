import Image from "next/image"

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
  return (
    <>
      <Image
        src="/logo_spring_day-780.webp"
        alt={alt}
        width={width}
        height={height}
        className={`${className ?? ""} dark:hidden`}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
      />
      <Image
        src="/logo_spring_night-780.webp"
        alt={alt}
        width={width}
        height={height}
        className={`${className ?? ""} hidden dark:block`}
        loading="lazy"
        decoding="async"
        sizes={sizes}
      />
    </>
  )
}
