# Nattuvazhi — OpenStreetMap Browser Rendering Diagnostic & Fix Report

**Report Date:** March 2026 / 2026-11-08  
**Scope:** Root cause diagnosis and complete fix for the blank OpenStreetMap section on `/explore`.

---

## 1. Executive Summary

The production build previously succeeded because Next.js TypeScript compilation and SSR pass without executing browser DOM code. However, in the real browser, the map remained completely invisible due to **two concurrent root causes**:
1. **Container Dimension Collapse (0px Height):** The Leaflet DOM container (`.leaflet-container`) had computed `height: 0px`. In CSS Flexbox, children with percentage heights (`height: 100%`) without `flex-1` and explicit min-height evaluate to 0 because Leaflet's tile panes are `position: absolute`.
2. **Next.js 16 Client-Side Dynamic Import Bailout:** Using `next/dynamic` with `{ ssr: false }` inside an already client-rendered component (`'use client'`) caused the component to suspend in Next.js 16 Partial Prerendering and keep the loading skeleton in place. Moving `leaflet/dist/leaflet.css` directly into `globals.css` and loading the map component via clean React `useEffect` client isolation resolved the evaluation delay.

Both issues have been resolved. Real OpenStreetMap tiles and custom cultural markers are now verified visible and fully interactive in the browser.

---

## 2. Exact Root Causes

| Issue | Impact | Technical Root Cause |
|---|---|---|
| **Collapsed Height** | Map was 0px tall | `div.leaflet-container` defaults to no height in `leaflet.css`. When wrapped in nested flex containers without `flex-1` and `min-height`, the container collapsed to `width: 660px, height: 0px`. |
| **CSS in Dynamic Chunk** | Dynamic import deadlock | Importing `leaflet/dist/leaflet.css` inside `OpenStreetMapClient.tsx` created an asynchronous CSS-chunk dependency that stalled Turbopack client module execution. |
| **Missing Map Size Invalidation** | Tiles not rendering | Leaflet calculates tile layout based on the DOM container size at mount. When mounted before flex layout fully settles, Leaflet requires `map.invalidateSize()` to recalculate tile grids. |

---

## 3. Files Changed

### `src/app/globals.css`
- Imported Leaflet stylesheet at the global level: `@import "leaflet/dist/leaflet.css";`.
- Enforced explicit dimensions on the Leaflet container:
```css
.leaflet-container {
  width: 100% !important;
  height: 100% !important;
  min-height: 480px !important;
  background-color: #F4F2EC !important;
  z-index: 10;
}
```

### `src/components/map/KeralaMap.tsx`
- Replaced `next/dynamic` with reliable client-side `useEffect` dynamic import to guarantee browser-only execution without triggering Next.js 16 Suspense bails.
- Added explicit wrapper with `w-full h-full flex-1 flex flex-col min-h-[480px]`.

### `src/components/map/OpenStreetMapClient.tsx`
- Removed local `import 'leaflet/dist/leaflet.css';` to prevent chunk loading deadlocks.
- Added `InvalidateSizeController` using Leaflet's `useMap()` hook to automatically call `map.invalidateSize()` on mount, after layout settlement (150ms and 500ms), and on window resize events.
- Added explicit inline and CSS `minHeight: '480px'` to `MapContainer`.

### `src/app/explore/page.tsx`
- Updated the right map panel column to include `flex-1 min-h-[480px] lg:min-h-0` to guarantee flex distribution height on both mobile and desktop views.

---

## 4. Verification Results

### A. Production Build Result
```bash
> next build
▲ Next.js 16.4.5 (Turbopack)
✓ Compiled successfully in 3.5s
✓ Finished TypeScript in 4.9s
✓ Generating static pages (28/28) in 6.7s
Exit Code: 0 (All 28 routes compiled cleanly)
```

### B. Browser DOM Measurement (Headless Edge Inspection)
```json
{
  "hasLeafletContainer": true,
  "containerInfo": {
    "width": 660,
    "height": 480,
    "top": 126.39,
    "left": 666.80,
    "computedHeight": "480px",
    "computedWidth": "660px"
  },
  "tileCount": 12,
  "markerCount": 8,
  "hasSkeleton": false
}
```

### C. OpenStreetMap Tile Network Requests
All standard OSM tile requests succeeded with HTTP 200:
- `https://tile.openstreetmap.org/8/181/120.png` [200 OK]
- `https://tile.openstreetmap.org/8/182/120.png` [200 OK]
- `https://tile.openstreetmap.org/8/181/119.png` [200 OK]
- `https://tile.openstreetmap.org/8/182/119.png` [200 OK]
- `https://tile.openstreetmap.org/8/181/121.png` [200 OK]
- `https://tile.openstreetmap.org/8/182/121.png` [200 OK]
- `https://tile.openstreetmap.org/8/180/120.png` [200 OK]
- `https://tile.openstreetmap.org/8/183/120.png` [200 OK]
- `https://tile.openstreetmap.org/8/180/119.png` [200 OK]
- `https://tile.openstreetmap.org/8/183/119.png` [200 OK]
- `https://tile.openstreetmap.org/8/180/121.png` [200 OK]
- `https://tile.openstreetmap.org/8/183/121.png` [200 OK]

### D. Interactive Bi-Directional Functionality
- **Marker Click:** Clicking marker #1 (Parassini Madappura Muthappan Sthanam) animated camera flyTo to `[11.9867, 75.3942]`, opened popup with entity preview and "Explore Story & Protocol" link, and auto-scrolled the left directory panel to highlight the card.
- **Directory Click:** Clicking directory cards flies to the corresponding coordinates and opens popup preview.
- **Controls:** Custom Zoom In (+), Zoom Out (-), and Reset view to Kerala work smoothly.
