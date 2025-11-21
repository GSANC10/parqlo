'use client'

import React, { useState } from 'react'

export type Listing = {
  id: string
  title: string
  lat: number
  lng: number
  pricePerDay: number
  spotType: 'driveway' | 'garage' | 'covered' | 'open'
  availability: 'daily' | 'monthly' | 'event'
  distanceMi: number
  photos?: string[]
  description?: string
}

interface ListingCardProps {
  l: Listing
  onHoverIn?: (id: string) => void
  onHoverOut?: (id: string) => void
  isSelected?: boolean
}

export function ListingCard({
  l,
  onHoverIn,
  onHoverOut,
  isSelected = false,
}: ListingCardProps) {
  const [imagesExpanded, setImagesExpanded] = useState(false)

  return (
    <li
      id={`card-${l.id}`}
      onMouseEnter={() => onHoverIn?.(l.id)}
      onMouseLeave={() => onHoverOut?.(l.id)}
      className={`rounded-2xl border bg-white/70 backdrop-blur-md p-3 transition ${
        isSelected ? 'ring-2 ring-black/10 shadow-md' : 'hover:ring-1 hover:ring-black/5'
      }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold text-[15px]">{l.title}</div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 bg-white/70">
              {l.spotType === 'garage' ? '🏠' : '🚗'} {l.spotType}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 bg-white/70">
              {l.availability === 'daily' ? '📅' : l.availability === 'monthly' ? '📆' : '🎫'} {l.availability}
            </span>
            <span className="text-slate-500">{l.distanceMi.toFixed(1)} mi</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-base font-bold">
            ${l.pricePerDay}<span className="text-xs text-slate-500">/day</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-slate-700 leading-6">
        {l.description ?? 'Close to campus. Easy access. Secure parking spot available.'}
      </p>

      {/* Photos toggle button */}
      <button
        onClick={() => setImagesExpanded(!imagesExpanded)}
        className="mt-2 text-xs text-slate-500 hover:text-slate-700 transition"
      >
        {imagesExpanded ? '▼ Hide photos' : '▶ Show photos'}
      </button>

      {/* Media strip - collapsible */}
      {imagesExpanded && (
        <div className="mt-2 grid grid-cols-3 gap-2">
          {(l.photos && l.photos.length ? l.photos.slice(0, 3) : [null, null, null]).map((src, i) =>
            src ? (
              <img
                key={i}
                src={src}
                loading="lazy"
                alt=""
                className="h-24 w-full rounded-xl object-cover ring-1 ring-black/10"
              />
            ) : (
              <div key={i} className="h-24 w-full rounded-xl bg-slate-100 ring-1 ring-black/10" />
            )
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-3 flex gap-2">
        <button className="h-9 rounded-full border px-4 text-sm bg-white/80 hover:bg-white transition">
          Details
        </button>
        <button className="h-9 rounded-full bg-black px-5 text-sm font-semibold text-white hover:shadow transition">
          Book
        </button>
      </div>
    </li>
  )
}
