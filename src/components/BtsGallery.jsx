'use client';
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Camera, X, ChevronLeft, ChevronRight, PlayCircle, Grid } from 'lucide-react';
import styles from './BtsGallery.module.css';
import VideoEmbed from './VideoEmbed';

export default function BtsGallery({ items = [] }) {
  const [viewMode, setViewMode] = useState('hidden'); // 'hidden', 'grid', 'carousel'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (viewMode !== 'hidden') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [viewMode]);

  const handleKeyDown = useCallback((e) => {
    if (viewMode === 'hidden') return;
    if (e.key === 'Escape') {
      if (viewMode === 'carousel') setViewMode('grid');
      else setViewMode('hidden');
    }
    if (viewMode === 'carousel') {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    }
  }, [viewMode, currentIndex, items]);

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
    setViewMode('grid');
  };

  const getThumbnail = (item) => {
    if (item._type === 'image') return item.url;
    if (item._type === 'youtubeVideo') {
      const match = item.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#\&\?]*)/);
      const ytId = match && match[1] ? match[1] : null;
      if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    }
    return 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop';
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
        <span className={styles.btnText}>VER GALERÍA</span>
      </button>

      {/* Lightbox Modal via Portal */}
      {viewMode !== 'hidden' && isMounted && createPortal(
        <div className={styles.lightbox} onClick={() => setViewMode('hidden')}>
          
          <div className={styles.topBar}>
            {viewMode === 'carousel' ? (
              <span className={styles.counter}>
                <button 
                  onClick={(e) => { e.stopPropagation(); setViewMode('grid'); }}
                  style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', opacity: 0.7 }}
                >
                  <Grid size={18} /> Volver a Galería
                </button>
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{currentIndex + 1} / {items.length}
              </span>
            ) : (
              <span className={styles.counter}>GALERÍA BTS</span>
            )}
            <button 
              className={styles.closeBtn} 
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('hidden');
              }}
            >
              <X size={28} />
            </button>
          </div>

          {viewMode === 'grid' && (
            <div className={styles.gridContainer} onClick={(e) => e.stopPropagation()}>
              {items.map((item, idx) => (
                <div 
                  key={idx} 
                  className={styles.thumbnailBox}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setViewMode('carousel');
                  }}
                >
                  <img src={getThumbnail(item)} alt={`BTS Thumbnail ${idx + 1}`} className={styles.thumbImg} />
                  {item._type === 'youtubeVideo' && (
                    <div className={styles.playIconOverlay}>
                      <PlayCircle size={48} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {viewMode === 'carousel' && (
            <>
              <button 
                className={`${styles.navBtn} ${styles.prevBtn}`} 
                onClick={showPrev}
                disabled={items.length <= 1}
              >
                <ChevronLeft size={36} />
              </button>

              <div 
                className={styles.contentArea} 
                onClick={(e) => e.stopPropagation()} 
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
            </>
          )}
          
        </div>,
        document.body
      )}
    </>
  );
}
