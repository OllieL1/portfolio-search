"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Lightbox from '../Lightbox';
import { PhotoGalleryItem } from '../../types/content';
import {
  ShowcaseContainer,
  Frame,
  ChromeBar,
  MainImageButton,
  MainImage,
  NavButton,
  CaptionRow,
  Caption,
  Counter,
  ThumbStrip,
  Thumb
} from './styles';

interface ScreenshotShowcaseProps {
  screenshots: PhotoGalleryItem[];
  contentId: string;
}

export const getScreenshotPath = (contentId: string, filename: string) =>
  `/content/${contentId}/${filename}`;

const ScreenshotShowcase: React.FC<ScreenshotShowcaseProps> = ({ screenshots, contentId }) => {
  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = screenshots.length;

  // Keep the active thumbnail in view by scrolling only the strip (never the page)
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = thumbRefs.current[active];
    if (!strip || !thumb) return;
    const left = thumb.offsetLeft; // strip is position: relative, so this is strip-relative
    if (left < strip.scrollLeft || left + thumb.offsetWidth > strip.scrollLeft + strip.clientWidth) {
      strip.scrollTo({ left: left - strip.clientWidth / 2 + thumb.offsetWidth / 2, behavior: 'smooth' });
    }
  }, [active]);

  if (count === 0) return null;

  const items = screenshots.map(s => ({ src: getScreenshotPath(contentId, s.filename), caption: s.caption }));
  const prev = () => setActive(i => (i > 0 ? i - 1 : count - 1));
  const next = () => setActive(i => (i < count - 1 ? i + 1 : 0));

  return (
    <ShowcaseContainer>
      <Frame>
        <ChromeBar aria-hidden="true">
          <span /><span /><span />
        </ChromeBar>
        <MainImageButton onClick={() => setLightboxIndex(active)} aria-label={`Enlarge: ${items[active].caption}`}>
          <MainImage
            key={active}
            src={items[active].src}
            alt={items[active].caption}
            width={1600}
            height={1000}
            fetchPriority={active === 0 ? 'high' : 'auto'}
          />
        </MainImageButton>
        {count > 1 && (
          <>
            <NavButton $side="left" onClick={prev} aria-label="Previous screenshot">
              <ChevronLeft size={20} />
            </NavButton>
            <NavButton $side="right" onClick={next} aria-label="Next screenshot">
              <ChevronRight size={20} />
            </NavButton>
          </>
        )}
      </Frame>

      <CaptionRow>
        <Caption>{items[active].caption}</Caption>
        {count > 1 && <Counter>{active + 1} / {count}</Counter>}
      </CaptionRow>

      {count > 1 && (
        <ThumbStrip ref={stripRef} role="tablist" aria-label="Showcase">
          {items.map((item, i) => (
            <Thumb
              key={item.src}
              ref={el => { thumbRefs.current[i] = el; }}
              $active={i === active}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={item.caption}
            >
              <img src={item.src} alt="" loading="lazy" width={160} height={100} />
            </Thumb>
          ))}
        </ThumbStrip>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={i => { setLightboxIndex(i); setActive(i); }}
        />
      )}
    </ShowcaseContainer>
  );
};

export default ScreenshotShowcase;
