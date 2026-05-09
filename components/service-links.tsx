import { servicePages } from "@/lib/service-pages"
import Link from "next/link"

export function ServiceLinks() {
  return (
    <nav aria-label="Služby diara manicure." className="flex flex-wrap justify-center gap-2">
      {servicePages.map((page) => (
        <Link
          key={page.slug}
          href={`/${page.slug}`}
          className="rounded-full border border-primary/10 bg-white/55 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground dark:bg-card"
        >
          {page.shortTitle}
        </Link>
      ))}
    </nav>
  )
}
