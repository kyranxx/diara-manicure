import { fullAddress, siteConfig } from "@/lib/site-config"

const homeMarkdown = `# diara manicure.

> Profesionálne nechtové štúdio v Trnave.

diara manicure. ponúka gélové nechty, manikúru a darčekové poukazy v Trnave. Používajú sa kvalitné európske gély, parkovanie je zdarma a rezervácia je dostupná online.

## Rýchle odkazy

- Rezervácia: ${siteConfig.bookingUrl}
- Darčekové poukazy: ${siteConfig.giftCardPageUrl}
- Kúpiť poukaz online: ${siteConfig.giftCardUrl}
- Telefón: ${siteConfig.phone}
- Messenger: ${siteConfig.messengerUrl}

## Kontakt

- Adresa: ${fullAddress}
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

Tipy, trendy a novinky zo sveta nechtov od diara manicure.

## Články

1. [Ako dlho vydržia gélové nechty?](${siteConfig.baseUrl}/blog/ako-dlho-vydrzia-gelove-nechty)
2. [Rozdiel medzi gél lakom a gélovou modeláciou](${siteConfig.baseUrl}/blog/rozdiel-gel-lak-gelova-modelacia)
`

const articleOneMarkdown = `# Ako dlho vydržia gélové nechty?

- Autor: Andrea Hečková
- Dátum: 5. január 2026
- Čas čítania: 8 minút

## Priemerná výdrž

Pri správnej aplikácii a starostlivosti vydržia gélové nechty zvyčajne 3 až 4 týždne.

## Čo ovplyvňuje výdrž

1. Kvalita použitých materiálov
2. Príprava prirodzeného nechta
3. Životný štýl a práca
4. Stav prirodzených nechtov

## Ako predĺžiť výdrž

- Používajte rukavice pri domácich prácach
- Nepoužívajte nechty ako nástroj
- Aplikujte olejíček na kutikuly
- Chodievajte na doplnenie približne každé 3 týždne

## Rezervácia

- Objednanie: ${siteConfig.bookingUrl}
- Cenník: ${siteConfig.baseUrl}/#cennik
`

const articleTwoMarkdown = `# Rozdiel medzi gél lakom a gélovou modeláciou

- Autor: Andrea Hečková
- Dátum: 5. január 2026
- Čas čítania: 10 minút

## Gél lak

Gél lak je vhodný pre prirodzené nechty, rýchlejšiu aplikáciu a prirodzenejší vzhľad.

### Výhody

- Rýchlejšia aplikácia
- Prirodzený vzhľad
- Nižšia cena

### Nevýhody

- Kratšia výdrž
- Nepredĺži nechty
- Menšia pevnosť

## Gélová modelácia

Gélová modelácia je vhodná pre pevnejší výsledok, predĺženie nechtov a náročnejšie zdobenie.

### Výhody

- Dlhšia výdrž
- Možnosť predĺženia
- Vyššia pevnosť

### Nevýhody

- Dlhší čas aplikácie
- Vyššia cena
- Zložitejšie odstránenie

## Rezervácia

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
  ["/blog/ako-dlho-vydrzia-gelove-nechty", articleOneMarkdown],
  ["/blog/rozdiel-gel-lak-gelova-modelacia", articleTwoMarkdown],
  ["/darcekove-poukazy", giftCardsMarkdown],
  ["/docs/api", apiDocsMarkdown],
])

export function getMarkdownForPath(pathname: string) {
  return markdownByPath.get(pathname) ?? null
}

export function getMarkdownTokenEstimate(markdown: string) {
  return String(Math.max(1, Math.ceil(markdown.length / 4)))
}

export const supportedMarkdownPaths = Array.from(markdownByPath.keys())
