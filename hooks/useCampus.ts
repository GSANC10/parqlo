'use client'

import * as React from 'react'
import { campusConfig, CampusKey, distanceKm } from '@/lib/campusConfig'

const DEFAULT_CAMPUS: CampusKey = 'ucla'
const STORAGE_KEY = 'parqlo:selectedCampus'
const DETECTION_RADIUS_KM = 25 // adjust to 30-40 if you prefer

export function useCampus() {
  const [campus, setCampus] = React.useState<CampusKey>(DEFAULT_CAMPUS)
  const [detected, setDetected] = React.useState<CampusKey | null>(null)
  const [loading, setLoading] = React.useState(true)

  // manual setter persists choice
  const chooseCampus = React.useCallback((key: CampusKey) => {
    setCampus(key)
    localStorage.setItem(STORAGE_KEY, key)
  }, [])

  React.useEffect(() => {
    // 1) If user has a saved choice, use it and stop.
    const saved = localStorage.getItem(STORAGE_KEY) as CampusKey | null
    if (saved && campusConfig[saved]) {
      setCampus(saved)
      setLoading(false)
      return
    }

    // 2) Try geolocation
    if (!navigator.geolocation) {
      setCampus(DEFAULT_CAMPUS)
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const user: [number, number] = [pos.coords.longitude, pos.coords.latitude]

        // find nearest campus
        let best: { key: CampusKey; km: number } | null = null
        ;(Object.keys(campusConfig) as CampusKey[]).forEach(key => {
          const km = distanceKm(user, campusConfig[key].center)
          if (!best || km < best.km) best = { key, km }
        })

        if (best && best.km <= DETECTION_RADIUS_KM) {
          setCampus(best.key)
          setDetected(best.key)
        } else {
          setCampus(DEFAULT_CAMPUS)
        }
        setLoading(false)
      },
      _err => {
        setCampus(DEFAULT_CAMPUS)
        setLoading(false)
      },
      { enableHighAccuracy: true, maximumAge: 60_000, timeout: 8_000 }
    )
  }, [])

  return { campus, setCampus: chooseCampus, detected, loading }
}
