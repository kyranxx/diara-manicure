"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useI18n } from "@/components/language-provider"

export function ThemeToggle() {
  const { t } = useI18n()
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme")
    const shouldUseDark = storedTheme === "dark"

    document.documentElement.classList.toggle("dark", shouldUseDark)
    setIsDark(shouldUseDark)
  }, [])

  const toggleTheme = () => {
    setIsDark((current) => {
      const next = !current

      document.documentElement.classList.toggle("dark", next)
      window.localStorage.setItem("theme", next ? "dark" : "light")

      return next
    })
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${isDark ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"}`} />
      <span className="sr-only">{t.theme.toggle}</span>
    </button>
  )
}
