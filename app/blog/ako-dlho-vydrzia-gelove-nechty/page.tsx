import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, Clock, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { siteConfig } from "@/lib/site-config"

const pageUrl = `${siteConfig.baseUrl}/blog/ako-dlho-vydrzia-gelove-nechty`
const title = "Ako dlho vydržia gélové nechty? | diara manicure."
const description =
    "Profesionálny sprievodca výdržou gélových nechtov, starostlivosťou a správnym intervalom doplnenia od diara manicure. v Trnave."
const imageUrl = `${siteConfig.baseUrl}/gelove-nechty-trnava-gallery-1.jpeg`

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: pageUrl,
    },
    openGraph: {
        title,
        description,
        url: pageUrl,
        type: "article",
        locale: "sk_SK",
        publishedTime: "2026-01-05",
        authors: ["Andrea Hečková"],
        images: [
            {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: "Gélové nechty v nechtovom štúdiu diara manicure Trnava",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
    },
}

export default function BlogArticle1() {
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        mainEntityOfPage: pageUrl,
        headline: "Ako dlho vydržia gélové nechty? Kompletný sprievodca výdržou a starostlivosťou",
        description,
        image: imageUrl,
        datePublished: "2026-01-05",
        dateModified: "2026-01-05",
        inLanguage: "sk-SK",
        author: {
            "@type": "Person",
            name: "Andrea Hečková",
        },
        publisher: {
            "@type": "BeautySalon",
            name: siteConfig.name,
            url: siteConfig.baseUrl,
        },
        about: ["gélové nechty", "starostlivosť o nechty", "manikúra Trnava"],
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Domov",
                item: siteConfig.baseUrl,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${siteConfig.baseUrl}/blog`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: "Ako dlho vydržia gélové nechty?",
                item: pageUrl,
            },
        ],
    }

    return (
        <>
            <JsonLd id="schema-article" data={articleSchema} />
            <JsonLd id="schema-breadcrumbs" data={breadcrumbSchema} />
            <div className="min-h-screen bg-background text-foreground">
                <Navbar />

                <main className="pt-24 pb-16">
                    <article className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
                            >
                                <ArrowLeft className="size-4" />
                                Späť na blog
                            </Link>

                        {/* Article Header */}
                        <header className="mb-12">
                            <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-tight leading-tight">
                                Ako dlho vydržia gélové nechty? Kompletný sprievodca výdržou a starostlivosťou
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                                <div className="flex items-center gap-2">
                                    <Calendar className="size-4" />
                                    <span>5. január 2026</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="size-4" />
                                    <span>8 min čítania</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="size-4" />
                                    <span>Andrea Hečková</span>
                                </div>
                            </div>

                            <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
                                <Image
                                    src="/gelove-nechty-trnava-gallery-1.jpeg"
                                    alt="Gélové nechty v nechtovom štúdiu diara manicure Trnava"
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 768px"
                                />
                            </div>
                        </header>

                        {/* Article Content */}
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                Gélové nechty sú jednou z najpopulárnejších volieb pre ženy, ktoré chcú mať krásne a upravené ruky.
                                Jedna z najčastejších otázok, ktorú dostávame v našom nechtovom štúdiu <strong>diara manicure.</strong> v Trnave,
                                je práve táto: &quot;Ako dlho mi vydržia gélové nechty?&quot; V tomto článku vám prezradíme všetko, čo potrebujete vedieť.
                            </p>

                            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">
                                Priemerná výdrž gélových nechtov
                            </h2>

                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Pri správnej aplikácii a starostlivosti by mali gélové nechty vydržať <strong>3 až 4 týždne</strong> bez
                                výrazného poškodenia alebo odlúpnutia. V našom štúdiu diara manicure. používame výhradne kvalitné
                                európske gély, ktoré zaručujú maximálnu výdrž a minimálne poškodenie prirodzeného nechta.
                            </p>

                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Je dôležité poznamenať, že výdrž sa môže líšiť v závislosti od viacerých faktorov, ktoré si rozoberieme
                                nižšie. Niektoré klientky majú gélové nechty bez problémov aj 5 týždňov, zatiaľ čo iné potrebujú
                                doplnenie už po 2-3 týždňoch.
                            </p>

                            <div className="bg-beige dark:bg-card p-8 rounded-2xl my-8">
                                <h3 className="text-lg font-medium mb-4 text-foreground">💡 Tip od profesionálky</h3>
                                <p className="text-muted-foreground mb-0">
                                    Ideálny interval pre doplnenie gélových nechtov je každé 3 týždne. Tým zabezpečíte, že vaše nechty
                                    budú vždy vyzerať perfektne a prirodzený necht nebude zbytočne namáhaný prílišným odrastením.
                                </p>
                            </div>

                            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">
                                Faktory ovplyvňujúce výdrž gélových nechtov
                            </h2>

                            <h3 className="text-xl font-medium mt-8 mb-4 text-foreground">
                                1. Kvalita použitých materiálov
                            </h3>

                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Toto je najdôležitejší faktor. Lacné gély z Ázie často obsahujú nekvalitné zložky, ktoré môžu
                                spôsobiť alergické reakcie a majú výrazne kratšiu výdrž. V diara manicure. pracujeme výhradne s
                                certifikovanými európskymi značkami, ktoré spĺňajú prísne normy EÚ.
                            </p>

                            <h3 className="text-xl font-medium mt-8 mb-4 text-foreground">
                                2. Príprava prirodzeného nechta
                            </h3>

                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Správna príprava nechta pred aplikáciou gélu je kľúčová. Necht musí byť dôkladne očistený,
                                odkožičkovaný a jemne zmatený. Akýkoľvek olej alebo nečistota na nechtovej platničke môže
                                spôsobiť predčasné odlúpnutie gélu.
                            </p>

                            <h3 className="text-xl font-medium mt-8 mb-4 text-foreground">
                                3. Životný štýl a práca
                            </h3>

                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Ženy, ktoré pracujú manuálne, sú často v kontakte s vodou alebo chemikáliami, môžu zaznamenať
                                kratšiu výdrž gélových nechtov. Ak patríte do tejto kategórie, odporúčame používať rukavice
                                pri domácich prácach a umývaní riadu.
                            </p>

                            <h3 className="text-xl font-medium mt-8 mb-4 text-foreground">
                                4. Stav prirodzených nechtov
                            </h3>

                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Tenké, lámavé alebo poškodené nechty môžu mať problém udržať gél rovnako dlho ako zdravé,
                                pevné nechty. Pri prvej návšteve vždy zhodnotíme stav vašich nechtov a navrhneme najlepšie
                                riešenie pre vašu situáciu.
                            </p>

                            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">
                                Ako predĺžiť výdrž gélových nechtov
                            </h2>

                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Existuje niekoľko jednoduchých pravidiel, ktoré môžete dodržiavať, aby vaše gélové nechty
                                vydržali čo najdlhšie:
                            </p>

                            <ul className="list-disc pl-6 space-y-3 text-muted-foreground mb-8">
                                <li><strong>Používajte gumené rukavice</strong> pri umývaní riadu a upratovaní</li>
                                <li><strong>Vyhýbajte sa acetónovým odlakovačom</strong> – acetón oslabuje gél</li>
                                <li><strong>Aplikujte olejíček na kutikuly</strong> denne – hydratovaná koža okolo nechta = lepšia výdrž</li>
                                <li><strong>Nepoužívajte nechty ako nástroj</strong> – neoškrabujte nálepky, neotvárajte plechovky</li>
                                <li><strong>Chráňte nechty pred extrémnym teplom</strong> – sauna, horúca voda môžu oslabiť gél</li>
                                <li><strong>Dodržujte pravidelné doplnenie</strong> – každé 3 týždne je ideálne</li>
                            </ul>

                            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">
                                Kedy je čas na doplnenie?
                            </h2>

                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Viete, že je čas navštíviť nechtové štúdio, keď:
                            </p>

                            <ul className="list-disc pl-6 space-y-3 text-muted-foreground mb-8">
                                <li>Vidíte odrastenie viac ako 2-3 mm pri kutikule</li>
                                <li>Gél sa začína odlúpovať na okrajoch</li>
                                <li>Nechty strácajú lesk</li>
                                <li>Cítite, že nechty sú menej pevné</li>
                            </ul>

                            <div className="bg-primary/5 border border-primary/20 p-8 rounded-2xl my-8">
                                <h3 className="text-lg font-medium mb-4 text-foreground">⚠️ Dôležité upozornenie</h3>
                                <p className="text-muted-foreground mb-0">
                                    Nikdy neodtrhávajte gélové nechty! Tým môžete vážne poškodiť prirodzený necht. Ak potrebujete
                                    gél odstrániť, vždy navštívte profesionálny salón, kde to urobia bezpečne a šetrne.
                                </p>
                            </div>

                            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">
                                Gélové nechty v diara manicure. Trnava
                            </h2>

                            <p className="text-muted-foreground leading-relaxed mb-6">
                                V našom nechtovom štúdiu na Hospodárskej 53 v Trnave sa špecializujeme na gélové nechty,
                                ktoré vydržia. Používame iba kvalitné európske gély a venujeme maximálnu pozornosť príprave
                                nechta, čo zaručuje dlhú výdrž a krásny výsledok.
                            </p>

                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Aktuálny cenník nájdete na našej hlavnej stránke.
                                Ponúkame aj bezplatné parkovanie priamo pred salónom a kávu zdarma počas procedúry.
                            </p>

                            <div className="bg-beige dark:bg-card p-8 rounded-2xl my-8">
                                <h2 className="text-2xl font-light mb-4 text-foreground">
                                    Chcete gélové nechty darovať?
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Ak hľadáte darčekový poukaz na nechty v Trnave, poukaz môže obdarovaná osoba využiť
                                    aj na gélové nechty podľa aktuálnej ponuky a stavu nechtov.
                                </p>
                                <Link href="/darcekove-poukazy" className="font-medium text-primary hover:underline">
                                    Pozrieť darčekové poukazy
                                </Link>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-12">
                                <Button asChild className="rounded-full h-14 px-8">
                                    <a href="https://services.bookio.com/diaramanicure/widget?lang=sk" target="_blank" rel="noopener noreferrer">
                                        Objednať sa online
                                    </a>
                                </Button>
                                <Button variant="outline" asChild className="rounded-full h-14 px-8">
                                    <Link href="/#cennik">
                                        Pozrieť cenník
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        </div>
                    </article>
                </main>
            </div>
        </>
    )
}
