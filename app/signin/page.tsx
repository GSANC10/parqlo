'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSending(true)

    const res = await signIn("email", {
      email,
      redirect: false,
      callbackUrl: "/"
    })

    setSending(false)

    if (res?.error) {
      setError(res.error)
    } else {
      setSent(true)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="h-8 w-8 rounded-lg bg-black" />
          <span className="text-2xl font-semibold">Parqlo</span>
        </div>

        {!sent ? (
          <>
            <h1 className="text-2xl font-semibold text-center mb-2">Sign in with .edu</h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              We'll send a magic link to your school email
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="you@ucla.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              />
              <button
                disabled={sending}
                className="w-full rounded-xl bg-black px-4 py-3 text-white font-medium hover:bg-slate-800 transition disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send magic link"}
              </button>

              {error && (
                <p className="text-sm text-red-600 text-center">
                  {error.includes("address") ? "Only .edu emails are allowed" : error}
                </p>
              )}
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Back to home
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Check your inbox</h2>
            <p className="text-sm text-gray-500 mb-6">
              We sent a sign-in link to <span className="font-medium text-gray-900">{email}</span>
            </p>
            <button
              onClick={() => {
                setSent(false)
                setEmail("")
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Use a different email
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
