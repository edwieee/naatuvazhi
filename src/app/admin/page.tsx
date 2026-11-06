'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_ADMIN_SUBMISSIONS } from '@/data/mock-admin';
import {
  ShieldCheck,
  Search,
  ChevronRight
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Approved' | 'Changes Requested'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubmissions = MOCK_ADMIN_SUBMISSIONS.filter((sub) => {
    const matchesTab = activeTab === 'All' || sub.status === activeTab;
    const matchesSearch =
      !searchQuery ||
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.contributorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E8E2D6]">
        <div>
          <div className="text-xs font-mono text-[#8C8273] mb-1">
            CURATORIAL VERIFICATION BUREAU
          </div>
          <h1 className="text-2xl font-semibold text-[#181512] tracking-tight">
            Moderation Dashboard
          </h1>
          <p className="text-xs text-[#5C554B] mt-0.5">
            Reviewing community cultural accessions against published folklore monographs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/explore"
            className="rounded-md bg-[#F3EFE8] hover:bg-[#EAE4D9] text-[#181512] text-xs font-medium px-3 py-1.5 transition-colors"
          >
            Public site
          </Link>
          <div className="w-7 h-7 rounded-md bg-[#181512] text-white font-mono text-xs flex items-center justify-center">
            DR
          </div>
        </div>
      </div>

      {/* Metrics Cards: Numbers only, no decorative bloated icon backgrounds */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 border border-[#E8E2D6] shadow-xs">
          <span className="text-[11px] font-mono text-[#8C8273] block">
            PENDING REVIEW
          </span>
          <div className="text-2xl font-bold font-mono text-[#B21C01] tabular-nums mt-1">14</div>
          <span className="text-[11px] text-[#5C554B]">3 high urgency</span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E8E2D6] shadow-xs">
          <span className="text-[11px] font-mono text-[#8C8273] block">
            APPROVED THIS MONTH
          </span>
          <div className="text-2xl font-bold font-mono text-[#2D6A4F] tabular-nums mt-1">82</div>
          <span className="text-[11px] text-[#5C554B]">Indexed on map</span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E8E2D6] shadow-xs">
          <span className="text-[11px] font-mono text-[#8C8273] block">
            CHANGES REQUESTED
          </span>
          <div className="text-2xl font-bold font-mono text-[#D97706] tabular-nums mt-1">6</div>
          <span className="text-[11px] text-[#5C554B]">Awaiting citations</span>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#E8E2D6] shadow-xs">
          <span className="text-[11px] font-mono text-[#8C8273] block">
            SEASONAL FESTIVALS
          </span>
          <div className="text-2xl font-bold font-mono text-[#181512] tabular-nums mt-1">28</div>
          <span className="text-[11px] text-[#5C554B]">Active in calendar</span>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-[#E8E2D6] shadow-xs overflow-hidden flex flex-col">
        {/* Controls Bar */}
        <div className="p-4 border-b border-[#E8E2D6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {(['All', 'Pending', 'Approved', 'Changes Requested'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search queue..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#FBF9F5] focus:bg-white rounded-md text-xs font-medium border border-[#E8E2D6] focus:border-[#181512] focus:outline-none transition-colors placeholder:text-[#8C8273]"
            />
          </div>
        </div>

        {/* Table */}
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
                            ? 'bg-[#F3EFE8] text-[#2D6A4F] border border-[#D8D1C4]'
                            : sub.status === 'Pending'
                            ? 'bg-[#F8F5EE] text-[#B21C01] border border-[#E8E2D6]'
                            : 'bg-[#F8F5EE] text-[#D97706] border border-[#E8E2D6]'
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
    </main>
  );
}
