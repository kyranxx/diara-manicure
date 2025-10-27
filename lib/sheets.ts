import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'
import { unstable_cache } from 'next/cache'

export type Service = {
  title: string
  description: string
  price: string
}

// Internal function that actually fetches data
async function fetchSheetsData(): Promise<Service[]> {
  try {
    console.log('Starting Google Sheets data fetch...');

    // Use credentials from environment variable instead of file
    const credentialsEnv = process.env.GOOGLE_CREDENTIALS;
    if (!credentialsEnv) {
      console.error('GOOGLE_CREDENTIALS environment variable not found');
      return [
        {
          title: 'Configuration Error',
          description: 'Google credentials not found',
          price: '',
        }
      ];
    }

    const credentials = JSON.parse(credentialsEnv);
    console.log('Credentials parsed, client_email:', credentials.client_email);

    // Clean the private key to remove carriage returns
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\r/g, '')
      console.log('Private key cleaned')
    }

    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) {
      console.error('SPREADSHEET_ID environment variable not found');
      return [
        {
          title: 'Configuration Error',
          description: 'Spreadsheet ID not found',
          price: '',
        }
      ];
    }
    console.log('Using spreadsheet ID:', spreadsheetId);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    console.log('Google Auth created');
    const client = await auth.getClient();
    console.log('Auth client obtained');

    const googleSheets = google.sheets({ version: 'v4', auth: client });
    console.log('Google Sheets API client created');

    // First get spreadsheet metadata to see available sheets
    console.log('Getting spreadsheet metadata...');
    const metaResponse = await googleSheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheets = metaResponse.data.sheets || [];
    console.log('Available sheets:', sheets.map(s => ({ title: s.properties?.title, index: s.properties?.index })));

    // Use the first sheet or fall back to default
    const sheetName = sheets[0]?.properties?.title || 'Sheet1';
    console.log('Using sheet:', sheetName);

    // Try a simpler range first to test
    console.log('Fetching data with simpler range first...');
    const testResponse = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: sheetName,
    });

    console.log('Test response received, values length:', testResponse.data.values?.length);
    const testRows = testResponse.data.values || [];
    console.log('First few rows:', testRows.slice(0, 3));

    if (testRows.length === 0) {
      console.log('No data in test range');
      return [];
    }

    // Now get the data excluding header row
    const response = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A2:Z`,
    });

    console.log('API response received');
    const rows = response.data.values;
    console.log('Rows found:', rows ? rows.length : 0);

    if (rows && rows.length > 0) {
      const services = rows.map((row: string[]) => ({
        title: row[0] || '',
        description: row[1] || '',
        price: row[2] || '',
      })).filter(s => s.title); // skip empty titles

      console.log('Services processed:', services.length);
      return services;
    }

    console.log('No rows found');
    return [];
  } catch (error) {
    console.error('Error fetching sheets data:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      code: (error as any)?.code,
      status: (error as any)?.status,
      errors: (error as any)?.errors,
    });

    // Return more detailed error for debugging
    return [
      {
        title: 'Error loading services',
        description: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
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
