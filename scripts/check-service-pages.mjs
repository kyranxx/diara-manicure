import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { join } from "node:path"

const projectRoot = process.cwd()
const servicePagesPath = join(projectRoot, "lib", "service-pages.json")
const pages = JSON.parse(readFileSync(servicePagesPath, "utf8"))

const expectedSlugs = [
  "gelove-nechty-trnava",
  "manikura-trnava",
  "gel-lak-trnava",
  "doplnenie-nechtov-trnava",
]

assert.equal(Array.isArray(pages), true, "service page data must be an array")
assert.deepEqual(
  pages.map((page) => page.slug).sort(),
  [...expectedSlugs].sort(),
  "service page data must define the four priority Trnava service pages"
)

const seen = new Set()

for (const page of pages) {
  assert.equal(typeof page.slug, "string", "slug must be a string")
  assert.match(page.slug, /^[a-z0-9-]+$/, `${page.slug} must be URL-safe`)
  assert.equal(seen.has(page.slug), false, `${page.slug} must be unique`)
  seen.add(page.slug)

  assert.ok(page.metaTitle.length >= 35, `${page.slug} needs a useful meta title`)
  assert.ok(page.metaTitle.length <= 70, `${page.slug} meta title is too long`)
  assert.ok(page.metaDescription.length >= 90, `${page.slug} needs a useful meta description`)
  assert.ok(page.metaDescription.length <= 170, `${page.slug} meta description is too long`)
  assert.ok(page.heroTitle.includes("Trnava"), `${page.slug} hero title should include Trnava`)
  assert.ok(page.primaryKeyword.length > 4, `${page.slug} needs a primary keyword`)
  assert.ok(page.galleryImageIds.length >= 3, `${page.slug} needs gallery proof`)
  assert.ok(page.highlights.length >= 3, `${page.slug} needs conversion highlights`)
  assert.ok(page.faq.length >= 3, `${page.slug} needs FAQ content`)
}

console.log(`Verified ${pages.length} service page definitions.`)
