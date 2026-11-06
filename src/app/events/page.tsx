'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MOCK_EVENTS } from '@/data/mock-events';
import { KERALA_DISTRICTS } from '@/data/mock-districts';
import { Calendar, Clock, MapPin, Search, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function EventsPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'all' | 'upcoming' | 'annual'>('all');

  const categories = ['All', 'Temple Festival & Percussion', 'Ritual Theatre', 'Classical Arts Festival', 'Water Heritage & Feasting'];

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter((ev) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        ev.title.toLowerCase().includes(q) ||
        ev.titleMalayalam.toLowerCase().includes(q) ||
        ev.venue.toLowerCase().includes(q) ||
        ev.district.toLowerCase().includes(q) ||
        ev.artForm.toLowerCase().includes(q);

      const matchesDistrict =
        selectedDistrict === 'All' || ev.district === selectedDistrict;

      const matchesCategory =
        selectedCategory === 'All' || ev.category === selectedCategory;

      const matchesTimeframe =
        selectedTimeframe === 'all' ||
        (selectedTimeframe === 'upcoming' && ev.status === 'Confirmed') ||
        (selectedTimeframe === 'annual' && ev.status === 'Annual Season');

      return matchesSearch && matchesDistrict && matchesCategory && matchesTimeframe;
    });
  }, [searchQuery, selectedDistrict, selectedCategory, selectedTimeframe]);

  return (
    <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Header */}
      <div className="max-w-2xl mb-8">
        <div className="text-xs font-bold uppercase tracking-widest text-[#FF5931] mb-2 font-mono">
          {t('LIVING FESTIVAL CHRONICLE', 'ഉത്സവ പൈതൃക രേഖ')}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-950 tracking-tight leading-tight">
          {t('Cultural Events & Living Rituals', 'സാംസ്കാരിക ഉത്സവങ്ങൾ & അനുഷ്ഠാനങ്ങൾ')}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base mt-2">
          {t(
            'Explore temple poorams, shadow puppet nights, classical festivals, and seasonal ritual manifestations across Kerala.',
            'പൂരങ്ങൾ, തെയ്യങ്ങൾ, തോൽപ്പാവക്കൂത്ത്, ശാസ്ത്രീയ സംഗീതോത്സവങ്ങൾ തുടങ്ങിയവയുടെ തീയതികളും വിവരങ്ങളും.'
          )}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/90 shadow-xs mb-8 flex flex-col gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t(
              'Search festival name, venue, or district ("Thrissur Pooram", "Vellattam")...',
              'ഉത്സവം, വേദി അല്ലെങ്കിൽ ജില്ല തിരയുക...'
            )}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-100 focus:bg-white rounded-full text-xs sm:text-sm font-medium border border-transparent focus:border-stone-400 focus:outline-none transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Filters Grid */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* District & Status Pickers */}
          <div className="flex items-center gap-2">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="text-xs font-semibold bg-stone-100 border border-stone-200 rounded-full px-3 py-1.5 focus:outline-none text-stone-700"
            >
              <option value="All">All Districts</option>
              {KERALA_DISTRICTS.map((d) => (
                <option key={d.code} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>

            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as any)}
              className="text-xs font-semibold bg-stone-100 border border-stone-200 rounded-full px-3 py-1.5 focus:outline-none text-stone-700"
            >
              <option value="all">All Timelines</option>
              <option value="upcoming">Confirmed Upcoming</option>
              <option value="annual">Annual Season</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Results */}
      <div className="flex flex-col gap-6">
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-stone-500 border border-stone-200">
            <Calendar className="w-8 h-8 text-stone-300 mx-auto mb-2" />
            <h4 className="font-bold text-stone-800 text-sm">No events match your criteria</h4>
            <p className="text-xs text-stone-500 mt-1">
              Try choosing "All Districts" or clearing search filters.
            </p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row group"
            >
              {/* Event Image Banner */}
              <div className="md:w-72 relative bg-stone-100 flex-shrink-0">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-stone-900 shadow-xs">
                    {event.district}
                  </span>
                </div>
              </div>

              {/* Event Information */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#FF5931] uppercase tracking-wider font-mono">
                        {event.category}
                      </span>
                      <span>·</span>
                      <span className="text-xs text-stone-500">{event.entryType}</span>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {event.status}
                    </span>
                  </div>

                  <Link href={`/events/${event.slug}`}>
                    <h3 className="text-xl md:text-2xl font-bold text-stone-950 group-hover:text-[#FF5931] transition-colors leading-snug">
                      {event.title}
                    </h3>
                  </Link>
                  <div className="text-xs text-stone-500 font-medium mt-0.5 mb-3">
                    {event.titleMalayalam}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 p-3.5 rounded-2xl border border-stone-200/60 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#FF9041]" />
                      <span className="font-semibold text-stone-900">{event.formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <MapPin className="w-3.5 h-3.5 text-[#FF5931]" />
                      <span>{event.venue}, {event.locality}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{event.lastConfirmedDate}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={event.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-500 hover:text-black flex items-center gap-1"
                    >
                      <span>Official Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <Link
                      href={`/events/${event.slug}`}
                      className="rounded-full bg-stone-900 hover:bg-[#FF9041] text-white font-semibold px-4 py-2 transition-colors flex items-center gap-1"
                    >
                      <span>Details & Schedule</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
