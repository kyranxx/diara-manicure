/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Keep resized photos 1 day instead of 4 hours; photos are sometimes replaced under the same name, so not longer.
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.ggpht.com",
      },
    ],
  },
  serverExternalPackages: ['googleapis'],
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Vary',
            value: 'Accept',
          },
        ],
      },
      {
        source: '/blog/:path*',
        headers: [
          {
            key: 'Vary',
            value: 'Accept',
          },
        ],
      },
      {
        source: '/docs/api',
        headers: [
          {
            key: 'Vary',
            value: 'Accept',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            // Safe baseline: blocks plugins, <base> hijacking and framing by other sites without limiting scripts.
            key: 'Content-Security-Policy',
            value: "object-src 'none'; base-uri 'self'; frame-ancestors 'self'",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'diaramanicure.sk',
          },
        ],
        destination: 'https://www.diaramanicure.sk/:path*',
        statusCode: 308,
      },
      // Thin per-occasion and per-style pages merged into their main pages (Nov 2026).
      { source: '/darcekove-poukazy/:slug', destination: '/darcekove-poukazy', permanent: true },
      { source: '/galeria/:slug', destination: '/galeria', permanent: true },
      // Old top-level service pages (removed May 2026) now live under /sluzby.
      { source: '/gelove-nechty-trnava', destination: '/sluzby/gelove-nechty-trnava', permanent: true },
      { source: '/gel-lak-trnava', destination: '/sluzby/gel-lak-trnava', permanent: true },
      { source: '/manikura-trnava', destination: '/sluzby/manikura-trnava', permanent: true },
      { source: '/doplnenie-nechtov-trnava', destination: '/sluzby/gelove-nechty-trnava', permanent: true },
      // Google reads the gallery image-name prefix in our JS as a page address; send it to the gallery.
      { source: '/gelove-nechty-trnava-gallery-', destination: '/galeria', permanent: true },
    ];
  },
}


export default nextConfig
