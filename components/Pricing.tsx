import { Check } from './icons'
import type { Campus } from '@/lib/campuses'

interface PricingProps {
  campus: Campus
  onListSpot: () => void
  onBrowseCampus: () => void
}

const testimonials = [
  {
    quote: 'I rented a driveway 8 minutes from campus for $8/day. Way cheaper than the permit.',
    name: 'Maya T.',
    tag: 'UCLA commuter'
  },
  {
    quote: 'My apartment spot sat empty all quarter. Now it pays for my groceries.',
    name: 'Leo R.',
    tag: 'UCLA resident'
  }
]

export default function Pricing({ campus, onListSpot, onBrowseCampus }: PricingProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border bg-white p-6">
          <h3 className="text-xl font-bold">Simple pricing for students</h3>
          <p className="mt-2 text-slate-600">It&apos;s free to browse and list. We take a small service fee only when a booking happens.</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Check className="h-4 w-4"/> No monthly fees</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4"/> Transparent commission</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4"/> Cancel anytime</li>
          </ul>
          <div className="mt-5 flex gap-3">
            <button onClick={onListSpot} className="h-11 rounded-2xl bg-black px-5 text-sm font-semibold text-white shadow hover:shadow-md">
              List your spot
            </button>
            <button onClick={onBrowseCampus} className="h-11 rounded-2xl border px-5 text-sm font-semibold hover:bg-slate-50">
              Browse {campus.name}
            </button>
          </div>
        </div>
        {/* Testimonials */}
        <div className="rounded-3xl border bg-white p-6">
          <h3 className="text-xl font-bold">What students say</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border p-4">
                <div className="text-sm">&quot;{t.quote}&quot;</div>
                <div className="mt-3 text-xs text-slate-500">{t.name} • {t.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
