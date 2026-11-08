import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, CalendarDays, Clock, Gift, User } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/sections/Footer"
import { Button } from "@/components/ui/button"
import { blogContent } from "@/lib/blog-content"
import { blogAuthor, blogPostUrl, blogPosts, blogUrl, formatBlogDate, getBlogPost } from "@/lib/blog-posts"
import { defaultLanguage, translations } from "@/lib/i18n"
import { getServicePage } from "@/lib/service-pages"
import { getServices } from "@/lib/services"
import { siteConfig } from "@/lib/site-config"

type BlogRouteProps = { params: Promise<{ slug: string }> }

// The price article shows the live Bookio price list.
export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogRouteProps): Promise<Metadata> {
    const post = getBlogPost((await params).slug)
    if (!post) return {}

    const url = blogPostUrl(post.slug)
    const title = `${post.seoTitle} | diara manicure.`

    return {
        title: { absolute: title },
        description: post.description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description: post.description,
            url,
            type: "article",
            locale: "sk_SK",
            publishedTime: post.published,
            modifiedTime: post.modified,
            authors: [blogAuthor],
            images: [{ url: post.image, alt: post.imageAlt }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: post.description,
            images: [post.image],
        },
    }
}

export default async function BlogArticlePage({ params }: BlogRouteProps) {
    const post = getBlogPost((await params).slug)
    if (!post) notFound()

    const url = blogPostUrl(post.slug)
    const prices = post.showPrices ? await getServices() : []
    const services = post.services.map(getServicePage).filter((page) => page !== null)
    const otherPosts = blogPosts.filter((other) => other.slug !== post.slug).slice(0, 4)

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${url}#article`,
        mainEntityOfPage: url,
        headline: post.title,
        description: post.description,
        image: `${siteConfig.baseUrl}${post.image}`,
        datePublished: post.published,
        dateModified: post.modified,
        inLanguage: "sk-SK",
        author: { "@type": "Person", name: blogAuthor },
        publisher: {
            "@type": "BeautySalon",
            "@id": `${siteConfig.baseUrl}/#beautysalon`,
            name: siteConfig.name,
            url: siteConfig.baseUrl,
        },
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Domov", item: siteConfig.baseUrl },
            { "@type": "ListItem", position: 2, name: "Blog", item: blogUrl },
            { "@type": "ListItem", position: 3, name: post.shortTitle, item: url },
        ],
    }

    return (
        <>
            <JsonLd id="schema-article" data={articleSchema} />
            <JsonLd id="schema-breadcrumbs" data={breadcrumbSchema} />
            <div className="min-h-screen bg-background text-foreground">
                <Navbar />

                <main id="main-content" tabIndex={-1} className="pt-24 pb-16">
                    <article className="container mx-auto px-6">
                        <div className="mx-auto max-w-3xl">
                            <Link
                                href="/blog"
                                className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                            >
                                <ArrowLeft className="size-4" />
                                Späť na blog
                            </Link>

                            <header className="mb-12">
                                <h1 className="mb-6 text-4xl font-light leading-tight tracking-tight md:text-5xl">
                                    {post.title}
                                </h1>
                                <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-2">
                                        <Calendar className="size-4" />
                                        {post.modified !== post.published ? "Aktualizované " : ""}
                                        <time dateTime={post.modified}>{formatBlogDate(post.modified)}</time>
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Clock className="size-4" />
                                        {post.readMinutes} min čítania
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <User className="size-4" />
                                        {blogAuthor}
                                    </span>
                                </div>
                                <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl">
                                    <Image
                                        src={post.image}
                                        alt={post.imageAlt}
                                        fill
                                        priority
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 768px"
                                    />
                                </div>
                                <section className="rounded-2xl border border-primary/10 p-6 md:p-8">
                                    <h2 className="mb-4 text-lg font-medium">V skratke</h2>
                                    <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                                        {post.keyPoints.map((point) => (
                                            <li key={point}>{point}</li>
                                        ))}
                                    </ul>
                                </section>
                            </header>

                            <div className="text-muted-foreground [&_h2]:mb-6 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-light [&_h2]:text-foreground [&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-foreground [&_li]:leading-relaxed [&_p]:mb-6 [&_p]:leading-relaxed [&_strong]:font-semibold [&_ul]:mb-8 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6">
                                {blogContent[post.slug]}
                            </div>

                            {prices.length > 0 && (
                                <section className="my-12 rounded-2xl bg-beige p-6 dark:bg-card md:p-8">
                                    <h2 className="text-2xl font-light tracking-tight">Aktuálny cenník – diara manicure. Trnava</h2>
                                    <ul className="mt-6 divide-y divide-primary/10">
                                        {prices.map((item) => (
                                            <li key={item.title} className="flex gap-6 py-4">
                                                <div className="flex-1">
                                                    <h3 className="font-medium">{item.title}</h3>
                                                    {item.description && (
                                                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </div>
                                                <span className="shrink-0 font-medium">{item.price}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                                <Button asChild className="h-14 rounded-full px-8">
                                    <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                                        <CalendarDays className="size-4" />
                                        Objednať sa online
                                    </a>
                                </Button>
                                <Button variant="outline" asChild className="h-14 rounded-full px-8">
                                    <Link href="/#cennik">Pozrieť cenník</Link>
                                </Button>
                            </div>

                            {services.length > 0 && (
                                <section className="mt-12">
                                    <h2 className="mb-4 text-2xl font-light">Služby v Trnave</h2>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {services.map((service) => (
                                            <Link
                                                key={service.slug}
                                                href={`/sluzby/${service.slug}`}
                                                className="rounded-xl border border-primary/10 bg-white/55 p-5 text-sm font-medium transition-colors hover:text-primary dark:bg-card"
                                            >
                                                {service.title}
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}

                            <section className="mt-12 rounded-2xl bg-beige p-8 dark:bg-card">
                                <Gift className="mb-4 size-5 text-primary" />
                                <h2 className="mb-4 text-2xl font-light">Chcete nechty darovať?</h2>
                                <p className="mb-4 leading-relaxed text-muted-foreground">
                                    Darčekový poukaz na nechty v Trnave môže obdarovaná osoba využiť na gél lak, gélové
                                    nechty alebo manikúru podľa aktuálnej ponuky.
                                </p>
                                <Link href="/darcekove-poukazy" className="font-medium text-primary hover:underline">
                                    Pozrieť darčekové poukazy
                                </Link>
                            </section>

                            <section className="mt-12">
                                <h2 className="mb-4 text-2xl font-light">Ďalšie články</h2>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {otherPosts.map((other) => (
                                        <Link
                                            key={other.slug}
                                            href={`/blog/${other.slug}`}
                                            className="rounded-xl border border-primary/10 bg-white/55 p-5 text-sm font-medium transition-colors hover:text-primary dark:bg-card"
                                        >
                                            {other.shortTitle}
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </article>
                </main>

                <Footer t={translations[defaultLanguage]} />
            </div>
        </>
    )
}
