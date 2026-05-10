import Head from "next/head"
import SchemaMarkup from "@/components/schema-markup"
import { AnalyticsRuntime } from "@/components/analytics-runtime"
import { CookieConsentMarkup } from "@/components/cookie-consent-markup"
import { Navbar } from "@/components/navbar"
import { WebMcpScript } from "@/components/webmcp-script"
import { MobileBookingBar } from "@/components/mobile-booking-bar"
import { About } from "@/components/sections/About"
import { Contact } from "@/components/sections/Contact"
import { FAQ } from "@/components/sections/FAQ"
import { Footer } from "@/components/sections/Footer"
import { GalleryShell } from "@/components/sections/GalleryShell"
import { GiftCards } from "@/components/sections/GiftCards"
import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { GoogleReviewsMarquee } from "@/components/sections/Testimonials"
import { defaultLanguage, getLanguageMeta, languages, translations, type Language } from "@/lib/i18n"
import type { ServiceData } from "@/lib/sheets"
import { siteConfig } from "@/lib/site-config"

type HomePageProps = {
  language: Language
  services: ServiceData[]
}

const seoByLanguage: Record<Language, { title: string; description: string; keywords: string; ogLocale: string }> = {
  sk: {
    title: "Gélové nechty v Trnave, manikúra Trnava a cenník",
    description:
      "Profesionálna manikúra a gélové nechty v Trnave. Pozrite si cenník, voľné termíny, Nails Trnava služby a darčekové poukazy.",
    keywords:
      "nechty trnava, gelove nechty trnava, manikura trnava, nechtove studio trnava, nails trnava, diara manicure, nechty trnava cennik, darcekovy poukaz nechty",
    ogLocale: "sk_SK",
  },
  en: {
    title: "Gel nails and manicure in Trnava",
    description:
      "Professional manicure and gel nails in Trnava. View prices, available appointments, nail services and gift vouchers.",
    keywords:
      "nails trnava, gel nails trnava, manicure trnava, nail studio trnava, diara manicure, nail prices trnava, gift voucher nails",
    ogLocale: "en_US",
  },
  uk: {
    title: "Гелеві нігті та манікюр у Трнаві",
    description:
      "Професійний манікюр і гелеві нігті у Трнаві. Перегляньте ціни, вільні терміни, послуги та подарункові ваучери.",
    keywords:
      "нігті трнава, гелеві нігті трнава, манікюр трнава, студія нігтів трнава, diara manicure, подарунковий ваучер",
    ogLocale: "uk_UA",
  },
  sr: {
    title: "Gel nokti i manikir u Trnavi",
    description:
      "Profesionalni manikir i gel nokti u Trnavi. Pogledajte cenovnik, slobodne termine, usluge i poklon vaučere.",
    keywords:
      "nokti trnava, gel nokti trnava, manikir trnava, studio za nokte trnava, diara manicure, cenovnik noktiju, poklon vaučer",
    ogLocale: "sr_RS",
  },
}

function languagePath(language: Language) {
  return language === defaultLanguage ? "" : `/${language}`
}

export function HomePage({ language, services }: HomePageProps) {
  const t = translations[language]
  const meta = getLanguageMeta(language)
  const seo = seoByLanguage[language]
  const path = languagePath(language)
  const canonicalUrl = `${siteConfig.baseUrl}${path}`
  const socialImageUrl = "/og-image.jpg?v=20260407"

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta httpEquiv="content-language" content={meta.htmlLang} />
        <link rel="canonical" href={canonicalUrl} />
        {languages.map((item) => (
          <link
            key={item.code}
            rel="alternate"
            hrefLang={item.htmlLang}
            href={`${siteConfig.baseUrl}${languagePath(item.code)}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={siteConfig.baseUrl} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" sizes="128x128" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={seo.ogLocale} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="diara manicure." />
        <meta property="og:image" content={socialImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="diara manicure. - gélové nechty a manikúra v Trnave" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={socialImageUrl} />
      </Head>
      <div className="min-h-screen bg-background pb-20 text-foreground selection:bg-primary/20 md:pb-0">
        <Navbar language={language} t={t} />

        <main>
          <Hero bookingUrl={siteConfig.bookingUrl} t={t} />
          <Services services={services} bookingUrl={siteConfig.bookingUrl} t={t} />
          <GalleryShell t={t} />
          <GoogleReviewsMarquee t={t} />
          <About t={t} />
          <FAQ t={t} />
          <GiftCards t={t} />
          <Contact bookingUrl={siteConfig.bookingUrl} t={t} />
        </main>

        <Footer t={t} />
        <MobileBookingBar href={siteConfig.bookingUrl} label={t.hero.bookingCta} />
      </div>
      <SchemaMarkup />
      <WebMcpScript />
      <AnalyticsRuntime />
      <CookieConsentMarkup t={t.cookie} />
    </>
  )
}
