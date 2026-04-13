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

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from '../app/(website)/sobre-mi/About.module.css';

const effects = [
  { id: 'cube', label: 'Cubo', icon: Box, module: EffectCube },
  { id: 'fade', label: 'Desvanecer', icon: RefreshCcw, module: EffectFade },
  { id: 'flip', label: 'Giro 3D', icon: Layers, module: EffectFlip },
  { id: 'creative', label: 'Creativo', icon: Maximize2, module: EffectCreative },
];

export default function ActionGallery({ photos = [] }) {
  const [activeEffect, setActiveEffect] = useState('cube');

  if (!photos || photos.length === 0) return null;

  // Chunk photos into groups of 6
  const chunks = [];
  for (let i = 0; i < photos.length; i += 6) {
    chunks.push(photos.slice(i, i + 6));
  }

  const getEffectModule = () => {
    switch(activeEffect) {
      case 'cube': return [EffectCube, Navigation, Pagination];
      case 'fade': return [EffectFade, Navigation, Pagination];
      case 'flip': return [EffectFlip, Navigation, Pagination];
      case 'creative': return [EffectCreative, Navigation, Pagination];
      default: return [EffectCube, Navigation, Pagination];
    }
  };

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
      {/* Effect Switcher Label */}
      <div className={styles.effectSwitcher}>
        {effects.map((eff) => {
          const Icon = eff.icon;
          return (
            <button
              key={eff.id}
              onClick={() => setActiveEffect(eff.id)}
              className={`${styles.effectBtn} ${activeEffect === eff.id ? styles.activeEff : ''}`}
              title={`Efecto: ${eff.label}`}
            >
              <Icon size={16} />
              <span>{eff.label}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.swiperContainer}>
        <Swiper
          modules={getEffectModule()}
          effect={activeEffect}
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
          cubeEffect={activeEffect === 'cube' ? cubeConfig : undefined}
          creativeEffect={activeEffect === 'creative' ? creativeConfig : undefined}
          speed={800}
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
