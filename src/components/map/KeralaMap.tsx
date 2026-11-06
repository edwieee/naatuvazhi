'use client';

import React, { useState } from 'react';
import { CulturalListing } from '@/lib/types';
import { Plus, Minus, RotateCcw, Compass, ShieldCheck, ExternalLink, X } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/ui/LanguageContext';

interface KeralaMapProps {
  listings: CulturalListing[];
  selectedListing: CulturalListing | null;
  onSelectListing: (listing: CulturalListing | null) => void;
  hoveredListingId?: string | null;
}

function projectCoordinates(lat: number, lng: number) {
  const minLat = 8.15;
  const maxLat = 12.85;
  const minLng = 74.8;
  const maxLng = 77.45;

  const y = ((maxLat - lat) / (maxLat - minLat)) * 700 + 40;
  const x = ((lng - minLng) / (maxLng - minLng)) * 380 + 50;

  return { x, y };
}

export default function KeralaMap({
  listings,
  selectedListing,
  onSelectListing,
  hoveredListingId,
}: KeralaMapProps) {
  const { t } = useLanguage();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.3, 2.2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.3, 0.8));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full h-full bg-[#EDE7DC]/40 rounded-xl overflow-hidden border border-[#E8E2D6] shadow-xs select-none flex flex-col justify-between">
      {/* Map Control Toolbar (Top Left) */}
      <div className="absolute top-4 left-4 z-20 flex flex-col bg-white rounded-md shadow-xs border border-[#E8E2D6] overflow-hidden">
        <button
          onClick={handleZoomIn}
          className="p-2 hover:bg-[#F3EFE8] text-[#5C554B] transition-colors"
          title="Zoom in"
          aria-label="Zoom in"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <div className="h-px bg-[#E8E2D6]"></div>
        <button
          onClick={handleZoomOut}
          className="p-2 hover:bg-[#F3EFE8] text-[#5C554B] transition-colors"
          title="Zoom out"
          aria-label="Zoom out"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <div className="h-px bg-[#E8E2D6]"></div>
        <button
          onClick={handleResetZoom}
          className="p-2 hover:bg-[#F3EFE8] text-[#5C554B] transition-colors"
          title="Reset view"
          aria-label="Reset view"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Map Legend (Top Right: Quiet, no pulsing dots) */}
      <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2 bg-white/95 rounded-md px-3 py-1.5 shadow-xs border border-[#E8E2D6] text-xs text-[#5C554B]">
        <span className="w-2 h-2 rounded-full bg-[#B21C01]"></span>
        <span className="font-mono text-[11px] tabular-nums">{listings.length} {t('Active Cultural Markers', 'സജീവ കേന്ദ്രങ്ങൾ')}</span>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div
          className="transition-transform duration-200 ease-out origin-center w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
          }}
        >
          <svg
            viewBox="0 0 500 800"
            className="w-full h-full max-h-[820px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5F3ED" />
                <stop offset="100%" stopColor="#ECE6DA" />
              </linearGradient>
              <linearGradient id="keralaLand" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FBF9F5" />
              </linearGradient>
            </defs>

            {/* Quiet Water Background */}
            <rect width="500" height="800" fill="url(#seaGradient)" />
            
            {/* Latitude / Longitude lines */}
            <line x1="0" y1="200" x2="500" y2="200" stroke="#DFD7C7" strokeWidth="0.8" strokeDasharray="3,3" />
            <line x1="0" y1="400" x2="500" y2="400" stroke="#DFD7C7" strokeWidth="0.8" strokeDasharray="3,3" />
            <line x1="0" y1="600" x2="500" y2="600" stroke="#DFD7C7" strokeWidth="0.8" strokeDasharray="3,3" />
            <line x1="150" y1="0" x2="150" y2="800" stroke="#DFD7C7" strokeWidth="0.8" strokeDasharray="3,3" />
            <line x1="300" y1="0" x2="300" y2="800" stroke="#DFD7C7" strokeWidth="0.8" strokeDasharray="3,3" />

            {/* Geographical Annotations */}
            <text x="50" y="440" fill="#A89E8C" fontSize="10" fontWeight="500" letterSpacing="3" transform="rotate(-65 50 440)">
              LAKSHADWEEP SEA
            </text>
            <text x="350" y="320" fill="#B0A694" fontSize="10" fontWeight="500" letterSpacing="2">
              TAMIL NADU
            </text>
            <text x="280" y="70" fill="#B0A694" fontSize="10" fontWeight="500" letterSpacing="2">
              KARNATAKA
            </text>

            {/* Kerala Landmass Geometry */}
            <path
              d="
                M 92,60 
                C 115,55 155,75 168,95
                C 178,110 205,120 220,150
                C 230,170 250,185 245,210
                C 235,230 255,250 268,270
                C 280,290 300,310 290,340
                C 275,370 295,400 310,430
                C 330,460 325,490 320,520
                C 315,545 330,575 325,605
                C 315,640 300,670 280,710
                C 270,730 255,750 248,760
                C 240,755 228,735 220,715
                C 205,685 195,650 185,615
                C 175,580 162,545 158,510
                C 152,470 148,430 142,390
                C 135,350 128,310 118,270
                C 105,230 92,190 85,150
                C 78,110 82,80 92,60 
                Z
              "
              fill="url(#keralaLand)"
              stroke="#D2C7B4"
              strokeWidth="1.5"
            />

            {/* Major Region Reference Labels */}
            <text x="75" y="75" fill="#8C8273" fontSize="9" fontWeight="500">KASARAGOD</text>
            <text x="85" y="150" fill="#8C8273" fontSize="9" fontWeight="500">KANNUR</text>
            <text x="180" y="160" fill="#8C8273" fontSize="9" fontWeight="500">WAYANAD</text>
            <text x="110" y="225" fill="#8C8273" fontSize="9" fontWeight="500">KOZHIKODE</text>
            <text x="210" y="275" fill="#8C8273" fontSize="9" fontWeight="500">PALAKKAD</text>
            <text x="135" y="365" fill="#8C8273" fontSize="9" fontWeight="500">THRISSUR</text>
            <text x="145" y="440" fill="#8C8273" fontSize="9" fontWeight="500">KOCHI</text>
            <text x="155" y="535" fill="#8C8273" fontSize="9" fontWeight="500">ALAPPUZHA</text>
            <text x="210" y="555" fill="#8C8273" fontSize="9" fontWeight="500">KOTTAYAM</text>
            <text x="225" y="625" fill="#8C8273" fontSize="9" fontWeight="500">PATHANAMTHITTA</text>
            <text x="195" y="665" fill="#8C8273" fontSize="9" fontWeight="500">KOLLAM</text>
            <text x="215" y="735" fill="#8C8273" fontSize="9" fontWeight="500">TRIVANDRUM</text>

            {/* Cultural Listing Markers: Pure craft, no pulsating loops */}
            {listings.map((listing) => {
              const { x, y } = projectCoordinates(listing.coordinates.lat, listing.coordinates.lng);
              const isSelected = selectedListing?.id === listing.id;
              const isHovered = hoveredListingId === listing.id;

              return (
                <g
                  key={listing.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectListing(listing);
                  }}
                  className="cursor-pointer group"
                  transform={`translate(${x}, ${y})`}
                >
                  {/* Active Selection Ring (Clean hairline, no glowing ping) */}
                  {(isSelected || isHovered) && (
                    <circle
                      r="14"
                      fill="none"
                      stroke="#B21C01"
                      strokeWidth="1.5"
                      strokeOpacity="0.5"
                    />
                  )}

                  {/* Marker Pin Base */}
                  <circle
                    r={isSelected ? '9' : isHovered ? '8' : '6.5'}
                    fill={isSelected ? '#B21C01' : isHovered ? '#181512' : '#B21C01'}
                    stroke="#FFFFFF"
                    strokeWidth={isSelected ? '2' : '1.5'}
                  />

                  {/* Inner Core Dot */}
                  <circle
                    r={isSelected ? '3' : '2'}
                    fill="#FFFFFF"
                  />

                  {/* Selected / Hover Label Tag */}
                  {(isSelected || isHovered) && (
                    <g transform="translate(0, -18)">
                      <rect
                        x="-55"
                        y="-14"
                        width="110"
                        height="18"
                        rx="3"
                        fill="#181512"
                      />
                      <text
                        x="0"
                        y="-2"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="9"
                        fontWeight="500"
                      >
                        {listing.name.slice(0, 16)}...
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Listing Drawer: Grounded Archival Index Card */}
      {selectedListing && (
        <div className="absolute bottom-4 left-4 right-4 z-30 bg-white rounded-lg p-4 shadow-sm border border-[#E8E2D6]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3">
              <img
                src={selectedListing.imageUrl}
                alt={selectedListing.name}
                className="w-16 h-16 object-cover rounded-md border border-[#E8E2D6]"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#8C8273]">
                    № KL-{selectedListing.district.substring(0, 3).toUpperCase()}-{selectedListing.id.replace('c-', '')}
                  </span>
                  <span className="text-xs text-[#5C554B]">
                    {selectedListing.locality}, {selectedListing.district}
                  </span>
                </div>
                <h4 className="font-semibold text-sm text-[#181512] line-clamp-1 mt-0.5">
                  {selectedListing.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] font-medium text-[#2D6A4F] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {selectedListing.verificationStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                href={`/culture/${selectedListing.slug}`}
                className="rounded-md bg-[#181512] hover:bg-[#B21C01] text-white text-xs font-medium px-3 py-1.5 transition-colors flex items-center gap-1"
              >
                <span>Details</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={() => onSelectListing(null)}
                className="p-1 hover:bg-[#F3EFE8] rounded text-[#8C8273] transition-colors"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map Attribution Bar */}
      <div className="px-4 py-2 flex items-center justify-between text-[11px] text-[#8C8273] border-t border-[#E8E2D6] bg-[#F8F5EE]">
        <div className="flex items-center gap-2 font-mono">
          <Compass className="w-3 h-3 text-[#B21C01]" />
          <span>Kerala Cultural GIS Grid · EPSG 4326 Projection</span>
        </div>
        <div className="text-[10px]">
          <span>Click any marker to inspect archive</span>
        </div>
      </div>
    </div>
  );
}
