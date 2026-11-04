"use client";

import React, { useCallback, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import {
  Lightbox as LightboxRoot,
  LightboxOverlay,
  LightboxContent,
  LightboxImage,
  LightboxCaption,
  LightboxCounter,
  CloseButton,
  PrevButton,
  NextButton
} from './styles';

export interface LightboxItem {
  src: string;
  caption: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const SWIPE_THRESHOLD = 50;

const Lightbox: React.FC<LightboxProps> = ({ items, index, onClose, onIndexChange }) => {
  const touchStartX = useRef<number | null>(null);
  const count = items.length;

  const goToPrevious = useCallback(() => {
    onIndexChange(index > 0 ? index - 1 : count - 1);
  }, [index, count, onIndexChange]);

  const goToNext = useCallback(() => {
    onIndexChange(index < count - 1 ? index + 1 : 0);
  }, [index, count, onIndexChange]);

  // Keyboard navigation works regardless of where focus is
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goToPrevious();
      else if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goToPrevious, goToNext]);

  // Lock page scroll while open
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || count < 2) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > SWIPE_THRESHOLD) goToPrevious();
    else if (delta < -SWIPE_THRESHOLD) goToNext();
    touchStartX.current = null;
  };

  const item = items[index];
  if (!item) return null;

  return (
    <LightboxRoot role="dialog" aria-modal="true" aria-label={item.caption}>
      <LightboxOverlay onClick={onClose} />
      <LightboxContent onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <CloseButton onClick={onClose} aria-label="Close">
          <X size={24} />
        </CloseButton>

        {count > 1 && (
          <>
            <PrevButton onClick={goToPrevious} aria-label="Previous image">
              <ArrowLeft size={24} />
            </PrevButton>
            <NextButton onClick={goToNext} aria-label="Next image">
              <ArrowRight size={24} />
            </NextButton>
          </>
        )}

        <LightboxImage src={item.src} alt={item.caption} />
        <LightboxCaption>{item.caption}</LightboxCaption>
        {count > 1 && <LightboxCounter>{index + 1} / {count}</LightboxCounter>}
      </LightboxContent>
    </LightboxRoot>
  );
};

export default Lightbox;
