import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { Severity, Status } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

//////////////////////////////////////////////////////
// VALIDATION
//////////////////////////////////////////////////////

const idSchema = z.string().uuid()

const updateIncidentSchema = z.object({
  severity: z.nativeEnum(Severity).optional(),
  status: z.nativeEnum(Status).optional(),
  summary: z.string().optional()
})

//////////////////////////////////////////////////////
// GET /api/incidents/[id]
//////////////////////////////////////////////////////

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await context.params

    const parsedId = idSchema.safeParse(id)

    if (!parsedId.success) {
      return NextResponse.json(
        { error: "Invalid incident ID" },
        { status: 400 }
      )
    }

    const incident = await prisma.incident.findUnique({
      where: { id: parsedId.data }
    })

    if (!incident) {
      return NextResponse.json(
        { error: "Incident not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(incident)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

//////////////////////////////////////////////////////
// PATCH /api/incidents/[id]
//////////////////////////////////////////////////////

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await context.params

    const parsedId = idSchema.safeParse(id)

    if (!parsedId.success) {
      return NextResponse.json(
        { error: "Invalid incident ID" },
        { status: 400 }
      )
    }

    const body = await req.json()
    const parsedBody = updateIncidentSchema.safeParse(body)

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.flatten() },
        { status: 400 }
      )
    }

    if (Object.keys(parsedBody.data).length === 0) {
      return NextResponse.json(
        { error: "No fields provided for update" },
        { status: 400 }
      )
    }

    const existing = await prisma.incident.findUnique({
      where: { id: parsedId.data }
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Incident not found" },
        { status: 404 }
      )
    }

    const updated = await prisma.incident.update({
      where: { id: parsedId.data },
      data: parsedBody.data
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
