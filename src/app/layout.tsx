import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Lora, Plus_Jakarta_Sans, JetBrains_Mono, Noto_Sans_Malayalam } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/components/ui/LanguageContext';

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

const notoSansMalayalam = Noto_Sans_Malayalam({
  variable: '--font-noto-malayalam',
  subsets: ['malayalam'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nattuvazhi (നാട്ടുവഴി) · Living Cultural Cartography of Kerala',
  description:
    'A community-informed, scholar-verified living cultural discovery platform for sacred groves, ritual art forms, masters, and indigenous crafts across Kerala.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} ${notoSansMalayalam.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#fcfcec] text-[#1c1c16] font-body selection:bg-[#aa3000] selection:text-white">
        <LanguageProvider>
          <Suspense fallback={<header className="h-16 border-b border-[#ece8df]" />}>
            <Navbar />
          </Suspense>
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
