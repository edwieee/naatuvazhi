# Nattuvazhi — Data Import & Ingestion Guide

**Target System:** Supabase Postgres (`ccmdiokhunvhwdmvsvop`)  
**Ingestion Scripts:** `scripts/seed.ts`  

---

## 1. Principles of Cultural Ingestion

To maintain historical authenticity and respect for sacred traditions:
1. **No Fabricated Information:** Every record must be derived from verified folklore academy monographs, gazetteers, or hereditary custodian statements.
2. **Traceable Citations:** Every published listing and event must include at least one verifiable primary source URL, book, or archive reference.
3. **Geographic Precision:** Coordinates must represent real sanctums, kalaris, or guild workshops.
4. **Licensing Compliance:** Photographic assets must carry explicit Creative Commons, Open Archive, or custodian consent attribution.

---

## 2. Ingestion Format Specification

Bulk imports can be formatted as JSON or CSV matching the database schema:

```json
[
  {
    "slug": "unique-kebab-slug",
    "name": "English Entity Name",
    "nameMalayalam": "മലയാളം പേര്",
    "category": "Ritual Art",
    "artForm": "Specific Art Form",
    "district": "Kannur",
    "locality": "Village or Locality",
    "address": "Full Physical Descriptor",
    "coordinates": { "lat": 11.9867, "lng": 75.3942 },
    "shortDescription": "1-2 sentence card summary.",
    "fullStory": "Comprehensive ethnographic narrative.",
    "culturalSignificance": "Historical context and living tradition.",
    "visitorProtocol": "Sacred guidelines and dress code.",
    "imageUrl": "https://images.unsplash.com/...",
    "imageCredit": "Photo attribution / License",
    "verificationStatus": "Verified",
    "verifiedBy": "Reviewing scholar or body",
    "sourceCitations": [
      {
        "title": "Document Title",
        "authorOrArchive": "Institution or Author",
        "year": "2023",
        "url": "https://..."
      }
    ],
    "featured": true,
    "tags": ["Theyyam", "Ritual Art", "Kannur"]
  }
]
```

---

## 3. Running Automated Seed & Import

Ensure `.env.local` contains valid credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://ccmdiokhunvhwdmvsvop.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key # optional for admin bulk-write
```

Execute the automated seed script:
```bash
npx tsx scripts/seed.ts
```
