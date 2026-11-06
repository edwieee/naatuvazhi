'use client';

import React, { useState } from 'react';
import { CulturalListing } from '@/lib/types';
import { Plus, Minus, RotateCcw, MapPin, Compass, ShieldCheck, ExternalLink, X } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/ui/LanguageContext';

interface KeralaMapProps {
  listings: CulturalListing[];
  selectedListing: CulturalListing | null;
  onSelectListing: (listing: CulturalListing | null) => void;
  hoveredListingId?: string | null;
}

// Geographic bounding box for Kerala:
// Min Lat ~8.3 (South), Max Lat ~12.8 (North)
// Min Lng ~74.8 (West), Max Lng ~77.4 (East)
// We project (lat, lng) to SVG viewBox coordinates (width: 480, height: 780)
function projectCoordinates(lat: number, lng: number) {
  const minLat = 8.15;
  const maxLat = 12.85;
  const minLng = 74.8;
  const maxLng = 77.45;

  // Invert Lat because SVG Y runs top-to-bottom
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
    <div className="relative w-full h-full bg-[#EBF1F5] rounded-2xl md:rounded-3xl overflow-hidden border border-stone-200/90 shadow-inner select-none flex flex-col justify-between">
      {/* Map Control Toolbar (Top Left) */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 bg-white/95 backdrop-blur-md rounded-xl p-1 shadow-md border border-stone-200/90">
        <button
          onClick={handleZoomIn}
          className="p-2 hover:bg-stone-100 rounded-lg text-stone-700 transition-colors"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <div className="h-px bg-stone-200 mx-1"></div>
        <button
          onClick={handleZoomOut}
          className="p-2 hover:bg-stone-100 rounded-lg text-stone-700 transition-colors"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="h-px bg-stone-200 mx-1"></div>
        <button
          onClick={handleResetZoom}
          className="p-2 hover:bg-stone-100 rounded-lg text-stone-700 transition-colors"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Map Legend / Status Pill (Top Right) */}
      <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full px-3.5 py-1.5 shadow-md border border-stone-200/80 text-xs font-medium text-stone-700">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF9041] animate-pulse"></span>
        <span>{listings.length} {t('Active Cultural Markers', 'സജീവ കേന്ദ്രങ്ങൾ')}</span>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div
          className="transition-transform duration-300 ease-out origin-center w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
          }}
        >
          <svg
            viewBox="0 0 500 800"
            className="w-full h-full max-h-[820px] filter drop-shadow-md"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Arabian Sea Water styling */}
            <defs>
              <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2ECF3" />
                <stop offset="100%" stopColor="#D9E6EF" />
              </linearGradient>
              <linearGradient id="keralaLand" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAF7F2" />
                <stop offset="100%" stopColor="#F3EFE6" />
              </linearGradient>
              <linearGradient id="ghatsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E7DECE" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#C9B99E" stopOpacity="0.4" />
              </linearGradient>
              <filter id="markerShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Ocean Texture Grid */}
            <rect width="500" height="800" fill="url(#seaGradient)" />
            
            {/* Sea Latitude / Longitude subtle grid lines */}
            <line x1="0" y1="200" x2="500" y2="200" stroke="#CCDCE8" strokeWidth="0.7" strokeDasharray="3,3" />
            <line x1="0" y1="400" x2="500" y2="400" stroke="#CCDCE8" strokeWidth="0.7" strokeDasharray="3,3" />
            <line x1="0" y1="600" x2="500" y2="600" stroke="#CCDCE8" strokeWidth="0.7" strokeDasharray="3,3" />
            <line x1="150" y1="0" x2="150" y2="800" stroke="#CCDCE8" strokeWidth="0.7" strokeDasharray="3,3" />
            <line x1="300" y1="0" x2="300" y2="800" stroke="#CCDCE8" strokeWidth="0.7" strokeDasharray="3,3" />

            {/* Lakshadweep Sea Label */}
            <text x="50" y="440" fill="#8FA4B5" fontSize="11" fontWeight="600" letterSpacing="3" transform="rotate(-65 50 440)">
              LAKSHADWEEP SEA / ARABIAN SEA
            </text>
            <text x="350" y="320" fill="#9DA5AB" fontSize="11" fontWeight="600" letterSpacing="2">
              TAMIL NADU
            </text>
            <text x="280" y="70" fill="#9DA5AB" fontSize="11" fontWeight="600" letterSpacing="2">
              KARNATAKA
            </text>

            {/* Stylized Kerala Landmass Geometry */}
            {/* Realistic stylized path representing Kerala's slender elongated strip from Kasaragod (NW) to Thiruvananthapuram/Kanyakumari border (SE) */}
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
              strokeWidth="2"
            />

            {/* Western Ghats Mountain Ridge Texture on the eastern border */}
            <path
              d="
                M 160,90 
                C 180,120 215,150 230,190 
                C 245,225 255,270 275,310 
                C 290,350 305,420 315,480 
                C 320,530 315,590 310,640 
                C 295,680 275,720 252,755 
                L 248,760 
                C 270,730 290,690 305,640
                C 320,590 325,530 320,480
                C 305,420 290,350 270,300
                Z
              "
              fill="url(#ghatsGradient)"
            />

            {/* Major District Outline Guides */}
            <path d="M 85,120 Q 115,130 140,115" stroke="#E2DAC9" strokeWidth="1.2" strokeDasharray="2,2" fill="none" />
            <path d="M 100,180 Q 135,190 170,175" stroke="#E2DAC9" strokeWidth="1.2" strokeDasharray="2,2" fill="none" />
            <path d="M 120,250 Q 160,260 205,240" stroke="#E2DAC9" strokeWidth="1.2" strokeDasharray="2,2" fill="none" />
            <path d="M 135,330 Q 185,340 235,315" stroke="#E2DAC9" strokeWidth="1.2" strokeDasharray="2,2" fill="none" />
            <path d="M 150,420 Q 210,430 260,400" stroke="#E2DAC9" strokeWidth="1.2" strokeDasharray="2,2" fill="none" />
            <path d="M 165,510 Q 220,520 275,490" stroke="#E2DAC9" strokeWidth="1.2" strokeDasharray="2,2" fill="none" />
            <path d="M 185,600 Q 240,610 290,580" stroke="#E2DAC9" strokeWidth="1.2" strokeDasharray="2,2" fill="none" />
            <path d="M 215,690 Q 255,700 280,680" stroke="#E2DAC9" strokeWidth="1.2" strokeDasharray="2,2" fill="none" />

            {/* Major Region Reference Labels */}
            <text x="75" y="75" fill="#A89E8C" fontSize="9" fontWeight="600">KASARAGOD</text>
            <text x="85" y="150" fill="#A89E8C" fontSize="9" fontWeight="600">KANNUR</text>
            <text x="180" y="160" fill="#A89E8C" fontSize="9" fontWeight="600">WAYANAD</text>
            <text x="110" y="225" fill="#A89E8C" fontSize="9" fontWeight="600">KOZHIKODE</text>
            <text x="210" y="275" fill="#A89E8C" fontSize="9" fontWeight="600">PALAKKAD</text>
            <text x="135" y="365" fill="#A89E8C" fontSize="9" fontWeight="600">THRISSUR</text>
            <text x="145" y="440" fill="#A89E8C" fontSize="9" fontWeight="600">KOCHI</text>
            <text x="155" y="535" fill="#A89E8C" fontSize="9" fontWeight="600">ALAPPUZHA</text>
            <text x="210" y="555" fill="#A89E8C" fontSize="9" fontWeight="600">KOTTAYAM</text>
            <text x="225" y="625" fill="#A89E8C" fontSize="9" fontWeight="600">PATHANAMTHITTA</text>
            <text x="195" y="665" fill="#A89E8C" fontSize="9" fontWeight="600">KOLLAM</text>
            <text x="215" y="735" fill="#A89E8C" fontSize="9" fontWeight="600">TRIVANDRUM</text>

            {/* Cultural Listing Markers */}
            {listings.map((listing, index) => {
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
                  filter="url(#markerShadow)"
                >
                  {/* Ping Animation for Selected or Hovered Marker */}
                  {(isSelected || isHovered) && (
                    <circle
                      r="18"
                      fill="#FF5931"
                      fillOpacity="0.25"
                      className="animate-ping"
                    />
                  )}

                  {/* Marker Pin Base */}
                  <circle
                    r={isSelected ? '14' : isHovered ? '12' : '9'}
                    fill={isSelected ? '#B21C01' : isHovered ? '#FF5931' : '#FF9041'}
                    stroke="#FFFFFF"
                    strokeWidth={isSelected ? '3' : '2'}
                    className="transition-all duration-200"
                  />

                  {/* Inner Core Dot or Number */}
                  <circle
                    r={isSelected ? '4' : '3'}
                    fill="#FFFFFF"
                  />

                  {/* Hover or Selected Text Tag */}
                  {(isSelected || isHovered) && (
                    <g transform="translate(0, -22)">
                      <rect
                        x="-60"
                        y="-16"
                        width="120"
                        height="20"
                        rx="10"
                        fill="#111111"
                        fillOpacity="0.95"
                      />
                      <text
                        x="0"
                        y="-3"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="9"
                        fontWeight="600"
                      >
                        {listing.name.slice(0, 18)}...
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Listing Drawer / Popup Overlay */}
      {selectedListing && (
        <div className="absolute bottom-4 left-4 right-4 z-30 bg-white/98 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-stone-200/90 transition-all animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3">
              <img
                src={selectedListing.imageUrl}
                alt={selectedListing.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-stone-200"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5931] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200/60">
                    {selectedListing.category}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    {selectedListing.locality}, {selectedListing.district}
                  </span>
                </div>
                <h4 className="font-bold text-sm sm:text-base text-stone-900 line-clamp-1 mt-0.5">
                  {selectedListing.name}
                </h4>
                <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                  {selectedListing.shortDescription}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {selectedListing.verificationStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Link
                href={`/culture/${selectedListing.slug}`}
                className="rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-3 py-1.5 transition-colors flex items-center gap-1"
              >
                <span>Details</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={() => onSelectListing(null)}
                className="p-1.5 hover:bg-stone-100 rounded-full text-stone-500 transition-colors"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map Attribution Bar (Bottom Right) */}
      <div className="p-2 sm:px-4 sm:py-2 flex items-center justify-between text-[10px] text-stone-500 border-t border-stone-200/60 bg-white/60 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <Compass className="w-3 h-3 text-[#FF9041]" />
          <span>Kerala Cultural GIS Grid · EPSG 4326 Projection</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Click any pin to inspect listing</span>
        </div>
      </div>
    </div>
  );
}
