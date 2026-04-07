import sharp from "sharp"

const width = 1200
const height = 630
const background = "#ece9e4"
const outputPath = "public/og-image.jpg"
const logoPath = "public/logo_spring_day.jpg"

const overlaySvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bloomTop" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(964 100) rotate(127.704) scale(294.501 391.566)">
        <stop stop-color="#F7D4E4" stop-opacity="0.95" />
        <stop offset="1" stop-color="#F7D4E4" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="bloomBottom" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(160 538) rotate(-14.577) scale(275.412 180.08)">
        <stop stop-color="#F0BFD1" stop-opacity="0.72" />
        <stop offset="1" stop-color="#F0BFD1" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="accentLine" x1="0" y1="0" x2="1" y2="0">
        <stop stop-color="#B16A85" stop-opacity="0" />
        <stop offset="0.18" stop-color="#B16A85" stop-opacity="0.45" />
        <stop offset="0.82" stop-color="#B16A85" stop-opacity="0.45" />
        <stop offset="1" stop-color="#B16A85" stop-opacity="0" />
      </linearGradient>
    </defs>

    <rect width="${width}" height="${height}" fill="${background}" />
    <circle cx="964" cy="100" r="290" fill="url(#bloomTop)" />
    <circle cx="160" cy="538" r="205" fill="url(#bloomBottom)" />
    <rect x="120" y="456" width="960" height="1" fill="url(#accentLine)" />

    <text x="600" y="528" text-anchor="middle" fill="#22181A" font-size="50" font-weight="600" font-family="Georgia, 'Times New Roman', serif">
      Gélové nechty a manikúra v Trnave
    </text>
    <text x="600" y="575" text-anchor="middle" fill="#7B5A63" font-size="25" font-weight="500" font-family="'Segoe UI', Arial, sans-serif" letter-spacing="0.4">
      Online rezervácia • darčekové poukazy • parkovanie zdarma
    </text>
    <text x="1030" y="88" text-anchor="end" fill="#7B5A63" font-size="24" font-weight="600" font-family="'Segoe UI', Arial, sans-serif" letter-spacing="2.8">
      DIARAMANICURE.SK
    </text>
  </svg>
`

const logoBuffer = await sharp(logoPath)
  .resize({ width: 860 })
  .toBuffer()

await sharp({
  create: {
    width,
    height,
    channels: 4,
    background,
  },
})
  .composite([
    { input: Buffer.from(overlaySvg), top: 0, left: 0 },
    { input: logoBuffer, top: 60, left: 170 },
  ])
  .jpeg({
    quality: 92,
    chromaSubsampling: "4:4:4",
  })
  .toFile(outputPath)

console.log(`Generated ${outputPath}`)
