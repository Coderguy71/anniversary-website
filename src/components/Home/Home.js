import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { fadeIn, slideInLeft, slideInRight, float, Sparkle, AnimatedText } from '../../utils/animations';

const Home = () => {
  const navigate = useNavigate();
  const [showHearts, setShowHearts] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  // Set current date
  useEffect(() => {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString('en-US', options));
    
    // Show hearts after initial animation
    const timer = setTimeout(() => {
      setShowHearts(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Floating hearts effect
  const renderHearts = () => {
    if (!showHearts) return null;
    
    return (
      <div className="floating-hearts">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="heart"
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              color: `hsl(${Math.random() * 30 + 330}, 100%, 70%)`,
              opacity: 0,
            }}
            animate={{
              y: ['100%', '-100%'],
              x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
              opacity: [0, 0.8, 0],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 3 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
    );
  };

  const handleScroll = () => {
    navigate('/love-letter');
  };

  return (
    <section className="home" id="home" onClick={handleScroll}>
      <div className="container">
        <div className="content">
          <motion.div 
            className="text-content"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <motion.div 
              className="date"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {currentDate}
            </motion.div>
            
            <motion.h1 
              className="title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <AnimatedText>Hi love</AnimatedText>{' '}
              <motion.span 
                className="heart-emoji"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 14, -8, 14, -4, 10, 0],
                }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                💖
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Welcome to our little corner of the internet.
            </motion.p>
            
            <motion.div 
              className="cta-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <a href="#letter" className="btn btn-primary">
                Read My Letter <FaArrowRight className="icon" />
              </a>
              <a href="#gallery" className="btn btn-secondary">
                Our Memories
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="image-wrapper">
              <div className="polaroid">
                <div className="polaroid-content">
                  <div className="placeholder-image">
                    <FaHeart className="placeholder-icon" />
                    <span>Our Photo</span>
                  </div>
                  <div className="polaroid-caption">Us 💕</div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="decoration heart-1"
                animate={float}
              >
                ❤️
              </motion.div>
              <motion.div 
                className="decoration heart-2"
                animate={{
                  ...float,
                  transition: { ...float.transition, delay: 0.5 }
                }}
              >
                💝
              </motion.div>
              <motion.div 
                className="decoration heart-3"
                animate={{
                  ...float,
                  transition: { ...float.transition, delay: 1 }
                }}
              >
                💖
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <motion.button 
          className="scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          onClick={handleScroll}
          style={{ 
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: '0',
            margin: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'var(--color-pink-dark)',
            fontSize: '1.4rem',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textDecoration: 'none'
          }}
        >
          <FaChevronDown style={{ marginBottom: '0.5rem' }} />
          <span>Scroll Down</span>
        </motion.button>
      </div>
      
      {showHearts && renderHearts()}
      
      <style jsx>{`
        .home {
          position: relative;
          background: linear-gradient(135deg, #fff9fb 0%, #fff0f5 100%);
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 8rem;
        }
        
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          position: relative;
          z-index: 1;
        }
        
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 4rem;
        }
        
        @media (min-width: 992px) {
          .content {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            text-align: left;
            gap: 2rem;
          }
        }
        
        .text-content {
          flex: 1;
          max-width: 600px;
        }
        
        .date {
          font-size: 1.4rem;
          color: var(--color-pink-dark);
          margin-bottom: 1.5rem;
          font-weight: 500;
        }
        
        .title {
          font-size: 4.8rem;
          margin-bottom: 1.5rem;
          color: var(--color-pink-dark);
          line-height: 1.2;
        }
        
        .heart-emoji {
          display: inline-block;
          margin-left: 1rem;
          transform-origin: center;
        }
        
        .subtitle {
          font-size: 2rem;
          color: var(--color-text-secondary);
          margin-bottom: 3rem;
          line-height: 1.6;
        }
        
        .cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 3rem;
        }
        
        @media (min-width: 576px) {
          .cta-buttons {
            flex-direction: row;
          }
        }
        
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1.2rem 2.4rem;
          border-radius: 50px;
          font-size: 1.6rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .btn-primary {
          background: var(--color-pink);
          color: white;
          border: 2px solid var(--color-pink);
        }
        
        .btn-primary:hover {
          background: var(--color-pink-dark);
          border-color: var(--color-pink-dark);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
        }
        
        .btn-secondary {
          background: transparent;
          color: var(--color-pink-dark);
          border: 2px solid var(--color-pink);
        }
        
        .btn-secondary:hover {
          background: rgba(255, 107, 157, 0.1);
          transform: translateY(-2px);
        }
        
        .icon {
          margin-left: 0.8rem;
          transition: transform 0.3s ease;
        }
        
        .btn:hover .icon {
          transform: translateX(3px);
        }
        
        .image-container {
          position: relative;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .image-wrapper {
          position: relative;
          width: 100%;
          padding-top: 100%;
        }
        
        .polaroid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: white;
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transform: rotate(3deg);
        }
        
        .polaroid-content {
          width: 100%;
          height: 100%;
          border: 1px solid #f0f0f0;
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .placeholder-image {
          flex: 1;
          background: #fff9fb;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--color-pink);
          font-size: 1.6rem;
          font-weight: 500;
        }
        
        .placeholder-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.6;
        }
        
        .polaroid-caption {
          padding: 1.5rem;
          text-align: center;
          font-family: 'Dancing Script', cursive;
          font-size: 2rem;
          color: var(--color-pink-dark);
          background: white;
          border-top: 1px solid #f0f0f0;
        }
        
        .decoration {
          position: absolute;
          font-size: 3rem;
          z-index: -1;
        }
        
        .heart-1 { top: -20px; left: -20px; }
        .heart-2 { bottom: 10%; right: -30px; }
        .heart-3 { top: 30%; right: 10%; }
        
        .scroll-indicator {
          position: absolute;
          bottom: 4rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--color-pink-dark);
          font-size: 1.4rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
        }
        
        .scroll-indicator .icon {
          margin: 0.5rem 0 0;
          animation: bounce 2s infinite;
        }
        
        .floating-hearts {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @media (max-width: 767px) {
          .title {
            font-size: 3.6rem;
          }
          
          .subtitle {
            font-size: 1.8rem;
          }
          
          .decoration {
            font-size: 2.4rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Home;
