import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { ArrowLeft, Clock, Calendar, User, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { siteConfig } from "@/lib/site-config"

const pageUrl = `${siteConfig.baseUrl}/blog/rozdiel-gel-lak-gelova-modelacia`
const title = "Gél lak alebo gélová modelácia? | diara manicure."
const description =
    "Porovnanie gél laku a gélovej modelácie: výdrž, cena, vzhľad, odstránenie a odporúčanie pre klientky v Trnave."
const imageUrl = `${siteConfig.baseUrl}/gelove-nechty-trnava-gallery-2.jpeg`

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
                alt: "Porovnanie gél laku a gélovej modelácie nechtov",
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

function ArticleHeader() {
    return (
        <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-tight leading-tight">
                Rozdiel medzi gél lakom a gélovou modeláciou: Ktorú variantu si vybrať?
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>5. január 2026</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="size-4" />
                    <span>10 min čítania</span>
                </div>
                <div className="flex items-center gap-2">
                    <User className="size-4" />
                    <span>Andrea Hečková</span>
                </div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
                <Image
                    src="/gelove-nechty-trnava-gallery-2.jpeg"
                    alt="Porovnanie gél laku a gélovej modelácie nechtov"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 768px"
                />
            </div>
        </header>

    )
}

function ArticleBody() {
    return (
        <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Rozhodujete sa medzi gél lakom a gélovou modeláciou nechtov? Nie ste si istá, ktorá možnosť
                je pre vás tá pravá? V tomto komplexnom sprievodcovi vám vysvetlíme všetky rozdiely, výhody
                aj nevýhody každej z týchto techník, aby ste mohli urobiť informované rozhodnutie.
            </p>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">
                Čo je gél lak (Shellac)?
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
                Gél lak, známy aj pod obchodným názvom Shellac, je hybridný produkt kombinujúci vlastnosti
                klasického laku na nechty a UV gélu. Aplikuje sa priamo na prirodzený necht a vytvrdí sa
                pod UV alebo LED lampou.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
                Na rozdiel od bežného laku, gél lak neodlupuje, neškrabe a zachováva si lesklý vzhľad počas
                celej doby nosenia. Je to ideálna voľba pre ženy, ktoré majú zdravé, pevné nechty a chcú
                len pridať farbu a lesk.
            </p>

            <h3 className="text-xl font-medium mt-8 mb-4 text-foreground">
                Výhody gél laku:
            </h3>

            <ul className="list-none pl-0 space-y-3 text-muted-foreground mb-8">
                <li className="flex items-start gap-3">
                    <Check className="size-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Rýchla aplikácia</strong> – celý proces trvá približne 30-45 minút</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="size-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Prirodzený vzhľad</strong> – tenká vrstva, nechty pôsobia prirodzene</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="size-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Nižšia cena</strong> – lacnejšia alternatíva ako gélová modelácia</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="size-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Jednoduchšie odstránenie</strong> – namočením v acetóne</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="size-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Menej zaťažuje necht</strong> – ideálne pre zdravé nechty</span>
                </li>
            </ul>

            <h3 className="text-xl font-medium mt-8 mb-4 text-foreground">
                Nevýhody gél laku:
            </h3>

            <ul className="list-none pl-0 space-y-3 text-muted-foreground mb-8">
                <li className="flex items-start gap-3">
                    <X className="size-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>Kratšia výdrž</strong> – 2-3 týždne oproti 3-4 týždňom pri gélovej modelácii</span>
                </li>
                <li className="flex items-start gap-3">
                    <X className="size-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>Nepredĺži nechty</strong> – iba pokrýva prirodzenú dĺžku</span>
                </li>
                <li className="flex items-start gap-3">
                    <X className="size-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>Menšia pevnosť</strong> – nechráni pred lámaním</span>
                </li>
                <li className="flex items-start gap-3">
                    <X className="size-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>Obmedzené možnosti zdobenia</strong> – nie je vhodný pre 3D nail art</span>
                </li>
            </ul>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">
                Čo je gélová modelácia nechtov?
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
                Gélová modelácia je komplexnejšia technika, pri ktorej sa na prirodzený necht (alebo na šablónu/tip)
                nanášajú viaceré vrstvy stavebného gélu. Tento gél je hrubší a pevnejší ako gél lak a umožňuje
                nielen pokryť, ale aj predĺžiť a tvarovať nechty.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
                V našom štúdiu <strong>diara manicure.</strong> v Trnave používame výhradne kvalitné európske
                stavebné gély, ktoré sú šetrné k prirodzenému nechtu a poskytujú vynikajúcu výdrž.
            </p>

            <h3 className="text-xl font-medium mt-8 mb-4 text-foreground">
                Výhody gélovej modelácie:
            </h3>

            <ul className="list-none pl-0 space-y-3 text-muted-foreground mb-8">
                <li className="flex items-start gap-3">
                    <Check className="size-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Dlhšia výdrž</strong> – 3-4 týždne, niekedy aj viac</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="size-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Možnosť predĺženia</strong> – môžete mať nechty akejkoľvek dĺžky</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="size-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Väčšia pevnosť</strong> – chráni lámavé nechty</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="size-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Korekcia tvaru</strong> – môžete zmeniť tvar nechtov</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="size-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Široké možnosti zdobenia</strong> – 3D nail art, kamienky, fólie</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="size-5 text-green-500 mt-1 flex-shrink-0" />
                    <span><strong>Ideálne pre poškodené nechty</strong> – pomáha ich &quot;dorásť&quot;</span>
                </li>
            </ul>

            <h3 className="text-xl font-medium mt-8 mb-4 text-foreground">
                Nevýhody gélovej modelácie:
            </h3>

            <ul className="list-none pl-0 space-y-3 text-muted-foreground mb-8">
                <li className="flex items-start gap-3">
                    <X className="size-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>Dlhší čas aplikácie</strong> – 1,5 až 2 hodiny</span>
                </li>
                <li className="flex items-start gap-3">
                    <X className="size-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>Vyššia cena</strong> – komplexnejšia práca = vyššie náklady</span>
                </li>
                <li className="flex items-start gap-3">
                    <X className="size-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>Zložitejšie odstránenie</strong> – vyžaduje profesionála</span>
                </li>
                <li className="flex items-start gap-3">
                    <X className="size-5 text-red-500 mt-1 flex-shrink-0" />
                    <span><strong>Pravidelná údržba</strong> – vyžaduje doplnenie každé 3 týždne</span>
                </li>
            </ul>

            <div className="bg-beige dark:bg-card p-8 rounded-2xl my-8">
                <h3 className="text-lg font-medium mb-4 text-foreground">📊 Porovnanie na prvý pohľad</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-primary/20">
                                <th className="text-left py-3 font-medium">Vlastnosť</th>
                                <th className="text-left py-3 font-medium">Gél lak</th>
                                <th className="text-left py-3 font-medium">Gélová modelácia</th>
                            </tr>
                        </thead>
                        <tbody className="text-muted-foreground">
                            <tr className="border-b border-primary/10">
                                <td className="py-3">Výdrž</td>
                                <td className="py-3">2-3 týždne</td>
                                <td className="py-3">3-4 týždne</td>
                            </tr>
                            <tr className="border-b border-primary/10">
                                <td className="py-3">Čas aplikácie</td>
                                <td className="py-3">30-45 min</td>
                                <td className="py-3">1,5-2 hod</td>
                            </tr>
                            <tr className="border-b border-primary/10">
                                <td className="py-3">Predĺženie</td>
                                <td className="py-3">Nie</td>
                                <td className="py-3">Áno</td>
                            </tr>
                            <tr className="border-b border-primary/10">
                                <td className="py-3">Pevnosť</td>
                                <td className="py-3">Nízka</td>
                                <td className="py-3">Vysoká</td>
                            </tr>
                            <tr className="border-b border-primary/10">
                                <td className="py-3">Cena</td>
                                <td className="py-3">Pozrite cenník</td>
                                <td className="py-3">Pozrite cenník</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">
                Ktorú možnosť si vybrať?
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
                Rozhodnutie závisí od vašich individuálnych potrieb a preferencií. Tu je rýchly sprievodca:
            </p>

            <h3 className="text-xl font-medium mt-8 mb-4 text-foreground">
                Vyberte si gél lak, ak:
            </h3>

            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                <li>Máte zdravé, pevné prirodzené nechty</li>
                <li>Ste spokojná so svojou prirodzenou dĺžkou nechtov</li>
                <li>Preferujete prirodzený vzhľad</li>
                <li>Máte obmedzený čas na návštevu salóna</li>
                <li>Hľadáte lacnejšiu variantu</li>
            </ul>

            <h3 className="text-xl font-medium mt-8 mb-4 text-foreground">
                Vyberte si gélovú modeláciu, ak:
            </h3>

            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
                <li>Chcete dlhšie nechty</li>
                <li>Máte lámavé alebo tenké nechty</li>
                <li>Chcete zmeniť tvar nechtov</li>
                <li>Preferujete výraznejšie zdobenie a nail art</li>
                <li>Potrebujete maximálnu výdrž</li>
            </ul>

            <h2 className="text-2xl font-light mt-12 mb-6 text-foreground">
                Naša odporúčanie
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
                Pri prvej návšteve v našom štúdiu <strong>diara manicure.</strong> v Trnave vždy prekonzultujeme
                váš stav nechtov a životný štýl, aby sme vám mohli odporučiť najvhodnejšiu variantu.
                Neexistuje univerzálne &quot;najlepšie&quot; riešenie – záleží na vašich individuálnych potrebách.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
                Ponúkame obe služby za výhodné ceny:
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
                Aktuálny cenník nájdete na <Link href="/#cennik" className="text-primary hover:underline">našej hlavnej stránke</Link>.
            </p>

            <div className="bg-beige dark:bg-card p-8 rounded-2xl my-8">
                <h2 className="text-2xl font-light mb-4 text-foreground">
                    Neviete, ktorú službu vybrať ako darček?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                    Darčekový poukaz na nechty v Trnave nechá výber na obdarovanej osobe.
                    Môže ho využiť na gél lak, gélovú modeláciu alebo manikúru podľa aktuálnej ponuky.
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
                        Pozrieť kompletný cenník
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default function BlogArticle2() {
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        mainEntityOfPage: pageUrl,
        headline: "Rozdiel medzi gél lakom a gélovou modeláciou: Ktorú variantu si vybrať?",
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
        about: ["gél lak", "gélová modelácia", "manikúra Trnava"],
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
                name: "Gél lak alebo gélová modelácia?",
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

                            <ArticleHeader />
                            <ArticleBody />
                        </div>
                    </article>
                </main>
            </div>
        </>
    )
}
