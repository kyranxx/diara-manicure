import Document, { Head, Html, Main, NextScript } from "next/document"
import Script from "next/script"
import { defaultLanguage, getLanguageMeta, languages, type Language } from "@/lib/i18n"

function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && languages.some((language) => language.code === value)
}

export default class MyDocument extends Document {
  render() {
    const pageLanguage = this.props.__NEXT_DATA__.page.replace("/", "")
    const language = isLanguage(pageLanguage) ? pageLanguage : defaultLanguage
    const meta = getLanguageMeta(language)

    return (
      <Html lang={meta.htmlLang}>
        <Head>
          <Script id="theme-init" strategy="beforeInteractive">
            {'try{document.documentElement.classList.toggle("dark",window.localStorage.getItem("theme")==="dark")}catch(_){}'}
          </Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
