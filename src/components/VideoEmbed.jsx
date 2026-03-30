import styles from './VideoEmbed.module.css';

export default function VideoEmbed({ url, title, thumbnail }) {
  if (!url) return <img src={thumbnail} alt={title} className={styles.thumbnail} />;

  // Extract YouTube ID
  const getYTId = (link) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = link.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Extract Vimeo ID
  const getVimeoId = (link) => {
    const regExp = /vimeo\.com\/(?:video\/)?(\d+)/;
    const match = link.match(regExp);
    return match ? match[1] : null;
  };

  const ytId = getYTId(url);
  const vimeoId = getVimeoId(url);

  if (ytId) {
    return (
      <div className={styles.wrapper}>
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.iframe}
        ></iframe>
      </div>
    );
  }

  if (vimeoId) {
    return (
      <div className={styles.wrapper}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
          title={title}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className={styles.iframe}
        ></iframe>
      </div>
    );
  }

  // Fallback to thumbnail Link if it's not YT or Vimeo
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.fallbackLink}>
      <img src={thumbnail} alt={title} className={styles.thumbnail} />
      <div className={styles.playBtn}>▶</div>
    </a>
  );
}
