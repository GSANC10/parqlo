'use client'

import type { Campus, CampusSlug } from '@/lib/campuses'

interface NavigationProps {
  campuses: Campus[]
  currentCampus: CampusSlug
  onCampusChange: (campus: CampusSlug) => void
  onViewMap: () => void
  onSignIn: () => void
}

export default function Navigation({
  campuses,
  currentCampus,
  onCampusChange,
  onViewMap,
  onSignIn
}: NavigationProps) {
  return (
    <nav className="sticky top-0 z-30 bg-white/70 backdrop-blur supports-backdrop-filter:bg-white/60 border-b">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-black"/>
          <span className="font-bold tracking-tight">Parqlo</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <select
            value={currentCampus}
            onChange={(e) => onCampusChange(e.target.value as CampusSlug)}
            className="h-9 rounded-xl border px-3 text-sm shadow-sm"
            title="Choose campus"
          >
            {campuses.map(c => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <button
            onClick={onViewMap}
            className="h-9 rounded-xl border px-3 text-sm shadow-sm hover:bg-slate-50"
          >
            View map
          </button>
          <button
            onClick={onSignIn}
            className="h-9 rounded-xl bg-black px-3 text-sm font-semibold text-white shadow hover:shadow-md"
          >
            Sign in with .edu
          </button>
        </div>
      </div>
    </nav>
  )
}
