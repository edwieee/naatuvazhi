'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SubmissionReviewItem } from '@/lib/types';
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
} from 'lucide-react';

interface Props {
  submission: SubmissionReviewItem;
}

export default function AdminReviewClient({ submission }: Props) {
  const [checklist, setChecklist] = useState({
    coords: true,
    sources: true,
    media: false,
    consent: true,
  });

  const [notes, setNotes] = useState(submission.reviewerNotes || '');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAction = (type: 'approve' | 'request_changes' | 'reject') => {
    if (type === 'approve') {
      setActionNotice(
        `Submission ${submission.id} has been APPROVED and scheduled for live map indexing.`
      );
    } else if (type === 'request_changes') {
      setActionNotice(`Correction notice dispatched to ${submission.contributorEmail}.`);
    } else {
      setActionNotice(`Submission ${submission.id} marked as rejected.`);
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
            <span>SUBMISSION {submission.id}</span>
            <span>·</span>
            <span className="text-[#181512] font-semibold">{submission.type}</span>
            <span>·</span>
            <span>Urgency: {submission.urgency}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-semibold text-[#181512] tracking-tight">
            {submission.name}
          </h1>
          <p className="text-xs text-[#5C554B] mt-0.5">
            {submission.artForm} · {submission.locality}, {submission.district}
          </p>
        </div>

        <div className="text-xs text-[#8C8273] sm:text-right font-mono">
          <span>Submitted</span>
          <div className="text-[#181512] font-semibold">
            {submission.submittedAt.split('T')[0]}
          </div>
        </div>
      </div>

      {/* Action Notice */}
      {actionNotice && (
        <div className="mb-6 p-3.5 rounded-md bg-[#F8F5EE] border border-[#E8E2D6] text-[#181512] text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
            <span>{actionNotice}</span>
          </div>
          <button
            onClick={() => setActionNotice(null)}
            className="text-[#8C8273] hover:text-[#181512] text-xs underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Split Review Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Submitted Content */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col gap-3">
            <h3 className="text-xs font-mono text-[#8C8273]">
              SUBMITTED NARRATIVE SUMMARY
            </h3>
            <p className="text-[#181512] text-xs sm:text-sm leading-relaxed">
              {submission.description}
            </p>

            <h3 className="text-xs font-mono text-[#8C8273] mt-2">
              CULTURAL & HISTORICAL SIGNIFICANCE
            </h3>
            <p className="text-[#5C554B] text-xs leading-relaxed">
              {submission.culturalSignificance}
            </p>
          </div>

          {/* Sources */}
          <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col gap-2.5">
            <h3 className="text-xs font-mono text-[#8C8273]">
              PROVIDED ARCHIVAL CITATIONS
            </h3>
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
              Verified Contributor
            </span>
          </div>
        </div>

        {/* Right: Verification Checklist & Decision Panel */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col gap-4">
            <h3 className="text-xs font-mono text-[#8C8273] pb-2 border-b border-[#EDE7DC] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B21C01]" />
              <span>4-POINT VERIFICATION CHECKLIST</span>
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
                    Matched with village revenue boundaries.
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
                    Cross-referenced with folklore monograph.
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
                    Photo credit adheres to CC license / consent.
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
                    Respects ritual privacy guidelines
                  </span>
                  <p className="text-[#8C8273] text-[11px]">
                    Does not disclose confidential sanctum rites.
                  </p>
                </div>
              </div>
            </div>

            {/* Reviewer Notes */}
            <div className="pt-1">
              <label className="text-xs font-medium text-[#181512] mb-1 block">
                Curator Field Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add curatorial notes or citation checks..."
                className="w-full text-xs bg-[#FBF9F5] border border-[#E8E2D6] rounded-md p-2.5 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Decision Action Buttons: Structured 8px radius buttons */}
            <div className="pt-3 border-t border-[#EDE7DC] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleAction('approve')}
                className="w-full rounded-md bg-[#B21C01] hover:bg-[#961700] text-white font-medium text-xs py-2.5 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approve & index on map</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('request_changes')}
                className="w-full rounded-md bg-[#F3EFE8] hover:bg-[#EAE4D9] text-[#181512] border border-[#E8E2D6] font-medium text-xs py-2 transition-colors flex items-center justify-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Request corrections</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('reject')}
                className="w-full rounded-md border border-[#E8E2D6] hover:border-red-400 hover:text-red-700 text-[#8C8273] font-medium text-xs py-1.5 transition-colors flex items-center justify-center gap-1.5"
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
