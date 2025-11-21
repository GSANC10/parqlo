'use client'

import type { Campus, CampusSlug } from '@/lib/campuses'

interface NavigationProps {
  campuses: Campus[]
  currentCampus: CampusSlug
  onCampusChange: (campus: CampusSlug) => void
  onViewMap: () => void
  onSignIn: () => void
}

export default function NavigationWithContext({
  campuses,
  currentCampus,
  onCampusChange,
  onViewMap,
  onSignIn
}: NavigationProps) {
  const currentCampusName = campuses.find(c => c.slug === currentCampus)?.name || 'UCLA'

  return (
    <nav className="sticky top-0 z-30 bg-white/70 backdrop-blur supports-backdrop-filter:bg-white/60 border-b">
      <div className="mx-auto max-w-7xl px-8 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-black"/>
          <span className="font-semibold text-lg">Parqlo</span>
        </div>

        {/* Center: Context Bar */}
        <div className="text-slate-600 text-sm">
          Find student parking near <span className="font-semibold text-black">{currentCampusName}</span>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          <select
            value={currentCampus}
            onChange={(e) => onCampusChange(e.target.value as CampusSlug)}
            className="rounded-full border px-3 py-1.5 text-sm hover:bg-slate-50 transition"
            title="Choose campus"
          >
            {campuses.map(c => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <button
            onClick={onViewMap}
            className="border px-4 py-1.5 rounded-full text-sm hover:bg-slate-100 transition"
          >
            View map
          </button>
          <button
            onClick={onSignIn}
            className="bg-black text-white px-4 py-1.5 rounded-full text-sm hover:bg-slate-800 transition"
          >
            Sign in with .edu
          </button>
        </div>
      </div>
    </nav>
  )
}
