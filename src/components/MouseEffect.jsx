'use client';
import { useEffect } from 'react';

export default function MouseEffect() {
  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldReveal = canHover && !reduceMotion;

    if (!shouldReveal) return;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const applyReveal = () => {
      const elements = document.querySelectorAll('section, h2, .card, [class*="projectCard"], [class*="equipmentCard"], [class*="projectItem"], [class*="hubCard"], [class*="educationCard"], [class*="courseCard"], [class*="softwareCard"], [class*="infoBlock"], [class*="formCol"], [class*="timelineItem"]');
      elements.forEach(el => {
        if (!el.classList.contains('reveal')) {
          el.classList.add('reveal');
          revealObserver.observe(el);
        }
      });
    };

    applyReveal();

    const domObserver = new MutationObserver(() => {
      applyReveal();
    });
    domObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      revealObserver.disconnect();
      domObserver.disconnect();
    };
  }, []);

  return null;
}
