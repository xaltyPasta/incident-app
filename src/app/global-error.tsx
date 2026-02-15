"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
          <h2>Something went wrong!</h2>
          <button
            className="btn btn-primary mt-3"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
