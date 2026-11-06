'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MOCK_LISTINGS } from '@/data/mock-listings';
import { KERALA_DISTRICTS } from '@/data/mock-districts';
import { CulturalListing } from '@/lib/types';
import KeralaMap from '@/components/map/KeralaMap';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  MapPin,
  ShieldCheck,
  ExternalLink,
  Map as MapIcon,
  List as ListIcon,
  X
} from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function ExplorePage() {
  const { t } = useLanguage();

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedVerification, setSelectedVerification] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'name' | 'district'>('featured');
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  // Selected & Hovered marker states for map synchronization
  const [selectedListing, setSelectedListing] = useState<CulturalListing | null>(null);
  const [hoveredListingId, setHoveredListingId] = useState<string | null>(null);

  // Mobile Map vs List toggle
  const [mobileActiveView, setMobileActiveView] = useState<'list' | 'map'>('list');

  const categories = [
    'All',
    'Ritual Art',
    'Sacred Space',
    'Traditional Craft',
    'Cultural Institution',
    'Martial Tradition',
  ];

  const verificationStatuses = ['All', 'Verified', 'Scholar Reviewed'];

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((listing) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        listing.name.toLowerCase().includes(q) ||
        listing.nameMalayalam.toLowerCase().includes(q) ||
        listing.artForm.toLowerCase().includes(q) ||
        listing.locality.toLowerCase().includes(q) ||
        listing.district.toLowerCase().includes(q) ||
        listing.shortDescription.toLowerCase().includes(q);

      const matchesDistrict =
        selectedDistrict === 'All' || listing.district === selectedDistrict;

      const matchesCategory =
        selectedCategory === 'All' || listing.category === selectedCategory;

      const matchesVerification =
        selectedVerification === 'All' ||
        listing.verificationStatus === selectedVerification;

      return (
        matchesSearch &&
        matchesDistrict &&
        matchesCategory &&
        matchesVerification
      );
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'district') return a.district.localeCompare(b.district);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, selectedDistrict, selectedCategory, selectedVerification, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedDistrict('All');
    setSelectedCategory('All');
    setSelectedVerification('All');
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedDistrict !== 'All' ||
    selectedCategory !== 'All' ||
    selectedVerification !== 'All';

  return (
    <div className="flex-1 w-full flex flex-col bg-[#FBF9F5]">
      {/* Subheader Bar */}
      <div className="bg-white border-b border-[#E8E2D6] py-2.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#8C8273]">
            <Link href="/" className="hover:text-[#181512]">
              {t('Home', 'ഹോം')}
            </Link>
            <span>/</span>
            <span className="font-medium text-[#181512]">
              {t('Cultural Directory & Map', 'സാംസ്കാരിക ഭൂപടം')}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[#5C554B]">
            <span>
              <strong className="text-[#181512] font-semibold tabular-nums">{filteredListings.length}</strong>{' '}
              {t('places documented', 'കേന്ദ്രങ്ങൾ')}
            </span>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-1 text-[#B21C01] hover:underline font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t('Reset', 'മാറ്റുക')}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Split Screen: 45% Directory / 55% Map */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-4 h-[calc(100vh-8.5rem)] min-h-[640px]">
        {/* LEFT PANEL (45%): Directory */}
        <div
          className={`w-full lg:w-[45%] h-full flex flex-col bg-white rounded-xl border border-[#E8E2D6] shadow-xs overflow-hidden ${
            mobileActiveView === 'map' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Controls Header */}
          <div className="p-4 border-b border-[#E8E2D6] bg-white flex flex-col gap-3">
            {/* Search Box: Clean 8px radius */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#8C8273] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t(
                  'Search art form, shrine, or district...',
                  'കലാരൂപം, ജില്ല, അല്ലെങ്കിൽ കേന്ദ്രം തിരയുക...'
                )}
                className="w-full pl-9 pr-8 py-2 bg-[#FBF9F5] focus:bg-white rounded-md text-xs sm:text-sm font-medium border border-[#E8E2D6] focus:border-[#181512] focus:outline-none transition-colors placeholder:text-[#8C8273]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C8273] hover:text-[#181512]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Tags & Filter Trigger */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 flex-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#181512] text-white'
                        : 'bg-[#F3EFE8] hover:bg-[#EAE4D9] text-[#5C554B]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                  showFiltersDrawer || selectedDistrict !== 'All' || selectedVerification !== 'All'
                    ? 'bg-[#181512] text-white border-[#181512]'
                    : 'bg-[#F3EFE8] text-[#5C554B] border-[#E8E2D6] hover:bg-[#EAE4D9]'
                }`}
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Filters</span>
              </button>
            </div>

            {/* Filter Drawer */}
            {showFiltersDrawer && (
              <div className="pt-3 border-t border-[#EDE7DC] grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-[#8C8273] mb-1 block">
                    DISTRICT
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full text-xs font-medium bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-2 py-1.5 focus:outline-none"
                  >
                    <option value="All">All 14 Districts</option>
                    {KERALA_DISTRICTS.map((d) => (
                      <option key={d.code} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#8C8273] mb-1 block">
                    VERIFICATION
                  </label>
                  <select
                    value={selectedVerification}
                    onChange={(e) => setSelectedVerification(e.target.value)}
                    className="w-full text-xs font-medium bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-2 py-1.5 focus:outline-none"
                  >
                    {verificationStatuses.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#8C8273] mb-1 block">
                    SORT BY
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full text-xs font-medium bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-2 py-1.5 focus:outline-none"
                  >
                    <option value="featured">Featured First</option>
                    <option value="name">Alphabetical</option>
                    <option value="district">By District</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Directory Listings */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[#EDE7DC]">
            {filteredListings.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[#8C8273]">
                <Search className="w-6 h-6 text-[#D8D1C4] mb-2" />
                <h4 className="font-semibold text-[#181512] text-xs mb-1">
                  No records match your filter criteria
                </h4>
                <p className="text-[11px] text-[#5C554B] max-w-xs mb-3">
                  Try adjusting the district or search term.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-3 py-1.5 rounded-md bg-[#181512] text-white text-xs font-medium hover:bg-[#B21C01] transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              filteredListings.map((listing) => {
                const isSelected = selectedListing?.id === listing.id;
                const isHovered = hoveredListingId === listing.id;

                return (
                  <div
                    key={listing.id}
                    onMouseEnter={() => setHoveredListingId(listing.id)}
                    onMouseLeave={() => setHoveredListingId(null)}
                    onClick={() => setSelectedListing(listing)}
                    className={`pt-3 first:pt-0 cursor-pointer rounded-lg p-2.5 transition-colors ${
                      isSelected
                        ? 'bg-[#F8F5EE] border border-[#E8E2D6]'
                        : isHovered
                        ? 'bg-[#FBF9F5]'
                        : 'bg-transparent'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="relative w-20 h-20 rounded-md overflow-hidden bg-[#F3EFE8] flex-shrink-0 border border-[#E8E2D6]">
                        <img
                          src={listing.imageUrl}
                          alt={listing.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[10px] text-[#8C8273]">
                            <span className="font-mono">
                              № KL-{listing.district.substring(0, 3).toUpperCase()}-{listing.id.replace('c-', '')}
                            </span>
                            <span className="text-[#2D6A4F] font-medium flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" />
                              <span>{listing.verificationStatus}</span>
                            </span>
                          </div>

                          <h3 className="font-semibold text-xs sm:text-sm text-[#181512] hover:text-[#B21C01] transition-colors leading-snug mt-0.5">
                            {listing.name}
                          </h3>
                          <div className="text-[11px] text-[#8C8273] font-serif">
                            {listing.nameMalayalam}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[11px]">
                          <span className="text-[#5C554B] flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#8C8273]" />
                            <span>{listing.locality}, {listing.district}</span>
                          </span>

                          <Link
                            href={`/culture/${listing.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="font-medium text-[#181512] hover:text-[#B21C01] flex items-center gap-1"
                          >
                            <span>Read</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT PANEL (55%): Fixed Kerala GIS Map */}
        <div
          className={`w-full lg:w-[55%] h-full flex flex-col ${
            mobileActiveView === 'list' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <KeralaMap
            listings={filteredListings}
            selectedListing={selectedListing}
            onSelectListing={setSelectedListing}
            hoveredListingId={hoveredListingId}
          />
        </div>
      </div>

      {/* Mobile Floating Toggle: Clean 6px button */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() =>
            setMobileActiveView((prev) => (prev === 'list' ? 'map' : 'list'))
          }
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#181512] text-white font-medium text-xs shadow-md border border-[#2D2A26]"
        >
          {mobileActiveView === 'list' ? (
            <>
              <MapIcon className="w-3.5 h-3.5 text-[#E8E2D6]" />
              <span>{t('View Map', 'ഭൂപടം കാണുക')}</span>
            </>
          ) : (
            <>
              <ListIcon className="w-3.5 h-3.5 text-[#E8E2D6]" />
              <span>{t('View List', 'ലിസ്റ്റ് കാണുക')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
