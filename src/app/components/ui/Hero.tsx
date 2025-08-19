"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import GlitchText from "./GlitchText";
import GlassSurface from "./GlassSurface";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      );
  }, []);

  // const isMobile = useIsMobile(); // Unused variable - removed
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[100vh] px-4 z-20">
      <div className="text-center space-y-8">
        <div ref={titleRef} className="flex items-center justify-center">
          <GlitchText speed={0.6} enableShadows enableOnHover={false}>
            Tokyo, Japan
          </GlitchText>
        </div>
        <p
          ref={subtitleRef}
          className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
        >
          Discover the vibrant city of Tokyo, where tradition meets innovation.
          Explore stunning cityscapes, neon nights, and the heart of Japanese
          culture.
        </p>
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-6 max-w-4xl mx-auto">
          {/* Gallery Preview Chip */}
          <div 
            className="cursor-pointer transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20"
            onClick={() => {
              const gallery = document.querySelector('#gallery');
              if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <GlassSurface
              width={280}
              height={80}
              borderRadius={16}
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
              className="transition-all duration-500 ease-out hover:brightness-110"
            >
            <div className="flex items-center gap-3 p-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white/20"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white/20"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 border-2 border-white/20"></div>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-sm">Photo Gallery</div>
                <div className="text-gray-300 text-xs">6 stunning Tokyo photos</div>
              </div>
            </div>
            </GlassSurface>
          </div>

          {/* About Preview Chip */}
          <div 
            className="cursor-pointer transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/20"
            onClick={() => {
              const about = document.querySelector('#about');
              if (about) about.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <GlassSurface
              width={280}
              height={80}
              borderRadius={16}
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
              className="transition-all duration-500 ease-out hover:brightness-110"
            >
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center">
                <span className="text-white text-lg">🗾</span>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-sm">About Tokyo</div>
                <div className="text-gray-300 text-xs">Culture & history</div>
              </div>
            </div>
            </GlassSurface>
          </div>

          {/* Experience Preview Chip */}
          <div 
            className="cursor-pointer transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20"
            onClick={() => {
              const demo = document.querySelector('#demo');
              if (demo) demo.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <GlassSurface
              width={280}
              height={80}
              borderRadius={16}
              brightness={65}
              opacity={0.9}
              blur={8}
              displace={2}
              backgroundOpacity={0.12}
              saturation={1.15}
              distortionScale={-110}
              redOffset={4}
              greenOffset={14}
              blueOffset={22}
              mixBlendMode="screen"
              className="transition-all duration-500 ease-out hover:brightness-110"
            >
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center">
                <span className="text-white text-lg">✨</span>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-sm">Interactive Demo</div>
                <div className="text-gray-300 text-xs">Glass surface effects</div>
              </div>
            </div>
            </GlassSurface>
          </div>
        </div>
      </div>
    </section>
  );
}
