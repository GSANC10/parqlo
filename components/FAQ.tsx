'use client'

import { useState } from 'react'
import { Plus, Minus } from './icons'

const faqs = [
  { id: 'faq1', q: 'Do I have to be a student to use Parqlo?', a: 'Yes. We require .edu email verification for both listing and booking to keep the marketplace student-only and safe.' },
  { id: 'faq2', q: 'How do payouts work for spot owners?', a: 'We use Stripe for secure payments and payouts. After a booking is confirmed, funds are transferred to your account minus our small service fee.' },
  { id: 'faq3', q: 'Can I choose daily or monthly pricing?', a: 'Yes. You can offer your spot for daily, monthly, or semester-long rentals, and set different prices for each option.' },
  { id: 'faq4', q: 'What if my apartment lease forbids subletting spots?', a: 'List only if you have the right to rent your space. Our terms require owners to certify theyre allowed; renters can report suspicious listings.' },
  { id: 'faq5', q: 'How does verification work?', a: "Sign in with your .edu email and we verify you're a current student. This keeps the community trusted and safe." },
  { id: 'faq6', q: 'What happens if someone damages my spot?', a: "Every booking includes liability coverage. If there's an issue, report it immediately and we'll help resolve it." },
]

export default function FAQ() {
  const [faqOpen, setFaqOpen] = useState<string | null>('faq1')

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-2xl font-bold tracking-tight">FAQ</h2>
      <div className="mt-6 space-y-3">
        {faqs.map(item => (
          <div key={item.id} className="rounded-2xl border bg-white">
            <button
              onClick={() => setFaqOpen(faqOpen === item.id ? null : item.id)}
              className="w-full p-4 text-left flex items-center justify-between"
            >
              <span className="font-semibold">{item.q}</span>
              {faqOpen === item.id ? <Minus className="h-5 w-5"/> : <Plus className="h-5 w-5"/>}
            </button>
            {faqOpen === item.id && (
              <div className="px-4 pb-4 text-sm text-slate-600">{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
