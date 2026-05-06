import { google } from 'googleapis'
import { unstable_cache } from 'next/cache'

export type Service = {
  title: string
  description: string
  price: string
  discountedPrice?: string
}

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

const FALLBACK_SERVICES: Service[] = [
  { title: 'Detailná suchá manikúra', description: 'Suchá manikúra. Čistenie nechtov, odstránenie kožičky, úprava, olejček - bez lakovania.', price: '20€' },
  { title: 'Gélová báza + géllak', description: 'Vhodné na krátke nechty. Spevnenie prirodzených nechtov gélovou bázou s výberom farby gél laku, francúzskej manikúry, zdobenie. Zahŕňa detailnú manikúru.', price: '29€' },
  { title: 'Spevnenie prirodzených nechtov gélom', description: 'Spevnenie prirodzených nechtov gélom s výberom farby, francúzskej manikúry, zdobenia. Zahŕňa detailnú manikúru.', price: '32€' },
  { title: 'Modelácia gélových nechtov - nové', description: 'Predlžovanie, nové gélové nechty s výberom farby, francúzskej manikúry, zdobenie. Zahŕňa detailnú manikúru.', price: '38€' },
  { title: 'Modelácia gélových nechtov - doplnenie', description: 'Doplnenie gélových nechtov s výberom farby, francúzskej manikúry, zdobenie. Zahŕňa detailnú manikúru.', price: '32€' },
  { title: 'Odstránenie gélových nechtov', description: 'iba ak je gél, polygél. S akrylom nepracujeme.', price: '15€' },
  { title: 'Výmena / oprava / predĺženie nechtu mimo doplnenia - iba po telefonickej dohode, sms', description: '', price: '5€' },
  { title: 'Termín mimo kalendár', description: '1 ks', price: '10€' },
];

async function fetchSheetsData(): Promise<Service[]> {
  if (canUseCache()) {
    return cache.data!;
  }

  try {
    const credentialsEnv = process.env.GOOGLE_CREDENTIALS;
    const spreadsheetId = process.env.SPREADSHEET_ID;

    // Fallback data if credentials are missing
    if (!credentialsEnv || !spreadsheetId) {
      return FALLBACK_SERVICES;
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

    let services: Service[] = [];
    if (rows && rows.length > 0) {
      services = rows.map((row: string[]) => {
        const discountedPrice = row[3]?.trim();

        return {
          title: row[0] || '',
          description: row[1] || '',
          price: row[2] || '',
          ...(discountedPrice ? { discountedPrice } : {}),
        };
      }).filter(s => s.title);
    }

    if (process.env.NODE_ENV === 'development') {
      cache.data = services;
      cache.timestamp = Date.now();
    }

    return services;
  } catch (_error) {
    return FALLBACK_SERVICES;
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
