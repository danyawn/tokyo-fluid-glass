import Link from 'next/link';
import Galaxy from './components/Galaxy';
import GlitchText from './components/ui/GlitchText';

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Galaxy background */}
      <div id="galaxy-layer" className="absolute inset-0 z-0 pointer-events-none">
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

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Number */}
          <div className="mb-8">
            <GlitchText 
              speed={0.8} 
              enableShadows 
              enableOnHover={false} 
              className="text-[clamp(4rem,15vw,12rem)] font-black text-white leading-none"
            >
              404
            </GlitchText>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Looks like you&apos;ve wandered into the wrong neighborhood in Tokyo. 
              This page doesn&apos;t exist in our digital cityscape.
            </p>
          </div>

          {/* Glass Effect Card */}
          <div className="relative mb-12">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-white/20">
                  <svg 
                    className="w-12 h-12 text-white/80" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" 
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white mb-3">
                  Lost in Translation
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Don&apos;t worry, even the most experienced travelers get lost sometimes. 
                  Let&apos;s get you back on track to explore the real Tokyo experience.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10">Back to Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              href="/#gallery"
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white/20"
            >
              <span className="relative z-10">Explore Gallery</span>
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Tokyo Experience • Made with ❤️
          </p>
        </div>
      </footer>
    </main>
  );
}
