'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  ShieldCheck,
  Search,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Settings,
  History,
  ExternalLink,
  X,
  Loader2,
  MapPin,
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
  const [currentTab, setCurrentTab] = useState<
    'submissions' | 'listings' | 'events' | 'homepage' | 'audit'
  >('submissions');

  // Submissions State
  const [submissions, setSubmissions] = useState<SubmissionReviewItem[]>([]);
  const [subFilter, setSubFilter] = useState<'All' | 'Pending' | 'Approved' | 'Changes Requested'>('All');
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

  // Load initial data
  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setIsLoading(true);
    try {
      const [subs, lists, evts, config, logs] = await Promise.all([
        getSubmissions(),
        getListings(),
        getEvents(),
        getHomepageConfig(),
        getReviewLogs(),
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

  async function handleQuickVerifyEvent(event: EventListing) {
    const res = await actionUpdateEvent(event.id, {
      lastConfirmedDate: `Verified on ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} via Devaswom Council`,
      status: 'Confirmed',
    });
    if (res.success && res.event) {
      setEvents((prev) =>
        prev.map((e) => (e.id === event.id ? res.event! : e))
      );
      showToast(`Event "${event.title}" verified with updated timestamp.`);
    }
  }

  async function handleDeleteEvent(id: string, title: string) {
    if (!confirm(`Are you sure you want to remove event "${title}"?`)) return;
    const res = await actionDeleteEvent(id);
    if (res.success) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
      showToast(`Event "${title}" removed.`);
    }
  }

  // ====================================================================
  // HOMEPAGE CONFIG HANDLERS
  // ====================================================================

  async function handleSaveHomepageConfig(e: React.FormEvent) {
    e.preventDefault();
    await actionUpdateHomepageConfig('hero_headline', heroHeadline);
    await actionUpdateHomepageConfig('hero_subheadline', heroSubheadline);
    showToast('Homepage text configuration saved successfully!');
  }

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#181512] text-white px-4 py-3 rounded-xl shadow-lg border border-[#3A352F] text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-[#8C8273] hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E8E2D6]">
        <div>
          <div className="text-xs font-mono text-[#8C8273] mb-1">
            CURATORIAL VERIFICATION BUREAU · SUPABASE LIVE CMS
          </div>
          <h1 className="text-2xl font-semibold text-[#181512] tracking-tight">
            Curator Content Management Portal
          </h1>
          <p className="text-xs text-[#5C554B] mt-0.5">
            Single source of truth for Kerala cultural listings, calendar festivals, and community accessions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/explore"
            className="rounded-md bg-[#F3EFE8] hover:bg-[#EAE4D9] text-[#181512] text-xs font-medium px-3 py-1.5 transition-colors"
          >
            Public directory
          </Link>
          <Link
            href="/events"
            className="rounded-md bg-[#F3EFE8] hover:bg-[#EAE4D9] text-[#181512] text-xs font-medium px-3 py-1.5 transition-colors"
          >
            Calendar
          </Link>
          <div className="w-7 h-7 rounded-md bg-[#B21C01] text-white font-mono text-xs flex items-center justify-center font-bold">
            NV
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 border border-[#E8E2D6] shadow-xs">
          <span className="text-[11px] font-mono text-[#8C8273] block">
            PENDING SUBMISSIONS
          </span>
          <div className="text-2xl font-bold font-mono text-[#B21C01] tabular-nums mt-1">
            {submissions.filter((s) => s.status === 'Pending').length}
          </div>
          <span className="text-[11px] text-[#5C554B]">Awaiting verification</span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E8E2D6] shadow-xs">
          <span className="text-[11px] font-mono text-[#8C8273] block">
            PUBLISHED LISTINGS
          </span>
          <div className="text-2xl font-bold font-mono text-[#2D6A4F] tabular-nums mt-1">
            {listings.length}
          </div>
          <span className="text-[11px] text-[#5C554B]">
            {listings.filter((l) => l.featured).length} featured on homepage
          </span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E8E2D6] shadow-xs">
          <span className="text-[11px] font-mono text-[#8C8273] block">
            ACTIVE FESTIVALS
          </span>
          <div className="text-2xl font-bold font-mono text-[#181512] tabular-nums mt-1">
            {events.length}
          </div>
          <span className="text-[11px] text-[#5C554B]">In public cultural calendar</span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E8E2D6] shadow-xs">
          <span className="text-[11px] font-mono text-[#8C8273] block">
            CURATOR ACTIONS LOGGED
          </span>
          <div className="text-2xl font-bold font-mono text-[#8C8273] tabular-nums mt-1">
            {reviewLogs.length}
          </div>
          <span className="text-[11px] text-[#5C554B]">Full audit traceability</span>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-[#E8E2D6] mb-6 overflow-x-auto scrollbar-none pb-px">
        {[
          { id: 'submissions', label: 'Submissions Queue', count: submissions.length, icon: Layers },
          { id: 'listings', label: 'Cultural Listings', count: listings.length, icon: Sparkles },
          { id: 'events', label: 'Events & Calendar', count: events.length, icon: Calendar },
          { id: 'homepage', label: 'Homepage & Copy', icon: Settings },
          { id: 'audit', label: 'Moderation History', count: reviewLogs.length, icon: History },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? 'border-[#B21C01] text-[#181512] bg-[#F8F5EE] rounded-t-lg'
                  : 'border-transparent text-[#8C8273] hover:text-[#181512] hover:bg-[#FBF9F5]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#B21C01]' : 'text-[#8C8273]'}`} />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-[#181512] text-white' : 'bg-[#EAE4D9] text-[#5C554B]'
                  }`}
                >
                  {tab.count}
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
        <div className="bg-white rounded-xl border border-[#E8E2D6] shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[#E8E2D6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FCFBF8]">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
              {(['All', 'Pending', 'Approved', 'Changes Requested'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSubFilter(tab)}
                  className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    subFilter === tab
                      ? 'bg-[#181512] text-white'
                      : 'bg-[#F3EFE8] hover:bg-[#EAE4D9] text-[#5C554B]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#8C8273] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={subSearch}
                onChange={(e) => setSubSearch(e.target.value)}
                placeholder="Search accessions..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#FBF9F5] focus:bg-white rounded-md text-xs font-medium border border-[#E8E2D6] focus:border-[#181512] focus:outline-none transition-colors placeholder:text-[#8C8273]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F5EE] border-b border-[#E8E2D6] text-[#8C8273] font-mono text-[10px]">
                <tr>
                  <th className="py-2.5 px-4">ACCESSION ID</th>
                  <th className="py-2.5 px-4">NAME & TRADITION</th>
                  <th className="py-2.5 px-4">LOCATION</th>
                  <th className="py-2.5 px-4">CONTRIBUTOR</th>
                  <th className="py-2.5 px-4">STATUS</th>
                  <th className="py-2.5 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE7DC]">
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#8C8273]">
                      No submissions found in this status queue
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-[#FBF9F5] transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-mono text-[#181512] font-semibold block">{sub.id}</span>
                        <span className="text-[10px] font-mono text-[#8C8273] block mt-0.5">
                          {sub.type}
                        </span>
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <div className="font-medium text-[#181512] hover:text-[#B21C01] transition-colors line-clamp-1">
                          {sub.name}
                        </div>
                        <div className="text-[11px] text-[#8C8273] line-clamp-1">{sub.artForm}</div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-medium text-[#181512] block">{sub.district}</span>
                        <span className="text-[11px] text-[#8C8273]">{sub.locality}</span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-medium text-[#181512] block">{sub.contributorName}</span>
                        <span className="text-[11px] text-[#8C8273] font-mono">{sub.contributorEmail}</span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-sm text-[10px] font-mono uppercase tracking-wider ${
                            sub.status === 'Approved'
                              ? 'bg-[#F4F9F5] text-[#2D6A4F] border border-[#B7DFCA]'
                              : sub.status === 'Pending'
                              ? 'bg-[#FEF2F2] text-[#B21C01] border border-[#FECACA]'
                              : 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <Link
                          href={`/admin/review/${sub.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#181512] hover:bg-[#B21C01] text-white text-xs font-medium transition-colors"
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
      )}

      {/* ================================================================ */}
      {/* TAB 2: CULTURAL LISTINGS MANAGEMENT (FULL CRUD) */}
      {/* ================================================================ */}
      {currentTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative sm:w-80">
              <Search className="w-3.5 h-3.5 text-[#8C8273] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={listingSearch}
                onChange={(e) => setListingSearch(e.target.value)}
                placeholder="Search cultural listings..."
                className="w-full pl-8 pr-3 py-2 bg-white rounded-md text-xs font-medium border border-[#E8E2D6] focus:border-[#181512] focus:outline-none transition-colors"
              />
            </div>

            <button
              onClick={() => {
                setEditingListing(null);
                setIsListingModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#B21C01] hover:bg-[#961700] text-white rounded-md text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add new cultural listing</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-[#E8E2D6] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F5EE] border-b border-[#E8E2D6] text-[#8C8273] font-mono text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">LISTING NAME</th>
                    <th className="py-2.5 px-4">CATEGORY & ART FORM</th>
                    <th className="py-2.5 px-4">DISTRICT</th>
                    <th className="py-2.5 px-4">VERIFICATION</th>
                    <th className="py-2.5 px-4 text-center">FEATURED</th>
                    <th className="py-2.5 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE7DC]">
                  {filteredListings.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FBF9F5] transition-colors">
                      <td className="py-3 px-4">
                        <Link
                          href={`/culture/${item.slug}`}
                          className="font-semibold text-[#181512] hover:text-[#B21C01] transition-colors block line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        {item.nameMalayalam && (
                          <span className="text-[11px] text-[#8C8273] font-serif block">
                            {item.nameMalayalam}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-[#F3EFE8] text-[#181512] mb-0.5">
                          {item.category}
                        </span>
                        <div className="text-[11px] text-[#5C554B] line-clamp-1">{item.artForm}</div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-medium text-[#181512] block">{item.district}</span>
                        <span className="text-[11px] text-[#8C8273]">{item.locality}</span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#2D6A4F]">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{item.verificationStatus}</span>
                        </span>
                        <div className="text-[10px] text-[#8C8273] truncate max-w-xs">
                          {item.verifiedBy}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleToggleFeaturedListing(item)}
                          className={`text-xs px-2 py-1 rounded transition-colors ${
                            item.featured
                              ? 'bg-[#FEF2F2] text-[#B21C01] font-semibold border border-[#FECACA]'
                              : 'bg-[#F3EFE8] text-[#8C8273] hover:text-[#181512]'
                          }`}
                        >
                          {item.featured ? '★ Featured' : '☆ Feature'}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingListing(item);
                              setIsListingModalOpen(true);
                            }}
                            className="p-1.5 rounded hover:bg-[#F3EFE8] text-[#5C554B] hover:text-[#181512] transition-colors"
                            title="Edit Listing"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteListing(item.id, item.name)}
                            className="p-1.5 rounded hover:bg-[#FEF2F2] text-[#8C8273] hover:text-[#B21C01] transition-colors"
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
      {/* TAB 3: EVENTS MANAGEMENT (FULL CRUD & QUICK VERIFY) */}
      {/* ================================================================ */}
      {currentTab === 'events' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative sm:w-80">
              <Search className="w-3.5 h-3.5 text-[#8C8273] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
                placeholder="Search festival calendar..."
                className="w-full pl-8 pr-3 py-2 bg-white rounded-md text-xs font-medium border border-[#E8E2D6] focus:border-[#181512] focus:outline-none transition-colors"
              />
            </div>

            <button
              onClick={() => {
                setEditingEvent(null);
                setIsEventModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#B21C01] hover:bg-[#961700] text-white rounded-md text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add new festival / gathering</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-[#E8E2D6] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F5EE] border-b border-[#E8E2D6] text-[#8C8273] font-mono text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">EVENT & TRADITION</th>
                    <th className="py-2.5 px-4">DATE & TIMING</th>
                    <th className="py-2.5 px-4">VENUE & DISTRICT</th>
                    <th className="py-2.5 px-4">STATUS</th>
                    <th className="py-2.5 px-4">SOURCE & CONFIRMATION</th>
                    <th className="py-2.5 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE7DC]">
                  {filteredEvents.map((ev) => (
                    <tr key={ev.id} className="hover:bg-[#FBF9F5] transition-colors">
                      <td className="py-3 px-4 max-w-xs">
                        <Link
                          href={`/events/${ev.slug}`}
                          className="font-semibold text-[#181512] hover:text-[#B21C01] transition-colors block line-clamp-1"
                        >
                          {ev.title}
                        </Link>
                        <div className="text-[11px] text-[#8C8273]">{ev.artForm}</div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-mono font-semibold text-[#181512] block">
                          {ev.date}
                        </span>
                        <span className="text-[11px] text-[#5C554B]">{ev.time}</span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-medium text-[#181512] block">{ev.district}</span>
                        <span className="text-[11px] text-[#8C8273] line-clamp-1">{ev.venue}</span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                            ev.status === 'Confirmed'
                              ? 'bg-[#F4F9F5] text-[#2D6A4F] border border-[#B7DFCA]'
                              : ev.status === 'Annual Season'
                              ? 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]'
                              : 'bg-[#FEF2F2] text-[#B21C01] border border-[#FECACA]'
                          }`}
                        >
                          {ev.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <div className="text-[11px] text-[#2D6A4F] font-medium line-clamp-1">
                          {ev.lastConfirmedDate}
                        </div>
                        {ev.sourceLink && (
                          <a
                            href={ev.sourceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-[#8C8273] hover:text-[#181512] underline"
                          >
                            <span>Official Source</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleQuickVerifyEvent(ev)}
                            className="px-2 py-1 bg-[#F4F9F5] hover:bg-[#E3F2E9] text-[#2D6A4F] border border-[#B7DFCA] rounded text-[11px] font-medium transition-colors"
                            title="Re-verify against source today"
                          >
                            Verify Date
                          </button>
                          <button
                            onClick={() => {
                              setEditingEvent(ev);
                              setIsEventModalOpen(true);
                            }}
                            className="p-1.5 rounded hover:bg-[#F3EFE8] text-[#5C554B] hover:text-[#181512] transition-colors"
                            title="Edit Event"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(ev.id, ev.title)}
                            className="p-1.5 rounded hover:bg-[#FEF2F2] text-[#8C8273] hover:text-[#B21C01] transition-colors"
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
        <div className="max-w-3xl bg-white rounded-xl border border-[#E8E2D6] p-6 shadow-xs">
          <h2 className="text-lg font-semibold text-[#181512] mb-1">Homepage Content & Charter</h2>
          <p className="text-xs text-[#5C554B] mb-6">
            Modify live public platform headlines and pedagogical charter without code redeployment.
          </p>

          <form onSubmit={handleSaveHomepageConfig} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-[#181512] block mb-1.5">
                Hero Main Headline
              </label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2.5 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#181512] block mb-1.5">
                Hero Sub-Headline / Platform Narrative
              </label>
              <textarea
                rows={3}
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2.5 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-[#E8E2D6]">
              <button
                type="submit"
                className="px-4 py-2 bg-[#B21C01] hover:bg-[#961700] text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
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
        <div className="bg-white rounded-xl border border-[#E8E2D6] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E8E2D6] bg-[#FCFBF8]">
            <h2 className="text-sm font-semibold text-[#181512]">Curatorial Moderation & Audit Trail</h2>
            <p className="text-xs text-[#8C8273]">
              Every creation, date amendment, source check, and accession approval is logged.
            </p>
          </div>

          <div className="divide-y divide-[#EDE7DC]">
            {reviewLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-[#FBF9F5] transition-colors flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] text-[#B21C01] bg-[#FEF2F2] px-2 py-0.5 rounded uppercase font-semibold">
                      {log.action}
                    </span>
                    <span className="text-xs font-semibold text-[#181512]">{log.reviewerName}</span>
                  </div>
                  <p className="text-xs text-[#5C554B]">{log.notes}</p>
                </div>
                <div className="text-[11px] font-mono text-[#8C8273] whitespace-nowrap">
                  {log.createdAt.split('T')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL: CREATE / EDIT LISTING */}
      {/* ================================================================ */}
      {isListingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E8E2D6] shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D6] mb-4">
              <h3 className="text-lg font-semibold text-[#181512]">
                {editingListing ? 'Edit Cultural Listing' : 'Create New Cultural Listing'}
              </h3>
              <button
                onClick={() => setIsListingModalOpen(false)}
                className="text-[#8C8273] hover:text-[#181512]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveListing} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">English Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={editingListing?.name}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Malayalam Name</label>
                  <input
                    type="text"
                    name="nameMalayalam"
                    defaultValue={editingListing?.nameMalayalam}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Category *</label>
                  <select
                    name="category"
                    defaultValue={editingListing?.category || 'Ritual Art'}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  >
                    {CATEGORIES_LIST.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Art Form *</label>
                  <input
                    type="text"
                    name="artForm"
                    required
                    defaultValue={editingListing?.artForm}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">District *</label>
                  <select
                    name="district"
                    defaultValue={editingListing?.district || 'Kannur'}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  >
                    {KERALA_DISTRICTS_LIST.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Locality *</label>
                  <input
                    type="text"
                    name="locality"
                    required
                    defaultValue={editingListing?.locality}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    defaultValue={editingListing?.address}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    defaultValue={editingListing?.coordinates.lat || 11.9867}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    defaultValue={editingListing?.coordinates.lng || 75.3942}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#181512] block mb-1">Short Description *</label>
                <textarea
                  name="shortDescription"
                  rows={2}
                  required
                  defaultValue={editingListing?.shortDescription}
                  className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#181512] block mb-1">Full Story & Background *</label>
                <textarea
                  name="fullStory"
                  rows={4}
                  required
                  defaultValue={editingListing?.fullStory}
                  className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Image URL</label>
                  <input
                    type="text"
                    name="imageUrl"
                    defaultValue={editingListing?.imageUrl || 'https://images.unsplash.com/photo-1609137144829-873d6118b763?q=80&w=1200&auto=format&fit=crop'}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Image Credit</label>
                  <input
                    type="text"
                    name="imageCredit"
                    defaultValue={editingListing?.imageCredit || 'Kerala Cultural Archive / Open Documentation'}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Verification Status</label>
                  <select
                    name="verificationStatus"
                    defaultValue={editingListing?.verificationStatus || 'Verified'}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Scholar Reviewed">Scholar Reviewed</option>
                    <option value="Community Pending">Community Pending</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Verified By</label>
                  <input
                    type="text"
                    name="verifiedBy"
                    defaultValue={editingListing?.verifiedBy || 'Kerala Folklore Academy Board'}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured-checkbox"
                  defaultChecked={editingListing?.featured}
                  className="rounded border-[#E8E2D6] text-[#B21C01] focus:ring-[#B21C01]"
                />
                <label htmlFor="featured-checkbox" className="text-xs font-medium text-[#181512]">
                  Mark as featured on Homepage & Curated section
                </label>
              </div>

              <div className="pt-4 border-t border-[#E8E2D6] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsListingModalOpen(false)}
                  className="px-4 py-2 border border-[#E8E2D6] rounded-md text-xs font-medium text-[#5C554B] hover:bg-[#F3EFE8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#B21C01] hover:bg-[#961700] text-white rounded-md text-xs font-semibold shadow-xs"
                >
                  Save & Publish Listing
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
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E8E2D6] shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D6] mb-4">
              <h3 className="text-lg font-semibold text-[#181512]">
                {editingEvent ? 'Edit Festival / Gathering' : 'Add New Festival'}
              </h3>
              <button
                onClick={() => setIsEventModalOpen(false)}
                className="text-[#8C8273] hover:text-[#181512]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Event Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={editingEvent?.title}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Malayalam Title</label>
                  <input
                    type="text"
                    name="titleMalayalam"
                    defaultValue={editingEvent?.titleMalayalam}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Date *</label>
                  <input
                    type="date"
                    name="date"
                    required
                    defaultValue={editingEvent?.date || new Date().toISOString().split('T')[0]}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Timing</label>
                  <input
                    type="text"
                    name="time"
                    defaultValue={editingEvent?.time || '06:00 AM – Next Dawn'}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">District *</label>
                  <select
                    name="district"
                    defaultValue={editingEvent?.district || 'Thrissur'}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  >
                    {KERALA_DISTRICTS_LIST.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Venue *</label>
                  <input
                    type="text"
                    name="venue"
                    required
                    defaultValue={editingEvent?.venue}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Locality</label>
                  <input
                    type="text"
                    name="locality"
                    defaultValue={editingEvent?.locality}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingEvent?.status || 'Confirmed'}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Tentative">Tentative</option>
                    <option value="Annual Season">Annual Season</option>
                    <option value="Postponed">Postponed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={editingEvent?.category || 'Temple Festival & Percussion'}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#181512] block mb-1">Entry Type</label>
                  <select
                    name="entryType"
                    defaultValue={editingEvent?.entryType || 'Free Entry'}
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                  >
                    <option value="Free Entry">Free Entry</option>
                    <option value="Pass Required">Pass Required</option>
                    <option value="Ritual Offering">Ritual Offering</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#181512] block mb-1">Organizer</label>
                <input
                  type="text"
                  name="organizer"
                  defaultValue={editingEvent?.organizer || 'Devaswom Board / Festival Council'}
                  className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#181512] block mb-1">Original Announcement URL *</label>
                <input
                  type="url"
                  name="sourceLink"
                  required
                  defaultValue={editingEvent?.sourceLink || 'https://keralatourism.org'}
                  className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#181512] block mb-1">Description *</label>
                <textarea
                  name="description"
                  rows={3}
                  required
                  defaultValue={editingEvent?.description}
                  className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#181512] block mb-1">Cover Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  defaultValue={editingEvent?.imageUrl || 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop'}
                  className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2 focus:bg-white"
                />
              </div>

              <div className="pt-4 border-t border-[#E8E2D6] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2 border border-[#E8E2D6] rounded-md text-xs font-medium text-[#5C554B] hover:bg-[#F3EFE8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#B21C01] hover:bg-[#961700] text-white rounded-md text-xs font-semibold shadow-xs"
                >
                  Save & Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
