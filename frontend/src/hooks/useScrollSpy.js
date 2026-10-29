import { useState, useEffect } from 'react';

export function useScrollSpy(elementIds = [], offset = 120) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!elementIds || elementIds.length === 0) return;

    const scrollContainer = document.getElementById('main-content-scroll');

    const handleScroll = () => {
      const scrollPosition = (scrollContainer ? scrollContainer.scrollTop : window.scrollY) + offset;

      for (let i = elementIds.length - 1; i >= 0; i--) {
        const id = elementIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(id);
            return;
          }
        }
      }

      // Default to first if near top
      const currentScroll = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
      if (elementIds.length > 0 && currentScroll < 200) {
        setActiveId(elementIds[0]);
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elementIds, offset]);

  return activeId;
}
