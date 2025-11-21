'use client'

export function SimpleNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            Parqlo
          </span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#how-it-works" className="hover:text-black transition">How it works</a>
          <a href="#list-your-spot" className="hover:text-black transition">List your spot</a>
          <a href="#faq" className="hover:text-black transition">FAQ</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-slate-700 hover:text-black transition">
            Help
          </button>
          <button className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-2 text-sm font-semibold text-white hover:from-pink-600 hover:to-rose-600 transition-all hover:scale-105">
            Sign in with .edu
          </button>
        </div>
      </div>
    </header>
  )
}
