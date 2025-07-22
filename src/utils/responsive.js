/**
 * Responsive design utilities for the anniversary website
 * Provides helper functions and constants for responsive layouts
 */

// Breakpoints (in pixels)
export const BREAKPOINTS = {
  xs: 0,      // Extra small devices (portrait phones, less than 576px)
  sm: 576,    // Small devices (landscape phones, 576px and up)
  md: 768,    // Medium devices (tablets, 768px and up)
  lg: 992,    // Large devices (desktops, 992px and up)
  xl: 1200,   // Extra large devices (large desktops, 1200px and up)
  xxl: 1400   // Extra extra large devices (larger desktops, 1400px and up)
};

// Media query helpers
export const media = {
  // Mobile-first approach
  small: `@media (min-width: ${BREAKPOINTS.sm}px)`,
  medium: `@media (min-width: ${BREAKPOINTS.md}px)`,
  large: `@media (min-width: ${BREAKPOINTS.lg}px)`,
  xlarge: `@media (min-width: ${BREAKPOINTS.xl}px)`,
  xxlarge: `@media (min-width: ${BREAKPOINTS.xxl}px)`,
  
  // Max-width queries
  maxSmall: `@media (max-width: ${BREAKPOINTS.sm - 1}px)`,
  maxMedium: `@media (max-width: ${BREAKPOINTS.md - 1}px)`,
  maxLarge: `@media (max-width: ${BREAKPOINTS.lg - 1}px)`,
  maxXLarge: `@media (max-width: ${BREAKPOINTS.xl - 1}px)`,
  
  // Height based
  tall: `@media (min-height: 800px)`,
  short: `@media (max-height: 600px)`,
  
  // Orientation
  portrait: `@media (orientation: portrait)`,
  landscape: `@media (orientation: landscape)`,
  
  // Print styles
  print: `@media print`,
  
  // Reduced motion
  reducedMotion: `@media (prefers-reduced-motion: reduce)`,
  
  // Dark mode
  darkMode: `@media (prefers-color-scheme: dark)`,
  
  // Light mode
  lightMode: `@media (prefers-color-scheme: light)`,
  
  // Hover support
  hover: `@media (hover: hover) and (pointer: fine)`,
  
  // Touch devices
  touch: `@media (hover: none) and (pointer: coarse)`
};

/**
 * Returns true if the current viewport matches the specified breakpoint or larger
 * @param {string} breakpoint - The breakpoint to check against (xs, sm, md, lg, xl, xxl)
 * @returns {boolean} - True if the viewport is at least as wide as the specified breakpoint
 */
export const isViewportWiderThan = (breakpoint) => {
  if (typeof window === 'undefined') return false;
  
  const width = window.innerWidth;
  const bp = BREAKPOINTS[breakpoint.toLowerCase()];
  
  if (bp === undefined) {
    console.warn(`Unknown breakpoint: ${breakpoint}. Using 'xs' as fallback.`);
    return true; // Default to true for unknown breakpoints
  }
  
  return width >= bp;
};

/**
 * Returns the current breakpoint based on viewport width
 * @returns {string} - The current breakpoint (xs, sm, md, lg, xl, xxl)
 */
export const getCurrentBreakpoint = () => {
  if (typeof window === 'undefined') return 'xs';
  
  const width = window.innerWidth;
  
  if (width >= BREAKPOINTS.xxl) return 'xxl';
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  if (width >= BREAKPOINTS.sm) return 'sm';
  return 'xs';
};

/**
 * Returns true if the device is a touch device
 * @returns {boolean} - True if the device is a touch device
 */
export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

/**
 * Returns true if the device is a mobile device (based on screen size and touch support)
 * @returns {boolean} - True if the device is a mobile device
 */
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  
  return (
    isViewportWiderThan('md') === false ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
};

/**
 * Returns true if the device is a tablet (based on screen size)
 * @returns {boolean} - True if the device is a tablet
 */
export const isTabletDevice = () => {
  if (typeof window === 'undefined') return false;
  
  const width = window.innerWidth;
  return width >= BREAKPOINTS.sm && width < BREAKPOINTS.lg;
};

/**
 * Returns true if the device is a desktop (based on screen size)
 * @returns {boolean} - True if the device is a desktop
 */
export const isDesktopDevice = () => {
  if (typeof window === 'undefined') return false;
  
  const width = window.innerWidth;
  return width >= BREAKPOINTS.lg;
};

/**
 * Returns true if the device is in portrait orientation
 * @returns {boolean} - True if the device is in portrait orientation
 */
export const isPortrait = () => {
  if (typeof window === 'undefined') return true;
  
  return window.innerHeight > window.innerWidth;
};

/**
 * Returns true if the device is in landscape orientation
 * @returns {boolean} - True if the device is in landscape orientation
 */
export const isLandscape = () => {
  if (typeof window === 'undefined') return false;
  
  return window.innerWidth > window.innerHeight;
};

/**
 * Returns true if the device has a high DPI/retina display
 * @returns {boolean} - True if the device has a high DPI/retina display
 */
export const isRetina = () => {
  if (typeof window === 'undefined') return false;
  
  return (
    window.devicePixelRatio > 1 ||
    (window.matchMedia && 
     window.matchMedia('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)').matches)
  );
};

/**
 * Returns true if the user prefers reduced motion
 * @returns {boolean} - True if the user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Returns true if the user prefers dark mode
 * @returns {boolean} - True if the user prefers dark mode
 */
export const prefersDarkMode = () => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Returns true if the user prefers light mode
 * @returns {boolean} - True if the user prefers light mode
 */
export const prefersLightMode = () => {
  if (typeof window === 'undefined') return true;
  
  return window.matchMedia('(prefers-color-scheme: light)').matches;
};

/**
 * Adds a resize event listener and returns a function to remove it
 * @param {Function} callback - The function to call when the window is resized
 * @returns {Function} - A function to remove the event listener
 */
export const onResize = (callback) => {
  if (typeof window === 'undefined') return () => {};
  
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
};

/**
 * Adds an orientation change event listener and returns a function to remove it
 * @param {Function} callback - The function to call when the orientation changes
 * @returns {Function} - A function to remove the event listener
 */
export const onOrientationChange = (callback) => {
  if (typeof window === 'undefined') return () => {};
  
  window.addEventListener('orientationchange', callback);
  return () => window.removeEventListener('orientationchange', callback);
};

/**
 * Returns the current viewport dimensions
 * @returns {{width: number, height: number}} - The current viewport width and height
 */
export const getViewportSize = () => {
  if (typeof window === 'undefined') return { width: 0, height: 0 };
  
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

/**
 * Returns the current scroll position
 * @returns {{x: number, y: number}} - The current scroll position
 */
export const getScrollPosition = () => {
  if (typeof window === 'undefined') return { x: 0, y: 0 };
  
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
    y: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  };
};

export default {
  BREAKPOINTS,
  media,
  isViewportWiderThan,
  getCurrentBreakpoint,
  isTouchDevice,
  isMobileDevice,
  isTabletDevice,
  isDesktopDevice,
  isPortrait,
  isLandscape,
  isRetina,
  prefersReducedMotion,
  prefersDarkMode,
  prefersLightMode,
  onResize,
  onOrientationChange,
  getViewportSize,
  getScrollPosition
};
