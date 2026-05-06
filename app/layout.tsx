import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AnalyticsRuntime } from "@/components/analytics-runtime"
import { CookieConsentMarkup } from "@/components/cookie-consent-markup"
import { WebMcpScript } from "@/components/webmcp-script"
import { defaultLanguage, translations } from "@/lib/i18n"


const socialImageUrl = "/og-image.jpg?v=20260407"

export const metadata: Metadata = {
  metadataBase: new URL('https://www.diaramanicure.sk'),
  title: "diara manicure. | Gélové nechty Trnava, manikúra Trnava a cenník",
  description: "Profesionálna manikúra a gélové nechty v Trnave. Pozrite si cenník, voľné termíny, Nails Trnava služby a darčekové poukazy.",
  keywords: [
    "nechty trnava",
    "gelove nechty trnava",
    "manikura trnava",
    "nechtove studio trnava",
    "nails trnava",
    "diara manicure",
    "nechty trnava cennik",
    "modelacia nechtov trnava",
    "gel lak trnava",
    "najlepsie nechty trnava",
    "doplnenie nechtov trnava",
    "akrylove nechty trnava",
    "darcekovy poukaz nechty",
    "darcekovy poukaz manikura trnava",
    "darcekovy poukaz trnava",
    "poukaz na manikuru",
    "voucher na nechty",
    "voucher manikura trnava"
  ],
  authors: [{ name: "Andrea Hečková" }],
  alternates: {
    canonical: 'https://www.diaramanicure.sk',
    languages: {
      'sk': 'https://www.diaramanicure.sk',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', sizes: '128x128', type: 'image/png' },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.png',
        color: '#2563eb', // Blue color for Safari pinned tabs
      },
    ],
  },
  openGraph: {
    title: "diara manicure. | Gélové nechty Trnava a manikúra Trnava",
    description: "Profesionálna manikúra a gélové nechty v Trnave. Cenník, darčekové poukazy, parkovanie zdarma a online rezervácia.",
    type: "website",
    locale: "sk_SK",
    url: "https://www.diaramanicure.sk",
    siteName: "diara manicure.",
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: "diara manicure. - gélové nechty a manikúra v Trnave",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "diara manicure. | Gélové nechty Trnava a manikúra Trnava",
    description: "Profesionálna manikúra a gélové nechty v Trnave. Cenník, darčekové poukazy, parkovanie zdarma a online rezervácia.",
    images: [socialImageUrl],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = translations[defaultLanguage]

  return (
    <html lang="sk" suppressHydrationWarning>
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
            try {
              document.documentElement.classList.toggle(
                "dark",
                window.localStorage.getItem("theme") === "dark"
              );
            } catch (_) {}
          `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <WebMcpScript />
        <AnalyticsRuntime />
        {children}
        <CookieConsentMarkup t={t.cookie} />
      </body>
    </html>
  )
}
