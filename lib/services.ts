import { fetchBookioServices } from './bookio'

export type Service = {
  title: string
  description: string
  price: string
  discountedPrice?: string
}

export type ServiceData = Service

// Prices live only in Bookio. If Bookio is unreachable, an empty list shows the
// "unavailable" message with the booking link instead of outdated prices.
export async function getServices(lang = 'sk'): Promise<Service[]> {
  try {
    return (await fetchBookioServices(lang)) || []
  } catch {
    return []
  }
}
