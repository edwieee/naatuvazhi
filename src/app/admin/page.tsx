'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_ADMIN_SUBMISSIONS } from '@/data/mock-admin';
import {
  ShieldCheck,
  Inbox,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Search,
  Filter,
  ArrowRight,
  Eye,
  Clock,
  Sparkles,
  Layers,
  ChevronRight,
  UserCheck
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
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF5931] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Curatorial Verification Bureau</span>
          </div>
          <h1 className="text-3xl font-extrabold text-stone-950 tracking-tight">
            Nattuvazhi Moderation Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            Peer-reviewing community submissions against folklore archives and field oral testimonies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/explore"
            className="rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold px-4 py-2 transition-colors"
          >
            Public Site
          </Link>
          <div className="w-8 h-8 rounded-full bg-stone-900 text-white font-bold text-xs flex items-center justify-center">
            DR
          </div>
        </div>
      </div>

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-mono">
              Pending Review
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#FF5931] mt-1">14</div>
            <span className="text-[11px] text-stone-500 font-medium">3 high urgency</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF5931] flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-mono">
              Approved This Month
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">82</div>
            <span className="text-[11px] text-stone-500 font-medium">Published on map</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-mono">
              Changes Requested
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">6</div>
            <span className="text-[11px] text-stone-500 font-medium">Awaiting source citations</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-mono">
              Active Events
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">28</div>
            <span className="text-[11px] text-stone-500 font-medium">Seasonal festivals</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col">
        {/* Table Controls Bar */}
        <div className="p-4 sm:p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {(['All', 'Pending', 'Approved', 'Changes Requested'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Table */}
          <div className="relative sm:w-72">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter queue by title, district, or contributor..."
              className="w-full pl-9 pr-3 py-1.5 bg-stone-100 focus:bg-white rounded-full text-xs font-medium border border-transparent focus:border-stone-400 focus:outline-none transition-all placeholder:text-stone-400"
            />
          </div>
        </div>

        {/* Submissions Queue Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/70 border-b border-stone-200 text-stone-500 uppercase font-mono tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">ID & Type</th>
                <th className="py-3 px-6">Submitted Name & Tradition</th>
                <th className="py-3 px-6">Location</th>
                <th className="py-3 px-6">Contributor</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">
                    No submissions found in this status queue
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="font-mono font-bold text-stone-900 block">{sub.id}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FF9041] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200/60 inline-block mt-0.5">
                        {sub.type}
                      </span>
                    </td>

                    <td className="py-4 px-6 max-w-xs">
                      <div className="font-bold text-stone-900 hover:text-[#FF5931] transition-colors line-clamp-1">
                        {sub.name}
                      </div>
                      <div className="text-[11px] text-stone-500 line-clamp-1">{sub.artForm}</div>
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="font-semibold text-stone-800 block">{sub.district}</span>
                      <span className="text-[11px] text-stone-500">{sub.locality}</span>
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="font-medium text-stone-800 block">{sub.contributorName}</span>
                      <span className="text-[11px] text-stone-400">{sub.contributorEmail}</span>
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          sub.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : sub.status === 'Pending'
                            ? 'bg-orange-50 text-[#FF5931] border border-orange-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <Link
                        href={`/admin/review/${sub.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 hover:bg-[#FF9041] text-white font-semibold text-xs transition-colors"
                      >
                        <span>Review Item</span>
                        <ChevronRight className="w-3.5 h-3.5" />
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
