'use client';

import { useEffect, useRef, useState } from 'react';

/** Returns [ref, isVisible] — isVisible true while the element intersects the viewport. */
export default function useOnScreen(options) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), options);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}
