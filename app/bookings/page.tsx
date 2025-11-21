import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"

export default async function MyBookingsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return null

  const me = await db.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true },
  })
  if (!me) return null

  const bookings = await db.booking.findMany({
    where: { renterId: me.id },
    include: { spot: true },
    orderBy: { createdAt: "desc" },
  })

  if (bookings.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-2 text-2xl font-semibold">My bookings</h1>
        <p className="mb-6 text-gray-500">You have no bookings yet.</p>
        <Link
          href="/"
          className="inline-block rounded-xl bg-black px-6 py-3 text-white font-medium hover:bg-slate-800 transition"
        >
          Find a spot
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-6 text-2xl font-semibold">My bookings</h1>
      <ul className="space-y-3">
        {bookings.map(b => (
          <li key={b.id} className="rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition">
            <div className="font-medium mb-1">{b.spot.title}</div>
            <div className="text-sm text-gray-500">
              {new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}
            </div>
            <div className="text-sm font-medium text-gray-900 mt-2">
              ${(b.totalCents / 100).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
