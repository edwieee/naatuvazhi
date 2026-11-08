"use client"

import * as React from "react"

export interface CulturalHotspot {
  id: string
  name: string
  label: string
  location: string
  detail: string
  x: number // percentage 0 - 100
  y: number // percentage 0 - 100
  align?: "left" | "center" | "right"
}

export const CULTURAL_HOTSPOTS: CulturalHotspot[] = [
  {
    id: "nalukettu",
    name: "Traditional Nalukettu",
    label: "Heritage architecture · Kerala",
    location: "Kerala",
    detail: "Ancestral courtyard homestead (Tharavadu)",
    x: 11.2,
    y: 65.0,
    align: "left",
  },
  {
    id: "kathakali",
    name: "Kathakali performer",
    label: "Kathakali · Kerala",
    location: "Kerala",
    detail: "Classical stylized dance-drama & Mudras",
    x: 23.05,
    y: 54.3,
    align: "center",
  },
  {
    id: "elephant",
    name: "Traditional elephant",
    label: "Temple traditions · Kerala",
    location: "Kerala",
    detail: "Caparisoned Gajaveerans & Nettipattam",
    x: 31.74,
    y: 61.1,
    align: "center",
  },
  {
    id: "temple",
    name: "Traditional temple",
    label: "Temple architecture · Kerala",
    location: "Kerala",
    detail: "Dravidian Gopuram & Vastu craftsmanship",
    x: 38.67,
    y: 56.6,
    align: "center",
  },
  {
    id: "nilavilakku",
    name: "Nilavilakku",
    label: "Traditional lamp · Kerala",
    location: "Kerala",
    detail: "Sacred bell-metal oil lamp of auspicious light",
    x: 42.97,
    y: 62.4,
    align: "center",
  },
  {
    id: "snakeboat",
    name: "Snake boat",
    label: "Vallam Kali · Alappuzha",
    location: "Alappuzha",
    detail: "Chundan Vallam boat race & Vanchipattu",
    x: 52.25,
    y: 73.3,
    align: "center",
  },
  {
    id: "theyyam",
    name: "Theyyam performer",
    label: "Theyyam · Kannur",
    location: "Kannur",
    detail: "Ritual invocation of deities & cosmic spirits",
    x: 69.82,
    y: 52.0,
    align: "center",
  },
  {
    id: "lighthouse",
    name: "Lighthouse",
    label: "Coastal heritage · Kerala",
    location: "Kerala",
    detail: "Historic maritime spice trade beacon",
    x: 91.99,
    y: 38.5,
    align: "right",
  },
]

// 8x8 Bayer matrix thresholds in (0, 1)
const BAYER_8X8 = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26,
  12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25,
  15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
].map((v) => (v + 0.5) / 64)

function hash(x: number, y: number, seed: number) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(seed | 0, 1442695041)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  h ^= h >>> 16
  return (h >>> 0) / 4294967296
}

function noise(x: number, y: number, seed: number) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  const a = hash(xi, yi, seed)
  const b = hash(xi + 1, yi, seed)
  const c = hash(xi, yi + 1, seed)
  const d = hash(xi + 1, yi + 1, seed)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}

function fbm(x: number, y: number, seed: number, octaves: number) {
  let sum = 0
  let amp = 0.5
  let norm = 0
  for (let o = 0; o < octaves; o++) {
    sum += noise(x, y, seed + o * 31) * amp
    norm += amp
    x *= 2.03
    y *= 2.03
    amp *= 0.5
  }
  return norm > 0 ? sum / norm : 0
}

function smoothstep(e0: number, e1: number, x: number) {
  const t = e1 === e0 ? (x < e0 ? 0 : 1) : Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

function easeOutCubic(t: number) {
  const c = t < 0 ? 0 : t > 1 ? 1 : t
  return 1 - Math.pow(1 - c, 3)
}

export interface KeralaHeritageSceneProps {
  /** Paper color matching footer background. Defaults to '#f6f3eb' */
  paperColor?: string
  /** Accent maroon ink color. Defaults to '#692820' */
  inkColor?: string
  /** Initial mist thickness 0 - 1. Defaults to 0.45 */
  mistDensity?: number
  /** Mist drift speed. Defaults to 1 */
  driftSpeed?: number
  /** Pointer clearing radius in CSS px. Defaults to 125 */
  clearingRadius?: number
  /** Custom hotspots if provided */
  hotspots?: CulturalHotspot[]
  /** Extra class names */
  className?: string
}

export default function KeralaHeritageScene({
  paperColor = "#f6f3eb",
  inkColor = "#692820",
  mistDensity = 0.45,
  driftSpeed = 1,
  clearingRadius = 125,
  hotspots = CULTURAL_HOTSPOTS,
  className = "",
}: KeralaHeritageSceneProps) {
  const sceneRef = React.useRef<HTMLDivElement | null>(null)
  const artworkRef = React.useRef<HTMLDivElement | null>(null)
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const revealAt = React.useRef<number | null>(null)

  const [activeHotspotId, setActiveHotspotId] = React.useState<string | null>(null)
  const [pinnedHotspotId, setPinnedHotspotId] = React.useState<string | null>(null)

  // Options ref to avoid recreation of canvas loop on re-render
  const opts = React.useRef({ mistDensity, driftSpeed, clearingRadius })
  opts.current = { mistDensity, driftSpeed, clearingRadius }

  // Canvas animation and pointer interactions
  React.useEffect(() => {
    const scene = sceneRef.current
    const artwork = artworkRef.current
    const canvas = canvasRef.current
    if (!scene || !artwork || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Cream mist tone in little-endian packed format: (alpha << 24) | (B << 16) | (G << 8) | R
    // Paper is #f6f3eb -> R=246, G=243, B=235
    const rVal = 246
    const gVal = 243
    const bVal = 235

    const p = 2 // 2px per dither cell
    let cols = 1
    let rows = 1
    let img: ImageData | null = null
    let buf = new Uint32Array(0)
    let fw = 1
    let fh = 1
    let fog = new Float32Array(0)

    let raf = 0
    let visible = true
    let awake = true
    let lastDraw = 0
    let lastTick = performance.now()

    // Pointer coordinates in grid cells
    let tx = -999
    let ty = -999
    let ex = -999
    let ey = -999
    let inside = false
    let clear = 0

    // Parallax
    let pt = 0
    let pe = 0
    let windV = 0
    let windX = 0

    const layout = () => {
      const rect = scene.getBoundingClientRect()
      cols = Math.max(8, Math.ceil(rect.width / p))
      rows = Math.max(8, Math.ceil(rect.height / p))
      canvas.width = cols
      canvas.height = rows
      canvas.style.width = cols * p + "px"
      canvas.style.height = rows * p + "px"
      img = ctx.createImageData(cols, rows)
      buf = new Uint32Array(img.data.buffer)

      fw = (cols >> 1) + 2
      fh = (rows >> 1) + 2
      fog = new Float32Array(fw * fh)
      awake = true
    }

    const draw = (now: number) => {
      if (!img) return
      const o = opts.current
      const dt = Math.min(64, now - lastTick)
      lastTick = now
      const age = revealAt.current === null ? -1 : now - revealAt.current

      // Ease pointer, clearing, and parallax
      const ease = 1 - Math.pow(0.82, dt / 16.7)
      const slow = 1 - Math.pow(0.93, dt / 16.7)
      ex += (tx - ex) * ease
      ey += (ty - ey) * ease
      clear += ((inside ? 1 : 0) - clear) * slow
      pe += ((!reduced ? pt : 0) - pe) * slow

      // Update subtle parallax transform on artwork container
      if (artwork) {
        const pxShift = pe * 10
        artwork.style.transform = `translate3d(${pxShift.toFixed(2)}px, 0, 0)`
      }

      // Wind gust physics on click
      windV *= Math.pow(0.965, dt / 16.7)
      windX += (windV * dt) / 1000
      const fogT = (reduced ? 0 : (now / 1000) * 0.045 * Math.max(0, o.driftSpeed)) + windX

      // Generate drifting fog field
      const sx = 9 / cols
      const sy = 4.4 / rows
      for (let gy = 0; gy < fh; gy++) {
        const ny = gy * sy
        for (let gx = 0; gx < fw; gx++) {
          const nx = gx * sx + fogT
          const warp = noise(nx * 0.45 - fogT * 0.6, ny * 0.8, 77) * 0.6
          const v = fbm(nx + warp, ny + warp * 0.4, 31, 3)
          fog[gy * fw + gx] = smoothstep(0.28, 0.72, v)
        }
      }

      // Scroll reveal lift: initial mist is thick, then lifts gracefully
      const lift = age < 0 ? 0.7 : 0.7 * (1 - easeOutCubic((age - 400) / 1800))
      const r = Math.max(1, o.clearingRadius / p)
      const r2 = r * r
      const kMist = Math.max(0, Math.min(1, o.mistDensity))

      // Upper fade to blend softly into page background
      const fadeTo = Math.max(rows * 0.28, 36 / p)

      for (let y = 0; y < rows; y++) {
        const frow = (y >> 1) * fw
        const by = (y & 7) * 8
        const fade = smoothstep(0, fadeTo, y)
        const dyc = (y - ey) * 1.5

        for (let x = 0; x < cols; x++) {
          let m = fog[frow + (x >> 1)] * kMist

          // Pointer clearing
          if (clear > 0.01) {
            const dx = x - ex
            const q = (dx * dx + dyc * dyc) / r2
            if (q < 4) {
              const c = clear * Math.exp(-q)
              m *= 1 - c * 0.94
            }
          }

          m += lift * 0.5
          if (m > 1) m = 1
          if (m < 0) m = 0
          m *= fade

          // Compare against Bayer matrix threshold
          const threshold = BAYER_8X8[by + (x & 7)]
          if (m > threshold) {
            // Semi-transparent cream ordered-dither dot
            const alpha = Math.min(235, Math.max(140, Math.round(150 + 85 * m)))
            buf[y * cols + x] = ((alpha << 24) | (bVal << 16) | (gVal << 8) | rVal) >>> 0
          } else {
            // Completely transparent: reveals illustration beneath
            buf[y * cols + x] = 0
          }
        }
      }

      ctx.putImageData(img, 0, 0)

      const settling =
        Math.abs(tx - ex) + Math.abs(ty - ey) > 0.05 ||
        Math.abs((inside ? 1 : 0) - clear) > 0.005 ||
        Math.abs((!reduced ? pt : 0) - pe) > 0.001 ||
        Math.abs(windV) > 0.002

      awake = (age >= 0 && age < 3000) || age < 0 || settling || (!reduced && o.driftSpeed > 0)
    }

    const busy = () => {
      const age = revealAt.current === null ? -1 : performance.now() - revealAt.current
      return (age >= 0 && age < 3000) || inside || Math.abs(windV) > 0.002 || Math.abs(pt - pe) > 0.001
    }

    const loop = (now: number) => {
      raf = 0
      if (!visible) return
      if (revealAt.current === null) {
        raf = requestAnimationFrame(loop)
        return
      }
      if (busy() || now - lastDraw > 32) {
        draw(now)
        lastDraw = now
      }
      if (awake) raf = requestAnimationFrame(loop)
    }

    const wake = () => {
      awake = true
      if (!raf && visible) raf = requestAnimationFrame(loop)
    }

    const onPointerMove = (e: PointerEvent) => {
      const b = scene.getBoundingClientRect()
      pt = b.width > 0 ? ((e.clientX - b.left) / b.width) * 2 - 1 : 0
      const lx = (e.clientX - b.left) / p
      const ly = (e.clientY - b.top) / p
      const was = inside
      inside = lx >= 0 && ly >= 0 && lx < cols && ly < rows
      tx = lx
      ty = ly
      if (inside && !was) {
        ex = tx
        ey = ty
      }

      // Proximity hotspot check
      if (inside && b.width > 0 && b.height > 0) {
        const mouseXpct = ((e.clientX - b.left) / b.width) * 100
        const mouseYpct = ((e.clientY - b.top) / b.height) * 100

        let closestId: string | null = null
        let closestDist = 9999

        for (const spot of hotspots) {
          // Distance in normalized percentage space (scaled for aspect ratio ~4.6:1)
          const dx = (mouseXpct - spot.x) * 1.0
          const dy = (mouseYpct - spot.y) * 3.5
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 18 && dist < closestDist) {
            closestDist = dist
            closestId = spot.id
          }
        }

        if (closestId) {
          setActiveHotspotId(closestId)
        } else if (!pinnedHotspotId) {
          setActiveHotspotId(null)
        }
      }

      wake()
    }

    const onPointerLeave = () => {
      pt = 0
      inside = false
      if (!pinnedHotspotId) {
        setActiveHotspotId(null)
      }
      wake()
    }

    const onPointerDown = (e: PointerEvent) => {
      if (reduced) return
      if ((e.target as HTMLElement).closest("button, a")) return
      // Sideways wind gust on click
      windV += tx < cols / 2 ? 1.6 : -1.6
      wake()
    }

    // Scroll reveal observer
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        if (revealAt.current === null) {
          revealAt.current = reduced ? -Infinity : performance.now()
        }
        visible = true
        wake()
        io.disconnect()
      },
      { threshold: 0.15 },
    )
    io.observe(scene)

    const ro = new ResizeObserver(() => {
      layout()
      draw(performance.now())
      wake()
    })
    ro.observe(scene)

    scene.addEventListener("pointermove", onPointerMove)
    scene.addEventListener("pointerleave", onPointerLeave)
    scene.addEventListener("pointerdown", onPointerDown)

    layout()
    draw(performance.now())
    wake()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      scene.removeEventListener("pointermove", onPointerMove)
      scene.removeEventListener("pointerleave", onPointerLeave)
      scene.removeEventListener("pointerdown", onPointerDown)
    }
  }, [hotspots])

  const effectiveActiveId = pinnedHotspotId || activeHotspotId

  return (
    <div
      ref={sceneRef}
      className={`relative w-full overflow-hidden select-none touch-none ${className}`}
      style={{
        backgroundColor: paperColor,
      }}
    >
      {/* Artwork container with subtle Parallax */}
      <div
        ref={artworkRef}
        className="relative w-full aspect-[1024/221] min-h-[160px] sm:min-h-[200px] md:min-h-[240px] max-h-[340px] transition-transform duration-75 ease-out"
        style={{
          willChange: "transform",
        }}
      >
        {/* Main Cultural Illustration */}
        <img
          src="/images/kerala-heritage-footer.jpg"
          alt="Kerala Cultural Heritage Panoramas — Theyyam, Kathakali, Temple, Snake Boat, and Coastal Heritage"
          className="w-full h-full object-cover sm:object-contain object-bottom pointer-events-none"
          loading="eager"
        />

        {/* Hotspot Markers Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {hotspots.map((spot) => {
            const isActive = effectiveActiveId === spot.id

            // Tooltip alignment logic to prevent overflow
            let tooltipTransform = "-translate-x-1/2"
            if (spot.align === "left" || spot.x < 18) {
              tooltipTransform = "-translate-x-4 sm:-translate-x-6"
            } else if (spot.align === "right" || spot.x > 82) {
              tooltipTransform = "-translate-x-[85%] sm:-translate-x-[80%]"
            }

            return (
              <div
                key={spot.id}
                className="absolute"
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                }}
              >
                {/* Interactive Marker Button */}
                <button
                  type="button"
                  tabIndex={0}
                  role="button"
                  aria-label={`Cultural heritage landmark: ${spot.label}`}
                  aria-expanded={isActive}
                  onMouseEnter={() => setActiveHotspotId(spot.id)}
                  onMouseLeave={() => {
                    if (!pinnedHotspotId) setActiveHotspotId(null)
                  }}
                  onFocus={() => setActiveHotspotId(spot.id)}
                  onBlur={() => {
                    if (!pinnedHotspotId) setActiveHotspotId(null)
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setPinnedHotspotId((prev) => (prev === spot.id ? null : spot.id))
                    setActiveHotspotId(spot.id)
                  }}
                  className="pointer-events-auto absolute -left-3 -top-3 w-6 h-6 flex items-center justify-center cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#692820] rounded-full"
                >
                  {/* Subtle resting dot & pulse */}
                  <span
                    className={`relative flex items-center justify-center transition-all duration-300 ${
                      isActive ? "scale-125" : "scale-100 group-hover:scale-110 opacity-75 group-hover:opacity-100"
                    }`}
                  >
                    {/* Pulsing ring on active */}
                    {isActive && (
                      <span className="absolute w-4 h-4 rounded-full bg-[#692820]/30 animate-ping" />
                    )}
                    {/* Ring border */}
                    <span
                      className={`w-3 h-3 rounded-full border border-[#692820] flex items-center justify-center transition-colors ${
                        isActive ? "bg-[#692820]" : "bg-[#f6f3eb] group-hover:bg-[#692820]/20"
                      }`}
                    >
                      {/* Center pin core */}
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          isActive ? "bg-[#f6f3eb]" : "bg-[#692820]"
                        }`}
                      />
                    </span>
                  </span>
                </button>

                {/* Delicate Connecting Vertical Line */}
                <div
                  className={`pointer-events-none absolute left-0 bottom-[6px] w-[1px] h-7 bg-[#692820]/60 origin-bottom transition-all duration-300 ease-out ${
                    isActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                  }`}
                />

                {/* Floating Cultural Tooltip */}
                <div
                  className={`pointer-events-none absolute left-0 bottom-[38px] ${tooltipTransform} z-20 transition-all duration-300 ease-out origin-bottom ${
                    isActive
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-2 scale-95 pointer-events-none"
                  }`}
                  style={{
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="bg-[#f6f3eb]/95 backdrop-blur-md px-3 py-2 rounded border border-[#ded7c9] shadow-md shadow-black/5 whitespace-nowrap min-w-[140px] max-w-[240px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#692820]" />
                      <span className="font-mono text-[11px] font-semibold text-[#692820] tracking-wide uppercase">
                        {spot.label}
                      </span>
                    </div>
                    <p className="font-body text-[10.5px] text-[#5d5e61] mt-0.5 leading-snug whitespace-normal">
                      {spot.detail}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Dithering Mist & Halftone Particle Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none image-rendering-pixelated z-10"
        style={{
          imageRendering: "pixelated",
        }}
      />
    </div>
  )
}
