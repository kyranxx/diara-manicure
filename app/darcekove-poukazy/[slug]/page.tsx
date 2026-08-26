import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Check, ShoppingBasket } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/sections/Footer"
import { Button } from "@/components/ui/button"
import { GiftCardTrackedLink } from "@/components/gift-card-tracked-link"
import { defaultLanguage, translations } from "@/lib/i18n"
import {
  getGiftCardIntentPage,
  giftCardImagePath,
  giftCardIntentPageUrl,
  giftCardIntentPages,
} from "@/lib/gift-card-pages"
import { siteConfig } from "@/lib/site-config"

type GiftCardIntentRouteProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return giftCardIntentPages.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: GiftCardIntentRouteProps): Promise<Metadata> {
  const { slug } = await params
  const page = getGiftCardIntentPage(slug)

  if (!page) {
    return {}
  }

  const url = giftCardIntentPageUrl(page.slug)

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
      images: [
        {
          url: giftCardImagePath,
          width: 1200,
          height: 630,
          alt: "Darčekový poukaz diara manicure. Trnava",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.description,
      images: [giftCardImagePath],
    },
  }
}

export default async function GiftCardIntentPage({ params }: GiftCardIntentRouteProps) {
  const { slug } = await params
  const page = getGiftCardIntentPage(slug)

  if (!page) {
    notFound()
  }

  const t = translations[defaultLanguage]
  const url = giftCardIntentPageUrl(page.slug)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
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
        name: "Domov",
        item: siteConfig.baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Darčekové poukazy",
        item: `${siteConfig.baseUrl}/darcekove-poukazy`,
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
      <JsonLd id="schema-gift-card-intent-faq" data={faqSchema} />
      <JsonLd id="schema-gift-card-intent-breadcrumbs" data={breadcrumbSchema} />

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main id="main-content" tabIndex={-1}>
          <section className="bg-beige px-6 py-12 dark:bg-[#050403] md:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
              <div>
                <Link
                  href="/darcekove-poukazy"
                  className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowLeft className="size-4" />
                  Späť na darčekové poukazy
                </Link>
                <h1 className="text-4xl font-light tracking-tight text-black dark:text-white md:text-6xl">
                  {page.h1}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{page.intro}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{page.buyerNote}</p>
                <p className="mt-4 text-sm font-medium text-black dark:text-white">
                  Vhodné, keď hľadáte: {page.primaryPhrase}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="h-12 rounded-full px-7">
                    <GiftCardTrackedLink source={`gift_card_intent_${page.slug}`}>
                      <ShoppingBasket className="size-4" />
                      Kúpiť poukaz cez Bookio
                    </GiftCardTrackedLink>
                  </Button>
                  <Button asChild variant="outline" className="h-12 rounded-full px-7">
                    <Link href="/darcekove-poukazy">Ako poukazy fungujú</Link>
                  </Button>
                </div>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm dark:bg-card">
                <Image
                  src={giftCardImagePath}
                  alt={`${page.title} - darčekový poukaz diara manicure. Trnava`}
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
              <InfoList title="Prečo je to dobrá voľba" items={page.reasons} />
              <InfoList title="Kedy sa hodí" items={page.situations} />
              <section className="rounded-xl border border-primary/10 bg-beige/55 p-6 dark:bg-card">
                <h2 className="text-2xl font-light tracking-tight text-black dark:text-white">
                  Odporúčaná hodnota
                </h2>
                <p className="mt-5 text-4xl font-light text-black dark:text-white">
                  {page.recommendedValue}
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Ak si nie ste istý, vyberte túto hodnotu ako jednoduchú voľbu. V Bookio
                  sú dostupné aj ďalšie hodnoty podľa rozpočtu.
                </p>
              </section>
            </div>
          </section>

          <section className="bg-beige px-6 py-14 dark:bg-[#050403]">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-light tracking-tight text-black dark:text-white">
                Časté otázky
              </h2>
              <div className="mt-6 space-y-4">
                {page.faqs.map((faq) => (
                  <section
                    key={faq.question}
                    className="rounded-xl border border-primary/10 bg-white/55 p-6 dark:bg-card"
                  >
                    <h3 className="text-lg font-medium text-black dark:text-white">{faq.question}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </section>
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
