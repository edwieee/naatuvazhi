'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import L from 'leaflet';
import { CulturalListing, EventListing } from '@/lib/types';
import { RotateCcw, Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

interface OpenStreetMapClientProps {
  listings: CulturalListing[];
  events?: EventListing[];
  selectedListing: CulturalListing | null;
  onSelectListing: (listing: CulturalListing | null) => void;
  hoveredListingId?: string | null;
}

const KERALA_CENTER: [number, number] = [10.5276, 76.2144];
const KERALA_INITIAL_ZOOM = 8;

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function createCustomPin(isSelected: boolean, isHovered: boolean) {
  const size = isSelected ? 34 : isHovered ? 30 : 26;
  const bgColor = isSelected ? '#B21C01' : isHovered ? '#8C1500' : '#B21C01';
  const ring = isSelected
    ? 'border-2 border-white ring-4 ring-[#B21C01]/30 shadow-lg scale-110'
    : isHovered
      ? 'border-2 border-white ring-2 ring-[#B21C01]/20 shadow-md'
      : 'border-2 border-white shadow-md';

  return L.divIcon({
    className: 'custom-nattuvazhi-marker',
    html: `
      <div style="width: ${size}px; height: ${size}px;" class="relative flex items-center justify-center transition-all duration-200">
        <div style="background-color: ${bgColor}; width: ${size}px; height: ${size}px;" class="rounded-full ${ring} flex items-center justify-center text-white cursor-pointer">
          <div class="w-2 h-2 rounded-full bg-white"></div>
        </div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 4],
  });
}

function createPopupContent(listing: CulturalListing, exploreLabel: string) {
  const nameMalayalam = listing.nameMalayalam
    ? `<p class="text-[10px] text-[#8C8273] font-malayalam line-clamp-1 mb-1">${escapeHtml(listing.nameMalayalam)}</p>`
    : '';

  return `
    <div class="w-[240px] max-w-[calc(100vw-48px)] p-3.5 bg-white rounded-lg border border-[#E8E2D6] shadow-[0_8px_24px_rgba(24,21,18,0.12)] text-left">
      <div class="flex items-center justify-between gap-3 text-[9px] text-[#8C8273] mb-2">
        <span class="font-mono uppercase tracking-[0.12em] font-semibold truncate">${escapeHtml(listing.category)}</span>
        <span class="text-[#2D6A4F] font-medium flex items-center gap-0.5 shrink-0">
          <span aria-hidden="true">✓</span>
          <span>${escapeHtml(listing.verificationStatus)}</span>
        </span>
      </div>
      <h4 class="font-semibold text-sm text-[#181512] leading-snug line-clamp-2">${escapeHtml(listing.name)}</h4>
      ${nameMalayalam ? nameMalayalam.replace('text-[10px]', 'text-[11px]').replace('mb-1', 'mt-1 mb-2') : ''}
      <div class="flex items-start gap-1.5 text-[11px] leading-relaxed text-[#5C554B] mb-3">
        <span class="text-[#B21C01] flex-shrink-0" aria-hidden="true">•</span>
        <span>${escapeHtml(`${listing.locality}, ${listing.district}`)}</span>
      </div>
      <a href="/culture/${encodeURIComponent(listing.slug)}" class="inline-flex items-center gap-1 w-full justify-center px-2.5 py-2 rounded-md bg-[#B21C01] hover:bg-[#8C1500] text-white text-[11px] font-semibold transition-colors">
        <span>${escapeHtml(exploreLabel)}</span>
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  `;
}

export default function OpenStreetMapClient({
  listings,
  events = [],
  selectedListing,
  onSelectListing,
  hoveredListingId,
}: OpenStreetMapClientProps) {
  const { t } = useLanguage();
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const markerRefs = useRef<Record<string, L.Marker>>({});
  const onSelectListingRef = useRef(onSelectListing);
  const exploreLabel = t('Explore Story & Protocol', 'വിശദ വിവരങ്ങൾ കാണുക');

  const validListings = useMemo(
    () =>
      listings.filter(
        (listing) =>
          listing.coordinates &&
          typeof listing.coordinates.lat === 'number' &&
          typeof listing.coordinates.lng === 'number' &&
          !Number.isNaN(listing.coordinates.lat) &&
          !Number.isNaN(listing.coordinates.lng)
      ),
    [listings]
  );

  const validEvents = useMemo(
    () =>
      events.filter(
        (ev) =>
          ev.coordinates &&
          typeof ev.coordinates.lat === 'number' &&
          typeof ev.coordinates.lng === 'number' &&
          !Number.isNaN(ev.coordinates.lat) &&
          !Number.isNaN(ev.coordinates.lng)
      ),
    [events]
  );

  useEffect(() => {
    onSelectListingRef.current = onSelectListing;
  }, [onSelectListing]);

  useEffect(() => {
    const element = mapElementRef.current;
    if (!element || mapRef.current) return;

    const map = L.map(element, {
      center: KERALA_CENTER,
      zoom: KERALA_INITIAL_ZOOM,
      zoomControl: false,
      scrollWheelZoom: true,
    });

    const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      maxZoom: 19,
      minZoom: 6,
    });

    tileLayer.addTo(map);
    markerLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    const resizeMap = () => map.invalidateSize();
    const resizeObserver = new ResizeObserver(resizeMap);
    resizeObserver.observe(element);
    window.addEventListener('resize', resizeMap);
    const frame = requestAnimationFrame(resizeMap);
    const timer = window.setTimeout(resizeMap, 250);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', resizeMap);
      markerRefs.current = {};
      markerLayerRef.current = null;
      mapRef.current = null;
      map.remove();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const markerLayer = markerLayerRef.current;
    if (!map || !markerLayer) return;

    markerLayer.clearLayers();
    markerRefs.current = {};

    validListings.forEach((listing) => {
      const marker = L.marker(
        [listing.coordinates.lat, listing.coordinates.lng],
        {
          icon: createCustomPin(
            selectedListing?.id === listing.id,
            hoveredListingId === listing.id
          ),
        }
      );

      marker.bindPopup(createPopupContent(listing, exploreLabel), {
        className: 'nattuvazhi-custom-popup',
        closeButton: false,
      });
      marker.on('click', () => onSelectListingRef.current(listing));
      marker.addTo(markerLayer);
      markerRefs.current[listing.id] = marker;
    });

    validEvents.forEach((ev) => {
      if (!ev.coordinates) return;
      const marker = L.marker([ev.coordinates.lat, ev.coordinates.lng], {
        icon: L.divIcon({
          className: 'custom-nattuvazhi-event-marker',
          html: `
            <div style="width: 26px; height: 26px;" class="relative flex items-center justify-center">
              <div style="background-color: #D9531E; width: 26px; height: 26px;" class="rounded-full border-2 border-white shadow-md flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                <div class="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>
          `,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
          popupAnchor: [0, -17],
        }),
      });

      marker.bindPopup(`
        <div class="w-[240px] max-w-[calc(100vw-48px)] p-3.5 bg-white rounded-lg border border-[#E8E2D6] shadow-[0_8px_24px_rgba(24,21,18,0.12)] text-left">
          <div class="flex items-center justify-between gap-2 text-[9px] text-[#8C8273] mb-1.5">
            <span class="font-mono uppercase tracking-[0.12em] font-semibold text-[#D9531E] truncate">${escapeHtml(ev.category)}</span>
            <span class="text-[#2D6A4F] font-medium shrink-0">✓ ${escapeHtml(ev.status)}</span>
          </div>
          <h4 class="font-semibold text-sm text-[#181512] leading-snug line-clamp-2">${escapeHtml(ev.title)}</h4>
          <p class="text-[11px] text-[#8C8273] mt-1 mb-2 font-mono">${escapeHtml(ev.formattedDate || ev.date)}</p>
          <div class="flex items-start gap-1.5 text-[11px] leading-relaxed text-[#5C554B] mb-3">
            <span class="text-[#D9531E] flex-shrink-0">•</span>
            <span>${escapeHtml(`${ev.venue}, ${ev.district}`)}</span>
          </div>
          <a href="/events/${encodeURIComponent(ev.slug)}" class="inline-flex items-center gap-1 w-full justify-center px-2.5 py-2 rounded-md bg-[#D9531E] hover:bg-[#B33C0F] text-white text-[11px] font-semibold transition-colors">
            <span>View festival schedule</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      `, {
        className: 'nattuvazhi-custom-popup',
        closeButton: false,
      });

      marker.addTo(markerLayer);
    });
  }, [validListings, validEvents, selectedListing?.id, hoveredListingId, exploreLabel]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedListing?.coordinates) return;

    const { lat, lng } = selectedListing.coordinates;
    if (typeof lat !== 'number' || typeof lng !== 'number') return;

    map.flyTo([lat, lng], 13, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
    markerRefs.current[selectedListing.id]?.openPopup();
  }, [selectedListing]);

  return (
    <div className="relative w-full h-full flex-1 flex flex-col min-h-[480px] rounded-xl overflow-hidden border border-[#E8E2D6] shadow-xs select-none">
      <div
        ref={mapElementRef}
        className="w-full h-full flex-1 min-h-[480px] bg-[#F4F2EC]"
        aria-label="Interactive map of cultural places across Kerala"
      />

      <div className="absolute top-4 left-4 z-[400] flex flex-col bg-white rounded-md shadow-xs border border-[#E8E2D6] overflow-hidden">
        <button
          onClick={() => mapRef.current?.zoomIn()}
          className="p-2 hover:bg-[#F3EFE8] text-[#5C554B] transition-colors"
          title="Zoom in"
          aria-label="Zoom in"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <div className="h-px bg-[#E8E2D6]" />
        <button
          onClick={() => mapRef.current?.zoomOut()}
          className="p-2 hover:bg-[#F3EFE8] text-[#5C554B] transition-colors"
          title="Zoom out"
          aria-label="Zoom out"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <div className="h-px bg-[#E8E2D6]" />
        <button
          onClick={() => mapRef.current?.setView(KERALA_CENTER, KERALA_INITIAL_ZOOM, { animate: true })}
          className="p-2 hover:bg-[#F3EFE8] text-[#5C554B] transition-colors"
          title="Reset view to Kerala"
          aria-label="Reset view to Kerala"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="absolute top-4 right-4 z-[400] hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-xs rounded-md px-3 py-1.5 shadow-xs border border-[#E8E2D6] text-xs text-[#5C554B]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#B21C01] border border-white shadow-xs" />
        <span className="font-mono text-[11px] tabular-nums">
          {validListings.length} {t('Active Cultural Markers', 'സജീവ കേന്ദ്രങ്ങൾ')}
        </span>
      </div>
    </div>
  );
}

