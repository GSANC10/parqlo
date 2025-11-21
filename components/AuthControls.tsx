'use client'

import { useSession, signOut } from "next-auth/react"
import { AvatarMenu } from "@/components/AvatarMenu"

export function AuthControls() {
  const { data: session, status } = useSession()
  const user = session?.user

  if (status === "loading") {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
  }

  if (!user) {
    return (
      <button
        onClick={() => (window.location.href = "/signin")}
        className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
      >
        Sign in with .edu
      </button>
    )
  }

  return (
    <AvatarMenu
      user={{
        name: user.name ?? "Student",
        email: user.email ?? "",
        image: user.image ?? undefined
      }}
      onSignOut={() => signOut({ callbackUrl: "/" })}
    />
  )
}
