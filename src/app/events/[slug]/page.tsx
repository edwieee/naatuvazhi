import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_EVENTS } from '@/data/mock-events';
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Users,
  Compass,
  ArrowLeft,
  Info
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return MOCK_EVENTS.map((event) => ({
    slug: event.slug,
  }));
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = MOCK_EVENTS.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const relatedEvents = MOCK_EVENTS.filter((e) => e.id !== event.id).slice(0, 2);

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-6 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/events" className="hover:text-black transition-colors">
          Events & Festivals
        </Link>
        <span>/</span>
        <span className="text-stone-900 font-semibold truncate max-w-xs">{event.title}</span>
      </nav>

      {/* Header Block */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-[#FF5931] border border-orange-200">
            {event.category}
          </span>
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{event.status}</span>
          </span>
          <span className="text-xs text-stone-500 ml-auto hidden sm:inline">
            {event.lastConfirmedDate}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-950 tracking-tight leading-tight">
          {event.title}
        </h1>

        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl text-stone-600 font-medium font-serif">
            {event.titleMalayalam}
          </h2>
          <span className="text-stone-400">·</span>
          <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#FF9041]" />
            <span>{event.venue}, {event.district}</span>
          </div>
        </div>
      </div>

      {/* Hero Event Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-stone-200/90 shadow-md mb-10 bg-stone-900">
        <div className="aspect-[16/9] w-full max-h-[480px] overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 bg-stone-950/90 text-stone-300 text-xs flex flex-wrap items-center justify-between gap-4 border-t border-stone-800">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-[#FF9041]" />
            <span className="font-semibold text-white">{event.formattedDate} ({event.time})</span>
          </div>
          <span className="text-stone-400 font-mono text-[11px]">{event.entryType}</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column: Context, Schedule */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Overview */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
            <h3 className="text-lg font-bold text-stone-950 mb-3 pb-2 border-b border-stone-100">
              About the Festival / Event
            </h3>
            <p className="text-stone-700 leading-relaxed text-sm sm:text-base mb-6">
              {event.description}
            </p>

            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FF9041] mb-2 font-mono">
              Cultural & Historical Context
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed">
              {event.culturalContext}
            </p>
          </div>

          {/* Schedule Highlights Sequence */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
            <h3 className="text-lg font-bold text-stone-950 mb-4 pb-2 border-b border-stone-100 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#FF9041]" />
              <span>Ritual & Performance Schedule</span>
            </h3>

            <div className="relative border-l-2 border-orange-200 ml-3 space-y-6 pl-6 py-2">
              {event.scheduleHighlights.map((highlight, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#FF9041] border-2 border-white shadow-xs"></div>
                  <div className="text-xs font-mono font-bold text-[#FF9041]">
                    {highlight.time}
                  </div>
                  <div className="text-sm font-semibold text-stone-900 mt-0.5">
                    {highlight.item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Organizer, Venue, Source */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs flex flex-col gap-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Organizer & Verification
            </h3>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-[#FF9041]">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="text-[10px] font-mono uppercase text-stone-400 block">
                  ORGANIZING BODY
                </span>
                <span className="font-bold text-stone-900">{event.organizer}</span>
                <p className="text-stone-500 mt-0.5">{event.locality}, {event.district}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-600">
              <div className="flex items-center gap-1.5 font-semibold text-stone-900 mb-1">
                <Info className="w-4 h-4 text-[#FF9041]" />
                <span>Visitor Protocol</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Crowd controls and traditional dress code may be in effect at sacred venues. Please verify on-ground ritual timings before travel.
              </p>
            </div>

            <a
              href={event.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs py-2.5 px-4 text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Official Event Announcement</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/events"
              className="rounded-full border border-stone-300 hover:border-black text-stone-800 font-semibold text-xs py-2 px-4 text-center transition-colors flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Calendar</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
