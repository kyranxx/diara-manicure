import { google } from 'googleapis'
import { unstable_cache } from 'next/cache'

export type Service = {
  title: string
  description: string
  price: string
}

// Simple logger that only logs in development
const debugLog = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};

// Secure error logging without sensitive data
const logError = (message: string, error: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(message, {
      message: error?.message || 'Unknown error',
      // Never log stack traces in production
      ...(process.env.NODE_ENV === 'development' && { stack: error?.stack })
    });
  }
  // In production, just log to external monitoring service if needed
};

// Cache storage for development mode
let cache: {
  data: Service[] | null
  timestamp: number
} = {
  data: null,
  timestamp: 0
}

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in development

// Check if we can use cached data in development
function canUseCache(): boolean {
  if (process.env.NODE_ENV !== 'development') return false;
  const now = Date.now();
  return cache.data !== null && (now - cache.timestamp) < CACHE_DURATION;
}

// Internal function that actually fetches data
async function fetchSheetsData(): Promise<Service[]> {
  // Return cached data if available and valid
  if (canUseCache()) {
    debugLog('Using cached services data');
    return cache.data!;
  }

  try {
    debugLog('Starting Google Sheets data fetch...');

    // Use credentials from environment variable instead of file
    const credentialsEnv = process.env.GOOGLE_CREDENTIALS;
    if (!credentialsEnv) {
      logError('GOOGLE_CREDENTIALS environment variable not found', new Error('Missing credentials'));
      return [
        {
          title: 'Configuration Error',
          description: 'Google credentials not found',
          price: '',
        }
      ];
    }

    const credentials = JSON.parse(credentialsEnv);
    debugLog('Credentials parsed successfully');

    // Clean the private key to remove carriage returns
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\r/g, '');
      debugLog('Private key cleaned');
    }

    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) {
      logError('SPREADSHEET_ID environment variable not found', new Error('Missing spreadsheet ID'));
      return [
        {
          title: 'Configuration Error',
          description: 'Spreadsheet ID not found',
          price: '',
        }
      ];
    }
    debugLog('Using spreadsheet ID for data fetch');

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    debugLog('Google Auth created');
    const client = await auth.getClient();
    debugLog('Auth client obtained');

    const googleSheets = google.sheets({ version: 'v4', auth: client as any });
    debugLog('Google Sheets API client created');

    // First get spreadsheet metadata to see available sheets
    debugLog('Getting spreadsheet metadata...');
    const metaResponse = await googleSheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheets = metaResponse.data.sheets || [];
    debugLog(`Found ${sheets.length} sheets in spreadsheet`);

    // Use the first sheet or fall back to default
    const sheetName = sheets[0]?.properties?.title || 'Sheet1';
    debugLog('Using sheet:', sheetName);

    // Try a simpler range first to test
    debugLog('Fetching data with simpler range first...');
    const testResponse = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: sheetName,
    });

    debugLog('Test response received, values found');
    const testRows = testResponse.data.values || [];
    debugLog('First few rows received for validation');

    if (testRows.length === 0) {
      debugLog('No data in test range');
      return [];
    }

    // Now get the data excluding header row
    const response = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A2:Z`,
    });

    debugLog('API response received');
    const rows = response.data.values;
    debugLog(`Found ${rows?.length || 0} data rows`);

    let services: Service[] = [];
    if (rows && rows.length > 0) {
      services = rows.map((row: string[]) => ({
        title: row[0] || '',
        description: row[1] || '',
        price: row[2] || '',
      })).filter(s => s.title); // skip empty titles

      debugLog(`Processed ${services.length} services`);
    }

    // Cache the data in development mode
    if (process.env.NODE_ENV === 'development') {
      cache.data = services;
      cache.timestamp = Date.now();
      debugLog('Services data cached for development');
    }

    return services;
  } catch (error) {
    logError('Error fetching sheets data', error);

    return [
      {
        title: 'Error loading services',
        description: 'Please contact support',
        price: '',
      }
    ];
  }
}

// Cached wrapper function - revalidates every 5 minutes
export const getSheetsData = unstable_cache(
  fetchSheetsData,
  ['services-pricelist'],
  {
    revalidate: 300, // 5 minutes
    tags: ['services']
  }
)
