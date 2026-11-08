import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_EVENTS } from '@/data/mock-events';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Users,
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

  const isCompleted = event.status === 'Completed';

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-8 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#8C8273] mb-6 flex-wrap">
        <Link href="/" className="hover:text-[#181512] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/events" className="hover:text-[#181512] transition-colors">
          Events & Festivals
        </Link>
        <span>/</span>
        <span className="text-[#181512] font-medium truncate max-w-xs">{event.title}</span>
      </nav>

      {/* Header Block */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#8C8273]">{event.category}</span>
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

        <h1 className="text-3xl sm:text-4xl font-semibold text-[#181512] tracking-tight leading-tight">
          {event.title}
        </h1>

        <div className="flex items-center gap-3">
          <h2 className="text-xl text-[#5C554B] font-malayalam">
            {event.titleMalayalam}
          </h2>
          <span className="text-[#8C8273]">·</span>
          <div className="flex items-center gap-1 text-xs text-[#5C554B]">
            <MapPin className="w-3.5 h-3.5 text-[#8C8273]" />
            <span>{event.venue}, {event.district}</span>
          </div>
        </div>
      </div>

      {/* Hero Event Banner */}
      <div className="relative rounded-xl overflow-hidden border border-[#E8E2D6] shadow-xs mb-8 bg-[#181512]">
        <div className="aspect-[16/9] w-full max-h-[440px] overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3 bg-[#181512] text-[#A8A29E] text-xs flex flex-wrap items-center justify-between gap-4 border-t border-[#2D2A26]">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#E8E2D6]" />
            <span className="text-white font-medium">{event.formattedDate} ({event.time})</span>
          </div>
          <span className="text-[#8C8273] font-mono text-[10px]">{event.entryType}</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Context, Schedule */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-xl p-6 border border-[#E8E2D6] shadow-xs">
            <h3 className="text-sm font-semibold text-[#181512] mb-2 pb-2 border-b border-[#EDE7DC]">
              About the festival
            </h3>
            <p className="text-[#5C554B] leading-relaxed text-xs sm:text-sm mb-4">
              {event.description}
            </p>

            <h4 className="text-xs font-mono text-[#8C8273] mb-1.5">
              CULTURAL & HISTORICAL CONTEXT
            </h4>
            <p className="text-xs text-[#5C554B] leading-relaxed">
              {event.culturalContext}
            </p>
          </div>

          {/* Schedule Highlights Sequence */}
          {event.scheduleHighlights && event.scheduleHighlights.length > 0 && (
            <div className="bg-white rounded-xl p-6 border border-[#E8E2D6] shadow-xs">
              <h3 className="text-sm font-semibold text-[#181512] mb-4 pb-2 border-b border-[#EDE7DC] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8C8273]" />
                <span>Ritual & Performance Schedule</span>
              </h3>

              <div className="border-l border-[#E8E2D6] ml-2 space-y-4 pl-4 py-1">
                {event.scheduleHighlights.map((highlight, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#B21C01] border-2 border-white"></div>
                    <div className="text-xs font-mono text-[#8C8273] tabular-nums">
                      {highlight.time}
                    </div>
                    <div className="text-xs font-semibold text-[#181512] mt-0.5">
                      {highlight.item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col gap-3">
            <h3 className="text-xs font-mono text-[#8C8273]">
              ORGANIZER & NOTICE
            </h3>

            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-md bg-[#F3EFE8] flex items-center justify-center text-[#8C8273]">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-[#181512] block">{event.organizer}</span>
                <p className="text-[#8C8273] text-[11px] mt-0.5">{event.locality}, {event.district}</p>
              </div>
            </div>

            <div className="p-3 rounded-md bg-[#F8F5EE] border border-[#E8E2D6] text-xs text-[#5C554B]">
              <div className="flex items-center gap-1.5 font-medium text-[#181512] mb-1">
                <Info className="w-3.5 h-3.5 text-[#8C8273]" />
                <span>Visitor notice</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Crowd regulations and customary attire apply at temple sanctums and regatta courses. Verify local guidelines before attending.
              </p>
            </div>

            <a
              href={event.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-[#181512] hover:bg-[#B21C01] text-white font-medium text-xs py-2 px-3 text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Official announcement</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <Link
              href="/events"
              className="rounded-md border border-[#E8E2D6] hover:border-[#181512] text-[#5C554B] hover:text-[#181512] font-medium text-xs py-1.5 px-3 text-center transition-colors flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to calendar</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
