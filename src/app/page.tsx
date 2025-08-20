'use client';
import dynamic from 'next/dynamic';
import { Suspense, useMemo } from 'react';
import Image from 'next/image';
import Hero from './components/ui/Hero';
import TextPressure from './components/ui/TextPressure';
import GlitchText from './components/ui/GlitchText';
const InfiniteScroll = dynamic(() => import('./components/ui/InfiniteScroll'), {
  ssr: false,
  loading: () => <div className="h-[500px] w-[500px] mx-auto bg-black/20 rounded-lg animate-pulse" />
});

// Lazy load heavy components
const Iridescence = dynamic(() => import('./components/Iridescence'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />
});

const Masonry = dynamic(() => import('./components/ui/Masonry').then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => <div className="h-[1400px] bg-black/20 rounded-lg animate-pulse" />
});

const CardSwap = dynamic(() => import('./components/ui/CardSwap').then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => <div className="h-[600px] bg-black/20 rounded-lg animate-pulse" />
});

const Card = dynamic(() => import('./components/ui/CardSwap').then(mod => ({ default: mod.Card })), {
  ssr: false
});

const GlassSurfaceDemo = dynamic(() => import('./components/ui/GlassSurfaceDemo'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-black/20 rounded-lg animate-pulse" />
});

const FluidGlass = dynamic(() => import('./components/FluidGlass'), {
  ssr: false,
  loading: () => <div className="h-[600px] bg-black/20 rounded-lg animate-pulse" />
});

const ProfileCardWrapper = dynamic(() => import('./components/ui/ProfileCardWrapper'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-black/20 rounded-lg animate-pulse" />
});

export default function Page() {
  // Memoize items to avoid conditional hook call
  const galleryItems = useMemo(() => {
    const baseItems = [
      { id: 'tokyo-1', img: '/images/tokyo-1.avif', url: '#', height: 520 },
      { id: 'tokyo-2', img: '/images/tokyo-2.jpeg', url: '#', height: 360 },
      { id: 'tokyo-3', img: '/images/tokyo-3.jpg', url: '#', height: 640 },
      { id: 'tokyo-4', img: '/images/tokyo-4.jpg', url: '#', height: 420 },
      { id: 'tokyo-5', img: '/images/tokyo-5.jpeg', url: '#', height: 580 },
      { id: 'tokyo-6', img: '/images/tokyo-6.webp', url: '#', height: 480 },
      { id: 'cuisine-1', img: '/images/cuisine-1.jpeg', url: '#', height: 380 },
      { id: 'cuisine-2', img: '/images/cuisine-2.jpg', url: '#', height: 520 },
      { id: 'night-1', img: '/images/night-1.jpg', url: '#', height: 440 },
      { id: 'night-2', img: '/images/night-2.jpeg', url: '#', height: 600 },
    ];

    const allItems: any[] = [];
    for (let setIndex = 0; setIndex < 2; setIndex++) {
      baseItems.forEach((item, itemIndex) => {
        const heightVariation = item.height * (0.9 + Math.random() * 0.2);
        allItems.push({
          ...item,
          id: `${setIndex}-${itemIndex}-${item.id}`,
          height: Math.round(heightVariation),
        });
      });
    }

    const shuffled = [...allItems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }, []);

  return (
    <main className="relative w-full overflow-hidden bg-black pb-0" style={{ minHeight: '100vh', height: 'auto' }}>
      {/* Iridescence background */}
      <div id="iridescence-layer" className="fixed inset-0 z-0">
        <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
          <Iridescence
            color={[0.3, 0.2, 0.4]}
            mouseReact={false}
            amplitude={0.05}
            speed={0.8}
          />
        </Suspense>
      </div>
      
      {/* Hero with GSAP entrance animations */}
      <div className="relative z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <Hero />
        </div>
      </div>

      {/* TextPressure section */}
      <section className="relative z-20 py-24 pointer-events-none" data-reveal>
        <div className="max-w-6xl mx-auto px-4 pointer-events-auto" style={{ height: 220 }}>
          <TextPressure
            text="Experience Tokyo"
            flex
            alpha={false}
            stroke={false}
            width
            weight
            italic
            textColor="#ffffff"
            minFontSize={36}
          />
        </div>
      </section>
      
      {/* Gallery Section (Masonry) */}
      <section id="gallery" className="relative z-20 py-20 pointer-events-none" data-reveal-root>
        <div className="max-w-6xl mx-auto px-4 md:px-6 pointer-events-auto" style={{ height: 1400 }}>
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-10">Gallery</h2>
          <Suspense fallback={<div className="h-[1200px] bg-black/20 rounded-lg animate-pulse" />}>
            <Masonry
              items={galleryItems}
              ease="power3.out"
              duration={0.6}
              stagger={0.08}
              animateFrom="random"
              scaleOnHover
              hoverScale={0.97}
              blurToFocus
              colorShiftOnHover={false}
              lazy={true}
            />
          </Suspense>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="relative z-10 py-24 mt-16 pointer-events-none" data-reveal>
        <div className="max-w-3xl mx-auto text-gray-200 text-lg md:text-xl text-center pointer-events-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-12">About Tokyo</h2>
          <p>
            Tokyo is Japan&apos;s capital and the world&apos;s most populous metropolis. From ancient temples to futuristic skyscrapers, Tokyo offers a unique blend of history, culture, and technology. Experience the cherry blossoms, bustling Shibuya, tranquil gardens, and the iconic Tokyo Tower.
          </p>
        </div>
      </section>

      {/* Highlights - CardSwap */}
      <section className="relative z-10 py-24 pointer-events-none" data-reveal>
        <div className="max-w-6xl mx-auto px-4 pointer-events-auto">
          <div className="relative h-[600px] flex items-center justify-center">
            <Suspense fallback={<div className="h-[600px] bg-black/20 rounded-lg animate-pulse" />}>
              <CardSwap cardDistance={70} verticalDistance={80} delay={4500}>
                <Card className="p-0 w-[624px] h-[468px] text-white overflow-hidden">
                  <div className="w-full h-full relative">
                    <Image 
                      src="/images/cuisine-1.jpeg" 
                      alt="Tokyo Cuisine" 
                      fill
                      sizes="(max-width: 768px) 100vw, 624px"
                      className="object-cover"
                      priority
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold mb-1">Tokyo Cuisine</h3>
                      <p className="text-sm text-gray-200">Sushi counters, ramen alleys, and late-night izakayas across the city.</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-0 w-[624px] h-[468px] text-white overflow-hidden">
                  <div className="w-full h-full relative">
                    <Image 
                      src="/images/night-1.jpg" 
                      alt="Tokyo Nightlife" 
                      fill
                      sizes="(max-width: 768px) 100vw, 624px"
                      className="object-cover"
                      priority
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold mb-1">Neon Nights</h3>
                      <p className="text-sm text-gray-200">Shibuya crossings, arcades, and glowing alleys that never sleep.</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-0 w-[624px] h-[468px] text-white overflow-hidden">
                  <div className="w-full h-full relative">
                    <Image 
                      src="/images/tokyo-3.jpg" 
                      alt="Tokyo Culture" 
                      fill
                      sizes="(max-width: 768px) 100vw, 624px"
                      className="object-cover"
                      priority
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold mb-1">Culture & Heritage</h3>
                      <p className="text-sm text-gray-200">Tranquil shrines, gardens, and timeless traditions meet modern design.</p>
                    </div>
                  </div>
                </Card>
              </CardSwap>
            </Suspense>
          </div>
        </div>
      </section>

      {/* Infinite Scroll Section */}
      <section className="relative z-10 py-24 pointer-events-none" data-reveal>
        <div className="max-w-6xl mx-auto px-4 pointer-events-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center">Infinite Tokyo</h2>
          <p className="text-center text-gray-300 mt-3 mb-12 max-w-3xl mx-auto">
            Wander the endless heart of Japan — where neon rain, night winds, and old echoes
            braid into a story that never sleeps.
          </p>
          <div className="mx-auto" style={{ height: '600px', position: 'relative' }}>
            <div className="relative h-full w-full mx-auto rounded-lg overflow-hidden border border-gray-300/30 bg-white/5 backdrop-blur-sm">
              <InfiniteScroll
                width="500px"
                maxHeight="100%"
                itemMinHeight={300}
                items={[
                  { content: (
                    <div className="relative w-[500px] h-[300px] rounded-2xl overflow-hidden shadow-lg">
                      <Image src="/images/tokyo-1.avif" alt="The Beauty of Tokyo" fill sizes="500px" className="object-cover scale-110" quality={100} />
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-white">
                          <p className="text-lg font-semibold drop-shadow">Tokyo shimmers under neon rain — a dream that refuses dawn.</p>
                        </div>
                      </div>
                    </div>
                  ) },
                  { content: (
                    <div className="relative w-[500px] h-[300px] rounded-2xl overflow-hidden shadow-lg">
                      <Image src="/images/tokyo-3.jpg" alt="Calming Place in Tokyo" fill sizes="500px" className="object-cover scale-110" quality={100} />
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-white">
                          <p className="text-lg font-semibold drop-shadow">Between sakura hush and city hum, Tokyo whispers: go gently, onward.</p>
                        </div>
                      </div>
                    </div>
                  ) },
                  { content: (
                    <div className="relative w-[500px] h-[300px] rounded-2xl overflow-hidden shadow-lg">
                      <Image src="/images/night-2.jpeg" alt="The Summer of Glass" fill sizes="500px" className="object-cover scale-110" quality={100} />
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-white">
                          <p className="text-lg font-semibold drop-shadow">Rain beads on asphalt — the city remembers the sky it borrowed.</p>
                        </div>
                      </div>
                    </div>
                  ) },
                  { content: (
                    <div className="relative w-[500px] h-[300px] rounded-2xl overflow-hidden shadow-lg">
                      <Image src="/images/tokyo-4.jpg" alt="Tokyo at Night" fill sizes="500px" className="object-cover scale-110" quality={100} />
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-white">
                          <p className="text-lg font-semibold drop-shadow">Beyond the neon veil, a quiet longing follows every step.</p>
                        </div>
                      </div>
                    </div>
                  ) },
                  { content: (
                    <div className="relative w-[500px] h-[300px] rounded-2xl overflow-hidden shadow-lg">
                      <Image src="/images/cuisine-2.jpg" alt="Glass Morphism" fill sizes="500px" className="object-cover scale-110" quality={100} />
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-white">
                          <p className="text-lg font-semibold drop-shadow">Every flavor is a voyage — every bite unlocks a lantern-lit street.</p>
                        </div>
                      </div>
                    </div>
                  ) },
                  { content: (
                    <div className="relative w-[500px] h-[300px] rounded-2xl overflow-hidden shadow-lg">
                      <Image src="/images/tokyo-5.jpeg" alt="Modern UI Design" fill sizes="500px" className="object-cover scale-110" quality={100} />
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-white">
                          <p className="text-lg font-semibold drop-shadow">The future drifts softly through corridors of glass and light.</p>
                        </div>
                      </div>
                    </div>
                  ) },
                  { content: (
                    <div className="relative w-[500px] h-[300px] rounded-2xl overflow-hidden shadow-lg">
                      <Image src="/images/tokyo-6.webp" alt="Digital Art" fill sizes="500px" className="object-cover scale-110" quality={100} />
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-white">
                          <p className="text-lg font-semibold drop-shadow">At light-crossroads, time tilts and shows its hidden edge.</p>
                        </div>
                      </div>
                    </div>
                  ) },
                  { content: (
                    <div className="relative w-[500px] h-[300px] rounded-2xl overflow-hidden shadow-lg">
                      <Image src="/images/cuisine-1.jpeg" alt="Culinary Experience" fill sizes="500px" className="object-cover scale-110" quality={100} />
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-white">
                          <p className="text-lg font-semibold drop-shadow">Street-side aromas become maps for small, brave adventures.</p>
                        </div>
                      </div>
                    </div>
                  ) },
                  { content: (
                    <div className="relative w-[500px] h-[300px] rounded-2xl overflow-hidden shadow-lg">
                      <Image src="/images/night-1.jpg" alt="Neon Nights" fill sizes="500px" className="object-cover scale-110" quality={100} />
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-white">
                          <p className="text-lg font-semibold drop-shadow">Neon speaks in color; curiosity answers in footsteps.</p>
                        </div>
                      </div>
                    </div>
                  ) },
                  { content: (
                    <div className="relative w-[500px] h-[300px] rounded-2xl overflow-hidden shadow-lg">
                      <Image src="/images/tokyo-2.jpeg" alt="Urban Landscape" fill sizes="500px" className="object-cover scale-110" quality={100} />
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-white">
                          <p className="text-lg font-semibold drop-shadow">In Tokyo, every crossing is a choice — every path a promise.</p>
                        </div>
                      </div>
                    </div>
                  ) }
                ]}
                isTilted
                tiltDirection="left"
                autoplay
                autoplaySpeed={0.1}
                autoplayDirection="down"
                pauseOnHover
              />
            </div>
          </div>
        </div>
      </section>

      {/* Glass Surface Demo Section */}
      <section className="relative z-10 py-24 pointer-events-none" data-reveal>
        <div className="max-w-6xl mx-auto px-4 pointer-events-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-12">Glass Surface Experience</h2>
          <p className="text-lg text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Experience the power of glass morphism with our interactive demo. Adjust the controls to see how different parameters affect the glass surface effect.
          </p>
          <Suspense fallback={<div className="h-[400px] bg-black/20 rounded-lg animate-pulse" />}>
            <GlassSurfaceDemo />
          </Suspense>
        </div>
      </section>

      {/* Fluid Glass Section */}
      <section className="relative z-10 py-24 pointer-events-none" data-reveal>
        <div className="max-w-6xl mx-auto px-4 pointer-events-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-12">Fluid Glass Experience</h2>
          <p className="text-lg text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Immerse yourself in the fluid glass effect with Tokyo&apos;s stunning imagery. Watch as the glass lens distorts and refracts the beautiful cityscapes.
          </p>
          <div className="relative">
            <Suspense fallback={<div className="h-[700px] bg-black/20 rounded-lg animate-pulse" />}>
              <FluidGlass
                mode="lens"
                lensProps={{
                  scale: 0.25,
                  ior: 1.15,
                  thickness: 5,
                  chromaticAberration: 0.1,
                  anisotropy: 0.01,
                  transmission: 0.9,
                  roughness: 0.1,
                  color: '#ffffff',
                  attenuationColor: '#ffffff',
                  attenuationDistance: 0.25,
                }}
              />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Profile Card Section */}
      <section className="relative z-10 py-24 pointer-events-none" data-reveal>
        <div className="max-w-6xl mx-auto px-4 pointer-events-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-12">Meet the Developer</h2>
          <p className="text-lg text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Get to know the creative mind behind this Tokyo experience website.
          </p>
          <div className="flex justify-center">
            <Suspense fallback={<div className="h-[400px] bg-black/20 rounded-lg animate-pulse" />}>
              <ProfileCardWrapper />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Footer with GlitchText */}
      <footer className="relative z-10 py-32 mt-24 mb-0 pointer-events-none">
        <div className="max-w-6xl mx-auto px-4 text-center overflow-visible pointer-events-auto">
          <div className="mb-4 text-gray-400">Made with</div>
          <div className="flex items-center justify-center">
            <GlitchText speed={0.6} enableShadows enableOnHover={false} className="text-[clamp(1.5rem,6vw,3rem)]">
              Tokyo Experience
            </GlitchText>
          </div>
        </div>
      </footer>
    </main>
  );
}
