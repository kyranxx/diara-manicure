export const gallerySectionImageIds = {
  french: ["54", "49", "47", "44", "41", "40", "34", "25", "24", "21", "17", "12", "9"],
  singleColor: [
    "53",
    "52",
    "50",
    "46",
    "42",
    "39",
    "37",
    "33",
    "32",
    "30",
    "29",
    "28",
    "27",
    "26",
    "23",
    "20",
    "19",
    "16",
    "15",
    "14",
    "13",
    "11",
    "10",
    "6",
    "5",
    "4",
    "3",
    "2",
    "1",
  ],
  delicateArt: ["51", "48", "45", "43", "38", "36", "35", "31", "22", "18", "8", "7"],
} as const

export const galleryCategories = ["french", "singleColor", "delicateArt"] as const

const galleryImageAltById: Record<string, string> = {
  "1": "Neonovo oranzove gelove nechty s mandlovym tvarom v salone diara manicure v Trnave",
  "2": "Sytoruzove gelove nechty s lesklym povrchom v nechtovom studiu Trnava",
  "3": "Ruzove gelove nechty so striebornym akcentom a mandlovym tvarom",
  "4": "Bordove gelove nechty s vysokym leskom pre elegantnu manikuru",
  "5": "Ruzove mandlove gelove nechty z galerie diara manicure Trnava",
  "6": "Zlte jarne gelove nechty s vyraznou farbou",
  "7": "Tmave bordove dlhe gelove nechty s lesklym finisom",
  "8": "Jemna mliecna francuzska manikura na prirodzenych nechtoch",
  "9": "Kratka prirodzena francuzska manikura v Trnave",
  "10": "Cervene kratke gelove nechty s klasickym leskom",
  "11": "Kralovsky modre gelove nechty s plnou farbou",
  "12": "Klasicka francuzska manikura na kratkych nechtoch",
  "13": "Prirodzene ruzove gelove nechty s jemnym nude odtienom",
  "14": "Nude gelove nechty s elegantnym kratkym tvarom",
  "15": "Neonovo ruzove gelove nechty pre vyraznu manikuru",
  "16": "Svetloruzove gelove nechty s jemnym prirodzenym vzhladom",
  "17": "Bielo ruzova francuzska manikura s mandlovym tvarom",
  "18": "Nude gelove nechty s jemnym zdobenim v salone Trnava",
  "19": "Mliecne babyboomer gelove nechty s prirodzenym prechodom",
  "20": "Cervene gelove nechty na kratkych nechtoch",
  "21": "Jemne gelove nechty s kvietkovym nail art zdobenim",
  "22": "Svetloruzove gelove nechty s cervenym detailom srdiecka",
  "23": "Prirodzene nude gelove nechty pre upravene ruky",
  "24": "Kratka francuzska manikura s bielou spickou",
  "25": "Jemna francuzska manikura v salone diara manicure Trnava",
  "26": "Sytoruzove kratke gelove nechty s lesklym povrchom",
  "27": "Fialove gelove nechty s trblietavym akcentom",
  "28": "Kratke prirodzene gelove nechty v nude odtieni",
  "29": "Tmavomodre gelove nechty s lesklym finisom",
  "30": "Perletove svetloruzove gelove nechty s jemnym leskom",
  "31": "Levandulove gelove nechty s jemnym zdobenim",
  "32": "Ruzovy gel lak na kratsie nechty",
  "33": "Trblietave holograficke gelove nechty",
  "34": "Prirodzene nude gelove nechty s upravenym tvarom",
  "35": "Cervene jarne nechty s jemnym kvetinovym zdobenim",
  "36": "Cervene gelove nechty so zlatou liniou a nail artom",
  "37": "Mliecno biele gelove nechty s kratkym prirodzenym tvarom",
  "38": "Cervene a nude gelove nechty s jemnou linkou",
  "39": "Bordove gelove nechty s elegantnym leskom",
  "40": "Jemna francuzska manikura na prirodzenych nechtoch",
  "41": "Ruzove ombre nechty s jemnym babyboomer prechodom",
  "42": "Svetly gel lak na kratke nechty",
  "43": "Pastelove broskynovo ruzove nechty s jemnym zdobenim",
  "44": "Ruzova francuzska manikura s bielou spickou",
  "45": "Nude gelove nechty s ciernym nail art zdobenim",
  "46": "Sytoruzove gelove nechty s plnou farbou",
  "47": "Biela francuzska manikura na gelovych nechtoch",
  "48": "Ruzove gelove nechty s trblietavou spickou",
  "49": "Jemne ruzove nude gelove nechty z galerie Trnava",
  "50": "Svetloruzove kratke gelove nechty s prirodzenym vzhladom",
  "51": "Biele gelove nechty s cervenym srdieckom",
  "52": "Ruzove gelove nechty s prirodzenym leskom",
  "53": "Ruzove ombre gelove nechty na dlhych nechtoch",
  "54": "Ruzova francuzska manikura s jemnym bielym zdobenim",
}

const galleryImageCaptionById: Record<string, string> = {
  "8": "Mliečna francúzska manikúra",
  "9": "Krátka francúzska manikúra",
  "12": "Klasická francúzska manikúra",
  "17": "Bielo-ružová francúzska manikúra",
  "21": "Jemné kvetinové zdobenie",
  "24": "Krátka francúzska manikúra",
  "25": "Jemná francúzska manikúra",
  "32": "Ružový gél lak",
  "34": "Prirodzené nude nechty",
  "40": "Jemná francúzska manikúra",
  "41": "Ružové ombre nechty",
  "44": "Ružová francúzska manikúra",
  "47": "Biela francúzska manikúra",
  "49": "Nude gélové nechty",
  "53": "Ružové ombre gélové nechty",
  "54": "Ružová francúzska manikúra",
}

export function galleryImageSrc(id: string) {
  return `/gelove-nechty-trnava-gallery-${id}.${id === "5" ? "jpg" : "jpeg"}`
}

export function galleryImageAlt(id: string) {
  return galleryImageAltById[id] ?? `Gelove nechty Trnava - ukazka prace ${id}`
}

export function galleryImageCaption(id: string) {
  return galleryImageCaptionById[id] ?? "Gélové nechty Trnava"
}

const galleryImageIds = galleryCategories.flatMap((category) => [
  ...gallerySectionImageIds[category],
])

export const galleryImages = galleryImageIds.map((id) => ({
  id,
  src: galleryImageSrc(id),
  alt: galleryImageAlt(id),
}))
