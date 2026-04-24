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
        src="/logo_spring_day.jpg"
        alt={alt}
        width={width}
        height={height}
        className={`${className ?? ""} dark:hidden`}
        loading={priority ? "eager" : undefined}
        priority={priority}
        sizes={sizes}
      />
      <Image
        src="/logo_spring_night.jpg"
        alt={alt}
        width={width}
        height={height}
        className={`${className ?? ""} hidden dark:block`}
        sizes={sizes}
      />
    </>
  )
}
