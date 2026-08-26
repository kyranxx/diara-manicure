import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Images } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { GallerySeoGrid } from "@/components/gallery-seo-grid"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/sections/Footer"
import { Button } from "@/components/ui/button"
import { galleryImages } from "@/lib/gallery"
import { galleryLandingUrl, galleryPages, galleryImagesForCategory } from "@/lib/gallery-pages"
import { defaultLanguage, translations } from "@/lib/i18n"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Galéria nechtov Trnava | Gélové nechty a manikúra",
  description:
    "Fotogaléria prác diara manicure. v Trnave: gélové nechty, francúzska manikúra, gél lak a jemné zdobenie nechtov.",
  alternates: {
    canonical: galleryLandingUrl,
  },
  openGraph: {
    title: "Galéria nechtov Trnava | diara manicure.",
    description:
      "Pozrite si reálne práce zo salónu diara manicure. v Trnave: gélové nechty, francúzska manikúra a jemné zdobenie.",
    url: galleryLandingUrl,
    type: "website",
    locale: "sk_SK",
    images: galleryImages.slice(0, 4).map((image) => ({
      url: image.src,
      width: 800,
      height: 1000,
      alt: image.alt,
    })),
  },
  twitter: {
    card: "summary_large_image",
    title: "Galéria nechtov Trnava | diara manicure.",
    description: "Fotogaléria gélových nechtov, manikúry a jemného zdobenia v Trnave.",
    images: [galleryImages[0]?.src ?? "/og-image.jpg"],
  },
}

export default function GalleryLandingPage() {
  const t = translations[defaultLanguage]
  const imageObjects = galleryImages.map((image) => ({
    "@type": "ImageObject",
    "@id": `${siteConfig.baseUrl}${image.src}#image`,
    contentUrl: `${siteConfig.baseUrl}${image.src}`,
    url: galleryLandingUrl,
    name: image.alt,
    caption: image.caption,
    representativeOfPage: false,
  }))
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${galleryLandingUrl}#gallery`,
    name: "Galéria nechtov Trnava",
    description: "Fotogaléria prác nechtového štúdia diara manicure. v Trnave.",
    url: galleryLandingUrl,
    image: imageObjects,
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domov", item: siteConfig.baseUrl },
      { "@type": "ListItem", position: 2, name: "Galéria", item: galleryLandingUrl },
    ],
  }

  return (
    <>
      <JsonLd id="schema-gallery" data={gallerySchema} />
      <JsonLd id="schema-gallery-breadcrumbs" data={breadcrumbSchema} />
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <section className="bg-beige px-6 py-12 dark:bg-[#050403] md:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
              <div>
                <Link
                  href="/#galeria"
                  className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowLeft className="size-4" />
                  Späť na úvodnú galériu
                </Link>
                <h1 className="text-4xl font-light tracking-tight text-black dark:text-white md:text-6xl">
                  Galéria nechtov v Trnave
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Reálne ukážky práce zo salónu diara manicure. v Trnave. Fotky sú rozdelené
                  podľa štýlu, aby sa ľahšie hľadali v Google Obrázkoch aj pri výbere pred návštevou.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="h-12 rounded-full px-7">
                    <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                      Objednať termín
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="h-12 rounded-full px-7">
                    <Link href="/sluzby/gelove-nechty-trnava">Gélové nechty</Link>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm dark:bg-card">
                <Image
                  src={galleryImages[0]?.src ?? "/og-image.jpg"}
                  alt={galleryImages[0]?.alt ?? "Galéria nechtov diara manicure Trnava"}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 520px"
                />
              </div>
            </div>
          </section>

          <section className="px-6 py-14">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 flex items-center gap-3">
                <Images className="size-5 text-primary" />
                <h2 className="text-3xl font-light tracking-tight text-black dark:text-white">
                  Vyberte štýl
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {galleryPages.map((page) => {
                  const images = galleryImagesForCategory(page.category)
                  return (
                    <Link
                      key={page.slug}
                      href={`/galeria/${page.slug}`}
                      className="rounded-xl border border-primary/10 bg-beige/55 p-5 transition-colors hover:text-primary dark:bg-card"
                    >
                      <span className="text-lg font-medium">{page.title}</span>
                      <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                        {page.description}
                      </span>
                      <span className="mt-3 block text-sm text-primary">{images.length} fotiek</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="bg-beige px-6 py-14 dark:bg-[#050403]">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-8 text-3xl font-light tracking-tight text-black dark:text-white">
                Všetky fotky
              </h2>
              <GallerySeoGrid images={galleryImages} />
            </div>
          </section>
        </main>
        <Footer t={t} />
      </div>
    </>
  )
}
