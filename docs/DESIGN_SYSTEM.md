# Design System: Nattuvazhi

A bespoke design system rooted in Kerala's living heritage, synthesized from archival material culture (laterite stone, aged palm-leaf manuscripts, temple woodwork, raw brass) and the Unslop craft methodology.

---

## 1. Color Tokens & Neutral Ramp

### Warm Archival Ramp
| Role | Hex Code | Token | Usage |
|---|---|---|---|
| **Canvas / Base** | `#FBF9F5` | `--color-canvas` | Main page background |
| **Card / Surface** | `#FFFFFF` | `--color-surface` | Primary content cards, directory panels |
| **Muted Surface** | `#F3EFE8` | `--color-surface-muted` | Controls, button backgrounds, inputs |
| **Elevated Surface** | `#F8F5EE` | `--color-surface-elevated`| Table headers, card footers, survey blocks |
| **Hairline Border** | `#E8E2D6` | `--color-border` | Quiet 1px borders (8–10% opacity equivalent) |
| **Primary Ink** | `#181512` | `--color-ink-primary` | High-contrast text, primary headings |
| **Secondary Ink** | `#5C554B` | `--color-ink-secondary`| Body paragraphs, descriptions |
| **Muted Ink** | `#8C8273` | `--color-ink-muted` | Metadata, accession IDs, captions |

### Intentional Accents
- **Temple Terracotta** (`#B21C01` / hover `#961700`): Single primary action accent, active map marker, verified seals.
- **Warm Ochre** (`#D97706`): Secondary status highlights, review urgency.
- **Forest Green** (`#2D6A4F`): Verified status tag.

---

## 2. Typography & Hierarchy

- **Primary Interface Font**: Geist Sans / Inter with clean tracking and natural kerning.
- **Regional Script**: Malayalam (Anek Malayalam, Noto Sans Malayalam) for regional cultural script.
- **Hierarchy Scale**:
  - `Display / Hero` (`text-4xl sm:text-5xl lg:text-[3.5rem]`, font-semibold (600), leading-[1.1]): Hero statement
  - `Section Title` (`text-2xl sm:text-3xl`, font-semibold (600), leading-snug): Grouping headings
  - `Card Title` (`text-base font-semibold`): Listing titles, event headings
  - `Body Text` (`text-xs sm:text-sm font-normal`, leading-relaxed): Narratives, background stories
  - `Archival Signature` (`font-mono text-xs text-[#8C8273] tabular-nums`): Survey IDs, timestamps, coordinates

---

## 3. Component Geometry & Nested Radii

- **Nested Radius Rule**: `Inner = Outer − Padding`, never below 4px.
  - Controls, inputs, and small buttons: `rounded-md` (6–8px)
  - Content cards: `rounded-xl` (12–14px)
  - Large panels (Directory shell, Map canvas): `rounded-xl` (14–18px)
- **Buttons**:
  - Primary: `rounded-md bg-[#B21C01] hover:bg-[#961700] text-white font-medium text-xs sm:text-sm px-6 py-2.5 transition-colors shadow-xs`
  - Secondary: `rounded-md border border-[#E8E2D6] hover:border-[#181512] bg-white hover:bg-[#F3EFE8] text-[#181512] font-medium text-xs sm:text-sm px-5 py-2.5 transition-colors`
- **Signature Detail**:
  Archival Accession Number (`№ KL-TSR-024`) anchored to every cultural listing and survey card in muted monospace.
