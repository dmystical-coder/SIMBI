// components/Section.tsx
import React, { useEffect, useRef } from 'react';

interface SectionProps {
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ children }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const revealSection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const [entry] = entries;

      if (!entry.isIntersecting) return;

      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    });

    sectionObserver.observe(sectionRef.current!);

    return () => {
      // Cleanup observer when component unmounts
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section section--hidden">
      {children}
    </section>
  );
};

export default Section;
