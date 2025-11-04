import type React from "react"
import "./globals.css"
import { Poppins } from "next/font/google"
import { ThemeProvider } from "./providers"

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })

export const metadata = {
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
      <body className={poppins.className}>
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
