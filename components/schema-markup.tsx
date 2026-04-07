import React from 'react';

const SchemaMarkup = () => {
  // LocalBusiness Schema with enhanced data
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": "https://www.diaramanicure.sk/#beautysalon",
    "name": "diara manicure.",
    "alternateName": ["Diara Manicure", "Diara Manicure Trnava", "Nechty Trnava"],
    "image": [
      "https://www.diaramanicure.sk/logo_spring_day.jpg",
      "https://www.diaramanicure.sk/gelove-nechty-trnava-gallery-01.jpeg",
      "https://www.diaramanicure.sk/gelove-nechty-trnava-gallery-1.jpeg",
      "https://www.diaramanicure.sk/gelove-nechty-trnava-gallery-2.jpeg",
      "https://www.diaramanicure.sk/gelove-nechty-trnava-gallery-3.jpeg"
    ],
    "description": "Profesionálne nechtové štúdio v Trnave. Gélové nechty, manikúra, gél lak a darčekové poukazy. Kvalitné európske gély, parkovanie zdarma a online rezervácia.",
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "11",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Paulína Ilčík"
        },
        "datePublished": "2024-12-15",
        "reviewBody": "Najlepšie nechty v Trnave a širokom okolí. Katka je úžasná vo všetkých smeroch.",
        "name": "Výborná kvalita",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Mária K."
        },
        "datePublished": "2024-12-01",
        "reviewBody": "Úžasná gel manikúra! Dlho vydrží a vyzerá perfektne. Určite sa vrátim.",
        "name": "Perfektná služba",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
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
    "slogan": "Kvalitné európske gély a precízna práca."
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Domov",
        "item": "https://www.diaramanicure.sk"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Cenník",
        "item": "https://www.diaramanicure.sk/#cennik"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Galéria",
        "item": "https://www.diaramanicure.sk/#galeria"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Recenzie",
        "item": "https://www.diaramanicure.sk/#recenzie"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Kontakt",
        "item": "https://www.diaramanicure.sk/#visit"
      }
    ]
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
};

export default SchemaMarkup;
