import { getSheetsData } from '@/lib/sheets'
import { NextResponse } from 'next/server'
import { securityMonitor } from '@/security-monitor'

export const dynamic = 'force-dynamic'

// Rate limiting helper
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 10 // requests per minute
const WINDOW_MS = 60 * 1000 // 1 minute

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS })
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
    if (!rateLimit(clientIP)) {
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
      price: String(service.price || '').slice(0, 50) // Limit length
    }))

    return NextResponse.json(sanitizedData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=300', // 5 minutes cache
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
