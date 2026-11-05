import { NextResponse } from "next/server"

import { siteConfig } from "@/lib/site-config"
import { getReviewsData } from "@/lib/bookio-reviews"

const googleReviewsCacheSeconds = 86400

export const dynamic = "force-dynamic"

export async function GET() {
  const { reviews, sourceLabel } = await getReviewsData()
  return NextResponse.json(
    {
      reviews,
      googleMapsUrl: siteConfig.googleReviewsUrl,
      source: sourceLabel,
    },
    {
      headers: {
        "Cache-Control": `s-maxage=${googleReviewsCacheSeconds}, stale-while-revalidate=604800`,
      },
    },
  )
}
