export default function VerifyPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="w-full max-w-md px-6 text-center">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="h-8 w-8 rounded-lg bg-black" />
          <span className="text-2xl font-semibold">Parqlo</span>
        </div>

        <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold mb-2">Check your inbox</h1>
        <p className="text-sm text-gray-500">
          We sent you a sign-in link. Click the link in the email to continue.
        </p>
      </div>
    </main>
  )
}
