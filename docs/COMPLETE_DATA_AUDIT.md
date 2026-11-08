# Nattuvazhi — Complete Project & Data Audit

**Project:** Nattuvazhi — The Living Culture Map of Kerala  
**Hackathon Track:** ART//CODE Hackathon — Track 5: The Living Culture Map  
**Audit Date:** March 2026 / 2026-11-08  
**Architecture:** Next.js 16 (App Router) + React 19 + Tailwind CSS + Supabase Database & Auth  

---

## 1. Executive Summary

This comprehensive audit catalogs every page, component, data element, and content dependency across the Nattuvazhi codebase. It establishes the definitive mapping from current static/mock implementations to normalized, relational Supabase database tables, Row Level Security (RLS) policies, and Curatorial Content Management workflows.

---

## 2. Component & Page Data Mapping Table

| Page or Component | File Path | Data Currently Displayed | Required Supabase Table(s) | Editable Through Curator Portal |
|---|---|---|---|---|
| **Navigation Header** | `src/components/layout/Navbar.tsx` | Platform branding, navigation links (`/explore`, `/events`, `/contribute`, `/admin`), Malayalam toggle state | Interface layout (`static`) + Configurable banner notice from `homepage_config` | Notice banner only |
| **Hero Section** | `src/components/home/HeroSection.tsx` | Eyebrow badge ("Kerala cultural cartography · Public open archive"), Main headline ("Discover the culture that lives around you"), Subtitle copy, CTA buttons, Theyyam cultural artwork | `homepage_config` (keys: `hero_eyebrow`, `hero_headline`, `hero_subheadline`, `hero_cta_primary`, `hero_cta_secondary`) | Yes (via Portal → Homepage Management) |
| **Cultural Categories Grid** | `src/components/home/CulturalCategories.tsx` | 8 Category cards (Ritual Art, Sacred Space, Master Practitioner, Traditional Craft, Cultural Institution, Martial Tradition, Oral Heritage), Malayalam titles, listing counts, icon mapping | `categories` (relational table) + dynamic `count(listings.id)` where `publication_status = 'published'` | Yes (Categories management & active status) |
| **Featured Cultural Listings** | `src/components/home/FeaturedListings.tsx` | Curated listing cards (Parassini Theyyam, Kalamandalam, Aranmula Mirror, CVN Kalari, Chavittu Nadakam, Tholpavakoothu), title, category, district, locality, image, verification badge | `listings` joined with `districts`, `categories`, `media` where `featured = true` and `publication_status = 'published'` | Yes (Curators can toggle featured flag & reorder) |
| **Upcoming Events Row** | `src/components/home/UpcomingEventsRow.tsx` | Upcoming cultural events & festivals (Thrissur Pooram, Muthappan Vellattam, Nishagandhi, Aranmula Valla Sadya), date, venue, district, status, entry type | `events` joined with `districts` where `publication_status = 'published'` and `date >= CURRENT_DATE` ordered by `date ASC` | Yes (Create, edit date, verify, change status) |
| **District Selector / Geographic Registry** | `src/components/home/DistrictSelector.tsx` | 14 Kerala Districts grid, district codes, Malayalam names, cultural signatures, primary art forms, listing counts | `districts` table joined with live `count(listings.id)` grouped by district | Yes (District metadata & signatures editable by Admin) |
| **How It Works / Verification Pipeline** | `src/components/home/HowItWorks.tsx` | 4-step curation protocol (Discovery & Submission, Archival Corroboration, Hereditary Custodian Consent, Continuous Re-Verification) | `homepage_config` (key: `verification_pipeline_steps`) or static pedagogical UI | Yes (Configurable guidance text) |
| **Trust Section / Verification Charter** | `src/components/home/TrustSection.tsx` | Archival citations, verification principles, non-commercial pledge, partner institutions list | `homepage_config` (key: `trust_pledge_copy`, `partner_institutions`) | Yes (Charter text managed via Portal) |
| **Footer** | `src/components/layout/Footer.tsx` | Borderless 3-column layout (Brand info, Explore links, Community links), interactive Kerala cultural panorama dither canvas | Static layout & links + live total counts from `listings` & `events` | Yes (Verification statement & link destinations) |
| **Explore Directory & Map** | `src/app/explore/page.tsx` | Search input, Category filter pills, District dropdown, Verified-only filter, View switch (Grid vs Map), Interactive Leaflet/Canvas Kerala Map with markers, Listing cards | `listings` joined with `districts`, `categories`, `sources` with full-text search and coordinate spatial indexing | Yes (All listing data live from DB) |
| **Cultural Listing Detail Page** | `src/app/culture/[slug]/page.tsx` | Name, Malayalam name, category, art form, district, locality, address, coordinates, short description, full story, cultural significance, visitor protocol, primary hero image, photo gallery with captions & credits, verification status & verifier, last reviewed date, source citations with URLs, contributor attribution, related listings | `listings`, `districts`, `categories`, `media`, `sources`, `profiles` | Yes (Full CRUD: edit descriptions, coordinates, gallery, sources, verify) |
| **Cultural Calendar / Events Page** | `src/app/events/page.tsx` | Search input, Month/Date filters, District filter, Category filter, Status filter (Confirmed/Tentative/Annual), Event cards with dates, venues, organizers, verification indicators | `events` joined with `districts`, `sources` with chronological sorting | Yes (Full CRUD: update dates, reschedule, verify, cancel) |
| **Event Detail Page** | `src/app/events/[slug]/page.tsx` | Event title, Malayalam title, category, art form, confirmed date/time, venue, address, organizer contact/website, full cultural description, historical context, schedule highlights timeline, original source link, last verified date, entry type | `events`, `districts`, `sources`, `media` | Yes (Full CRUD: edit schedule, add announcements, refresh verification) |
| **Community Contribution Form** | `src/app/contribute/page.tsx` | Submission type selector, entity name, art form, district selector, locality/landmarks, detailed narrative, cultural significance, published citations/sources, contributor name & email, rights & consent checkboxes | `submissions` table (with status = `'pending'`, client IP/contributor session tracking) | Public submissions flow into Curator Review Queue |
| **Curator Dashboard** | `src/app/admin/page.tsx` | Metrics overview (Pending review, Approved this month, Changes requested, Seasonal festivals), Submissions review table, Search & filter by status | Live aggregation queries on `submissions`, `listings`, `events`, `review_logs` | Yes (Curator moderation dashboard) |
| **Curator Submission Review** | `src/app/admin/review/[id]/page.tsx` & `AdminReviewClient.tsx` | Complete accession details, source URL verification checklist, coordinates verification checklist, media permission checklist, reviewer notes, action buttons (Approve & Index, Request Changes, Reject) | `submissions`, `review_logs`, with transactional insertion into `listings` or `events` upon approval | Yes (Live moderation action) |

---

## 3. Data Field Requirements by Entity

### 3.1 Cultural Listings (`listings`)
- `id` (UUID, Primary Key)
- `slug` (VARCHAR, UNIQUE, Indexed) — e.g. `parassini-madappura-theyyam`
- `name` (VARCHAR) — English title
- `name_malayalam` (VARCHAR) — Malayalam title in Malayalam script
- `category_id` (UUID, Foreign Key → `categories.id`)
- `art_form` (VARCHAR) — Specific ritual or craft tradition
- `district_id` (UUID, Foreign Key → `districts.id`)
- `locality` (VARCHAR) — Village, town, or sacred precinct
- `address` (TEXT) — Full physical location descriptor
- `latitude` (DOUBLE PRECISION) — Spatial latitude
- `longitude` (DOUBLE PRECISION) — Spatial longitude
- `short_description` (TEXT) — 1-2 sentence card summary
- `full_story` (TEXT) — Multi-paragraph historical & ethnographic narrative
- `cultural_significance` (TEXT) — Anthropological, social, and subaltern context
- `visitor_protocol` (TEXT) — Sacred rules, dress code, photography policies, offerings
- `image_url` (TEXT) — Primary card/hero asset URL
- `image_credit` (TEXT) — Archival or photographer attribution
- `verification_status` (VARCHAR) — `'Verified'` | `'Scholar Reviewed'` | `'Community Pending'`
- `verified_by` (TEXT) — Reviewing scholar, institution, or folklore body
- `last_reviewed` (TIMESTAMPTZ) — Date of last verification check
- `official_website` (TEXT, Nullable)
- `contributor_name` (VARCHAR)
- `contributor_role` (VARCHAR)
- `contributor_submitted_at` (TIMESTAMPTZ)
- `featured` (BOOLEAN, Default `false`)
- `display_order` (INTEGER, Default `0`)
- `tags` (TEXT[]) — Searchable keywords
- `publication_status` (VARCHAR) — `'published'` | `'draft'` | `'archived'`
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

### 3.2 Events & Festivals (`events`)
- `id` (UUID, Primary Key)
- `slug` (VARCHAR, UNIQUE, Indexed) — e.g. `thrissur-pooram-ilanjithara-melam`
- `title` (VARCHAR)
- `title_malayalam` (VARCHAR)
- `category` (VARCHAR)
- `art_form` (VARCHAR)
- `event_date` (DATE, Indexed) — ISO-8601 calendar date
- `formatted_date` (VARCHAR) — Formatted label (e.g., "April 28, 2026")
- `time` (VARCHAR) — Daily or festival schedule (e.g. "06:00 AM – Next Dawn")
- `venue` (VARCHAR) — Temple maidan, amphitheater, or sacred grounds
- `district_id` (UUID, Foreign Key → `districts.id`)
- `locality` (VARCHAR)
- `address` (TEXT, Nullable)
- `organizer` (VARCHAR) — Devaswom, artisan council, or committee
- `description` (TEXT)
- `cultural_context` (TEXT)
- `source_link` (TEXT) — Primary verified source URL
- `last_confirmed_date` (TIMESTAMPTZ) — Verification timestamp
- `status` (VARCHAR) — `'Confirmed'` | `'Tentative'` | `'Annual Season'` | `'Cancelled'` | `'Postponed'`
- `publication_status` (VARCHAR) — `'published'` | `'draft'` | `'archived'`
- `image_url` (TEXT)
- `entry_type` (VARCHAR) — `'Free Entry'` | `'Pass Required'` | `'Ritual Offering'`
- `schedule_highlights` (JSONB) — Array of `{ "time": string, "item": string }`
- `featured` (BOOLEAN, Default `false`)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

### 3.3 Districts (`districts`)
- `id` (UUID, Primary Key)
- `name` (VARCHAR, UNIQUE) — Kasaragod to Thiruvananthapuram
- `name_malayalam` (VARCHAR)
- `code` (VARCHAR(3), UNIQUE) — e.g. `'KSD'`, `'TSR'`, `'TVM'`
- `center_lat` (DOUBLE PRECISION)
- `center_lng` (DOUBLE PRECISION)
- `cultural_signature` (TEXT)
- `primary_art_forms` (TEXT[])
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

### 3.4 Categories & Art Forms (`categories`)
- `id` (UUID, Primary Key)
- `slug` (VARCHAR, UNIQUE) — e.g. `'ritual-art'`, `'sacred-space'`
- `name` (VARCHAR)
- `name_malayalam` (VARCHAR)
- `description` (TEXT)
- `icon_name` (VARCHAR)
- `display_order` (INTEGER)

### 3.5 Relational Sources (`sources`)
- `id` (UUID, Primary Key)
- `listing_id` (UUID, Nullable, Foreign Key → `listings.id`)
- `event_id` (UUID, Nullable, Foreign Key → `events.id`)
- `submission_id` (UUID, Nullable, Foreign Key → `submissions.id`)
- `source_type` (VARCHAR) — `'Academic Archive'` | `'Official Website'` | `'Monograph'` | `'Gazetteer'` | `'Fieldwork'`
- `title` (TEXT)
- `author_or_archive` (TEXT)
- `year` (VARCHAR, Nullable)
- `url` (TEXT, Nullable)
- `description` (TEXT, Nullable)
- `checked_at` (TIMESTAMPTZ)
- `created_at` (TIMESTAMPTZ)

### 3.6 Media Assets (`media`)
- `id` (UUID, Primary Key)
- `listing_id` (UUID, Nullable, Foreign Key → `listings.id`)
- `event_id` (UUID, Nullable, Foreign Key → `events.id`)
- `submission_id` (UUID, Nullable, Foreign Key → `submissions.id`)
- `storage_path` (TEXT) — Supabase storage path or CDN reference
- `url` (TEXT)
- `caption` (TEXT)
- `credit` (TEXT)
- `photographer` (TEXT, Nullable)
- `permission_status` (VARCHAR) — `'CC-BY-NC'` | `'Institution Approved'` | `'Community Provided'`
- `display_order` (INTEGER, Default `0`)
- `created_at` (TIMESTAMPTZ)

### 3.7 Community Submissions (`submissions`)
- `id` (VARCHAR, Primary Key) — e.g. `'sub-101'` or UUID
- `type` (VARCHAR) — `'Place'` | `'Artist'` | `'Institution'` | `'Event'` | `'Correction'`
- `name` (VARCHAR)
- `art_form` (VARCHAR)
- `district_id` (UUID, Foreign Key → `districts.id`)
- `locality` (VARCHAR)
- `description` (TEXT)
- `cultural_significance` (TEXT)
- `sources` (TEXT[])
- `contributor_name` (VARCHAR)
- `contributor_email` (VARCHAR)
- `submitted_at` (TIMESTAMPTZ)
- `status` (VARCHAR) — `'Pending'` | `'Approved'` | `'Changes Requested'` | `'Rejected'`
- `reviewer_notes` (TEXT, Nullable)
- `urgency` (VARCHAR) — `'Low'` | `'Medium'` | `'High'`
- `rights_confirmed` (BOOLEAN, Default `true`)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

### 3.8 Curatorial Review Logs (`review_logs`)
- `id` (UUID, Primary Key)
- `submission_id` (VARCHAR, Nullable, Foreign Key → `submissions.id`)
- `listing_id` (UUID, Nullable, Foreign Key → `listings.id`)
- `event_id` (UUID, Nullable, Foreign Key → `events.id`)
- `reviewer_name` (VARCHAR)
- `reviewer_email` (VARCHAR)
- `action` (VARCHAR) — `'created'`, `'edited'`, `'date_updated'`, `'verified'`, `'approved'`, `'rejected'`, `'published'`, `'unpublished'`
- `notes` (TEXT)
- `previous_state` (JSONB, Nullable)
- `new_state` (JSONB, Nullable)
- `created_at` (TIMESTAMPTZ)

### 3.9 Homepage & System Configuration (`homepage_config`)
- `key` (VARCHAR, Primary Key) — e.g. `'hero_headline'`, `'featured_listing_ids'`, `'featured_event_ids'`
- `value_json` (JSONB)
- `updated_at` (TIMESTAMPTZ)
- `updated_by` (VARCHAR)

---

## 4. Hardcoded Elements vs Database-Managed Elements

### What Stays in Frontend Code:
1. **Design System & Layout:** Colors (`#fcfcec`, `#692820`, `#aa3000`), typography hierarchy, borderless editorial cards, responsiveness.
2. **Fixed Navigation Labels:** "Directory & Map", "Festivals", "Contribute", "Curator portal", language switcher.
3. **SVG & Interactive Canvas Effects:** Malayalam calligraphy badge, Kerala cultural panorama dither canvas (`kerala-heritage-scene.tsx`), halftone particle shaders.
4. **Client-side Form Validation Rules:** Email format regex, mandatory field checks, coordinate range bounds.

### What Moves to Supabase:
1. **All Cultural Content:** Every temple, sacred grove, practitioner guild, and Kalaripayattu lineage.
2. **All Festivals and Timelines:** Confirmed dates, schedule highlights, Devaswom links, verification status.
3. **All Sources & Academic References:** Monographs, Folklore Academy volumes, district gazetteers.
4. **All Media Gallery Records:** Photography URLs, captions, licensing and copyright credits.
5. **All Submissions & Moderation History:** Contributor submissions, reviewer checklists, and decision notes.
6. **Curated Homepage Highlights:** Curators can select which listings and events are featured on the home screen without redeploying code.
