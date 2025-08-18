"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import GlitchText from './GlitchText';
import GlassSurface from './GlassSurface';

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(max-width: 767px)');
    const handler = () => setIsMobile(mql.matches);
    handler();
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const isMobile = useIsMobile();
  return (
    <section className="flex flex-col items-center justify-center h-[100vh] px-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Hero content without FluidGlass */}
      </div>
      <div className="mt-6 text-center">
        <div ref={titleRef} className="mb-2 flex items-center justify-center">
          <GlitchText speed={0.6} enableShadows enableOnHover={false}>
            Tokyo, Japan
          </GlitchText>
        </div>
        <p ref={subtitleRef} className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto mt-2">
          Discover the vibrant city of Tokyo, where tradition meets innovation. Explore stunning cityscapes, neon nights, and the heart of Japanese culture.
        </p>
        <div ref={ctaRef} className="mt-8 flex items-center gap-4 justify-center">
          <GlassSurface
            width={160}
            height={48}
            borderRadius={12}
            brightness={60}
            opacity={0.9}
            blur={8}
            displace={2}
            backgroundOpacity={0.15}
            saturation={1.2}
            distortionScale={-120}
            redOffset={5}
            greenOffset={15}
            blueOffset={25}
            mixBlendMode="screen"
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <a 
              href="#gallery" 
              onClick={(e) => handleSmoothScroll(e, '#gallery')}
              className="text-white font-semibold text-sm"
            >
              Explore Gallery
            </a>
          </GlassSurface>
          <GlassSurface
            width={140}
            height={48}
            borderRadius={12}
            brightness={70}
            opacity={0.85}
            blur={10}
            displace={1}
            backgroundOpacity={0.1}
            saturation={1.1}
            distortionScale={-100}
            redOffset={3}
            greenOffset={12}
            blueOffset={20}
            mixBlendMode="overlay"
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <a 
              href="#about" 
              onClick={(e) => handleSmoothScroll(e, '#about')}
              className="text-white font-semibold text-sm"
            >
              Learn More
            </a>
          </GlassSurface>
        </div>
      </div>
    </section>
  );
}


