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

// In-memory storage for security events (replace with proper logging service in production)
const securityEvents: SecurityEvent[] = []
const MAX_EVENTS = 1000

// Simple security monitoring
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
    
    // Store event (in production, send to monitoring service)
    securityEvents.push(fullEvent)
    
    // Keep only recent events
    if (securityEvents.length > MAX_EVENTS) {
      securityEvents.splice(0, securityEvents.length - MAX_EVENTS)
    }
    
    // In production, send critical events to external monitoring
    if (process.env.NODE_ENV === 'production' && fullEvent.severity === 'critical') {
      this.sendToExternalMonitoring(fullEvent)
    }
    
    // Log to console in development only
    if (process.env.NODE_ENV === 'development') {
      console.log('Security Event:', fullEvent)
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
      // Count by type
      eventsByType[event.type] = (eventsByType[event.type] || 0) + 1
      
      // Count by severity
      eventsBySeverity[event.severity] = (eventsBySeverity[event.severity] || 0) + 1
      
      // Recent activity
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
  
  /**
   * Send critical events to external monitoring service
   * This is a placeholder - integrate with your monitoring service
   */
  private sendToExternalMonitoring(event: SecurityEvent): void {
    // Placeholder for external monitoring integration
    // Examples: Sentry, LogRocket, DataDog, etc.
    
    if (process.env.SENTRY_DSN) {
      // Example: Send to Sentry
      // Sentry.captureException(new Error(event.message), {
      //   level: event.severity,
      //   extra: event
      // })
    }
    
    // Add other monitoring services as needed
  }
}

// Export singleton instance
export const securityMonitor = SecurityMonitor.getInstance()
