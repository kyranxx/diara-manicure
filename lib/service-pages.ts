import rawServicePages from "@/lib/service-pages.json"

type ServicePageFaq = {
  question: string
  answer: string
}

export type ServicePage = {
  slug: string
  shortTitle: string
  primaryKeyword: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  heroTitle: string
  heroIntro: string
  priceNote: string
  serviceName: string
  bookingLabel: string
  highlights: string[]
  galleryImageIds: string[]
  faq: ServicePageFaq[]
}

export const servicePages = rawServicePages as ServicePage[]

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug)
}

export function getRelatedServicePages(slug: string) {
  return servicePages.filter((page) => page.slug !== slug)
}
