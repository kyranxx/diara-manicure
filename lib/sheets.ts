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

async function fetchSheetsData(): Promise<Service[]> {
  if (canUseCache()) {
    return cache.data!;
  }

  try {
    const credentialsEnv = process.env.GOOGLE_CREDENTIALS;
    const spreadsheetId = process.env.SPREADSHEET_ID;

    // Fallback data if credentials are missing
    if (!credentialsEnv || !spreadsheetId) {
      return [
        { title: 'Modelácia gélových nechtov (Nové nechty)', description: 'Predĺženie nechtov na šablóny, úprava kožtičky, farebný gél/gellak, záverečná starostlivosť.', price: '35 €', discountedPrice: '29 €' },
        { title: 'Doplnenie gélových nechtov (Dorábka)', description: 'Odstránenie starého materiálu, úprava kožtičky, nová modelácia, farebný gél/gellak.', price: '30 €' },
        { title: 'Gél lak (Spevnenie nechtov)', description: 'Úprava kožtičky, spevnenie kaučukovým bázovým gélom, farba.', price: 'Pozri cenník' },
        { title: 'Japonská manikúra', description: 'Hĺbková výživa a leštenie prírodných nechtov včelím voskom.', price: '20 €' },
        { title: 'Klasická manikúra', description: 'Úprava tvaru nechtov, zatlačenie kožtičky, výživný olejček.', price: '15 €' },
        { title: 'Odstránenie gélových nechtov', description: 'Bez ďalšej úpravy.', price: '10 €' },
        { title: 'Nail Art (zdobenie)', description: 'Podľa náročnosti (kamienky, kreslenie, fólie...).', price: 'od 1 €' },
      ];
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
      services = rows.map((row: string[]) => ({
        title: row[0] || '',
        description: row[1] || '',
        price: row[2] || '',
        discountedPrice: row[3] || undefined,
      })).filter(s => s.title);
    }

    if (process.env.NODE_ENV === 'development') {
      cache.data = services;
      cache.timestamp = Date.now();
    }

    return services;
  } catch (_error) {
    return [
      { title: 'Modelácia gélových nechtov (Nové nechty)', description: 'Predĺženie nechtov na šablóny, úprava kožtičky, farebný gél/gellak, záverečná starostlivosť.', price: '35 €', discountedPrice: '29 €' },
      { title: 'Doplnenie gélových nechtov (Dorábka)', description: 'Odstránenie starého materiálu, úprava kožtičky, nová modelácia, farebný gél/gellak.', price: '30 €' },
      { title: 'Gél lak (Spevnenie nechtov)', description: 'Úprava kožtičky, spevnenie kaučukovým bázovým gélom, farba.', price: 'Pozri cenník' },
      { title: 'Japonská manikúra', description: 'Hĺbková výživa a leštenie prírodných nechtov včelím voskom.', price: '20 €' },
    ];
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
