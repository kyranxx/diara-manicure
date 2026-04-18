"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { ArrowLeft } from "lucide-react"

export const dynamic = "force-dynamic"

// Placeholder blog posts - to be replaced with actual content
const blogPosts = [
    {
        slug: "ako-dlho-vydrzia-gelove-nechty",
        title: "Ako dlho vydržia gélové nechty?",
        excerpt: "Zistite, ako maximalizovať výdrž vašich gélových nechtov a na čo si dávať pozor pri starostlivosti o ne.",
        date: "Pripravujeme",
        image: "/gelove-nechty-trnava-gallery-1.jpeg"
    },
    {
        slug: "rozdiel-gel-lak-gelova-modelacia",
        title: "Rozdiel medzi gél lakom a gélovou modeláciou",
        excerpt: "Neviete sa rozhodnúť medzi gél lakom a gélovou modeláciou? Vysvetlíme vám rozdiely a pomôžeme vybrať.",
        date: "Pripravujeme",
        image: "/gelove-nechty-trnava-gallery-2.jpeg"
    },
    {
        slug: "starostlivost-o-gelove-nechty-doma",
        title: "Starostlivosť o gélové nechty doma",
        excerpt: "Praktické tipy ako sa starať o gélové nechty medzi návštevami salóna pre maximálnu výdrž a krásu.",
        date: "Pripravujeme",
        image: "/gelove-nechty-trnava-gallery-3.jpeg"
    },
    {
        slug: "trendy-nail-art-2026",
        title: "Trendy v nail arte pre rok 2026",
        excerpt: "Objavte najnovšie trendy v nail arte - od minimalistických dizajnov po výrazné umelecké diela na nechtoch.",
        date: "Pripravujeme",
        image: "/gelove-nechty-trnava-gallery-4.jpeg"
    }
]

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Späť na hlavnú stránku
                        </Link>

                        <div className="text-center mb-16">
                            <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-tight">
                                Blog
                            </h1>
                            <div className="w-24 h-1 bg-primary/20 mx-auto mb-6 rounded-full" />
                            <p className="text-lg text-muted-foreground">
                                Tipy, trendy a novinky zo sveta nechtov
                            </p>
                        </div>

                        {/* Coming Soon Notice */}
                        <div className="bg-beige dark:bg-card p-8 rounded-[2rem] text-center mb-12">
                            <span className="text-4xl mb-4 block">📝</span>
                            <h2 className="text-2xl font-light mb-4">Blog sa pripravuje</h2>
                            <p className="text-muted-foreground">
                                Čoskoro tu nájdete užitočné články o starostlivosti o nechty, trendoch a tipoch od našich odborníkov.
                            </p>
                        </div>

                        {/* Preview of Upcoming Posts */}
                        <h2 className="text-2xl font-light mb-8 text-center">Pripravované články</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {blogPosts.map((post) => (
                                <div
                                    key={post.slug}
                                    className="bg-beige dark:bg-card p-6 rounded-[1.5rem] opacity-70 cursor-not-allowed"
                                >
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                                            {post.date}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-medium mb-2">{post.title}</h3>
                                    <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
