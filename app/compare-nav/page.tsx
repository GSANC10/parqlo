'use client'

import { useState } from 'react'
import Link from 'next/link'
import NavigationWithLinks from '@/components/NavigationWithLinks'
import NavigationWithContext from '@/components/NavigationWithContext'
import { campuses, type CampusSlug } from '@/lib/campuses'

export default function CompareNavPage() {
  const [campus1, setCampus1] = useState<CampusSlug>('ucla')
  const [campus2, setCampus2] = useState<CampusSlug>('ucla')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition">
            ← Back to Home
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Navigation Header Comparison</h1>
          <p className="mt-2 text-slate-600">Compare two different navigation header styles for the landing page</p>
        </div>

        <div className="space-y-8">
          {/* Option 1: With Links */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-2">Option 1: Navigation Links</h2>
              <p className="text-sm text-slate-600 mb-4">
                Traditional SaaS-style navigation with center links (Home, How it works, List your spot, FAQ)
              </p>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>✓ Gives the app credibility and structure</li>
                <li>✓ Balances the header naturally</li>
                <li>✓ Familiar pattern (like Stripe, Airbnb)</li>
                <li>✓ Easy to add more sections as you grow</li>
                <li>⚠️ Takes up more horizontal space</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <NavigationWithLinks
                campuses={campuses}
                currentCampus={campus1}
                onCampusChange={setCampus1}
                onViewMap={() => alert('View map clicked')}
                onSignIn={() => alert('Sign in clicked')}
              />
              {/* Preview Content */}
              <div className="p-12 bg-gradient-to-b from-white to-slate-50">
                <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-5xl font-bold mb-4">Find parking near campus</h1>
                  <p className="text-lg text-slate-600">
                    Save money and time by booking verified student parking spots
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Option 2: With Context Bar */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-2">Option 2: Campus Context Bar</h2>
              <p className="text-sm text-slate-600 mb-4">
                Clean and focused with a contextual message: "Find student parking near UCLA"
              </p>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>✓ Laser-focused on core value proposition</li>
                <li>✓ Minimal and startup-clean aesthetic</li>
                <li>✓ Reinforces the campus selection</li>
                <li>✓ Less cluttered header</li>
                <li>⚠️ Less traditional navigation structure</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <NavigationWithContext
                campuses={campuses}
                currentCampus={campus2}
                onCampusChange={setCampus2}
                onViewMap={() => alert('View map clicked')}
                onSignIn={() => alert('Sign in clicked')}
              />
              {/* Preview Content */}
              <div className="p-12 bg-gradient-to-b from-white to-slate-50">
                <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-5xl font-bold mb-4">Find parking near campus</h1>
                  <p className="text-lg text-slate-600">
                    Save money and time by booking verified student parking spots
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
          <h3 className="font-semibold text-lg mb-3">Which one do you prefer?</h3>
          <p className="text-sm text-slate-600 mb-4">
            Try selecting different campuses in each example to see how they behave:
          </p>
          <ul className="text-sm text-slate-600 space-y-2">
            <li><strong>Option 1 (Links):</strong> Best if you want a traditional SaaS product feel with clear navigation structure</li>
            <li><strong>Option 2 (Context):</strong> Best if you want a focused, minimal design that emphasizes your unique value prop</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            Let me know which style you prefer and I'll implement it on the main landing page!
          </p>
        </div>
      </div>
    </div>
  )
}
