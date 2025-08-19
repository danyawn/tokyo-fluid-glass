"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Throttle function for performance
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }) as T;
}

export default function ScrollEffects() {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || initialized.current) return;
    
    // Register plugin once
    gsap.registerPlugin(ScrollTrigger);

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Throttled function for better performance
    const initializeAnimations = throttle(() => {
      // Ensure elements start hidden BEFORE triggers initialize (prevents initial flash)
      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      reveals.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(32px)';
      });

      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: prefersReduced ? 0.01 : 0.8,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });

      // Masonry root: reveal only when the wrapper enters viewport (prevents early mount)
      const masonryRoots = gsap.utils.toArray<HTMLElement>('[data-reveal-root]');
      masonryRoots.forEach((root) => {
        root.style.opacity = '0';
        root.style.transform = 'translateY(32px)';
        gsap.fromTo(
          root,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: prefersReduced ? 0.01 : 0.9,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: root,
              start: 'top 75%',
              once: true,
            },
          }
        );
      });
    }, 100);

    // Initialize animations with throttling
    initializeAnimations();

    // Optimize scroll performance
    const optimizeScroll = () => {
      // Use requestAnimationFrame for smooth scrolling
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    // Throttled scroll optimization
    const throttledOptimizeScroll = throttle(optimizeScroll, 16); // ~60fps

    // Add scroll listener for performance optimization
    window.addEventListener('scroll', throttledOptimizeScroll, { passive: true });

    // Mark as initialized
    initialized.current = true;

    return () => {
      window.removeEventListener('scroll', throttledOptimizeScroll);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}


