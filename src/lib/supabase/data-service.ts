import {
  CulturalListing,
  EventListing,
  SubmissionReviewItem,
  DistrictName,
  ListingCategory,
} from '@/lib/types';
import { MOCK_LISTINGS } from '@/data/mock-listings';
import { MOCK_EVENTS } from '@/data/mock-events';
import { KERALA_DISTRICTS, DistrictInfo } from '@/data/mock-districts';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { createClient as createBrowserClient } from '@/lib/supabase/client';

export interface CulturalCategory {
  id: string;
  slug: string;
  name: string;
  nameMalayalam: string;
  description: string;
  iconName?: string;
  displayOrder: number;
}

export const HOMEPAGE_CATEGORY_SLUGS = [
  'ritual-art',
  'sacred-space',
  'master-practitioner',
  'traditional-craft',
  'cultural-institution',
  'martial-tradition',
] as const;

const FALLBACK_CATEGORIES: CulturalCategory[] = [
  { id: 'fallback-ritual-art', slug: 'ritual-art', name: 'Ritual Art', nameMalayalam: 'അനുഷ്ഠാന കല', description: 'Living ritual performances and sacred arts documented across Kerala.', iconName: 'Sparkles', displayOrder: 1 },
  { id: 'fallback-sacred-space', slug: 'sacred-space', name: 'Sacred Space', nameMalayalam: 'പുണ്യ സ്ഥാനങ്ങൾ', description: 'Temples, sacred groves and heritage places with living cultural meaning.', iconName: 'Landmark', displayOrder: 2 },
  { id: 'fallback-master-practitioner', slug: 'master-practitioner', name: 'Master Practitioner', nameMalayalam: 'ഗുരുക്കന്മാർ', description: 'Individual custodians and teachers of Kerala’s cultural traditions.', iconName: 'Award', displayOrder: 3 },
  { id: 'fallback-traditional-craft', slug: 'traditional-craft', name: 'Traditional Craft', nameMalayalam: 'പരമ്പരാഗത കരകൗശലം', description: 'Traditional materials, techniques and artisan-made cultural objects.', iconName: 'Hammer', displayOrder: 4 },
  { id: 'fallback-cultural-institution', slug: 'cultural-institution', name: 'Cultural Institution', nameMalayalam: 'സാംസ്കാരിക സ്ഥാപനങ്ങൾ', description: 'Schools, archives and institutions that preserve and teach cultural practice.', iconName: 'Library', displayOrder: 5 },
  { id: 'fallback-martial-tradition', slug: 'martial-tradition', name: 'Martial Tradition', nameMalayalam: 'യോദ്ധാ പാരമ്പര്യം', description: 'Kerala’s martial lineages, training traditions and related knowledge.', iconName: 'Shield', displayOrder: 6 },
  { id: 'fallback-oral-heritage', slug: 'oral-heritage', name: 'Oral Heritage', nameMalayalam: 'മൗഖിക പാരമ്പര്യം', description: 'Songs, stories and spoken knowledge carried through generations.', iconName: 'BookOpen', displayOrder: 7 },
  { id: 'fallback-contemporary-spaces', slug: 'contemporary-spaces', name: 'Contemporary & Folk', nameMalayalam: 'സമകാലിക ഇടങ്ങൾ', description: 'Community-led spaces and living cultural initiatives.', iconName: 'Compass', displayOrder: 8 },
];

const slugifyCategory = (name: string) =>
  name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// In-memory fallback caches (Admin submissions & logs start empty so real data is single source of truth)
let liveListings: CulturalListing[] = [...MOCK_LISTINGS];
let liveEvents: EventListing[] = [...MOCK_EVENTS];
let liveSubmissions: SubmissionReviewItem[] = [];
let liveReviewLogs: {
  id: string;
  submissionId?: string;
  listingId?: string;
  eventId?: string;
  reviewerName: string;
  action: string;
  notes: string;
  createdAt: string;
}[] = [];

let liveHomepageConfig: Record<string, any> = {
  hero_headline: 'Discover the culture that lives around you',
  hero_eyebrow: 'Kerala cultural cartography · Public open archive',
  hero_subheadline:
    'A community-informed, scholar-verified living map of Kerala’s sacred groves, ritual performing arts, master practitioners, and craft guilds.',
  featured_listing_slugs: [
    'parassini-madappura-theyyam',
    'kerala-kalamandalam-cheruthuruthy',
    'aranmula-metal-mirror-craft',
    'cvn-kalari-kozhikode',
    'chavittu-nadakam-gothuruth',
    'tholpavakoothu-shadow-puppetry-koonathara',
  ],
  featured_event_slugs: [
    'thrissur-pooram-ilanjithara-melam',
    'parassini-madappura-annual-utsavam',
    'nishagandhi-monsoon-rhythms',
    'aranmula-valla-sadya-regatta',
  ],
  verification_charter: {
    pledge:
      'Nattuvazhi is a non-commercial, public-interest cultural documentation initiative. Traditional rituals are documented with deep respect to community sanctities and temple guidelines.',
    institutions: [
      'Kerala Folklore Academy',
      'Kerala Kalamandalam Deemed University',
      'District Cultural Officers',
      'Hereditary Custodians Guild',
    ],
  },
};

export function getSupabase(customClient?: any) {
  if (customClient) return customClient;

  if (typeof window !== 'undefined') {
    try {
      const browserClient = createBrowserClient();
      if (browserClient) return browserClient;
    } catch {
      // ignore
    }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key) {
    try {
      return createSupabaseClient(url, key);
    } catch {
      return null;
    }
  }
  return null;
}

// Helpers to map DB records to TypeScript models
function mapDbListing(row: any): CulturalListing {
  const districtName = row.districts?.name || row.district || 'Kannur';
  const categoryName = row.categories?.name || row.category || 'Ritual Art';
  const categorySlug = row.categories?.slug || row.category_slug || slugifyCategory(categoryName);

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    nameMalayalam: row.name_malayalam || '',
    category: categoryName as ListingCategory,
    categorySlug,
    artForm: row.art_form,
    district: districtName as DistrictName,
    locality: row.locality,
    address: row.address,
    coordinates: { lat: row.latitude, lng: row.longitude },
    shortDescription: row.short_description,
    fullStory: row.full_story,
    culturalSignificance: row.cultural_significance,
    visitorProtocol: row.visitor_protocol,
    imageUrl: row.image_url,
    imageGallery: Array.isArray(row.media)
      ? row.media.map((m: any) => ({ url: m.url, caption: m.caption, credit: m.credit }))
      : [],
    imageCredit: row.image_credit,
    verificationStatus: row.verification_status,
    verifiedBy: row.verified_by,
    lastReviewed: row.last_reviewed
      ? new Date(row.last_reviewed).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      : '',
    sourceCitations: Array.isArray(row.sources)
      ? row.sources.map((s: any) => ({ title: s.title, authorOrArchive: s.author_or_archive, year: s.year, url: s.url }))
      : [],
    officialWebsite: row.official_website,
    contributor: {
      name: row.contributor_name || 'Curator Staff',
      role: row.contributor_role || 'Contributor',
      dateSubmitted: row.contributor_submitted_at ? row.contributor_submitted_at.split('T')[0] : '',
    },
    featured: Boolean(row.featured),
    tags: row.tags || [],
  };
}

export async function getCategories(customSb?: any): Promise<CulturalCategory[]> {
  const sb = getSupabase(customSb);
  if (sb) {
    try {
      const { data, error } = await sb
        .from('categories')
        .select('id, slug, name, name_malayalam, description, icon_name, display_order')
        .order('display_order');

      if (!error && data && data.length > 0) {
        return data.map((category: any) => ({
          id: category.id,
          slug: category.slug,
          name: category.name,
          nameMalayalam: category.name_malayalam,
          description: category.description || '',
          iconName: category.icon_name,
          displayOrder: category.display_order,
        }));
      }
    } catch (e) {
      console.warn('Fallback to local categories:', e);
    }
  }

  return FALLBACK_CATEGORIES;
}

function mapDbEvent(row: any): EventListing {
  const districtName = row.districts?.name || row.district || 'Thrissur';

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    titleMalayalam: row.title_malayalam || '',
    category: row.category,
    artForm: row.art_form,
    date: row.event_date,
    formattedDate: row.formatted_date,
    time: row.time,
    venue: row.venue,
    district: districtName as DistrictName,
    locality: row.locality,
    address: row.address,
    organizer: row.organizer,
    description: row.description,
    culturalContext: row.cultural_context,
    sourceLink: row.source_link,
    lastConfirmedDate: row.last_confirmed_date
      ? `Verified ${new Date(row.last_confirmed_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
      : 'Recently Verified',
    status: row.status,
    imageUrl: row.image_url,
    entryType: row.entry_type,
    scheduleHighlights: Array.isArray(row.schedule_highlights) ? row.schedule_highlights : [],
  };
}

function mapDbSubmission(row: any): SubmissionReviewItem {
  const districtName = row.districts?.name || row.district || 'Kannur';

  return {
    id: row.id,
    type: row.type,
    name: row.name,
    nameMalayalam: row.name_malayalam || '',
    artForm: row.art_form || '',
    district: districtName as DistrictName,
    locality: row.locality || '',
    address: row.address || '',
    description: row.description || '',
    culturalSignificance: row.cultural_significance || '',
    sources: Array.isArray(row.sources) ? row.sources : [],
    contributorName: row.contributor_name || 'Community Contributor',
    contributorEmail: row.contributor_email || '',
    submittedAt: row.submitted_at || row.created_at || new Date().toISOString(),
    status: row.status || 'Pending',
    reviewerNotes: row.reviewer_notes || '',
    urgency: row.urgency || 'Medium',
    eventDate: row.event_date || '',
    eventTime: row.event_time || '',
    venue: row.venue || '',
    organizer: row.organizer || '',
    coordinates:
      row.latitude && row.longitude
        ? { lat: Number(row.latitude), lng: Number(row.longitude) }
        : undefined,
    imageUrl: row.image_url || '',
    imageCredit: row.image_credit || '',
    websiteLink: row.website_link || '',
  };
}

// ====================================================================
// DISTRICTS & GEOGRAPHIC REGISTRY
// ====================================================================

export async function getDistricts(customSb?: any): Promise<DistrictInfo[]> {
  const sb = getSupabase(customSb);
  if (sb) {
    try {
      const { data: dbDistricts, error: distErr } = await sb
        .from('districts')
        .select('code, name, name_malayalam, center_lat, center_lng, cultural_signature, primary_art_forms');

      const { data: countRows } = await sb
        .from('listings')
        .select('district_id, districts(name)')
        .eq('publication_status', 'published');

      if (!distErr && dbDistricts && dbDistricts.length > 0) {
        const countsByDistrict: Record<string, number> = {};
        countRows?.forEach((r: any) => {
          const dName = r.districts?.name;
          if (dName) countsByDistrict[dName] = (countsByDistrict[dName] || 0) + 1;
        });

        return dbDistricts.map((d: any) => ({
          name: d.name as DistrictName,
          nameMalayalam: d.name_malayalam,
          code: d.code,
          center: { lat: d.center_lat, lng: d.center_lng },
          culturalSignature: d.cultural_signature,
          primaryArtForms: d.primary_art_forms || [],
          listingCount: countsByDistrict[d.name] || 0,
        }));
      }
    } catch (e) {
      console.warn('Fallback to local districts due to:', e);
    }
  }

  // Fallback
  const countsByDistrict: Record<string, number> = {};
  liveListings.forEach((listing) => {
    countsByDistrict[listing.district] = (countsByDistrict[listing.district] || 0) + 1;
  });

  return KERALA_DISTRICTS.map((d) => ({
    ...d,
    listingCount: countsByDistrict[d.name] || d.listingCount || 0,
  }));
}

// ====================================================================
// CULTURAL LISTINGS
// ====================================================================

export interface ListingFilters {
  district?: string;
  category?: string;
  search?: string;
  featuredOnly?: boolean;
  status?: string;
}

export async function getListings(filters?: ListingFilters, customSb?: any): Promise<CulturalListing[]> {
  const sb = getSupabase(customSb);
  if (sb) {
    try {
      let query = sb
        .from('listings')
        .select('*, districts(name), categories(name, slug), media(*), sources(*)')
        .eq('publication_status', 'published')
        .order('created_at', { ascending: false });

      if (filters?.featuredOnly) {
        query = query.eq('featured', true);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        let results: CulturalListing[] = data.map(mapDbListing);

        if (filters?.district && filters.district !== 'All') {
          results = results.filter((i) => i.district.toLowerCase() === filters.district!.toLowerCase());
        }
        if (filters?.category && filters.category !== 'All') {
          results = results.filter(
            (i) => i.categorySlug === filters.category || i.category.toLowerCase() === filters.category!.toLowerCase()
          );
        }
        if (filters?.search && filters.search.trim()) {
          const q = filters.search.toLowerCase().trim();
          results = results.filter(
            (i) =>
              i.name.toLowerCase().includes(q) ||
              i.artForm.toLowerCase().includes(q) ||
              i.locality.toLowerCase().includes(q) ||
              i.shortDescription.toLowerCase().includes(q)
          );
        }
        return results.map((item) => ({
          ...item,
          categorySlug: item.categorySlug || slugifyCategory(item.category),
        }));
      }
    } catch (e) {
      console.warn('Fallback to local listings:', e);
    }
  }

  // Fallback
  let results = [...liveListings];
  if (filters?.featuredOnly) results = results.filter((item) => item.featured);
  if (filters?.district && filters.district !== 'All') {
    results = results.filter((item) => item.district.toLowerCase() === filters.district!.toLowerCase());
  }
  if (filters?.category && filters.category !== 'All') {
    results = results.filter((item) => {
      const categorySlug = item.categorySlug || slugifyCategory(item.category);
      return categorySlug === filters.category || item.category.toLowerCase() === filters.category!.toLowerCase();
    });
  }
  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.artForm.toLowerCase().includes(q) ||
        item.locality.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q)
    );
  }
  return results.map((item) => ({
    ...item,
    categorySlug: item.categorySlug || slugifyCategory(item.category),
  }));
}

export async function getListingBySlug(slug: string, customSb?: any): Promise<CulturalListing | null> {
  const sb = getSupabase(customSb);
  if (sb) {
    try {
      const { data, error } = await sb
        .from('listings')
        .select('*, districts(name), categories(name, slug), media(*), sources(*)')
        .eq('slug', slug)
        .eq('publication_status', 'published')
        .single();

      if (!error && data) {
        return mapDbListing(data);
      }
    } catch (e) {
      console.warn('Fallback to local listing by slug:', e);
    }
  }

  const listing = liveListings.find((item) => item.slug === slug);
  return listing || null;
}

export async function createListing(data: Partial<CulturalListing>, customSb?: any): Promise<CulturalListing> {
  const slug =
    data.slug ||
    data.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
    `listing-${Date.now()}`;

  const newListing: CulturalListing = {
    id: data.id || `c-${Date.now().toString().slice(-4)}`,
    slug,
    name: data.name || 'Untitled Discovery',
    nameMalayalam: data.nameMalayalam || '',
    category: data.category || 'Ritual Art',
    artForm: data.artForm || 'Traditional Ritual',
    district: data.district || 'Kannur',
    locality: data.locality || 'Unknown Locality',
    address: data.address || `${data.locality || ''}, Kerala`,
    coordinates: data.coordinates || { lat: 10.8505, lng: 76.2711 },
    shortDescription: data.shortDescription || '',
    fullStory: data.fullStory || data.shortDescription || '',
    culturalSignificance: data.culturalSignificance || '',
    visitorProtocol: data.visitorProtocol || 'Observe sacred temple guidelines and maintain respectful decorum.',
    imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1609137144829-873d6118b763?q=80&w=1200&auto=format&fit=crop',
    imageGallery: data.imageGallery || [],
    imageCredit: data.imageCredit || 'Community Documenter / Open Archive',
    verificationStatus: data.verificationStatus || 'Verified',
    verifiedBy: data.verifiedBy || 'Curatorial Verification Board',
    lastReviewed: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    sourceCitations: data.sourceCitations || [],
    officialWebsite: data.officialWebsite,
    contributor: data.contributor || {
      name: 'Curator Staff',
      role: 'Curatorial Verification Officer',
      dateSubmitted: new Date().toISOString().split('T')[0],
    },
    featured: Boolean(data.featured),
    tags: data.tags || [data.artForm || 'Culture', data.district || 'Kerala'],
  };

  const sb = getSupabase(customSb);
  if (sb) {
    try {
      const { data: dist } = await sb.from('districts').select('id, center_lat, center_lng').eq('name', newListing.district).single();
      const { data: cat } = await sb.from('categories').select('id').eq('name', newListing.category).single();

      const districtId = dist?.id || 'c86a50d4-7964-4546-9b92-3d3edbd92553'; // Default Thrissur
      const lat = newListing.coordinates?.lat || dist?.center_lat || 10.8505;
      const lng = newListing.coordinates?.lng || dist?.center_lng || 76.2711;

      const { data: inserted, error: insertError } = await sb
        .from('listings')
        .insert({
          slug: newListing.slug,
          name: newListing.name,
          name_malayalam: newListing.nameMalayalam,
          category_id: cat?.id || null,
          art_form: newListing.artForm,
          district_id: districtId,
          locality: newListing.locality,
          address: newListing.address,
          latitude: lat,
          longitude: lng,
          short_description: newListing.shortDescription,
          full_story: newListing.fullStory,
          cultural_significance: newListing.culturalSignificance,
          visitor_protocol: newListing.visitorProtocol,
          image_url: newListing.imageUrl,
          image_credit: newListing.imageCredit,
          verification_status: newListing.verificationStatus,
          verified_by: newListing.verifiedBy,
          featured: newListing.featured,
          tags: newListing.tags,
          publication_status: 'published',
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error inserting listing into Supabase:', insertError);
      } else if (inserted?.id) {
        newListing.id = inserted.id;

        // Link sources
        if (newListing.sourceCitations && newListing.sourceCitations.length > 0) {
          for (const s of newListing.sourceCitations) {
            await sb.from('sources').insert({
              listing_id: inserted.id,
              source_type: 'Archival Reference',
              title: s.title,
              author_or_archive: s.authorOrArchive || 'Submitted Documentation',
              year: s.year || null,
              url: s.url || (s.title.startsWith('http') ? s.title : null),
              checked_at: new Date().toISOString(),
            });
          }
        }

        // Link media
        if (newListing.imageUrl) {
          await sb.from('media').insert({
            listing_id: inserted.id,
            url: newListing.imageUrl,
            caption: newListing.name,
            credit: newListing.imageCredit || 'Community Documenter / Open Archive',
            permission_status: 'Granted',
            display_order: 1,
          });
        }
      }
    } catch (e) {
      console.warn('Could not insert to Supabase:', e);
    }
  }

  liveListings = [newListing, ...liveListings];
  return newListing;
}

export async function updateListing(
  id: string,
  data: Partial<CulturalListing>,
  customSb?: any
): Promise<CulturalListing | null> {
  const index = liveListings.findIndex((item) => item.id === id || item.slug === id);
  const existing = index !== -1 ? liveListings[index] : null;

  const updated: CulturalListing = existing
    ? {
        ...existing,
        ...data,
        lastReviewed: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      }
    : (data as CulturalListing);

  const sb = getSupabase(customSb);
  if (sb) {
    try {
      await sb
        .from('listings')
        .update({
          name: updated.name,
          name_malayalam: updated.nameMalayalam,
          art_form: updated.artForm,
          locality: updated.locality,
          short_description: updated.shortDescription,
          full_story: updated.fullStory,
          cultural_significance: updated.culturalSignificance,
          featured: updated.featured,
          verification_status: updated.verificationStatus,
          verified_by: updated.verifiedBy,
          updated_at: new Date().toISOString(),
        })
        .or(`id.eq.${id},slug.eq.${id}`);
    } catch (e) {
      console.warn('Could not update in Supabase:', e);
    }
  }

  if (index !== -1) {
    liveListings[index] = updated;
  }
  return updated;
}

export async function deleteListing(id: string, customSb?: any): Promise<boolean> {
  const sb = getSupabase(customSb);
  if (sb) {
    try {
      await sb.from('listings').update({ publication_status: 'archived' }).or(`id.eq.${id},slug.eq.${id}`);
    } catch (e) {
      console.warn('Could not archive in Supabase:', e);
    }
  }

  const initialLen = liveListings.length;
  liveListings = liveListings.filter((item) => item.id !== id && item.slug !== id);
  return liveListings.length < initialLen || Boolean(sb);
}

// ====================================================================
// EVENTS & LIVING FESTIVALS
// ====================================================================

export interface EventFilters {
  district?: string;
  category?: string;
  search?: string;
  status?: string;
  upcomingOnly?: boolean;
}

export async function getEvents(filters?: EventFilters, customSb?: any): Promise<EventListing[]> {
  const sb = getSupabase(customSb);
  if (sb) {
    try {
      let query = sb
        .from('events')
        .select('*, districts(name)')
        .eq('publication_status', 'published')
        .order('event_date', { ascending: true });

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        let results: EventListing[] = data.map(mapDbEvent);

        if (filters?.upcomingOnly) {
          const today = new Date().toISOString().split('T')[0];
          results = results.filter((ev) => ev.date >= today || ev.status === 'Annual Season');
        }
        if (filters?.district && filters.district !== 'All') {
          results = results.filter((ev) => ev.district.toLowerCase() === filters.district!.toLowerCase());
        }
        if (filters?.status && filters.status !== 'All') {
          results = results.filter((ev) => ev.status === filters.status);
        }
        if (filters?.search && filters.search.trim()) {
          const q = filters.search.toLowerCase().trim();
          results = results.filter(
            (ev) =>
              ev.title.toLowerCase().includes(q) ||
              ev.venue.toLowerCase().includes(q) ||
              ev.artForm.toLowerCase().includes(q)
          );
        }
        return results;
      }
    } catch (e) {
      console.warn('Fallback to local events:', e);
    }
  }

  // Fallback
  let results = [...liveEvents];
  if (filters?.upcomingOnly) {
    const today = new Date().toISOString().split('T')[0];
    results = results.filter((ev) => ev.date >= today || ev.status === 'Annual Season');
  }
  if (filters?.district && filters.district !== 'All') {
    results = results.filter((ev) => ev.district.toLowerCase() === filters.district!.toLowerCase());
  }
  if (filters?.status && filters.status !== 'All') {
    results = results.filter((ev) => ev.status === filters.status);
  }
  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    results = results.filter(
      (ev) =>
        ev.title.toLowerCase().includes(q) ||
        ev.venue.toLowerCase().includes(q) ||
        ev.artForm.toLowerCase().includes(q)
    );
  }
  results.sort((a, b) => a.date.localeCompare(b.date));
  return results;
}

export async function getEventBySlug(slug: string, customSb?: any): Promise<EventListing | null> {
  const sb = getSupabase(customSb);
  if (sb) {
    try {
      const { data, error } = await sb
        .from('events')
        .select('*, districts(name)')
        .eq('slug', slug)
        .eq('publication_status', 'published')
        .single();

      if (!error && data) {
        return mapDbEvent(data);
      }
    } catch (e) {
      console.warn('Fallback to local event by slug:', e);
    }
  }

  const event = liveEvents.find((ev) => ev.slug === slug);
  return event || null;
}

export async function createEvent(data: Partial<EventListing>, customSb?: any): Promise<EventListing> {
  const slug =
    data.slug ||
    data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
    `event-${Date.now()}`;

  const newEvent: EventListing = {
    id: data.id || `ev-${Date.now().toString().slice(-4)}`,
    slug,
    title: data.title || 'Untitled Cultural Gathering',
    titleMalayalam: data.titleMalayalam || data.title || '',
    category: data.category || 'Temple Festival & Percussion',
    artForm: data.artForm || 'Ritual Ensembles',
    date: data.date || new Date().toISOString().split('T')[0],
    formattedDate:
      data.formattedDate ||
      new Date(data.date || Date.now()).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    time: data.time || '10:00 AM – 09:00 PM',
    venue: data.venue || 'Heritage Grounds',
    district: data.district || 'Thrissur',
    locality: data.locality || 'Central Grounds',
    address: data.address,
    organizer: data.organizer || 'Festival Trustee Committee',
    description: data.description || '',
    culturalContext: data.culturalContext || '',
    sourceLink: data.sourceLink || 'https://keralatourism.org',
    lastConfirmedDate: `Confirmed just now via Curator Portal`,
    status: data.status || 'Confirmed',
    imageUrl:
      data.imageUrl ||
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop',
    entryType: data.entryType || 'Free Entry',
    scheduleHighlights: data.scheduleHighlights || [],
  };

  const sb = getSupabase(customSb);
  if (sb) {
    try {
      const { data: dist } = await sb.from('districts').select('id').eq('name', newEvent.district).single();
      const districtId = dist?.id || 'c86a50d4-7964-4546-9b92-3d3edbd92553';

      const { data: inserted, error } = await sb
        .from('events')
        .insert({
          slug: newEvent.slug,
          title: newEvent.title,
          title_malayalam: newEvent.titleMalayalam,
          category: newEvent.category,
          art_form: newEvent.artForm,
          event_date: newEvent.date,
          formatted_date: newEvent.formattedDate,
          time: newEvent.time,
          venue: newEvent.venue,
          district_id: districtId,
          locality: newEvent.locality,
          address: newEvent.address,
          organizer: newEvent.organizer,
          description: newEvent.description,
          cultural_context: newEvent.culturalContext,
          source_link: newEvent.sourceLink,
          status: newEvent.status,
          image_url: newEvent.imageUrl,
          entry_type: newEvent.entryType,
          schedule_highlights: newEvent.scheduleHighlights,
          featured: false,
          publication_status: 'published',
        })
        .select()
        .single();

      if (!error && inserted?.id) {
        newEvent.id = inserted.id;
      }
    } catch (e) {
      console.warn('Could not insert event to Supabase:', e);
    }
  }

  liveEvents = [newEvent, ...liveEvents];
  return newEvent;
}

export async function updateEvent(
  id: string,
  data: Partial<EventListing>,
  customSb?: any
): Promise<EventListing | null> {
  const index = liveEvents.findIndex((ev) => ev.id === id || ev.slug === id);
  const existing = index !== -1 ? liveEvents[index] : null;

  const updated: EventListing = existing
    ? {
        ...existing,
        ...data,
        lastConfirmedDate: `Verified on ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} via Curator Portal`,
      }
    : (data as EventListing);

  const sb = getSupabase(customSb);
  if (sb) {
    try {
      await sb
        .from('events')
        .update({
          title: updated.title,
          title_malayalam: updated.titleMalayalam,
          event_date: updated.date,
          time: updated.time,
          venue: updated.venue,
          status: updated.status,
          source_link: updated.sourceLink,
          last_confirmed_date: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .or(`id.eq.${id},slug.eq.${id}`);
    } catch (e) {
      console.warn('Could not update event in Supabase:', e);
    }
  }

  if (index !== -1) {
    liveEvents[index] = updated;
  }
  return updated;
}

export async function deleteEvent(id: string, customSb?: any): Promise<boolean> {
  const sb = getSupabase(customSb);
  if (sb) {
    try {
      await sb.from('events').update({ publication_status: 'archived' }).or(`id.eq.${id},slug.eq.${id}`);
    } catch (e) {
      console.warn('Could not archive event in Supabase:', e);
    }
  }

  const initialLen = liveEvents.length;
  liveEvents = liveEvents.filter((ev) => ev.id !== id && ev.slug !== id);
  return liveEvents.length < initialLen || Boolean(sb);
}

// ====================================================================
// SUBMISSIONS & MODERATION WORKFLOW
// ====================================================================

export async function getSubmissions(
  filters?: {
    status?: string;
    search?: string;
  },
  customSb?: any
): Promise<SubmissionReviewItem[]> {
  const sb = getSupabase(customSb);
  if (sb) {
    try {
      let query = sb
        .from('submissions')
        .select('*, districts(name)')
        .order('submitted_at', { ascending: false });

      if (filters?.status && filters.status !== 'All') {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;
      if (!error && data) {
        let results: SubmissionReviewItem[] = data.map(mapDbSubmission);

        if (filters?.search && filters.search.trim()) {
          const q = filters.search.toLowerCase().trim();
          results = results.filter(
            (sub) =>
              sub.name.toLowerCase().includes(q) ||
              sub.contributorName.toLowerCase().includes(q) ||
              sub.district.toLowerCase().includes(q) ||
              sub.artForm.toLowerCase().includes(q)
          );
        }
        return results;
      }
    } catch (e) {
      console.warn('Error fetching submissions from Supabase:', e);
    }
  }

  let results = [...liveSubmissions];
  if (filters?.status && filters.status !== 'All') {
    results = results.filter((sub) => sub.status === filters.status);
  }
  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    results = results.filter(
      (sub) =>
        sub.name.toLowerCase().includes(q) ||
        sub.contributorName.toLowerCase().includes(q) ||
        sub.district.toLowerCase().includes(q)
    );
  }
  return results;
}

export async function getSubmissionById(id: string, customSb?: any): Promise<SubmissionReviewItem | null> {
  const sb = getSupabase(customSb);
  if (sb) {
    try {
      const { data, error } = await sb
        .from('submissions')
        .select('*, districts(name)')
        .eq('id', id)
        .single();

      if (!error && data) {
        return mapDbSubmission(data);
      }
    } catch (e) {
      console.warn('Error fetching submission by id:', e);
    }
  }

  const sub = liveSubmissions.find((s) => s.id === id);
  return sub || null;
}

export async function createSubmission(
  data: Partial<SubmissionReviewItem>,
  customSb?: any
): Promise<SubmissionReviewItem> {
  const subId = `sub-${Date.now().toString().slice(-4)}${Math.floor(10 + Math.random() * 90)}`;
  const submittedAt = new Date().toISOString();

  const sb = getSupabase(customSb);
  if (sb) {
    try {
      let districtId = 'c86a50d4-7964-4546-9b92-3d3edbd92553'; // Thrissur fallback
      if (data.district) {
        const { data: dist } = await sb.from('districts').select('id').eq('name', data.district).single();
        if (dist?.id) districtId = dist.id;
      }

      const insertPayload = {
        id: subId,
        type: data.type || 'Place',
        name: data.name || 'Untitled Discovery',
        name_malayalam: data.nameMalayalam || null,
        art_form: data.artForm || 'Traditional Culture',
        district_id: districtId,
        locality: data.locality || '',
        address: data.address || null,
        description: data.description || '',
        cultural_significance: data.culturalSignificance || '',
        sources: Array.isArray(data.sources) ? data.sources : [],
        contributor_name: data.contributorName || 'Community Contributor',
        contributor_email: data.contributorEmail || '',
        status: 'Pending',
        urgency: data.urgency || 'Medium',
        rights_confirmed: true,
        submitted_at: submittedAt,
        event_date: data.eventDate || null,
        event_time: data.eventTime || null,
        venue: data.venue || null,
        organizer: data.organizer || null,
        latitude: data.coordinates?.lat || null,
        longitude: data.coordinates?.lng || null,
        image_url: data.imageUrl || null,
        image_credit: data.imageCredit || null,
        website_link: data.websiteLink || null,
        raw_data: {
          submittedVia: 'Public Accession Portal',
          ...data,
        },
      };

      const { error } = await sb.from('submissions').insert(insertPayload);

      if (error) {
        console.error('Failed to insert submission into Supabase:', error);
        throw error;
      }

      return mapDbSubmission({
        ...insertPayload,
        districts: { name: data.district || 'Thrissur' },
      });
    } catch (e) {
      console.error('Error creating submission in Supabase:', e);
      throw e;
    }
  }

  const fallbackSub: SubmissionReviewItem = {
    id: subId,
    type: data.type || 'Place',
    name: data.name || 'Untitled Discovery',
    nameMalayalam: data.nameMalayalam || '',
    artForm: data.artForm || '',
    district: data.district || 'Thrissur',
    locality: data.locality || '',
    address: data.address || '',
    description: data.description || '',
    culturalSignificance: data.culturalSignificance || '',
    sources: data.sources || [],
    contributorName: data.contributorName || 'Community Contributor',
    contributorEmail: data.contributorEmail || '',
    submittedAt,
    status: 'Pending',
    reviewerNotes: '',
    urgency: data.urgency || 'Medium',
    eventDate: data.eventDate || '',
    eventTime: data.eventTime || '',
    venue: data.venue || '',
    organizer: data.organizer || '',
    coordinates: data.coordinates,
    imageUrl: data.imageUrl || '',
    imageCredit: data.imageCredit || '',
    websiteLink: data.websiteLink || '',
  };

  liveSubmissions.unshift(fallbackSub);
  return fallbackSub;
}

export async function updateSubmissionStatus(
  id: string,
  status: 'Pending' | 'Approved' | 'Changes Requested' | 'Rejected',
  reviewerNotes?: string,
  customSb?: any,
  reviewerInfo?: { name: string; email: string },
  targetIds?: { listingId?: string; eventId?: string }
): Promise<SubmissionReviewItem | null> {
  const sb = getSupabase(customSb);
  let updatedRecord: SubmissionReviewItem | null = null;

  if (sb) {
    try {
      const { data, error } = await sb
        .from('submissions')
        .update({
          status,
          reviewer_notes: reviewerNotes || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select('*, districts(name)')
        .single();

      if (!error && data) {
        updatedRecord = mapDbSubmission(data);
      }

      await sb.from('review_logs').insert({
        submission_id: id,
        listing_id: targetIds?.listingId || null,
        event_id: targetIds?.eventId || null,
        reviewer_name: reviewerInfo?.name || 'Curator Staff',
        reviewer_email: reviewerInfo?.email || 'curator.nattuvazhi@gmail.com',
        action: `submission_${status.toLowerCase().replace(/\s+/g, '_')}`,
        notes: reviewerNotes || `Status updated to ${status}`,
      });
    } catch (e) {
      console.warn('Could not update submission status in Supabase:', e);
    }
  }

  const index = liveSubmissions.findIndex((s) => s.id === id);
  if (index !== -1) {
    liveSubmissions[index] = {
      ...liveSubmissions[index],
      status,
      reviewerNotes: reviewerNotes ?? liveSubmissions[index].reviewerNotes,
    };
    if (!updatedRecord) updatedRecord = liveSubmissions[index];
  }

  liveReviewLogs.unshift({
    id: `log-${Date.now()}`,
    submissionId: id,
    reviewerName: reviewerInfo?.name || 'Curator Staff',
    action: `submission_${status.toLowerCase().replace(/\s+/g, '_')}`,
    notes: reviewerNotes || `Status updated to ${status}`,
    createdAt: new Date().toISOString(),
  });

  return updatedRecord;
}

export async function approveSubmissionAndPublish(
  id: string,
  reviewerNotes?: string,
  customSb?: any,
  reviewerInfo?: { name: string; email: string }
): Promise<{ submission: SubmissionReviewItem; listing?: CulturalListing; event?: EventListing }> {
  const sb = getSupabase(customSb);
  const sub = await getSubmissionById(id, sb);
  if (!sub) {
    throw new Error(`Submission ${id} not found.`);
  }

  // Prevent duplicate publishing
  if (sub.status === 'Approved') {
    if (sub.type === 'Event') {
      const slug = sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const existingEvent = await getEventBySlug(slug, sb);
      return { submission: sub, event: existingEvent || undefined };
    } else {
      const slug = sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const existingListing = await getListingBySlug(slug, sb);
      return { submission: sub, listing: existingListing || undefined };
    }
  }

  let createdListing: CulturalListing | undefined;
  let createdEvent: EventListing | undefined;

  if (['Place', 'Artist', 'Institution', 'Correction'].includes(sub.type)) {
    const slug = sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Map submission category
    const category: ListingCategory =
      sub.type === 'Artist'
        ? 'Master Practitioner'
        : sub.type === 'Institution'
        ? 'Cultural Institution'
        : 'Sacred Space';

    createdListing = await createListing(
      {
        slug,
        name: sub.name,
        nameMalayalam: sub.nameMalayalam || '',
        category,
        artForm: sub.artForm,
        district: sub.district,
        locality: sub.locality,
        address: sub.address || `${sub.locality}, ${sub.district}, Kerala`,
        coordinates: sub.coordinates,
        shortDescription: sub.description,
        fullStory: sub.culturalSignificance
          ? `${sub.description}\n\nCultural Significance & Context:\n${sub.culturalSignificance}`
          : sub.description,
        culturalSignificance: sub.culturalSignificance,
        visitorProtocol: 'Respectful visitation in accordance with hereditary customs.',
        imageUrl: sub.imageUrl || 'https://images.unsplash.com/photo-1609137144829-873d6118b763?q=80&w=1200&auto=format&fit=crop',
        imageCredit: sub.imageCredit || 'Community Heritage Contributor',
        verificationStatus: 'Verified',
        verifiedBy: 'Regional Curatorial Bureau',
        sourceCitations: sub.sources.map((s) => ({
          title: s,
          authorOrArchive: 'Submitted Source Documentation',
          url: s.startsWith('http') ? s : undefined,
        })),
        officialWebsite: sub.websiteLink || undefined,
        contributor: {
          name: sub.contributorName,
          role: 'Community Heritage Contributor',
          dateSubmitted: sub.submittedAt.split('T')[0],
        },
        featured: false,
      },
      sb
    );
  } else if (sub.type === 'Event') {
    const slug = sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    createdEvent = await createEvent(
      {
        slug,
        title: sub.name,
        titleMalayalam: sub.nameMalayalam || sub.name,
        category: sub.artForm ? `${sub.artForm} Gathering` : 'Temple Festival & Percussion',
        artForm: sub.artForm || 'Ritual Ensembles',
        date: sub.eventDate || new Date().toISOString().split('T')[0],
        time: sub.eventTime || '10:00 AM – 09:00 PM',
        venue: sub.venue || sub.locality || 'Heritage Grounds',
        district: sub.district,
        locality: sub.locality,
        address: sub.address || `${sub.locality}, ${sub.district}, Kerala`,
        organizer: sub.organizer || sub.contributorName || 'Festival Trustee Committee',
        description: sub.description,
        culturalContext: sub.culturalSignificance || sub.description,
        sourceLink: sub.websiteLink || (sub.sources[0]?.startsWith('http') ? sub.sources[0] : 'https://keralatourism.org'),
        status: 'Confirmed',
        imageUrl: sub.imageUrl || 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop',
        entryType: 'Free Entry',
      },
      sb
    );
  }

  // Update submission status to Approved and record review log
  const updatedSub = await updateSubmissionStatus(
    id,
    'Approved',
    reviewerNotes || 'Approved and published to public cultural registry',
    sb,
    reviewerInfo,
    { listingId: createdListing?.id, eventId: createdEvent?.id }
  );

  return {
    submission: updatedSub || { ...sub, status: 'Approved' },
    listing: createdListing,
    event: createdEvent,
  };
}

// ====================================================================
// HOMEPAGE CONFIG & AUDIT LOGS
// ====================================================================

export async function getHomepageConfig(customSb?: any): Promise<Record<string, any>> {
  const sb = getSupabase(customSb);
  if (sb) {
    try {
      const { data, error } = await sb.from('homepage_config').select('key, value_json');
      if (!error && data && data.length > 0) {
        const configMap: Record<string, any> = {};
        data.forEach((row: any) => {
          configMap[row.key] = row.value_json;
        });
        return { ...liveHomepageConfig, ...configMap };
      }
    } catch (e) {
      console.warn('Fallback to local homepage config:', e);
    }
  }

  return { ...liveHomepageConfig };
}

export async function updateHomepageConfig(
  key: string,
  value: any,
  updatedBy: string = 'Curator',
  customSb?: any
): Promise<boolean> {
  const sb = getSupabase(customSb);
  if (sb) {
    try {
      await sb.from('homepage_config').upsert({
        key,
        value_json: value,
        updated_at: new Date().toISOString(),
        updated_by: updatedBy,
      });
    } catch (e) {
      console.warn('Could not update homepage config in Supabase:', e);
    }
  }

  liveHomepageConfig[key] = value;
  liveReviewLogs.unshift({
    id: `log-${Date.now()}`,
    reviewerName: updatedBy,
    action: 'updated_homepage_config',
    notes: `Updated homepage config key: ${key}`,
    createdAt: new Date().toISOString(),
  });
  return true;
}

export async function getReviewLogs(customSb?: any) {
  const sb = getSupabase(customSb);
  if (sb) {
    try {
      const { data, error } = await sb
        .from('review_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((log: any) => ({
          id: log.id,
          submissionId: log.submission_id,
          listingId: log.listing_id,
          eventId: log.event_id,
          reviewerName: log.reviewer_name,
          action: log.action,
          notes: log.notes,
          createdAt: log.created_at,
        }));
      }
    } catch (e) {
      console.warn('Fallback to local review logs:', e);
    }
  }

  return [...liveReviewLogs];
}
