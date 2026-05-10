import assert from "node:assert/strict"
import { test } from "node:test"

import {
  businessProfileConfigFromEnv,
  fetchBusinessProfileReviews,
  normalizeBusinessProfileReview,
  starRatingValue,
} from "../lib/google-business-profile.ts"

test("maps Business Profile star ratings to numbers", () => {
  assert.equal(starRatingValue("FIVE"), 5)
  assert.equal(starRatingValue("FOUR"), 4)
  assert.equal(starRatingValue("STAR_RATING_UNSPECIFIED"), 0)
})

test("normalizes a Business Profile review for the public marquee", () => {
  const review = normalizeBusinessProfileReview(
    {
      reviewId: "abc123",
      reviewer: {
        displayName: "Anna",
        profilePhotoUrl: "https://example.com/avatar.jpg",
      },
      starRating: "FIVE",
      comment: "Perfektna praca.",
      createTime: "2026-05-01T12:00:00Z",
      updateTime: "2026-05-02T12:00:00Z",
    },
    "https://maps.example/reviews",
  )

  assert.deepEqual(review, {
    id: "abc123",
    author: "Anna",
    authorUri: "",
    authorPhotoUri: "https://example.com/avatar.jpg",
    rating: 5,
    text: "Perfektna praca.",
    publishTime: "2026-05-01T12:00:00Z",
    relativeTime: "",
    googleMapsUri: "https://maps.example/reviews",
  })
})

test("reads Business Profile config only when all required env vars exist", () => {
  assert.equal(businessProfileConfigFromEnv({}), null)

  assert.deepEqual(
    businessProfileConfigFromEnv({
      GOOGLE_BUSINESS_PROFILE_CLIENT_ID: "client",
      GOOGLE_BUSINESS_PROFILE_CLIENT_SECRET: "secret",
      GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN: "refresh",
      GOOGLE_BUSINESS_PROFILE_ACCOUNT_ID: "accounts/123",
      GOOGLE_BUSINESS_PROFILE_LOCATION_ID: "locations/456",
      GOOGLE_BUSINESS_PROFILE_REVIEW_LIMIT: "75",
    }),
    {
      clientId: "client",
      clientSecret: "secret",
      refreshToken: "refresh",
      accountId: "123",
      locationId: "456",
      reviewLimit: 75,
    },
  )
})

test("fetches paginated Business Profile reviews up to the configured limit", async () => {
  const calls = []
  const fetchImpl = async (url, init) => {
    calls.push({ url: String(url), init })

    if (String(url) === "https://oauth2.googleapis.com/token") {
      return jsonResponse({ access_token: "access-token" })
    }

    if (String(url).includes("pageToken=next")) {
      return jsonResponse({
        reviews: [
          {
            reviewId: "two",
            reviewer: { displayName: "Bea" },
            starRating: "FOUR",
            comment: "Super.",
            createTime: "2026-05-03T12:00:00Z",
            updateTime: "2026-05-04T12:00:00Z",
          },
        ],
      })
    }

    return jsonResponse({
      reviews: [
        {
          reviewId: "one",
          reviewer: { displayName: "Anna" },
          starRating: "FIVE",
          comment: "Vyborne.",
          createTime: "2026-05-01T12:00:00Z",
          updateTime: "2026-05-02T12:00:00Z",
        },
      ],
      nextPageToken: "next",
    })
  }

  const reviews = await fetchBusinessProfileReviews(fetchImpl, {
    clientId: "client",
    clientSecret: "secret",
    refreshToken: "refresh",
    accountId: "123",
    locationId: "456",
    reviewLimit: 2,
  })

  assert.equal(reviews.length, 2)
  assert.equal(reviews[0].author, "Anna")
  assert.equal(reviews[1].author, "Bea")
  assert.match(calls[1].url, /accounts\/123\/locations\/456\/reviews/)
  assert.match(calls[2].url, /pageToken=next/)
})

function jsonResponse(body, ok = true) {
  return {
    ok,
    status: ok ? 200 : 500,
    json: async () => body,
    text: async () => JSON.stringify(body),
  }
}
