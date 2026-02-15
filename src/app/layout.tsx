import "bootstrap/dist/css/bootstrap.min.css"
import type { ReactNode } from "react"
import Providers from "./providers"

export const metadata = {
  title: "Incident Dashboard",
  description: "Incident Management System"
}

export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar navbar-dark bg-dark px-3">
          <a className="navbar-brand" href="/incidents">
            Incident Dashboard
          </a>
        </nav>

        <div className="container mt-4">
          <Providers>
            {children}
          </Providers>

        </div>
      </body>
    </html>
  )
}
