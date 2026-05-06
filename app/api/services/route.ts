import { getSheetsData } from '@/lib/sheets'
import { NextResponse } from 'next/server'
import { securityMonitor } from '@/lib/security-monitor'
import { trackApiCall } from '@/lib/measurement-protocol'

export const dynamic = 'force-dynamic'

// Rate limiting helper
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 100 // requests per minute
const WINDOW_MS = 60 * 1000 // 1 minute

function rateLimit(ip: string, userAgent: string): boolean {
  const key = `${ip}:${userAgent}`
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + WINDOW_MS })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

// Get client IP from request headers
function getClientIP(request: Request): string {
  return request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'
}

export async function GET(request: Request) {
  try {
    const clientIP = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Rate limiting check
    if (!rateLimit(clientIP, userAgent)) {
      // Log security event
      securityMonitor.logRateLimitExceeded(clientIP, userAgent)

      return NextResponse.json(
        { error: 'Too many requests, please try again later' },
        {
          status: 429,
          headers: {
            'Retry-After': '60'
          }
        }
      )
    }

    const data = await getSheetsData()

    // Sanitize data to ensure it's safe for JSON serialization
    const sanitizedData = data.map(service => ({
      title: String(service.title || '').slice(0, 100), // Limit length
      description: String(service.description || '').slice(0, 500), // Limit length
      price: String(service.price || '').slice(0, 50), // Limit length
      discountedPrice: service.discountedPrice ? String(service.discountedPrice).slice(0, 50) : undefined // Include discounted price
    }))

    trackApiCall("/api/services", 200, clientIP, userAgent)

    return NextResponse.json(sanitizedData, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=30', // 30 seconds cache
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    const clientIP = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Log security error event
    securityMonitor.log({
      type: 'error',
      severity: 'medium',
      message: `API error for services endpoint`,
      metadata: {
        clientIP,
        userAgent,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      ip: clientIP,
      userAgent
    })

    trackApiCall("/api/services", 500, clientIP, userAgent)

    // Secure error handling without sensitive data
    const errorMessage = process.env.NODE_ENV === 'development'
      ? (error instanceof Error ? error.message : 'Failed to fetch services')
      : 'Failed to fetch services'

    return NextResponse.json(
      { error: errorMessage },
      {
        status: 500,
        headers: {
          'X-Content-Type-Options': 'nosniff',
        },
      }
    )
  }
}
