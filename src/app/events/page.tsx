'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { MOCK_EVENTS } from '@/data/mock-events';
import { KERALA_DISTRICTS } from '@/data/mock-districts';
import { Calendar, Clock, MapPin, Search, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';
import { EVENT_CATEGORIES, getEvents, KERALA_PLATFORM_DATE } from '@/lib/supabase/data-service';
import { EventListing } from '@/lib/types';

export default function EventsPage() {
  const { language, t } = useLanguage();
  const [events, setEvents] = useState<EventListing[]>(MOCK_EVENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'upcoming' | 'all' | 'past'>('upcoming');

  const categories = ['All', ...EVENT_CATEGORIES];

  useEffect(() => {
    let isMounted = true;
    getEvents()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setEvents(data);
        }
      })
      .catch((err) => {
        console.warn('Fallback to local mock events:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
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

      const isUpcoming = ev.date >= KERALA_PLATFORM_DATE && ev.status !== 'Completed';
      const isPast = ev.date < KERALA_PLATFORM_DATE || ev.status === 'Completed';

      const matchesTimeframe =
        selectedTimeframe === 'all' ||
        (selectedTimeframe === 'upcoming' && isUpcoming) ||
        (selectedTimeframe === 'past' && isPast);

      return matchesSearch && matchesDistrict && matchesCategory && matchesTimeframe;
    });
  }, [events, searchQuery, selectedDistrict, selectedCategory, selectedTimeframe]);

  return (
    <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="max-w-2xl mb-8">
        <div className="text-xs font-mono text-[#8C8273] mb-1">
          {t('FESTIVAL CHRONICLE', 'ഉത്സവ പൈതൃക രേഖ')}
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#181512] tracking-tight">
          {t('Cultural Events & Living Rituals', 'സാംസ്കാരിക ഉത്സവങ്ങൾ & അനുഷ്ഠാനങ്ങൾ')}
        </h1>
        <p className="text-xs sm:text-sm text-[#5C554B] mt-1.5 leading-relaxed">
          {t(
            'Temple poorams, chariot festivals, snake boat regattas, and classical cultural gatherings documented with authentic dates and sanctum visitor protocols.',
            'രഥോത്സവങ്ങൾ, വള്ളംകളികൾ, തെയ്യങ്ങൾ, ശാസ്ത്രീയ സംഗീതോത്സവങ്ങൾ തുടങ്ങിയവയുടെ തീയതികളും വിവരങ്ങളും.'
          )}
        </p>
      </div>

      {/* Filter and Search Bar: Clean Apple-inspired minimal interface */}
      <div className="bg-white rounded-xl p-4 border border-[#E8E2D6] shadow-xs mb-6 flex flex-col gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8C8273] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t(
              'Search festival name, venue, or district...',
              'ഉത്സവം, വേദി അല്ലെങ്കിൽ ജില്ല തിരയുക...'
            )}
            className="w-full pl-9 pr-4 py-2 bg-[#FBF9F5] focus:bg-white rounded-md text-xs sm:text-sm font-medium border border-[#E8E2D6] focus:border-[#181512] focus:outline-none transition-colors placeholder:text-[#8C8273]"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Category Tags */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#181512] text-white'
                    : 'bg-[#F3EFE8] hover:bg-[#EAE4D9] text-[#5C554B]'
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
              className="text-xs font-medium bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-2.5 py-1 focus:outline-none text-[#181512]"
            >
              <option value="All">{t('All Districts', 'എല്ലാ ജില്ലകളും')}</option>
              {KERALA_DISTRICTS.map((d) => (
                <option key={d.code} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>

            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as any)}
              className="text-xs font-medium bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-2.5 py-1 focus:outline-none text-[#181512]"
            >
              <option value="upcoming">{t('Confirmed Upcoming', 'വരവറിയിക്കുന്നവ (Upcoming)')}</option>
              <option value="all">{t('All Timelines', 'മുഴുവൻ ഉത്സവങ്ങൾ (All)')}</option>
              <option value="past">{t('Past Festivals / Archive', 'കഴിഞ്ഞ ഉത്സവങ്ങൾ (Archive)')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Results */}
      <div className="flex flex-col gap-4">
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-[#8C8273] border border-[#E8E2D6]">
            <Calendar className="w-6 h-6 text-[#D8D1C4] mx-auto mb-2" />
            <h4 className="font-semibold text-[#181512] text-xs">
              {t('No events match your criteria', 'തിരഞ്ഞെടുത്ത മാനദണ്ഡങ്ങൾക്ക് അനുയോജ്യമായ വിവരങ്ങൾ ലഭ്യമല്ല')}
            </h4>
            <p className="text-[11px] text-[#5C554B] mt-1">
              {t('Try adjusting the district or timeframe filter.', 'ദയവായി ജില്ല അല്ലെങ്കിൽ ടൈംലൈൻ ഫിൽട്ടർ മാറ്റുക.')}
            </p>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const isCompleted = event.status === 'Completed';

            return (
              <div
                key={event.id}
                className="bg-white rounded-xl overflow-hidden border border-[#E8E2D6] hover:border-[#BFB5A5] transition-colors flex flex-col md:flex-row"
              >
                {/* Event Image */}
                <div className="md:w-64 relative bg-[#F3EFE8] flex-shrink-0">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-44 md:h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono uppercase bg-[#181512]/85 text-white">
                      {event.district}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#8C8273] mb-1.5">
                      <span className="font-mono text-[11px]">{event.category}</span>
                      <span
                        className={`font-medium text-[11px] px-2 py-0.5 rounded-full ${
                          isCompleted
                            ? 'bg-[#F3EFE8] text-[#5C554B] border border-[#E8E2D6]'
                            : 'bg-[#eef7ee] text-[#246b24] border border-[#cbe6cb]'
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>

                    <Link href={`/events/${event.slug}`}>
                      <h3 className="text-lg font-semibold text-[#181512] hover:text-[#B21C01] transition-colors leading-snug">
                        {language === 'ml' && event.titleMalayalam ? event.titleMalayalam : event.title}
                      </h3>
                    </Link>
                    {language !== 'ml' && event.titleMalayalam && (
                      <div className="text-xs text-[#8C8273] font-malayalam mt-0.5 mb-2">
                        {event.titleMalayalam}
                      </div>
                    )}

                    <p className="text-xs text-[#5C554B] line-clamp-2 leading-relaxed mb-3">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#5C554B] bg-[#F8F5EE] p-2.5 rounded-md border border-[#EDE7DC]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#8C8273]" />
                        <span className="font-medium text-[#181512]">{event.formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#8C8273]" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#8C8273]" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#EDE7DC] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#8C8273] flex items-center gap-1">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${isCompleted ? 'text-[#8C8273]' : 'text-[#2D6A4F]'}`}
                      />
                      <span>{event.lastConfirmedDate}</span>
                    </span>

                    <div className="flex items-center gap-3">
                      <a
                        href={event.sourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8C8273] hover:text-[#181512] flex items-center gap-1"
                      >
                        <span>{t('Announcement', 'വിവരങ്ങൾ')}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                      <Link
                        href={`/events/${event.slug}`}
                        className="rounded-md bg-[#181512] hover:bg-[#B21C01] text-white font-medium px-3 py-1.5 transition-colors flex items-center gap-1"
                      >
                        <span>{isCompleted ? t('Archive & Story', 'ആർക്കൈവ്') : t('Schedule', 'സമയക്രമം')}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
