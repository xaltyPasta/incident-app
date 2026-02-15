import { PrismaClient, Severity, Status } from "@prisma/client"

const prisma = new PrismaClient()

const services = [
  "Auth Service",
  "Billing Service",
  "Notification Service",
  "API Gateway",
  "User Service",
  "Reporting Service",
  "Search Service",
  "Analytics Service"
]

function randomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function weightedSeverity(): Severity {
  const r = Math.random()

  if (r < 0.1) return Severity.SEV1      // 10%
  if (r < 0.3) return Severity.SEV2      // 20%
  if (r < 0.7) return Severity.SEV3      // 40%
  return Severity.SEV4                   // 30%
}

function randomStatus(): Status {
  return randomFromArray([
    Status.OPEN,
    Status.MITIGATED,
    Status.RESOLVED
  ])
}

function randomDateWithinDays(days: number): Date {
  const now = new Date()
  const past = new Date()
  past.setDate(now.getDate() - days)

  const timestamp =
    past.getTime() +
    Math.random() * (now.getTime() - past.getTime())

  return new Date(timestamp)
}

async function main() {
  console.log("Seeding started...")

  // Optional: clear old data
  await prisma.incident.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()

  // Create Users
  const users = await Promise.all(
    Array.from({ length: 8 }).map((_, i) =>
      prisma.user.create({
        data: {
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`
        }
      })
    )
  )

  console.log("Users created:", users.length)

  const incidentsData = []

  for (let i = 1; i <= 200; i++) {
    const owner = randomFromArray(users)

    incidentsData.push({
      title: `Incident #${i} - ${randomFromArray(services)} issue`,
      service: randomFromArray(services),
      severity: weightedSeverity(),
      status: randomStatus(),
      summary: "Auto-generated incident for testing pagination and filtering.",
      ownerId: owner.id,
      createdAt: randomDateWithinDays(90)
    })
  }

  await prisma.incident.createMany({
    data: incidentsData
  })

  console.log("Incidents created:", incidentsData.length)

  console.log("Seeding completed successfully.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

