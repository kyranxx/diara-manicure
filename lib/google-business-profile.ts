export type PublicGoogleReview = {
  id?: string
  author: string
  authorUri: string
  authorPhotoUri: string
  rating: number
  text: string
  publishTime: string
  relativeTime: string
  googleMapsUri: string
}

export type BusinessProfileConfig = {
  clientId: string
  clientSecret: string
  refreshToken: string
  accountId: string
  locationId: string
  reviewLimit: number
}

type EnvLike = Record<string, string | undefined>

type BusinessProfileReview = {
  reviewId?: string
  reviewer?: {
    displayName?: string
    profilePhotoUrl?: string
    isAnonymous?: boolean
  }
  starRating?: string
  comment?: string
  createTime?: string
  updateTime?: string
}

type FetchLike = typeof fetch

const businessManageScope = "https://www.googleapis.com/auth/business.manage"

export function starRatingValue(starRating: string | undefined) {
  switch (starRating) {
    case "FIVE":
      return 5
    case "FOUR":
      return 4
    case "THREE":
      return 3
    case "TWO":
      return 2
    case "ONE":
      return 1
    default:
      return 0
  }
}

export function normalizeBusinessProfileReview(
  review: BusinessProfileReview,
  googleMapsUrl = "",
): PublicGoogleReview {
  const reviewer = review.reviewer ?? {}
  return {
    id: review.reviewId || review.updateTime || review.createTime || "",
    author: reviewer.isAnonymous ? "Google recenzia" : reviewer.displayName || "Google recenzia",
    authorUri: "",
    authorPhotoUri: reviewer.isAnonymous ? "" : reviewer.profilePhotoUrl || "",
    rating: starRatingValue(review.starRating),
    text: cleanReviewComment(review.comment),
    publishTime: review.createTime || review.updateTime || "",
    relativeTime: "",
    googleMapsUri: googleMapsUrl,
  }
}

function cleanReviewComment(comment: string | undefined) {
  const text = (comment ?? "").trim()
  const originalPrefixMatch = text.match(/\n\s*\((?:Original|Pôvodné)\)\s*/i)

  if (originalPrefixMatch?.index !== undefined) {
    return text.slice(originalPrefixMatch.index + originalPrefixMatch[0].length).trim()
  }

  return text.replace(/\s*\((?:Translated by Google|Preložené Googlom|Preložené službou Google)\)[\s\S]*$/i, "").trim()
}

export function businessProfileConfigFromEnv(env: EnvLike = process.env): BusinessProfileConfig | null {
  const clientId = env.GOOGLE_BUSINESS_PROFILE_CLIENT_ID?.trim()
  const clientSecret = env.GOOGLE_BUSINESS_PROFILE_CLIENT_SECRET?.trim()
  const refreshToken = env.GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN?.trim()
  const accountId = stripResourcePrefix(env.GOOGLE_BUSINESS_PROFILE_ACCOUNT_ID, "accounts")
  const locationId = stripResourcePrefix(env.GOOGLE_BUSINESS_PROFILE_LOCATION_ID, "locations")

  if (!clientId || !clientSecret || !refreshToken || !accountId || !locationId) return null

  return {
    clientId,
    clientSecret,
    refreshToken,
    accountId,
    locationId,
    reviewLimit: parseReviewLimit(env.GOOGLE_BUSINESS_PROFILE_REVIEW_LIMIT),
  }
}

export async function fetchBusinessProfileReviews(
  fetchImpl: FetchLike,
  config: BusinessProfileConfig,
  googleMapsUrl = "",
) {
  const accessToken = await refreshAccessToken(fetchImpl, config)
  const reviews: PublicGoogleReview[] = []
  let pageToken = ""

  while (reviews.length < config.reviewLimit) {
    const remaining = config.reviewLimit - reviews.length
    const url = new URL(
      `https://mybusiness.googleapis.com/v4/accounts/${config.accountId}/locations/${config.locationId}/reviews`,
    )
    url.searchParams.set("pageSize", String(Math.min(50, remaining)))
    url.searchParams.set("orderBy", "updateTime desc")
    if (pageToken) url.searchParams.set("pageToken", pageToken)

    const response = await fetchImpl(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Google Business Profile reviews failed with ${response.status}: ${await shortError(response)}`)
    }

    const data = (await response.json()) as {
      reviews?: BusinessProfileReview[]
      nextPageToken?: string
    }

    reviews.push(
      ...(data.reviews ?? [])
        .map((review) => normalizeBusinessProfileReview(review, googleMapsUrl))
        .filter((review) => review.text && review.rating >= 4),
    )

    pageToken = data.nextPageToken ?? ""
    if (!pageToken) break
  }

  return reviews.slice(0, config.reviewLimit)
}

async function refreshAccessToken(fetchImpl: FetchLike, config: BusinessProfileConfig) {
  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    refresh_token: config.refreshToken,
    grant_type: "refresh_token",
  })

  const response = await fetchImpl("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body,
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Google OAuth refresh failed with ${response.status}: ${await shortError(response)}`)
  }

  const data = (await response.json()) as { access_token?: string }
  if (!data.access_token) throw new Error("Google OAuth refresh did not return an access token")
  return data.access_token
}

function parseReviewLimit(value: string | undefined) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return 50
  return Math.max(1, Math.min(150, Math.floor(parsed)))
}

function stripResourcePrefix(value: string | undefined, prefix: "accounts" | "locations") {
  const trimmed = value?.trim()
  if (!trimmed) return ""
  return trimmed.replace(new RegExp(`^${prefix}/`), "")
}

async function shortError(response: Response) {
  try {
    return (await response.text()).slice(0, 240)
  } catch {
    return ""
  }
}

export { businessManageScope }
