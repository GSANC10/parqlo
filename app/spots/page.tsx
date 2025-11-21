import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"

export default async function MySpotsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return null

  const me = await db.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true },
  })
  if (!me) return null

  const spots = await db.spot.findMany({
    where: { ownerId: me.id },
    orderBy: { createdAt: "desc" },
  })

  if (spots.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-2 text-2xl font-semibold">My spots</h1>
        <p className="mb-6 text-gray-500">You haven't listed a spot yet.</p>
        <Link
          href="/list"
          className="inline-block rounded-xl bg-black px-6 py-3 text-white font-medium hover:bg-slate-800 transition"
        >
          List your spot
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">My spots</h1>
        <Link
          href="/list"
          className="rounded-xl bg-black px-4 py-2 text-white text-sm font-medium hover:bg-slate-800 transition"
        >
          List new spot
        </Link>
      </div>
      <ul className="space-y-3">
        {spots.map(s => (
          <li key={s.id} className="rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition">
            <div className="font-medium mb-1">{s.title}</div>
            <div className="text-sm text-gray-500">
              {s.type} · ${(s.priceCents / 100).toFixed(2)}/day
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Listed {new Date(s.createdAt).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
