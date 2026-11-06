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
    }, 400);
  };

  return (
    <main className="flex-1 w-full flex items-center justify-center p-4 md:px-8 py-16">
      <div className="w-full max-w-sm bg-white rounded-xl p-6 sm:p-8 border border-[#E8E2D6] shadow-xs flex flex-col gap-5">
        {/* Back Link */}
        <Link
          href="/"
          className="text-xs text-[#8C8273] hover:text-[#181512] flex items-center gap-1.5 transition-colors self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to public site</span>
        </Link>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-1.5">
          <div className="w-8 h-8 rounded-md bg-[#B21C01] text-white flex items-center justify-center font-bold text-xs tracking-wider mb-1">
            NV
          </div>
          <h1 className="text-xl font-semibold text-[#181512] tracking-tight">
            Curator Portal
          </h1>
          <p className="text-xs text-[#5C554B] max-w-xs leading-relaxed">
            Restricted access for verified cultural researchers and regional folklore archivists.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
          <div>
            <label className="text-xs font-medium text-[#181512] mb-1 block">
              Curator Email
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-[#8C8273] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-8 pr-3 py-2 bg-[#FBF9F5] border border-[#E8E2D6] rounded-md text-xs font-medium focus:bg-white focus:border-[#181512] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#181512] mb-1 block">
              Access Token / Password
            </label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-[#8C8273] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-8 pr-3 py-2 bg-[#FBF9F5] border border-[#E8E2D6] rounded-md text-xs font-medium focus:bg-white focus:border-[#181512] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#181512] mb-1 block">
              Moderation Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full text-xs font-medium bg-[#FBF9F5] border border-[#E8E2D6] rounded-md px-2.5 py-2 focus:outline-none text-[#181512]"
            >
              <option value="Regional Folklore Curator">Regional Folklore Curator</option>
              <option value="Senior Academic Reviewer">Senior Academic Reviewer</option>
              <option value="Cultural GIS Admin">Cultural GIS Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 w-full rounded-md bg-[#181512] hover:bg-[#B21C01] text-white font-medium text-xs py-2.5 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Enter portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="text-[11px] text-center text-[#8C8273] border-t border-[#EDE7DC] pt-3 font-mono">
          Demonstration UI mode · Direct entry
        </div>
      </div>
    </main>
  );
}
