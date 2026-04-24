import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { DM_Sans, Great_Vibes } from "next/font/google"
import Script from "next/script"
import { IdleAnalytics } from "@/components/idle-analytics"
import { ThemeProvider } from "./providers"
import { WebMcpProvider } from "@/components/webmcp-provider"


const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
  variable: '--font-dm-sans',
})

const signatureFont = Great_Vibes({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: 'swap',
  variable: '--font-signature',
})

const socialImageUrl = "/og-image.jpg?v=20260407"

export const metadata: Metadata = {
  metadataBase: new URL('https://www.diaramanicure.sk'),
  title: "diara manicure. | Gélové nechty Trnava | Manikúra a darčekové poukazy",
  description: "Profesionálna manikúra a gélové nechty v Trnave. Kvalitné európske gély, parkovanie zdarma, online rezervácia a darčekové poukazy.",
  keywords: [
    "nechty trnava",
    "gelove nechty trnava",
    "manikura trnava",
    "nechtove studio trnava",
    "diara manicure",
    "nechty trnava cennik",
    "modelacia nechtov trnava",
    "gel lak trnava",
    "najlepsie nechty trnava",
    "nechtove studio trnava recenzie",
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
    title: "diara manicure. | Gélové nechty Trnava | Darčekové poukazy",
    description: "Profesionálna manikúra a gélové nechty v Trnave. Darčekové poukazy, kvalitné európske gély, parkovanie zdarma a online rezervácia.",
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
    title: "diara manicure. | Gélové nechty Trnava | Darčekové poukazy",
    description: "Profesionálna manikúra a gélové nechty v Trnave. Darčekové poukazy, kvalitné európske gély, parkovanie zdarma a online rezervácia.",
    images: [socialImageUrl],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sk" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              document.documentElement.classList.toggle(
                "dark",
                window.localStorage.getItem("theme") === "dark"
              );
            } catch (_) {}
          `}
        </Script>
        <Script
          src="/passive-fix.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${dmSans.className} ${dmSans.variable} ${signatureFont.variable}`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <WebMcpProvider />
          <IdleAnalytics />
          {children}

        </ThemeProvider>
      </body>
    </html>
  )
}
