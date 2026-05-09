import { CalendarDays } from "lucide-react"

type MobileBookingBarProps = {
  href: string
  label: string
}

export function MobileBookingBar({ href, label }: MobileBookingBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/10 bg-background/95 px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto flex h-12 max-w-md items-center justify-center gap-2 rounded-full bg-primary px-5 text-base font-medium text-primary-foreground"
      >
        <CalendarDays className="size-4" aria-hidden="true" />
        {label}
      </a>
    </div>
  )
}
