'use client';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { 
  EffectCube, 
  EffectCreative, 
  Navigation, 
  Pagination 
} from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { urlForOptimized } from '@/sanity/lib/image';

import styles from '../app/(website)/sobre-mi/About.module.css';

/* 
 * Creative effect presets — these work reliably with complex grid content
 * because they use custom CSS transforms instead of Swiper's rigid 3D modes.
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

const ALL_MODULES = [EffectCube, EffectCreative, Navigation, Pagination];

export default function ActionGallery({ photos = [], effect = 'cube' }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!photos || photos.length === 0) return null;
  if (!isMounted) return <div style={{ minHeight: '480px' }} />;

  // Chunk photos into groups of 6
  const chunks = [];
  for (let i = 0; i < photos.length; i += 6) {
    chunks.push(photos.slice(i, i + 6));
  }

  // Resolve effect config — fallback to cube if unknown
  const validEffect = EFFECT_CONFIGS[effect] ? effect : 'cube';
  const config = EFFECT_CONFIGS[validEffect];

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.swiperContainer}>
        <Swiper
          key={validEffect}
          modules={ALL_MODULES}
          effect={config.type}
          grabCursor={true}
          loop={chunks.length > 1}
          navigation={{
            prevEl: `.${styles.prevArrow}`,
            nextEl: `.${styles.nextArrow}`,
          }}
          pagination={{ 
            clickable: true,
            bulletClass: styles.paginationBullet,
            bulletActiveClass: styles.paginationBulletActive,
          }}
          cubeEffect={config.type === 'cube' ? config.cubeEffect : undefined}
          creativeEffect={config.type === 'creative' ? config.creativeEffect : undefined}
          speed={1000}
          className={styles.mySwiper}
        >
          {chunks.map((group, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <div className={styles.groupGrid}>
                {group.map((photo, i) => (
                  <div key={i} className={styles.photoBox}>
                    <img 
                      src={urlForOptimized(photo, { width: 500, height: 500, quality: 78, fit: 'crop' })}
                      alt={`Momentos ${index * 6 + i + 1}`} 
                      className={styles.actionPhoto}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
                {group.length < 6 && [...Array(6 - group.length)].map((_, i) => (
                  <div key={`empty-${i}`} className={styles.photoBoxEmpty} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className={`${styles.navArrow} ${styles.prevArrow}`}>
          <ChevronLeft size={24} />
        </button>
        <button className={`${styles.navArrow} ${styles.nextArrow}`}>
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
