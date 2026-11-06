import { siteConfig } from "@/lib/site-config"
import { verifiedGoogleReviews, type PublicGoogleReview } from "@/lib/verified-google-reviews"

type BookioRating = { name?: string; average?: number; note?: string | null }
type BookioRatingsPage = { data?: { ratings?: BookioRating[]; total?: number } }

export type ReviewsData = {
  reviews: PublicGoogleReview[]
  sourceLabel: string
}

// Public endpoint behind the Bookio booking widget; 10 ratings per page.
const ratingsUrl = (offset: number) =>
  `https://services.bookio.com/widget/api/ratings?f=diaramanicure&o=${offset}&lang=sk`

async function fetchRatingsPage(offset: number): Promise<BookioRatingsPage> {
  const response = await fetch(ratingsUrl(offset), { headers: { "User-Agent": "diaramanicure.sk" } })
  if (!response.ok) throw new Error(`Bookio ratings request failed with status ${response.status}`)
  return response.json()
}

async function fetchBookioRatings() {
  const first = await fetchRatingsPage(0)
  const total = first.data?.total || 0
  const offsets = []
  for (let offset = 10; offset < total; offset += 10) offsets.push(offset)
  const rest = await Promise.all(offsets.map(fetchRatingsPage))
  const ratings = [first, ...rest].flatMap((page) => page.data?.ratings || [])
  return { ratings, total }
}

// The homepage regenerates every 30 s for the price list; Bookio ratings change rarely.
const cacheMs = 60 * 60 * 1000
let cached: { at: number; data: ReviewsData } | null = null

export async function getReviewsData(): Promise<ReviewsData> {
  if (cached && Date.now() - cached.at < cacheMs) return cached.data
  try {
    const { ratings, total } = await fetchBookioRatings()
    const bookioReviews = ratings
      .filter((rating) => (rating.note || "").trim().length >= 20 && Number(rating.average) >= 4)
      .map((rating) => ({
        author: `${(rating.name || "Klientka").trim()} · Bookio`,
        authorUri: "",
        authorPhotoUri: "",
        rating: Math.round(Number(rating.average)),
        // Bookio sends emoji as hex entities, e.g. "&#x1f60a;".
        text: (rating.note || "").trim().replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16))),
        publishTime: "",
        relativeTime: "",
        googleMapsUri: siteConfig.bookingUrl,
      }))
    const average = ratings.reduce((sum, rating) => sum + Number(rating.average || 0), 0) / ratings.length
    const data = {
      reviews: [...verifiedGoogleReviews, ...bookioReviews],
      sourceLabel: `Google Maps · Bookio ★ ${average.toFixed(1).replace(".", ",")} (${total})`,
    }
    cached = { at: Date.now(), data }
    return data
  } catch (error) {
    console.error(error)
    return { reviews: verifiedGoogleReviews, sourceLabel: "Google Maps" }
  }
}
