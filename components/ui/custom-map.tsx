"use client"

import { useState, useEffect, useRef } from "react"

const Map = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const address = "Hospodárska 53, 91701 Trnava"
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Create the map URL with optimized parameters
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(address + ', Slovakia')}&maptype=satellite&zoom=16`

  return (
    <div
      ref={containerRef}
      style={{
        border: '3px solid #000000',
        padding: '0',
        borderRadius: '8px',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        touchAction: 'none' // Prevent touch scroll blocking
      }}
      className="dark:saturate-0 map-container relative bg-neutral-100 dark:bg-neutral-800"
    >
      {isVisible ? (
        <iframe
          width="100%"
          height="100%"
          style={{
            border: 'none',
            // Prevent scroll-blocking touch events
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
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
          <span className="sr-only">Načítavam mapu...</span>
        </div>
      )}
    </div>
  )
}

export default Map
