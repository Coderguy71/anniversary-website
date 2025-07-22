import { useState, useEffect } from 'react';

// Default breakpoints (in pixels) matching common device sizes
const BREAKPOINTS = {
  xs: 0,      // Extra small devices (portrait phones, less than 576px)
  sm: 576,    // Small devices (landscape phones, 576px and up)
  md: 768,    // Medium devices (tablets, 768px and up)
  lg: 992,    // Large devices (desktops, 992px and up)
  xl: 1200,   // Extra large devices (large desktops, 1200px and up)
  xxl: 1400   // Extra extra large devices (larger desktops, 1400px and up)
};

/**
 * Custom hook to track viewport size and device type
 * @returns {Object} Viewport information including width, height, and device type flags
 */
const useViewport = () => {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    isPortrait: false,
    isLandscape: false,
    isRetina: false,
    breakpoint: 'xs',
    isTouchDevice: false
  });

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    // Check if the device supports touch events
    const isTouchDevice = 'ontouchstart' in window || 
                         navigator.maxTouchPoints > 0 || 
                         navigator.msMaxTouchPoints > 0;

    // Check for retina display
    const isRetina = window.devicePixelRatio > 1 || 
                    (window.matchMedia && 
                     window.matchMedia('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)').matches);

    // Initial viewport update
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Determine current breakpoint
      let breakpoint = 'xs';
      if (width >= BREAKPOINTS.xxl) breakpoint = 'xxl';
      else if (width >= BREAKPOINTS.xl) breakpoint = 'xl';
      else if (width >= BREAKPOINTS.lg) breakpoint = 'lg';
      else if (width >= BREAKPOINTS.md) breakpoint = 'md';
      else if (width >= BREAKPOINTS.sm) breakpoint = 'sm';
      
      setViewport({
        width,
        height,
        isMobile: width < BREAKPOINTS.md,
        isTablet: width >= BREAKPOINTS.sm && width < BREAKPOINTS.lg,
        isDesktop: width >= BREAKPOINTS.lg,
        isLargeDesktop: width >= BREAKPOINTS.xl,
        isPortrait: height > width,
        isLandscape: width > height,
        isRetina,
        breakpoint,
        isTouchDevice
      });
    };

    // Add event listener for window resize
    window.addEventListener('resize', updateViewport);
    
    // Initial call to set viewport
    updateViewport();

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  return viewport;
};

export default useViewport;
