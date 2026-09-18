import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from './useAsync';

/**
 * Tracks whether the returned ref's element has scrolled into view, and keeps
 * it `true` afterwards so the reveal animation never replays. Respects
 * `prefers-reduced-motion` by reporting visible immediately.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return { ref, visible };
}
