'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { campusConfig, CampusKey } from '@/lib/campusConfig'

const campusList = (Object.keys(campusConfig) as CampusKey[]).map(k => ({
  key: k,
  name: campusConfig[k].name
}))

export function AirbnbStyleSearch() {
  const router = useRouter()
  const [focusedField, setFocusedField] = React.useState<'campus' | 'from' | 'to' | null>(null)

  // Search state
  const [campusQuery, setCampusQuery] = React.useState('')
  const [selectedCampus, setSelectedCampus] = React.useState<CampusKey | null>(null)
  const [fromDate, setFromDate] = React.useState('')
  const [toDate, setToDate] = React.useState('')

  // Filtered campuses based on search
  const filteredCampuses = React.useMemo(() => {
    const q = campusQuery.toLowerCase().trim()
    if (!q) return campusList
    return campusList.filter(c =>
      c.name.toLowerCase().includes(q) || c.key.toLowerCase().includes(q)
    )
  }, [campusQuery])

  const handleCampusSelect = (key: CampusKey) => {
    setSelectedCampus(key)
    setCampusQuery(campusConfig[key].name)
    setFocusedField(null)
  }

  const handleSearch = () => {
    if (!selectedCampus) {
      alert('Please select a campus')
      return
    }

    // Navigate to campus page with optional date params
    const params = new URLSearchParams()
    if (fromDate) params.set('from', fromDate)
    if (toDate) params.set('to', toDate)

    const url = `/${selectedCampus}${params.toString() ? '?' + params.toString() : ''}`
    router.push(url)
  }

  const campusDisplay = selectedCampus ? campusConfig[selectedCampus].name : ''

  return (
    <div className="relative">
      {/* Main Search Bar */}
      <div className="flex items-center bg-white rounded-full shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow">

        {/* Campus Field */}
        <div
          className={`flex-1 px-6 py-3 cursor-pointer border-r transition ${
            focusedField === 'campus' ? 'bg-white' : 'hover:bg-slate-50'
          }`}
          onClick={() => setFocusedField('campus')}
        >
          <label className="block text-xs font-semibold mb-0.5">Where</label>
          {focusedField === 'campus' ? (
            <input
              autoFocus
              type="text"
              value={campusQuery}
              onChange={(e) => setCampusQuery(e.target.value)}
              placeholder="Search campuses"
              className="w-full text-sm text-slate-700 placeholder:text-slate-400 outline-none bg-transparent"
            />
          ) : (
            <div className="text-sm text-slate-700">
              {campusDisplay || <span className="text-slate-400">Search campuses</span>}
            </div>
          )}
        </div>

        {/* From Date */}
        <div
          className={`flex-1 px-6 py-3 cursor-pointer border-r transition ${
            focusedField === 'from' ? 'bg-white' : 'hover:bg-slate-50'
          }`}
          onClick={() => setFocusedField('from')}
        >
          <label className="block text-xs font-semibold mb-0.5">Check in</label>
          {focusedField === 'from' ? (
            <input
              autoFocus
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full text-sm text-slate-700 outline-none bg-transparent"
            />
          ) : (
            <div className="text-sm text-slate-700">
              {fromDate ? new Date(fromDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : <span className="text-slate-400">Add date</span>}
            </div>
          )}
        </div>

        {/* To Date */}
        <div
          className={`flex-1 px-6 py-3 cursor-pointer transition ${
            focusedField === 'to' ? 'bg-white' : 'hover:bg-slate-50'
          }`}
          onClick={() => setFocusedField('to')}
        >
          <label className="block text-xs font-semibold mb-0.5">Check out</label>
          {focusedField === 'to' ? (
            <input
              autoFocus
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              min={fromDate}
              className="w-full text-sm text-slate-700 outline-none bg-transparent"
            />
          ) : (
            <div className="text-sm text-slate-700">
              {toDate ? new Date(toDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : <span className="text-slate-400">Add date</span>}
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="px-2 py-2">
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full p-4 hover:from-pink-600 hover:to-rose-600 transition-all hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Campus Dropdown */}
      {focusedField === 'campus' && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setFocusedField(null)}
          />
          <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border z-50 max-h-96 overflow-y-auto">
            <div className="p-3">
              <div className="text-xs font-semibold text-slate-500 mb-2 px-3">AVAILABLE CAMPUSES</div>
              {filteredCampuses.length === 0 ? (
                <div className="px-3 py-6 text-center text-sm text-slate-500">
                  No campuses found
                </div>
              ) : (
                filteredCampuses.map(c => (
                  <button
                    key={c.key}
                    onClick={() => handleCampusSelect(c.key)}
                    className="w-full text-left px-3 py-3 rounded-xl hover:bg-slate-50 transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-medium text-sm">{c.name}</div>
                      <div className="text-xs text-slate-500">{c.key.toUpperCase()}</div>
                    </div>
                    {selectedCampus === c.key && (
                      <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))
              )}
            </div>
            <div className="border-t p-3 bg-slate-50">
              <a
                href="https://forms.gle/your-form-link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-600 hover:text-black transition flex items-center gap-1"
              >
                <span>Don&apos;t see your campus?</span>
                <span className="underline">Request it here →</span>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
