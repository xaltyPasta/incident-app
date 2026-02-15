import Providers from "./providers"
import "bootstrap/dist/css/bootstrap.min.css"
export const metadata = {
  title: "Incident App",
  description: "Incident Management System"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
