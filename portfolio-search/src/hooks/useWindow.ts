// hooks/useWindow.ts
"use client";

import { useState, useEffect } from 'react';

export const useWindow = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    isMobile: false,
  });

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({
        width,
        height,
        isMobile: width <= 768,
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Alternative hook for just checking if we're on client side
export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};