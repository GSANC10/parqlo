'use client'

import { useEffect, useRef } from 'react'
import mapboxgl, { Map } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

export interface ParkingSpot {
  id: string
  coordinates: [number, number] // [lng, lat]
  name: string
  price: string
}

interface CampusParkingMapProps {
  center: [number, number]
  zoom?: number
  styleUrl?: string
  heightClass?: string
  parkingSpots?: ParkingSpot[]
}

export default function CampusParkingMap({
  center,
  zoom = 8,
  styleUrl = process.env.NEXT_PUBLIC_MAPBOX_STYLE || process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL || 'mapbox://styles/mapbox/streets-v12',
  heightClass = 'h-56',
  parkingSpots = [],
}: CampusParkingMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  // Initialize map once
  useEffect(() => {
    // Skip if no container or if map already exists and is not removed
    if (!containerRef.current) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (mapRef.current && !(mapRef.current as any)._removed) return

    // Check if token is available
    if (!mapboxgl.accessToken) {
      console.error('Mapbox token is missing! Set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local')
      return
    }

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: styleUrl,
      center,
      zoom,
      attributionControl: true,
      interactive: false, // Disable all map interactions
    })

    map.on('error', (e) => {
      console.error('Map error:', e)
    })

    mapRef.current = map

    return () => {
      // Clean up markers
      markersRef.current.forEach(marker => marker.remove())
      markersRef.current = []
      map.remove()
    }
  }, [center, zoom, styleUrl])

  // Add parking spot markers
  useEffect(() => {
    const map = mapRef.current
    if (!map || parkingSpots.length === 0) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Add new markers
    parkingSpots.forEach(spot => {
      // Create custom marker element
      const el = document.createElement('div')
      el.className = 'parking-marker'
      el.style.cssText = `
        background-color: #000;
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        white-space: nowrap;
      `
      el.textContent = spot.price

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 4px;">
          <div style="font-weight: 600; font-size: 13px;">${spot.name}</div>
          <div style="color: #64748b; font-size: 12px; margin-top: 2px;">${spot.price}/day</div>
        </div>
      `)

      // Add marker to map
      const marker = new mapboxgl.Marker(el)
        .setLngLat(spot.coordinates)
        .setPopup(popup)
        .addTo(map)

      markersRef.current.push(marker)
    })

    return () => {
      markersRef.current.forEach(marker => marker.remove())
      markersRef.current = []
    }
  }, [parkingSpots])

  // Update center/zoom when props change
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    map.easeTo({ center, zoom, duration: 600 })
  }, [center, zoom])

  return (
    <div
      ref={containerRef}
      className={`w-full ${heightClass} rounded-2xl overflow-hidden bg-slate-100`}
      style={{ minHeight: '224px' }}
    />
  )
}
