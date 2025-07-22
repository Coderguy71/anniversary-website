import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

// Base Animations
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export const slideInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

// Container Animations
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

export const fadeInContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

// Element Animations
export const heartBeat = {
  scale: [1, 1.2, 1],
  transition: {
    duration: 1.2,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse"
  }
};

export const float = {
  y: [0, -15, 0],
  transition: {
    duration: 3,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse"
  }
};

export const pulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse"
  }
};

export const spin = {
  rotate: [0, 360],
  transition: {
    duration: 3,
    ease: "linear",
    repeat: Infinity,
    repeatType: "loop"
  }
};

export const bounce = {
  y: [0, -20, 0],
  transition: {
    duration: 1.5,
    ease: "easeOut",
    repeat: Infinity,
    repeatType: "loop"
  }
};

export const shimmer = {
  backgroundSize: "200% 200%",
  backgroundImage: "linear-gradient(45deg, #FF6B9D, #FF9E00, #FF6B9D)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
  animation: "shimmer 3s ease infinite",
  "@keyframes shimmer": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" }
  }
};

export const fadeInWithBounce = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      type: "spring",
      damping: 10,
      stiffness: 100
    }
  })
};

export const rotateIn = {
  hidden: { opacity: 0, rotate: -10 },
  visible: (i = 0) => ({
    opacity: 1,
    rotate: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export const flipIn = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: (i = 0) => ({
    opacity: 1,
    rotateY: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

// Combined Animations
export const floatAndPulse = {
  ...float,
  transition: {
    ...float.transition,
    y: {
      ...float.transition,
      duration: 4
    },
    scale: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

export const heartBeatAndFloat = {
  ...heartBeat,
  ...float,
  transition: {
    ...heartBeat.transition,
    y: float.transition.y
  }
};

// Animation Hooks
export const useScrollAnimation = (ref, options = {}) => {
  const controls = useAnimation();
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || "0px"
      }
    );
    
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [ref, controls, options]);
  
  return controls;
};

// Animation Variants
export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export const slideInVariants = {
  hidden: (direction = "left") => ({
    opacity: 0,
    x: direction === "left" ? -50 : 50
  }),
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export const AnimatedText = ({ children, delay = 0, ...props }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: {
          delay: delay,
          duration: 0.6,
          ease: "easeOut"
        }
      }}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export const Sparkle = ({ size = 20, color = "#FF6B9D", style }) => {
  return (
    <motion.span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        position: 'relative',
        ...style,
      }}
      animate={{
        rotate: [0, 180, 360],
        scale: [0.8, 1.2, 0.8],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      <span 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '2px',
          background: color,
          transform: 'translate(-50%, -50%) rotate(45deg)',
        }}
      />
      <span 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '2px',
          background: color,
          transform: 'translate(-50%, -50%) rotate(-45deg)',
        }}
      />
    </motion.span>
  );
};
