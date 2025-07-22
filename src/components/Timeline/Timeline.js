import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FaHeart, FaRegHeart, FaCalendarAlt, FaMapMarkerAlt, FaGift, FaPlane, FaHome, FaStar, FaGlassCheers, FaRing, FaChild } from 'react-icons/fa';
import { fadeIn, slideInLeft, slideInRight, float } from '../../utils/animations';

const milestones = [
  {
    id: 1,
    date: 'January 15, 2023',
    title: 'The Day We Met',
    description: 'Our eyes met across a crowded room, and I knew there was something special about you.',
    icon: 'heart',
    color: '#FF6B9D',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    date: 'February 3, 2023',
    title: 'First Date',
    description: 'Dinner at that little Italian place. I was so nervous I almost spilled my drink!',
    icon: 'calendar',
    color: '#FF9E00',
    image: 'https://images.unsplash.com/photo-15210120171687-607ff612015a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    date: 'March 12, 2023',
    title: 'First Trip Together',
    description: 'That weekend getaway to the mountains. Remember how we got lost on that hike?',
    icon: 'plane',
    color: '#4CC9F0',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 4,
    date: 'April 22, 2023',
    title: 'First "I Love You"',
    description: 'I said it first, but you made me wait a whole week before saying it back!',
    icon: 'heart',
    color: '#F15BB5',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 5,
    date: 'June 5, 2023',
    title: 'Meeting the Parents',
    description: 'I was so nervous, but they loved you immediately (who wouldn\'t?).',
    icon: 'home',
    color: '#00B4D8',
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 6,
    date: 'July 20, 2023',
    title: 'Your Birthday',
    description: 'The day I got to celebrate the amazing person you are (and eat lots of cake).',
    icon: 'gift',
    color: '#FF9E00',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 7,
    date: 'August 15, 2023',
    title: 'Beach Vacation',
    description: 'Building sandcastles and watching sunsets by the ocean.',
    icon: 'umbrella',
    color: '#4CC9F0',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 8,
    date: 'September 2, 2023',
    title: 'First Fight',
    description: 'We survived our first disagreement (and the make-up was pretty great too).',
    icon: 'heart-broken',
    color: '#FF6B9D',
    image: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 9,
    date: 'October 18, 2023',
    title: 'Anniversary Trip',
    description: 'Celebrating our love in that cozy cabin with no cell service and no distractions.',
    icon: 'ring',
    color: '#F15BB5',
    image: 'https://images.unsplash.com/photo-1528123778688-ef905f5611a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 10,
    date: 'November 25, 2023',
    title: 'First Holiday Together',
    description: 'Your family made me feel so welcome, even when I burned the pie.',
    icon: 'tree',
    color: '#00B4D8',
    image: 'https://images.unsplash.com/photo-1512389142860-9c7d77f8a7c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 11,
    date: 'December 31, 2023',
    title: 'New Year\'s Eve',
    description: 'Ringing in the new year with you, excited for all our tomorrows together.',
    icon: 'champagne',
    color: '#FF9E00',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 12,
    date: 'January 15, 2024',
    title: 'Our First Anniversary',
    description: 'One year of loving you, and I fall more in love every single day.',
    icon: 'heart',
    color: '#FF6B9D',
    image: 'https://images.unsplash.com/photo-1516589091380-3d06e7568a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    highlight: true
  }
];

const iconComponents = {
  heart: <FaHeart className="icon" />,
  calendar: <FaCalendarAlt className="icon" />,
  plane: <FaPlane className="icon" />,
  home: <FaHome className="icon" />,
  gift: <FaGift className="icon" />,
  'map-marker': <FaMapMarkerAlt className="icon" />,
  star: <FaStar className="icon" />,
  umbrella: <FaRegHeart className="icon" />,
  'heart-broken': <FaRegHeart className="icon" />,
  ring: <FaRing className="icon" />,
  tree: <FaChild className="icon" />,
  champagne: <FaGlassCheers className="icon" />
};

const TimelineItem = ({ milestone, index, controls }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  const icon = iconComponents[milestone.icon] || iconComponents.heart;
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      ref={ref}
      className={`timeline-item ${isEven ? 'left' : 'right'} ${milestone.highlight ? 'highlight' : ''}`}
      initial="hidden"
      animate={controls}
      variants={isEven ? slideInLeft : slideInRight}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div 
        className="timeline-content"
        style={{
          '--timeline-color': milestone.color,
          '--timeline-bg': `${milestone.color}15`
        }}
      >
        <div className="timeline-icon" style={{ backgroundColor: milestone.color }}>
          {icon}
        </div>
        
        <div className="timeline-date">
          {milestone.date}
        </div>
        
        <h3 className="timeline-title">{milestone.title}</h3>
        
        <p className="timeline-description">{milestone.description}</p>
        
        {milestone.image && (
          <div className="timeline-image">
            <img 
              src={milestone.image} 
              alt={milestone.title} 
              loading="lazy"
            />
          </div>
        )}
        
        {milestone.highlight && (
          <div className="highlight-badge">
            <FaStar className="star-icon" />
            <span>Special Moment</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Timeline = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  return (
    <section className="timeline-section" id="timeline" ref={sectionRef}>
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
            Our Journey
          </motion.span>
          <motion.h2 
            className="section-title"
            variants={slideInLeft}
          >
            Our Love Story
          </motion.h2>
          <motion.div 
            className="section-divider"
            variants={slideInRight}
          >
            <FaHeart className="heart-icon" />
          </motion.div>
        </motion.div>
        
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          {milestones.map((milestone, index) => (
            <TimelineItem 
              key={milestone.id} 
              milestone={milestone} 
              index={index}
              controls={controls}
            />
          ))}
        </div>
        
        <motion.div 
          className="timeline-footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p>And this is just the beginning of our beautiful journey together...</p>
          <div className="hearts">
            <FaHeart className="heart" />
            <FaHeart className="heart" />
            <FaHeart className="heart" />
          </div>
        </motion.div>
      </div>
      
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
      <motion.div 
        className="decoration heart-3"
        animate={{
          ...float,
          transition: { ...float.transition, delay: 1 }
        }}
      >
        
      </motion.div>
      
      <style jsx>{`
        .timeline-section {
          position: relative;
          background: linear-gradient(135deg, #f8f9fa 0%, #fff0f5 100%);
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
        
        .timeline-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        .timeline-line {
          position: absolute;
          width: 4px;
          background: linear-gradient(to bottom, var(--color-pink), var(--color-pink-dark));
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
          border-radius: 10px;
        }
        
        .timeline-item {
          padding: 2rem 0;
          position: relative;
          width: 50%;
          box-sizing: border-box;
          transition: all 0.3s ease;
        }
        
        .timeline-item.left {
          left: 0;
          padding-right: 4rem;
          text-align: right;
        }
        
        .timeline-item.right {
          left: 50%;
          padding-left: 4rem;
          text-align: left;
        }
        
        .timeline-content {
          position: relative;
          background: white;
          border-radius: 12px;
          padding: 2.5rem;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
          margin: 0 1rem;
        }
        
        .timeline-item.highlight .timeline-content {
          border: 2px solid var(--timeline-color, var(--color-pink));
          box-shadow: 0 8px 30px rgba(255, 107, 157, 0.2);
        }
        
        .timeline-item:hover .timeline-content {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .timeline-icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.8rem;
          z-index: 2;
        }
        
        .timeline-item.left .timeline-icon {
          right: -25px;
        }
        
        .timeline-item.right .timeline-icon {
          left: -25px;
        }
        
        .timeline-date {
          font-size: 1.4rem;
          color: var(--timeline-color, var(--color-pink));
          font-weight: 600;
          margin-bottom: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        
        .timeline-item.right .timeline-date {
          justify-content: flex-start;
        }
        
        .timeline-title {
          font-size: 2rem;
          color: var(--color-pink-dark);
          margin-bottom: 1.2rem;
          font-family: 'Dancing Script', cursive;
        }
        
        .timeline-description {
          font-size: 1.5rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .timeline-image {
          margin: 1.5rem 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .timeline-image img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s ease;
        }
        
        .timeline-item:hover .timeline-image img {
          transform: scale(1.03);
        }
        
        .highlight-badge {
          position: absolute;
          top: -12px;
          right: -12px;
          background: linear-gradient(45deg, var(--color-pink), var(--color-pink-dark));
          color: white;
          padding: 0.5rem 1.2rem;
          border-radius: 20px;
          font-size: 1.2rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
        }
        
        .star-icon {
          font-size: 1rem;
          animation: pulse 1.5s infinite;
        }
        
        .timeline-footer {
          text-align: center;
          margin-top: 8rem;
        }
        
        .timeline-footer p {
          font-size: 2rem;
          color: var(--color-pink-dark);
          font-style: italic;
          margin-bottom: 2rem;
          font-family: 'Dancing Script', cursive;
        }
        
        .hearts {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
        }
        
        .heart {
          color: var(--color-pink);
          font-size: 2.4rem;
          animation: float 3s ease-in-out infinite;
        }
        
        .heart:nth-child(1) { animation-delay: 0s; }
        .heart:nth-child(2) { 
          animation-delay: 0.5s; 
          color: var(--color-pink-dark);
        }
        .heart:nth-child(3) { 
          animation-delay: 1s; 
          color: var(--color-green);
        }
        
        /* Decorative elements */
        .decoration {
          position: absolute;
          font-size: 3rem;
          z-index: 0;
          pointer-events: none;
          opacity: 0.7;
        }
        
        .heart-1 { top: 10%; left: 5%; }
        .heart-2 { top: 20%; right: 8%; }
        .heart-3 { bottom: 15%; left: 8%; }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        @media (max-width: 992px) {
          .container {
            padding: 0 1.5rem;
          }
          
          .timeline-container {
            padding: 0;
          }
          
          .timeline-line {
            left: 30px !important;
          }
          
          .timeline-item,
          .timeline-item.left, 
          .timeline-item.right {
            width: 100%;
            padding-left: 70px;
            padding-right: 0;
            text-align: left;
            margin-bottom: 1.5rem;
          }
          
          .timeline-item .timeline-icon {
            left: 5px !important;
            right: auto;
            width: 40px;
            height: 40px;
            font-size: 1.6rem;
          }
          
          .timeline-date {
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
          }
          
          .timeline-title {
            font-size: 2rem;
            margin-bottom: 1rem;
          }
          
          .timeline-description {
            font-size: 1.5rem;
            line-height: 1.5;
          }
        }
        
        @media (max-width: 768px) {
          .section-title {
            font-size: 3.2rem;
            margin-bottom: 1.5rem;
          }
          
          .section-subtitle {
            font-size: 1.4rem;
            margin-bottom: 0.5rem;
          }
          
          .timeline-content {
            padding: 1.8rem;
            margin: 0 0 3rem 0;
          }
          
          .timeline-title {
            font-size: 2rem;
            margin-bottom: 1rem;
          }
          
          .timeline-description {
            font-size: 1.5rem;
            line-height: 1.5;
          }
          
          .timeline-date {
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
          }
          
          .timeline-line {
            left: 30px !important;
          }
          
          .timeline-item,
          .timeline-item.left,
          .timeline-item.right {
            padding-left: 70px;
            padding-right: 0;
            width: 100%;
          }
          
          .timeline-icon {
            width: 40px;
            height: 40px;
            left: 5px !important;
            font-size: 1.6rem;
          }
          
          .timeline-footer p {
            font-size: 1.8rem;
          }
        }
        
        @media (max-width: 480px) {
          .section-title {
            font-size: 3rem;
          }
          
          .timeline-item {
            padding-left: 60px;
          }
          
          .timeline-item.left, 
          .timeline-item.right {
            padding-left: 60px;
          }
          
          .timeline-icon {
            width: 40px;
            height: 40px;
            font-size: 1.6rem;
          }
          
          .timeline-item.left .timeline-icon,
          .timeline-item.right .timeline-icon {
            left: 10px;
          }
          
          .timeline-date {
            font-size: 1.2rem;
          }
          
          .timeline-title {
            font-size: 1.7rem;
            margin-bottom: 1rem;
          }
          
          .timeline-description {
            font-size: 1.3rem;
          }
          
          .timeline-footer p {
            font-size: 1.6rem;
          }
          
          .heart {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Timeline;
