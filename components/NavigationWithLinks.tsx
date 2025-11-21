'use client'

import type { Campus, CampusSlug } from '@/lib/campuses'

interface NavigationProps {
  campuses: Campus[]
  currentCampus: CampusSlug
  onCampusChange: (campus: CampusSlug) => void
  onViewMap: () => void
  onSignIn: () => void
}

export default function NavigationWithLinks({
  campuses,
  currentCampus,
  onCampusChange,
  onViewMap,
  onSignIn
}: NavigationProps) {
  return (
    <nav className="sticky top-0 z-30 bg-white/70 backdrop-blur supports-backdrop-filter:bg-white/60 border-b">
      <div className="mx-auto max-w-7xl px-8 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-black"/>
          <span className="font-semibold text-lg">Parqlo</span>
        </div>

        {/* Center: Nav links */}
        <nav className="flex items-center gap-8 text-sm text-slate-600 font-medium">
          <a href="/" className="hover:text-black transition">Home</a>
          <a href="#how-it-works" className="hover:text-black transition">How it works</a>
          <a href="/list" className="hover:text-black transition">List your spot</a>
          <a href="#faq" className="hover:text-black transition">FAQ</a>
        </nav>

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
