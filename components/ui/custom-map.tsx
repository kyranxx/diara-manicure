"use client"

const Map = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const placeId = "ChIJ4QlldRZfa0cRJniFYeWSC1M"
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${placeId}&maptype=satellite&zoom=15`

  return (
    <iframe
      width="100%"
      height="100%"
      style={{ border: 0 }}
      src={mapSrc}
      allowFullScreen
      loading="lazy"
    ></iframe>
  )
}

export default Map
