import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { GallerySeoGrid } from "@/components/gallery-seo-grid"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/sections/Footer"
import { Button } from "@/components/ui/button"
import {
  galleryImagesForCategory,
  galleryLandingUrl,
  galleryPages,
  galleryPageUrl,
  getGalleryPage,
} from "@/lib/gallery-pages"
import { defaultLanguage, translations } from "@/lib/i18n"
import { siteConfig } from "@/lib/site-config"

type GalleryRouteProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return galleryPages.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: GalleryRouteProps): Promise<Metadata> {
  const { slug } = await params
  const page = getGalleryPage(slug)

  if (!page) return {}

  const url = galleryPageUrl(page.slug)
  const images = galleryImagesForCategory(page.category)

  return {
    title: page.metaTitle,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url,
      type: "website",
      locale: "sk_SK",
      images: images.slice(0, 4).map((image) => ({
        url: image.src,
        width: 800,
        height: 1000,
        alt: image.alt,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.description,
      images: [images[0]?.src ?? "/og-image.jpg"],
    },
  }
}

export default async function GalleryCategoryPage({ params }: GalleryRouteProps) {
  const { slug } = await params
  const page = getGalleryPage(slug)

  if (!page) {
    notFound()
  }

  const t = translations[defaultLanguage]
  const url = galleryPageUrl(page.slug)
  const images = galleryImagesForCategory(page.category)
  const imageObjects = images.map((image) => ({
    "@type": "ImageObject",
    "@id": `${siteConfig.baseUrl}${image.src}#image`,
    contentUrl: `${siteConfig.baseUrl}${image.src}`,
    url,
    name: image.alt,
    caption: image.caption,
    representativeOfPage: false,
  }))
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${url}#gallery`,
    name: page.title,
    description: page.description,
    url,
    about: page.searchPhrase,
    image: imageObjects,
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domov", item: siteConfig.baseUrl },
      { "@type": "ListItem", position: 2, name: "Galéria", item: galleryLandingUrl },
      { "@type": "ListItem", position: 3, name: page.title, item: url },
    ],
  }

  return (
    <>
      <JsonLd id="schema-gallery-category" data={gallerySchema} />
      <JsonLd id="schema-gallery-category-breadcrumbs" data={breadcrumbSchema} />
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <section className="bg-beige px-6 py-12 dark:bg-[#050403] md:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
              <div>
                <Link
                  href="/galeria"
                  className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowLeft className="size-4" />
                  Späť na galériu
                </Link>
                <h1 className="text-4xl font-light tracking-tight text-black dark:text-white md:text-6xl">
                  {page.title}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{page.intro}</p>
                <p className="mt-4 text-sm font-medium text-primary">{page.searchPhrase}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="h-12 rounded-full px-7">
                    <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                      <CalendarDays className="size-4" />
                      Objednať termín
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="h-12 rounded-full px-7">
                    <Link href="/#cennik">Pozrieť cenník</Link>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm dark:bg-card">
                <Image
                  src={images[0]?.src ?? "/og-image.jpg"}
                  alt={images[0]?.alt ?? page.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 520px"
                />
              </div>
            </div>
          </section>

          {page.guide ? (
            <section className="bg-beige/55 px-6 py-14 dark:bg-card/45">
              <div className="mx-auto max-w-6xl">
                <div className="max-w-4xl">
                  <h2 className="text-3xl font-light tracking-tight text-black dark:text-white md:text-4xl">
                    {page.guide.heading}
                  </h2>
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {page.guide.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {page.guide.options.map((option) => (
                    <article
                      key={option.title}
                      className="rounded-xl border border-primary/10 bg-white/60 p-6 dark:bg-background/60"
                    >
                      <h3 className="text-lg font-medium text-black dark:text-white">{option.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted-foreground">{option.description}</p>
                    </article>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/sluzby/gelove-nechty-trnava"
                    className="text-sm font-medium text-primary underline underline-offset-4"
                  >
                    Ako prebieha modelácia gélových nechtov
                  </Link>
                  <Link
                    href="/#cennik"
                    className="text-sm font-medium text-primary underline underline-offset-4"
                  >
                    Aktuálny cenník služieb
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          <section className="px-6 py-14">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-8 text-3xl font-light tracking-tight text-black dark:text-white">
                Fotky: {page.title}
              </h2>
              <GallerySeoGrid images={images} />
            </div>
          </section>
        </main>
        <Footer t={t} />
      </div>
    </>
  )
}
