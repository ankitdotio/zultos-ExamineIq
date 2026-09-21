'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks the browser width.
 *
 * The initial value is fixed so the server-rendered HTML
 * and the first client render use the same value.
 * After mounting, the real browser width is applied.
 */
export default function useViewport() {
  const [width, setWidth] = useState(1280);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };

    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return width;
}