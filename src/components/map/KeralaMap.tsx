'use client';

import React, { useState, useEffect } from 'react';
import { CulturalListing } from '@/lib/types';
import { Compass } from 'lucide-react';

interface KeralaMapProps {
  listings: CulturalListing[];
  selectedListing: CulturalListing | null;
  onSelectListing: (listing: CulturalListing | null) => void;
  hoveredListingId?: string | null;
}

export default function KeralaMap(props: KeralaMapProps) {
  const [ClientMap, setClientMap] = useState<React.ComponentType<KeralaMapProps> | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  console.log('[KeralaMap component render] ClientMap is:', !!ClientMap);

  useEffect(() => {
    console.log('[KeralaMap useEffect triggered]');
    let isMounted = true;
    import('@/components/map/OpenStreetMapClient')
      .then((mod) => {
        console.log('[KeralaMap] PROMISE RESOLVED! mod=', !!mod, 'default=', !!mod?.default);
        if (isMounted) {
          setClientMap(() => mod.default);
        }
      })
      .catch((err) => {
        console.error('[KeralaMap] PROMISE REJECTED!', err);
        if (isMounted) {
          setLoadError(err?.message || String(err));
        }
      });

    return () => {
      console.log('[KeralaMap useEffect cleanup]');
      isMounted = false;
    };
  }, []);

  if (loadError) {
    return (
      <div className="relative w-full h-full min-h-[480px] bg-red-50/50 rounded-xl overflow-hidden border border-red-200 shadow-xs flex flex-col items-center justify-center text-center p-6 text-red-800">
        <p className="font-semibold text-sm mb-1">Failed to initialize map engine</p>
        <p className="text-xs font-mono text-red-600 max-w-md">{loadError}</p>
      </div>
    );
  }

  if (!ClientMap) {
    return (
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
    );
  }

  return (
    <div className="w-full h-full flex-1 flex flex-col min-h-[480px]">
      <ClientMap {...props} />
    </div>
  );
}
