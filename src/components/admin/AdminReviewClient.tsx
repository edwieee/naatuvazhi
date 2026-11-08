'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SubmissionReviewItem } from '@/lib/types';
import { actionModerateSubmission } from '@/app/actions/curator-actions';
import {
  ShieldCheck,
  CheckSquare,
  Square,
  ArrowLeft,
  ExternalLink,
  User,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  Calendar,
  Clock,
  MapPin,
  Building,
  Image as ImageIcon,
} from 'lucide-react';

interface Props {
  submission: SubmissionReviewItem;
}

export default function AdminReviewClient({ submission }: Props) {
  const [checklist, setChecklist] = useState({
    coords: Boolean(submission.coordinates),
    sources: submission.sources.length > 0,
    media: Boolean(submission.imageUrl),
    consent: true,
  });

  const [notes, setNotes] = useState(submission.reviewerNotes || '');
  const [status, setStatus] = useState(submission.status);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notesError, setNotesError] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<{
    text: string;
    type: 'success' | 'warning' | 'error';
    link?: string;
    linkText?: string;
  } | null>(null);

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAction = async (type: 'approve' | 'request_changes' | 'reject') => {
    setNotesError(null);

    // Enforce mandatory notes for request_changes and reject
    if ((type === 'request_changes' || type === 'reject') && (!notes || !notes.trim())) {
      setNotesError(
        type === 'reject'
          ? 'Please enter a reason for rejection in curator notes before rejecting.'
          : 'Please enter curator notes explaining the requested corrections.'
      );
      return;
    }

    setIsProcessing(true);
    try {
      if (type === 'approve') {
        const res = await actionModerateSubmission(submission.id, 'Approved', notes.trim());
        if (res.success) {
          setStatus('Approved');
          if (res.event) {
            setActionNotice({
              text: `Submission ${submission.id} has been APPROVED and published to the Cultural Calendar!`,
              type: 'success',
              link: `/events/${res.event.slug}`,
              linkText: 'View published event in calendar',
            });
          } else {
            const slug = res.listing?.slug || submission.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            setActionNotice({
              text: `Submission ${submission.id} has been APPROVED and published to the live Kerala Culture Map!`,
              type: 'success',
              link: `/culture/${slug}`,
              linkText: 'View published listing on map',
            });
          }
        } else {
          setActionNotice({ text: res.error || 'Failed to approve', type: 'error' });
        }
      } else if (type === 'request_changes') {
        const res = await actionModerateSubmission(submission.id, 'Changes Requested', notes.trim());
        if (res.success) {
          setStatus('Changes Requested');
          setActionNotice({
            text: `Correction notice recorded. Contributor (${submission.contributorEmail}) will be notified.`,
            type: 'warning',
          });
        } else {
          setActionNotice({ text: res.error || 'Failed to update status', type: 'error' });
        }
      } else {
        const res = await actionModerateSubmission(submission.id, 'Rejected', notes.trim());
        if (res.success) {
          setStatus('Rejected');
          setActionNotice({
            text: `Submission ${submission.id} marked as rejected. Reason archived in curator audit log.`,
            type: 'error',
          });
        } else {
          setActionNotice({ text: res.error || 'Failed to reject', type: 'error' });
        }
      }
    } catch (err: any) {
      setActionNotice({ text: err.message || 'Error executing curatorial action', type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-8 py-8">
      {/* Back Link */}
      <div className="mb-5">
        <Link
          href="/admin"
          className="text-xs text-[#8C8273] hover:text-[#181512] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to moderation queue</span>
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-[#E8E2D6] shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 text-xs font-mono text-[#8C8273]">
            <span>ACCESSION {submission.id}</span>
            <span>·</span>
            <span className="text-[#181512] font-semibold">{submission.type}</span>
            <span>·</span>
            <span
              className={`px-2 py-0.5 rounded-sm font-semibold text-[10px] uppercase tracking-wider ${
                status === 'Approved'
                  ? 'bg-[#F4F9F5] text-[#2D6A4F] border border-[#B7DFCA]'
                  : status === 'Pending'
                  ? 'bg-[#FEF2F2] text-[#B21C01] border border-[#FECACA]'
                  : status === 'Rejected'
                  ? 'bg-[#F3F4F6] text-[#6B7280] border border-[#D1D5DB]'
                  : 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]'
              }`}
            >
              {status}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-semibold text-[#181512] tracking-tight">
            {submission.name}
          </h1>
          {submission.nameMalayalam && (
            <p className="text-sm font-serif text-[#5C554B] mt-0.5">
              {submission.nameMalayalam}
            </p>
          )}
          <p className="text-xs text-[#5C554B] mt-1">
            {submission.artForm} · {submission.locality}, {submission.district}
          </p>
        </div>

        <div className="text-xs text-[#8C8273] sm:text-right font-mono">
          <span>Submitted</span>
          <div className="text-[#181512] font-semibold">
            {submission.submittedAt ? submission.submittedAt.split('T')[0] : 'Today'}
          </div>
        </div>
      </div>

      {/* Action Notice */}
      {actionNotice && (
        <div
          className={`mb-6 p-4 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            actionNotice.type === 'success'
              ? 'bg-[#F4F9F5] border-[#B7DFCA] text-[#1B4D36]'
              : actionNotice.type === 'warning'
              ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
              : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
          }`}
        >
          <div className="flex items-center gap-2">
            {actionNotice.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] flex-shrink-0" />}
            {actionNotice.type === 'warning' && <AlertTriangle className="w-4 h-4 text-[#D97706] flex-shrink-0" />}
            {actionNotice.type === 'error' && <XCircle className="w-4 h-4 text-[#B21C01] flex-shrink-0" />}
            <div>
              <span className="font-medium">{actionNotice.text}</span>
              {actionNotice.link && (
                <div className="mt-1">
                  <Link
                    href={actionNotice.link}
                    className="inline-flex items-center gap-1 font-semibold underline hover:text-[#181512]"
                  >
                    <span>{actionNotice.linkText || 'View published record'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setActionNotice(null)}
            className="text-xs opacity-75 hover:opacity-100 underline self-start sm:self-center"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Split Review Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Submitted Content */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Location & Coordinates Card */}
          <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col gap-2.5">
            <h3 className="text-xs font-mono text-[#8C8273]">
              GEOGRAPHIC PLACEMENT
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#8C8273] block">District & Locality:</span>
                <span className="font-semibold text-[#181512]">
                  {submission.locality}, {submission.district}
                </span>
              </div>
              {submission.address && (
                <div>
                  <span className="text-[#8C8273] block">Address / Landmark:</span>
                  <span className="text-[#181512]">{submission.address}</span>
                </div>
              )}
              {submission.coordinates && (
                <div className="sm:col-span-2 flex items-center gap-2 p-2 bg-[#FBF9F5] border border-[#E8E2D6] rounded-md">
                  <MapPin className="w-3.5 h-3.5 text-[#B21C01] flex-shrink-0" />
                  <span className="font-mono text-[#181512]">
                    Lat: {submission.coordinates.lat.toFixed(4)}, Lng: {submission.coordinates.lng.toFixed(4)}
                  </span>
                  <span className="text-[11px] text-[#2D6A4F] ml-auto font-medium">
                    Plotted on OpenStreetMap
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Event Specific Card (if Event) */}
          {submission.type === 'Event' && (
            <div className="bg-[#FFFDF9] rounded-xl p-5 border border-[#E0D8C7] shadow-xs flex flex-col gap-3">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#181512]">
                <Calendar className="w-4 h-4 text-[#B21C01]" />
                <span>EVENT TIMING & VENUE</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#8C8273] block">Event Date:</span>
                  <span className="font-semibold text-[#181512]">
                    {submission.eventDate || 'Date not specified'}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C8273] block">Session Time:</span>
                  <span className="text-[#181512]">{submission.eventTime || 'Full day'}</span>
                </div>
                <div>
                  <span className="text-[#8C8273] block">Venue:</span>
                  <span className="font-semibold text-[#181512]">{submission.venue || submission.locality}</span>
                </div>
                <div>
                  <span className="text-[#8C8273] block">Organizer:</span>
                  <span className="text-[#181512]">{submission.organizer || 'Traditional Committee'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Narrative Summary */}
          <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col gap-3">
            <h3 className="text-xs font-mono text-[#8C8273]">
              SUBMITTED NARRATIVE SUMMARY
            </h3>
            <p className="text-[#181512] text-xs sm:text-sm leading-relaxed">
              {submission.description}
            </p>

            {submission.culturalSignificance && (
              <>
                <h3 className="text-xs font-mono text-[#8C8273] mt-2">
                  CULTURAL & HISTORICAL SIGNIFICANCE
                </h3>
                <p className="text-[#5C554B] text-xs leading-relaxed">
                  {submission.culturalSignificance}
                </p>
              </>
            )}
          </div>

          {/* Media preview */}
          {submission.imageUrl && (
            <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col gap-3">
              <h3 className="text-xs font-mono text-[#8C8273] flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#B21C01]" />
                <span>FIELD PHOTOGRAPH</span>
              </h3>
              <div className="rounded-lg overflow-hidden border border-[#E8E2D6] max-h-60 bg-[#FBF9F5]">
                <img
                  src={submission.imageUrl}
                  alt={submission.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {submission.imageCredit && (
                <p className="text-[11px] text-[#8C8273] italic">
                  Credit / License: {submission.imageCredit}
                </p>
              )}
            </div>
          )}

          {/* Sources & Links */}
          <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col gap-2.5">
            <h3 className="text-xs font-mono text-[#8C8273]">
              ARCHIVAL CITATIONS & REFERENCES
            </h3>
            {submission.sources.length === 0 ? (
              <p className="text-xs text-[#8C8273] italic">No citation URLs submitted.</p>
            ) : (
              <ul className="space-y-1.5 text-xs">
                {submission.sources.map((src, index) => (
                  <li
                    key={index}
                    className="p-2.5 rounded-md bg-[#FBF9F5] border border-[#EDE7DC] text-[#5C554B] flex items-center justify-between gap-2"
                  >
                    <span className="truncate">{src}</span>
                    {src.startsWith('http') && (
                      <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#B21C01] hover:underline flex items-center gap-1 flex-shrink-0"
                      >
                        <span>Check</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contributor Card */}
          <div className="bg-white rounded-xl p-4 border border-[#E8E2D6] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-[#F3EFE8] flex items-center justify-center text-[#8C8273]">
                <User className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-[#181512] block">{submission.contributorName}</span>
                <span className="text-[#8C8273] font-mono">{submission.contributorEmail}</span>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#2D6A4F] bg-[#F8F5EE] px-2 py-0.5 rounded-sm border border-[#E8E2D6]">
              Public Contributor
            </span>
          </div>
        </div>

        {/* Right: Verification Checklist & Decision Panel */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col gap-4">
            <h3 className="text-xs font-mono text-[#8C8273] pb-2 border-b border-[#EDE7DC] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B21C01]" />
              <span>4-POINT VERIFICATION PROTOCOL</span>
            </h3>

            {/* Checklist items */}
            <div className="space-y-2">
              <div
                onClick={() => toggleCheck('coords')}
                className="flex items-start gap-2.5 p-2.5 rounded-md bg-[#FBF9F5] hover:bg-[#F3EFE8] cursor-pointer transition-colors text-xs"
              >
                {checklist.coords ? (
                  <CheckSquare className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-[#8C8273] flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-medium text-[#181512] block">
                    Geographic coordinates checked
                  </span>
                  <p className="text-[#8C8273] text-[11px]">
                    Matched with revenue boundaries & OpenStreetMap.
                  </p>
                </div>
              </div>

              <div
                onClick={() => toggleCheck('sources')}
                className="flex items-start gap-2.5 p-2.5 rounded-md bg-[#FBF9F5] hover:bg-[#F3EFE8] cursor-pointer transition-colors text-xs"
              >
                {checklist.sources ? (
                  <CheckSquare className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-[#8C8273] flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-medium text-[#181512] block">
                    Archival backing verified
                  </span>
                  <p className="text-[#8C8273] text-[11px]">
                    Cross-referenced with folklore records or gazetteer.
                  </p>
                </div>
              </div>

              <div
                onClick={() => toggleCheck('media')}
                className="flex items-start gap-2.5 p-2.5 rounded-md bg-[#FBF9F5] hover:bg-[#F3EFE8] cursor-pointer transition-colors text-xs"
              >
                {checklist.media ? (
                  <CheckSquare className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-[#8C8273] flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-medium text-[#181512] block">
                    Media copyright and license
                  </span>
                  <p className="text-[#8C8273] text-[11px]">
                    Image credit adheres to community consent rules.
                  </p>
                </div>
              </div>

              <div
                onClick={() => toggleCheck('consent')}
                className="flex items-start gap-2.5 p-2.5 rounded-md bg-[#FBF9F5] hover:bg-[#F3EFE8] cursor-pointer transition-colors text-xs"
              >
                {checklist.consent ? (
                  <CheckSquare className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-[#8C8273] flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-medium text-[#181512] block">
                    Ritual privacy guidelines
                  </span>
                  <p className="text-[#8C8273] text-[11px]">
                    Does not disclose confidential inner sanctum rituals.
                  </p>
                </div>
              </div>
            </div>

            {/* Reviewer Notes */}
            <div className="pt-1">
              <label className="text-xs font-medium text-[#181512] mb-1 block">
                Curator Field Notes & Decision Rationale
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  if (notesError) setNotesError(null);
                }}
                placeholder="Required for rejections or change requests. Document verification details..."
                className={`w-full text-xs bg-[#FBF9F5] border rounded-md p-2.5 focus:bg-white focus:outline-none transition-colors ${
                  notesError ? 'border-red-400' : 'border-[#E8E2D6] focus:border-[#181512]'
                }`}
              />
              {notesError && <p className="text-[11px] text-red-600 mt-1">{notesError}</p>}
            </div>

            {/* Decision Action Buttons */}
            <div className="pt-3 border-t border-[#EDE7DC] flex flex-col gap-2">
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => handleAction('approve')}
                className="w-full rounded-md bg-[#B21C01] hover:bg-[#961700] disabled:opacity-50 text-white font-medium text-xs py-2.5 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                {isProcessing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                )}
                <span>
                  {submission.type === 'Event' ? 'Approve & publish event' : 'Approve & index on map'}
                </span>
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={() => handleAction('request_changes')}
                className="w-full rounded-md bg-[#F3EFE8] hover:bg-[#EAE4D9] disabled:opacity-50 text-[#181512] border border-[#E8E2D6] font-medium text-xs py-2 transition-colors flex items-center justify-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Request corrections</span>
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={() => handleAction('reject')}
                className="w-full rounded-md border border-[#E8E2D6] hover:border-red-400 hover:text-red-700 disabled:opacity-50 text-[#8C8273] font-medium text-xs py-1.5 transition-colors flex items-center justify-center gap-1.5"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Reject submission</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
