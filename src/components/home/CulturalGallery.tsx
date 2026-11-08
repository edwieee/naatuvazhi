'use client';

import React from 'react';
import { ExpandingCards, heritageIcons, type CardItem } from '@/components/ui/expanding-cards';

const heritageGallery: CardItem[] = [
  {
    id: 'theyyam',
    title: 'Theyyam',
    category: 'Ritual performance · North Malabar',
    description:
      'A sacred North Malabar ritual performance shaped by elaborate face painting, towering headgear and living shrine traditions.',
    imgSrc: '/images/img-galley/theyyam.jpg',
    icon: heritageIcons.theyyam,
    linkHref: '#',
    alt: 'Theyyam performer in elaborate red costume and painted face',
  },
  {
    id: 'kathakali',
    title: 'Kathakali',
    category: 'Dance-drama · Kerala',
    description:
      'A classical dance-drama that tells stories through expressive gestures, stylised makeup, colourful costumes and music.',
    imgSrc: '/images/img-galley/kathakali.jpg',
    icon: heritageIcons.kathakali,
    linkHref: '#',
    alt: 'Kathakali performer in green makeup and ornate costume',
  },
  {
    id: 'mohiniyattam',
    title: 'Mohiniyattam',
    category: 'Classical dance · Kerala',
    description:
      'A graceful classical solo dance recognised for its gentle, flowing movement, expressive gestures and white-and-gold attire.',
    imgSrc: '/images/img-galley/mohiniyattam.jpg',
    icon: heritageIcons.mohiniyattam,
    linkHref: '#',
    alt: 'Mohiniyattam dancer performing in white and gold costume',
  },
  {
    id: 'kalaripayattu',
    title: 'Kalaripayattu',
    category: 'Martial tradition · Kerala',
    description:
      'An indigenous martial art combining disciplined body movement, traditional weapon practice and training in the kalari.',
    imgSrc: '/images/img-galley/kalaripayattu.jpg',
    icon: heritageIcons.kalaripayattu,
    linkHref: '#',
    alt: 'Kalaripayattu practitioners training with swords on a beach',
  },
  {
    id: 'vallam-kali',
    title: 'Vallam Kali',
    category: 'Boat race · Kerala backwaters',
    description:
      'Kerala’s spectacular snake boat races, where crews row in synchronised rhythm through the backwaters amid cheering crowds.',
    imgSrc: '/images/img-galley/vallamkali.jpg',
    icon: heritageIcons.vallamKali,
    linkHref: '#',
    alt: 'Teams of rowers competing in a Kerala snake boat race',
  },
  {
    id: 'kerala-mural-painting',
    title: 'Kerala Mural Painting',
    category: 'Traditional painting · Kerala',
    description:
      'A narrative painting tradition depicting mythological subjects through rhythmic compositions, symbolic forms and natural pigments.',
    imgSrc: '/images/img-galley/kerala painting.jpg',
    icon: heritageIcons.muralPainting,
    linkHref: '#',
    alt: 'Traditional Kerala mural painting with colourful mythological figures',
  },
  {
    id: 'aranmula-kannadi',
    title: 'Aranmula Kannadi',
    category: 'Metal craft · Aranmula',
    description:
      'A handmade front-surface metal mirror from Aranmula, crafted by specialist artisans from a closely guarded copper-and-tin alloy.',
    imgSrc: '/images/img-galley/aranmula.jpg',
    icon: heritageIcons.aranmulaKannadi,
    linkHref: '#',
    alt: 'Handcrafted Aranmula Kannadi metal mirror held in an artisan’s hand',
  },
  {
    id: 'nalukettu',
    title: 'Nalukettu Architecture',
    category: 'Built heritage · Kerala',
    description:
      'A traditional Kerala homestead organised around a central open-to-sky courtyard and four halls built according to Thachu Sasthra.',
    imgSrc: '/images/img-galley/nalukettu.jpg',
    icon: heritageIcons.nalukettu,
    linkHref: '#',
    alt: 'Interior courtyard of a traditional Kerala Nalukettu house',
  },
];

export default function CulturalGallery() {
  return (
    <section id="gallery" className="border-b border-[#e5e0d4] bg-[#fcfcec] py-14 md:py-20">
      <div className="mx-auto max-w-[1120px] px-4 md:px-10 xl:px-0">
        <div className="mb-10 max-w-4xl lg:max-w-none">
          <span className="font-body mb-2 block text-xs font-semibold text-[#aa3000]">
            Kerala heritage in focus
          </span>
          <h2 className="font-headline mb-2 text-2xl font-semibold tracking-tight text-[#1c1c16] sm:text-3xl lg:text-[32px] md:whitespace-nowrap">
            Living traditions, seen up close
          </h2>
          <p className="font-body text-sm leading-relaxed text-[#5d5e61] sm:text-base md:whitespace-nowrap">
            Explore the performances, crafts and architecture that continue to shape Kerala’s cultural landscape.
          </p>
        </div>
        <ExpandingCards items={heritageGallery} aria-label="Kerala cultural heritage gallery" />
      </div>
    </section>
  );
}
