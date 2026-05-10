import http from "node:http"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const scope = "https://www.googleapis.com/auth/business.manage"
const env = { ...loadEnvFile(".env.local"), ...process.env }
const clientId = env.GOOGLE_BUSINESS_PROFILE_CLIENT_ID
const clientSecret = env.GOOGLE_BUSINESS_PROFILE_CLIENT_SECRET
const port = Number(env.GOOGLE_BUSINESS_PROFILE_OAUTH_PORT) || 3333
const redirectUri = `http://127.0.0.1:${port}/oauth2callback`

if (!clientId || !clientSecret) {
  console.error("Missing GOOGLE_BUSINESS_PROFILE_CLIENT_ID or GOOGLE_BUSINESS_PROFILE_CLIENT_SECRET in .env.local")
  process.exit(1)
}

const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth")
authUrl.searchParams.set("client_id", clientId)
authUrl.searchParams.set("redirect_uri", redirectUri)
authUrl.searchParams.set("response_type", "code")
authUrl.searchParams.set("scope", scope)
authUrl.searchParams.set("access_type", "offline")
authUrl.searchParams.set("prompt", "consent")

const server = http.createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url ?? "/", redirectUri)
    if (requestUrl.pathname !== "/oauth2callback") {
      response.writeHead(404)
      response.end("Not found")
      return
    }

    const error = requestUrl.searchParams.get("error")
    if (error) throw new Error(error)

    const code = requestUrl.searchParams.get("code")
    if (!code) throw new Error("Missing OAuth code")

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    })

    const tokenData = await tokenResponse.json()
    if (!tokenResponse.ok) throw new Error(JSON.stringify(tokenData))
    if (!tokenData.refresh_token) {
      throw new Error("Google did not return a refresh_token. Re-run and make sure prompt=consent is used.")
    }

    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" })
    response.end("Done. You can close this tab and copy the refresh token from the terminal.")

    console.log("\nAdd this to .env.local:")
    console.log(`GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN=${tokenData.refresh_token}`)
    server.close()
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" })
    response.end(error instanceof Error ? error.message : "OAuth failed")
    console.error(error)
    server.close()
    process.exitCode = 1
  }
})

server.listen(port, "127.0.0.1", () => {
  console.log(`Open this URL and approve access with the Google account that owns/manages the business:\n`)
  console.log(authUrl.toString())
  console.log(`\nWaiting for Google to redirect back to ${redirectUri}`)
})

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
