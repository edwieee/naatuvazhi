'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { KERALA_DISTRICTS } from '@/data/mock-districts';
import { actionSubmitContribution } from '@/app/actions/curator-actions';
import { EVENT_CATEGORIES, getCategories } from '@/lib/supabase/data-service';
import type { CulturalCategory } from '@/lib/supabase/data-service';
import type { ListingCategory } from '@/lib/types';
import {
  Upload,
  CheckCircle2,
  Landmark,
  User,
  Building2,
  Calendar,
  FileEdit,
  RotateCcw,
  Compass,
  MapPin,
} from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';
import { createClient } from '@/lib/supabase/client';

type SubmissionType = 'Place' | 'Artist' | 'Institution' | 'Event' | 'Correction';

export default function ContributePage() {
  const { t } = useLanguage();

  const [submissionType, setSubmissionType] = useState<SubmissionType>('Place');
  const [title, setTitle] = useState('');
  const [titleMalayalam, setTitleMalayalam] = useState('');
  const [artForm, setArtForm] = useState('');
  const [district, setDistrict] = useState('Thrissur');
  const [locality, setLocality] = useState('');
  const [listingCategories, setListingCategories] = useState<CulturalCategory[]>([]);
  const [listingCategorySlug, setListingCategorySlug] = useState('sacred-space');
  const [eventCategory, setEventCategory] = useState<string>(EVENT_CATEGORIES[0]);

  // Event specific fields
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [venue, setVenue] = useState('');
  const [organizer, setOrganizer] = useState('');

  // Geographic coordinates
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // Narrative
  const [description, setDescription] = useState('');
  const [culturalBackground, setCulturalBackground] = useState('');

  // Media and references
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [websiteLink, setWebsiteLink] = useState('');

  // Contributor details (No account or login required)
  const [contributorName, setContributorName] = useState('');
  const [contributorEmail, setContributorEmail] = useState('');

  // Validation and status
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  useEffect(() => {
    let active = true;
    getCategories().then((categories) => {
      if (active) setListingCategories(categories);
    });
    return () => {
      active = false;
    };
  }, []);

  const types: { id: SubmissionType; label: string; icon: any; desc: string }[] = [
    { id: 'Place', label: 'Cultural Place / Shrine', icon: Landmark, desc: 'Sacred groves, kavu, ancient temples' },
    { id: 'Artist', label: 'Artist / Practitioner', icon: User, desc: 'Master artisans, ritual performers' },
    { id: 'Institution', label: 'Guild / Institution', icon: Building2, desc: 'Kalari schools, craft centers' },
    { id: 'Event', label: 'Living Event / Festival', icon: Calendar, desc: 'Theyyam season, poorams, melam' },
    { id: 'Correction', label: 'Factual Correction', icon: FileEdit, desc: 'Suggested update to indexed listing' },
  ];

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Fast client-side image preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    try {
      setIsUploadingImage(true);
      const supabase = createClient();
      if (supabase) {
        const fileExt = file.name.split('.').pop() || 'jpg';
        const cleanName = file.name.replace(/[^a-zA-Z0-9]/g, '_');
        const filePath = `discoveries/${Date.now()}_${cleanName}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('contributions')
          .upload(filePath, file, { contentType: file.type, upsert: true });

        if (!uploadError) {
          const { data: publicData } = supabase.storage
            .from('contributions')
            .getPublicUrl(filePath);
          if (publicData?.publicUrl) {
            setImageUrl(publicData.publicUrl);
            return;
          }
        }
      }
    } catch (err) {
      console.warn('Storage upload encountered an issue, fallback to preview:', err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title or name is required';
    if (!artForm.trim()) newErrors.artForm = 'Art form or tradition is required';
    if (!locality.trim()) newErrors.locality = 'Locality or village is required';

    if (submissionType === 'Event') {
      if (!eventDate.trim()) newErrors.eventDate = 'Festival / Event date is required';
      if (!venue.trim()) newErrors.venue = 'Venue or temple grounds is required';
    }

    if (!description.trim() || description.length < 25) {
      newErrors.description = 'Please provide a descriptive summary of at least 25 characters';
    }
    if (!contributorName.trim()) newErrors.contributorName = 'Your name is required';
    if (!contributorEmail.trim() || !contributorEmail.includes('@')) {
      newErrors.contributorEmail = 'A valid contact email is required for peer verification notice';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionError('');
    try {
      const parsedLat = latitude.trim() ? parseFloat(latitude.trim()) : undefined;
      const parsedLng = longitude.trim() ? parseFloat(longitude.trim()) : undefined;

      const res = await actionSubmitContribution({
        type: submissionType,
        name: title.trim(),
        nameMalayalam: titleMalayalam.trim(),
        artForm: artForm.trim(),
        district: district as any,
        locality: locality.trim(),
        listingCategory: submissionType === 'Event'
          ? undefined
          : listingCategories.find((category) => category.slug === listingCategorySlug)?.name as ListingCategory | undefined,
        listingCategorySlug: submissionType === 'Event' ? undefined : listingCategorySlug,
        eventCategory: submissionType === 'Event' ? eventCategory : undefined,
        eventDate: submissionType === 'Event' ? eventDate : undefined,
        eventTime: submissionType === 'Event' ? eventTime.trim() : undefined,
        venue: submissionType === 'Event' ? venue.trim() : undefined,
        organizer: submissionType === 'Event' ? organizer.trim() : undefined,
        coordinates:
          parsedLat !== undefined && parsedLng !== undefined && !isNaN(parsedLat) && !isNaN(parsedLng)
            ? { lat: parsedLat, lng: parsedLng }
            : undefined,
        description: description.trim(),
        culturalSignificance: culturalBackground.trim(),
        imageUrl: imageUrl.trim() || undefined,
        websiteLink: websiteLink.trim(),
        contributorName: contributorName.trim(),
        contributorEmail: contributorEmail.trim(),
        urgency: 'Medium',
      });

      if (res.success && res.submission) {
        setIsSuccess(true);
      } else {
        throw new Error(res.error || 'Submission could not be completed');
      }
    } catch (err: any) {
      setSubmissionError(err instanceof Error ? err.message : 'Submission could not be completed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setTitle('');
    setTitleMalayalam('');
    setArtForm('');
    setLocality('');
    setEventDate('');
    setEventTime('');
    setVenue('');
    setOrganizer('');
    setLatitude('');
    setLongitude('');
    setDescription('');
    setCulturalBackground('');
    setImageUrl('');
    setImagePreview(null);
    setWebsiteLink('');
    setContributorName('');
    setContributorEmail('');
    setErrors({});
    setSubmissionError('');
    setIsSuccess(false);
  };

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="max-w-2xl mb-8">
        <div className="text-xs font-mono text-[#8C8273] mb-1">
          {t('PUBLIC COMMUNITY ACCESSION', 'സമൂഹ പൈതൃക ശേഖരം · ലോഗിൻ ആവശ്യമില്ല')}
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#181512] tracking-tight">
          {t('Contribute to Nattuvazhi', 'നാട്ടുവഴിയിലേക്ക് വിവരങ്ങൾ സമർപ്പിക്കാം')}
        </h1>
        <p className="text-xs sm:text-sm text-[#5C554B] mt-1.5 leading-relaxed">
          {t(
            'No account or sign-in required. Anyone can submit sacred groves, master practitioners, traditional crafts, or living festivals. Submissions are peer-reviewed by cultural scholars before publication.',
            'അക്കൗണ്ടോ ലോഗിനോ ആവശ്യമില്ല. നിങ്ങളുടെ പ്രദേശത്തെ അനുഷ്ഠാന കലകൾ, ക്ഷേത്രങ്ങൾ, ഗുരുക്കന്മാർ എന്നിവ രേഖപ്പെടുത്താം. പരിശോധനയ്ക്ക് ശേഷം ഭൂപടത്തിൽ ഉൾപ്പെടുത്തും.'
          )}
        </p>
      </div>

      {/* Success State */}
      {isSuccess ? (
        <div className="bg-white rounded-xl p-8 border border-[#E8E2D6] shadow-xs text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#F3EFE8] text-[#2D6A4F] flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-semibold text-[#181512]">
            Submission recorded in moderation queue
          </h2>

          <p className="text-xs sm:text-sm text-[#5C554B] max-w-md leading-relaxed">
            Your submission for <strong>"{title}"</strong> is now awaiting review. Our curatorial circle will verify the details before publishing it to the live Kerala Culture Map.
          </p>

          <div className="flex items-center gap-3 pt-4">
            <Link
              href="/explore"
              className="rounded-md bg-[#181512] hover:bg-[#B21C01] text-white font-medium text-xs px-5 py-2.5 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-[#E8E2D6]" />
              <span>Explore directory</span>
            </Link>
            <button
              onClick={handleReset}
              className="rounded-md border border-[#E8E2D6] hover:border-[#181512] text-[#181512] font-medium text-xs px-4 py-2.5 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Submit another entry</span>
            </button>
          </div>
        </div>
      ) : (
        /* The Contribution Form */
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Section 1: Submission Type Selection */}
          <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs">
            <label className="text-xs font-semibold text-[#181512] mb-3 block">
              1. What are you submitting?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {types.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSubmissionType(type.id)}
                    className={`p-3 rounded-md text-xs font-medium flex flex-col items-center justify-center gap-2 border transition-colors text-center ${
                      submissionType === type.id
                        ? 'bg-[#181512] text-white border-[#181512]'
                        : 'bg-[#FBF9F5] hover:bg-[#F3EFE8] text-[#5C554B] border-[#E8E2D6]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-semibold">{type.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 max-w-md">
              <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                {submissionType === 'Event' ? 'Event category' : 'Cultural category'}
              </label>
              {submissionType === 'Event' ? (
                <select
                  value={eventCategory}
                  onChange={(e) => setEventCategory(e.target.value)}
                  className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-3 py-2.5 focus:bg-white focus:border-[#181512] focus:outline-none"
                >
                  {EVENT_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
              ) : (
                <select
                  value={listingCategorySlug}
                  onChange={(e) => setListingCategorySlug(e.target.value)}
                  className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-3 py-2.5 focus:bg-white focus:border-[#181512] focus:outline-none"
                >
                  {listingCategories.map((category) => (
                    <option key={category.slug} value={category.slug}>{category.name}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Section 2: Basic Identification */}
          <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col gap-3">
            <h3 className="text-xs font-mono text-[#8C8273] pb-2 border-b border-[#EDE7DC]">
              2. BASIC IDENTIFICATION
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                  Name / Title (English) <span className="text-[#B21C01]">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Parassini Madappura"
                  className={`w-full text-xs bg-[#FBF9F5] border rounded-md px-3 py-2.5 focus:bg-white focus:outline-none transition-colors ${
                    errors.title ? 'border-red-400' : 'border-[#E8E2D6] focus:border-[#181512]'
                  }`}
                />
                {errors.title && <p className="text-[11px] text-red-600 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                  Name in Malayalam (Optional)
                </label>
                <input
                  type="text"
                  value={titleMalayalam}
                  onChange={(e) => setTitleMalayalam(e.target.value)}
                  placeholder="e.g. പറശ്ശിനിക്കടവ് മുത്തപ്പൻ മടപ്പുര"
                  className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-3 py-2.5 focus:bg-white focus:border-[#181512] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                  Art Form / Tradition <span className="text-[#B21C01]">*</span>
                </label>
                <input
                  type="text"
                  value={artForm}
                  onChange={(e) => setArtForm(e.target.value)}
                  placeholder="e.g. Muthappan Theyyam, Kathakali, Metal Mirror Casting..."
                  className={`w-full text-xs bg-[#FBF9F5] border rounded-md px-3 py-2.5 focus:bg-white focus:outline-none transition-colors ${
                    errors.artForm ? 'border-red-400' : 'border-[#E8E2D6] focus:border-[#181512]'
                  }`}
                />
                {errors.artForm && <p className="text-[11px] text-red-600 mt-1">{errors.artForm}</p>}
              </div>

              <div>
                <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                  District <span className="text-[#B21C01]">*</span>
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-3 py-2.5 focus:bg-white focus:border-[#181512] focus:outline-none transition-colors text-[#181512]"
                >
                  {KERALA_DISTRICTS.map((d) => (
                    <option key={d.code} value={d.name}>
                      {d.name} ({d.nameMalayalam})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                  Locality / Village / Town <span className="text-[#B21C01]">*</span>
                </label>
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g. Cheruthuruthy, Anthoor, Haripad"
                  className={`w-full text-xs bg-[#FBF9F5] border rounded-md px-3 py-2.5 focus:bg-white focus:outline-none transition-colors ${
                    errors.locality ? 'border-red-400' : 'border-[#E8E2D6] focus:border-[#181512]'
                  }`}
                />
                {errors.locality && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.locality}</p>
                )}
              </div>

            </div>

            {/* Coordinates for OpenStreetMap pinpointing */}
            <div className="pt-1">
              <label className="text-xs font-medium text-[#181512] mb-1 block flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B21C01]" />
                <span>Geographic Coordinates (Optional)</span>
              </label>
              <p className="text-[11px] text-[#8C8273] mb-2">
                Providing coordinates plots your discovery precisely on OpenStreetMap.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Latitude (e.g. 11.9742)"
                  className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-3 py-2 focus:bg-white focus:outline-none"
                />
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Longitude (e.g. 75.3611)"
                  className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-3 py-2 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section: Event Specific Logistics (Rendered if Event is selected) */}
          {submissionType === 'Event' && (
            <div className="bg-[#FFFDF9] rounded-xl p-5 border border-[#E0D8C7] shadow-xs flex flex-col gap-3">
              <div className="flex items-center gap-2 pb-2 border-b border-[#E0D8C7]">
                <Calendar className="w-4 h-4 text-[#B21C01]" />
                <h3 className="text-xs font-mono font-semibold text-[#181512]">
                  EVENT & FESTIVAL SCHEDULE DETAILS
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                    Event Date <span className="text-[#B21C01]">*</span>
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className={`w-full text-xs bg-[#FBF9F5] border rounded-md px-3 py-2.5 focus:bg-white focus:outline-none transition-colors ${
                      errors.eventDate ? 'border-red-400' : 'border-[#E8E2D6] focus:border-[#181512]'
                    }`}
                  />
                  {errors.eventDate && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.eventDate}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                    Event Time / Session
                  </label>
                  <input
                    type="text"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    placeholder="e.g. 05:00 AM – 11:30 PM (All Day)"
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-3 py-2.5 focus:bg-white focus:border-[#181512] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                    Venue / Grounds <span className="text-[#B21C01]">*</span>
                  </label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="e.g. Madappura Temple Courtyard"
                    className={`w-full text-xs bg-[#FBF9F5] border rounded-md px-3 py-2.5 focus:bg-white focus:outline-none transition-colors ${
                      errors.venue ? 'border-red-400' : 'border-[#E8E2D6] focus:border-[#181512]'
                    }`}
                  />
                  {errors.venue && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.venue}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                    Organizer / Trust / Committee
                  </label>
                  <input
                    type="text"
                    value={organizer}
                    onChange={(e) => setOrganizer(e.target.value)}
                    placeholder="e.g. Parassini Madappura Devaswom Board"
                    className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-3 py-2.5 focus:bg-white focus:border-[#181512] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Cultural Story */}
          <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col gap-3">
            <h3 className="text-xs font-mono text-[#8C8273] pb-2 border-b border-[#EDE7DC]">
              3. CULTURAL NARRATIVE & CONTEXT
            </h3>

            <div>
              <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                Short Summary Description <span className="text-[#B21C01]">*</span>
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a concise 2 to 3 sentence overview of this cultural place, tradition, or master..."
                className={`w-full text-xs bg-[#FBF9F5] border rounded-md p-3 focus:bg-white focus:outline-none transition-colors ${
                  errors.description ? 'border-red-400' : 'border-[#E8E2D6] focus:border-[#181512]'
                }`}
              />
              {errors.description && (
                <p className="text-[11px] text-red-600 mt-1">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                Cultural Significance, Oral History & Visitor Protocols
              </label>
              <textarea
                rows={4}
                value={culturalBackground}
                onChange={(e) => setCulturalBackground(e.target.value)}
                placeholder="Explain why this listing is significant. Any ritual rules, dress code, seasonal timing, or community elders to approach?"
                className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-3 focus:bg-white focus:border-[#181512] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Section 4: Media & Citations */}
          <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col gap-3">
            <h3 className="text-xs font-mono text-[#8C8273] pb-2 border-b border-[#EDE7DC]">
              4. MEDIA & ARCHIVAL CITATIONS
            </h3>

            <div>
              <label className="text-xs font-medium text-[#181512] mb-2 block">
                Field Photograph or Image
              </label>
              <div className="border border-dashed border-[#D8D1C4] rounded-md p-5 text-center bg-[#FBF9F5] flex flex-col items-center justify-center">
                {imagePreview ? (
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-40 rounded-md object-cover border border-[#E8E2D6]"
                    />
                    {isUploadingImage ? (
                      <span className="text-[11px] text-[#B21C01] font-mono animate-pulse">
                        Uploading to secure storage...
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setImageUrl('');
                        }}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Remove photo
                      </button>
                    )}
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-5 h-5 text-[#8C8273] mb-1.5" />
                    <span className="text-xs font-medium text-[#181512]">
                      Upload photograph
                    </span>
                    <span className="text-[11px] text-[#8C8273] mt-0.5">
                      JPG, PNG or WEBP (or enter image URL below)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                  Image URL (if hosted online)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    if (e.target.value.startsWith('http')) {
                      setImagePreview(e.target.value);
                    }
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-3 py-2.5 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                  Official Website / Social Link (Optional)
                </label>
                <input
                  type="url"
                  value={websiteLink}
                  onChange={(e) => setWebsiteLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-3 py-2.5 focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Contributor Details (Anonymous public submission) */}
          <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col gap-3">
            <h3 className="text-xs font-mono text-[#8C8273] pb-2 border-b border-[#EDE7DC]">
              5. CONTRIBUTOR CONTACT (NO LOGIN REQUIRED)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                  Your Full Name <span className="text-[#B21C01]">*</span>
                </label>
                <input
                  type="text"
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  placeholder="e.g. K. Ramanathan"
                  className={`w-full text-xs bg-[#FBF9F5] border rounded-md px-3 py-2.5 focus:bg-white focus:outline-none transition-colors ${
                    errors.contributorName
                      ? 'border-red-400'
                      : 'border-[#E8E2D6] focus:border-[#181512]'
                  }`}
                />
                {errors.contributorName && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.contributorName}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                  Email Address for Verification Notice <span className="text-[#B21C01]">*</span>
                </label>
                <input
                  type="email"
                  value={contributorEmail}
                  onChange={(e) => setContributorEmail(e.target.value)}
                  placeholder="e.g. ramanathan@gmail.com"
                  className={`w-full text-xs bg-[#FBF9F5] border rounded-md px-3 py-2.5 focus:bg-white focus:outline-none transition-colors ${
                    errors.contributorEmail
                      ? 'border-red-400'
                      : 'border-[#E8E2D6] focus:border-[#181512]'
                  }`}
                />
                {errors.contributorEmail && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.contributorEmail}</p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-[#EDE7DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {submissionError && (
                <p role="alert" className="text-xs text-red-700">{submissionError}</p>
              )}
              <span className="text-xs text-[#8C8273]">
                Peer-reviewed before publication
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-[#B21C01] hover:bg-[#961700] disabled:opacity-50 text-white font-medium text-xs sm:text-sm px-6 py-2.5 transition-colors shadow-xs"
              >
                {isSubmitting ? 'Submitting to queue...' : 'Submit discovery for review'}
              </button>
            </div>
          </div>
        </form>
      )}
    </main>
  );
}
