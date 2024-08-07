import { memo, useEffect, useState } from 'react';

import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';

const ScrollTopButton = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      return window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Fab
      sx={{
        display: isVisible ? 'flex' : 'none',
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        backgroundColor: '#6a815b',
      }}
      color="inherit"
      aria-label="scroll to top"
      onClick={scrollToTop}
    >
      <NavigationIcon />
    </Fab>
  );
});

export default ScrollTopButton;
