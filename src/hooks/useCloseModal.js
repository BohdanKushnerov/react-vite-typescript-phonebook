import { useEffect } from 'react';

export function useCloseModal(callback) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]);
}
