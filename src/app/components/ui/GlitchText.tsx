"use client";
import { FC, CSSProperties } from 'react';
import './GlitchText.css';

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  subtle?: boolean;
  className?: string;
}

interface CustomCSSProperties extends CSSProperties {
  ['--after-duration']?: string;
  ['--before-duration']?: string;
  ['--after-shadow']?: string;
  ['--before-shadow']?: string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 1,
  enableShadows = true,
  enableOnHover = true,
  subtle = false,
  className = '',
}) => {
  const inlineStyles: CustomCSSProperties = {
    ['--after-duration']: `${speed * 3}s`,
    ['--before-duration']: `${speed * 2}s`,
    ['--after-shadow']: enableShadows ? '-5px 0 red' : 'none',
    ['--before-shadow']: enableShadows ? '5px 0 cyan' : 'none',
  };

  const hoverClass = enableOnHover ? 'enable-on-hover' : '';
  const subtleClass = subtle ? 'subtle' : '';
  return (
    <div className={`glitch ${hoverClass} ${subtleClass} ${className}`} style={inlineStyles} data-text={children}>
      {children}
    </div>
  );
};

export default GlitchText;


