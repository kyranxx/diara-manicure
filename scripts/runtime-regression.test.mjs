import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

const root = process.cwd()

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8")
}

const analyticsRuntime = read("components/analytics-runtime.tsx")

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

console.log("runtime regression check passed")
