import type React from "react"
import "./globals.css"
import { DM_Sans } from "next/font/google"
import Script from "next/script"
import { ThemeProvider } from "./providers"

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })

export const metadata = {
  metadataBase: 'https://diara-manicure.com',
  title: "Gélová Manikúra Trnava | Nechtový Salón Diara | Nail Art & Design",
  description:
    "Najlepšia gel manikúra v Trnave! Luxusné nechtové služby, nail art a predĺženie nechtov. Rezervujte si termín: 0902 163 144. Profesionálne salón v centre Trnavy.",
  keywords: [
    "gel manikúra Trnava",
    "nechtový salón Trnava",
    "nail art Trnava",
    "predĺženie nechtov Trnava",
    "gélová manikúra",
    "manikúra Trnava",
    "najlepšia gel manikúra",
    "luxusný nechtový salón"
  ],
  openGraph: {
    title: "Diara Manicure - Gélová Manikúra Trnava",
    description: "Najlepšia gel manikúra v Trnave! Profesionálne nechtové služby a nail art.",
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
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
