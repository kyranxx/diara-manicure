/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.ggpht.com",
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
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
    ];
  },
}


export default nextConfig
