import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { Severity, Status, Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

//////////////////////////////////////////////////////
// VALIDATION
//////////////////////////////////////////////////////

const createIncidentSchema = z.object({
  title: z.string().min(1),
  service: z.string().min(1),
  severity: z.nativeEnum(Severity),
  status: z.nativeEnum(Status).optional(),
  summary: z.string().optional()
})

const querySchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  severity: z.nativeEnum(Severity).optional(),
  status: z.nativeEnum(Status).optional(),
  service: z.string().optional(),
  search: z.string().min(1).optional(),
  sortBy: z.enum(["createdAt", "severity", "status", "service"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional()
})

//////////////////////////////////////////////////////
// POST
//////////////////////////////////////////////////////

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const parsed = createIncidentSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const incident = await prisma.incident.create({
      data: {
        ...parsed.data,
        ownerId: session.user.id
      }
    })

    return NextResponse.json(incident, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

//////////////////////////////////////////////////////
// GET
//////////////////////////////////////////////////////

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)

    const parsed = querySchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      severity: searchParams.get("severity") ?? undefined,
      status: searchParams.get("status") ?? undefined,
      service: searchParams.get("service") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      sortBy: searchParams.get("sortBy") ?? undefined,
      sortOrder: searchParams.get("sortOrder") ?? undefined
    })

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      )
    }

    //////////////////////////////////////////////////////
    // APPLY DEFAULTS SAFELY
    //////////////////////////////////////////////////////

    const page = parsed.data.page ?? 1
    const limit = parsed.data.limit ?? 10

    const { severity, status, service, search, sortBy, sortOrder } =
      parsed.data

    //////////////////////////////////////////////////////
    // WHERE
    //////////////////////////////////////////////////////

    const where: Prisma.IncidentWhereInput = {}

    if (severity) where.severity = severity
    if (status) where.status = status
    if (service) where.service = service

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          summary: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    }

    //////////////////////////////////////////////////////
    // SORTING
    //////////////////////////////////////////////////////

    let orderBy: Prisma.IncidentOrderByWithRelationInput = {
      createdAt: "desc"
    }

    if (sortBy) {
      orderBy = {
        [sortBy]: sortOrder ?? "asc"
      } as Prisma.IncidentOrderByWithRelationInput
    }

    //////////////////////////////////////////////////////
    // PAGINATION
    //////////////////////////////////////////////////////

    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
      prisma.incident.findMany({
        where,
        skip,
        take: limit,
        orderBy
      }),
      prisma.incident.count({ where })
    ])

    return NextResponse.json({
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
