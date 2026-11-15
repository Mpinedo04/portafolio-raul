'use client';
import { useState } from 'react';
import styles from './VideoEmbed.module.css';

// Extrae el ID de YouTube de los formatos habituales.
function getYouTubeId(link) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = link.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Extrae el ID de Vimeo (vimeo.com/123456789 o vimeo.com/video/123456789).
function getVimeoId(link) {
  const regExp = /vimeo\.com\/(?:video\/)?(\d+)/;
  const match = link.match(regExp);
  return match ? match[1] : null;
}

export default function VideoEmbed({ url, title, thumbnail }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!url) {
    return <img src={thumbnail} alt={title} className={styles.thumbnail} loading="lazy" decoding="async" />;
  }

  const ytId = getYouTubeId(url);
  const vimeoId = getVimeoId(url);
  const poster = thumbnail || (ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : null);
  const playLabel = title ? `Reproducir vídeo: ${title}` : 'Reproducir vídeo';

  // Fachada "click to play": hasta que el usuario no pulsa, no se carga el iframe
  // (ni cookies de terceros, ni reproductor, ni vídeo).
  const facade = (
    <button type="button" className={styles.facade} onClick={() => setIsPlaying(true)} aria-label={playLabel}>
      {poster ? (
        <img src={poster} alt="" className={styles.thumbnail} loading="lazy" decoding="async" />
      ) : (
        <span className={styles.posterFallback} />
      )}
      <span className={styles.playBtn} aria-hidden="true">▶</span>
    </button>
  );

  if (ytId) {
    return (
      <div className={styles.wrapper}>
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.iframe}
          />
        ) : facade}
      </div>
    );
  }

  if (vimeoId) {
    return (
      <div className={styles.wrapper}>
        {isPlaying ? (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
            title={title}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className={styles.iframe}
          />
        ) : facade}
      </div>
    );
  }

  // Enlace externo si la URL no es de YouTube ni Vimeo.
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.fallbackLink} aria-label={playLabel}>
      {poster ? (
        <img src={poster} alt="" className={styles.thumbnail} loading="lazy" decoding="async" />
      ) : (
        <span className={styles.posterFallback} />
      )}
      <span className={styles.playBtn} aria-hidden="true">▶</span>
    </a>
  );
}
