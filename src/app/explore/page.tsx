'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MOCK_LISTINGS } from '@/data/mock-listings';
import { KERALA_DISTRICTS } from '@/data/mock-districts';
import { CulturalListing, DistrictName } from '@/lib/types';
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
  X,
  ChevronDown
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

  // Categories list
  const categories = [
    'All',
    'Ritual Art',
    'Sacred Space',
    'Traditional Craft',
    'Cultural Institution',
    'Martial Tradition',
  ];

  // Verification options
  const verificationStatuses = ['All', 'Verified', 'Scholar Reviewed'];

  // Filtered and sorted listings
  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((listing) => {
      // Text search in name, malayalam name, artForm, locality, or district
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        listing.name.toLowerCase().includes(q) ||
        listing.nameMalayalam.toLowerCase().includes(q) ||
        listing.artForm.toLowerCase().includes(q) ||
        listing.locality.toLowerCase().includes(q) ||
        listing.district.toLowerCase().includes(q) ||
        listing.shortDescription.toLowerCase().includes(q);

      // District filter
      const matchesDistrict =
        selectedDistrict === 'All' || listing.district === selectedDistrict;

      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || listing.category === selectedCategory;

      // Verification status filter
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
    <div className="flex-1 w-full flex flex-col bg-[#F5F5F5]">
      {/* Top Breadcrumb & Page Subheader */}
      <div className="bg-white/80 border-b border-stone-200/90 py-3 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-stone-500">
            <Link href="/" className="hover:text-black">
              {t('Home', 'ഹോം')}
            </Link>
            <span>/</span>
            <span className="font-semibold text-stone-900">
              {t('Cultural Directory & Map', 'സാംസ്കാരിക ഭൂപടം')}
            </span>
          </div>

          <div className="flex items-center gap-3 text-stone-600">
            <span>
              <strong className="text-stone-900 font-semibold">{filteredListings.length}</strong>{' '}
              {t('cultural places found', 'കേന്ദ്രങ്ങൾ കണ്ടെത്തി')}
            </span>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-1 text-[#FF5931] hover:underline font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t('Reset filters', 'ഫിൽട്ടറുകൾ മാറ്റുക')}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Split Screen Area: 45% Left (Directory) / 55% Right (Map) */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 md:p-6 flex flex-col lg:flex-row gap-6 h-[calc(100vh-9.5rem)] min-h-[640px]">
        {/* ======================================================== */}
        {/* LEFT PANEL (45%): Independently Scrollable Directory */}
        {/* ======================================================== */}
        <div
          className={`w-full lg:w-[45%] h-full flex flex-col bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden ${
            mobileActiveView === 'map' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Controls Header (Sticky inside panel) */}
          <div className="p-4 sm:p-5 border-b border-stone-200/80 bg-white/95 backdrop-blur-md flex flex-col gap-3">
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t(
                  'Search "Theyyam", "Thrissur", "കളരിപ്പയറ്റ്"...',
                  'കലാരൂപം, ജില്ല, അല്ലെങ്കിൽ കേന്ദ്രം തിരയുക...'
                )}
                className="w-full pl-10 pr-9 py-2.5 bg-stone-100 hover:bg-stone-100/80 focus:bg-white rounded-full text-xs sm:text-sm font-medium border border-transparent focus:border-stone-400 focus:outline-none transition-all placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filter Bar & Sort dropdown */}
            <div className="flex items-center justify-between gap-2">
              {/* Category Pills (Horizontal Scroll) */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 flex-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Filter drawer toggle button */}
              <button
                onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-colors ${
                  showFiltersDrawer || selectedDistrict !== 'All' || selectedVerification !== 'All'
                    ? 'bg-[#FF9041] text-white border-[#FF9041]'
                    : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
                }`}
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Filters</span>
              </button>
            </div>

            {/* Expanded Filters Drawer (District, Verification, Sort) */}
            {showFiltersDrawer && (
              <div className="pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in duration-150">
                {/* District Filter */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1 block">
                    District
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full text-xs font-semibold bg-stone-100 border border-stone-200 rounded-xl px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="All">All 14 Districts</option>
                    {KERALA_DISTRICTS.map((d) => (
                      <option key={d.code} value={d.name}>
                        {d.name} ({d.nameMalayalam})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Verification Status */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1 block">
                    Verification
                  </label>
                  <select
                    value={selectedVerification}
                    onChange={(e) => setSelectedVerification(e.target.value)}
                    className="w-full text-xs font-semibold bg-stone-100 border border-stone-200 rounded-xl px-2.5 py-1.5 focus:outline-none"
                  >
                    {verificationStatuses.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1 block">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full text-xs font-semibold bg-stone-100 border border-stone-200 rounded-xl px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="featured">Featured First</option>
                    <option value="name">Alphabetical (A-Z)</option>
                    <option value="district">By District</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Scrollable Results Listing Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-stone-100">
            {filteredListings.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-stone-500">
                <Search className="w-8 h-8 text-stone-300 mb-3" />
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  No cultural listings match your filter
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mb-4">
                  Try adjusting the district or search keyword, or submit this unmapped place to our community archives.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  Clear all filters
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
                    className={`pt-4 first:pt-0 cursor-pointer group transition-all rounded-2xl p-3 ${
                      isSelected
                        ? 'bg-orange-50/70 border border-orange-200 shadow-xs'
                        : isHovered
                        ? 'bg-stone-50'
                        : 'bg-transparent'
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* Image Thumbnail */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200/80">
                        <img
                          src={listing.imageUrl}
                          alt={listing.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md bg-stone-900/80 text-white text-[9px] font-mono font-medium">
                          {listing.district}
                        </span>
                      </div>

                      {/* Info Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5931] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200/60">
                              {listing.category}
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">{listing.verificationStatus}</span>
                            </span>
                          </div>

                          <h3 className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-[#FF5931] transition-colors mt-1 leading-snug">
                            {listing.name}
                          </h3>
                          <div className="text-[11px] text-stone-500 font-medium">
                            {listing.nameMalayalam}
                          </div>

                          <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                            {listing.shortDescription}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-stone-100/80 mt-2">
                          <span className="text-[11px] text-stone-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#FF9041]" />
                            <span>{listing.locality}</span>
                          </span>

                          <Link
                            href={`/culture/${listing.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-semibold text-stone-900 hover:text-[#FF5931] flex items-center gap-1 group-hover:underline"
                          >
                            <span>Explore Story</span>
                            <ExternalLink className="w-3 h-3" />
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

        {/* ======================================================== */}
        {/* RIGHT PANEL (55%): Fixed / Realistic Kerala Map */}
        {/* ======================================================== */}
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

      {/* Mobile Floating List / Map Toggle Button */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() =>
            setMobileActiveView((prev) => (prev === 'list' ? 'map' : 'list'))
          }
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white font-semibold text-xs shadow-2xl border border-stone-700 active:scale-95 transition-all"
        >
          {mobileActiveView === 'list' ? (
            <>
              <MapIcon className="w-4 h-4 text-[#FFB658]" />
              <span>{t('View Map', 'ഭൂപടം കാണുക')}</span>
            </>
          ) : (
            <>
              <ListIcon className="w-4 h-4 text-[#FFB658]" />
              <span>{t('View List', 'ലിസ്റ്റ് കാണുക')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
