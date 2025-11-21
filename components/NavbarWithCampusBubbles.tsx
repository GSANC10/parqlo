'use client'

import { useRouter } from 'next/navigation'

const campuses = [
  { slug: 'ucla', name: 'UCLA' },
  { slug: 'usc', name: 'USC' },
  { slug: 'berkeley', name: 'UC Berkeley' },
  { slug: 'ucsd', name: 'UC San Diego' },
  { slug: 'ucsb', name: 'UC Santa Barbara' },
  { slug: 'csuf', name: 'CSU Fullerton' },
]

export function NavbarWithCampusBubbles() {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-black" />
          <span className="text-lg font-semibold">Parqlo</span>
        </div>

        {/* Campus Bubbles */}
        <div className="flex items-center gap-2">
          {campuses.map((campus) => (
            <button
              key={campus.slug}
              onClick={() => router.push(`/${campus.slug}`)}
              className="px-4 py-1.5 rounded-full border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
            >
              {campus.name}
            </button>
          ))}
        </div>

        {/* Sign In */}
        <button className="rounded-full bg-black px-5 py-1.5 text-sm font-semibold text-white hover:bg-slate-800 transition">
          Sign in with .edu
        </button>
      </div>
    </header>
  )
}
