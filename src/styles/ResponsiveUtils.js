import { css } from 'styled-components';

export const media = {
  // Mobile-first approach
  small: (styles) => css`
    @media (min-width: 576px) {
      ${styles}
    }
  `,
  
  medium: (styles) => css`
    @media (min-width: 768px) {
      ${styles}
    }
  `,
  
  large: (styles) => css`
    @media (min-width: 992px) {
      ${styles}
    }
  `,
  
  xlarge: (styles) => css`
    @media (min-width: 1200px) {
      ${styles}
    }
  `,
  
  // Specific breakpoints
  tablet: (styles) => css`
    @media (min-width: 768px) and (max-width: 991.98px) {
      ${styles}
    }
  `,
  
  desktop: (styles) => css`
    @media (min-width: 992px) {
      ${styles}
    }
  `,
  
  // Max-width queries
  maxSmall: (styles) => css`
    @media (max-width: 575.98px) {
      ${styles}
    }
  `,
  
  maxMedium: (styles) => css`
    @media (max-width: 767.98px) {
      ${styles}
    }
  `,
  
  maxLarge: (styles) => css`
    @media (max-width: 991.98px) {
      ${styles}
    }
  `,
  
  // Height based
  tall: (styles) => css`
    @media (min-height: 800px) {
      ${styles}
    }
  `,
  
  short: (styles) => css`
    @media (max-height: 600px) {
      ${styles}
    }
  `,
  
  // Orientation
  portrait: (styles) => css`
    @media (orientation: portrait) {
      ${styles}
    }
  `,
  
  landscape: (styles) => css`
    @media (orientation: landscape) {
      ${styles}
    }
  `,
  
  // High DPI/Retina displays
  retina: (styles) => css`
    @media only screen and (-webkit-min-device-pixel-ratio: 2),
           only screen and (min--moz-device-pixel-ratio: 2),
           only screen and (-o-min-device-pixel-ratio: 2/1),
           only screen and (min-device-pixel-ratio: 2),
           only screen and (min-resolution: 192dpi),
           only screen and (min-resolution: 2dppx) {
      ${styles}
    }
  `,
  
  // Print styles
  print: (styles) => css`
    @media print {
      ${styles}
    }
  `,
  
  // Reduced motion
  reducedMotion: (styles) => css`
    @media (prefers-reduced-motion: reduce) {
      ${styles}
    }
  `,
  
  // Dark mode
  darkMode: (styles) => css`
    @media (prefers-color-scheme: dark) {
      ${styles}
    }
  `,
  
  // Light mode
  lightMode: (styles) => css`
    @media (prefers-color-scheme: light) {
      ${styles}
    }
  `,
  
  // Hover support
  hover: (styles) => css`
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        ${styles}
      }
    }
  `,
  
  // Touch devices
  touch: (styles) => css`
    @media (hover: none) and (pointer: coarse) {
      ${styles}
    }
  `
};

// Animation mixins
export const animations = {
  // Fade in
  fadeIn: (duration = '0.5s', delay = '0s') => css`
    opacity: 0;
    animation: fadeIn ${duration} ease-out ${delay} forwards;
    
    @keyframes fadeIn {
      to { opacity: 1; }
    }
  `,
  
  // Slide in from bottom
  slideUp: (distance = '20px', duration = '0.5s', delay = '0s') => css`
    opacity: 0;
    transform: translateY(${distance});
    animation: slideUp ${duration} ease-out ${delay} forwards;
    
    @keyframes slideUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  
  // Bounce animation
  bounce: (intensity = '10px', duration = '0.8s') => css`
    animation: bounce ${duration} infinite alternate;
    
    @keyframes bounce {
      from { transform: translateY(0); }
      to { transform: translateY(${intensity}); }
    }
  `,
  
  // Pulse animation
  pulse: (scale = 1.05, duration = '2s') => css`
    animation: pulse ${duration} infinite ease-in-out;
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(${scale}); }
      100% { transform: scale(1); }
    }
  `,
  
  // Rotate animation
  rotate: (degrees = 360, duration = '10s') => css`
    animation: rotate ${duration} linear infinite;
    
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(${degrees}deg); }
    }
  `,
  
  // Shake animation
  shake: (intensity = '5px', duration = '0.5s') => css`
    animation: shake ${duration} ease-in-out;
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-${intensity}); }
      75% { transform: translateX(${intensity}); }
    }
  `,
  
  // Gradient animation
  gradientBg: (colors = ['#FF6B9D', '#FF9E00', '#4CC9F0'], duration = '10s') => css`
    background: linear-gradient(-45deg, ${colors.join(', ')});
    background-size: 400% 400%;
    animation: gradient ${duration} ease infinite;
    
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `,
  
  // Fade in up
  fadeInUp: (distance = '20px', duration = '0.5s', delay = '0s') => css`
    opacity: 0;
    transform: translateY(${distance});
    animation: fadeInUp ${duration} ease-out ${delay} forwards;
    
    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  
  // Fade in down
  fadeInDown: (distance = '-20px', duration = '0.5s', delay = '0s') => css`
    opacity: 0;
    transform: translateY(${distance});
    animation: fadeInDown ${duration} ease-out ${delay} forwards;
    
    @keyframes fadeInDown {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  
  // Fade in left
  fadeInLeft: (distance = '-20px', duration = '0.5s', delay = '0s') => css`
    opacity: 0;
    transform: translateX(${distance});
    animation: fadeInLeft ${duration} ease-out ${delay} forwards;
    
    @keyframes fadeInLeft {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `,
  
  // Fade in right
  fadeInRight: (distance = '20px', duration = '0.5s', delay = '0s') => css`
    opacity: 0;
    transform: translateX(${distance});
    animation: fadeInRight ${duration} ease-out ${delay} forwards;
    
    @keyframes fadeInRight {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `
};

// Helper functions
export const truncate = (width = '100%') => css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${width};
`;

export const clearfix = css`
  &::after {
    content: '';
    display: table;
    clear: both;
  }
`;

export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const aspectRatio = (width, height) => css`
  position: relative;
  padding-bottom: ${(height / width) * 100}%;
  
  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const scrollbar = (width = '8px', track = '#f1f1f1', thumb = '#888', thumbHover = '#555') => css`
  &::-webkit-scrollbar {
    width: ${width};
    height: ${width};
  }
  
  &::-webkit-scrollbar-track {
    background: ${track};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${thumb};
    border-radius: 4px;
    
    &:hover {
      background: ${thumbHover};
    }
  }
`;

export const textGradient = (colors = ['#FF6B9D', '#FF9E00']) => css`
  background: linear-gradient(45deg, ${colors.join(', ')});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

export const lineClamp = (lines = 2) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const smoothFont = css`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
`;

export const hideScrollbar = css`
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
  &::-webkit-scrollbar {
    display: none;  /* Chrome, Safari, Opera */
  }
`;

export const focusOutline = (color = '#4D90FE', offset = '2px') => css`
  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${offset} ${color};
  }
`;

export const buttonReset = css`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  outline: inherit;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  touch-action: manipulation;
`;

export const srOnly = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const fullBleed = css`
  width: 100vw;
  margin-left: 50%;
  transform: translateX(-50%);
`;
