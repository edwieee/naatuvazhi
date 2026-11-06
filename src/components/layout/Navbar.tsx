'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Compass, 
  Calendar, 
  PlusCircle, 
  ShieldCheck, 
  Languages, 
  Menu, 
  X
} from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/explore', labelEn: 'Directory & Map', labelMl: 'ഭൂപടം', icon: Compass },
    { href: '/events', labelEn: 'Festivals', labelMl: 'ഉത്സവങ്ങൾ', icon: Calendar },
    { href: '/contribute', labelEn: 'Contribute', labelMl: 'വിവരങ്ങൾ ചേർക്കുക', icon: PlusCircle },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F5F5F5]/95 backdrop-blur-sm border-b border-[#E8E2D6] px-4 md:px-8">
      <nav className="max-w-6xl mx-auto h-14 flex items-center justify-between">
        {/* Brand Identity */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          {/* NV Logo with subtle deep-red to coral treatment */}
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#B21C01] to-[#FF5931] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-xs group-hover:opacity-95 transition-opacity">
            NV
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-base text-[#000000] tracking-tight">
              nattuvazhi
            </span>
            <span className="text-xs text-[#5C554B] font-medium hidden sm:inline">
              നാട്ടുവഴി
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  active
                    ? 'bg-[#FF9041] text-[#000000] font-semibold shadow-xs'
                    : 'text-[#000000] hover:text-[#FF5931] hover:bg-[#FFF8F0]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#000000]' : 'text-[#FF9041]'}`} />
                <span>{t(link.labelEn, link.labelMl)}</span>
              </Link>
            );
          })}
        </div>

        {/* Action Group: Admin & Language Toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#000000] hover:text-[#FF5931] px-2.5 py-1.5 rounded-md hover:bg-[#FFF8F0] transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#5C554B]" />
            <span>Curator portal</span>
          </Link>

          <div className="h-4 w-px bg-[#E8E2D6] hidden sm:block mx-1"></div>

          {/* Bilingual Toggle with warm neutral border and subtle orange hover */}
          <button
            onClick={toggleLanguage}
            type="button"
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md bg-white hover:bg-[#FFF8F0] text-[#000000] hover:text-[#FF5931] border border-[#E8E2D6] hover:border-[#FF9041] transition-colors shadow-2xs"
            title="Toggle language / ഭാഷ മാറ്റുക"
          >
            <Languages className="w-3.5 h-3.5 text-[#FF9041]" />
            <span>{language === 'en' ? 'മലയാളം' : 'English'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-md hover:bg-[#FFF8F0] text-[#000000]"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D6] py-3 flex flex-col gap-1 bg-[#F5F5F5]">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active ? 'bg-[#FF9041] text-[#000000] font-semibold' : 'text-[#000000] hover:bg-[#FFF8F0]'
                }`}
              >
                <Icon className="w-4 h-4 text-[#FF9041]" />
                <span>{t(link.labelEn, link.labelMl)}</span>
              </Link>
            );
          })}
          <div className="pt-2 mt-2 border-t border-[#E8E2D6] flex items-center justify-between px-3 text-xs">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 text-[#000000] hover:text-[#FF5931] py-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#5C554B]" />
              <span>Curator portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
