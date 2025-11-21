'use client'

import { NavbarWithDetection } from '@/components/NavbarWithDetection'
import { useCampus } from '@/hooks/useCampus'
import { campusConfig } from '@/lib/campusConfig'
import Link from 'next/link'

export default function CampusDetectionDemo() {
  const { campus, detected, loading } = useCampus()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <NavbarWithDetection />

      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition">
            ← Back to Home
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Campus Auto-Detection Demo</h1>
          <p className="mt-2 text-slate-600">
            Automatic campus detection based on your location with manual override
          </p>
        </div>

        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Detection Status</h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Status:</span>
                <span className="font-medium">
                  {loading ? '🔍 Detecting...' : '✅ Complete'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Current Campus:</span>
                <span className="font-semibold">{campusConfig[campus].name}</span>
              </div>

              {detected && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Auto-Detected:</span>
                  <span className="text-green-600 font-medium">📍 {campusConfig[detected].name}</span>
                </div>
              )}

              {!detected && !loading && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Auto-Detected:</span>
                  <span className="text-slate-500">No campus nearby (defaulted to UCLA)</span>
                </div>
              )}
            </div>
          </div>

          {/* How it Works */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>

            <ol className="space-y-3 text-sm text-slate-700">
              <li className="flex gap-3">
                <span className="font-bold">1.</span>
                <span>
                  <strong>First Visit:</strong> App requests your location permission (only on client-side)
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">2.</span>
                <span>
                  <strong>Auto-Detection:</strong> If within 25km of a campus, that campus is selected automatically
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">3.</span>
                <span>
                  <strong>Fallback:</strong> If not near any campus, defaults to UCLA
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">4.</span>
                <span>
                  <strong>Manual Override:</strong> Click the campus button or "Explore campuses" to manually select
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">5.</span>
                <span>
                  <strong>Persistence:</strong> Your manual selection is saved in localStorage and overrides auto-detection
                </span>
              </li>
            </ol>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Features</h2>

            <ul className="space-y-2 text-sm text-slate-700">
              <li>✓ Privacy-friendly: Uses browser geolocation API (no server tracking)</li>
              <li>✓ Searchable modal: Find campuses quickly with search</li>
              <li>✓ Persistent selection: Your choice is remembered across sessions</li>
              <li>✓ Smart detection: 25km radius for accurate campus matching</li>
              <li>✓ Graceful fallback: Works even if geolocation is denied</li>
              <li>✓ No external dependencies: Pure React + localStorage</li>
            </ul>
          </div>

          {/* Test Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Testing Instructions</h3>
            <p className="text-sm text-blue-800 mb-3">
              To test the auto-detection feature:
            </p>
            <ol className="text-sm text-blue-800 space-y-2">
              <li>1. Open DevTools → Application → Local Storage</li>
              <li>2. Delete the <code className="bg-blue-100 px-1 rounded">parqlo:selectedCampus</code> key</li>
              <li>3. Refresh the page</li>
              <li>4. Allow location when prompted</li>
              <li>5. Watch it detect your nearest campus!</li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                localStorage.removeItem('parqlo:selectedCampus')
                window.location.reload()
              }}
              className="rounded-full border px-4 py-2 text-sm hover:bg-slate-50 transition"
            >
              Reset & Re-detect
            </button>
            <Link
              href={`/${campus}`}
              className="rounded-full bg-black text-white px-4 py-2 text-sm font-semibold hover:bg-slate-800 transition"
            >
              View {campusConfig[campus].name} Map
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
