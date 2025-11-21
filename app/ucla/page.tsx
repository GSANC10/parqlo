'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import mapboxgl, { Map, Marker } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { ListingCard } from '@/components/ListingCard'
import type { Listing as ListingType } from '@/components/ListingCard'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

// Style tokens
const glass = "backdrop-blur-xl bg-white/60 ring-1 ring-black/10 shadow-[0_10px_30px_rgba(0,0,0,.06)]"
const card = "rounded-2xl border bg-white/70 backdrop-blur-md"
const pill = "h-8 rounded-full border px-3 text-sm bg-white/80 shadow-sm hover:bg-white transition"

// Types
type Listing = ListingType

const UCLA_CENTER: [number, number] = [-118.4426, 34.0723]

export default function ExploreUCLAPage() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<Map | null>(null)
  const [listings, setListings] = useState<Listing[]>([])
  const [query, setQuery] = useState('')
  const [maxPrice, setMaxPrice] = useState(25)
  const [availability, setAvailability] = useState<'all' | Listing['availability']>('all')
  const [spotType, setSpotType] = useState<'all' | Listing['spotType']>('all')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [addressInput, setAddressInput] = useState('')
  const [radiusMeters, setRadiusMeters] = useState(800)
  const [sortBy, setSortBy] = useState<'distance' | 'price'>('distance')

  // Date selection
  const todayIso = new Date().toISOString().slice(0, 10)
  const [dateMode, setDateMode] = useState<'single' | 'range'>('single')
  const [fromDate, setFromDate] = useState<string>(todayIso)
  const [toDate, setToDate] = useState<string>(todayIso)

  // fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      const res = await fetch('/api/listings?campus=ucla')
      const data = await res.json()
      setListings(data.listings)
    }
    fetchListings()
  }, [])

  // Helper: haversine distance in meters
  const haversine = ([lng1, lat1]: [number, number], [lng2, lat2]: [number, number]) => {
    const toRad = (d: number) => d * Math.PI / 180
    const R = 6371e3
    const φ1 = toRad(lat1), φ2 = toRad(lat2)
    const Δφ = toRad(lat2 - lat1), Δλ = toRad(lng2 - lng1)
    const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  }

  // Helper: get all days between two dates
  const daysBetween = (from: string, to: string) => {
    const out: string[] = []
    const d = new Date(from)
    const end = new Date(to)
    while (d <= end) {
      out.push(d.toISOString().slice(0, 10))
      d.setDate(d.getDate() + 1)
    }
    return out
  }

  // Get wanted dates based on mode
  const wantedDates = dateMode === 'single' ? [fromDate] : fromDate && toDate ? daysBetween(fromDate, toDate) : []

  const filtered = useMemo(() => {
    let base = listings.filter(l =>
      l.pricePerDay <= maxPrice &&
      (availability === 'all' || l.availability === availability) &&
      (spotType === 'all' || l.spotType === spotType) &&
      (query.trim().length === 0 || l.title.toLowerCase().includes(query.toLowerCase()))
    )
    // Sort
    if (sortBy === 'price') {
      base.sort((a, b) => a.pricePerDay - b.pricePerDay)
    } else {
      base.sort((a, b) => a.distanceMi - b.distanceMi)
    }
    return base
  }, [listings, maxPrice, availability, spotType, query, sortBy])

  // Helper to emphasize markers
  const emphasizeMarker = (id: string, on: boolean) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = mapRef.current as any
    const entry = map?._markerIndex?.[id]
    if (!entry) return
    const pin = entry.el.firstChild as HTMLElement
    if (!pin) return

    if (on) {
      pin.className = 'px-2 py-1 rounded-xl text-xs font-semibold bg-black text-white ring-1 ring-black/10 shadow transition-transform scale-[1.06]'
    } else {
      pin.className = 'px-2 py-1 rounded-xl text-xs font-semibold bg-white text-black ring-1 ring-black/10 shadow transition-transform'
    }

    const popup = entry.marker.getPopup()
    if (!popup) return

    if (on) {
      popup.addTo(map)
    } else {
      popup.remove()
    }
  }

  // Sync hover: scroll card into view when marker is hovered
  useEffect(() => {
    if (hoveredId) {
      const el = document.getElementById(`card-${hoveredId}`)
      el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [hoveredId])

  // Fit bounds to results
  useEffect(() => {
    const map = mapRef.current
    if (!map || filtered.length === 0) return

    const bounds = new mapboxgl.LngLatBounds()
    filtered.forEach(l => bounds.extend([l.lng, l.lat]))

    setTimeout(() => {
      map.fitBounds(bounds, {
        padding: { top: 80, right: 380, bottom: 40, left: 32 },
        maxZoom: 16,
        duration: 450
      })
    }, 100)
  }, [filtered])

  // init map
  useEffect(() => {
    if (!containerRef.current) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (mapRef.current && !(mapRef.current as any)._removed) return

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE || process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL || 'mapbox://styles/mapbox/streets-v12',
      center: UCLA_CENTER,
      zoom: 14,
      attributionControl: true,
      cooperativeGestures: true,
    })

    map.on('load', () => {
      map.resize()
    })

    // Add controls to bottom-right
    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'bottom-right')
    map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right')
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
      }),
      'bottom-right'
    )

    // Initialize marker index
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(map as any)._markerIndex = {}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(map as any)._listingMarkers = []

    mapRef.current = map

    return () => map.remove()
  }, [])

  // markers: clear + redraw when filtered changes
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    // Clear existing markers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(map as any)._listingMarkers?.forEach((m: Marker) => m.remove())
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(map as any)._listingMarkers = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(map as any)._markerIndex = {}

    filtered.forEach((l) => {
      const el = document.createElement('div')
      el.className = 'group'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(el as any).dataset.id = l.id

      const pin = document.createElement('div')
      pin.className = 'px-2 py-1 rounded-xl text-xs font-semibold bg-white text-black ring-1 ring-black/10 shadow transition-transform'
      pin.textContent = `$${l.pricePerDay}`
      el.appendChild(pin)

      // Marker hover events
      el.addEventListener('mouseenter', () => setHoveredId(l.id))
      el.addEventListener('mouseleave', () => setHoveredId((prev) => (prev === l.id ? null : prev)))

      const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([l.lng, l.lat])
        .addTo(map)

      const popupHtml = `
        <div style="font-family: ui-sans-serif, system-ui; min-width: 220px">
          <div style="font-weight:700; font-size:14px; margin-bottom:4px">${l.title}</div>
          <div style="font-size:12px; opacity:.8; margin-bottom:6px">${l.spotType} • ${l.availability} • ${l.distanceMi.toFixed(1)} mi</div>
          <div style="display:flex; justify-content:space-between; align-items:center">
            <div style="font-weight:700">$${l.pricePerDay}/day</div>
            <button style="padding:6px 10px; border-radius:10px; background:#111; color:#fff; font-size:12px; font-weight:600">Book</button>
          </div>
        </div>`
      marker.setPopup(new mapboxgl.Popup({ offset: 12 }).setHTML(popupHtml))

      // Store in marker index
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(map as any)._markerIndex[l.id] = { marker, el }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(map as any)._listingMarkers.push(marker)
    })
  }, [filtered])

  const useMyLocation = () => {
    navigator.geolocation?.getCurrentPosition(pos => {
      mapRef.current?.flyTo({
        center: [pos.coords.longitude, pos.coords.latitude],
        zoom: 15,
        duration: 600
      })
    })
  }

  return (
    <div className="min-h-screen">
      {/* Compact Header */}
      <header className="fixed top-0 z-50 w-full h-12 border-b bg-white/70 backdrop-blur">
        <div className="h-full grid grid-cols-[140px_1fr_140px] items-center px-3 gap-3">
          <Link href="/" className="font-semibold">Parqlo</Link>

          {/* Center controls */}
          <div className="flex items-center gap-2 justify-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search listings (Kelton, garage...)"
              className="h-8 w-[420px] rounded-full border px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
            />
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value as typeof availability)}
              className={pill}
            >
              <option value="all">All availability</option>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="event">Event</option>
            </select>
            <select
              value={spotType}
              onChange={(e) => setSpotType(e.target.value as typeof spotType)}
              className={pill}
            >
              <option value="all">All types</option>
              <option value="driveway">Driveway</option>
              <option value="garage">Garage</option>
              <option value="covered">Covered</option>
              <option value="open">Open</option>
            </select>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-600">Max</span>
              <input
                type="range"
                min={5}
                max={25}
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-24 accent-black"
              />
              <span className="font-medium">${maxPrice}</span>
            </div>
          </div>

          <button className={pill}>.edu Sign in</button>
        </div>
      </header>

      <main className="fixed inset-x-0 top-12 bottom-0">
        {/* Full-screen Map */}
        <div ref={containerRef} className="h-full w-full" />

        {/* Left Search Area Card */}
        <div className={`fixed left-4 top-20 z-40 rounded-2xl ${glass} w-[260px] p-3`}>
            <div className="relative mb-3">
              <input
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                placeholder="Enter address…"
                className="w-full rounded-xl border px-3 py-2 text-sm pr-9 focus:outline-none focus:ring-2 focus:ring-black/10"
              />
              <button
                onClick={useMyLocation}
                className="absolute right-2 top-1/2 -translate-y-1/2 hover:scale-110 transition"
                title="Use my location"
              >
                📍
              </button>
            </div>
            <label className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Radius</span>
              <span>{Math.round(radiusMeters)} m</span>
            </label>
            <input
              type="range"
              min={200}
              max={1600}
              step={50}
              value={radiusMeters}
              onChange={(e) => setRadiusMeters(parseInt(e.target.value))}
              className="w-full accent-black mb-2"
            />
            <div className="grid grid-cols-2 gap-2">
              <select
                value={spotType}
                onChange={(e) => setSpotType(e.target.value as typeof spotType)}
                className="rounded-xl border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              >
                <option value="all">Type</option>
                <option value="garage">Garage</option>
                <option value="driveway">Driveway</option>
                <option value="covered">Covered</option>
                <option value="open">Open</option>
              </select>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value as typeof availability)}
                className="rounded-xl border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              >
                <option value="all">Duration</option>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="event">Event</option>
              </select>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              {filtered.length} spots within {Math.round(radiusMeters/1609*10)/10} mi
            </div>

            {/* Dates */}
            <div className="mt-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Dates</span>
                <div className="inline-flex rounded-full border bg-white/80 p-0.5 text-xs">
                  <button
                    onClick={() => {
                      setDateMode('single')
                      setToDate(fromDate)
                    }}
                    className={`px-2 py-1 rounded-full transition ${
                      dateMode === 'single' ? 'bg-black text-white' : 'hover:bg-slate-50'
                    }`}
                  >
                    Single
                  </button>
                  <button
                    onClick={() => setDateMode('range')}
                    className={`px-2 py-1 rounded-full transition ${
                      dateMode === 'range' ? 'bg-black text-white' : 'hover:bg-slate-50'
                    }`}
                  >
                    Range
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <label className="text-xs text-slate-600">
                  From
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => {
                      const v = e.target.value
                      setFromDate(v)
                      if (dateMode === 'single' || new Date(v) > new Date(toDate)) setToDate(v)
                    }}
                    className="mt-1 w-full rounded-xl border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                  />
                </label>

                <label className="text-xs text-slate-600">
                  To
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="mt-1 w-full rounded-xl border px-2 py-1 text-sm disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-black/10"
                    disabled={dateMode === 'single'}
                    min={fromDate}
                  />
                </label>
              </div>

              {/* Quick chips */}
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => {
                    const d = todayIso
                    setFromDate(d)
                    setToDate(d)
                    setDateMode('single')
                  }}
                  className="rounded-full border px-2 py-1 bg-white/80 hover:bg-white transition"
                >
                  Today
                </button>
                <button
                  onClick={() => {
                    const d = new Date()
                    d.setDate(d.getDate() + 1)
                    const iso = d.toISOString().slice(0, 10)
                    setFromDate(iso)
                    setToDate(iso)
                    setDateMode('single')
                  }}
                  className="rounded-full border px-2 py-1 bg-white/80 hover:bg-white transition"
                >
                  Tomorrow
                </button>
                <button
                  onClick={() => {
                    const now = new Date()
                    const day = now.getDay()
                    const friOffset = (5 - day + 7) % 7
                    const fri = new Date(now)
                    fri.setDate(now.getDate() + friOffset)
                    const sun = new Date(fri)
                    sun.setDate(fri.getDate() + 2)
                    setFromDate(fri.toISOString().slice(0, 10))
                    setToDate(sun.toISOString().slice(0, 10))
                    setDateMode('range')
                  }}
                  className="rounded-full border px-2 py-1 bg-white/80 hover:bg-white transition"
                >
                  Weekend
                </button>
              </div>
            </div>
        </div>

        {/* Right Listings Sheet - Always Visible */}
        <aside className="fixed right-4 top-16 w-[340px] rounded-2xl bg-white/65 backdrop-blur-xl ring-1 ring-black/10 shadow-lg">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-3 py-2 bg-white/70 backdrop-blur-xl border-b rounded-t-2xl">
            <span className="text-xs text-slate-600">
              {filtered.length} spots near UCLA
              {dateMode === 'range' && fromDate !== toDate && (
                <> • {new Date(fromDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}–{new Date(toDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</>
              )}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="h-7 rounded-full border px-3 text-xs bg-white/70 focus:outline-none focus:ring-2 focus:ring-black/10"
            >
              <option value="distance">Distance</option>
              <option value="price">Price</option>
            </select>
          </div>

          {/* Listings - Shows ~3 cards */}
          <div className="overflow-y-auto max-h-[680px] p-3 pb-4">
            {filtered.length === 0 ? (
              <div className="rounded-xl border bg-white/70 p-4 text-sm text-slate-600">
                No spots match these filters. Try expanding your search radius or adjusting filters.
              </div>
            ) : (
              <ul className="space-y-3">
                {filtered.map(l => (
                  <ListingCard
                    key={l.id}
                    l={l}
                    onHoverIn={(id) => {
                      setHoveredId(id)
                      emphasizeMarker(id, true)
                    }}
                    onHoverOut={(id) => {
                      setHoveredId(null)
                      emphasizeMarker(id, false)
                    }}
                    isSelected={hoveredId === l.id || selectedId === l.id}
                  />
                ))}
              </ul>
            )}
          </div>
        </aside>
      </main>
    </div>
  )
}
