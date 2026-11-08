'use client';

import * as React from 'react';
import {
  Building,
  Castle,
  Landmark,
  Mountain,
  Pyramid,
  TowerControl,
} from 'lucide-react';

export interface CardItem {
  id: string | number;
  title: string;
  category: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref: string;
  alt: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

const joinClasses = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ');

export const ExpandingCards = React.forwardRef<HTMLUListElement, ExpandingCardsProps>(
  ({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(defaultActiveIndex);
    const [isDesktop, setIsDesktop] = React.useState(false);

    React.useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 768);
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const gridStyle = React.useMemo(() => {
      if (activeIndex === null) return {};

      const tracks = items
        .map((_, index) => (index === activeIndex ? '5fr' : '1fr'))
        .join(' ');

      return isDesktop ? { gridTemplateColumns: tracks } : { gridTemplateRows: tracks };
    }, [activeIndex, items, isDesktop]);

    return (
      <ul
        className={joinClasses(
          'w-full max-w-6xl gap-2 grid h-[600px] md:h-[500px]',
          'transition-[grid-template-columns,grid-template-rows] duration-500 ease-out',
          className,
        )}
        style={{
          ...gridStyle,
          ...(isDesktop ? { gridTemplateRows: '1fr' } : { gridTemplateColumns: '1fr' }),
        }}
        ref={ref}
        {...props}
      >
        {items.map((item, index) => (
          <li
            key={item.id}
            className={joinClasses(
              'group relative cursor-pointer overflow-hidden rounded-lg border border-[#ded7c9] bg-[#26221e] text-white shadow-sm',
              'md:min-w-[80px] min-h-0 min-w-0',
            )}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            tabIndex={0}
            data-active={activeIndex === index}
          >
            <img
              src={item.imgSrc}
              alt={item.alt}
              loading={index === defaultActiveIndex ? 'eager' : 'lazy'}
              className={joinClasses(
                'absolute inset-0 h-full w-full object-cover transition-all duration-300 ease-out',
                'group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0 scale-110 grayscale',
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <article className="absolute inset-0 flex flex-col justify-end gap-2 p-4">
              <div className="flex flex-col gap-1">
                <h3 className="hidden origin-left rotate-90 text-sm font-light uppercase tracking-wider text-white/80 opacity-100 transition-all duration-300 ease-out md:block group-data-[active=true]:opacity-0">
                  {item.title}
                </h3>
                <span className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ffdbd0] opacity-0 transition-all duration-300 delay-75 ease-out group-data-[active=true]:opacity-100">
                  {item.category}
                </span>
              </div>

              <div className="text-white/90 opacity-0 transition-all duration-300 delay-75 ease-out group-data-[active=true]:opacity-100">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-white opacity-0 transition-all duration-300 delay-150 ease-out group-data-[active=true]:opacity-100">
                {item.title}
              </h3>

              <p className="w-full max-w-xs text-sm text-white/80 opacity-0 transition-all duration-300 delay-200 ease-out group-data-[active=true]:opacity-100">
                {item.description}
              </p>
            </article>
          </li>
        ))}
      </ul>
    );
  },
);

ExpandingCards.displayName = 'ExpandingCards';

export const heritageIcons = {
  theyyam: <TowerControl size={24} />,
  kathakali: <Castle size={24} />,
  mohiniyattam: <Landmark size={24} />,
  kalaripayattu: <Mountain size={24} />,
  vallamKali: <Building size={24} />,
  muralPainting: <Pyramid size={24} />,
  aranmulaKannadi: <Landmark size={24} />,
  nalukettu: <Building size={24} />,
};
