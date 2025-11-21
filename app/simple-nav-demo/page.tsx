'use client'

import { NavbarWithCampusBubbles } from '@/components/NavbarWithCampusBubbles'
import Link from 'next/link'

export default function SimpleNavDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <NavbarWithCampusBubbles />

      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="mb-8">
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition">
            ← Back to Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Find parking near campus</h1>
          <p className="text-xl text-slate-600">
            Click any campus in the navigation to browse available parking spots
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="font-semibold text-lg mb-2">6 Campuses</h3>
            <p className="text-sm text-slate-600">
              UCLA, USC, UC Berkeley, UC San Diego, UC Santa Barbara, and CSU Fullerton
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-3xl mb-3">🚗</div>
            <h3 className="font-semibold text-lg mb-2">Easy Booking</h3>
            <p className="text-sm text-slate-600">
              Browse the map, find a spot near your classes, and book instantly
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-semibold text-lg mb-2">Save Money</h3>
            <p className="text-sm text-slate-600">
              Student parking from $7-18/day. Much cheaper than campus permits
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl p-8 border">
          <h2 className="text-2xl font-bold mb-4">Simple Navigation</h2>
          <p className="text-slate-600 mb-4">
            The campus bubbles in the navbar make it super easy to switch between schools.
            Just click any campus to see available parking spots on the map.
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>✓ Clean, minimal design</li>
            <li>✓ All campuses visible at once</li>
            <li>✓ One click to any campus map</li>
            <li>✓ No complex search needed</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
