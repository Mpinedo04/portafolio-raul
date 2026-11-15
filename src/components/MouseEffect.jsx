'use client';
import { useEffect } from 'react';

export default function MouseEffect() {
  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldReveal = canHover && !reduceMotion;

    if (!shouldReveal) return;

    // El brillo que sigue al cursor se actualiza como mucho una vez por frame.
    let frame = null;
    const handleMouseMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        document.documentElement.style.setProperty('--mouse-x', `${x}%`);
        document.documentElement.style.setProperty('--mouse-y', `${y}%`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // El HTML llega renderizado desde el servidor: basta con una pasada.
    const elements = document.querySelectorAll('section, h2, .card, [class*="projectCard"], [class*="equipmentCard"], [class*="projectItem"], [class*="hubCard"], [class*="educationCard"], [class*="courseCard"], [class*="softwareCard"], [class*="infoBlock"], [class*="formCol"], [class*="timelineItem"]');
    elements.forEach(el => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        revealObserver.observe(el);
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frame) cancelAnimationFrame(frame);
      revealObserver.disconnect();
    };
  }, []);

  return null;
}
