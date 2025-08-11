import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import { fadeIn } from '../utils/animations';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Love Letter', path: '/love-letter' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Game', path: '/game' },
    { name: 'Rewards', path: '/rewards' }
  ];

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="container">
        <Link to="/" className="logo">
          <FaHeart className="heart-icon" />
          <span>11 Months</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          {navLinks.map((link, index) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.span 
                  className="nav-underline"
                  layoutId="nav-underline"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-nav-links">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={link.path}
                    className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem 0;
          z-index: 1000;
          transition: all 0.3s ease;
          background: rgba(255, 249, 251, 0.95);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .navbar.scrolled {
          padding: 1rem 0;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .logo {
          display: flex;
          align-items: center;
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--color-pink-dark);
          text-decoration: none;
          font-family: 'Dancing Script', cursive;
        }

        .heart-icon {
          margin-right: 0.8rem;
          color: var(--color-pink);
          animation: pulse 2s infinite;
        }

        .desktop-nav {
          display: none;
        }

        .nav-link {
          position: relative;
          margin: 0 1.2rem;
          font-size: 1.6rem;
          color: var(--color-text-primary);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 0.5rem 0;
        }

        .nav-link:hover {
          color: var(--color-pink-dark);
        }

        .nav-link.active {
          color: var(--color-pink-dark);
          font-weight: 600;
        }

        .nav-underline {
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--color-pink);
          border-radius: 2px;
        }

        .mobile-menu-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          font-size: 2.4rem;
          color: var(--color-pink-dark);
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1001;
        }

        .mobile-nav {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: white;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          z-index: 999;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          padding: 1.5rem 2rem;
        }

        .mobile-nav-link {
          display: block;
          padding: 1.2rem 0;
          font-size: 1.6rem;
          color: var(--color-text-primary);
          text-decoration: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .mobile-nav-link:last-child {
          border-bottom: none;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: var(--color-pink-dark);
          padding-left: 1rem;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @media (min-width: 768px) {
          .desktop-nav {
            display: flex;
          }

          .mobile-menu-btn {
            display: none;
          }

          .mobile-nav {
            display: none;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
