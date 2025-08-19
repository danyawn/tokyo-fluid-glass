"use client";

import Link from "next/link";
import Iridescence from "./components/Iridescence";

// Smooth scroll function
const handleSmoothScroll = (targetId: string) => {
  // Navigate to home page with hash
  window.location.href = `/${targetId}`;
  
  // After navigation, wait for page load then scroll
  setTimeout(() => {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = rect.top + scrollTop;
      
      window.scrollTo({
        top: targetPosition - 100,
        behavior: 'smooth'
      });
    }
  }, 500); // Wait longer for page navigation
};


export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">


      {/* Iridescence background */}
      <div
        id="iridescence-layer"
        className="absolute inset-0 z-0 w-full h-full"
      >
        <Iridescence
          color={[0.3, 0.2, 0.4]}
          mouseReact={false}
          amplitude={0.05}
          speed={0.8}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pointer-events-none">
        <div className="text-center max-w-2xl mx-auto pointer-events-auto">
          {/* 404 Number - Large and prominent with GlitchText */}
          <div className="mb-8">
            <div className="text-[clamp(6rem,20vw,15rem)] font-black text-white leading-none mb-4 relative">
              <div className="absolute inset-0 text-[clamp(6rem,20vw,15rem)] font-black text-blue-400/30 leading-none mb-4 transform translate-x-1 translate-y-1">
                404
              </div>
              <div className="absolute inset-0 text-[clamp(6rem,20vw,15rem)] font-black text-red-400/30 leading-none mb-4 transform -translate-x-1 -translate-y-1">
                404
              </div>
              <div className="relative text-[clamp(6rem,20vw,15rem)] font-black text-white leading-none mb-4">
                404
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Page Not Found
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mx-auto">
              Looks like you&apos;ve wandered into the wrong neighborhood in
              Tokyo. This page doesn&apos;t exist in our digital cityscape.
            </p>
          </div>

          {/* Glass Effect Card */}
          <div className="relative mb-12">
            <div className="backdrop-blur-md bg-purple-900/20 border border-purple-400/30 rounded-2xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full flex items-center justify-center border border-purple-300/30">
                  <svg
                    className="w-10 h-10 text-white"
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
                <h2 className="text-xl font-semibold text-white mb-4">
                  Lost in Translation
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto">
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
              className="group relative px-8 py-4 bg-black/20 backdrop-blur-md border border-purple-400/30 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-purple-900/30 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                // Simple navigation with hash
                window.location.href = '/#gallery';
              }}
            >
              <span className="relative z-10">Explore Gallery</span>
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
          
          {/* Bottom-left Logo */}
          <div className="absolute bottom-8 left-8 z-30">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
          </div>
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
