"use client";
import GlitchText from './GlitchText';

// CSS-only loader: fades out automatically after 1s; no JS timers so it can't get stuck
export default function InitialLoader() {
  return (
    <div aria-hidden className="initial-loader">
      <GlitchText speed={0.8} enableShadows enableOnHover={false} className="text-[clamp(1.5rem,6vw,3rem)]">
        Loading...
      </GlitchText>
    </div>
  );
}


