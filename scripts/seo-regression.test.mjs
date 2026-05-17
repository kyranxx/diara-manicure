import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const baseUrl = "https://www.diaramanicure.sk"

function readBuiltFile(relativePath) {
  const fullPath = path.join(root, relativePath)
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing built file: ${relativePath}`)
  }
  return fs.readFileSync(fullPath, "utf8")
}

function expectIncludes(haystack, needle, label) {
  if (!haystack.includes(needle)) {
    throw new Error(`${label}: expected to find ${needle}`)
  }
}

function expectNotIncludes(haystack, needle, label) {
  if (haystack.includes(needle)) {
    throw new Error(`${label}: expected not to find ${needle}`)
  }
}

function expectCanonical(html, url, label) {
  expectIncludes(html, `<link rel="canonical" href="${url}"`, label)
}

function expectOgUrl(html, url, label) {
  expectIncludes(html, `<meta property="og:url" content="${url}"`, label)
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function expectTitle(html, title, label) {
  const pattern = new RegExp(`<title(?:\\s[^>]*)?>${escapeRegExp(title)}</title>`)
  if (!pattern.test(html)) {
    throw new Error(`${label}: expected title ${title}`)
  }
}

function expectMatchCount(html, pattern, expected, label) {
  const count = (html.match(pattern) ?? []).length
  if (count !== expected) {
    throw new Error(`${label}: expected ${expected}, found ${count}`)
  }
}

function visibleWordCount(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

const navbarSource = fs.readFileSync(path.join(root, "components/navbar.tsx"), "utf8")
expectIncludes(navbarSource, "<details", "language switcher stays collapsed by default")

const home = readBuiltFile(".next/server/pages/index.html")
expectTitle(home, "Gélové nechty a manikúra v Trnave | Cenník", "home natural Slovak title")
expectIncludes(home, "application/ld+json", "home JSON-LD")
expectIncludes(home, "BeautySalon", "home LocalBusiness schema")
expectIncludes(home, "#beautysalon", "home stable business id")
expectIncludes(home, "Nail Studio Trnava", "home schema keeps English local-search alias")
expectNotIncludes(home, "Nails Trnava služby", "home Slovak description avoids mixed English copy")
expectNotIncludes(home, "Professional Nails &amp; Manicure in Trnava", "home Slovak footer tagline")
expectNotIncludes(home, "najkrajšie nails v Trnave", "home Slovak about copy")
expectMatchCount(home, /<h1\b/gi, 1, "home has one H1")

const blog = readBuiltFile(".next/server/app/blog.html")
expectTitle(blog, "Blog o nechtoch v Trnave", "blog title")
expectCanonical(blog, `${baseUrl}/blog`, "blog canonical")
expectOgUrl(blog, `${baseUrl}/blog`, "blog og:url")
expectIncludes(blog, "CollectionPage", "blog collection schema")
expectIncludes(blog, "BreadcrumbList", "blog breadcrumb schema")
if (visibleWordCount(blog) < 170) {
  throw new Error("blog content: expected at least 170 visible words")
}

const articles = [
  {
    file: ".next/server/app/blog/ako-dlho-vydrzia-gelove-nechty.html",
    url: `${baseUrl}/blog/ako-dlho-vydrzia-gelove-nechty`,
    title: "Ako dlho vydržia gélové nechty? | diara manicure.",
  },
  {
    file: ".next/server/app/blog/rozdiel-gel-lak-gelova-modelacia.html",
    url: `${baseUrl}/blog/rozdiel-gel-lak-gelova-modelacia`,
    title: "Gél lak alebo gélová modelácia? | diara manicure.",
  },
]

for (const article of articles) {
  const html = readBuiltFile(article.file)
  expectTitle(html, article.title, article.url)
  expectCanonical(html, article.url, article.url)
  expectOgUrl(html, article.url, article.url)
  expectIncludes(html, "Article", `${article.url} Article schema`)
  expectIncludes(html, "BreadcrumbList", `${article.url} breadcrumb schema`)
  expectNotIncludes(html, `<link rel="canonical" href="${baseUrl}"`, `${article.url} no home canonical`)
}

const giftCard = readBuiltFile(".next/server/app/darcekove-poukazy.html")
expectCanonical(giftCard, `${baseUrl}/darcekove-poukazy`, "gift card canonical")
expectOgUrl(giftCard, `${baseUrl}/darcekove-poukazy`, "gift card og:url")
expectIncludes(giftCard, '<meta name="twitter:title" content="Darček pre ženu v Trnave | Poukaz na manikúru"', "gift card twitter title")

const servicePages = [
  {
    file: ".next/server/app/sluzby/gelove-nechty-trnava.html",
    url: `${baseUrl}/sluzby/gelove-nechty-trnava`,
    title: "Gélové nechty v Trnave | diara manicure.",
  },
  {
    file: ".next/server/app/sluzby/gel-lak-trnava.html",
    url: `${baseUrl}/sluzby/gel-lak-trnava`,
    title: "Gél lak v Trnave | diara manicure.",
  },
  {
    file: ".next/server/app/sluzby/manikura-trnava.html",
    url: `${baseUrl}/sluzby/manikura-trnava`,
    title: "Manikúra v Trnave | diara manicure.",
  },
]

for (const page of servicePages) {
  const html = readBuiltFile(page.file)
  expectTitle(html, page.title, page.url)
  expectCanonical(html, page.url, page.url)
  expectOgUrl(html, page.url, page.url)
  expectIncludes(html, "Service", `${page.url} Service schema`)
  expectIncludes(html, "Nails Trnava", `${page.url} keeps English query alias in schema`)
  expectIncludes(html, "BreadcrumbList", `${page.url} breadcrumb schema`)
}

const sitemap = readBuiltFile(".next/server/app/sitemap.xml.body")
for (const page of servicePages) {
  expectIncludes(sitemap, `<loc>${page.url}</loc>`, `sitemap includes ${page.url}`)
}

const robots = readBuiltFile(".next/server/app/robots.txt.body")
expectNotIncludes(robots.toLowerCase(), "nosnippet", "robots keeps snippets enabled")

console.log("SEO regression checks passed.")
