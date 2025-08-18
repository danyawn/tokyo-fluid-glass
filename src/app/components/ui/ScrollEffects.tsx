"use client";
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollEffects() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Register plugin once
    gsap.registerPlugin(ScrollTrigger);

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    // Comment out galaxy movement to prevent background gaps
    // const galaxy = document.getElementById('galaxy-layer');
    // if (galaxy) {
    //   gsap.to(galaxy, {
    //     y: -150,
    //     ease: 'none',
    //     scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true },
    //   });
    // }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  return null;
}


