import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Poppins:wght@300;400;500;600&display=swap');
  
  :root {
    --color-pink-light: #FFD1DC;
    --color-pink: #FF9BB8;
    --color-pink-dark: #FF6B9D;
    --color-white: #FFFFFF;
    --color-offwhite: #FFF9FB;
    --color-green-light: #C1E1C1;
    --color-green: #77DD77;
    --color-green-dark: #5DBB63;
    --shadow-sm: 0 2px 10px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.15);
    --transition: all 0.3s ease;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--color-offwhite);
    color: #333;
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Dancing Script', cursive;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--color-pink-dark);
  }

  h1 { 
    font-size: 4.8rem; 
    line-height: 1.2;
    @media (max-width: 768px) {
      font-size: 3.8rem;
    }
    @media (max-width: 480px) {
      font-size: 3.2rem;
    }
  }
  
  h2 { 
    font-size: 3.6rem; 
    line-height: 1.3;
    @media (max-width: 768px) {
      font-size: 3rem;
    }
    @media (max-width: 480px) {
      font-size: 2.6rem;
    }
  }
  
  h3 { 
    font-size: 2.8rem; 
    line-height: 1.4;
    @media (max-width: 768px) {
      font-size: 2.4rem;
    }
  }
  
  p {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    color: #555;
    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }

  a {
    text-decoration: none;
    color: var(--color-pink-dark);
    transition: var(--transition);
    -webkit-tap-highlight-color: transparent;
    
    &:hover, 
    &:focus {
      color: var(--color-pink);
      outline: none;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }

  section {
    padding: 8rem 0;
    position: relative;
    overflow: hidden;
    
    @media (max-width: 768px) {
      padding: 6rem 0;
    }
    
    @media (max-width: 480px) {
      padding: 5rem 0;
    }
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    
    @media (max-width: 768px) {
      padding: 0 1.5rem;
    }
    
    @media (max-width: 480px) {
      padding: 0 1.2rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease, opacity 0.3s ease;
    backface-visibility: hidden;
    
    &[loading="lazy"] {
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &[loading="lazy"].loaded {
      opacity: 1;
    }
  }

  button {
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    border: none;
    outline: none;
    transition: var(--transition);
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    touch-action: manipulation;
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    &:active:not(:disabled) {
      transform: translateY(1px);
    }
  }

  .btn {
    display: inline-block;
    background: var(--color-pink);
    color: white;
    padding: 1.2rem 2.4rem;
    border: none;
    border-radius: 50px;
    font-size: 1.6rem;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: var(--shadow-sm);
    font-family: 'Poppins', sans-serif;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-md);
      background: var(--color-pink-dark);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
`;
