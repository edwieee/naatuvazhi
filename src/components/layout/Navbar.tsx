'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages, Menu, X } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/explore', labelEn: 'Directory & Map', labelMl: 'ഭൂപടം' },
    { href: '/events', labelEn: 'Festivals', labelMl: 'ഉത്സവങ്ങൾ' },
    { href: '/contribute', labelEn: 'Contribute', labelMl: 'വിവരങ്ങൾ ചേർക്കുക' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-[#fcfcec]/95 backdrop-blur-sm border-b border-[#e5e0d4]">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-12 h-16 flex items-center justify-between">
        {/* Brand Anchor */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 group transition-opacity hover:opacity-90 focus:outline-none"
        >
          <div className="w-7 h-7 bg-[#aa3000] text-white flex items-center justify-center font-bold text-xs tracking-tight rounded-sm shadow-xs">
            NV
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-xl font-semibold text-[#1c1c16] tracking-tight">
              nattuvazhi
            </span>
            <span className="font-malayalam text-xs text-[#6b645b] font-normal hidden sm:inline">
              നാട്ടുവഴി
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 font-body text-sm ${
                  active
                    ? 'text-[#aa3000] font-semibold border-b-2 border-[#aa3000]'
                    : 'text-[#5d5e61] hover:text-[#1c1c16]'
                }`}
              >
                {t(link.labelEn, link.labelMl)}
              </Link>
            );
          })}
        </nav>

        {/* Trailing Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="hidden sm:inline-block font-body text-xs font-medium text-[#5d5e61] hover:text-[#1c1c16] hover:bg-[#f3ede1] transition-colors px-3 py-1.5 rounded-md"
          >
            {t('Curator portal', 'ക്യുറേറ്റർ പോർട്ടൽ')}
          </Link>

          {/* Bilingual Toggle Button */}
          <button
            onClick={toggleLanguage}
            type="button"
            className="font-body text-xs bg-[#f6f4ea] hover:bg-[#ede7da] text-[#1c1c16] px-3 py-1.5 border border-[#ded7c9] rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Toggle language / ഭാഷ മാറ്റുക"
          >
            <Languages className="w-3.5 h-3.5 text-[#aa3000]" />
            <span className="font-malayalam font-medium">{language === 'en' ? 'മലയാളം' : 'English'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded text-[#1c1c16] hover:bg-[#f0eee5]"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[#e5e0d4] py-4 px-6 flex flex-col gap-3 bg-[#fcfcec] shadow-md md:hidden">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1 text-base font-medium ${
                  active ? 'text-[#aa3000] font-semibold' : 'text-[#1c1c16]'
                }`}
              >
                {t(link.labelEn, link.labelMl)}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-[#e5e0d4] flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-body font-medium text-[#5d5e61] hover:text-[#aa3000]"
            >
              Curator portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
