import { SubmissionReviewItem } from '@/lib/types';

export const MOCK_ADMIN_SUBMISSIONS: SubmissionReviewItem[] = [
  {
    id: 'sub-101',
    type: 'Place',
    name: 'Madayi Kavu (Thiruvarkadu Bhagavathy Temple)',
    artForm: 'Kalarivathukkal Theyyam & Poorakkali',
    district: 'Kannur',
    locality: 'Madayi, Pazhayangadi',
    description: 'Ancient mother goddess shrine where the fierce Kali manifestation is worshipped through Kalasham offering and nocturnal Theyyam rites. Historically associated with the Kolathiri Rajas.',
    culturalSignificance: 'One of the four prominent Bhadrakali shrines of Malabar, housing distinct wood-carved ceilings and hosting the sacred Poorakkali dance festival during the month of Meenam.',
    sources: [
      'Kerala Folklore Academy Malabar Survey Vol. 4',
      'Travancore Archaeological Series (Comparative Malabar Temples)',
      'https://keralatourism.org/destination/madayi-kavu'
    ],
    contributorName: 'Dr. S. K. Nambiar',
    contributorEmail: 'sk.nambiar@heritage-kerala.org',
    submittedAt: '2026-03-01T10:30:00Z',
    status: 'Pending',
    reviewerNotes: 'Coordinates checked with village land records. Need confirmation on upcoming festival dates.',
    urgency: 'High'
  },
  {
    id: 'sub-102',
    type: 'Artist',
    name: 'Guru Kalamandalam Gopi (Kathakali Paccha Maestro)',
    artForm: 'Kathakali Paccha & Classical Abhinaya',
    district: 'Thrissur',
    locality: 'Mundathikode',
    description: 'The living doyen of the Kalluvazhi style of Kathakali, renowned for over six decades for portraying characters like Karnan, Nalan, and Rugmangadan with profound emotive depth.',
    culturalSignificance: 'Padma Shri recipient and direct disciple of legendary masters Padmanabhan Nair and Ramankutty Nair; embodies the absolute pinnacle of classical physical acting.',
    sources: [
      'Sangeet Natak Akademi Archives Profile #K0412',
      'Kalamandalam Centenary Biographical Monograph'
    ],
    contributorName: 'Aparna Krishnakumar',
    contributorEmail: 'aparna.k@artsjournal.in',
    submittedAt: '2026-03-02T14:15:00Z',
    status: 'Approved',
    reviewerNotes: 'Verified with Kalamandalam alumni directory and archival photography permissions.',
    urgency: 'Medium'
  },
  {
    id: 'sub-103',
    type: 'Event',
    name: 'Chettikulangara Bharani Kumbha Kuthirayottam',
    artForm: 'Kuthirayottam, Kettukazhcha & Anjilimoodu Rites',
    district: 'Alappuzha',
    locality: 'Chettikulangara, Mavelikkara',
    description: 'Mammoth community ritual pageant where twelve 70-foot tall illuminated wooden temple chariots (Kuthiras and Therus) are hand-drawn across paddy fields to the temple.',
    culturalSignificance: 'Recognized by UNESCO Intangible Cultural Heritage state inventory; exemplifies indigenous agrarian cooperative engineering and devotional performance.',
    sources: [
      'Alappuzha District Gazetteer',
      'https://chettikulangara.org/festivals'
    ],
    contributorName: 'V. R. Pillai',
    contributorEmail: 'vrpillai@mavelikara.net',
    submittedAt: '2026-03-03T09:00:00Z',
    status: 'Pending',
    reviewerNotes: 'Requires verification of traffic and viewing platform guidelines for public visitors.',
    urgency: 'High'
  },
  {
    id: 'sub-104',
    type: 'Correction',
    name: 'Correction for Aranmula Metal Mirror Casting Process',
    artForm: 'Metallurgy',
    district: 'Pathanamthitta',
    locality: 'Aranmula',
    description: 'The previous listing noted bronze ratio as 80:20 copper-tin. The guild master clarifies that the exact ratio is a guarded secret known only to master casters and contains specific trace metallurgical flux.',
    culturalSignificance: 'Ensures absolute technical accuracy and protects hereditary intellectual craft knowledge.',
    sources: [
      'Letter from Viswabrahmana Aranmula Metal Mirror Guild dated Feb 2026'
    ],
    contributorName: 'Mohanan Achari',
    contributorEmail: 'mohanan@aranmulacraft.org',
    submittedAt: '2026-03-04T11:45:00Z',
    status: 'Changes Requested',
    reviewerNotes: 'Request copy of the guild authorization seal before updating the public listing.',
    urgency: 'Medium'
  }
];
