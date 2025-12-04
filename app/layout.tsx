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
  metadataBase: new URL('https://diaramanicure.sk'),
  title: "Diara Manicure - Nechtové štúdio Trnava | Gélové nechty",
  description: "Exkluzívne nechtové štúdio v Trnave. Ponúkame profesionálne gélové nechty, manikúru a starostlivosť o ruky. Objednajte sa online.",
  keywords: ["nechty trnava", "gelove nechty trnava", "manikura trnava", "nechtove studio trnava", "diara manicure"],
  authors: [{ name: "Andrea Hečková" }],
  openGraph: {
    title: "Diara Manicure - Nechtové štúdio Trnava",
    description: "Exkluzívna starostlivosť o vaše ruky v srdci Trnavy. Profesionálne gélové nechty a manikúra.",
    type: "website",
    locale: "sk_SK",
    url: "https://diaramanicure.sk",
    siteName: "Diara Manicure",
    images: [
      {
        url: "/diara-manicure-logo-trnava.png",
        width: 1200,
        height: 630,
        alt: "Diara Manicure Trnava",
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
          src="https://www.googletagmanager.com/gtag/js?id=AW-17746151386"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17746151386');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

        </ThemeProvider>
      </body>
    </html>
  )
}
