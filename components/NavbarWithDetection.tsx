'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useCampus } from '@/hooks/useCampus'
import { campusConfig } from '@/lib/campusConfig'
import { ExploreCampusesModal } from '@/components/ExploreCampusesModal'

export function NavbarWithDetection() {
  const router = useRouter()
  const { campus, setCampus, detected, loading } = useCampus()
  const [openExplore, setOpenExplore] = React.useState(false)

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-white/70 backdrop-blur-md px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-black" />
          <span className="text-lg font-semibold">Parqlo</span>
        </div>

        <nav className="flex items-center gap-8 text-sm text-slate-600 font-medium">
          <a href="/" className="hover:text-black transition">Home</a>
          <button onClick={()=>setOpenExplore(true)} className="hover:text-black transition">
            Explore campuses
          </button>
          <a href="#how-it-works" className="hover:text-black transition">How it works</a>
          <a href="#faq" className="hover:text-black transition">FAQ</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={()=>setOpenExplore(true)}
            className="rounded-full border px-3 py-1.5 text-sm hover:bg-slate-50 transition"
            title={detected ? `Detected ${campusConfig[campus].name}` : 'Choose campus'}
          >
            {loading ? 'Detecting…' : campusConfig[campus].name}
          </button>

          <button
            onClick={()=>router.push(`/${campus}`)}
            className="rounded-full border px-4 py-1.5 text-sm hover:bg-slate-100 transition"
          >
            View map
          </button>

          <button className="rounded-full bg-black px-4 py-1.5 text-sm font-semibold text-white hover:bg-slate-800 transition">
            Sign in with .edu
          </button>
        </div>
      </header>

      <ExploreCampusesModal
        open={openExplore}
        onOpenChange={setOpenExplore}
        onSelect={setCampus}
      />
    </>
  )
}
