# Nattuvazhi — Frontend Implementation Walkthrough

**The Living Culture Map of Kerala**  
**Dedicated Project Workspace**: `C:\Users\Edwin Biju\OneDrive\Desktop\nattuvazhi`

---

## 1. Project Overview & Reference UI Adaptation

The frontend UI for Nattuvazhi has been built using **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Lucide React**, adapting the minimalist, calm, content-focused visual hierarchy from the provided reference application (**"eppo varum"**) and the supplied 6-color brand palette:

| Token Name | Hex Code | Visual Application in Nattuvazhi |
|---|---|---|
| **Off-White** | `#F5F5F5` | Primary light canvas, card containers, and negative space |
| **Golden Orange** | `#FFB658` | Number badges (`01`, `02`, `03`, `04`), accent highlights, and tag borders |
| **Warm Orange** | `#FF9041` | Primary CTA buttons, interactive active states, focus rings |
| **Coral** | `#FF5931` | High-visibility alerts, upcoming event markers, category tags |
| **Deep Red** | `#B21C01` | Verification stamps, brand focal points, editorial buttons |
| **Black / Deep Ink** | `#000000` / `#111111` | High-contrast typography, dark verified badges, and footers |

Documentation artifacts in the repository:
- `docs/REFERENCE_UI_ANALYSIS.md`
- `docs/DESIGN_SYSTEM.md`

---

## 2. Implemented Pages & Features

### 🏛️ Page 1: Homepage (`/`)
- **Floating Pill Navigation**: Sticky `rounded-full` header with subtle blur, NV brand seal, bilingual switcher (`മലയാളം` / `English`), and route links.
- **Hero Section**:
  - Eyebrow badge: `✦ MALAYALAM + ENGLISH · COMMUNITY-INFORMED`.
  - Headline: *"Discover the culture that lives around you."*
  - Dual pill actions: `Explore Kerala` (`#FF9041` solid fill) & `Contribute a discovery` (outline).
  - Trust checkmark: *"Human-checked with folklore archives & local elders before public discovery"*.
  - Right Preview Graphic: Layered coordinate grid paper with subtle organic amber glows, floating cultural itinerary card (*Parassini Muthappan Vellattam, Kalamandalam Koodiyattam, Aranmula Mirror Guild*), and an overlapping dark `VERIFIED LIVING ROUTE` card.
- **4-Step Workflow ("How it Works")**:
  - `01 Discover`, `02 Learn`, `03 Verify`, `04 Contribute` cards with accent number badges, soft tinted icon containers, and clean 2-line explanations.
- **Curated Discoveries**: Category filter tabs and rich discovery cards.
- **Cultural Events Row**: Date-stamped festival cards with timings, venue, and countdowns.
- **14 Districts Grid**: All 14 Kerala districts from Kasaragod to Thiruvananthapuram with native art form signatures.
- **Trust & Verification Charter**: 4-point verification architecture and community contribution banner.

---

### 🗺️ Page 2: Explore (`/explore`)
- **Desktop Split-Screen Architecture**:
  - **Left Panel (45%)**: Independently scrollable cultural directory.
    - Full-text search with bilingual placeholder.
    - Quick category chips (*Ritual Art, Sacred Space, Traditional Craft, Cultural Institution, Martial Tradition*).
    - Expandable filter drawer with **14 Districts selector**, **Verification status**, and **Sort By** controls.
    - Dynamic result counter and one-click "Reset filters".
    - Interactive listing cards with image thumbnail, category badge, Malayalam subtitle, and "Explore Story" action.
  - **Right Panel (55%)**: Fixed/Sticky realistic Kerala GIS vector map.
    - Kerala coastal geometry with Arabian Sea grid lines, Western Ghats hill shading, and district labels.
    - Interactive coordinate markers along the Kerala corridor.
    - Real-time bi-directional sync: Hovering or selecting a card highlights the map marker; clicking a marker opens an overlay preview drawer.
    - Zoom In (`+`), Zoom Out (`-`), and Reset View controls.
- **Mobile Responsive**: Dedicated floating **"View Map / View List"** pill button allowing seamless switching without compressing the split screen.

---

### 📖 Page 3: Cultural Detail (`/culture/[slug]`)
- Breadcrumbs navigation (`Home > Explore > [District] > [Name]`).
- Verification badge with reviewer seal and review timestamp.
- Hero photograph gallery with captions, photo credits, and licensing notices.
- Deep cultural narrative sections:
  - *Cultural Overview* callout
  - *Living Tradition & Lineage* (multi-paragraph background story)
  - *Cultural Significance* & *Visitor Protocol & Etiquette* cards
  - *Original Source Citations & Archival References* list
- Sidebar with geographic coordinates, link to Kerala map, official website link, contributor attribution badge, and "Suggest Factual Correction" action.
- Related cultural discoveries in the same district.

---

### 🥁 Page 4: Events Directory & Event Detail (`/events` & `/events/[slug]`)
- **Events Directory (`/events`)**:
  - Filter by category, 14 districts, and timeframe (*All, Confirmed Upcoming, Annual Season*).
  - Date blocks, timings, venue, organizer credentials, and last-confirmed timestamps.
- **Event Detail (`/events/[slug]`)**:
  - Full ritual context, chronological schedule timeline (e.g. *Kanimangalam Sastha entry, Madathil Varavu, Ilanjithara Melam, Kudamattam*), venue protocol, and external official announcement link.

---

### ✍️ Page 5: Community Contribution (`/contribute`)
- Multi-category submission toggle: *Cultural Place*, *Artist / Practitioner*, *Group / Institution*, *Cultural Event*, *Factual Correction*.
- Structured fields: Name (English & Malayalam), Art Form, District, Locality, Address, Description, Cultural Background.
- File upload dropzone with live image preview and photographer credit input.
- Real-time client-side validation for mandatory fields.
- Designed **Submission Success State** showing unique reference code (`NV-2026-XXXX`) and verification timeline instructions.

---

### 🛡️ Pages 6, 7 & 8: Admin Moderation Suite
- **Admin Login (`/admin/login`)**: Minimalist curator authentication interface with demonstration role switcher.
- **Moderation Dashboard (`/admin`)**:
  - Overview metric cards (*Pending Review, Approved This Month, Changes Requested, Active Events*).
  - Status queue tabs (*All, Pending, Approved, Changes Requested*).
  - Searchable submissions table with urgency indicators, district badges, and review triggers.
- **Submission Review Panel (`/admin/review/[id]`)**:
  - Submitted narrative, provided source citations, and contributor details.
  - Interactive **4-Point Verification Checklist** (geographical coordinates, archival backing, media copyright, ritual privacy).
  - Reviewer field notes textarea.
  - Action buttons: `Approve & Publish to Living Map`, `Request Corrections`, and `Reject`.

---

## 3. How to Run Locally

```powershell
cd "C:\Users\Edwin Biju\OneDrive\Desktop\nattuvazhi"
npm run dev
```

Then open `http://localhost:3000` in your web browser.
