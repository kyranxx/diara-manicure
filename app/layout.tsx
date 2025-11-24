import type React from "react"
import "./globals.css"
import { DM_Sans } from "next/font/google"
import Script from "next/script"
import { ThemeProvider } from "./providers"

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })

export const metadata = {
  metadataBase: new URL('https://diara-manicure.com'),
  title: "Nechty Trnava | Gélová Manikúra & Modeláž | Salón Diara",
  description:
    "Hľadáte najlepšie nechty v Trnave? Navštívte nechtové štúdio Diara. Ponúkame gélové nechty, manikúru a modeláž nechtov. Objednanie online. Pozrite si recenzie a cenník.",
  keywords: [
    "nechty trnava",
    "manikura trnava",
    "nails trnava",
    "gelove nechty trnava",
    "nechtove studio trnava",
    "gelove nechty trnava recenzie",
    "modelaz nechtov trnava",
    "nechty trnava cennik",
    "nechty trnava objednanie",
    "nechty trnava volne terminy",
    "gel manikúra Trnava",
    "nechtový salón Trnava",
    "nail art Trnava",
    "predĺženie nechtov Trnava",
    "luxusný nechtový salón"
  ],
  openGraph: {
    title: "Nechty Trnava - Diara Manicure",
    description: "Najlepšie gélové nechty a manikúra v Trnave. Profesionálne služby a nail art.",
    url: "https://diara-manicure.com",
    siteName: "Diara Manicure",
    images: [
      {
        url: "/logo.png",
        width: 840,
        height: 420,
      },
    ],
    locale: "sk_SK",
    type: "website",
  },
  alternates: {
    canonical: "https://diara-manicure.com",
  },
  icons: {
    icon: '/favicon.ico',
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
          src="https://www.googletagmanager.com/gtag/js?id=AW-17746151386"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-655587665');
            gtag('config', 'AW-17746151386');
          `}
        </Script>
      </head>
      <body className={dmSans.className}>
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
