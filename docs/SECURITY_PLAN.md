# Nattuvazhi — Security & Row Level Security (RLS) Plan

**Target Database:** Supabase (`Nattuvazhi` — `ccmdiokhunvhwdmvsvop`)  
**Security Status:** RLS Active on all 9 tables  

---

## 1. Threat Model & Security Posture

Nattuvazhi serves as a public open cultural archive while protecting:
1. **Curatorial Integrity:** Public visitors cannot modify published listings, tamper with coordinates, or alter festival dates.
2. **Community Privacy:** Submissions pending review and internal curator field notes are protected by strict RLS policies.
3. **Traceability:** All moderation decisions are logged immutably in `review_logs`.

---

## 2. Row Level Security (RLS) Matrix

| Table | Policy Name | Operation | Target Role | Security Filter / Check |
|---|---|---|---|---|
| `districts` | Public can view all districts | SELECT | `public` / `anon` | `true` |
| `districts` | Authenticated users can modify districts | ALL | `authenticated` | `true` |
| `categories` | Public can view all categories | SELECT | `public` / `anon` | `true` |
| `categories` | Authenticated users can modify categories | ALL | `authenticated` | `true` |
| `listings` | Public can view published listings | SELECT | `public` / `anon` | `publication_status = 'published'` |
| `listings` | Authenticated users can manage listings | ALL | `authenticated` | `true` |
| `events` | Public can view published events | SELECT | `public` / `anon` | `publication_status = 'published'` |
| `events` | Authenticated users can manage events | ALL | `authenticated` | `true` |
| `sources` | Public can view sources for published records | SELECT | `public` / `anon` | Linked parent is `published` |
| `media` | Public can view media for published records | SELECT | `public` / `anon` | Linked parent is `published` |
| `submissions` | Public can insert submissions | INSERT | `public` / `anon` | `true` |
| `submissions` | Authenticated users can view submissions | SELECT | `authenticated` | `true` |
| `submissions` | Authenticated users can manage submissions | UPDATE | `authenticated` | `true` |
| `submissions` | Authenticated users can delete submissions | DELETE | `authenticated` | `true` |
| `review_logs` | Authenticated users can view review logs | SELECT | `authenticated` | `true` |
| `review_logs` | Authenticated users can insert review logs | INSERT | `authenticated` | `true` |
| `homepage_config` | Public can view homepage config | SELECT | `public` / `anon` | `true` |
| `homepage_config` | Authenticated users can manage homepage config | ALL | `authenticated` | `true` |

---

## 3. Storage Security Policies

- **`cultural-media` Bucket (Public Read):**
  - Public can read images attached to published records.
  - Only authenticated curators can upload, replace, or delete photos.
- **`submission-attachments` Bucket (Private):**
  - Public can upload attachments through the `/contribute` form (restricted to 10MB).
  - Public cannot list or download files from this bucket.
  - Curators can inspect uploaded proof documents during accession review.

---

## 4. API & Environment Variable Safety

- `NEXT_PUBLIC_SUPABASE_URL`: Safe for browser exposure.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Safe for browser exposure; restricted by Row Level Security.
- `SUPABASE_SERVICE_ROLE_KEY`: **Never exposed to client code**. Used strictly in server actions and backend scripts.
