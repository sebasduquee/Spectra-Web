
import { useCallback } from 'react';

export const useScrollTo = () => {
  const scrollToElement = useCallback((elementId) => {
    const element = document.querySelector(elementId);
    if (element) {
      const topOffset = element.offsetTop;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  }, []);

  return scrollToElement;
};
