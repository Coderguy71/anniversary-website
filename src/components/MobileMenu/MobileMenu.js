import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaBars, FaHeart, FaHome, FaEnvelope, FaImages, FaMusic, FaListUl, FaHistory, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeIn, slideInRight } from '../../utils/animations';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          !event.target.closest('.mobile-menu-button')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  // Menu items
  const menuItems = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/love-letter', label: 'Love Letter', icon: <FaEnvelope /> },
    { to: '/gallery', label: 'Our Photos', icon: <FaImages /> },
    { to: '/playlist', label: 'Our Playlist', icon: <FaMusic /> },
    { to: '/surprise', label: 'Special Surprise', icon: <FaStar /> },
  ];
  
  return (
    <div className="mobile-menu-container">
      {/* Mobile menu button */}
      <button 
        className={`mobile-menu-button ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <FaTimes className="menu-icon" />
        ) : (
          <FaBars className="menu-icon" />
        )}
      </button>
      
      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
            />
            
            <motion.div 
              ref={menuRef}
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="mobile-menu-header">
                <FaHeart className="menu-heart" />
                <h3>Our Love Story</h3>
                <button 
                  className="close-button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>
              
              <nav className="mobile-nav">
                <ul>
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.to}
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      custom={index * 0.1}
                      onClick={closeMenu}
                    >
                      <Link to={item.to} className="mobile-nav-link">
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              <div className="mobile-menu-footer">
                <p>Made with <FaHeart className="heart-icon" /> for you</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <style jsx>{`
        .mobile-menu-container {
          display: none;
          position: relative;
          z-index: 1000;
        }
        
        .mobile-menu-button {
          display: none;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--color-pink);
          color: white;
          border: none;
          cursor: pointer;
          position: fixed;
          bottom: 25px;
          right: 25px;
          z-index: 1001;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          -webkit-tap-highlight-color: transparent;
        }
        
        .mobile-menu-button:hover {
          background: var(--color-pink-dark);
          transform: scale(1.1);
        }
        
        .mobile-menu-button:active {
          transform: scale(0.95);
        }
        
        .mobile-menu-button.open {
          background: var(--color-pink-dark);
        }
        
        .menu-icon {
          font-size: 1.8rem;
          transition: transform 0.3s ease;
        }
        
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          z-index: 999;
        }
        
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 85%;
          max-width: 350px;
          height: 100vh;
          background: white;
          box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        
        .mobile-menu-header {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          position: relative;
          background: linear-gradient(135deg, #fff0f5 0%, #fff9fb 100%);
        }
        
        .menu-heart {
          color: var(--color-pink);
          font-size: 2rem;
          margin-right: 1rem;
          animation: pulse 2s infinite;
        }
        
        .mobile-menu-header h3 {
          margin: 0;
          font-size: 1.8rem;
          color: var(--color-pink-dark);
          font-family: 'Dancing Script', cursive;
        }
        
        .close-button {
          position: absolute;
          top: 50%;
          right: 1.5rem;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-size: 1.8rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .close-button:hover {
          color: var(--color-pink);
          background: rgba(255, 107, 157, 0.1);
        }
        
        .mobile-nav {
          flex: 1;
          padding: 2rem 0;
          overflow-y: auto;
        }
        
        .mobile-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .mobile-nav li {
          margin: 0.5rem 0;
          opacity: 0;
        }
        
        .mobile-nav-link {
          display: flex;
          align-items: center;
          padding: 1.2rem 2rem;
          color: var(--color-text-primary);
          text-decoration: none;
          font-size: 1.6rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .mobile-nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: var(--color-pink);
          transform: scaleY(0);
          transform-origin: center bottom;
          transition: transform 0.3s ease;
        }
        
        .mobile-nav-link:hover,
        .mobile-nav-link:focus {
          background: rgba(255, 107, 157, 0.05);
          color: var(--color-pink);
          outline: none;
        }
        
        .mobile-nav-link:hover::before,
        .mobile-nav-link:focus::before {
          transform: scaleY(1);
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
        
        .mobile-menu-footer {
          padding: 1.5rem 2rem;
          text-align: center;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          background: #f9f9f9;
        }
        
        .mobile-menu-footer p {
          margin: 0;
          font-size: 1.4rem;
          color: var(--color-text-light);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .heart-icon {
          color: var(--color-pink);
          margin: 0 0.5rem;
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @media (max-width: 992px) {
          .mobile-menu-container {
            display: block;
          }
          
          .mobile-menu-button {
            display: flex;
          }
        }
        
        @media (max-width: 480px) {
          .mobile-menu {
            width: 90%;
          }
          
          .mobile-menu-header h3 {
            font-size: 1.6rem;
          }
          
          .mobile-nav-link {
            padding: 1rem 1.5rem;
            font-size: 1.5rem;
          }
          
          .nav-icon {
            font-size: 1.6rem;
            margin-right: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileMenu;
