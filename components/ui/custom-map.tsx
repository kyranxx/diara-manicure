"use client"

const Map = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const address = "Nám. Jozefa Herdu 1, 91701 Trnava"
  // Use satellite view with search query - this shows the location but Google Maps embeds have limitations on custom text
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(address + ', diara manicure')}&maptype=satellite&zoom=16`

  return (
    <div style={{ border: '3px solid #000000', padding: '0', borderRadius: '8px', overflow: 'hidden', width: '100%', height: '100%' }}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        src={mapSrc}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  )
}

export default Map
