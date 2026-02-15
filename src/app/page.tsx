"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return <div className="text-center mt-5">Loading...</div>
  }

  if (!session) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="mb-4">Incident Dashboard</h2>
        <button
          className="btn btn-primary"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
      </div>
    )
  }

  return (
    <div className="container mt-5 text-center">
      <h3>Welcome {session.user?.name}</h3>

      <button
        className="btn btn-success me-3"
        onClick={() => router.push("/incidents")}
      >
        Go to Incidents
      </button>

      <button
        className="btn btn-danger"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  )
}
