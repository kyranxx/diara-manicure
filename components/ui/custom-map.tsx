"use client"

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { useMemo } from "react"

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  const center = useMemo(() => ({ lat: 48.378, lng: 17.585 }), [])

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMap zoom={15} center={center} mapContainerClassName="w-full h-full">
      <Marker position={center} />
    </GoogleMap>
  )
}

export default Map
