'use client'

import { SimpleSearchNavbar } from '@/components/SimpleSearchNavbar'
import Link from 'next/link'

export default function FinalNavDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <SimpleSearchNavbar />

      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="mb-8">
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition">
            ← Back to Home
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Find parking near campus</h1>
          <p className="text-xl text-slate-600">
            Search for your campus, select dates, and view the map
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md border mb-12">
          <h2 className="text-2xl font-bold mb-6">How to use the navigation</h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold mx-auto mb-3">
                1
              </div>
              <h3 className="font-semibold mb-2">Search Campus</h3>
              <p className="text-sm text-slate-600">
                Type to search for your school in the search bar
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold mx-auto mb-3">
                2
              </div>
              <h3 className="font-semibold mb-2">Select From Date</h3>
              <p className="text-sm text-slate-600">
                Choose when you need parking (optional)
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold mx-auto mb-3">
                3
              </div>
              <h3 className="font-semibold mb-2">Select To Date</h3>
              <p className="text-sm text-slate-600">
                Choose your end date (optional)
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold mx-auto mb-3">
                4
              </div>
              <h3 className="font-semibold mb-2">View Map</h3>
              <p className="text-sm text-slate-600">
                Click to see available parking spots
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-semibold text-lg mb-2">Quick Search</h3>
            <p className="text-sm text-slate-600">
              Find your campus fast with instant search results
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="font-semibold text-lg mb-2">Flexible Dates</h3>
            <p className="text-sm text-slate-600">
              Pick specific dates or browse without date restrictions
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-3xl mb-3">🗺️</div>
            <h3 className="font-semibold text-lg mb-2">Interactive Map</h3>
            <p className="text-sm text-slate-600">
              See all available spots on an easy-to-use map interface
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
