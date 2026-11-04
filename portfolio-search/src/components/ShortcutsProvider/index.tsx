"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ShortcutsModal from '../ShortcutsModal';
import { useTheme } from '../../theme';
import { emit, listen, UI_EVENTS } from '../../lib/uiEvents';

const ROUTES: Record<string, string> = {
  h: '/',
  '1': '/projects',
  '2': '/experience',
  '3': '/education',
  '4': '/about',
};

// Don't hijack keys while the user is typing
const isTypingTarget = (target: EventTarget | null) => {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
};

// Global single-key shortcuts plus the "?" help dialog
const ShortcutsProvider: React.FC = () => {
  const router = useRouter();
  const { toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => listen(UI_EVENTS.openShortcuts, () => setOpen(true)), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;

      if (e.key === '?') {
        e.preventDefault();
        setOpen(prev => !prev);
        return;
      }
      if (open) return; // the dialog handles its own keys

      const key = e.key.toLowerCase();
      if (key === 't') {
        toggleTheme();
      } else if (key === 's') {
        emit(UI_EVENTS.toggleSidebar);
      } else if (ROUTES[key]) {
        e.preventDefault();
        if (window.location.pathname !== ROUTES[key]) router.push(ROUTES[key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, router, toggleTheme]);

  return open ? <ShortcutsModal onClose={close} /> : null;
};

export default ShortcutsProvider;
