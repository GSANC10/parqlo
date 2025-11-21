'use client'

import dynamic from 'next/dynamic'
import type { ParkingSpot } from './CampusParkingMap'

const CampusParkingMap = dynamic(() => import('./CampusParkingMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-56 rounded-2xl bg-slate-200 flex items-center justify-center">
      <div className="text-slate-500 text-sm">Loading map...</div>
    </div>
  )
})

interface HeroMapPreviewProps {
  center: [number, number]
  zoom?: number
  parkingSpots?: ParkingSpot[]
}

export default function HeroMapPreview({ center, zoom = 14, parkingSpots }: HeroMapPreviewProps) {
  return (
    <div className="w-full">
      <CampusParkingMap center={center} zoom={zoom} heightClass="h-56" parkingSpots={parkingSpots} />
    </div>
  )
}
