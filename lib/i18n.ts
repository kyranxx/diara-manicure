export const languages = [
  { code: "sk", label: "Slovenčina", shortLabel: "SK", flag: "sk", htmlLang: "sk" },
  { code: "en", label: "English", shortLabel: "EN", flag: "gb", htmlLang: "en" },
  { code: "uk", label: "Українська", shortLabel: "UA", flag: "ua", htmlLang: "uk" },
  { code: "sr", label: "Srpski", shortLabel: "SR", flag: "rs", htmlLang: "sr-Latn" },
] as const

export type Language = (typeof languages)[number]["code"]

export const defaultLanguage = "sk" satisfies Language

const sk = {
  languageSwitcher: {
    label: "Jazyk stránky",
    changeTo: "Prepnúť jazyk na",
  },
  theme: {
    toggle: "Prepnúť tému",
  },
  nav: {
    openMenu: "Otvoriť menu",
    closeMenu: "Zavrieť menu",
    items: {
      services: "Cenník",
      giftCards: "Poukazy",
      gallery: "Galéria",
      faq: "FAQ",
      contact: "Kontakt",
      blog: "Blog",
    },
  },
  hero: {
    logoAlt: "Diara Manicure - Nechty Trnava - Jarné logo",
    titlePrefix: "Gélové nechty v Trnave",
    titleBrand: "",
    subtitleMain: "",
    subtitleHighlight: "Slovenský nechtový salón.",
    newClientsBadge: "Prijímame nové klientky",
    bookingCta: "Pozrieť voľné termíny",
    cardPayment: "💳 U nás môžete platiť aj kartou",
    softReservation: "Nezáväzná rezervácia",
    parkingCoffee: "🅿️ Parkovanie a káva zdarma",
    hygieneStandards: "🧼 Prísne hygienické normy",
    giftCardsCta: "Darčekové poukazy",
    phoneLabel: "Rezervácie telefonicky",
    contactUsLabel: "Kontaktujte nás",
    messengerLabel: "Facebook Messenger",
    whatsappLabel: "WhatsApp",
    visitCta: "Kde nás nájdete",
    founderImageAlt: "Andrea Hecková - Zakladateľka Diara Manicure Trnava",
    qualityStart: "Našou prioritou sú",
    qualityHighlight: "kvalitné európske gély",
    qualityEnd: "a precízna práca.",
    conceptStart: "Nie sme expresný salón,",
    conceptHighlight: "na kvalite si dávame záležať",
    founderName: "Andrea Hečková",
  },
  services: {
    heading: "Cenník služieb",
    validFrom: "Cenník platný od 24.1.2026",
    intro:
      "Aktuálny cenník pre manikúru v Trnave, gélové nechty, gél lak a doplnenie nechtov. Po kliknutí na službu si môžete rovno pozrieť voľné termíny.",
    mostRequested: "Najžiadanejšie",
    unavailable: "Žiadne služby nie sú momentálne dostupné.",
  },
  gallery: {
    heading: "Nechty našich klientiek",
    description: "",
    categories: {
      french: "Francúzska manikúra",
      singleColor: "Jednofarebné",
      delicateArt: "Jemné zdobenie",
    },
    imageAltPrefix: "Gélové nechty Trnava - ukážka práce",
    openImageAria: "Otvoriť obrázok:",
    instagramCta: "Sledujte nás na Instagrame",
  },
  reviews: {
    eyebrow: "Google Maps recenzie",
    heading: "Čo hovoria klientky",
    description:
      "Recenzie načítavame priamo z Google Maps, aby boli na stránke aktuálne a overiteľné.",
    loading: "Načítavame recenzie z Google Maps...",
    error: "Recenzie sa nepodarilo načítať. Môžete si ich pozrieť priamo na Google Maps.",
    googleCta: "Pozrieť recenzie na Google Maps",
  },
  lightbox: {
    dialogLabel: "Prehliadač galérie",
    close: "Zavrieť",
    zoomIn: "Priblížiť",
    zoomOut: "Oddialiť",
    previous: "Predchádzajúci obrázok",
    next: "Nasledujúci obrázok",
  },
  about: {
    imageAlt: "Interiér salónu Diara Manicure",
    heading: "O nás",
    subheading: "Andrea Hečková & diara manicure.",
    paragraph1Start:
      "Vítame vás v našom salóne, kde sa staráme o krásu a zdravie vašich nechtov s láskou a profesionalitou. Ako zakladateľka",
    paragraph1End:
      "som si splnila sen o vytvorení miesta, kde sa každá klientka bude cítiť výnimočne.",
    paragraph2:
      "Používame len tie najkvalitnejšie materiály a neustále sa vzdelávame v nových trendoch, aby sme vám priniesli tú najlepšiu starostlivosť a najkrajšie nechty v Trnave.",
    founderLabel: "Zakladateľka",
  },
  faq: {
    titleLine1: "Časté otázky",
    titleLine2: "o našom nechtovom štúdiu",
    items: [
      {
        question: "Kde nájdem vaše nechtové štúdio v Trnave?",
        answer:
          "Náš salón diara manicure. Trnava sa nachádza na Hospodárskej 53. Máme vlastné parkovanie zdarma priamo pred vchodom.",
      },
      {
        question: "Musím sa objednať telefonicky?",
        answer:
          "Nie, preferujeme online rezervácie. Kliknite na tlačidlo \"Pozrieť voľné termíny\" a vyberte si čas, ktorý vám vyhovuje. Objednanie na nechty trvá menej ako minútu.",
      },
      {
        question: "Robíte aj iné služby ako gélové nechty?",
        answer:
          "Áno, špecializujeme sa na gélové nechty, ale v ponuke je aj gél lak a klasická manikúra Trnava.",
      },
    ],
  },
  giftCards: {
    label: "Darčekové poukazy",
    heading: "Poukaz na manikúru v Trnave",
    description:
      "Hľadáte praktický darček pre mamu, sestru, priateľku či kolegyňu? Poukaz sa dá kúpiť online a doručiť emailom.",
    buyCta: "Kúpiť poukaz",
    moreInfoCta: "Viac informácií",
    delivery: "Doručenie emailom",
    imageAlt: "Darčekový poukaz Diara Manicure",
  },
  contact: {
    heading: "Kde nás nájdete",
    addressLabel: "Adresa",
    phoneLabel: "Telefón",
    bookingCta: "Pozrieť voľné termíny",
  },
  footer: {
    logoAlt: "DIARA - Jarné logo",
    tagline: "Nechtové štúdio a manikúra v Trnave",
    rights: "© 2026 diara manicure. Všetky práva vyhradené.",
    giftCards: "Darčekové poukazy",
    blog: "Blog",
    serviceGuides: "Služby",
    gelNails: "Gélové nechty",
    gelPolish: "Gél lak",
    manicure: "Manikúra",
    keywords:
      "Najčastejšie hľadané služby: gélové nechty v Trnave, gél lak, manikúra, nechtové štúdio, cenník a darčekové poukazy.",
  },
  cookie: {
    title: "Cookie nastavenia",
    summary: "Cookies používame iba na meranie a zlepšenie webu.",
    descriptionStart:
      "Používame súbory cookie na analýzu návštevnosti, zobrazenie personalizovaných reklám a zlepšenie vášho zážitku. Viac v",
    privacyLink: "Zásadách ochrany súkromia",
    reject: "Odmietnuť",
    essentialOnly: "Len nevyhnutné",
    acceptAll: "Prijať všetky",
    showDetails: "Zobraziť podrobnosti",
    hideDetails: "Skryť podrobnosti",
    details: [
      {
        title: "Nevyhnutné",
        description: "Prevádzkové cookies potrebné pre fungovanie stránky. Vždy aktívne.",
      },
      {
        title: "Analytické",
        description: "Google Analytics — anonymné štatistiky návštevnosti a správania.",
      },
      {
        title: "Marketingové",
        description: "Google Ads — sledovanie konverzií a personalizácia reklám.",
      },
      {
        title: "Funkčné",
        description: "Microsoft Clarity — nahrávky správania a heatmapy.",
      },
    ],
  },
}

export type TranslationMessages = typeof sk

const en: TranslationMessages = {
  languageSwitcher: {
    label: "Page language",
    changeTo: "Switch language to",
  },
  theme: {
    toggle: "Toggle theme",
  },
  nav: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    items: {
      services: "Prices",
      giftCards: "Vouchers",
      gallery: "Gallery",
      faq: "FAQ",
      contact: "Contact",
      blog: "Blog",
    },
  },
  hero: {
    logoAlt: "Diara Manicure - Nails Trnava - Spring logo",
    titlePrefix: "Gel nails in Trnava",
    titleBrand: "",
    subtitleMain: "",
    subtitleHighlight: "Slovak nail salon.",
    newClientsBadge: "Accepting new clients",
    bookingCta: "See available appointments",
    cardPayment: "💳 Card payment available",
    softReservation: "Non-binding reservation",
    parkingCoffee: "🅿️ Free parking and coffee",
    hygieneStandards: "🧼 Strict hygiene standards",
    giftCardsCta: "Gift vouchers",
    phoneLabel: "Phone reservations",
    contactUsLabel: "Contact us",
    messengerLabel: "Facebook Messenger",
    whatsappLabel: "WhatsApp",
    visitCta: "Where to find us",
    founderImageAlt: "Andrea Heckova - Founder of Diara Manicure Trnava",
    qualityStart: "Our priority is",
    qualityHighlight: "quality European gels",
    qualityEnd: "and precise work.",
    conceptStart: "We are not an express salon,",
    conceptHighlight: "we focus on quality",
    founderName: "Andrea Hečkova",
  },
  services: {
    heading: "Service prices",
    validFrom: "Price list valid from 24 Jan 2026",
    intro:
      "Current prices for manicure in Trnava, gel nails, gel polish and nail refills. Click a service to view available appointments right away.",
    mostRequested: "Most requested",
    unavailable: "No services are currently available.",
  },
  gallery: {
    heading: "Nails of our clients",
    description: "",
    categories: {
      french: "French manicure",
      singleColor: "Single color",
      delicateArt: "Delicate nail art",
    },
    imageAltPrefix: "Gel nails Trnava - work example",
    openImageAria: "Open image:",
    instagramCta: "Follow us on Instagram",
  },
  reviews: {
    eyebrow: "Google Maps reviews",
    heading: "What clients say",
    description:
      "Reviews are loaded directly from Google Maps so they stay current and verifiable.",
    loading: "Loading reviews from Google Maps...",
    error: "Reviews could not be loaded. You can view them directly on Google Maps.",
    googleCta: "View reviews on Google Maps",
  },
  lightbox: {
    dialogLabel: "Gallery viewer",
    close: "Close",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    previous: "Previous image",
    next: "Next image",
  },
  about: {
    imageAlt: "Interior of Diara Manicure salon",
    heading: "About us",
    subheading: "Andrea Hečkova & diara manicure.",
    paragraph1Start:
      "Welcome to our salon, where we care for the beauty and health of your nails with love and professionalism. As the founder of",
    paragraph1End:
      "I fulfilled my dream of creating a place where every client feels special.",
    paragraph2:
      "We use only high-quality materials and keep learning new trends so we can bring you the best care and the most beautiful nails in Trnava.",
    founderLabel: "Founder",
  },
  faq: {
    titleLine1: "Frequently asked questions",
    titleLine2: "about our nail studio",
    items: [
      {
        question: "Where can I find your nail studio in Trnava?",
        answer:
          "Our diara manicure. Trnava salon is located at Hospodárska 53. We have free private parking directly in front of the entrance.",
      },
      {
        question: "Do I have to book by phone?",
        answer:
          "No, we prefer online reservations. Click \"See available appointments\" and choose a time that suits you. Booking your nail appointment takes less than a minute.",
      },
      {
        question: "Do you offer services other than gel nails?",
        answer:
          "Yes, we specialize in gel nails, and we also offer gel polish and classic manicure in Trnava.",
      },
    ],
  },
  giftCards: {
    label: "Gift vouchers",
    heading: "Manicure voucher in Trnava",
    description:
      "Looking for a practical gift for your mum, sister, girlfriend or colleague? A voucher can be purchased online and delivered by email.",
    buyCta: "Buy voucher",
    moreInfoCta: "More information",
    delivery: "Email delivery",
    imageAlt: "Diara Manicure gift voucher",
  },
  contact: {
    heading: "Where to find us",
    addressLabel: "Address",
    phoneLabel: "Phone",
    bookingCta: "See available appointments",
  },
  footer: {
    logoAlt: "DIARA - Spring logo",
    tagline: "Professional Nails & Manicure in Trnava",
    rights: "© 2026 diara manicure. All rights reserved.",
    giftCards: "Gift vouchers",
    blog: "Blog",
    serviceGuides: "Services",
    gelNails: "Gel nails",
    gelPolish: "Gel polish",
    manicure: "Manicure",
    keywords:
      "Popular searches: Nails Trnava | Gel nails Trnava | Manicure Trnava | Nail studio Trnava | Nail modelling | Gel polish Trnava | Nail prices | Available nail appointments | Gift vouchers nails Trnava | Manicure voucher",
  },
  cookie: {
    title: "Cookie settings",
    summary: "We use cookies to measure and improve the website.",
    descriptionStart:
      "We use cookies to analyze traffic, show personalized ads and improve your experience. More in the",
    privacyLink: "Privacy Policy",
    reject: "Reject",
    essentialOnly: "Essential only",
    acceptAll: "Accept all",
    showDetails: "Show details",
    hideDetails: "Hide details",
    details: [
      {
        title: "Essential",
        description: "Operational cookies needed for the website to work. Always active.",
      },
      {
        title: "Analytics",
        description: "Google Analytics - anonymous traffic and behavior statistics.",
      },
      {
        title: "Marketing",
        description: "Google Ads - conversion tracking and ad personalization.",
      },
      {
        title: "Functional",
        description: "Microsoft Clarity - behavior recordings and heatmaps.",
      },
    ],
  },
}

const uk: TranslationMessages = {
  languageSwitcher: {
    label: "Мова сторінки",
    changeTo: "Перемкнути мову на",
  },
  theme: {
    toggle: "Перемкнути тему",
  },
  nav: {
    openMenu: "Відкрити меню",
    closeMenu: "Закрити меню",
    items: {
      services: "Ціни",
      giftCards: "Сертифікати",
      gallery: "Галерея",
      faq: "FAQ",
      contact: "Контакт",
      blog: "Blog",
    },
  },
  hero: {
    logoAlt: "Diara Manicure - Нігті Трнава - весняний логотип",
    titlePrefix: "Гелеві нігті у Трнаві",
    titleBrand: "",
    subtitleMain: "",
    subtitleHighlight: "Словацький нігтьовий салон.",
    newClientsBadge: "Приймаємо нових клієнток",
    bookingCta: "Переглянути вільні терміни",
    cardPayment: "💳 Можлива оплата карткою",
    softReservation: "Бронювання без зобов'язань",
    parkingCoffee: "🅿️ Безкоштовне паркування та кава",
    hygieneStandards: "🧼 Суворі гігієнічні стандарти",
    giftCardsCta: "Подарункові сертифікати",
    phoneLabel: "Бронювання телефоном",
    contactUsLabel: "Зв'яжіться з нами",
    messengerLabel: "Facebook Messenger",
    whatsappLabel: "WhatsApp",
    visitCta: "Де нас знайти",
    founderImageAlt: "Andrea Heckova - засновниця Diara Manicure Trnava",
    qualityStart: "Наш пріоритет -",
    qualityHighlight: "якісні європейські гелі",
    qualityEnd: "та точною роботою.",
    conceptStart: "Ми не експрес-салон,",
    conceptHighlight: "ми дбаємо про якість",
    founderName: "Andrea Hečkova",
  },
  services: {
    heading: "Ціни на послуги",
    validFrom: "Прайс діє з 24.1.2026",
    intro:
      "Актуальні ціни на манікюр у Трнаві, гелеві нігті, гель-лак та корекцію нігтів. Натисніть на послугу, щоб одразу переглянути вільні терміни.",
    mostRequested: "Найпопулярніше",
    unavailable: "Наразі послуги недоступні.",
  },
  gallery: {
    heading: "Нігті наших клієнток",
    description: "",
    categories: {
      french: "Французький манікюр",
      singleColor: "Однотонні",
      delicateArt: "Ніжний дизайн",
    },
    imageAltPrefix: "Гелеві нігті Трнава - приклад роботи",
    openImageAria: "Відкрити зображення:",
    instagramCta: "Стежте за нами в Instagram",
  },
  reviews: {
    eyebrow: "Відгуки Google Maps",
    heading: "Що кажуть клієнтки",
    description:
      "Відгуки завантажуються напряму з Google Maps, щоб вони були актуальні та перевірені.",
    loading: "Завантажуємо відгуки з Google Maps...",
    error: "Не вдалося завантажити відгуки. Ви можете переглянути їх напряму на Google Maps.",
    googleCta: "Переглянути відгуки на Google Maps",
  },
  lightbox: {
    dialogLabel: "Перегляд галереї",
    close: "Закрити",
    zoomIn: "Збільшити",
    zoomOut: "Зменшити",
    previous: "Попереднє зображення",
    next: "Наступне зображення",
  },
  about: {
    imageAlt: "Інтер'єр салону Diara Manicure",
    heading: "Про нас",
    subheading: "Andrea Hečkova & diara manicure.",
    paragraph1Start:
      "Ласкаво просимо до нашого салону, де ми з любов'ю та професійністю дбаємо про красу і здоров'я ваших нігтів. Як засновниця",
    paragraph1End:
      "я здійснила мрію створити місце, де кожна клієнтка почуватиметься особливою.",
    paragraph2:
      "Ми використовуємо лише якісні матеріали та постійно вивчаємо нові тренди, щоб дати вам найкращий догляд і найкрасивіші нігті у Трнаві.",
    founderLabel: "Засновниця",
  },
  faq: {
    titleLine1: "Часті запитання",
    titleLine2: "про нашу нігтьову студію",
    items: [
      {
        question: "Де знаходиться ваша нігтьова студія в Трнаві?",
        answer:
          "Наш салон diara manicure. Trnava знаходиться на Hospodárska 53. У нас є безкоштовне власне паркування прямо перед входом.",
      },
      {
        question: "Чи потрібно записуватися телефоном?",
        answer:
          "Ні, ми надаємо перевагу онлайн-бронюванню. Натисніть \"Переглянути вільні терміни\" і виберіть зручний час. Запис на нігті займає менше хвилини.",
      },
      {
        question: "Ви робите тільки гелеві нігті?",
        answer:
          "Так, ми спеціалізуємося на гелевих нігтях, але також пропонуємо гель-лак і класичний манікюр у Трнаві.",
      },
    ],
  },
  giftCards: {
    label: "Подарункові сертифікати",
    heading: "Сертифікат на манікюр у Трнаві",
    description:
      "Шукаєте практичний подарунок для мами, сестри, подруги чи колеги? Сертифікат можна купити онлайн і отримати на email.",
    buyCta: "Купити сертифікат",
    moreInfoCta: "Більше інформації",
    delivery: "Доставка email",
    imageAlt: "Подарунковий сертифікат Diara Manicure",
  },
  contact: {
    heading: "Де нас знайти",
    addressLabel: "Адреса",
    phoneLabel: "Телефон",
    bookingCta: "Переглянути вільні терміни",
  },
  footer: {
    logoAlt: "DIARA - весняний логотип",
    tagline: "Нігтьовий салон і манікюр у Трнаві",
    rights: "© 2026 diara manicure. Усі права захищено.",
    giftCards: "Подарункові сертифікати",
    blog: "Blog",
    serviceGuides: "Послуги",
    gelNails: "Гелеві нігті",
    gelPolish: "Гель-лак",
    manicure: "Манікюр",
    keywords:
      "Популярні пошуки: Нігті Трнава | Гелеві нігті Трнава | Манікюр Трнава | Нігтьова студія Трнава | Моделювання нігтів | Гель-лак Трнава | Ціни на нігті | Вільні терміни на нігті | Подарункові сертифікати нігті Трнава | Сертифікат на манікюр",
  },
  cookie: {
    title: "Налаштування cookie",
    summary: "Ми використовуємо cookie для вимірювання та покращення сайту.",
    descriptionStart:
      "Ми використовуємо cookie для аналізу відвідуваності, показу персоналізованої реклами та покращення вашого досвіду. Більше в",
    privacyLink: "Політиці конфіденційності",
    reject: "Відхилити",
    essentialOnly: "Лише необхідні",
    acceptAll: "Прийняти всі",
    showDetails: "Показати деталі",
    hideDetails: "Сховати деталі",
    details: [
      {
        title: "Необхідні",
        description: "Операційні cookie, потрібні для роботи сайту. Завжди активні.",
      },
      {
        title: "Аналітичні",
        description: "Google Analytics - анонімна статистика відвідуваності та поведінки.",
      },
      {
        title: "Маркетингові",
        description: "Google Ads - відстеження конверсій і персоналізація реклами.",
      },
      {
        title: "Функціональні",
        description: "Microsoft Clarity - записи поведінки та теплові карти.",
      },
    ],
  },
}

const sr: TranslationMessages = {
  languageSwitcher: {
    label: "Jezik stranice",
    changeTo: "Promeni jezik na",
  },
  theme: {
    toggle: "Promeni temu",
  },
  nav: {
    openMenu: "Otvori meni",
    closeMenu: "Zatvori meni",
    items: {
      services: "Cenovnik",
      giftCards: "Vaučeri",
      gallery: "Galerija",
      faq: "FAQ",
      contact: "Kontakt",
      blog: "Blog",
    },
  },
  hero: {
    logoAlt: "Diara Manicure - Nokti Trnava - prolećni logo",
    titlePrefix: "Gel nokti u Trnavi",
    titleBrand: "",
    subtitleMain: "",
    subtitleHighlight: "Slovački salon za nokte.",
    newClientsBadge: "Primamo nove klijentkinje",
    bookingCta: "Pogledajte slobodne termine",
    cardPayment: "💳 Moguće plaćanje karticom",
    softReservation: "Neobavezujuća rezervacija",
    parkingCoffee: "🅿️ Besplatan parking i kafa",
    hygieneStandards: "🧼 Strogi higijenski standardi",
    giftCardsCta: "Poklon vaučeri",
    phoneLabel: "Rezervacije telefonom",
    contactUsLabel: "Kontaktirajte nas",
    messengerLabel: "Facebook Messenger",
    whatsappLabel: "WhatsApp",
    visitCta: "Gde nas možete naći",
    founderImageAlt: "Andrea Heckova - osnivačica Diara Manicure Trnava",
    qualityStart: "Naš prioritet su",
    qualityHighlight: "kvalitetni evropski gelovi",
    qualityEnd: "i preciznim radom.",
    conceptStart: "Nismo ekspresni salon,",
    conceptHighlight: "kvalitet nam je važan",
    founderName: "Andrea Hečkova",
  },
  services: {
    heading: "Cenovnik usluga",
    validFrom: "Cenovnik važi od 24.1.2026",
    intro:
      "Aktuelni cenovnik za manikir u Trnavi, gel nokte, gel lak i dopunu noktiju. Kliknite na uslugu i odmah pogledajte slobodne termine.",
    mostRequested: "Najtraženije",
    unavailable: "Trenutno nema dostupnih usluga.",
  },
  gallery: {
    heading: "Nokti naših klijentkinja",
    description: "",
    categories: {
      french: "Francuski manikir",
      singleColor: "Jednobojni",
      delicateArt: "Nežna dekoracija",
    },
    imageAltPrefix: "Gel nokti Trnava - primer rada",
    openImageAria: "Otvori sliku:",
    instagramCta: "Pratite nas na Instagramu",
  },
  reviews: {
    eyebrow: "Google Maps recenzije",
    heading: "Šta kažu klijentkinje",
    description:
      "Recenzije učitavamo direktno sa Google Maps da bi bile aktuelne i proverljive.",
    loading: "Učitavamo recenzije sa Google Maps...",
    error: "Recenzije nije moguće učitati. Možete ih pogledati direktno na Google Maps.",
    googleCta: "Pogledajte recenzije na Google Maps",
  },
  lightbox: {
    dialogLabel: "Pregled galerije",
    close: "Zatvori",
    zoomIn: "Uvećaj",
    zoomOut: "Umanji",
    previous: "Prethodna slika",
    next: "Sledeća slika",
  },
  about: {
    imageAlt: "Enterijer salona Diara Manicure",
    heading: "O nama",
    subheading: "Andrea Hečkova & diara manicure.",
    paragraph1Start:
      "Dobro došli u naš salon, gde se s ljubavlju i profesionalnošću brinemo o lepoti i zdravlju vaših noktiju. Kao osnivačica",
    paragraph1End:
      "ispunila sam san da napravim mesto u kojem se svaka klijentkinja oseća posebno.",
    paragraph2:
      "Koristimo samo najkvalitetnije materijale i stalno učimo nove trendove kako bismo vam pružili najbolju negu i najlepše nokte u Trnavi.",
    founderLabel: "Osnivačica",
  },
  faq: {
    titleLine1: "Česta pitanja",
    titleLine2: "o našem studiju za nokte",
    items: [
      {
        question: "Gde se nalazi vaš studio za nokte u Trnavi?",
        answer:
          "Naš salon diara manicure. Trnava nalazi se na adresi Hospodárska 53. Imamo besplatan privatni parking direktno ispred ulaza.",
      },
      {
        question: "Da li moram da zakažem telefonom?",
        answer:
          "Ne, preferiramo online rezervacije. Kliknite na \"Pogledajte slobodne termine\" i izaberite vreme koje vam odgovara. Zakazivanje traje manje od jednog minuta.",
      },
      {
        question: "Radite li i druge usluge osim gel noktiju?",
        answer:
          "Da, specijalizovani smo za gel nokte, a u ponudi su i gel lak i klasičan manikir u Trnavi.",
      },
    ],
  },
  giftCards: {
    label: "Poklon vaučeri",
    heading: "Vaučer za manikir u Trnavi",
    description:
      "Tražite praktičan poklon za mamu, sestru, devojku ili koleginicu? Vaučer možete kupiti online i dobiti emailom.",
    buyCta: "Kupi vaučer",
    moreInfoCta: "Više informacija",
    delivery: "Dostava emailom",
    imageAlt: "Poklon vaučer Diara Manicure",
  },
  contact: {
    heading: "Gde nas možete naći",
    addressLabel: "Adresa",
    phoneLabel: "Telefon",
    bookingCta: "Pogledajte slobodne termine",
  },
  footer: {
    logoAlt: "DIARA - prolećni logo",
    tagline: "Salon za nokte i manikir u Trnavi",
    rights: "© 2026 diara manicure. Sva prava zadržana.",
    giftCards: "Poklon vaučeri",
    blog: "Blog",
    serviceGuides: "Usluge",
    gelNails: "Gel nokti",
    gelPolish: "Gel lak",
    manicure: "Manikir",
    keywords:
      "Popularne pretrage: Nokti Trnava | Gel nokti Trnava | Manikir Trnava | Studio za nokte Trnava | Modeliranje noktiju | Gel lak Trnava | Cenovnik noktiju | Slobodni termini za nokte | Poklon vaučeri nokti Trnava | Vaučer za manikir",
  },
  cookie: {
    title: "Podešavanja kolačića",
    summary: "Koristimo kolačiće za merenje i poboljšanje sajta.",
    descriptionStart:
      "Koristimo kolačiće za analizu poseta, prikaz personalizovanih oglasa i poboljšanje vašeg iskustva. Više u",
    privacyLink: "Politici privatnosti",
    reject: "Odbij",
    essentialOnly: "Samo neophodni",
    acceptAll: "Prihvati sve",
    showDetails: "Prikaži detalje",
    hideDetails: "Sakrij detalje",
    details: [
      {
        title: "Neophodni",
        description: "Operativni kolačići potrebni za rad stranice. Uvek aktivni.",
      },
      {
        title: "Analitički",
        description: "Google Analytics - anonimna statistika poseta i ponašanja.",
      },
      {
        title: "Marketing",
        description: "Google Ads - praćenje konverzija i personalizacija oglasa.",
      },
      {
        title: "Funkcionalni",
        description: "Microsoft Clarity - snimci ponašanja i heatmap analize.",
      },
    ],
  },
}

export const translations: Record<Language, TranslationMessages> = {
  sk: sk,
  en: en,
  uk: uk,
  sr: sr,
}

export function getLanguageMeta(language: Language) {
  return languages.find((item) => item.code === language) ?? languages[0]
}
