"use client";

import Link from "next/link";
import Galaxy from "./components/Galaxy";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Galaxy background */}
      <div
        id="galaxy-layer"
        className="absolute inset-0 z-0 w-full h-full"
      >
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
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pointer-events-none">
        <div className="text-center max-w-2xl mx-auto pointer-events-auto">
          {/* 404 Number - Custom subtle glitch */}
          <div className="mb-8">
            <div className="text-[clamp(4rem,15vw,12rem)] font-black text-white leading-none glitch-404">
              404
            </div>
            <style jsx>{`
              .glitch-404 {
                position: relative;
                text-shadow: 0 0 10px rgba(255,255,255,0.3);
                animation: glitch-effect 3s infinite;
              }
              
              .glitch-404::before {
                content: '404';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: transparent;
                color: rgba(255, 0, 0, 0.3);
                animation: glitch-red 2s infinite;
                clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
              }
              
              .glitch-404::after {
                content: '404';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: transparent;
                color: rgba(0, 255, 255, 0.3);
                animation: glitch-cyan 2.5s infinite;
                clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
              }
              
              @keyframes glitch-effect {
                0%, 100% { 
                  transform: translateX(0);
                }
                2% { 
                  transform: translateX(-2px);
                }
                4% { 
                  transform: translateX(2px);
                }
                6% { 
                  transform: translateX(0);
                }
                8% { 
                  transform: translateX(-1px);
                }
                10% { 
                  transform: translateX(1px);
                }
                12% { 
                  transform: translateX(0);
                }
                14% { 
                  transform: translateX(-3px);
                }
                16% { 
                  transform: translateX(3px);
                }
                18% { 
                  transform: translateX(0);
                }
                20% { 
                  transform: translateX(-1px);
                }
                22% { 
                  transform: translateX(1px);
                }
                24% { 
                  transform: translateX(0);
                }
                26% { 
                  transform: translateX(-2px);
                }
                28% { 
                  transform: translateX(2px);
                }
                30% { 
                  transform: translateX(0);
                }
                32% { 
                  transform: translateX(-1px);
                }
                34% { 
                  transform: translateX(1px);
                }
                36% { 
                  transform: translateX(0);
                }
                38% { 
                  transform: translateX(-3px);
                }
                40% { 
                  transform: translateX(3px);
                }
                42% { 
                  transform: translateX(0);
                }
                44% { 
                  transform: translateX(-1px);
                }
                46% { 
                  transform: translateX(1px);
                }
                48% { 
                  transform: translateX(0);
                }
                50% { 
                  transform: translateX(-2px);
                }
                52% { 
                  transform: translateX(2px);
                }
                54% { 
                  transform: translateX(0);
                }
                56% { 
                  transform: translateX(-1px);
                }
                58% { 
                  transform: translateX(1px);
                }
                60% { 
                  transform: translateX(0);
                }
                62% { 
                  transform: translateX(-3px);
                }
                64% { 
                  transform: translateX(3px);
                }
                66% { 
                  transform: translateX(0);
                }
                68% { 
                  transform: translateX(-1px);
                }
                70% { 
                  transform: translateX(1px);
                }
                72% { 
                  transform: translateX(0);
                }
                74% { 
                  transform: translateX(-2px);
                }
                76% { 
                  transform: translateX(2px);
                }
                78% { 
                  transform: translateX(0);
                }
                80% { 
                  transform: translateX(-1px);
                }
                82% { 
                  transform: translateX(1px);
                }
                84% { 
                  transform: translateX(0);
                }
                86% { 
                  transform: translateX(-3px);
                }
                88% { 
                  transform: translateX(3px);
                }
                90% { 
                  transform: translateX(0);
                }
                92% { 
                  transform: translateX(-1px);
                }
                94% { 
                  transform: translateX(1px);
                }
                96% { 
                  transform: translateX(0);
                }
                98% { 
                  transform: translateX(-2px);
                }
              }
              
              @keyframes glitch-red {
                0%, 100% { 
                  opacity: 0;
                  transform: translateX(0);
                }
                10% { 
                  opacity: 0.3;
                  transform: translateX(-1px);
                }
                20% { 
                  opacity: 0;
                  transform: translateX(0);
                }
                30% { 
                  opacity: 0.3;
                  transform: translateX(1px);
                }
                40% { 
                  opacity: 0;
                  transform: translateX(0);
                }
                50% { 
                  opacity: 0.3;
                  transform: translateX(-1px);
                }
                60% { 
                  opacity: 0;
                  transform: translateX(0);
                }
                70% { 
                  opacity: 0.3;
                  transform: translateX(1px);
                }
                80% { 
                  opacity: 0;
                  transform: translateX(0);
                }
                90% { 
                  opacity: 0.3;
                  transform: translateX(-1px);
                }
              }
              
              @keyframes glitch-cyan {
                0%, 100% { 
                  opacity: 0;
                  transform: translateX(0);
                }
                15% { 
                  opacity: 0.3;
                  transform: translateX(1px);
                }
                25% { 
                  opacity: 0;
                  transform: translateX(0);
                }
                35% { 
                  opacity: 0.3;
                  transform: translateX(-1px);
                }
                45% { 
                  opacity: 0;
                  transform: translateX(0);
                }
                55% { 
                  opacity: 0.3;
                  transform: translateX(1px);
                }
                65% { 
                  opacity: 0;
                  transform: translateX(0);
                }
                75% { 
                  opacity: 0.3;
                  transform: translateX(-1px);
                }
                85% { 
                  opacity: 0;
                  transform: translateX(0);
                }
                95% { 
                  opacity: 0.3;
                  transform: translateX(1px);
                }
              }
            `}</style>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Looks like you&apos;ve wandered into the wrong neighborhood in
              Tokyo. This page doesn&apos;t exist in our digital cityscape.
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
                  Don&apos;t worry, even the most experienced travelers get lost
                  sometimes. Let&apos;s get you back on track to explore the
                  real Tokyo experience.
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
      <footer className="relative z-10 bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Tokyo Experience - Yan Danu
          </p>
        </div>
      </footer>
    </main>
  );
}
