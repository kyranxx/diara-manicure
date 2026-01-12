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
  description: "✨ Gélové nechty od 25€ • Parkovanie zdarma • Online rezervácia • Profesionálne nechtové štúdio v centre Trnavy. Kvalitné európske gély. Objednajte sa ešte dnes!",
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
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: "/favicon.png",
    apple: [
      { url: '/apple-touch-icon.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
  openGraph: {
    title: "diara manicure. | Gélové nechty Trnava",
    description: "✨ Gélové nechty od 25€ • Parkovanie zdarma • Kvalitné európske gély • Profesionálne nechtové štúdio v centre Trnavy.",
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
