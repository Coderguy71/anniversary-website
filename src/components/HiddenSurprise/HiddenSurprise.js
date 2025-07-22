import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaLock, FaLockOpen, FaGift, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { fadeIn, slideInLeft, slideInRight, float, heartBeat } from '../../utils/animations';

const HiddenSurprise = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  
  // Messages to show as the user clicks the lock
  const clickMessages = [
    "Hmm... what could this be?",
    "Keep going...",
    "You're getting warmer!",
    "Just a few more clicks...",
    "Almost there!",
    "One last time!"
  ];
  
  // Handle click on the lock
  const handleLockClick = () => {
    if (clicks < 5) {
      setClicks(prev => prev + 1);
      
      // Add a little bounce effect
      const lock = document.querySelector('.lock-icon');
      if (lock) {
        lock.style.transform = 'scale(1.2)';
        setTimeout(() => {
          lock.style.transform = 'scale(1)';
        }, 200);
      }
      
      // Unlock on the 6th click
      if (clicks === 4) {
        setTimeout(() => {
          setIsUnlocked(true);
          setShowHearts(true);
          
          // Auto-open after a short delay
          setTimeout(() => {
            setShowMessage(true);
          }, 1000);
        }, 300);
      }
    }
  };
  
  // Reset the surprise
  const resetSurprise = () => {
    setIsUnlocked(false);
    setShowMessage(false);
    setClicks(0);
    setShowHearts(false);
  };
  
  // Floating hearts effect
  const renderHearts = () => {
    if (!showHearts) return null;
    
    return (
      <div className="floating-hearts">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="heart"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              opacity: 0,
              position: 'absolute',
              color: ['#FF6B9D', '#F15BB5', '#FF9E00', '#4CC9F0'][Math.floor(Math.random() * 4)],
              zIndex: 1,
            }}
            animate={{
              y: [0, -100],
              x: [(Math.random() - 0.5) * 100],
              opacity: [0, 0.8, 0],
              rotate: [0, Math.random() * 360],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut'
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
    );
  };
  
  return (
    <section className="surprise-section" id="surprise">
      <div className="container">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <motion.span 
            className="section-subtitle"
            variants={fadeIn}
          >
            Special Surprise
          </motion.span>
          <motion.h2 
            className="section-title"
            variants={slideInLeft}
          >
            For You, My Love
          </motion.h2>
          <motion.div 
            className="section-divider"
            variants={slideInRight}
          >
            <FaGift className="gift-icon" />
          </motion.div>
        </motion.div>
        
        <div className="surprise-container">
          <AnimatePresence mode="wait">
            {!isUnlocked ? (
              <motion.div 
                className="lock-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="lock-wrapper"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLockClick}
                >
                  <div className="lock">
                    {isUnlocked ? (
                      <FaLockOpen className="lock-icon" />
                    ) : (
                      <FaLock className="lock-icon" />
                    )}
                  </div>
                  <p className="click-hint">
                    {clicks < clickMessages.length ? clickMessages[clicks] : clickMessages[clickMessages.length - 1]}
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <AnimatePresence>
                {showMessage && (
                  <motion.div 
                    className="message-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <div className="message-box">
                      <FaQuoteLeft className="quote quote-left" />
                      <div className="message-content">
                        <h3>To My Beautiful Girlfriend,</h3>
                        <p>
                          As we celebrate 11 amazing months together, I wanted to create something special to show you just how much you mean to me. 
                          Every moment with you feels like a dream, and I fall more in love with you each day.
                        </p>
                        <p>
                          Thank you for your love, your laughter, and for being you. You've brought so much joy and 
                          happiness into my life, and I can't wait to create countless more memories together.
                        </p>
                        <p>
                          I love you more than words can express, more than any website could ever show. 
                          Here's to us, and to many more months and years of love and happiness together.
                        </p>
                        <div className="signature">
                          <p>Forever yours,</p>
                          <p className="name">[Your Name]</p>
                        </div>
                      </div>
                      <FaQuoteRight className="quote quote-right" />
                      
                      <button 
                        className="reset-button"
                        onClick={resetSurprise}
                      >
                        Click to Relive the Magic
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {!showMessage && (
                  <motion.div 
                    className="unlocked-container"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="heart-beat"
                      variants={heartBeat}
                      initial="hidden"
                      animate="visible"
                    >
                      <FaHeart className="heart-icon" />
                    </motion.div>
                    <p className="unlocked-text">Click to open your surprise!</p>
                    <button 
                      className="open-button"
                      onClick={() => setShowMessage(true)}
                    >
                      Open
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Floating hearts */}
      {renderHearts()}
      
      <style jsx>{`
        .surprise-section {
          position: relative;
          min-height: 80vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #fff0f5 0%, #f8f9fa 100%);
          padding: 8rem 0;
          overflow: hidden;
        }
        
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 6rem;
        }
        
        .section-subtitle {
          display: block;
          font-size: 1.8rem;
          color: var(--color-pink);
          margin-bottom: 1rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .section-title {
          font-size: 4.2rem;
          color: var(--color-pink-dark);
          margin-bottom: 2rem;
          font-family: 'Dancing Script', cursive;
        }
        
        .section-divider {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }
        
        .gift-icon {
          color: var(--color-pink);
          font-size: 2.4rem;
          animation: pulse 2s infinite;
        }
        
        .surprise-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
          position: relative;
          z-index: 2;
        }
        
        .lock-container {
          text-align: center;
        }
        
        .lock-wrapper {
          display: inline-block;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .lock {
          width: 100px;
          height: 100px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 2px solid #f0f0f0;
          transition: all 0.3s ease;
        }
        
        .lock-icon {
          font-size: 3.5rem;
          color: var(--color-pink);
          transition: all 0.3s ease;
        }
        
        .click-hint {
          font-size: 1.6rem;
          color: var(--color-text-secondary);
          margin-top: 1.5rem;
          font-style: italic;
          min-height: 2.4rem;
        }
        
        .unlocked-container {
          text-align: center;
        }
        
        .heart-beat {
          margin: 0 auto 2rem;
        }
        
        .heart-icon {
          font-size: 8rem;
          color: var(--color-pink);
          cursor: pointer;
        }
        
        .unlocked-text {
          font-size: 2rem;
          color: var(--color-pink-dark);
          margin-bottom: 2rem;
          font-family: 'Dancing Script', cursive;
        }
        
        .open-button {
          background: linear-gradient(45deg, var(--color-pink), var(--color-pink-dark));
          color: white;
          border: none;
          padding: 1.2rem 3rem;
          font-size: 1.6rem;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          box-shadow: 0 5px 15px rgba(255, 107, 157, 0.3);
          transition: all 0.3s ease;
        }
        
        .open-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 107, 157, 0.4);
        }
        
        .open-button:active {
          transform: translateY(1px);
        }
        
        .message-container {
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
        }
        
        .message-box {
          background: white;
          border-radius: 15px;
          padding: 4rem;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
          position: relative;
          border: 1px solid rgba(255, 107, 157, 0.2);
        }
        
        .quote {
          position: absolute;
          font-size: 5rem;
          color: rgba(255, 107, 157, 0.1);
        }
        
        .quote-left {
          top: 20px;
          left: 20px;
        }
        
        .quote-right {
          bottom: 20px;
          right: 20px;
        }
        
        .message-content {
          position: relative;
          z-index: 1;
        }
        
        .message-content h3 {
          font-size: 2.4rem;
          color: var(--color-pink-dark);
          margin-bottom: 2rem;
          font-family: 'Dancing Script', cursive;
        }
        
        .message-content p {
          font-size: 1.6rem;
          color: var(--color-text-secondary);
          line-height: 1.8;
          margin-bottom: 1.8rem;
        }
        
        .signature {
          margin-top: 3rem;
          text-align: right;
        }
        
        .signature p {
          margin: 0;
          font-size: 1.6rem;
          color: var(--color-text-secondary);
        }
        
        .signature .name {
          font-family: 'Dancing Script', cursive;
          font-size: 2.4rem;
          color: var(--color-pink-dark);
          margin-top: 0.5rem;
        }
        
        .reset-button {
          display: block;
          margin: 3rem auto 0;
          background: none;
          border: 2px solid var(--color-pink);
          color: var(--color-pink);
          padding: 1rem 2rem;
          font-size: 1.4rem;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .reset-button:hover {
          background: var(--color-pink);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 157, 0.3);
        }
        
        .floating-hearts {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-100vh) rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @media (max-width: 768px) {
          .section-title {
            font-size: 3.6rem;
          }
          
          .message-box {
            padding: 3rem 2rem;
          }
          
          .message-content h3 {
            font-size: 2.2rem;
          }
          
          .message-content p {
            font-size: 1.5rem;
          }
          
          .quote {
            font-size: 4rem;
          }
          
          .signature .name {
            font-size: 2.2rem;
          }
        }
        
        @media (max-width: 480px) {
          .section-title {
            font-size: 3rem;
          }
          
          .section-subtitle {
            font-size: 1.6rem;
          }
          
          .lock {
            width: 80px;
            height: 80px;
          }
          
          .lock-icon {
            font-size: 3rem;
          }
          
          .click-hint {
            font-size: 1.4rem;
          }
          
          .heart-icon {
            font-size: 6rem;
          }
          
          .unlocked-text {
            font-size: 1.8rem;
          }
          
          .message-box {
            padding: 2.5rem 1.5rem;
          }
          
          .message-content h3 {
            font-size: 2rem;
          }
          
          .message-content p {
            font-size: 1.4rem;
          }
          
          .quote {
            font-size: 3rem;
          }
          
          .signature .name {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HiddenSurprise;
