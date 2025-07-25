import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { fadeIn, slideInLeft, slideInRight, float, Sparkle } from '../../utils/animations';

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);

  // Show scroll prompt after letter is opened
  const handleOpenLetter = () => {
    setIsOpen(true);
    setTimeout(() => {
      setShowScrollPrompt(true);
    }, 2000);
  };

  // Scroll down to reveal more content
  const scrollDown = () => {
    const letterContent = document.querySelector('.letter-content');
    if (letterContent) {
      letterContent.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="love-letter-section" id="love-letter">
      <div className="container">
        <div className="background-decorations">
          <div className="decorative-element decorative-element-1"></div>
          <div className="decorative-element decorative-element-2"></div>
          <div className="decorative-element decorative-element-3"></div>
          <div className="decorative-element decorative-element-4"></div>
          <div className="decorative-element decorative-element-5"></div>
        </div>

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
            A Letter For You
          </motion.span>
          <motion.h2 
            className="section-title"
            variants={slideInLeft}
          >
            My Dearest Love
          </motion.h2>
          <motion.div 
            className="section-divider"
            variants={slideInRight}
          >
            <div className="divider-line"></div>
          </motion.div>
        </motion.div>

        <div className="envelope-container">
          <AnimatePresence>
            {!isOpen ? (
              <motion.div
                className="envelope-closed"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: -50 }}
                transition={{ duration: 0.6, ease: "backOut" }}
                onClick={handleOpenLetter}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <div className="button-container">
                  <button className="open-button" onClick={handleOpenLetter}>
                    Open My Love Letter
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="letter-container"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.6, ease: "backOut" }}
              >
                <div className="letter">
                  <div className="letter-content">
                    <div className="letter-header">
                      <span className="date">July 21, 2025</span>
                      <h3>My Dearest Love,</h3>
                    </div>
                    
                    <div className="letter-body">
                      <p>
                        As I sit down to write this letter, my heart is filled with so much love and gratitude for you. 
                        These past 11 months with you have been nothing short of magical. Every moment spent with you 
                        feels like a beautiful dream that I never want to wake up from.
                      </p>
                      <p>
                        Your smile lights up my world, and your laughter fills my heart with joy. I cherish every memory 
                        we've created together, from our first date to our most recent adventures. You make me feel 
                        seen, heard, and loved in ways I never thought possible.
                      </p>
                      <p>
                        I am so grateful for your kindness, your strength, and your unwavering love. You are my partner, 
                        my best friend, and my everything. I can't wait to see what the future holds for us, because 
                        I know that as long as we're together, anything is possible.
                      </p>
                      <p>
                        I still remember the first time we met like it was yesterday. Your smile lit up the room, and 
                        I knew right then that there was something special about you. Little did I know that you would 
                        become the most important person in my life.
                      </p>
                      <p>
                        You've brought so much joy, laughter, and love into my life. Your kindness, your strength, 
                        and your beautiful heart inspire me every single day. You make me want to be a better person, 
                        and I'm so grateful to have you by my side.
                      </p>
                      <p>
                        Through all the ups and downs, you've been my rock. Your support means the world to me, and 
                        I hope you know how much I appreciate you. You're my best friend, my partner in crime, and 
                        the love of my life.
                      </p>
                      <p>
                        As we celebrate 11 months together, I want you to know that my love for you grows stronger 
                        with each passing day. I can't wait to create many more beautiful memories with you and 
                        continue this incredible journey together.
                      </p>
                      <p>
                        Thank you for being you, for loving me, and for making every day brighter just by being in it. 
                        I love you more than words could ever express.
                      </p>
                      <p className="signature">
                        Forever yours,<br />
                        <span>Me</span>
                      </p>
                    </div>
                    
                    <div className="letter-footer">
                      <span>11 Months & Counting</span>
                    </div>
                  </div>
                  
                  <div className="envelope-back"></div>
                </div>
                
                {/* Romantic background elements */}
                <div className="letter-decorations">
                  <div className="floating-hearts">
                  </div>
                </div>

                {/* Scroll prompt */}
                {showScrollPrompt && (
                  <motion.div
                    className="scroll-prompt"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={scrollDown}
                  >
                    <span>Continue reading...</span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Decorative elements */}
          <motion.div 
            className="decoration heart-1"
            animate={float}
          >
            
          </motion.div>
          <motion.div 
            className="decoration heart-2"
            animate={{
              ...float,
              transition: { ...float.transition, delay: 0.5 }
            }}
          >
            
          </motion.div>
        </div>
      </div>
      
      <style jsx>{`
        .love-letter {
          position: relative;
          background: linear-gradient(135deg, #fff0f5 0%, #f8f9fa 100%);
          overflow: hidden;
          min-height: calc(100vh - 4rem);
          display: flex;
          align-items: center;
          padding: 4rem 0;
          background-image: radial-gradient(circle at 20% 30%, rgba(255, 107, 157, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 70%, rgba(255, 107, 157, 0.1) 0%, transparent 50%);
        }

        @media (max-width: 768px) {
          .love-letter {
            padding: 2rem 0;
            min-height: calc(100vh - 2rem);
          }

          .section-header {
            margin-bottom: 4rem;
          }

          .section-subtitle {
            font-size: 1.5rem;
          }

          .section-title {
            font-size: 4rem;
          }

          .open-button {
            padding: 2rem 4rem;
            font-size: 1.8rem;
          }

          .letter-container {
            padding: 2rem;
          }

          .letter {
            padding: 2rem;
          }

          .letter-header {
            margin-bottom: 2rem;
          }

          .letter-header h3 {
            font-size: 2rem;
          }

          .letter-body {
            font-size: 1.4rem;
            line-height: 1.6;
          }

          .letter-footer {
            padding-top: 1rem;
            font-size: 1.2rem;
          }
        }
        
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }

        .background-decorations {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        }

        .decorative-element {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: rgba(255, 107, 157, 0.1);
          filter: blur(100px);
        }

        .decorative-element-1 { top: 10%; left: 10%; }
        .decorative-element-2 { bottom: 20%; right: 10%; }
        .decorative-element-3 { top: 40%; left: 5%; }
        .decorative-element-4 { bottom: 30%; left: 30%; }
        .decorative-element-5 { top: 60%; right: 20%; }
        
        .section-header {
          text-align: center;
          margin-bottom: 6rem;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .section-subtitle {
          display: block;
          font-size: 2rem;
          color: var(--color-pink);
          margin-bottom: 1rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 2px;
          background: linear-gradient(135deg, var(--color-pink) 0%, var(--color-pink-dark) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-title {
          font-size: 5.6rem;
          color: var(--color-pink-dark);
          margin-bottom: 2rem;
          font-family: 'Dancing Script', cursive;
          line-height: 1.2;
          background: linear-gradient(135deg, var(--color-pink-dark) 0%, var(--color-pink) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
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
          font-size: 5.6rem;
          color: var(--color-pink-dark);
          margin-bottom: 2rem;
          font-family: 'Dancing Script', cursive;
          line-height: 1.2;
        }
        
        .section-divider {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }
        
        .divider-line {
          width: 100px;
          height: 2px;
          background: linear-gradient(135deg, var(--color-pink) 0%, var(--color-pink-dark) 100%);
          border-radius: 2px;
        }
        
        .envelope-container {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
          perspective: 2000px;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .envelope-closed {
          position: relative;
          width: 100%;
          max-width: 400px;
          height: 300px;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.6s ease;
        }
        
        .envelope-closed:hover {
          transform: translateY(-10px);
        }
        
        .envelope-front {
          position: absolute;
          width: 100%;
          height: 100%;
          background: var(--color-pink);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: translateZ(20px);
          box-shadow: 0 10px 30px rgba(255, 107, 157, 0.3);
          overflow: hidden;
        }
        
        .envelope-icon {
          font-size: 6rem;
          color: white;
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }
        
        .envelope-flap {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          border-left: 200px solid transparent;
          border-right: 200px solid transparent;
          border-top: 150px solid var(--color-pink-dark);
          transform-origin: top;
          transition: transform 0.6s ease;
          z-index: 1;
        }
        
        .envelope-closed:hover .envelope-flap {
          transform: rotateX(180deg);
        }
        
        .envelope-details {
          position: absolute;
          bottom: 2rem;
          left: 0;
          width: 100%;
          padding: 0 2rem;
          color: white;
          text-align: left;
          z-index: 2;
        }
        
        .envelope-details .to,
        .envelope-details .from {
          display: block;
          font-size: 1.6rem;
          margin: 0.5rem 0;
          font-weight: 500;
        }
        
        .open-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, var(--color-pink) 0%, var(--color-pink-dark) 100%);
          color: white;
          padding: 2.5rem 5rem;
          border-radius: 50px;
          font-size: 2.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(255, 107, 157, 0.3);
          border: none;
          outline: none;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .open-button:hover {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 18px 36px rgba(255, 107, 157, 0.4);
        }
        
        .letter-container {
          position: relative;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          perspective: 2000px;
        }
        
        .letter {
          position: relative;
          width: 100%;
          background: white;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 4rem;
          transform-style: preserve-3d;
          transform: rotateX(5deg) rotateY(5deg);
          transition: transform 0.6s ease, box-shadow 0.6s ease;
        }
        
        .letter:hover {
          transform: rotateX(0) rotateY(0);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }
        
        .letter-content {
          position: relative;
          z-index: 2;
        }
        
        .letter-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .letter-header .date {
          display: block;
          font-size: 1.4rem;
          color: var(--color-text-secondary);
          margin-bottom: 1rem;
        }
        
        .letter-header h3 {
          font-size: 2.8rem;
          color: var(--color-pink-dark);
          margin: 0;
          font-family: 'Dancing Script', cursive;
        }
        
        .letter-body {
          font-size: 1.6rem;
          line-height: 1.8;
          color: var(--color-text-primary);
          margin-bottom: 3rem;
        }
        
        .letter-body p {
          margin-bottom: 1.5rem;
        }
        
        .signature {
          margin-top: 3rem;
          font-style: italic;
          font-size: 1.8rem;
          text-align: right;
        }
        
        .signature span {
          display: inline-block;
          margin-top: 1rem;
          font-family: 'Dancing Script', cursive;
          font-size: 2.4rem;
          color: var(--color-pink-dark);
        }
        
        .letter-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #f0f0f0;
          color: var(--color-pink);
          font-size: 1.6rem;
          font-weight: 500;
        }
        
        .envelope-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #fff9fb 0%, #fff0f5 100%);
          border-radius: 8px;
          transform: translateZ(-20px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .scroll-prompt {
          position: absolute;
          bottom: -6rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--color-pink-dark);
          font-size: 1.4rem;
          font-weight: 500;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.3s ease;
          animation: bounce 2s infinite;
        }
        
        .scroll-prompt:hover {
          opacity: 1;
        }
        
        .scroll-prompt .arrow-icon {
          margin-top: 0.5rem;
          font-size: 1.6rem;
        }
        

        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
          40% { transform: translateY(-10px) translateX(-50%); }
          60% { transform: translateY(-5px) translateX(-50%); }
        }
        
        @media (max-width: 767px) {
          .love-letter {
            padding: 6rem 0;
          }
          
          .section-title {
            font-size: 3.6rem;
          }
          
          .letter {
            padding: 3rem 2rem;
          }
          
          .letter-body {
            font-size: 1.5rem;
          }
          
          .signature {
            font-size: 1.6rem;
          }
          
          .signature span {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 480px) {
          .section-title {
            font-size: 3rem;
          }
          
          .letter-header h3 {
            font-size: 2.4rem;
          }
          
          .letter-body {
            font-size: 1.4rem;
          }
          
          .signature {
            font-size: 1.5rem;
          }
          
          .signature span {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default LoveLetter;
