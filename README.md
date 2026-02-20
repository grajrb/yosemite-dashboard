# Yosemite Super Admin Dashboard

Frontend-heavy Next.js super admin panel with mock backend route handlers for leadership-level platform visibility across mobile, PMS web, and operational workflows.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- Mock backend via Next route handlers (`/api/v1/*`)
- In-memory seeded store (`data/seed.ts`, `lib/data/store.ts`)
- Recharts for analytics visualization
- Vitest + Testing Library

## Setup
1. Install dependencies:
	 ```bash
	 npm install
	 ```
2. Start the app:
	 ```bash
	 npm run dev
	 ```
3. Open `http://localhost:3000`.

## Routes
- `/overview`
- `/analytics`
- `/organizations`
- `/onboarding-queue`
- `/audit-logs`

## Bonus Features
- CSV export for onboarding queue (Export CSV button)
- Dark mode toggle in the topbar
- Basic unit tests for one API + one UI component

## API Endpoints
- `GET /api/v1/metrics?start=&end=&orgId=`
- `GET /api/v1/organizations`
- `GET /api/v1/onboarding?status=&start=&end=&orgId=`
- `GET /api/v1/onboarding/:id`
- `GET /api/v1/onboarding/export?status=&start=&end=&orgId=`
- `POST /api/v1/onboarding/:id/decision`
- `GET /api/v1/audit-logs?start=&end=&orgId=`

## Seed Data
- Static seed located in `data/seed.ts`
- Runtime mutable in-memory store located in `lib/data/store.ts`

## Testing
- Run tests:
	```bash
	npm run test
	```
- Coverage:
	```bash
	npm run test:coverage
	```

## Architecture Notes
See `docs/architecture-notes.md`.
