import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { DM_Sans } from "next/font/google"
import Script from "next/script"
import { ThemeProvider } from "./providers"


const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.diaramanicure.sk'),
  title: "diara manicure. | Gélové nechty Trnava | Nechtové štúdio",
  description: "✨ Gélové nechty Trnava & profesionálna manikúra. 💎 V diara manicure. spájame špičkovú kvalitu, TOP európske gély a relax. 💅 Parkovanie zdarma + káva. Rezervujte si svoj termín online!",
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
    "akrylove nechty trnava"
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
    title: "diara manicure. | Gélové nechty Trnava",
    description: "💎 Profesionálne gélové nechty v Trnave. Kvalitné európske gély, parkovanie zdarma a online rezervácia termínu. ✨",
    type: "website",
    locale: "sk_SK",
    url: "https://www.diaramanicure.sk",
    siteName: "diara manicure.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "diara manicure. - Gélové nechty Trnava",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sk">
      <head>
        <Script
          src="/passive-fix.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QCMMZCQZTP"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-QCMMZCQZTP');
            gtag('config', 'AW-17746151386');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ugccqd16dq");
          `}
        </Script>
      </head>
      <body className={`${dmSans.className} ${dmSans.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}

        </ThemeProvider>
      </body>
    </html>
  )
}
