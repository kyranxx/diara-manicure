import { NextResponse } from "next/server"

import { siteConfig } from "@/lib/site-config"
import { verifiedGoogleReviews, type PublicGoogleReview } from "@/lib/verified-google-reviews"

const googleReviewsCacheSeconds = 3600

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
  return process.env.GOOGLE_MAPS_API_KEY || ""
}

function placesApiHeaders(apiKey: string, fieldMask: string) {
  return {
    "X-Goog-Api-Key": apiKey,
    "X-Goog-FieldMask": fieldMask,
  }
}

function logGoogleReviewsError(source: string, error: unknown) {
  console.error("[google-reviews]", source, error)
}

function mergeReviews(liveReviews: PublicGoogleReview[]) {
  const seen = new Set<string>()

  return [...liveReviews, ...verifiedGoogleReviews].filter((review) => {
    const key = `${review.author}|${review.text.slice(0, 120)}`.toLocaleLowerCase("sk")
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

async function findPlaceId(apiKey: string) {
  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...placesApiHeaders(apiKey, "places.id,places.displayName,places.formattedAddress"),
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

async function fetchPlaceDetails(apiKey: string, placeId: string) {
  const placeResource = placeId.startsWith("places/") ? placeId : `places/${placeId}`
  const response = await fetch(`https://places.googleapis.com/v1/${placeResource}?languageCode=sk`, {
    headers: placesApiHeaders(apiKey, "id,displayName,rating,userRatingCount,googleMapsUri,reviews"),
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

export async function GET() {
  const apiKey = mapsApiKey()

  if (!apiKey) {
    return NextResponse.json({
      reviews: verifiedGoogleReviews,
      googleMapsUrl: siteConfig.googleReviewsUrl,
      source: "Google Maps",
    })
  }

  try {
    const configuredPlaceId = process.env.GOOGLE_PLACE_ID || "ChIJ4QlldRZfa0cRJniFYeWSC1M"
    const placeId = configuredPlaceId || (await findPlaceId(apiKey))

    if (!placeId) {
      return NextResponse.json({ reviews: [], error: "google_place_not_found" }, { status: 404 })
    }

    const place = await fetchPlaceDetails(apiKey, placeId)
    const liveReviews = (place.reviews ?? [])
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
    const reviews = mergeReviews(liveReviews)

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
        reviews: verifiedGoogleReviews,
        googleMapsUrl: siteConfig.googleReviewsUrl,
        source: "Google Maps",
      },
    )
  }
}
