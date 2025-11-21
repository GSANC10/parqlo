'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ComparePage() {
  const [floatingCollapsed, setFloatingCollapsed] = useState(false)
  const [attachedCollapsed, setAttachedCollapsed] = useState(false)
  const [slideCollapsed, setSlideCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition">
            ← Back to Home
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Panel Style Comparison</h1>
          <p className="mt-2 text-slate-600">Compare four different panel styles for the listings sidebar</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Floating Panel Demo */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-2">1. Floating Panel (Current)</h2>
              <p className="text-sm text-slate-600 mb-4">
                Diagonal collapse - slides toward top-right corner, scales down to 90%
              </p>
              <ul className="text-sm text-slate-700 space-y-2 mb-4">
                <li>✓ Airy, modern look</li>
                <li>✓ Clear separation from map</li>
                <li>✓ Dynamic diagonal animation</li>
                <li>⚠️ Takes up more horizontal space</li>
                <li>⚠️ Collapsed state might feel cramped</li>
              </ul>
            </div>

            <div className="relative h-[600px] bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                Map Background
              </div>

              {/* Floating Panel */}
              <aside
                className={`absolute w-[340px] rounded-2xl bg-white/65 backdrop-blur-xl ring-1 ring-black/10 shadow-lg transition-all duration-300 ease-in-out ${
                  floatingCollapsed
                    ? 'right-2 top-4 scale-90 opacity-95'
                    : 'right-4 top-8 bottom-8 scale-100 opacity-100'
                }`}
                style={{
                  transformOrigin: 'top right'
                }}
              >
                <div className={`sticky top-0 z-10 flex items-center ${floatingCollapsed ? 'justify-center gap-3' : 'justify-between'} px-3 py-2 bg-white/70 backdrop-blur-xl ${floatingCollapsed ? '' : 'border-b'} rounded-t-2xl`}>
                  {floatingCollapsed && (
                    <span className="text-xs font-medium text-slate-700">6 spots near UCLA</span>
                  )}
                  <button
                    onClick={() => setFloatingCollapsed(!floatingCollapsed)}
                    className="text-lg hover:scale-110 transition"
                  >
                    {floatingCollapsed ? '▲' : '▼'}
                  </button>
                  {!floatingCollapsed && (
                    <span className="text-xs text-slate-600">6 spots near UCLA</span>
                  )}
                </div>

                {!floatingCollapsed && (
                  <div className="p-3 space-y-3 overflow-y-auto max-h-[500px]">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="rounded-xl border bg-white/70 p-3">
                        <div className="font-medium text-sm">Sample Listing {i}</div>
                        <div className="text-xs text-slate-600 mt-1">$10/day • 0.5 mi</div>
                      </div>
                    ))}
                  </div>
                )}
              </aside>
            </div>
          </div>

          {/* Attached Panel Demo */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-2">2. Attached Panel (Airbnb-style)</h2>
              <p className="text-sm text-slate-600 mb-4">
                Vertical slide - collapses upward to a compact bar at the top
              </p>
              <ul className="text-sm text-slate-700 space-y-2 mb-4">
                <li>✓ Professional, polished feel</li>
                <li>✓ More map visibility when collapsed</li>
                <li>✓ Clean vertical slide</li>
                <li>✓ Familiar UX pattern</li>
                <li>⚠️ Less visually distinct from map</li>
              </ul>
            </div>

            <div className="relative h-[600px] bg-gradient-to-br from-green-100 to-green-50 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                Map Background
              </div>

              {/* Attached Panel */}
              <aside
                className={`absolute right-0 w-[360px] bg-white/80 backdrop-blur-md border-l border-slate-200/60 shadow-xl rounded-l-2xl transition-all duration-300 ease-in-out ${
                  attachedCollapsed
                    ? 'top-4 h-12'
                    : 'top-8 bottom-8'
                }`}
              >
                <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 rounded-tl-2xl">
                  <span className="text-xs font-medium text-slate-700">
                    6 spots near UCLA
                  </span>
                  <button
                    onClick={() => setAttachedCollapsed(!attachedCollapsed)}
                    className="text-lg hover:scale-110 transition"
                  >
                    {attachedCollapsed ? '▼' : '▲'}
                  </button>
                </div>

                {!attachedCollapsed && (
                  <div className="p-4 space-y-3 overflow-y-auto max-h-[500px]">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="rounded-xl border bg-white p-3">
                        <div className="font-medium text-sm">Sample Listing {i}</div>
                        <div className="text-xs text-slate-600 mt-1">$10/day • 0.5 mi</div>
                      </div>
                    ))}
                  </div>
                )}
              </aside>
            </div>
          </div>

          {/* No Collapse Panel Demo */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-2">3. No Collapse (Always Visible)</h2>
              <p className="text-sm text-slate-600 mb-4">
                Fixed panel - always visible, no collapse functionality
              </p>
              <ul className="text-sm text-slate-700 space-y-2 mb-4">
                <li>✓ Maximum visibility of listings</li>
                <li>✓ No learning curve for users</li>
                <li>✓ Consistent, predictable layout</li>
                <li>✓ Great for desktop-first apps</li>
                <li>⚠️ Less map space</li>
              </ul>
            </div>

            <div className="relative h-[600px] bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                Map Background
              </div>

              {/* No Collapse Panel */}
              <aside className="absolute right-4 top-8 bottom-8 w-[340px] rounded-2xl bg-white/65 backdrop-blur-xl ring-1 ring-black/10 shadow-lg">
                <div className="sticky top-0 z-10 flex items-center justify-between px-3 py-2 bg-white/70 backdrop-blur-xl border-b rounded-t-2xl">
                  <span className="text-xs text-slate-600">6 spots near UCLA</span>
                  <select className="h-7 rounded-full border px-3 text-xs bg-white/70">
                    <option value="distance">Distance</option>
                    <option value="price">Price</option>
                  </select>
                </div>

                <div className="p-3 space-y-3 overflow-y-auto max-h-[520px]">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-xl border bg-white/70 p-3">
                      <div className="font-medium text-sm">Sample Listing {i}</div>
                      <div className="text-xs text-slate-600 mt-1">$10/day • 0.5 mi</div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>

          {/* Slide-to-Edge Panel Demo */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-2">4. Slide to Edge (Floating)</h2>
              <p className="text-sm text-slate-600 mb-4">
                Slides to right edge - shows vertical tab when collapsed
              </p>
              <ul className="text-sm text-slate-700 space-y-2 mb-4">
                <li>✓ Maximum map space when collapsed</li>
                <li>✓ Smooth horizontal slide</li>
                <li>✓ Clear visual cue to expand</li>
                <li>✓ Maintains floating aesthetic</li>
                <li>⚠️ Requires click to see listings</li>
              </ul>
            </div>

            <div className="relative h-[600px] bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                Map Background
              </div>

              {/* Slide-to-Edge Panel */}
              <aside
                className={`absolute top-8 bottom-8 w-[340px] rounded-2xl bg-white/65 backdrop-blur-xl ring-1 ring-black/10 shadow-lg transition-all duration-300 ease-in-out ${
                  slideCollapsed
                    ? 'right-[-300px]'
                    : 'right-4'
                }`}
              >
                {/* Vertical Tab when collapsed */}
                {slideCollapsed && (
                  <button
                    onClick={() => setSlideCollapsed(false)}
                    className="absolute left-[-40px] top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl px-3 py-6 rounded-l-xl shadow-lg hover:bg-white transition"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-medium text-slate-700 [writing-mode:vertical-rl] rotate-180">
                        6 spots
                      </span>
                      <span className="text-lg">◀</span>
                    </div>
                  </button>
                )}

                <div className="sticky top-0 z-10 flex items-center justify-between px-3 py-2 bg-white/70 backdrop-blur-xl border-b rounded-t-2xl">
                  <span className="text-xs text-slate-600">6 spots near UCLA</span>
                  <button
                    onClick={() => setSlideCollapsed(!slideCollapsed)}
                    className="text-lg hover:scale-110 transition"
                  >
                    ▶
                  </button>
                </div>

                <div className="p-3 space-y-3 overflow-y-auto max-h-[520px]">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-xl border bg-white/70 p-3">
                      <div className="font-medium text-sm">Sample Listing {i}</div>
                      <div className="text-xs text-slate-600 mt-1">$10/day • 0.5 mi</div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
          <h3 className="font-semibold text-lg mb-3">Which one do you prefer?</h3>
          <p className="text-sm text-slate-600 mb-4">
            Try the different collapse styles to see how they behave:
          </p>
          <ul className="text-sm text-slate-600 space-y-2">
            <li><strong>Option 1 (Blue):</strong> Floating panel with diagonal collapse - slides toward top-right corner and scales down</li>
            <li><strong>Option 2 (Green):</strong> Attached panel with vertical slide - collapses upward to a thin bar</li>
            <li><strong>Option 3 (Purple):</strong> No collapse - panel is always visible and fixed in place</li>
            <li><strong>Option 4 (Orange):</strong> Floating panel with slide-to-edge - slides off screen to the right, shows vertical tab</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            Let me know which style you prefer and I'll implement it across all campus pages (UCLA, USC, Berkeley, UCSD)!
          </p>
        </div>
      </div>
    </div>
  )
}
