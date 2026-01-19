/**
 * Security monitoring and logging utility
 * 
 * This module provides centralized security monitoring
 * without exposing sensitive data to logs
 */

export interface SecurityEvent {
  type: 'rate_limit_exceeded' | 'suspicious_request' | 'error' | 'auth_failure'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  metadata?: Record<string, any>
  timestamp: number
  ip?: string
  userAgent?: string
}

const securityEvents: SecurityEvent[] = []
const MAX_EVENTS = 1000

export class SecurityMonitor {
  private static instance: SecurityMonitor

  public static getInstance(): SecurityMonitor {
    if (!SecurityMonitor.instance) {
      SecurityMonitor.instance = new SecurityMonitor()
    }
    return SecurityMonitor.instance
  }

  /**
   * Log a security event
   */
  public log(event: Omit<SecurityEvent, 'timestamp'>): void {
    const fullEvent: SecurityEvent = {
      ...event,
      timestamp: Date.now()
    }

    securityEvents.push(fullEvent)

    if (securityEvents.length > MAX_EVENTS) {
      securityEvents.splice(0, securityEvents.length - MAX_EVENTS)
    }

    if (process.env.NODE_ENV === 'production' && fullEvent.severity === 'critical') {
      this.sendToExternalMonitoring(fullEvent)
    }
  }

  /**
   * Log rate limit exceeded event
   */
  public logRateLimitExceeded(ip: string, userAgent?: string): void {
    this.log({
      type: 'rate_limit_exceeded',
      severity: 'medium',
      message: `Rate limit exceeded for IP: ${ip}`,
      metadata: { ip, userAgent },
      ip,
      userAgent
    })
  }

  /**
   * Log suspicious request
   */
  public logSuspiciousRequest(ip: string, reason: string, metadata?: Record<string, any>, userAgent?: string): void {
    this.log({
      type: 'suspicious_request',
      severity: 'medium',
      message: `Suspicious request from IP: ${ip} - ${reason}`,
      metadata: { ip, reason, ...metadata },
      ip,
      userAgent
    })
  }

  /**
   * Get recent security events
   */
  public getRecentEvents(limit: number = 50): SecurityEvent[] {
    return securityEvents.slice(-limit)
  }

  /**
   * Get security statistics
   */
  public getStats(): {
    totalEvents: number
    eventsByType: Record<string, number>
    eventsBySeverity: Record<string, number>
    recentActivity: number
  } {
    const eventsByType: Record<string, number> = {}
    const eventsBySeverity: Record<string, number> = {}
    const oneHourAgo = Date.now() - (60 * 60 * 1000)

    let recentActivity = 0

    securityEvents.forEach(event => {
      eventsByType[event.type] = (eventsByType[event.type] || 0) + 1
      eventsBySeverity[event.severity] = (eventsBySeverity[event.severity] || 0) + 1

      if (event.timestamp > oneHourAgo) {
        recentActivity++
      }
    })

    return {
      totalEvents: securityEvents.length,
      eventsByType,
      eventsBySeverity,
      recentActivity
    }
  }

  private sendToExternalMonitoring(event: SecurityEvent): void {
    if (process.env.SENTRY_DSN) {
      // Integration point for Sentry or other monitoring service
    }
  }
}

export const securityMonitor = SecurityMonitor.getInstance()
