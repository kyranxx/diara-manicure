import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { businessProfileConfigFromEnv, fetchBusinessProfileReviews } from "@/lib/google-business-profile"
import { siteConfig } from "@/lib/site-config"

const googleReviewsCacheSeconds = 3600
const businessProfileReviewsCacheSeconds = Math.min(
  2592000,
  Math.max(300, Number(process.env.GOOGLE_BUSINESS_PROFILE_CACHE_SECONDS) || 21600),
)

export const dynamic = "force-dynamic"

type GoogleLocalizedText = {
  text?: string
}

type GoogleReview = {
  rating?: number
  publishTime?: string
  relativePublishTimeDescription?: string
  text?: GoogleLocalizedText | string
  originalText?: GoogleLocalizedText | string
  googleMapsUri?: string
  authorAttribution?: {
    displayName?: string
    uri?: string
    photoUri?: string
    photoURI?: string
  }
}

function localizedText(value: GoogleLocalizedText | string | undefined) {
  if (!value) return ""
  return typeof value === "string" ? value.trim() : (value.text ?? "").trim()
}

function mapsApiKey() {
  return process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
}

function requestReferer(request: NextRequest) {
  return request.headers.get("referer") || `${siteConfig.baseUrl}/`
}

function logGoogleReviewsError(source: string, error: unknown) {
  console.error("[google-reviews]", source, error)
}

async function findPlaceId(apiKey: string, referer: string) {
  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
      Referer: referer,
    },
    body: JSON.stringify({
      textQuery: `${siteConfig.name} ${siteConfig.addressLine1}, ${siteConfig.city}, Slovakia`,
      languageCode: "sk",
      regionCode: "SK",
      maxResultCount: 1,
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Google Places search failed with ${response.status}: ${errorText.slice(0, 240)}`)
  }

  const data = (await response.json()) as { places?: Array<{ id?: string }> }
  return data.places?.[0]?.id ?? ""
}

async function fetchPlaceDetails(apiKey: string, placeId: string, referer: string) {
  const placeResource = placeId.startsWith("places/") ? placeId : `places/${placeId}`
  const response = await fetch(`https://places.googleapis.com/v1/${placeResource}?languageCode=sk`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "id,displayName,rating,userRatingCount,googleMapsUri,reviews",
      Referer: referer,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Google Places details failed with ${response.status}: ${errorText.slice(0, 240)}`)
  }

  return response.json() as Promise<{
    googleMapsUri?: string
    reviews?: GoogleReview[]
  }>
}

export async function GET(request: NextRequest) {
  const businessProfileConfig = businessProfileConfigFromEnv()
  let businessProfileUnavailable = false

  if (businessProfileConfig) {
    try {
      const reviews = await fetchBusinessProfileReviews(fetch, businessProfileConfig, siteConfig.googleReviewsUrl)

      if (reviews.length) {
        return NextResponse.json(
          {
            reviews,
            googleMapsUrl: siteConfig.googleReviewsUrl,
            source: "Google Business Profile",
          },
          {
            headers: {
              "Cache-Control": `s-maxage=${businessProfileReviewsCacheSeconds}, stale-while-revalidate=86400`,
            },
          },
        )
      }
    } catch (error) {
      businessProfileUnavailable = true
      logGoogleReviewsError("business-profile", error)
    }
  }

  const apiKey = mapsApiKey()
  const referer = requestReferer(request)

  if (!apiKey) {
    return NextResponse.json({
      reviews: [],
      error: businessProfileUnavailable ? "google_business_profile_unavailable" : "google_reviews_unavailable",
    })
  }

  try {
    const configuredPlaceId = process.env.GOOGLE_PLACE_ID || ""
    const placeId = configuredPlaceId || (await findPlaceId(apiKey, referer))

    if (!placeId) {
      return NextResponse.json({ reviews: [], error: "google_place_not_found" }, { status: 404 })
    }

    const place = await fetchPlaceDetails(apiKey, placeId, referer)
    const reviews = (place.reviews ?? [])
      .map((review) => {
        const text = localizedText(review.text) || localizedText(review.originalText)
        const authorAttribution = review.authorAttribution ?? {}

        return {
          author: authorAttribution.displayName || "Google recenzia",
          authorUri: authorAttribution.uri || "",
          authorPhotoUri: authorAttribution.photoUri || authorAttribution.photoURI || "",
          rating: Math.max(0, Math.min(5, Number(review.rating) || 0)),
          text,
          publishTime: review.publishTime || "",
          relativeTime: review.relativePublishTimeDescription || "",
          googleMapsUri: review.googleMapsUri || place.googleMapsUri || siteConfig.googleReviewsUrl,
        }
      })
      .filter((review) => review.text && review.rating >= 4)

    return NextResponse.json(
      {
        reviews,
        googleMapsUrl: place.googleMapsUri || siteConfig.googleReviewsUrl,
        source: "Google Maps",
      },
      {
        headers: {
          "Cache-Control": `s-maxage=${googleReviewsCacheSeconds}, stale-while-revalidate=86400`,
        },
      },
    )
  } catch (error) {
    logGoogleReviewsError("places", error)

    return NextResponse.json(
      {
        reviews: [],
        error: "google_reviews_unavailable",
      },
    )
  }
}
