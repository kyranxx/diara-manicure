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
expectTitle(home, "Nechtové štúdio Trnava – gélové nechty a manikúra | Cenník", "home natural Slovak title")
expectIncludes(home, "application/ld+json", "home JSON-LD")
expectIncludes(home, "BeautySalon", "home LocalBusiness schema")
expectIncludes(home, "#beautysalon", "home stable business id")
expectIncludes(home, "Nail Studio Trnava", "home schema keeps English local-search alias")
expectNotIncludes(home, "Nails Trnava služby", "home Slovak description avoids mixed English copy")
expectNotIncludes(home, "Professional Nails &amp; Manicure in Trnava", "home Slovak footer tagline")
expectNotIncludes(home, "najkrajšie nails v Trnave", "home Slovak about copy")
expectIncludes(home, 'href="/galeria"', "home links to full gallery page")
expectIncludes(home, `content="${baseUrl}/og-image.jpg?v=20260407"`, "home social images use absolute URLs")
expectIncludes(home, 'href="#main-content"', "home exposes a skip link")
expectIncludes(home, '<main id="main-content" tabindex="-1">', "home skip link has a focusable target")
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
expectIncludes(giftCard, '<meta name="twitter:title" content="Darčekový poukaz Trnava | Nechty a manikúra"', "gift card twitter title")
expectIncludes(giftCard, "darcekovy-poukaz-na-nechty-trnava.jpg", "gift card uses SEO image filename")
expectIncludes(giftCard, "utm_campaign=darcekove_poukazy", "gift card outbound links carry campaign attribution")
expectIncludes(giftCard, "Darčekový poukaz od 30", "gift card has sticky buy bar copy")
expectIncludes(giftCard, "gift_card_sticky_bar", "gift card has sticky buy bar tracking source")
expectIncludes(giftCard, "Kúpiť poukaz teraz", "gift card hero has prominent buy button")
expectIncludes(giftCard, "Darčekový poukaz v Trnave na nechty a manikúru", "gift card H1 targets voucher plus local service")
expectIncludes(giftCard, "darčekový poukaz Trnava", "gift card targets broad local voucher")
expectIncludes(giftCard, "kozmetický poukaz", "gift card targets beauty voucher")
expectIncludes(giftCard, "salón krásy darčekový poukaz Trnava", "gift card targets beauty salon voucher")
expectIncludes(giftCard, "darčekový poukaz na nechty", "gift card targets voucher for nails")
expectIncludes(giftCard, "poukaz na nechty v Trnave", "gift card targets local nail voucher")
expectIncludes(giftCard, "poukaz na manikúru Trnava", "gift card targets local manicure voucher")
expectIncludes(giftCard, "darček pre ženu Trnava a okolie", "gift card targets nearby gift search")
expectIncludes(giftCard, "Narodeninový darček pre ženu", "gift card targets birthday gift intent")
expectIncludes(giftCard, "Darček na meniny pre ženu", "gift card targets name-day gift intent")
expectIncludes(giftCard, "Darček pre kolegyňu", "gift card targets colleague gift intent")
expectIncludes(giftCard, "darček pre manželku", "gift card targets wife gift intent")
expectIncludes(giftCard, "darček pre priateľku", "gift card targets girlfriend gift intent")
expectIncludes(giftCard, "Hlohovca", "gift card mentions nearby towns")
expectIncludes(giftCard, "Serede", "gift card mentions nearby towns")
expectIncludes(giftCard, "Najjednoduchšia voľba: poukaz 50", "gift card recommends one simple value")
expectIncludes(giftCard, "Vyberte hodnotu, zaplaťte kartou a poukaz príde emailom", "gift card explains fast purchase flow")
expectNotIncludes(home, "Najjednoduchšia voľba: poukaz 50", "home does not carry gift-card buyer copy")


const galleryLanding = readBuiltFile(".next/server/app/galeria.html")
expectTitle(galleryLanding, "Galéria nechtov Trnava | Gélové nechty a manikúra", "gallery title")
expectCanonical(galleryLanding, `${baseUrl}/galeria`, "gallery canonical")
expectOgUrl(galleryLanding, `${baseUrl}/galeria`, "gallery og:url")
expectIncludes(galleryLanding, "ImageGallery", "gallery ImageGallery schema")
expectIncludes(galleryLanding, "gelove-nechty-trnava-gallery-76.jpg", "gallery includes newest image")

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
  expectIncludes(html, "Túto službu môžete darovať ako poukaz", `${page.url} links service to gift card`)
  expectIncludes(html, 'href="/darcekove-poukazy"', `${page.url} has internal gift-card link`)
  expectIncludes(html, "FAQPage", `${page.url} FAQ schema`)
  expectIncludes(html, "Časté otázky", `${page.url} shows FAQ`)
  if (visibleWordCount(html) < 400) {
    throw new Error(`${page.url}: expected at least 400 visible words`)
  }
}

expectIncludes(
  readBuiltFile(".next/server/app/blog/ako-dlho-vydrzia-gelove-nechty.html"),
  'href="/darcekove-poukazy"',
  "gel nails article links gift cards"
)
expectIncludes(
  readBuiltFile(".next/server/app/blog/rozdiel-gel-lak-gelova-modelacia.html"),
  'href="/darcekove-poukazy"',
  "comparison article links gift cards"
)

const sitemap = readBuiltFile(".next/server/app/sitemap.xml.body")
for (const page of servicePages) {
  expectIncludes(sitemap, `<loc>${page.url}</loc>`, `sitemap includes ${page.url}`)
}
expectIncludes(sitemap, `<loc>${baseUrl}/galeria</loc>`, "sitemap includes gallery")
expectNotIncludes(sitemap, `${baseUrl}/galeria/`, "sitemap drops merged gallery subpages")
expectNotIncludes(sitemap, `${baseUrl}/darcekove-poukazy/`, "sitemap drops merged gift subpages")
expectIncludes(sitemap, "gelove-nechty-trnava-gallery-76.jpg", "sitemap includes newest gallery image")

const imageSitemap = readBuiltFile(".next/server/app/image-sitemap.xml.body")
expectIncludes(imageSitemap, `<loc>${baseUrl}/galeria</loc>`, "image sitemap includes gallery page")
expectIncludes(imageSitemap, "gelove-nechty-trnava-gallery-76.jpg", "image sitemap includes newest gallery photo")
expectIncludes(imageSitemap, "<image:title>Jemné zdobenie</image:title>", "image sitemap includes image title")
expectIncludes(imageSitemap, "<image:geo_location>Trnava, Slovakia</image:geo_location>", "image sitemap includes local geo signal")

const robots = readBuiltFile(".next/server/app/robots.txt.body")
expectNotIncludes(robots.toLowerCase(), "nosnippet", "robots keeps snippets enabled")
expectIncludes(robots, `${baseUrl}/image-sitemap.xml`, "robots advertises image sitemap")

console.log("SEO regression checks passed.")
