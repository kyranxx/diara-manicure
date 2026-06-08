import type { Service } from './sheets'

type BookioApiResponse<T> = {
  result?: {
    success?: boolean
    errors?: string[]
    data?: T
  }
}

type BookioService = {
  name?: string | null
  note?: string | null
  price?: number | string | null
  currency?: string | null
}

type BookioServicesData = {
  services?: BookioService[]
}

const DEFAULT_BOOKIO_BASE_URL = 'https://services.bookio.com/public/api/v1'

function bookioConfigFromEnv() {
  const apiKey = process.env.BOOKIO_API_KEY
  const facilityId = process.env.BOOKIO_FACILITY_ID

  if (!apiKey || !facilityId) return null

  return {
    apiKey,
    facilityId,
    baseUrl: process.env.BOOKIO_API_BASE_URL || DEFAULT_BOOKIO_BASE_URL,
    lang: process.env.BOOKIO_LANG || 'sk',
  }
}

function splitServiceName(name: string, note?: string | null) {
  const separator = ' - '
  const separatorIndex = name.indexOf(separator)

  if (separatorIndex === -1) {
    return {
      title: name,
      description: note || '',
    }
  }

  return {
    title: name.slice(0, separatorIndex).trim(),
    description: name.slice(separatorIndex + separator.length).trim() || note || '',
  }
}

function formatPrice(price: BookioService['price'], currency: BookioService['currency']) {
  if (price === null || price === undefined || price === '') return ''

  const numericPrice = Number(price)
  const displayPrice = Number.isFinite(numericPrice)
    ? new Intl.NumberFormat('sk-SK', {
        maximumFractionDigits: numericPrice % 1 === 0 ? 0 : 2,
      }).format(numericPrice)
    : String(price)

  return currency === 'EUR' || !currency ? `${displayPrice}€` : `${displayPrice} ${currency}`
}

export async function fetchBookioServices(): Promise<Service[] | null> {
  const config = bookioConfigFromEnv()
  if (!config) return null

  const response = await fetch(
    `${config.baseUrl}/facilities/${encodeURIComponent(config.facilityId)}/services?lang=${encodeURIComponent(config.lang)}`,
    {
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
      },
      next: {
        revalidate: 30,
        tags: ['services', 'bookio-services'],
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Bookio services request failed with status ${response.status}`)
  }

  const payload = (await response.json()) as BookioApiResponse<BookioServicesData>

  if (!payload.result?.success) {
    throw new Error(payload.result?.errors?.join(', ') || 'Bookio services request failed')
  }

  const services = payload.result.data?.services || []

  return services
    .map((service) => {
      const { title, description } = splitServiceName(String(service.name || '').trim(), service.note)

      return {
        title,
        description,
        price: formatPrice(service.price, service.currency),
      }
    })
    .filter((service) => service.title && service.price)
}
