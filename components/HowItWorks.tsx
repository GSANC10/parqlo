const steps = [
  { step: '1', title: 'Pick your campus', desc: 'Choose UCLA, USC, Berkeley, or UCSD to see local listings.' },
  { step: '2', title: 'List or book', desc: 'List your unused apartment spot or book one nearby.' },
  { step: '3', title: 'Pay securely', desc: 'We handle payments and payouts. You focus on parking.' },
]

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
      <ol className="mt-6 grid gap-4 sm:grid-cols-3">
        {steps.map((s) => (
          <li key={s.step} className="rounded-2xl border bg-white p-4">
            <div className="text-xs font-bold text-slate-500">Step {s.step}</div>
            <div className="mt-1 font-semibold">{s.title}</div>
            <div className="text-sm text-slate-600">{s.desc}</div>
          </li>
        ))}
      </ol>
    </section>
  )
}
