import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, X } from "lucide-react"

// Article bodies, keyed by slug from lib/blog-posts.ts. Plain h2/h3/p/ul are styled by the article page.

function Tip({ title, children }: { title: string; children: ReactNode }) {
    return (
        <aside className="my-8 rounded-2xl bg-beige p-8 dark:bg-card">
            <p className="!mb-3 text-lg font-medium text-foreground">{title}</p>
            <p className="!mb-0">{children}</p>
        </aside>
    )
}

function Warning({ title, children }: { title: string; children: ReactNode }) {
    return (
        <aside className="my-8 rounded-2xl border border-primary/20 bg-primary/5 p-8">
            <p className="!mb-3 text-lg font-medium text-foreground">{title}</p>
            <p className="!mb-0">{children}</p>
        </aside>
    )
}

function CheckList({ items, bad = false }: { items: [string, string][]; bad?: boolean }) {
    const Icon = bad ? X : Check
    return (
        <ul className="!list-none !pl-0">
            {items.map(([label, text]) => (
                <li key={label} className="flex items-start gap-3">
                    <Icon className={`mt-1 size-5 shrink-0 ${bad ? "text-red-500" : "text-green-500"}`} />
                    <span>
                        <strong>{label}</strong> – {text}
                    </span>
                </li>
            ))}
        </ul>
    )
}

function Photos({ items }: { items: [string, string][] }) {
    return (
        <div className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {items.map(([id, alt]) => (
                <figure key={id} className="!m-0">
                    <div className="relative aspect-square overflow-hidden rounded-xl">
                        <Image
                            src={`/gelove-nechty-trnava-gallery-${id}.jpg`}
                            alt={alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 50vw, 250px"
                        />
                    </div>
                    <figcaption className="mt-2 text-xs">{alt}</figcaption>
                </figure>
            ))}
        </div>
    )
}

const priceLink = (
    <Link href="/#cennik" className="text-primary hover:underline">
        cenníku
    </Link>
)

export const blogContent: Record<string, ReactNode> = {
    "kolko-stoja-gelove-nechty-trnava": (
        <>
            <p className="text-xl leading-relaxed">
                &quot;Koľko stoja gélové nechty?&quot; je otázka, ktorú v salóne <strong>diara manicure.</strong> na
                Hospodárskej 53 v Trnave počujeme takmer každý deň. Odpoveď závisí od toho, či chcete nové
                nechty, doplnenie, alebo len spevniť vlastné nechty. Nižšie nájdete aktuálne ceny a vysvetlenie, čo
                presne v nich je.
            </p>

            <h2>Aktuálne ceny sú vždy v cenníku pod článkom</h2>
            <p>
                Ceny pod týmto článkom sa načítavajú priamo z nášho rezervačného systému Bookio. Keď sa cena zmení,
                zmení sa aj tu, takže nikdy neuvidíte starý cenník. Rovnaké ceny platia pri online rezervácii aj pri
                objednaní telefonicky.
            </p>

            <h2>Čo je v cene gélových nechtov</h2>
            <p>Pri každej gélovej službe je v cene:</p>
            <ul>
                <li>
                    <strong>detailná suchá manikúra</strong> – čistenie nechtov, odstránenie kožičky a úprava tvaru,
                </li>
                <li>
                    <strong>výber farby</strong> z našej ponuky,
                </li>
                <li>
                    <strong>francúzska manikúra</strong> alebo <strong>jemné zdobenie</strong> bez príplatku.
                </li>
            </ul>
            <p>
                Za kávu ani parkovanie pred salónom neplatíte nič a zaplatiť môžete aj kartou.
            </p>

            <h2>Ktorú službu si vybrať</h2>
            <h3>Gélová báza s gél lakom</h3>
            <p>
                Vhodná na krátke prirodzené nechty. Necht spevní gélová báza a navrch príde farba gél laku. Je to
                najrýchlejšia a najlacnejšia gélová služba. Viac o rozdieloch nájdete v článku{" "}
                <Link href="/blog/rozdiel-gel-lak-gelova-modelacia" className="text-primary hover:underline">
                    Gél lak alebo gélová modelácia?
                </Link>
            </p>
            <h3>Spevnenie prirodzených nechtov gélom</h3>
            <p>
                Pre klientky, ktoré chcú zostať pri vlastnej dĺžke, ale potrebujú pevnejší necht, ktorý sa nebude
                lámať.
            </p>
            <h3>Modelácia gélových nechtov – nové a doplnenie</h3>
            <p>
                Nové nechty znamenajú predĺženie na šablóny a vytvorenie tvaru od začiatku. Doplnenie je lacnejšie,
                lebo upravujeme odrastené nechty, ktoré už máte. Preto sa oplatí chodiť na doplnenie pravidelne,
                približne každé 3 týždne.
            </p>

            <h2>Kedy sa platí príplatok</h2>
            <p>Príplatok sa platí len v týchto prípadoch:</p>
            <ul>
                <li>extra dizajn, ktorý je náročnejší ako jemné zdobenie,</li>
                <li>extrémne dlhé nechty,</li>
                <li>zbrúsenie akrylu pri doplnení, ak prichádzate s akrylovými nechtami z iného salóna,</li>
                <li>predĺženie jednotlivého nechta v rámci doplnenia (účtuje sa za kus).</li>
            </ul>
            <p>Aktuálne sumy príplatkov sú v cenníku pod článkom.</p>

            <Tip title="Tip od profesionálky">
                Ak si nie ste istá, ktorú službu vybrať, objednajte si tú, ktorá je najbližšie k tomu, čo chcete. Na
                mieste sa pozrieme na vaše nechty a ak bude vhodnejšia iná služba, povieme vám to ešte pred začatím.
            </Tip>

            <h2>Prečo nevyberať len podľa najnižšej ceny</h2>
            <p>
                Lacnejšie nechty, ktoré sa odlúpia po týždni, nakoniec vyjdú drahšie. O výdrži rozhoduje najmä
                príprava nechta a kvalitný materiál. Čo ešte ovplyvňuje výdrž, vysvetľujeme v článku{" "}
                <Link href="/blog/ako-dlho-vydrzia-gelove-nechty" className="text-primary hover:underline">
                    Ako dlho vydržia gélové nechty?
                </Link>
            </p>
        </>
    ),

    "ako-bezpecne-odstranit-gel-lak": (
        <>
            <p className="text-xl leading-relaxed">
                Gél lak a gélové nechty držia pevne, a práve preto sa nesmú odstraňovať nasilu. V tomto článku
                vysvetlíme, prečo ich nikdy neodlupovať, ako prebieha šetrné odstránenie v salóne a čo robiť, keď sa
                vám gél začne dvíhať doma.
            </p>

            <h2>Prečo gél nikdy neodlupovať</h2>
            <p>
                Gél je pevne spojený s vrchnou vrstvou prírodného nechta. Keď ho strhnete, odtrhnete s ním aj tenké
                vrstvy nechta. Necht je potom tenký, ohybný, láme sa a niekedy aj bolí. Zotavenie trvá dlho, lebo
                poškodená časť musí celá odrásť.
            </p>

            <Warning title="Dôležité upozornenie">
                Nikdy gél neodlupujte, nepáčte ani neodhrýzajte. Ani keď sa na okraji už trochu dvíha. Práve vtedy
                je pokušenie najväčšie a poškodenie najčastejšie.
            </Warning>

            <h2>Gél lak a stavebný gél sa odstraňujú inak</h2>
            <h3>Gél lak</h3>
            <p>
                Klasický gél lak sa dá rozpustiť. Vrchná lesklá vrstva sa jemne zmatní, aby sa odlakovač dostal
                dovnútra, a necht sa na niekoľko minút zabalí. Zmäknutý gél sa potom opatrne zotrie.
            </p>
            <h3>Gélová báza a gélové nechty</h3>
            <p>
                Stavebný gél a väčšina gélových báz sa nerozpúšťa. Odstraňuje sa šetrným zbrúsením vrstvy po vrstve,
                tak aby zostal neporušený prírodný necht. Toto by mala robiť skúsená manikérka, ktorá vie, kde gél
                končí a kde začína necht.
            </p>

            <h2>Ako prebieha odstránenie v našom salóne</h2>
            <ul>
                <li>Pozrieme sa, aký materiál máte na nechtoch, aj keď ste ho robili inde.</li>
                <li>Podľa materiálu zvolíme rozpustenie alebo šetrné zbrúsenie.</li>
                <li>Necht na konci upravíme, vyhladíme a ošetríme kožičku olejčekom.</li>
            </ul>
            <p>
                Ak u nás pokračujete novou službou, napríklad doplnením alebo novým gél lakom, odstránenie starého
                materiálu je súčasťou tejto služby. Samostatné odstránenie gélových alebo akrylových nechtov si
                vyberáte len vtedy, keď už ďalšiu modeláciu nechcete. Aktuálnu cenu nájdete v {priceLink}.
            </p>

            <h2>Čo robiť, keď sa gél odlúpi doma</h2>
            <ul>
                <li>Neťahajte za uvoľnený okraj.</li>
                <li>Ak sa o okraj zachytávate, jemne ho skráťte nožničkami alebo zapilujte pilníkom.</li>
                <li>Prelepte necht náplasťou, aby sa ďalej nedvíhal.</li>
                <li>Objednajte sa na opravu alebo odstránenie čo najskôr.</li>
            </ul>
            <p>
                Výmenu alebo opravu jedného nechta mimo doplnenia robíme po dohode telefonicky alebo cez SMS.
            </p>

            <h2>Starostlivosť po odstránení</h2>
            <ul>
                <li>
                    <strong>Olejček na kožičku</strong> každý deň, najlepšie večer.
                </li>
                <li>
                    <strong>Krém na ruky</strong> po každom umytí rúk.
                </li>
                <li>
                    <strong>Rukavice</strong> pri upratovaní a umývaní riadu.
                </li>
                <li>
                    <strong>Kratšia dĺžka</strong> pár týždňov, kým necht zosilnie.
                </li>
            </ul>

            <Tip title="Tip od profesionálky">
                Ak vaše nechty po odstránení pôsobia slabo, nemusíte čakať, kým zosilnejú. Spevnenie prirodzených
                nechtov gélom ich ochráni pred lámaním, kým odrastú.
            </Tip>
        </>
    ),

    "jesenne-nechty-2026": (
        <>
            <p className="text-xl leading-relaxed">
                Jeseň je v salóne <strong>diara manicure.</strong> obdobím teplých a tmavších farieb. Pozreli sme sa
                na to, čo tejto jeseni robíme najčastejšie, a vybrali fotky priamo z nášho salóna v Trnave. Môžu vám
                pomôcť vybrať si dizajn na ďalšiu návštevu.
            </p>

            <h2>Bordová v každej podobe</h2>
            <p>
                Bordová je jasná jednotka tejto jesene. Klientky ju nosia jednofarebnú na krátkych nechtoch, na dlhých
                mandľových, s bodkami, s čiarami aj ako mramor.
            </p>
            <Photos
                items={[
                    ["107", "Krátke bordové nechty"],
                    ["112", "Bordové s bielymi bodkami"],
                    ["105", "Tmavobordové s čiarami"],
                ]}
            />

            <h2>Hnedá a čokoládová</h2>
            <p>
                Hnedá je decentná a hodí sa k jesennému oblečeniu. Veľmi obľúbená je mikro francúzska manikúra s
                tenkou hnedou špičkou, ktorá pôsobí elegantne aj do práce.
            </p>
            <Photos
                items={[
                    ["96", "Hnedé jednofarebné nechty"],
                    ["94", "Hnedá mikro francúzska manikúra"],
                    ["98", "Ružové s hnedým jesenným zdobením"],
                ]}
            />

            <h2>Cat eye, trblietky a teplé kovové tóny</h2>
            <p>
                Kto chce viac lesku, volí bronzovú alebo zlatú cat eye, medené trblietky alebo kombináciu bordovej s
                oranžovou. Cat eye má v sebe magnetické čiastočky, ktoré pri pohybe ruky vytvárajú efekt svetla.
            </p>
            <Photos
                items={[
                    ["106", "Zlato-bronzové cat eye"],
                    ["111", "Červené s medenými trblietkami"],
                    ["103", "Bordová a oranžová s trblietkami"],
                ]}
            />

            <h2>Tmavozelená a fialová</h2>
            <p>
                Pre odvážnejšie klientky je tu tmavozelená s lístkami a tmavofialová so zlatým zdobením. Obe farby
                pôsobia na jeseň luxusne a sú príjemnou zmenou oproti bordovej.
            </p>
            <Photos
                items={[
                    ["110", "Zelené s lístkami"],
                    ["113", "Fialové so zlatým pierkom"],
                    ["117", "Fialovo-bordové nechty"],
                ]}
            />

            <Tip title="Tip od profesionálky">
                Tmavé farby viac zvýraznia odrastenie pri kožičke. Ak chcete tmavú farbu nosiť dlhšie, príďte na
                doplnenie približne po 3 týždňoch, nechty budú stále pôsobiť upravene.
            </Tip>

            <h2>Ako si vybrať jesenný dizajn</h2>
            <ul>
                <li>
                    <strong>Do práce:</strong> hnedá mikro francúzska alebo mliečna ružová.
                </li>
                <li>
                    <strong>Na každý deň:</strong> jednofarebná bordová alebo hnedá.
                </li>
                <li>
                    <strong>Na večer a oslavy:</strong> cat eye, trblietky alebo zlaté zdobenie.
                </li>
            </ul>
            <p>
                Jemné zdobenie, napríklad bodky, čiary alebo lístky, je v cene služby. Náročnejší dizajn je za
                príplatok podľa {priceLink}. Ďalšie inšpirácie nájdete v našej{" "}
                <Link href="/galeria" className="text-primary hover:underline">
                    galérii
                </Link>
                . Fotku dizajnu, ktorý sa vám páči, nám pokojne ukážte pri návšteve.
            </p>
        </>
    ),

    "nechty-na-svadbu-a-ples": (
        <>
            <p className="text-xl leading-relaxed">
                Na svadobných a plesových fotkách sú ruky vidieť viac, než si myslíte: pri prstienkoch, kytici aj pri
                prípitku. V tomto článku vám poradíme, kedy sa objednať, čo si vybrať a ako sa na návštevu pripraviť,
                aby nechty vyzerali dokonale celý večer.
            </p>

            <h2>Kedy sa objednať</h2>
            <p>
                Ideálne je prísť <strong>1 až 3 dni pred</strong> svadbou alebo plesom. Nechty sú čerstvé, bez
                odrastenia a máte ešte čas zvyknúť si na nový tvar. Na deň udalosti nechty radšej nenechávajte, je
                to zbytočný stres navyše.
            </p>
            <p>
                Termín si zarezervujte <strong>niekoľko týždňov vopred</strong>. V sezóne plesov a svadieb sa termíny
                plnia rýchlejšie. Voľné termíny vidíte online v rezervácii.
            </p>

            <Tip title="Tip pre nevesty">
                Ak gélové nechty ešte nenosíte, príďte na skúšku približne mesiac pred svadbou. Zistíte, aký tvar a
                dĺžka vám sedia, a pred svadbou už len prídete na doplnenie.
            </Tip>

            <h2>Čo si vybrať na svadbu</h2>
            <p>Nevesty u nás najčastejšie volia nadčasové a jemné dizajny:</p>
            <ul>
                <li>
                    <strong>francúzska manikúra</strong> – klasika, ktorá sa hodí k šatám aj k prsteňu,
                </li>
                <li>
                    <strong>mliečna ružová</strong> – čistý a prirodzený vzhľad,
                </li>
                <li>
                    <strong>jemné ombré s trblietkami</strong> – decentné, ale na fotkách sa krásne ligoce.
                </li>
            </ul>
            <Photos
                items={[
                    ["109", "Francúzska manikúra so zdobením"],
                    ["108", "Mliečne ružové mandľové"],
                    ["104", "Ružové ombré s trblietkami"],
                ]}
            />

            <h2>Čo si vybrať na ples</h2>
            <p>
                Na ples môžete byť odvážnejšia. Dobre funguje farba ladená k šatám, výrazná červená alebo jeden
                trblietavý necht. Ak máte šaty v inej farbe, tón, ktorý sa k nim hodí, vám pomôžeme vybrať na mieste.
            </p>
            <Photos
                items={[
                    ["115", "Červené hranaté nechty"],
                    ["116", "Ružové so strieborným nechtom"],
                    ["114", "Ružovo-bordové s trblietkami"],
                ]}
            />

            <h2>Tvar a dĺžka</h2>
            <p>
                Mandľový a oválny tvar opticky predlžuje prsty a na fotkách pôsobí jemne. Ak nechty nosíte prvýkrát,
                zvoľte strednú dĺžku. Budete v nich pohodlne zapínať šaty, dávať si prstienok aj písať správy.
            </p>

            <h2>Ako sa pripraviť na návštevu</h2>
            <ul>
                <li>Kožičky si sami nestrihajte, postaráme sa o ne počas manikúry.</li>
                <li>Prineste si fotku šiat, kytice alebo inšpirácie, ktorá sa vám páči.</li>
                <li>Ak máte gélové nechty, objednajte sa na doplnenie, nie na nové nechty.</li>
                <li>Naplánujte si dosť času, nové gélové nechty trvajú približne 1,5 až 2 hodiny.</li>
            </ul>

            <h2>Darček pre nevestu alebo družičky</h2>
            <p>
                Nechty pred svadbou sú obľúbený darček od mamy, svedkyne alebo budúceho manžela. Hodnotu vyberiete
                pri kúpe a nevesta si termín vyberie sama.
            </p>
        </>
    ),

    "ako-dlho-vydrzia-gelove-nechty": (
        <>
            <p className="text-xl leading-relaxed">
                Gélové nechty sú jednou z najpopulárnejších volieb pre ženy, ktoré chcú mať krásne a upravené ruky.
                Jedna z najčastejších otázok, ktorú dostávame v našom nechtovom štúdiu <strong>diara manicure.</strong>{" "}
                v Trnave, je práve táto: &quot;Ako dlho mi vydržia gélové nechty?&quot; V tomto článku vám prezradíme
                všetko, čo potrebujete vedieť.
            </p>

            <h2>Priemerná výdrž gélových nechtov</h2>
            <p>
                Pri správnej aplikácii a starostlivosti by mali gélové nechty vydržať <strong>3 až 4 týždne</strong>{" "}
                bez výrazného poškodenia alebo odlúpnutia. V našom štúdiu diara manicure. používame kvalitné európske
                gély, ktoré zaručujú dlhú výdrž a šetria prirodzený necht.
            </p>
            <p>
                Výdrž sa môže líšiť v závislosti od viacerých faktorov, ktoré si rozoberieme nižšie. Niektoré
                klientky majú gélové nechty bez problémov aj 5 týždňov, zatiaľ čo iné potrebujú doplnenie už po 2 až
                3 týždňoch.
            </p>

            <Tip title="Tip od profesionálky">
                Ideálny interval pre doplnenie gélových nechtov je každé 3 týždne. Tým zabezpečíte, že vaše nechty
                budú vždy vyzerať upravene a prirodzený necht nebude zbytočne namáhaný prílišným odrastením.
            </Tip>

            <h2>Faktory ovplyvňujúce výdrž gélových nechtov</h2>
            <h3>1. Kvalita použitých materiálov</h3>
            <p>
                Toto je najdôležitejší faktor. Nekvalitné gély môžu spôsobiť alergické reakcie a majú výrazne kratšiu
                výdrž. V diara manicure. pracujeme s certifikovanými európskymi značkami, ktoré spĺňajú normy EÚ.
            </p>
            <h3>2. Príprava prirodzeného nechta</h3>
            <p>
                Správna príprava nechta pred aplikáciou gélu je kľúčová. Necht musí byť dôkladne očistený,
                odkožičkovaný a jemne zmatnený. Akýkoľvek olej alebo nečistota na nechtovej platničke môže spôsobiť
                predčasné odlúpnutie gélu.
            </p>
            <h3>3. Životný štýl a práca</h3>
            <p>
                Ženy, ktoré pracujú manuálne alebo sú často v kontakte s vodou či chemikáliami, môžu zaznamenať
                kratšiu výdrž gélových nechtov. Ak patríte do tejto skupiny, odporúčame používať rukavice pri domácich
                prácach a umývaní riadu.
            </p>
            <h3>4. Stav prirodzených nechtov</h3>
            <p>
                Tenké, lámavé alebo poškodené nechty môžu mať problém udržať gél rovnako dlho ako zdravé, pevné
                nechty. Pri prvej návšteve vždy zhodnotíme stav vašich nechtov a navrhneme najlepšie riešenie.
            </p>

            <h2>Ako predĺžiť výdrž gélových nechtov</h2>
            <ul>
                <li>
                    <strong>Používajte gumené rukavice</strong> pri umývaní riadu a upratovaní.
                </li>
                <li>
                    <strong>Vyhýbajte sa acetónovým odlakovačom</strong> – acetón oslabuje gél.
                </li>
                <li>
                    <strong>Aplikujte olejček na kožičku</strong> denne – hydratovaná koža okolo nechta znamená lepšiu
                    výdrž.
                </li>
                <li>
                    <strong>Nepoužívajte nechty ako nástroj</strong> – neoškrabujte nálepky, neotvárajte plechovky.
                </li>
                <li>
                    <strong>Chráňte nechty pred extrémnym teplom</strong> – sauna a horúca voda môžu oslabiť gél.
                </li>
                <li>
                    <strong>Dodržujte pravidelné doplnenie</strong> – každé 3 týždne je ideálne.
                </li>
            </ul>

            <h2>Kedy je čas na doplnenie?</h2>
            <ul>
                <li>Vidíte odrastenie viac ako 2 až 3 mm pri kožičke.</li>
                <li>Gél sa začína odlupovať na okrajoch.</li>
                <li>Nechty strácajú lesk.</li>
                <li>Cítite, že nechty sú menej pevné.</li>
            </ul>

            <Warning title="Dôležité upozornenie">
                Nikdy neodtrhávajte gélové nechty! Môžete tým vážne poškodiť prirodzený necht. Ako gél odstrániť
                bezpečne, vysvetľujeme v článku{" "}
                <Link href="/blog/ako-bezpecne-odstranit-gel-lak" className="text-primary hover:underline">
                    Ako bezpečne odstrániť gél lak
                </Link>
                .
            </Warning>

            <h2>Gélové nechty v diara manicure. Trnava</h2>
            <p>
                V našom nechtovom štúdiu na Hospodárskej 53 v Trnave sa špecializujeme na gélové nechty, ktoré
                vydržia. Používame kvalitné európske gély a venujeme veľkú pozornosť príprave nechta, čo zaručuje dlhú
                výdrž a krásny výsledok. Aktuálne ceny nájdete v {priceLink}. Parkovanie priamo pred salónom a káva
                počas návštevy sú zdarma.
            </p>
        </>
    ),

    "rozdiel-gel-lak-gelova-modelacia": (
        <>
            <p className="text-xl leading-relaxed">
                Neviete sa rozhodnúť medzi gél lakom a gélovou modeláciou? Obe služby patria v salóne{" "}
                <strong>diara manicure.</strong> v Trnave medzi najobľúbenejšie. Vysvetlíme vám rozdiely a pomôžeme
                vybrať tú, ktorá sa hodí práve vám.
            </p>

            <h2>Čo je gél lak?</h2>
            <p>
                Gél lak je hybridný produkt, ktorý kombinuje vlastnosti klasického laku na nechty a UV gélu. Nanáša sa
                priamo na prirodzený necht a vytvrdzuje sa pod UV alebo LED lampou.
            </p>
            <p>
                Na rozdiel od bežného laku sa gél lak neodlupuje, neškrabe a zachováva si lesk počas celej doby
                nosenia. Je to ideálna voľba pre ženy, ktoré majú zdravé, pevné nechty a chcú pridať farbu a lesk. U
                nás ho robíme na gélovú bázu, ktorá prirodzený necht navyše spevní.
            </p>
            <h3>Výhody gél laku</h3>
            <CheckList
                items={[
                    ["Rýchlejšia aplikácia", "návšteva je kratšia ako pri modelácii"],
                    ["Prirodzený vzhľad", "tenká vrstva, nechty pôsobia prirodzene"],
                    ["Nižšia cena", "lacnejšia alternatíva ku gélovej modelácii"],
                    ["Menej zaťažuje necht", "ideálne pre zdravé nechty"],
                ]}
            />
            <h3>Nevýhody gél laku</h3>
            <CheckList
                bad
                items={[
                    ["Kratšia výdrž", "2 až 3 týždne oproti 3 až 4 týždňom pri gélovej modelácii"],
                    ["Nepredĺži nechty", "iba pokryje prirodzenú dĺžku"],
                    ["Menšia pevnosť", "dlhé nechty pred lámaním neochráni"],
                    ["Obmedzené zdobenie", "nie je vhodný pre 3D nail art"],
                ]}
            />

            <h2>Čo je gélová modelácia nechtov?</h2>
            <p>
                Gélová modelácia je komplexnejšia technika, pri ktorej sa na prirodzený necht alebo na šablónu nanáša
                viac vrstiev stavebného gélu. Tento gél je hustejší a pevnejší ako gél lak a umožňuje nechty nielen
                pokryť, ale aj predĺžiť a tvarovať.
            </p>
            <p>
                V našom štúdiu používame kvalitné európske stavebné gély, ktoré sú šetrné k prirodzenému nechtu a
                majú výbornú výdrž.
            </p>
            <h3>Výhody gélovej modelácie</h3>
            <CheckList
                items={[
                    ["Dlhšia výdrž", "3 až 4 týždne, niekedy aj viac"],
                    ["Možnosť predĺženia", "dĺžku si vyberiete podľa seba"],
                    ["Väčšia pevnosť", "chráni lámavé nechty"],
                    ["Korekcia tvaru", "tvar nechtov sa dá zmeniť"],
                    ["Široké možnosti zdobenia", "3D nail art, kamienky, fólie"],
                ]}
            />
            <h3>Nevýhody gélovej modelácie</h3>
            <CheckList
                bad
                items={[
                    ["Dlhší čas aplikácie", "nové nechty približne 1,5 až 2 hodiny"],
                    ["Vyššia cena", "náročnejšia práca"],
                    ["Zložitejšie odstránenie", "vyžaduje profesionálku"],
                    ["Pravidelná údržba", "doplnenie približne každé 3 týždne"],
                ]}
            />

            <div className="my-8 overflow-x-auto rounded-2xl bg-beige p-8 dark:bg-card">
                <p className="!mb-4 text-lg font-medium text-foreground">Porovnanie na prvý pohľad</p>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-primary/20 text-foreground">
                            <th className="py-3 text-left font-medium">Vlastnosť</th>
                            <th className="py-3 text-left font-medium">Gél lak</th>
                            <th className="py-3 text-left font-medium">Gélová modelácia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            ["Výdrž", "2 – 3 týždne", "3 – 4 týždne"],
                            ["Čas návštevy", "kratší", "1,5 – 2 hod (nové)"],
                            ["Predĺženie", "Nie", "Áno"],
                            ["Pevnosť", "Nižšia", "Vysoká"],
                        ].map(([label, a, b]) => (
                            <tr key={label} className="border-b border-primary/10">
                                <td className="py-3">{label}</td>
                                <td className="py-3">{a}</td>
                                <td className="py-3">{b}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h2>Ktorú možnosť si vybrať?</h2>
            <h3>Vyberte si gél lak, ak:</h3>
            <ul>
                <li>máte zdravé, pevné prirodzené nechty,</li>
                <li>ste spokojná so svojou prirodzenou dĺžkou,</li>
                <li>preferujete prirodzený vzhľad,</li>
                <li>máte menej času na návštevu salóna,</li>
                <li>hľadáte lacnejšiu možnosť.</li>
            </ul>
            <h3>Vyberte si gélovú modeláciu, ak:</h3>
            <ul>
                <li>chcete dlhšie nechty,</li>
                <li>máte lámavé alebo tenké nechty,</li>
                <li>chcete zmeniť tvar nechtov,</li>
                <li>chcete výraznejšie zdobenie a nail art,</li>
                <li>potrebujete čo najdlhšiu výdrž.</li>
            </ul>

            <h2>Naše odporúčanie</h2>
            <p>
                Pri prvej návšteve vždy prekonzultujeme stav vašich nechtov a váš životný štýl, aby sme vám mohli
                odporučiť najvhodnejšiu možnosť. Univerzálne &quot;najlepšie&quot; riešenie neexistuje, záleží na vašich
                potrebách. Aktuálne ceny oboch služieb nájdete v {priceLink}. Ak sa rozhodujete hlavne podľa ceny,
                pozrite si aj článok{" "}
                <Link href="/blog/kolko-stoja-gelove-nechty-trnava" className="text-primary hover:underline">
                    Koľko stoja gélové nechty v Trnave?
                </Link>
            </p>
        </>
    ),
}
