"use client"

const Map = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const address = "Hospodárska 53, 91701 Trnava"

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(address + ', Slovakia')}&maptype=satellite&zoom=16`

  return (
    <div
      style={{
        border: '3px solid #000000',
        padding: '0',
        borderRadius: '8px',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        touchAction: 'none'
      }}
      className="dark:saturate-0 map-container relative bg-neutral-100 dark:bg-neutral-800"
    >
      <iframe
        width="100%"
        height="100%"
        style={{
          border: 'none',
          touchAction: 'pan-x pan-y',
          overscrollBehavior: 'contain'
        }}
        src={mapSrc}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-same-origin allow-presentation"
        title="Mapa umiestnenia Diara Manicure, Hospodárska 53, Trnava"
      ></iframe>
    </div>
  )
}

export default Map
