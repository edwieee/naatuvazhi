'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
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
    { href: '/explore', labelEn: 'Directory & Map', labelMl: 'ഭൂപടം' },
    { href: '/events', labelEn: 'Festivals', labelMl: 'ഉത്സവങ്ങൾ' },
    { href: '/contribute', labelEn: 'Contribute', labelMl: 'വിവരങ്ങൾ ചേർക്കുക' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-[#fcf9f0]/95 backdrop-blur-sm border-b border-[#e5e3d9] px-4 md:px-12 py-3 flex items-center justify-between">
      {/* Brand Anchor */}
      <Link 
        href="/" 
        className="flex items-center gap-2 group transition-all duration-150 active:scale-95 focus:outline-none"
      >
        <div className="w-7 h-7 bg-[#aa3000] text-white flex items-center justify-center font-bold text-xs tracking-tight rounded-xs shadow-xs">
          NV
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-headline text-lg font-semibold text-[#1c1c16] tracking-tight">
            nattuvazhi
          </span>
          <span className="text-xs text-[#5d5e61] font-medium hidden sm:inline">
            നാട്ടുവഴി
          </span>
        </div>
      </Link>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center space-x-6 text-sm">
        {navLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors py-1 ${
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
          className="hidden sm:inline-block font-mono text-xs text-[#5d5e61] hover:text-[#1c1c16] transition-colors px-2.5 py-1 rounded-xs border border-[#e5e3d9] hover:bg-[#f6f4ea]"
        >
          {t('Curator portal', 'ക്യുറേറ്റർ പോർട്ടൽ')}
        </Link>

        {/* Bilingual Toggle */}
        <button
          onClick={toggleLanguage}
          type="button"
          className="font-mono text-xs bg-[#f6f4ea] hover:bg-[#f0eee5] text-[#1c1c16] px-2.5 py-1 border border-[#e5e3d9] rounded-xs flex items-center gap-1.5 transition-all"
          title="Toggle language / ഭാഷ മാറ്റുക"
        >
          <Languages className="w-3.5 h-3.5 text-[#aa3000]" />
          <span className="font-semibold">{language === 'en' ? 'മലയാളം' : 'English'}</span>
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 border-b border-[#e5e3d9] py-4 px-6 flex flex-col gap-3 bg-[#fcf9f0] shadow-md md:hidden">
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
          <div className="pt-3 border-t border-[#e5e3d9] flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono text-[#5d5e61] hover:text-[#aa3000]"
            >
              Curator portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
