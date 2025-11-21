'use client'

import { Check } from './icons'
import HeroMapPreview from './HeroMapPreview'
import type { Campus } from '@/lib/campuses'

interface HeroProps {
  campus: Campus
  onExploreCampus: () => void
  onListSpot: () => void
}

export default function Hero({ campus, onExploreCampus, onListSpot }: HeroProps) {
  return (
    <header className="relative">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-[-120px] -z-10 blur-3xl" aria-hidden="true">
          <div className="mx-auto aspect-1100/678 w-6xl bg-linear-to-tr from-indigo-200 via-sky-200 to-teal-200 opacity-60" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Student-to-student parking —
            <span className="block">near your campus, on your terms.</span>
          </h1>
          <p className="mt-4 text-slate-600 text-lg max-w-xl">
            Find affordable spots from fellow students, or earn extra cash renting your unused apartment parking. Verified .edu. Secure payments. Zero hassle.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button onClick={onExploreCampus} className="h-11 rounded-2xl bg-black px-5 text-sm font-semibold text-white shadow hover:shadow-md">
              Explore {campus.name}
            </button>
            <button onClick={onListSpot} className="h-11 rounded-2xl border px-5 text-sm font-semibold hover:bg-slate-50">
              List your spot
            </button>
            <div className="text-xs text-slate-500">No listing fees • Cancel anytime</div>
          </div>
          <div className="mt-6 flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2"><Check className="h-4 w-4"/> .edu verification</div>
            <div className="flex items-center gap-2"><Check className="h-4 w-4"/> Secure payouts</div>
            <div className="flex items-center gap-2"><Check className="h-4 w-4"/> Fair pricing suggestions</div>
          </div>
        </div>
        {/* Visual card */}
        <div className="relative">
          <div className="mx-auto max-w-lg rounded-3xl border bg-white p-4 shadow-xl">
            <HeroMapPreview center={campus.center} zoom={campus.zoom} parkingSpots={campus.parkingSpots} />
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-xl border p-2">
                <div className="font-semibold">$9/day</div>
                <div className="text-slate-500">Kelton Garage</div>
              </div>
              <div className="rounded-xl border p-2">
                <div className="font-semibold">$7/day</div>
                <div className="text-slate-500">Veteran Ave</div>
              </div>
              <div className="rounded-xl border p-2">
                <div className="font-semibold">$11/day</div>
                <div className="text-slate-500">Midvale Covered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
