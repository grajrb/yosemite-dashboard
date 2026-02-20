# Architecture Notes

## Why this data model
- Kept domain objects explicit (`analytics`, `onboarding`, `audit`, `organizations`) to mirror likely production service boundaries.
- `AnalyticsDailyRecord` stores source-level daily events, so KPI, trend, and source split can be derived from one stream.
- `OnboardingQueueItem` embeds clinic profile + docs for frontend-heavy workflows without extra joins.
- `AuditLogEntry` is append-only and keyed by action/entity for traceability.

## Why this API shape
- Versioned routes under `/api/v1` provide stable contracts and make future backend split straightforward.
- Filtering uses query params (`start`, `end`, `orgId`, `status`) so tables/charts can share one fetch pattern.
- Decision endpoint is command-oriented (`POST /onboarding/[id]/decision`) because it captures an audited state transition.
- Responses are dashboard-friendly (`items` arrays, aggregated `kpis`, `timeseries`) to keep UI logic thin.

## Mock persistence strategy
- Uses module-level in-memory store seeded from static data.
- Fast for challenge/demo context while still supporting realistic state changes.
- Backend can be swapped to SQLite or external service behind same function contracts in `lib/data/store.ts`.
