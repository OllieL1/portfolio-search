"use client";

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { emit, UI_EVENTS } from '../lib/uiEvents';

const isCurrentUrl = (href: string) => {
  try {
    const target = new URL(href, window.location.href);
    return target.pathname === window.location.pathname && target.search === window.location.search;
  } catch {
    return false;
  }
};

// Drop-in replacement for next/navigation's useRouter that also signals the
// top progress bar when a navigation starts.
export function useAppRouter() {
  const router = useRouter();

  return useMemo(() => {
    const push: typeof router.push = (href, options) => {
      if (!isCurrentUrl(href)) emit(UI_EVENTS.navStart);
      router.push(href, options);
    };
    const replace: typeof router.replace = (href, options) => {
      if (!isCurrentUrl(href)) emit(UI_EVENTS.navStart);
      router.replace(href, options);
    };
    // No event here: back() fires popstate, which the progress bar handles itself
    // (and it can tell whether the previous page is already on screen).
    const back: typeof router.back = () => router.back();
    return { ...router, push, replace, back };
  }, [router]);
}
