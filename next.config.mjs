/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  serverExternalPackages: ['googleapis'],
  // Security headers configuration
  async headers() {
    return [
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
            key: 'Content-Security-Policy',
            value: "default-src 'self'; frame-src 'self' https://www.google.com https://maps.googleapis.com https://maps.gstatic.com https://services.bookio.com; img-src 'self' https://images.unsplash.com https://*.googleapis.com https://maps.gstatic.com https://*.gstatic.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://www.google.com https://services.bookio.com; style-src 'self' 'unsafe-inline' https://maps.googleapis.com https://fonts.googleapis.com https://services.bookio.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://maps.googleapis.com https://www.google.com https://maps.gstatic.com https://services.bookio.com;",
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
}

export default nextConfig
