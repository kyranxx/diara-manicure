import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, Calendar } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { siteConfig } from "@/lib/site-config"

const pageUrl = `${siteConfig.baseUrl}/blog`

const blogPosts = [
    {
        slug: "ako-dlho-vydrzia-gelove-nechty",
        title: "Ako dlho vydržia gélové nechty? Kompletný sprievodca",
        excerpt: "Zistite, ako maximalizovať výdrž vašich gélových nechtov a na čo si dávať pozor pri starostlivosti o ne.",
        date: "5. január 2026",
        datePublished: "2026-01-05",
        image: "/gelove-nechty-trnava-gallery-1.jpeg"
    },
    {
        slug: "rozdiel-gel-lak-gelova-modelacia",
        title: "Rozdiel medzi gél lakom a gélovou modeláciou",
        excerpt: "Neviete sa rozhodnúť medzi gél lakom a gélovou modeláciou? Vysvetlíme vám rozdiely a pomôžeme vybrať.",
        date: "5. január 2026",
        datePublished: "2026-01-05",
        image: "/gelove-nechty-trnava-gallery-2.jpeg"
    }
]

export const metadata: Metadata = {
    title: "Blog o nechtoch v Trnave",
    description:
        "Praktické články od diara manicure. o gélových nechtoch, gél laku, manikúre a starostlivosti o nechty v Trnave.",
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title: "Blog o nechtoch v Trnave",
        description:
            "Praktické články od diara manicure. o gélových nechtoch, gél laku, manikúre a starostlivosti o nechty v Trnave.",
        url: pageUrl,
        type: "website",
        locale: "sk_SK",
        images: [
            {
                url: "/og-image.jpg?v=20260407",
                width: 1200,
                height: 630,
                alt: "diara manicure. - gélové nechty a manikúra v Trnave",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog o nechtoch v Trnave",
        description:
            "Praktické články od diara manicure. o gélových nechtoch, gél laku, manikúre a starostlivosti o nechty v Trnave.",
        images: ["/og-image.jpg?v=20260407"],
    },
}

export default function BlogPage() {
    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Blog o nechtoch v Trnave",
        description:
            "Praktické články od diara manicure. o gélových nechtoch, gél laku, manikúre a starostlivosti o nechty v Trnave.",
        inLanguage: "sk-SK",
        hasPart: blogPosts.map((post) => ({
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.datePublished,
            author: {
                "@type": "Person",
                name: "Andrea Hečková",
            },
            url: `${pageUrl}/${post.slug}`,
            image: `${siteConfig.baseUrl}${post.image}`,
        })),
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Domov",
                item: siteConfig.baseUrl,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: pageUrl,
            },
        ],
    }

    return (
        <>
            <JsonLd id="schema-blog-collection" data={collectionSchema} />
            <JsonLd id="schema-blog-breadcrumbs" data={breadcrumbSchema} />
            <div className="min-h-screen bg-background text-foreground">
                <Navbar />

                <main className="pt-24 pb-16">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
                            >
                                <ArrowLeft className="size-4" />
                                Späť na hlavnú stránku
                            </Link>

                            <div className="text-center mb-16">
                                <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-tight">
                                    Blog
                                </h1>
                                <div className="w-24 h-1 bg-primary/20 mx-auto mb-6 rounded-full" />
                                <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
                                    Tipy, trendy a praktické odpovede o gélových nechtoch, gél laku a manikúre v Trnave.
                                    Píšeme hlavne o tom, čo klientky riešia pred rezerváciou: výdrž, vhodný typ služby,
                                    domáca starostlivosť, bezpečné odstránenie materiálu a rozdiel medzi prirodzeným
                                    výsledkom a pevnejšou modeláciou.
                                </p>
                            </div>

                            <div className="mb-10 border-y border-primary/10 py-6 text-sm leading-7 text-muted-foreground">
                                <p>
                                    Každý článok nadväzuje na reálne otázky zo salónu diara manicure. a pomáha vybrať
                                    službu podľa stavu prírodných nechtov, životného štýlu a očakávanej údržby. Ak
                                    neviete, či je pre vás lepší gél lak, gélová modelácia alebo klasická suchá manikúra,
                                    začnite tu a potom si pozrite cenník alebo voľný termín.
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
                                                <Calendar className="size-4" />
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
        </>
    )
}
