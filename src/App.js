import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { fadeIn, float } from './utils/animations';

// Components
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import LoveLetter from './components/LoveLetter/LoveLetter';
import PhotoGallery from './components/PhotoGallery/PhotoGallery';
import Playlist from './components/Playlist/Playlist';
import Timeline from './components/Timeline/Timeline';
import HiddenSurprise from './components/HiddenSurprise/HiddenSurprise';
import Countdown from './components/Countdown/Countdown';

// Assets
import { FaHeart, FaMusic, FaImages, FaEnvelope, FaList, FaHistory, FaStar } from 'react-icons/fa';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);
  const launchDate = new Date('August 14, 2025 00:00:00');

  // Check if we've reached the launch date
  useEffect(() => {
    const checkLaunchDate = () => {
      const now = new Date();
      setIsLaunched(now >= launchDate);
    };
    
    checkLaunchDate();
    const timer = setInterval(checkLaunchDate, 60000); // Check every minute
    
    return () => clearInterval(timer);
  }, []);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Show countdown if not launched yet
  if (!isLaunched) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Countdown onCountdownEnd={() => setIsLaunched(true)} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <div className="App">
          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <main>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/love-letter" element={<LoveLetter />} />
                <Route path="/gallery" element={<PhotoGallery />} />
                <Route path="/playlist" element={<Playlist />} />
          
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/surprise" element={<HiddenSurprise />} />
              </Routes>
            </AnimatePresence>
          </main>



          {/* Scroll to Top Button */}
          {showScrollTop && (
            <motion.button
              className="scroll-top"
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaHeart />
            </motion.button>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
