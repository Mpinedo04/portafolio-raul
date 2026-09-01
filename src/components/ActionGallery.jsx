'use client';
import { useRef, useState, useSyncExternalStore } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { 
  EffectCube, 
  EffectCreative, 
  Pagination 
} from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { urlForOptimized } from '@/sanity/lib/image';

import styles from '../app/(website)/sobre-mi/About.module.css';

/* 
 * Creative effect presets — these work reliably with complex grid content
 */
const EFFECT_CONFIGS = {
  cube: {
    type: 'cube',
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  },
  sweep: {
    type: 'creative',
    creativeEffect: {
      prev: {
        shadow: true,
        translate: ['-120%', 0, -500],
        rotate: [0, 0, -15],
        opacity: 0,
      },
      next: {
        shadow: true,
        translate: ['120%', 0, -500],
        rotate: [0, 0, 15],
        opacity: 0,
      },
    },
  },
  cards: {
    type: 'creative',
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
        rotate: [0, 0, 0],
        opacity: 0.5,
      },
      next: {
        translate: ['100%', 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
      },
    },
  },
  fade: {
    type: 'creative',
    creativeEffect: {
      prev: {
        opacity: 0,
        translate: [0, 0, -100],
      },
      next: {
        opacity: 0,
        translate: [0, 0, 100],
      },
    },
  },
};

const ALL_MODULES = [EffectCube, EffectCreative, Pagination];

const subscribeToMount = () => () => {};
const getClientMountState = () => true;
const getServerMountState = () => false;

function useIsMobile(query = '(max-width: 768px)') {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false),
    () => false
  );
}

export default function ActionGallery({ photos = [], effect = 'cube' }) {
  const isMounted = useSyncExternalStore(
    subscribeToMount,
    getClientMountState,
    getServerMountState,
  );
  const isMobile = useIsMobile();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const swiperRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  if (!photos || photos.length === 0) return null;
  if (!isMounted) return <div style={{ minHeight: '480px' }} />;

  // 4 photos per face on mobile (2x2 grid), 6 on desktop (3x2 grid)
  const chunkSize = isMobile ? 4 : 6;
  const chunks = [];
  for (let i = 0; i < photos.length; i += chunkSize) {
    chunks.push(photos.slice(i, i + chunkSize));
  }

  // Resolve effect config — fallback to cube if unknown
  const validEffect = EFFECT_CONFIGS[effect] ? effect : 'cube';
  const config = EFFECT_CONFIGS[validEffect];
  const hasMultipleSlides = chunks.length > 1;

  const handleTransitionStart = () => {
    setIsTransitioning(true);
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    // Watchdog: force-clear isTransitioning in case transitionend never fires (e.g. reduced motion)
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 950);
  };

  const handleTransitionEnd = () => {
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    setIsTransitioning(false);
  };

  const moveSlide = (direction) => {
    const swiper = swiperRef.current;
    if (!hasMultipleSlides || !swiper || swiper.destroyed || swiper.animating) return;

    if (direction === 'prev') swiper.slidePrev();
    else swiper.slideNext();
  };

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.swiperContainer}>
        <Swiper
          key={`${validEffect}-${chunkSize}-${chunks.length}`}
          modules={ALL_MODULES}
          effect={config.type}
          grabCursor={true}
          loop={hasMultipleSlides}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onTransitionStart={handleTransitionStart}
          onTransitionEnd={handleTransitionEnd}
          pagination={{ 
            clickable: true,
            bulletClass: styles.paginationBullet,
            bulletActiveClass: styles.paginationBulletActive,
          }}
          cubeEffect={config.type === 'cube' ? config.cubeEffect : undefined}
          creativeEffect={config.type === 'creative' ? config.creativeEffect : undefined}
          speed={900}
          className={styles.mySwiper}
        >
          {chunks.map((group, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <div className={`${styles.groupGrid} ${isMobile ? styles.groupGridMobile : ''}`}>
                {group.map((photo, i) => (
                  <div key={i} className={styles.photoBox}>
                    <img 
                      src={urlForOptimized(photo, { width: 500, height: 500, quality: 78, fit: 'crop' })}
                      alt={`Momentos ${index * chunkSize + i + 1}`} 
                      className={styles.actionPhoto}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
                {group.length < chunkSize && [...Array(chunkSize - group.length)].map((_, i) => (
                  <div key={`empty-${i}`} className={styles.photoBoxEmpty} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          className={`${styles.navArrow} ${styles.prevArrow}`}
          aria-label="Foto anterior"
          disabled={!hasMultipleSlides}
          onClick={() => moveSlide('prev')}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          className={`${styles.navArrow} ${styles.nextArrow}`}
          aria-label="Foto siguiente"
          disabled={!hasMultipleSlides}
          onClick={() => moveSlide('next')}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
