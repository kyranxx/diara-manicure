import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { ArrowLeft, CalendarDays, Check, MapPin } from "lucide-react"
import { AnalyticsRuntime } from "@/components/analytics-runtime"
import { CookieConsentMarkup } from "@/components/cookie-consent-markup"
import { MobileBookingBar } from "@/components/mobile-booking-bar"
import { Navbar } from "@/components/navbar"
import SchemaMarkup from "@/components/schema-markup"
import { Footer } from "@/components/sections/Footer"
import { GoogleReviewsSection } from "@/components/sections/Testimonials"
import { WebMcpScript } from "@/components/webmcp-script"
import { galleryImageAlt, galleryImageCaption, galleryImageSrc } from "@/lib/gallery"
import { defaultLanguage, translations } from "@/lib/i18n"
import { getRelatedServicePages, type ServicePage } from "@/lib/service-pages"
import { siteConfig } from "@/lib/site-config"

type ServiceLandingPageProps = {
  page: ServicePage
}

function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export function ServiceLandingPage({ page }: ServiceLandingPageProps) {
  const t = translations[defaultLanguage]
  const pageUrl = `${siteConfig.baseUrl}/${page.slug}`
  const heroImageId = page.galleryImageIds[0]
  const relatedPages = getRelatedServicePages(page.slug)

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: page.serviceName,
    serviceType: page.primaryKeyword,
    description: page.heroIntro,
    areaServed: {
      "@type": "City",
      name: "Trnava",
      addressCountry: "SK",
    },
    provider: {
      "@id": `${siteConfig.baseUrl}/#beautysalon`,
    },
    url: pageUrl,
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "diara manicure.",
        item: siteConfig.baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.heroTitle,
        item: pageUrl,
      },
    ],
  }

  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="diara manicure." />
        <meta property="og:image" content={galleryImageSrc(heroImageId)} />
        <meta property="og:image:alt" content={galleryImageAlt(heroImageId)} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.metaTitle} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={galleryImageSrc(heroImageId)} />
      </Head>
      <Script id={`schema-service-${page.slug}`} type="application/ld+json">
        {jsonLd(serviceSchema)}
      </Script>
      <Script id={`schema-faq-${page.slug}`} type="application/ld+json">
        {jsonLd(faqSchema)}
      </Script>
      <Script id={`schema-breadcrumb-${page.slug}`} type="application/ld+json">
        {jsonLd(breadcrumbSchema)}
      </Script>

      <div className="min-h-screen bg-background pb-20 text-foreground selection:bg-primary/20 md:pb-0">
        <Navbar />

        <main className="bg-beige dark:bg-[#050403]">
          <section className="container mx-auto px-6 py-10 md:py-16">
            <div className="mx-auto max-w-6xl">
              <Link
                href="/"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Späť na hlavnú stránku
              </Link>

              <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
                <div>
                  <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    {page.eyebrow}
                  </p>
                  <h1 className="text-4xl font-light tracking-tight text-black md:text-6xl dark:text-white">
                    {page.heroTitle}
                  </h1>
                  <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                    {page.heroIntro}
                  </p>
                  <p className="mt-4 text-base font-medium text-black dark:text-white">
                    {page.priceNote}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={siteConfig.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
                    >
                      <CalendarDays className="size-4" aria-hidden="true" />
                      {page.bookingLabel}
                    </a>
                    <Link
                      href="/#cennik"
                      className="inline-flex h-14 items-center justify-center rounded-full border border-primary/15 bg-white/55 px-8 text-base font-medium transition-colors hover:bg-white dark:bg-card"
                    >
                      Pozrieť celý cenník
                    </Link>
                  </div>
                </div>

                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm dark:bg-card">
                  <Image
                    src={galleryImageSrc(heroImageId)}
                    alt={galleryImageAlt(heroImageId)}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 520px"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-background py-12 dark:bg-[#050403]">
            <div className="container mx-auto px-6">
              <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-4">
                {page.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-xl border border-primary/10 bg-beige/60 p-5 dark:bg-card"
                  >
                    <Check className="mb-3 size-5 text-primary" aria-hidden="true" />
                    <p className="text-sm font-medium leading-relaxed text-black dark:text-white">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="galeria" className="container mx-auto px-6 py-14">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-light tracking-tight text-black md:text-5xl dark:text-white">
                  Ukážky práce
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                  Fotky sú z galérie salónu diara manicure. v Trnave.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {page.galleryImageIds.map((id) => (
                  <figure
                    key={id}
                    className="overflow-hidden rounded-xl border border-primary/10 bg-white/55 shadow-sm dark:bg-card"
                  >
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={galleryImageSrc(id)}
                        alt={galleryImageAlt(id)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <figcaption className="px-4 py-3 text-sm font-medium text-muted-foreground">
                      {galleryImageCaption(id)}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          <GoogleReviewsSection t={t} />

          <section className="container mx-auto px-6 py-14">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 className="text-3xl font-light tracking-tight text-black md:text-5xl dark:text-white">
                  Časté otázky
                </h2>
                <div className="mt-6 flex items-start gap-3 text-muted-foreground">
                  <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <p>
                    {siteConfig.addressLine1}, {siteConfig.postalCode} {siteConfig.city}. Parkovanie zdarma pri salóne.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {page.faq.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-xl border border-primary/10 bg-white/55 p-6 dark:bg-card"
                  >
                    <h3 className="text-lg font-medium text-black dark:text-white">{item.question}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-background py-12 dark:bg-[#050403]">
            <div className="container mx-auto px-6">
              <div className="mx-auto max-w-5xl text-center">
                <h2 className="text-3xl font-light tracking-tight text-black md:text-4xl dark:text-white">
                  Ďalšie služby
                </h2>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {relatedPages.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/${related.slug}`}
                      className="rounded-full border border-primary/10 bg-beige/60 px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground dark:bg-card"
                    >
                      {related.shortTitle}
                    </Link>
                  ))}
                </div>

                <a
                  href={siteConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
                >
                  <CalendarDays className="size-4" aria-hidden="true" />
                  {page.bookingLabel}
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer t={t} />
        <MobileBookingBar href={siteConfig.bookingUrl} label={page.bookingLabel} />
      </div>
      <SchemaMarkup />
      <WebMcpScript />
      <AnalyticsRuntime />
      <CookieConsentMarkup t={t.cookie} />
    </>
  )
}
