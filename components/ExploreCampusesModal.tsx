'use client'

import * as React from 'react'
import { campusConfig, CampusKey } from '@/lib/campusConfig'

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  onSelect: (key: CampusKey) => void
}

const all = (Object.keys(campusConfig) as CampusKey[]).map(k => ({
  key: k, name: campusConfig[k].name
}))

export function ExploreCampusesModal({ open, onOpenChange, onSelect }: Props) {
  const [q, setQ] = React.useState('')

  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return all
    return all.filter(c =>
      c.name.toLowerCase().includes(s) || c.key.toLowerCase().includes(s)
    )
  }, [q])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/30" onClick={() => onOpenChange(false)} />
      <div className="absolute left-1/2 top-[12vh] w-full max-w-3xl -translate-x-1/2 rounded-2xl border bg-white/90 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold">Explore campuses</h2>
          <button onClick={() => onOpenChange(false)} className="h-8 w-8 rounded-full border hover:bg-slate-50 transition">✕</button>
        </div>

        <div className="px-5 py-4">
          <input
            autoFocus
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            placeholder="Search a campus…"
            className="w-full rounded-xl border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          />

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {filtered.map(c => (
              <button
                key={c.key}
                onClick={() => { onSelect(c.key); onOpenChange(false); }}
                className="flex items-center justify-between rounded-xl border px-4 py-3 text-left hover:bg-white transition"
              >
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-slate-500">{c.key.toUpperCase()}</div>
                </div>
                <span className="text-sm text-slate-600">Select →</span>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-4 text-center text-sm text-slate-500">
              No campuses found
            </div>
          )}

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <span className="text-sm text-slate-500">Don&apos;t see your campus?</span>
            <a
              href="https://forms.gle/your-form-link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline hover:text-black transition"
            >
              Request your campus →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
