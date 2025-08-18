"use client";

import React, { useState, useEffect } from 'react';

interface SizeGuardProps {
  children: React.ReactNode;
  minWidth?: number;
  minHeight?: number;
}

export default function SizeGuard({ 
  children, 
  minWidth = 1024, // Laptop minimum width
  minHeight = 768  // Laptop minimum height
}: SizeGuardProps) {
  const [isValidSize, setIsValidSize] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
      
      const isValid = width >= minWidth && height >= minHeight;
      setIsValidSize(isValid);
    };

    // Check on mount
    checkSize();

    // Check on resize
    window.addEventListener('resize', checkSize);
    
    return () => window.removeEventListener('resize', checkSize);
  }, [minWidth, minHeight]);

  if (isValidSize) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4 size-guard-warning overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-purple-500/10 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto bg-black/80 backdrop-blur-lg rounded-2xl border border-red-500/30 p-6 shadow-2xl animate-fadeIn">
        {/* Glass Text Warning */}
        <div className="mb-6 text-center">
          <div className="glass-text text-2xl sm:text-3xl font-bold mb-2 text-red-400">
            DEVICE NOT SUPPORTED
          </div>
        </div>

        {/* Device Info */}
        <div className="glass-card text-white/90 text-sm mb-6 space-y-2 p-4 animate-fadeIn" style={{animationDelay: '0.1s'}}>
          <div className="flex justify-between items-center">
            <span>Current viewport:</span>
            <span className="text-red-400 font-mono text-xs animate-pulse">{dimensions.width} × {dimensions.height}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Required minimum:</span>
            <span className="text-green-400 font-mono text-xs">{minWidth} × {minHeight}</span>
          </div>
        </div>

        {/* Warning Message */}
        <div className="text-white/80 text-sm leading-relaxed mb-6">
          <p className="mb-3">
            This web experience is optimized for <strong className="text-red-400">laptop and desktop devices</strong> 
            with larger screens for the best visual and interactive experience.
          </p>
          <p>
            Please access this website on a device with a screen resolution of at least{' '}
            <strong className="text-green-400">{minWidth}×{minHeight}</strong> pixels.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/25"
          >
            🔄 Refresh Page
          </button>
          
          <button
            onClick={() => {
              const newWindow = window.open(window.location.href, '_blank');
              if (!newWindow) {
                window.location.href = window.location.href;
              }
            }}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/25"
          >
            🔗 Open in New Window
          </button>
        </div>

        {/* Device Recommendations */}
        <div className="text-white/70 text-xs">
          <p className="mb-3 font-semibold text-center animate-fadeIn">💻 Recommended devices:</p>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="glass-card p-2 transition-all duration-300 transform hover:scale-105 animate-fadeIn" style={{animationDelay: '0.2s'}}>
              <div className="text-red-400 mb-1 text-lg">💻</div>
              <div>Laptops</div>
              <div className="text-xs text-gray-500">13&quot;+</div>
            </div>
            <div className="glass-card p-2 transition-all duration-300 transform hover:scale-105 animate-fadeIn" style={{animationDelay: '0.4s'}}>
              <div className="text-blue-400 mb-1 text-lg">🖥️</div>
              <div>Desktop</div>
              <div className="text-xs text-gray-500">Monitors</div>
            </div>
            <div className="glass-card p-2 transition-all duration-300 transform hover:scale-105 animate-fadeIn" style={{animationDelay: '0.6s'}}>
              <div className="text-purple-400 mb-1 text-lg">📱</div>
              <div>Tablets</div>
              <div className="text-xs text-gray-500">Landscape</div>
            </div>
            <div className="glass-card p-2 transition-all duration-300 transform hover:scale-105 animate-fadeIn" style={{animationDelay: '0.8s'}}>
              <div className="text-green-400 mb-1 text-lg">✨</div>
              <div>High-Res</div>
              <div className="text-xs text-gray-500">Displays</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
