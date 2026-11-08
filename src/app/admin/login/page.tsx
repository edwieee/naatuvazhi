'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  Loader2,
} from 'lucide-react';

const DEMO_EMAIL = 'curator.nattuvazhi@gmail.com';
const DEMO_PASSWORD = 'Nattuvazhi@Curator2026';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Copy feedback states
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  const handleCopy = (text: string, type: 'email' | 'password') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPassword(true);
      setTimeout(() => setCopiedPassword(false), 2000);
    }
  };

  const handleFillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setErrorMessage(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const supabase = createClient();
    if (!supabase) {
      setErrorMessage('Supabase client is unavailable. Please check configuration.');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        setErrorMessage(error.message || 'Invalid curator credentials. Please verify your email and password.');
        setIsLoading(false);
        return;
      }

      if (data.session) {
        // Successfully authenticated
        router.push(redirectPath);
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-5">
      {/* Back Link */}
      <Link
        href="/"
        className="text-xs text-[#8C8273] hover:text-[#181512] flex items-center gap-1.5 transition-colors self-start"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to public cultural archive</span>
      </Link>

      {/* Main Card */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E8E2D6] shadow-xs flex flex-col gap-5">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-1.5">
          <div className="w-9 h-9 rounded-md bg-[#B21C01] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-xs mb-1">
            NV
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-[#181512] tracking-tight">
            Curator & Editorial Portal
          </h1>
          <p className="text-xs text-[#5C554B] max-w-xs leading-relaxed">
            Restricted authentication portal for verified regional folklore archivists, cultural researchers, and peer reviewers.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-800">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="leading-snug">{errorMessage}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-[#181512] mb-1.5 block">
              Curator Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8C8273] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="curator@nattuvazhi.org"
                required
                className="w-full pl-9 pr-3 py-2 bg-[#FBF9F5] border border-[#E8E2D6] rounded-md text-xs font-medium focus:bg-white focus:border-[#181512] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-[#181512]">
                Curator Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-[#8C8273] hover:text-[#181512] flex items-center gap-1 transition-colors"
              >
                {showPassword ? (
                  <>
                    <EyeOff className="w-3 h-3" />
                    <span>Hide</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3" />
                    <span>Show</span>
                  </>
                )}
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C8273] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-9 pr-10 py-2 bg-[#FBF9F5] border border-[#E8E2D6] rounded-md text-xs font-medium focus:bg-white focus:border-[#181512] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-md bg-[#181512] hover:bg-[#B21C01] text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50 mt-1 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <>
                <span>Sign in to Curator Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Public Demo Credentials Section (For Hackathon Judges) */}
        <div className="pt-4 border-t border-[#EDE7DC] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#181512]">
              <Sparkles className="w-3.5 h-3.5 text-[#B21C01]" />
              <span>Demo Access — Project Evaluation</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-medium text-[#B21C01] hover:underline"
            >
              Fill Credentials
            </button>
          </div>

          <p className="text-[11px] text-[#5C554B] leading-relaxed">
            Provisioned for ART//CODE hackathon evaluation with regional curator permissions to review, request changes, and approve community submissions.
          </p>

          <div className="bg-[#F8F5EE] border border-[#E8E2D6] rounded-lg p-3 flex flex-col gap-2 font-mono text-xs">
            {/* Email Field */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col truncate">
                <span className="text-[10px] text-[#8C8273] font-sans font-medium uppercase tracking-wider">
                  Demo Email
                </span>
                <span className="text-[#181512] font-semibold truncate select-all">
                  {DEMO_EMAIL}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(DEMO_EMAIL, 'email')}
                className="p-1.5 rounded hover:bg-[#EDE7DC] text-[#5C554B] hover:text-[#181512] transition-colors flex-shrink-0"
                title="Copy email"
                aria-label="Copy email"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-[#2D6A4F]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            <div className="h-px bg-[#E8E2D6]"></div>

            {/* Password Field */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col truncate">
                <span className="text-[10px] text-[#8C8273] font-sans font-medium uppercase tracking-wider">
                  Password
                </span>
                <span className="text-[#181512] font-semibold truncate select-all">
                  {DEMO_PASSWORD}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(DEMO_PASSWORD, 'password')}
                className="p-1.5 rounded hover:bg-[#EDE7DC] text-[#5C554B] hover:text-[#181512] transition-colors flex-shrink-0"
                title="Copy password"
                aria-label="Copy password"
              >
                {copiedPassword ? (
                  <Check className="w-3.5 h-3.5 text-[#2D6A4F]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Security Statement */}
        <div className="text-[11px] text-[#8C8273] text-center flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
          <span>Protected via Supabase Auth & Row Level Security</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="flex-1 w-full flex items-center justify-center p-4 md:px-8 py-12 md:py-16">
      <Suspense fallback={<div className="w-full max-w-md h-96 bg-[#FBF9F5] rounded-xl animate-pulse" />}>
        <AdminLoginForm />
      </Suspense>
    </main>
  );
}
