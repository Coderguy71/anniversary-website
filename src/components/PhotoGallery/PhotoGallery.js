import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaChevronLeft, FaChevronRight, FaTimes, FaCamera } from 'react-icons/fa';
import { fadeIn, slideInLeft, slideInRight, float } from '../../utils/animations';

// Sample photo data - replace with your actual photos and captions
const photos = [
  {
    id: 1,
    src: 'https://source.unsplash.com/random/800x600/?couple,love',
    caption: 'Our first date 💫',
    date: 'Aug 23, 2024'
  },
  {
    id: 2,
    src: 'https://source.unsplash.com/random/800x600/?beach,sunset,couple',
    caption: 'Beach day together 🌅',
    date: 'Sep 15, 2024'
  },
  {
    id: 3,
    src: 'https://source.unsplash.com/random/800x600/?dinner,romantic',
    caption: 'Anniversary dinner 🍽️',
    date: 'Oct 10, 2024'
  },
  {
    id: 4,
    src: 'https://source.unsplash.com/random/800x600/?winter,snow,couple',
    caption: 'First snow of the year ❄️',
    date: 'Dec 5, 2024'
  },
  {
    id: 5,
    src: 'https://source.unsplash.com/random/800x600/?valentine,romantic',
    caption: 'Valentine\'s Day 💘',
    date: 'Feb 14, 2025'
  },
  {
    id: 6,
    src: 'https://source.unsplash.com/random/800x600/?spring,park,couple',
    caption: 'Spring picnic 🌸',
    date: 'Apr 2, 2025'
  },
  {
    id: 7,
    src: 'https://source.unsplash.com/random/800x600/?summer,vacation,couple',
    caption: 'Summer getaway 🌴',
    date: 'Jun 15, 2025'
  },
  {
    id: 8,
    src: 'https://source.unsplash.com/random/800x600/?adventure,couple,mountains',
    caption: 'Mountain adventure ⛰️',
    date: 'Jul 4, 2025'
  }
];

const PhotoGallery = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const openLightbox = (id, index) => {
    setSelectedId(id);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };
  
  const closeLightbox = () => {
    setSelectedId(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };
  
  const navigate = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? photos.length - 1 : prevIndex - 1
      );
    } else {
      setCurrentIndex((prevIndex) => 
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  const selectedPhoto = photos.find(photo => photo.id === selectedId);
  
  return (
    <section className="photo-gallery" id="gallery">
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
            Our Memories
          </motion.span>
          <motion.h2 
            className="section-title"
            variants={slideInLeft}
          >
            Photo Gallery
          </motion.h2>
          <motion.div 
            className="section-divider"
            variants={slideInRight}
          >
            <FaHeart className="heart-icon" />
          </motion.div>
        </motion.div>
        
        <div className="gallery-grid">
          {photos.map((photo, index) => (
            <motion.div 
              key={photo.id}
              className="polaroid-wrapper"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openLightbox(photo.id, index)}
            >
              <div className="polaroid">
                <div className="polaroid-image">
                  <img 
                    src={photo.src} 
                    alt={photo.caption} 
                    loading="lazy"
                  />
                </div>
                <div className="polaroid-caption">
                  <span>{photo.caption}</span>
                  <span className="polaroid-date">{photo.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="lightbox-close"
                onClick={closeLightbox}
                aria-label="Close"
              >
                <FaTimes />
              </button>
              
              <div className="lightbox-navigation">
                <button 
                  className="nav-button prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('prev');
                  }}
                  aria-label="Previous photo"
                >
                  <FaChevronLeft />
                </button>
                
                <div className="lightbox-image-container">
                  <motion.img 
                    key={currentIndex}
                    src={photos[currentIndex].src}
                    alt={photos[currentIndex].caption}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="lightbox-caption">
                    <h3>{photos[currentIndex].caption}</h3>
                    <p>{photos[currentIndex].date}</p>
                  </div>
                </div>
                
                <button 
                  className="nav-button next"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('next');
                  }}
                  aria-label="Next photo"
                >
                  <FaChevronRight />
                </button>
              </div>
              
              <div className="lightbox-thumbnails">
                {photos.map((photo, index) => (
                  <div 
                    key={photo.id}
                    className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                  >
                    <img 
                      src={photo.src} 
                      alt={photo.caption} 
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
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
        📸
      </motion.div>
      
      <style jsx>{`
        .photo-gallery {
          position: relative;
          background: linear-gradient(135deg, #f8f9fa 0%, #f0f9f0 100%);
          padding: 8rem 0;
          overflow: hidden;
        }
        
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
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
        
        .heart-icon {
          color: var(--color-pink);
          font-size: 2.4rem;
          animation: pulse 2s infinite;
        }
        
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 3rem;
          margin-top: 4rem;
        }
        
        .polaroid-wrapper {
          perspective: 1000px;
          cursor: pointer;
        }
        
        .polaroid {
          background: white;
          padding: 1.5rem 1.5rem 3rem;
          border-radius: 4px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transform: rotate(0);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .polaroid-wrapper:hover .polaroid {
          transform: rotate(-1deg) translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .polaroid:nth-child(even) {
          transform: rotate(1deg);
        }
        
        .polaroid-wrapper:nth-child(odd):hover .polaroid {
          transform: rotate(1deg) translateY(-5px);
        }
        
        .polaroid-image {
          width: 100%;
          padding-top: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 2px;
          background: #f5f5f5;
        }
        
        .polaroid-image img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .polaroid-wrapper:hover .polaroid-image img {
          transform: scale(1.05);
        }
        
        .polaroid-caption {
          margin-top: 1.5rem;
          text-align: center;
          font-family: 'Dancing Script', cursive;
          color: var(--color-pink-dark);
          font-size: 1.8rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        
        .polaroid-date {
          font-size: 1.2rem;
          color: var(--color-text-secondary);
          margin-top: 0.5rem;
          font-family: 'Poppins', sans-serif;
          opacity: 0.8;
        }
        
        /* Lightbox Styles */
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }
        
        .lightbox-content {
          position: relative;
          max-width: 1000px;
          width: 100%;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
        }
        
        .lightbox-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(0, 0, 0, 0.5);
          border: none;
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.8rem;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
        }
        
        .lightbox-close:hover {
          background: var(--color-pink);
          transform: rotate(90deg);
        }
        
        .lightbox-navigation {
          display: flex;
          align-items: center;
          position: relative;
          height: 70vh;
          max-height: 700px;
        }
        
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          border: none;
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          z-index: 5;
          transition: all 0.3s ease;
        }
        
        .nav-button:hover {
          background: var(--color-pink);
          transform: translateY(-50%) scale(1.1);
        }
        
        .nav-button.prev {
          left: 2rem;
        }
        
        .nav-button.next {
          right: 2rem;
        }
        
        .lightbox-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .lightbox-image-container img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        
        .lightbox-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          color: white;
          padding: 3rem 2rem 2rem;
          text-align: center;
        }
        
        .lightbox-caption h3 {
          font-size: 2.4rem;
          margin-bottom: 0.5rem;
          font-family: 'Dancing Script', cursive;
        }
        
        .lightbox-caption p {
          font-size: 1.4rem;
          opacity: 0.9;
        }
        
        .lightbox-thumbnails {
          display: flex;
          padding: 1.5rem;
          overflow-x: auto;
          background: #f5f5f5;
          gap: 1rem;
        }
        
        .thumbnail {
          width: 60px;
          height: 60px;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          opacity: 0.7;
          transition: all 0.3s ease;
          flex-shrink: 0;
          border: 2px solid transparent;
        }
        
        .thumbnail:hover {
          opacity: 1;
          transform: translateY(-3px);
        }
        
        .thumbnail.active {
          opacity: 1;
          border-color: var(--color-pink);
        }
        
        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Decorative elements */
        .decoration {
          position: absolute;
          font-size: 3rem;
          z-index: 0;
          pointer-events: none;
        }
        
        .heart-1 { top: 10%; left: 5%; }
        .heart-2 { bottom: 10%; right: 5%; }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @media (max-width: 992px) {
          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 2.5rem;
          }
          
          .lightbox-navigation {
            height: 60vh;
          }
          
          .lightbox-caption h3 {
            font-size: 2rem;
          }
          
          .lightbox-caption p {
            font-size: 1.2rem;
          }
        }
        
        @media (max-width: 768px) {
          .section-title {
            font-size: 3.6rem;
          }
          
          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 2rem;
          }
          
          .polaroid-caption {
            font-size: 1.6rem;
          }
          
          .nav-button {
            width: 4rem;
            height: 4rem;
            font-size: 1.6rem;
          }
          
          .lightbox-caption h3 {
            font-size: 1.8rem;
          }
          
          .lightbox-caption p {
            font-size: 1.1rem;
          }
        }
        
        @media (max-width: 576px) {
          .section-title {
            font-size: 3rem;
          }
          
          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 1.5rem;
          }
          
          .polaroid {
            padding: 1rem 1rem 2.5rem;
          }
          
          .polaroid-caption {
            font-size: 1.4rem;
            margin-top: 1rem;
          }
          
          .lightbox-navigation {
            height: 50vh;
          }
          
          .lightbox-caption {
            padding: 2rem 1.5rem 1.5rem;
          }
          
          .lightbox-caption h3 {
            font-size: 1.6rem;
            margin-bottom: 0.3rem;
          }
          
          .lightbox-caption p {
            font-size: 1rem;
          }
          
          .thumbnail {
            width: 50px;
            height: 50px;
          }
        }
        
        @media (max-width: 400px) {
          .gallery-grid {
            grid-template-columns: 1fr;
            max-width: 300px;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </section>
  );
};

export default PhotoGallery;
