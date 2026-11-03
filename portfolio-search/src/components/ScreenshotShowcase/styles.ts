import styled, { keyframes } from 'styled-components';

const crossfade = keyframes`
  from { opacity: 0.35; transform: scale(0.995); }
  to { opacity: 1; transform: scale(1); }
`;

export const ShowcaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 960px;
`;

export const Frame = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-default);
  background: var(--bg-card);
  box-shadow: var(--shadow-lg);
`;

export const ChromeBar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  background: var(--bg-subtle);
  border-bottom: 1px solid var(--border-default);

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--border-default);
  }
`;

export const MainImageButton = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: zoom-in;

  &:focus-visible {
    outline: 3px solid var(--accent-primary);
    outline-offset: -3px;
  }
`;

export const MainImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${crossfade} 0.35s ease-out;
  }
`;

export const NavButton = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: calc(50% + 15px);
  ${({ $side }) => ($side === 'left' ? 'left: 12px;' : 'right: 12px;')}
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--bg-glass-border);
  background: rgba(20, 20, 20, 0.55);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;

  ${Frame}:hover &,
  &:focus-visible {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-50%) scale(1.08);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }

  @media (hover: none) {
    opacity: 1;
    width: 36px;
    height: 36px;
  }
`;

export const CaptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
`;

export const Caption = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-detail);
`;

export const Counter = styled.span`
  flex-shrink: 0;
  font-size: 0.8rem;
  color: var(--text-tertiary);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.05em;
`;

export const ThumbStrip = styled.div`
  position: relative;
  display: flex;
  gap: 0.6rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 4px 2px 8px;
  scrollbar-width: thin;
`;

export const Thumb = styled.button<{ $active: boolean }>`
  flex: 0 0 auto;
  width: 120px;
  aspect-ratio: 16 / 10;
  padding: 0;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  scroll-snap-align: start;
  border: 2px solid ${({ $active }) => ($active ? 'var(--accent-primary)' : 'transparent')};
  box-shadow: ${({ $active }) => ($active ? 'var(--shadow-accent)' : 'var(--shadow-sm)')};
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  background: var(--bg-subtle);
  transition: opacity 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    display: block;
  }

  @media (max-width: 768px) {
    width: 96px;
  }
`;
