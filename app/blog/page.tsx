"use client"

import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, Calendar } from "lucide-react"

export const dynamic = "force-dynamic"

const blogPosts = [
    {
        slug: "ako-dlho-vydrzia-gelove-nechty",
        title: "Ako dlho vydržia gélové nechty? Kompletný sprievodca",
        excerpt: "Zistite, ako maximalizovať výdrž vašich gélových nechtov a na čo si dávať pozor pri starostlivosti o ne.",
        date: "5. január 2026",
        image: "/gelove-nechty-trnava-gallery-1.jpeg"
    },
    {
        slug: "rozdiel-gel-lak-gelova-modelacia",
        title: "Rozdiel medzi gél lakom a gélovou modeláciou",
        excerpt: "Neviete sa rozhodnúť medzi gél lakom a gélovou modeláciou? Vysvetlíme vám rozdiely a pomôžeme vybrať.",
        date: "5. január 2026",
        image: "/gelove-nechty-trnava-gallery-2.jpeg"
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

                        <div className="grid md:grid-cols-2 gap-6">
                            {blogPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group overflow-hidden rounded-[1.5rem] bg-beige transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-card"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>{post.date}</span>
                                        </div>
                                        <h2 className="mb-3 text-xl font-medium transition-colors group-hover:text-primary">
                                            {post.title}
                                        </h2>
                                        <p className="text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
