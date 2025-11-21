export default function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="rounded-3xl border bg-white p-4 sm:p-6">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <div className="text-3xl font-extrabold">$8–12</div>
            <div className="text-sm text-slate-500">Typical daily rate near campus</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold">{"< 2 min"}</div>
            <div className="text-sm text-slate-500">To list your spot</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold">.edu</div>
            <div className="text-sm text-slate-500">Verified students only</div>
          </div>
        </div>
      </div>
    </section>
  )
}
