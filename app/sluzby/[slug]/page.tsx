import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, Check, Gift, ShoppingBasket } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/sections/Footer"
import { Button } from "@/components/ui/button"
import { GiftCardTrackedLink } from "@/components/gift-card-tracked-link"
import { defaultLanguage, translations } from "@/lib/i18n"
import { getServicePage, servicePageUrl, servicePages } from "@/lib/service-pages"
import { siteConfig } from "@/lib/site-config"

type ServiceRouteProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return servicePages.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: ServiceRouteProps): Promise<Metadata> {
  const { slug } = await params
  const page = getServicePage(slug)

  if (!page) {
    return {}
  }

  const url = servicePageUrl(page.slug)

  return {
    title: `${page.title} | diara manicure.`,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${page.title} | diara manicure.`,
      description: page.description,
      url,
      type: "website",
      locale: "sk_SK",
      images: [
        {
          url: page.image,
          width: 1200,
          height: 630,
          alt: page.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | diara manicure.`,
      description: page.description,
      images: [page.image],
    },
  }
}

export default async function ServicePage({ params }: ServiceRouteProps) {
  const { slug } = await params
  const page = getServicePage(slug)

  if (!page) {
    notFound()
  }

  const t = translations[defaultLanguage]
  const url = servicePageUrl(page.slug)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.title,
    alternateName: page.searchAliases,
    description: page.description,
    url,
    image: `${siteConfig.baseUrl}${page.image}`,
    provider: {
      "@type": "BeautySalon",
      "@id": `${siteConfig.baseUrl}/#beautysalon`,
      name: siteConfig.name,
      telephone: siteConfig.phone,
      url: siteConfig.baseUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.addressLine1,
        addressLocality: siteConfig.city,
        postalCode: siteConfig.postalCode,
        addressCountry: "SK",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Trnava",
      addressCountry: "SK",
    },
    offers: {
      "@type": "Offer",
      url: siteConfig.bookingUrl,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
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
        name: "Služby",
        item: `${siteConfig.baseUrl}/#cennik`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title,
        item: url,
      },
    ],
  }

  return (
    <>
      <JsonLd id="schema-service" data={serviceSchema} />
      <JsonLd id="schema-breadcrumbs" data={breadcrumbSchema} />
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main>
          <section className="bg-beige px-6 py-12 dark:bg-[#050403] md:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
              <div>
                <Link
                  href="/#cennik"
                  className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowLeft className="size-4" />
                  Späť na cenník
                </Link>
                <h1 className="text-4xl font-light tracking-tight text-black dark:text-white md:text-6xl">
                  {page.title}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{page.intro}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="h-12 rounded-full px-7">
                    <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                      <CalendarDays className="size-4" />
                      Pozrieť voľné termíny
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="h-12 rounded-full px-7">
                    <Link href="/#cennik">Pozrieť aktuálny cenník</Link>
                  </Button>
                </div>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm dark:bg-card">
                <Image
                  src={page.image}
                  alt={page.heroAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 520px"
                />
              </div>
            </div>
          </section>

          <section className="px-6 py-14">
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
              <InfoList title="Pre koho je vhodná" items={page.bestFor} />
              <InfoList title="Ako prebieha návšteva" items={page.process} />
              <InfoList title="Starostlivosť po návšteve" items={page.aftercare} />
            </div>
          </section>

          <section className="px-6 pb-14">
            <div className="mx-auto max-w-6xl rounded-xl border border-primary/10 bg-beige/55 p-6 dark:bg-card md:p-8">
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <Gift className="mb-4 size-5 text-primary" />
                  <h2 className="text-2xl font-light tracking-tight text-black dark:text-white">
                    Túto službu môžete darovať ako poukaz
                  </h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                    Ak hľadáte darčekový poukaz na nechty v Trnave, poukaz sa dá využiť
                    aj na službu {page.shortTitle.toLowerCase()} podľa aktuálnej ponuky
                    a stavu nechtov.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                  <Button asChild className="h-12 rounded-full px-7">
                    <Link href="/darcekove-poukazy">Pozrieť darčekové poukazy</Link>
                  </Button>
                  <Button asChild variant="outline" className="h-12 rounded-full px-7">
                    <GiftCardTrackedLink source={`service_${page.slug}_gift_card`}>
                      <ShoppingBasket className="size-4" />
                      Kúpiť poukaz
                    </GiftCardTrackedLink>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-beige px-6 py-14 dark:bg-[#050403]">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-light tracking-tight text-black dark:text-white">
                Súvisiace čítanie
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {page.relatedArticles.map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="rounded-xl border border-primary/10 bg-white/55 p-5 text-sm font-medium transition-colors hover:text-primary dark:bg-card"
                  >
                    {article.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer t={t} />
      </div>
    </>
  )
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h2 className="text-2xl font-light tracking-tight text-black dark:text-white">{title}</h2>
      <ul className="mt-5 space-y-4 text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed">
            <Check className="mt-1 size-4 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
