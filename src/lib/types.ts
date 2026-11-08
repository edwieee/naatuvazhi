export type ListingCategory =
  | 'Ritual Art'
  | 'Sacred Space'
  | 'Master Practitioner'
  | 'Traditional Craft'
  | 'Cultural Institution'
  | 'Martial Tradition'
  | 'Oral Heritage';

export type VerificationStatus = 'Verified' | 'Scholar Reviewed' | 'Community Pending';

export type DistrictName =
  | 'Kasaragod'
  | 'Kannur'
  | 'Wayanad'
  | 'Kozhikode'
  | 'Malappuram'
  | 'Palakkad'
  | 'Thrissur'
  | 'Ernakulam'
  | 'Idukki'
  | 'Kottayam'
  | 'Alappuzha'
  | 'Pathanamthitta'
  | 'Kollam'
  | 'Thiruvananthapuram';

export interface SourceCitation {
  title: string;
  authorOrArchive: string;
  year?: string;
  url?: string;
}

export interface CulturalListing {
  id: string;
  slug: string;
  name: string;
  nameMalayalam: string;
  category: ListingCategory;
  categorySlug?: string;
  artForm: string;
  district: DistrictName;
  locality: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  shortDescription: string;
  fullStory: string;
  culturalSignificance: string;
  visitorProtocol: string;
  imageUrl: string;
  imageGallery: { url: string; caption: string; credit: string }[];
  imageCredit: string;
  verificationStatus: VerificationStatus;
  verifiedBy: string;
  lastReviewed: string;
  sourceCitations: SourceCitation[];
  officialWebsite?: string;
  contributor: {
    name: string;
    role: string;
    dateSubmitted: string;
  };
  featured: boolean;
  tags: string[];
}

export interface EventListing {
  id: string;
  slug: string;
  title: string;
  titleMalayalam: string;
  category: string;
  artForm: string;
  date: string;
  formattedDate: string;
  time: string;
  venue: string;
  district: DistrictName;
  locality: string;
  address?: string;
  organizer: string;
  description: string;
  culturalContext: string;
  sourceLink: string;
  lastConfirmedDate: string;
  status: 'Confirmed' | 'Tentative' | 'Annual Season';
  imageUrl: string;
  entryType: 'Free Entry' | 'Pass Required' | 'Ritual Offering';
  scheduleHighlights: { time: string; item: string }[];
}

export interface SubmissionReviewItem {
  id: string;
  type: 'Place' | 'Artist' | 'Institution' | 'Event' | 'Correction';
  name: string;
  artForm: string;
  district: DistrictName;
  locality: string;
  description: string;
  culturalSignificance: string;
  sources: string[];
  contributorName: string;
  contributorEmail: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Changes Requested' | 'Rejected';
  reviewerNotes?: string;
  urgency: 'Low' | 'Medium' | 'High';
  nameMalayalam?: string;
  address?: string;
  eventDate?: string;
  eventTime?: string;
  venue?: string;
  organizer?: string;
  coordinates?: { lat: number; lng: number };
  imageUrl?: string;
  imageCredit?: string;
  websiteLink?: string;
  listingCategory?: ListingCategory;
  listingCategorySlug?: string;
  eventCategory?: string;
}
