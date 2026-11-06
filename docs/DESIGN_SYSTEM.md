# Design System: Nattuvazhi

A bespoke design system rooted in Kerala's living heritage, synthesized from the minimal, calm UI patterns of the reference application and the provided 6-color palette.

---

## 1. Color Tokens

| Token Name | Hex Code | RGB | Role & Usage |
|---|---|---|---|
| `--color-canvas` | `#F5F5F5` | `245, 245, 245` | Main application background, light surface cards |
| `--color-canvas-card` | `#FFFFFF` | `255, 255, 255` | Elevated card surfaces, floating nav background |
| `--color-gold` | `#FFB658` | `255, 182, 88` | Number badges (01, 02), highlights, subtle chip backgrounds |
| `--color-warm-orange` | `#FF9041` | `255, 144, 65` | Primary CTA buttons, interactive active states, focus rings |
| `--color-coral` | `#FF5931` | `255, 89, 49` | High-visibility alerts, live event markers, category badges |
| `--color-deep-red` | `#B21C01` | `178, 28, 1` | Verification stamps, editorial focal accents, critical badges |
| `--color-text-primary`| `#111111` | `17, 17, 17` | High-contrast body, bold headings, dark contrast cards |
| `--color-text-muted` | `#666666` | `102, 102, 102`| Supporting labels, timestamps, metadata, captions |
| `--color-border-subtle`| `#E7E5E4` | `231, 229, 228`| Crisp micro-borders on cards and inputs |

---

## 2. Typography

- **Primary Sans Font**: Clean, modern sans-serif (Inter / Geist / system UI) with crisp kerning and generous x-height.
- **Regional Script**: Malayalam (Anek Malayalam, Noto Sans Malayalam, Manjari fallback) for authentic bilingual discovery.
- **Hierarchy Scale**:
  - `Display 1` (`text-4xl md:text-5xl lg:text-6xl`, font-bold, leading-[1.1]): Hero punchline
  - `Display 2` (`text-2xl md:text-3xl`, font-bold, leading-tight): Section headings
  - `Title 1` (`text-xl font-semibold`, leading-snug): Card titles, modal headers
  - `Title 2` (`text-base font-semibold`): Sub-headers, filter categories
  - `Body` (`text-sm md:text-base font-normal`, leading-relaxed): Narratives, stories, descriptions
  - `Micro / Tag` (`text-xs font-medium uppercase tracking-wider`): Badges, status, dates, numbers

---

## 3. Core Component Patterns

### 3.1 Floating Pill Navigation (`Navbar`)
- Container: `rounded-full bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-sm px-6 py-3`
- Positioning: Centered floating pill with `sticky top-4 z-50 max-w-5xl mx-auto`
- Elements: Brand icon + title, nav items with Lucide icons, language toggle pill (`rounded-full bg-stone-100 hover:bg-stone-200 text-xs px-3 py-1.5`)

### 3.2 Pill Buttons
- **Primary**: `rounded-full bg-[#FF9041] hover:bg-[#e67c30] text-white font-medium px-6 py-2.5 transition-all shadow-sm hover:shadow flex items-center gap-2`
- **Secondary**: `rounded-full border border-stone-300 hover:border-stone-800 bg-white/80 hover:bg-white text-stone-900 font-medium px-6 py-2.5 transition-all flex items-center gap-2`
- **Heritage Action**: `rounded-full bg-[#B21C01] hover:bg-[#961700] text-white font-medium px-6 py-2.5 flex items-center gap-2`

### 3.3 Status Badges
- **Verified**: `inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200`
- **Scholar Reviewed**: `inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200`
- **Community Pending**: `inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-orange-50 text-orange-800 border border-orange-200`

### 3.4 Workflow Step Cards
- Container: `rounded-3xl bg-white border border-stone-200/80 p-6 md:p-8 flex flex-col justify-between hover:shadow-md transition-shadow`
- Step index: `text-xs font-mono font-bold text-[#FF9041] tracking-widest`
- Icon container: `w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF9041]`

### 3.5 Explore Split Layout
- **Container**: `h-[calc(100vh-5rem)] flex flex-col lg:flex-row overflow-hidden`
- **Directory Column**: `w-full lg:w-[45%] h-full overflow-y-auto px-4 md:px-6 py-4`
- **Map Column**: `w-full lg:w-[55%] h-full relative bg-stone-100 border-l border-stone-200`
- **Mobile Toggle**: Floating pill button centered at the bottom of the viewport on small screens.
