# 🚨 Incident Management System

A production-ready, full-stack incident management application built with Next.js 16, featuring secure authentication, advanced filtering, and real-time incident tracking capabilities.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://incident-app-sage.vercel.app)
[![GitHub](https://img.shields.io/badge/github-repository-blue)](https://github.com/xaltyPasta/incident-app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)](https://www.prisma.io/)

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication Flow](#-authentication-flow)
- [Design Decisions](#-design-decisions)
- [Performance & Security](#-performance--security)
- [Future Enhancements](#-future-enhancements)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## 🎯 Overview

This incident management system provides a comprehensive solution for tracking and managing technical incidents. Built with modern web technologies, it offers secure authentication, efficient data management, and an intuitive user interface for incident reporting and resolution tracking.

### Key Capabilities

- 🔐 **Secure Authentication** - Google OAuth integration via NextAuth.js
- 📝 **Full CRUD Operations** - Create, read, update incidents with validation
- 🔍 **Advanced Filtering** - Multi-criteria filtering by severity, status, search terms
- 📊 **Data Management** - Sorting, pagination, and efficient querying
- 🎨 **Responsive UI** - Bootstrap-based interface with mobile support
- 🔒 **Protected Routes** - Session-based access control for all incident operations
- ⚡ **Type-Safe** - End-to-end TypeScript with Prisma type generation
- 🚀 **Production Ready** - Deployed on Vercel with PostgreSQL backend

## ✨ Features

### Core Functionality

- **Incident Creation**: Rich form with validation for creating new incidents
- **Incident List**: Paginated view with filtering, sorting, and search
- **Incident Details**: Comprehensive view of individual incidents
- **Incident Updates**: Edit incident status, severity, and details
- **User Authentication**: Google OAuth with session management
- **Protected Routes**: All incident operations require authentication

### Technical Features

- **Server-Side Rendering**: Optimized SSR with Next.js App Router
- **API Route Handlers**: RESTful API endpoints with type safety
- **Database Migrations**: Version-controlled schema with Prisma
- **Session Management**: JWT-based stateless authentication
- **Query Optimization**: Indexed database queries for performance
- **Error Handling**: Comprehensive error boundaries and API error responses

## 🎯 Live Demo

Visit the deployed application: **[https://incident-app-sage.vercel.app](https://incident-app-sage.vercel.app)**

**Test the Application:**

1. Sign in with your Google account
2. Browse existing incidents
3. Create a new incident
4. Filter by severity or status
5. View and update incident details

## 🛠️ Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router and Turbopack
- **React 19** - UI library with Server Components
- **TypeScript 5.0** - Type-safe development
- **Bootstrap 5** - Responsive UI components
- **NextAuth.js** - Authentication library

### Backend

- **Next.js API Routes** - RESTful API endpoints
- **Prisma 6** - Type-safe ORM with PostgreSQL
- **PostgreSQL** - Relational database
- **NextAuth.js** - OAuth and session management

### Development & Deployment

- **Turbopack** - Fast build tool
- **ESLint** - Code linting
- **Vercel** - Hosting and deployment
- **Git** - Version control

## 📁 Project Structure

```
xaltypasta-incident-app/
├── README.md                    # Project documentation
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── prisma.config.ts            # Prisma configuration
├── tsconfig.json               # TypeScript configuration
├── prisma/
│   ├── schema.prisma           # Database schema definition
│   └── seed.ts                 # Database seeding script
└── src/
    ├── app/
    │   ├── layout.tsx          # Root layout with providers
    │   ├── page.tsx            # Home page
    │   ├── providers.tsx       # Client-side providers (SessionProvider)
    │   ├── api/
    │   │   ├── auth/
    │   │   │   └── [...nextauth]/
    │   │   │       └── route.ts    # NextAuth configuration & handlers
    │   │   └── incidents/
    │   │       ├── route.ts        # GET (list) & POST (create) incidents
    │   │       └── [id]/
    │   │           └── route.ts    # GET & PATCH single incident
    │   └── incidents/
    │       ├── page.tsx            # Incident list page with filters
    │       ├── [id]/
    │       │   └── page.tsx        # Incident detail page
    │       └── create/
    │           └── page.tsx        # Create incident form
    ├── components/
    │   ├── AuthButtton.tsx         # Authentication button component
    │   └── UserDropDown.tsx        # User profile dropdown
    ├── lib/
    │   └── prisma.ts               # Prisma client singleton
    └── types/
        └── global.d.ts             # Global TypeScript definitions
```

### Directory Explanation

#### Root Configuration Files

- **`next.config.ts`**: Next.js configuration including Turbopack settings
- **`tsconfig.json`**: TypeScript compiler options and path aliases
- **`eslint.config.mjs`**: Linting rules for code quality
- **`prisma.config.ts`**: Prisma-specific configuration
- **`package.json`**: Project metadata, dependencies, and npm scripts

#### `/prisma`

Contains all database-related files:

- **`schema.prisma`**: Defines the database schema (Incident model, enums)
- **`seed.ts`**: Script to populate the database with sample data

#### `/src/app`

Next.js App Router structure:

- **`layout.tsx`**: Root layout wrapping all pages
- **`page.tsx`**: Landing/home page
- **`providers.tsx`**: Client-side context providers (NextAuth SessionProvider)

#### `/src/app/api`

API route handlers:

- **`/auth/[...nextauth]/route.ts`**: NextAuth configuration with Google OAuth
- **`/incidents/route.ts`**: List and create incidents (GET, POST)
- **`/incidents/[id]/route.ts`**: Get and update single incident (GET, PATCH)

#### `/src/app/incidents`

Incident-related pages:

- **`page.tsx`**: Main incident list with filtering, sorting, pagination
- **`[id]/page.tsx`**: Individual incident detail view
- **`create/page.tsx`**: Form to create new incidents

#### `/src/components`

Reusable React components:

- **`AuthButton.tsx`**: Sign in/out button with session handling
- **`UserDropDown.tsx`**: User profile dropdown with logout

#### `/src/lib`

Utility libraries:

- **`prisma.ts`**: Singleton Prisma client instance (prevents connection pool exhaustion)

#### `/src/types`

TypeScript definitions:

- **`global.d.ts`**: Global type definitions and module augmentations

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18.17 or later
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** 12 or later (local or cloud)
- **Google Cloud Console** account (for OAuth credentials)

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/xaltyPasta/incident-app.git
cd incident-app
```

#### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

#### 3. Setup Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Copy **Client ID** and **Client Secret**

#### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-random-secret-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

**Generate NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

#### 5. Setup Database

Run Prisma migrations to create tables:

```bash
npx prisma migrate dev --name init
```

Generate Prisma Client:

```bash
npx prisma generate
```

#### 6. Seed Database (Optional)

Populate with sample data:

```bash
npx ts-node prisma/seed.ts
```

#### 7. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

#### 8. Open Application

Navigate to [http://localhost:3000](http://localhost:3000)

### Additional Commands

```bash
# Run production build
npm run build
npm start

# Open Prisma Studio (Database GUI)
npx prisma studio

# Reset database
npx prisma migrate reset

# View database schema
npx prisma db pull
```

## 📡 API Documentation

### Authentication Endpoints

#### `GET/POST /api/auth/[...nextauth]`

NextAuth.js dynamic route handler for all authentication operations.

**Operations:**

- **`/api/auth/signin`** - Initiate Google OAuth flow
- **`/api/auth/callback/google`** - OAuth callback handler
- **`/api/auth/session`** - Get current session
- **`/api/auth/signout`** - Sign out user

**Response (Session):**

```json
{
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "image": "https://lh3.googleusercontent.com/..."
  },
  "expires": "2024-03-15T12:00:00.000Z"
}
```

---

### Incident Endpoints

#### `GET /api/incidents`

Fetch paginated list of incidents with filtering and sorting.

**Authentication:** Required (Session)

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | number | Page number (default: 1) | `1` |
| `limit` | number | Items per page (default: 10) | `20` |
| `severity` | string | Comma-separated severities | `SEV1,SEV2` |
| `status` | string | Comma-separated statuses | `OPEN,IN_PROGRESS` |
| `search` | string | Search in title/description | `database` |
| `sortBy` | string | Field to sort by | `createdAt` |
| `sortOrder` | string | Sort direction (asc/desc) | `desc` |

**Example Request:**

```bash
GET /api/incidents?page=1&severity=SEV1,SEV2&status=OPEN&sortBy=createdAt&sortOrder=desc
```

**Response:**

```json
{
  "incidents": [
    {
      "id": "clx1234567890",
      "title": "Database Connection Timeout",
      "description": "Primary database experiencing connection timeouts",
      "severity": "SEV1",
      "status": "OPEN",
      "service": "User Authentication Service",
      "createdAt": "2024-02-15T10:30:00.000Z",
      "updatedAt": "2024-02-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

**Error Response:**

```json
{
  "error": "Unauthorized"
}
```

---

#### `POST /api/incidents`

Create a new incident.

**Authentication:** Required (Session)

**Request Body:**

```json
{
  "title": "API Gateway Latency Spike",
  "description": "API response times increased to 5s average",
  "severity": "SEV2",
  "service": "API Gateway"
}
```

**Field Validation:**

- `title`: Required, 1-200 characters
- `description`: Required, 1-2000 characters
- `severity`: Required, enum (`SEV1`, `SEV2`, `SEV3`, `SEV4`)
- `service`: Required, 1-200 characters

**Response (201 Created):**

```json
{
  "id": "clx9876543210",
  "title": "API Gateway Latency Spike",
  "description": "API response times increased to 5s average",
  "severity": "SEV2",
  "status": "OPEN",
  "service": "API Gateway",
  "createdAt": "2024-02-16T14:20:00.000Z",
  "updatedAt": "2024-02-16T14:20:00.000Z"
}
```

**Error Response (400):**

```json
{
  "error": "Validation failed",
  "details": {
    "title": "Title is required"
  }
}
```

---

#### `GET /api/incidents/:id`

Fetch a single incident by ID.

**Authentication:** Required (Session)

**Path Parameters:**

- `id`: Incident ID (string)

**Example Request:**

```bash
GET /api/incidents/clx1234567890
```

**Response (200):**

```json
{
  "id": "clx1234567890",
  "title": "Database Connection Timeout",
  "description": "Primary database experiencing connection timeouts",
  "severity": "SEV1",
  "status": "OPEN",
  "service": "User Authentication Service",
  "createdAt": "2024-02-15T10:30:00.000Z",
  "updatedAt": "2024-02-15T10:30:00.000Z"
}
```

**Error Response (404):**

```json
{
  "error": "Incident not found"
}
```

---

#### `PATCH /api/incidents/:id`

Update an existing incident.

**Authentication:** Required (Session)

**Path Parameters:**

- `id`: Incident ID (string)

**Request Body (Partial Update):**

```json
{
  "status": "RESOLVED",
  "severity": "SEV2",
  "description": "Updated description with resolution details"
}
```

**Allowed Fields:**

- `title`: string (1-200 chars)
- `description`: string (1-2000 chars)
- `severity`: enum (`SEV1`, `SEV2`, `SEV3`, `SEV4`)
- `status`: enum (`OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`)
- `service`: string (1-200 chars)

**Response (200):**

```json
{
  "id": "clx1234567890",
  "title": "Database Connection Timeout",
  "description": "Updated description with resolution details",
  "severity": "SEV2",
  "status": "RESOLVED",
  "service": "User Authentication Service",
  "createdAt": "2024-02-15T10:30:00.000Z",
  "updatedAt": "2024-02-16T15:45:00.000Z"
}
```

**Error Response (400):**

```json
{
  "error": "Invalid status value"
}
```

---

## 🗄️ Database Schema

### Prisma Schema Definition

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Incident {
  id          String   @id @default(cuid())
  title       String   @db.VarChar(200)
  description String   @db.Text
  severity    Severity
  status      Status   @default(OPEN)
  service     String   @db.VarChar(200)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([severity])
  @@index([status])
  @@index([createdAt])
  @@map("incidents")
}

enum Severity {
  SEV1  // Critical - System down
  SEV2  // High - Major functionality impaired
  SEV3  // Medium - Minor functionality impaired
  SEV4  // Low - Cosmetic or minor issues
}

enum Status {
  OPEN
  IN_PROGRESS
  RESOLVED
  CLOSED
}
```

### Database Indexes

Performance optimization through strategic indexing:

- **`severity`**: Enables fast filtering by incident severity
- **`status`**: Optimizes status-based queries
- **`createdAt`**: Speeds up chronological sorting

### Field Descriptions

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | String | Unique identifier (CUID) | Primary key, auto-generated |
| `title` | String | Brief incident summary | Max 200 chars, required |
| `description` | String | Detailed incident description | Text field, required |
| `severity` | Enum | Incident severity level | SEV1-SEV4, required |
| `status` | Enum | Current incident status | Default: OPEN |
| `service` | String | Affected service/component | Max 200 chars, required |
| `createdAt` | DateTime | Creation timestamp | Auto-generated |
| `updatedAt` | DateTime | Last update timestamp | Auto-updated |

---

## 🔐 Authentication Flow

### Google OAuth Integration

```mermaid
sequenceDiagram
    participant User
    participant App
    participant NextAuth
    participant Google
    participant Database

    User->>App: Click "Sign in with Google"
    App->>NextAuth: Initiate OAuth flow
    NextAuth->>Google: Redirect to Google OAuth
    Google->>User: Show consent screen
    User->>Google: Grant permissions
    Google->>NextAuth: Return authorization code
    NextAuth->>Google: Exchange code for tokens
    Google->>NextAuth: Return user profile
    NextAuth->>NextAuth: Create JWT session
    NextAuth->>App: Set session cookie
    App->>User: Redirect to dashboard
```

### Session Management

**JWT Strategy:**

- **Stateless**: No database queries for session validation
- **Secure**: Signed with `NEXTAUTH_SECRET`
- **Scalable**: No session storage required
- **Expires**: Configurable expiration (default: 30 days)

**Session Validation:**

```typescript
// Middleware on protected routes
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  
  // Proceed with authenticated request
}
```

### Protected Route Configuration

**API Routes:**

- All `/api/incidents/*` endpoints validate session
- Unauthorized requests return `401 Unauthorized`
- Session extracted from JWT cookie

**Pages:**

- `/incidents/*` pages check session server-side
- Unauthenticated users redirected to home
- Client-side session context via `SessionProvider`

---

## 🎨 Design Decisions & Tradeoffs

### 1️⃣ Next.js App Router

**Decision:** Use Next.js 14+ App Router instead of Pages Router

**Rationale:**

- Co-location of API routes and UI components
- Server Components by default (better performance)
- Improved data fetching with async components
- Built-in support for streaming and Suspense
- Better TypeScript integration

**Tradeoffs:**

- Learning curve for developers familiar with Pages Router
- Some third-party libraries not yet compatible
- Requires careful client/server boundary management

---

### 2️⃣ Client-Side Filtering with Server-Side Execution

**Decision:** UI filters update URL params, server performs actual filtering

**Rationale:**

- **Bookmarkable state**: Filter state in URL allows sharing filtered views
- **Security**: Database filtering prevents client-side manipulation
- **Performance**: Only fetch filtered data, not entire dataset
- **SEO**: Server-rendered results improve searchability

**Tradeoffs:**

- Slight delay on filter changes due to network round-trip
- More complex state synchronization between URL and UI
- Additional router navigation overhead

**Implementation:**

```typescript
// Client component updates URL
const handleFilterChange = (filters) => {
  const params = new URLSearchParams(filters);
  router.push(`/incidents?${params.toString()}`);
};

// Server component reads params and queries DB
const searchParams = await props.searchParams;
const incidents = await prisma.incident.findMany({
  where: {
    severity: { in: searchParams.severity?.split(',') }
  }
});
```

---

### 3️⃣ Prisma ORM

**Decision:** Use Prisma instead of raw SQL or other ORMs

**Rationale:**

- **Type Safety**: Auto-generated TypeScript types from schema
- **Developer Experience**: Intuitive query API
- **Migration Management**: Version-controlled schema changes
- **Performance**: Efficient query generation and connection pooling
- **Database Agnostic**: Easy to switch between PostgreSQL, MySQL, etc.

**Tradeoffs:**

- Abstraction overhead (slightly larger bundle)
- Learning curve for SQL-first developers
- Migration workflow required for schema changes
- Potential performance limitations for complex queries

**Type Safety Example:**

```typescript
// Prisma provides full type inference
const incident = await prisma.incident.create({
  data: {
    title: "New incident",
    severity: "SEV1", // ✅ Type-checked against enum
    // status: "INVALID" // ❌ TypeScript error
  }
});

// Return type is fully typed
incident.id // string
incident.severity // Severity enum
incident.createdAt // Date
```

---

### 4️⃣ JWT Session Strategy

**Decision:** Use JWT sessions instead of database sessions

**Rationale:**

- **Stateless**: No database lookup on every request
- **Scalability**: Easier to horizontally scale
- **Reduced Latency**: No DB query for session validation
- **Simplified Architecture**: No session table required

**Tradeoffs:**

- **Larger Cookies**: JWT payload larger than session ID
- **Revocation Complexity**: Cannot instantly invalidate sessions
- **Secret Management**: Must securely manage `NEXTAUTH_SECRET`
- **Token Rotation**: Requires strategy for token refresh

**Security Considerations:**

```typescript
// NextAuth configuration
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },
};
```

---

### 5️⃣ Bootstrap for UI

**Decision:** Use Bootstrap instead of Tailwind CSS or custom CSS

**Rationale:**

- **Rapid Development**: Pre-built components reduce development time
- **Consistency**: Well-tested, predictable styling
- **Browser Compatibility**: Battle-tested across browsers
- **Minimal Configuration**: Works out-of-the-box

**Tradeoffs:**

- **Bundle Size**: Larger CSS bundle (~200KB) compared to Tailwind
- **Customization**: Less flexible than utility-first frameworks
- **Modern Aesthetics**: More traditional look vs. trendy designs
- **JavaScript Dependency**: Some components require Bootstrap JS

**Usage:**

```tsx
// Bootstrap classes for rapid prototyping
<div className="container">
  <div className="row">
    <div className="col-md-6">
      <button className="btn btn-primary">
        Create Incident
      </button>
    </div>
  </div>
</div>
```

---

### 6️⃣ Server Components vs Client Components

**Decision:** Default to Server Components, use Client only when necessary

**Rationale:**

- **Performance**: Reduced JavaScript bundle sent to client
- **Security**: Database queries stay on server
- **SEO**: Better indexing with server-rendered content
- **Data Fetching**: Simplified async data loading

**When to Use Client Components:**

- User interactions (onClick, onChange)
- React hooks (useState, useEffect)
- Browser APIs (localStorage, window)
- Third-party libraries requiring client-side

**Example:**

```tsx
// Server Component (default)
async function IncidentList() {
  const incidents = await fetchIncidents(); // Direct DB access
  return <div>{/* Render incidents */}</div>;
}

// Client Component (when needed)
'use client';
function FilterPanel() {
  const [filters, setFilters] = useState({});
  return <form>{/* Interactive filters */}</form>;
}
```

---

## 🔒 Performance & Security

### Performance Optimizations

#### Database Level

- **Indexed Fields**: Severity, status, and createdAt for fast lookups
- **Connection Pooling**: Prisma manages PostgreSQL connection pool
- **Query Optimization**: Only fetch required fields with `select`
- **Pagination**: Limit query results with `take` and `skip`

#### Application Level

- **Server Components**: Default rendering strategy reduces client bundle
- **Turbopack**: Fast build times during development
- **Code Splitting**: Automatic route-based splitting
- **Static Assets**: CDN-ready static file serving

#### Caching Strategy

```typescript
// API routes use cache control
export async function GET(request: Request) {
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store', // Fresh data for incident lists
    },
  });
}
```

---

### Security Measures

#### Authentication & Authorization

- ✅ **OAuth 2.0**: Industry-standard authentication via Google
- ✅ **Session Validation**: Every API request validates JWT session
- ✅ **Protected Routes**: Middleware blocks unauthenticated access
- ✅ **CSRF Protection**: NextAuth includes CSRF token validation

#### Data Protection

- ✅ **Environment Variables**: Secrets kept server-side only
- ✅ **SQL Injection Prevention**: Prisma parameterizes all queries
- ✅ **XSS Protection**: React escapes rendered content by default
- ✅ **HTTPS Only**: Production deployment enforces HTTPS

#### API Security

- ✅ **Input Validation**: Server-side validation of all user inputs
- ✅ **Rate Limiting**: (Recommended for production - see Future Enhancements)
- ✅ **Error Handling**: Generic error messages prevent information leakage
- ✅ **Least Privilege**: Database user has only required permissions

**Example Security Implementation:**

```typescript
// API route with validation
export async function POST(request: Request) {
  // 1. Validate session
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // 2. Validate input
  const body = await request.json();
  if (!body.title || body.title.length > 200) {
    return new Response("Invalid title", { status: 400 });
  }

  // 3. Sanitized database query
  const incident = await prisma.incident.create({
    data: {
      title: body.title, // Prisma handles escaping
      // ...
    },
  });

  return NextResponse.json(incident);
}
```

---

### Monitoring & Observability

**Recommended for Production:**

- Error tracking (e.g., Sentry)
- Performance monitoring (e.g., Vercel Analytics)
- Database query monitoring (Prisma query logs)
- API endpoint metrics
- User session analytics

---

## 🚧 Future Enhancements

### Short-Term (1-2 Weeks)

#### 1️⃣ Role-Based Access Control (RBAC)

**Goal**: Implement user roles (Admin, Manager, Viewer)

**Implementation:**

- Add `role` field to User model
- Create authorization middleware
- Restrict incident editing to Admins/Managers
- View-only access for Viewers

**Benefits:**

- Granular permission control
- Audit trail for sensitive actions
- Compliance with security policies

---

#### 2️⃣ Optimistic UI Updates

**Goal**: Instant feedback on user actions

**Implementation:**

```typescript
// Before: Wait for server response
const handleUpdate = async () => {
  await updateIncident(id, data);
  router.refresh(); // Wait for server
};

// After: Immediate UI update
const handleUpdate = async () => {
  setIncident(newData); // Instant
  try {
    await updateIncident(id, data);
  } catch (error) {
    setIncident(oldData); // Rollback on error
  }
};
```

**Benefits:**

- Improved perceived performance
- Better user experience
- Reduced frustration on slow networks

---

#### 3️⃣ Advanced Filtering UX

**Goal**: Enhanced filter interface

**Features:**

- Collapsible filter sidebar
- Active filter chips with clear-all
- Date range picker for created/updated dates
- Service/component multi-select
- Saved filter presets

**Mockup:**

```
┌─────────────────────────────────────┐
│ Filters [Clear All]                 │
├─────────────────────────────────────┤
│ ☑ SEV1 ☑ SEV2 ☐ SEV3 ☐ SEV4       │
│ ☑ OPEN ☐ IN_PROGRESS ☐ RESOLVED   │
│ Date: [Last 7 days ▼]              │
│ Service: [All Services ▼]           │
│ [Apply Filters]                     │
└─────────────────────────────────────┘
```

---

### Medium-Term (1-2 Months)

#### 4️⃣ Incident Timeline & Activity Log

**Goal**: Track all changes to incidents

**Schema Addition:**

```prisma
model IncidentActivity {
  id          String   @id @default(cuid())
  incidentId  String
  incident    Incident @relation(fields: [incidentId], references: [id])
  userId      String
  action      String   // "CREATED", "UPDATED", "COMMENTED"
  changes     Json?    // { "status": { "old": "OPEN", "new": "RESOLVED" } }
  comment     String?
  createdAt   DateTime @default(now())
}
```

**Features:**

- Visual timeline of incident lifecycle
- Track status transitions
- Comment system for team collaboration
- Audit log for compliance

---

#### 5️⃣ Email Notifications

**Goal**: Alert stakeholders of critical incidents

**Implementation:**

- SendGrid/Resend integration
- Configurable notification rules
- Email templates for different severity levels
- Digest emails for daily summaries

**Notification Triggers:**

- New SEV1 incident created → Immediate alert
- Incident assigned to user → Email notification
- Status changed to RESOLVED → Update email
- Daily digest of open incidents

---

#### 6️⃣ Export Functionality

**Goal**: Generate reports for stakeholders

**Formats:**

- **CSV**: Incident list export for Excel
- **PDF**: Detailed incident reports
- **JSON**: API data export for integrations

**Implementation:**

```typescript
// CSV Export
export async function GET(request: Request) {
  const incidents = await fetchIncidents();
  const csv = convertToCSV(incidents);
  
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename=incidents.csv',
    },
  });
}
```

---

### Long-Term (3-6 Months)

#### 7️⃣ Real-Time Updates via WebSockets

**Goal**: Live incident updates without page refresh

**Technology Stack:**

- Socket.io or Pusher
- Server-Sent Events (SSE) alternative
- Optimistic updates + real-time sync

**Use Cases:**

- Multiple users viewing same incident
- Live status updates during incidents
- Real-time comment threads

---

#### 8️⃣ Incident Templates

**Goal**: Standardize incident reporting

**Features:**

- Pre-defined templates by incident type
- Auto-populate common fields
- Checklist-based resolution guides
- Template management for admins

---

#### 9️⃣ Advanced Analytics Dashboard

**Goal**: Insights into incident patterns

**Metrics:**

- Mean Time to Resolution (MTTR)
- Incident frequency by service
- Severity distribution over time
- Top affected services
- Trend analysis

**Visualization:**

- Charts using Recharts
- Heatmaps for incident patterns
- Exportable reports

---

#### 🔟 Integration Ecosystem

**Goal**: Connect with existing tools

**Integrations:**

- **Slack**: Incident notifications to channels
- **PagerDuty**: Incident escalation
- **Jira**: Ticket creation from incidents
- **Datadog/NewRelic**: Automatic incident creation from alerts
- **GitHub**: Link incidents to code deployments

---

### Testing & Quality Assurance

#### Unit Tests

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
```

**Test Coverage:**

- API route handlers
- Prisma queries
- Utility functions
- React components

**Example:**

```typescript
// __tests__/api/incidents.test.ts
describe('GET /api/incidents', () => {
  it('returns 401 for unauthenticated requests', async () => {
    const response = await fetch('/api/incidents');
    expect(response.status).toBe(401);
  });

  it('returns paginated incidents', async () => {
    const response = await authenticatedFetch('/api/incidents?page=1');
    const data = await response.json();
    expect(data).toHaveProperty('incidents');
    expect(data).toHaveProperty('pagination');
  });
});
```

---

#### Integration Tests

**Prisma Query Testing:**

```typescript
// Test database interactions
describe('Incident CRUD operations', () => {
  it('creates incident with valid data', async () => {
    const incident = await prisma.incident.create({
      data: {
        title: 'Test',
        description: 'Test',
        severity: 'SEV1',
        service: 'Test Service',
      },
    });
    expect(incident.id).toBeDefined();
  });
});
```

---

#### E2E Tests

**Playwright Setup:**

```bash
npm install -D @playwright/test
```

**Test Scenarios:**

- User authentication flow
- Create incident end-to-end
- Filter and search functionality
- Update incident status

---

### Vercel Deployment (Production)

This project is optimized for Vercel deployment with automatic CI/CD.

#### Prerequisites

- GitHub repository
- Vercel account
- PostgreSQL database (Vercel Postgres, Supabase, or Neon recommended)

#### Deployment Steps

**1. Push to GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

**2. Import to Vercel**

1. Visit [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel auto-detects Next.js configuration

**3. Configure Environment Variables**

In Vercel project settings → Environment Variables:

```env
# Database (Production)
DATABASE_URL="postgresql://user:password@your-db-host:5432/production_db?schema=public"

# NextAuth
NEXTAUTH_SECRET="production-secret-min-32-chars"
NEXTAUTH_URL="https://incident-app-sage.vercel.app"

# Google OAuth (Production)
GOOGLE_CLIENT_ID="your-production-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-production-client-secret"
```

**4. Update Google OAuth Settings**
Add production callback URL:

```
https://incident-app-sage.vercel.app/api/auth/callback/google
```

**5. Deploy**
Click "Deploy" - Vercel automatically:

- Installs dependencies
- Runs Prisma generate
- Builds Next.js application
- Deploys to edge network

**6. Run Database Migrations**

After first deployment, run migrations:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Run migrations (production)
npx prisma migrate deploy
```

---

### Alternative Deployment: Docker

**Dockerfile** (create in root):

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**Docker Compose** (with PostgreSQL):

```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: incident_user
      POSTGRES_PASSWORD: incident_password
      POSTGRES_DB: incident_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: "postgresql://incident_user:incident_password@db:5432/incident_db"
      NEXTAUTH_SECRET: "your-secret"
      NEXTAUTH_URL: "http://localhost:3000"
      GOOGLE_CLIENT_ID: "your-client-id"
      GOOGLE_CLIENT_SECRET: "your-client-secret"
    depends_on:
      - db

volumes:
  postgres_data:
```

**Run with Docker:**

```bash
docker-compose up --build
```

---

### Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | ✅ Yes | Secret for JWT signing (min 32 chars) | Generated via `openssl rand -base64 32` |
| `NEXTAUTH_URL` | ✅ Yes | Application base URL | `http://localhost:3000` (dev)<br>`https://your-domain.com` (prod) |
| `GOOGLE_CLIENT_ID` | ✅ Yes | Google OAuth Client ID | `123456789-abc.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | ✅ Yes | Google OAuth Client Secret | `GOCSPX-xxxxxxxxxxxx` |
| `NODE_ENV` | ⚠️ Auto | Environment (auto-set by frameworks) | `development` / `production` |

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Issue: "Prisma Client Not Generated"

**Error:**

```
Error: @prisma/client did not initialize yet
```

**Solution:**

```bash
npx prisma generate
```

---

#### Issue: "Database Connection Failed"

**Error:**

```
Can't reach database server at `localhost:5432`
```

**Solution:**

1. Verify PostgreSQL is running:

   ```bash
   # macOS
   brew services start postgresql
   
   # Linux
   sudo systemctl start postgresql
   ```

2. Check `DATABASE_URL` format:

   ```env
   # Correct
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   
   # Missing schema
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
   ```

3. Test connection:

   ```bash
   npx prisma db push
   ```

---

#### Issue: "NextAuth Session Not Persisting"

**Error:** User logged out on page refresh

**Solution:**

1. Verify `NEXTAUTH_SECRET` is set:

   ```bash
   echo $NEXTAUTH_SECRET
   ```

2. Check `NEXTAUTH_URL` matches your domain:

   ```env
   # Development
   NEXTAUTH_URL="http://localhost:3000"
   
   # Production
   NEXTAUTH_URL="https://your-domain.com"
   ```

3. Clear cookies and retry authentication

---

#### Issue: "Google OAuth Redirect URI Mismatch"

**Error:**

```
redirect_uri_mismatch
```

**Solution:**

1. Go to Google Cloud Console → Credentials
2. Add authorized redirect URI:

   ```
   http://localhost:3000/api/auth/callback/google
   ```

3. For production, add:

   ```
   https://your-domain.com/api/auth/callback/google
   ```

---

#### Issue: "Module Not Found" Errors

**Error:**

```
Cannot find module '@/components/...'
```

**Solution:**

1. Check `tsconfig.json` paths configuration:

   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

2. Restart TypeScript server (VS Code: `Cmd+Shift+P` → "Restart TS Server")

---

#### Issue: "Port 3000 Already in Use"

**Error:**

```
Port 3000 is already in use
```

**Solution:**

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 npm run dev
```

---

### Debug Mode

Enable verbose logging:

```env
# .env.local
DEBUG=true
PRISMA_LOG=query,info,warn,error
```

```typescript
// lib/prisma.ts
const prisma = new PrismaClient({
  log: process.env.DEBUG === 'true' 
    ? ['query', 'info', 'warn', 'error'] 
    : ['error'],
});
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**

   ```bash
   # Click "Fork" on GitHub
   git clone https://github.com/xaltyPasta/incident-app.git
   cd incident-app
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**

   ```bash
   npm run build
   npm run dev
   ```

5. **Commit with conventional commits**

   ```bash
   git commit -m "feat: add incident export functionality"
   git commit -m "fix: resolve pagination bug"
   git commit -m "docs: update API documentation"
   ```

   **Commit Types:**
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes (formatting)
   - `refactor`: Code refactoring
   - `test`: Adding or updating tests
   - `chore`: Maintenance tasks

6. **Push to your fork**

   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Describe your changes clearly
   - Reference related issues
   - Add screenshots for UI changes

---

### Code Style Guidelines

**TypeScript:**

- Use TypeScript for all new files
- Avoid `any` type; use proper types
- Export types and interfaces

**React:**

- Use functional components
- Prefer Server Components unless interactivity needed
- Use `'use client'` directive only when necessary

**Naming Conventions:**

- Components: `PascalCase` (e.g., `IncidentList.tsx`)
- Utilities: `camelCase` (e.g., `formatDate.ts`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_PAGE_SIZE`)

**File Structure:**

```typescript
// 1. Imports (external first, then internal)
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 2. Types/Interfaces
interface Props {
  id: string;
}

// 3. Component
export function Component({ id }: Props) {
  // ...
}
```

---

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

---

### Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex logic
- [ ] Documentation updated (if applicable)
- [ ] No new warnings in console
- [ ] Tests added/updated (if applicable)
- [ ] All tests passing
- [ ] Branch is up-to-date with main

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 xaltyPasta

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

See [LICENSE](LICENSE) file for full text.

---

## 👤 Author

**xaltyPasta**

- GitHub: [@xaltyPasta](https://github.com/xaltyPasta)
- Project: [incident-app](https://github.com/xaltyPasta/incident-app)
- Live Demo: [incident-app-sage.vercel.app](https://incident-app-sage.vercel.app)

---

## 🙏 Acknowledgments

Special thanks to the open-source community and the following projects:

- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM for Node.js
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication for Next.js
- **[PostgreSQL](https://www.postgresql.org/)** - Powerful open-source database
- **[Vercel](https://vercel.com/)** - Platform for frontend deployment
- **[Bootstrap](https://getbootstrap.com/)** - UI component library
- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript

---

## 📞 Support

If you encounter any issues or have questions:

1. **Check Documentation**: Review this README thoroughly
2. **Search Issues**: Check [existing GitHub issues](https://github.com/xaltyPasta/incident-app/issues)
3. **Open New Issue**: Create a [new issue](https://github.com/xaltyPasta/incident-app/issues/new) with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, Node version, browser)

---

## 🗺️ Roadmap

### Version 1.0 (Current)

- ✅ Core incident CRUD operations
- ✅ Google OAuth authentication
- ✅ Filtering and sorting
- ✅ Responsive UI
- ✅ Production deployment

### Version 1.1 (Q2 2024)

- [ ] Role-based access control
- [ ] Activity timeline
- [ ] Email notifications
- [ ] Advanced filtering

### Version 2.0 (Q3 2024)

- [ ] Real-time updates
- [ ] Analytics dashboard
- [ ] Incident templates
- [ ] API integrations (Slack, PagerDuty)

### Version 3.0 (Q4 2024)

- [ ] Mobile application
- [ ] AI-powered incident categorization
- [ ] Automated resolution suggestions
- [ ] Multi-tenancy support

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/xaltyPasta/incident-app?style=social)
![GitHub forks](https://img.shields.io/github/forks/xaltyPasta/incident-app?style=social)
![GitHub issues](https://img.shields.io/github/issues/xaltyPasta/incident-app)
![GitHub pull requests](https://img.shields.io/github/issues-pr/xaltyPasta/incident-app)
![GitHub last commit](https://img.shields.io/github/last-commit/xaltyPasta/incident-app)

---

<div align="center">

### ⭐ Star this repository if you find it helpful

**[Live Demo](https://incident-app-sage.vercel.app)** • **[Report Bug](https://github.com/xaltyPasta/incident-app/issues)** • **[Request Feature](https://github.com/xaltyPasta/incident-app/issues)**

Made with ❤️ by [xaltyPasta](https://github.com/xaltyPasta)

</div>

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

The main branch is automatically deployed to: [https://incident-app-sage.vercel.app](https://incident-app-sage.vercel.app)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**xaltyPasta**

- GitHub: [@xaltyPasta](https://github.com/xaltyPasta)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma for the excellent ORM
- NextAuth.js for authentication made easy
- Vercel for seamless deployment

---

⭐ If you find this project useful, please consider giving it a star on GitHub!
