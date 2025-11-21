'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthControls } from './AuthControls'

const campuses = [
  { slug: 'ucla', name: 'UCLA' },
  { slug: 'usc', name: 'USC' },
  { slug: 'berkeley', name: 'UC Berkeley' },
  { slug: 'ucsd', name: 'UC San Diego' },
  { slug: 'ucsb', name: 'UCSB' },
  { slug: 'csuf', name: 'CSUF' },
]

type SimpleSearchNavbarProps = {
  selectedCampus?: string | null
  onCampusChange?: (campus: string) => void
}

export function SimpleSearchNavbar({ selectedCampus: externalSelectedCampus, onCampusChange }: SimpleSearchNavbarProps = {}) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCampus, setSelectedCampus] = useState<string | null>(externalSelectedCampus || null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  // Sync with external campus prop
  useEffect(() => {
    if (externalSelectedCampus !== undefined) {
      setSelectedCampus(externalSelectedCampus)
    }
  }, [externalSelectedCampus])

  const filteredCampuses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return campuses
    return campuses.filter(c =>
      c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const handleCampusSelect = (campus: typeof campuses[0]) => {
    setSelectedCampus(campus.slug)
    setSearchQuery(campus.name)
    setShowDropdown(false)

    // Notify parent component if callback provided
    if (onCampusChange) {
      onCampusChange(campus.slug)
    }
  }

  const handleViewMap = () => {
    if (!selectedCampus) {
      alert('Please select a campus first')
      return
    }

    const params = new URLSearchParams()
    if (fromDate) params.set('from', fromDate)
    if (toDate) params.set('to', toDate)

    const url = `/${selectedCampus}${params.toString() ? '?' + params.toString() : ''}`
    router.push(url)
  }

  const displayText = selectedCampus
    ? campuses.find(c => c.slug === selectedCampus)?.name || ''
    : ''

  return (
    <header className="sticky top-0 z-50 bg-white/80 border-b border-slate-200 backdrop-blur">
      <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-black" />
          <span className="text-lg font-semibold">Parqlo</span>
        </div>

        {/* Center: Search and Date Inputs */}
        <div className="flex items-center gap-3 absolute left-1/2 -translate-x-[55%]">
          {/* Search for School */}
          <div className="relative">
            <input
              type="text"
              value={showDropdown ? searchQuery : displayText}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search campus..."
              className="w-80 rounded-xl border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 bg-white"
            />

            {/* Dropdown */}
            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-xl shadow-lg border border-slate-200 z-50 max-h-64 overflow-y-auto">
                  {filteredCampuses.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-slate-500">No campuses found</div>
                  ) : (
                    filteredCampuses.map(campus => (
                      <button
                        key={campus.slug}
                        onClick={() => handleCampusSelect(campus)}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition"
                      >
                        {campus.name}
                      </button>
                    ))
                  )}
                </div>
              </>
            )}
          </div>

          {/* From Date */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 bg-white"
            />
          </div>

          {/* To Date */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              min={fromDate}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 bg-white"
            />
          </div>

          {/* View Map Button */}
          <button
            onClick={handleViewMap}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 transition ml-2"
          >
            View map
          </button>
        </div>

        {/* Right: Auth Controls */}
        <div className="flex items-center gap-3">
          <AuthControls />
        </div>
      </div>
    </header>
  )
}
