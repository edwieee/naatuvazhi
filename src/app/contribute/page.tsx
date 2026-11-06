'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { KERALA_DISTRICTS } from '@/data/mock-districts';
import {
  Upload,
  CheckCircle2,
  Landmark,
  User,
  Building2,
  Calendar,
  FileEdit,
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

  // Unslop pass: Line icons only, no emojis!
  const types: { id: SubmissionType; label: string; icon: any }[] = [
    { id: 'Place', label: 'Cultural Place / Shrine', icon: Landmark },
    { id: 'Artist', label: 'Artist / Practitioner', icon: User },
    { id: 'Institution', label: 'Group / Institution', icon: Building2 },
    { id: 'Event', label: 'Cultural Event / Festival', icon: Calendar },
    { id: 'Correction', label: 'Factual Correction', icon: FileEdit },
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
    }, 600);
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
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="max-w-2xl mb-8">
        <div className="text-xs font-mono text-[#8C8273] mb-1">
          {t('COMMUNITY ACCESSION', 'സമൂഹ പൈതൃക ശേഖരം')}
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#181512] tracking-tight">
          {t('Contribute to Nattuvazhi', 'നാട്ടുവഴിയിലേക്ക് വിവരങ്ങൾ സമർപ്പിക്കാം')}
        </h1>
        <p className="text-xs sm:text-sm text-[#5C554B] mt-1.5 leading-relaxed">
          {t(
            'Submit unmapped sacred shrines, master practitioners, or traditional craft guilds. Entries are reviewed by certified cultural scholars before indexing.',
            'നിങ്ങളുടെ നാട്ടിലെ അറിവുകൾ, കലാരൂപങ്ങൾ, ക്ഷേത്രങ്ങൾ എന്നിവ പങ്കുവെക്കൂ. പരിശോധനയ്ക്ക് ശേഷം പ്രസിദ്ധീകരിക്കും.'
          )}
        </p>
      </div>

      {/* Success State */}
      {isSuccess ? (
        <div className="bg-white rounded-xl p-8 border border-[#E8E2D6] shadow-xs text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#F3EFE8] text-[#2D6A4F] flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div className="text-xs font-mono text-[#8C8273]">
            Accession ID: {submissionId}
          </div>

          <h2 className="text-xl font-semibold text-[#181512]">
            Submission recorded in moderation queue
          </h2>

          <p className="text-xs sm:text-sm text-[#5C554B] max-w-md leading-relaxed">
            Your submission for <strong>"{title}"</strong> has been logged. Our regional editorial circle will cross-reference citations, verify coordinates, and notify you at <strong>{contributorEmail}</strong>.
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
          {/* Section 1: Submission Type Selection (Clean Line Icons, no emojis!) */}
          <div className="bg-white rounded-xl p-6 border border-[#E8E2D6] shadow-xs">
            <label className="text-xs font-semibold text-[#181512] mb-3 block">
              1. Select category of entry
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
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Basic Information */}
          <div className="bg-white rounded-xl p-6 border border-[#E8E2D6] shadow-xs flex flex-col gap-4">
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
                  placeholder="e.g. Theyyam, Kathakali, Metal Mirror Casting..."
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
                  placeholder="e.g. Cheruthuruthy, Gothuruth, Haripad"
                  className={`w-full text-xs bg-[#FBF9F5] border rounded-md px-3 py-2.5 focus:bg-white focus:outline-none transition-colors ${
                    errors.locality ? 'border-red-400' : 'border-[#E8E2D6] focus:border-[#181512]'
                  }`}
                />
                {errors.locality && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.locality}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                  Specific Address or Landmark
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Near Pamba River Ghat, Anthoor"
                  className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-3 py-2.5 focus:bg-white focus:border-[#181512] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Cultural Story */}
          <div className="bg-white rounded-xl p-6 border border-[#E8E2D6] shadow-xs flex flex-col gap-4">
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
          <div className="bg-white rounded-xl p-6 border border-[#E8E2D6] shadow-xs flex flex-col gap-4">
            <h3 className="text-xs font-mono text-[#8C8273] pb-2 border-b border-[#EDE7DC]">
              4. MEDIA & ARCHIVAL CITATIONS
            </h3>

            <div>
              <label className="text-xs font-medium text-[#181512] mb-2 block">
                Field Photograph
              </label>
              <div className="border border-dashed border-[#D8D1C4] rounded-md p-5 text-center bg-[#FBF9F5] flex flex-col items-center justify-center">
                {imagePreview ? (
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-40 rounded-md object-cover border border-[#E8E2D6]"
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
                    <Upload className="w-5 h-5 text-[#8C8273] mb-1.5" />
                    <span className="text-xs font-medium text-[#181512]">
                      Upload photograph
                    </span>
                    <span className="text-[11px] text-[#8C8273] mt-0.5">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                  Image Credit & License
                </label>
                <input
                  type="text"
                  value={imageCredit}
                  onChange={(e) => setImageCredit(e.target.value)}
                  placeholder="e.g. Photo by Self / CC-BY-SA 4.0"
                  className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-3 py-2.5 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#181512] mb-1.5 block">
                  Original Source Links or Archival Citations
                </label>
                <input
                  type="text"
                  value={sourceUrls}
                  onChange={(e) => setSourceUrls(e.target.value)}
                  placeholder="e.g. Folklore Academy review, Gazette link..."
                  className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-3 py-2.5 focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Contributor */}
          <div className="bg-white rounded-xl p-6 border border-[#E8E2D6] shadow-xs flex flex-col gap-4">
            <h3 className="text-xs font-mono text-[#8C8273] pb-2 border-b border-[#EDE7DC]">
              5. CONTRIBUTOR DETAILS
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
                  Email Address for Verification Contact <span className="text-[#B21C01]">*</span>
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

            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasConsent}
                  onChange={(e) => setHasConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#B21C01] border-[#E8E2D6] focus:ring-[#B21C01]"
                />
                <span className="text-xs text-[#5C554B] leading-relaxed">
                  I confirm that this contribution is submitted in good faith for public cultural documentation and does not violate temple ritual privacy.
                </span>
              </label>
              {errors.consent && (
                <p className="text-[11px] text-red-600 mt-1 ml-6">{errors.consent}</p>
              )}
            </div>

            <div className="pt-4 border-t border-[#EDE7DC] flex items-center justify-between">
              <span className="text-xs text-[#8C8273]">
                Peer-reviewed before public publishing
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
