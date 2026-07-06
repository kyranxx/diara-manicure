import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

const root = process.cwd()

function fileExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath))
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8")
}

assert.equal(fileExists("public/customer-analysis.html"), false, "customer analysis HTML must not be publicly deployable")
assert.equal(fileExists("public/customer-analysis-data.json"), false, "customer analysis JSON must not be publicly deployable")
assert.equal(fileExists("exports/customer_timelines.html"), false, "customer timeline export must not be tracked in the repo")
assert.equal(fileExists("exports/customer_lifecycle_map.html"), false, "customer lifecycle export must not be kept in the repo")

const gitignore = read(".gitignore")
assert.match(gitignore, /^\/exports\/$/m, "generated customer exports must be ignored")
assert.match(gitignore, /^\/private\/$/m, "private local reports must be ignored")

const customerAnalysis = read("scripts/build_customer_analysis.py")
assert.doesNotMatch(customerAnalysis, /default=Path\("public\/customer-analysis/, "customer analysis defaults must not write to public/")
assert.match(customerAnalysis, /default=Path\("private\/customer-analysis\.html"\)/, "customer analysis HTML should default to private/")
assert.match(customerAnalysis, /default=Path\("private\/customer-analysis-data\.json"\)/, "customer analysis JSON should default to private/")

const timelineScript = read("scripts/generate_customer_timelines.py")
assert.doesNotMatch(timelineScript, /ROOT \/ "exports"/, "customer timeline script must not write to exports/")
assert.match(timelineScript, /ROOT \/ "private" \/ "customer_timelines\.html"/, "customer timeline script should write to private/")

const lifecycleScript = read("scripts/generate_customer_lifecycle_map.py")
assert.doesNotMatch(lifecycleScript, /ROOT \/ "exports"/, "customer lifecycle script must not write to exports/")
assert.match(lifecycleScript, /ROOT \/ "private" \/ "customer_lifecycle_map\.html"/, "customer lifecycle script should write to private/")

const oauthScript = read("scripts/google-business-profile-oauth.mjs")
assert.doesNotMatch(oauthScript, /GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN=\$\{/, "OAuth helper must not print full refresh tokens")
assert.match(oauthScript, /refresh token was saved/i, "OAuth helper should confirm safe token storage")

const googleReviewsRoute = read("app/api/google-reviews/route.ts")
assert.doesNotMatch(googleReviewsRoute, /message:\s*businessProfileError/, "public reviews response must not expose Business Profile error details")
assert.doesNotMatch(googleReviewsRoute, /businessProfileError,\s*$/m, "public reviews response must not expose raw upstream errors")
assert.doesNotMatch(googleReviewsRoute, /message:\s*error instanceof Error/, "public reviews response must not expose raw Places errors")
assert.match(googleReviewsRoute, /console\.error\("\[google-reviews\]/, "server logs should keep review errors visible")
assert.doesNotMatch(googleReviewsRoute, /NEXT_PUBLIC_GOOGLE_MAPS_API_KEY/, "reviews API must not use a browser-restricted public Maps key")

const testimonials = read("components/sections/Testimonials.tsx")
assert.doesNotMatch(testimonials, /data-google-maps-key/, "reviews section must not expose a public Maps key")

const runtimeScript = read("components/site-runtime-script.ts")
assert.doesNotMatch(runtimeScript, /Place\.searchByText/, "reviews runtime must not call browser Places search")
assert.doesNotMatch(runtimeScript, /fetchFields\(\{\s*fields:\s*\[[^\]]*reviews/, "reviews runtime must not fetch reviews through browser Places")

const measurementProtocol = read("lib/measurement-protocol.ts")
assert.doesNotMatch(measurementProtocol, /client_ip/, "GA4 events must not include raw client IP")
assert.doesNotMatch(measurementProtocol, /user_agent/, "GA4 events must not include raw user agent")
assert.doesNotMatch(measurementProtocol, /clientId:\s*clientIp/, "GA4 client ID must not be the raw client IP")

const pkg = JSON.parse(read("package.json"))
assert.equal(pkg.scripts["vercel-install"], "npm ci", "Vercel install should use the committed npm lockfile")
assert.equal(pkg.engines?.pnpm, undefined, "package metadata should not require pnpm without a pnpm lockfile")
assert.equal(fileExists("pnpm-lock.yaml"), false, "pnpm lockfile should not appear when npm is the chosen package manager")

console.log("security regression check passed")
