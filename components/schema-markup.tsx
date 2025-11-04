import React from 'react';

const SchemaMarkup = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": "https://diara-manicure.com/#beautysalon",
    "name": "Diara Manicure",
    "alternateName": "diara manicure",
    "image": [
      "https://diara-manicure.com/logo.png",
      "https://diara-manicure.com/pic1.jpeg",
      "https://diara-manicure.com/pic2.jpeg"
    ],
    "description": "Luxusný nechtový salón v Trnave. Prémiové gélové manikúry, nail art a predĺženie nechtov v elegantnej atmosfére.",
    "url": "https://diara-manicure.com",
    "telephone": "+421902163144",
    "email": "andrea.heckova92@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Starohájska 11",
      "addressLocality": "Trnava",
      "postalCode": "91701",
      "addressCountry": "SK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.3794,
      "longitude": 17.5854
    },
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 09:00-14:00"
    ],
    "priceRange": "€€",
    "paymentAccepted": "Cash, Credit Card",
    "currenciesAccepted": "EUR",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Nechtové služby",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Gélová manikúra",
            "description": "Prémiová gel manikúra s dlhodobým výsledkom"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Predĺženie nechtov",
            "description": "Profesionálne predĺženie nechtov gel systémom"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Nail art",
            "description": "Kreatívny nail art a dizajn podľa požiadaviek"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "25",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Maria K."
        },
        "datePublished": "2024-12-01",
        "reviewBody": "Úžasná gel manikúra! Dlho vydrží a vyzerá perfektne. Určite sa vrátim.",
        "name": "Perfektná služba",
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
          "name": "Anna S."
        },
        "datePublished": "2024-11-25",
        "reviewBody": "Najlepší nechtový salón v Trnave. Profesionálny prístup a krásne výsledky.",
        "name": "Výborná kvalita",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "sameAs": [
      "https://instagram.com/diaramanicure",
      "https://facebook.com/diaramanicure",
      "https://maps.google.com/?cid=123456789"
    ],
    "areaServed": {
      "@type": "City",
      "name": "Trnava",
      "addressCountry": "SK"
    },
    "serviceType": [
      "Gel manikúra",
      "Nail art",
      "Predĺženie nechtov",
      "Klasická manikúra",
      "Francúzska manikúra"
    ],
    "founder": {
      "@type": "Person",
      "name": "Andrea Hecková"
    },
    "foundingDate": "2020",
    "slogan": "Zaslúžite si manikúru, ktorá vydrží a vyzerá skvele."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default SchemaMarkup;
