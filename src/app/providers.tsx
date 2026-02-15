"use client"
import "bootstrap/dist/css/bootstrap.min.css"
import { SessionProvider } from "next-auth/react"

export default function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return <SessionProvider>{children}</SessionProvider>
}
