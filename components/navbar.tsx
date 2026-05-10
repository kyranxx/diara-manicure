import { Menu, Moon, Sun } from "lucide-react"
import { FacebookIcon, InstagramIcon } from "@/components/social-icons"
import { defaultLanguage, languages, translations, type Language, type TranslationMessages } from "@/lib/i18n"
import { siteConfig } from "@/lib/site-config"

type NavbarProps = {
  language?: Language
  t?: TranslationMessages
}

function languageHomeHref(language: Language) {
  return language === defaultLanguage ? "/" : `/${language}`
}

function sectionHref(language: Language, id: string) {
  return language === defaultLanguage ? `/#${id}` : `/${language}#${id}`
}

function ThemeToggle({ label }: { label: string }) {
  return (
    <button
      type="button"
      data-theme-toggle
      className="relative inline-flex size-10 items-center justify-center rounded-md border border-input bg-background transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <Sun className="size-[1.2rem] transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{label}</span>
    </button>
  )
}

function SocialLinks({ centered = false }: { centered?: boolean }) {
  return (
    <div className={`flex items-center gap-4 px-1 ${centered ? "justify-center" : ""}`}>
      <a
        href={siteConfig.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex size-9 items-center justify-center"
        aria-label="Instagram Diara Manicure"
      >
        <InstagramIcon className="size-6" />
      </a>
      <a
        href={siteConfig.facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex size-9 items-center justify-center"
        aria-label="Facebook Diara Manicure"
      >
        <FacebookIcon className="size-6" />
      </a>
    </div>
  )
}

export function Navbar({ language = defaultLanguage, t = translations[defaultLanguage] }: NavbarProps) {
  const menuItems = [
    { href: sectionHref(language, "cennik"), label: t.nav.items.services },
    { href: sectionHref(language, "darcekove-poukazky"), label: t.nav.items.giftCards },
    { href: sectionHref(language, "galeria"), label: t.nav.items.gallery },
    { href: sectionHref(language, "faq"), label: t.nav.items.faq },
    { href: sectionHref(language, "visit"), label: t.nav.items.contact },
  ]
  const languageSwitcher = (
    <div
      className="flex items-center gap-0.5 rounded-full border border-primary/10 bg-white/45 p-0.5 text-[11px] font-semibold dark:bg-white/10"
      aria-label={t.languageSwitcher.label}
    >
      {languages.map((item) => {
        const active = item.code === language
        return (
          <a
            key={item.code}
            href={languageHomeHref(item.code)}
            hrefLang={item.htmlLang}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "rounded-full bg-primary px-2 py-1 text-primary-foreground"
                : "rounded-full px-2 py-1 text-foreground/70 transition-colors hover:bg-white/70 hover:text-foreground dark:hover:bg-white/15"
            }
          >
            {item.shortLabel}
          </a>
        )
      })}
    </div>
  )

  return (
    <nav className="relative z-50 w-full bg-beige dark:bg-[#050403]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <a href={languageHomeHref(language)} className="flex-shrink-0 group">
          <span className="text-lg font-light tracking-tighter transition-colors group-hover:text-primary sm:text-xl">
            diara <span className="font-medium text-primary">manicure.</span>
          </span>
        </a>

        <div className="flex items-center gap-2 xl:gap-6">
          <div className="hidden items-center gap-6 xl:flex">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium uppercase tracking-wide transition-colors hover:text-primary/60"
              >
                {item.label}
              </a>
            ))}
            <SocialLinks />
          </div>
          {languageSwitcher}
          <div className="hidden xl:block">
            <ThemeToggle label={t.theme.toggle} />
          </div>

          <div data-mobile-menu-root className="relative xl:hidden">
            <button
              type="button"
              data-mobile-menu-toggle
              data-open-label={t.nav.openMenu}
              data-close-label={t.nav.closeMenu}
              className="inline-flex size-10 items-center justify-center rounded-md border border-primary/15 text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label={t.nav.openMenu}
              aria-expanded="false"
              aria-controls="mobile-menu"
            >
              <Menu className="size-6" />
            </button>

            <div
              id="mobile-menu"
              data-mobile-menu
              hidden
              className="absolute right-0 top-full z-50 mt-3 w-72 rounded-xl border border-primary/25 bg-beige p-6 shadow-xl ring-1 ring-black/5 dark:bg-[#050403] dark:ring-white/10"
            >
              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    data-mobile-menu-close
                    className="border-b border-primary/10 py-2 text-lg font-medium"
                  >
                    {item.label}
                  </a>
                ))}
                <SocialLinks centered />
                <div className="flex justify-center pt-1">
                  <ThemeToggle label={t.theme.toggle} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
