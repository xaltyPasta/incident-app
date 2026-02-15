"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export const dynamic = "force-dynamic"

export default function IncidentsPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center mt-5">
          <div className="spinner-border" />
        </div>
      }
    >
      <IncidentsContent />
    </Suspense>
  )
}

function IncidentsContent() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [data, setData] = useState<any[]>([])
  const [pagination, setPagination] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  async function fetchIncidents() {
    try {
      setLoading(true)
      setError(null)

      const res = await fetch(
        `/api/incidents?${searchParams.toString()}`,
        { cache: "no-store" }
      )

      if (res.status === 401) {
        router.push("/")
        return
      }

      if (!res.ok) {
        throw new Error("Failed to fetch incidents")
      }

      const json = await res.json()

      setData(json.data)
      setPagination(json.pagination)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchIncidents()
    }
  }, [searchParams, status])

  function updateQuery(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    params.set("page", "1")
    router.push(`/incidents?${params.toString()}`)
  }

  function handleSort(column: string) {
    const params = new URLSearchParams(searchParams.toString())

    const currentSortBy = params.get("sortBy")
    const currentOrder = params.get("sortOrder") ?? "asc"

    if (currentSortBy === column) {
      params.set(
        "sortOrder",
        currentOrder === "asc" ? "desc" : "asc"
      )
    } else {
      params.set("sortBy", column)
      params.set("sortOrder", "asc")
    }

    router.push(`/incidents?${params.toString()}`)
  }

  function renderSortIndicator(column: string) {
    const sortBy = searchParams.get("sortBy")
    const sortOrder = searchParams.get("sortOrder")

    if (sortBy !== column) return null
    return sortOrder === "asc" ? " ↑" : " ↓"
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput.trim()) {
        updateQuery("search", searchInput.trim())
      } else {
        updateQuery("search", null)
      }
    }, 500)

    return () => clearTimeout(timeout)
  }, [searchInput])

  function changePage(newPage: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`/incidents?${params.toString()}`)
  }

  if (status === "loading") {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" />
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Incidents</h2>
        <button
          className="btn btn-success"
          onClick={() => router.push("/incidents/create")}
        >
          + Create Incident
        </button>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <select
            className="form-select"
            onChange={(e) =>
              updateQuery("severity", e.target.value || null)
            }
          >
            <option value="">All Severities</option>
            <option value="SEV1">SEV1</option>
            <option value="SEV2">SEV2</option>
            <option value="SEV3">SEV3</option>
            <option value="SEV4">SEV4</option>
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            onChange={(e) =>
              updateQuery("status", e.target.value || null)
            }
          >
            <option value="">All Status</option>
            <option value="OPEN">OPEN</option>
            <option value="MITIGATED">MITIGATED</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search incidents..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading && (
        <div className="text-center">
          <div className="spinner-border" />
        </div>
      )}

      {!loading && data.length === 0 && (
        <div className="alert alert-info">
          No incidents found.
        </div>
      )}

      {!loading && data.length > 0 && (
        <>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th onClick={() => handleSort("createdAt")} style={{ cursor: "pointer" }}>
                  Created{renderSortIndicator("createdAt")}
                </th>
                <th onClick={() => handleSort("severity")} style={{ cursor: "pointer" }}>
                  Severity{renderSortIndicator("severity")}
                </th>
                <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
                  Status{renderSortIndicator("status")}
                </th>
                <th>Title</th>
                <th>Service</th>
              </tr>
            </thead>
            <tbody>
              {data.map((incident) => (
                <tr
                  key={incident.id}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    router.push(`/incidents/${incident.id}`)
                  }
                >
                  <td>
                    {new Date(incident.createdAt).toLocaleDateString()}
                  </td>
                  <td>{incident.severity}</td>
                  <td>{incident.status}</td>
                  <td>{incident.title}</td>
                  <td>{incident.service}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {pagination && (
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-outline-primary"
                disabled={pagination.page <= 1}
                onClick={() => changePage(pagination.page - 1)}
              >
                Previous
              </button>

              <span>
                Page {pagination.page} of {pagination.totalPages}
              </span>

              <button
                className="btn btn-outline-primary"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => changePage(pagination.page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
