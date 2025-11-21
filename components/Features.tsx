import { Check } from './icons'

const features = [
  { title: 'Local to your campus', desc: 'Each campus has a dedicated map, prices, and demand model.' },
  { title: 'Smart pricing', desc: 'We suggest fair prices based on nearby listings and demand.' },
  { title: 'Secure payouts', desc: 'Stripe-powered payments and fast transfers to spot owners.' },
  { title: 'Trust-first', desc: '.edu sign-in, reviews, and listing verification keep it safe.' },
  { title: 'Zero hassle', desc: 'List in minutes. Set availability and let us handle the rest.' },
  { title: 'Growth-ready', desc: 'Start at UCLA; expand to USC, UCSD, Berkeley, and beyond.' },
]

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-2xl font-bold tracking-tight">Why students love Parqlo</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border bg-white p-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-6 w-6 rounded-lg bg-black/90 text-white grid place-items-center">
                <Check className="h-4 w-4"/>
              </div>
              <div>
                <div className="font-semibold">{f.title}</div>
                <div className="text-sm text-slate-600">{f.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
