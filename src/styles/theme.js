export const theme = {
  colors: {
    pink: {
      light: '#FFD1DC',
      main: '#FF9BB8',
      dark: '#FF6B9D',
    },
    green: {
      light: '#C1E1C1',
      main: '#77DD77',
      dark: '#5DBB63',
    },
    white: '#FFFFFF',
    offwhite: '#FFF9FB',
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  fonts: {
    heading: '"Dancing Script", cursive',
    body: '"Poppins", sans-serif',
  },
  shadows: {
    sm: '0 2px 10px rgba(0, 0, 0, 0.1)',
    md: '0 4px 20px rgba(0, 0, 0, 0.15)',
    lg: '0 8px 30px rgba(0, 0, 0, 0.2)',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  spacing: {
    xs: '0.8rem',
    sm: '1.2rem',
    md: '1.6rem',
    lg: '2.4rem',
    xl: '3.2rem',
    xxl: '4.8rem',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    pill: '50px',
    circle: '50%',
  },
  transitions: {
    default: 'all 0.3s ease',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  zIndex: {
    navbar: 1000,
    modal: 2000,
    tooltip: 3000,
  },
};
