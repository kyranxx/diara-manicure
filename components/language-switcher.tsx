"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { languages } from "@/lib/i18n"
import { useI18n } from "@/components/language-provider"

type LanguageSwitcherProps = {
  className?: string
  variant?: "inline" | "compact"
}

type FlagName = (typeof languages)[number]["flag"]

function FlagIcon({ flag }: { flag: FlagName }) {
  if (flag === "gb") {
    return (
      <svg viewBox="0 0 24 16" className="h-3.5 w-5 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" aria-hidden="true">
        <rect width="24" height="16" fill="#012169" />
        <path d="M0 0l24 16M24 0L0 16" stroke="#fff" strokeWidth="3.2" />
        <path d="M0 0l24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.5" />
        <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5.2" />
        <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="3" />
      </svg>
    )
  }

  if (flag === "ua") {
    return (
      <svg viewBox="0 0 24 16" className="h-3.5 w-5 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" aria-hidden="true">
        <rect width="24" height="8" fill="#0057B7" />
        <rect y="8" width="24" height="8" fill="#FFD700" />
      </svg>
    )
  }

  if (flag === "rs") {
    return (
      <svg viewBox="0 0 24 16" className="h-3.5 w-5 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" aria-hidden="true">
        <rect width="24" height="5.33" fill="#C6363C" />
        <rect y="5.33" width="24" height="5.34" fill="#0C4076" />
        <rect y="10.67" width="24" height="5.33" fill="#fff" />
        <path d="M7.2 4.2h4.2v4.9c0 1.4-1.1 2.5-2.1 2.9-1-.4-2.1-1.5-2.1-2.9V4.2Z" fill="#E3B23C" />
        <path d="M7.8 4.9h3v4.1c0 .9-.7 1.7-1.5 2-.8-.3-1.5-1.1-1.5-2V4.9Z" fill="#C6363C" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 16" className="h-3.5 w-5 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" aria-hidden="true">
      <rect width="24" height="5.33" fill="#fff" />
      <rect y="5.33" width="24" height="5.34" fill="#0B4EA2" />
      <rect y="10.67" width="24" height="5.33" fill="#EE1C25" />
      <path d="M7.1 4.1h4.2v4.9c0 1.4-1.1 2.5-2.1 2.9-1-.4-2.1-1.5-2.1-2.9V4.1Z" fill="#EE1C25" />
      <path d="M8.1 6.2h2.2M9.2 5.3v4.4M8.2 7.7h2" stroke="#fff" strokeWidth=".7" strokeLinecap="round" />
      <path d="M7.7 9.1c.8-.5 2.2-.5 3 0-.2.9-.8 1.5-1.5 1.8-.7-.3-1.3-.9-1.5-1.8Z" fill="#0B4EA2" />
    </svg>
  )
}

export function LanguageSwitcher({ className, variant = "inline" }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useI18n()
  const [open, setOpen] = React.useState(false)
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const activeLanguage = languages.find((item) => item.code === language) ?? languages[0]

  React.useEffect(() => {
    if (!open || variant !== "compact") return

    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, variant])

  if (variant === "compact") {
    return (
      <div ref={wrapperRef} className={cn("relative", className)}>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-primary/10 bg-white/65 px-2 text-xs font-semibold text-foreground shadow-sm transition-colors hover:bg-white dark:bg-white/10 dark:hover:bg-white/15"
          aria-label={t.languageSwitcher.label}
          aria-expanded={open}
        >
          <FlagIcon flag={activeLanguage.flag} />
          <span className="hidden min-[360px]:inline">{activeLanguage.shortLabel}</span>
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-primary/10 bg-white p-1 shadow-xl dark:bg-zinc-950">
            {languages.map((item) => {
              const selected = item.code === language

              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setLanguage(item.code)
                    setOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-primary/5 dark:hover:bg-white/10"
                  )}
                  aria-pressed={selected}
                >
                  <FlagIcon flag={item.flag} />
                  <span className="font-medium">{item.shortLabel}</span>
                  <span className="text-xs opacity-70">{item.label}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "inline-flex h-9 items-center gap-0.5 rounded-full border border-primary/10 bg-white/45 p-0.5 shadow-sm dark:bg-white/10",
        className
      )}
      role="group"
      aria-label={t.languageSwitcher.label}
    >
      {languages.map((item) => {
        const selected = item.code === language

        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLanguage(item.code)}
            className={cn(
              "inline-flex h-7 items-center justify-center gap-1.5 rounded-full px-2 text-[11px] font-semibold transition-all duration-200",
              selected
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-foreground/75 hover:bg-white/70 hover:text-foreground dark:hover:bg-white/15"
            )}
            aria-pressed={selected}
            aria-label={`${t.languageSwitcher.changeTo} ${item.label}`}
            title={`${t.languageSwitcher.changeTo} ${item.label}`}
          >
            <FlagIcon flag={item.flag} />
            <span>{item.shortLabel}</span>
          </button>
        )
      })}
    </div>
  )
}
