import { google } from 'googleapis'
import { fetchBookioServices } from './bookio'

export type Service = {
  title: string
  description: string
  price: string
  discountedPrice?: string
}

export type ServiceData = Service

// Owner's price list: first sheet of the Google Sheet, rows from 2:
// A title, B description, C price, D discounted price (optional).
async function fetchSheetServices(): Promise<Service[]> {
  const credentialsEnv = process.env.GOOGLE_CREDENTIALS
  const spreadsheetId = process.env.SPREADSHEET_ID
  if (!credentialsEnv || !spreadsheetId) return []

  const credentials = JSON.parse(credentialsEnv)
  if (credentials.private_key) credentials.private_key = credentials.private_key.replace(/\r/g, '')

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
  const sheets = google.sheets({ version: 'v4', auth })

  const meta = await sheets.spreadsheets.get({ spreadsheetId })
  const sheetName = meta.data.sheets?.[0]?.properties?.title || 'Sheet1'
  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${sheetName}!A2:D` })

  return ((response.data.values || []) as string[][])
    .filter((row) => row[0]?.trim())
    .map((row) => {
      const discountedPrice = row[3]?.trim()
      return {
        title: row[0].trim(),
        description: row[1]?.trim() || '',
        price: row[2]?.trim() || '',
        ...(discountedPrice ? { discountedPrice } : {}),
      }
    })
}

// Prices come from the Google Sheet (same Slovak list in every language).
// Bookio is used only if the sheet is unreachable or empty.
export async function getServices(lang = 'sk'): Promise<Service[]> {
  try {
    const services = await fetchSheetServices()
    if (services.length) return services
  } catch {
    // fall through to Bookio
  }
  try {
    return (await fetchBookioServices(lang)) || []
  } catch {
    return []
  }
}
