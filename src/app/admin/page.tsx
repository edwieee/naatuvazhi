'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient as createBrowserClient } from '@/lib/supabase/client';
import {
  getListings,
  getEvents,
  getSubmissions,
  getHomepageConfig,
  getReviewLogs,
} from '@/lib/supabase/data-service';
import {
  actionCreateListing,
  actionUpdateListing,
  actionDeleteListing,
  actionCreateEvent,
  actionUpdateEvent,
  actionDeleteEvent,
  actionUpdateHomepageConfig,
} from '@/app/actions/curator-actions';
import {
  CulturalListing,
  EventListing,
  SubmissionReviewItem,
  DistrictName,
  ListingCategory,
} from '@/lib/types';
import {
  Search,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Check,
  ArrowRight,
} from 'lucide-react';

const KERALA_DISTRICTS_LIST: DistrictName[] = [
  'Kasaragod',
  'Kannur',
  'Wayanad',
  'Kozhikode',
  'Malappuram',
  'Palakkad',
  'Thrissur',
  'Ernakulam',
  'Idukki',
  'Kottayam',
  'Alappuzha',
  'Pathanamthitta',
  'Kollam',
  'Thiruvananthapuram',
];

const CATEGORIES_LIST: ListingCategory[] = [
  'Ritual Art',
  'Sacred Space',
  'Master Practitioner',
  'Traditional Craft',
  'Cultural Institution',
  'Martial Tradition',
  'Oral Heritage',
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [curatorEmail, setCuratorEmail] = useState<string>('curator.nattuvazhi@gmail.com');
  const [currentTab, setCurrentTab] = useState<
    'submissions' | 'listings' | 'events' | 'homepage' | 'audit'
  >('submissions');

  // Submissions State
  const [submissions, setSubmissions] = useState<SubmissionReviewItem[]>([]);
  const [subFilter, setSubFilter] = useState<'All' | 'Pending' | 'Approved' | 'Changes Requested' | 'Rejected'>('All');
  const [subSearch, setSubSearch] = useState('');

  // Listings State
  const [listings, setListings] = useState<CulturalListing[]>([]);
  const [listingSearch, setListingSearch] = useState('');
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<CulturalListing | null>(null);

  // Events State
  const [events, setEvents] = useState<EventListing[]>([]);
  const [eventSearch, setEventSearch] = useState('');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventListing | null>(null);

  // Homepage Config State
  const [homepageConfig, setHomepageConfig] = useState<Record<string, any>>({});
  const [heroHeadline, setHeroHeadline] = useState('');
  const [heroSubheadline, setHeroSubheadline] = useState('');

  // Audit Logs State
  const [reviewLogs, setReviewLogs] = useState<any[]>([]);

  // Feedback notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial data and curator session
  useEffect(() => {
    const sb = createBrowserClient();
    if (sb) {
      sb.auth.getUser().then(({ data }) => {
        if (data?.user?.email) {
          setCuratorEmail(data.user.email);
        }
      });
    }
    loadAllData();
  }, []);

  async function handleSignOut() {
    const sb = createBrowserClient();
    if (sb) {
      await sb.auth.signOut();
    }
    router.push('/admin/login');
    router.refresh();
  }

  async function loadAllData() {
    setIsLoading(true);
    try {
      const sb = createBrowserClient();
      const [subs, lists, evts, config, logs] = await Promise.all([
        getSubmissions(undefined, sb),
        getListings(undefined, sb),
        getEvents(undefined, sb),
        getHomepageConfig(sb),
        getReviewLogs(sb),
      ]);
      setSubmissions(subs);
      setListings(lists);
      setEvents(evts);
      setHomepageConfig(config);
      setHeroHeadline(config.hero_headline || 'Discover the culture that lives around you');
      setHeroSubheadline(
        config.hero_subheadline ||
          'A community-informed, scholar-verified living map of Kerala’s sacred groves, ritual performing arts, master practitioners, and craft guilds.'
      );
      setReviewLogs(logs);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setIsLoading(false);
    }
  }

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  }

  // Filtered Submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesTab = subFilter === 'All' || sub.status === subFilter;
    const matchesSearch =
      !subSearch ||
      sub.name.toLowerCase().includes(subSearch.toLowerCase()) ||
      sub.contributorName.toLowerCase().includes(subSearch.toLowerCase()) ||
      sub.district.toLowerCase().includes(subSearch.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Filtered Listings
  const filteredListings = listings.filter((item) => {
    if (!listingSearch) return true;
    const q = listingSearch.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.artForm.toLowerCase().includes(q) ||
      item.district.toLowerCase().includes(q) ||
      item.locality.toLowerCase().includes(q)
    );
  });

  // Filtered Events
  const filteredEvents = events.filter((ev) => {
    if (!eventSearch) return true;
    const q = eventSearch.toLowerCase();
    return (
      ev.title.toLowerCase().includes(q) ||
      ev.venue.toLowerCase().includes(q) ||
      ev.district.toLowerCase().includes(q) ||
      ev.artForm.toLowerCase().includes(q)
    );
  });

  // ====================================================================
  // LISTING HANDLERS
  // ====================================================================

  async function handleSaveListing(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload: Partial<CulturalListing> = {
      name: formData.get('name') as string,
      nameMalayalam: formData.get('nameMalayalam') as string,
      category: formData.get('category') as ListingCategory,
      artForm: formData.get('artForm') as string,
      district: formData.get('district') as DistrictName,
      locality: formData.get('locality') as string,
      address: formData.get('address') as string,
      shortDescription: formData.get('shortDescription') as string,
      fullStory: formData.get('fullStory') as string,
      culturalSignificance: formData.get('culturalSignificance') as string,
      visitorProtocol: formData.get('visitorProtocol') as string,
      imageUrl: formData.get('imageUrl') as string,
      imageCredit: formData.get('imageCredit') as string,
      featured: formData.get('featured') === 'on',
      verificationStatus: formData.get('verificationStatus') as any,
      verifiedBy: formData.get('verifiedBy') as string,
      coordinates: {
        lat: parseFloat(formData.get('latitude') as string) || 10.8505,
        lng: parseFloat(formData.get('longitude') as string) || 76.2711,
      },
    };

    if (editingListing) {
      const res = await actionUpdateListing(editingListing.id, payload);
      if (res.success && res.listing) {
        setListings((prev) =>
          prev.map((item) => (item.id === res.listing!.id ? res.listing! : item))
        );
        showToast(`Listing "${res.listing.name}" updated successfully.`);
      }
    } else {
      const res = await actionCreateListing(payload);
      if (res.success && res.listing) {
        setListings((prev) => [res.listing!, ...prev]);
        showToast(`Listing "${res.listing.name}" created and published.`);
      }
    }

    setIsListingModalOpen(false);
    setEditingListing(null);
  }

  async function handleToggleFeaturedListing(item: CulturalListing) {
    const newFeatured = !item.featured;
    const res = await actionUpdateListing(item.id, { featured: newFeatured });
    if (res.success && res.listing) {
      setListings((prev) =>
        prev.map((l) => (l.id === item.id ? { ...l, featured: newFeatured } : l))
      );
      showToast(
        `Listing "${item.name}" is now ${newFeatured ? 'featured on homepage' : 'unfeatured'}.`
      );
    }
  }

  async function handleDeleteListing(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete/archive listing "${name}"?`)) return;
    const res = await actionDeleteListing(id);
    if (res.success) {
      setListings((prev) => prev.filter((l) => l.id !== id));
      showToast(`Listing "${name}" archived from public view.`);
    }
  }

  // ====================================================================
  // EVENT HANDLERS
  // ====================================================================

  async function handleSaveEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload: Partial<EventListing> = {
      title: formData.get('title') as string,
      titleMalayalam: formData.get('titleMalayalam') as string,
      category: formData.get('category') as string,
      artForm: formData.get('artForm') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      venue: formData.get('venue') as string,
      district: formData.get('district') as DistrictName,
      locality: formData.get('locality') as string,
      organizer: formData.get('organizer') as string,
      description: formData.get('description') as string,
      sourceLink: formData.get('sourceLink') as string,
      status: formData.get('status') as any,
      entryType: formData.get('entryType') as any,
      imageUrl: formData.get('imageUrl') as string,
    };

    if (editingEvent) {
      const res = await actionUpdateEvent(editingEvent.id, payload);
      if (res.success && res.event) {
        setEvents((prev) =>
          prev.map((item) => (item.id === res.event!.id ? res.event! : item))
        );
        showToast(`Event "${res.event.title}" updated and re-verified.`);
      }
    } else {
      const res = await actionCreateEvent(payload);
      if (res.success && res.event) {
        setEvents((prev) => [res.event!, ...prev]);
        showToast(`Event "${res.event.title}" added to cultural calendar.`);
      }
    }

    setIsEventModalOpen(false);
    setEditingEvent(null);
  }

  async function handleQuickVerifyEvent(ev: EventListing) {
    const res = await actionUpdateEvent(ev.id, {
      lastConfirmedDate: new Date().toISOString(),
      status: 'Confirmed',
    });
    if (res.success && res.event) {
      setEvents((prev) =>
        prev.map((item) => (item.id === res.event!.id ? res.event! : item))
      );
      showToast(`Event "${ev.title}" verified for today.`);
    }
  }

  async function handleDeleteEvent(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete/archive event "${title}"?`)) return;
    const res = await actionDeleteEvent(id);
    if (res.success) {
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      showToast(`Event "${title}" archived.`);
    }
  }

  // ====================================================================
  // HOMEPAGE CONFIG HANDLER
  // ====================================================================

  async function handleSaveHomepageConfig(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await actionUpdateHomepageConfig('hero_headline', heroHeadline);
    await actionUpdateHomepageConfig('hero_subheadline', heroSubheadline);
    showToast('Homepage text configuration saved successfully!');
  }

  const pendingCount = submissions.filter((s) => s.status === 'Pending').length;

  return (
    <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1c16] text-white px-4 py-2.5 rounded-lg shadow-lg border border-[#38332c] text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#4ADE80]" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-[#8c8577] hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Clean Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-6 border-b border-[#e5e0d4]">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#aa3000]" />
            <span className="text-xs font-medium text-[#7d3b24]">
              Curator Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-[28px] font-semibold text-[#1c1c16] tracking-tight">
            Content Management
          </h1>
          <p className="text-xs sm:text-[13px] text-[#5d5e61] mt-1 max-w-xl leading-relaxed">
            Verified cultural listings, living festival calendar, and community accessions.
          </p>
        </div>

        {/* Clean, Unified Action & Account Bar */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#5d5e61]">
          <Link
            href="/explore"
            className="hover:text-[#1c1c16] transition-colors"
          >
            Directory
          </Link>
          <span className="text-[#c4bfb4]">·</span>
          <Link
            href="/events"
            className="hover:text-[#1c1c16] transition-colors"
          >
            Calendar
          </Link>
          <span className="text-[#c4bfb4]">·</span>
          <div className="flex items-center gap-1.5 text-[#1c1c16]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
            <span className="font-medium truncate max-w-[180px] sm:max-w-none">{curatorEmail}</span>
          </div>
          <span className="text-[#c4bfb4]">·</span>
          <button
            onClick={handleSignOut}
            className="text-[#aa3000] hover:text-[#7d2300] font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Understated, Compact Statistics Row */}
      <div className="bg-white/80 rounded-xl border border-[#e5e0d4] p-4 sm:p-5 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-[#e5e0d4]">
        <div className="md:px-4 first:pl-0">
          <div className="text-xs font-medium text-[#5d5e61]">Pending Submissions</div>
          <div className="text-xl sm:text-2xl font-semibold text-[#aa3000] tracking-tight mt-0.5">
            {pendingCount}
          </div>
          <div className="text-[11px] text-[#8c8577] mt-0.5">Awaiting review</div>
        </div>

        <div className="md:px-4">
          <div className="text-xs font-medium text-[#5d5e61]">Published Listings</div>
          <div className="text-xl sm:text-2xl font-semibold text-[#1c1c16] tracking-tight mt-0.5">
            {listings.length}
          </div>
          <div className="text-[11px] text-[#8c8577] mt-0.5">
            {listings.filter((l) => l.featured).length} featured on map
          </div>
        </div>

        <div className="md:px-4">
          <div className="text-xs font-medium text-[#5d5e61]">Active Festivals</div>
          <div className="text-xl sm:text-2xl font-semibold text-[#1c1c16] tracking-tight mt-0.5">
            {events.filter((ev) => ev.date >= '2026-11-08' && ev.status !== 'Completed').length}
          </div>
          <div className="text-[11px] text-[#8c8577] mt-0.5">Upcoming in calendar</div>
        </div>

        <div className="md:px-4 last:pr-0">
          <div className="text-xs font-medium text-[#5d5e61]">Curator Actions</div>
          <div className="text-xl sm:text-2xl font-semibold text-[#1c1c16] tracking-tight mt-0.5">
            {reviewLogs.length}
          </div>
          <div className="text-[11px] text-[#8c8577] mt-0.5">Logged in audit trail</div>
        </div>
      </div>

      {/* Clean, Text-Based Navigation Tabs */}
      <div className="flex items-center gap-6 border-b border-[#e5e0d4] mb-6 overflow-x-auto scrollbar-none text-xs">
        {[
          { id: 'submissions', label: 'Submissions', count: submissions.length },
          { id: 'listings', label: 'Cultural Listings', count: listings.length },
          { id: 'events', label: 'Events & Calendar', count: events.length },
          { id: 'homepage', label: 'Homepage Copy' },
          { id: 'audit', label: 'Audit History', count: reviewLogs.length },
        ].map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as any)}
              className={`pb-3 whitespace-nowrap transition-colors relative font-medium ${
                isActive
                  ? 'text-[#1c1c16] border-b-2 border-[#1c1c16]'
                  : 'text-[#5d5e61] hover:text-[#1c1c16] border-b-2 border-transparent'
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span className="ml-1.5 text-[11px] text-[#8c8577] font-normal">
                  ({tab.count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ================================================================ */}
      {/* TAB 1: SUBMISSIONS QUEUE */}
      {/* ================================================================ */}
      {currentTab === 'submissions' && (
        <div className="space-y-4">
          {/* Segmented Filter Control & Compact Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Segmented Controls */}
            <div className="inline-flex p-0.5 rounded-lg bg-[#ede8dc] border border-[#ded7c9] self-start sm:self-auto overflow-x-auto max-w-full">
              {(['All', 'Pending', 'Approved', 'Changes Requested', 'Rejected'] as const).map((tab) => {
                const isActive = subFilter === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setSubFilter(tab)}
                    className={`px-3 py-1 rounded-md text-xs whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-white text-[#1c1c16] font-medium shadow-2xs'
                        : 'text-[#5d5e61] hover:text-[#1c1c16]'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Compact Search Input */}
            <div className="relative sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#8c8577] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={subSearch}
                onChange={(e) => setSubSearch(e.target.value)}
                placeholder="Search accessions..."
                className="w-full h-8 pl-8 pr-3 bg-white/80 focus:bg-white rounded-lg text-xs border border-[#ded7c9] focus:border-[#1c1c16] focus:outline-none transition-colors placeholder:text-[#8c8577]"
              />
            </div>
          </div>

          {/* Refined Submissions Table */}
          <div className="bg-white/90 rounded-xl border border-[#e5e0d4] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#fbf9f2] border-b border-[#e5e0d4] text-[11px] font-medium text-[#7d7971]">
                  <tr>
                    <th className="py-2.5 px-4 font-medium">Accession</th>
                    <th className="py-2.5 px-4 font-medium">Cultural Record</th>
                    <th className="py-2.5 px-4 font-medium">Location</th>
                    <th className="py-2.5 px-4 font-medium">Contributor</th>
                    <th className="py-2.5 px-4 font-medium">Status</th>
                    <th className="py-2.5 px-4 text-right font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eee9df]">
                  {filteredSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-[#8c8577] text-xs">
                        No submissions found in this status queue
                      </td>
                    </tr>
                  ) : (
                    filteredSubmissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-[#f6f4ea]/50 transition-colors">
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="font-mono text-xs text-[#1c1c16] font-medium block">
                            {sub.id}
                          </span>
                          <span className="text-[11px] text-[#7d7971] block">
                            {sub.type}
                          </span>
                        </td>

                        <td className="py-3 px-4 max-w-xs">
                          <div className="text-[13px] font-medium text-[#1c1c16] line-clamp-1">
                            {sub.name}
                          </div>
                          <div className="text-xs text-[#5d5e61] line-clamp-1">
                            {sub.artForm}
                          </div>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="text-[13px] text-[#1c1c16] block">{sub.district}</span>
                          <span className="text-xs text-[#7d7971]">{sub.locality}</span>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="text-[13px] text-[#1c1c16] block">{sub.contributorName}</span>
                          <span className="text-xs text-[#7d7971]">{sub.contributorEmail}</span>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          {sub.status === 'Approved' ? (
                            <span className="inline-flex items-center gap-1.5 text-xs text-[#2d6a4f] font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                              <span>Approved</span>
                            </span>
                          ) : sub.status === 'Pending' ? (
                            <span className="inline-flex items-center gap-1.5 text-xs text-[#aa3000] font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#aa3000]" />
                              <span>Pending</span>
                            </span>
                          ) : sub.status === 'Rejected' ? (
                            <span className="inline-flex items-center gap-1.5 text-xs text-[#71717a] font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#71717a]" />
                              <span>Rejected</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs text-[#b45309] font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#b45309]" />
                              <span>Changes requested</span>
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <Link
                            href={`/admin/review/${sub.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#1c1c16] hover:bg-[#aa3000] text-white text-xs font-medium transition-colors"
                          >
                            <span>Review</span>
                            <ChevronRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 2: CULTURAL LISTINGS MANAGEMENT */}
      {/* ================================================================ */}
      {currentTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative sm:w-72">
              <Search className="w-3.5 h-3.5 text-[#8c8577] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={listingSearch}
                onChange={(e) => setListingSearch(e.target.value)}
                placeholder="Search cultural listings..."
                className="w-full h-8 pl-8 pr-3 bg-white/80 focus:bg-white rounded-lg text-xs border border-[#ded7c9] focus:border-[#1c1c16] focus:outline-none transition-colors"
              />
            </div>

            <button
              onClick={() => {
                setEditingListing(null);
                setIsListingModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#aa3000] hover:bg-[#882600] text-white rounded-md text-xs font-medium transition-colors self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Cultural Listing</span>
            </button>
          </div>

          <div className="bg-white/90 rounded-xl border border-[#e5e0d4] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#fbf9f2] border-b border-[#e5e0d4] text-[11px] font-medium text-[#7d7971]">
                  <tr>
                    <th className="py-2.5 px-4 font-medium">Listing</th>
                    <th className="py-2.5 px-4 font-medium">Category & Art Form</th>
                    <th className="py-2.5 px-4 font-medium">Location</th>
                    <th className="py-2.5 px-4 font-medium">Verification</th>
                    <th className="py-2.5 px-4 text-center font-medium">Featured</th>
                    <th className="py-2.5 px-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eee9df]">
                  {filteredListings.map((item) => (
                    <tr key={item.id} className="hover:bg-[#f6f4ea]/50 transition-colors">
                      <td className="py-3 px-4">
                        <Link
                          href={`/culture/${item.slug}`}
                          className="text-[13px] font-medium text-[#1c1c16] hover:text-[#aa3000] transition-colors block line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        {item.nameMalayalam && (
                          <span className="text-xs text-[#7d7971] block">
                            {item.nameMalayalam}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-[11px] font-medium text-[#7d3b24] block">
                          {item.category}
                        </span>
                        <div className="text-xs text-[#5d5e61] line-clamp-1">{item.artForm}</div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-[13px] text-[#1c1c16] block">{item.district}</span>
                        <span className="text-xs text-[#7d7971]">{item.locality}</span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#2d6a4f] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                          <span>{item.verificationStatus}</span>
                        </span>
                        <div className="text-[11px] text-[#7d7971] truncate max-w-xs">
                          {item.verifiedBy}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleToggleFeaturedListing(item)}
                          className={`text-xs px-2 py-0.5 rounded transition-colors ${
                            item.featured
                              ? 'text-[#aa3000] font-medium bg-[#fbeae5]'
                              : 'text-[#8c8577] hover:text-[#1c1c16]'
                          }`}
                        >
                          {item.featured ? 'Featured' : 'Feature'}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingListing(item);
                              setIsListingModalOpen(true);
                            }}
                            className="p-1 rounded text-[#5d5e61] hover:text-[#1c1c16] transition-colors"
                            title="Edit Listing"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteListing(item.id, item.name)}
                            className="p-1 rounded text-[#8c8577] hover:text-[#aa3000] transition-colors"
                            title="Archive Listing"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 3: EVENTS MANAGEMENT */}
      {/* ================================================================ */}
      {currentTab === 'events' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative sm:w-72">
              <Search className="w-3.5 h-3.5 text-[#8c8577] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
                placeholder="Search festival calendar..."
                className="w-full h-8 pl-8 pr-3 bg-white/80 focus:bg-white rounded-lg text-xs border border-[#ded7c9] focus:border-[#1c1c16] focus:outline-none transition-colors"
              />
            </div>

            <button
              onClick={() => {
                setEditingEvent(null);
                setIsEventModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#aa3000] hover:bg-[#882600] text-white rounded-md text-xs font-medium transition-colors self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Festival Gathering</span>
            </button>
          </div>

          <div className="bg-white/90 rounded-xl border border-[#e5e0d4] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#fbf9f2] border-b border-[#e5e0d4] text-[11px] font-medium text-[#7d7971]">
                  <tr>
                    <th className="py-2.5 px-4 font-medium">Event</th>
                    <th className="py-2.5 px-4 font-medium">Date & Timing</th>
                    <th className="py-2.5 px-4 font-medium">Venue & District</th>
                    <th className="py-2.5 px-4 font-medium">Status</th>
                    <th className="py-2.5 px-4 font-medium">Verification</th>
                    <th className="py-2.5 px-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eee9df]">
                  {filteredEvents.map((ev) => (
                    <tr key={ev.id} className="hover:bg-[#f6f4ea]/50 transition-colors">
                      <td className="py-3 px-4 max-w-xs">
                        <Link
                          href={`/events/${ev.slug}`}
                          className="text-[13px] font-medium text-[#1c1c16] hover:text-[#aa3000] transition-colors block line-clamp-1"
                        >
                          {ev.title}
                        </Link>
                        <div className="text-xs text-[#5d5e61]">{ev.artForm}</div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-[13px] font-medium text-[#1c1c16] block">
                          {ev.date}
                        </span>
                        <span className="text-xs text-[#7d7971]">{ev.time}</span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-[13px] text-[#1c1c16] block">{ev.district}</span>
                        <span className="text-xs text-[#7d7971] line-clamp-1">{ev.venue}</span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${ev.status === 'Completed' ? 'text-[#7d7971]' : 'text-[#2d6a4f]'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${ev.status === 'Completed' ? 'bg-[#7d7971]' : 'bg-[#2d6a4f]'}`} />
                          <span>{ev.status}</span>
                        </span>
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <div className="text-xs text-[#5d5e61] line-clamp-1">
                          {ev.lastConfirmedDate}
                        </div>
                        {ev.sourceLink && (
                          <a
                            href={ev.sourceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-[#7d7971] hover:text-[#1c1c16]"
                          >
                            <span>Source link</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleQuickVerifyEvent(ev)}
                            className="px-2 py-0.5 rounded text-xs font-medium text-[#2d6a4f] hover:bg-[#f4f9f5] transition-colors"
                            title="Re-verify today"
                          >
                            Verify
                          </button>
                          <button
                            onClick={() => {
                              setEditingEvent(ev);
                              setIsEventModalOpen(true);
                            }}
                            className="p-1 rounded text-[#5d5e61] hover:text-[#1c1c16] transition-colors"
                            title="Edit Event"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(ev.id, ev.title)}
                            className="p-1 rounded text-[#8c8577] hover:text-[#aa3000] transition-colors"
                            title="Remove Event"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 4: HOMEPAGE CONTENT & CHARTER MANAGEMENT */}
      {/* ================================================================ */}
      {currentTab === 'homepage' && (
        <div className="max-w-2xl bg-white/90 rounded-xl border border-[#e5e0d4] p-5 sm:p-6">
          <h2 className="text-base font-semibold text-[#1c1c16] mb-0.5">Homepage Headlines & Copy</h2>
          <p className="text-xs text-[#5d5e61] mb-5">
            Modify public platform headlines and narrative without code deployment.
          </p>

          <form onSubmit={handleSaveHomepageConfig} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#1c1c16] block mb-1">
                Hero Main Headline
              </label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2.5 focus:border-[#1c1c16] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#1c1c16] block mb-1">
                Platform Narrative / Sub-headline
              </label>
              <textarea
                rows={3}
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2.5 focus:border-[#1c1c16] focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#aa3000] hover:bg-[#882600] text-white rounded-md text-xs font-medium transition-colors"
              >
                Save Homepage Configuration
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================================================================ */}
      {/* TAB 5: AUDIT LOGS */}
      {/* ================================================================ */}
      {currentTab === 'audit' && (
        <div className="bg-white/90 rounded-xl border border-[#e5e0d4] overflow-hidden">
          <div className="p-4 border-b border-[#e5e0d4] bg-[#fbf9f2]">
            <h2 className="text-sm font-semibold text-[#1c1c16]">Moderation & Audit History</h2>
            <p className="text-xs text-[#7d7971] mt-0.5">
              Chronological log of curatorial decisions, accession approvals, and record updates.
            </p>
          </div>

          <div className="divide-y divide-[#eee9df]">
            {reviewLogs.length === 0 ? (
              <div className="py-12 text-center text-[#8c8577] text-xs">
                No moderation logs recorded yet.
              </div>
            ) : (
              reviewLogs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-[#f6f4ea]/40 transition-colors flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-medium text-[#7d3b24] bg-[#f8f1eb] px-2 py-0.5 rounded">
                        {log.action}
                      </span>
                      <span className="text-xs font-medium text-[#1c1c16]">{log.reviewerName}</span>
                    </div>
                    <p className="text-xs text-[#5d5e61]">{log.notes}</p>
                  </div>
                  <div className="text-[11px] text-[#8c8577] whitespace-nowrap">
                    {log.createdAt ? log.createdAt.split('T')[0] : 'Recent'}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL: CREATE / EDIT LISTING */}
      {/* ================================================================ */}
      {isListingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#e5e0d4] shadow-xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5e0d4] mb-4">
              <h3 className="text-base font-semibold text-[#1c1c16]">
                {editingListing ? 'Edit Cultural Listing' : 'Create Cultural Listing'}
              </h3>
              <button
                onClick={() => setIsListingModalOpen(false)}
                className="text-[#8c8577] hover:text-[#1c1c16]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveListing} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">English Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={editingListing?.name}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Malayalam Name</label>
                  <input
                    type="text"
                    name="nameMalayalam"
                    defaultValue={editingListing?.nameMalayalam}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Category *</label>
                  <select
                    name="category"
                    defaultValue={editingListing?.category || 'Ritual Art'}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  >
                    {CATEGORIES_LIST.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Art Form *</label>
                  <input
                    type="text"
                    name="artForm"
                    required
                    defaultValue={editingListing?.artForm}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">District *</label>
                  <select
                    name="district"
                    defaultValue={editingListing?.district || 'Kannur'}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  >
                    {KERALA_DISTRICTS_LIST.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Locality *</label>
                  <input
                    type="text"
                    name="locality"
                    required
                    defaultValue={editingListing?.locality}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    defaultValue={editingListing?.address}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    defaultValue={editingListing?.coordinates.lat || 11.9867}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    defaultValue={editingListing?.coordinates.lng || 75.3942}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#1c1c16] block mb-1">Short Description *</label>
                <textarea
                  name="shortDescription"
                  rows={2}
                  required
                  defaultValue={editingListing?.shortDescription}
                  className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#1c1c16] block mb-1">Full Story & Background *</label>
                <textarea
                  name="fullStory"
                  rows={4}
                  required
                  defaultValue={editingListing?.fullStory}
                  className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Image URL</label>
                  <input
                    type="text"
                    name="imageUrl"
                    defaultValue={editingListing?.imageUrl || 'https://images.unsplash.com/photo-1609137144829-873d6118b763?q=80&w=1200&auto=format&fit=crop'}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Image Credit</label>
                  <input
                    type="text"
                    name="imageCredit"
                    defaultValue={editingListing?.imageCredit || 'Kerala Cultural Archive / Open Documentation'}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Verification Status</label>
                  <select
                    name="verificationStatus"
                    defaultValue={editingListing?.verificationStatus || 'Verified'}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Scholar Reviewed">Scholar Reviewed</option>
                    <option value="Community Pending">Community Pending</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Verified By</label>
                  <input
                    type="text"
                    name="verifiedBy"
                    defaultValue={editingListing?.verifiedBy || 'Kerala Folklore Academy Board'}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured-checkbox"
                  defaultChecked={editingListing?.featured}
                  className="rounded border-[#ded7c9] text-[#aa3000] focus:ring-[#aa3000]"
                />
                <label htmlFor="featured-checkbox" className="text-xs text-[#5d5e61]">
                  Mark as featured on Homepage and curated directory
                </label>
              </div>

              <div className="pt-3 border-t border-[#e5e0d4] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsListingModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#5d5e61] hover:text-[#1c1c16]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#aa3000] hover:bg-[#882600] text-white rounded-md text-xs font-medium transition-colors"
                >
                  Save Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL: CREATE / EDIT EVENT */}
      {/* ================================================================ */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#e5e0d4] shadow-xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5e0d4] mb-4">
              <h3 className="text-base font-semibold text-[#1c1c16]">
                {editingEvent ? 'Edit Festival Gathering' : 'Add Festival Gathering'}
              </h3>
              <button
                onClick={() => setIsEventModalOpen(false)}
                className="text-[#8c8577] hover:text-[#1c1c16]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Event Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={editingEvent?.title}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Malayalam Title</label>
                  <input
                    type="text"
                    name="titleMalayalam"
                    defaultValue={editingEvent?.titleMalayalam}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Date *</label>
                  <input
                    type="date"
                    name="date"
                    required
                    defaultValue={editingEvent?.date || new Date().toISOString().split('T')[0]}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Timing</label>
                  <input
                    type="text"
                    name="time"
                    defaultValue={editingEvent?.time || '06:00 AM – Next Dawn'}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">District *</label>
                  <select
                    name="district"
                    defaultValue={editingEvent?.district || 'Thrissur'}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  >
                    {KERALA_DISTRICTS_LIST.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Venue *</label>
                  <input
                    type="text"
                    name="venue"
                    required
                    defaultValue={editingEvent?.venue}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Locality</label>
                  <input
                    type="text"
                    name="locality"
                    defaultValue={editingEvent?.locality}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingEvent?.status || 'Confirmed'}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Tentative">Tentative</option>
                    <option value="Annual Season">Annual Season</option>
                    <option value="Postponed">Postponed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={editingEvent?.category || 'Temple Festival & Percussion'}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#1c1c16] block mb-1">Entry Type</label>
                  <select
                    name="entryType"
                    defaultValue={editingEvent?.entryType || 'Free Entry'}
                    className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                  >
                    <option value="Free Entry">Free Entry</option>
                    <option value="Pass Required">Pass Required</option>
                    <option value="Ritual Offering">Ritual Offering</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#1c1c16] block mb-1">Organizer</label>
                <input
                  type="text"
                  name="organizer"
                  defaultValue={editingEvent?.organizer || 'Devaswom Board / Festival Council'}
                  className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#1c1c16] block mb-1">Original Announcement URL *</label>
                <input
                  type="url"
                  name="sourceLink"
                  required
                  defaultValue={editingEvent?.sourceLink || 'https://keralatourism.org'}
                  className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#1c1c16] block mb-1">Description *</label>
                <textarea
                  name="description"
                  rows={3}
                  required
                  defaultValue={editingEvent?.description}
                  className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#1c1c16] block mb-1">Cover Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  defaultValue={editingEvent?.imageUrl || 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop'}
                  className="w-full text-xs bg-white border border-[#ded7c9] rounded-lg p-2 focus:border-[#1c1c16] focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#e5e0d4] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-md text-xs font-medium text-[#5d5e61] hover:text-[#1c1c16]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#aa3000] hover:bg-[#882600] text-white rounded-md text-xs font-medium transition-colors"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
