import fs from "node:fs"
import path from "node:path"

const root = process.cwd()

function read(relativePath) {
  const fullPath = path.join(root, relativePath)
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing required file: ${relativePath}`)
  }

  return fs.readFileSync(fullPath, "utf8")
}

function assertIncludes(source, expected, label) {
  if (!source.includes(expected)) {
    throw new Error(`Missing ${label}: ${expected}`)
  }
}

function assertNotIncludes(source, forbidden, label) {
  if (source.includes(forbidden)) {
    throw new Error(`Found forbidden ${label}: ${forbidden}`)
  }
}

const i18n = read("lib/i18n.ts")
const navbar = read("components/navbar.tsx")
const services = read("components/sections/Services.tsx")
const sheets = read("lib/sheets.ts")

for (const code of ["sk", "en", "uk", "sr"]) {
  assertIncludes(i18n, `code: "${code}"`, `language option ${code}`)
  assertIncludes(i18n, `${code}:`, `translation dictionary ${code}`)
}

assertIncludes(i18n, "export type Language", "Language type")
assertIncludes(navbar, "const languageSwitcher", "navbar language switcher")
assertIncludes(navbar, "languages.map", "navbar language options")
assertIncludes(navbar, "hrefLang={item.htmlLang}", "navbar hreflang links")
assertIncludes(navbar, "languageHomeHref(item.code)", "navbar language links")
assertNotIncludes(navbar, "md:hidden flex justify-center", "separate mobile language row")
assertIncludes(services, "py-16 bg-beige", "original pricelist section background")
assertIncludes(services, "bg-white/45 dark:bg-card", "original pricelist card background")
assertIncludes(services, "t.services.intro", "pricelist intro paragraph")
assertIncludes(sheets, "Detailná suchá manikúra", "current fallback service list")
assertNotIncludes(sheets, "Modelácia gélových nechtov (Nové nechty)", "stale fallback service list")

console.log("i18n wiring check passed")
