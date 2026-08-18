import { useEffect, useRef } from 'react';

/**
 * Enhanced scroll-reveal hook.
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Intersection threshold (default 0.15)
 * @param {string} options.rootMargin - Root margin (default '-40px')
 * @returns ref to attach to an element
 */
export function useReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '-40px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return ref;
}

/**
 * Reveals multiple child elements with staggered delay.
 * Attach to a parent container; children with class "stagger-child" get revealed.
 */
export function useStaggerReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = container.querySelectorAll('.stagger-child');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add('revealed'), i * (options.stagger ?? 100));
          });
          observer.unobserve(container);
        }
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? '-20px',
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [options.stagger, options.threshold, options.rootMargin]);

  return ref;
}
