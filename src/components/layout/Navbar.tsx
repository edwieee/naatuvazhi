'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Compass, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Languages, 
  Menu, 
  X,
  MapPin
} from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/explore', labelEn: 'Explore', labelMl: 'കണ്ടെത്തുക', icon: Compass },
    { href: '/events', labelEn: 'Events', labelMl: 'ഉത്സവങ്ങൾ', icon: Calendar },
    { href: '/contribute', labelEn: 'Contribute', labelMl: 'പങ്കുവെക്കുക', icon: Sparkles },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-4 z-50 px-4 md:px-6 w-full max-w-6xl mx-auto transition-all">
      <nav className="relative flex items-center justify-between bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-full px-4 sm:px-6 py-2.5 transition-all">
        {/* Brand Identity */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#B21C01] via-[#FF5931] to-[#FF9041] flex items-center justify-center text-white shadow-sm shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <span className="font-bold text-xs tracking-wider">NV</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-black group-hover:text-[#FF5931] transition-colors">
                nattuvazhi
              </span>
              <span className="text-[10px] text-stone-500 font-medium hidden sm:inline">
                നാട്ടുവഴി
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                  active
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-700 hover:text-black hover:bg-stone-100/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#FFB658]' : 'text-stone-500'}`} />
                <span>{t(link.labelEn, link.labelMl)}</span>
              </Link>
            );
          })}
        </div>

        {/* Action Group: Admin & Language Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/admin"
            className="hidden sm:flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-black px-2.5 py-1.5 rounded-full hover:bg-stone-100 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
            <span>Admin</span>
          </Link>

          {/* Bilingual Toggle Pill */}
          <button
            onClick={toggleLanguage}
            type="button"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200/80 transition-all hover:border-stone-300 shadow-2xs"
            title="Toggle Language / ഭാഷ മാറ്റുക"
          >
            <Languages className="w-3.5 h-3.5 text-[#FF9041]" />
            <span>{language === 'en' ? 'മലയാളം' : 'English'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full hover:bg-stone-100 text-stone-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200/90 shadow-xl p-4 flex flex-col gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active ? 'bg-stone-900 text-white' : 'text-stone-800 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-4 h-4 text-[#FF9041]" />
                <span>{t(link.labelEn, link.labelMl)}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between px-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-medium text-stone-600 hover:text-black py-2"
            >
              <ShieldCheck className="w-4 h-4 text-stone-500" />
              <span>Admin Moderation</span>
            </Link>
            <Link
              href="/contribute"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-medium text-[#B21C01]"
            >
              Suggest a place →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
