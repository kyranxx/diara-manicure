const GA4_MEASUREMENT_ID = "G-QCMMZCQZTP"
const MP_API_SECRET = process.env.GA4_MP_API_SECRET ?? ""
const MP_ENDPOINT = "https://www.google-analytics.com/mp/collect"

interface MpEventParams {
  name: string
  params?: Record<string, string | number | undefined>
  clientId?: string
  userProperties?: Record<string, { value: string }>
}

async function sendMeasurementProtocolEvent({
  name,
  params = {},
  clientId,
  userProperties,
}: MpEventParams): Promise<void> {
  if (!MP_API_SECRET) return

  try {
    await fetch(
      `${MP_ENDPOINT}?api_secret=${encodeURIComponent(MP_API_SECRET)}&measurement_id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: clientId ?? "server-api",
          user_properties: userProperties,
          events: [{ name, params }],
        }),
      }
    )
  } catch {
    // silently fail — Measurement Protocol is non-critical
  }
}

export function trackApiCall(
  endpoint: string,
  status: number,
  clientIp: string,
  userAgent: string
): void {
  sendMeasurementProtocolEvent({
    name: "api_request",
    params: {
      endpoint,
      status_code: status,
      client_ip: clientIp,
      user_agent: userAgent.slice(0, 256),
    },
    clientId: clientIp,
  })
}
