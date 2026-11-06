'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { KERALA_DISTRICTS } from '@/data/mock-districts';
import {
  Sparkles,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Compass
} from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

type SubmissionType = 'Place' | 'Artist' | 'Institution' | 'Event' | 'Correction';

export default function ContributePage() {
  const { t } = useLanguage();

  const [submissionType, setSubmissionType] = useState<SubmissionType>('Place');
  const [title, setTitle] = useState('');
  const [titleMalayalam, setTitleMalayalam] = useState('');
  const [artForm, setArtForm] = useState('');
  const [district, setDistrict] = useState('Thrissur');
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [culturalBackground, setCulturalBackground] = useState('');
  const [sourceUrls, setSourceUrls] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageCredit, setImageCredit] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [contributorEmail, setContributorEmail] = useState('');
  const [hasConsent, setHasConsent] = useState(false);

  // Validation and status
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const types: { id: SubmissionType; label: string; icon: string }[] = [
    { id: 'Place', label: 'Cultural Place / Shrine', icon: '🏛️' },
    { id: 'Artist', label: 'Artist / Practitioner', icon: '🎭' },
    { id: 'Institution', label: 'Group / Institution', icon: '📜' },
    { id: 'Event', label: 'Cultural Event / Festival', icon: '🥁' },
    { id: 'Correction', label: 'Factual Correction', icon: '✏️' },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title or name is required';
    if (!artForm.trim()) newErrors.artForm = 'Art form or tradition is required';
    if (!locality.trim()) newErrors.locality = 'Locality or village is required';
    if (!description.trim() || description.length < 25)
      newErrors.description = 'Please provide a descriptive summary of at least 25 characters';
    if (!contributorName.trim()) newErrors.contributorName = 'Your name is required';
    if (!contributorEmail.trim() || !contributorEmail.includes('@'))
      newErrors.contributorEmail = 'A valid email address is required for verification contact';
    if (!hasConsent) newErrors.consent = 'You must accept the community verification terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionId(`NV-2026-${Math.floor(1000 + Math.random() * 9000)}`);
      setIsSuccess(true);
    }, 800);
  };

  const handleReset = () => {
    setTitle('');
    setTitleMalayalam('');
    setArtForm('');
    setLocality('');
    setAddress('');
    setDescription('');
    setCulturalBackground('');
    setSourceUrls('');
    setWebsiteLink('');
    setImagePreview(null);
    setImageCredit('');
    setContributorName('');
    setContributorEmail('');
    setHasConsent(false);
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Header */}
      <div className="max-w-2xl mb-8">
        <div className="text-xs font-bold uppercase tracking-widest text-[#FF5931] mb-2 font-mono">
          {t('COMMUNITY LIVING ARCHIVES', 'സമൂഹ പൈതൃക വിവരശേഖരണം')}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight leading-tight">
          {t('Contribute to Nattuvazhi', 'നാട്ടുവഴിയിലേക്ക് വിവരങ്ങൾ സമർപ്പിക്കാം')}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base mt-2">
          {t(
            'Share unmapped shrines, hereditary masters, community performances, or suggest corrections. All entries are reviewed by our cultural moderation panel before going live.',
            'നിങ്ങളുടെ നാട്ടിലെ അറിവുകൾ, കലാരൂപങ്ങൾ, ക്ഷേത്രങ്ങൾ എന്നിവ പങ്കുവെക്കൂ. പരിശോധനയ്ക്ക് ശേഷം പ്രസിദ്ധീകരിക്കും.'
          )}
        </p>
      </div>

      {/* Success State Modal / Banner */}
      {isSuccess ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-xl text-center flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-semibold">
            <span>Reference ID: {submissionId}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950">
            Thank you for preserving Kerala's heritage!
          </h2>

          <p className="text-stone-600 text-sm max-w-lg leading-relaxed">
            Your submission for <strong>"{title}"</strong> has been recorded in the Nattuvazhi verification queue. Our regional cultural curators will review citations, verify coordinates, and notify you at <strong>{contributorEmail}</strong> once approved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/explore"
              className="rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs px-6 py-3 transition-colors flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#FFB658]" />
              <span>Explore Kerala Directory</span>
            </Link>
            <button
              onClick={handleReset}
              className="rounded-full border border-stone-300 hover:border-black text-stone-800 font-semibold text-xs px-6 py-3 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Submit Another Discovery</span>
            </button>
          </div>
        </div>
      ) : (
        /* The Contribution Form */
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Section 1: Submission Type Selection */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 block font-mono">
              1. What would you like to contribute?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {types.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSubmissionType(type.id)}
                  className={`p-3 rounded-2xl text-xs font-semibold flex flex-col items-center justify-center gap-1.5 border transition-all text-center ${
                    submissionType === type.id
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200/80'
                  }`}
                >
                  <span className="text-lg">{type.icon}</span>
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Identity & Art Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col gap-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 font-mono pb-2 border-b border-stone-100">
              2. Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Title / Name */}
              <div>
                <label className="text-xs font-semibold text-stone-700 mb-1.5 block">
                  Name / Title (English) <span className="text-[#FF5931]">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Parassini Madappura or Guru Chemancheri"
                  className={`w-full text-xs sm:text-sm bg-stone-50 border rounded-2xl px-4 py-3 focus:bg-white focus:outline-none transition-colors ${
                    errors.title ? 'border-red-400' : 'border-stone-200 focus:border-stone-400'
                  }`}
                />
                {errors.title && <p className="text-[11px] text-red-500 mt-1">{errors.title}</p>}
              </div>

              {/* Title / Name (Malayalam) */}
              <div>
                <label className="text-xs font-semibold text-stone-700 mb-1.5 block">
                  Name in Malayalam (Optional)
                </label>
                <input
                  type="text"
                  value={titleMalayalam}
                  onChange={(e) => setTitleMalayalam(e.target.value)}
                  placeholder="e.g. പറശ്ശിനിക്കടവ് മുത്തപ്പൻ മടപ്പുര"
                  className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 focus:bg-white focus:border-stone-400 focus:outline-none transition-colors"
                />
              </div>

              {/* Art Form / Tradition */}
              <div>
                <label className="text-xs font-semibold text-stone-700 mb-1.5 block">
                  Art Form / Ritual Tradition <span className="text-[#FF5931]">*</span>
                </label>
                <input
                  type="text"
                  value={artForm}
                  onChange={(e) => setArtForm(e.target.value)}
                  placeholder="e.g. Theyyam, Kathakali, Metal Mirror Casting..."
                  className={`w-full text-xs sm:text-sm bg-stone-50 border rounded-2xl px-4 py-3 focus:bg-white focus:outline-none transition-colors ${
                    errors.artForm ? 'border-red-400' : 'border-stone-200 focus:border-stone-400'
                  }`}
                />
                {errors.artForm && <p className="text-[11px] text-red-500 mt-1">{errors.artForm}</p>}
              </div>

              {/* District */}
              <div>
                <label className="text-xs font-semibold text-stone-700 mb-1.5 block">
                  District <span className="text-[#FF5931]">*</span>
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 focus:bg-white focus:border-stone-400 focus:outline-none transition-colors"
                >
                  {KERALA_DISTRICTS.map((d) => (
                    <option key={d.code} value={d.name}>
                      {d.name} ({d.nameMalayalam})
                    </option>
                  ))}
                </select>
              </div>

              {/* Locality */}
              <div>
                <label className="text-xs font-semibold text-stone-700 mb-1.5 block">
                  Locality / Village / Town <span className="text-[#FF5931]">*</span>
                </label>
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g. Cheruthuruthy, Gothuruth, Haripad"
                  className={`w-full text-xs sm:text-sm bg-stone-50 border rounded-2xl px-4 py-3 focus:bg-white focus:outline-none transition-colors ${
                    errors.locality ? 'border-red-400' : 'border-stone-200 focus:border-stone-400'
                  }`}
                />
                {errors.locality && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.locality}</p>
                )}
              </div>

              {/* Address / Landmark */}
              <div>
                <label className="text-xs font-semibold text-stone-700 mb-1.5 block">
                  Specific Address or Landmark
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Near Pamba River Ghat, Anthoor"
                  className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 focus:bg-white focus:border-stone-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Cultural Story & Significance */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col gap-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 font-mono pb-2 border-b border-stone-100">
              3. Cultural Narrative & Background
            </h3>

            <div>
              <label className="text-xs font-semibold text-stone-700 mb-1.5 block">
                Short Summary Description <span className="text-[#FF5931]">*</span>
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a concise 2 to 3 sentence overview of this cultural place, tradition, or master..."
                className={`w-full text-xs sm:text-sm bg-stone-50 border rounded-2xl p-4 focus:bg-white focus:outline-none transition-colors ${
                  errors.description ? 'border-red-400' : 'border-stone-200 focus:border-stone-400'
                }`}
              />
              {errors.description && (
                <p className="text-[11px] text-red-500 mt-1">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 mb-1.5 block">
                Cultural Significance, Oral History & Visitor Protocols
              </label>
              <textarea
                rows={4}
                value={culturalBackground}
                onChange={(e) => setCulturalBackground(e.target.value)}
                placeholder="Explain why this listing is significant. Any ritual rules, dress code, seasonal timing, or community elders to approach?"
                className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-2xl p-4 focus:bg-white focus:border-stone-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Section 4: Image & Reference Citations */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col gap-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 font-mono pb-2 border-b border-stone-100">
              4. Media & Archival Verification Sources
            </h3>

            {/* Image Upload Dropzone */}
            <div>
              <label className="text-xs font-semibold text-stone-700 mb-2 block">
                Photograph Upload
              </label>
              <div className="border-2 border-dashed border-stone-200 rounded-2xl p-6 text-center hover:border-[#FF9041] transition-colors bg-stone-50/50 flex flex-col items-center justify-center">
                {imagePreview ? (
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-48 rounded-xl object-cover border border-stone-200"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove photo
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-orange-50 text-[#FF9041] flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-stone-800">
                      Upload high-resolution image
                    </span>
                    <span className="text-[11px] text-stone-400 mt-0.5">
                      JPG, PNG or WEBP (Max 10MB)
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-stone-700 mb-1.5 block">
                  Image Photographer Credit & License
                </label>
                <input
                  type="text"
                  value={imageCredit}
                  onChange={(e) => setImageCredit(e.target.value)}
                  placeholder="e.g. Photo by Self / CC-BY-SA 4.0"
                  className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 mb-1.5 block">
                  Original Source Links or Archival Citations
                </label>
                <input
                  type="text"
                  value={sourceUrls}
                  onChange={(e) => setSourceUrls(e.target.value)}
                  placeholder="e.g. Folklore Academy review, Gazette link..."
                  className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Contributor Information & Terms */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col gap-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 font-mono pb-2 border-b border-stone-100">
              5. Contributor Identification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-stone-700 mb-1.5 block">
                  Your Full Name <span className="text-[#FF5931]">*</span>
                </label>
                <input
                  type="text"
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  placeholder="e.g. K. Ramanathan"
                  className={`w-full text-xs sm:text-sm bg-stone-50 border rounded-2xl px-4 py-3 focus:bg-white focus:outline-none transition-colors ${
                    errors.contributorName
                      ? 'border-red-400'
                      : 'border-stone-200 focus:border-stone-400'
                  }`}
                />
                {errors.contributorName && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.contributorName}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 mb-1.5 block">
                  Email Address for Verification Contact <span className="text-[#FF5931]">*</span>
                </label>
                <input
                  type="email"
                  value={contributorEmail}
                  onChange={(e) => setContributorEmail(e.target.value)}
                  placeholder="e.g. ramanathan@gmail.com"
                  className={`w-full text-xs sm:text-sm bg-stone-50 border rounded-2xl px-4 py-3 focus:bg-white focus:outline-none transition-colors ${
                    errors.contributorEmail
                      ? 'border-red-400'
                      : 'border-stone-200 focus:border-stone-400'
                  }`}
                />
                {errors.contributorEmail && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.contributorEmail}</p>
                )}
              </div>
            </div>

            {/* Community Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasConsent}
                  onChange={(e) => setHasConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#FF9041] border-stone-300 focus:ring-orange-400"
                />
                <span className="text-xs text-stone-600 leading-relaxed">
                  I confirm that this contribution is submitted in good faith for public-interest cultural documentation. The content does not violate temple ritual privacy or proprietary intellectual copyright.
                </span>
              </label>
              {errors.consent && (
                <p className="text-[11px] text-red-500 mt-1 ml-7">{errors.consent}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-400">
                Peer-reviewed before public publishing
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-[#FF9041] hover:bg-[#e87c2f] disabled:opacity-50 text-white font-semibold text-sm px-8 py-3.5 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Transmitting to Review Queue...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Submit Discovery for Review</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </main>
  );
}
