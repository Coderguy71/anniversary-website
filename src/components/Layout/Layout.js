import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaMoon, FaSun, FaMusic, FaImages, FaEnvelope, FaHome, FaListUl, FaHistory, FaStar } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { fadeIn, slideInDown } from '../../utils/animations';
import useViewport from '../../hooks/useViewport';
import { isMobileDevice, isTabletDevice } from '../../utils/responsive';

const Layout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const viewport = useViewport();
  const location = useLocation();
  const isMobile = isMobileDevice();
  const isTablet = isTabletDevice();

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  // Check scroll position for navbar style
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    // Check for saved theme preference
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode);
      document.documentElement.setAttribute('data-theme', savedDarkMode ? 'dark' : 'light');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Use system preference if no saved preference
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Navigation items
  const navItems = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/love-letter', label: 'Love Letter', icon: <FaEnvelope /> },
    { to: '/gallery', label: 'Gallery', icon: <FaImages /> },
    { to: '/playlist', label: 'Playlist', icon: <FaMusic /> },

    { to: '/timeline', label: 'Timeline', icon: <FaHistory /> },
    { to: '/surprise', label: 'Surprise', icon: <FaStar /> },
  ];

  return (
    <div className="app-layout">
      {/* Navigation Bar */}
      <motion.header 
        className={`navbar ${isScrolled ? 'scrolled' : ''} ${location.pathname === '/love-letter' ? 'love-letter-nav' : ''}`}
        initial={false}
        animate={isScrolled ? 'scrolled' : 'initial'}
        variants={{
          initial: { boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)' },
          scrolled: { boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'var(--color-bg)'
        }}
      >
        <div className="container">
          <motion.div 
            className="logo"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/" className="logo-link">
              <FaHeart className="heart-icon" />
              <span>Our Love Story</span>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          {!isMobile && !isTablet && (
            <nav className="desktop-nav">
              <ul>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Link 
                      to={item.to} 
                      className={`nav-link ${location.pathname === item.to ? 'active' : ''}`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          )}
          
          {/* Mobile Menu Button */}
          {(isMobile || isTablet) && (
            <button 
              className={`mobile-menu-button ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}
          
          {/* Theme Toggle */}
          <motion.button 
            className="theme-toggle"
            onClick={toggleDarkMode}
            whileTap={{ scale: 0.9 }}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </motion.button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {(isMobile || isTablet) && isMenuOpen && (
            <motion.div 
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <ul>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.to}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    custom={index * 0.1}
                  >
                    <Link 
                      to={item.to} 
                      className={`mobile-nav-link ${location.pathname === item.to ? 'active' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      <span className="nav-label">{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* Main Content */}
      <main className="main-content" style={{
        marginTop: '6rem',
        minHeight: 'calc(100vh - 6rem)'
      }}>
        {children}
      </main>
      
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <FaHeart className="heart-icon" />
              <span>Our Love Story</span>
            </div>
            <p className="footer-text">
              Made with <FaHeart className="heart-icon" /> for you
            </p>
            <p className="copyright">
              &copy; {new Date().getFullYear()} - All rights reserved
            </p>
          </div>
        </div>
      </footer>
      
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            className="scroll-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <FaHeart className="icon" />
          </motion.button>
        )}
      </AnimatePresence>
      
      <style jsx global>{`
        :root {
          /* Light Theme */
          --color-primary: #FF6B9D;
          --color-primary-light: #FF9BB8;
          --color-primary-dark: #E6517A;
          --color-secondary: #77DD77;
          --color-secondary-light: #A4E8A4;
          --color-secondary-dark: #5DBB63;
          --color-accent: #FF9E00;
          --color-text: #333333;
          --color-text-light: #666666;
          --color-text-lighter: #999999;
          --color-bg: #FFF9FB;
          --color-bg-light: #FFFFFF;
          --color-bg-dark: #F5E6EA;
          --color-border: #E0E0E0;
          --color-shadow: rgba(0, 0, 0, 0.1);
          --color-overlay: rgba(0, 0, 0, 0.5);
          --color-error: #FF4444;
          --color-success: #4CAF50;
          --color-warning: #FF9800;
          --color-info: #2196F3;
          --transition: all 0.3s ease;
          --border-radius: 8px;
          --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          --max-width: 1200px;
          --header-height: 70px;
          --footer-height: 200px;
        }
        
        /* Dark Theme */
        [data-theme="dark"] {
          --color-primary: #FF6B9D;
          --color-primary-light: #FF9BB8;
          --color-primary-dark: #E6517A;
          --color-secondary: #77DD77;
          --color-secondary-light: #A4E8A4;
          --color-secondary-dark: #5DBB63;
          --color-accent: #FFB74D;
          --color-text: #F5F5F5;
          --color-text-light: #B0BEC5;
          --color-text-lighter: #78909C;
          --color-bg: #121212;
          --color-bg-light: #1E1E1E;
          --color-bg-dark: #0D0D0D;
          --color-border: #333333;
          --color-shadow: rgba(0, 0, 0, 0.3);
          --color-overlay: rgba(0, 0, 0, 0.7);
        }
        
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        html {
          font-size: 62.5%;
          scroll-behavior: smooth;
          -webkit-text-size-adjust: 100%;
          -webkit-tap-highlight-color: transparent;
        }
        
        body {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-size: 1.6rem;
          line-height: 1.6;
          color: var(--color-text);
          background-color: var(--color-bg);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          transition: background-color 0.3s ease, color 0.3s ease;
          overflow-x: hidden;
        }
        
        /* Typography */
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Dancing Script', cursive;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: var(--color-primary);
        }
        
        h1 { 
          font-size: 4.8rem; 
          line-height: 1.1;
          
          @media (max-width: 768px) {
            font-size: 4rem;
          }
          
          @media (max-width: 480px) {
            font-size: 3.2rem;
          }
        }
        
        h2 { 
          font-size: 3.6rem; 
          line-height: 1.2;
          
          @media (max-width: 768px) {
            font-size: 3rem;
          }
          
          @media (max-width: 480px) {
            font-size: 2.8rem;
          }
        }
        
        h3 { 
          font-size: 2.8rem;
          line-height: 1.3;
          
          @media (max-width: 768px) {
            font-size: 2.4rem;
          }
        }
        
        p {
          margin-bottom: 1.5rem;
          font-size: 1.6rem;
          line-height: 1.6;
          color: var(--color-text-light);
          
          @media (max-width: 480px) {
            font-size: 1.5rem;
          }
        }
        
        a {
          color: var(--color-primary);
          text-decoration: none;
          transition: var(--transition);
          -webkit-tap-highlight-color: transparent;
          
          &:hover,
          &:focus {
            color: var(--color-primary-dark);
            outline: none;
          }
        }
        
        /* Layout */
        .app-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          padding-top: var(--header-height);
          min-height: calc(100vh - var(--header-height) - var(--footer-height));
        }
        
        .container {
          width: 100%;
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          
          @media (max-width: 768px) {
            padding: 0 1.5rem;
          }
          
          @media (max-width: 480px) {
            padding: 0 1.2rem;
          }
        }
        
        /* Navigation */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background-color: var(--color-bg-light);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 1000;
          transition: var(--transition);
          border-bottom: 1px solid var(--color-border);
          
          .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: var(--header-height);
            position: relative;
          }
          
          &.scrolled {
            background-color: rgba(255, 255, 255, 0.9);
            box-shadow: var(--box-shadow);
            
            [data-theme="dark"] & {
              background-color: rgba(30, 30, 30, 0.9);
            }
          }
        }
        
        .logo {
          display: flex;
          align-items: center;
          
          .logo-link {
            display: flex;
            align-items: center;
            font-family: 'Dancing Script', cursive;
            font-size: 2.2rem;
            font-weight: 700;
            color: var(--color-primary);
            text-decoration: none;
            
            &:hover {
              .heart-icon {
                transform: scale(1.2) rotate(10deg);
              }
            }
          }
          
          .heart-icon {
            color: var(--color-primary);
            margin-right: 1rem;
            font-size: 2.2rem;
            transition: var(--transition);
            animation: pulse 2s infinite;
          }
          
          span {
            margin-left: 0.5rem;
          }
        }
        
        .desktop-nav {
          flex: 1;
          display: flex;
          justify-content: center;
          
          ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
          }
          
          li {
            margin: 0 1rem;
          }
          
          .nav-link {
            display: block;
            padding: 0.8rem 1.5rem;
            font-size: 1.5rem;
            font-weight: 500;
            color: var(--color-text);
            text-decoration: none;
            border-radius: 50px;
            transition: var(--transition);
            position: relative;
            overflow: hidden;
            
            &::before {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 2px;
              background-color: var(--color-primary);
              transform: scaleX(0);
              transform-origin: right;
              transition: transform 0.3s ease;
            }
            
            &:hover,
            &:focus,
            &.active {
              color: var(--color-primary);
              
              &::before {
                transform: scaleX(1);
                transform-origin: left;
              }
            }
            
            &.active {
              font-weight: 600;
            }
          }
        }
        
        .mobile-menu-button {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 24px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1001;
          position: relative;
          
          span {
            display: block;
            width: 100%;
            height: 3px;
            background-color: var(--color-text);
            border-radius: 3px;
            transition: var(--transition);
            transform-origin: center;
            
            &:nth-child(1) {
              transform: translateY(0) rotate(0);
            }
            
            &:nth-child(2) {
              opacity: 1;
              transform: scaleX(1);
            }
            
            &:nth-child(3) {
              transform: translateY(0) rotate(0);
            }
          }
          
          &.open {
            span {
              &:nth-child(1) {
                transform: translateY(10.5px) rotate(45deg);
              }
              
              &:nth-child(2) {
                opacity: 0;
                transform: scaleX(0);
              }
              
              &:nth-child(3) {
                transform: translateY(-10.5px) rotate(-45deg);
              }
            }
          }
          
          @media (max-width: 992px) {
            display: flex;
          }
        }
        
        .mobile-nav {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: var(--color-bg-light);
          border-top: 1px solid var(--color-border);
          box-shadow: 0 10px 20px var(--color-shadow);
          overflow: hidden;
          z-index: 999;
          
          ul {
            list-style: none;
            padding: 1rem 0;
            margin: 0;
          }
          
          .mobile-nav-link {
            display: flex;
            align-items: center;
            padding: 1.5rem 2rem;
            font-size: 1.6rem;
            color: var(--color-text);
            text-decoration: none;
            transition: var(--transition);
            position: relative;
            overflow: hidden;
            
            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 4px;
              height: 100%;
              background-color: var(--color-primary);
              transform: scaleY(0);
              transform-origin: bottom;
              transition: transform 0.3s ease;
            }
            
            &:hover,
            &:focus,
            &.active {
              background-color: var(--color-bg-dark);
              color: var(--color-primary);
              
              &::before {
                transform: scaleY(1);
                transform-origin: top;
              }
            }
            
            .nav-icon {
              margin-right: 1.5rem;
              font-size: 1.8rem;
              width: 24px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
            }
            
            .nav-label {
              position: relative;
              z-index: 1;
            }
          }
        }
        
        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: transparent;
          border: none;
          color: var(--color-text);
          font-size: 1.8rem;
          cursor: pointer;
          margin-left: 1.5rem;
          transition: var(--transition);
          -webkit-tap-highlight-color: transparent;
          
          &:hover {
            background-color: var(--color-bg-dark);
            color: var(--color-primary);
          }
          
          &:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.3);
          }
        }
        
        /* Footer */
        .footer {
          background-color: var(--color-bg-light);
          padding: 4rem 0;
          border-top: 1px solid var(--color-border);
          margin-top: auto;
          
          .footer-content {
            text-align: center;
          }
          
          .footer-logo {
            display: inline-flex;
            align-items: center;
            margin-bottom: 1.5rem;
            font-family: 'Dancing Script', cursive;
            font-size: 2.4rem;
            font-weight: 700;
            color: var(--color-primary);
            
            .heart-icon {
              color: var(--color-primary);
              margin-right: 1rem;
              font-size: 2.2rem;
              animation: pulse 2s infinite;
            }
          }
          
          .footer-text {
            font-size: 1.6rem;
            color: var(--color-text-light);
            margin-bottom: 1.5rem;
            
            .heart-icon {
              color: var(--color-primary);
              margin: 0 0.3rem;
              font-size: 1.4rem;
              vertical-align: middle;
              animation: pulse 2s infinite;
            }
          }
          
          .copyright {
            font-size: 1.4rem;
            color: var(--color-text-lighter);
          }
        }
        
        /* Scroll to Top Button */
        .scroll-to-top {
          position: fixed;
          bottom: 2.5rem;
          right: 2.5rem;
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
          background-color: var(--color-primary);
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: var(--transition);
          z-index: 99;
          -webkit-tap-highlight-color: transparent;
          
          .icon {
            font-size: 1.8rem;
            animation: bounce 2s infinite;
          }
          
          &:hover {
            background-color: var(--color-primary-dark);
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
          }
          
          &:active {
            transform: translateY(0);
          }
          
          &:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.5);
          }
        }
        
        /* Animations */
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
          60% { transform: translateY(-3px); }
        }
        
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        
        /* Responsive Adjustments */
        @media (max-width: 992px) {
          .desktop-nav {
            display: none;
          }
          
          .navbar {
            .container {
              padding: 0 1.5rem;
            }
          }
        }
        
        @media (max-width: 768px) {
          :root {
            --header-height: 60px;
            --footer-height: 180px;
          }
          
          .footer {
            padding: 3rem 0;
            
            .footer-logo {
              font-size: 2.2rem;
              
              .heart-icon {
                font-size: 2rem;
              }
            }
          }
        }
        
        @media (max-width: 480px) {
          :root {
            --header-height: 55px;
            --footer-height: 160px;
          }
          
          .scroll-to-top {
            width: 4.5rem;
            height: 4.5rem;
            bottom: 2rem;
            right: 2rem;
            
            .icon {
              font-size: 1.6rem;
            }
          }
          
          .footer {
            .footer-logo {
              font-size: 2rem;
              
              .heart-icon {
                font-size: 1.8rem;
              }
            }
            
            .footer-text {
              font-size: 1.5rem;
            }
            
            .copyright {
              font-size: 1.3rem;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
