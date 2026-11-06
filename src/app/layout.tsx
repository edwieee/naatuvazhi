import type { Metadata } from 'next';
import { Newsreader, Manrope, JetBrains_Mono, Noto_Sans_Malayalam } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/components/ui/LanguageContext';

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const manrope = Manrope({
  variable: '--font-manrope',
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
      className={`${newsreader.variable} ${manrope.variable} ${jetbrainsMono.variable} ${notoSansMalayalam.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#fcf9f0] text-[#1c1c16] font-body selection:bg-[#aa3000] selection:text-white">
        <LanguageProvider>
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
