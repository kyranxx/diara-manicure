import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import { AnalyticsRuntime } from "@/components/analytics-runtime"
import { CookieConsentMarkup } from "@/components/cookie-consent-markup"
import { WebMcpScript } from "@/components/webmcp-script"
import { defaultLanguage, translations } from "@/lib/i18n"
import { siteConfig } from "@/lib/site-config"


export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  applicationName: siteConfig.name,
  authors: [{ name: "Andrea Hečková" }],
  icons: {
    icon: [
      { url: '/favicon.ico?v=dm-20260516-d', sizes: 'any' },
      { url: '/favicon.svg?v=dm-20260516-d', type: 'image/svg+xml' },
      { url: '/favicon.png?v=dm-20260516-d', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: "/favicon.ico?v=dm-20260516-d",
    apple: [
      { url: '/favicon.png?v=dm-20260516-d', sizes: '180x180', type: 'image/png' },
    ],
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
