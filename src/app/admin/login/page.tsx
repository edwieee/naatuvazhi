'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('curator@nattuvazhi.org');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState('Regional Folklore Curator');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/admin');
    }, 600);
  };

  return (
    <main className="flex-1 w-full flex items-center justify-center p-4 md:p-6 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-xl flex flex-col gap-6">
        {/* Back Link */}
        <Link
          href="/"
          className="text-xs text-stone-500 hover:text-black flex items-center gap-1.5 transition-colors self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Site</span>
        </Link>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#B21C01] via-[#FF5931] to-[#FF9041] flex items-center justify-center text-white shadow-md mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-stone-950 tracking-tight">
            Nattuvazhi Curator Portal
          </h1>
          <p className="text-xs text-stone-500 max-w-xs">
            Restricted access for certified cultural scholars, folklore archivists, and moderation officers.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-stone-700 mb-1.5 block">
              Curator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:border-stone-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 mb-1.5 block">
              Access Token / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:border-stone-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 mb-1.5 block">
              Moderation Role Simulation
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full text-xs font-semibold bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 focus:outline-none"
            >
              <option value="Regional Folklore Curator">Regional Folklore Curator</option>
              <option value="Senior Academic Reviewer">Senior Academic Reviewer</option>
              <option value="Cultural GIS Admin">Cultural GIS Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-full bg-stone-900 hover:bg-[#FF9041] text-white font-semibold text-sm py-3 transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            {isLoading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>Enter Moderation Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-[11px] text-center text-stone-400 border-t border-stone-100 pt-3">
          Demonstration UI mode · No credentials required to test dashboard
        </div>
      </div>
    </main>
  );
}
