'use client';

import dynamic from 'next/dynamic';
import { CulturalListing, EventListing } from '@/lib/types';
import { Compass } from 'lucide-react';

interface KeralaMapProps {
  listings: CulturalListing[];
  events?: EventListing[];
  selectedListing: CulturalListing | null;
  onSelectListing: (listing: CulturalListing | null) => void;
  hoveredListingId?: string | null;
  selectedEvent?: EventListing | null;
  selectedEventId?: string | null;
  onSelectEvent?: (event: EventListing | null) => void;
  hoveredEventId?: string | null;
}

const ClientMap = dynamic(() => import('@/components/map/OpenStreetMapClient'), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-full min-h-[480px] bg-[#EDE7DC]/30 rounded-xl overflow-hidden border border-[#E8E2D6] shadow-xs flex flex-col items-center justify-center text-center p-6">
      <div className="w-12 h-12 rounded-full bg-white border border-[#E8E2D6] flex items-center justify-center text-[#B21C01] shadow-xs mb-3 animate-pulse">
        <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} />
      </div>
      <p className="font-semibold text-xs text-[#181512] mb-1">
        Loading OpenStreetMap Geographic Engine...
      </p>
      <span className="text-[11px] text-[#8C8273]">
        Connecting coordinates across Kerala cultural cartography
      </span>
    </div>
  ),
});

export default function KeralaMap(props: KeralaMapProps) {
  return (
    <div className="w-full h-full flex-1 flex flex-col min-h-[480px]">
      <ClientMap {...props} />
    </div>
  );
}
