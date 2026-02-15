"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function IncidentDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const router = useRouter()
  const { data: session, status } = useSession()

  const [incident, setIncident] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  //////////////////////////////////////////////////////
  // AUTH PROTECTION
  //////////////////////////////////////////////////////

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  //////////////////////////////////////////////////////
  // FETCH INCIDENT
  //////////////////////////////////////////////////////

  async function fetchIncident() {
    try {
      setLoading(true)
      setError(null)

      const res = await fetch(`/api/incidents/${id}`)

      if (res.status === 401) {
        router.push("/")
        return
      }

      if (!res.ok) {
        throw new Error("Incident not found")
      }

      const data = await res.json()
      setIncident(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === "authenticated" && id) {
      fetchIncident()
    }
  }, [status, id])

  //////////////////////////////////////////////////////
  // UPDATE INCIDENT
  //////////////////////////////////////////////////////

  async function handleSave() {
    try {
      setSaving(true)
      setSuccess(false)
      setError(null)

      const res = await fetch(`/api/incidents/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          severity: incident.severity,
          status: incident.status,
          summary: incident.summary
        })
      })

      if (res.status === 401) {
        router.push("/")
        return
      }

      if (!res.ok) {
        throw new Error("Failed to update")
      }

      const updated = await res.json()
      setIncident(updated)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  //////////////////////////////////////////////////////
  // UI STATES
  //////////////////////////////////////////////////////

  if (status === "loading" || loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" />
      </div>
    )
  }

  if (!session) return null

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
        <button
          className="btn btn-secondary"
          onClick={() => router.back()}
        >
          ← Back
        </button>
      </div>
    )
  }

  if (!incident) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          Incident not found.
        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////
  // MAIN UI
  //////////////////////////////////////////////////////

  return (
    <div className="container mt-4">
      <button
        className="btn btn-secondary mb-3"
        onClick={() => router.back()}
      >
        ← Back
      </button>

      <h3 className="mb-4">Incident Detail</h3>

      {success && (
        <div className="alert alert-success">
          Incident updated successfully.
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input className="form-control" value={incident.title} disabled />
      </div>

      <div className="mb-3">
        <label className="form-label">Service</label>
        <input className="form-control" value={incident.service} disabled />
      </div>

      <div className="mb-3">
        <label className="form-label">Severity</label>
        <select
          className="form-select"
          value={incident.severity}
          onChange={(e) =>
            setIncident({ ...incident, severity: e.target.value })
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
          value={incident.status}
          onChange={(e) =>
            setIncident({ ...incident, status: e.target.value })
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
          value={incident.summary || ""}
          onChange={(e) =>
            setIncident({ ...incident, summary: e.target.value })
          }
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  )
}
