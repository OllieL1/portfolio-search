import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Shape morph shared by the ring and its hole so the stroke stays even:
// circle → squircle → leaf → circle
const morph = keyframes`
  0%, 100% { border-radius: 50%; }
  30% { border-radius: 38%; }
  55% { border-radius: 50% 18% 50% 18%; }
  78% { border-radius: 44% 50% 40% 50%; }
`;

// The inner fill swells and recedes on its own (longer) cycle
const fill = keyframes`
  0%, 100% { transform: scale(0); opacity: 0; }
  18% { transform: scale(0.55); opacity: 0.55; }
  32% { transform: scale(0.2); opacity: 0.35; }
  52% { transform: scale(0.72); opacity: 0.6; }
  70% { transform: scale(0.35); opacity: 0.4; }
  85% { transform: scale(0.1); opacity: 0.15; }
`;

const Logo = styled.h1`
  font-size: clamp(2.4rem, 1.2rem + 6vw, 4.25rem);
  font-weight: 400;
  letter-spacing: -0.01em;
  margin-bottom: 1.25rem;
  color: var(--text-heading);
  text-align: center;
  white-space: nowrap;
  user-select: none;
`;

const OWrap = styled.span`
  --speed: 1;
  position: relative;
  display: inline-block;
  width: 0.82em;
  height: 0.82em;
  margin-right: 0.04em;
  vertical-align: -0.02em;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  filter: drop-shadow(
    0 0 calc(2px + var(--speed) * 3px)
      color-mix(in srgb, var(--accent-primary) calc(20% + var(--speed) * 8%), transparent)
  );
`;

const HiddenLetter = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`;

const Spinner = styled.span`
  position: absolute;
  inset: 0;
  will-change: transform;
`;

const Ring = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    color-mix(in srgb, var(--accent-primary) 25%, transparent) 70deg,
    var(--accent-primary) 230deg,
    var(--accent-purple) 360deg
  );

  @media (prefers-reduced-motion: no-preference) {
    animation: ${morph} 6s ease-in-out infinite;
  }
`;

const Hole = styled.span`
  position: absolute;
  inset: 0.1em;
  border-radius: 50%;
  background: var(--bg-page);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${morph} 6s ease-in-out infinite;
  }
`;

const Fill = styled.span`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle at 35% 30%,
    var(--accent-purple) 0%,
    var(--accent-primary) 70%
  );
  transform: scale(0.35);
  opacity: 0.35;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${fill} 7.3s ease-in-out infinite;
  }
`;

// Pick the next cruising speed: mostly steady, sometimes a whip, sometimes a near-stop
const nextTarget = () => {
  const r = Math.random();
  if (r < 0.55) return 0.6 + Math.random() * 0.8;
  if (r < 0.82) return 2.2 + Math.random() * 1.2;
  return 0.12 + Math.random() * 0.25;
};

const BASE_DEG_PER_SEC = 220;

const AnimatedLogo: React.FC = () => {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const spinnerRef = useRef<HTMLSpanElement>(null);
  const boostUntil = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const spinner = spinnerRef.current;
    if (!wrap || !spinner) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let angle = 0;
    let rate = 1;
    let target = 1;
    let nextChange = performance.now() + 2000;
    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (now > nextChange) {
        target = nextTarget();
        nextChange = now + 2000 + Math.random() * 2000;
      }

      const goal = now < boostUntil.current ? 5 : target;
      // Speed up quickly, wind down slowly - feels like momentum
      const ease = goal > rate ? 4 : 1.4;
      rate += (goal - rate) * Math.min(1, ease * dt);

      angle = (angle + rate * BASE_DEG_PER_SEC * dt) % 360;
      spinner.style.transform = `rotate(${angle}deg)`;
      wrap.style.setProperty('--speed', rate.toFixed(2));

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const boost = () => {
    boostUntil.current = performance.now() + 700;
  };

  return (
    <Logo>
      <OWrap ref={wrapRef} onMouseEnter={boost} onClick={boost}>
        {/* Real letter for search engines and screen readers; the animation is the visual O */}
        <HiddenLetter>O</HiddenLetter>
        <Spinner ref={spinnerRef} aria-hidden="true">
          <Ring />
          <Hole>
            <Fill />
          </Hole>
        </Spinner>
      </OWrap>
      llie Livingston
    </Logo>
  );
};

export default AnimatedLogo;
