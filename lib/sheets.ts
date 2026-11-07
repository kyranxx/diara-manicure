import { google } from 'googleapis'
import { unstable_cache } from 'next/cache'
import { fetchBookioServices } from './bookio'

export type Service = {
  title: string
  description: string
  price: string
  discountedPrice?: string
}

export type ServiceData = Service

const cache: {
  data: Service[] | null
  timestamp: number
} = {
  data: null,
  timestamp: 0
}

const CACHE_DURATION = 10 * 1000

function canUseCache(): boolean {
  if (process.env.NODE_ENV !== 'development') return false;
  const now = Date.now();
  return cache.data !== null && (now - cache.timestamp) < CACHE_DURATION;
}

async function fetchSheetsData(): Promise<Service[]> {
  if (canUseCache()) {
    return cache.data!;
  }

  try {
    const bookioServices = await fetchBookioServices();

    if (bookioServices?.length) {
      if (process.env.NODE_ENV === 'development') {
        cache.data = bookioServices;
        cache.timestamp = Date.now();
      }

      return bookioServices;
    }
  } catch (_error) {
    // Keep the public services endpoint available if Bookio is temporarily down.
  }

  try {
    const credentialsEnv = process.env.GOOGLE_CREDENTIALS;
    const spreadsheetId = process.env.SPREADSHEET_ID;

    // No outdated prices: an empty list shows the "unavailable" message with the booking link.
    if (!credentialsEnv || !spreadsheetId) {
      return [];
    }

    const credentials = JSON.parse(credentialsEnv);

    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\r/g, '');
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client as Parameters<typeof google.sheets>[0]['auth'] });

    const metaResponse = await googleSheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheets = metaResponse.data.sheets || [];
    const sheetName = sheets[0]?.properties?.title || 'Sheet1';

    const response = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A2:Z`,
    });

    const rows = response.data.values;

    const services: Service[] = [];
    if (rows && rows.length > 0) {
      for (const row of rows as string[][]) {
        const discountedPrice = row[3]?.trim();

        if (!row[0]) continue;

        services.push({
          title: row[0] || '',
          description: row[1] || '',
          price: row[2] || '',
          ...(discountedPrice ? { discountedPrice } : {}),
        });
      }
    }

    if (process.env.NODE_ENV === 'development') {
      cache.data = services;
      cache.timestamp = Date.now();
    }

    return services;
  } catch (_error) {
    return [];
  }
}

export const getSheetsData = unstable_cache(
  fetchSheetsData,
  ['services-pricelist'],
  {
    revalidate: 30,
    tags: ['services']
  }
)
