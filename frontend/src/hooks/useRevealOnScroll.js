'use client';

import useOnScreen from './useOnScreen.js';
import useReducedMotion from './useReducedMotion.js';

/** Shared scroll-reveal style: opacity + translateY, one consistent motion language. */
export default function useRevealOnScroll(delay = 0) {
  const [ref, visible] = useOnScreen({ threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  const reducedMotion = useReducedMotion();

  const style = reducedMotion
    ? { opacity: 1 }
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 550ms cubic-bezier(.16,.8,.44,1) ${delay}ms, transform 550ms cubic-bezier(.16,.8,.44,1) ${delay}ms`,
      };

  return [ref, style];
}
