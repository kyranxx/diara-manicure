const CONSENT_COOKIE_KEY = "cookie-consent-prefs"

export type ConsentPreferences = {
  adStorage: "granted" | "denied"
  analyticsStorage: "granted" | "denied"
  adUserData: "granted" | "denied"
  adPersonalization: "granted" | "denied"
}

const DEFAULT_DENIED: ConsentPreferences = {
  adStorage: "denied",
  analyticsStorage: "denied",
  adUserData: "denied",
  adPersonalization: "denied",
}

const ALL_GRANTED: ConsentPreferences = {
  adStorage: "granted",
  analyticsStorage: "granted",
  adUserData: "granted",
  adPersonalization: "granted",
}

export function getStoredConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(CONSENT_COOKIE_KEY)
    if (raw) return JSON.parse(raw) as ConsentPreferences
  } catch { /* corrupted data, ignore */ }
  return null
}

export function saveConsent(prefs: ConsentPreferences): void {
  if (typeof window === "undefined") return
  window.localStorage.setItem(CONSENT_COOKIE_KEY, JSON.stringify(prefs))
  const granted = prefs.analyticsStorage === "granted"
  const gtag = (window as Record<string, unknown>).gtag as ((...args: unknown[]) => void) | undefined
  if (gtag) {
    gtag("consent", "update", { ...prefs })
  }
  try {
    window.localStorage.setItem("clarity-consent", granted ? "1" : "0")
  } catch { /* ignore */ }
}

export function getConsentDefaults(): ConsentPreferences {
  const stored = getStoredConsent()
  return stored ?? DEFAULT_DENIED
}

export function getAllGranted(): ConsentPreferences {
  return { ...ALL_GRANTED }
}

export function getAnalyticsOnly(): ConsentPreferences {
  return {
    analyticsStorage: "granted",
    adStorage: "denied",
    adUserData: "denied",
    adPersonalization: "denied",
  }
}

export function generateAnonymousUserId(): string {
  if (typeof window === "undefined") return ""
  const key = "ga-anon-user-id"
  try {
    let id = window.localStorage.getItem(key)
    if (!id) {
      id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
      window.localStorage.setItem(key, id)
    }
    return id
  } catch {
    return ""
  }
}
