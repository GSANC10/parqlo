'use client'

import { AirbnbStyleSearch } from './AirbnbStyleSearch'

export function AirbnbStyleHero() {
  return (
    <div className="relative min-h-[500px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-16">
        {/* Hero Text */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Find parking near campus
          </h1>
          <p className="text-xl text-slate-300">
            Book verified student parking spots. Save money and skip the stress.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto">
          <AirbnbStyleSearch />
        </div>

        {/* Quick Stats */}
        <div className="mt-12 flex items-center justify-center gap-8 text-white">
          <div className="text-center">
            <div className="text-2xl font-bold">1,200+</div>
            <div className="text-sm text-slate-300">Parking spots</div>
          </div>
          <div className="w-px h-10 bg-slate-600" />
          <div className="text-center">
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm text-slate-300">Campuses</div>
          </div>
          <div className="w-px h-10 bg-slate-600" />
          <div className="text-center">
            <div className="text-2xl font-bold">$7-18</div>
            <div className="text-sm text-slate-300">Per day</div>
          </div>
        </div>
      </div>
    </div>
  )
}
