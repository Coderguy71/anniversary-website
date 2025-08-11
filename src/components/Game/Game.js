import React, { useState } from 'react';
import { FaHeart, FaLock, FaLockOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';

const questions = [
  {
    id: 1,
    question: "What is our favorite shared activity?",
    options: ["Watching movies", "Hiking", "Cooking together", "Playing games"],
    correct: 3
  },
  {
    id: 2,
    question: "Where did we first meet?",
    options: ["School", "Work", "Through friends", "Online"],
    correct: 1
  },
  {
    id: 3,
    question: "What's our song?",
    options: ["Perfect by Ed Sheeran", "A House in Nebraska by Ethel Cain", "Astronomy by Conan Gray", "Die With A Smile by Bruno Mars"],
    correct: 2
  },
  {
    id: 4,
    question: "What's my favorite food?",
    options: ["Pizza", "Paneer", "Pasta", "Burgers"],
    correct: 1
  },
  {
    id: 5,
    question: "What's my dream car?",
    options: ["Toyota Camry", "Maserati Levante", "Toyota Corolla", "Bugatti Chiron"],
    correct: 1
  },
  {
    id: 6,
    question: "What's my favorite season?",
    options: ["Spring", "Summer", "Fall", "Winter"],
    correct: 3
  },
  {
    id: 7,
    question: "What's my favorite color?",
    options: ["Blue", "Pink", "Green", "Purple"],
    correct: 3
  },
  {
    id: 8,
    question: "What's my favorite compliment?",
    options: ["Cutie", "Hot", "Handsome", "Fhheavy"],
    correct: 2
  },
  {
    id: 9,
    question: "What's my favorite show?",
    options: ["Stranger Things", "Invincible", "The Crown", "The Witcher"],
    correct: 1
  },
  {
    id: 10,
    question: "What's my favorite Gym Tiktoker right now?",
    options: ["Cbum", "David Laid", "Sourced.By.Baba", "Joey Swoll"],
    correct: 2
  }
];

const SECRET_CODE = "LOVE4EVER";

const Game = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showSecret, setShowSecret] = useState(false);

  const handleAnswer = (selectedOption) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    setAnswers(newAnswers);

    if (selectedOption === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      if (score + 1 === questions.length) {
        setShowSecret(true);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setAnswers(Array(questions.length).fill(null));
    setShowSecret(false);
  };

  return (
    <div className="game-container">
      <h1 className="game-title">
        How Well Do You Know Us? <FaHeart className="heart-icon" />
      </h1>
      
      {showScore ? (
        <motion.div 
          className="score-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>
            You scored {score} out of {questions.length}!
          </h2>
          {showSecret && (
            <motion.div 
              className="secret-code"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 10 }}
            >
              <div className="lock-icon">
                <FaLockOpen size={40} color="#ff4d6d" />
              </div>
              <h3>Congratulations! You've unlocked our secret code:</h3>
              <div className="code">{SECRET_CODE}</div>
              <p className="hint">(Keep this safe, it might come in handy later!)</p>
            </motion.div>
          )}
          <button onClick={resetQuiz} className="play-again-btn">
            Play Again
          </button>
        </motion.div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].question}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`answer-btn ${answers[currentQuestion] === index ? 'selected' : ''}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
            ></div>
          </div>
        </>
      )}

      <style jsx>{`
        .game-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 3rem 2rem;
          text-align: center;
          background: #fff9fb;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .game-title {
          color: #ff4d6d;
          margin-bottom: 2rem;
          font-size: 2.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .heart-icon {
          color: #ff4d6d;
        }
        
        .question-section {
          margin-bottom: 2rem;
        }
        
        .question-count {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 1rem;
        }
        
        .question-text {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 2rem;
          font-weight: 500;
        }
        
        .answer-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .answer-btn {
          background: white;
          border: 2px solid #ffb3c1;
          border-radius: 10px;
          padding: 1rem;
          font-size: 1rem;
          color: #333;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .answer-btn:hover {
          background: #fff0f3;
          border-color: #ff4d6d;
        }
        
        .answer-btn.selected {
          background: #ff4d6d;
          color: white;
          border-color: #ff4d6d;
        }
        
        .progress-bar {
          width: 100%;
          height: 10px;
          background: #f0f0f0;
          border-radius: 5px;
          overflow: hidden;
          margin-top: 2rem;
        }
        
        .progress {
          height: 100%;
          background: linear-gradient(90deg, #ff85a2, #ff4d6d);
          border-radius: 5px;
          transition: width 0.3s ease;
        }
        
        .score-section {
          margin: 2rem 0;
        }
        
        .score-section h2 {
          color: #ff4d6d;
          font-size: 2rem;
          margin-bottom: 2rem;
        }
        
        .secret-code {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          margin: 2rem 0;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .lock-icon {
          margin-bottom: 1rem;
        }
        
        .code {
          font-family: monospace;
          font-size: 2rem;
          font-weight: bold;
          color: #ff4d6d;
          letter-spacing: 3px;
          margin: 1rem 0;
          padding: 1rem;
          background: #fff0f3;
          border-radius: 8px;
          display: inline-block;
        }
        
        .hint {
          color: #666;
          font-style: italic;
          margin-top: 1rem;
        }
        
        .play-again-btn {
          background: #ff4d6d;
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          border-radius: 50px;
          cursor: pointer;
          margin-top: 1.5rem;
          transition: all 0.3s ease;
        }
        
        .play-again-btn:hover {
          background: #ff2d55;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 77, 109, 0.3);
        }
        
        @media (max-width: 768px) {
          .answer-section {
            grid-template-columns: 1fr;
          }
          
          .game-title {
            font-size: 1.8rem;
          }
          
          .question-text {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Game;
