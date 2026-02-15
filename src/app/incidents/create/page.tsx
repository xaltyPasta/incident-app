"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function CreateIncidentPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [form, setForm] = useState({
    title: "",
    service: "",
    severity: "SEV3",
    status: "OPEN",
    summary: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  //////////////////////////////////////////////////////
  // AUTH PROTECTION
  //////////////////////////////////////////////////////

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  //////////////////////////////////////////////////////
  // HANDLE SUBMIT
  //////////////////////////////////////////////////////

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.title.trim() || !form.service.trim()) {
      setError("Title and Service are required.")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const res = await fetch("/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: form.title,
          service: form.service,
          severity: form.severity,
          status: form.status,
          summary: form.summary
        })
      })

      if (res.status === 401) {
        router.push("/")
        return
      }

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || "Failed to create incident")
      }

      const created = await res.json()

      router.push(`/incidents`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  //////////////////////////////////////////////////////
  // LOADING / AUTH STATE
  //////////////////////////////////////////////////////

  if (status === "loading") {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (
    <div className="container mt-4">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => router.back()}
      >
        ← Back
      </button>

      <h3 className="mb-4">Create New Incident</h3>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title *</label>
          <input
            className="form-control"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Service *</label>
          <input
            className="form-control"
            value={form.service}
            onChange={(e) =>
              setForm({ ...form, service: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Severity</label>
          <select
            className="form-select"
            value={form.severity}
            onChange={(e) =>
              setForm({ ...form, severity: e.target.value })
            }
          >
            <option value="SEV1">SEV1</option>
            <option value="SEV2">SEV2</option>
            <option value="SEV3">SEV3</option>
            <option value="SEV4">SEV4</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="OPEN">OPEN</option>
            <option value="MITIGATED">MITIGATED</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Summary</label>
          <textarea
            className="form-control"
            rows={4}
            value={form.summary}
            onChange={(e) =>
              setForm({ ...form, summary: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Incident"}
        </button>
      </form>
    </div>
  )
}
