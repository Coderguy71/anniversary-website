import React, { useState } from 'react';
import { FaLock, FaUnlock, FaGift, FaListUl, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Rewards = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const SECRET_CODE = "LOVE4EVER";

  const handleUnlock = (e) => {
    e.preventDefault();
    if (code.toUpperCase() === SECRET_CODE) {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Incorrect code. Try again!');
    }
  };

  const coupons = [
    { id: 1, title: 'Free Back Scratch', description: 'Good for one 10-minute back scratch session' },
    { id: 2, title: 'Free Head Scratch', description: 'Enjoy a relaxing head scratch' },
    { id: 3, title: 'Movie Night', description: 'Choose any movie of your choice' },
  ];

  const futurePlans = [
    'Visit a new city together',
    'Try a new restaurant',
    'Go stargazing',
    'Cook some food with you',
    'Have a picnic in the park',
    'Watch the sunset together',
    'Go on a road trip',
    'Marry you lol'
  ];

  if (!isUnlocked) {
    return (
      <div className="rewards-container">
        <div className="lock-icon">
          <FaLock size={50} color="#ff4d6d" />
        </div>
        <h2>Enter the Secret Code</h2>
        <p className="hint">Complete the "How Well Do You Know Us" game to get the code!</p>
        
        <form onSubmit={handleUnlock} className="code-form">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code"
            className="code-input"
          />
          <button type="submit" className="unlock-btn">
            Unlock <FaArrowRight className="arrow-icon" />
          </button>
        </form>
        
        {error && <p className="error-message">{error}</p>}

        <style jsx>{`
          .rewards-container {
            max-width: 500px;
            margin: 5rem auto;
            padding: 2rem;
            text-align: center;
            background: #fff9fb;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }
          
          .lock-icon {
            margin-bottom: 1.5rem;
          }
          
          h2 {
            color: #ff4d6d;
            margin-bottom: 1rem;
          }
          
          .hint {
            color: #666;
            margin-bottom: 2rem;
            font-style: italic;
          }
          
          .code-form {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
          }
          
          .code-input {
            flex: 1;
            padding: 0.8rem 1rem;
            border: 2px solid #ffb3c1;
            border-radius: 8px;
            font-size: 1rem;
            outline: none;
            transition: border-color 0.3s;
          }
          
          .code-input:focus {
            border-color: #ff4d6d;
          }
          
          .unlock-btn {
            background: #ff4d6d;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0 1.5rem;
            font-size: 1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s;
          }
          
          .unlock-btn:hover {
            background: #ff2d55;
            transform: translateY(-2px);
          }
          
          .error-message {
            color: #ff4d6d;
            margin-top: 1rem;
          }
          
          .arrow-icon {
            transition: transform 0.3s;
          }
          
          .unlock-btn:hover .arrow-icon {
            transform: translateX(3px);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="rewards-container">
      <div className="unlock-icon">
        <FaUnlock size={50} color="#4caf50" />
      </div>
      <h2>Your Rewards</h2>
      <p className="unlocked-message">Congratulations! You've unlocked special rewards.</p>
      
      <div className="coupons-section">
        <h3><FaGift className="icon" /> Coupons</h3>
        <div className="coupons-grid">
          {coupons.map((coupon) => (
            <motion.div 
              key={coupon.id}
              className="coupon-card"
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4>{coupon.title}</h4>
              <p>{coupon.description}</p>
              <div className="coupon-stamp">Redeemable Anytime</div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="future-plans">
        <h3><FaListUl className="icon" /> Future Plans List</h3>
        <ul className="plans-list">
          {futurePlans.map((plan, index) => (
            <motion.li 
              key={index}
              className="plan-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FaArrowRight className="arrow" /> {plan}
            </motion.li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .rewards-container {
          max-width: 1000px;
          margin: 2rem auto;
          padding: 2rem;
          text-align: center;
        }
        
        .unlock-icon, .unlocked-message {
          margin-bottom: 2rem;
        }
        
        .unlocked-message {
          color: #4caf50;
          font-size: 1.2rem;
          margin-bottom: 3rem;
        }
        
        h2 {
          color: #ff4d6d;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        h3 {
          color: #333;
          font-size: 1.8rem;
          margin: 3rem 0 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .icon {
          color: #ff4d6d;
        }
        
        .coupons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .coupon-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
          border: 2px dashed #ffb3c1;
          transition: all 0.3s;
        }
        
        .coupon-card h4 {
          color: #ff4d6d;
          margin-bottom: 0.5rem;
          font-size: 1.3rem;
        }
        
        .coupon-card p {
          color: #666;
          margin-bottom: 1.5rem;
        }
        
        .coupon-stamp {
          position: absolute;
          top: 10px;
          right: -30px;
          background: #ff4d6d;
          color: white;
          padding: 5px 30px;
          transform: rotate(45deg);
          font-size: 0.8rem;
          font-weight: bold;
          width: 120px;
          text-align: center;
        }
        
        .plans-list {
          list-style: none;
          padding: 0;
          max-width: 600px;
          margin: 0 auto;
          text-align: left;
        }
        
        .plan-item {
          background: white;
          margin: 0.8rem 0;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s;
        }
        
        .plan-item:hover {
          transform: translateX(10px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .arrow {
          color: #ff4d6d;
          font-size: 0.8rem;
        }
        
        @media (max-width: 768px) {
          .coupons-grid {
            grid-template-columns: 1fr;
          }
          
          .rewards-container {
            padding: 1rem;
          }
          
          h2 {
            font-size: 2rem;
          }
          
          h3 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Rewards;
