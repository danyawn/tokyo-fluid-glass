import Galaxy from './components/Galaxy';
import Hero from './components/ui/Hero';
import Masonry, { MasonryItem } from './components/ui/Masonry';
import TextPressure from './components/ui/TextPressure';
import CardSwap, { Card } from './components/ui/CardSwap';
import GlitchText from './components/ui/GlitchText';
import GlassSurfaceDemo from './components/ui/GlassSurfaceDemo';
import ProfileCardWrapper from './components/ui/ProfileCardWrapper';
import FluidGlass from './components/FluidGlass';

export default function Page() {
  return (
    <main className="relative w-full overflow-hidden bg-black pb-0" style={{ minHeight: '100vh', height: 'auto' }}>
      {/* Galaxy background */}
      <div id="galaxy-layer" className="absolute inset-0 z-0">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={0.8}
          glowIntensity={0.25}
          saturation={0.0}
          hueShift={140}
          twinkleIntensity={0.25}
          rotationSpeed={0.08}
          starSpeed={0.3}
        />
      </div>
      {/* Hero with GSAP entrance animations */}
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <Hero />
        </div>
      </div>

      {/* TextPressure section */}
      <section className="relative z-10 py-24 pointer-events-none" data-reveal>
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
      <section id="gallery" className="relative z-10 py-20 pointer-events-none" data-reveal-root>
        <div className="max-w-6xl mx-auto px-4 md:px-6 pointer-events-auto" style={{ height: 1400 }}>
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-10">Gallery</h2>
          <Masonry
            items={(() => {
              const baseItems: MasonryItem[] = [
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

              // Create multiple sets with random variations
              const allItems: MasonryItem[] = [];
              
              // Loop 2 times to create ~20 items
              for (let setIndex = 0; setIndex < 2; setIndex++) {
                baseItems.forEach((item, itemIndex) => {
                  // Random height variation (±10% - reduced to prevent overflow)
                  const heightVariation = item.height * (0.9 + Math.random() * 0.2);
                  
                  allItems.push({
                    ...item,
                    id: `${setIndex}-${itemIndex}-${item.id}`,
                    height: Math.round(heightVariation),
                  });
                });
              }

              // Shuffle the final array for random order
              const shuffled = [...allItems];
              for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
              }

              return shuffled;
            })()}
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
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="relative z-10 py-16 pointer-events-none" data-reveal>
        <div className="max-w-3xl mx-auto text-gray-200 text-lg md:text-xl text-center pointer-events-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-8">About Tokyo</h2>
          <p>
            Tokyo is Japan&apos;s capital and the world&apos;s most populous metropolis. From ancient temples to futuristic skyscrapers, Tokyo offers a unique blend of history, culture, and technology. Experience the cherry blossoms, bustling Shibuya, tranquil gardens, and the iconic Tokyo Tower.
          </p>
        </div>
      </section>

      {/* Highlights - CardSwap */}
      <section className="relative z-10 py-24 pointer-events-none" data-reveal>
        <div className="max-w-6xl mx-auto px-4 pointer-events-auto">
          <div className="relative h-[600px] flex items-center justify-center">
            <CardSwap cardDistance={70} verticalDistance={80} delay={4500}>
              <Card className="p-0 w-[624px] h-[468px] text-white overflow-hidden">
                <div className="w-full h-full relative">
                  <img src="/images/cuisine-1.jpeg" alt="Tokyo Cuisine" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold mb-1">Tokyo Cuisine</h3>
                    <p className="text-sm text-gray-200">Sushi counters, ramen alleys, and late-night izakayas across the city.</p>
                  </div>
                </div>
              </Card>
              <Card className="p-0 w-[624px] h-[468px] text-white overflow-hidden">
                <div className="w-full h-full relative">
                  <img src="/images/night-1.jpg" alt="Tokyo Nightlife" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold mb-1">Neon Nights</h3>
                    <p className="text-sm text-gray-200">Shibuya crossings, arcades, and glowing alleys that never sleep.</p>
                  </div>
                </div>
              </Card>
              <Card className="p-0 w-[624px] h-[468px] text-white overflow-hidden">
                <div className="w-full h-full relative">
                  <img src="/images/tokyo-3.jpg" alt="Tokyo Culture" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold mb-1">Culture & Heritage</h3>
                    <p className="text-sm text-gray-200">Tranquil shrines, gardens, and timeless traditions meet modern design.</p>
                  </div>
                </div>
              </Card>
            </CardSwap>
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
          <GlassSurfaceDemo />
        </div>
      </section>

      {/* Fluid Glass Section */}
      <section className="relative z-10 py-24 pointer-events-none" data-reveal>
        <div className="max-w-6xl mx-auto px-4 pointer-events-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-12">Fluid Glass Experience</h2>
          <p className="text-lg text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Immerse yourself in the fluid glass effect with Tokyo&apos;s stunning imagery. Watch as the glass lens distorts and refracts the beautiful cityscapes.
          </p>
          <div className="relative" style={{ height: '600px' }}>
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
            {/* HTML Overlay with GlitchText
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <GlitchText 
                speed={1.8} 
                enableShadows 
                enableOnHover={false} 
                className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-none"
              >
                Fluid Glass
              </GlitchText>
            </div> */}
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
            <ProfileCardWrapper />
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
      {/* Contact section removed per request */}
    </main>
  );
}
