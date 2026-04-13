'use client';
import { useState, useEffect, useCallback } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './BtsGallery.module.css';
import VideoEmbed from './VideoEmbed';

export default function BtsGallery({ items = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') setIsOpen(false);
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  }, [isOpen, currentIndex, items]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!items || items.length === 0) return null;

  const showNext = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const showPrev = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const openGallery = () => {
    setCurrentIndex(0);
    setIsOpen(true);
  };

  const currentItem = items[currentIndex];

  return (
    <>
      {/* Trigger Button */}
      <button 
        className={styles.triggerBtn} 
        onClick={openGallery}
        aria-label="Ver Galería Behind The Scenes"
        title="Galería Behind The Scenes"
      >
        <Camera size={20} />
      </button>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className={styles.lightbox} onClick={() => setIsOpen(false)}>
          
          <div className={styles.topBar}>
            <span className={styles.counter}>
              {currentIndex + 1} / {items.length}
            </span>
            <button 
              className={styles.closeBtn} 
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              <X size={28} />
            </button>
          </div>

          <button 
            className={`${styles.navBtn} ${styles.prevBtn}`} 
            onClick={showPrev}
            disabled={items.length <= 1}
          >
            <ChevronLeft size={36} />
          </button>

          <div 
            className={styles.contentArea} 
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking content
          >
            {currentItem._type === 'youtubeVideo' ? (
              <div className={styles.videoWrapper}>
                 <VideoEmbed url={currentItem.url} title="Behind The Scenes Video" />
              </div>
            ) : (
              <img 
                src={currentItem.url} 
                alt={`Behind The Scenes ${currentIndex + 1}`} 
                className={styles.slideImage} 
              />
            )}
          </div>

          <button 
            className={`${styles.navBtn} ${styles.nextBtn}`} 
            onClick={showNext}
            disabled={items.length <= 1}
          >
            <ChevronRight size={36} />
          </button>
          
        </div>
      )}
    </>
  );
}
