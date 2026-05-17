import { galleryImages } from "@/lib/gallery";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";

const SchemaMarkup = () => {
  const galleryImageObjects = galleryImages.map((image) => ({
    "@type": "ImageObject",
    "@id": `${siteConfig.baseUrl}${image.src}#image`,
    "contentUrl": `${siteConfig.baseUrl}${image.src}`,
    "url": `${siteConfig.baseUrl}/#galeria`,
    "name": image.alt,
    "caption": image.alt,
    "representativeOfPage": false
  }));

  // LocalBusiness Schema with enhanced data
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": "https://www.diaramanicure.sk/#beautysalon",
    "name": "diara manicure.",
    "alternateName": [
      "Diara Manicure",
      "Diara Manicure Trnava",
      "Nechty Trnava",
      "Nails Trnava",
      "Nail Studio Trnava",
      "Gel Nails Trnava",
      "Manicure Trnava",
      "Gelove nechty Trnava",
      "Manikura Trnava"
    ],
    "image": [
      "https://www.diaramanicure.sk/logo_spring_day.jpg",
      ...galleryImageObjects.slice(0, 12).map((image) => image.contentUrl)
    ],
    "description": "Slovenský nechtový salón v Trnave. Gélové nechty, manikúra, gél lak a darčekové poukazy. Prísne hygienické normy, parkovanie zdarma a online rezervácia.",
    "url": "https://www.diaramanicure.sk",
    "telephone": "+421902163144",
    "email": "andrea.heckova92@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hospodárska 53",
      "addressLocality": "Trnava",
      "postalCode": "91701",
      "addressRegion": "Trnavský kraj",
      "addressCountry": "SK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.3794,
      "longitude": 17.5854
    },
    "hasMap": "https://maps.google.com/?q=Diara+Manicure,+Hospodárska+53,+Trnava",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "€€",
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
    "currenciesAccepted": "EUR",
    "acceptsReservations": true,
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Free Parking",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Free Coffee",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Card Payment",
        "value": true
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Nechtové služby",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Gélové nechty - nová modelácia",
            "description": "Kompletná modelácia gélových nechtov s kvalitným európskym gélom"
          },
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Doplnenie gélových nechtov",
            "description": "Pravidelné doplnenie a údržba gélových nechtov"
          },
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Gél lak manikúra",
            "description": "Klasická manikúra s gél lakom dlhej výdrže"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "20.00",
            "priceCurrency": "EUR"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Nail art a zdobenie",
            "description": "Kreatívny nail art a dizajn podľa požiadaviek"
          }
        },
        {
          "@type": "Offer",
          "name": "Darčekový poukaz na manikúru",
          "itemOffered": {
            "@type": "Service",
            "name": "Darčekový poukaz na manikúru",
            "description": "Darčekový poukaz na profesionálnu manikúru a gélové nechty v Trnave. Objednanie online a okamžité doručenie emailom."
          },
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/diaramanicure",
      "https://www.facebook.com/diaramanicure"
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Trnava",
        "addressCountry": "SK"
      },
      {
        "@type": "City",
        "name": "Piešťany",
        "addressCountry": "SK"
      },
      {
        "@type": "City",
        "name": "Hlohovec",
        "addressCountry": "SK"
      },
      {
        "@type": "City",
        "name": "Galanta",
        "addressCountry": "SK"
      }
    ],
    "founder": {
      "@type": "Person",
      "name": "Andrea Hečková"
    },
    "foundingDate": "2020",
    "slogan": "Slovenský nechtový salón s precíznou prácou."
  };

  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": "https://www.diaramanicure.sk/#galeria",
    "name": "Galéria gélových nechtov v Trnave",
    "description": "Galéria práce nechtového štúdia diara manicure. v Trnave.",
    "url": "https://www.diaramanicure.sk/#galeria",
    "image": galleryImageObjects
  };

  // FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Kde nájdem nechtové štúdio diara manicure. v Trnave?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "✨ Náš salón diara manicure. nájdete v srdci Trnavy na Hospodárskej 53. Potešíme vás nielen dokonalými nechtami, ale aj bezproblémovým parkovaním ZDARMA priamo pred vchodom."
        }
      },

      {
        "@type": "Question",
        "name": "Musím sa objednať telefonicky na nechty?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nie, doprajte si maximálne pohodlie s našou bleskovou online rezerváciou. Stačia dva kliky a váš termín na profesionálne gélové nechty je zarezervovaný za menej ako minútu."
        }
      },
      {
        "@type": "Question",
        "name": "Robíte aj iné služby ako gélové nechty?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Áno, sme špecialisti na krásne ruky! Okrem špičkovej modelácie gélových nechtov ponúkame aj obľúbený gél lak a precíznu klasickú manikúru pre prirodzený vzhľad."
        }
      },
      {
        "@type": "Question",
        "name": "Je pri nechtovom štúdiu parkovanie?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Samozrejme! Pre vaše maximálne pohodlie máme vlastné bezplatné parkovacie miesta priamo pred salónom na Hospodárskej ulici v Trnave. Starosti s parkovaním hoďte za hlavu."
        }
      },
      {
        "@type": "Question",
        "name": "Ponúkate aj darčekové poukazy na manikúru v Trnave?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Áno, v diara manicure. ponúkame darčekové poukazy na profesionálnu manikúru a gélové nechty v Trnave. Poukaz môžete objednať online s okamžitým doručením emailom."
        }
      }
    ]
  };

  return (
    <>
      <JsonLd
        id="schema-local-business"
        data={localBusinessSchema}
      />
      <JsonLd
        id="schema-image-gallery"
        data={imageGallerySchema}
      />
      <JsonLd
        id="schema-faq"
        data={faqSchema}
      />
    </>
  );
};

export default SchemaMarkup;
