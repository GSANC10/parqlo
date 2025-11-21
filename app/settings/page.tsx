import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { signOut } from "next-auth/react"

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return null

  const me = await db.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, email: true, image: true, createdAt: true },
  })
  if (!me) return null

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-6 text-2xl font-semibold">Settings</h1>

      {/* Account Info */}
      <div className="rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="font-semibold mb-4">Account Information</h2>
        <div className="space-y-3">
          <div>
            <div className="text-sm text-gray-500">Name</div>
            <div className="font-medium">{me.name || "Not set"}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="font-medium">{me.email}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Member since</div>
            <div className="font-medium">
              {new Date(me.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Stripe Connect (placeholder for later) */}
      <div className="rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="font-semibold mb-2">Payment Settings</h2>
        <p className="text-sm text-gray-500 mb-4">
          Connect your account to receive payments for your parking spots.
        </p>
        <button
          disabled
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed"
        >
          Connect Stripe (Coming soon)
        </button>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="font-semibold mb-4">Notifications</h2>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-sm">Email notifications</span>
            <input type="checkbox" className="rounded" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm">Booking confirmations</span>
            <input type="checkbox" className="rounded" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm">Marketing emails</span>
            <input type="checkbox" className="rounded" />
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-red-200 p-6">
        <h2 className="font-semibold text-red-600 mb-2">Danger Zone</h2>
        <p className="text-sm text-gray-500 mb-4">
          Once you delete your account, there is no going back.
        </p>
        <button
          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
          onClick={() => {
            if (confirm("Are you sure you want to delete your account?")) {
              // TODO: Implement account deletion
              alert("Account deletion not yet implemented")
            }
          }}
        >
          Delete Account
        </button>
      </div>
    </main>
  )
}
