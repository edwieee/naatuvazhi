# Nattuvazhi — Frontend Data Mapping & Next.js Integration

**Project:** Nattuvazhi — The Living Culture Map of Kerala  
**Target Database:** Supabase (`Nattuvazhi` — `ccmdiokhunvhwdmvsvop`)  
**Architecture:** Next.js 16 App Router (React 19) + Unified Resilient Data Access Layer (`src/lib/supabase/data-service.ts`)  

---

## 1. Unified Architecture Overview

Nattuvazhi implements an architecture that decouples frontend presentation from the underlying database driver while guaranteeing:
1. **Single Source of Truth:** All content is managed through the relational Supabase schema.
2. **Next.js Cache Revalidation:** Curatorial actions automatically trigger `revalidatePath` on relevant routes (`/`, `/explore`, `/events`, `/culture/[slug]`, `/events/[slug]`, `/admin`).
3. **Zero-Downtime Fallback:** If environment variables or network connections are momentarily unavailable, the system transparently utilizes curated in-memory datasets so the build never fails and visitors experience zero 500 errors.

---

## 2. Route-by-Route Data Mapping

### 2.1 Homepage (`src/app/page.tsx`)
- **Route:** `/`
- **Render Mode:** Dynamic Server-Rendered Component with ISR revalidation
- **Data Dependencies:**
  - `homepage_config`: retrieves `hero_headline`, `hero_subheadline`, `featured_listing_slugs`, `featured_event_slugs`.
  - `listings`: retrieves listings where `featured = true` and `publication_status = 'published'` (max 6).
  - `events`: retrieves upcoming events where `event_date >= CURRENT_DATE` ordered chronologically.
  - `districts`: retrieves all 14 districts with live counts of published listings.

### 2.2 Cultural Directory & Interactive Map (`src/app/explore/page.tsx`)
- **Route:** `/explore`
- **Render Mode:** Interactive Client View with Server Initial Data
- **Data Dependencies:**
  - `listings`: full table with spatial coordinates (`latitude`, `longitude`), `art_form`, `district`, `category_id`, `verification_status`.
  - `districts`: 14 Kerala districts for the regional filter dropdown.
  - `categories`: 8 cultural dimensions for taxonomy filter pills.
- **Search Capabilities:** Client and server-side text matching on title, Malayalam title, tradition, and locality.

### 2.3 Cultural Listing Detail Page (`src/app/culture/[slug]/page.tsx`)
- **Route:** `/culture/[slug]`
- **Render Mode:** Server Component with dynamic route parameter
- **Data Dependencies:**
  - `listings`: single record by `slug`.
  - `sources`: all citations linked by `listing_id`.
  - `media`: photo gallery items linked by `listing_id` ordered by `display_order`.
  - `districts`: host district metadata for regional context.
  - Related listings: 3 listings sharing the same district or category.

### 2.4 Cultural Calendar (`src/app/events/page.tsx`)
- **Route:** `/events`
- **Render Mode:** Interactive filtering view
- **Data Dependencies:**
  - `events`: filtered by `publication_status = 'published'`.
  - Filters: District, Category, Timeframe (All, Upcoming, Annual Season).
  - Sorting: Ascending calendar order (`event_date ASC`).

### 2.5 Event Detail Page (`src/app/events/[slug]/page.tsx`)
- **Route:** `/events/[slug]`
- **Render Mode:** Server Component
- **Data Dependencies:**
  - `events`: single record by `slug`.
  - `sources`: official announcement links and verification history.
  - `schedule_highlights`: JSONB timeline highlights.

### 2.6 Community Contribution Portal (`src/app/contribute/page.tsx`)
- **Route:** `/contribute`
- **Render Mode:** Client Form with Server Action submission
- **Data Destination:**
  - Inserts directly into `submissions` table with status `'Pending'`.
  - Dispatches immediate accession tracking code to contributor.

### 2.7 Curator Portal (`src/app/admin/page.tsx`)
- **Route:** `/admin`
- **Render Mode:** Authenticated Curation Management Console
- **Capabilities:**
  - **Submissions Tab:** Filter by status, review checklist, one-click conversion to live published listing.
  - **Listings Tab:** Create, edit, toggle featured, unpublish, archive.
  - **Events Tab:** Add festivals, edit dates, quick-verify against official announcements.
  - **Homepage Tab:** Edit platform copy and headline text.
  - **Audit Logs Tab:** Review complete history of changes.

---

## 3. TypeScript Type Correspondence

| TypeScript Interface (`src/lib/types.ts`) | Supabase Database Table | Notes |
|---|---|---|
| `CulturalListing` | `listings` | Relational join with `districts`, `categories`, `sources`, `media` |
| `EventListing` | `events` | Relational join with `districts`, `sources` |
| `DistrictInfo` | `districts` | Computed `listingCount` via group by `listings.district_id` |
| `SourceCitation` | `sources` | Relational child table |
| `SubmissionReviewItem` | `submissions` | Moderation queue |
| `ReviewLog` | `review_logs` | Immutable audit log |
| `HomepageConfig` | `homepage_config` | Key-value store |
