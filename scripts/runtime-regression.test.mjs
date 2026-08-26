import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

const root = process.cwd()

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8")
}

const analyticsRuntime = read("components/analytics-runtime.tsx")
const mobileBookingBar = read("components/mobile-booking-bar.tsx")
const siteRuntime = read("components/site-runtime-script.ts")

assert.match(
  analyticsRuntime,
  /import Script from "next\/script"/,
  "site runtime should use Next Script instead of a raw server-rendered script",
)
assert.match(
  analyticsRuntime,
  /strategy="afterInteractive"/,
  "site runtime should execute after hydration starts to avoid mutating server HTML before React hydrates",
)
assert.doesNotMatch(
  analyticsRuntime,
  /<script\s/,
  "site runtime must not render as a raw lowercase script tag",
)

assert.match(
  mobileBookingBar,
  /data-mobile-booking-bar/,
  "mobile booking bar should expose a stable hook for consent visibility",
)
assert.match(
  siteRuntime,
  /mobileBookingBar\.hidden = open/,
  "cookie consent should hide the mobile booking bar while the banner is open",
)
assert.match(
  siteRuntime,
  /setBannerOpen\(false\)/,
  "mobile booking bar should return after consent is stored",
)

console.log("runtime regression check passed")
