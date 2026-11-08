'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CulturalListing } from '@/lib/types';
import Link from 'next/link';
import { ShieldCheck, MapPin, ExternalLink, RotateCcw, Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

interface OpenStreetMapClientProps {
  listings: CulturalListing[];
  selectedListing: CulturalListing | null;
  onSelectListing: (listing: CulturalListing | null) => void;
  hoveredListingId?: string | null;
}

// Center of Kerala (Thrissur cultural heartland)
const KERALA_CENTER: [number, number] = [10.5276, 76.2144];
const KERALA_INITIAL_ZOOM = 8;

// Create custom DOM Marker to avoid missing asset png 404s
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

// Internal Map Controller for programmatic flyTo and view reset
function MapController({
  selectedListing,
  initialCenter,
  initialZoom,
}: {
  selectedListing: CulturalListing | null;
  initialCenter: [number, number];
  initialZoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedListing && selectedListing.coordinates) {
      const { lat, lng } = selectedListing.coordinates;
      if (
        typeof lat === 'number' &&
        typeof lng === 'number' &&
        !isNaN(lat) &&
        !isNaN(lng)
      ) {
        map.flyTo([lat, lng], 13, {
          duration: 1.2,
          easeLinearity: 0.25,
        });
      }
    }
  }, [selectedListing, map]);

  return (
    <div className="absolute top-4 left-4 z-[400] flex flex-col bg-white rounded-md shadow-xs border border-[#E8E2D6] overflow-hidden">
      <button
        onClick={() => map.zoomIn()}
        className="p-2 hover:bg-[#F3EFE8] text-[#5C554B] transition-colors"
        title="Zoom in"
        aria-label="Zoom in"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
      <div className="h-px bg-[#E8E2D6]"></div>
      <button
        onClick={() => map.zoomOut()}
        className="p-2 hover:bg-[#F3EFE8] text-[#5C554B] transition-colors"
        title="Zoom out"
        aria-label="Zoom out"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <div className="h-px bg-[#E8E2D6]"></div>
      <button
        onClick={() =>
          map.setView(initialCenter, initialZoom, {
            animate: true,
          })
        }
        className="p-2 hover:bg-[#F3EFE8] text-[#5C554B] transition-colors"
        title="Reset view to Kerala"
        aria-label="Reset view to Kerala"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function OpenStreetMapClient({
  listings,
  selectedListing,
  onSelectListing,
  hoveredListingId,
}: OpenStreetMapClientProps) {
  const { t } = useLanguage();
  const markerRefs = useRef<Record<string, L.Marker>>({});

  // Filter listings with valid coordinates only
  const validListings = useMemo(() => {
    return listings.filter(
      (l) =>
        l.coordinates &&
        typeof l.coordinates.lat === 'number' &&
        typeof l.coordinates.lng === 'number' &&
        !isNaN(l.coordinates.lat) &&
        !isNaN(l.coordinates.lng)
    );
  }, [listings]);

  // Open popup when selectedListing changes
  useEffect(() => {
    if (selectedListing && markerRefs.current[selectedListing.id]) {
      markerRefs.current[selectedListing.id].openPopup();
    }
  }, [selectedListing]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-[#E8E2D6] shadow-xs select-none">
      {/* Map Legend Banner (Top Right) */}
      <div className="absolute top-4 right-4 z-[400] hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-xs rounded-md px-3 py-1.5 shadow-xs border border-[#E8E2D6] text-xs text-[#5C554B]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#B21C01] border border-white shadow-xs"></span>
        <span className="font-mono text-[11px] tabular-nums">
          {validListings.length} {t('Active Cultural Markers', 'സജീവ കേന്ദ്രങ്ങൾ')}
        </span>
      </div>

      <MapContainer
        center={KERALA_CENTER}
        zoom={KERALA_INITIAL_ZOOM}
        zoomControl={false}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ width: '100%', height: '100%', backgroundColor: '#F4F2EC' }}
      >
        {/* OpenStreetMap Standard Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          minZoom={6}
        />

        {/* Map Controller & Custom Toolbar */}
        <MapController
          selectedListing={selectedListing}
          initialCenter={KERALA_CENTER}
          initialZoom={KERALA_INITIAL_ZOOM}
        />

        {/* Render Markers for Valid Listings */}
        {validListings.map((listing) => {
          const isSelected = selectedListing?.id === listing.id;
          const isHovered = hoveredListingId === listing.id;
          const icon = createCustomPin(isSelected, isHovered);

          return (
            <Marker
              key={listing.id}
              position={[listing.coordinates.lat, listing.coordinates.lng]}
              icon={icon}
              ref={(ref) => {
                if (ref) {
                  markerRefs.current[listing.id] = ref;
                }
              }}
              eventHandlers={{
                click: () => {
                  onSelectListing(listing);
                },
              }}
            >
              <Popup className="nattuvazhi-custom-popup" closeButton={false}>
                <div className="p-3 bg-white rounded-xl shadow-lg border border-[#E8E2D6] max-w-[260px] text-left">
                  <div className="flex items-center justify-between text-[10px] text-[#8C8273] mb-1">
                    <span className="font-mono uppercase tracking-wider font-semibold">
                      {listing.category}
                    </span>
                    <span className="text-[#2D6A4F] font-medium flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{listing.verificationStatus}</span>
                    </span>
                  </div>

                  <h4 className="font-semibold text-xs text-[#181512] leading-snug line-clamp-1">
                    {listing.name}
                  </h4>
                  {listing.nameMalayalam && (
                    <p className="text-[10px] text-[#8C8273] font-serif line-clamp-1 mb-1">
                      {listing.nameMalayalam}
                    </p>
                  )}

                  <div className="flex items-center gap-1 text-[11px] text-[#5C554B] mb-3">
                    <MapPin className="w-3 h-3 text-[#B21C01] flex-shrink-0" />
                    <span className="truncate">
                      {listing.locality}, {listing.district}
                    </span>
                  </div>

                  <Link
                    href={`/culture/${listing.slug}`}
                    className="inline-flex items-center gap-1 w-full justify-center px-2.5 py-1.5 rounded-md bg-[#181512] hover:bg-[#B21C01] text-white text-[11px] font-medium transition-colors"
                  >
                    <span>{t('Explore Story & Protocol', 'വിശദ വിവരങ്ങൾ കാണുക')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
