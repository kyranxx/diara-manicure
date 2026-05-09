export const siteConfig = {
  name: "diara manicure.",
  legalName: "diara manicure.",
  baseUrl: "https://www.diaramanicure.sk",
  bookingUrl: "https://services.bookio.com/diaramanicure/widget?lang=sk",
  giftCardPageUrl: "https://www.diaramanicure.sk/darcekove-poukazy",
  giftCardUrl: "https://services.bookio.com/diaramanicure/gift-cards#/",
  phone: "+421 902 163 144",
  phoneHref: "tel:+421902163144",
  messengerUrl: "https://m.me/diaramanicure",
  instagramUrl: "https://instagram.com/diaramanicure",
  facebookUrl: "https://facebook.com/diaramanicure",
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Diara%20Manicure%20Hospod%C3%A1rska%2053%20Trnava",
  ownerName: "Andrea Hečkova",
  addressLine1: "Hospodárska 53",
  postalCode: "917 01",
  city: "Trnava",
  country: "Slovensko",
  contentSignal: "ai-train=no, search=yes, ai-input=no",
  mcpServerName: "diara-manicure-public",
  mcpServerVersion: "1.0.0",
  mcpProtocolVersion: "2025-06-18",
} as const

export const fullAddress = `${siteConfig.addressLine1}, ${siteConfig.postalCode} ${siteConfig.city}, ${siteConfig.country}`
