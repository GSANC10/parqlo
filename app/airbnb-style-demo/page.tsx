'use client'

import { SimpleNavbar } from '@/components/SimpleNavbar'
import { AirbnbStyleHero } from '@/components/AirbnbStyleHero'
import Link from 'next/link'

export default function AirbnbStyleDemo() {
  return (
    <div className="min-h-screen bg-white">
      <SimpleNavbar />
      <AirbnbStyleHero />

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="mb-8">
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition">
            ← Back to Home
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-semibold text-lg mb-2">Smart Search</h3>
            <p className="text-sm text-slate-600">
              Find parking spots near your campus with our Airbnb-style search interface. Filter by dates and location.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="text-3xl mb-3">📍</div>
            <h3 className="font-semibold text-lg mb-2">Auto-Detection</h3>
            <p className="text-sm text-slate-600">
              Start typing to search campuses or we'll detect your nearest campus automatically based on your location.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-semibold text-lg mb-2">Save Money</h3>
            <p className="text-sm text-slate-600">
              Book verified student parking spots from $7-18/day. Much cheaper than campus parking.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-slate-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">How the search works</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center font-bold mb-3">
                1
              </div>
              <h4 className="font-semibold mb-2">Search Campus</h4>
              <p className="text-sm text-slate-600">
                Click "Where" and type to search available campuses. Select from the dropdown.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center font-bold mb-3">
                2
              </div>
              <h4 className="font-semibold mb-2">Pick Dates</h4>
              <p className="text-sm text-slate-600">
                Choose your check-in and check-out dates (optional for browsing).
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center font-bold mb-3">
                3
              </div>
              <h4 className="font-semibold mb-2">Find Spots</h4>
              <p className="text-sm text-slate-600">
                Click search to view available parking spots on an interactive map.
              </p>
            </div>
          </div>
        </div>

        {/* UX Improvements */}
        <div className="bg-white rounded-2xl border p-8">
          <h2 className="text-2xl font-bold mb-6">UX Improvements over Previous Version</h2>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="text-green-500 font-bold">✓</div>
              <div>
                <div className="font-semibold">Single, prominent search bar</div>
                <div className="text-sm text-slate-600">All search inputs in one place, just like Airbnb</div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="text-green-500 font-bold">✓</div>
              <div>
                <div className="font-semibold">Inline search for campus</div>
                <div className="text-sm text-slate-600">Type to filter campuses instantly, no modal needed</div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="text-green-500 font-bold">✓</div>
              <div>
                <div className="font-semibold">Visual date pickers</div>
                <div className="text-sm text-slate-600">Native date inputs that show formatted dates when not focused</div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="text-green-500 font-bold">✓</div>
              <div>
                <div className="font-semibold">Clear visual hierarchy</div>
                <div className="text-sm text-slate-600">Labels, hover states, and focus indicators guide the user</div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="text-green-500 font-bold">✓</div>
              <div>
                <div className="font-semibold">Gradient search button</div>
                <div className="text-sm text-slate-600">Eye-catching call-to-action with icon and hover effect</div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="text-green-500 font-bold">✓</div>
              <div>
                <div className="font-semibold">Contextual dropdowns</div>
                <div className="text-sm text-slate-600">Campus list only shows when clicking "Where" field</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
