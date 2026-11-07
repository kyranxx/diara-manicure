import { fullAddress, siteConfig } from "@/lib/site-config"
import { blogAuthor, blogPostUrl, blogPosts, formatBlogDate, type BlogPost } from "@/lib/blog-posts"

const homeMarkdown = `# diara manicure.

> Slovenský nechtový salón v Trnave.

diara manicure. ponúka gélové nechty, manikúru a darčekové poukazy v Trnave. Dodržiavame prísne hygienické normy, parkovanie je zdarma a rezervácia je dostupná online.

## Rýchle odkazy

- Rezervácia: ${siteConfig.bookingUrl}
- Darčekové poukazy: ${siteConfig.giftCardPageUrl}
- Kúpiť poukaz online: ${siteConfig.giftCardUrl}
- Telefón: ${siteConfig.phone}
- Messenger: ${siteConfig.messengerUrl}

## Kontakt

- Adresa: ${fullAddress}
- Otváracie hodiny: Po – Ne ${siteConfig.opens.replace(/^0/, "")} – ${siteConfig.closes}
- Facebook: ${siteConfig.facebookUrl}
- Instagram: ${siteConfig.instagramUrl}

## Služby

- Živý cenník a zoznam služieb je dostupný na ${siteConfig.baseUrl}/api/services
- Dokumentácia API je na ${siteConfig.baseUrl}/docs/api

## Poznámky

- Rezervácia prebieha cez Bookio.
- Platba kartou je podporovaná.
- Parkovanie a káva sú zdarma.
`

const blogIndexMarkdown = `# Blog

Tipy, trendy a praktické odpovede o nechtoch od diara manicure. v Trnave.

## Články

${blogPosts.map((post, index) => `${index + 1}. [${post.shortTitle}](${blogPostUrl(post.slug)}) - ${post.description}`).join("\n")}
`

const blogPostMarkdown = (post: BlogPost) => `# ${post.title}

- Autor: ${blogAuthor}
- Publikované: ${formatBlogDate(post.published)}
- Aktualizované: ${formatBlogDate(post.modified)}
- Čas čítania: ${post.readMinutes} minút

${post.description}

## V skratke

${post.keyPoints.map((point) => `- ${point}`).join("\n")}

## Odkazy

- Celý článok: ${blogPostUrl(post.slug)}
- Objednanie: ${siteConfig.bookingUrl}
- Cenník: ${siteConfig.baseUrl}/#cennik
`

const giftCardsMarkdown = `# Darček pre ženu v Trnave

diara manicure. ponúka darčekové poukazy na manikúru, gél lak a gélové nechty v Trnave.
Poukaz je vhodný ako darček pre manželku, priateľku, mamu, sestru alebo kolegyňu z Trnavy a okolia.

## Dostupné hodnoty

- 30 €
- 40 €
- 50 €
- 100 €

## Ako to funguje

- Poukaz sa kupuje online cez Bookio.
- Platba prebieha kartou.
- Poukaz príde emailom.
- Pri objednávke je možné pridať osobné venovanie.

## Vhodné vyhľadávania

- darček pre ženu Trnava
- darček pre manželku Trnava
- darček pre priateľku Trnava
- darček pre mamu Trnava
- poukaz na manikúru Trnava
- poukaz na nechty Trnava

## Odkazy

- Informácie o poukazoch: ${siteConfig.giftCardPageUrl}
- Kúpiť poukaz online: ${siteConfig.giftCardUrl}
- Cenník služieb: ${siteConfig.baseUrl}/#cennik
`

const gelNailsMarkdown = `# Gélové nechty Trnava

Gélové nechty v salóne diara manicure. sú vhodné pre klientky, ktoré chcú pevnejší a dlhotrvajúci výsledok, predĺženie alebo korekciu tvaru nechtov. Častou voľbou sú aj jemné gélové nechty s prirodzeným vzhľadom.

## Pre koho sú vhodné

- pevnejšie nechty na viac týždňov
- jemné gélové nechty, francúzska manikúra, babyboomer alebo decentné zdobenie
- klientky, ktoré chcú pravidelné doplnenie približne po 3 týždňoch

## Odkazy

- Rezervácia: ${siteConfig.bookingUrl}
- Cenník: ${siteConfig.baseUrl}/#cennik
- Článok o výdrži: ${siteConfig.baseUrl}/blog/ako-dlho-vydrzia-gelove-nechty
`

const gelPolishMarkdown = `# Gél lak Trnava

Gél lak je vhodný pre prirodzené kratšie nechty, keď klientka chce farbu, lesk a rýchlejšiu aplikáciu bez predlžovania.

## Pre koho je vhodný

- prirodzené nechty bez predlžovania
- jemnejší a prirodzenejší vzhľad
- bežné nosenie a pravidelná údržba

## Odkazy

- Rezervácia: ${siteConfig.bookingUrl}
- Cenník: ${siteConfig.baseUrl}/#cennik
- Porovnanie služieb: ${siteConfig.baseUrl}/blog/rozdiel-gel-lak-gelova-modelacia
`

const manicureMarkdown = `# Manikúra Trnava

Suchá manikúra v diara manicure. je zameraná na čisté nechtové okolie, upravený tvar a zdravý prirodzený vzhľad rúk.

## Pre koho je vhodná

- úprava prirodzených nechtov bez farby
- príprava pred gél lakom alebo gélovou modeláciou
- pravidelná starostlivosť o ruky

## Odkazy

- Rezervácia: ${siteConfig.bookingUrl}
- Cenník: ${siteConfig.baseUrl}/#cennik
- Kontakt: ${siteConfig.baseUrl}/#visit
`

const apiDocsMarkdown = `# Public API and Agent Discovery

## Base URL

${siteConfig.baseUrl}

## Public HTTP endpoints

- \`GET /api/services\` - live services and pricing
- \`GET /api/health\` - health status
- \`GET /.well-known/api-catalog\` - RFC 9727 API catalog
- \`GET /.well-known/agent-skills/index.json\` - agent skills index
- \`GET /.well-known/mcp/server-card.json\` - MCP server card
- \`POST /mcp\` - public MCP endpoint

## Authentication

The published HTTP endpoints are public and currently do not require OAuth or OIDC.

## Booking and contact

- Booking: ${siteConfig.bookingUrl}
- Gift cards: ${siteConfig.giftCardUrl}
- Phone: ${siteConfig.phone}
- Address: ${fullAddress}
`

const markdownByPath = new Map<string, string>([
  ["/", homeMarkdown],
  ["/blog", blogIndexMarkdown],
  ...blogPosts.map((post): [string, string] => [`/blog/${post.slug}`, blogPostMarkdown(post)]),
  ["/darcekove-poukazy", giftCardsMarkdown],
  ["/sluzby/gelove-nechty-trnava", gelNailsMarkdown],
  ["/sluzby/gel-lak-trnava", gelPolishMarkdown],
  ["/sluzby/manikura-trnava", manicureMarkdown],
  ["/docs/api", apiDocsMarkdown],
])

export function getMarkdownForPath(pathname: string) {
  return markdownByPath.get(pathname) ?? null
}

export function getMarkdownTokenEstimate(markdown: string) {
  return String(Math.max(1, Math.ceil(markdown.length / 4)))
}

export const supportedMarkdownPaths = Array.from(markdownByPath.keys())
