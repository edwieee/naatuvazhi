# NATTUVAZHI — PRODUCTION RELEASE REPORT

**Date & Time**: 2026-11-09T01:05:00+05:30  
**Project**: Nattuvazhi (നാട്ടുവഴി) — The Living Culture Map of Kerala  
**Environment**: Production Readiness Audit  
**Release Engineer**: Autonomous Lead Engineer

---

## 1. Executive Summary

| Verification Area | Status | Notes |
|---|---|---|
| **Production Build (`npm run build`)** | **PASS** | Optimized Turbopack build succeeds with zero errors across all 38 routes |
| **TypeScript Compilation (`tsc --noEmit`)** | **PASS** | 0 type errors across codebase |
| **ESLint (`npm run lint`)** | **WARNING** | Standard Next.js TS strict `no-explicit-any` rules on legacy seed scripts; non-blocking for production runtime |
| **Supabase Connectivity** | **PASS** | Connected to live dedicated project `ccmdiokhunvhwdmvsvop` |
| **Security & RLS Policies** | **PASS** | Public can only INSERT to `submissions` as 'Pending'; private submissions hidden; only authenticated curators can moderate |
| **OpenStreetMap Rendering** | **PASS** | Geographic tiles, custom red/amber pins, popups, and district synchronization fully operational |
| **Living Event Quality** | **PASS** | Past events archived; 9 confirmed future 2026–2027 festivals indexed with coordinates and Devaswom citations |
| **Media & Storage Pipeline** | **PASS** | Direct file upload to `contributions` storage bucket active; eliminated base64 blobs in database URL columns |
| **Route Verification** | **PASS** | All 9 primary routes verified and responsive across mobile, tablet, and desktop |
| **Deployment Readiness** | **PASS** | Ready for automated deployment via GitHub push to Vercel production |

---

## 2. Route Verification Matrix

| Route | Route Type | Status | Verified Functionality |
|---|---|---|---|
| `/` | Static / PPR | **PASS** | Hero section, halftone canvas, cultural cards, upcoming events row, Malayalam language toggle |
| `/explore` | Dynamic Client | **PASS** | OpenStreetMap Leaflet client, cultural listings, upcoming event pins, category & district filters |
| `/culture/[slug]` | SSG / ISR | **PASS** | Verified dossiers, visitor protocols, image galleries, citations for all 8 core traditions |
| `/events` | Dynamic Client | **PASS** | Upcoming & Past tabs, category chips, district filters, valid date ordering |
| `/events/[slug]` | SSG / ISR | **PASS** | Full event schedule, venue coordinates, Devaswom announcement links |
| `/contribute` | Client Form | **PASS** | No-login public submission form, Supabase Storage photo upload, accession ID generation |
| `/admin/login` | Client Auth | **PASS** | Supabase Auth login form, evaluation demo credentials with copy buttons |
| `/admin` | Server + Client | **PASS** | Curator moderation queue, listings CRUD, event manager, audit history |
| `/admin/review/[id]` | Server + Client | **PASS** | Deep accession inspection, approval with automatic directory publication, rejection with curator notes |

---

## 3. Database & Supabase Security Audit

- **Live Project**: `ccmdiokhunvhwdmvsvop.supabase.co`
- **Tables Verified**: `districts`, `categories`, `listings`, `events`, `sources`, `media`, `submissions`, `review_logs`, `homepage_config`.
- **Public Contributions**: Anyone can submit via `/contribute`; submissions automatically default to `status = 'Pending'`. Public visitors cannot read pending submissions.
- **Moderation Workflow**: Peer review at `/admin/review/[id]` automatically resolves category IDs, associates coordinates, inserts media records with valid permission status (`Community Provided`), and publishes to `listings` or `events`.
- **Factual Corrections**: Verified updates update existing published listings without creating duplicate records.
- **Storage**: `contributions` bucket created and configured with public read access and validated image MIME types (`image/jpeg`, `image/png`, `image/webp`).

---

## 4. Map & Cartography Status

- **Engine**: Leaflet 1.9.4 with React-Leaflet 5.0.0.
- **Tile Provider**: `https://tile.openstreetmap.org/{z}/{x}/{y}.png` with mandatory OSM attribution.
- **Initial Viewport**: Centered on Kerala coordinates `[10.5276, 76.2144]`, zoom level 8.
- **Pins**:
  - Cultural places, sacred groves, master practitioners: Red pin (`#B21C01`).
  - Living festivals and cultural gatherings: Amber pin (`#D9531E`).
- **Interactive Popups**: Include title, Malayalam title, category, locality, district, date/status, and direct link to full dossier.

---

## 5. Event Data Status (Platform Baseline: November 2026)

All upcoming festivals have verified future dates and authentic venue coordinates:
1. **Beemapally Uroos**: Nov 14–24, 2026 (Thiruvananthapuram)
2. **Kalpathi Ratholsavam**: Nov 15–17, 2026 (Palakkad)
3. **Guruvayur Ekadasi**: Nov 20, 2026 (Thrissur)
4. **President's Trophy Boat Race**: Nov 28, 2026 (Kollam)
5. **Vaikathashtami**: Dec 02, 2026 (Kottayam)
6. **Puthari Thiruvappana**: Dec 11–13, 2026 (Kannur)
7. **Cochin Carnival**: Dec 20, 2026 – Jan 01, 2027 (Ernakulam)
8. **Mahamagham Festival**: Jan 18 – Feb 02, 2027 (Malappuram)
9. **Attukal Pongala**: Feb 21, 2027 (Thiruvananthapuram)

Past events (such as Thrissur Pooram April 2026) are preserved in the database and accessible via the **Past Events** archive tab.

---

## 6. Next Steps for Production Deployment

1. **GitHub Synchronization**:
   Push latest commits to `origin/main` on `https://github.com/edwieee/naatuvazhi.git`.
2. **Vercel Production Deployment**:
   If Vercel is connected to the GitHub repository, pushing to `main` triggers an automatic production build and deployment.
   If deploying via CLI, run `npx vercel --prod` after authenticating with `vercel login`.
3. **Environment Variables on Vercel Dashboard**:
   Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are configured under Project Settings > Environment Variables.
