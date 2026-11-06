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
  // Interactive verification checklist state
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
        `Submission ${submission.id} has been APPROVED and scheduled for live map indexing!`
      );
    } else if (type === 'request_changes') {
      setActionNotice(`Change request sent to ${submission.contributorEmail} with your notes.`);
    } else {
      setActionNotice(`Submission ${submission.id} rejected.`);
    }
  };

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-6 py-8">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/admin"
          className="text-xs text-stone-500 hover:text-black flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Moderation Queue</span>
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-stone-400">
              SUBMISSION {submission.id}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-[#FF5931] border border-orange-200">
              {submission.type}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700">
              Urgency: {submission.urgency}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
            {submission.name}
          </h1>
          <p className="text-xs text-stone-500 mt-0.5 font-medium">
            {submission.artForm} · {submission.locality}, {submission.district}
          </p>
        </div>

        <div className="text-xs text-stone-400 sm:text-right">
          <span>Submitted on</span>
          <div className="font-mono text-stone-700 font-semibold">
            {submission.submittedAt.split('T')[0]}
          </div>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionNotice && (
        <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionNotice}</span>
          </div>
          <button
            onClick={() => setActionNotice(null)}
            className="text-emerald-700 hover:text-emerald-950 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Split Review Layout: Left Content (7 cols) / Right Verification Controls (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Submitted Content Overview */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono">
              Submitted Narrative Summary
            </h3>
            <p className="text-stone-800 text-sm leading-relaxed font-medium">
              {submission.description}
            </p>

            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono mt-2">
              Cultural & Historical Significance
            </h3>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
              {submission.culturalSignificance}
            </p>
          </div>

          {/* Sources and Citations */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono">
              Provided Archival Sources & Links
            </h3>
            <ul className="space-y-2 text-xs">
              {submission.sources.map((src, index) => (
                <li
                  key={index}
                  className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-stone-700 flex items-center justify-between gap-2"
                >
                  <span className="truncate">{src}</span>
                  {src.startsWith('http') && (
                    <a
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF9041] hover:underline flex items-center gap-1 flex-shrink-0"
                    >
                      <span>Check URL</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contributor Card */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
                <User className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-stone-900 block">{submission.contributorName}</span>
                <span className="text-stone-500 font-mono">{submission.contributorEmail}</span>
              </div>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Verified Contributor
            </span>
          </div>
        </div>

        {/* Right: Verification Checklist & Decision Panel */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs flex flex-col gap-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-mono pb-2 border-b border-stone-100 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#FF9041]" />
              <span>4-Point Verification Checklist</span>
            </h3>

            {/* Checklist items */}
            <div className="space-y-3">
              <div
                onClick={() => toggleCheck('coords')}
                className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 cursor-pointer transition-colors text-xs"
              >
                {checklist.coords ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold text-stone-900 block">
                    Geographic coordinates checked
                  </span>
                  <p className="text-stone-500 text-[11px]">
                    Location matched with Kerala revenue village boundaries.
                  </p>
                </div>
              </div>

              <div
                onClick={() => toggleCheck('sources')}
                className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 cursor-pointer transition-colors text-xs"
              >
                {checklist.sources ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold text-stone-900 block">
                    Archival backing verified
                  </span>
                  <p className="text-stone-500 text-[11px]">
                    Cross-referenced with folklore archives or published monographs.
                  </p>
                </div>
              </div>

              <div
                onClick={() => toggleCheck('media')}
                className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 cursor-pointer transition-colors text-xs"
              >
                {checklist.media ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold text-stone-900 block">
                    Media copyright and permissions
                  </span>
                  <p className="text-stone-500 text-[11px]">
                    Photo credit adheres to CC license / community consent.
                  </p>
                </div>
              </div>

              <div
                onClick={() => toggleCheck('consent')}
                className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 cursor-pointer transition-colors text-xs"
              >
                {checklist.consent ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold text-stone-900 block">
                    Respects ritual privacy guidelines
                  </span>
                  <p className="text-stone-500 text-[11px]">
                    Does not disclose confidential sanctum rites or banned photography.
                  </p>
                </div>
              </div>
            </div>

            {/* Reviewer Notes */}
            <div className="pt-2">
              <label className="text-xs font-semibold text-stone-700 mb-1.5 block">
                Reviewer Field Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add curatorial notes, citation checks, or feedback to the contributor..."
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-2xl p-3 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Decision Action Buttons */}
            <div className="pt-4 border-t border-stone-100 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => handleAction('approve')}
                className="w-full rounded-full bg-[#B21C01] hover:bg-[#8e1701] text-white font-semibold text-xs py-3 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Publish to Living Map</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('request_changes')}
                className="w-full rounded-full bg-[#FF9041] hover:bg-[#e77b2d] text-white font-semibold text-xs py-2.5 transition-colors flex items-center justify-center gap-1.5"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Request Corrections from Contributor</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('reject')}
                className="w-full rounded-full border border-stone-300 hover:border-red-500 hover:text-red-600 text-stone-700 font-semibold text-xs py-2 transition-colors flex items-center justify-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Submission</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
