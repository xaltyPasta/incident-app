import Providers from "./providers"
import AuthButton from "../components/AuthButtton"
import "bootstrap/dist/css/bootstrap.min.css"

export const metadata = {
  title: "Incident App",
  description: "Incident Management System",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* Navbar */}
          <nav className="navbar navbar-dark bg-dark px-4">
            <span className="navbar-brand mb-0 h4">
              Incident Management System
            </span>
            <AuthButton />
          </nav>

          {/* Main Content */}
          <main className="container mt-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
