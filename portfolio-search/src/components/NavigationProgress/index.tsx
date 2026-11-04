"use client";

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { listen, UI_EVENTS } from '../../lib/uiEvents';

type Phase = 'idle' | 'loading' | 'finishing';

const SHOW_DELAY = 120; // fast navigations never show the bar
const SAFETY_TIMEOUT = 8000;

const Bar = styled.div<{ $phase: Phase; $progress: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 2000;
  pointer-events: none;
  transform-origin: left;
  transform: scaleX(${({ $progress }) => $progress});
  opacity: ${({ $phase }) => ($phase === 'idle' ? 0 : 1)};
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-purple));
  box-shadow: 0 0 8px color-mix(in srgb, var(--accent-primary) 60%, transparent);
  transition: ${({ $phase }) =>
    $phase === 'loading'
      ? 'transform 6s cubic-bezier(0.08, 0.7, 0.2, 1), opacity 0.15s ease'
      : $phase === 'finishing'
        ? 'transform 0.2s ease-out, opacity 0.3s ease 0.2s'
        : 'none'};

  /* Soft glowing head at the leading edge */
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 80px;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--accent-purple));
    filter: blur(2px);
  }
`;

const NavigationProgress: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0);
  const phaseRef = useRef<Phase>('idle');
  const pending = useRef(false);
  const timers = useRef<number[]>([]);

  const setP = (next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  const clearTimers = () => {
    timers.current.forEach(t => window.clearTimeout(t));
    timers.current = [];
  };

  const finish = () => {
    if (!pending.current) return;
    pending.current = false;
    clearTimers();
    if (phaseRef.current === 'idle') return; // finished before the bar ever showed
    setP('finishing');
    setProgress(1);
    timers.current.push(window.setTimeout(() => {
      setP('idle');
      setProgress(0);
    }, 550));
  };

  const start = () => {
    if (pending.current) return;
    pending.current = true;
    clearTimers();
    setP('idle');
    setProgress(0);
    timers.current.push(
      window.setTimeout(() => {
        setP('loading');
        setProgress(0.08);
        // next frame: start the long ease towards ~85%
        requestAnimationFrame(() => requestAnimationFrame(() => setProgress(0.85)));
      }, SHOW_DELAY),
      window.setTimeout(finish, SAFETY_TIMEOUT)
    );
  };

  // Navigation start: app router pushes, plus browser back/forward
  useEffect(() => {
    const offNav = listen(UI_EVENTS.navStart, start);
    window.addEventListener('popstate', start);
    return () => {
      offNav();
      window.removeEventListener('popstate', start);
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigation end: the URL actually changed
  useEffect(() => {
    finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return <Bar $phase={phase} $progress={progress} aria-hidden="true" />;
};

export default NavigationProgress;
