import type { Campus } from '@/lib/campuses'

interface FooterProps {
  campuses: Campus[]
}

export default function Footer({ campuses }: FooterProps) {
  return (
    <footer className="border-t bg-white/70">
      <div className="mx-auto max-w-7xl px-4 py-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div>
          <div className="font-bold">Parqlo</div>
          <div className="mt-2 text-slate-500">Student-to-student parking. Built for campus life.</div>
        </div>
        <div>
          <div className="font-semibold">Product</div>
          <ul className="mt-2 space-y-1 text-slate-600">
            <li><a href="#" className="hover:underline">How it works</a></li>
            <li><a href="#" className="hover:underline">Pricing</a></li>
            <li><a href="#" className="hover:underline">Safety</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Campuses</div>
          <ul className="mt-2 space-y-1 text-slate-600">
            {campuses.map(c => (
              <li key={c.slug}><a href={`/${c.slug}`} className="hover:underline">{c.name}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold">Legal</div>
          <ul className="mt-2 space-y-1 text-slate-600">
            <li><a href="#" className="hover:underline">Terms</a></li>
            <li><a href="#" className="hover:underline">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="px-4 pb-6 text-center text-xs text-slate-500">© {new Date().getFullYear()} Parqlo. All rights reserved.</div>
    </footer>
  )
}
