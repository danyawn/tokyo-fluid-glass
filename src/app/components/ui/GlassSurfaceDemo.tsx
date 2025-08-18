"use client";
import { useRef } from "react";
import GlassSurface from "./GlassSurface";

interface GlassSurfaceDemoProps {
  className?: string;
}

const GlassSurfaceDemo: React.FC<GlassSurfaceDemoProps> = ({
  className = "",
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const commonGlassProps = {
    borderRadius: 50,
    borderWidth: 0.07,
    brightness: 50,
    opacity: 0.93,
    blur: 11,
    backgroundOpacity: 0.1,
    saturation: 1,
    distortionScale: -180,
    redOffset: 0,
    greenOffset: 10,
    blueOffset: 20,
    displace: 0.5,
  };

  const scrollImages = [
    {
      src: "/images/tokyo-1.avif",
      text: "The Beauty of Tokyo",
    },
    {
      src: "/images/tokyo-3.jpg",
      text: "Calming Place in Tokyo",
    },
    {
      src: "/images/night-2.jpeg",
      text: "The Summer of Glass",
    },
    {
      src: "/images/tokyo-4.jpg",
      text: "Tokyo at Night",
    },
    {
      src: "/images/cuisine-2.jpg",
      text: "Glass Morphism",
    },
    {
      src: "/images/tokyo-5.jpeg",
      text: "Modern UI Design",
    },
    {
      src: "/images/tokyo-6.webp",
      text: "Digital Art",
    },
    {
      src: "/images/cuisine-1.jpeg",
      text: "Culinary Experience",
    },
    {
      src: "/images/night-1.jpg",
      text: "Neon Nights",
    },
    {
      src: "/images/tokyo-2.jpeg",
      text: "Urban Landscape",
    },
    {
      src: "/images/tokyo-1.avif",
      text: "City of Dreams",
    },
    {
      src: "/images/tokyo-3.jpg",
      text: "Future is Now",
    },
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Demo Container */}
      <div
        ref={scrollContainerRef}
        className="relative h-[600px] overflow-y-auto rounded-lg border border-white/10 bg-black scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Sticky Glass Surface */}
        <div className="sticky top-1/2 transform -translate-y-1/2 z-50 pointer-events-none flex justify-center">
          <GlassSurface width={360} height={100} {...commonGlassProps} />
        </div>

        {/* Scrollable Content */}
        <div className="relative flex flex-col items-center gap-24 py-32">
          <h2 className="text-4xl font-black text-gray-300 whitespace-nowrap">
            Try scrolling.
          </h2>

          <div className="h-80 w-full" />

          {scrollImages.map((item, index) => (
            <div key={index} className="relative">
              <img
                src={item.src}
                alt={item.text}
                className="w-[500px] h-auto rounded-2xl object-cover grayscale"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-black text-center leading-none text-5xl min-w-[300px] z-5 mix-blend-overlay">
                {item.text}
              </div>
            </div>
          ))}

          <div className="h-80 w-full" />
        </div>
      </div>
    </div>
  );
};

export default GlassSurfaceDemo;
