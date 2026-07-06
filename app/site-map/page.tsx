import type { Metadata } from 'next'
import sitemap from '../sitemap'

export const metadata: Metadata = {
    title: 'Mapa stránky | Diara Manicure',
    description: 'Prehľad verejných stránok, služieb, galérie a článkov Diara Manicure.',
}

function labelForUrl(url: string) {
    const path = new URL(url).pathname

    if (path === '/') {
        return 'Domov'
    }

    return path
        .split('/')
        .filter(Boolean)
        .map((part) => part.replace(/-/g, ' '))
        .join(' / ')
}

export default function HtmlSitemapPage() {
    const entries = sitemap()
    const uniqueEntries = Array.from(new Map(entries.map((entry) => [entry.url, entry])).values())

    return (
        <main className="container mx-auto max-w-5xl px-6 py-14">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Diara Manicure</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">Mapa stránky</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
                Prehľad verejných stránok, služieb, galérie, darčekových poukazov a článkov dostupných vo vyhľadávaní.
            </p>

            <ol className="mt-10 grid gap-3 sm:grid-cols-2" role="list">
                {uniqueEntries.map((entry) => (
                    <li key={entry.url}>
                        <a
                            href={entry.url}
                            className="block rounded-md border border-primary/15 bg-background px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                        >
                            {labelForUrl(entry.url)}
                        </a>
                    </li>
                ))}
            </ol>
        </main>
    )
}
