import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const env = { ...loadEnvFile(".env.local"), ...process.env }
const clientId = env.GOOGLE_BUSINESS_PROFILE_CLIENT_ID
const clientSecret = env.GOOGLE_BUSINESS_PROFILE_CLIENT_SECRET
const refreshToken = env.GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN

if (!clientId || !clientSecret || !refreshToken) {
  console.error(
    "Missing GOOGLE_BUSINESS_PROFILE_CLIENT_ID, GOOGLE_BUSINESS_PROFILE_CLIENT_SECRET, or GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN in .env.local",
  )
  process.exit(1)
}

const accessToken = await refreshAccessToken()
const accounts = await getJson("https://mybusinessaccountmanagement.googleapis.com/v1/accounts")

if (!accounts.accounts?.length) {
  console.log("No Business Profile accounts found for this Google login.")
  process.exit(0)
}

for (const account of accounts.accounts) {
  console.log(`\nAccount: ${account.accountName || account.name}`)
  console.log(`GOOGLE_BUSINESS_PROFILE_ACCOUNT_ID=${account.name?.replace("accounts/", "")}`)

  const locations = await listLocations(account.name)
  if (!locations.length) {
    console.log("  No locations found.")
    continue
  }

  for (const location of locations) {
    console.log(`  Location: ${location.title || location.name}`)
    console.log(`  GOOGLE_BUSINESS_PROFILE_LOCATION_ID=${location.name?.replace("locations/", "")}`)
    if (location.storefrontAddress?.addressLines?.length) {
      console.log(`  Address: ${location.storefrontAddress.addressLines.join(", ")}`)
    }
  }
}

async function listLocations(accountName) {
  const locations = []
  let pageToken = ""

  do {
    const url = new URL(`https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`)
    url.searchParams.set("readMask", "name,title,storefrontAddress")
    url.searchParams.set("pageSize", "100")
    if (pageToken) url.searchParams.set("pageToken", pageToken)

    const data = await getJson(url)
    locations.push(...(data.locations ?? []))
    pageToken = data.nextPageToken ?? ""
  } while (pageToken)

  return locations
}

async function refreshAccessToken() {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  })

  const data = await response.json()
  if (!response.ok || !data.access_token) {
    throw new Error(`Could not refresh access token: ${JSON.stringify(data)}`)
  }
  return data.access_token
}

async function getJson(url) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
  })
  const data = await response.json()
  if (!response.ok) throw new Error(`Google API failed with ${response.status}: ${JSON.stringify(data)}`)
  return data
}

function loadEnvFile(path) {
  try {
    const content = readFileSync(resolve(path), "utf8")
    return Object.fromEntries(
      content
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#") && line.includes("="))
        .map((line) => {
          const index = line.indexOf("=")
          return [line.slice(0, index).trim(), line.slice(index + 1).trim().replace(/^["']|["']$/g, "")]
        }),
    )
  } catch {
    return {}
  }
}
