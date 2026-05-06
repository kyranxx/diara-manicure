/* eslint-disable @next/next/no-img-element */
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
      <img
        src="/logo_spring_day-780.webp"
        srcSet="/logo_spring_day-390.webp 390w, /logo_spring_day-780.webp 780w"
        alt={alt}
        width={width}
        height={height}
        className={`${className ?? ""} dark:hidden`}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
      />
      <img
        src="/logo_spring_night-780.webp"
        srcSet="/logo_spring_night-390.webp 390w, /logo_spring_night-780.webp 780w"
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
