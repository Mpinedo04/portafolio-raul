'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { 
  EffectCube, 
  EffectFade, 
  EffectFlip, 
  EffectCreative, 
  Navigation, 
  Pagination 
} from 'swiper/modules';
import { ChevronLeft, ChevronRight, Maximize2, Layers, Box, RefreshCcw } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';

const ALL_MODULES = [EffectCube, EffectFade, EffectFlip, EffectCreative, Navigation, Pagination];

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from '../app/(website)/sobre-mi/About.module.css';

export default function ActionGallery({ photos = [], effect = 'cube' }) {
  if (!photos || photos.length === 0) return null;

  // Chunk photos into groups of 6
  const chunks = [];
  for (let i = 0; i < photos.length; i += 6) {
    chunks.push(photos.slice(i, i + 6));
  }

  const creativeConfig = {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      translate: ['100%', 0, 0],
    },
  };

  const cubeConfig = {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  };

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.swiperContainer}>
        <Swiper
          key={effect} // Forces re-initialization when effect changes in Sanity
          modules={ALL_MODULES}
          effect={effect || 'cube'}
          grabCursor={true}
          navigation={{
            prevEl: `.${styles.prevArrow}`,
            nextEl: `.${styles.nextArrow}`,
          }}
          pagination={{ 
            clickable: true,
            bulletClass: styles.paginationBullet,
            bulletActiveClass: styles.paginationBulletActive
          }}
          cubeEffect={effect === 'cube' ? cubeConfig : undefined}
          creativeEffect={effect === 'creative' ? creativeConfig : undefined}
          watchSlidesProgress={true}
          speed={1000}
          className={styles.mySwiper}
        >
          {chunks.map((group, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <div className={styles.groupGrid}>
                {group.map((photo, i) => (
                  <div key={i} className={styles.photoBox}>
                    <img 
                      src={urlFor(photo).width(500).height(500).url()} 
                      alt={`Momentos ${index * 6 + i + 1}`} 
                      className={styles.actionPhoto}
                    />
                  </div>
                ))}
                {/* Fill empty slots to maintain grid if needed */}
                {group.length < 6 && [...Array(6 - group.length)].map((_, i) => (
                  <div key={`empty-${i}`} className={styles.photoBoxEmpty} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Arrows */}
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
