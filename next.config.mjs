/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
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
            value: "default-src 'self'; frame-src 'self' https://www.google.com https://maps.googleapis.com https://maps.gstatic.com https://services.bookio.com https://www.googletagmanager.com; img-src 'self' https://images.unsplash.com https://*.googleapis.com https://maps.gstatic.com https://*.gstatic.com https://www.google.com https://*.google.com https://www.googleadservices.com https://*.googleadservices.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://www.googletagmanager.com https://www.google-analytics.com https://www.google.sk https://www.google.nl https://www.google.de https://www.google.cz https://www.google.at https://pagead2.googlesyndication.com https://bookio.s3.eu-central-1.amazonaws.com https://cdn-cookieyes.com https://*.googleusercontent.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://www.google.com https://www.googletagmanager.com https://services.bookio.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://www.google-analytics.com https://cdn-cookieyes.com; style-src 'self' 'unsafe-inline' https://maps.googleapis.com https://fonts.googleapis.com https://services.bookio.com https://cdn-cookieyes.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://maps.googleapis.com https://www.google.com https://*.google.com https://www.googletagmanager.com https://www.google-analytics.com https://maps.gstatic.com https://services.bookio.com https://fonts.googleapis.com https://fonts.gstatic.com https://www.googleadservices.com https://*.googleadservices.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://analytics.google.com https://www.google.sk https://www.google.nl https://www.google.de https://www.google.cz https://www.google.at https://pagead2.googlesyndication.com https://cdn-cookieyes.com;",
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), unload=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig
