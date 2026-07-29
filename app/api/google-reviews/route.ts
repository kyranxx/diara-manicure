import { NextResponse } from "next/server"

import { siteConfig } from "@/lib/site-config"
import { verifiedGoogleReviews } from "@/lib/verified-google-reviews"

const googleReviewsCacheSeconds = 86400

export const dynamic = "force-dynamic"

export async function GET() {
  return NextResponse.json(
    {
      reviews: verifiedGoogleReviews,
      googleMapsUrl: siteConfig.googleReviewsUrl,
      source: "Google Maps",
    },
    {
      headers: {
        "Cache-Control": `s-maxage=${googleReviewsCacheSeconds}, stale-while-revalidate=604800`,
      },
    },
  )
}
