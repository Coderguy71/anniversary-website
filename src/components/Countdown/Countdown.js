import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaLock } from 'react-icons/fa';
import styled from 'styled-components';

const CountdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #fff0f5 0%, #f8f9fa 100%);
  text-align: center;
  padding: 2rem;
`;

const LockIcon = styled.div`
  font-size: 5rem;
  color: var(--color-pink);
  margin-bottom: 2rem;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: var(--color-pink-dark);
  margin-bottom: 2rem;
  font-family: 'Dancing Script', cursive;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: var(--color-text-secondary);
  margin-bottom: 3rem;
  max-width: 600px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const CountdownWrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;
  justify-content: center;
`;

const TimeBlock = styled.div`
  background: white;
  padding: 1.5rem 1rem;
  border-radius: 12px;
  min-width: 100px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    min-width: 80px;
    padding: 1rem 0.5rem;
  }
`;

const TimeValue = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-pink);
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const TimeLabel = styled.div`
  font-size: 1rem;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const HeartDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  color: var(--color-pink);
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-pink), transparent);
    margin: 0 1rem;
  }
`;

const HeartIcon = styled(FaHeart)`
  margin: 0 0.5rem;
  animation: pulse 1.5s infinite;
`;

const Countdown = ({ onCountdownEnd }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('August 4, 2025 12:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else if (difference <= 0) {
        // Countdown has ended
        if (onCountdownEnd) {
          onCountdownEnd();
        }
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [onCountdownEnd]);

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <CountdownContainer>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <LockIcon>
          <FaLock />
        </LockIcon>
        
        <Title>Our Special Day is Coming!</Title>
        
        <Message>
          Something magical is being prepared just for you. 
          Check back on August 14th to see what's in store!
        </Message>
        
        <HeartDivider>
          <HeartIcon />
          <span>Countdown to the Big Reveal</span>
          <HeartIcon />
        </HeartDivider>
        
        <CountdownWrapper>
          <TimeBlock>
            <TimeValue>{days}</TimeValue>
            <TimeLabel>Days</TimeLabel>
          </TimeBlock>
          
          <TimeBlock>
            <TimeValue>{hours}</TimeValue>
            <TimeLabel>Hours</TimeLabel>
          </TimeBlock>
          
          <TimeBlock>
            <TimeValue>{minutes}</TimeValue>
            <TimeLabel>Minutes</TimeLabel>
          </TimeBlock>
          
          <TimeBlock>
            <TimeValue>{seconds}</TimeValue>
            <TimeLabel>Seconds</TimeLabel>
          </TimeBlock>
        </CountdownWrapper>
      </motion.div>
    </CountdownContainer>
  );
};

export default Countdown;
